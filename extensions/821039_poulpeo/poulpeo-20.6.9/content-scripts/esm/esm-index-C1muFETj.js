var ja = Object.defineProperty;
var Wa = (e, t, n) => t in e ? ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var re = (e, t, n) => Wa(e, typeof t != "symbol" ? t + "" : t, n);
function Ka(e) {
  const t = e;
  return e !== null && typeof e == "object" && typeof t.type == "string" && (typeof t.version == "string" || typeof t.version > "u") && (typeof t.id == "string" || typeof t.id > "u") && (typeof t.inReplyTo == "string" || typeof t.inReplyTo > "u");
}
function ys(e, t) {
  return Ka(e) && e.type === t;
}
content;
class qa {
  async handleMessage(t) {
    if (ys(t, "ping")) {
      if (t.id === void 0)
        throw new Error(`No ID set for runtime message ${t.type}`);
      return Promise.resolve({
        type: "pingReply",
        inReplyTo: t.id,
        payload: { timestamp: Date.now() }
      });
    }
  }
}
content;
const Ja = (e, t) => t;
content;
class Ga {
  constructor() {
    re(this, "eventHandlers", []);
  }
  subscribe(t, n) {
    this.eventHandlers.push([t, n]);
  }
  publish(t) {
    console.debug(
      "EventBus",
      "publish",
      t.type,
      Ja(t.details, "<redacted>")
    );
    for (const [n, s] of this.eventHandlers)
      n === t.type && s(t).catch(console.error);
  }
  unsubscribe(t, n) {
    var i, r;
    let s = this.eventHandlers.length;
    for (; s--; )
      ((i = this.eventHandlers[s]) == null ? void 0 : i[0]) === t && ((r = this.eventHandlers[s]) == null ? void 0 : r[1]) === n && this.eventHandlers.splice(s, 1);
  }
}
content;
const De = new Ga();
content;
const Ba = async () => new (await import("./ExtensionForegroundRuntime-yOicfqfy.js")).ExtensionForegroundRuntime(), _i = Ba().then((e) => {
  const t = (s, i) => {
    var r;
    return (r = s.stack) == null ? void 0 : r.split(`
`).slice(i).some((o) => o.includes(e.getFileUrl("")));
  }, n = [
    "debug",
    "info",
    "warn",
    "error",
    "log",
    "assert",
    "trace",
    "table"
  ];
  for (const s of n) {
    if (!(s in console))
      continue;
    const i = console[s], r = (...o) => {
      t(new Error(), 1) !== !0 && i.apply(console, o);
    };
    console[s] = r;
  }
  return e.initEnvironment(), e.getCurrentUrl().startsWith("http") && e.getMessagingService().listen(), e;
});
content;
class vi {
  constructor(t) {
    re(this, "runtime");
    this.runtime = t;
  }
  async checkStorageHealth() {
    await this.runtime.getMessagingService().sendMessageWithReply({ type: "checkStorageHealth", payload: void 0 });
  }
  async dropCookie(t) {
    await this.runtime.getMessagingService().sendMessageWithReply({
      type: "dropCookie",
      payload: t
    });
  }
  async getAllParameters() {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "getAllParameters",
      payload: {}
    })).payload.parameters;
  }
  async getCachedSingleUseOfferCodes() {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getCachedSingleUseOfferCodes", payload: {} })).payload.codes;
  }
  async getContainerContent(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "getContainerContent",
      payload: { technicalName: t, contentLengthLimit: n }
    })).payload.content;
  }
  async getCouponApplierConfig(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getCouponApplierConfig", payload: { merchantId: t } })).payload.config;
  }
  async getMerchantBonuses(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getMerchantBonuses", payload: { merchantId: t } })).payload.bonuses;
  }
  async getMerchantById(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getMerchantById", payload: { merchantId: t } })).payload.merchant;
  }
  async getMerchantOffers(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getMerchantOffers", payload: { merchantId: t } })).payload.offers;
  }
  async getMerchantsByUrl(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getMerchantsByUrl", payload: { url: t } })).payload.merchants;
  }
  async getSidebarInitData() {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getSidebarInitData", payload: {} })).payload;
  }
  async getSimilarMerchants(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getSimilarMerchants", payload: { merchantId: t } })).payload.merchants;
  }
  async getSingleUseOfferCode(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getSingleUseOfferCode", payload: { offerId: t } })).payload.code;
  }
  async getTrustpilotReviews(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "getTrustpilotReviews", payload: { limit: t, offset: n } })).payload.trustpilotReviews;
  }
  async getCashbackActivation(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "getCashbackActivation",
      payload: { merchantId: t }
    })).payload.cashbackActivation;
  }
  async openExtensionPage(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "openExtensionPage",
      payload: {
        pageName: t,
        anchor: n
      }
    })).payload;
  }
  async registerUserClick(t, n) {
    const s = Date.now();
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "registerUserClick",
      payload: { timestamp: s, isSidebarOpenIntent: t, merchantSelectionIntent: n }
    })).payload;
  }
  async requestNotificationLock(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "requestNotificationLock",
      payload: { notificationId: t, lockDurationInMs: n }
    })).payload.requestAccepted;
  }
  async sendCouponApplierTrackingEvent(t) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "sendCouponApplierTrackingEvent", payload: t })).payload.sent;
  }
  async setSelectedMerchantId(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({ type: "setSelectedMerchantId", payload: { merchantId: t, url: n } })).payload;
  }
  async trackNotificationEvent(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "trackNotificationEvent",
      payload: { eventType: t, notificationId: n }
    })).payload;
  }
  async trackShoppingCartPageDetectionSuccess(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "trackShoppingCartPageDetectionSuccess",
      payload: { merchant: t, detectionMethod: n }
    })).payload;
  }
  async trackUserInterfaceEvent(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "trackUserInterfaceEvent",
      payload: { eventType: t, taggingData: n }
    })).payload;
  }
  async updateParameter(t, n) {
    return (await this.runtime.getMessagingService().sendMessageWithReply({
      type: "updateParameter",
      payload: {
        name: t,
        value: n
      }
    })).payload;
  }
}
content;
(async () => {
  const e = await _i, t = new vi(e);
  e.getMessagingService().addMessageHandler(new qa()), addEventListener("click", () => {
    t.registerUserClick(!1).catch(console.error);
  }), addEventListener("visibilitychange", () => {
    De.publish({
      type: "tabVisibilityChanged",
      details: {
        visibility: document.visibilityState
      }
    });
  });
  let n = e.getCurrentUrl();
  if (setInterval(() => {
    const i = e.getCurrentUrl();
    n !== i && (n = i, De.publish({
      type: "tabUrlChanged",
      details: { url: n }
    }));
  }, 300), addEventListener("fullscreenchange", () => {
    document.documentElement.style.setProperty(
      "--PLP-EXTENSION-FULLSCREEN",
      document.fullscreenElement ? "none" : "block"
    );
  }), "www.poulpeo.com".split(
    ","
  ).some((i) => n.startsWith(`https://${i}`))) {
    const i = document.querySelector(
      'link[rel="chrome-webstore-item"]'
    );
    i && (i.dataset.status = "installed");
  }
})().catch(console.error);
content;
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ci(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Y = {}, Ht = [], We = () => {
}, Ya = () => !1, Ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), wi = (e) => e.startsWith("onUpdate:"), ue = Object.assign, Mi = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, za = Object.prototype.hasOwnProperty, Q = (e, t) => za.call(e, t), U = Array.isArray, jt = (e) => Pn(e) === "[object Map]", _s = (e) => Pn(e) === "[object Set]", zi = (e) => Pn(e) === "[object Date]", H = (e) => typeof e == "function", ce = (e) => typeof e == "string", qe = (e) => typeof e == "symbol", ne = (e) => e !== null && typeof e == "object", qr = (e) => (ne(e) || H(e)) && H(e.then) && H(e.catch), Jr = Object.prototype.toString, Pn = (e) => Jr.call(e), Qa = (e) => Pn(e).slice(8, -1), Gr = (e) => Pn(e) === "[object Object]", Ai = (e) => ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, bn = /* @__PURE__ */ Ci(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), vs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Xa = /-(\w)/g, Ue = vs(
  (e) => e.replace(Xa, (t, n) => n ? n.toUpperCase() : "")
), Za = /\B([A-Z])/g, ut = vs(
  (e) => e.replace(Za, "-$1").toLowerCase()
), Cs = vs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Bn = vs(
  (e) => e ? `on${Cs(e)}` : ""
), Ee = (e, t) => !Object.is(e, t), Yn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ss = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Zs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Br = (e) => {
  const t = ce(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Qi;
const ws = () => Qi || (Qi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ms(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = ce(s) ? sc(s) : Ms(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (ce(e) || ne(e))
    return e;
}
const ec = /;(?![^(]*\))/g, tc = /:([^]+)/, nc = /\/\*[^]*?\*\//g;
function sc(e) {
  const t = {};
  return e.replace(nc, "").split(ec).forEach((n) => {
    if (n) {
      const s = n.split(tc);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Pt(e) {
  let t = "";
  if (ce(e))
    t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const s = Pt(e[n]);
      s && (t += s + " ");
    }
  else if (ne(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Ld(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !ce(t) && (e.class = Pt(t)), n && (e.style = Ms(n)), e;
}
const ic = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", rc = /* @__PURE__ */ Ci(ic);
function Yr(e) {
  return !!e || e === "";
}
function oc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = As(e[s], t[s]);
  return n;
}
function As(e, t) {
  if (e === t) return !0;
  let n = zi(e), s = zi(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = qe(e), s = qe(t), n || s)
    return e === t;
  if (n = U(e), s = U(t), n || s)
    return n && s ? oc(e, t) : !1;
  if (n = ne(e), s = ne(t), n || s) {
    if (!n || !s)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const o in e) {
      const a = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (a && !c || !a && c || !As(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function zr(e, t) {
  return e.findIndex((n) => As(n, t));
}
const Qr = (e) => !!(e && e.__v_isRef === !0), it = (e) => ce(e) ? e : e == null ? "" : U(e) || ne(e) && (e.toString === Jr || !H(e.toString)) ? Qr(e) ? it(e.value) : JSON.stringify(e, Xr, 2) : String(e), Xr = (e, t) => Qr(t) ? Xr(e, t.value) : jt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[Fs(s, r) + " =>"] = i, n),
    {}
  )
} : _s(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Fs(n))
} : qe(t) ? Fs(t) : ne(t) && !U(t) && !Gr(t) ? String(t) : t, Fs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    qe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ae;
class Zr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ae, !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ae;
      try {
        return Ae = this, t();
      } finally {
        Ae = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ae = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ae = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function eo(e) {
  return new Zr(e);
}
function to() {
  return Ae;
}
function ac(e, t = !1) {
  Ae && Ae.cleanups.push(e);
}
let ie;
const Vs = /* @__PURE__ */ new WeakSet();
class no {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ae && Ae.active && Ae.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Vs.has(this) && (Vs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || io(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xi(this), ro(this);
    const t = ie, n = Ke;
    ie = this, Ke = !0;
    try {
      return this.fn();
    } finally {
      oo(this), ie = t, Ke = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ei(t);
      this.deps = this.depsTail = void 0, Xi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Vs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ei(this) && this.run();
  }
  get dirty() {
    return ei(this);
  }
}
let so = 0, mn, yn;
function io(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = yn, yn = e;
    return;
  }
  e.next = mn, mn = e;
}
function xi() {
  so++;
}
function Ti() {
  if (--so > 0)
    return;
  if (yn) {
    let t = yn;
    for (yn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; mn; ) {
    let t = mn;
    for (mn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function ro(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function oo(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Ei(s), cc(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function ei(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ao(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ao(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === An))
    return;
  e.globalVersion = An;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !ei(e)) {
    e.flags &= -3;
    return;
  }
  const n = ie, s = Ke;
  ie = e, Ke = !0;
  try {
    ro(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ee(i, e._value)) && (e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ie = n, Ke = s, oo(e), e.flags &= -3;
  }
}
function Ei(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Ei(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function cc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ke = !0;
const co = [];
function yt() {
  co.push(Ke), Ke = !1;
}
function St() {
  const e = co.pop();
  Ke = e === void 0 ? !0 : e;
}
function Xi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ie;
    ie = void 0;
    try {
      t();
    } finally {
      ie = n;
    }
  }
}
let An = 0;
class lc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xs {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!ie || !Ke || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new lc(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, lo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, An++, this.notify(t);
  }
  notify(t) {
    xi();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ti();
    }
  }
}
function lo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        lo(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const is = /* @__PURE__ */ new WeakMap(), Et = Symbol(
  ""
), ti = Symbol(
  ""
), xn = Symbol(
  ""
);
function ve(e, t, n) {
  if (Ke && ie) {
    let s = is.get(e);
    s || is.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new xs()), i.map = s, i.key = n), i.track();
  }
}
function rt(e, t, n, s, i, r) {
  const o = is.get(e);
  if (!o) {
    An++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (xi(), t === "clear")
    o.forEach(a);
  else {
    const c = U(e), u = c && Ai(n);
    if (c && n === "length") {
      const l = Number(s);
      o.forEach((d, p) => {
        (p === "length" || p === xn || !qe(p) && p >= l) && a(d);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), u && a(o.get(xn)), t) {
        case "add":
          c ? u && a(o.get("length")) : (a(o.get(Et)), jt(e) && a(o.get(ti)));
          break;
        case "delete":
          c || (a(o.get(Et)), jt(e) && a(o.get(ti)));
          break;
        case "set":
          jt(e) && a(o.get(Et));
          break;
      }
  }
  Ti();
}
function uc(e, t) {
  const n = is.get(e);
  return n && n.get(t);
}
function Lt(e) {
  const t = q(e);
  return t === e ? t : (ve(t, "iterate", xn), Fe(e) ? t : t.map(Ce));
}
function Ts(e) {
  return ve(e = q(e), "iterate", xn), e;
}
const fc = {
  __proto__: null,
  [Symbol.iterator]() {
    return $s(this, Symbol.iterator, Ce);
  },
  concat(...e) {
    return Lt(this).concat(
      ...e.map((t) => U(t) ? Lt(t) : t)
    );
  },
  entries() {
    return $s(this, "entries", (e) => (e[1] = Ce(e[1]), e));
  },
  every(e, t) {
    return et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return et(this, "filter", e, t, (n) => n.map(Ce), arguments);
  },
  find(e, t) {
    return et(this, "find", e, t, Ce, arguments);
  },
  findIndex(e, t) {
    return et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return et(this, "findLast", e, t, Ce, arguments);
  },
  findLastIndex(e, t) {
    return et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Hs(this, "includes", e);
  },
  indexOf(...e) {
    return Hs(this, "indexOf", e);
  },
  join(e) {
    return Lt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Hs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ln(this, "pop");
  },
  push(...e) {
    return ln(this, "push", e);
  },
  reduce(e, ...t) {
    return Zi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Zi(this, "reduceRight", e, t);
  },
  shift() {
    return ln(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ln(this, "splice", e);
  },
  toReversed() {
    return Lt(this).toReversed();
  },
  toSorted(e) {
    return Lt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Lt(this).toSpliced(...e);
  },
  unshift(...e) {
    return ln(this, "unshift", e);
  },
  values() {
    return $s(this, "values", Ce);
  }
};
function $s(e, t, n) {
  const s = Ts(e), i = s[t]();
  return s !== e && !Fe(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
const dc = Array.prototype;
function et(e, t, n, s, i, r) {
  const o = Ts(e), a = o !== e && !Fe(e), c = o[t];
  if (c !== dc[t]) {
    const d = c.apply(e, r);
    return a ? Ce(d) : d;
  }
  let u = n;
  o !== e && (a ? u = function(d, p) {
    return n.call(this, Ce(d), p, e);
  } : n.length > 2 && (u = function(d, p) {
    return n.call(this, d, p, e);
  }));
  const l = c.call(o, u, s);
  return a && i ? i(l) : l;
}
function Zi(e, t, n, s) {
  const i = Ts(e);
  let r = n;
  return i !== e && (Fe(e) ? n.length > 3 && (r = function(o, a, c) {
    return n.call(this, o, a, c, e);
  }) : r = function(o, a, c) {
    return n.call(this, o, Ce(a), c, e);
  }), i[t](r, ...s);
}
function Hs(e, t, n) {
  const s = q(e);
  ve(s, "iterate", xn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && Pi(n[0]) ? (n[0] = q(n[0]), s[t](...n)) : i;
}
function ln(e, t, n = []) {
  yt(), xi();
  const s = q(e)[t].apply(e, n);
  return Ti(), St(), s;
}
const hc = /* @__PURE__ */ Ci("__proto__,__v_isRef,__isVue"), uo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(qe)
);
function pc(e) {
  qe(e) || (e = String(e));
  const t = q(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
class fo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? Mc : bo : r ? go : po).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = U(t);
    if (!i) {
      let c;
      if (o && (c = fc[n]))
        return c;
      if (n === "hasOwnProperty")
        return pc;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ae(t) ? t : s
    );
    return (qe(n) ? uo.has(n) : hc(n)) || (i || ve(t, "get", n), r) ? a : ae(a) ? o && Ai(n) ? a : a.value : ne(a) ? i ? mo(a) : Es(a) : a;
  }
}
class ho extends fo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    if (!this._isShallow) {
      const c = kt(r);
      if (!Fe(s) && !kt(s) && (r = q(r), s = q(s)), !U(t) && ae(r) && !ae(s))
        return c ? !1 : (r.value = s, !0);
    }
    const o = U(t) && Ai(n) ? Number(n) < t.length : Q(t, n), a = Reflect.set(
      t,
      n,
      s,
      ae(t) ? t : i
    );
    return t === q(i) && (o ? Ee(s, r) && rt(t, "set", n, s) : rt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = Q(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && rt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!qe(n) || !uo.has(n)) && ve(t, "has", n), s;
  }
  ownKeys(t) {
    return ve(
      t,
      "iterate",
      U(t) ? "length" : Et
    ), Reflect.ownKeys(t);
  }
}
class gc extends fo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const bc = /* @__PURE__ */ new ho(), mc = /* @__PURE__ */ new gc(), yc = /* @__PURE__ */ new ho(!0);
const ni = (e) => e, jn = (e) => Reflect.getPrototypeOf(e);
function Sc(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = q(i), o = jt(r), a = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = i[e](...s), l = n ? ni : t ? si : Ce;
    return !t && ve(
      r,
      "iterate",
      c ? ti : Et
    ), {
      // iterator protocol
      next() {
        const { value: d, done: p } = u.next();
        return p ? { value: d, done: p } : {
          value: a ? [l(d[0]), l(d[1])] : l(d),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Wn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function _c(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = q(r), a = q(i);
      e || (Ee(i, a) && ve(o, "get", i), ve(o, "get", a));
      const { has: c } = jn(o), u = t ? ni : e ? si : Ce;
      if (c.call(o, i))
        return u(r.get(i));
      if (c.call(o, a))
        return u(r.get(a));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ve(q(i), "iterate", Et), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = q(r), a = q(i);
      return e || (Ee(i, a) && ve(o, "has", i), ve(o, "has", a)), i === a ? r.has(i) : r.has(i) || r.has(a);
    },
    forEach(i, r) {
      const o = this, a = o.__v_raw, c = q(a), u = t ? ni : e ? si : Ce;
      return !e && ve(c, "iterate", Et), a.forEach((l, d) => i.call(r, u(l), u(d), o));
    }
  };
  return ue(
    n,
    e ? {
      add: Wn("add"),
      set: Wn("set"),
      delete: Wn("delete"),
      clear: Wn("clear")
    } : {
      add(i) {
        !t && !Fe(i) && !kt(i) && (i = q(i));
        const r = q(this);
        return jn(r).has.call(r, i) || (r.add(i), rt(r, "add", i, i)), this;
      },
      set(i, r) {
        !t && !Fe(r) && !kt(r) && (r = q(r));
        const o = q(this), { has: a, get: c } = jn(o);
        let u = a.call(o, i);
        u || (i = q(i), u = a.call(o, i));
        const l = c.call(o, i);
        return o.set(i, r), u ? Ee(r, l) && rt(o, "set", i, r) : rt(o, "add", i, r), this;
      },
      delete(i) {
        const r = q(this), { has: o, get: a } = jn(r);
        let c = o.call(r, i);
        c || (i = q(i), c = o.call(r, i)), a && a.call(r, i);
        const u = r.delete(i);
        return c && rt(r, "delete", i, void 0), u;
      },
      clear() {
        const i = q(this), r = i.size !== 0, o = i.clear();
        return r && rt(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = Sc(i, e, t);
  }), n;
}
function Oi(e, t) {
  const n = _c(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    Q(n, i) && i in s ? n : s,
    i,
    r
  );
}
const vc = {
  get: /* @__PURE__ */ Oi(!1, !1)
}, Cc = {
  get: /* @__PURE__ */ Oi(!1, !0)
}, wc = {
  get: /* @__PURE__ */ Oi(!0, !1)
};
const po = /* @__PURE__ */ new WeakMap(), go = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), Mc = /* @__PURE__ */ new WeakMap();
function Ac(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function xc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ac(Qa(e));
}
function Es(e) {
  return kt(e) ? e : Ii(
    e,
    !1,
    bc,
    vc,
    po
  );
}
function Tc(e) {
  return Ii(
    e,
    !1,
    yc,
    Cc,
    go
  );
}
function mo(e) {
  return Ii(
    e,
    !0,
    mc,
    wc,
    bo
  );
}
function Ii(e, t, n, s, i) {
  if (!ne(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = xc(e);
  if (o === 0)
    return e;
  const a = new Proxy(
    e,
    o === 2 ? s : n
  );
  return i.set(e, a), a;
}
function ct(e) {
  return kt(e) ? ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function kt(e) {
  return !!(e && e.__v_isReadonly);
}
function Fe(e) {
  return !!(e && e.__v_isShallow);
}
function Pi(e) {
  return e ? !!e.__v_raw : !1;
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
function Yt(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && ss(e, "__v_skip", !0), e;
}
const Ce = (e) => ne(e) ? Es(e) : e, si = (e) => ne(e) ? mo(e) : e;
function ae(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function te(e) {
  return yo(e, !1);
}
function Dd(e) {
  return yo(e, !0);
}
function yo(e, t) {
  return ae(e) ? e : new Ec(e, t);
}
class Ec {
  constructor(t, n) {
    this.dep = new xs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : q(t), this._value = n ? t : Ce(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || Fe(t) || kt(t);
    t = s ? t : q(t), Ee(t, n) && (this._rawValue = t, this._value = s ? t : Ce(t), this.dep.trigger());
  }
}
function Vt(e) {
  return ae(e) ? e.value : e;
}
const Oc = {
  get: (e, t, n) => t === "__v_raw" ? e : Vt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return ae(i) && !ae(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function So(e) {
  return ct(e) ? e : new Proxy(e, Oc);
}
class Ic {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new xs(), { get: s, set: i } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = s, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Pc(e) {
  return new Ic(e);
}
function _o(e) {
  const t = U(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = vo(e, n);
  return t;
}
class kc {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return uc(q(this._object), this._key);
  }
}
class Rc {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Lc(e, t, n) {
  return ae(e) ? e : H(e) ? new Rc(e) : ne(e) && arguments.length > 1 ? vo(e, t, n) : te(e);
}
function vo(e, t, n) {
  const s = e[t];
  return ae(s) ? s : new kc(e, t, n);
}
class Dc {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new xs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = An - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return io(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ao(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Uc(e, t, n = !1) {
  let s, i;
  return H(e) ? s = e : (s = e.get, i = e.set), new Dc(s, i, n);
}
const Kn = {}, rs = /* @__PURE__ */ new WeakMap();
let At;
function Nc(e, t = !1, n = At) {
  if (n) {
    let s = rs.get(n);
    s || rs.set(n, s = []), s.push(e);
  }
}
function Fc(e, t, n = Y) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: a, call: c } = n, u = (k) => i ? k : Fe(k) || i === !1 || i === 0 ? ot(k, 1) : ot(k);
  let l, d, p, g, m = !1, S = !1;
  if (ae(e) ? (d = () => e.value, m = Fe(e)) : ct(e) ? (d = () => u(e), m = !0) : U(e) ? (S = !0, m = e.some((k) => ct(k) || Fe(k)), d = () => e.map((k) => {
    if (ae(k))
      return k.value;
    if (ct(k))
      return u(k);
    if (H(k))
      return c ? c(k, 2) : k();
  })) : H(e) ? t ? d = c ? () => c(e, 2) : e : d = () => {
    if (p) {
      yt();
      try {
        p();
      } finally {
        St();
      }
    }
    const k = At;
    At = l;
    try {
      return c ? c(e, 3, [g]) : e(g);
    } finally {
      At = k;
    }
  } : d = We, t && i) {
    const k = d, O = i === !0 ? 1 / 0 : i;
    d = () => ot(k(), O);
  }
  const R = to(), I = () => {
    l.stop(), R && R.active && Mi(R.effects, l);
  };
  if (r && t) {
    const k = t;
    t = (...O) => {
      k(...O), I();
    };
  }
  let V = S ? new Array(e.length).fill(Kn) : Kn;
  const F = (k) => {
    if (!(!(l.flags & 1) || !l.dirty && !k))
      if (t) {
        const O = l.run();
        if (i || m || (S ? O.some((D, j) => Ee(D, V[j])) : Ee(O, V))) {
          p && p();
          const D = At;
          At = l;
          try {
            const j = [
              O,
              // pass undefined as the old value when it's changed for the first time
              V === Kn ? void 0 : S && V[0] === Kn ? [] : V,
              g
            ];
            c ? c(t, 3, j) : (
              // @ts-expect-error
              t(...j)
            ), V = O;
          } finally {
            At = D;
          }
        }
      } else
        l.run();
  };
  return a && a(F), l = new no(d), l.scheduler = o ? () => o(F, !1) : F, g = (k) => Nc(k, !1, l), p = l.onStop = () => {
    const k = rs.get(l);
    if (k) {
      if (c)
        c(k, 4);
      else
        for (const O of k) O();
      rs.delete(l);
    }
  }, t ? s ? F(!0) : V = l.run() : o ? o(F.bind(null, !0), !0) : l.run(), I.pause = l.pause.bind(l), I.resume = l.resume.bind(l), I.stop = I, I;
}
function ot(e, t = 1 / 0, n) {
  if (t <= 0 || !ne(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, ae(e))
    ot(e.value, t, n);
  else if (U(e))
    for (let s = 0; s < e.length; s++)
      ot(e[s], t, n);
  else if (_s(e) || jt(e))
    e.forEach((s) => {
      ot(s, t, n);
    });
  else if (Gr(e)) {
    for (const s in e)
      ot(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && ot(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function kn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    rn(i, t, n);
  }
}
function Je(e, t, n, s) {
  if (H(e)) {
    const i = kn(e, t, n, s);
    return i && qr(i) && i.catch((r) => {
      rn(r, t, n);
    }), i;
  }
  if (U(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Je(e[r], t, n, s));
    return i;
  }
}
function rn(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Y;
  if (t) {
    let a = t.parent;
    const c = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const l = a.ec;
      if (l) {
        for (let d = 0; d < l.length; d++)
          if (l[d](e, c, u) === !1)
            return;
      }
      a = a.parent;
    }
    if (r) {
      yt(), kn(r, null, 10, [
        e,
        c,
        u
      ]), St();
      return;
    }
  }
  Vc(e, n, i, s, o);
}
function Vc(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const xe = [];
let ze = -1;
const Wt = [];
let ht = null, Ft = 0;
const Co = /* @__PURE__ */ Promise.resolve();
let os = null;
function wo(e) {
  const t = os || Co;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $c(e) {
  let t = ze + 1, n = xe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = xe[s], r = Tn(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ki(e) {
  if (!(e.flags & 1)) {
    const t = Tn(e), n = xe[xe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Tn(n) ? xe.push(e) : xe.splice($c(t), 0, e), e.flags |= 1, Mo();
  }
}
function Mo() {
  os || (os = Co.then(xo));
}
function as(e) {
  U(e) ? Wt.push(...e) : ht && e.id === -1 ? ht.splice(Ft + 1, 0, e) : e.flags & 1 || (Wt.push(e), e.flags |= 1), Mo();
}
function er(e, t, n = ze + 1) {
  for (; n < xe.length; n++) {
    const s = xe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      xe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ao(e) {
  if (Wt.length) {
    const t = [...new Set(Wt)].sort(
      (n, s) => Tn(n) - Tn(s)
    );
    if (Wt.length = 0, ht) {
      ht.push(...t);
      return;
    }
    for (ht = t, Ft = 0; Ft < ht.length; Ft++) {
      const n = ht[Ft];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    ht = null, Ft = 0;
  }
}
const Tn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function xo(e) {
  try {
    for (ze = 0; ze < xe.length; ze++) {
      const t = xe[ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), kn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ze < xe.length; ze++) {
      const t = xe[ze];
      t && (t.flags &= -2);
    }
    ze = -1, xe.length = 0, Ao(), os = null, (xe.length || Wt.length) && xo();
  }
}
let Qe, hn = [], ii = !1;
function Os(e, ...t) {
  Qe ? Qe.emit(e, ...t) : ii || hn.push({ event: e, args: t });
}
function To(e, t) {
  var n, s;
  Qe = e, Qe ? (Qe.enabled = !0, hn.forEach(({ event: i, args: r }) => Qe.emit(i, ...r)), hn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    To(r, t);
  }), setTimeout(() => {
    Qe || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ii = !0, hn = []);
  }, 3e3)) : (ii = !0, hn = []);
}
function Hc(e, t) {
  Os("app:init", e, t, {
    Fragment: de,
    Text: Un,
    Comment: ye,
    Static: _n
  });
}
function jc(e) {
  Os("app:unmount", e);
}
const Wc = /* @__PURE__ */ Ri(
  "component:added"
  /* COMPONENT_ADDED */
), Eo = /* @__PURE__ */ Ri(
  "component:updated"
  /* COMPONENT_UPDATED */
), Kc = /* @__PURE__ */ Ri(
  "component:removed"
  /* COMPONENT_REMOVED */
), qc = (e) => {
  Qe && typeof Qe.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Qe.cleanupBuffer(e) && Kc(e);
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ri(e) {
  return (t) => {
    Os(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
function Jc(e, t, n) {
  Os(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let pe = null, Oo = null;
function cs(e) {
  const t = pe;
  return pe = e, Oo = e && e.type.__scopeId || null, t;
}
function Gc(e, t = pe, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && dr(-1);
    const r = cs(t);
    let o;
    try {
      o = e(...i);
    } finally {
      cs(r), s._d && dr(1);
    }
    return Eo(t), o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function tr(e, t) {
  if (pe === null)
    return e;
  const n = Ls(pe), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, o, a, c = Y] = t[i];
    r && (H(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && ot(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: a,
      modifiers: c
    }));
  }
  return e;
}
function vt(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    r && (a.oldValue = r[o].value);
    let c = a.dir[s];
    c && (yt(), Je(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), St());
  }
}
const Bc = Symbol("_vte"), Io = (e) => e.__isTeleport, pt = Symbol("_leaveCb"), qn = Symbol("_enterCb");
function Yc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return zt(() => {
    e.isMounted = !0;
  }), Fo(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ne = [Function, Array], Po = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ne,
  onEnter: Ne,
  onAfterEnter: Ne,
  onEnterCancelled: Ne,
  // leave
  onBeforeLeave: Ne,
  onLeave: Ne,
  onAfterLeave: Ne,
  onLeaveCancelled: Ne,
  // appear
  onBeforeAppear: Ne,
  onAppear: Ne,
  onAfterAppear: Ne,
  onAppearCancelled: Ne
}, ko = (e) => {
  const t = e.subTree;
  return t.component ? ko(t.component) : t;
}, zc = {
  name: "BaseTransition",
  props: Po,
  setup(e, { slots: t }) {
    const n = Rs(), s = Yc();
    return () => {
      const i = t.default && Do(t.default(), !0);
      if (!i || !i.length)
        return;
      const r = Ro(i), o = q(e), { mode: a } = o;
      if (s.isLeaving)
        return js(r);
      const c = nr(r);
      if (!c)
        return js(r);
      let u = ri(
        c,
        o,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (d) => u = d
      );
      c.type !== ye && En(c, u);
      let l = n.subTree && nr(n.subTree);
      if (l && l.type !== ye && !Xe(c, l) && ko(n).type !== ye) {
        let d = ri(
          l,
          o,
          s,
          n
        );
        if (En(l, d), a === "out-in" && c.type !== ye)
          return s.isLeaving = !0, d.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete d.afterLeave, l = void 0;
          }, js(r);
        a === "in-out" && c.type !== ye ? d.delayLeave = (p, g, m) => {
          const S = Lo(
            s,
            l
          );
          S[String(l.key)] = l, p[pt] = () => {
            g(), p[pt] = void 0, delete u.delayedLeave, l = void 0;
          }, u.delayedLeave = () => {
            m(), delete u.delayedLeave, l = void 0;
          };
        } : l = void 0;
      } else l && (l = void 0);
      return r;
    };
  }
};
function Ro(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== ye) {
        t = n;
        break;
      }
  }
  return t;
}
const Qc = zc;
function Lo(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function ri(e, t, n, s, i) {
  const {
    appear: r,
    mode: o,
    persisted: a = !1,
    onBeforeEnter: c,
    onEnter: u,
    onAfterEnter: l,
    onEnterCancelled: d,
    onBeforeLeave: p,
    onLeave: g,
    onAfterLeave: m,
    onLeaveCancelled: S,
    onBeforeAppear: R,
    onAppear: I,
    onAfterAppear: V,
    onAppearCancelled: F
  } = t, k = String(e.key), O = Lo(n, e), D = (L, T) => {
    L && Je(
      L,
      s,
      9,
      T
    );
  }, j = (L, T) => {
    const x = T[1];
    D(L, T), U(L) ? L.every((w) => w.length <= 1) && x() : L.length <= 1 && x();
  }, z = {
    mode: o,
    persisted: a,
    beforeEnter(L) {
      let T = c;
      if (!n.isMounted)
        if (r)
          T = R || c;
        else
          return;
      L[pt] && L[pt](
        !0
        /* cancelled */
      );
      const x = O[k];
      x && Xe(e, x) && x.el[pt] && x.el[pt](), D(T, [L]);
    },
    enter(L) {
      let T = u, x = l, w = d;
      if (!n.isMounted)
        if (r)
          T = I || u, x = V || l, w = F || d;
        else
          return;
      let K = !1;
      const B = L[qn] = (oe) => {
        K || (K = !0, oe ? D(w, [L]) : D(x, [L]), z.delayedLeave && z.delayedLeave(), L[qn] = void 0);
      };
      T ? j(T, [L, B]) : B();
    },
    leave(L, T) {
      const x = String(e.key);
      if (L[qn] && L[qn](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return T();
      D(p, [L]);
      let w = !1;
      const K = L[pt] = (B) => {
        w || (w = !0, T(), B ? D(S, [L]) : D(m, [L]), L[pt] = void 0, O[x] === e && delete O[x]);
      };
      O[x] = e, g ? j(g, [L, K]) : K();
    },
    clone(L) {
      const T = ri(
        L,
        t,
        n,
        s,
        i
      );
      return i && i(T), T;
    }
  };
  return z;
}
function js(e) {
  if (Ln(e))
    return e = mt(e), e.children = null, e;
}
function nr(e) {
  if (!Ln(e))
    return Io(e.type) && e.children ? Ro(e.children) : e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && H(n.default))
      return n.default();
  }
}
function En(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, En(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Do(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === de ? (o.patchFlag & 128 && i++, s = s.concat(
      Do(o.children, t, a)
    )) : (t || o.type !== ye) && s.push(a != null ? mt(o, { key: a }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Rn(e, t) {
  return H(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ue({ name: e.name }, t, { setup: e })
  ) : e;
}
function Li(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ls(e, t, n, s, i = !1) {
  if (U(e)) {
    e.forEach(
      (m, S) => ls(
        m,
        t && (U(t) ? t[S] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (Kt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && ls(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Ls(s.component) : s.el, o = i ? null : r, { i: a, r: c } = e, u = t && t.r, l = a.refs === Y ? a.refs = {} : a.refs, d = a.setupState, p = q(d), g = d === Y ? () => !1 : (m) => Q(p, m);
  if (u != null && u !== c && (ce(u) ? (l[u] = null, g(u) && (d[u] = null)) : ae(u) && (u.value = null)), H(c))
    kn(c, a, 12, [o, l]);
  else {
    const m = ce(c), S = ae(c);
    if (m || S) {
      const R = () => {
        if (e.f) {
          const I = m ? g(c) ? d[c] : l[c] : c.value;
          i ? U(I) && Mi(I, r) : U(I) ? I.includes(r) || I.push(r) : m ? (l[c] = [r], g(c) && (d[c] = l[c])) : (c.value = [r], e.k && (l[e.k] = c.value));
        } else m ? (l[c] = o, g(c) && (d[c] = o)) : S && (c.value = o, e.k && (l[e.k] = o));
      };
      o ? (R.id = -1, Le(R, n)) : R();
    }
  }
}
const sr = (e) => e.nodeType === 8;
ws().requestIdleCallback;
ws().cancelIdleCallback;
function Xc(e, t) {
  if (sr(e) && e.data === "[") {
    let n = 1, s = e.nextSibling;
    for (; s; ) {
      if (s.nodeType === 1) {
        if (t(s) === !1)
          break;
      } else if (sr(s))
        if (s.data === "]") {
          if (--n === 0) break;
        } else s.data === "[" && n++;
      s = s.nextSibling;
    }
  } else
    t(e);
}
const Kt = (e) => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function qt(e) {
  H(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: i = 200,
    hydrate: r,
    timeout: o,
    // undefined = never times out
    suspensible: a = !0,
    onError: c
  } = e;
  let u = null, l, d = 0;
  const p = () => (d++, u = null, g()), g = () => {
    let m;
    return u || (m = u = t().catch((S) => {
      if (S = S instanceof Error ? S : new Error(String(S)), c)
        return new Promise((R, I) => {
          c(S, () => R(p()), () => I(S), d + 1);
        });
      throw S;
    }).then((S) => m !== u && u ? u : (S && (S.__esModule || S[Symbol.toStringTag] === "Module") && (S = S.default), l = S, S)));
  };
  return /* @__PURE__ */ Rn({
    name: "AsyncComponentWrapper",
    __asyncLoader: g,
    __asyncHydrate(m, S, R) {
      const I = r ? () => {
        const V = r(
          R,
          (F) => Xc(m, F)
        );
        V && (S.bum || (S.bum = [])).push(V);
      } : R;
      l ? I() : g().then(() => !S.isUnmounted && I());
    },
    get __asyncResolved() {
      return l;
    },
    setup() {
      const m = he;
      if (Li(m), l)
        return () => Ws(l, m);
      const S = (F) => {
        u = null, rn(
          F,
          m,
          13,
          !s
        );
      };
      if (a && m.suspense || tn)
        return g().then((F) => () => Ws(F, m)).catch((F) => (S(F), () => s ? ge(s, {
          error: F
        }) : null));
      const R = te(!1), I = te(), V = te(!!i);
      return i && setTimeout(() => {
        V.value = !1;
      }, i), o != null && setTimeout(() => {
        if (!R.value && !I.value) {
          const F = new Error(
            `Async component timed out after ${o}ms.`
          );
          S(F), I.value = F;
        }
      }, o), g().then(() => {
        R.value = !0, m.parent && Ln(m.parent.vnode) && m.parent.update();
      }).catch((F) => {
        S(F), I.value = F;
      }), () => {
        if (R.value && l)
          return Ws(l, m);
        if (I.value && s)
          return ge(s, {
            error: I.value
          });
        if (n && !V.value)
          return ge(n);
      };
    }
  });
}
function Ws(e, t) {
  const { ref: n, props: s, children: i, ce: r } = t.vnode, o = ge(e, s, i);
  return o.ref = n, o.ce = r, delete t.vnode.ce, o;
}
const Ln = (e) => e.type.__isKeepAlive;
function Zc(e, t) {
  Uo(e, "a", t);
}
function el(e, t) {
  Uo(e, "da", t);
}
function Uo(e, t, n = he) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Is(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Ln(i.parent.vnode) && tl(s, t, n, i), i = i.parent;
  }
}
function tl(e, t, n, s) {
  const i = Is(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Dn(() => {
    Mi(s[t], i);
  }, n);
}
function Is(e, t, n = he, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      yt();
      const a = Nn(n), c = Je(t, n, e, o);
      return a(), St(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const ft = (e) => (t, n = he) => {
  (!tn || e === "sp") && Is(e, (...s) => t(...s), n);
}, nl = ft("bm"), zt = ft("m"), No = ft(
  "bu"
), sl = ft("u"), Fo = ft(
  "bum"
), Dn = ft("um"), il = ft(
  "sp"
), rl = ft("rtg"), ol = ft("rtc");
function al(e, t = he) {
  Is("ec", e, t);
}
const Vo = "components", cl = "directives", $o = Symbol.for("v-ndc");
function Ud(e) {
  return ce(e) ? Ho(Vo, e, !1) || e : e || $o;
}
function Nd(e) {
  return Ho(cl, e);
}
function Ho(e, t, n = !0, s = !1) {
  const i = pe || he;
  if (i) {
    const r = i.type;
    if (e === Vo) {
      const a = tu(
        r,
        !1
      );
      if (a && (a === t || a === Ue(t) || a === Cs(Ue(t))))
        return r;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      ir(i[e] || r[e], t) || // global registration
      ir(i.appContext[e], t)
    );
    return !o && s ? r : o;
  }
}
function ir(e, t) {
  return e && (e[t] || e[Ue(t)] || e[Cs(Ue(t))]);
}
function ll(e, t, n, s) {
  let i;
  const r = n, o = U(e);
  if (o || ce(e)) {
    const a = o && ct(e);
    let c = !1;
    a && (c = !Fe(e), e = Ts(e)), i = new Array(e.length);
    for (let u = 0, l = e.length; u < l; u++)
      i[u] = t(
        c ? Ce(e[u]) : e[u],
        u,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let a = 0; a < e; a++)
      i[a] = t(a + 1, a, void 0, r);
  } else if (ne(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (a, c) => t(a, c, void 0, r)
      );
    else {
      const a = Object.keys(e);
      i = new Array(a.length);
      for (let c = 0, u = a.length; c < u; c++) {
        const l = a[c];
        i[c] = t(e[l], l, c, r);
      }
    }
  else
    i = [];
  return i;
}
function Fd(e, t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (U(s))
      for (let i = 0; i < s.length; i++)
        e[s[i].name] = s[i].fn;
    else s && (e[s.name] = s.key ? (...i) => {
      const r = s.fn(...i);
      return r && (r.key = s.key), r;
    } : s.fn);
  }
  return e;
}
function Vd(e, t, n = {}, s, i) {
  if (pe.ce || pe.parent && Kt(pe.parent) && pe.parent.ce)
    return t !== "default" && (n.name = t), le(), Xt(
      de,
      null,
      [ge("slot", n, s && s())],
      64
    );
  let r = e[t];
  r && r._c && (r._d = !1), le();
  const o = r && jo(r(n)), a = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, c = Xt(
    de,
    {
      key: (a && !qe(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && s ? "_fb" : "")
    },
    o || (s ? s() : []),
    o && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), r && r._c && (r._d = !0), c;
}
function jo(e) {
  return e.some((t) => Zt(t) ? !(t.type === ye || t.type === de && !jo(t.children)) : !0) ? e : null;
}
function $d(e, t) {
  const n = {};
  for (const s in e)
    n[Bn(s)] = e[s];
  return n;
}
const oi = (e) => e ? fa(e) ? Ls(e) : oi(e.parent) : null, Sn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ue(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => oi(e.parent),
    $root: (e) => oi(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Di(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ki(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = wo.bind(e.proxy)),
    $watch: (e) => Rl.bind(e)
  })
), Ks = (e, t) => e !== Y && !e.__isScriptSetup && Q(e, t), ul = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: a, appContext: c } = e;
    let u;
    if (t[0] !== "$") {
      const g = o[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Ks(s, t))
          return o[t] = 1, s[t];
        if (i !== Y && Q(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && Q(u, t)
        )
          return o[t] = 3, r[t];
        if (n !== Y && Q(n, t))
          return o[t] = 4, n[t];
        ai && (o[t] = 0);
      }
    }
    const l = Sn[t];
    let d, p;
    if (l)
      return t === "$attrs" && ve(e.attrs, "get", ""), l(e);
    if (
      // css module (injected by vue-loader)
      (d = a.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== Y && Q(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, Q(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return Ks(i, t) ? (i[t] = n, !0) : s !== Y && Q(s, t) ? (s[t] = n, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let a;
    return !!n[o] || e !== Y && Q(e, o) || Ks(t, o) || (a = r[0]) && Q(a, o) || Q(s, o) || Q(Sn, o) || Q(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Hd() {
  return Wo().slots;
}
function jd() {
  return Wo().attrs;
}
function Wo() {
  const e = Rs();
  return e.setupContext || (e.setupContext = ha(e));
}
function us(e) {
  return U(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Wd(e, t) {
  return !e || !t ? e || t : U(e) && U(t) ? e.concat(t) : ue({}, us(e), us(t));
}
let ai = !0;
function fl(e) {
  const t = Di(e), n = e.proxy, s = e.ctx;
  ai = !1, t.beforeCreate && rr(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: a,
    provide: c,
    inject: u,
    // lifecycle
    created: l,
    beforeMount: d,
    mounted: p,
    beforeUpdate: g,
    updated: m,
    activated: S,
    deactivated: R,
    beforeDestroy: I,
    beforeUnmount: V,
    destroyed: F,
    unmounted: k,
    render: O,
    renderTracked: D,
    renderTriggered: j,
    errorCaptured: z,
    serverPrefetch: L,
    // public API
    expose: T,
    inheritAttrs: x,
    // assets
    components: w,
    directives: K,
    filters: B
  } = t;
  if (u && dl(u, s, null), o)
    for (const ee in o) {
      const G = o[ee];
      H(G) && (s[ee] = G.bind(n));
    }
  if (i) {
    const ee = i.call(n, n);
    ne(ee) && (e.data = Es(ee));
  }
  if (ai = !0, r)
    for (const ee in r) {
      const G = r[ee], fe = H(G) ? G.bind(n, n) : H(G.get) ? G.get.bind(n, n) : We, $n = !H(G) && H(G.set) ? G.set.bind(n) : We, _t = Ie({
        get: fe,
        set: $n
      });
      Object.defineProperty(s, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => _t.value,
        set: (Ge) => _t.value = Ge
      });
    }
  if (a)
    for (const ee in a)
      Ko(a[ee], s, n, ee);
  if (c) {
    const ee = H(c) ? c.call(n) : c;
    Reflect.ownKeys(ee).forEach((G) => {
      yl(G, ee[G]);
    });
  }
  l && rr(l, e, "c");
  function Z(ee, G) {
    U(G) ? G.forEach((fe) => ee(fe.bind(n))) : G && ee(G.bind(n));
  }
  if (Z(nl, d), Z(zt, p), Z(No, g), Z(sl, m), Z(Zc, S), Z(el, R), Z(al, z), Z(ol, D), Z(rl, j), Z(Fo, V), Z(Dn, k), Z(il, L), U(T))
    if (T.length) {
      const ee = e.exposed || (e.exposed = {});
      T.forEach((G) => {
        Object.defineProperty(ee, G, {
          get: () => n[G],
          set: (fe) => n[G] = fe
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === We && (e.render = O), x != null && (e.inheritAttrs = x), w && (e.components = w), K && (e.directives = K), L && Li(e);
}
function dl(e, t, n = We) {
  U(e) && (e = ci(e));
  for (const s in e) {
    const i = e[s];
    let r;
    ne(i) ? "default" in i ? r = Jt(
      i.from || s,
      i.default,
      !0
    ) : r = Jt(i.from || s) : r = Jt(i), ae(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[s] = r;
  }
}
function rr(e, t, n) {
  Je(
    U(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ko(e, t, n, s) {
  let i = s.includes(".") ? sa(n, s) : () => n[s];
  if (ce(e)) {
    const r = t[e];
    H(r) && lt(i, r);
  } else if (H(e))
    lt(i, e.bind(n));
  else if (ne(e))
    if (U(e))
      e.forEach((r) => Ko(r, t, n, s));
    else {
      const r = H(e.handler) ? e.handler.bind(n) : t[e.handler];
      H(r) && lt(i, r, e);
    }
}
function Di(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = r.get(t);
  let c;
  return a ? c = a : !i.length && !n && !s ? c = t : (c = {}, i.length && i.forEach(
    (u) => fs(c, u, o, !0)
  ), fs(c, t, o)), ne(t) && r.set(t, c), c;
}
function fs(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && fs(e, r, n, !0), i && i.forEach(
    (o) => fs(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const a = hl[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const hl = {
  data: or,
  props: ar,
  emits: ar,
  // objects
  methods: pn,
  computed: pn,
  // lifecycle
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  // assets
  components: pn,
  directives: pn,
  // watch
  watch: gl,
  // provide / inject
  provide: or,
  inject: pl
};
function or(e, t) {
  return t ? e ? function() {
    return ue(
      H(e) ? e.call(this, this) : e,
      H(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function pl(e, t) {
  return pn(ci(e), ci(t));
}
function ci(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pn(e, t) {
  return e ? ue(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ar(e, t) {
  return e ? U(e) && U(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ue(
    /* @__PURE__ */ Object.create(null),
    us(e),
    us(t ?? {})
  ) : t;
}
function gl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ue(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Me(e[s], t[s]);
  return n;
}
function qo() {
  return {
    app: null,
    config: {
      isNativeTag: Ya,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let bl = 0;
function ml(e, t) {
  return function(s, i = null) {
    H(s) || (s = ue({}, s)), i != null && !ne(i) && (i = null);
    const r = qo(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const u = r.app = {
      _uid: bl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: gr,
      get config() {
        return r.config;
      },
      set config(l) {
      },
      use(l, ...d) {
        return o.has(l) || (l && H(l.install) ? (o.add(l), l.install(u, ...d)) : H(l) && (o.add(l), l(u, ...d))), u;
      },
      mixin(l) {
        return r.mixins.includes(l) || r.mixins.push(l), u;
      },
      component(l, d) {
        return d ? (r.components[l] = d, u) : r.components[l];
      },
      directive(l, d) {
        return d ? (r.directives[l] = d, u) : r.directives[l];
      },
      mount(l, d, p) {
        if (!c) {
          const g = u._ceVNode || ge(s, i);
          return g.appContext = r, p === !0 ? p = "svg" : p === !1 && (p = void 0), d && t ? t(g, l) : e(g, l, p), c = !0, u._container = l, l.__vue_app__ = u, u._instance = g.component, Hc(u, gr), Ls(g.component);
        }
      },
      onUnmount(l) {
        a.push(l);
      },
      unmount() {
        c && (Je(
          a,
          u._instance,
          16
        ), e(null, u._container), u._instance = null, jc(u), delete u._container.__vue_app__);
      },
      provide(l, d) {
        return r.provides[l] = d, u;
      },
      runWithContext(l) {
        const d = Ot;
        Ot = u;
        try {
          return l();
        } finally {
          Ot = d;
        }
      }
    };
    return u;
  };
}
let Ot = null;
function yl(e, t) {
  if (he) {
    let n = he.provides;
    const s = he.parent && he.parent.provides;
    s === n && (n = he.provides = Object.create(s)), n[e] = t;
  }
}
function Jt(e, t, n = !1) {
  const s = he || pe;
  if (s || Ot) {
    const i = Ot ? Ot._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && H(t) ? t.call(s && s.proxy) : t;
  }
}
function Sl() {
  return !!(he || pe || Ot);
}
const Jo = {}, Go = () => Object.create(Jo), Bo = (e) => Object.getPrototypeOf(e) === Jo;
function _l(e, t, n, s = !1) {
  const i = {}, r = Go();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Yo(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : Tc(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function vl(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, a = q(i), [c] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const l = e.vnode.dynamicProps;
      for (let d = 0; d < l.length; d++) {
        let p = l[d];
        if (ks(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (c)
          if (Q(r, p))
            g !== r[p] && (r[p] = g, u = !0);
          else {
            const m = Ue(p);
            i[m] = li(
              c,
              a,
              m,
              g,
              e,
              !1
            );
          }
        else
          g !== r[p] && (r[p] = g, u = !0);
      }
    }
  } else {
    Yo(e, t, i, r) && (u = !0);
    let l;
    for (const d in a)
      (!t || // for camelCase
      !Q(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((l = ut(d)) === d || !Q(t, l))) && (c ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[l] !== void 0) && (i[d] = li(
        c,
        a,
        d,
        void 0,
        e,
        !0
      )) : delete i[d]);
    if (r !== a)
      for (const d in r)
        (!t || !Q(t, d)) && (delete r[d], u = !0);
  }
  u && rt(e.attrs, "set", "");
}
function Yo(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let c in t) {
      if (bn(c))
        continue;
      const u = t[c];
      let l;
      i && Q(i, l = Ue(c)) ? !r || !r.includes(l) ? n[l] = u : (a || (a = {}))[l] = u : ks(e.emitsOptions, c) || (!(c in s) || u !== s[c]) && (s[c] = u, o = !0);
    }
  if (r) {
    const c = q(n), u = a || Y;
    for (let l = 0; l < r.length; l++) {
      const d = r[l];
      n[d] = li(
        i,
        c,
        d,
        u[d],
        e,
        !Q(u, d)
      );
    }
  }
  return o;
}
function li(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const a = Q(o, "default");
    if (a && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && H(c)) {
        const { propsDefaults: u } = i;
        if (n in u)
          s = u[n];
        else {
          const l = Nn(i);
          s = u[n] = c.call(
            null,
            t
          ), l();
        }
      } else
        s = c;
      i.ce && i.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !a ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === ut(n)) && (s = !0));
  }
  return s;
}
const Cl = /* @__PURE__ */ new WeakMap();
function zo(e, t, n = !1) {
  const s = n ? Cl : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, a = [];
  let c = !1;
  if (!H(e)) {
    const l = (d) => {
      c = !0;
      const [p, g] = zo(d, t, !0);
      ue(o, p), g && a.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  if (!r && !c)
    return ne(e) && s.set(e, Ht), Ht;
  if (U(r))
    for (let l = 0; l < r.length; l++) {
      const d = Ue(r[l]);
      cr(d) && (o[d] = Y);
    }
  else if (r)
    for (const l in r) {
      const d = Ue(l);
      if (cr(d)) {
        const p = r[l], g = o[d] = U(p) || H(p) ? { type: p } : ue({}, p), m = g.type;
        let S = !1, R = !0;
        if (U(m))
          for (let I = 0; I < m.length; ++I) {
            const V = m[I], F = H(V) && V.name;
            if (F === "Boolean") {
              S = !0;
              break;
            } else F === "String" && (R = !1);
          }
        else
          S = H(m) && m.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = S, g[
          1
          /* shouldCastTrue */
        ] = R, (S || Q(g, "default")) && a.push(d);
      }
    }
  const u = [o, a];
  return ne(e) && s.set(e, u), u;
}
function cr(e) {
  return e[0] !== "$" && !bn(e);
}
const Qo = (e) => e[0] === "_" || e === "$stable", Ui = (e) => U(e) ? e.map(je) : [je(e)], wl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Gc((...i) => Ui(t(...i)), n);
  return s._c = !1, s;
}, Xo = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Qo(i)) continue;
    const r = e[i];
    if (H(r))
      t[i] = wl(i, r, s);
    else if (r != null) {
      const o = Ui(r);
      t[i] = () => o;
    }
  }
}, Zo = (e, t) => {
  const n = Ui(t);
  e.slots.default = () => n;
}, ea = (e, t, n) => {
  for (const s in t)
    (n || s !== "_") && (e[s] = t[s]);
}, Ml = (e, t, n) => {
  const s = e.slots = Go();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (ea(s, t, n), n && ss(s, "_", i, !0)) : Xo(t, s);
  } else t && Zo(e, t);
}, Al = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = Y;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? r = !1 : ea(i, t, n) : (r = !t.$stable, Xo(t, i)), o = t;
  } else t && (Zo(e, t), o = { default: 1 });
  if (r)
    for (const a in i)
      !Qo(a) && o[a] == null && delete i[a];
}, Le = Kl;
function xl(e) {
  return Tl(e);
}
function Tl(e, t) {
  const n = ws();
  n.__VUE__ = !0, To(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: a,
    createComment: c,
    setText: u,
    setElementText: l,
    parentNode: d,
    nextSibling: p,
    setScopeId: g = We,
    insertStaticContent: m
  } = e, S = (f, h, b, v = null, y = null, _ = null, E = void 0, A = null, M = !!h.dynamicChildren) => {
    if (f === h)
      return;
    f && !Xe(f, h) && (v = Hn(f), Ge(f, y, _, !0), f = null), h.patchFlag === -2 && (M = !1, h.dynamicChildren = null);
    const { type: C, ref: $, shapeFlag: P } = h;
    switch (C) {
      case Un:
        R(f, h, b, v);
        break;
      case ye:
        I(f, h, b, v);
        break;
      case _n:
        f == null && V(h, b, v, E);
        break;
      case de:
        w(
          f,
          h,
          b,
          v,
          y,
          _,
          E,
          A,
          M
        );
        break;
      default:
        P & 1 ? O(
          f,
          h,
          b,
          v,
          y,
          _,
          E,
          A,
          M
        ) : P & 6 ? K(
          f,
          h,
          b,
          v,
          y,
          _,
          E,
          A,
          M
        ) : (P & 64 || P & 128) && C.process(
          f,
          h,
          b,
          v,
          y,
          _,
          E,
          A,
          M,
          an
        );
    }
    $ != null && y && ls($, f && f.ref, _, h || f, !h);
  }, R = (f, h, b, v) => {
    if (f == null)
      s(
        h.el = a(h.children),
        b,
        v
      );
    else {
      const y = h.el = f.el;
      h.children !== f.children && u(y, h.children);
    }
  }, I = (f, h, b, v) => {
    f == null ? s(
      h.el = c(h.children || ""),
      b,
      v
    ) : h.el = f.el;
  }, V = (f, h, b, v) => {
    [f.el, f.anchor] = m(
      f.children,
      h,
      b,
      v,
      f.el,
      f.anchor
    );
  }, F = ({ el: f, anchor: h }, b, v) => {
    let y;
    for (; f && f !== h; )
      y = p(f), s(f, b, v), f = y;
    s(h, b, v);
  }, k = ({ el: f, anchor: h }) => {
    let b;
    for (; f && f !== h; )
      b = p(f), i(f), f = b;
    i(h);
  }, O = (f, h, b, v, y, _, E, A, M) => {
    h.type === "svg" ? E = "svg" : h.type === "math" && (E = "mathml"), f == null ? D(
      h,
      b,
      v,
      y,
      _,
      E,
      A,
      M
    ) : L(
      f,
      h,
      y,
      _,
      E,
      A,
      M
    );
  }, D = (f, h, b, v, y, _, E, A) => {
    let M, C;
    const { props: $, shapeFlag: P, transition: N, dirs: W } = f;
    if (M = f.el = o(
      f.type,
      _,
      $ && $.is,
      $
    ), P & 8 ? l(M, f.children) : P & 16 && z(
      f.children,
      M,
      null,
      v,
      y,
      qs(f, _),
      E,
      A
    ), W && vt(f, null, v, "created"), j(M, f, f.scopeId, E, v), $) {
      for (const se in $)
        se !== "value" && !bn(se) && r(M, se, null, $[se], _, v);
      "value" in $ && r(M, "value", null, $.value, _), (C = $.onVnodeBeforeMount) && Ye(C, v, f);
    }
    ss(M, "__vnode", f, !0), ss(M, "__vueParentComponent", v, !0), W && vt(f, null, v, "beforeMount");
    const J = El(y, N);
    J && N.beforeEnter(M), s(M, h, b), ((C = $ && $.onVnodeMounted) || J || W) && Le(() => {
      C && Ye(C, v, f), J && N.enter(M), W && vt(f, null, v, "mounted");
    }, y);
  }, j = (f, h, b, v, y) => {
    if (b && g(f, b), v)
      for (let _ = 0; _ < v.length; _++)
        g(f, v[_]);
    if (y) {
      let _ = y.subTree;
      if (h === _ || oa(_.type) && (_.ssContent === h || _.ssFallback === h)) {
        const E = y.vnode;
        j(
          f,
          E,
          E.scopeId,
          E.slotScopeIds,
          y.parent
        );
      }
    }
  }, z = (f, h, b, v, y, _, E, A, M = 0) => {
    for (let C = M; C < f.length; C++) {
      const $ = f[C] = A ? gt(f[C]) : je(f[C]);
      S(
        null,
        $,
        h,
        b,
        v,
        y,
        _,
        E,
        A
      );
    }
  }, L = (f, h, b, v, y, _, E) => {
    const A = h.el = f.el;
    A.__vnode = h;
    let { patchFlag: M, dynamicChildren: C, dirs: $ } = h;
    M |= f.patchFlag & 16;
    const P = f.props || Y, N = h.props || Y;
    let W;
    if (b && Ct(b, !1), (W = N.onVnodeBeforeUpdate) && Ye(W, b, h, f), $ && vt(h, f, b, "beforeUpdate"), b && Ct(b, !0), (P.innerHTML && N.innerHTML == null || P.textContent && N.textContent == null) && l(A, ""), C ? T(
      f.dynamicChildren,
      C,
      A,
      b,
      v,
      qs(h, y),
      _
    ) : E || G(
      f,
      h,
      A,
      null,
      b,
      v,
      qs(h, y),
      _,
      !1
    ), M > 0) {
      if (M & 16)
        x(A, P, N, b, y);
      else if (M & 2 && P.class !== N.class && r(A, "class", null, N.class, y), M & 4 && r(A, "style", P.style, N.style, y), M & 8) {
        const J = h.dynamicProps;
        for (let se = 0; se < J.length; se++) {
          const X = J[se], Pe = P[X], Se = N[X];
          (Se !== Pe || X === "value") && r(A, X, Pe, Se, y, b);
        }
      }
      M & 1 && f.children !== h.children && l(A, h.children);
    } else !E && C == null && x(A, P, N, b, y);
    ((W = N.onVnodeUpdated) || $) && Le(() => {
      W && Ye(W, b, h, f), $ && vt(h, f, b, "updated");
    }, v);
  }, T = (f, h, b, v, y, _, E) => {
    for (let A = 0; A < h.length; A++) {
      const M = f[A], C = h[A], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        M.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (M.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Xe(M, C) || // - In the case of a component, it could contain anything.
        M.shapeFlag & 70) ? d(M.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      S(
        M,
        C,
        $,
        null,
        v,
        y,
        _,
        E,
        !0
      );
    }
  }, x = (f, h, b, v, y) => {
    if (h !== b) {
      if (h !== Y)
        for (const _ in h)
          !bn(_) && !(_ in b) && r(
            f,
            _,
            h[_],
            null,
            y,
            v
          );
      for (const _ in b) {
        if (bn(_)) continue;
        const E = b[_], A = h[_];
        E !== A && _ !== "value" && r(f, _, A, E, y, v);
      }
      "value" in b && r(f, "value", h.value, b.value, y);
    }
  }, w = (f, h, b, v, y, _, E, A, M) => {
    const C = h.el = f ? f.el : a(""), $ = h.anchor = f ? f.anchor : a("");
    let { patchFlag: P, dynamicChildren: N, slotScopeIds: W } = h;
    W && (A = A ? A.concat(W) : W), f == null ? (s(C, b, v), s($, b, v), z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      b,
      $,
      y,
      _,
      E,
      A,
      M
    )) : P > 0 && P & 64 && N && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (T(
      f.dynamicChildren,
      N,
      b,
      y,
      _,
      E,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || y && h === y.subTree) && ta(
      f,
      h,
      !0
      /* shallow */
    )) : G(
      f,
      h,
      b,
      $,
      y,
      _,
      E,
      A,
      M
    );
  }, K = (f, h, b, v, y, _, E, A, M) => {
    h.slotScopeIds = A, f == null ? h.shapeFlag & 512 ? y.ctx.activate(
      h,
      b,
      v,
      E,
      M
    ) : B(
      h,
      b,
      v,
      y,
      _,
      E,
      M
    ) : oe(f, h, M);
  }, B = (f, h, b, v, y, _, E) => {
    const A = f.component = Ql(
      f,
      v,
      y
    );
    if (Ln(f) && (A.ctx.renderer = an), Xl(A, !1, E), A.asyncDep) {
      if (y && y.registerDep(A, Z, E), !f.el) {
        const M = A.subTree = ge(ye);
        I(null, M, h, b);
      }
    } else
      Z(
        A,
        f,
        h,
        b,
        y,
        _,
        E
      );
  }, oe = (f, h, b) => {
    const v = h.component = f.component;
    if (Fl(f, h, b))
      if (v.asyncDep && !v.asyncResolved) {
        ee(v, h, b);
        return;
      } else
        v.next = h, v.update();
    else
      h.el = f.el, v.vnode = h;
  }, Z = (f, h, b, v, y, _, E) => {
    const A = () => {
      if (f.isMounted) {
        let { next: P, bu: N, u: W, parent: J, vnode: se } = f;
        {
          const ke = na(f);
          if (ke) {
            P && (P.el = se.el, ee(f, P, E)), ke.asyncDep.then(() => {
              f.isUnmounted || A();
            });
            return;
          }
        }
        let X = P, Pe;
        Ct(f, !1), P ? (P.el = se.el, ee(f, P, E)) : P = se, N && Yn(N), (Pe = P.props && P.props.onVnodeBeforeUpdate) && Ye(Pe, J, P, se), Ct(f, !0);
        const Se = Js(f), Ve = f.subTree;
        f.subTree = Se, S(
          Ve,
          Se,
          // parent may have changed if it's in a teleport
          d(Ve.el),
          // anchor may have changed if it's in a fragment
          Hn(Ve),
          f,
          y,
          _
        ), P.el = Se.el, X === null && Ni(f, Se.el), W && Le(W, y), (Pe = P.props && P.props.onVnodeUpdated) && Le(
          () => Ye(Pe, J, P, se),
          y
        ), Eo(f);
      } else {
        let P;
        const { el: N, props: W } = h, { bm: J, m: se, parent: X, root: Pe, type: Se } = f, Ve = Kt(h);
        if (Ct(f, !1), J && Yn(J), !Ve && (P = W && W.onVnodeBeforeMount) && Ye(P, X, h), Ct(f, !0), N && Gi) {
          const ke = () => {
            f.subTree = Js(f), Gi(
              N,
              f.subTree,
              f,
              y,
              null
            );
          };
          Ve && Se.__asyncHydrate ? Se.__asyncHydrate(
            N,
            f,
            ke
          ) : ke();
        } else {
          Pe.ce && Pe.ce._injectChildStyle(Se);
          const ke = f.subTree = Js(f);
          S(
            null,
            ke,
            b,
            v,
            f,
            y,
            _
          ), h.el = ke.el;
        }
        if (se && Le(se, y), !Ve && (P = W && W.onVnodeMounted)) {
          const ke = h;
          Le(
            () => Ye(P, X, ke),
            y
          );
        }
        (h.shapeFlag & 256 || X && Kt(X.vnode) && X.vnode.shapeFlag & 256) && f.a && Le(f.a, y), f.isMounted = !0, Wc(f), h = b = v = null;
      }
    };
    f.scope.on();
    const M = f.effect = new no(A);
    f.scope.off();
    const C = f.update = M.run.bind(M), $ = f.job = M.runIfDirty.bind(M);
    $.i = f, $.id = f.uid, M.scheduler = () => ki($), Ct(f, !0), C();
  }, ee = (f, h, b) => {
    h.component = f;
    const v = f.vnode.props;
    f.vnode = h, f.next = null, vl(f, h.props, v, b), Al(f, h.children, b), yt(), er(f), St();
  }, G = (f, h, b, v, y, _, E, A, M = !1) => {
    const C = f && f.children, $ = f ? f.shapeFlag : 0, P = h.children, { patchFlag: N, shapeFlag: W } = h;
    if (N > 0) {
      if (N & 128) {
        $n(
          C,
          P,
          b,
          v,
          y,
          _,
          E,
          A,
          M
        );
        return;
      } else if (N & 256) {
        fe(
          C,
          P,
          b,
          v,
          y,
          _,
          E,
          A,
          M
        );
        return;
      }
    }
    W & 8 ? ($ & 16 && on(C, y, _), P !== C && l(b, P)) : $ & 16 ? W & 16 ? $n(
      C,
      P,
      b,
      v,
      y,
      _,
      E,
      A,
      M
    ) : on(C, y, _, !0) : ($ & 8 && l(b, ""), W & 16 && z(
      P,
      b,
      v,
      y,
      _,
      E,
      A,
      M
    ));
  }, fe = (f, h, b, v, y, _, E, A, M) => {
    f = f || Ht, h = h || Ht;
    const C = f.length, $ = h.length, P = Math.min(C, $);
    let N;
    for (N = 0; N < P; N++) {
      const W = h[N] = M ? gt(h[N]) : je(h[N]);
      S(
        f[N],
        W,
        b,
        null,
        y,
        _,
        E,
        A,
        M
      );
    }
    C > $ ? on(
      f,
      y,
      _,
      !0,
      !1,
      P
    ) : z(
      h,
      b,
      v,
      y,
      _,
      E,
      A,
      M,
      P
    );
  }, $n = (f, h, b, v, y, _, E, A, M) => {
    let C = 0;
    const $ = h.length;
    let P = f.length - 1, N = $ - 1;
    for (; C <= P && C <= N; ) {
      const W = f[C], J = h[C] = M ? gt(h[C]) : je(h[C]);
      if (Xe(W, J))
        S(
          W,
          J,
          b,
          null,
          y,
          _,
          E,
          A,
          M
        );
      else
        break;
      C++;
    }
    for (; C <= P && C <= N; ) {
      const W = f[P], J = h[N] = M ? gt(h[N]) : je(h[N]);
      if (Xe(W, J))
        S(
          W,
          J,
          b,
          null,
          y,
          _,
          E,
          A,
          M
        );
      else
        break;
      P--, N--;
    }
    if (C > P) {
      if (C <= N) {
        const W = N + 1, J = W < $ ? h[W].el : v;
        for (; C <= N; )
          S(
            null,
            h[C] = M ? gt(h[C]) : je(h[C]),
            b,
            J,
            y,
            _,
            E,
            A,
            M
          ), C++;
      }
    } else if (C > N)
      for (; C <= P; )
        Ge(f[C], y, _, !0), C++;
    else {
      const W = C, J = C, se = /* @__PURE__ */ new Map();
      for (C = J; C <= N; C++) {
        const Re = h[C] = M ? gt(h[C]) : je(h[C]);
        Re.key != null && se.set(Re.key, C);
      }
      let X, Pe = 0;
      const Se = N - J + 1;
      let Ve = !1, ke = 0;
      const cn = new Array(Se);
      for (C = 0; C < Se; C++) cn[C] = 0;
      for (C = W; C <= P; C++) {
        const Re = f[C];
        if (Pe >= Se) {
          Ge(Re, y, _, !0);
          continue;
        }
        let Be;
        if (Re.key != null)
          Be = se.get(Re.key);
        else
          for (X = J; X <= N; X++)
            if (cn[X - J] === 0 && Xe(Re, h[X])) {
              Be = X;
              break;
            }
        Be === void 0 ? Ge(Re, y, _, !0) : (cn[Be - J] = C + 1, Be >= ke ? ke = Be : Ve = !0, S(
          Re,
          h[Be],
          b,
          null,
          y,
          _,
          E,
          A,
          M
        ), Pe++);
      }
      const Bi = Ve ? Ol(cn) : Ht;
      for (X = Bi.length - 1, C = Se - 1; C >= 0; C--) {
        const Re = J + C, Be = h[Re], Yi = Re + 1 < $ ? h[Re + 1].el : v;
        cn[C] === 0 ? S(
          null,
          Be,
          b,
          Yi,
          y,
          _,
          E,
          A,
          M
        ) : Ve && (X < 0 || C !== Bi[X] ? _t(Be, b, Yi, 2) : X--);
      }
    }
  }, _t = (f, h, b, v, y = null) => {
    const { el: _, type: E, transition: A, children: M, shapeFlag: C } = f;
    if (C & 6) {
      _t(f.component.subTree, h, b, v);
      return;
    }
    if (C & 128) {
      f.suspense.move(h, b, v);
      return;
    }
    if (C & 64) {
      E.move(f, h, b, an);
      return;
    }
    if (E === de) {
      s(_, h, b);
      for (let P = 0; P < M.length; P++)
        _t(M[P], h, b, v);
      s(f.anchor, h, b);
      return;
    }
    if (E === _n) {
      F(f, h, b);
      return;
    }
    if (v !== 2 && C & 1 && A)
      if (v === 0)
        A.beforeEnter(_), s(_, h, b), Le(() => A.enter(_), y);
      else {
        const { leave: P, delayLeave: N, afterLeave: W } = A, J = () => s(_, h, b), se = () => {
          P(_, () => {
            J(), W && W();
          });
        };
        N ? N(_, J, se) : se();
      }
    else
      s(_, h, b);
  }, Ge = (f, h, b, v = !1, y = !1) => {
    const {
      type: _,
      props: E,
      ref: A,
      children: M,
      dynamicChildren: C,
      shapeFlag: $,
      patchFlag: P,
      dirs: N,
      cacheIndex: W
    } = f;
    if (P === -2 && (y = !1), A != null && ls(A, null, b, f, !0), W != null && (h.renderCache[W] = void 0), $ & 256) {
      h.ctx.deactivate(f);
      return;
    }
    const J = $ & 1 && N, se = !Kt(f);
    let X;
    if (se && (X = E && E.onVnodeBeforeUnmount) && Ye(X, h, f), $ & 6)
      Ha(f.component, b, v);
    else {
      if ($ & 128) {
        f.suspense.unmount(b, v);
        return;
      }
      J && vt(f, null, h, "beforeUnmount"), $ & 64 ? f.type.remove(
        f,
        h,
        b,
        an,
        v
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== de || P > 0 && P & 64) ? on(
        C,
        h,
        b,
        !1,
        !0
      ) : (_ === de && P & 384 || !y && $ & 16) && on(M, h, b), v && Ki(f);
    }
    (se && (X = E && E.onVnodeUnmounted) || J) && Le(() => {
      X && Ye(X, h, f), J && vt(f, null, h, "unmounted");
    }, b);
  }, Ki = (f) => {
    const { type: h, el: b, anchor: v, transition: y } = f;
    if (h === de) {
      $a(b, v);
      return;
    }
    if (h === _n) {
      k(f);
      return;
    }
    const _ = () => {
      i(b), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (f.shapeFlag & 1 && y && !y.persisted) {
      const { leave: E, delayLeave: A } = y, M = () => E(b, _);
      A ? A(f.el, _, M) : M();
    } else
      _();
  }, $a = (f, h) => {
    let b;
    for (; f !== h; )
      b = p(f), i(f), f = b;
    i(h);
  }, Ha = (f, h, b) => {
    const { bum: v, scope: y, job: _, subTree: E, um: A, m: M, a: C } = f;
    lr(M), lr(C), v && Yn(v), y.stop(), _ && (_.flags |= 8, Ge(E, f, h, b)), A && Le(A, h), Le(() => {
      f.isUnmounted = !0;
    }, h), h && h.pendingBranch && !h.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve()), qc(f);
  }, on = (f, h, b, v = !1, y = !1, _ = 0) => {
    for (let E = _; E < f.length; E++)
      Ge(f[E], h, b, v, y);
  }, Hn = (f) => {
    if (f.shapeFlag & 6)
      return Hn(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const h = p(f.anchor || f.el), b = h && h[Bc];
    return b ? p(b) : h;
  };
  let Ns = !1;
  const qi = (f, h, b) => {
    f == null ? h._vnode && Ge(h._vnode, null, null, !0) : S(
      h._vnode || null,
      f,
      h,
      null,
      null,
      null,
      b
    ), h._vnode = f, Ns || (Ns = !0, er(), Ao(), Ns = !1);
  }, an = {
    p: S,
    um: Ge,
    m: _t,
    r: Ki,
    mt: B,
    mc: z,
    pc: G,
    pbc: T,
    n: Hn,
    o: e
  };
  let Ji, Gi;
  return {
    render: qi,
    hydrate: Ji,
    createApp: ml(qi, Ji)
  };
}
function qs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ct({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function El(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ta(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (U(s) && U(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let a = i[r];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[r] = gt(i[r]), a.el = o.el), !n && a.patchFlag !== -2 && ta(o, a)), a.type === Un && (a.el = o.el);
    }
}
function Ol(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, a;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        a = r + o >> 1, e[n[a]] < u ? r = a + 1 : o = a;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function na(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : na(t);
}
function lr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Il = Symbol.for("v-scx"), Pl = () => Jt(Il);
function Kd(e, t) {
  return Ps(e, null, t);
}
function kl(e, t) {
  return Ps(
    e,
    null,
    { flush: "sync" }
  );
}
function lt(e, t, n) {
  return Ps(e, t, n);
}
function Ps(e, t, n = Y) {
  const { immediate: s, deep: i, flush: r, once: o } = n, a = ue({}, n), c = t && s || !t && r !== "post";
  let u;
  if (tn) {
    if (r === "sync") {
      const g = Pl();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {
      };
      return g.stop = We, g.resume = We, g.pause = We, g;
    }
  }
  const l = he;
  a.call = (g, m, S) => Je(g, l, m, S);
  let d = !1;
  r === "post" ? a.scheduler = (g) => {
    Le(g, l && l.suspense);
  } : r !== "sync" && (d = !0, a.scheduler = (g, m) => {
    m ? g() : ki(g);
  }), a.augmentJob = (g) => {
    t && (g.flags |= 4), d && (g.flags |= 2, l && (g.id = l.uid, g.i = l));
  };
  const p = Fc(e, t, a);
  return tn && (u ? u.push(p) : c && p()), p;
}
function Rl(e, t, n) {
  const s = this.proxy, i = ce(e) ? e.includes(".") ? sa(s, e) : () => s[e] : e.bind(s, s);
  let r;
  H(t) ? r = t : (r = t.handler, n = t);
  const o = Nn(this), a = Ps(i, r.bind(s), n);
  return o(), a;
}
function sa(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function qd(e, t, n = Y) {
  const s = Rs(), i = Ue(t), r = ut(t), o = ia(e, i), a = Pc((c, u) => {
    let l, d = Y, p;
    return kl(() => {
      const g = e[i];
      Ee(l, g) && (l = g, u());
    }), {
      get() {
        return c(), n.get ? n.get(l) : l;
      },
      set(g) {
        const m = n.set ? n.set(g) : g;
        if (!Ee(m, l) && !(d !== Y && Ee(g, d)))
          return;
        const S = s.vnode.props;
        S && // check if parent has passed v-model
        (t in S || i in S || r in S) && (`onUpdate:${t}` in S || `onUpdate:${i}` in S || `onUpdate:${r}` in S) || (l = g, u()), s.emit(`update:${t}`, m), Ee(g, m) && Ee(g, d) && !Ee(m, p) && u(), d = g, p = m;
      }
    };
  });
  return a[Symbol.iterator] = () => {
    let c = 0;
    return {
      next() {
        return c < 2 ? { value: c++ ? o || Y : a, done: !1 } : { done: !0 };
      }
    };
  }, a;
}
const ia = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${ut(t)}Modifiers`];
function Ll(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Y;
  let i = n;
  const r = t.startsWith("update:"), o = r && ia(s, t.slice(7));
  o && (o.trim && (i = n.map((l) => ce(l) ? l.trim() : l)), o.number && (i = n.map(Zs))), Jc(e, t, i);
  let a, c = s[a = Bn(t)] || // also try camelCase event handler (#2249)
  s[a = Bn(Ue(t))];
  !c && r && (c = s[a = Bn(ut(t))]), c && Je(
    c,
    e,
    6,
    i
  );
  const u = s[a + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Je(
      u,
      e,
      6,
      i
    );
  }
}
function ra(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, a = !1;
  if (!H(e)) {
    const c = (u) => {
      const l = ra(u, t, !0);
      l && (a = !0, ue(o, l));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !a ? (ne(e) && s.set(e, null), null) : (U(r) ? r.forEach((c) => o[c] = null) : ue(o, r), ne(e) && s.set(e, o), o);
}
function ks(e, t) {
  return !e || !Ss(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, ut(t)) || Q(e, t));
}
function Js(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: a,
    emit: c,
    render: u,
    renderCache: l,
    props: d,
    data: p,
    setupState: g,
    ctx: m,
    inheritAttrs: S
  } = e, R = cs(e);
  let I, V;
  try {
    if (n.shapeFlag & 4) {
      const k = i || s, O = k;
      I = je(
        u.call(
          O,
          k,
          l,
          d,
          g,
          p,
          m
        )
      ), V = a;
    } else {
      const k = t;
      I = je(
        k.length > 1 ? k(
          d,
          { attrs: a, slots: o, emit: c }
        ) : k(
          d,
          null
        )
      ), V = t.props ? a : Ul(a);
    }
  } catch (k) {
    vn.length = 0, rn(k, e, 1), I = ge(ye);
  }
  let F = I;
  if (V && S !== !1) {
    const k = Object.keys(V), { shapeFlag: O } = F;
    k.length && O & 7 && (r && k.some(wi) && (V = Nl(
      V,
      r
    )), F = mt(F, V, !1, !0));
  }
  return n.dirs && (F = mt(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition && En(F, n.transition), I = F, cs(R), I;
}
function Dl(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (Zt(i)) {
      if (i.type !== ye || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const Ul = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ss(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Nl = (e, t) => {
  const n = {};
  for (const s in e)
    (!wi(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Fl(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: a, patchFlag: c } = t, u = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? ur(s, o, u) : !!o;
    if (c & 8) {
      const l = t.dynamicProps;
      for (let d = 0; d < l.length; d++) {
        const p = l[d];
        if (o[p] !== s[p] && !ks(u, p))
          return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? ur(s, o, u) : !0 : !!o;
  return !1;
}
function ur(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !ks(n, r))
      return !0;
  }
  return !1;
}
function Ni({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const oa = (e) => e.__isSuspense;
let ui = 0;
const Vl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, n, s, i, r, o, a, c, u) {
    if (e == null)
      $l(
        t,
        n,
        s,
        i,
        r,
        o,
        a,
        c,
        u
      );
    else {
      if (r && r.deps > 0 && !e.suspense.isInFallback) {
        t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
        return;
      }
      Hl(
        e,
        t,
        n,
        s,
        i,
        o,
        a,
        c,
        u
      );
    }
  },
  hydrate: jl,
  normalize: Wl
}, Jd = Vl;
function On(e, t) {
  const n = e.props && e.props[t];
  H(n) && n();
}
function $l(e, t, n, s, i, r, o, a, c) {
  const {
    p: u,
    o: { createElement: l }
  } = c, d = l("div"), p = e.suspense = aa(
    e,
    i,
    s,
    t,
    d,
    n,
    r,
    o,
    a,
    c
  );
  u(
    null,
    p.pendingBranch = e.ssContent,
    d,
    null,
    s,
    p,
    r,
    o
  ), p.deps > 0 ? (On(e, "onPending"), On(e, "onFallback"), u(
    null,
    e.ssFallback,
    t,
    n,
    s,
    null,
    // fallback tree will not have suspense context
    r,
    o
  ), Gt(p, e.ssFallback)) : p.resolve(!1, !0);
}
function Hl(e, t, n, s, i, r, o, a, { p: c, um: u, o: { createElement: l } }) {
  const d = t.suspense = e.suspense;
  d.vnode = t, t.el = e.el;
  const p = t.ssContent, g = t.ssFallback, { activeBranch: m, pendingBranch: S, isInFallback: R, isHydrating: I } = d;
  if (S)
    d.pendingBranch = p, Xe(p, S) ? (c(
      S,
      p,
      d.hiddenContainer,
      null,
      i,
      d,
      r,
      o,
      a
    ), d.deps <= 0 ? d.resolve() : R && (I || (c(
      m,
      g,
      n,
      s,
      i,
      null,
      // fallback tree will not have suspense context
      r,
      o,
      a
    ), Gt(d, g)))) : (d.pendingId = ui++, I ? (d.isHydrating = !1, d.activeBranch = S) : u(S, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = l("div"), R ? (c(
      null,
      p,
      d.hiddenContainer,
      null,
      i,
      d,
      r,
      o,
      a
    ), d.deps <= 0 ? d.resolve() : (c(
      m,
      g,
      n,
      s,
      i,
      null,
      // fallback tree will not have suspense context
      r,
      o,
      a
    ), Gt(d, g))) : m && Xe(p, m) ? (c(
      m,
      p,
      n,
      s,
      i,
      d,
      r,
      o,
      a
    ), d.resolve(!0)) : (c(
      null,
      p,
      d.hiddenContainer,
      null,
      i,
      d,
      r,
      o,
      a
    ), d.deps <= 0 && d.resolve()));
  else if (m && Xe(p, m))
    c(
      m,
      p,
      n,
      s,
      i,
      d,
      r,
      o,
      a
    ), Gt(d, p);
  else if (On(t, "onPending"), d.pendingBranch = p, p.shapeFlag & 512 ? d.pendingId = p.component.suspenseId : d.pendingId = ui++, c(
    null,
    p,
    d.hiddenContainer,
    null,
    i,
    d,
    r,
    o,
    a
  ), d.deps <= 0)
    d.resolve();
  else {
    const { timeout: V, pendingId: F } = d;
    V > 0 ? setTimeout(() => {
      d.pendingId === F && d.fallback(g);
    }, V) : V === 0 && d.fallback(g);
  }
}
function aa(e, t, n, s, i, r, o, a, c, u, l = !1) {
  const {
    p: d,
    m: p,
    um: g,
    n: m,
    o: { parentNode: S, remove: R }
  } = u;
  let I;
  const V = ql(e);
  V && t && t.pendingBranch && (I = t.pendingId, t.deps++);
  const F = e.props ? Br(e.props.timeout) : void 0, k = r, O = {
    vnode: e,
    parent: t,
    parentComponent: n,
    namespace: o,
    container: s,
    hiddenContainer: i,
    deps: 0,
    pendingId: ui++,
    timeout: typeof F == "number" ? F : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !l,
    isHydrating: l,
    isUnmounted: !1,
    effects: [],
    resolve(D = !1, j = !1) {
      const {
        vnode: z,
        activeBranch: L,
        pendingBranch: T,
        pendingId: x,
        effects: w,
        parentComponent: K,
        container: B
      } = O;
      let oe = !1;
      O.isHydrating ? O.isHydrating = !1 : D || (oe = L && T.transition && T.transition.mode === "out-in", oe && (L.transition.afterLeave = () => {
        x === O.pendingId && (p(
          T,
          B,
          r === k ? m(L) : r,
          0
        ), as(w));
      }), L && (S(L.el) === B && (r = m(L)), g(L, K, O, !0)), oe || p(T, B, r, 0)), Gt(O, T), O.pendingBranch = null, O.isInFallback = !1;
      let Z = O.parent, ee = !1;
      for (; Z; ) {
        if (Z.pendingBranch) {
          Z.effects.push(...w), ee = !0;
          break;
        }
        Z = Z.parent;
      }
      !ee && !oe && as(w), O.effects = [], V && t && t.pendingBranch && I === t.pendingId && (t.deps--, t.deps === 0 && !j && t.resolve()), On(z, "onResolve");
    },
    fallback(D) {
      if (!O.pendingBranch)
        return;
      const { vnode: j, activeBranch: z, parentComponent: L, container: T, namespace: x } = O;
      On(j, "onFallback");
      const w = m(z), K = () => {
        O.isInFallback && (d(
          null,
          D,
          T,
          w,
          L,
          null,
          // fallback tree will not have suspense context
          x,
          a,
          c
        ), Gt(O, D));
      }, B = D.transition && D.transition.mode === "out-in";
      B && (z.transition.afterLeave = K), O.isInFallback = !0, g(
        z,
        L,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), B || K();
    },
    move(D, j, z) {
      O.activeBranch && p(O.activeBranch, D, j, z), O.container = D;
    },
    next() {
      return O.activeBranch && m(O.activeBranch);
    },
    registerDep(D, j, z) {
      const L = !!O.pendingBranch;
      L && O.deps++;
      const T = D.vnode.el;
      D.asyncDep.catch((x) => {
        rn(x, D, 0);
      }).then((x) => {
        if (D.isUnmounted || O.isUnmounted || O.pendingId !== D.suspenseId)
          return;
        D.asyncResolved = !0;
        const { vnode: w } = D;
        di(D, x, !1), T && (w.el = T);
        const K = !T && D.subTree.el;
        j(
          D,
          w,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          S(T || D.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          T ? null : m(D.subTree),
          O,
          o,
          z
        ), K && R(K), Ni(D, w.el), L && --O.deps === 0 && O.resolve();
      });
    },
    unmount(D, j) {
      O.isUnmounted = !0, O.activeBranch && g(
        O.activeBranch,
        n,
        D,
        j
      ), O.pendingBranch && g(
        O.pendingBranch,
        n,
        D,
        j
      );
    }
  };
  return O;
}
function jl(e, t, n, s, i, r, o, a, c) {
  const u = t.suspense = aa(
    t,
    s,
    n,
    e.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    i,
    r,
    o,
    a,
    !0
  ), l = c(
    e,
    u.pendingBranch = t.ssContent,
    n,
    u,
    r,
    o
  );
  return u.deps === 0 && u.resolve(!1, !0), l;
}
function Wl(e) {
  const { shapeFlag: t, children: n } = e, s = t & 32;
  e.ssContent = fr(
    s ? n.default : n
  ), e.ssFallback = s ? fr(n.fallback) : ge(ye);
}
function fr(e) {
  let t;
  if (H(e)) {
    const n = Qt && e._c;
    n && (e._d = !1, le()), e = e(), n && (e._d = !0, t = Oe, ca());
  }
  return U(e) && (e = Dl(e)), e = je(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)), e;
}
function Kl(e, t) {
  t && t.pendingBranch ? U(e) ? t.effects.push(...e) : t.effects.push(e) : as(e);
}
function Gt(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: s } = e;
  let i = t.el;
  for (; !i && t.component; )
    t = t.component.subTree, i = t.el;
  n.el = i, s && s.subTree === n && (s.vnode.el = i, Ni(s, i));
}
function ql(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const de = Symbol.for("v-fgt"), Un = Symbol.for("v-txt"), ye = Symbol.for("v-cmt"), _n = Symbol.for("v-stc"), vn = [];
let Oe = null;
function le(e = !1) {
  vn.push(Oe = e ? null : []);
}
function ca() {
  vn.pop(), Oe = vn[vn.length - 1] || null;
}
let Qt = 1;
function dr(e, t = !1) {
  Qt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function la(e) {
  return e.dynamicChildren = Qt > 0 ? Oe || Ht : null, ca(), Qt > 0 && Oe && Oe.push(e), e;
}
function Te(e, t, n, s, i, r) {
  return la(
    at(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function Xt(e, t, n, s, i) {
  return la(
    ge(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function Zt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Xe(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ua = ({ key: e }) => e ?? null, zn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ce(e) || ae(e) || H(e) ? { i: pe, r: e, k: t, f: !!n } : e : null);
function at(e, t = null, n = null, s = 0, i = null, r = e === de ? 0 : 1, o = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ua(t),
    ref: t && zn(t),
    scopeId: Oo,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: pe
  };
  return a ? (Fi(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= ce(n) ? 8 : 16), Qt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Oe.push(c), c;
}
const ge = Jl;
function Jl(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === $o) && (e = ye), Zt(e)) {
    const a = mt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Fi(a, n), Qt > 0 && !r && Oe && (a.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = a : Oe.push(a)), a.patchFlag = -2, a;
  }
  if (nu(e) && (e = e.__vccOpts), t) {
    t = Gl(t);
    let { class: a, style: c } = t;
    a && !ce(a) && (t.class = Pt(a)), ne(c) && (Pi(c) && !U(c) && (c = ue({}, c)), t.style = Ms(c));
  }
  const o = ce(e) ? 1 : oa(e) ? 128 : Io(e) ? 64 : ne(e) ? 4 : H(e) ? 2 : 0;
  return at(
    e,
    t,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function Gl(e) {
  return e ? Pi(e) || Bo(e) ? ue({}, e) : e : null;
}
function mt(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: a, transition: c } = e, u = t ? Bl(i || {}, t) : i, l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && ua(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? U(r) ? r.concat(zn(t)) : [r, zn(t)] : zn(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && En(
    l,
    c.clone(l)
  ), l;
}
function gn(e = " ", t = 0) {
  return ge(Un, null, e, t);
}
function en(e = "", t = !1) {
  return t ? (le(), Xt(ye, null, e)) : ge(ye, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean" ? ge(ye) : U(e) ? ge(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Zt(e) ? gt(e) : ge(Un, null, String(e));
}
function gt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : mt(e);
}
function Fi(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (U(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Fi(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !Bo(t) ? t._ctx = pe : i === 3 && pe && (pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else H(t) ? (t = { default: t, _ctx: pe }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [gn(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Bl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Pt([t.class, s.class]));
      else if (i === "style")
        t.style = Ms([t.style, s.style]);
      else if (Ss(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(U(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ye(e, t, n, s = null) {
  Je(e, t, 7, [
    n,
    s
  ]);
}
const Yl = qo();
let zl = 0;
function Ql(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Yl, r = {
    uid: zl++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Zr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: zo(s, i),
    emitsOptions: ra(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Y,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Y,
    data: Y,
    props: Y,
    attrs: Y,
    slots: Y,
    refs: Y,
    setupState: Y,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Ll.bind(null, r), e.ce && e.ce(r), r;
}
let he = null;
const Rs = () => he || pe;
let ds, fi;
{
  const e = ws(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  ds = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => he = n
  ), fi = t(
    "__VUE_SSR_SETTERS__",
    (n) => tn = n
  );
}
const Nn = (e) => {
  const t = he;
  return ds(e), e.scope.on(), () => {
    e.scope.off(), ds(t);
  };
}, hr = () => {
  he && he.scope.off(), ds(null);
};
function fa(e) {
  return e.vnode.shapeFlag & 4;
}
let tn = !1;
function Xl(e, t = !1, n = !1) {
  t && fi(t);
  const { props: s, children: i } = e.vnode, r = fa(e);
  _l(e, s, r, t), Ml(e, i, n);
  const o = r ? Zl(e, t) : void 0;
  return t && fi(!1), o;
}
function Zl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ul);
  const { setup: s } = n;
  if (s) {
    yt();
    const i = e.setupContext = s.length > 1 ? ha(e) : null, r = Nn(e), o = kn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), a = qr(o);
    if (St(), r(), (a || e.sp) && !Kt(e) && Li(e), a) {
      if (o.then(hr, hr), t)
        return o.then((c) => {
          di(e, c, t);
        }).catch((c) => {
          rn(c, e, 0);
        });
      e.asyncDep = o;
    } else
      di(e, o, t);
  } else
    da(e, t);
}
function di(e, t, n) {
  H(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ne(t) && (e.devtoolsRawSetupState = t, e.setupState = So(t)), da(e, n);
}
let pr;
function da(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && pr && !s.render) {
      const i = s.template || Di(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: a, compilerOptions: c } = s, u = ue(
          ue(
            {
              isCustomElement: r,
              delimiters: a
            },
            o
          ),
          c
        );
        s.render = pr(i, u);
      }
    }
    e.render = s.render || We;
  }
  {
    const i = Nn(e);
    yt();
    try {
      fl(e);
    } finally {
      St(), i();
    }
  }
}
const eu = {
  get(e, t) {
    return ve(e, "get", ""), e[t];
  }
};
function ha(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, eu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ls(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(So(Yt(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Sn)
        return Sn[n](e);
    },
    has(t, n) {
      return n in t || n in Sn;
    }
  })) : e.proxy;
}
function tu(e, t = !0) {
  return H(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nu(e) {
  return H(e) && "__vccOpts" in e;
}
const Ie = (e, t) => Uc(e, t, tn);
function It(e, t, n) {
  const s = arguments.length;
  return s === 2 ? ne(t) && !U(t) ? Zt(t) ? ge(e, null, [t]) : ge(e, t) : ge(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Zt(n) && (n = [n]), ge(e, t, n));
}
const gr = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let hi;
const br = typeof window < "u" && window.trustedTypes;
if (br)
  try {
    hi = /* @__PURE__ */ br.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const pa = hi ? (e) => hi.createHTML(e) : (e) => e, su = "http://www.w3.org/2000/svg", iu = "http://www.w3.org/1998/Math/MathML", st = typeof document < "u" ? document : null, mr = st && /* @__PURE__ */ st.createElement("template"), ru = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? st.createElementNS(su, e) : t === "mathml" ? st.createElementNS(iu, e) : n ? st.createElement(e, { is: n }) : st.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => st.createTextNode(e),
  createComment: (e) => st.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => st.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      mr.innerHTML = pa(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = mr.content;
      if (s === "svg" || s === "mathml") {
        const c = a.firstChild;
        for (; c.firstChild; )
          a.appendChild(c.firstChild);
        a.removeChild(c);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, dt = "transition", un = "animation", In = Symbol("_vtc"), ga = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, ou = /* @__PURE__ */ ue(
  {},
  Po,
  ga
), au = (e) => (e.displayName = "Transition", e.props = ou, e), Gd = /* @__PURE__ */ au(
  (e, { slots: t }) => It(Qc, cu(e), t)
), wt = (e, t = []) => {
  U(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, yr = (e) => e ? U(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function cu(e) {
  const t = {};
  for (const w in e)
    w in ga || (t[w] = e[w]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: i,
    enterFromClass: r = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: a = `${n}-enter-to`,
    appearFromClass: c = r,
    appearActiveClass: u = o,
    appearToClass: l = a,
    leaveFromClass: d = `${n}-leave-from`,
    leaveActiveClass: p = `${n}-leave-active`,
    leaveToClass: g = `${n}-leave-to`
  } = e, m = lu(i), S = m && m[0], R = m && m[1], {
    onBeforeEnter: I,
    onEnter: V,
    onEnterCancelled: F,
    onLeave: k,
    onLeaveCancelled: O,
    onBeforeAppear: D = I,
    onAppear: j = V,
    onAppearCancelled: z = F
  } = t, L = (w, K, B, oe) => {
    w._enterCancelled = oe, Mt(w, K ? l : a), Mt(w, K ? u : o), B && B();
  }, T = (w, K) => {
    w._isLeaving = !1, Mt(w, d), Mt(w, g), Mt(w, p), K && K();
  }, x = (w) => (K, B) => {
    const oe = w ? j : V, Z = () => L(K, w, B);
    wt(oe, [K, Z]), Sr(() => {
      Mt(K, w ? c : r), tt(K, w ? l : a), yr(oe) || _r(K, s, S, Z);
    });
  };
  return ue(t, {
    onBeforeEnter(w) {
      wt(I, [w]), tt(w, r), tt(w, o);
    },
    onBeforeAppear(w) {
      wt(D, [w]), tt(w, c), tt(w, u);
    },
    onEnter: x(!1),
    onAppear: x(!0),
    onLeave(w, K) {
      w._isLeaving = !0;
      const B = () => T(w, K);
      tt(w, d), w._enterCancelled ? (tt(w, p), wr()) : (wr(), tt(w, p)), Sr(() => {
        w._isLeaving && (Mt(w, d), tt(w, g), yr(k) || _r(w, s, R, B));
      }), wt(k, [w, B]);
    },
    onEnterCancelled(w) {
      L(w, !1, void 0, !0), wt(F, [w]);
    },
    onAppearCancelled(w) {
      L(w, !0, void 0, !0), wt(z, [w]);
    },
    onLeaveCancelled(w) {
      T(w), wt(O, [w]);
    }
  });
}
function lu(e) {
  if (e == null)
    return null;
  if (ne(e))
    return [Gs(e.enter), Gs(e.leave)];
  {
    const t = Gs(e);
    return [t, t];
  }
}
function Gs(e) {
  return Br(e);
}
function tt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[In] || (e[In] = /* @__PURE__ */ new Set())).add(t);
}
function Mt(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[In];
  n && (n.delete(t), n.size || (e[In] = void 0));
}
function Sr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let uu = 0;
function _r(e, t, n, s) {
  const i = e._endId = ++uu, r = () => {
    i === e._endId && s();
  };
  if (n != null)
    return setTimeout(r, n);
  const { type: o, timeout: a, propCount: c } = fu(e, t);
  if (!o)
    return s();
  const u = o + "end";
  let l = 0;
  const d = () => {
    e.removeEventListener(u, p), r();
  }, p = (g) => {
    g.target === e && ++l >= c && d();
  };
  setTimeout(() => {
    l < c && d();
  }, a + 1), e.addEventListener(u, p);
}
function fu(e, t) {
  const n = window.getComputedStyle(e), s = (m) => (n[m] || "").split(", "), i = s(`${dt}Delay`), r = s(`${dt}Duration`), o = vr(i, r), a = s(`${un}Delay`), c = s(`${un}Duration`), u = vr(a, c);
  let l = null, d = 0, p = 0;
  t === dt ? o > 0 && (l = dt, d = o, p = r.length) : t === un ? u > 0 && (l = un, d = u, p = c.length) : (d = Math.max(o, u), l = d > 0 ? o > u ? dt : un : null, p = l ? l === dt ? r.length : c.length : 0);
  const g = l === dt && /\b(transform|all)(,|$)/.test(
    s(`${dt}Property`).toString()
  );
  return {
    type: l,
    timeout: d,
    propCount: p,
    hasTransform: g
  };
}
function vr(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => Cr(n) + Cr(e[s])));
}
function Cr(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function wr() {
  return document.body.offsetHeight;
}
function du(e, t, n) {
  const s = e[In];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const hs = Symbol("_vod"), ba = Symbol("_vsh"), Bd = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[hs] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : fn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), fn(e, !0), s.enter(e)) : s.leave(e, () => {
      fn(e, !1);
    }) : fn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    fn(e, t);
  }
};
function fn(e, t) {
  e.style.display = t ? e[hs] : "none", e[ba] = !t;
}
const ma = Symbol("");
function Yd(e) {
  const t = Rs();
  if (!t)
    return;
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((r) => ps(r, i));
  }, s = () => {
    const i = e(t.proxy);
    t.ce ? ps(t.ce, i) : pi(t.subTree, i), n(i);
  };
  No(() => {
    as(s);
  }), zt(() => {
    lt(s, We, { flush: "post" });
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), Dn(() => i.disconnect());
  });
}
function pi(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      pi(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    ps(e.el, t);
  else if (e.type === de)
    e.children.forEach((n) => pi(n, t));
  else if (e.type === _n) {
    let { el: n, anchor: s } = e;
    for (; n && (ps(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function ps(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let s = "";
    for (const i in t)
      n.setProperty(`--${i}`, t[i]), s += `--${i}: ${t[i]};`;
    n[ma] = s;
  }
}
const hu = /(^|;)\s*display\s*:/;
function pu(e, t, n) {
  const s = e.style, i = ce(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (ce(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && Qn(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && Qn(s, o, "");
    for (const o in n)
      o === "display" && (r = !0), Qn(s, o, n[o]);
  } else if (i) {
    if (t !== n) {
      const o = s[ma];
      o && (n += ";" + o), s.cssText = n, r = hu.test(n);
    }
  } else t && e.removeAttribute("style");
  hs in e && (e[hs] = r ? s.display : "", e[ba] && (s.display = "none"));
}
const Mr = /\s*!important$/;
function Qn(e, t, n) {
  if (U(n))
    n.forEach((s) => Qn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = gu(e, t);
    Mr.test(n) ? e.setProperty(
      ut(s),
      n.replace(Mr, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ar = ["Webkit", "Moz", "ms"], Bs = {};
function gu(e, t) {
  const n = Bs[t];
  if (n)
    return n;
  let s = Ue(t);
  if (s !== "filter" && s in e)
    return Bs[t] = s;
  s = Cs(s);
  for (let i = 0; i < Ar.length; i++) {
    const r = Ar[i] + s;
    if (r in e)
      return Bs[t] = r;
  }
  return t;
}
const xr = "http://www.w3.org/1999/xlink";
function Tr(e, t, n, s, i, r = rc(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(xr, t.slice(6, t.length)) : e.setAttributeNS(xr, t, n) : n == null || r && !Yr(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : qe(n) ? String(n) : n
  );
}
function Er(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? pa(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const a = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Yr(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function Tt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function bu(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Or = Symbol("_vei");
function mu(e, t, n, s, i = null) {
  const r = e[Or] || (e[Or] = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [a, c] = yu(t);
    if (s) {
      const u = r[t] = vu(
        s,
        i
      );
      Tt(e, a, u, c);
    } else o && (bu(e, a, o, c), r[t] = void 0);
  }
}
const Ir = /(?:Once|Passive|Capture)$/;
function yu(e) {
  let t;
  if (Ir.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ir); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ut(e.slice(2)), t];
}
let Ys = 0;
const Su = /* @__PURE__ */ Promise.resolve(), _u = () => Ys || (Su.then(() => Ys = 0), Ys = Date.now());
function vu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Je(
      Cu(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = _u(), n;
}
function Cu(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (i) => !i._stopped && s && s(i)
    );
  } else
    return t;
}
const Pr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, wu = (e, t, n, s, i, r) => {
  const o = i === "svg";
  t === "class" ? du(e, s, o) : t === "style" ? pu(e, n, s) : Ss(t) ? wi(t) || mu(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mu(e, t, s, o)) ? (Er(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Tr(e, t, s, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ce(s)) ? Er(e, Ue(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Tr(e, t, s, o));
};
function Mu(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Pr(t) && H(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Pr(t) && ce(n) ? !1 : t in e;
}
const gs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return U(t) ? (n) => Yn(t, n) : t;
};
function Au(e) {
  e.target.composing = !0;
}
function kr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bt = Symbol("_assign"), zd = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e[Bt] = gs(i);
    const r = s || i.props && i.props.type === "number";
    Tt(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), r && (a = Zs(a)), e[Bt](a);
    }), n && Tt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Tt(e, "compositionstart", Au), Tt(e, "compositionend", kr), Tt(e, "change", kr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (e[Bt] = gs(o), e.composing) return;
    const a = (r || e.type === "number") && !/^0\d/.test(e.value) ? Zs(e.value) : e.value, c = t ?? "";
    a !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === c) || (e.value = c));
  }
}, Qd = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Bt] = gs(n), Tt(e, "change", () => {
      const s = e._modelValue, i = xu(e), r = e.checked, o = e[Bt];
      if (U(s)) {
        const a = zr(s, i), c = a !== -1;
        if (r && !c)
          o(s.concat(i));
        else if (!r && c) {
          const u = [...s];
          u.splice(a, 1), o(u);
        }
      } else if (_s(s)) {
        const a = new Set(s);
        r ? a.add(i) : a.delete(i), o(a);
      } else
        o(ya(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Rr,
  beforeUpdate(e, t, n) {
    e[Bt] = gs(n), Rr(e, t, n);
  }
};
function Rr(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (U(t))
    i = zr(t, s.props.value) > -1;
  else if (_s(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = As(t, ya(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
function xu(e) {
  return "_value" in e ? e._value : e.value;
}
function ya(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Tu = ["ctrl", "shift", "alt", "meta"], Eu = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Tu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Xd = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (i, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const a = Eu[t[o]];
      if (a && a(i, t)) return;
    }
    return e(i, ...r);
  });
}, Ou = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Zd = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (i) => {
    if (!("key" in i))
      return;
    const r = ut(i.key);
    if (t.some(
      (o) => o === r || Ou[o] === r
    ))
      return e(i);
  });
}, Iu = /* @__PURE__ */ ue({ patchProp: wu }, ru);
let Lr;
function Pu() {
  return Lr || (Lr = xl(Iu));
}
const Ds = (...e) => {
  const t = Pu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = Ru(s);
    if (!i) return;
    const r = t._component;
    !H(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, ku(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
};
function ku(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ru(e) {
  return ce(e) ? document.querySelector(e) : e;
}
var Lu = !1;
function Du() {
  return Sa().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Sa() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Uu = typeof Proxy == "function", Nu = "devtools-plugin:setup", Fu = "plugin:settings:set";
let Dt, gi;
function Vu() {
  var e;
  return Dt !== void 0 || (typeof window < "u" && window.performance ? (Dt = !0, gi = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Dt = !0, gi = globalThis.perf_hooks.performance) : Dt = !1), Dt;
}
function $u() {
  return Vu() ? gi.now() : Date.now();
}
class Hu {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const o in t.settings) {
        const a = t.settings[o];
        s[o] = a.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const o = localStorage.getItem(i), a = JSON.parse(o);
      Object.assign(r, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(o) {
        try {
          localStorage.setItem(i, JSON.stringify(o));
        } catch {
        }
        r = o;
      },
      now() {
        return $u();
      }
    }, n && n.on(Fu, (o, a) => {
      o === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (o, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (o, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((u) => {
        this.targetQueue.push({
          method: a,
          args: c,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function _a(e, t) {
  const n = e, s = Sa(), i = Du(), r = Uu && n.enableEarlyProxy;
  if (i && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    i.emit(Nu, e, t);
  else {
    const o = r ? new Hu(n, i) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: o
    }), o && t(o.proxiedTarget);
  }
}
/*!
 * pinia v2.2.6
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let va;
const Fn = (e) => va = e, Ca = (
  /* istanbul ignore next */
  Symbol()
);
function bi(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ze;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ze || (Ze = {}));
const Cn = typeof window < "u", Dr = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function ju(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Vi(e, t, n) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    Aa(s.response, t, n);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function wa(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Xn(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const Zn = typeof navigator == "object" ? navigator : { userAgent: "" }, Ma = /Macintosh/.test(Zn.userAgent) && /AppleWebKit/.test(Zn.userAgent) && !/Safari/.test(Zn.userAgent), Aa = Cn ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ma ? Wu : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Zn ? Ku : (
      // Fallback to using FileReader and a popup
      qu
    )
  )
) : () => {
};
function Wu(e, t = "download", n) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? wa(s.href) ? Vi(e, t, n) : (s.target = "_blank", Xn(s)) : Xn(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    Xn(s);
  }, 0));
}
function Ku(e, t = "download", n) {
  if (typeof e == "string")
    if (wa(e))
      Vi(e, t, n);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        Xn(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(ju(e, n), t);
}
function qu(e, t, n, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Vi(e, t, n);
  const i = e.type === "application/octet-stream", r = /constructor/i.test(String(Dr.HTMLElement)) || "safari" in Dr, o = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((o || i && r || Ma) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let c = a.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = o ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    s ? s.location.assign(a) : location.href = a, s = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function me(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function $i(e) {
  return "_a" in e && "install" in e;
}
function xa() {
  if (!("clipboard" in navigator))
    return me("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Ta(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (me('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Ju(e) {
  if (!xa())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), me("Global state copied to clipboard.");
    } catch (t) {
      if (Ta(t))
        return;
      me("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Gu(e) {
  if (!xa())
    try {
      Ea(e, JSON.parse(await navigator.clipboard.readText())), me("Global state pasted from clipboard.");
    } catch (t) {
      if (Ta(t))
        return;
      me("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Bu(e) {
  try {
    Aa(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    me("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let nt;
function Yu() {
  nt || (nt = document.createElement("input"), nt.type = "file", nt.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      nt.onchange = async () => {
        const s = nt.files;
        if (!s)
          return t(null);
        const i = s.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, nt.oncancel = () => t(null), nt.onerror = n, nt.click();
    });
  }
  return e;
}
async function zu(e) {
  try {
    const n = await Yu()();
    if (!n)
      return;
    const { text: s, file: i } = n;
    Ea(e, JSON.parse(s)), me(`Global state imported from "${i.name}".`);
  } catch (t) {
    me("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Ea(e, t) {
  for (const n in t) {
    const s = e.state.value[n];
    s ? Object.assign(s, t[n]) : e.state.value[n] = t[n];
  }
}
function He(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Oa = "🍍 Pinia (root)", es = "_root";
function Qu(e) {
  return $i(e) ? {
    id: es,
    label: Oa
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Xu(e) {
  if ($i(e)) {
    const n = Array.from(e._s.keys()), s = e._s;
    return {
      state: n.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: n.filter((r) => s.get(r)._getters).map((r) => {
        const o = s.get(r);
        return {
          editable: !1,
          key: r,
          value: o._getters.reduce((a, c) => (a[c] = o[c], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function Zu(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: He(e.type),
    key: He(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function ef(e) {
  switch (e) {
    case Ze.direct:
      return "mutation";
    case Ze.patchFunction:
      return "$patch";
    case Ze.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let $t = !0;
const ts = [], xt = "pinia:mutations", _e = "pinia", { assign: tf } = Object, bs = (e) => "🍍 " + e;
function nf(e, t) {
  _a({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ts,
    app: e
  }, (n) => {
    typeof n.now != "function" && me("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: xt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: _e,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Ju(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Gu(t), n.sendInspectorTree(_e), n.sendInspectorState(_e);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Bu(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await zu(t), n.sendInspectorTree(_e), n.sendInspectorState(_e);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (s) => {
            const i = t._s.get(s);
            i ? typeof i.$reset != "function" ? me(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), me(`Store "${s}" reset.`)) : me(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((s, i) => {
      const r = s.componentInstance && s.componentInstance.proxy;
      if (r && r._pStores) {
        const o = s.componentInstance.proxy._pStores;
        Object.values(o).forEach((a) => {
          s.instanceData.state.push({
            type: bs(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: q(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((c, u) => (c[u] = a.$state[u], c), {})
            )
          }), a._getters && a._getters.length && s.instanceData.state.push({
            type: bs(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((c, u) => {
              try {
                c[u] = a[u];
              } catch (l) {
                c[u] = l;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === _e) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? i.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(s.filter.toLowerCase()) : Oa.toLowerCase().includes(s.filter.toLowerCase())) : i).map(Qu);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === _e) {
        const i = s.nodeId === es ? t : t._s.get(s.nodeId);
        if (!i)
          return;
        i && (s.nodeId !== es && (globalThis.$store = q(i)), s.state = Xu(i));
      }
    }), n.on.editInspectorState((s, i) => {
      if (s.app === e && s.inspectorId === _e) {
        const r = s.nodeId === es ? t : t._s.get(s.nodeId);
        if (!r)
          return me(`store "${s.nodeId}" not found`, "error");
        const { path: o } = s;
        $i(r) ? o.unshift("state") : (o.length !== 1 || !r._customProperties.has(o[0]) || o[0] in r.$state) && o.unshift("$state"), $t = !1, s.set(r, o, s.state.value), $t = !0;
      }
    }), n.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const i = s.type.replace(/^🍍\s*/, ""), r = t._s.get(i);
        if (!r)
          return me(`store "${i}" not found`, "error");
        const { path: o } = s;
        if (o[0] !== "state")
          return me(`Invalid path for store "${i}":
${o}
Only state can be modified.`);
        o[0] = "$state", $t = !1, s.set(r, o, s.state.value), $t = !0;
      }
    });
  });
}
function sf(e, t) {
  ts.includes(bs(t.$id)) || ts.push(bs(t.$id)), _a({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ts,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const s = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: o, onError: a, name: c, args: u }) => {
      const l = Ia++;
      n.addTimelineEvent({
        layerId: xt,
        event: {
          time: s(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: He(t.$id),
            action: He(c),
            args: u
          },
          groupId: l
        }
      }), o((d) => {
        bt = void 0, n.addTimelineEvent({
          layerId: xt,
          event: {
            time: s(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: He(t.$id),
              action: He(c),
              args: u,
              result: d
            },
            groupId: l
          }
        });
      }), a((d) => {
        bt = void 0, n.addTimelineEvent({
          layerId: xt,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: He(t.$id),
              action: He(c),
              args: u,
              error: d
            },
            groupId: l
          }
        });
      });
    }, !0), t._customProperties.forEach((o) => {
      lt(() => Vt(t[o]), (a, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(_e), $t && n.addTimelineEvent({
          layerId: xt,
          event: {
            time: s(),
            title: "Change",
            subtitle: o,
            data: {
              newValue: a,
              oldValue: c
            },
            groupId: bt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: o, type: a }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(_e), !$t)
        return;
      const u = {
        time: s(),
        title: ef(a),
        data: tf({ store: He(t.$id) }, Zu(o)),
        groupId: bt
      };
      a === Ze.patchFunction ? u.subtitle = "⤵️" : a === Ze.patchObject ? u.subtitle = "🧩" : o && !Array.isArray(o) && (u.subtitle = o.type), o && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: o
        }
      }), n.addTimelineEvent({
        layerId: xt,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const i = t._hotUpdate;
    t._hotUpdate = Yt((o) => {
      i(o), n.addTimelineEvent({
        layerId: xt,
        event: {
          time: s(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: He(t.$id),
            info: He("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(_e), n.sendInspectorState(_e);
    });
    const { $dispose: r } = t;
    t.$dispose = () => {
      r(), n.notifyComponentUpdate(), n.sendInspectorTree(_e), n.sendInspectorState(_e), n.getSettings().logStoreChanges && me(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(_e), n.sendInspectorState(_e), n.getSettings().logStoreChanges && me(`"${t.$id}" store installed 🆕`);
  });
}
let Ia = 0, bt;
function Ur(e, t, n) {
  const s = t.reduce((i, r) => (i[r] = q(e)[r], i), {});
  for (const i in s)
    e[i] = function() {
      const r = Ia, o = n ? new Proxy(e, {
        get(...c) {
          return bt = r, Reflect.get(...c);
        },
        set(...c) {
          return bt = r, Reflect.set(...c);
        }
      }) : e;
      bt = r;
      const a = s[i].apply(o, arguments);
      return bt = void 0, a;
    };
}
function rf({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Ur(t, Object.keys(n.actions), t._isOptionsAPI);
      const s = t._hotUpdate;
      q(t)._hotUpdate = function(i) {
        s.apply(this, arguments), Ur(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    sf(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Pa() {
  const e = eo(!0), t = e.run(() => te({}));
  let n = [], s = [];
  const i = Yt({
    install(r) {
      Fn(i), i._a = r, r.provide(Ca, i), r.config.globalProperties.$pinia = i, Cn && nf(r, i), s.forEach((o) => n.push(o)), s = [];
    },
    use(r) {
      return !this._a && !Lu ? s.push(r) : n.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return typeof Proxy < "u" && i.use(rf), i;
}
const ka = () => {
};
function Nr(e, t, n, s = ka) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !n && to() && ac(i), i;
}
function Ut(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const of = (e) => e(), Fr = Symbol(), zs = Symbol();
function mi(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], i = e[n];
    bi(i) && bi(s) && e.hasOwnProperty(n) && !ae(s) && !ct(s) ? e[n] = mi(i, s) : e[n] = s;
  }
  return e;
}
const af = (
  /* istanbul ignore next */
  Symbol()
);
function cf(e) {
  return !bi(e) || !e.hasOwnProperty(af);
}
const { assign: $e } = Object;
function lf(e) {
  return !!(ae(e) && e.effect);
}
function uf(e, t, n, s) {
  const { state: i, actions: r, getters: o } = t, a = n.state.value[e];
  let c;
  function u() {
    a || (n.state.value[e] = i ? i() : {});
    const l = _o(n.state.value[e]);
    return $e(l, r, Object.keys(o || {}).reduce((d, p) => (d[p] = Yt(Ie(() => {
      Fn(n);
      const g = n._s.get(e);
      return o[p].call(g, g);
    })), d), {}));
  }
  return c = Ra(e, u, t, n, s, !0), c;
}
function Ra(e, t, n = {}, s, i, r) {
  let o;
  const a = $e({ actions: {} }, n), c = { deep: !0 };
  let u, l, d = [], p = [], g;
  const m = s.state.value[e];
  !r && !m && (s.state.value[e] = {});
  const S = te({});
  let R;
  function I(T) {
    let x;
    u = l = !1, typeof T == "function" ? (T(s.state.value[e]), x = {
      type: Ze.patchFunction,
      storeId: e,
      events: g
    }) : (mi(s.state.value[e], T), x = {
      type: Ze.patchObject,
      payload: T,
      storeId: e,
      events: g
    });
    const w = R = Symbol();
    wo().then(() => {
      R === w && (u = !0);
    }), l = !0, Ut(d, x, s.state.value[e]);
  }
  const V = r ? function() {
    const { state: x } = n, w = x ? x() : {};
    this.$patch((K) => {
      $e(K, w);
    });
  } : (
    /* istanbul ignore next */
    ka
  );
  function F() {
    o.stop(), d = [], p = [], s._s.delete(e);
  }
  const k = (T, x = "") => {
    if (Fr in T)
      return T[zs] = x, T;
    const w = function() {
      Fn(s);
      const K = Array.from(arguments), B = [], oe = [];
      function Z(fe) {
        B.push(fe);
      }
      function ee(fe) {
        oe.push(fe);
      }
      Ut(p, {
        args: K,
        name: w[zs],
        store: j,
        after: Z,
        onError: ee
      });
      let G;
      try {
        G = T.apply(this && this.$id === e ? this : j, K);
      } catch (fe) {
        throw Ut(oe, fe), fe;
      }
      return G instanceof Promise ? G.then((fe) => (Ut(B, fe), fe)).catch((fe) => (Ut(oe, fe), Promise.reject(fe))) : (Ut(B, G), G);
    };
    return w[Fr] = !0, w[zs] = x, w;
  }, O = /* @__PURE__ */ Yt({
    actions: {},
    getters: {},
    state: [],
    hotState: S
  }), D = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Nr.bind(null, p),
    $patch: I,
    $reset: V,
    $subscribe(T, x = {}) {
      const w = Nr(d, T, x.detached, () => K()), K = o.run(() => lt(() => s.state.value[e], (B) => {
        (x.flush === "sync" ? l : u) && T({
          storeId: e,
          type: Ze.direct,
          events: g
        }, B);
      }, $e({}, c, x)));
      return w;
    },
    $dispose: F
  }, j = Es(Cn ? $e(
    {
      _hmrPayload: O,
      _customProperties: Yt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    D
    // must be added later
    // setupStore
  ) : D);
  s._s.set(e, j);
  const L = (s._a && s._a.runWithContext || of)(() => s._e.run(() => (o = eo()).run(() => t({ action: k }))));
  for (const T in L) {
    const x = L[T];
    if (ae(x) && !lf(x) || ct(x))
      r || (m && cf(x) && (ae(x) ? x.value = m[T] : mi(x, m[T])), s.state.value[e][T] = x);
    else if (typeof x == "function") {
      const w = k(x, T);
      L[T] = w, a.actions[T] = x;
    }
  }
  if ($e(j, L), $e(q(j), L), Object.defineProperty(j, "$state", {
    get: () => s.state.value[e],
    set: (T) => {
      I((x) => {
        $e(x, T);
      });
    }
  }), Cn) {
    const T = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((x) => {
      Object.defineProperty(j, x, $e({ value: j[x] }, T));
    });
  }
  return s._p.forEach((T) => {
    if (Cn) {
      const x = o.run(() => T({
        store: j,
        app: s._a,
        pinia: s,
        options: a
      }));
      Object.keys(x || {}).forEach((w) => j._customProperties.add(w)), $e(j, x);
    } else
      $e(j, o.run(() => T({
        store: j,
        app: s._a,
        pinia: s,
        options: a
      })));
  }), m && r && n.hydrate && n.hydrate(j.$state, m), u = !0, l = !0, j;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Vn(e, t, n) {
  let s, i;
  const r = typeof t == "function";
  typeof e == "string" ? (s = e, i = r ? n : t) : (i = e, s = e.id);
  function o(a, c) {
    const u = Sl();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (u ? Jt(Ca, null) : null), a && Fn(a), a = va, a._s.has(s) || (r ? Ra(s, t, i, a) : uf(s, i, a)), a._s.get(s);
  }
  return o.$id = s, o;
}
function nn(e) {
  {
    const t = q(e), n = {};
    for (const s in t) {
      const i = t[s];
      (ae(i) || ct(i)) && (n[s] = // ---
      Lc(e, s));
    }
    return n;
  }
}
function sn(e) {
  try {
    return structuredClone(e);
  } catch {
    return e === null || typeof e != "object" ? e : Array.isArray(e) ? e.map((t) => sn(t)) : Object.fromEntries(
      Object.entries(e).map(([t, n]) => [t, sn(n)])
    );
  }
}
content;
let ff = Math.floor(Math.random() * 123456789);
const Vr = (e, t) => Math.trunc(e).toString(16).padStart(t, "0").slice(-t);
function df() {
  return `${Vr(Date.now() / 1e3, 8)}${Vr(++ff, 5)}`;
}
content;
const Jn = /* @__PURE__ */ new WeakMap(), hf = {
  pageViewId: df(),
  screenSize: `${window.screen.width}x${window.screen.height}`,
  linkedEntities: {}
}, ns = (e) => ({
  getElementTaggingData: () => Jn.get(e),
  setElementTaggingData: (r) => {
    Jn.set(e, sn(r));
  },
  deleteElementTaggingData: () => {
    Jn.delete(e);
  },
  getElementAndParentsTaggingData: () => {
    const r = [];
    let o = e;
    for (; o !== null; ) {
      const a = Jn.get(o);
      a !== void 0 && r.unshift(a), o = o.parentElement;
    }
    return r.unshift(hf), r;
  }
});
content;
const Hi = {
  beforeMount: (e, t) => {
    const { setElementTaggingData: n } = ns(e);
    n({ linkedEntities: {}, ...t.value });
  },
  beforeUpdate: (e, t) => {
    const { setElementTaggingData: n } = ns(e);
    n({ linkedEntities: {}, ...t.value });
  },
  unmounted: (e) => {
    const { deleteElementTaggingData: t } = ns(e);
    t();
  }
};
content;
let Gn;
const wn = () => {
  if (Gn == null && (Gn = Jt("businessService")), Gn == null)
    throw Error("Missing businessService for injection");
  return Gn;
};
content;
const $r = new IntersectionObserver(
  (e) => {
    for (const t of e)
      t.isIntersecting && t.intersectionRatio >= 0.5 && t.target.dispatchEvent(new Event("impression", { bubbles: !0 }));
  },
  {
    threshold: 0.5
  }
), Qs = /* @__PURE__ */ new Map(), Mn = {
  beforeMount: (e, t) => {
    if (!(e instanceof HTMLElement))
      return;
    const { getElementAndParentsTaggingData: n } = ns(e), s = ["impression", "click", "scroll"], i = [];
    for (const r of s) {
      if (t.arg !== r)
        continue;
      const o = () => {
        (t.modifiers.once ?? !1) && e.removeEventListener(r, o), wn().trackUserInterfaceEvent(
          t.value,
          n()
        ).catch(console.error);
      };
      e.addEventListener(r, o), i.push(o);
    }
    Qs.set(e, i), $r.observe(e);
  },
  unmounted: (e) => {
    $r.unobserve(e);
    for (const t of Qs.get(e) ?? [])
      e.removeEventListener("click", t), e.removeEventListener("impression", t), e.removeEventListener("scroll", t);
    Qs.delete(e);
  }
};
content;
function Us(e, t = Date.now()) {
  const n = t / 1e3;
  return e !== void 0 && (e.dateStart === void 0 || e.dateStart <= n) && (e.dateEnd === void 0 || e.dateEnd >= n);
}
content;
const pf = {
  isEnabled(e) {
    const t = e.selectedMerchant;
    return Us(t == null ? void 0 : t.cashback) ? (t == null ? void 0 : t.cashback) !== void 0 && e.selectedMerchantCashbackActivationStatus === "transitioning-from-ongoing-to-active" : !1;
  },
  createNotification(e) {
    const t = e.selectedMerchant;
    if (t == null)
      throw Error("selectedMerchant is null");
    const n = `cashback-activated||${t.id}`, s = `Cashback ${t.name} activé !`;
    return {
      id: n,
      emoticon: "🙌",
      title: s,
      message: "Pensez à (ré)activer le cashback juste avant chaque commande.",
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !1
    };
  },
  ttlInMs: -1
};
content;
const gf = { class: "-colorGrey" }, La = /* @__PURE__ */ Rn({
  __name: "RCashbackText",
  props: {
    hasIncrease: { type: Boolean },
    isVariable: { type: Boolean },
    shortCashbackText: {},
    shortPreviousCashbackText: {},
    prefix: { default: "" },
    suffix: { default: "" },
    unstyled: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, {
      hasIncrease: n,
      isVariable: s,
      shortCashbackText: i,
      shortPreviousCashbackText: r
    } = _o(t), o = Ie(() => `Jusqu'à ${i.value}`), a = Ie(() => {
      if (!s.value)
        return t.prefix;
      const u = o.value.indexOf(i.value);
      return t.prefix + o.value.slice(0, u);
    }), c = Ie(() => {
      if (!s.value)
        return t.suffix;
      const u = o.value.indexOf(i.value) + i.value.length;
      return o.value.slice(u) + t.suffix;
    });
    return (u, l) => (le(), Te("span", null, [
      gn(it(a.value) + " ", 1),
      Vt(n) ? (le(), Te(de, { key: 0 }, [
        at("s", gf, it(Vt(r)), 1),
        l[0] || (l[0] = gn(" "))
      ], 64)) : en("", !0),
      u.unstyled ? (le(), Te(de, { key: 1 }, [
        gn(it(Vt(i) + c.value), 1)
      ], 64)) : (le(), Te(de, { key: 2 }, [
        at("b", null, it(Vt(i)), 1),
        gn(it(c.value), 1)
      ], 64))
    ]));
  }
}), bf = {
  isEnabled(e) {
    var n, s;
    const t = (n = e.selectedMerchant) == null ? void 0 : n.cashback;
    return ((s = e.selectedMerchant) == null ? void 0 : s.extensionOffersStatus) === !0 && Us(t) && t.hasIncrease && !t.isSuperCashback;
  },
  createNotification(e) {
    var c;
    const t = e.selectedMerchant;
    if (((c = t == null ? void 0 : t.cashback) == null ? void 0 : c.hasIncrease) !== !0)
      throw Error("There is no cashback increase for the selected merchant");
    const n = `cashback-increased||${t.id}`, s = "Hausse de Cashback", i = t.cashback.isVariable ? "Jusqu’à " : "", r = ` de cashback sur votre commande ${t.name}`, o = `${i}${t.cashback.shortCashbackText}${r}`, a = Ds(La, {
      ...t.cashback,
      suffix: r
    }).mount(document.createElement("div")).$el.innerHTML;
    return {
      id: n,
      emoticon: "🤑",
      title: s,
      message: o,
      messageHtml: a,
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !0
    };
  }
};
content;
const mf = {
  isEnabled(e) {
    return e.isCouponApplierEnabled && e.selectedMerchantCouponApplierConfigMatchesPageContent;
  },
  createNotification(e) {
    const t = e.selectedMerchant;
    if (t == null)
      throw Error("selectedMerchant is null");
    const n = e.selectedMerchantOffers.filter(
      (o) => o.offerType === "CODE"
    ).length, s = `coupon-applier-available||${t.id}`, i = n > 1 ? `${n} codes promo trouvés !` : `${n} code promo trouvé !`;
    return {
      id: s,
      emoticon: "🎉",
      title: i,
      message: "Testez les codes en 1 clic et profitez de la meilleure offre !",
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !1
    };
  }
};
content;
const yf = {
  isEnabled: (e) => e.availableMerchants.length >= 1 && (e.selectedMerchant ?? -1) === -1,
  createNotification: (e) => {
    const t = e.isShoppingCartPage ? "shopping-cart-visit" : "merchant-visit", n = e.availableMerchants.map((o) => o.id).sort((o, a) => o - a).join(","), s = `multiple-merchants-detected|${t}|${n}`, i = "Offres et codes promo", r = `Nous avons détecté ${e.availableMerchants.length} boutiques possibles pour cette adresse`;
    return {
      id: s,
      emoticon: "🤔",
      title: i,
      message: r,
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !0
    };
  }
};
content;
const Sf = {
  isEnabled(e) {
    const t = e.selectedMerchant, n = e.selectedMerchantOffers.length;
    return (t == null ? void 0 : t.extensionOffersStatus) === !0 && (n > 0 || t.cashback != null);
  },
  createNotification(e) {
    var l, d;
    const t = e.selectedMerchant;
    if (t == null)
      throw Error("selectedMerchant is null");
    const n = e.isShoppingCartPage ? "shopping-cart-visit" : "merchant-visit", s = t.id, i = `offers-available|${n}|${s}`, r = e.selectedMerchantOffers.length, o = ((l = t.cashback) == null ? void 0 : l.shortCashbackText) ?? "", a = ((d = t.cashback) == null ? void 0 : d.isVariable) === !0 ? "Jusqu’à " : "";
    let c = "", u = "";
    if (!o && r > 1)
      c = "Offres", u = `${r} offres disponibles`;
    else if (!o && r > 0)
      c = "Offre", u = `${r} offre disponible`;
    else if (o && r > 1)
      c = "Offres & Cashback", u = `${r} offres et ${a.toLowerCase()}${o} de cashback disponibles`;
    else if (o && r > 0)
      c = "Offre & Cashback", u = `${r} offre et ${a.toLowerCase()}${o} de cashback disponibles`;
    else if (o)
      c = "Cashback", u = `${a}${o} de cashback disponible`;
    else
      throw Error("no content to display");
    return u = `${u} pour ${t.name}`, {
      id: i,
      emoticon: "🤑",
      title: c,
      message: u,
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !0
    };
  }
};
content;
const _f = {
  isEnabled(e) {
    var n, s;
    const t = (n = e.selectedMerchant) == null ? void 0 : n.cashback;
    return ((s = e.selectedMerchant) == null ? void 0 : s.extensionOffersStatus) === !0 && Us(t) && t.isSuperCashback;
  },
  createNotification(e) {
    var c;
    const t = e.selectedMerchant;
    if (((c = t == null ? void 0 : t.cashback) == null ? void 0 : c.hasIncrease) !== !0)
      throw Error(
        "There is no super cashback available for the selected merchant"
      );
    const n = `super-cashback-available||${t.id}`, s = "Super Cashback", i = t.cashback.isVariable ? "Jusqu’à " : "", r = " de cashback sur vos achats. Expire bientôt !", o = `${i}${t.cashback.shortCashbackText}${r}`, a = Ds(La, {
      ...t.cashback,
      suffix: r
    }).mount(document.createElement("div")).$el.innerHTML;
    return {
      id: n,
      emoticon: "🔥",
      title: s,
      message: o,
      messageHtml: a,
      isClickable: !0,
      shouldBeMutedIfSidebarHomeIsVisible: !0
    };
  }
};
content;
const Da = /* @__PURE__ */ Vn("couponApplier", {
  state: () => ({
    bestCoupon: null,
    cashbackOffer: null,
    coupons: [],
    currentCouponIndex: 0,
    isCashbackActivated: !1,
    isCashbackConditionsVisible: !1,
    isSupportAvailable: !0,
    isUserLoggedIn: !1,
    merchantId: null,
    merchantName: "",
    shoppingCartTotalWithoutCoupons: null,
    status: "unavailable",
    testedCoupons: []
  }),
  getters: {},
  actions: {
    setBestCoupon(e) {
      this.bestCoupon = e;
    },
    setCashbackOffer(e) {
      this.cashbackOffer = e;
    },
    setCoupons(e) {
      this.coupons.length = 0;
      for (const t of e)
        t.code && (this.coupons.find((n) => n.code === t.code) || this.coupons.push({ code: t.code }));
    },
    setCurrentCouponIndex(e) {
      this.currentCouponIndex = e;
    },
    setIsCashbackActivated(e) {
      this.isCashbackActivated = e;
    },
    setIsCashbackConditionsVisible(e) {
      this.isCashbackConditionsVisible = e;
    },
    setIsSupportAvailable(e) {
      this.isSupportAvailable = e;
    },
    setIsUserLoggedIn(e) {
      this.isUserLoggedIn = e;
    },
    setMerchantId(e) {
      this.merchantId = e;
    },
    setMerchantName(e) {
      this.merchantName = e;
    },
    setShoppingCartTotalWithoutCoupons(e) {
      this.shoppingCartTotalWithoutCoupons = e;
    },
    setStatus(e) {
      this.status = e;
    },
    toggleCashbackConditionsVisible() {
      this.isCashbackConditionsVisible = !this.isCashbackConditionsVisible;
    },
    setTestedCoupons(e) {
      this.testedCoupons.length = 0;
      for (const t of e)
        t.code && (this.testedCoupons.find((n) => n.code === t.code) || this.testedCoupons.push(t));
    }
  }
});
content;
const dn = (e, t) => JSON.stringify(e) === JSON.stringify(t), Nt = /* @__PURE__ */ Vn("offers", {
  state: () => ({
    cachedSingleUseOfferCodes: [],
    lastCodeCopyActionTargetId: -1,
    lastCodeCopyActionTimeout: void 0,
    lastCodeFetchActionResultByOfferId: {},
    offers: []
  }),
  getters: {
    actionableOffers(e) {
      return e.offers.map((t) => {
        var s;
        let n;
        if (t.codeType === "multiple") {
          if (n = e.lastCodeFetchActionResultByOfferId[t.id], n === void 0) {
            const i = (s = e.cachedSingleUseOfferCodes.find(
              (r) => r.offerId === t.id
            )) == null ? void 0 : s.code;
            n = {
              code: i ?? "",
              codeFetchingStatus: i ?? "" ? "success" : "pending",
              codeFetchingError: void 0
            };
          }
        } else
          n = {
            code: t.code,
            codeFetchingStatus: "success",
            codeFetchingError: void 0
          };
        return {
          ...t,
          ...n,
          isCodeCopiedInClipboard: e.lastCodeCopyActionTimeout !== void 0 && t.id === e.lastCodeCopyActionTargetId
        };
      });
    }
  },
  actions: {
    setCachedSingleUseOfferCodes(e) {
      dn(this.cachedSingleUseOfferCodes, e) || (this.cachedSingleUseOfferCodes = e);
    },
    setLastCodeCopyActionTargetId(e) {
      dn(this.lastCodeCopyActionTargetId, e) || (this.lastCodeCopyActionTargetId = e);
    },
    setLastCodeCopyActionTimeout(e) {
      dn(this.lastCodeCopyActionTimeout, e) || (this.lastCodeCopyActionTimeout = e);
    },
    setLastCodeFetchActionResult(e, t) {
      dn(this.lastCodeFetchActionResultByOfferId[e], t) || (this.lastCodeFetchActionResultByOfferId[e] = t);
    },
    setOffers(e) {
      dn(this.offers, e) || (this.offers = e);
    }
  }
});
content;
const we = (e, t) => JSON.stringify(e) === JSON.stringify(t), Hr = 10 * 1e3, vf = 15 * 1e3, jr = 60 * 60 * 1e3, Rt = /* @__PURE__ */ Vn("sidebar", {
  state: () => ({
    now: /* @__PURE__ */ new Date(),
    authModalInitialMode: void 0,
    authModalMerchant: void 0,
    availableMerchants: [],
    error: void 0,
    isAuthModalOpen: !1,
    isShoppingCartPage: !1,
    isSidebarOpen: !1,
    isUserSolicitationAllowedByReferrer: !0,
    selectedMerchantBonuses: [],
    selectedMerchantCashbackActivationRequestTimestamp: -1,
    selectedMerchantCashbackActivationTimestamp: -1,
    selectedMerchantCouponApplierConfig: void 0,
    selectedMerchantCouponApplierConfigMatchesPageUrl: !1,
    selectedMerchantCouponApplierConfigMatchesPageContent: !1,
    selectedMerchantIndex: -1,
    selectedMenuItemId: "home",
    similarMerchants: [],
    trustpilotReviews: [],
    url: "",
    user: void 0
  }),
  getters: {
    cachedSingleUseOfferCodes() {
      return Nt().cachedSingleUseOfferCodes;
    },
    isCouponApplierEnabled(e) {
      const t = e.availableMerchants[e.selectedMerchantIndex];
      return (t == null ? void 0 : t.extensionAutocheckStatus) === !0 && e.isShoppingCartPage && e.selectedMerchantCouponApplierConfigMatchesPageUrl && Nt().actionableOffers.some(
        (n) => n.merchantId === t.id && n.offerType === "CODE"
      );
    },
    selectedMerchant(e) {
      return e.availableMerchants[e.selectedMerchantIndex];
    },
    selectedMerchantCashbackActivationStatus(e) {
      const t = e.now.getTime(), n = e.selectedMerchantCashbackActivationRequestTimestamp, s = e.selectedMerchantCashbackActivationTimestamp, i = n + Hr, r = s + jr, o = s + vf;
      return t > i && t > r ? "inactive" : n > s ? "ongoing" : t < o ? "transitioning-from-ongoing-to-active" : "active";
    },
    selectedMerchantCashbackReactivationHintStatus(e) {
      const t = e.now.getTime(), n = e.selectedMerchantCashbackActivationRequestTimestamp, s = e.selectedMerchantCashbackActivationTimestamp, i = n + Hr, r = s + jr;
      return t > i && t > r || n > s ? "hidden" : "visible";
    },
    selectedMerchantOffers(e) {
      var n;
      const t = ((n = e.availableMerchants[e.selectedMerchantIndex]) == null ? void 0 : n.id) ?? -1;
      return Nt().actionableOffers.filter(
        (s) => s.merchantId === t
      );
    }
  },
  actions: {
    registerAffiliationRequest(e, t) {
      var n, s;
      ((n = this.user) == null ? void 0 : n.isLogged) === !0 && ((s = this.selectedMerchant) == null ? void 0 : s.id) === e && (t === void 0 || this.selectedMerchantOffers.some(
        (i) => i.id === t && i.canCombineCashbackAndOffersCodes && i.giftCardCashback === void 0
      )) && (this.selectedMerchantCashbackActivationRequestTimestamp = Date.now());
    },
    setAvailableMerchants(e) {
      we(this.availableMerchants, e) || (this.availableMerchants = e);
    },
    setCachedSingleUseOfferCodes(e) {
      Nt().setCachedSingleUseOfferCodes(e);
    },
    setError(e) {
      we(this.error, e) || (this.error = e);
    },
    setSelectedMerchantBonuses(e) {
      we(this.selectedMerchantBonuses, e) || (this.selectedMerchantBonuses = e);
    },
    setSelectedMerchantCashbackActivationTimestamp(e) {
      we(this.selectedMerchantCashbackActivationTimestamp, e) || (this.selectedMerchantCashbackActivationTimestamp = e);
    },
    setIsShoppingCartPage(e) {
      we(this.isShoppingCartPage, e) || (this.isShoppingCartPage = e);
    },
    setIsSidebarOpen(e) {
      we(this.isSidebarOpen, e) || (this.isSidebarOpen = e);
    },
    setIsUserSolicitationAllowedByReferrer(e) {
      we(this.isUserSolicitationAllowedByReferrer, e) || (this.isUserSolicitationAllowedByReferrer = e);
    },
    setSelectedMerchantCouponApplierConfig(e) {
      we(this.selectedMerchantCouponApplierConfig, e) || (this.selectedMerchantCouponApplierConfig = e);
    },
    setSelectedMerchantCouponApplierConfigMatchesPageUrl(e) {
      we(
        this.selectedMerchantCouponApplierConfigMatchesPageUrl,
        e
      ) || (this.selectedMerchantCouponApplierConfigMatchesPageUrl = e);
    },
    setSelectedMerchantCouponApplierConfigMatchesPageContent(e) {
      we(
        this.selectedMerchantCouponApplierConfigMatchesPageContent,
        e
      ) || (this.selectedMerchantCouponApplierConfigMatchesPageContent = e);
    },
    setSelectedMerchantIndex(e) {
      if (!we(this.selectedMerchantIndex, e)) {
        if (e == null || e < 0 || e >= this.availableMerchants.length) {
          this.selectedMerchantIndex = -1;
          return;
        }
        this.selectedMerchantIndex = e;
      }
    },
    setSelectedMerchantOffers(e) {
      var n;
      const t = ((n = this.availableMerchants[this.selectedMerchantIndex]) == null ? void 0 : n.id) ?? -1;
      Nt().setOffers([
        ...e,
        ...Nt().offers.filter(
          (s) => s.merchantId !== t
        )
      ]);
    },
    setSimilarMerchants(e) {
      we(this.similarMerchants, e) || (this.similarMerchants = e);
    },
    setTrustpilotReviews(e) {
      we(this.trustpilotReviews, e) || (this.trustpilotReviews = e);
    },
    setUrl(e) {
      we(this.url, e) || (this.url = e);
    },
    setUser(e) {
      we(this.user, e) || (this.user = e);
    }
  }
});
content;
const Cf = /* @__PURE__ */ Rn({
  __name: "CouponApplierModalLoader",
  setup(e, { expose: t }) {
    t();
    const n = /* @__PURE__ */ qt(
      () => import("./CouponApplierModal-CNygABbA.js")
    ), s = Da(), i = Rt(), r = Ie(() => i.isCouponApplierEnabled && ["process", "finishing", "fail", "success"].includes(
      s.status
    )), o = { CouponApplierModal: n, couponApplierStore: s, sidebarStore: i, isCouponApplierRunning: r };
    return Object.defineProperty(o, "__isScriptSetup", { enumerable: !1, value: !0 }), o;
  }
});
content;
const ji = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
};
function wf(e, t, n, s, i, r) {
  return s.isCouponApplierRunning ? (le(), Xt(s.CouponApplierModal, { key: 0 })) : en("", !0);
}
const Mf = /* @__PURE__ */ ji(Cf, [["render", wf], ["__file", "CouponApplierModalLoader.vue"]]), Af = 60 * 60 * 1e3, yi = /* @__PURE__ */ Vn("notifications", {
  state: () => ({
    notifications: []
  }),
  actions: {
    async lockNotification(e, t = Af) {
      try {
        return await wn().requestNotificationLock(
          e,
          t
        );
      } catch {
        return !1;
      }
    },
    async showNotification(e) {
      try {
        await wn().trackNotificationEvent("show", e.id);
      } catch {
        return !1;
      }
      return this.notifications = this.notifications.filter(
        (t) => t.id !== e.id
      ), this.notifications.push({
        ...e,
        shownAt: /* @__PURE__ */ new Date()
      }), !0;
    },
    async clearNotification(e, t) {
      const n = this.notifications.find(
        (s) => s.id === e
      );
      if (n !== void 0) {
        if (t === "click" || t === "close")
          try {
            await wn().trackNotificationEvent(t, n.id);
          } catch {
          }
        this.notifications = this.notifications.filter(
          (s) => s.id !== e
        );
      }
    }
  }
});
content;
const Xs = 6e3, xf = /* @__PURE__ */ Rn({
  __name: "NotificationsManager",
  setup(e, { expose: t }) {
    t();
    const n = yi(), { notifications: s } = nn(n), i = te(/* @__PURE__ */ new Date()), r = te(-1), o = Ie(() => s.value.filter((l) => i.value.getTime() - l.shownAt.getTime() < Xs).map((l) => ({
      ...l,
      isStartAnimationVisible: i.value.getTime() - l.shownAt.getTime() < 700,
      isEndAnimationVisible: i.value.getTime() - l.shownAt.getTime() >= Xs - 700
    }))), a = async (l) => n.clearNotification(l.id, "close"), c = async (l) => {
      if (l.isClickable === !0)
        return De.publish({
          type: "notificationClicked",
          details: {
            notificationId: l.id
          }
        }), n.clearNotification(l.id, "click");
    };
    zt(() => {
      r.value = requestAnimationFrame(function l() {
        i.value = /* @__PURE__ */ new Date(), r.value = requestAnimationFrame(l);
      });
    }), Dn(() => {
      cancelAnimationFrame(r.value);
    });
    const u = { notificationsVisibilityDurationInMs: Xs, notificationsStore: n, notifications: s, now: i, nowRafId: r, visibleNotifications: o, onCloseClick: a, onContentsClick: c };
    return Object.defineProperty(u, "__isScriptSetup", { enumerable: !1, value: !0 }), u;
  }
});
content;
const Tf = { class: "[ -hiddenFullscreen ] fixed top-0 right-0 w-82 overflow-hidden z-[2147483647]" }, Ef = ["onClick"], Of = ["onClick"], If = {
  key: 0,
  class: "flex-none flex justify-center items-center w-16 text-[40px]"
}, Pf = { key: 0 }, kf = ["src"], Rf = { key: 1 }, Lf = { class: "flex-auto" }, Df = {
  key: 0,
  class: "mt-1 mb-2"
}, Uf = ["innerHTML"], Nf = {
  key: 2,
  class: "mb-1"
};
function Ff(e, t, n, s, i, r) {
  return le(), Te("div", Tf, [
    (le(!0), Te(de, null, ll(s.visibleNotifications, (o) => (le(), Te("div", {
      key: o.id,
      class: Pt([{
        "animate-[appear-left_0.5s_ease-in-out_both]": o.isStartAnimationVisible,
        "animate-[appear-left_0.5s_ease-in-out_reverse_both]": o.isEndAnimationVisible
      }, "relative w-78 m-2 p-2 bg-white rounded-lg shadow-[0_1px_5px_0_rgba(0,0,0,0.25)]"])
    }, [
      at("button", {
        class: "absolute top-0 right-0 inline-flex p-2 border-none bg-none bg-transparent cursor-pointer opacity-30 hover:opacity-40 transition-opacity",
        onClick: (a) => s.onCloseClick(o)
      }, t[0] || (t[0] = [
        at("i", { class: "fa-solid fa-circle-xmark" }, null, -1)
      ]), 8, Ef),
      at("div", {
        class: Pt(["flex gap-3", { "cursor-pointer": o.isClickable === !0 }]),
        onClick: (a) => s.onContentsClick(o)
      }, [
        o.emoticon || o.iconUrl ? (le(), Te("div", If, [
          o.iconUrl ? (le(), Te("div", Pf, [
            at("img", {
              src: o.iconUrl,
              alt: ""
            }, null, 8, kf)
          ])) : (le(), Te("div", Rf, it(o.emoticon), 1))
        ])) : en("", !0),
        at("div", Lf, [
          o.title ? (le(), Te("h3", Df, it(o.title), 1)) : en("", !0),
          o.messageHtml ? (le(), Te("p", {
            key: 1,
            class: "mb-1",
            innerHTML: o.messageHtml
          }, null, 8, Uf)) : (le(), Te("p", Nf, it(o.message), 1))
        ])
      ], 10, Of)
    ], 2))), 128))
  ]);
}
const Vf = /* @__PURE__ */ ji(xf, [["render", Ff], ["__file", "NotificationsManager.vue"]]), be = {
  extension_first_usage_tracking: {
    defaultValue: "pending",
    validate: (e) => e === "pending" || e === "done"
  },
  extension_version: {
    defaultValue: "0.0.0",
    validate: (e) => typeof e == "string" && /^\d+\.\d+\.\d+$/.test(e)
  },
  extension_installation_id: {
    defaultValue: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
    validate: (e) => typeof e == "string" && /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i.test(
      e
    )
  },
  extension_session_id: {
    defaultValue: "aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa",
    validate: (e) => typeof e == "string" && /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i.test(
      e
    )
  },
  gift_card_cashback_tab_seen: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  },
  notification_show_on_merchant_visit: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  },
  notification_show_in_shopping_cart: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  },
  notifications_domain_blacklist: {
    defaultValue: [],
    validate: (e) => Array.isArray(e) && !e.some((t) => typeof t != "string")
  },
  privacy_allow_required_tracking: {
    defaultValue: !1,
    validate: (e) => typeof e == "boolean"
  },
  privacy_allow_performance_tracking: {
    defaultValue: !1,
    validate: (e) => typeof e == "boolean"
  },
  search_engine_show_offers: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  },
  search_engine_show_similar_merchants: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  },
  sidebar_opener_location: {
    defaultValue: "center",
    validate: (e) => typeof e == "string" && ["bottom", "center", "top"].includes(e)
  },
  sidebar_open_method: {
    defaultValue: "on-click",
    validate: (e) => typeof e == "string" && ["on-click", "on-hover"].includes(e)
  },
  sidebar_hidden_on_domain_list: {
    defaultValue: [],
    validate: (e) => Array.isArray(e) ? e.every((t) => typeof t == "string") : !1
  },
  sidebar_show_strategy: {
    defaultValue: "merchants-only",
    validate: (e) => typeof e == "string" && [
      "always",
      "merchants-only",
      "never"
    ].includes(e)
  },
  sidebar_show_style: {
    defaultValue: "standard",
    validate: (e) => typeof e == "string" && ["minimalist", "standard"].includes(e)
  },
  super_cashback_tab_seen: {
    defaultValue: !0,
    validate: (e) => typeof e == "boolean"
  }
};
content;
const Wi = /* @__PURE__ */ Vn("parameters", () => {
  const e = te(
    be.extension_first_usage_tracking.defaultValue
  ), t = te(
    be.extension_installation_id.defaultValue
  ), n = te(
    be.extension_session_id.defaultValue
  ), s = te(
    be.extension_version.defaultValue
  ), i = te(
    be.gift_card_cashback_tab_seen.defaultValue
  ), r = te(
    be.notification_show_on_merchant_visit.defaultValue
  ), o = te(
    be.notification_show_in_shopping_cart.defaultValue
  ), a = te(
    be.notifications_domain_blacklist.defaultValue
  ), c = te(
    be.privacy_allow_required_tracking.defaultValue
  ), u = te(
    be.privacy_allow_performance_tracking.defaultValue
  ), l = te(
    be.search_engine_show_offers.defaultValue
  ), d = te(
    be.search_engine_show_similar_merchants.defaultValue
  ), p = te(
    be.sidebar_opener_location.defaultValue
  ), g = te(
    be.sidebar_open_method.defaultValue
  ), m = te(
    be.sidebar_hidden_on_domain_list.defaultValue
  ), S = te(
    be.sidebar_show_strategy.defaultValue
  ), R = te(
    be.sidebar_show_style.defaultValue
  ), I = te(
    be.super_cashback_tab_seen.defaultValue
  );
  return {
    extension_first_usage_tracking: e,
    extension_installation_id: t,
    extension_session_id: n,
    extension_version: s,
    gift_card_cashback_tab_seen: i,
    notification_show_on_merchant_visit: r,
    notification_show_in_shopping_cart: o,
    notifications_domain_blacklist: a,
    privacy_allow_required_tracking: c,
    privacy_allow_performance_tracking: u,
    search_engine_show_offers: l,
    search_engine_show_similar_merchants: d,
    sidebar_opener_location: p,
    sidebar_open_method: g,
    sidebar_hidden_on_domain_list: m,
    sidebar_show_strategy: S,
    sidebar_show_style: R,
    super_cashback_tab_seen: I
  };
});
content;
const Ua = (e) => {
  const t = Wi(), n = wn(), i = nn(t)[e];
  return lt(i, (r, o) => {
    JSON.stringify(r) !== JSON.stringify(o) && n.updateParameter(e, r).catch(console.error);
  }), i;
};
content;
const $f = (e) => {
  const t = Ua(e), { url: n } = nn(Rt()), s = Ie(() => n.value.split("/")[2] ?? ""), i = Ie(
    () => t.value.includes(s.value)
  ), r = () => {
    const c = new Set(t.value);
    c.add(s.value), t.value = Array.from(c);
  }, o = () => {
    const c = new Set(t.value);
    c.delete(s.value), t.value = Array.from(c);
  };
  return {
    isExceptionSetForCurrentDomain: i,
    addExceptionForCurrentDomain: r,
    removeExceptionForCurrentDomain: o,
    toggleExceptionForCurrentDomain: () => {
      i.value ? o() : r();
    }
  };
};
content;
const Hf = () => {
  const { availableMerchants: e, isSidebarOpen: t } = nn(
    Rt()
  ), n = Ua("sidebar_show_strategy"), { isExceptionSetForCurrentDomain: s, toggleExceptionForCurrentDomain: i } = $f("sidebar_hidden_on_domain_list"), r = Ie(() => n.value === "always" ? !1 : n.value === "never" ? !0 : e.value.length === 0), o = s;
  return {
    isSidebarOpenerDisabledOnCurrentDomain: Ie(() => r.value || o.value),
    isSidebarOpenerDisabledByDefaultOnCurrentDomain: r,
    isSidebarOpenerDisabledByExceptionOnCurrentDomain: o,
    reduceSidebarOpenerVisibilityLevel: () => {
      n.value !== "never" && (n.value = e.value.length > 0 ? "never" : "merchants-only");
    },
    toggleSidebarOpenerVisibilityExceptionForCurrentDomain: () => {
      i(), t.value = !t.value;
    }
  };
};
content;
const jf = /* @__PURE__ */ Rn({
  __name: "SidebarPlacer",
  props: {
    rootSelector: {}
  },
  setup(e, { expose: t }) {
    t();
    const n = e, s = /* @__PURE__ */ qt(
      () => import("./SidebarManager-CoX2oc26.js").then((O) => O.S)
    ), i = /* @__PURE__ */ qt(
      () => import("./SidebarOpener-DU4wLaRb.js")
    ), r = te(!1), {
      isSidebarOpenerDisabledOnCurrentDomain: o,
      reduceSidebarOpenerVisibilityLevel: a
    } = Hf(), { sidebar_open_method: c, sidebar_opener_location: u, sidebar_show_style: l } = nn(Wi()), { isSidebarOpen: d } = nn(Rt()), p = te(d.value), g = Ie(
      () => l.value === "minimalist"
    ), m = Ie(() => c.value === "on-hover"), S = Ie(() => {
      const O = m.value && !d.value;
      return {
        "-open": d.value,
        "-openOnHover": O,
        "-openDelayed": O,
        "-top": u.value === "top",
        "-center": u.value === "center",
        "-bottom": u.value === "bottom",
        "-noTransition": !r.value
      };
    });
    zt(() => {
      setTimeout(() => {
        r.value = !0;
      }, 500);
    });
    const R = (O) => {
      const D = O.target;
      D instanceof Element && (D.closest(n.rootSelector) || (d.value = !1));
    };
    zt(() => {
      addEventListener("click", R);
    }), Dn(() => {
      removeEventListener("click", R);
    });
    const I = lt(d, () => {
      d.value && (p.value = !0, I());
    }), k = { props: n, SidebarManager: s, SidebarOpener: i, enableCssTransition: r, isSidebarOpenerDisabledOnCurrentDomain: o, reduceSidebarOpenerVisibilityLevel: a, sidebar_open_method: c, sidebar_opener_location: u, sidebar_show_style: l, isSidebarOpen: d, hasSidebarBeenOpenedSincePageLoad: p, isSidebarOpenerMinified: g, shouldSidebarOpenOnHover: m, sidebarPlacerCssClasses: S, closeSidebarWhenClickOutside: R, stopWatching: I, handleSidebarOpenerHover: () => {
      m.value && (p.value = !0);
    }, handleSidebarOpenerClick: () => {
      m.value || (p.value = !0, d.value = !d.value);
    } };
    return Object.defineProperty(k, "__isScriptSetup", { enumerable: !1, value: !0 }), k;
  }
});
content;
function Wf(e, t, n, s, i, r) {
  return le(), Te("div", {
    class: Pt(["m-sidebarPlacer", s.sidebarPlacerCssClasses])
  }, [
    s.isSidebarOpenerDisabledOnCurrentDomain ? en("", !0) : (le(), Xt(s.SidebarOpener, {
      key: 0,
      class: "m-sidebarPlacer__opener",
      minified: s.isSidebarOpenerMinified,
      "use-pointer": !s.shouldSidebarOpenOnHover,
      onMouseoverOnce: s.handleSidebarOpenerHover,
      onClick: s.handleSidebarOpenerClick,
      onRemoveButtonClick: s.reduceSidebarOpenerVisibilityLevel
    }, null, 8, ["minified", "use-pointer", "onRemoveButtonClick"])),
    s.hasSidebarBeenOpenedSincePageLoad ? (le(), Xt(s.SidebarManager, { key: 1 })) : en("", !0)
  ], 2);
}
const Kf = /* @__PURE__ */ ji(jf, [["render", Wf], ["__file", "SidebarPlacer.vue"]]);
class qf {
  constructor(t, n, s) {
    re(this, "sidebarStore", Rt());
    re(this, "businessService");
    re(this, "offerRevealService");
    re(this, "eventBus");
    re(this, "couponApplierService");
    this.businessService = t, this.offerRevealService = n, this.eventBus = s, this.initSelectedMerchantCouponApplierConfigMatchesPageContentWatcher();
  }
  subscribeSelf(t) {
    t == null || t.subscribe(
      "notificationClicked",
      this.onNotificationClicked.bind(this)
    ), t == null || t.subscribe(
      "startTestClicked",
      this.onStartTestClicked.bind(this)
    ), t == null || t.subscribe(
      "stopTestClicked",
      this.onStopTestClicked.bind(this)
    );
  }
  unsubscribeSelf(t) {
    t == null || t.unsubscribe(
      "notificationClicked",
      this.onNotificationClicked.bind(this)
    ), t == null || t.unsubscribe(
      "startTestClicked",
      this.onStartTestClicked.bind(this)
    ), t == null || t.unsubscribe(
      "stopTestClicked",
      this.onStopTestClicked.bind(this)
    );
  }
  async onNotificationClicked(t) {
    var n;
    t.details.notificationId.startsWith("coupon-applier-available") && await ((n = this.couponApplierService) == null ? void 0 : n.startTest());
  }
  async onStartTestClicked() {
    var t;
    await ((t = this.couponApplierService) == null ? void 0 : t.startTest());
  }
  async onStopTestClicked() {
    var t;
    await ((t = this.couponApplierService) == null ? void 0 : t.stopTest());
  }
  initSelectedMerchantCouponApplierConfigMatchesPageContentWatcher() {
    lt(
      () => this.sidebarStore.isCouponApplierEnabled && this.sidebarStore.selectedMerchantCouponApplierConfigMatchesPageContent,
      () => {
        this.sidebarStore.selectedMerchantCouponApplierConfigMatchesPageContent && this.initServices().catch(console.error);
      }
    );
  }
  async initServices() {
    const { CouponApplierService: t } = await import("./CouponApplierService-Bhe5a8CY.js");
    this.couponApplierService = this.couponApplierService ?? new t(this.businessService, this.offerRevealService), this.couponApplierService.setPublishTarget(this.eventBus), this.sidebarStore.selectedMerchantCouponApplierConfig !== void 0 && await this.couponApplierService.init(
      this.sidebarStore.selectedMerchantCouponApplierConfig,
      this.sidebarStore.selectedMerchantOffers
    );
  }
}
content;
class Jf {
  constructor() {
    re(this, "couponApplierStore", Da());
  }
  subscribeSelf(t) {
    t == null || t.subscribe(
      "couponApplierCouponsUpdated",
      this.onCouponApplierCouponsUpdated.bind(this)
    ), t == null || t.subscribe(
      "couponApplierCouponTested",
      this.onCouponApplierCouponTested.bind(this)
    ), t == null || t.subscribe(
      "couponApplierProcessIndexUpdated",
      this.onCouponApplierProcessIndexUpdated.bind(this)
    ), t == null || t.subscribe(
      "couponApplierShoppingCartTotalUpdated",
      this.onCouponApplierShoppingCartTotalUpdated.bind(this)
    ), t == null || t.subscribe(
      "couponApplierStatusUpdated",
      this.onCouponApplierStatusUpdated.bind(this)
    ), t == null || t.subscribe(
      "couponApplierStopped",
      this.onCouponApplierStopped.bind(this)
    ), t == null || t.subscribe(
      "couponApplierSucceeded",
      this.onCouponApplierSucceeded.bind(this)
    ), t == null || t.subscribe(
      "sidebarStoreUpdated",
      this.onSidebarStoreUpdated.bind(this)
    );
  }
  unsubscribeSelf(t) {
    t == null || t.unsubscribe(
      "couponApplierCouponsUpdated",
      this.onCouponApplierCouponsUpdated.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierCouponTested",
      this.onCouponApplierCouponTested.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierProcessIndexUpdated",
      this.onCouponApplierProcessIndexUpdated.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierStatusUpdated",
      this.onCouponApplierStatusUpdated.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierShoppingCartTotalUpdated",
      this.onCouponApplierShoppingCartTotalUpdated.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierStopped",
      this.onCouponApplierStopped.bind(this)
    ), t == null || t.unsubscribe(
      "couponApplierSucceeded",
      this.onCouponApplierSucceeded.bind(this)
    ), t == null || t.unsubscribe(
      "sidebarStoreUpdated",
      this.onSidebarStoreUpdated.bind(this)
    );
  }
  async onCouponApplierCouponsUpdated(t) {
    return this.couponApplierStore.setCoupons(t.details.coupons), Promise.resolve();
  }
  async onCouponApplierCouponTested(t) {
    return this.couponApplierStore.setTestedCoupons(t.details.testedCoupons), Promise.resolve();
  }
  async onCouponApplierProcessIndexUpdated(t) {
    return this.couponApplierStore.setCurrentCouponIndex(t.details.currentIndex), Promise.resolve();
  }
  async onCouponApplierStatusUpdated(t) {
    return this.couponApplierStore.setStatus(t.details.status), Promise.resolve();
  }
  async onCouponApplierStopped(t) {
    return this.couponApplierStore.setStatus(t.details.status), Promise.resolve();
  }
  async onCouponApplierSucceeded(t) {
    return this.couponApplierStore.setBestCoupon(t.details.bestCoupon), Promise.resolve();
  }
  async onCouponApplierShoppingCartTotalUpdated(t) {
    return this.couponApplierStore.setShoppingCartTotalWithoutCoupons(
      // we want the shopping cart total before applying any coupon, so we use
      // the maximum value between test start (where a coupon may already be
      // applied by the user without our knowledge) and test end (assuming that
      // any user-applied coupon has been removed at one point during the test)
      t.details.maxShoppingCartTotal ?? null
    ), Promise.resolve();
  }
  // onSidebarInit()
  async onSidebarStoreUpdated(t) {
    var s, i, r, o, a;
    const n = t.details.store;
    return this.couponApplierStore.setCashbackOffer(
      ((s = n.selectedMerchant) == null ? void 0 : s.cashback) ?? null
    ), this.couponApplierStore.setCoupons(n.selectedMerchantOffers), this.couponApplierStore.setIsCashbackActivated(
      n.selectedMerchantCashbackActivationTimestamp !== -1
    ), this.couponApplierStore.setIsSupportAvailable(
      ((i = n.selectedMerchant) == null ? void 0 : i.support) ?? !1
    ), this.couponApplierStore.setIsUserLoggedIn(
      ((r = n.user) == null ? void 0 : r.isLogged) ?? !1
    ), this.couponApplierStore.setMerchantId(
      ((o = n.selectedMerchant) == null ? void 0 : o.id) ?? null
    ), this.couponApplierStore.setMerchantName(
      ((a = n.selectedMerchant) == null ? void 0 : a.name) ?? ""
    ), Promise.resolve();
  }
}
content;
class Gf {
  constructor(t) {
    re(this, "businessService");
    re(this, "sidebarStore");
    re(this, "notificationFactoryList");
    re(this, "notificationDisplayOpportunityCount", 0);
    this.businessService = t, this.notificationFactoryList = [], this.sidebarStore = Rt();
  }
  subscribeSelf(t) {
    t == null || t.subscribe(
      "showNotificationMessageReceived",
      this.onShowNotificationMessageReceived.bind(this)
    ), t == null || t.subscribe(
      "sidebarStoreUpdated",
      this.onSidebarStoreUpdated.bind(this)
    );
  }
  unsubscribeSelf(t) {
    t == null || t.unsubscribe(
      "showNotificationMessageReceived",
      this.onShowNotificationMessageReceived.bind(this)
    ), t == null || t.unsubscribe(
      "sidebarStoreUpdated",
      this.onSidebarStoreUpdated.bind(this)
    );
  }
  async onShowNotificationMessageReceived(t) {
    try {
      const n = yi();
      if (!await n.lockNotification(
        t.details.notification.id,
        t.details.delayBeforeNextNotificationWithSameIdInMs
      ))
        return;
      await n.showNotification(t.details.notification);
    } catch (n) {
      console.error(n);
    }
  }
  async onSidebarStoreUpdated() {
    await this.showNotificationIfDocumentIsVisible();
  }
  registerNotificationFactory(t) {
    this.notificationFactoryList.push(t);
  }
  /**
   * Displays a notification if document is visible and if a
   * notification needs to be displayed to the user
   */
  async showNotificationIfDocumentIsVisible() {
    if (document.visibilityState !== "visible" || !this.sidebarStore.isUserSolicitationAllowedByReferrer)
      return;
    const t = ++this.notificationDisplayOpportunityCount;
    if (await new Promise((s) => setTimeout(s, 500)), t !== this.notificationDisplayOpportunityCount)
      return;
    try {
      await this.businessService.checkStorageHealth();
    } catch (s) {
      console.error(s);
      return;
    }
    const n = await this.businessService.getAllParameters();
    for (const s of this.notificationFactoryList)
      await this.maybeShowNotification(s, n);
  }
  /**
   * Shows a notification if requirements are met
   * @param notification - notification to be displayed
   */
  async maybeShowNotification(t, n) {
    if (!this.areNotificationsAllowedByMerchantsSelection() || !this.areNotificationsAllowedByParameters(n) || !t.isEnabled(this.sidebarStore))
      return !1;
    const s = yi(), i = t.createNotification(this.sidebarStore);
    return !await s.lockNotification(
      i.id,
      t.ttlInMs
    ) || this.sidebarStore.isSidebarOpen && this.sidebarStore.selectedMenuItemId === "home" && i.shouldBeMutedIfSidebarHomeIsVisible || s.notifications.length > 0 ? !1 : (await s.showNotification({
      id: i.id,
      title: i.title,
      message: i.message,
      messageHtml: i.messageHtml,
      emoticon: i.emoticon,
      isClickable: i.isClickable
    }), !0);
  }
  areNotificationsAllowedByMerchantsSelection() {
    return this.sidebarStore.availableMerchants.length === 0 ? !1 : this.sidebarStore.availableMerchants.some(
      (t) => t.extensionNotificationsStatus
    );
  }
  areNotificationsAllowedByParameters(t) {
    const n = this.sidebarStore.url.split("/")[2] ?? "";
    return t.notifications_domain_blacklist.includes(n) ? !1 : this.sidebarStore.isShoppingCartPage ? t.notification_show_in_shopping_cart : t.notification_show_on_merchant_visit;
  }
}
content;
class Bf {
  constructor(t) {
    re(this, "parametersStore", Wi());
    re(this, "businessService");
    this.businessService = t;
  }
  subscribeSelf(t) {
    t == null || t.subscribe(
      "tabVisibilityChanged",
      this.onTabVisibilityChanged.bind(this)
    ), t == null || t.subscribe(
      "updateSidebarStoreMessageReceived",
      this.onUpdateSidebarStoreMessageReceived.bind(this)
    );
  }
  unsubscribeSelf(t) {
    t == null || t.unsubscribe(
      "tabVisibilityChanged",
      this.onTabVisibilityChanged.bind(this)
    ), t == null || t.unsubscribe(
      "updateSidebarStoreMessageReceived",
      this.onUpdateSidebarStoreMessageReceived.bind(this)
    );
  }
  async onTabVisibilityChanged() {
    if (document.visibilityState === "visible")
      return this.updateParametersStore();
  }
  async onUpdateSidebarStoreMessageReceived() {
    return this.updateParametersStore();
  }
  async updateParametersStore() {
    try {
      this.parametersStore.$patch(
        await this.businessService.getAllParameters()
      );
    } catch (t) {
      console.error(t);
    }
  }
}
content;
function Yf(e) {
  return {
    domainByLevel: e.split(".").reverse(),
    wildcardCount: e.split(".").filter((t) => t === "*").length
  };
}
function zf(e, t) {
  if (e.domainByLevel.length > t.domainByLevel.length)
    return 1;
  if (e.domainByLevel.length < t.domainByLevel.length)
    return -1;
  if (e.wildcardCount !== t.wildcardCount)
    return e.wildcardCount > t.wildcardCount ? -1 : 1;
  for (let n = 0; n < e.domainByLevel.length; n++)
    if (e.domainByLevel[n] !== t.domainByLevel[n])
      return e.domainByLevel[n] < t.domainByLevel[n] ? -1 : 1;
  return 0;
}
function Qf(e, t) {
  const n = e.split(".").reverse();
  if (n.length < t.domainByLevel.length || n.length > t.domainByLevel.length && t.domainByLevel[t.domainByLevel.length - 1] !== "*")
    return !1;
  for (let s = 0; s < t.domainByLevel.length; s++)
    if (t.domainByLevel[s] !== "*" && t.domainByLevel[s] !== n[s])
      return !1;
  return !0;
}
function Xf(e, t) {
  const n = e.split(".").reverse();
  return (n[0] === t.domainByLevel[0] || t.domainByLevel[0] === "*") && (n[1] === t.domainByLevel[1] || t.domainByLevel[1] === "*" || t.domainByLevel[1] === void 0);
}
function Zf(e) {
  return {
    prefix: e.replace(/\*$/, ""),
    prefixDepth: Math.max(1, e.split("/").length - 1),
    isWildcard: e.endsWith("*")
  };
}
function ed(e, t) {
  return e.prefixDepth > t.prefixDepth ? 1 : e.prefixDepth < t.prefixDepth ? -1 : e.isWildcard !== t.isWildcard ? e.isWildcard ? -1 : 1 : e.prefix.length !== t.prefix.length ? e.prefix.length < t.prefix.length ? -1 : 1 : 0;
}
function td(e, t) {
  if (e === t.prefix)
    return !0;
  if (!t.isWildcard)
    return !1;
  if (t.prefix === "")
    return !0;
  const n = t.prefix, s = n.endsWith("/") ? n : `${n}/`;
  return e.startsWith(s);
}
function nd(e) {
  const [t, n] = e.split("=");
  return {
    name: t,
    value: n,
    isWildcard: n === "*" || n === void 0
  };
}
function sd(e) {
  return {
    parameterRuleList: e.replace(/^\?/, "").split("&").filter((t) => t !== "").map(nd)
  };
}
function id(e, t) {
  return e.parameterRuleList.length > t.parameterRuleList.length ? 1 : e.parameterRuleList.length < t.parameterRuleList.length ? -1 : 0;
}
function rd(e, t) {
  const [n, s] = e.split("=");
  return t.name === n && (t.isWildcard || t.value === s);
}
function od(e, t) {
  const n = e.replace(/^\?/, "").split("&");
  return t.parameterRuleList.filter((i) => !n.some((r) => rd(r, i))).length === 0;
}
function ad(e, t) {
  let n, s;
  const i = e.startsWith("!");
  if (e.includes("*")) {
    const o = e.split("/");
    o[1] === "" && o.length > 2 && (o[2] = o[2].replace(/\*/g, "wildcardchar"));
    const a = o.join("/");
    n = new URL(i ? a.substring(1) : a), s = n.host.replace(/wildcardchar/g, "*"), s = s.replace(/\*$/, "");
  } else
    n = new URL(i ? e.substring(1) : e), s = n.host;
  const r = /(\*|\.[a-z]+)$/i.test(n.pathname) ? "" : "*";
  return {
    rule: e,
    domain: Yf(s),
    path: Zf(n.pathname + r),
    query: sd(n.search),
    isException: i,
    merchantId: t
  };
}
function cd(e, t) {
  const n = zf(e.domain, t.domain);
  return n !== 0 ? n : e.isException !== t.isException ? e.isException ? 1 : -1 : ed(e.path, t.path) || id(e.query, t.query);
}
function ld(e, t) {
  return Qf(e.host, t.domain) && td(e.pathname, t.path) && od(e.search, t.query);
}
function ud(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  return Array.isArray(e) ? (e.forEach((s) => {
    try {
      Array.isArray(s.attributes.cartDomains) && s.attributes.cartDomains.forEach((i) => {
        var r;
        const o = ad(`${i}`, +s.id), a = o.domain.domainByLevel.slice(0, 2).reverse().join("."), c = (r = t.get(a)) !== null && r !== void 0 ? r : [];
        c.push(o), c.sort(cd), t.set(a, c);
      });
    } catch {
      n.push(new Error(`Invalid item: ${JSON.stringify(s)}`));
    }
  }), [t, n]) : (n.push(new Error(`Invalid data: ${JSON.stringify(e)}`)), [t, n]);
}
function fd(e, t, n = !0) {
  return pd(dd(e, t, (s) => s.isException || n ? ld(e, s) : Xf(e.hostname, s.domain)));
}
function dd(e, t, n) {
  var s;
  return t instanceof Map && (t = (s = t.get(hd(e.hostname))) !== null && s !== void 0 ? s : []), t.filter((i) => n(i, e));
}
function hd(e) {
  return e.split(".").slice(-2).join(".");
}
function pd(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  return e.forEach((s) => {
    t.set(s.merchantId, s);
  }), t.forEach((s, i) => {
    s.isException || n.push(i);
  }), n;
}
const Na = (e) => e !== null && typeof e == "object" && typeof e.selector == "string", Fa = (e) => typeof e == "string", Si = (e) => {
  if (Na(e))
    return e.selector;
  if (Fa(e))
    return e;
}, Va = (e, t = document.body) => {
  const n = Si(e);
  if (n === void 0 || n === "")
    return null;
  try {
    return t.querySelector(n);
  } catch {
    return console.error(
      "querySelector",
      "invalid selector",
      // FIXME: A4C CouponApplier code handles jQuery selectors that aren't used
      // in any config at the time of writing these lines. If they added one, we
      // should add support for them here
      /:(first|last|visible|contains)[^-]/.test(n),
      n
    ), null;
  }
}, gd = (e, t) => Array.from(e.url).some((n) => {
  try {
    return t.includes(n) || new RegExp(n, "ig").test(t);
  } catch {
    return !1;
  }
}), bd = (e) => [
  ...e.requiredFields ?? [],
  Si(e.controls.total) ?? "",
  Si(e.controls.promo) ?? ""
].every((n) => Va(n) !== null), md = (e) => e != null && typeof e == "object" && ("match" in e || "from" in e && "to" in e), yd = (e, t) => {
  var s;
  let n = e;
  if (n === "")
    return n;
  if ("match" in t) {
    const { match: i, matchIndex: r = "0", flags: o = "i" } = t;
    try {
      const a = new RegExp(i, o), c = ((s = n.match(a)) == null ? void 0 : s[+r]) ?? void 0;
      typeof c == "string" && (n = c);
    } catch {
      console.error("formatString", "invalid formatter", t);
    }
  }
  if ("from" in t && "to" in t) {
    const { from: i, to: r } = t;
    try {
      const o = new RegExp(i, "gi"), a = n.replace(o, r);
      typeof a == "string" && (n = a);
    } catch {
      console.error("formatString", "invalid formatter", t);
    }
  }
  return n;
}, Wr = (e, t) => {
  let n = e;
  n.includes(",") && !n.includes(".") && (n = n.replace(",", ".")), t && (n = yd(n, t)), n = n.replace(/^\$|^€/gim, "").replace("€", "").replace("$", "").replace(/[.,]+$/, "").replace(/[^\d.,\n]/gim, "").replace(/\n/gim, "").trim(), n = n.substring(n.length - 3).match(/,|\./g) ? n : n.replace(/,|\./g, "");
  const s = n.indexOf(","), i = n.indexOf(".");
  s > i ? n = n.replace(".", "").replace(",", ".") : (s < i || i < 0) && (n = n.replace(",", ""));
  const r = Number.parseFloat(n);
  return Number.isNaN(r) ? 0 : r;
}, eh = (e, t = document.body) => {
  if (e == null)
    return 0;
  const n = md(e) ? e : void 0;
  let s;
  if (Fa(e) && (s = { selector: e }), Na(e) && (s = e), s !== void 0) {
    const i = typeof t == "string" ? new DOMParser().parseFromString(t, "text/html") : t, r = Va(s, i);
    return r === null || r.innerText === "" ? 0 : Wr(r.innerText, n);
  }
  return typeof t == "string" && n !== void 0 ? Wr(t, n) : 0;
};
content;
function ms(e) {
  return {
    ...e,
    cashback: Us(e.cashback) ? e.cashback : void 0
  };
}
content;
const Sd = /([/.?]|mon|my|shop|shopping|show|view|voir)[_-]?(bag|basket|booking|caddie|cart|checkout|chariot|commande|inscription|order|panier|paiement|payment|PBShoppingCart|reservation|subscription)/i;
class _d {
  constructor(t, n) {
    re(this, "eventBus", null);
    re(this, "shoppingCartPageDetectionInterval");
    re(this, "sidebarStore", Rt());
    re(this, "businessService");
    re(this, "getCurrentUrl");
    re(this, "hasSidebarOpenStatusBeenReadFromSidebarInitData", !1);
    this.businessService = t, this.getCurrentUrl = n, this.initShoppingCartDetection();
    const s = () => {
      this.sidebarStore.now = /* @__PURE__ */ new Date(), requestAnimationFrame(s);
    };
    requestAnimationFrame(s);
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(t) {
    this.eventBus = t;
  }
  subscribeSelf(t) {
    t == null || t.subscribe(
      "authModalDisplayRequested",
      this.onAuthModalDisplayRequested.bind(this)
    ), t == null || t.subscribe(
      "notificationClicked",
      this.onNotificationClicked.bind(this)
    ), t == null || t.subscribe(
      "tabUrlChanged",
      this.onTabUrlChanged.bind(this)
    ), t == null || t.subscribe(
      "tabVisibilityChanged",
      this.onTabVisibilityChanged.bind(this)
    ), t == null || t.subscribe(
      "toggleSidebarOpenStatusMessageReceived",
      this.onToggleSidebarOpenStatusMessageReceived.bind(this)
    ), t == null || t.subscribe(
      "updateSidebarStoreMessageReceived",
      this.onUpdateSidebarStoreMessageReceived.bind(this)
    );
  }
  unsubscribeSelf(t) {
    t == null || t.unsubscribe(
      "authModalDisplayRequested",
      this.onAuthModalDisplayRequested.bind(this)
    ), t == null || t.unsubscribe(
      "notificationClicked",
      this.onNotificationClicked.bind(this)
    ), t == null || t.unsubscribe(
      "tabUrlChanged",
      this.onTabUrlChanged.bind(this)
    ), t == null || t.unsubscribe(
      "tabVisibilityChanged",
      this.onTabVisibilityChanged.bind(this)
    ), t == null || t.unsubscribe(
      "toggleSidebarOpenStatusMessageReceived",
      this.onToggleSidebarOpenStatusMessageReceived.bind(this)
    ), t == null || t.unsubscribe(
      "updateSidebarStoreMessageReceived",
      this.onUpdateSidebarStoreMessageReceived.bind(this)
    );
  }
  async onAuthModalDisplayRequested(t) {
    return this.sidebarStore.authModalInitialMode = t.details.initialMode, this.sidebarStore.authModalMerchant = t.details.merchant, this.sidebarStore.isAuthModalOpen = !0, Promise.resolve();
  }
  async onNotificationClicked() {
    return this.sidebarStore.isSidebarOpen = !0, this.sidebarStore.selectedMenuItemId = "home", Promise.resolve();
  }
  async onTabUrlChanged() {
    if (document.visibilityState === "visible")
      return this.updateSidebarStore();
  }
  async onTabVisibilityChanged() {
    if (document.visibilityState === "visible")
      return this.updateSidebarStore();
  }
  async onToggleSidebarOpenStatusMessageReceived() {
    return this.sidebarStore.isSidebarOpen = !this.sidebarStore.isSidebarOpen, Promise.resolve();
  }
  async onUpdateSidebarStoreMessageReceived() {
    return this.updateSidebarStore();
  }
  async updateSidebarStore() {
    var t, n, s, i;
    try {
      await this.businessService.checkStorageHealth();
    } catch (r) {
      this.sidebarStore.setError(r);
      return;
    }
    try {
      this.sidebarStore.setUrl(this.getCurrentUrl());
      const {
        isOpen: r,
        isUserSolicitationAllowedByReferrer: o,
        availableMerchants: a,
        selectedMerchantIndex: c,
        similarMerchants: u,
        user: l
      } = await this.businessService.getSidebarInitData();
      if (this.sidebarStore.setError(void 0), this.hasSidebarOpenStatusBeenReadFromSidebarInitData || (this.sidebarStore.setIsSidebarOpen(r), this.hasSidebarOpenStatusBeenReadFromSidebarInitData = !0), this.sidebarStore.setIsUserSolicitationAllowedByReferrer(
        o
      ), this.sidebarStore.setAvailableMerchants(
        a.map(ms)
      ), this.sidebarStore.setSelectedMerchantIndex(c), this.sidebarStore.setSimilarMerchants(
        u.map(ms)
      ), this.sidebarStore.setUser(l), !(l != null && l.isLogged)) {
        const p = await this.businessService.getTrustpilotReviews(5);
        this.sidebarStore.setTrustpilotReviews(p);
      }
      const d = ((t = this.sidebarStore.selectedMerchant) == null ? void 0 : t.id) ?? -1;
      if (d > -1) {
        const [
          p,
          g,
          m,
          S,
          R
        ] = await Promise.all([
          this.businessService.getCachedSingleUseOfferCodes(),
          this.businessService.getCashbackActivation(d),
          this.businessService.getCouponApplierConfig(d),
          this.businessService.getMerchantOffers(d),
          this.businessService.getMerchantBonuses(d)
        ]), I = (g == null ? void 0 : g.timestamp) ?? -1;
        this.sidebarStore.setCachedSingleUseOfferCodes(
          p
        ), this.sidebarStore.setSelectedMerchantBonuses(R), this.sidebarStore.setSelectedMerchantCashbackActivationTimestamp(I), this.sidebarStore.setSelectedMerchantCouponApplierConfig(m), this.sidebarStore.setSelectedMerchantOffers(S);
      } else
        this.sidebarStore.setCachedSingleUseOfferCodes([]), this.sidebarStore.setSelectedMerchantBonuses([]), this.sidebarStore.setSelectedMerchantCashbackActivationTimestamp(-1), this.sidebarStore.setSelectedMerchantCouponApplierConfig(void 0), this.sidebarStore.setSelectedMerchantOffers([]);
    } catch (r) {
      if (this.sidebarStore.setError(r), r != null && r.toString().includes("Extension context invalidated"))
        return;
    }
    this.sidebarStore.isAuthModalOpen && ((n = this.sidebarStore.user) == null ? void 0 : n.isLogged) === !0 && (this.sidebarStore.isAuthModalOpen = ((s = this.sidebarStore.authModalMerchant) == null ? void 0 : s.cashback) !== void 0), (i = this.eventBus) == null || i.publish({
      type: "sidebarStoreUpdated",
      details: {
        store: this.sidebarStore
      }
    });
  }
  initShoppingCartDetection() {
    const t = (s) => [
      // may change due to calls to History API
      s.url,
      // may be empty between location change and store update
      s.availableMerchants.map((i) => i.id).join(","),
      // may change due to user interactions
      s.selectedMerchantIndex,
      // may change due to DOM updates
      s.selectedMerchantCouponApplierConfigMatchesPageContent
    ].join("|");
    let n = t(this.sidebarStore.$state);
    this.sidebarStore.$subscribe((s, i) => {
      var d;
      const r = t(i);
      if (r === n)
        return;
      n = r, clearInterval(this.shoppingCartPageDetectionInterval);
      let o = !1;
      const a = [], { url: c, selectedMerchantIndex: u } = i, l = i.availableMerchants.filter(
        (p, g) => u === -1 ? !0 : g === u
      );
      if (l.length > 0)
        try {
          const { pathname: p, search: g } = new URL(c);
          Sd.test(p + g) && (o = !0, a.push({
            method: "heuristics",
            merchant: l[0]
          }));
        } catch {
        }
      for (const p of l)
        try {
          const [g, m] = ud([
            {
              type: "merchant",
              id: `${p.id}`,
              attributes: {
                cartDomains: p.cartDomains
              }
            }
          ]);
          if (m[0])
            throw m[0];
          if (fd(new URL(c), g).length > 0) {
            o = !0, a.push({
              method: "cloudMerchantData",
              merchant: p
            });
            break;
          }
        } catch {
          console.error(
            new Error(
              `Unable to parse cart domains from merchant ${p.id}`
            )
          );
        }
      if (o !== i.isShoppingCartPage && (this.sidebarStore.setIsShoppingCartPage(o), (d = this.eventBus) == null || d.publish({
        type: "sidebarStoreUpdated",
        details: { store: this.sidebarStore }
      }), o))
        for (const {
          method: p,
          merchant: g
        } of a)
          this.businessService.trackShoppingCartPageDetectionSuccess(
            sn(g),
            p
          ).catch(console.error);
      this.shoppingCartPageDetectionInterval = setInterval(() => {
        var I;
        const p = i.selectedMerchantCouponApplierConfig, g = p !== void 0 && gd(p, c), m = p !== void 0 && document.readyState !== "loading" && bd(p);
        g && m && clearInterval(this.shoppingCartPageDetectionInterval), o = g && m || i.isShoppingCartPage;
        const S = i.availableMerchants[i.selectedMerchantIndex];
        (i.isShoppingCartPage !== o || i.selectedMerchantCouponApplierConfigMatchesPageUrl !== g || i.selectedMerchantCouponApplierConfigMatchesPageContent !== m) && (S !== void 0 && g && m && this.businessService.trackShoppingCartPageDetectionSuccess(
          sn(S),
          "couponApplierConfig"
        ).catch(console.error), this.sidebarStore.setIsShoppingCartPage(o), this.sidebarStore.setSelectedMerchantCouponApplierConfigMatchesPageUrl(
          g
        ), this.sidebarStore.setSelectedMerchantCouponApplierConfigMatchesPageContent(
          m
        ), (I = this.eventBus) == null || I.publish({
          type: "sidebarStoreUpdated",
          details: { store: this.sidebarStore }
        }));
      }, 300);
    });
  }
}
content;
class vd {
  constructor() {
    re(this, "eventBus", null);
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(t) {
    this.eventBus = t;
  }
  async handleMessage(t) {
    var n;
    if (!ys(t, "showNotification"))
      return Promise.resolve(void 0);
    if (t.id === void 0)
      throw new Error(`No ID set for runtime message ${t.type}`);
    return (n = this.eventBus) == null || n.publish({
      type: "showNotificationMessageReceived",
      details: t.payload
    }), Promise.resolve({
      type: "showNotificationReply",
      inReplyTo: t.id,
      payload: void 0
    });
  }
}
content;
class Cd {
  constructor() {
    re(this, "eventBus", null);
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(t) {
    this.eventBus = t;
  }
  async handleMessage(t) {
    var n;
    if (ys(t, "toggleSidebarOpenStatus")) {
      if (t.id === void 0)
        throw new Error(`No ID set for runtime message ${t.type}`);
      return (n = this.eventBus) == null || n.publish({
        type: "toggleSidebarOpenStatusMessageReceived",
        details: {}
      }), Promise.resolve(void 0);
    }
  }
}
content;
class wd {
  constructor() {
    re(this, "eventBus", null);
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(t) {
    this.eventBus = t;
  }
  async handleMessage(t) {
    var n;
    if (ys(t, "updateSidebarStore")) {
      if (t.id === void 0)
        throw new Error(`No ID set for runtime message ${t.type}`);
      return (n = this.eventBus) == null || n.publish({
        type: "updateSidebarStoreMessageReceived",
        details: {}
      }), Promise.resolve(void 0);
    }
  }
}
content;
class Md {
  constructor(t) {
    re(this, "businessService");
    this.businessService = t;
  }
  async revealOffers(t, n = !1) {
    return Promise.all(
      t.map(async (s) => this.revealOffer(s, n))
    );
  }
  async revealOffer(t, n = !1) {
    let s = t;
    if (s.codeType !== "multiple" || s.codeFetchingStatus === "success")
      return s;
    n || (s = { ...s }), s.code = "", s.codeFetchingStatus = "ongoing", s.codeFetchingError = void 0;
    try {
      s.code = await this.businessService.getSingleUseOfferCode(s.id), s.codeFetchingStatus = "success", s.codeFetchingError = void 0;
    } catch (i) {
      s.code = "", s.codeFetchingStatus = "failure", s.codeFetchingError = i instanceof Error ? i : new Error("Unable to fetch single use offer code");
    }
    return s;
  }
}
content;
(async () => {
  const e = await _i, t = new vi(e), n = new Md(t), s = Pa();
  Fn(s);
  const i = new qf(
    t,
    n,
    De
  ), r = new Jf(), o = new Gf(
    t
  ), a = new Bf(t), c = new _d(
    t,
    () => e.getCurrentUrl()
  );
  i.subscribeSelf(De), r.subscribeSelf(De), o.subscribeSelf(De), a.subscribeSelf(De), c.subscribeSelf(De);
  const u = new vd(), l = new Cd(), d = new wd();
  c.setPublishTarget(De), u.setPublishTarget(De), l.setPublishTarget(De), d.setPublishTarget(De), e.getMessagingService().addMessageHandler(u), e.getMessagingService().addMessageHandler(l), e.getMessagingService().addMessageHandler(d);
  const p = [
    yf,
    mf,
    pf,
    _f,
    bf,
    Sf
  ];
  for (const I of p)
    o.registerNotificationFactory(I);
  await Promise.all([
    a.onUpdateSidebarStoreMessageReceived(),
    c.onUpdateSidebarStoreMessageReceived()
  ]);
  const { mountPointElement: g, rootElement: m } = e.createAppMountPoint(
    document.documentElement,
    ""
  ), S = `#${m.id}`, R = Ds({
    provide: {
      businessService: t,
      foregroundRuntime: e
    },
    render: () => [
      // we register this modal here and not in the coupon applier launcher
      // module because we may need to load it on page load if the page is
      // reloaded during a test,
      It(Mf),
      It(Kf, {
        rootSelector: S
      }),
      It(Vf)
    ]
  });
  R.use(s), R.directive("tag", Hi), R.directive("track", Mn), R.mount(g);
})().catch(console.error);
content;
const Ad = /^https?:\/\/www\.bing\.com\/search\?/, xd = /^https?:\/\/www\.ecosia\.org\/search\?/, Td = /^https?:\/\/www\.google\.[a-z.]+\/search\?/, Ed = /^https?:\/\/.*\.search\.yahoo\.com\/search.*/;
content;
const Od = [
  {
    urlPattern: Ad,
    importFn: async () => (await import("./bingSerpParser-BmTJu1wD.js")).bingSerpParser
  },
  {
    urlPattern: xd,
    importFn: async () => (await import("./ecosiaSerpParser-BptRgx8D.js")).ecosiaSerpParser
  },
  {
    urlPattern: Td,
    importFn: async () => (await import("./googleSerpParser-DnNT0SgA.js")).googleSerpParser
  },
  {
    urlPattern: Ed,
    importFn: async () => (await import("./yahooSerpParser-C4oaCres.js")).yahooSerpParser
  }
], Id = async (e) => {
  var t;
  return (t = Od.find((n) => n.urlPattern.test(e))) == null ? void 0 : t.importFn();
};
content;
const Pd = new Promise((e) => {
  document.readyState !== "loading" ? e() : document.addEventListener("DOMContentLoaded", () => {
    e();
  });
});
content;
const kd = {
  click: !0,
  impression: !0,
  scroll: !1
};
function Kr(e, t = "", n = {}, s = kd) {
  const i = [
    [
      Hi,
      {
        ...e === "" ? {} : { label: e },
        pageViewType: t,
        // De-proxifies linked entities to prevent serialization errors in Firefox
        linkedEntities: sn(n)
      }
    ]
  ];
  return e === "" || (s.click && i.push([
    Mn,
    "extension_component_click",
    "click",
    { once: !1 }
  ]), s.impression && i.push([
    Mn,
    "extension_component_impression",
    "impression",
    { once: !0 }
  ]), s.scroll && i.push([
    Mn,
    "extension_component_scroll",
    "scroll",
    { once: !0 }
  ])), i;
}
content;
(async () => {
  var d;
  const e = await _i, t = await Id(e.getCurrentUrl());
  if (t === void 0)
    return;
  const n = new vi(e);
  try {
    await n.checkStorageHealth();
  } catch (p) {
    console.error(p);
    return;
  }
  const s = await n.getAllParameters();
  if (!s.privacy_allow_required_tracking)
    return;
  await Pd;
  const i = /* @__PURE__ */ qt(
    () => import("./SerpSnippetMerchantsAndOffers-CPystY5g.js")
  ), r = /* @__PURE__ */ qt(
    () => import("./SerpSnippetRoot-oo5UU54u.js")
  ), o = /* @__PURE__ */ qt(
    () => import("./SerpSnippetSimilarMerchants-DPB-Y05A.js")
  ), a = [
    {
      name: "similarMerchants",
      slot: "after_description",
      enabled: s.search_engine_show_similar_merchants,
      needsRender: (p) => p.similarMerchants.length > 0,
      render: (p) => tr(
        It(o, {
          // biome-ignore lint/style/noNonNullAssertion: merchant is guaranteed to be defined on render
          merchant: p.merchants[0],
          similarMerchants: p.similarMerchants
        }),
        Kr("SimilarMerchants", "", {
          merchant: p.merchants[0]
        })
      )
    },
    {
      name: "merchants",
      slot: "before_description",
      enabled: s.search_engine_show_offers,
      needsRender: (p) => p.merchants.length > 0,
      render: (p) => {
        var g;
        return tr(
          It(i, {
            merchants: p.merchants,
            targetUrl: p.targetUrl
          }),
          Kr("MerchantsAndOffers", "", {
            merchant: p.merchants.length === 1 ? p.merchants[0] : void 0,
            cashbackOffer: p.merchants.length === 1 ? (g = p.merchants[0]) == null ? void 0 : g.cashback : void 0
          })
        );
      }
    }
  ];
  if (!a.some((p) => p.enabled))
    return;
  const c = async (p, g) => {
    const m = await Promise.all(
      p.map(async (R, I) => {
        var F;
        const V = g + I + 1;
        try {
          const k = t.getDisplayedUrl(R) ?? "", O = t.getTargetUrl(R) ?? "", D = k || O;
          if (D === "")
            return { status: "Abortion: No URL to parse", position: V };
          const j = await n.getMerchantsByUrl(D);
          if (j.length === 0)
            return { status: "Abortion: No merchants found", position: V, url: D };
          const z = j.filter((x) => x.extensionOffersStatus && x.extensionSerpStatus);
          if (z.length === 0)
            return {
              status: "Abortion: No eligible merchants found",
              position: V,
              url: D,
              merchants: j
            };
          let L = [];
          !z.some((x) => x.isAffiliated) && s.search_engine_show_similar_merchants && (L = await n.getSimilarMerchants(
            ((F = z[0]) == null ? void 0 : F.id) ?? -1
          ));
          const T = {
            merchants: z.map(ms),
            similarMerchants: L.map(
              ms
            ),
            targetUrl: O
          };
          for (const x of a) {
            if (!x.enabled || !x.needsRender(T))
              continue;
            const w = x.slot;
            if (!t.canHostSnippet(R, w))
              return {
                status: "Abortion: No place for snippet",
                position: V,
                url: D,
                slot: w
              };
            const K = document.createElement("div"), { mountPointElement: B } = e.createAppMountPoint(K);
            K.addEventListener("click", (Z) => {
              Z.stopImmediatePropagation(), n.registerUserClick(!0).catch(console.error);
            });
            const oe = Ds({
              provide: {
                businessService: n,
                foregroundRuntime: e
              },
              render: () => It(
                r,
                {
                  position: V,
                  colorSchemes: t.colorSchemes
                },
                () => x.render(T)
              )
            });
            if (oe.use(Pa()), oe.directive("tag", Hi), oe.directive("track", Mn), oe.mount(B), !t.addSnippetContainerToResult(K, R, w))
              return {
                status: "Abortion: No more place for snippet",
                position: V,
                url: D,
                slot: w
              };
          }
          return { status: "Success", position: V, url: D };
        } catch (k) {
          return console.error(k), { status: "Abortion: Unexpected error", position: V, error: k };
        }
      })
    ), S = m.reduce((R, I) => (R[I.status] = (R[I.status] ?? 0) + 1, R), {});
    console.debug("Poulpeo extension snippet render status"), console.table(S), console.table(m);
  }, u = t.getResultList();
  let l = u.length;
  (d = t.addResultListUpdateListener) == null || d.call(t, (p) => {
    c(Array.from(p), l).catch(console.error), l += p.length;
  }), await c(Array.from(u), 0);
})().catch(console.error);
content;
const th = async (e) => {
};
content;
export {
  Bd as $,
  Yd as A,
  La as B,
  zt as C,
  Dn as D,
  Ka as E,
  de as F,
  Ja as G,
  ys as H,
  eh as I,
  Ad as J,
  xd as K,
  Td as L,
  Ed as M,
  Da as N,
  Rt as O,
  qt as P,
  De as Q,
  lt as R,
  zd as S,
  Xd as T,
  Hd as U,
  Kd as V,
  Ms as W,
  Ld as X,
  Gl as Y,
  Zd as Z,
  ji as _,
  at as a,
  Gd as a0,
  Fo as a1,
  Es as a2,
  wo as a3,
  ae as a4,
  Wd as a5,
  qd as a6,
  al as a7,
  Jd as a8,
  It as a9,
  Qd as aa,
  Ua as ab,
  $f as ac,
  nn as ad,
  Hf as ae,
  wn as af,
  Wi as ag,
  Kr as ah,
  sl as ai,
  Us as aj,
  $d as ak,
  ns as al,
  Vn as am,
  ms as an,
  th as ao,
  gn as b,
  Te as c,
  Rn as d,
  Ie as e,
  Nd as f,
  Xt as g,
  en as h,
  Gc as i,
  te as j,
  jd as k,
  Ud as l,
  Bl as m,
  Pt as n,
  le as o,
  _o as p,
  ge as q,
  Vd as r,
  Jt as s,
  it as t,
  Vt as u,
  Nt as v,
  tr as w,
  Dd as x,
  Fd as y,
  ll as z
};
content;
