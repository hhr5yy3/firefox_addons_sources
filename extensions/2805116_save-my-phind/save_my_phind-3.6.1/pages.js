"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/@lit/reactive-element/css-tag.js
  var t, e, s, o, n, r, i, S, c;
  var init_css_tag = __esm({
    "node_modules/@lit/reactive-element/css-tag.js"() {
      t = globalThis;
      e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
      s = Symbol();
      o = /* @__PURE__ */ new WeakMap();
      n = class {
        constructor(t4, e6, o4) {
          if (this._$cssResult$ = true, o4 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
          this.cssText = t4, this.t = e6;
        }
        get styleSheet() {
          let t4 = this.o;
          const s2 = this.t;
          if (e && void 0 === t4) {
            const e6 = void 0 !== s2 && 1 === s2.length;
            e6 && (t4 = o.get(s2)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s2, t4));
          }
          return t4;
        }
        toString() {
          return this.cssText;
        }
      };
      r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
      i = (t4, ...e6) => {
        const o4 = 1 === t4.length ? t4[0] : e6.reduce((e7, s2, o5) => e7 + ((t5) => {
          if (true === t5._$cssResult$) return t5.cssText;
          if ("number" == typeof t5) return t5;
          throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s2) + t4[o5 + 1], t4[0]);
        return new n(o4, t4, s);
      };
      S = (s2, o4) => {
        if (e) s2.adoptedStyleSheets = o4.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
        else for (const e6 of o4) {
          const o5 = document.createElement("style"), n5 = t.litNonce;
          void 0 !== n5 && o5.setAttribute("nonce", n5), o5.textContent = e6.cssText, s2.appendChild(o5);
        }
      };
      c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
        let e6 = "";
        for (const s2 of t5.cssRules) e6 += s2.cssText;
        return r(e6);
      })(t4) : t4;
    }
  });

  // node_modules/@lit/reactive-element/reactive-element.js
  var i2, e2, r2, h, o2, n2, a, c2, l, p, d, u, f, y, b;
  var init_reactive_element = __esm({
    "node_modules/@lit/reactive-element/reactive-element.js"() {
      init_css_tag();
      init_css_tag();
      ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
      a = globalThis;
      c2 = a.trustedTypes;
      l = c2 ? c2.emptyScript : "";
      p = a.reactiveElementPolyfillSupport;
      d = (t4, s2) => t4;
      u = { toAttribute(t4, s2) {
        switch (s2) {
          case Boolean:
            t4 = t4 ? l : null;
            break;
          case Object:
          case Array:
            t4 = null == t4 ? t4 : JSON.stringify(t4);
        }
        return t4;
      }, fromAttribute(t4, s2) {
        let i4 = t4;
        switch (s2) {
          case Boolean:
            i4 = null !== t4;
            break;
          case Number:
            i4 = null === t4 ? null : Number(t4);
            break;
          case Object:
          case Array:
            try {
              i4 = JSON.parse(t4);
            } catch (t5) {
              i4 = null;
            }
        }
        return i4;
      } };
      f = (t4, s2) => !i2(t4, s2);
      y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
      Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
      b = class extends HTMLElement {
        static addInitializer(t4) {
          this._$Ei(), (this.l ??= []).push(t4);
        }
        static get observedAttributes() {
          return this.finalize(), this._$Eh && [...this._$Eh.keys()];
        }
        static createProperty(t4, s2 = y) {
          if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t4, s2), !s2.noAccessor) {
            const i4 = Symbol(), r5 = this.getPropertyDescriptor(t4, i4, s2);
            void 0 !== r5 && e2(this.prototype, t4, r5);
          }
        }
        static getPropertyDescriptor(t4, s2, i4) {
          const { get: e6, set: h4 } = r2(this.prototype, t4) ?? { get() {
            return this[s2];
          }, set(t5) {
            this[s2] = t5;
          } };
          return { get() {
            return e6 == null ? void 0 : e6.call(this);
          }, set(s3) {
            const r5 = e6 == null ? void 0 : e6.call(this);
            h4.call(this, s3), this.requestUpdate(t4, r5, i4);
          }, configurable: true, enumerable: true };
        }
        static getPropertyOptions(t4) {
          return this.elementProperties.get(t4) ?? y;
        }
        static _$Ei() {
          if (this.hasOwnProperty(d("elementProperties"))) return;
          const t4 = n2(this);
          t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
        }
        static finalize() {
          if (this.hasOwnProperty(d("finalized"))) return;
          if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
            const t5 = this.properties, s2 = [...h(t5), ...o2(t5)];
            for (const i4 of s2) this.createProperty(i4, t5[i4]);
          }
          const t4 = this[Symbol.metadata];
          if (null !== t4) {
            const s2 = litPropertyMetadata.get(t4);
            if (void 0 !== s2) for (const [t5, i4] of s2) this.elementProperties.set(t5, i4);
          }
          this._$Eh = /* @__PURE__ */ new Map();
          for (const [t5, s2] of this.elementProperties) {
            const i4 = this._$Eu(t5, s2);
            void 0 !== i4 && this._$Eh.set(i4, t5);
          }
          this.elementStyles = this.finalizeStyles(this.styles);
        }
        static finalizeStyles(s2) {
          const i4 = [];
          if (Array.isArray(s2)) {
            const e6 = new Set(s2.flat(1 / 0).reverse());
            for (const s3 of e6) i4.unshift(c(s3));
          } else void 0 !== s2 && i4.push(c(s2));
          return i4;
        }
        static _$Eu(t4, s2) {
          const i4 = s2.attribute;
          return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
        }
        constructor() {
          super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
        }
        _$Ev() {
          var _a2;
          this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t4) => t4(this));
        }
        addController(t4) {
          var _a2;
          (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t4.hostConnected) == null ? void 0 : _a2.call(t4));
        }
        removeController(t4) {
          var _a2;
          (_a2 = this._$EO) == null ? void 0 : _a2.delete(t4);
        }
        _$E_() {
          const t4 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
          for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t4.set(i4, this[i4]), delete this[i4]);
          t4.size > 0 && (this._$Ep = t4);
        }
        createRenderRoot() {
          const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
          return S(t4, this.constructor.elementStyles), t4;
        }
        connectedCallback() {
          var _a2;
          this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
            var _a3;
            return (_a3 = t4.hostConnected) == null ? void 0 : _a3.call(t4);
          });
        }
        enableUpdating(t4) {
        }
        disconnectedCallback() {
          var _a2;
          (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
            var _a3;
            return (_a3 = t4.hostDisconnected) == null ? void 0 : _a3.call(t4);
          });
        }
        attributeChangedCallback(t4, s2, i4) {
          this._$AK(t4, i4);
        }
        _$EC(t4, s2) {
          var _a2;
          const i4 = this.constructor.elementProperties.get(t4), e6 = this.constructor._$Eu(t4, i4);
          if (void 0 !== e6 && true === i4.reflect) {
            const r5 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u).toAttribute(s2, i4.type);
            this._$Em = t4, null == r5 ? this.removeAttribute(e6) : this.setAttribute(e6, r5), this._$Em = null;
          }
        }
        _$AK(t4, s2) {
          var _a2;
          const i4 = this.constructor, e6 = i4._$Eh.get(t4);
          if (void 0 !== e6 && this._$Em !== e6) {
            const t5 = i4.getPropertyOptions(e6), r5 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== ((_a2 = t5.converter) == null ? void 0 : _a2.fromAttribute) ? t5.converter : u;
            this._$Em = e6, this[e6] = r5.fromAttribute(s2, t5.type), this._$Em = null;
          }
        }
        requestUpdate(t4, s2, i4) {
          if (void 0 !== t4) {
            if (i4 ??= this.constructor.getPropertyOptions(t4), !(i4.hasChanged ?? f)(this[t4], s2)) return;
            this.P(t4, s2, i4);
          }
          false === this.isUpdatePending && (this._$ES = this._$ET());
        }
        P(t4, s2, i4) {
          this._$AL.has(t4) || this._$AL.set(t4, s2), true === i4.reflect && this._$Em !== t4 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t4);
        }
        async _$ET() {
          this.isUpdatePending = true;
          try {
            await this._$ES;
          } catch (t5) {
            Promise.reject(t5);
          }
          const t4 = this.scheduleUpdate();
          return null != t4 && await t4, !this.isUpdatePending;
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          var _a2;
          if (!this.isUpdatePending) return;
          if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
              for (const [t6, s3] of this._$Ep) this[t6] = s3;
              this._$Ep = void 0;
            }
            const t5 = this.constructor.elementProperties;
            if (t5.size > 0) for (const [s3, i4] of t5) true !== i4.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i4);
          }
          let t4 = false;
          const s2 = this._$AL;
          try {
            t4 = this.shouldUpdate(s2), t4 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t5) => {
              var _a3;
              return (_a3 = t5.hostUpdate) == null ? void 0 : _a3.call(t5);
            }), this.update(s2)) : this._$EU();
          } catch (s3) {
            throw t4 = false, this._$EU(), s3;
          }
          t4 && this._$AE(s2);
        }
        willUpdate(t4) {
        }
        _$AE(t4) {
          var _a2;
          (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t5) => {
            var _a3;
            return (_a3 = t5.hostUpdated) == null ? void 0 : _a3.call(t5);
          }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
        }
        _$EU() {
          this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$ES;
        }
        shouldUpdate(t4) {
          return true;
        }
        update(t4) {
          this._$Ej &&= this._$Ej.forEach((t5) => this._$EC(t5, this[t5])), this._$EU();
        }
        updated(t4) {
        }
        firstUpdated(t4) {
        }
      };
      b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");
    }
  });

  // node_modules/lit-html/lit-html.js
  function N(t4, i4) {
    if (!g(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== h2 ? h2.createHTML(i4) : i4;
  }
  function z(t4, i4, s2 = t4, e6) {
    var _a2, _b;
    if (i4 === R) return i4;
    let h4 = void 0 !== e6 ? (_a2 = s2.o) == null ? void 0 : _a2[e6] : s2.l;
    const o4 = st(i4) ? void 0 : i4._$litDirective$;
    return (h4 == null ? void 0 : h4.constructor) !== o4 && ((_b = h4 == null ? void 0 : h4._$AO) == null ? void 0 : _b.call(h4, false), void 0 === o4 ? h4 = void 0 : (h4 = new o4(t4), h4._$AT(t4, s2, e6)), void 0 !== e6 ? (s2.o ??= [])[e6] = h4 : s2.l = h4), void 0 !== h4 && (i4 = z(t4, h4._$AS(t4, i4.values), h4, e6)), i4;
  }
  var n3, c3, h2, f2, v, m, _, w, lt, st, g, $, x, T, E, k, O, S2, j, M, P, ke, Oe, Se, R, D, V, I, U, B, F, et, G, Y, Z, q, K, si, Re, Q;
  var init_lit_html = __esm({
    "node_modules/lit-html/lit-html.js"() {
      n3 = globalThis;
      c3 = n3.trustedTypes;
      h2 = c3 ? c3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
      f2 = "$lit$";
      v = `lit$${Math.random().toFixed(9).slice(2)}$`;
      m = "?" + v;
      _ = `<${m}>`;
      w = document;
      lt = () => w.createComment("");
      st = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
      g = Array.isArray;
      $ = (t4) => g(t4) || "function" == typeof (t4 == null ? void 0 : t4[Symbol.iterator]);
      x = "[ 	\n\f\r]";
      T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
      E = /-->/g;
      k = />/g;
      O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
      S2 = /'/g;
      j = /"/g;
      M = /^(?:script|style|textarea|title)$/i;
      P = (t4) => (i4, ...s2) => ({ _$litType$: t4, strings: i4, values: s2 });
      ke = P(1);
      Oe = P(2);
      Se = P(3);
      R = Symbol.for("lit-noChange");
      D = Symbol.for("lit-nothing");
      V = /* @__PURE__ */ new WeakMap();
      I = w.createTreeWalker(w, 129);
      U = (t4, i4) => {
        const s2 = t4.length - 1, e6 = [];
        let h4, o4 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", n5 = T;
        for (let i5 = 0; i5 < s2; i5++) {
          const s3 = t4[i5];
          let r5, l2, c4 = -1, a2 = 0;
          for (; a2 < s3.length && (n5.lastIndex = a2, l2 = n5.exec(s3), null !== l2); ) a2 = n5.lastIndex, n5 === T ? "!--" === l2[1] ? n5 = E : void 0 !== l2[1] ? n5 = k : void 0 !== l2[2] ? (M.test(l2[2]) && (h4 = RegExp("</" + l2[2], "g")), n5 = O) : void 0 !== l2[3] && (n5 = O) : n5 === O ? ">" === l2[0] ? (n5 = h4 ?? T, c4 = -1) : void 0 === l2[1] ? c4 = -2 : (c4 = n5.lastIndex - l2[2].length, r5 = l2[1], n5 = void 0 === l2[3] ? O : '"' === l2[3] ? j : S2) : n5 === j || n5 === S2 ? n5 = O : n5 === E || n5 === k ? n5 = T : (n5 = O, h4 = void 0);
          const u2 = n5 === O && t4[i5 + 1].startsWith("/>") ? " " : "";
          o4 += n5 === T ? s3 + _ : c4 >= 0 ? (e6.push(r5), s3.slice(0, c4) + f2 + s3.slice(c4) + v + u2) : s3 + v + (-2 === c4 ? i5 : u2);
        }
        return [N(t4, o4 + (t4[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e6];
      };
      B = class _B {
        constructor({ strings: t4, _$litType$: i4 }, s2) {
          let e6;
          this.parts = [];
          let h4 = 0, o4 = 0;
          const n5 = t4.length - 1, r5 = this.parts, [l2, a2] = U(t4, i4);
          if (this.el = _B.createElement(l2, s2), I.currentNode = this.el.content, 2 === i4 || 3 === i4) {
            const t5 = this.el.content.firstChild;
            t5.replaceWith(...t5.childNodes);
          }
          for (; null !== (e6 = I.nextNode()) && r5.length < n5; ) {
            if (1 === e6.nodeType) {
              if (e6.hasAttributes()) for (const t5 of e6.getAttributeNames()) if (t5.endsWith(f2)) {
                const i5 = a2[o4++], s3 = e6.getAttribute(t5).split(v), n6 = /([.?@])?(.*)/.exec(i5);
                r5.push({ type: 1, index: h4, name: n6[2], strings: s3, ctor: "." === n6[1] ? Y : "?" === n6[1] ? Z : "@" === n6[1] ? q : G }), e6.removeAttribute(t5);
              } else t5.startsWith(v) && (r5.push({ type: 6, index: h4 }), e6.removeAttribute(t5));
              if (M.test(e6.tagName)) {
                const t5 = e6.textContent.split(v), i5 = t5.length - 1;
                if (i5 > 0) {
                  e6.textContent = c3 ? c3.emptyScript : "";
                  for (let s3 = 0; s3 < i5; s3++) e6.append(t5[s3], lt()), I.nextNode(), r5.push({ type: 2, index: ++h4 });
                  e6.append(t5[i5], lt());
                }
              }
            } else if (8 === e6.nodeType) if (e6.data === m) r5.push({ type: 2, index: h4 });
            else {
              let t5 = -1;
              for (; -1 !== (t5 = e6.data.indexOf(v, t5 + 1)); ) r5.push({ type: 7, index: h4 }), t5 += v.length - 1;
            }
            h4++;
          }
        }
        static createElement(t4, i4) {
          const s2 = w.createElement("template");
          return s2.innerHTML = t4, s2;
        }
      };
      F = class {
        constructor(t4, i4) {
          this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i4;
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(t4) {
          const { el: { content: i4 }, parts: s2 } = this._$AD, e6 = ((t4 == null ? void 0 : t4.creationScope) ?? w).importNode(i4, true);
          I.currentNode = e6;
          let h4 = I.nextNode(), o4 = 0, n5 = 0, r5 = s2[0];
          for (; void 0 !== r5; ) {
            if (o4 === r5.index) {
              let i5;
              2 === r5.type ? i5 = new et(h4, h4.nextSibling, this, t4) : 1 === r5.type ? i5 = new r5.ctor(h4, r5.name, r5.strings, this, t4) : 6 === r5.type && (i5 = new K(h4, this, t4)), this._$AV.push(i5), r5 = s2[++n5];
            }
            o4 !== (r5 == null ? void 0 : r5.index) && (h4 = I.nextNode(), o4++);
          }
          return I.currentNode = w, e6;
        }
        p(t4) {
          let i4 = 0;
          for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t4, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t4[i4])), i4++;
        }
      };
      et = class _et {
        get _$AU() {
          var _a2;
          return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this.v;
        }
        constructor(t4, i4, s2, e6) {
          this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t4, this._$AB = i4, this._$AM = s2, this.options = e6, this.v = (e6 == null ? void 0 : e6.isConnected) ?? true;
        }
        get parentNode() {
          let t4 = this._$AA.parentNode;
          const i4 = this._$AM;
          return void 0 !== i4 && 11 === (t4 == null ? void 0 : t4.nodeType) && (t4 = i4.parentNode), t4;
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(t4, i4 = this) {
          t4 = z(this, t4, i4), st(t4) ? t4 === D || null == t4 || "" === t4 ? (this._$AH !== D && this._$AR(), this._$AH = D) : t4 !== this._$AH && t4 !== R && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : $(t4) ? this.k(t4) : this._(t4);
        }
        O(t4) {
          return this._$AA.parentNode.insertBefore(t4, this._$AB);
        }
        T(t4) {
          this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
        }
        _(t4) {
          this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(w.createTextNode(t4)), this._$AH = t4;
        }
        $(t4) {
          var _a2;
          const { values: i4, _$litType$: s2 } = t4, e6 = "number" == typeof s2 ? this._$AC(t4) : (void 0 === s2.el && (s2.el = B.createElement(N(s2.h, s2.h[0]), this.options)), s2);
          if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e6) this._$AH.p(i4);
          else {
            const t5 = new F(e6, this), s3 = t5.u(this.options);
            t5.p(i4), this.T(s3), this._$AH = t5;
          }
        }
        _$AC(t4) {
          let i4 = V.get(t4.strings);
          return void 0 === i4 && V.set(t4.strings, i4 = new B(t4)), i4;
        }
        k(t4) {
          g(this._$AH) || (this._$AH = [], this._$AR());
          const i4 = this._$AH;
          let s2, e6 = 0;
          for (const h4 of t4) e6 === i4.length ? i4.push(s2 = new _et(this.O(lt()), this.O(lt()), this, this.options)) : s2 = i4[e6], s2._$AI(h4), e6++;
          e6 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e6), i4.length = e6);
        }
        _$AR(t4 = this._$AA.nextSibling, i4) {
          var _a2;
          for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i4); t4 && t4 !== this._$AB; ) {
            const i5 = t4.nextSibling;
            t4.remove(), t4 = i5;
          }
        }
        setConnected(t4) {
          var _a2;
          void 0 === this._$AM && (this.v = t4, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t4));
        }
      };
      G = class {
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        constructor(t4, i4, s2, e6, h4) {
          this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t4, this.name = i4, this._$AM = e6, this.options = h4, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = D;
        }
        _$AI(t4, i4 = this, s2, e6) {
          const h4 = this.strings;
          let o4 = false;
          if (void 0 === h4) t4 = z(this, t4, i4, 0), o4 = !st(t4) || t4 !== this._$AH && t4 !== R, o4 && (this._$AH = t4);
          else {
            const e7 = t4;
            let n5, r5;
            for (t4 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r5 = z(this, e7[s2 + n5], i4, n5), r5 === R && (r5 = this._$AH[n5]), o4 ||= !st(r5) || r5 !== this._$AH[n5], r5 === D ? t4 = D : t4 !== D && (t4 += (r5 ?? "") + h4[n5 + 1]), this._$AH[n5] = r5;
          }
          o4 && !e6 && this.j(t4);
        }
        j(t4) {
          t4 === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
        }
      };
      Y = class extends G {
        constructor() {
          super(...arguments), this.type = 3;
        }
        j(t4) {
          this.element[this.name] = t4 === D ? void 0 : t4;
        }
      };
      Z = class extends G {
        constructor() {
          super(...arguments), this.type = 4;
        }
        j(t4) {
          this.element.toggleAttribute(this.name, !!t4 && t4 !== D);
        }
      };
      q = class extends G {
        constructor(t4, i4, s2, e6, h4) {
          super(t4, i4, s2, e6, h4), this.type = 5;
        }
        _$AI(t4, i4 = this) {
          if ((t4 = z(this, t4, i4, 0) ?? D) === R) return;
          const s2 = this._$AH, e6 = t4 === D && s2 !== D || t4.capture !== s2.capture || t4.once !== s2.once || t4.passive !== s2.passive, h4 = t4 !== D && (s2 === D || e6);
          e6 && this.element.removeEventListener(this.name, this, s2), h4 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
        }
        handleEvent(t4) {
          var _a2;
          "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t4) : this._$AH.handleEvent(t4);
        }
      };
      K = class {
        constructor(t4, i4, s2) {
          this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t4) {
          z(this, t4);
        }
      };
      si = { M: f2, P: v, A: m, C: 1, L: U, R: F, D: $, V: z, I: et, H: G, N: Z, U: q, B: Y, F: K };
      Re = n3.litHtmlPolyfillSupport;
      Re == null ? void 0 : Re(B, et), (n3.litHtmlVersions ??= []).push("3.2.0");
      Q = (t4, i4, s2) => {
        const e6 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
        let h4 = e6._$litPart$;
        if (void 0 === h4) {
          const t5 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
          e6._$litPart$ = h4 = new et(i4.insertBefore(lt(), t5), t5, void 0, s2 ?? {});
        }
        return h4._$AI(t4), h4;
      };
    }
  });

  // node_modules/lit-element/lit-element.js
  var h3, _a, f3;
  var init_lit_element = __esm({
    "node_modules/lit-element/lit-element.js"() {
      init_reactive_element();
      init_reactive_element();
      init_lit_html();
      init_lit_html();
      h3 = class extends b {
        constructor() {
          super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
        }
        createRenderRoot() {
          const t4 = super.createRenderRoot();
          return this.renderOptions.renderBefore ??= t4.firstChild, t4;
        }
        update(t4) {
          const e6 = this.render();
          this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this.o = Q(e6, this.renderRoot, this.renderOptions);
        }
        connectedCallback() {
          var _a2;
          super.connectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(true);
        }
        disconnectedCallback() {
          var _a2;
          super.disconnectedCallback(), (_a2 = this.o) == null ? void 0 : _a2.setConnected(false);
        }
        render() {
          return R;
        }
      };
      h3._$litElement$ = true, h3["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: h3 });
      f3 = globalThis.litElementPolyfillSupport;
      f3 == null ? void 0 : f3({ LitElement: h3 });
      (globalThis.litElementVersions ??= []).push("4.1.0");
    }
  });

  // node_modules/lit-html/is-server.js
  var init_is_server = __esm({
    "node_modules/lit-html/is-server.js"() {
    }
  });

  // node_modules/lit/index.js
  var init_lit = __esm({
    "node_modules/lit/index.js"() {
      init_reactive_element();
      init_lit_html();
      init_lit_element();
      init_is_server();
    }
  });

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t2;
  var init_custom_element = __esm({
    "node_modules/@lit/reactive-element/decorators/custom-element.js"() {
      t2 = (t4) => (e6, o4) => {
        void 0 !== o4 ? o4.addInitializer(() => {
          customElements.define(t4, e6);
        }) : customElements.define(t4, e6);
      };
    }
  });

  // node_modules/@lit/reactive-element/decorators/property.js
  function n4(t4) {
    return (e6, o4) => "object" == typeof o4 ? r3(t4, e6, o4) : ((t5, e7, o5) => {
      const r5 = e7.hasOwnProperty(o5);
      return e7.constructor.createProperty(o5, r5 ? { ...t5, wrapped: true } : t5), r5 ? Object.getOwnPropertyDescriptor(e7, o5) : void 0;
    })(t4, e6, o4);
  }
  var o3, r3;
  var init_property = __esm({
    "node_modules/@lit/reactive-element/decorators/property.js"() {
      init_reactive_element();
      o3 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
      r3 = (t4 = o3, e6, r5) => {
        const { kind: n5, metadata: i4 } = r5;
        let s2 = globalThis.litPropertyMetadata.get(i4);
        if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), s2.set(r5.name, t4), "accessor" === n5) {
          const { name: o4 } = r5;
          return { set(r6) {
            const n6 = e6.get.call(this);
            e6.set.call(this, r6), this.requestUpdate(o4, n6, t4);
          }, init(e7) {
            return void 0 !== e7 && this.P(o4, void 0, t4), e7;
          } };
        }
        if ("setter" === n5) {
          const { name: o4 } = r5;
          return function(r6) {
            const n6 = this[o4];
            e6.call(this, r6), this.requestUpdate(o4, n6, t4);
          };
        }
        throw Error("Unsupported decorator location: " + n5);
      };
    }
  });

  // node_modules/@lit/reactive-element/decorators/state.js
  function r4(r5) {
    return n4({ ...r5, state: true, attribute: false });
  }
  var init_state = __esm({
    "node_modules/@lit/reactive-element/decorators/state.js"() {
      init_property();
    }
  });

  // node_modules/@lit/reactive-element/decorators/event-options.js
  var init_event_options = __esm({
    "node_modules/@lit/reactive-element/decorators/event-options.js"() {
    }
  });

  // node_modules/@lit/reactive-element/decorators/base.js
  var e3;
  var init_base = __esm({
    "node_modules/@lit/reactive-element/decorators/base.js"() {
      e3 = (e6, t4, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t4 && Object.defineProperty(e6, t4, c4), c4);
    }
  });

  // node_modules/@lit/reactive-element/decorators/query.js
  function e4(e6, r5) {
    return (n5, s2, i4) => {
      const o4 = (t4) => {
        var _a2;
        return ((_a2 = t4.renderRoot) == null ? void 0 : _a2.querySelector(e6)) ?? null;
      };
      if (r5) {
        const { get: e7, set: r6 } = "object" == typeof s2 ? n5 : i4 ?? (() => {
          const t4 = Symbol();
          return { get() {
            return this[t4];
          }, set(e8) {
            this[t4] = e8;
          } };
        })();
        return e3(n5, s2, { get() {
          let t4 = e7.call(this);
          return void 0 === t4 && (t4 = o4(this), (null !== t4 || this.hasUpdated) && r6.call(this, t4)), t4;
        } });
      }
      return e3(n5, s2, { get() {
        return o4(this);
      } });
    };
  }
  var init_query = __esm({
    "node_modules/@lit/reactive-element/decorators/query.js"() {
      init_base();
    }
  });

  // node_modules/@lit/reactive-element/decorators/query-all.js
  var init_query_all = __esm({
    "node_modules/@lit/reactive-element/decorators/query-all.js"() {
      init_base();
    }
  });

  // node_modules/@lit/reactive-element/decorators/query-async.js
  var init_query_async = __esm({
    "node_modules/@lit/reactive-element/decorators/query-async.js"() {
      init_base();
    }
  });

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var init_query_assigned_elements = __esm({
    "node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
      init_base();
    }
  });

  // node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
  var init_query_assigned_nodes = __esm({
    "node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
      init_base();
    }
  });

  // node_modules/lit/decorators.js
  var init_decorators = __esm({
    "node_modules/lit/decorators.js"() {
      init_custom_element();
      init_property();
      init_state();
      init_event_options();
      init_query();
      init_query_all();
      init_query_async();
      init_query_assigned_elements();
      init_query_assigned_nodes();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js
  var spinner_styles_default;
  var init_chunk_7DUCI5S4 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js"() {
      init_lit();
      spinner_styles_default = i`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;
    }
  });

  // node_modules/@shoelace-style/localize/dist/index.js
  function registerTranslation(...translation2) {
    translation2.map((t4) => {
      const code = t4.$code.toLowerCase();
      if (translations.has(code)) {
        translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t4));
      } else {
        translations.set(code, t4);
      }
      if (!fallback) {
        fallback = t4;
      }
    });
    update();
  }
  function update() {
    if (isClient) {
      documentDirection = document.documentElement.dir || "ltr";
      documentLanguage = document.documentElement.lang || navigator.language;
    }
    [...connectedElements.keys()].map((el) => {
      if (typeof el.requestUpdate === "function") {
        el.requestUpdate();
      }
    });
  }
  var connectedElements, translations, fallback, documentDirection, documentLanguage, isClient, LocalizeController;
  var init_dist = __esm({
    "node_modules/@shoelace-style/localize/dist/index.js"() {
      connectedElements = /* @__PURE__ */ new Set();
      translations = /* @__PURE__ */ new Map();
      documentDirection = "ltr";
      documentLanguage = "en";
      isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
      if (isClient) {
        const documentElementObserver = new MutationObserver(update);
        documentDirection = document.documentElement.dir || "ltr";
        documentLanguage = document.documentElement.lang || navigator.language;
        documentElementObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["dir", "lang"]
        });
      }
      LocalizeController = class {
        constructor(host) {
          this.host = host;
          this.host.addController(this);
        }
        hostConnected() {
          connectedElements.add(this.host);
        }
        hostDisconnected() {
          connectedElements.delete(this.host);
        }
        dir() {
          return `${this.host.dir || documentDirection}`.toLowerCase();
        }
        lang() {
          return `${this.host.lang || documentLanguage}`.toLowerCase();
        }
        getTranslationData(lang) {
          var _a2, _b;
          const locale = new Intl.Locale(lang.replace(/_/g, "-"));
          const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
          const region = (_b = (_a2 = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a2 === void 0 ? void 0 : _a2.toLowerCase()) !== null && _b !== void 0 ? _b : "";
          const primary = translations.get(`${language}-${region}`);
          const secondary = translations.get(language);
          return { locale, language, region, primary, secondary };
        }
        exists(key, options) {
          var _a2;
          const { primary, secondary } = this.getTranslationData((_a2 = options.lang) !== null && _a2 !== void 0 ? _a2 : this.lang());
          options = Object.assign({ includeFallback: false }, options);
          if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
            return true;
          }
          return false;
        }
        term(key, ...args) {
          const { primary, secondary } = this.getTranslationData(this.lang());
          let term;
          if (primary && primary[key]) {
            term = primary[key];
          } else if (secondary && secondary[key]) {
            term = secondary[key];
          } else if (fallback && fallback[key]) {
            term = fallback[key];
          } else {
            console.error(`No translation found for: ${String(key)}`);
            return String(key);
          }
          if (typeof term === "function") {
            return term(...args);
          }
          return term;
        }
        date(dateToFormat, options) {
          dateToFormat = new Date(dateToFormat);
          return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
        }
        number(numberToFormat, options) {
          numberToFormat = Number(numberToFormat);
          return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
        }
        relativeTime(value, unit, options) {
          return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
        }
      };
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAS2SHYD.js
  var translation, en_default;
  var init_chunk_MAS2SHYD = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAS2SHYD.js"() {
      init_dist();
      translation = {
        $code: "en",
        $name: "English",
        $dir: "ltr",
        carousel: "Carousel",
        clearEntry: "Clear entry",
        close: "Close",
        copied: "Copied",
        copy: "Copy",
        currentValue: "Current value",
        error: "Error",
        goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
        hidePassword: "Hide password",
        loading: "Loading",
        nextSlide: "Next slide",
        numOptionsSelected: (num) => {
          if (num === 0)
            return "No options selected";
          if (num === 1)
            return "1 option selected";
          return `${num} options selected`;
        },
        previousSlide: "Previous slide",
        progress: "Progress",
        remove: "Remove",
        resize: "Resize",
        scrollToEnd: "Scroll to end",
        scrollToStart: "Scroll to start",
        selectAColorFromTheScreen: "Select a color from the screen",
        showPassword: "Show password",
        slideNum: (slide) => `Slide ${slide}`,
        toggleColorFormat: "Toggle color format"
      };
      registerTranslation(translation);
      en_default = translation;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WLV3FVBR.js
  var LocalizeController2;
  var init_chunk_WLV3FVBR = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.WLV3FVBR.js"() {
      init_chunk_MAS2SHYD();
      init_dist();
      init_dist();
      LocalizeController2 = class extends LocalizeController {
      };
      registerTranslation(en_default);
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
  var component_styles_default;
  var init_chunk_TUVJKY7S = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"() {
      init_lit();
      component_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IFDWM6P4.js
  var __defProp2, __defProps, __getOwnPropDesc2, __getOwnPropDescs, __getOwnPropSymbols, __hasOwnProp2, __propIsEnum, __defNormalProp2, __spreadValues, __spreadProps, __decorateClass2;
  var init_chunk_IFDWM6P4 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IFDWM6P4.js"() {
      __defProp2 = Object.defineProperty;
      __defProps = Object.defineProperties;
      __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      __getOwnPropDescs = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols = Object.getOwnPropertySymbols;
      __hasOwnProp2 = Object.prototype.hasOwnProperty;
      __propIsEnum = Object.prototype.propertyIsEnumerable;
      __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp2.call(b2, prop))
            __defNormalProp2(a2, prop, b2[prop]);
        if (__getOwnPropSymbols)
          for (var prop of __getOwnPropSymbols(b2)) {
            if (__propIsEnum.call(b2, prop))
              __defNormalProp2(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
      __decorateClass2 = (decorators, target, key, kind) => {
        var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
        for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
          if (decorator = decorators[i4])
            result = (kind ? decorator(target, key, result) : decorator(result)) || result;
        if (kind && result)
          __defProp2(target, key, result);
        return result;
      };
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5THGRZAA.js
  var ShoelaceElement;
  var init_chunk_5THGRZAA = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5THGRZAA.js"() {
      init_chunk_IFDWM6P4();
      init_lit();
      init_decorators();
      ShoelaceElement = class extends h3 {
        constructor() {
          super();
          Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
            this.constructor.define(name, component);
          });
        }
        emit(name, options) {
          const event = new CustomEvent(name, __spreadValues({
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {}
          }, options));
          this.dispatchEvent(event);
          return event;
        }
        /* eslint-enable */
        static define(name, elementConstructor = this, options = {}) {
          const currentlyRegisteredConstructor = customElements.get(name);
          if (!currentlyRegisteredConstructor) {
            try {
              customElements.define(name, elementConstructor, options);
            } catch (_err) {
              customElements.define(name, class extends elementConstructor {
              }, options);
            }
            return;
          }
          let newVersion = " (unknown version)";
          let existingVersion = newVersion;
          if ("version" in elementConstructor && elementConstructor.version) {
            newVersion = " v" + elementConstructor.version;
          }
          if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
            existingVersion = " v" + currentlyRegisteredConstructor.version;
          }
          if (newVersion && existingVersion && newVersion === existingVersion) {
            return;
          }
          console.warn(
            `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
          );
        }
      };
      ShoelaceElement.version = "2.16.0";
      ShoelaceElement.dependencies = {};
      __decorateClass2([
        n4()
      ], ShoelaceElement.prototype, "dir", 2);
      __decorateClass2([
        n4()
      ], ShoelaceElement.prototype, "lang", 2);
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7HOIOSC7.js
  var SlSpinner;
  var init_chunk_7HOIOSC7 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7HOIOSC7.js"() {
      init_chunk_7DUCI5S4();
      init_chunk_WLV3FVBR();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_lit();
      SlSpinner = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.localize = new LocalizeController2(this);
        }
        render() {
          return ke`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
        }
      };
      SlSpinner.styles = [component_styles_default, spinner_styles_default];
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KWPBDQ6I.js
  var formCollections, reportValidityOverloads, checkValidityOverloads, userInteractedControls, interactions, FormControlController, validValidityState, valueMissingValidityState, customErrorValidityState;
  var init_chunk_KWPBDQ6I = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KWPBDQ6I.js"() {
      init_chunk_IFDWM6P4();
      formCollections = /* @__PURE__ */ new WeakMap();
      reportValidityOverloads = /* @__PURE__ */ new WeakMap();
      checkValidityOverloads = /* @__PURE__ */ new WeakMap();
      userInteractedControls = /* @__PURE__ */ new WeakSet();
      interactions = /* @__PURE__ */ new WeakMap();
      FormControlController = class {
        constructor(host, options) {
          this.handleFormData = (event) => {
            const disabled = this.options.disabled(this.host);
            const name = this.options.name(this.host);
            const value = this.options.value(this.host);
            const isButton = this.host.tagName.toLowerCase() === "sl-button";
            if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
              if (Array.isArray(value)) {
                value.forEach((val) => {
                  event.formData.append(name, val.toString());
                });
              } else {
                event.formData.append(name, value.toString());
              }
            }
          };
          this.handleFormSubmit = (event) => {
            var _a2;
            const disabled = this.options.disabled(this.host);
            const reportValidity = this.options.reportValidity;
            if (this.form && !this.form.noValidate) {
              (_a2 = formCollections.get(this.form)) == null ? void 0 : _a2.forEach((control) => {
                this.setUserInteracted(control, true);
              });
            }
            if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
              event.preventDefault();
              event.stopImmediatePropagation();
            }
          };
          this.handleFormReset = () => {
            this.options.setValue(this.host, this.options.defaultValue(this.host));
            this.setUserInteracted(this.host, false);
            interactions.set(this.host, []);
          };
          this.handleInteraction = (event) => {
            const emittedEvents = interactions.get(this.host);
            if (!emittedEvents.includes(event.type)) {
              emittedEvents.push(event.type);
            }
            if (emittedEvents.length === this.options.assumeInteractionOn.length) {
              this.setUserInteracted(this.host, true);
            }
          };
          this.checkFormValidity = () => {
            if (this.form && !this.form.noValidate) {
              const elements = this.form.querySelectorAll("*");
              for (const element of elements) {
                if (typeof element.checkValidity === "function") {
                  if (!element.checkValidity()) {
                    return false;
                  }
                }
              }
            }
            return true;
          };
          this.reportFormValidity = () => {
            if (this.form && !this.form.noValidate) {
              const elements = this.form.querySelectorAll("*");
              for (const element of elements) {
                if (typeof element.reportValidity === "function") {
                  if (!element.reportValidity()) {
                    return false;
                  }
                }
              }
            }
            return true;
          };
          (this.host = host).addController(this);
          this.options = __spreadValues({
            form: (input) => {
              const formId = input.form;
              if (formId) {
                const root = input.getRootNode();
                const form = root.querySelector(`#${formId}`);
                if (form) {
                  return form;
                }
              }
              return input.closest("form");
            },
            name: (input) => input.name,
            value: (input) => input.value,
            defaultValue: (input) => input.defaultValue,
            disabled: (input) => {
              var _a2;
              return (_a2 = input.disabled) != null ? _a2 : false;
            },
            reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
            checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
            setValue: (input, value) => input.value = value,
            assumeInteractionOn: ["sl-input"]
          }, options);
        }
        hostConnected() {
          const form = this.options.form(this.host);
          if (form) {
            this.attachForm(form);
          }
          interactions.set(this.host, []);
          this.options.assumeInteractionOn.forEach((event) => {
            this.host.addEventListener(event, this.handleInteraction);
          });
        }
        hostDisconnected() {
          this.detachForm();
          interactions.delete(this.host);
          this.options.assumeInteractionOn.forEach((event) => {
            this.host.removeEventListener(event, this.handleInteraction);
          });
        }
        hostUpdated() {
          const form = this.options.form(this.host);
          if (!form) {
            this.detachForm();
          }
          if (form && this.form !== form) {
            this.detachForm();
            this.attachForm(form);
          }
          if (this.host.hasUpdated) {
            this.setValidity(this.host.validity.valid);
          }
        }
        attachForm(form) {
          if (form) {
            this.form = form;
            if (formCollections.has(this.form)) {
              formCollections.get(this.form).add(this.host);
            } else {
              formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
            }
            this.form.addEventListener("formdata", this.handleFormData);
            this.form.addEventListener("submit", this.handleFormSubmit);
            this.form.addEventListener("reset", this.handleFormReset);
            if (!reportValidityOverloads.has(this.form)) {
              reportValidityOverloads.set(this.form, this.form.reportValidity);
              this.form.reportValidity = () => this.reportFormValidity();
            }
            if (!checkValidityOverloads.has(this.form)) {
              checkValidityOverloads.set(this.form, this.form.checkValidity);
              this.form.checkValidity = () => this.checkFormValidity();
            }
          } else {
            this.form = void 0;
          }
        }
        detachForm() {
          if (!this.form)
            return;
          const formCollection = formCollections.get(this.form);
          if (!formCollection) {
            return;
          }
          formCollection.delete(this.host);
          if (formCollection.size <= 0) {
            this.form.removeEventListener("formdata", this.handleFormData);
            this.form.removeEventListener("submit", this.handleFormSubmit);
            this.form.removeEventListener("reset", this.handleFormReset);
            if (reportValidityOverloads.has(this.form)) {
              this.form.reportValidity = reportValidityOverloads.get(this.form);
              reportValidityOverloads.delete(this.form);
            }
            if (checkValidityOverloads.has(this.form)) {
              this.form.checkValidity = checkValidityOverloads.get(this.form);
              checkValidityOverloads.delete(this.form);
            }
            this.form = void 0;
          }
        }
        setUserInteracted(el, hasInteracted) {
          if (hasInteracted) {
            userInteractedControls.add(el);
          } else {
            userInteractedControls.delete(el);
          }
          el.requestUpdate();
        }
        doAction(type, submitter) {
          if (this.form) {
            const button = document.createElement("button");
            button.type = type;
            button.style.position = "absolute";
            button.style.width = "0";
            button.style.height = "0";
            button.style.clipPath = "inset(50%)";
            button.style.overflow = "hidden";
            button.style.whiteSpace = "nowrap";
            if (submitter) {
              button.name = submitter.name;
              button.value = submitter.value;
              ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
                if (submitter.hasAttribute(attr)) {
                  button.setAttribute(attr, submitter.getAttribute(attr));
                }
              });
            }
            this.form.append(button);
            button.click();
            button.remove();
          }
        }
        /** Returns the associated `<form>` element, if one exists. */
        getForm() {
          var _a2;
          return (_a2 = this.form) != null ? _a2 : null;
        }
        /** Resets the form, restoring all the control to their default value */
        reset(submitter) {
          this.doAction("reset", submitter);
        }
        /** Submits the form, triggering validation and form data injection. */
        submit(submitter) {
          this.doAction("submit", submitter);
        }
        /**
         * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
         * the host element immediately, i.e. before Lit updates the component in the next update.
         */
        setValidity(isValid) {
          const host = this.host;
          const hasInteracted = Boolean(userInteractedControls.has(host));
          const required = Boolean(host.required);
          host.toggleAttribute("data-required", required);
          host.toggleAttribute("data-optional", !required);
          host.toggleAttribute("data-invalid", !isValid);
          host.toggleAttribute("data-valid", isValid);
          host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
          host.toggleAttribute("data-user-valid", isValid && hasInteracted);
        }
        /**
         * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
         * that affects constraint validation changes so the component receives the correct validity states.
         */
        updateValidity() {
          const host = this.host;
          this.setValidity(host.validity.valid);
        }
        /**
         * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
         * If the `sl-invalid` event will be cancelled then the original `invalid`
         * event (which may have been passed as argument) will also be cancelled.
         * If no original `invalid` event has been passed then the `sl-invalid`
         * event will be cancelled before being dispatched.
         */
        emitInvalidEvent(originalInvalidEvent) {
          const slInvalidEvent = new CustomEvent("sl-invalid", {
            bubbles: false,
            composed: false,
            cancelable: true,
            detail: {}
          });
          if (!originalInvalidEvent) {
            slInvalidEvent.preventDefault();
          }
          if (!this.host.dispatchEvent(slInvalidEvent)) {
            originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
          }
        }
      };
      validValidityState = Object.freeze({
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: true,
        valueMissing: false
      });
      valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
        valid: false,
        valueMissing: true
      }));
      customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
        valid: false,
        customError: true
      }));
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js
  var button_styles_default;
  var init_chunk_MAQXLKQ7 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js"() {
      init_lit();
      button_styles_default = i`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
  var HasSlotController;
  var init_chunk_NYIIDP5N = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js"() {
      HasSlotController = class {
        constructor(host, ...slotNames) {
          this.slotNames = [];
          this.handleSlotChange = (event) => {
            const slot = event.target;
            if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
              this.host.requestUpdate();
            }
          };
          (this.host = host).addController(this);
          this.slotNames = slotNames;
        }
        hasDefaultSlot() {
          return [...this.host.childNodes].some((node) => {
            if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
              return true;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
              const el = node;
              const tagName = el.tagName.toLowerCase();
              if (tagName === "sl-visually-hidden") {
                return false;
              }
              if (!el.hasAttribute("slot")) {
                return true;
              }
            }
            return false;
          });
        }
        hasNamedSlot(name) {
          return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
        }
        test(slotName) {
          return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
        }
        hostConnected() {
          this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
        }
        hostDisconnected() {
          this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
        }
      };
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
  function setBasePath(path) {
    basePath = path;
  }
  function getBasePath(subpath = "") {
    if (!basePath) {
      const scripts = [...document.getElementsByTagName("script")];
      const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
      if (configScript) {
        setBasePath(configScript.getAttribute("data-shoelace"));
      } else {
        const fallbackScript = scripts.find((s2) => {
          return /shoelace(\.min)?\.js($|\?)/.test(s2.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s2.src);
        });
        let path = "";
        if (fallbackScript) {
          path = fallbackScript.getAttribute("src");
        }
        setBasePath(path.split("/").slice(0, -1).join("/"));
      }
    }
    return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
  }
  var basePath;
  var init_chunk_3Y6SB6QS = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js"() {
      basePath = "";
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
  var library, library_default_default;
  var init_chunk_P7ZG6EMR = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"() {
      init_chunk_3Y6SB6QS();
      library = {
        name: "default",
        resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
      };
      library_default_default = library;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
  var icons, systemLibrary, library_system_default;
  var init_chunk_3TFKS637 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js"() {
      icons = {
        caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
        check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
        "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
        "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
        "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
        copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
        eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
        "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
        eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
        "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
        indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
        "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
        "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
        "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
        radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
        "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
        "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
        "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
      };
      systemLibrary = {
        name: "system",
        resolver: (name) => {
          if (name in icons) {
            return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
          }
          return "";
        }
      };
      library_system_default = systemLibrary;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
  function watchIcon(icon) {
    watchedIcons.push(icon);
  }
  function unwatchIcon(icon) {
    watchedIcons = watchedIcons.filter((el) => el !== icon);
  }
  function getIconLibrary(name) {
    return registry.find((lib) => lib.name === name);
  }
  var registry, watchedIcons;
  var init_chunk_ZL53POKZ = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js"() {
      init_chunk_P7ZG6EMR();
      init_chunk_3TFKS637();
      registry = [library_default_default, library_system_default];
      watchedIcons = [];
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js
  var icon_styles_default;
  var init_chunk_QLXRCYS4 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js"() {
      init_lit();
      icon_styles_default = i`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2FB5TK5H.js
  function watch(propertyName, options) {
    const resolvedOptions = __spreadValues({
      waitUntilFirstUpdate: false
    }, options);
    return (proto, decoratedFnName) => {
      const { update: update2 } = proto;
      const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
      proto.update = function(changedProps) {
        watchedProperties.forEach((property) => {
          const key = property;
          if (changedProps.has(key)) {
            const oldValue = changedProps.get(key);
            const newValue = this[key];
            if (oldValue !== newValue) {
              if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                this[decoratedFnName](oldValue, newValue);
              }
            }
          }
        });
        update2.call(this, changedProps);
      };
    };
  }
  var init_chunk_2FB5TK5H = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.2FB5TK5H.js"() {
      init_chunk_IFDWM6P4();
    }
  });

  // node_modules/lit-html/directive-helpers.js
  var et2, nt, rt, ht, dt;
  var init_directive_helpers = __esm({
    "node_modules/lit-html/directive-helpers.js"() {
      init_lit_html();
      ({ I: et2 } = si);
      nt = (o4, t4) => void 0 === t4 ? void 0 !== (o4 == null ? void 0 : o4._$litType$) : (o4 == null ? void 0 : o4._$litType$) === t4;
      rt = (o4) => void 0 === o4.strings;
      ht = {};
      dt = (o4, t4 = ht) => o4._$AH = t4;
    }
  });

  // node_modules/lit/directive-helpers.js
  var init_directive_helpers2 = __esm({
    "node_modules/lit/directive-helpers.js"() {
      init_directive_helpers();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ALSPWWWG.js
  var CACHEABLE_ERROR, RETRYABLE_ERROR, parser, iconCache, SlIcon;
  var init_chunk_ALSPWWWG = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ALSPWWWG.js"() {
      init_chunk_ZL53POKZ();
      init_chunk_QLXRCYS4();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_IFDWM6P4();
      init_lit();
      init_directive_helpers2();
      init_decorators();
      CACHEABLE_ERROR = Symbol();
      RETRYABLE_ERROR = Symbol();
      iconCache = /* @__PURE__ */ new Map();
      SlIcon = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.initialRender = false;
          this.svg = null;
          this.label = "";
          this.library = "default";
        }
        /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
        async resolveIcon(url, library2) {
          var _a2;
          let fileData;
          if (library2 == null ? void 0 : library2.spriteSheet) {
            this.svg = ke`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
            await this.updateComplete;
            const svg = this.shadowRoot.querySelector("[part='svg']");
            if (typeof library2.mutator === "function") {
              library2.mutator(svg);
            }
            return this.svg;
          }
          try {
            fileData = await fetch(url, { mode: "cors" });
            if (!fileData.ok)
              return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
          } catch (e6) {
            return RETRYABLE_ERROR;
          }
          try {
            const div = document.createElement("div");
            div.innerHTML = await fileData.text();
            const svg = div.firstElementChild;
            if (((_a2 = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a2.toLowerCase()) !== "svg")
              return CACHEABLE_ERROR;
            if (!parser)
              parser = new DOMParser();
            const doc = parser.parseFromString(svg.outerHTML, "text/html");
            const svgEl = doc.body.querySelector("svg");
            if (!svgEl)
              return CACHEABLE_ERROR;
            svgEl.part.add("svg");
            return document.adoptNode(svgEl);
          } catch (e6) {
            return CACHEABLE_ERROR;
          }
        }
        connectedCallback() {
          super.connectedCallback();
          watchIcon(this);
        }
        firstUpdated() {
          this.initialRender = true;
          this.setIcon();
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          unwatchIcon(this);
        }
        getIconSource() {
          const library2 = getIconLibrary(this.library);
          if (this.name && library2) {
            return {
              url: library2.resolver(this.name),
              fromLibrary: true
            };
          }
          return {
            url: this.src,
            fromLibrary: false
          };
        }
        handleLabelChange() {
          const hasLabel = typeof this.label === "string" && this.label.length > 0;
          if (hasLabel) {
            this.setAttribute("role", "img");
            this.setAttribute("aria-label", this.label);
            this.removeAttribute("aria-hidden");
          } else {
            this.removeAttribute("role");
            this.removeAttribute("aria-label");
            this.setAttribute("aria-hidden", "true");
          }
        }
        async setIcon() {
          var _a2;
          const { url, fromLibrary } = this.getIconSource();
          const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
          if (!url) {
            this.svg = null;
            return;
          }
          let iconResolver = iconCache.get(url);
          if (!iconResolver) {
            iconResolver = this.resolveIcon(url, library2);
            iconCache.set(url, iconResolver);
          }
          if (!this.initialRender) {
            return;
          }
          const svg = await iconResolver;
          if (svg === RETRYABLE_ERROR) {
            iconCache.delete(url);
          }
          if (url !== this.getIconSource().url) {
            return;
          }
          if (nt(svg)) {
            this.svg = svg;
            return;
          }
          switch (svg) {
            case RETRYABLE_ERROR:
            case CACHEABLE_ERROR:
              this.svg = null;
              this.emit("sl-error");
              break;
            default:
              this.svg = svg.cloneNode(true);
              (_a2 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a2.call(library2, this.svg);
              this.emit("sl-load");
          }
        }
        render() {
          return this.svg;
        }
      };
      SlIcon.styles = [component_styles_default, icon_styles_default];
      __decorateClass2([
        r4()
      ], SlIcon.prototype, "svg", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlIcon.prototype, "name", 2);
      __decorateClass2([
        n4()
      ], SlIcon.prototype, "src", 2);
      __decorateClass2([
        n4()
      ], SlIcon.prototype, "label", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlIcon.prototype, "library", 2);
      __decorateClass2([
        watch("label")
      ], SlIcon.prototype, "handleLabelChange", 1);
      __decorateClass2([
        watch(["name", "src", "library"])
      ], SlIcon.prototype, "setIcon", 1);
    }
  });

  // node_modules/lit-html/directive.js
  var t3, e5, i3;
  var init_directive = __esm({
    "node_modules/lit-html/directive.js"() {
      t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
      e5 = (t4) => (...e6) => ({ _$litDirective$: t4, values: e6 });
      i3 = class {
        constructor(t4) {
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t4, e6, i4) {
          this.t = t4, this._$AM = e6, this.i = i4;
        }
        _$AS(t4, e6) {
          return this.update(t4, e6);
        }
        update(t4, e6) {
          return this.render(...e6);
        }
      };
    }
  });

  // node_modules/lit-html/directives/class-map.js
  var Rt;
  var init_class_map = __esm({
    "node_modules/lit-html/directives/class-map.js"() {
      init_lit_html();
      init_directive();
      Rt = e5(class extends i3 {
        constructor(s2) {
          var _a2;
          if (super(s2), s2.type !== t3.ATTRIBUTE || "class" !== s2.name || ((_a2 = s2.strings) == null ? void 0 : _a2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
        }
        render(t4) {
          return " " + Object.keys(t4).filter((s2) => t4[s2]).join(" ") + " ";
        }
        update(t4, [s2]) {
          var _a2, _b;
          if (void 0 === this.st) {
            this.st = /* @__PURE__ */ new Set(), void 0 !== t4.strings && (this.nt = new Set(t4.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
            for (const t5 in s2) s2[t5] && !((_a2 = this.nt) == null ? void 0 : _a2.has(t5)) && this.st.add(t5);
            return this.render(s2);
          }
          const i4 = t4.element.classList;
          for (const t5 of this.st) t5 in s2 || (i4.remove(t5), this.st.delete(t5));
          for (const t5 in s2) {
            const r5 = !!s2[t5];
            r5 === this.st.has(t5) || ((_b = this.nt) == null ? void 0 : _b.has(t5)) || (r5 ? (i4.add(t5), this.st.add(t5)) : (i4.remove(t5), this.st.delete(t5)));
          }
          return R;
        }
      });
    }
  });

  // node_modules/lit/directives/class-map.js
  var init_class_map2 = __esm({
    "node_modules/lit/directives/class-map.js"() {
      init_class_map();
    }
  });

  // node_modules/lit-html/static.js
  var $e, xe, er, Te, Ee, ke2, Oe2, Se2;
  var init_static = __esm({
    "node_modules/lit-html/static.js"() {
      init_lit_html();
      $e = Symbol.for("");
      xe = (t4) => {
        if ((t4 == null ? void 0 : t4.r) === $e) return t4 == null ? void 0 : t4._$litStatic$;
      };
      er = (t4, ...r5) => ({ _$litStatic$: r5.reduce((r6, e6, a2) => r6 + ((t5) => {
        if (void 0 !== t5._$litStatic$) return t5._$litStatic$;
        throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t5}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
      })(e6) + t4[a2 + 1], t4[0]), r: $e });
      Te = /* @__PURE__ */ new Map();
      Ee = (t4) => (r5, ...e6) => {
        const a2 = e6.length;
        let o4, s2;
        const i4 = [], l2 = [];
        let n5, u2 = 0, c4 = false;
        for (; u2 < a2; ) {
          for (n5 = r5[u2]; u2 < a2 && void 0 !== (s2 = e6[u2], o4 = xe(s2)); ) n5 += o4 + r5[++u2], c4 = true;
          u2 !== a2 && l2.push(s2), i4.push(n5), u2++;
        }
        if (u2 === a2 && i4.push(r5[a2]), c4) {
          const t5 = i4.join("$$lit$$");
          void 0 === (r5 = Te.get(t5)) && (i4.raw = i4, Te.set(t5, r5 = i4)), e6 = l2;
        }
        return t4(r5, ...e6);
      };
      ke2 = Ee(ke);
      Oe2 = Ee(Oe);
      Se2 = Ee(Se);
    }
  });

  // node_modules/lit/static-html.js
  var init_static_html = __esm({
    "node_modules/lit/static-html.js"() {
      init_static();
    }
  });

  // node_modules/lit-html/directives/if-defined.js
  var to;
  var init_if_defined = __esm({
    "node_modules/lit-html/directives/if-defined.js"() {
      init_lit_html();
      to = (t4) => t4 ?? D;
    }
  });

  // node_modules/lit/directives/if-defined.js
  var init_if_defined2 = __esm({
    "node_modules/lit/directives/if-defined.js"() {
      init_if_defined();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MR6SHCJO.js
  var SlButton;
  var init_chunk_MR6SHCJO = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MR6SHCJO.js"() {
      init_chunk_7HOIOSC7();
      init_chunk_KWPBDQ6I();
      init_chunk_MAQXLKQ7();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_ALSPWWWG();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_IFDWM6P4();
      init_class_map2();
      init_static_html();
      init_if_defined2();
      init_decorators();
      SlButton = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.formControlController = new FormControlController(this, {
            assumeInteractionOn: ["click"]
          });
          this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
          this.localize = new LocalizeController2(this);
          this.hasFocus = false;
          this.invalid = false;
          this.title = "";
          this.variant = "default";
          this.size = "medium";
          this.caret = false;
          this.disabled = false;
          this.loading = false;
          this.outline = false;
          this.pill = false;
          this.circle = false;
          this.type = "button";
          this.name = "";
          this.value = "";
          this.href = "";
          this.rel = "noreferrer noopener";
        }
        /** Gets the validity state object */
        get validity() {
          if (this.isButton()) {
            return this.button.validity;
          }
          return validValidityState;
        }
        /** Gets the validation message */
        get validationMessage() {
          if (this.isButton()) {
            return this.button.validationMessage;
          }
          return "";
        }
        firstUpdated() {
          if (this.isButton()) {
            this.formControlController.updateValidity();
          }
        }
        handleBlur() {
          this.hasFocus = false;
          this.emit("sl-blur");
        }
        handleFocus() {
          this.hasFocus = true;
          this.emit("sl-focus");
        }
        handleClick() {
          if (this.type === "submit") {
            this.formControlController.submit(this);
          }
          if (this.type === "reset") {
            this.formControlController.reset(this);
          }
        }
        handleInvalid(event) {
          this.formControlController.setValidity(false);
          this.formControlController.emitInvalidEvent(event);
        }
        isButton() {
          return this.href ? false : true;
        }
        isLink() {
          return this.href ? true : false;
        }
        handleDisabledChange() {
          if (this.isButton()) {
            this.formControlController.setValidity(this.disabled);
          }
        }
        /** Simulates a click on the button. */
        click() {
          this.button.click();
        }
        /** Sets focus on the button. */
        focus(options) {
          this.button.focus(options);
        }
        /** Removes focus from the button. */
        blur() {
          this.button.blur();
        }
        /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
        checkValidity() {
          if (this.isButton()) {
            return this.button.checkValidity();
          }
          return true;
        }
        /** Gets the associated form, if one exists. */
        getForm() {
          return this.formControlController.getForm();
        }
        /** Checks for validity and shows the browser's validation message if the control is invalid. */
        reportValidity() {
          if (this.isButton()) {
            return this.button.reportValidity();
          }
          return true;
        }
        /** Sets a custom validation message. Pass an empty string to restore validity. */
        setCustomValidity(message) {
          if (this.isButton()) {
            this.button.setCustomValidity(message);
            this.formControlController.updateValidity();
          }
        }
        render() {
          const isLink = this.isLink();
          const tag = isLink ? er`a` : er`button`;
          return ke2`
      <${tag}
        part="base"
        class=${Rt({
            button: true,
            "button--default": this.variant === "default",
            "button--primary": this.variant === "primary",
            "button--success": this.variant === "success",
            "button--neutral": this.variant === "neutral",
            "button--warning": this.variant === "warning",
            "button--danger": this.variant === "danger",
            "button--text": this.variant === "text",
            "button--small": this.size === "small",
            "button--medium": this.size === "medium",
            "button--large": this.size === "large",
            "button--caret": this.caret,
            "button--circle": this.circle,
            "button--disabled": this.disabled,
            "button--focused": this.hasFocus,
            "button--loading": this.loading,
            "button--standard": !this.outline,
            "button--outline": this.outline,
            "button--pill": this.pill,
            "button--rtl": this.localize.dir() === "rtl",
            "button--has-label": this.hasSlotController.test("[default]"),
            "button--has-prefix": this.hasSlotController.test("prefix"),
            "button--has-suffix": this.hasSlotController.test("suffix")
          })}
        ?disabled=${to(isLink ? void 0 : this.disabled)}
        type=${to(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${to(isLink ? void 0 : this.name)}
        value=${to(isLink ? void 0 : this.value)}
        href=${to(isLink ? this.href : void 0)}
        target=${to(isLink ? this.target : void 0)}
        download=${to(isLink ? this.download : void 0)}
        rel=${to(isLink ? this.rel : void 0)}
        role=${to(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? ke2` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? ke2`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
        }
      };
      SlButton.styles = [component_styles_default, button_styles_default];
      SlButton.dependencies = {
        "sl-icon": SlIcon,
        "sl-spinner": SlSpinner
      };
      __decorateClass2([
        e4(".button")
      ], SlButton.prototype, "button", 2);
      __decorateClass2([
        r4()
      ], SlButton.prototype, "hasFocus", 2);
      __decorateClass2([
        r4()
      ], SlButton.prototype, "invalid", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "title", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlButton.prototype, "variant", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlButton.prototype, "size", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "caret", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "disabled", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "loading", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "outline", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "pill", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlButton.prototype, "circle", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "type", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "name", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "value", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "href", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "target", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "rel", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "download", 2);
      __decorateClass2([
        n4()
      ], SlButton.prototype, "form", 2);
      __decorateClass2([
        n4({ attribute: "formaction" })
      ], SlButton.prototype, "formAction", 2);
      __decorateClass2([
        n4({ attribute: "formenctype" })
      ], SlButton.prototype, "formEnctype", 2);
      __decorateClass2([
        n4({ attribute: "formmethod" })
      ], SlButton.prototype, "formMethod", 2);
      __decorateClass2([
        n4({ attribute: "formnovalidate", type: Boolean })
      ], SlButton.prototype, "formNoValidate", 2);
      __decorateClass2([
        n4({ attribute: "formtarget" })
      ], SlButton.prototype, "formTarget", 2);
      __decorateClass2([
        watch("disabled", { waitUntilFirstUpdate: true })
      ], SlButton.prototype, "handleDisabledChange", 1);
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.PY3UYT6X.js
  var init_chunk_PY3UYT6X = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.PY3UYT6X.js"() {
      init_chunk_MR6SHCJO();
      SlButton.define("sl-button");
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/components/button/button.js
  var init_button = __esm({
    "node_modules/@shoelace-style/shoelace/dist/components/button/button.js"() {
      init_chunk_PY3UYT6X();
      init_chunk_MR6SHCJO();
      init_chunk_7HOIOSC7();
      init_chunk_7DUCI5S4();
      init_chunk_KWPBDQ6I();
      init_chunk_MAQXLKQ7();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_MAS2SHYD();
      init_chunk_ALSPWWWG();
      init_chunk_ZL53POKZ();
      init_chunk_P7ZG6EMR();
      init_chunk_3TFKS637();
      init_chunk_QLXRCYS4();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_3Y6SB6QS();
      init_chunk_IFDWM6P4();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js
  var input_styles_default;
  var init_chunk_GGT72J62 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js"() {
      init_lit();
      input_styles_default = i`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js
  var defaultValue;
  var init_chunk_GI7VDIWX = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js"() {
      init_lit();
      defaultValue = (propertyName = "value") => (proto, key) => {
        const ctor = proto.constructor;
        const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
        ctor.prototype.attributeChangedCallback = function(name, old, value) {
          var _a2;
          const options = ctor.getPropertyOptions(propertyName);
          const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
          if (name === attributeName) {
            const converter = options.converter || u;
            const fromAttribute = typeof converter === "function" ? converter : (_a2 = converter == null ? void 0 : converter.fromAttribute) != null ? _a2 : u.fromAttribute;
            const newValue = fromAttribute(value, options.type);
            if (this[propertyName] !== newValue) {
              this[key] = newValue;
            }
          }
          attributeChangedCallback.call(this, name, old, value);
        };
      };
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js
  var form_control_styles_default;
  var init_chunk_SI4ACBFK = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js"() {
      init_lit();
      form_control_styles_default = i`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;
    }
  });

  // node_modules/lit-html/directives/live.js
  var Ft;
  var init_live = __esm({
    "node_modules/lit-html/directives/live.js"() {
      init_lit_html();
      init_directive();
      init_directive_helpers();
      Ft = e5(class extends i3 {
        constructor(r5) {
          if (super(r5), r5.type !== t3.PROPERTY && r5.type !== t3.ATTRIBUTE && r5.type !== t3.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
          if (!rt(r5)) throw Error("`live` bindings can only contain a single expression");
        }
        render(r5) {
          return r5;
        }
        update(r5, [e6]) {
          if (e6 === R || e6 === D) return e6;
          const i4 = r5.element, n5 = r5.name;
          if (r5.type === t3.PROPERTY) {
            if (e6 === i4[n5]) return R;
          } else if (r5.type === t3.BOOLEAN_ATTRIBUTE) {
            if (!!e6 === i4.hasAttribute(n5)) return R;
          } else if (r5.type === t3.ATTRIBUTE && i4.getAttribute(n5) === e6 + "") return R;
          return dt(r5), e6;
        }
      });
    }
  });

  // node_modules/lit/directives/live.js
  var init_live2 = __esm({
    "node_modules/lit/directives/live.js"() {
      init_live();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5LELDSAA.js
  var SlInput;
  var init_chunk_5LELDSAA = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5LELDSAA.js"() {
      init_chunk_GGT72J62();
      init_chunk_GI7VDIWX();
      init_chunk_SI4ACBFK();
      init_chunk_KWPBDQ6I();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_ALSPWWWG();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_IFDWM6P4();
      init_class_map2();
      init_lit();
      init_if_defined2();
      init_live2();
      init_decorators();
      SlInput = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.formControlController = new FormControlController(this, {
            assumeInteractionOn: ["sl-blur", "sl-input"]
          });
          this.hasSlotController = new HasSlotController(this, "help-text", "label");
          this.localize = new LocalizeController2(this);
          this.hasFocus = false;
          this.title = "";
          this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
          this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
          this.type = "text";
          this.name = "";
          this.value = "";
          this.defaultValue = "";
          this.size = "medium";
          this.filled = false;
          this.pill = false;
          this.label = "";
          this.helpText = "";
          this.clearable = false;
          this.disabled = false;
          this.placeholder = "";
          this.readonly = false;
          this.passwordToggle = false;
          this.passwordVisible = false;
          this.noSpinButtons = false;
          this.form = "";
          this.required = false;
          this.spellcheck = true;
        }
        //
        // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
        // can be set before the component is rendered.
        //
        /**
         * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
         */
        get valueAsDate() {
          var _a2;
          this.__dateInput.type = this.type;
          this.__dateInput.value = this.value;
          return ((_a2 = this.input) == null ? void 0 : _a2.valueAsDate) || this.__dateInput.valueAsDate;
        }
        set valueAsDate(newValue) {
          this.__dateInput.type = this.type;
          this.__dateInput.valueAsDate = newValue;
          this.value = this.__dateInput.value;
        }
        /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
        get valueAsNumber() {
          var _a2;
          this.__numberInput.value = this.value;
          return ((_a2 = this.input) == null ? void 0 : _a2.valueAsNumber) || this.__numberInput.valueAsNumber;
        }
        set valueAsNumber(newValue) {
          this.__numberInput.valueAsNumber = newValue;
          this.value = this.__numberInput.value;
        }
        /** Gets the validity state object */
        get validity() {
          return this.input.validity;
        }
        /** Gets the validation message */
        get validationMessage() {
          return this.input.validationMessage;
        }
        firstUpdated() {
          this.formControlController.updateValidity();
        }
        handleBlur() {
          this.hasFocus = false;
          this.emit("sl-blur");
        }
        handleChange() {
          this.value = this.input.value;
          this.emit("sl-change");
        }
        handleClearClick(event) {
          event.preventDefault();
          if (this.value !== "") {
            this.value = "";
            this.emit("sl-clear");
            this.emit("sl-input");
            this.emit("sl-change");
          }
          this.input.focus();
        }
        handleFocus() {
          this.hasFocus = true;
          this.emit("sl-focus");
        }
        handleInput() {
          this.value = this.input.value;
          this.formControlController.updateValidity();
          this.emit("sl-input");
        }
        handleInvalid(event) {
          this.formControlController.setValidity(false);
          this.formControlController.emitInvalidEvent(event);
        }
        handleKeyDown(event) {
          const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
          if (event.key === "Enter" && !hasModifier) {
            setTimeout(() => {
              if (!event.defaultPrevented && !event.isComposing) {
                this.formControlController.submit();
              }
            });
          }
        }
        handlePasswordToggle() {
          this.passwordVisible = !this.passwordVisible;
        }
        handleDisabledChange() {
          this.formControlController.setValidity(this.disabled);
        }
        handleStepChange() {
          this.input.step = String(this.step);
          this.formControlController.updateValidity();
        }
        async handleValueChange() {
          await this.updateComplete;
          this.formControlController.updateValidity();
        }
        /** Sets focus on the input. */
        focus(options) {
          this.input.focus(options);
        }
        /** Removes focus from the input. */
        blur() {
          this.input.blur();
        }
        /** Selects all the text in the input. */
        select() {
          this.input.select();
        }
        /** Sets the start and end positions of the text selection (0-based). */
        setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
          this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
        }
        /** Replaces a range of text with a new string. */
        setRangeText(replacement, start, end, selectMode = "preserve") {
          const selectionStart = start != null ? start : this.input.selectionStart;
          const selectionEnd = end != null ? end : this.input.selectionEnd;
          this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
          if (this.value !== this.input.value) {
            this.value = this.input.value;
          }
        }
        /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
        showPicker() {
          if ("showPicker" in HTMLInputElement.prototype) {
            this.input.showPicker();
          }
        }
        /** Increments the value of a numeric input type by the value of the step attribute. */
        stepUp() {
          this.input.stepUp();
          if (this.value !== this.input.value) {
            this.value = this.input.value;
          }
        }
        /** Decrements the value of a numeric input type by the value of the step attribute. */
        stepDown() {
          this.input.stepDown();
          if (this.value !== this.input.value) {
            this.value = this.input.value;
          }
        }
        /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
        checkValidity() {
          return this.input.checkValidity();
        }
        /** Gets the associated form, if one exists. */
        getForm() {
          return this.formControlController.getForm();
        }
        /** Checks for validity and shows the browser's validation message if the control is invalid. */
        reportValidity() {
          return this.input.reportValidity();
        }
        /** Sets a custom validation message. Pass an empty string to restore validity. */
        setCustomValidity(message) {
          this.input.setCustomValidity(message);
          this.formControlController.updateValidity();
        }
        render() {
          const hasLabelSlot = this.hasSlotController.test("label");
          const hasHelpTextSlot = this.hasSlotController.test("help-text");
          const hasLabel = this.label ? true : !!hasLabelSlot;
          const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
          const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
          const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
          return ke`
      <div
        part="form-control"
        class=${Rt({
            "form-control": true,
            "form-control--small": this.size === "small",
            "form-control--medium": this.size === "medium",
            "form-control--large": this.size === "large",
            "form-control--has-label": hasLabel,
            "form-control--has-help-text": hasHelpText
          })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${Rt({
            input: true,
            // Sizes
            "input--small": this.size === "small",
            "input--medium": this.size === "medium",
            "input--large": this.size === "large",
            // States
            "input--pill": this.pill,
            "input--standard": !this.filled,
            "input--filled": this.filled,
            "input--disabled": this.disabled,
            "input--focused": this.hasFocus,
            "input--empty": !this.value,
            "input--no-spin-buttons": this.noSpinButtons
          })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${to(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${to(this.placeholder)}
              minlength=${to(this.minlength)}
              maxlength=${to(this.maxlength)}
              min=${to(this.min)}
              max=${to(this.max)}
              step=${to(this.step)}
              .value=${Ft(this.value)}
              autocapitalize=${to(this.autocapitalize)}
              autocomplete=${to(this.autocomplete)}
              autocorrect=${to(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${to(this.pattern)}
              enterkeyhint=${to(this.enterkeyhint)}
              inputmode=${to(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? ke`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? ke`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? ke`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : ke`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
        }
      };
      SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
      SlInput.dependencies = { "sl-icon": SlIcon };
      __decorateClass2([
        e4(".input__control")
      ], SlInput.prototype, "input", 2);
      __decorateClass2([
        r4()
      ], SlInput.prototype, "hasFocus", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "title", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlInput.prototype, "type", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "name", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "value", 2);
      __decorateClass2([
        defaultValue()
      ], SlInput.prototype, "defaultValue", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlInput.prototype, "size", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlInput.prototype, "filled", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlInput.prototype, "pill", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "label", 2);
      __decorateClass2([
        n4({ attribute: "help-text" })
      ], SlInput.prototype, "helpText", 2);
      __decorateClass2([
        n4({ type: Boolean })
      ], SlInput.prototype, "clearable", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlInput.prototype, "disabled", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "placeholder", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlInput.prototype, "readonly", 2);
      __decorateClass2([
        n4({ attribute: "password-toggle", type: Boolean })
      ], SlInput.prototype, "passwordToggle", 2);
      __decorateClass2([
        n4({ attribute: "password-visible", type: Boolean })
      ], SlInput.prototype, "passwordVisible", 2);
      __decorateClass2([
        n4({ attribute: "no-spin-buttons", type: Boolean })
      ], SlInput.prototype, "noSpinButtons", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlInput.prototype, "form", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlInput.prototype, "required", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "pattern", 2);
      __decorateClass2([
        n4({ type: Number })
      ], SlInput.prototype, "minlength", 2);
      __decorateClass2([
        n4({ type: Number })
      ], SlInput.prototype, "maxlength", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "min", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "max", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "step", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "autocapitalize", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "autocorrect", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "autocomplete", 2);
      __decorateClass2([
        n4({ type: Boolean })
      ], SlInput.prototype, "autofocus", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "enterkeyhint", 2);
      __decorateClass2([
        n4({
          type: Boolean,
          converter: {
            // Allow "true|false" attribute values but keep the property boolean
            fromAttribute: (value) => !value || value === "false" ? false : true,
            toAttribute: (value) => value ? "true" : "false"
          }
        })
      ], SlInput.prototype, "spellcheck", 2);
      __decorateClass2([
        n4()
      ], SlInput.prototype, "inputmode", 2);
      __decorateClass2([
        watch("disabled", { waitUntilFirstUpdate: true })
      ], SlInput.prototype, "handleDisabledChange", 1);
      __decorateClass2([
        watch("step", { waitUntilFirstUpdate: true })
      ], SlInput.prototype, "handleStepChange", 1);
      __decorateClass2([
        watch("value", { waitUntilFirstUpdate: true })
      ], SlInput.prototype, "handleValueChange", 1);
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KKYBVPZ5.js
  var init_chunk_KKYBVPZ5 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KKYBVPZ5.js"() {
      init_chunk_5LELDSAA();
      SlInput.define("sl-input");
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/components/input/input.js
  var init_input = __esm({
    "node_modules/@shoelace-style/shoelace/dist/components/input/input.js"() {
      init_chunk_KKYBVPZ5();
      init_chunk_5LELDSAA();
      init_chunk_GGT72J62();
      init_chunk_GI7VDIWX();
      init_chunk_SI4ACBFK();
      init_chunk_KWPBDQ6I();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_MAS2SHYD();
      init_chunk_ALSPWWWG();
      init_chunk_ZL53POKZ();
      init_chunk_P7ZG6EMR();
      init_chunk_3TFKS637();
      init_chunk_QLXRCYS4();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_3Y6SB6QS();
      init_chunk_IFDWM6P4();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js
  var icon_button_styles_default;
  var init_chunk_6I2T3DLI = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js"() {
      init_lit();
      icon_button_styles_default = i`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XJILXOW4.js
  var SlIconButton;
  var init_chunk_XJILXOW4 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XJILXOW4.js"() {
      init_chunk_6I2T3DLI();
      init_chunk_ALSPWWWG();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_IFDWM6P4();
      init_class_map2();
      init_static_html();
      init_if_defined2();
      init_decorators();
      SlIconButton = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.hasFocus = false;
          this.label = "";
          this.disabled = false;
        }
        handleBlur() {
          this.hasFocus = false;
          this.emit("sl-blur");
        }
        handleFocus() {
          this.hasFocus = true;
          this.emit("sl-focus");
        }
        handleClick(event) {
          if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
        /** Simulates a click on the icon button. */
        click() {
          this.button.click();
        }
        /** Sets focus on the icon button. */
        focus(options) {
          this.button.focus(options);
        }
        /** Removes focus from the icon button. */
        blur() {
          this.button.blur();
        }
        render() {
          const isLink = this.href ? true : false;
          const tag = isLink ? er`a` : er`button`;
          return ke2`
      <${tag}
        part="base"
        class=${Rt({
            "icon-button": true,
            "icon-button--disabled": !isLink && this.disabled,
            "icon-button--focused": this.hasFocus
          })}
        ?disabled=${to(isLink ? void 0 : this.disabled)}
        type=${to(isLink ? void 0 : "button")}
        href=${to(isLink ? this.href : void 0)}
        target=${to(isLink ? this.target : void 0)}
        download=${to(isLink ? this.download : void 0)}
        rel=${to(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${to(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${to(this.name)}
          library=${to(this.library)}
          src=${to(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
        }
      };
      SlIconButton.styles = [component_styles_default, icon_button_styles_default];
      SlIconButton.dependencies = { "sl-icon": SlIcon };
      __decorateClass2([
        e4(".icon-button")
      ], SlIconButton.prototype, "button", 2);
      __decorateClass2([
        r4()
      ], SlIconButton.prototype, "hasFocus", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "name", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "library", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "src", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "href", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "target", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "download", 2);
      __decorateClass2([
        n4()
      ], SlIconButton.prototype, "label", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlIconButton.prototype, "disabled", 2);
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DHU6MIVB.js
  function ensureAnimation(animation) {
    return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
  }
  function getLogicalAnimation(animation, dir) {
    if (dir.toLowerCase() === "rtl") {
      return {
        keyframes: animation.rtlKeyframes || animation.keyframes,
        options: animation.options
      };
    }
    return animation;
  }
  function setDefaultAnimation(animationName, animation) {
    defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
  }
  function getAnimation(el, animationName, options) {
    const customAnimation = customAnimationRegistry.get(el);
    if (customAnimation == null ? void 0 : customAnimation[animationName]) {
      return getLogicalAnimation(customAnimation[animationName], options.dir);
    }
    const defaultAnimation = defaultAnimationRegistry.get(animationName);
    if (defaultAnimation) {
      return getLogicalAnimation(defaultAnimation, options.dir);
    }
    return {
      keyframes: [],
      options: { duration: 0 }
    };
  }
  var defaultAnimationRegistry, customAnimationRegistry;
  var init_chunk_DHU6MIVB = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DHU6MIVB.js"() {
      init_chunk_IFDWM6P4();
      defaultAnimationRegistry = /* @__PURE__ */ new Map();
      customAnimationRegistry = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
  function waitForEvent(el, eventName) {
    return new Promise((resolve) => {
      function done(event) {
        if (event.target === el) {
          el.removeEventListener(eventName, done);
          resolve();
        }
      }
      el.addEventListener(eventName, done);
    });
  }
  var init_chunk_B4BZKR24 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js"() {
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LHI6QEL2.js
  function animateTo(el, keyframes, options) {
    return new Promise((resolve) => {
      if ((options == null ? void 0 : options.duration) === Infinity) {
        throw new Error("Promise-based animations must be finite.");
      }
      const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
        duration: prefersReducedMotion() ? 0 : options.duration
      }));
      animation.addEventListener("cancel", resolve, { once: true });
      animation.addEventListener("finish", resolve, { once: true });
    });
  }
  function prefersReducedMotion() {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    return query.matches;
  }
  function stopAnimations(el) {
    return Promise.all(
      el.getAnimations().map((animation) => {
        return new Promise((resolve) => {
          animation.cancel();
          requestAnimationFrame(resolve);
        });
      })
    );
  }
  var init_chunk_LHI6QEL2 = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LHI6QEL2.js"() {
      init_chunk_IFDWM6P4();
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OCMJ7QFW.js
  var alert_styles_default;
  var init_chunk_OCMJ7QFW = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OCMJ7QFW.js"() {
      init_lit();
      alert_styles_default = i`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IBBLL4RX.js
  var toastStack, SlAlert;
  var init_chunk_IBBLL4RX = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IBBLL4RX.js"() {
      init_chunk_XJILXOW4();
      init_chunk_DHU6MIVB();
      init_chunk_B4BZKR24();
      init_chunk_LHI6QEL2();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_OCMJ7QFW();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_IFDWM6P4();
      init_class_map2();
      init_lit();
      init_decorators();
      toastStack = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
      SlAlert = class extends ShoelaceElement {
        constructor() {
          super(...arguments);
          this.hasSlotController = new HasSlotController(this, "icon", "suffix");
          this.localize = new LocalizeController2(this);
          this.open = false;
          this.closable = false;
          this.variant = "primary";
          this.duration = Infinity;
        }
        firstUpdated() {
          this.base.hidden = !this.open;
        }
        restartAutoHide() {
          clearTimeout(this.autoHideTimeout);
          if (this.open && this.duration < Infinity) {
            this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
          }
        }
        handleCloseClick() {
          this.hide();
        }
        handleMouseMove() {
          this.restartAutoHide();
        }
        async handleOpenChange() {
          if (this.open) {
            this.emit("sl-show");
            if (this.duration < Infinity) {
              this.restartAutoHide();
            }
            await stopAnimations(this.base);
            this.base.hidden = false;
            const { keyframes, options } = getAnimation(this, "alert.show", { dir: this.localize.dir() });
            await animateTo(this.base, keyframes, options);
            this.emit("sl-after-show");
          } else {
            this.emit("sl-hide");
            clearTimeout(this.autoHideTimeout);
            await stopAnimations(this.base);
            const { keyframes, options } = getAnimation(this, "alert.hide", { dir: this.localize.dir() });
            await animateTo(this.base, keyframes, options);
            this.base.hidden = true;
            this.emit("sl-after-hide");
          }
        }
        handleDurationChange() {
          this.restartAutoHide();
        }
        /** Shows the alert. */
        async show() {
          if (this.open) {
            return void 0;
          }
          this.open = true;
          return waitForEvent(this, "sl-after-show");
        }
        /** Hides the alert */
        async hide() {
          if (!this.open) {
            return void 0;
          }
          this.open = false;
          return waitForEvent(this, "sl-after-hide");
        }
        /**
         * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
         * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
         * calling this method again. The returned promise will resolve after the alert is hidden.
         */
        async toast() {
          return new Promise((resolve) => {
            if (toastStack.parentElement === null) {
              document.body.append(toastStack);
            }
            toastStack.appendChild(this);
            requestAnimationFrame(() => {
              this.clientWidth;
              this.show();
            });
            this.addEventListener(
              "sl-after-hide",
              () => {
                toastStack.removeChild(this);
                resolve();
                if (toastStack.querySelector("sl-alert") === null) {
                  toastStack.remove();
                }
              },
              { once: true }
            );
          });
        }
        render() {
          return ke`
      <div
        part="base"
        class=${Rt({
            alert: true,
            "alert--open": this.open,
            "alert--closable": this.closable,
            "alert--has-icon": this.hasSlotController.test("icon"),
            "alert--primary": this.variant === "primary",
            "alert--success": this.variant === "success",
            "alert--neutral": this.variant === "neutral",
            "alert--warning": this.variant === "warning",
            "alert--danger": this.variant === "danger"
          })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable ? ke`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
        }
      };
      SlAlert.styles = [component_styles_default, alert_styles_default];
      SlAlert.dependencies = { "sl-icon-button": SlIconButton };
      __decorateClass2([
        e4('[part~="base"]')
      ], SlAlert.prototype, "base", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlAlert.prototype, "open", 2);
      __decorateClass2([
        n4({ type: Boolean, reflect: true })
      ], SlAlert.prototype, "closable", 2);
      __decorateClass2([
        n4({ reflect: true })
      ], SlAlert.prototype, "variant", 2);
      __decorateClass2([
        n4({ type: Number })
      ], SlAlert.prototype, "duration", 2);
      __decorateClass2([
        watch("open", { waitUntilFirstUpdate: true })
      ], SlAlert.prototype, "handleOpenChange", 1);
      __decorateClass2([
        watch("duration")
      ], SlAlert.prototype, "handleDurationChange", 1);
      setDefaultAnimation("alert.show", {
        keyframes: [
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1 }
        ],
        options: { duration: 250, easing: "ease" }
      });
      setDefaultAnimation("alert.hide", {
        keyframes: [
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.8 }
        ],
        options: { duration: 250, easing: "ease" }
      });
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4SGTRSOV.js
  var init_chunk_4SGTRSOV = __esm({
    "node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4SGTRSOV.js"() {
      init_chunk_IBBLL4RX();
      SlAlert.define("sl-alert");
    }
  });

  // node_modules/@shoelace-style/shoelace/dist/components/alert/alert.js
  var init_alert = __esm({
    "node_modules/@shoelace-style/shoelace/dist/components/alert/alert.js"() {
      init_chunk_4SGTRSOV();
      init_chunk_IBBLL4RX();
      init_chunk_XJILXOW4();
      init_chunk_6I2T3DLI();
      init_chunk_DHU6MIVB();
      init_chunk_B4BZKR24();
      init_chunk_LHI6QEL2();
      init_chunk_NYIIDP5N();
      init_chunk_WLV3FVBR();
      init_chunk_MAS2SHYD();
      init_chunk_OCMJ7QFW();
      init_chunk_ALSPWWWG();
      init_chunk_ZL53POKZ();
      init_chunk_P7ZG6EMR();
      init_chunk_3TFKS637();
      init_chunk_QLXRCYS4();
      init_chunk_2FB5TK5H();
      init_chunk_TUVJKY7S();
      init_chunk_5THGRZAA();
      init_chunk_3Y6SB6QS();
      init_chunk_IFDWM6P4();
    }
  });

  // node_modules/lit-html/directives/unsafe-html.js
  var le, ae;
  var init_unsafe_html = __esm({
    "node_modules/lit-html/directives/unsafe-html.js"() {
      init_lit_html();
      init_directive();
      le = class extends i3 {
        constructor(i4) {
          if (super(i4), this.it = D, i4.type !== t3.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
        }
        render(t4) {
          if (t4 === D || null == t4) return this._t = void 0, this.it = t4;
          if (t4 === R) return t4;
          if ("string" != typeof t4) throw Error(this.constructor.directiveName + "() called with a non-string value");
          if (t4 === this.it) return this._t;
          this.it = t4;
          const i4 = [t4];
          return i4.raw = i4, this._t = { _$litType$: this.constructor.resultType, strings: i4, values: [] };
        }
      };
      le.directiveName = "unsafeHTML", le.resultType = 1;
      ae = e5(le);
    }
  });

  // node_modules/showdown/dist/showdown.js
  var require_showdown = __commonJS({
    "node_modules/showdown/dist/showdown.js"(exports, module) {
      (function() {
        function getDefaultOpts(simple) {
          "use strict";
          var defaultOptions = {
            omitExtraWLInCodeBlocks: {
              defaultValue: false,
              describe: "Omit the default extra whiteline added to code blocks",
              type: "boolean"
            },
            noHeaderId: {
              defaultValue: false,
              describe: "Turn on/off generated header id",
              type: "boolean"
            },
            prefixHeaderId: {
              defaultValue: false,
              describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
              type: "string"
            },
            rawPrefixHeaderId: {
              defaultValue: false,
              describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
              type: "boolean"
            },
            ghCompatibleHeaderId: {
              defaultValue: false,
              describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
              type: "boolean"
            },
            rawHeaderId: {
              defaultValue: false,
              describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
              type: "boolean"
            },
            headerLevelStart: {
              defaultValue: false,
              describe: "The header blocks level start",
              type: "integer"
            },
            parseImgDimensions: {
              defaultValue: false,
              describe: "Turn on/off image dimension parsing",
              type: "boolean"
            },
            simplifiedAutoLink: {
              defaultValue: false,
              describe: "Turn on/off GFM autolink style",
              type: "boolean"
            },
            excludeTrailingPunctuationFromURLs: {
              defaultValue: false,
              describe: "Excludes trailing punctuation from links generated with autoLinking",
              type: "boolean"
            },
            literalMidWordUnderscores: {
              defaultValue: false,
              describe: "Parse midword underscores as literal underscores",
              type: "boolean"
            },
            literalMidWordAsterisks: {
              defaultValue: false,
              describe: "Parse midword asterisks as literal asterisks",
              type: "boolean"
            },
            strikethrough: {
              defaultValue: false,
              describe: "Turn on/off strikethrough support",
              type: "boolean"
            },
            tables: {
              defaultValue: false,
              describe: "Turn on/off tables support",
              type: "boolean"
            },
            tablesHeaderId: {
              defaultValue: false,
              describe: "Add an id to table headers",
              type: "boolean"
            },
            ghCodeBlocks: {
              defaultValue: true,
              describe: "Turn on/off GFM fenced code blocks support",
              type: "boolean"
            },
            tasklists: {
              defaultValue: false,
              describe: "Turn on/off GFM tasklist support",
              type: "boolean"
            },
            smoothLivePreview: {
              defaultValue: false,
              describe: "Prevents weird effects in live previews due to incomplete input",
              type: "boolean"
            },
            smartIndentationFix: {
              defaultValue: false,
              describe: "Tries to smartly fix indentation in es6 strings",
              type: "boolean"
            },
            disableForced4SpacesIndentedSublists: {
              defaultValue: false,
              describe: "Disables the requirement of indenting nested sublists by 4 spaces",
              type: "boolean"
            },
            simpleLineBreaks: {
              defaultValue: false,
              describe: "Parses simple line breaks as <br> (GFM Style)",
              type: "boolean"
            },
            requireSpaceBeforeHeadingText: {
              defaultValue: false,
              describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
              type: "boolean"
            },
            ghMentions: {
              defaultValue: false,
              describe: "Enables github @mentions",
              type: "boolean"
            },
            ghMentionsLink: {
              defaultValue: "https://github.com/{u}",
              describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
              type: "string"
            },
            encodeEmails: {
              defaultValue: true,
              describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
              type: "boolean"
            },
            openLinksInNewWindow: {
              defaultValue: false,
              describe: "Open all links in new windows",
              type: "boolean"
            },
            backslashEscapesHTMLTags: {
              defaultValue: false,
              describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
              type: "boolean"
            },
            emoji: {
              defaultValue: false,
              describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
              type: "boolean"
            },
            underline: {
              defaultValue: false,
              describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
              type: "boolean"
            },
            ellipsis: {
              defaultValue: true,
              describe: "Replaces three dots with the ellipsis unicode character",
              type: "boolean"
            },
            completeHTMLDocument: {
              defaultValue: false,
              describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
              type: "boolean"
            },
            metadata: {
              defaultValue: false,
              describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
              type: "boolean"
            },
            splitAdjacentBlockquotes: {
              defaultValue: false,
              describe: "Split adjacent blockquote blocks",
              type: "boolean"
            }
          };
          if (simple === false) {
            return JSON.parse(JSON.stringify(defaultOptions));
          }
          var ret = {};
          for (var opt in defaultOptions) {
            if (defaultOptions.hasOwnProperty(opt)) {
              ret[opt] = defaultOptions[opt].defaultValue;
            }
          }
          return ret;
        }
        function allOptionsOn() {
          "use strict";
          var options = getDefaultOpts(true), ret = {};
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              ret[opt] = true;
            }
          }
          return ret;
        }
        var showdown2 = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
          github: {
            omitExtraWLInCodeBlocks: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghCompatibleHeaderId: true,
            ghMentions: true,
            backslashEscapesHTMLTags: true,
            emoji: true,
            splitAdjacentBlockquotes: true
          },
          original: {
            noHeaderId: true,
            ghCodeBlocks: false
          },
          ghost: {
            omitExtraWLInCodeBlocks: true,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghMentions: false,
            encodeEmails: true
          },
          vanilla: getDefaultOpts(true),
          allOn: allOptionsOn()
        };
        showdown2.helper = {};
        showdown2.extensions = {};
        showdown2.setOption = function(key, value) {
          "use strict";
          globalOptions[key] = value;
          return this;
        };
        showdown2.getOption = function(key) {
          "use strict";
          return globalOptions[key];
        };
        showdown2.getOptions = function() {
          "use strict";
          return globalOptions;
        };
        showdown2.resetOptions = function() {
          "use strict";
          globalOptions = getDefaultOpts(true);
        };
        showdown2.setFlavor = function(name) {
          "use strict";
          if (!flavor.hasOwnProperty(name)) {
            throw Error(name + " flavor was not found");
          }
          showdown2.resetOptions();
          var preset = flavor[name];
          setFlavor = name;
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              globalOptions[option] = preset[option];
            }
          }
        };
        showdown2.getFlavor = function() {
          "use strict";
          return setFlavor;
        };
        showdown2.getFlavorOptions = function(name) {
          "use strict";
          if (flavor.hasOwnProperty(name)) {
            return flavor[name];
          }
        };
        showdown2.getDefaultOptions = function(simple) {
          "use strict";
          return getDefaultOpts(simple);
        };
        showdown2.subParser = function(name, func) {
          "use strict";
          if (showdown2.helper.isString(name)) {
            if (typeof func !== "undefined") {
              parsers[name] = func;
            } else {
              if (parsers.hasOwnProperty(name)) {
                return parsers[name];
              } else {
                throw Error("SubParser named " + name + " not registered!");
              }
            }
          }
        };
        showdown2.extension = function(name, ext) {
          "use strict";
          if (!showdown2.helper.isString(name)) {
            throw Error("Extension 'name' must be a string");
          }
          name = showdown2.helper.stdExtName(name);
          if (showdown2.helper.isUndefined(ext)) {
            if (!extensions.hasOwnProperty(name)) {
              throw Error("Extension named " + name + " is not registered!");
            }
            return extensions[name];
          } else {
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExtension = validate(ext, name);
            if (validExtension.valid) {
              extensions[name] = ext;
            } else {
              throw Error(validExtension.error);
            }
          }
        };
        showdown2.getAllExtensions = function() {
          "use strict";
          return extensions;
        };
        showdown2.removeExtension = function(name) {
          "use strict";
          delete extensions[name];
        };
        showdown2.resetExtensions = function() {
          "use strict";
          extensions = {};
        };
        function validate(extension, name) {
          "use strict";
          var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
            valid: true,
            error: ""
          };
          if (!showdown2.helper.isArray(extension)) {
            extension = [extension];
          }
          for (var i4 = 0; i4 < extension.length; ++i4) {
            var baseMsg = errMsg + " sub-extension " + i4 + ": ", ext = extension[i4];
            if (typeof ext !== "object") {
              ret.valid = false;
              ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
              return ret;
            }
            if (!showdown2.helper.isString(ext.type)) {
              ret.valid = false;
              ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + " given";
              return ret;
            }
            var type = ext.type = ext.type.toLowerCase();
            if (type === "language") {
              type = ext.type = "lang";
            }
            if (type === "html") {
              type = ext.type = "output";
            }
            if (type !== "lang" && type !== "output" && type !== "listener") {
              ret.valid = false;
              ret.error = baseMsg + "type " + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
              return ret;
            }
            if (type === "listener") {
              if (showdown2.helper.isUndefined(ext.listeners)) {
                ret.valid = false;
                ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
                return ret;
              }
            } else {
              if (showdown2.helper.isUndefined(ext.filter) && showdown2.helper.isUndefined(ext.regex)) {
                ret.valid = false;
                ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
                return ret;
              }
            }
            if (ext.listeners) {
              if (typeof ext.listeners !== "object") {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + " given";
                return ret;
              }
              for (var ln in ext.listeners) {
                if (ext.listeners.hasOwnProperty(ln)) {
                  if (typeof ext.listeners[ln] !== "function") {
                    ret.valid = false;
                    ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                    return ret;
                  }
                }
              }
            }
            if (ext.filter) {
              if (typeof ext.filter !== "function") {
                ret.valid = false;
                ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + " given";
                return ret;
              }
            } else if (ext.regex) {
              if (showdown2.helper.isString(ext.regex)) {
                ext.regex = new RegExp(ext.regex, "g");
              }
              if (!(ext.regex instanceof RegExp)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + " given";
                return ret;
              }
              if (showdown2.helper.isUndefined(ext.replace)) {
                ret.valid = false;
                ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
                return ret;
              }
            }
          }
          return ret;
        }
        showdown2.validateExtension = function(ext) {
          "use strict";
          var validateExtension = validate(ext, null);
          if (!validateExtension.valid) {
            console.warn(validateExtension.error);
            return false;
          }
          return true;
        };
        if (!showdown2.hasOwnProperty("helper")) {
          showdown2.helper = {};
        }
        showdown2.helper.isString = function(a2) {
          "use strict";
          return typeof a2 === "string" || a2 instanceof String;
        };
        showdown2.helper.isFunction = function(a2) {
          "use strict";
          var getType = {};
          return a2 && getType.toString.call(a2) === "[object Function]";
        };
        showdown2.helper.isArray = function(a2) {
          "use strict";
          return Array.isArray(a2);
        };
        showdown2.helper.isUndefined = function(value) {
          "use strict";
          return typeof value === "undefined";
        };
        showdown2.helper.forEach = function(obj, callback) {
          "use strict";
          if (showdown2.helper.isUndefined(obj)) {
            throw new Error("obj param is required");
          }
          if (showdown2.helper.isUndefined(callback)) {
            throw new Error("callback param is required");
          }
          if (!showdown2.helper.isFunction(callback)) {
            throw new Error("callback param must be a function/closure");
          }
          if (typeof obj.forEach === "function") {
            obj.forEach(callback);
          } else if (showdown2.helper.isArray(obj)) {
            for (var i4 = 0; i4 < obj.length; i4++) {
              callback(obj[i4], i4, obj);
            }
          } else if (typeof obj === "object") {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                callback(obj[prop], prop, obj);
              }
            }
          } else {
            throw new Error("obj does not seem to be an array or an iterable object");
          }
        };
        showdown2.helper.stdExtName = function(s2) {
          "use strict";
          return s2.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
        };
        function escapeCharactersCallback(wholeMatch, m1) {
          "use strict";
          var charCodeToEscape = m1.charCodeAt(0);
          return "\xA8E" + charCodeToEscape + "E";
        }
        showdown2.helper.escapeCharactersCallback = escapeCharactersCallback;
        showdown2.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
          "use strict";
          var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
          if (afterBackslash) {
            regexString = "\\\\" + regexString;
          }
          var regex = new RegExp(regexString, "g");
          text = text.replace(regex, escapeCharactersCallback);
          return text;
        };
        showdown2.helper.unescapeHTMLEntities = function(txt) {
          "use strict";
          return txt.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        };
        var rgxFindMatchPos = function(str, left, right, flags) {
          "use strict";
          var f4 = flags || "", g2 = f4.indexOf("g") > -1, x2 = new RegExp(left + "|" + right, "g" + f4.replace(/g/g, "")), l2 = new RegExp(left, f4.replace(/g/g, "")), pos = [], t4, s2, m2, start, end;
          do {
            t4 = 0;
            while (m2 = x2.exec(str)) {
              if (l2.test(m2[0])) {
                if (!t4++) {
                  s2 = x2.lastIndex;
                  start = s2 - m2[0].length;
                }
              } else if (t4) {
                if (!--t4) {
                  end = m2.index + m2[0].length;
                  var obj = {
                    left: { start, end: s2 },
                    match: { start: s2, end: m2.index },
                    right: { start: m2.index, end },
                    wholeMatch: { start, end }
                  };
                  pos.push(obj);
                  if (!g2) {
                    return pos;
                  }
                }
              }
            }
          } while (t4 && (x2.lastIndex = s2));
          return pos;
        };
        showdown2.helper.matchRecursiveRegExp = function(str, left, right, flags) {
          "use strict";
          var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
          for (var i4 = 0; i4 < matchPos.length; ++i4) {
            results.push([
              str.slice(matchPos[i4].wholeMatch.start, matchPos[i4].wholeMatch.end),
              str.slice(matchPos[i4].match.start, matchPos[i4].match.end),
              str.slice(matchPos[i4].left.start, matchPos[i4].left.end),
              str.slice(matchPos[i4].right.start, matchPos[i4].right.end)
            ]);
          }
          return results;
        };
        showdown2.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
          "use strict";
          if (!showdown2.helper.isFunction(replacement)) {
            var repStr = replacement;
            replacement = function() {
              return repStr;
            };
          }
          var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
          if (lng > 0) {
            var bits = [];
            if (matchPos[0].wholeMatch.start !== 0) {
              bits.push(str.slice(0, matchPos[0].wholeMatch.start));
            }
            for (var i4 = 0; i4 < lng; ++i4) {
              bits.push(
                replacement(
                  str.slice(matchPos[i4].wholeMatch.start, matchPos[i4].wholeMatch.end),
                  str.slice(matchPos[i4].match.start, matchPos[i4].match.end),
                  str.slice(matchPos[i4].left.start, matchPos[i4].left.end),
                  str.slice(matchPos[i4].right.start, matchPos[i4].right.end)
                )
              );
              if (i4 < lng - 1) {
                bits.push(str.slice(matchPos[i4].wholeMatch.end, matchPos[i4 + 1].wholeMatch.start));
              }
            }
            if (matchPos[lng - 1].wholeMatch.end < str.length) {
              bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
            }
            finalStr = bits.join("");
          }
          return finalStr;
        };
        showdown2.helper.regexIndexOf = function(str, regex, fromIndex) {
          "use strict";
          if (!showdown2.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          if (regex instanceof RegExp === false) {
            throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
          }
          var indexOf = str.substring(fromIndex || 0).search(regex);
          return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
        };
        showdown2.helper.splitAtIndex = function(str, index) {
          "use strict";
          if (!showdown2.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          return [str.substring(0, index), str.substring(index)];
        };
        showdown2.helper.encodeEmailAddress = function(mail) {
          "use strict";
          var encode = [
            function(ch) {
              return "&#" + ch.charCodeAt(0) + ";";
            },
            function(ch) {
              return "&#x" + ch.charCodeAt(0).toString(16) + ";";
            },
            function(ch) {
              return ch;
            }
          ];
          mail = mail.replace(/./g, function(ch) {
            if (ch === "@") {
              ch = encode[Math.floor(Math.random() * 2)](ch);
            } else {
              var r5 = Math.random();
              ch = r5 > 0.9 ? encode[2](ch) : r5 > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
          });
          return mail;
        };
        showdown2.helper.padEnd = function padEnd(str, targetLength, padString) {
          "use strict";
          targetLength = targetLength >> 0;
          padString = String(padString || " ");
          if (str.length > targetLength) {
            return String(str);
          } else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
            }
            return String(str) + padString.slice(0, targetLength);
          }
        };
        if (typeof console === "undefined") {
          console = {
            warn: function(msg) {
              "use strict";
              alert(msg);
            },
            log: function(msg) {
              "use strict";
              alert(msg);
            },
            error: function(msg) {
              "use strict";
              throw msg;
            }
          };
        }
        showdown2.helper.regexes = {
          asteriskDashAndColon: /([*_:~])/g
        };
        showdown2.helper.emojis = {
          "+1": "\u{1F44D}",
          "-1": "\u{1F44E}",
          "100": "\u{1F4AF}",
          "1234": "\u{1F522}",
          "1st_place_medal": "\u{1F947}",
          "2nd_place_medal": "\u{1F948}",
          "3rd_place_medal": "\u{1F949}",
          "8ball": "\u{1F3B1}",
          "a": "\u{1F170}\uFE0F",
          "ab": "\u{1F18E}",
          "abc": "\u{1F524}",
          "abcd": "\u{1F521}",
          "accept": "\u{1F251}",
          "aerial_tramway": "\u{1F6A1}",
          "airplane": "\u2708\uFE0F",
          "alarm_clock": "\u23F0",
          "alembic": "\u2697\uFE0F",
          "alien": "\u{1F47D}",
          "ambulance": "\u{1F691}",
          "amphora": "\u{1F3FA}",
          "anchor": "\u2693\uFE0F",
          "angel": "\u{1F47C}",
          "anger": "\u{1F4A2}",
          "angry": "\u{1F620}",
          "anguished": "\u{1F627}",
          "ant": "\u{1F41C}",
          "apple": "\u{1F34E}",
          "aquarius": "\u2652\uFE0F",
          "aries": "\u2648\uFE0F",
          "arrow_backward": "\u25C0\uFE0F",
          "arrow_double_down": "\u23EC",
          "arrow_double_up": "\u23EB",
          "arrow_down": "\u2B07\uFE0F",
          "arrow_down_small": "\u{1F53D}",
          "arrow_forward": "\u25B6\uFE0F",
          "arrow_heading_down": "\u2935\uFE0F",
          "arrow_heading_up": "\u2934\uFE0F",
          "arrow_left": "\u2B05\uFE0F",
          "arrow_lower_left": "\u2199\uFE0F",
          "arrow_lower_right": "\u2198\uFE0F",
          "arrow_right": "\u27A1\uFE0F",
          "arrow_right_hook": "\u21AA\uFE0F",
          "arrow_up": "\u2B06\uFE0F",
          "arrow_up_down": "\u2195\uFE0F",
          "arrow_up_small": "\u{1F53C}",
          "arrow_upper_left": "\u2196\uFE0F",
          "arrow_upper_right": "\u2197\uFE0F",
          "arrows_clockwise": "\u{1F503}",
          "arrows_counterclockwise": "\u{1F504}",
          "art": "\u{1F3A8}",
          "articulated_lorry": "\u{1F69B}",
          "artificial_satellite": "\u{1F6F0}",
          "astonished": "\u{1F632}",
          "athletic_shoe": "\u{1F45F}",
          "atm": "\u{1F3E7}",
          "atom_symbol": "\u269B\uFE0F",
          "avocado": "\u{1F951}",
          "b": "\u{1F171}\uFE0F",
          "baby": "\u{1F476}",
          "baby_bottle": "\u{1F37C}",
          "baby_chick": "\u{1F424}",
          "baby_symbol": "\u{1F6BC}",
          "back": "\u{1F519}",
          "bacon": "\u{1F953}",
          "badminton": "\u{1F3F8}",
          "baggage_claim": "\u{1F6C4}",
          "baguette_bread": "\u{1F956}",
          "balance_scale": "\u2696\uFE0F",
          "balloon": "\u{1F388}",
          "ballot_box": "\u{1F5F3}",
          "ballot_box_with_check": "\u2611\uFE0F",
          "bamboo": "\u{1F38D}",
          "banana": "\u{1F34C}",
          "bangbang": "\u203C\uFE0F",
          "bank": "\u{1F3E6}",
          "bar_chart": "\u{1F4CA}",
          "barber": "\u{1F488}",
          "baseball": "\u26BE\uFE0F",
          "basketball": "\u{1F3C0}",
          "basketball_man": "\u26F9\uFE0F",
          "basketball_woman": "\u26F9\uFE0F&zwj;\u2640\uFE0F",
          "bat": "\u{1F987}",
          "bath": "\u{1F6C0}",
          "bathtub": "\u{1F6C1}",
          "battery": "\u{1F50B}",
          "beach_umbrella": "\u{1F3D6}",
          "bear": "\u{1F43B}",
          "bed": "\u{1F6CF}",
          "bee": "\u{1F41D}",
          "beer": "\u{1F37A}",
          "beers": "\u{1F37B}",
          "beetle": "\u{1F41E}",
          "beginner": "\u{1F530}",
          "bell": "\u{1F514}",
          "bellhop_bell": "\u{1F6CE}",
          "bento": "\u{1F371}",
          "biking_man": "\u{1F6B4}",
          "bike": "\u{1F6B2}",
          "biking_woman": "\u{1F6B4}&zwj;\u2640\uFE0F",
          "bikini": "\u{1F459}",
          "biohazard": "\u2623\uFE0F",
          "bird": "\u{1F426}",
          "birthday": "\u{1F382}",
          "black_circle": "\u26AB\uFE0F",
          "black_flag": "\u{1F3F4}",
          "black_heart": "\u{1F5A4}",
          "black_joker": "\u{1F0CF}",
          "black_large_square": "\u2B1B\uFE0F",
          "black_medium_small_square": "\u25FE\uFE0F",
          "black_medium_square": "\u25FC\uFE0F",
          "black_nib": "\u2712\uFE0F",
          "black_small_square": "\u25AA\uFE0F",
          "black_square_button": "\u{1F532}",
          "blonde_man": "\u{1F471}",
          "blonde_woman": "\u{1F471}&zwj;\u2640\uFE0F",
          "blossom": "\u{1F33C}",
          "blowfish": "\u{1F421}",
          "blue_book": "\u{1F4D8}",
          "blue_car": "\u{1F699}",
          "blue_heart": "\u{1F499}",
          "blush": "\u{1F60A}",
          "boar": "\u{1F417}",
          "boat": "\u26F5\uFE0F",
          "bomb": "\u{1F4A3}",
          "book": "\u{1F4D6}",
          "bookmark": "\u{1F516}",
          "bookmark_tabs": "\u{1F4D1}",
          "books": "\u{1F4DA}",
          "boom": "\u{1F4A5}",
          "boot": "\u{1F462}",
          "bouquet": "\u{1F490}",
          "bowing_man": "\u{1F647}",
          "bow_and_arrow": "\u{1F3F9}",
          "bowing_woman": "\u{1F647}&zwj;\u2640\uFE0F",
          "bowling": "\u{1F3B3}",
          "boxing_glove": "\u{1F94A}",
          "boy": "\u{1F466}",
          "bread": "\u{1F35E}",
          "bride_with_veil": "\u{1F470}",
          "bridge_at_night": "\u{1F309}",
          "briefcase": "\u{1F4BC}",
          "broken_heart": "\u{1F494}",
          "bug": "\u{1F41B}",
          "building_construction": "\u{1F3D7}",
          "bulb": "\u{1F4A1}",
          "bullettrain_front": "\u{1F685}",
          "bullettrain_side": "\u{1F684}",
          "burrito": "\u{1F32F}",
          "bus": "\u{1F68C}",
          "business_suit_levitating": "\u{1F574}",
          "busstop": "\u{1F68F}",
          "bust_in_silhouette": "\u{1F464}",
          "busts_in_silhouette": "\u{1F465}",
          "butterfly": "\u{1F98B}",
          "cactus": "\u{1F335}",
          "cake": "\u{1F370}",
          "calendar": "\u{1F4C6}",
          "call_me_hand": "\u{1F919}",
          "calling": "\u{1F4F2}",
          "camel": "\u{1F42B}",
          "camera": "\u{1F4F7}",
          "camera_flash": "\u{1F4F8}",
          "camping": "\u{1F3D5}",
          "cancer": "\u264B\uFE0F",
          "candle": "\u{1F56F}",
          "candy": "\u{1F36C}",
          "canoe": "\u{1F6F6}",
          "capital_abcd": "\u{1F520}",
          "capricorn": "\u2651\uFE0F",
          "car": "\u{1F697}",
          "card_file_box": "\u{1F5C3}",
          "card_index": "\u{1F4C7}",
          "card_index_dividers": "\u{1F5C2}",
          "carousel_horse": "\u{1F3A0}",
          "carrot": "\u{1F955}",
          "cat": "\u{1F431}",
          "cat2": "\u{1F408}",
          "cd": "\u{1F4BF}",
          "chains": "\u26D3",
          "champagne": "\u{1F37E}",
          "chart": "\u{1F4B9}",
          "chart_with_downwards_trend": "\u{1F4C9}",
          "chart_with_upwards_trend": "\u{1F4C8}",
          "checkered_flag": "\u{1F3C1}",
          "cheese": "\u{1F9C0}",
          "cherries": "\u{1F352}",
          "cherry_blossom": "\u{1F338}",
          "chestnut": "\u{1F330}",
          "chicken": "\u{1F414}",
          "children_crossing": "\u{1F6B8}",
          "chipmunk": "\u{1F43F}",
          "chocolate_bar": "\u{1F36B}",
          "christmas_tree": "\u{1F384}",
          "church": "\u26EA\uFE0F",
          "cinema": "\u{1F3A6}",
          "circus_tent": "\u{1F3AA}",
          "city_sunrise": "\u{1F307}",
          "city_sunset": "\u{1F306}",
          "cityscape": "\u{1F3D9}",
          "cl": "\u{1F191}",
          "clamp": "\u{1F5DC}",
          "clap": "\u{1F44F}",
          "clapper": "\u{1F3AC}",
          "classical_building": "\u{1F3DB}",
          "clinking_glasses": "\u{1F942}",
          "clipboard": "\u{1F4CB}",
          "clock1": "\u{1F550}",
          "clock10": "\u{1F559}",
          "clock1030": "\u{1F565}",
          "clock11": "\u{1F55A}",
          "clock1130": "\u{1F566}",
          "clock12": "\u{1F55B}",
          "clock1230": "\u{1F567}",
          "clock130": "\u{1F55C}",
          "clock2": "\u{1F551}",
          "clock230": "\u{1F55D}",
          "clock3": "\u{1F552}",
          "clock330": "\u{1F55E}",
          "clock4": "\u{1F553}",
          "clock430": "\u{1F55F}",
          "clock5": "\u{1F554}",
          "clock530": "\u{1F560}",
          "clock6": "\u{1F555}",
          "clock630": "\u{1F561}",
          "clock7": "\u{1F556}",
          "clock730": "\u{1F562}",
          "clock8": "\u{1F557}",
          "clock830": "\u{1F563}",
          "clock9": "\u{1F558}",
          "clock930": "\u{1F564}",
          "closed_book": "\u{1F4D5}",
          "closed_lock_with_key": "\u{1F510}",
          "closed_umbrella": "\u{1F302}",
          "cloud": "\u2601\uFE0F",
          "cloud_with_lightning": "\u{1F329}",
          "cloud_with_lightning_and_rain": "\u26C8",
          "cloud_with_rain": "\u{1F327}",
          "cloud_with_snow": "\u{1F328}",
          "clown_face": "\u{1F921}",
          "clubs": "\u2663\uFE0F",
          "cocktail": "\u{1F378}",
          "coffee": "\u2615\uFE0F",
          "coffin": "\u26B0\uFE0F",
          "cold_sweat": "\u{1F630}",
          "comet": "\u2604\uFE0F",
          "computer": "\u{1F4BB}",
          "computer_mouse": "\u{1F5B1}",
          "confetti_ball": "\u{1F38A}",
          "confounded": "\u{1F616}",
          "confused": "\u{1F615}",
          "congratulations": "\u3297\uFE0F",
          "construction": "\u{1F6A7}",
          "construction_worker_man": "\u{1F477}",
          "construction_worker_woman": "\u{1F477}&zwj;\u2640\uFE0F",
          "control_knobs": "\u{1F39B}",
          "convenience_store": "\u{1F3EA}",
          "cookie": "\u{1F36A}",
          "cool": "\u{1F192}",
          "policeman": "\u{1F46E}",
          "copyright": "\xA9\uFE0F",
          "corn": "\u{1F33D}",
          "couch_and_lamp": "\u{1F6CB}",
          "couple": "\u{1F46B}",
          "couple_with_heart_woman_man": "\u{1F491}",
          "couple_with_heart_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
          "couple_with_heart_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
          "couplekiss_man_man": "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
          "couplekiss_man_woman": "\u{1F48F}",
          "couplekiss_woman_woman": "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
          "cow": "\u{1F42E}",
          "cow2": "\u{1F404}",
          "cowboy_hat_face": "\u{1F920}",
          "crab": "\u{1F980}",
          "crayon": "\u{1F58D}",
          "credit_card": "\u{1F4B3}",
          "crescent_moon": "\u{1F319}",
          "cricket": "\u{1F3CF}",
          "crocodile": "\u{1F40A}",
          "croissant": "\u{1F950}",
          "crossed_fingers": "\u{1F91E}",
          "crossed_flags": "\u{1F38C}",
          "crossed_swords": "\u2694\uFE0F",
          "crown": "\u{1F451}",
          "cry": "\u{1F622}",
          "crying_cat_face": "\u{1F63F}",
          "crystal_ball": "\u{1F52E}",
          "cucumber": "\u{1F952}",
          "cupid": "\u{1F498}",
          "curly_loop": "\u27B0",
          "currency_exchange": "\u{1F4B1}",
          "curry": "\u{1F35B}",
          "custard": "\u{1F36E}",
          "customs": "\u{1F6C3}",
          "cyclone": "\u{1F300}",
          "dagger": "\u{1F5E1}",
          "dancer": "\u{1F483}",
          "dancing_women": "\u{1F46F}",
          "dancing_men": "\u{1F46F}&zwj;\u2642\uFE0F",
          "dango": "\u{1F361}",
          "dark_sunglasses": "\u{1F576}",
          "dart": "\u{1F3AF}",
          "dash": "\u{1F4A8}",
          "date": "\u{1F4C5}",
          "deciduous_tree": "\u{1F333}",
          "deer": "\u{1F98C}",
          "department_store": "\u{1F3EC}",
          "derelict_house": "\u{1F3DA}",
          "desert": "\u{1F3DC}",
          "desert_island": "\u{1F3DD}",
          "desktop_computer": "\u{1F5A5}",
          "male_detective": "\u{1F575}\uFE0F",
          "diamond_shape_with_a_dot_inside": "\u{1F4A0}",
          "diamonds": "\u2666\uFE0F",
          "disappointed": "\u{1F61E}",
          "disappointed_relieved": "\u{1F625}",
          "dizzy": "\u{1F4AB}",
          "dizzy_face": "\u{1F635}",
          "do_not_litter": "\u{1F6AF}",
          "dog": "\u{1F436}",
          "dog2": "\u{1F415}",
          "dollar": "\u{1F4B5}",
          "dolls": "\u{1F38E}",
          "dolphin": "\u{1F42C}",
          "door": "\u{1F6AA}",
          "doughnut": "\u{1F369}",
          "dove": "\u{1F54A}",
          "dragon": "\u{1F409}",
          "dragon_face": "\u{1F432}",
          "dress": "\u{1F457}",
          "dromedary_camel": "\u{1F42A}",
          "drooling_face": "\u{1F924}",
          "droplet": "\u{1F4A7}",
          "drum": "\u{1F941}",
          "duck": "\u{1F986}",
          "dvd": "\u{1F4C0}",
          "e-mail": "\u{1F4E7}",
          "eagle": "\u{1F985}",
          "ear": "\u{1F442}",
          "ear_of_rice": "\u{1F33E}",
          "earth_africa": "\u{1F30D}",
          "earth_americas": "\u{1F30E}",
          "earth_asia": "\u{1F30F}",
          "egg": "\u{1F95A}",
          "eggplant": "\u{1F346}",
          "eight_pointed_black_star": "\u2734\uFE0F",
          "eight_spoked_asterisk": "\u2733\uFE0F",
          "electric_plug": "\u{1F50C}",
          "elephant": "\u{1F418}",
          "email": "\u2709\uFE0F",
          "end": "\u{1F51A}",
          "envelope_with_arrow": "\u{1F4E9}",
          "euro": "\u{1F4B6}",
          "european_castle": "\u{1F3F0}",
          "european_post_office": "\u{1F3E4}",
          "evergreen_tree": "\u{1F332}",
          "exclamation": "\u2757\uFE0F",
          "expressionless": "\u{1F611}",
          "eye": "\u{1F441}",
          "eye_speech_bubble": "\u{1F441}&zwj;\u{1F5E8}",
          "eyeglasses": "\u{1F453}",
          "eyes": "\u{1F440}",
          "face_with_head_bandage": "\u{1F915}",
          "face_with_thermometer": "\u{1F912}",
          "fist_oncoming": "\u{1F44A}",
          "factory": "\u{1F3ED}",
          "fallen_leaf": "\u{1F342}",
          "family_man_woman_boy": "\u{1F46A}",
          "family_man_boy": "\u{1F468}&zwj;\u{1F466}",
          "family_man_boy_boy": "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_girl": "\u{1F468}&zwj;\u{1F467}",
          "family_man_girl_boy": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_girl_girl": "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_man_man_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
          "family_man_man_boy_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_man_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
          "family_man_man_girl_boy": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_man_girl_girl": "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_man_woman_boy_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_man_woman_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
          "family_man_woman_girl_boy": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_man_woman_girl_girl": "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_woman_boy": "\u{1F469}&zwj;\u{1F466}",
          "family_woman_boy_boy": "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_woman_girl": "\u{1F469}&zwj;\u{1F467}",
          "family_woman_girl_boy": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_woman_girl_girl": "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "family_woman_woman_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
          "family_woman_woman_boy_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
          "family_woman_woman_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
          "family_woman_woman_girl_boy": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
          "family_woman_woman_girl_girl": "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
          "fast_forward": "\u23E9",
          "fax": "\u{1F4E0}",
          "fearful": "\u{1F628}",
          "feet": "\u{1F43E}",
          "female_detective": "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
          "ferris_wheel": "\u{1F3A1}",
          "ferry": "\u26F4",
          "field_hockey": "\u{1F3D1}",
          "file_cabinet": "\u{1F5C4}",
          "file_folder": "\u{1F4C1}",
          "film_projector": "\u{1F4FD}",
          "film_strip": "\u{1F39E}",
          "fire": "\u{1F525}",
          "fire_engine": "\u{1F692}",
          "fireworks": "\u{1F386}",
          "first_quarter_moon": "\u{1F313}",
          "first_quarter_moon_with_face": "\u{1F31B}",
          "fish": "\u{1F41F}",
          "fish_cake": "\u{1F365}",
          "fishing_pole_and_fish": "\u{1F3A3}",
          "fist_raised": "\u270A",
          "fist_left": "\u{1F91B}",
          "fist_right": "\u{1F91C}",
          "flags": "\u{1F38F}",
          "flashlight": "\u{1F526}",
          "fleur_de_lis": "\u269C\uFE0F",
          "flight_arrival": "\u{1F6EC}",
          "flight_departure": "\u{1F6EB}",
          "floppy_disk": "\u{1F4BE}",
          "flower_playing_cards": "\u{1F3B4}",
          "flushed": "\u{1F633}",
          "fog": "\u{1F32B}",
          "foggy": "\u{1F301}",
          "football": "\u{1F3C8}",
          "footprints": "\u{1F463}",
          "fork_and_knife": "\u{1F374}",
          "fountain": "\u26F2\uFE0F",
          "fountain_pen": "\u{1F58B}",
          "four_leaf_clover": "\u{1F340}",
          "fox_face": "\u{1F98A}",
          "framed_picture": "\u{1F5BC}",
          "free": "\u{1F193}",
          "fried_egg": "\u{1F373}",
          "fried_shrimp": "\u{1F364}",
          "fries": "\u{1F35F}",
          "frog": "\u{1F438}",
          "frowning": "\u{1F626}",
          "frowning_face": "\u2639\uFE0F",
          "frowning_man": "\u{1F64D}&zwj;\u2642\uFE0F",
          "frowning_woman": "\u{1F64D}",
          "middle_finger": "\u{1F595}",
          "fuelpump": "\u26FD\uFE0F",
          "full_moon": "\u{1F315}",
          "full_moon_with_face": "\u{1F31D}",
          "funeral_urn": "\u26B1\uFE0F",
          "game_die": "\u{1F3B2}",
          "gear": "\u2699\uFE0F",
          "gem": "\u{1F48E}",
          "gemini": "\u264A\uFE0F",
          "ghost": "\u{1F47B}",
          "gift": "\u{1F381}",
          "gift_heart": "\u{1F49D}",
          "girl": "\u{1F467}",
          "globe_with_meridians": "\u{1F310}",
          "goal_net": "\u{1F945}",
          "goat": "\u{1F410}",
          "golf": "\u26F3\uFE0F",
          "golfing_man": "\u{1F3CC}\uFE0F",
          "golfing_woman": "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
          "gorilla": "\u{1F98D}",
          "grapes": "\u{1F347}",
          "green_apple": "\u{1F34F}",
          "green_book": "\u{1F4D7}",
          "green_heart": "\u{1F49A}",
          "green_salad": "\u{1F957}",
          "grey_exclamation": "\u2755",
          "grey_question": "\u2754",
          "grimacing": "\u{1F62C}",
          "grin": "\u{1F601}",
          "grinning": "\u{1F600}",
          "guardsman": "\u{1F482}",
          "guardswoman": "\u{1F482}&zwj;\u2640\uFE0F",
          "guitar": "\u{1F3B8}",
          "gun": "\u{1F52B}",
          "haircut_woman": "\u{1F487}",
          "haircut_man": "\u{1F487}&zwj;\u2642\uFE0F",
          "hamburger": "\u{1F354}",
          "hammer": "\u{1F528}",
          "hammer_and_pick": "\u2692",
          "hammer_and_wrench": "\u{1F6E0}",
          "hamster": "\u{1F439}",
          "hand": "\u270B",
          "handbag": "\u{1F45C}",
          "handshake": "\u{1F91D}",
          "hankey": "\u{1F4A9}",
          "hatched_chick": "\u{1F425}",
          "hatching_chick": "\u{1F423}",
          "headphones": "\u{1F3A7}",
          "hear_no_evil": "\u{1F649}",
          "heart": "\u2764\uFE0F",
          "heart_decoration": "\u{1F49F}",
          "heart_eyes": "\u{1F60D}",
          "heart_eyes_cat": "\u{1F63B}",
          "heartbeat": "\u{1F493}",
          "heartpulse": "\u{1F497}",
          "hearts": "\u2665\uFE0F",
          "heavy_check_mark": "\u2714\uFE0F",
          "heavy_division_sign": "\u2797",
          "heavy_dollar_sign": "\u{1F4B2}",
          "heavy_heart_exclamation": "\u2763\uFE0F",
          "heavy_minus_sign": "\u2796",
          "heavy_multiplication_x": "\u2716\uFE0F",
          "heavy_plus_sign": "\u2795",
          "helicopter": "\u{1F681}",
          "herb": "\u{1F33F}",
          "hibiscus": "\u{1F33A}",
          "high_brightness": "\u{1F506}",
          "high_heel": "\u{1F460}",
          "hocho": "\u{1F52A}",
          "hole": "\u{1F573}",
          "honey_pot": "\u{1F36F}",
          "horse": "\u{1F434}",
          "horse_racing": "\u{1F3C7}",
          "hospital": "\u{1F3E5}",
          "hot_pepper": "\u{1F336}",
          "hotdog": "\u{1F32D}",
          "hotel": "\u{1F3E8}",
          "hotsprings": "\u2668\uFE0F",
          "hourglass": "\u231B\uFE0F",
          "hourglass_flowing_sand": "\u23F3",
          "house": "\u{1F3E0}",
          "house_with_garden": "\u{1F3E1}",
          "houses": "\u{1F3D8}",
          "hugs": "\u{1F917}",
          "hushed": "\u{1F62F}",
          "ice_cream": "\u{1F368}",
          "ice_hockey": "\u{1F3D2}",
          "ice_skate": "\u26F8",
          "icecream": "\u{1F366}",
          "id": "\u{1F194}",
          "ideograph_advantage": "\u{1F250}",
          "imp": "\u{1F47F}",
          "inbox_tray": "\u{1F4E5}",
          "incoming_envelope": "\u{1F4E8}",
          "tipping_hand_woman": "\u{1F481}",
          "information_source": "\u2139\uFE0F",
          "innocent": "\u{1F607}",
          "interrobang": "\u2049\uFE0F",
          "iphone": "\u{1F4F1}",
          "izakaya_lantern": "\u{1F3EE}",
          "jack_o_lantern": "\u{1F383}",
          "japan": "\u{1F5FE}",
          "japanese_castle": "\u{1F3EF}",
          "japanese_goblin": "\u{1F47A}",
          "japanese_ogre": "\u{1F479}",
          "jeans": "\u{1F456}",
          "joy": "\u{1F602}",
          "joy_cat": "\u{1F639}",
          "joystick": "\u{1F579}",
          "kaaba": "\u{1F54B}",
          "key": "\u{1F511}",
          "keyboard": "\u2328\uFE0F",
          "keycap_ten": "\u{1F51F}",
          "kick_scooter": "\u{1F6F4}",
          "kimono": "\u{1F458}",
          "kiss": "\u{1F48B}",
          "kissing": "\u{1F617}",
          "kissing_cat": "\u{1F63D}",
          "kissing_closed_eyes": "\u{1F61A}",
          "kissing_heart": "\u{1F618}",
          "kissing_smiling_eyes": "\u{1F619}",
          "kiwi_fruit": "\u{1F95D}",
          "koala": "\u{1F428}",
          "koko": "\u{1F201}",
          "label": "\u{1F3F7}",
          "large_blue_circle": "\u{1F535}",
          "large_blue_diamond": "\u{1F537}",
          "large_orange_diamond": "\u{1F536}",
          "last_quarter_moon": "\u{1F317}",
          "last_quarter_moon_with_face": "\u{1F31C}",
          "latin_cross": "\u271D\uFE0F",
          "laughing": "\u{1F606}",
          "leaves": "\u{1F343}",
          "ledger": "\u{1F4D2}",
          "left_luggage": "\u{1F6C5}",
          "left_right_arrow": "\u2194\uFE0F",
          "leftwards_arrow_with_hook": "\u21A9\uFE0F",
          "lemon": "\u{1F34B}",
          "leo": "\u264C\uFE0F",
          "leopard": "\u{1F406}",
          "level_slider": "\u{1F39A}",
          "libra": "\u264E\uFE0F",
          "light_rail": "\u{1F688}",
          "link": "\u{1F517}",
          "lion": "\u{1F981}",
          "lips": "\u{1F444}",
          "lipstick": "\u{1F484}",
          "lizard": "\u{1F98E}",
          "lock": "\u{1F512}",
          "lock_with_ink_pen": "\u{1F50F}",
          "lollipop": "\u{1F36D}",
          "loop": "\u27BF",
          "loud_sound": "\u{1F50A}",
          "loudspeaker": "\u{1F4E2}",
          "love_hotel": "\u{1F3E9}",
          "love_letter": "\u{1F48C}",
          "low_brightness": "\u{1F505}",
          "lying_face": "\u{1F925}",
          "m": "\u24C2\uFE0F",
          "mag": "\u{1F50D}",
          "mag_right": "\u{1F50E}",
          "mahjong": "\u{1F004}\uFE0F",
          "mailbox": "\u{1F4EB}",
          "mailbox_closed": "\u{1F4EA}",
          "mailbox_with_mail": "\u{1F4EC}",
          "mailbox_with_no_mail": "\u{1F4ED}",
          "man": "\u{1F468}",
          "man_artist": "\u{1F468}&zwj;\u{1F3A8}",
          "man_astronaut": "\u{1F468}&zwj;\u{1F680}",
          "man_cartwheeling": "\u{1F938}&zwj;\u2642\uFE0F",
          "man_cook": "\u{1F468}&zwj;\u{1F373}",
          "man_dancing": "\u{1F57A}",
          "man_facepalming": "\u{1F926}&zwj;\u2642\uFE0F",
          "man_factory_worker": "\u{1F468}&zwj;\u{1F3ED}",
          "man_farmer": "\u{1F468}&zwj;\u{1F33E}",
          "man_firefighter": "\u{1F468}&zwj;\u{1F692}",
          "man_health_worker": "\u{1F468}&zwj;\u2695\uFE0F",
          "man_in_tuxedo": "\u{1F935}",
          "man_judge": "\u{1F468}&zwj;\u2696\uFE0F",
          "man_juggling": "\u{1F939}&zwj;\u2642\uFE0F",
          "man_mechanic": "\u{1F468}&zwj;\u{1F527}",
          "man_office_worker": "\u{1F468}&zwj;\u{1F4BC}",
          "man_pilot": "\u{1F468}&zwj;\u2708\uFE0F",
          "man_playing_handball": "\u{1F93E}&zwj;\u2642\uFE0F",
          "man_playing_water_polo": "\u{1F93D}&zwj;\u2642\uFE0F",
          "man_scientist": "\u{1F468}&zwj;\u{1F52C}",
          "man_shrugging": "\u{1F937}&zwj;\u2642\uFE0F",
          "man_singer": "\u{1F468}&zwj;\u{1F3A4}",
          "man_student": "\u{1F468}&zwj;\u{1F393}",
          "man_teacher": "\u{1F468}&zwj;\u{1F3EB}",
          "man_technologist": "\u{1F468}&zwj;\u{1F4BB}",
          "man_with_gua_pi_mao": "\u{1F472}",
          "man_with_turban": "\u{1F473}",
          "tangerine": "\u{1F34A}",
          "mans_shoe": "\u{1F45E}",
          "mantelpiece_clock": "\u{1F570}",
          "maple_leaf": "\u{1F341}",
          "martial_arts_uniform": "\u{1F94B}",
          "mask": "\u{1F637}",
          "massage_woman": "\u{1F486}",
          "massage_man": "\u{1F486}&zwj;\u2642\uFE0F",
          "meat_on_bone": "\u{1F356}",
          "medal_military": "\u{1F396}",
          "medal_sports": "\u{1F3C5}",
          "mega": "\u{1F4E3}",
          "melon": "\u{1F348}",
          "memo": "\u{1F4DD}",
          "men_wrestling": "\u{1F93C}&zwj;\u2642\uFE0F",
          "menorah": "\u{1F54E}",
          "mens": "\u{1F6B9}",
          "metal": "\u{1F918}",
          "metro": "\u{1F687}",
          "microphone": "\u{1F3A4}",
          "microscope": "\u{1F52C}",
          "milk_glass": "\u{1F95B}",
          "milky_way": "\u{1F30C}",
          "minibus": "\u{1F690}",
          "minidisc": "\u{1F4BD}",
          "mobile_phone_off": "\u{1F4F4}",
          "money_mouth_face": "\u{1F911}",
          "money_with_wings": "\u{1F4B8}",
          "moneybag": "\u{1F4B0}",
          "monkey": "\u{1F412}",
          "monkey_face": "\u{1F435}",
          "monorail": "\u{1F69D}",
          "moon": "\u{1F314}",
          "mortar_board": "\u{1F393}",
          "mosque": "\u{1F54C}",
          "motor_boat": "\u{1F6E5}",
          "motor_scooter": "\u{1F6F5}",
          "motorcycle": "\u{1F3CD}",
          "motorway": "\u{1F6E3}",
          "mount_fuji": "\u{1F5FB}",
          "mountain": "\u26F0",
          "mountain_biking_man": "\u{1F6B5}",
          "mountain_biking_woman": "\u{1F6B5}&zwj;\u2640\uFE0F",
          "mountain_cableway": "\u{1F6A0}",
          "mountain_railway": "\u{1F69E}",
          "mountain_snow": "\u{1F3D4}",
          "mouse": "\u{1F42D}",
          "mouse2": "\u{1F401}",
          "movie_camera": "\u{1F3A5}",
          "moyai": "\u{1F5FF}",
          "mrs_claus": "\u{1F936}",
          "muscle": "\u{1F4AA}",
          "mushroom": "\u{1F344}",
          "musical_keyboard": "\u{1F3B9}",
          "musical_note": "\u{1F3B5}",
          "musical_score": "\u{1F3BC}",
          "mute": "\u{1F507}",
          "nail_care": "\u{1F485}",
          "name_badge": "\u{1F4DB}",
          "national_park": "\u{1F3DE}",
          "nauseated_face": "\u{1F922}",
          "necktie": "\u{1F454}",
          "negative_squared_cross_mark": "\u274E",
          "nerd_face": "\u{1F913}",
          "neutral_face": "\u{1F610}",
          "new": "\u{1F195}",
          "new_moon": "\u{1F311}",
          "new_moon_with_face": "\u{1F31A}",
          "newspaper": "\u{1F4F0}",
          "newspaper_roll": "\u{1F5DE}",
          "next_track_button": "\u23ED",
          "ng": "\u{1F196}",
          "no_good_man": "\u{1F645}&zwj;\u2642\uFE0F",
          "no_good_woman": "\u{1F645}",
          "night_with_stars": "\u{1F303}",
          "no_bell": "\u{1F515}",
          "no_bicycles": "\u{1F6B3}",
          "no_entry": "\u26D4\uFE0F",
          "no_entry_sign": "\u{1F6AB}",
          "no_mobile_phones": "\u{1F4F5}",
          "no_mouth": "\u{1F636}",
          "no_pedestrians": "\u{1F6B7}",
          "no_smoking": "\u{1F6AD}",
          "non-potable_water": "\u{1F6B1}",
          "nose": "\u{1F443}",
          "notebook": "\u{1F4D3}",
          "notebook_with_decorative_cover": "\u{1F4D4}",
          "notes": "\u{1F3B6}",
          "nut_and_bolt": "\u{1F529}",
          "o": "\u2B55\uFE0F",
          "o2": "\u{1F17E}\uFE0F",
          "ocean": "\u{1F30A}",
          "octopus": "\u{1F419}",
          "oden": "\u{1F362}",
          "office": "\u{1F3E2}",
          "oil_drum": "\u{1F6E2}",
          "ok": "\u{1F197}",
          "ok_hand": "\u{1F44C}",
          "ok_man": "\u{1F646}&zwj;\u2642\uFE0F",
          "ok_woman": "\u{1F646}",
          "old_key": "\u{1F5DD}",
          "older_man": "\u{1F474}",
          "older_woman": "\u{1F475}",
          "om": "\u{1F549}",
          "on": "\u{1F51B}",
          "oncoming_automobile": "\u{1F698}",
          "oncoming_bus": "\u{1F68D}",
          "oncoming_police_car": "\u{1F694}",
          "oncoming_taxi": "\u{1F696}",
          "open_file_folder": "\u{1F4C2}",
          "open_hands": "\u{1F450}",
          "open_mouth": "\u{1F62E}",
          "open_umbrella": "\u2602\uFE0F",
          "ophiuchus": "\u26CE",
          "orange_book": "\u{1F4D9}",
          "orthodox_cross": "\u2626\uFE0F",
          "outbox_tray": "\u{1F4E4}",
          "owl": "\u{1F989}",
          "ox": "\u{1F402}",
          "package": "\u{1F4E6}",
          "page_facing_up": "\u{1F4C4}",
          "page_with_curl": "\u{1F4C3}",
          "pager": "\u{1F4DF}",
          "paintbrush": "\u{1F58C}",
          "palm_tree": "\u{1F334}",
          "pancakes": "\u{1F95E}",
          "panda_face": "\u{1F43C}",
          "paperclip": "\u{1F4CE}",
          "paperclips": "\u{1F587}",
          "parasol_on_ground": "\u26F1",
          "parking": "\u{1F17F}\uFE0F",
          "part_alternation_mark": "\u303D\uFE0F",
          "partly_sunny": "\u26C5\uFE0F",
          "passenger_ship": "\u{1F6F3}",
          "passport_control": "\u{1F6C2}",
          "pause_button": "\u23F8",
          "peace_symbol": "\u262E\uFE0F",
          "peach": "\u{1F351}",
          "peanuts": "\u{1F95C}",
          "pear": "\u{1F350}",
          "pen": "\u{1F58A}",
          "pencil2": "\u270F\uFE0F",
          "penguin": "\u{1F427}",
          "pensive": "\u{1F614}",
          "performing_arts": "\u{1F3AD}",
          "persevere": "\u{1F623}",
          "person_fencing": "\u{1F93A}",
          "pouting_woman": "\u{1F64E}",
          "phone": "\u260E\uFE0F",
          "pick": "\u26CF",
          "pig": "\u{1F437}",
          "pig2": "\u{1F416}",
          "pig_nose": "\u{1F43D}",
          "pill": "\u{1F48A}",
          "pineapple": "\u{1F34D}",
          "ping_pong": "\u{1F3D3}",
          "pisces": "\u2653\uFE0F",
          "pizza": "\u{1F355}",
          "place_of_worship": "\u{1F6D0}",
          "plate_with_cutlery": "\u{1F37D}",
          "play_or_pause_button": "\u23EF",
          "point_down": "\u{1F447}",
          "point_left": "\u{1F448}",
          "point_right": "\u{1F449}",
          "point_up": "\u261D\uFE0F",
          "point_up_2": "\u{1F446}",
          "police_car": "\u{1F693}",
          "policewoman": "\u{1F46E}&zwj;\u2640\uFE0F",
          "poodle": "\u{1F429}",
          "popcorn": "\u{1F37F}",
          "post_office": "\u{1F3E3}",
          "postal_horn": "\u{1F4EF}",
          "postbox": "\u{1F4EE}",
          "potable_water": "\u{1F6B0}",
          "potato": "\u{1F954}",
          "pouch": "\u{1F45D}",
          "poultry_leg": "\u{1F357}",
          "pound": "\u{1F4B7}",
          "rage": "\u{1F621}",
          "pouting_cat": "\u{1F63E}",
          "pouting_man": "\u{1F64E}&zwj;\u2642\uFE0F",
          "pray": "\u{1F64F}",
          "prayer_beads": "\u{1F4FF}",
          "pregnant_woman": "\u{1F930}",
          "previous_track_button": "\u23EE",
          "prince": "\u{1F934}",
          "princess": "\u{1F478}",
          "printer": "\u{1F5A8}",
          "purple_heart": "\u{1F49C}",
          "purse": "\u{1F45B}",
          "pushpin": "\u{1F4CC}",
          "put_litter_in_its_place": "\u{1F6AE}",
          "question": "\u2753",
          "rabbit": "\u{1F430}",
          "rabbit2": "\u{1F407}",
          "racehorse": "\u{1F40E}",
          "racing_car": "\u{1F3CE}",
          "radio": "\u{1F4FB}",
          "radio_button": "\u{1F518}",
          "radioactive": "\u2622\uFE0F",
          "railway_car": "\u{1F683}",
          "railway_track": "\u{1F6E4}",
          "rainbow": "\u{1F308}",
          "rainbow_flag": "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
          "raised_back_of_hand": "\u{1F91A}",
          "raised_hand_with_fingers_splayed": "\u{1F590}",
          "raised_hands": "\u{1F64C}",
          "raising_hand_woman": "\u{1F64B}",
          "raising_hand_man": "\u{1F64B}&zwj;\u2642\uFE0F",
          "ram": "\u{1F40F}",
          "ramen": "\u{1F35C}",
          "rat": "\u{1F400}",
          "record_button": "\u23FA",
          "recycle": "\u267B\uFE0F",
          "red_circle": "\u{1F534}",
          "registered": "\xAE\uFE0F",
          "relaxed": "\u263A\uFE0F",
          "relieved": "\u{1F60C}",
          "reminder_ribbon": "\u{1F397}",
          "repeat": "\u{1F501}",
          "repeat_one": "\u{1F502}",
          "rescue_worker_helmet": "\u26D1",
          "restroom": "\u{1F6BB}",
          "revolving_hearts": "\u{1F49E}",
          "rewind": "\u23EA",
          "rhinoceros": "\u{1F98F}",
          "ribbon": "\u{1F380}",
          "rice": "\u{1F35A}",
          "rice_ball": "\u{1F359}",
          "rice_cracker": "\u{1F358}",
          "rice_scene": "\u{1F391}",
          "right_anger_bubble": "\u{1F5EF}",
          "ring": "\u{1F48D}",
          "robot": "\u{1F916}",
          "rocket": "\u{1F680}",
          "rofl": "\u{1F923}",
          "roll_eyes": "\u{1F644}",
          "roller_coaster": "\u{1F3A2}",
          "rooster": "\u{1F413}",
          "rose": "\u{1F339}",
          "rosette": "\u{1F3F5}",
          "rotating_light": "\u{1F6A8}",
          "round_pushpin": "\u{1F4CD}",
          "rowing_man": "\u{1F6A3}",
          "rowing_woman": "\u{1F6A3}&zwj;\u2640\uFE0F",
          "rugby_football": "\u{1F3C9}",
          "running_man": "\u{1F3C3}",
          "running_shirt_with_sash": "\u{1F3BD}",
          "running_woman": "\u{1F3C3}&zwj;\u2640\uFE0F",
          "sa": "\u{1F202}\uFE0F",
          "sagittarius": "\u2650\uFE0F",
          "sake": "\u{1F376}",
          "sandal": "\u{1F461}",
          "santa": "\u{1F385}",
          "satellite": "\u{1F4E1}",
          "saxophone": "\u{1F3B7}",
          "school": "\u{1F3EB}",
          "school_satchel": "\u{1F392}",
          "scissors": "\u2702\uFE0F",
          "scorpion": "\u{1F982}",
          "scorpius": "\u264F\uFE0F",
          "scream": "\u{1F631}",
          "scream_cat": "\u{1F640}",
          "scroll": "\u{1F4DC}",
          "seat": "\u{1F4BA}",
          "secret": "\u3299\uFE0F",
          "see_no_evil": "\u{1F648}",
          "seedling": "\u{1F331}",
          "selfie": "\u{1F933}",
          "shallow_pan_of_food": "\u{1F958}",
          "shamrock": "\u2618\uFE0F",
          "shark": "\u{1F988}",
          "shaved_ice": "\u{1F367}",
          "sheep": "\u{1F411}",
          "shell": "\u{1F41A}",
          "shield": "\u{1F6E1}",
          "shinto_shrine": "\u26E9",
          "ship": "\u{1F6A2}",
          "shirt": "\u{1F455}",
          "shopping": "\u{1F6CD}",
          "shopping_cart": "\u{1F6D2}",
          "shower": "\u{1F6BF}",
          "shrimp": "\u{1F990}",
          "signal_strength": "\u{1F4F6}",
          "six_pointed_star": "\u{1F52F}",
          "ski": "\u{1F3BF}",
          "skier": "\u26F7",
          "skull": "\u{1F480}",
          "skull_and_crossbones": "\u2620\uFE0F",
          "sleeping": "\u{1F634}",
          "sleeping_bed": "\u{1F6CC}",
          "sleepy": "\u{1F62A}",
          "slightly_frowning_face": "\u{1F641}",
          "slightly_smiling_face": "\u{1F642}",
          "slot_machine": "\u{1F3B0}",
          "small_airplane": "\u{1F6E9}",
          "small_blue_diamond": "\u{1F539}",
          "small_orange_diamond": "\u{1F538}",
          "small_red_triangle": "\u{1F53A}",
          "small_red_triangle_down": "\u{1F53B}",
          "smile": "\u{1F604}",
          "smile_cat": "\u{1F638}",
          "smiley": "\u{1F603}",
          "smiley_cat": "\u{1F63A}",
          "smiling_imp": "\u{1F608}",
          "smirk": "\u{1F60F}",
          "smirk_cat": "\u{1F63C}",
          "smoking": "\u{1F6AC}",
          "snail": "\u{1F40C}",
          "snake": "\u{1F40D}",
          "sneezing_face": "\u{1F927}",
          "snowboarder": "\u{1F3C2}",
          "snowflake": "\u2744\uFE0F",
          "snowman": "\u26C4\uFE0F",
          "snowman_with_snow": "\u2603\uFE0F",
          "sob": "\u{1F62D}",
          "soccer": "\u26BD\uFE0F",
          "soon": "\u{1F51C}",
          "sos": "\u{1F198}",
          "sound": "\u{1F509}",
          "space_invader": "\u{1F47E}",
          "spades": "\u2660\uFE0F",
          "spaghetti": "\u{1F35D}",
          "sparkle": "\u2747\uFE0F",
          "sparkler": "\u{1F387}",
          "sparkles": "\u2728",
          "sparkling_heart": "\u{1F496}",
          "speak_no_evil": "\u{1F64A}",
          "speaker": "\u{1F508}",
          "speaking_head": "\u{1F5E3}",
          "speech_balloon": "\u{1F4AC}",
          "speedboat": "\u{1F6A4}",
          "spider": "\u{1F577}",
          "spider_web": "\u{1F578}",
          "spiral_calendar": "\u{1F5D3}",
          "spiral_notepad": "\u{1F5D2}",
          "spoon": "\u{1F944}",
          "squid": "\u{1F991}",
          "stadium": "\u{1F3DF}",
          "star": "\u2B50\uFE0F",
          "star2": "\u{1F31F}",
          "star_and_crescent": "\u262A\uFE0F",
          "star_of_david": "\u2721\uFE0F",
          "stars": "\u{1F320}",
          "station": "\u{1F689}",
          "statue_of_liberty": "\u{1F5FD}",
          "steam_locomotive": "\u{1F682}",
          "stew": "\u{1F372}",
          "stop_button": "\u23F9",
          "stop_sign": "\u{1F6D1}",
          "stopwatch": "\u23F1",
          "straight_ruler": "\u{1F4CF}",
          "strawberry": "\u{1F353}",
          "stuck_out_tongue": "\u{1F61B}",
          "stuck_out_tongue_closed_eyes": "\u{1F61D}",
          "stuck_out_tongue_winking_eye": "\u{1F61C}",
          "studio_microphone": "\u{1F399}",
          "stuffed_flatbread": "\u{1F959}",
          "sun_behind_large_cloud": "\u{1F325}",
          "sun_behind_rain_cloud": "\u{1F326}",
          "sun_behind_small_cloud": "\u{1F324}",
          "sun_with_face": "\u{1F31E}",
          "sunflower": "\u{1F33B}",
          "sunglasses": "\u{1F60E}",
          "sunny": "\u2600\uFE0F",
          "sunrise": "\u{1F305}",
          "sunrise_over_mountains": "\u{1F304}",
          "surfing_man": "\u{1F3C4}",
          "surfing_woman": "\u{1F3C4}&zwj;\u2640\uFE0F",
          "sushi": "\u{1F363}",
          "suspension_railway": "\u{1F69F}",
          "sweat": "\u{1F613}",
          "sweat_drops": "\u{1F4A6}",
          "sweat_smile": "\u{1F605}",
          "sweet_potato": "\u{1F360}",
          "swimming_man": "\u{1F3CA}",
          "swimming_woman": "\u{1F3CA}&zwj;\u2640\uFE0F",
          "symbols": "\u{1F523}",
          "synagogue": "\u{1F54D}",
          "syringe": "\u{1F489}",
          "taco": "\u{1F32E}",
          "tada": "\u{1F389}",
          "tanabata_tree": "\u{1F38B}",
          "taurus": "\u2649\uFE0F",
          "taxi": "\u{1F695}",
          "tea": "\u{1F375}",
          "telephone_receiver": "\u{1F4DE}",
          "telescope": "\u{1F52D}",
          "tennis": "\u{1F3BE}",
          "tent": "\u26FA\uFE0F",
          "thermometer": "\u{1F321}",
          "thinking": "\u{1F914}",
          "thought_balloon": "\u{1F4AD}",
          "ticket": "\u{1F3AB}",
          "tickets": "\u{1F39F}",
          "tiger": "\u{1F42F}",
          "tiger2": "\u{1F405}",
          "timer_clock": "\u23F2",
          "tipping_hand_man": "\u{1F481}&zwj;\u2642\uFE0F",
          "tired_face": "\u{1F62B}",
          "tm": "\u2122\uFE0F",
          "toilet": "\u{1F6BD}",
          "tokyo_tower": "\u{1F5FC}",
          "tomato": "\u{1F345}",
          "tongue": "\u{1F445}",
          "top": "\u{1F51D}",
          "tophat": "\u{1F3A9}",
          "tornado": "\u{1F32A}",
          "trackball": "\u{1F5B2}",
          "tractor": "\u{1F69C}",
          "traffic_light": "\u{1F6A5}",
          "train": "\u{1F68B}",
          "train2": "\u{1F686}",
          "tram": "\u{1F68A}",
          "triangular_flag_on_post": "\u{1F6A9}",
          "triangular_ruler": "\u{1F4D0}",
          "trident": "\u{1F531}",
          "triumph": "\u{1F624}",
          "trolleybus": "\u{1F68E}",
          "trophy": "\u{1F3C6}",
          "tropical_drink": "\u{1F379}",
          "tropical_fish": "\u{1F420}",
          "truck": "\u{1F69A}",
          "trumpet": "\u{1F3BA}",
          "tulip": "\u{1F337}",
          "tumbler_glass": "\u{1F943}",
          "turkey": "\u{1F983}",
          "turtle": "\u{1F422}",
          "tv": "\u{1F4FA}",
          "twisted_rightwards_arrows": "\u{1F500}",
          "two_hearts": "\u{1F495}",
          "two_men_holding_hands": "\u{1F46C}",
          "two_women_holding_hands": "\u{1F46D}",
          "u5272": "\u{1F239}",
          "u5408": "\u{1F234}",
          "u55b6": "\u{1F23A}",
          "u6307": "\u{1F22F}\uFE0F",
          "u6708": "\u{1F237}\uFE0F",
          "u6709": "\u{1F236}",
          "u6e80": "\u{1F235}",
          "u7121": "\u{1F21A}\uFE0F",
          "u7533": "\u{1F238}",
          "u7981": "\u{1F232}",
          "u7a7a": "\u{1F233}",
          "umbrella": "\u2614\uFE0F",
          "unamused": "\u{1F612}",
          "underage": "\u{1F51E}",
          "unicorn": "\u{1F984}",
          "unlock": "\u{1F513}",
          "up": "\u{1F199}",
          "upside_down_face": "\u{1F643}",
          "v": "\u270C\uFE0F",
          "vertical_traffic_light": "\u{1F6A6}",
          "vhs": "\u{1F4FC}",
          "vibration_mode": "\u{1F4F3}",
          "video_camera": "\u{1F4F9}",
          "video_game": "\u{1F3AE}",
          "violin": "\u{1F3BB}",
          "virgo": "\u264D\uFE0F",
          "volcano": "\u{1F30B}",
          "volleyball": "\u{1F3D0}",
          "vs": "\u{1F19A}",
          "vulcan_salute": "\u{1F596}",
          "walking_man": "\u{1F6B6}",
          "walking_woman": "\u{1F6B6}&zwj;\u2640\uFE0F",
          "waning_crescent_moon": "\u{1F318}",
          "waning_gibbous_moon": "\u{1F316}",
          "warning": "\u26A0\uFE0F",
          "wastebasket": "\u{1F5D1}",
          "watch": "\u231A\uFE0F",
          "water_buffalo": "\u{1F403}",
          "watermelon": "\u{1F349}",
          "wave": "\u{1F44B}",
          "wavy_dash": "\u3030\uFE0F",
          "waxing_crescent_moon": "\u{1F312}",
          "wc": "\u{1F6BE}",
          "weary": "\u{1F629}",
          "wedding": "\u{1F492}",
          "weight_lifting_man": "\u{1F3CB}\uFE0F",
          "weight_lifting_woman": "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
          "whale": "\u{1F433}",
          "whale2": "\u{1F40B}",
          "wheel_of_dharma": "\u2638\uFE0F",
          "wheelchair": "\u267F\uFE0F",
          "white_check_mark": "\u2705",
          "white_circle": "\u26AA\uFE0F",
          "white_flag": "\u{1F3F3}\uFE0F",
          "white_flower": "\u{1F4AE}",
          "white_large_square": "\u2B1C\uFE0F",
          "white_medium_small_square": "\u25FD\uFE0F",
          "white_medium_square": "\u25FB\uFE0F",
          "white_small_square": "\u25AB\uFE0F",
          "white_square_button": "\u{1F533}",
          "wilted_flower": "\u{1F940}",
          "wind_chime": "\u{1F390}",
          "wind_face": "\u{1F32C}",
          "wine_glass": "\u{1F377}",
          "wink": "\u{1F609}",
          "wolf": "\u{1F43A}",
          "woman": "\u{1F469}",
          "woman_artist": "\u{1F469}&zwj;\u{1F3A8}",
          "woman_astronaut": "\u{1F469}&zwj;\u{1F680}",
          "woman_cartwheeling": "\u{1F938}&zwj;\u2640\uFE0F",
          "woman_cook": "\u{1F469}&zwj;\u{1F373}",
          "woman_facepalming": "\u{1F926}&zwj;\u2640\uFE0F",
          "woman_factory_worker": "\u{1F469}&zwj;\u{1F3ED}",
          "woman_farmer": "\u{1F469}&zwj;\u{1F33E}",
          "woman_firefighter": "\u{1F469}&zwj;\u{1F692}",
          "woman_health_worker": "\u{1F469}&zwj;\u2695\uFE0F",
          "woman_judge": "\u{1F469}&zwj;\u2696\uFE0F",
          "woman_juggling": "\u{1F939}&zwj;\u2640\uFE0F",
          "woman_mechanic": "\u{1F469}&zwj;\u{1F527}",
          "woman_office_worker": "\u{1F469}&zwj;\u{1F4BC}",
          "woman_pilot": "\u{1F469}&zwj;\u2708\uFE0F",
          "woman_playing_handball": "\u{1F93E}&zwj;\u2640\uFE0F",
          "woman_playing_water_polo": "\u{1F93D}&zwj;\u2640\uFE0F",
          "woman_scientist": "\u{1F469}&zwj;\u{1F52C}",
          "woman_shrugging": "\u{1F937}&zwj;\u2640\uFE0F",
          "woman_singer": "\u{1F469}&zwj;\u{1F3A4}",
          "woman_student": "\u{1F469}&zwj;\u{1F393}",
          "woman_teacher": "\u{1F469}&zwj;\u{1F3EB}",
          "woman_technologist": "\u{1F469}&zwj;\u{1F4BB}",
          "woman_with_turban": "\u{1F473}&zwj;\u2640\uFE0F",
          "womans_clothes": "\u{1F45A}",
          "womans_hat": "\u{1F452}",
          "women_wrestling": "\u{1F93C}&zwj;\u2640\uFE0F",
          "womens": "\u{1F6BA}",
          "world_map": "\u{1F5FA}",
          "worried": "\u{1F61F}",
          "wrench": "\u{1F527}",
          "writing_hand": "\u270D\uFE0F",
          "x": "\u274C",
          "yellow_heart": "\u{1F49B}",
          "yen": "\u{1F4B4}",
          "yin_yang": "\u262F\uFE0F",
          "yum": "\u{1F60B}",
          "zap": "\u26A1\uFE0F",
          "zipper_mouth_face": "\u{1F910}",
          "zzz": "\u{1F4A4}",
          /* special emojis :P */
          "octocat": '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
          "showdown": `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
        };
        showdown2.Converter = function(converterOptions) {
          "use strict";
          var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
            parsed: {},
            raw: "",
            format: ""
          };
          _constructor();
          function _constructor() {
            converterOptions = converterOptions || {};
            for (var gOpt in globalOptions) {
              if (globalOptions.hasOwnProperty(gOpt)) {
                options[gOpt] = globalOptions[gOpt];
              }
            }
            if (typeof converterOptions === "object") {
              for (var opt in converterOptions) {
                if (converterOptions.hasOwnProperty(opt)) {
                  options[opt] = converterOptions[opt];
                }
              }
            } else {
              throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
            }
            if (options.extensions) {
              showdown2.helper.forEach(options.extensions, _parseExtension);
            }
          }
          function _parseExtension(ext, name) {
            name = name || null;
            if (showdown2.helper.isString(ext)) {
              ext = showdown2.helper.stdExtName(ext);
              name = ext;
              if (showdown2.extensions[ext]) {
                console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!");
                legacyExtensionLoading(showdown2.extensions[ext], ext);
                return;
              } else if (!showdown2.helper.isUndefined(extensions[ext])) {
                ext = extensions[ext];
              } else {
                throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
              }
            }
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExt = validate(ext, name);
            if (!validExt.valid) {
              throw Error(validExt.error);
            }
            for (var i4 = 0; i4 < ext.length; ++i4) {
              switch (ext[i4].type) {
                case "lang":
                  langExtensions.push(ext[i4]);
                  break;
                case "output":
                  outputModifiers.push(ext[i4]);
                  break;
              }
              if (ext[i4].hasOwnProperty("listeners")) {
                for (var ln in ext[i4].listeners) {
                  if (ext[i4].listeners.hasOwnProperty(ln)) {
                    listen(ln, ext[i4].listeners[ln]);
                  }
                }
              }
            }
          }
          function legacyExtensionLoading(ext, name) {
            if (typeof ext === "function") {
              ext = ext(new showdown2.Converter());
            }
            if (!showdown2.helper.isArray(ext)) {
              ext = [ext];
            }
            var valid = validate(ext, name);
            if (!valid.valid) {
              throw Error(valid.error);
            }
            for (var i4 = 0; i4 < ext.length; ++i4) {
              switch (ext[i4].type) {
                case "lang":
                  langExtensions.push(ext[i4]);
                  break;
                case "output":
                  outputModifiers.push(ext[i4]);
                  break;
                default:
                  throw Error("Extension loader error: Type unrecognized!!!");
              }
            }
          }
          function listen(name, callback) {
            if (!showdown2.helper.isString(name)) {
              throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
            }
            if (typeof callback !== "function") {
              throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
            }
            if (!listeners.hasOwnProperty(name)) {
              listeners[name] = [];
            }
            listeners[name].push(callback);
          }
          function rTrimInputText(text) {
            var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
            return text.replace(rgx, "");
          }
          this._dispatch = function dispatch(evtName, text, options2, globals) {
            if (listeners.hasOwnProperty(evtName)) {
              for (var ei = 0; ei < listeners[evtName].length; ++ei) {
                var nText = listeners[evtName][ei](evtName, text, this, options2, globals);
                if (nText && typeof nText !== "undefined") {
                  text = nText;
                }
              }
            }
            return text;
          };
          this.listen = function(name, callback) {
            listen(name, callback);
            return this;
          };
          this.makeHtml = function(text) {
            if (!text) {
              return text;
            }
            var globals = {
              gHtmlBlocks: [],
              gHtmlMdBlocks: [],
              gHtmlSpans: [],
              gUrls: {},
              gTitles: {},
              gDimensions: {},
              gListLevel: 0,
              hashLinkCounts: {},
              langExtensions,
              outputModifiers,
              converter: this,
              ghCodeBlocks: [],
              metadata: {
                parsed: {},
                raw: "",
                format: ""
              }
            };
            text = text.replace(/¨/g, "\xA8T");
            text = text.replace(/\$/g, "\xA8D");
            text = text.replace(/\r\n/g, "\n");
            text = text.replace(/\r/g, "\n");
            text = text.replace(/\u00A0/g, "&nbsp;");
            if (options.smartIndentationFix) {
              text = rTrimInputText(text);
            }
            text = "\n\n" + text + "\n\n";
            text = showdown2.subParser("detab")(text, options, globals);
            text = text.replace(/^[ \t]+$/mg, "");
            showdown2.helper.forEach(langExtensions, function(ext) {
              text = showdown2.subParser("runExtension")(ext, text, options, globals);
            });
            text = showdown2.subParser("metadata")(text, options, globals);
            text = showdown2.subParser("hashPreCodeTags")(text, options, globals);
            text = showdown2.subParser("githubCodeBlocks")(text, options, globals);
            text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
            text = showdown2.subParser("hashCodeTags")(text, options, globals);
            text = showdown2.subParser("stripLinkDefinitions")(text, options, globals);
            text = showdown2.subParser("blockGamut")(text, options, globals);
            text = showdown2.subParser("unhashHTMLSpans")(text, options, globals);
            text = showdown2.subParser("unescapeSpecialChars")(text, options, globals);
            text = text.replace(/¨D/g, "$$");
            text = text.replace(/¨T/g, "\xA8");
            text = showdown2.subParser("completeHTMLDocument")(text, options, globals);
            showdown2.helper.forEach(outputModifiers, function(ext) {
              text = showdown2.subParser("runExtension")(ext, text, options, globals);
            });
            metadata = globals.metadata;
            return text;
          };
          this.makeMarkdown = this.makeMd = function(src, HTMLParser) {
            src = src.replace(/\r\n/g, "\n");
            src = src.replace(/\r/g, "\n");
            src = src.replace(/>[ \t]+</, ">\xA8NBSP;<");
            if (!HTMLParser) {
              if (window && window.document) {
                HTMLParser = window.document;
              } else {
                throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
              }
            }
            var doc = HTMLParser.createElement("div");
            doc.innerHTML = src;
            var globals = {
              preList: substitutePreCodeTags(doc)
            };
            clean(doc);
            var nodes = doc.childNodes, mdDoc = "";
            for (var i4 = 0; i4 < nodes.length; i4++) {
              mdDoc += showdown2.subParser("makeMarkdown.node")(nodes[i4], globals);
            }
            function clean(node) {
              for (var n5 = 0; n5 < node.childNodes.length; ++n5) {
                var child = node.childNodes[n5];
                if (child.nodeType === 3) {
                  if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
                    node.removeChild(child);
                    --n5;
                  } else {
                    child.nodeValue = child.nodeValue.split("\n").join(" ");
                    child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
                  }
                } else if (child.nodeType === 1) {
                  clean(child);
                }
              }
            }
            function substitutePreCodeTags(doc2) {
              var pres = doc2.querySelectorAll("pre"), presPH = [];
              for (var i5 = 0; i5 < pres.length; ++i5) {
                if (pres[i5].childElementCount === 1 && pres[i5].firstChild.tagName.toLowerCase() === "code") {
                  var content = pres[i5].firstChild.innerHTML.trim(), language = pres[i5].firstChild.getAttribute("data-language") || "";
                  if (language === "") {
                    var classes = pres[i5].firstChild.className.split(" ");
                    for (var c4 = 0; c4 < classes.length; ++c4) {
                      var matches = classes[c4].match(/^language-(.+)$/);
                      if (matches !== null) {
                        language = matches[1];
                        break;
                      }
                    }
                  }
                  content = showdown2.helper.unescapeHTMLEntities(content);
                  presPH.push(content);
                  pres[i5].outerHTML = '<precode language="' + language + '" precodenum="' + i5.toString() + '"></precode>';
                } else {
                  presPH.push(pres[i5].innerHTML);
                  pres[i5].innerHTML = "";
                  pres[i5].setAttribute("prenum", i5.toString());
                }
              }
              return presPH;
            }
            return mdDoc;
          };
          this.setOption = function(key, value) {
            options[key] = value;
          };
          this.getOption = function(key) {
            return options[key];
          };
          this.getOptions = function() {
            return options;
          };
          this.addExtension = function(extension, name) {
            name = name || null;
            _parseExtension(extension, name);
          };
          this.useExtension = function(extensionName) {
            _parseExtension(extensionName);
          };
          this.setFlavor = function(name) {
            if (!flavor.hasOwnProperty(name)) {
              throw Error(name + " flavor was not found");
            }
            var preset = flavor[name];
            setConvFlavor = name;
            for (var option in preset) {
              if (preset.hasOwnProperty(option)) {
                options[option] = preset[option];
              }
            }
          };
          this.getFlavor = function() {
            return setConvFlavor;
          };
          this.removeExtension = function(extension) {
            if (!showdown2.helper.isArray(extension)) {
              extension = [extension];
            }
            for (var a2 = 0; a2 < extension.length; ++a2) {
              var ext = extension[a2];
              for (var i4 = 0; i4 < langExtensions.length; ++i4) {
                if (langExtensions[i4] === ext) {
                  langExtensions.splice(i4, 1);
                }
              }
              for (var ii = 0; ii < outputModifiers.length; ++ii) {
                if (outputModifiers[ii] === ext) {
                  outputModifiers.splice(ii, 1);
                }
              }
            }
          };
          this.getAllExtensions = function() {
            return {
              language: langExtensions,
              output: outputModifiers
            };
          };
          this.getMetadata = function(raw) {
            if (raw) {
              return metadata.raw;
            } else {
              return metadata.parsed;
            }
          };
          this.getMetadataFormat = function() {
            return metadata.format;
          };
          this._setMetadataPair = function(key, value) {
            metadata.parsed[key] = value;
          };
          this._setMetadataFormat = function(format) {
            metadata.format = format;
          };
          this._setMetadataRaw = function(raw) {
            metadata.raw = raw;
          };
        };
        showdown2.subParser("anchors", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("anchors.before", text, options, globals);
          var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
            if (showdown2.helper.isUndefined(title)) {
              title = "";
            }
            linkId = linkId.toLowerCase();
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (!url) {
              if (!linkId) {
                linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown2.helper.isUndefined(globals.gUrls[linkId])) {
                url = globals.gUrls[linkId];
                if (!showdown2.helper.isUndefined(globals.gTitles[linkId])) {
                  title = globals.gTitles[linkId];
                }
              } else {
                return wholeMatch;
              }
            }
            url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var result = '<a href="' + url + '"';
            if (title !== "" && title !== null) {
              title = title.replace(/"/g, "&quot;");
              title = title.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (options.openLinksInNewWindow && !/^#/.test(url)) {
              result += ' rel="noopener noreferrer" target="\xA8E95Eblank"';
            }
            result += ">" + linkText + "</a>";
            return result;
          };
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(
            /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
            writeAnchorTag
          );
          text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
          if (options.ghMentions) {
            text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(wm, st2, escape, mentions, username) {
              if (escape === "\\") {
                return st2 + mentions;
              }
              if (!showdown2.helper.isString(options.ghMentionsLink)) {
                throw new Error("ghMentionsLink option must be a string");
              }
              var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
              if (options.openLinksInNewWindow) {
                target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
              }
              return st2 + '<a href="' + lnk + '"' + target + ">" + mentions + "</a>";
            });
          }
          text = globals.converter._dispatch("anchors.after", text, options, globals);
          return text;
        });
        var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function(options) {
          "use strict";
          return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
            link = link.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
            if (/^www\./i.test(link)) {
              link = link.replace(/^www\./i, "http://www.");
            }
            if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
              append = trailingPunctuation;
            }
            if (options.openLinksInNewWindow) {
              target = ' rel="noopener noreferrer" target="\xA8E95Eblank"';
            }
            return lmc + '<a href="' + link + '"' + target + ">" + lnkTxt + "</a>" + append + tmc;
          };
        }, replaceMail = function(options, globals) {
          "use strict";
          return function(wholeMatch, b2, mail) {
            var href = "mailto:";
            b2 = b2 || "";
            mail = showdown2.subParser("unescapeSpecialChars")(mail, options, globals);
            if (options.encodeEmails) {
              href = showdown2.helper.encodeEmailAddress(href + mail);
              mail = showdown2.helper.encodeEmailAddress(mail);
            } else {
              href = href + mail;
            }
            return b2 + '<a href="' + href + '">' + mail + "</a>";
          };
        };
        showdown2.subParser("autoLinks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("autoLinks.before", text, options, globals);
          text = text.replace(delimUrlRegex, replaceLink(options));
          text = text.replace(delimMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("autoLinks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("simplifiedAutoLinks", function(text, options, globals) {
          "use strict";
          if (!options.simplifiedAutoLink) {
            return text;
          }
          text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
          if (options.excludeTrailingPunctuationFromURLs) {
            text = text.replace(simpleURLRegex2, replaceLink(options));
          } else {
            text = text.replace(simpleURLRegex, replaceLink(options));
          }
          text = text.replace(simpleMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("blockGamut", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("blockGamut.before", text, options, globals);
          text = showdown2.subParser("blockQuotes")(text, options, globals);
          text = showdown2.subParser("headers")(text, options, globals);
          text = showdown2.subParser("horizontalRule")(text, options, globals);
          text = showdown2.subParser("lists")(text, options, globals);
          text = showdown2.subParser("codeBlocks")(text, options, globals);
          text = showdown2.subParser("tables")(text, options, globals);
          text = showdown2.subParser("hashHTMLBlocks")(text, options, globals);
          text = showdown2.subParser("paragraphs")(text, options, globals);
          text = globals.converter._dispatch("blockGamut.after", text, options, globals);
          return text;
        });
        showdown2.subParser("blockQuotes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
          text = text + "\n\n";
          var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
          if (options.splitAdjacentBlockquotes) {
            rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
          }
          text = text.replace(rgx, function(bq) {
            bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
            bq = bq.replace(/¨0/g, "");
            bq = bq.replace(/^[ \t]+$/gm, "");
            bq = showdown2.subParser("githubCodeBlocks")(bq, options, globals);
            bq = showdown2.subParser("blockGamut")(bq, options, globals);
            bq = bq.replace(/(^|\n)/g, "$1  ");
            bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
              var pre = m1;
              pre = pre.replace(/^  /mg, "\xA80");
              pre = pre.replace(/¨0/g, "");
              return pre;
            });
            return showdown2.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
          });
          text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("codeBlocks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
          text += "\xA80";
          var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
          text = text.replace(pattern, function(wholeMatch, m1, m2) {
            var codeblock = m1, nextChar = m2, end = "\n";
            codeblock = showdown2.subParser("outdent")(codeblock, options, globals);
            codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown2.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            if (options.omitExtraWLInCodeBlocks) {
              end = "";
            }
            codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
            return showdown2.subParser("hashBlock")(codeblock, options, globals) + nextChar;
          });
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("codeSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("codeSpans.before", text, options, globals);
          if (typeof text === "undefined") {
            text = "";
          }
          text = text.replace(
            /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
            function(wholeMatch, m1, m2, m3) {
              var c4 = m3;
              c4 = c4.replace(/^([ \t]*)/g, "");
              c4 = c4.replace(/[ \t]*$/g, "");
              c4 = showdown2.subParser("encodeCode")(c4, options, globals);
              c4 = m1 + "<code>" + c4 + "</code>";
              c4 = showdown2.subParser("hashHTMLSpans")(c4, options, globals);
              return c4;
            }
          );
          text = globals.converter._dispatch("codeSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("completeHTMLDocument", function(text, options, globals) {
          "use strict";
          if (!options.completeHTMLDocument) {
            return text;
          }
          text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
          var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = '<meta charset="utf-8">\n', lang = "", metadata = "";
          if (typeof globals.metadata.parsed.doctype !== "undefined") {
            doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
            doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
            if (doctype === "html" || doctype === "html5") {
              charset = '<meta charset="utf-8">';
            }
          }
          for (var meta in globals.metadata.parsed) {
            if (globals.metadata.parsed.hasOwnProperty(meta)) {
              switch (meta.toLowerCase()) {
                case "doctype":
                  break;
                case "title":
                  title = "<title>" + globals.metadata.parsed.title + "</title>\n";
                  break;
                case "charset":
                  if (doctype === "html" || doctype === "html5") {
                    charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
                  } else {
                    charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
                  }
                  break;
                case "language":
                case "lang":
                  lang = ' lang="' + globals.metadata.parsed[meta] + '"';
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
                  break;
                default:
                  metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
              }
            }
          }
          text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
          text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
          return text;
        });
        showdown2.subParser("detab", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("detab.before", text, options, globals);
          text = text.replace(/\t(?=\t)/g, "    ");
          text = text.replace(/\t/g, "\xA8A\xA8B");
          text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
            var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
            for (var i4 = 0; i4 < numSpaces; i4++) {
              leadingText += " ";
            }
            return leadingText;
          });
          text = text.replace(/¨A/g, "    ");
          text = text.replace(/¨B/g, "");
          text = globals.converter._dispatch("detab.after", text, options, globals);
          return text;
        });
        showdown2.subParser("ellipsis", function(text, options, globals) {
          "use strict";
          if (!options.ellipsis) {
            return text;
          }
          text = globals.converter._dispatch("ellipsis.before", text, options, globals);
          text = text.replace(/\.\.\./g, "\u2026");
          text = globals.converter._dispatch("ellipsis.after", text, options, globals);
          return text;
        });
        showdown2.subParser("emoji", function(text, options, globals) {
          "use strict";
          if (!options.emoji) {
            return text;
          }
          text = globals.converter._dispatch("emoji.before", text, options, globals);
          var emojiRgx = /:([\S]+?):/g;
          text = text.replace(emojiRgx, function(wm, emojiCode) {
            if (showdown2.helper.emojis.hasOwnProperty(emojiCode)) {
              return showdown2.helper.emojis[emojiCode];
            }
            return wm;
          });
          text = globals.converter._dispatch("emoji.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeAmpsAndAngles", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
          text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
          text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
          text = text.replace(/</g, "&lt;");
          text = text.replace(/>/g, "&gt;");
          text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeBackslashEscapes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
          text = text.replace(/\\(\\)/g, showdown2.helper.escapeCharactersCallback);
          text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("encodeCode", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("encodeCode.before", text, options, globals);
          text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeCode.after", text, options, globals);
          return text;
        });
        showdown2.subParser("escapeSpecialCharsWithinTagAttributes", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
          var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
          text = text.replace(tags, function(wholeMatch) {
            return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
          });
          text = text.replace(comments, function(wholeMatch) {
            return wholeMatch.replace(/([\\`*_~=|])/g, showdown2.helper.escapeCharactersCallback);
          });
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
          return text;
        });
        showdown2.subParser("githubCodeBlocks", function(text, options, globals) {
          "use strict";
          if (!options.ghCodeBlocks) {
            return text;
          }
          text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
          text += "\xA80";
          text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(wholeMatch, delim, language, codeblock) {
            var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
            codeblock = showdown2.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown2.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            codeblock = "<pre><code" + (language ? ' class="' + language + " language-" + language + '"' : "") + ">" + codeblock + end + "</code></pre>";
            codeblock = showdown2.subParser("hashBlock")(codeblock, options, globals);
            return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          });
          text = text.replace(/¨0/, "");
          return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
        });
        showdown2.subParser("hashBlock", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashBlock.before", text, options, globals);
          text = text.replace(/(^\n+|\n+$)/g, "");
          text = "\n\n\xA8K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
          text = globals.converter._dispatch("hashBlock.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashCodeTags", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
            return "\xA8C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
          };
          text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
          text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashElement", function(text, options, globals) {
          "use strict";
          return function(wholeMatch, m1) {
            var blockText = m1;
            blockText = blockText.replace(/\n\n/g, "\n");
            blockText = blockText.replace(/^\n/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n\xA8K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
            return blockText;
          };
        });
        showdown2.subParser("hashHTMLBlocks", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
          var blockTags = [
            "pre",
            "div",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "table",
            "dl",
            "ol",
            "ul",
            "script",
            "noscript",
            "form",
            "fieldset",
            "iframe",
            "math",
            "style",
            "section",
            "header",
            "footer",
            "nav",
            "article",
            "aside",
            "address",
            "audio",
            "canvas",
            "figure",
            "hgroup",
            "output",
            "video",
            "p"
          ], repFunc = function(wholeMatch, match, left, right) {
            var txt = wholeMatch;
            if (left.search(/\bmarkdown\b/) !== -1) {
              txt = left + globals.converter.makeHtml(match) + right;
            }
            return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          };
          if (options.backslashEscapesHTMLTags) {
            text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
              return "&lt;" + inside + "&gt;";
            });
          }
          for (var i4 = 0; i4 < blockTags.length; ++i4) {
            var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i4] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i4] + "\\b[^>]*>", patRight = "</" + blockTags[i4] + ">";
            while ((opTagPos = showdown2.helper.regexIndexOf(text, rgx1)) !== -1) {
              var subTexts = showdown2.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown2.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
              if (newSubText1 === subTexts[1]) {
                break;
              }
              text = subTexts[0].concat(newSubText1);
            }
          }
          text = text.replace(
            /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
            showdown2.subParser("hashElement")(text, options, globals)
          );
          text = showdown2.helper.replaceRecursiveRegExp(text, function(txt) {
            return "\n\n\xA8K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          }, "^ {0,3}<!--", "-->", "gm");
          text = text.replace(
            /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
            showdown2.subParser("hashElement")(text, options, globals)
          );
          text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashHTMLSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
          function hashHTMLSpan(html) {
            return "\xA8C" + (globals.gHtmlSpans.push(html) - 1) + "C";
          }
          text = text.replace(/<[^>]+?\/>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<[^>]+?>/gi, function(wm) {
            return hashHTMLSpan(wm);
          });
          text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("unhashHTMLSpans", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
          for (var i4 = 0; i4 < globals.gHtmlSpans.length; ++i4) {
            var repText = globals.gHtmlSpans[i4], limit = 0;
            while (/¨C(\d+)C/.test(repText)) {
              var num = RegExp.$1;
              repText = repText.replace("\xA8C" + num + "C", globals.gHtmlSpans[num]);
              if (limit === 10) {
                console.error("maximum nesting of 10 spans reached!!!");
                break;
              }
              ++limit;
            }
            text = text.replace("\xA8C" + i4 + "C", repText);
          }
          text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown2.subParser("hashPreCodeTags", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
          var repFunc = function(wholeMatch, match, left, right) {
            var codeblock = left + showdown2.subParser("encodeCode")(match, options, globals) + right;
            return "\n\n\xA8G" + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock }) - 1) + "G\n\n";
          };
          text = showdown2.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
          text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
          return text;
        });
        showdown2.subParser("headers", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("headers.before", text, options, globals);
          var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
          text = text.replace(setextRegexH1, function(wholeMatch, m1) {
            var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(hashBlock, options, globals);
          });
          text = text.replace(setextRegexH2, function(matchFound, m1) {
            var spanGamut = showdown2.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m1) + '"', hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(hashBlock, options, globals);
          });
          var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
          text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
            var hText = m2;
            if (options.customizedHeaderId) {
              hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
            }
            var span = showdown2.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : ' id="' + headerId(m2) + '"', hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
            return showdown2.subParser("hashBlock")(header, options, globals);
          });
          function headerId(m2) {
            var title, prefix;
            if (options.customizedHeaderId) {
              var match = m2.match(/\{([^{]+?)}\s*$/);
              if (match && match[1]) {
                m2 = match[1];
              }
            }
            title = m2;
            if (showdown2.helper.isString(options.prefixHeaderId)) {
              prefix = options.prefixHeaderId;
            } else if (options.prefixHeaderId === true) {
              prefix = "section-";
            } else {
              prefix = "";
            }
            if (!options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (options.ghCompatibleHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
            } else if (options.rawHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
            } else {
              title = title.replace(/[^\w]/g, "").toLowerCase();
            }
            if (options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (globals.hashLinkCounts[title]) {
              title = title + "-" + globals.hashLinkCounts[title]++;
            } else {
              globals.hashLinkCounts[title] = 1;
            }
            return title;
          }
          text = globals.converter._dispatch("headers.after", text, options, globals);
          return text;
        });
        showdown2.subParser("horizontalRule", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
          var key = showdown2.subParser("hashBlock")("<hr />", options, globals);
          text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
          text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
          return text;
        });
        showdown2.subParser("images", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("images.before", text, options, globals);
          var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
          function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
            url = url.replace(/\s/g, "");
            return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
          }
          function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
            var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
            linkId = linkId.toLowerCase();
            if (!title) {
              title = "";
            }
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (url === "" || url === null) {
              if (linkId === "" || linkId === null) {
                linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown2.helper.isUndefined(gUrls[linkId])) {
                url = gUrls[linkId];
                if (!showdown2.helper.isUndefined(gTitles[linkId])) {
                  title = gTitles[linkId];
                }
                if (!showdown2.helper.isUndefined(gDims[linkId])) {
                  width = gDims[linkId].width;
                  height = gDims[linkId].height;
                }
              } else {
                return wholeMatch;
              }
            }
            altText = altText.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            url = url.replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
            var result = '<img src="' + url + '" alt="' + altText + '"';
            if (title && showdown2.helper.isString(title)) {
              title = title.replace(/"/g, "&quot;").replace(showdown2.helper.regexes.asteriskDashAndColon, showdown2.helper.escapeCharactersCallback);
              result += ' title="' + title + '"';
            }
            if (width && height) {
              width = width === "*" ? "auto" : width;
              height = height === "*" ? "auto" : height;
              result += ' width="' + width + '"';
              result += ' height="' + height + '"';
            }
            result += " />";
            return result;
          }
          text = text.replace(referenceRegExp, writeImageTag);
          text = text.replace(base64RegExp, writeImageTagBase64);
          text = text.replace(crazyRegExp, writeImageTag);
          text = text.replace(inlineRegExp, writeImageTag);
          text = text.replace(refShortcutRegExp, writeImageTag);
          text = globals.converter._dispatch("images.after", text, options, globals);
          return text;
        });
        showdown2.subParser("italicsAndBold", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
          function parseInside(txt, left, right) {
            return left + txt + right;
          }
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return parseInside(txt, "<strong><em>", "</em></strong>");
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return parseInside(txt, "<strong>", "</strong>");
            });
            text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
              return parseInside(txt, "<em>", "</em>");
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
            });
          }
          if (options.literalMidWordAsterisks) {
            text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong><em>", "</em></strong>");
            });
            text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<strong>", "</strong>");
            });
            text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(wm, lead, txt) {
              return parseInside(txt, lead + "<em>", "</em>");
            });
          } else {
            text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m2) {
              return /\S$/.test(m2) ? parseInside(m2, "<em>", "</em>") : wm;
            });
          }
          text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
          return text;
        });
        showdown2.subParser("lists", function(text, options, globals) {
          "use strict";
          function processListItems(listStr, trimTrailing) {
            globals.gListLevel++;
            listStr = listStr.replace(/\n{2,}$/, "\n");
            listStr += "\xA80";
            var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = /\n[ \t]*\n(?!¨0)/.test(listStr);
            if (options.disableForced4SpacesIndentedSublists) {
              rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
            }
            listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
              checked = checked && checked.trim() !== "";
              var item = showdown2.subParser("outdent")(m4, options, globals), bulletStyle = "";
              if (taskbtn && options.tasklists) {
                bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
                item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                  var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                  if (checked) {
                    otp += " checked";
                  }
                  otp += ">";
                  return otp;
                });
              }
              item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
                return "\xA8A" + wm2;
              });
              if (m1 || item.search(/\n{2,}/) > -1) {
                item = showdown2.subParser("githubCodeBlocks")(item, options, globals);
                item = showdown2.subParser("blockGamut")(item, options, globals);
              } else {
                item = showdown2.subParser("lists")(item, options, globals);
                item = item.replace(/\n$/, "");
                item = showdown2.subParser("hashHTMLBlocks")(item, options, globals);
                item = item.replace(/\n\n+/g, "\n\n");
                if (isParagraphed) {
                  item = showdown2.subParser("paragraphs")(item, options, globals);
                } else {
                  item = showdown2.subParser("spanGamut")(item, options, globals);
                }
              }
              item = item.replace("\xA8A", "");
              item = "<li" + bulletStyle + ">" + item + "</li>\n";
              return item;
            });
            listStr = listStr.replace(/¨0/g, "");
            globals.gListLevel--;
            if (trimTrailing) {
              listStr = listStr.replace(/\s+$/, "");
            }
            return listStr;
          }
          function styleStartNumber(list, listType) {
            if (listType === "ol") {
              var res = list.match(/^ *(\d+)\./);
              if (res && res[1] !== "1") {
                return ' start="' + res[1] + '"';
              }
            }
            return "";
          }
          function parseConsecutiveLists(list, listType, trimTrailing) {
            var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
            if (list.search(counterRxg) !== -1) {
              (function parseCL(txt) {
                var pos = txt.search(counterRxg), style2 = styleStartNumber(list, listType);
                if (pos !== -1) {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
                  listType = listType === "ul" ? "ol" : "ul";
                  counterRxg = listType === "ul" ? olRgx : ulRgx;
                  parseCL(txt.slice(pos));
                } else {
                  result += "\n\n<" + listType + style2 + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
                }
              })(list);
            } else {
              var style = styleStartNumber(list, listType);
              result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
            }
            return result;
          }
          text = globals.converter._dispatch("lists.before", text, options, globals);
          text += "\xA80";
          if (globals.gListLevel) {
            text = text.replace(
              /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, list, m2) {
                var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, true);
              }
            );
          } else {
            text = text.replace(
              /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
              function(wholeMatch, m1, list, m3) {
                var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
                return parseConsecutiveLists(list, listType, false);
              }
            );
          }
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("lists.after", text, options, globals);
          return text;
        });
        showdown2.subParser("metadata", function(text, options, globals) {
          "use strict";
          if (!options.metadata) {
            return text;
          }
          text = globals.converter._dispatch("metadata.before", text, options, globals);
          function parseMetadataContents(content) {
            globals.metadata.raw = content;
            content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
            content = content.replace(/\n {4}/g, " ");
            content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(wm, key, value) {
              globals.metadata.parsed[key] = value;
              return "";
            });
          }
          text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(wholematch, format, content) {
            parseMetadataContents(content);
            return "\xA8M";
          });
          text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(wholematch, format, content) {
            if (format) {
              globals.metadata.format = format;
            }
            parseMetadataContents(content);
            return "\xA8M";
          });
          text = text.replace(/¨M/g, "");
          text = globals.converter._dispatch("metadata.after", text, options, globals);
          return text;
        });
        showdown2.subParser("outdent", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("outdent.before", text, options, globals);
          text = text.replace(/^(\t|[ ]{1,4})/gm, "\xA80");
          text = text.replace(/¨0/g, "");
          text = globals.converter._dispatch("outdent.after", text, options, globals);
          return text;
        });
        showdown2.subParser("paragraphs", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("paragraphs.before", text, options, globals);
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
          for (var i4 = 0; i4 < end; i4++) {
            var str = grafs[i4];
            if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
              grafsOut.push(str);
            } else if (str.search(/\S/) >= 0) {
              str = showdown2.subParser("spanGamut")(str, options, globals);
              str = str.replace(/^([ \t]*)/g, "<p>");
              str += "</p>";
              grafsOut.push(str);
            }
          }
          end = grafsOut.length;
          for (i4 = 0; i4 < end; i4++) {
            var blockText = "", grafsOutIt = grafsOut[i4], codeFlag = false;
            while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
              var delim = RegExp.$1, num = RegExp.$2;
              if (delim === "K") {
                blockText = globals.gHtmlBlocks[num];
              } else {
                if (codeFlag) {
                  blockText = showdown2.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
                } else {
                  blockText = globals.ghCodeBlocks[num].codeblock;
                }
              }
              blockText = blockText.replace(/\$/g, "$$$$");
              grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
              if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
                codeFlag = true;
              }
            }
            grafsOut[i4] = grafsOutIt;
          }
          text = grafsOut.join("\n");
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          return globals.converter._dispatch("paragraphs.after", text, options, globals);
        });
        showdown2.subParser("runExtension", function(ext, text, options, globals) {
          "use strict";
          if (ext.filter) {
            text = ext.filter(text, globals.converter, options);
          } else if (ext.regex) {
            var re = ext.regex;
            if (!(re instanceof RegExp)) {
              re = new RegExp(re, "g");
            }
            text = text.replace(re, ext.replace);
          }
          return text;
        });
        showdown2.subParser("spanGamut", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("spanGamut.before", text, options, globals);
          text = showdown2.subParser("codeSpans")(text, options, globals);
          text = showdown2.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
          text = showdown2.subParser("encodeBackslashEscapes")(text, options, globals);
          text = showdown2.subParser("images")(text, options, globals);
          text = showdown2.subParser("anchors")(text, options, globals);
          text = showdown2.subParser("autoLinks")(text, options, globals);
          text = showdown2.subParser("simplifiedAutoLinks")(text, options, globals);
          text = showdown2.subParser("emoji")(text, options, globals);
          text = showdown2.subParser("underline")(text, options, globals);
          text = showdown2.subParser("italicsAndBold")(text, options, globals);
          text = showdown2.subParser("strikethrough")(text, options, globals);
          text = showdown2.subParser("ellipsis")(text, options, globals);
          text = showdown2.subParser("hashHTMLSpans")(text, options, globals);
          text = showdown2.subParser("encodeAmpsAndAngles")(text, options, globals);
          if (options.simpleLineBreaks) {
            if (!/\n\n¨K/.test(text)) {
              text = text.replace(/\n+/g, "<br />\n");
            }
          } else {
            text = text.replace(/  +\n/g, "<br />\n");
          }
          text = globals.converter._dispatch("spanGamut.after", text, options, globals);
          return text;
        });
        showdown2.subParser("strikethrough", function(text, options, globals) {
          "use strict";
          function parseInside(txt) {
            if (options.simplifiedAutoLink) {
              txt = showdown2.subParser("simplifiedAutoLinks")(txt, options, globals);
            }
            return "<del>" + txt + "</del>";
          }
          if (options.strikethrough) {
            text = globals.converter._dispatch("strikethrough.before", text, options, globals);
            text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
              return parseInside(txt);
            });
            text = globals.converter._dispatch("strikethrough.after", text, options, globals);
          }
          return text;
        });
        showdown2.subParser("stripLinkDefinitions", function(text, options, globals) {
          "use strict";
          var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
          text += "\xA80";
          var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
            linkId = linkId.toLowerCase();
            if (text.toLowerCase().split(linkId).length - 1 < 2) {
              return wholeMatch;
            }
            if (url.match(/^data:.+?\/.+?;base64,/)) {
              globals.gUrls[linkId] = url.replace(/\s/g, "");
            } else {
              globals.gUrls[linkId] = showdown2.subParser("encodeAmpsAndAngles")(url, options, globals);
            }
            if (blankLines) {
              return blankLines + title;
            } else {
              if (title) {
                globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
              }
              if (options.parseImgDimensions && width && height) {
                globals.gDimensions[linkId] = {
                  width,
                  height
                };
              }
            }
            return "";
          };
          text = text.replace(base64Regex, replaceFunc);
          text = text.replace(regex, replaceFunc);
          text = text.replace(/¨0/, "");
          return text;
        });
        showdown2.subParser("tables", function(text, options, globals) {
          "use strict";
          if (!options.tables) {
            return text;
          }
          var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
          function parseStyles(sLine) {
            if (/^:[ \t]*--*$/.test(sLine)) {
              return ' style="text-align:left;"';
            } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
              return ' style="text-align:right;"';
            } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
              return ' style="text-align:center;"';
            } else {
              return "";
            }
          }
          function parseHeaders(header, style) {
            var id = "";
            header = header.trim();
            if (options.tablesHeaderId || options.tableHeaderId) {
              id = ' id="' + header.replace(/ /g, "_").toLowerCase() + '"';
            }
            header = showdown2.subParser("spanGamut")(header, options, globals);
            return "<th" + id + style + ">" + header + "</th>\n";
          }
          function parseCells(cell, style) {
            var subText = showdown2.subParser("spanGamut")(cell, options, globals);
            return "<td" + style + ">" + subText + "</td>\n";
          }
          function buildTable(headers, cells) {
            var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
            for (var i4 = 0; i4 < tblLgn; ++i4) {
              tb += headers[i4];
            }
            tb += "</tr>\n</thead>\n<tbody>\n";
            for (i4 = 0; i4 < cells.length; ++i4) {
              tb += "<tr>\n";
              for (var ii = 0; ii < tblLgn; ++ii) {
                tb += cells[i4][ii];
              }
              tb += "</tr>\n";
            }
            tb += "</tbody>\n</table>\n";
            return tb;
          }
          function parseTable(rawTable) {
            var i4, tableLines = rawTable.split("\n");
            for (i4 = 0; i4 < tableLines.length; ++i4) {
              if (/^ {0,3}\|/.test(tableLines[i4])) {
                tableLines[i4] = tableLines[i4].replace(/^ {0,3}\|/, "");
              }
              if (/\|[ \t]*$/.test(tableLines[i4])) {
                tableLines[i4] = tableLines[i4].replace(/\|[ \t]*$/, "");
              }
              tableLines[i4] = showdown2.subParser("codeSpans")(tableLines[i4], options, globals);
            }
            var rawHeaders = tableLines[0].split("|").map(function(s2) {
              return s2.trim();
            }), rawStyles = tableLines[1].split("|").map(function(s2) {
              return s2.trim();
            }), rawCells = [], headers = [], styles = [], cells = [];
            tableLines.shift();
            tableLines.shift();
            for (i4 = 0; i4 < tableLines.length; ++i4) {
              if (tableLines[i4].trim() === "") {
                continue;
              }
              rawCells.push(
                tableLines[i4].split("|").map(function(s2) {
                  return s2.trim();
                })
              );
            }
            if (rawHeaders.length < rawStyles.length) {
              return rawTable;
            }
            for (i4 = 0; i4 < rawStyles.length; ++i4) {
              styles.push(parseStyles(rawStyles[i4]));
            }
            for (i4 = 0; i4 < rawHeaders.length; ++i4) {
              if (showdown2.helper.isUndefined(styles[i4])) {
                styles[i4] = "";
              }
              headers.push(parseHeaders(rawHeaders[i4], styles[i4]));
            }
            for (i4 = 0; i4 < rawCells.length; ++i4) {
              var row = [];
              for (var ii = 0; ii < headers.length; ++ii) {
                if (showdown2.helper.isUndefined(rawCells[i4][ii])) {
                }
                row.push(parseCells(rawCells[i4][ii], styles[ii]));
              }
              cells.push(row);
            }
            return buildTable(headers, cells);
          }
          text = globals.converter._dispatch("tables.before", text, options, globals);
          text = text.replace(/\\(\|)/g, showdown2.helper.escapeCharactersCallback);
          text = text.replace(tableRgx, parseTable);
          text = text.replace(singeColTblRgx, parseTable);
          text = globals.converter._dispatch("tables.after", text, options, globals);
          return text;
        });
        showdown2.subParser("underline", function(text, options, globals) {
          "use strict";
          if (!options.underline) {
            return text;
          }
          text = globals.converter._dispatch("underline.before", text, options, globals);
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function(wm, txt) {
              return "<u>" + txt + "</u>";
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m2) {
              return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m2) {
              return /\S$/.test(m2) ? "<u>" + m2 + "</u>" : wm;
            });
          }
          text = text.replace(/(_)/g, showdown2.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("underline.after", text, options, globals);
          return text;
        });
        showdown2.subParser("unescapeSpecialChars", function(text, options, globals) {
          "use strict";
          text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
          text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
            var charCodeToReplace = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
          });
          text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
          return text;
        });
        showdown2.subParser("makeMarkdown.blockquote", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              var innerTxt = showdown2.subParser("makeMarkdown.node")(children[i4], globals);
              if (innerTxt === "") {
                continue;
              }
              txt += innerTxt;
            }
          }
          txt = txt.trim();
          txt = "> " + txt.split("\n").join("\n> ");
          return txt;
        });
        showdown2.subParser("makeMarkdown.codeBlock", function(node, globals) {
          "use strict";
          var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
          return "```" + lang + "\n" + globals.preList[num] + "\n```";
        });
        showdown2.subParser("makeMarkdown.codeSpan", function(node) {
          "use strict";
          return "`" + node.innerHTML + "`";
        });
        showdown2.subParser("makeMarkdown.emphasis", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "*";
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
            txt += "*";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.header", function(node, globals, headerLevel) {
          "use strict";
          var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
          if (node.hasChildNodes()) {
            txt = headerMark + " ";
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.hr", function() {
          "use strict";
          return "---";
        });
        showdown2.subParser("makeMarkdown.image", function(node) {
          "use strict";
          var txt = "";
          if (node.hasAttribute("src")) {
            txt += "![" + node.getAttribute("alt") + "](";
            txt += "<" + node.getAttribute("src") + ">";
            if (node.hasAttribute("width") && node.hasAttribute("height")) {
              txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
            }
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.links", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes() && node.hasAttribute("href")) {
            var children = node.childNodes, childrenLength = children.length;
            txt = "[";
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
            txt += "](";
            txt += "<" + node.getAttribute("href") + ">";
            if (node.hasAttribute("title")) {
              txt += ' "' + node.getAttribute("title") + '"';
            }
            txt += ")";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.list", function(node, globals, type) {
          "use strict";
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
          for (var i4 = 0; i4 < listItemsLenght; ++i4) {
            if (typeof listItems[i4].tagName === "undefined" || listItems[i4].tagName.toLowerCase() !== "li") {
              continue;
            }
            var bullet = "";
            if (type === "ol") {
              bullet = listNum.toString() + ". ";
            } else {
              bullet = "- ";
            }
            txt += bullet + showdown2.subParser("makeMarkdown.listItem")(listItems[i4], globals);
            ++listNum;
          }
          txt += "\n<!-- -->\n";
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.listItem", function(node, globals) {
          "use strict";
          var listItemTxt = "";
          var children = node.childNodes, childrenLenght = children.length;
          for (var i4 = 0; i4 < childrenLenght; ++i4) {
            listItemTxt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
          }
          if (!/\n$/.test(listItemTxt)) {
            listItemTxt += "\n";
          } else {
            listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
          }
          return listItemTxt;
        });
        showdown2.subParser("makeMarkdown.node", function(node, globals, spansOnly) {
          "use strict";
          spansOnly = spansOnly || false;
          var txt = "";
          if (node.nodeType === 3) {
            return showdown2.subParser("makeMarkdown.txt")(node, globals);
          }
          if (node.nodeType === 8) {
            return "<!--" + node.data + "-->\n\n";
          }
          if (node.nodeType !== 1) {
            return "";
          }
          var tagName = node.tagName.toLowerCase();
          switch (tagName) {
            //
            // BLOCKS
            //
            case "h1":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
              }
              break;
            case "h2":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
              }
              break;
            case "h3":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
              }
              break;
            case "h4":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
              }
              break;
            case "h5":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
              }
              break;
            case "h6":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
              }
              break;
            case "p":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
              }
              break;
            case "blockquote":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
              }
              break;
            case "hr":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
              }
              break;
            case "ol":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
              }
              break;
            case "ul":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
              }
              break;
            case "precode":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
              }
              break;
            case "pre":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
              }
              break;
            case "table":
              if (!spansOnly) {
                txt = showdown2.subParser("makeMarkdown.table")(node, globals) + "\n\n";
              }
              break;
            //
            // SPANS
            //
            case "code":
              txt = showdown2.subParser("makeMarkdown.codeSpan")(node, globals);
              break;
            case "em":
            case "i":
              txt = showdown2.subParser("makeMarkdown.emphasis")(node, globals);
              break;
            case "strong":
            case "b":
              txt = showdown2.subParser("makeMarkdown.strong")(node, globals);
              break;
            case "del":
              txt = showdown2.subParser("makeMarkdown.strikethrough")(node, globals);
              break;
            case "a":
              txt = showdown2.subParser("makeMarkdown.links")(node, globals);
              break;
            case "img":
              txt = showdown2.subParser("makeMarkdown.image")(node, globals);
              break;
            default:
              txt = node.outerHTML + "\n\n";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.paragraph", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
          }
          txt = txt.trim();
          return txt;
        });
        showdown2.subParser("makeMarkdown.pre", function(node, globals) {
          "use strict";
          var num = node.getAttribute("prenum");
          return "<pre>" + globals.preList[num] + "</pre>";
        });
        showdown2.subParser("makeMarkdown.strikethrough", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "~~";
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
            txt += "~~";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.strong", function(node, globals) {
          "use strict";
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "**";
            var children = node.childNodes, childrenLength = children.length;
            for (var i4 = 0; i4 < childrenLength; ++i4) {
              txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals);
            }
            txt += "**";
          }
          return txt;
        });
        showdown2.subParser("makeMarkdown.table", function(node, globals) {
          "use strict";
          var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i4, ii;
          for (i4 = 0; i4 < headings.length; ++i4) {
            var headContent = showdown2.subParser("makeMarkdown.tableCell")(headings[i4], globals), allign = "---";
            if (headings[i4].hasAttribute("style")) {
              var style = headings[i4].getAttribute("style").toLowerCase().replace(/\s/g, "");
              switch (style) {
                case "text-align:left;":
                  allign = ":---";
                  break;
                case "text-align:right;":
                  allign = "---:";
                  break;
                case "text-align:center;":
                  allign = ":---:";
                  break;
              }
            }
            tableArray[0][i4] = headContent.trim();
            tableArray[1][i4] = allign;
          }
          for (i4 = 0; i4 < rows.length; ++i4) {
            var r5 = tableArray.push([]) - 1, cols = rows[i4].getElementsByTagName("td");
            for (ii = 0; ii < headings.length; ++ii) {
              var cellContent = " ";
              if (typeof cols[ii] !== "undefined") {
                cellContent = showdown2.subParser("makeMarkdown.tableCell")(cols[ii], globals);
              }
              tableArray[r5].push(cellContent);
            }
          }
          var cellSpacesCount = 3;
          for (i4 = 0; i4 < tableArray.length; ++i4) {
            for (ii = 0; ii < tableArray[i4].length; ++ii) {
              var strLen = tableArray[i4][ii].length;
              if (strLen > cellSpacesCount) {
                cellSpacesCount = strLen;
              }
            }
          }
          for (i4 = 0; i4 < tableArray.length; ++i4) {
            for (ii = 0; ii < tableArray[i4].length; ++ii) {
              if (i4 === 1) {
                if (tableArray[i4][ii].slice(-1) === ":") {
                  tableArray[i4][ii] = showdown2.helper.padEnd(tableArray[i4][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
                } else {
                  tableArray[i4][ii] = showdown2.helper.padEnd(tableArray[i4][ii], cellSpacesCount, "-");
                }
              } else {
                tableArray[i4][ii] = showdown2.helper.padEnd(tableArray[i4][ii], cellSpacesCount);
              }
            }
            txt += "| " + tableArray[i4].join(" | ") + " |\n";
          }
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.tableCell", function(node, globals) {
          "use strict";
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var children = node.childNodes, childrenLength = children.length;
          for (var i4 = 0; i4 < childrenLength; ++i4) {
            txt += showdown2.subParser("makeMarkdown.node")(children[i4], globals, true);
          }
          return txt.trim();
        });
        showdown2.subParser("makeMarkdown.txt", function(node) {
          "use strict";
          var txt = node.nodeValue;
          txt = txt.replace(/ +/g, " ");
          txt = txt.replace(/¨NBSP;/g, " ");
          txt = showdown2.helper.unescapeHTMLEntities(txt);
          txt = txt.replace(/([*_~|`])/g, "\\$1");
          txt = txt.replace(/^(\s*)>/g, "\\$1>");
          txt = txt.replace(/^#/gm, "\\#");
          txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
          txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
          txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
          txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
          txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
          return txt;
        });
        var root = this;
        if (typeof define === "function" && define.amd) {
          define(function() {
            "use strict";
            return showdown2;
          });
        } else if (typeof module !== "undefined" && module.exports) {
          module.exports = showdown2;
        } else {
          root.showdown = showdown2;
        }
      }).call(exports);
    }
  });

  // src/data/infos.json
  var infos_default;
  var init_infos = __esm({
    "src/data/infos.json"() {
      infos_default = {
        APP_NAME: "Save my Chatbot",
        APP_SNAME: "SaveMyChatbot",
        APP_LNAME: "Save my Chatbot - AI Conversation Exporter",
        APP_ID: "savemyphind@hugocollin.com",
        APP_MODE: "",
        URLS: {
          REPOSITORY: "https://github.com/Hugo-COLLIN/SaveMyPhind-conversation-exporter",
          WEBSITE: "https://save.hugocollin.com",
          SUPPORT: "https://save.hugocollin.com/support",
          FEEDBACK: "https://save.hugocollin.com/feedback?utm_medium=extension&utm_campaign=feedback",
          DISCUSSIONS: "https://save.hugocollin.com/discussion",
          TUTORIALS: "https://save.hugocollin.com/tutorial",
          STORES: {
            CHROME: "https://chromewebstore.google.com/u/1/detail/agklnagmfeooogcppjccdnoallkhgkod",
            FIREFOX: "https://addons.mozilla.org/firefox/addon/save-my-phind"
          },
          REPORT: "https://save.hugocollin.com/issue"
        },
        CONTACT_EMAIL: "hcollin.dev@gmail.com",
        COPY_MODE: "tab"
      };
    }
  });

  // src/views/components/ExportOptions.ts
  var ExportOptions_exports = {};
  __export(ExportOptions_exports, {
    ExportOptions: () => ExportOptions
  });
  var import_showdown, ExportOptions;
  var init_ExportOptions = __esm({
    "src/views/components/ExportOptions.ts"() {
      "use strict";
      init_lit();
      init_decorators();
      init_button();
      init_input();
      init_alert();
      init_unsafe_html();
      import_showdown = __toESM(require_showdown());
      init_infos();
      ExportOptions = class extends h3 {
        filenameTemplate = "";
        async firstUpdated() {
          const storedFormat = await chrome.storage.sync.get(["filenameTemplate"]);
          this.filenameTemplate = storedFormat.filenameTemplate || "";
          this.requestUpdate();
        }
        render() {
          return ke`
      <main class="container">
        <div class="title-div">
          <span class="inner-span-image" style="margin-right: 10px;">
            <img src="${chrome.runtime.getURL("../files/icons/icon-48.png")}" alt="${infos_default.APP_SNAME} icon" width="48" height="48">
          </span>
          <h1 class="title">Export Options</h1>
        </div>
        <form id="options-form" @submit="${this.saveOptions}">
          <div id="options-fieldset">
            <sl-input .value="${this.filenameTemplate}" @sl-input="${this.handleInputChange}" placeholder="Enter filename format" label="Filename format:"></sl-input>
            <div>${ae(new import_showdown.default.Converter().makeHtml(this.helpText))}</div>
          </div>
          <sl-button variant="primary" type="submit">Save changes</sl-button>
        </form>
        <p class="feedback">
          <span>Options page is currently in beta. </span>
          <a href="${infos_default.URLS.DISCUSSIONS}" target="_blank">Share feedback and report bugs.</a>
        </p>
        <div class="toast-stack"></div>
      </main>
    `;
        }
        handleInputChange(event) {
          const input = event.target;
          this.filenameTemplate = input.value;
        }
        get helpText() {
          return `
The filename format is a string containing placeholders, that will be replaced by the actual values when exporting a page. 

The currently supported placeholders are: 

_Domain placeholders:_
- %W - Sub-domain name (e.g. "Phind Search", "Perplexity Pages")
- %H - Host name (e.g. "www.chatgpt.com")
- %T - Title of the page (first 60 characters)

_Date placeholders:_
- %t - Timestamp (Unix time)
- %Y - Year
- %M - Month
- %D - Day
- %h - Hour
- %m - Minutes
- %s - Seconds
    `;
        }
        async saveOptions(event) {
          event.preventDefault();
          await chrome.storage.sync.set({ filenameTemplate: this.filenameTemplate });
          console.log(await chrome.storage.sync.get("filenameTemplate"));
          const alert2 = document.createElement("sl-alert");
          alert2.variant = "success";
          alert2.textContent = "Options saved successfully";
          alert2.style.transition = "all 1.5s";
          alert2.style.margin = "1rem 0";
          alert2.duration = 5e3;
          alert2.closable = true;
          alert2.open = true;
          this.shadowRoot.querySelector(".toast-stack").appendChild(alert2);
        }
      };
      __publicField(ExportOptions, "styles", i`
      .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      }

      .title-div {
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .title {
          text-align: center;
          margin-bottom: 1rem;
          margin-left: 0.5rem;
          display: inline;
      }

      #options-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      }

      #options-fieldset {
          padding: 0 0 1rem 0;
          width: 100%;
      }

      .feedback {
          text-align: center;
          margin-top: 1rem;
      }

      .toast-stack {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1000;
      }
  `);
      __decorateClass([
        r4()
      ], ExportOptions.prototype, "filenameTemplate", 2);
      ExportOptions = __decorateClass([
        t2("export-options")
      ], ExportOptions);
    }
  });

  // src/entrypoints/pages.ts
  var loadComponents = async () => {
    const { ExportOptions: ExportOptions2 } = await Promise.resolve().then(() => (init_ExportOptions(), ExportOptions_exports));
  };
  loadComponents();
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

showdown/dist/showdown.js:
  (*! showdown v 2.1.0 - 21-04-2022 *)
*/
