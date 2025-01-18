(function () {
  'use strict';

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$4=window,e$5=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$5=Symbol(),n$5=new WeakMap;let o$5 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$5)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new o$5("string"==typeof t?t:t+"",void 0,s$5),S$3=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$4.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$2=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */var s$4;const e$4=window,r$3=e$4.trustedTypes,h$2=r$3?r$3.emptyScript:"",o$4=e$4.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$4,reflect:!1,hasChanged:a$2},d$2="finalized";let u$2 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$2))return !1;this[d$2]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$2(i));}else void 0!==i&&s.push(c$2(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$3(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$2[d$2]=!0,u$2.elementProperties=new Map,u$2.elementStyles=[],u$2.shadowRootOptions={mode:"open"},null==o$4||o$4({ReactiveElement:u$2}),(null!==(s$4=e$4.reactiveElementVersions)&&void 0!==s$4?s$4:e$4.reactiveElementVersions=[]).push("1.6.3");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var t$3;const i$1=window,s$3=i$1.trustedTypes,e$3=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$3,h$1=`<${l$2}>`,r$2=document,u$1=()=>r$2.createComment(""),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$1=Array.isArray,v=t=>c$1(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$1="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a$1}(?:([^\\s"'>=/]+)(${a$1}*=${a$1}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$2.createTreeWalker(r$2,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$3?e$3.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f$1:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h$1:v>=0?(e.push(d),s.slice(0,v)+o$3+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$1()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$1());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S$2(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S$2(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$2).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$2,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S$2(this,t,i),d$1(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$2.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$1()),this.k(u$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S$2(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S$2(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$3?s$3.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S$2(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S$2(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$3=i$1.litHtmlVersions)&&void 0!==t$3?t$3:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$2=window,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),n$2=new WeakMap;let o$2 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$2.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$2.set(s,t));}return t}toString(){return this.cssText}};const r$1=t=>new o$2("string"==typeof t?t:t+"",void 0,s$2),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$2(n,t,s$2)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$1(e)})(t):t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */var s$1;const e$1=window,r=e$1.trustedTypes,h=r?r.emptyScript:"",o$1=e$1.reactiveElementPolyfillSupport,n$1={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a=(t,i)=>i!==t&&(i==i||t==t),l$1={attribute:!0,type:String,converter:n$1,reflect:!1,hasChanged:a},d="finalized";class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$1}static finalize(){if(this.hasOwnProperty(d))return !1;this[d]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c(i));}else void 0!==i&&s.push(c(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$1){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$1).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$1;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u[d]=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==o$1||o$1({ReactiveElement:u}),(null!==(s$1=e$1.reactiveElementVersions)&&void 0!==s$1?s$1:e$1.reactiveElementVersions=[]).push("1.6.3");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */var l,o;class s extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

  /**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const t$1=(o,l)=>void 0!==(null==o?void 0:o._$litType$);

  const appliedClassMixins = new WeakMap();

  /** Vefify if the Mixin was previously applyed
   * @private
   * @param {function} mixin      Mixin being applyed
   * @param {object} superClass   Class receiving the new mixin
   * @returns {boolean}
   */
  function wasMixinPreviouslyApplied(mixin, superClass) {
    let klass = superClass;
    while (klass) {
      if (appliedClassMixins.get(klass) === mixin) {
        return true;
      }
      klass = Object.getPrototypeOf(klass);
    }
    return false;
  }

  /** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
   * @export
   * @param {function} mixin      Mixin to be applyed
   * @returns {object}            Mixed class with mixin applied
   */
  function dedupeMixin(mixin) {
    return superClass => {
      if (wasMixinPreviouslyApplied(mixin, superClass)) {
        return superClass;
      }
      const mixedClass = mixin(superClass);
      appliedClassMixins.set(mixedClass, mixin);
      return mixedClass;
    };
  }

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;const S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}};

  /**
   * @typedef {import('./types').RenderOptions} RenderOptions
   * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
   * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
   * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
   * @typedef {import('@lit/reactive-element').CSSResultOrNative} CSSResultOrNative
   */

  const version = '2.2.2';
  // eslint-disable-next-line dot-notation
  const versions = window['scopedElementsVersions'] || (window['scopedElementsVersions'] = []);
  if (!versions.includes(version)) {
    versions.push(version);
  }

  // @ts-ignore
  const supportsScopedRegistry = !!ShadowRoot.prototype.createElement;

  /**
   * @template {import('./types').Constructor<HTMLElement>} T
   * @param {T} superclass
   * @return {T & import('./types').Constructor<ScopedElementsHost>}
   */
  const ScopedElementsMixinImplementation = superclass =>
    /** @type {ScopedElementsHost} */
    class ScopedElementsHost extends superclass {
      /**
       * Obtains the scoped elements definitions map if specified.
       *
       * @returns {ScopedElementsMap}
       */
      static get scopedElements() {
        return {};
      }

      static get scopedElementsVersion() {
        return version;
      }

      /**
       * Obtains the ShadowRoot options.
       *
       * @type {ShadowRootInit}
       */
      static get shadowRootOptions() {
        return this.__shadowRootOptions;
      }

      /**
       * Set the shadowRoot options.
       *
       * @param {ShadowRootInit} value
       */
      static set shadowRootOptions(value) {
        this.__shadowRootOptions = value;
      }

      /**
       * Obtains the element styles.
       *
       * @returns {CSSResultOrNative[]}
       */
      static get elementStyles() {
        return this.__elementStyles;
      }

      static set elementStyles(styles) {
        this.__elementStyles = styles;
      }

      // either TS or ESLint will complain here
      // eslint-disable-next-line no-unused-vars
      constructor(..._args) {
        super();
        /** @type {RenderOptions} */
        this.renderOptions = this.renderOptions || undefined;
      }

      /**
       * Obtains the CustomElementRegistry associated to the ShadowRoot.
       *
       * @returns {CustomElementRegistry}
       */
      get registry() {
        // @ts-ignore
        return this.constructor.__registry;
      }

      /**
       * Set the CustomElementRegistry associated to the ShadowRoot
       *
       * @param {CustomElementRegistry} registry
       */
      set registry(registry) {
        // @ts-ignore
        this.constructor.__registry = registry;
      }

      createRenderRoot() {
        const { scopedElements, shadowRootOptions, elementStyles } =
          /** @type {typeof ScopedElementsHost} */ (this.constructor);

        const shouldCreateRegistry =
          !this.registry ||
          // @ts-ignore
          (this.registry === this.constructor.__registry &&
            !Object.prototype.hasOwnProperty.call(this.constructor, '__registry'));

        /**
         * Create a new registry if:
         * - the registry is not defined
         * - this class doesn't have its own registry *AND* has no shared registry
         */
        if (shouldCreateRegistry) {
          this.registry = supportsScopedRegistry ? new CustomElementRegistry() : customElements;
          for (const [tagName, klass] of Object.entries(scopedElements)) {
            this.defineScopedElement(tagName, klass);
          }
        }

        /** @type {ShadowRootInit} */
        const options = {
          mode: 'open',
          ...shadowRootOptions,
          customElements: this.registry,
          registry: this.registry,
        };

        const createdRoot = this.attachShadow(options);
        if (supportsScopedRegistry) {
          this.renderOptions.creationScope = createdRoot;
        }

        if (createdRoot instanceof ShadowRoot) {
          S(createdRoot, elementStyles);
          this.renderOptions.renderBefore = this.renderOptions.renderBefore || createdRoot.firstChild;
        }

        return createdRoot;
      }

      createScopedElement(tagName) {
        const root = supportsScopedRegistry ? this.shadowRoot : document;
        // @ts-ignore polyfill to support createElement on shadowRoot is loaded
        return root.createElement(tagName);
      }

      /**
       * Defines a scoped element.
       *
       * @param {string} tagName
       * @param {typeof HTMLElement} klass
       */
      defineScopedElement(tagName, klass) {
        const registeredClass = this.registry.get(tagName);
        if (registeredClass && supportsScopedRegistry === false && registeredClass !== klass) {
          // eslint-disable-next-line no-console
          console.error(
            [
              `You are trying to re-register the "${tagName}" custom element with a different class via ScopedElementsMixin.`,
              'This is only possible with a CustomElementRegistry.',
              'Your browser does not support this feature so you will need to load a polyfill for it.',
              'Load "@webcomponents/scoped-custom-element-registry" before you register ANY web component to the global customElements registry.',
              'e.g. add "<script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>" as your first script tag.',
              'For more details you can visit https://open-wc.org/docs/development/scoped-elements/',
            ].join('\n'),
          );
        }
        if (!registeredClass) {
          return this.registry.define(tagName, klass);
        }
        return this.registry.get(tagName);
      }

      /**
       * @deprecated use the native el.tagName instead
       *
       * @param {string} tagName
       * @returns {string} the tag name
       */
      // eslint-disable-next-line class-methods-use-this
      getScopedTagName(tagName) {
        // @ts-ignore
        return this.constructor.getScopedTagName(tagName);
      }

      /**
       * @deprecated use the native el.tagName instead
       *
       * @param {string} tagName
       * @returns {string} the tag name
       */
      // eslint-disable-next-line class-methods-use-this
      static getScopedTagName(tagName) {
        // @ts-ignore
        return this.__registry.get(tagName) ? tagName : undefined;
      }
    };

  const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

  /**
   * @typedef {import('../types/DisabledMixinTypes').DisabledMixin} DisabledMixin
   */

  /**
   * @type {DisabledMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('../index').LitElement>} superclass
   */
  const DisabledMixinImplementation = superclass =>
    // eslint-disable-next-line no-shadow
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends superclass {
      static get properties() {
        return {
          disabled: {
            type: Boolean,
            reflect: true,
          },
        };
      }

      constructor() {
        super();
        /** @protected */
        this._requestedToBeDisabled = false;
        /** @private */
        this.__isUserSettingDisabled = true;
        /** @private */
        this.__restoreDisabledTo = false;
        this.disabled = false;
      }

      makeRequestToBeDisabled() {
        if (this._requestedToBeDisabled === false) {
          this._requestedToBeDisabled = true;
          this.__restoreDisabledTo = this.disabled;
          this.__internalSetDisabled(true);
        }
      }

      retractRequestToBeDisabled() {
        if (this._requestedToBeDisabled === true) {
          this._requestedToBeDisabled = false;
          this.__internalSetDisabled(this.__restoreDisabledTo);
        }
      }

      /**
       * @param {boolean} value
       * @private
       */
      __internalSetDisabled(value) {
        this.__isUserSettingDisabled = false;
        this.disabled = value;
        this.__isUserSettingDisabled = true;
      }

      /**
       * @param {PropertyKey} name
       * @param {?} oldValue
       */
      requestUpdate(name, oldValue) {
        super.requestUpdate(name, oldValue);
        if (name === 'disabled') {
          if (this.__isUserSettingDisabled) {
            this.__restoreDisabledTo = this.disabled;
          }
          if (this.disabled === false && this._requestedToBeDisabled === true) {
            this.__internalSetDisabled(true);
          }
        }
      }
    };

  const DisabledMixin = dedupeMixin(DisabledMixinImplementation);

  /**
   * @typedef {import('../types/DisabledWithTabIndexMixinTypes').DisabledWithTabIndexMixin} DisabledWithTabIndexMixin
   */

  /**
   * @type {DisabledWithTabIndexMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('../index').LitElement>} superclass
   */
  const DisabledWithTabIndexMixinImplementation = superclass =>
    // eslint-disable-next-line no-shadow
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends DisabledMixin(superclass) {
      static get properties() {
        return {
          // we use a property here as if we use the native tabIndex we can not set a default value
          // in the constructor as it synchronously sets the attribute which is not allowed in the
          // constructor phase
          tabIndex: {
            type: Number,
            reflect: true,
            attribute: 'tabindex',
          },
        };
      }

      constructor() {
        super();
        /** @private */
        this.__isUserSettingTabIndex = true;
        /** @private */
        this.__restoreTabIndexTo = 0;
        this.__internalSetTabIndex(0);
      }

      makeRequestToBeDisabled() {
        super.makeRequestToBeDisabled();
        if (this._requestedToBeDisabled === false && this.tabIndex != null) {
          this.__restoreTabIndexTo = this.tabIndex;
        }
      }

      retractRequestToBeDisabled() {
        super.retractRequestToBeDisabled();
        if (this._requestedToBeDisabled === true) {
          this.__internalSetTabIndex(this.__restoreTabIndexTo);
        }
      }

      /**
       * @param {number} value
       * @private
       */
      __internalSetTabIndex(value) {
        this.__isUserSettingTabIndex = false;
        this.tabIndex = value;
        this.__isUserSettingTabIndex = true;
      }

      /**
       * @param {PropertyKey} name
       * @param {?} oldValue
       */
      requestUpdate(name, oldValue) {
        super.requestUpdate(name, oldValue);

        if (name === 'disabled') {
          if (this.disabled) {
            this.__internalSetTabIndex(-1);
          } else {
            this.__internalSetTabIndex(this.__restoreTabIndexTo);
          }
        }

        if (name === 'tabIndex') {
          if (this.__isUserSettingTabIndex && this.tabIndex != null) {
            this.__restoreTabIndexTo = this.tabIndex;
          }

          if (this.tabIndex !== -1 && this._requestedToBeDisabled === true) {
            this.__internalSetTabIndex(-1);
          }
        }
      }

      /** @param {import('lit-element').PropertyValues } changedProperties */
      firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        // for ShadyDom the timing is a little different and we need to make sure
        // the tabindex gets correctly updated here
        if (this.disabled) {
          this.__internalSetTabIndex(-1);
        }
      }
    };

  const DisabledWithTabIndexMixin = dedupeMixin(DisabledWithTabIndexMixinImplementation);

  /* eslint-disable class-methods-use-this */

  /**
   * @typedef {import('../types/SlotMixinTypes').SlotMixin} SlotMixin
   * @typedef {import('../types/SlotMixinTypes').SlotsMap} SlotsMap
   * @typedef {import('../index').LitElement} LitElement
   */

  /**
   * @type {SlotMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<LitElement>} superclass
   */
  const SlotMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class SlotMixin extends superclass {
      /**
       * @return {SlotsMap}
       */
      get slots() {
        return {};
      }

      constructor() {
        super();
        /** @private */
        this.__privateSlots = new Set(null);
      }

      connectedCallback() {
        super.connectedCallback();
        this._connectSlotMixin();
      }

      /**
       * @private
       * @param {import('@lion/core').TemplateResult} template
       */
      __renderAsNodes(template) {
        // @ts-expect-error wait for browser support
        const supportsScopedRegistry = !!ShadowRoot.prototype.createElement;
        const registryRoot = supportsScopedRegistry ? this.shadowRoot : document;
        // @ts-expect-error wait for browser support
        const tempRenderTarget = registryRoot.createElement('div');
        // Providing all options breaks Safari; keep host and creationScope
        const { creationScope, host } = this.renderOptions;
        D(template, tempRenderTarget, { creationScope, host });
        return Array.from(tempRenderTarget.childNodes);
      }

      /**
       * @protected
       */
      _connectSlotMixin() {
        if (!this.__isConnectedSlotMixin) {
          Object.keys(this.slots).forEach(slotName => {
            const hasSlottableFromUser =
              slotName === ''
                ? // for default slot (''), we can't use el.slot because polyfill for IE11
                  // will do .querySelector('[slot=]') which produces a fatal error
                  // therefore we check if there's children that do not have a slot attr
                  Array.from(this.children).find(el => !el.hasAttribute('slot'))
                : Array.from(this.children).find(el => el.slot === slotName);

            if (!hasSlottableFromUser) {
              const slotContent = this.slots[slotName]();
              /** @type {Node[]} */
              let nodes = [];

              if (t$1(slotContent)) {
                nodes = this.__renderAsNodes(slotContent);
              } else if (!Array.isArray(slotContent)) {
                nodes = [/** @type {Node} */ (slotContent)];
              }

              nodes.forEach(node => {
                if (!(node instanceof Node)) {
                  return;
                }
                if (node instanceof Element && slotName !== '') {
                  node.setAttribute('slot', slotName);
                }
                this.appendChild(node);
                this.__privateSlots.add(slotName);
              });
            }
          });
          this.__isConnectedSlotMixin = true;
        }
      }

      /**
       * @param {string} slotName Name of the slot
       * @return {boolean} true if given slot name been created by SlotMixin
       * @protected
       */
      _isPrivateSlot(slotName) {
        return this.__privateSlots.has(slotName);
      }
    };

  const SlotMixin = dedupeMixin(SlotMixinImplementation);

  /**
   * From https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
   * @param {string} [flavor]
   */
  function checkChrome(flavor = 'google-chrome') {
    const isChromium = /** @type {window & { chrome?: boolean}} */ (window).chrome;
    if (flavor === 'chromium') {
      return isChromium;
    }
    const winNav = window.navigator;
    const vendorName = winNav.vendor;
    const isOpera = typeof (/** @type {window & { opr?: boolean}} */ (window).opr) !== 'undefined';
    const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
    const isIOSChrome = winNav.userAgent.match('CriOS');

    if (flavor === 'ios') {
      return isIOSChrome;
    }

    if (flavor === 'google-chrome') {
      return (
        isChromium !== null &&
        typeof isChromium !== 'undefined' &&
        vendorName === 'Google Inc.' &&
        isOpera === false &&
        isIEedge === false
      );
    }

    return undefined;
  }

  const browserDetection = {
    isIE11: /Trident/.test(window.navigator.userAgent),
    isChrome: checkChrome(),
    isIOSChrome: checkChrome('ios'),
    isChromium: checkChrome('chromium'),
    isMac: navigator.appVersion.indexOf('Mac') !== -1,
  };

  /**
   * Generates random unique identifier (for dom elements)
   * @param {string} prefix
   * @return {string} unique id
   */
  function uuid(prefix = '') {
    const elementName = prefix.length > 0 ? `${prefix}-` : '';
    return `${elementName}${Math.random().toString(36).substr(2, 10)}`;
  }

  const windowWithOptionalPolyfill =
    /** @type {Window & typeof globalThis & {applyFocusVisiblePolyfill?: function}} */ (window);
  const polyfilledNodes = new WeakMap();

  /**
   * @param {Node} node
   */
  function applyFocusVisiblePolyfillWhenNeeded(node) {
    if (windowWithOptionalPolyfill.applyFocusVisiblePolyfill && !polyfilledNodes.has(node)) {
      windowWithOptionalPolyfill.applyFocusVisiblePolyfill(node);
      polyfilledNodes.set(node, undefined);
    }
  }

  /**
   * @typedef {import('../types/FocusMixinTypes').FocusMixin} FocusMixin
   * @type {FocusMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const FocusMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class FocusMixin extends superclass {
      /** @type {any} */
      static get properties() {
        return {
          focused: { type: Boolean, reflect: true },
          focusedVisible: { type: Boolean, reflect: true, attribute: 'focused-visible' },
        };
      }

      constructor() {
        super();

        /**
         * Whether the focusable element within (`._focusableNode`) is focused.
         * Reflects to attribute '[focused]' as a styling hook
         * @type {boolean}
         */
        this.focused = false;

        /**
         * Whether the focusable element within (`._focusableNode`) matches ':focus-visible'
         * Reflects to attribute '[focused-visible]' as a styling hook
         * See: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
         * @type {boolean}
         */
        this.focusedVisible = false;
      }

      connectedCallback() {
        super.connectedCallback();
        this.__registerEventsForFocusMixin();
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.__teardownEventsForFocusMixin();
      }

      /**
       * Calls `focus()` on focusable element within
       */
      focus() {
        this._focusableNode?.focus();
      }

      /**
       * Calls `blur()` on focusable element within
       */
      blur() {
        this._focusableNode?.blur();
      }

      /**
       * The focusable element:
       * could be an input, textarea, select, button or any other element with tabindex > -1
       * @protected
       * @type {HTMLElement}
       */
      // @ts-ignore it's up to Subclassers to return the right element. This is needed for docs/types
      // eslint-disable-next-line class-methods-use-this, getter-return, no-empty-function
      get _focusableNode() {
        // TODO: [v1]: remove return of _inputNode (it's now here for backwards compatibility)
        // @ts-expect-error see above
        return /** @type {HTMLElement} */ (this._inputNode || document.createElement('input'));
      }

      /**
       * @private
       */
      __onFocus() {
        this.focused = true;

        if (typeof windowWithOptionalPolyfill.applyFocusVisiblePolyfill === 'function') {
          this.focusedVisible = this._focusableNode.hasAttribute('data-focus-visible-added');
        } else
          try {
            // Safari throws when matches is called
            this.focusedVisible = this._focusableNode.matches(':focus-visible');
          } catch (_) {
            this.focusedVisible = false;
          }
      }

      /**
       * @private
       */
      __onBlur() {
        this.focused = false;
        this.focusedVisible = false;
      }

      /**
       * @private
       */
      __registerEventsForFocusMixin() {
        applyFocusVisiblePolyfillWhenNeeded(this.getRootNode());

        /**
         * focus
         * @param {Event} ev
         */
        this.__redispatchFocus = ev => {
          ev.stopPropagation();
          this.dispatchEvent(new Event('focus'));
        };
        this._focusableNode.addEventListener('focus', this.__redispatchFocus);

        /**
         * blur
         * @param {Event} ev
         */
        this.__redispatchBlur = ev => {
          ev.stopPropagation();
          this.dispatchEvent(new Event('blur'));
        };
        this._focusableNode.addEventListener('blur', this.__redispatchBlur);

        /**
         * focusin
         * @param {Event} ev
         */
        this.__redispatchFocusin = ev => {
          ev.stopPropagation();
          this.__onFocus();
          this.dispatchEvent(new Event('focusin', { bubbles: true, composed: true }));
        };
        this._focusableNode.addEventListener('focusin', this.__redispatchFocusin);

        /**
         * focusout
         * @param {Event} ev
         */
        this.__redispatchFocusout = ev => {
          ev.stopPropagation();
          this.__onBlur();
          this.dispatchEvent(new Event('focusout', { bubbles: true, composed: true }));
        };
        this._focusableNode.addEventListener('focusout', this.__redispatchFocusout);
      }

      /**
       * @private
       */
      __teardownEventsForFocusMixin() {
        this._focusableNode.removeEventListener(
          'focus',
          /** @type {EventListenerOrEventListenerObject} */ (this.__redispatchFocus),
        );
        this._focusableNode.removeEventListener(
          'blur',
          /** @type {EventListenerOrEventListenerObject} */ (this.__redispatchBlur),
        );
        this._focusableNode.removeEventListener(
          'focusin',
          /** @type {EventListenerOrEventListenerObject} */ (this.__redispatchFocusin),
        );
        this._focusableNode.removeEventListener(
          'focusout',
          /** @type {EventListenerOrEventListenerObject} */ (this.__redispatchFocusout),
        );
      }
    };

  /**
   * For browsers that not support the [spec](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible),
   * be sure to load the polyfill into your application https://github.com/WICG/focus-visible
   * (or go for progressive enhancement).
   */
  const FocusMixin = dedupeMixin(FocusMixinImplementation);

  /* eslint-disable no-bitwise */

  const moveDownConditions = [
    Node.DOCUMENT_POSITION_PRECEDING,
    Node.DOCUMENT_POSITION_CONTAINS,
    Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING,
  ];

  /**
   * @desc Let the order of adding ids to aria element by DOM order, so that the screen reader
   * respects visual order when reading:
   * https://developers.google.com/web/fundamentals/accessibility/focus/dom-order-matters
   * @param {HTMLElement[]} descriptionElements - holds references to description or label elements whose
   * id should be returned
   * @param {Object} opts
   * @param {boolean} [opts.reverse]
   * @returns {HTMLElement[]} sorted set of elements based on dom order
   */
  function getAriaElementsInRightDomOrder(descriptionElements, { reverse } = {}) {
    /**
     * @param {HTMLElement} a
     * @param {HTMLElement} b
     * @return {-1|1}
     */
    const putPrecedingSiblingsAndLocalParentsFirst = (a, b) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
      const pos = a.compareDocumentPosition(b);

      // Unfortunately, for IE, we have to switch the order (?)
      if (moveDownConditions.includes(pos)) {
        return browserDetection.isIE11 ? -1 : 1;
      }
      return browserDetection.isIE11 ? 1 : -1;
    };

    const descriptionEls = descriptionElements.filter(el => el); // filter out null references
    descriptionEls.sort(putPrecedingSiblingsAndLocalParentsFirst);
    if (reverse) {
      descriptionEls.reverse();
    }
    return descriptionEls;
  }

  /**
   * A modelValue can demand a certain type (Date, Number, Iban etc.). A correct type will always be
   * translatable into a String representation (the value presented to the end user) via the
   * `formatter`. When the type is not valid (usually as a consequence of a user typing in an invalid
   * or incomplete viewValue), the current truth is captured in the `Unparseable` type.
   * For example: a viewValue can't be parsed (for instance 'foo' when the type should be Number).

   * The model(value) concept as implemented in lion-web is conceptually comparable to those found in
   * popular systems like Angular and Vue.

   * The Unparseable type is an addition on top of this that mainly is added for the following two
   * purposes:
   * - restoring user sessions
   * - realtime updated with all value changes
   */
  class Unparseable {
    /** @param {string} value */
    constructor(value) {
      /**
       * Meta info for restoring serialized Unparseable values
       * @type {'unparseable'}
       */
      this.type = 'unparseable';
      /**
       * Stores current view value. For instance, value '09-' is an unparseable Date.
       * This info can be used to restore previous form states.
       * @type {string}
       */
      this.viewValue = value;
    }

    toString() {
      return JSON.stringify({ type: this.type, viewValue: this.viewValue });
    }
  }

  /**
   * @typedef {import('@lion/core').LitElement} LitElement
   * @typedef {import('../../types/FormControlMixinTypes').FormControlHost} FormControlHost
   * @typedef {import('../../types/registration/FormRegisteringMixinTypes').FormRegisteringMixin} FormRegisteringMixin
   * @typedef {import('../../types/registration/FormRegisteringMixinTypes').FormRegisteringHost} FormRegisteringHost
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').ElementWithParentFormGroup} ElementWithParentFormGroup
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').FormRegistrarHost} FormRegistrarHost
   */

  /**
   * #FormRegisteringMixin:
   *
   * This Mixin registers a form element to a Registrar
   *
   * @type {FormRegisteringMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<LitElement>} superclass
   */
  const FormRegisteringMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends superclass {
      constructor() {
        super();
        /**
         * The registrar this FormControl registers to, Usually a descendant of FormGroup or
         * ChoiceGroup
         * @type {FormRegistrarHost | undefined}
         */
        this._parentFormGroup = undefined;
      }

      connectedCallback() {
        super.connectedCallback();
        this.dispatchEvent(
          new CustomEvent('form-element-register', {
            detail: { element: this },
            bubbles: true,
          }),
        );
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.__unregisterFormElement();
      }

      /**
       * Putting this in a separate method makes testing easier
       * @private
       */
      __unregisterFormElement() {
        if (this._parentFormGroup) {
          this._parentFormGroup.removeFormElement(/** @type {* & FormRegisteringHost} */ (this));
        }
      }
    };

  const FormRegisteringMixin = dedupeMixin(FormRegisteringMixinImplementation);

  /**
   * @typedef {import('@lion/core').TemplateResult} TemplateResult
   * @typedef {import('@lion/core').CSSResult} CSSResult
   * @typedef {import('@lion/core').CSSResultArray} CSSResultArray
   * @typedef {import('@lion/core/types/SlotMixinTypes').SlotsMap} SlotsMap
   * @typedef {import('./validate/LionValidationFeedback').LionValidationFeedback} LionValidationFeedback
   * @typedef {import('../types/choice-group/ChoiceInputMixinTypes').ChoiceInputHost} ChoiceInputHost
   * @typedef {import('../types/FormControlMixinTypes.js').FormControlHost} FormControlHost
   * @typedef {import('../types/FormControlMixinTypes.js').HTMLElementWithValue} HTMLElementWithValue
   * @typedef {import('../types/FormControlMixinTypes.js').FormControlMixin} FormControlMixin
   * @typedef {import('../types/FormControlMixinTypes.js').ModelValueEventDetails} ModelValueEventDetails
   */

  /**
   * #FormControlMixin :
   *
   * This Mixin is a shared fundament for all form components, it's applied on:
   * - LionField (which is extended to LionInput, LionTextarea, LionSelect etc. etc.)
   * - LionFieldset (which is extended to LionRadioGroup, LionCheckboxGroup, LionForm)
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   * @type {FormControlMixin}
   */
  const FormControlMixinImplementation = superclass =>
    // eslint-disable-next-line no-shadow, no-unused-vars
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class FormControlMixin extends FormRegisteringMixin(DisabledMixin(SlotMixin(superclass))) {
      /** @type {any} */
      static get properties() {
        return {
          name: { type: String, reflect: true },
          readOnly: { type: Boolean, attribute: 'readonly', reflect: true },
          label: String, // FIXME: { attribute: false } breaks a bunch of tests, but shouldn't...
          labelSrOnly: { type: Boolean, attribute: 'label-sr-only', reflect: true },
          helpText: { type: String, attribute: 'help-text' },
          modelValue: { attribute: false },
          _ariaLabelledNodes: { attribute: false },
          _ariaDescribedNodes: { attribute: false },
          _repropagationRole: { attribute: false },
          _isRepropagationEndpoint: { attribute: false },
        };
      }

      /**
       * The label text for the input node.
       * When no light dom defined via [slot=label], this value will be used.
       * @type {string}
       */
      get label() {
        return this.__label || (this._labelNode && this._labelNode.textContent) || '';
      }

      /**
       * @param {string} newValue
       */
      set label(newValue) {
        const oldValue = this.label;
        /** @type {string} */
        this.__label = newValue;
        this.requestUpdate('label', oldValue);
      }

      /**
       * The helpt text for the input node.
       * When no light dom defined via [slot=help-text], this value will be used
       * @type {string}
       */
      get helpText() {
        return this.__helpText || (this._helpTextNode && this._helpTextNode.textContent) || '';
      }

      /**
       * @param {string} newValue
       */
      set helpText(newValue) {
        const oldValue = this.helpText;
        /** @type {string} */
        this.__helpText = newValue;
        this.requestUpdate('helpText', oldValue);
      }

      /**
       * Will be used in validation messages to refer to the current field
       * @type {string}
       */
      get fieldName() {
        return this.__fieldName || this.label || this.name || '';
      }

      /**
       * @param {string} value
       */
      set fieldName(value) {
        /** @type {string} */
        this.__fieldName = value;
      }

      /**
       * @configure SlotMixin
       */
      get slots() {
        return {
          ...super.slots,
          label: () => {
            const label = document.createElement('label');
            label.textContent = this.label;
            return label;
          },
          'help-text': () => {
            const helpText = document.createElement('div');
            helpText.textContent = this.helpText;
            return helpText;
          },
        };
      }

      /**
       * The interactive (form) element. Can be a native element like input/textarea/select or
       * an element with tabindex > -1
       * @protected
       */
      get _inputNode() {
        return /** @type {HTMLElementWithValue} */ (this.__getDirectSlotChild('input'));
      }

      /**
       * Element where label will be rendered to
       * @protected
       */
      get _labelNode() {
        return /** @type {HTMLElement} */ (this.__getDirectSlotChild('label'));
      }

      /**
       * Element where help text will be rendered to
       * @protected
       */
      get _helpTextNode() {
        return /** @type {HTMLElement} */ (this.__getDirectSlotChild('help-text'));
      }

      /**
       * Element where validation feedback will be rendered to
       * @protected
       */
      get _feedbackNode() {
        return /** @type {LionValidationFeedback} */ (this.__getDirectSlotChild('feedback'));
      }

      constructor() {
        super();

        /**
         * The name the element will be registered with to the .formElements collection
         * of the parent. Also, it serves as the key of key/value pairs in
         *  modelValue/serializedValue objects
         * @type {string}
         */
        this.name = '';

        /**
         * A Boolean attribute which, if present, indicates that the user should not be able to edit
         * the value of the input. The difference between disabled and readonly is that read-only
         * controls can still function, whereas disabled controls generally do not function as
         * controls until they are enabled.
         * (From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly)
         * @type {boolean}
         */
        this.readOnly = false;

        /**
         * The label text for the input node.
         * When no value is defined, textContent of [slot=label] will be used
         * @type {string}
         */
        this.label = '';

        /**
         * The label will only be visible for srceen readers when true
         * @type {boolean}
         */
        this.labelSrOnly = false;

        /**
         * The helpt text for the input node.
         * When no value is defined, textContent of [slot=help-text] will be used
         * @type {string}
         */
        this.helpText = '';

        /**
         * The model value is the result of the parser function(when available).
         * It should be considered as the internal value used for validation and reasoning/logic.
         * The model value is 'ready for consumption' by the outside world (think of a Date
         * object or a float). The modelValue can(and is recommended to) be used as both input
         * value and output value of the `LionField`.
         *
         * Examples:
         * - For a date input: a String '20/01/1999' will be converted to new Date('1999/01/20')
         * - For a number input: a formatted String '1.234,56' will be converted to a Number:
         *   1234.56
         */
        // TODO: we can probably set this up properly once propert effects run from firstUpdated
        // this.modelValue = undefined;
        /**
         * Unique id that can be used in all light dom
         * @type {string}
         * @protected
         */
        this._inputId = uuid(this.localName);

        /**
         * Contains all elements that should end up in aria-labelledby of `._inputNode`
         * @type {HTMLElement[]}
         */
        this._ariaLabelledNodes = [];

        /**
         * Contains all elements that should end up in aria-describedby of `._inputNode`
         * @type {HTMLElement[]}
         */
        this._ariaDescribedNodes = [];

        /**
         * Based on the role, details of handling model-value-changed repropagation differ.
         * @type {'child'|'choice-group'|'fieldset'}
         */
        this._repropagationRole = 'child';

        /**
         * By default, a field with _repropagationRole 'choice-group' will act as an
         * 'endpoint'. This means it will be considered as an individual field: for
         * a select, individual options will not be part of the formPath. They
         * will.
         * Similarly, components that (a11y wise) need to be fieldsets, but 'interaction wise'
         * (from Application Developer perspective) need to be more like fields
         * (think of an amount-input with a currency select box next to it), can set this
         * to true to hide private internals in the formPath.
         * @type {boolean}
         */
        this._isRepropagationEndpoint = false;

        this.addEventListener(
          'model-value-changed',
          /** @type {EventListenerOrEventListenerObject} */ (this.__repropagateChildrenValues),
        );
        /** @type {EventListener} */
        this._onLabelClick = this._onLabelClick.bind(this);
      }

      connectedCallback() {
        super.connectedCallback();
        this._enhanceLightDomClasses();
        this._enhanceLightDomA11y();
        this._triggerInitialModelValueChangedEvent();

        if (this._labelNode) {
          this._labelNode.addEventListener('click', this._onLabelClick);
        }
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        if (this._labelNode) {
          this._labelNode.removeEventListener('click', this._onLabelClick);
        }
      }

      /** @param {import('@lion/core').PropertyValues } changedProperties */
      updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has('_ariaLabelledNodes')) {
          this.__reflectAriaAttr(
            'aria-labelledby',
            this._ariaLabelledNodes,
            this.__reorderAriaLabelledNodes,
          );
        }

        if (changedProperties.has('_ariaDescribedNodes')) {
          this.__reflectAriaAttr(
            'aria-describedby',
            this._ariaDescribedNodes,
            this.__reorderAriaDescribedNodes,
          );
        }

        if (changedProperties.has('label') && this._labelNode) {
          this._labelNode.textContent = this.label;
        }

        if (changedProperties.has('helpText') && this._helpTextNode) {
          this._helpTextNode.textContent = this.helpText;
        }

        if (changedProperties.has('name')) {
          this.dispatchEvent(
            /** @privateEvent */
            new CustomEvent('form-element-name-changed', {
              detail: { oldName: changedProperties.get('name'), newName: this.name },
              bubbles: true,
            }),
          );
        }
      }

      /** @protected */
      _triggerInitialModelValueChangedEvent() {
        this._dispatchInitialModelValueChangedEvent();
      }

      /** @protected */
      _enhanceLightDomClasses() {
        if (this._inputNode) {
          this._inputNode.classList.add('form-control');
        }
      }

      /** @protected */
      _enhanceLightDomA11y() {
        const { _inputNode, _labelNode, _helpTextNode, _feedbackNode } = this;

        if (_inputNode) {
          _inputNode.id = _inputNode.id || this._inputId;
        }
        if (_labelNode) {
          _labelNode.setAttribute('for', this._inputId);
          this.addToAriaLabelledBy(_labelNode, { idPrefix: 'label' });
        }
        if (_helpTextNode) {
          this.addToAriaDescribedBy(_helpTextNode, { idPrefix: 'help-text' });
        }
        if (_feedbackNode) {
          // Generic focus/blur handling that works for both Fields/FormGroups
          this.addEventListener('focusin', () => {
            _feedbackNode.setAttribute('aria-live', 'polite');
          });
          this.addEventListener('focusout', () => {
            _feedbackNode.setAttribute('aria-live', 'assertive');
          });

          this.addToAriaDescribedBy(_feedbackNode, { idPrefix: 'feedback' });
        }
        this._enhanceLightDomA11yForAdditionalSlots();
      }

      /**
       * Enhances additional slots(prefix, suffix, before, after) defined by developer.
       *
       * When boolean attribute data-label or data-description is found,
       * the slot element will be connected to the input via aria-labelledby or aria-describedby
       * @param {string[]} additionalSlots
       * @protected
       */
      _enhanceLightDomA11yForAdditionalSlots(
        additionalSlots = ['prefix', 'suffix', 'before', 'after'],
      ) {
        additionalSlots.forEach(additionalSlot => {
          const element = this.__getDirectSlotChild(additionalSlot);
          if (element) {
            if (element.hasAttribute('data-label')) {
              this.addToAriaLabelledBy(element, { idPrefix: additionalSlot });
            }
            if (element.hasAttribute('data-description')) {
              this.addToAriaDescribedBy(element, { idPrefix: additionalSlot });
            }
          }
        });
      }

      /**
       * Will handle help text, validation feedback and character counter,
       * prefix/suffix/before/after (if they contain data-description flag attr).
       * Also, contents of id references that will be put in the <lion-field>._ariaDescribedby property
       * from an external context, will be read by a screen reader.
       * @param {string} attrName
       * @param {HTMLElement[]} nodes
       * @param {boolean|undefined} reorder
       */
      __reflectAriaAttr(attrName, nodes, reorder) {
        if (this._inputNode) {
          if (reorder) {
            const insideNodes = nodes.filter(n => this.contains(n));
            const outsideNodes = nodes.filter(n => !this.contains(n));

            // eslint-disable-next-line no-param-reassign
            nodes = [...getAriaElementsInRightDomOrder(insideNodes), ...outsideNodes];
          }
          const string = nodes.map(n => n.id).join(' ');
          this._inputNode.setAttribute(attrName, string);
        }
      }

      /**
       * Default Render Result:
       * <div class="form-field__group-one">
       *   <div class="form-field__label">
       *     <slot name="label"></slot>
       *   </div>
       *   <small class="form-field__help-text">
       *     <slot name="help-text"></slot>
       *   </small>
       * </div>
       * <div class="form-field__group-two">
       *   <div class="input-group">
       *     <div class="input-group__before">
       *       <slot name="before"></slot>
       *     </div>
       *     <div class="input-group__container">
       *       <div class="input-group__prefix">
       *         <slot name="prefix"></slot>
       *       </div>
       *       <div class="input-group__input">
       *         <slot name="input"></slot>
       *       </div>
       *       <div class="input-group__suffix">
       *         <slot name="suffix"></slot>
       *       </div>
       *     </div>
       *     <div class="input-group__after">
       *       <slot name="after"></slot>
       *     </div>
       *   </div>
       *   <div class="form-field__feedback">
       *     <slot name="feedback"></slot>
       *   </div>
       * </div>
       */
      render() {
        return x`
        <div class="form-field__group-one">${this._groupOneTemplate()}</div>
        <div class="form-field__group-two">${this._groupTwoTemplate()}</div>
      `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      _groupOneTemplate() {
        return x` ${this._labelTemplate()} ${this._helpTextTemplate()} `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      _groupTwoTemplate() {
        return x` ${this._inputGroupTemplate()} ${this._feedbackTemplate()} `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _labelTemplate() {
        return x`
        <div class="form-field__label">
          <slot name="label"></slot>
        </div>
      `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _helpTextTemplate() {
        return x`
        <small class="form-field__help-text">
          <slot name="help-text"></slot>
        </small>
      `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      _inputGroupTemplate() {
        return x`
        <div class="input-group">
          ${this._inputGroupBeforeTemplate()}
          <div class="input-group__container">
            ${this._inputGroupPrefixTemplate()} ${this._inputGroupInputTemplate()}
            ${this._inputGroupSuffixTemplate()}
          </div>
          ${this._inputGroupAfterTemplate()}
        </div>
      `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _inputGroupBeforeTemplate() {
        return x`
        <div class="input-group__before">
          <slot name="before"></slot>
        </div>
      `;
      }

      /**
       * @return {TemplateResult | nothing}
       * @protected
       */
      _inputGroupPrefixTemplate() {
        return !Array.from(this.children).find(child => child.slot === 'prefix')
          ? A
          : x`
            <div class="input-group__prefix">
              <slot name="prefix"></slot>
            </div>
          `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _inputGroupInputTemplate() {
        return x`
        <div class="input-group__input">
          <slot name="input"></slot>
        </div>
      `;
      }

      /**
       * @return {TemplateResult | nothing}
       * @protected
       */
      _inputGroupSuffixTemplate() {
        return !Array.from(this.children).find(child => child.slot === 'suffix')
          ? A
          : x`
            <div class="input-group__suffix">
              <slot name="suffix"></slot>
            </div>
          `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _inputGroupAfterTemplate() {
        return x`
        <div class="input-group__after">
          <slot name="after"></slot>
        </div>
      `;
      }

      /**
       * @return {TemplateResult}
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _feedbackTemplate() {
        return x`
        <div class="form-field__feedback">
          <slot name="feedback"></slot>
        </div>
      `;
      }

      /**
       * Used for Required validation and computation of interaction states
       * @param {any} modelValue
       * @return {boolean}
       * @protected
       */
      _isEmpty(modelValue = /** @type {any} */ (this).modelValue) {
        let value = modelValue;
        if (/** @type {any} */ (this).modelValue instanceof Unparseable) {
          value = /** @type {any} */ (this).modelValue.viewValue;
        }

        // Checks for empty platform types: Objects, Arrays, Dates
        if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
          return !Object.keys(value).length;
        }

        // eslint-disable-next-line no-mixed-operators
        // Checks for empty platform types: Numbers, Booleans
        const isNumberValue = typeof value === 'number' && (value === 0 || Number.isNaN(value));
        const isBooleanValue = typeof value === 'boolean' && value === false;

        return !value && !isNumberValue && !isBooleanValue;
      }

      /**
       * All CSS below is written from a generic mindset, following BEM conventions:
       * https://en.bem.info/methodology/
       * Although the CSS and HTML are implemented by the component, they should be regarded as
       * totally decoupled.
       *
       * Not only does this force us to write better structured css, it also allows for future
       * reusability in many different ways like:
       *  - disabling shadow DOM for a component (for water proof encapsulation can be combined with
       *    a build step)
       *  - easier translation to more flexible, WebComponents agnostic solutions like JSS
       *    (allowing extends, mixins, reasoning, IDE integration, tree shaking etc.)
       *  - export to a CSS module for reuse in an outer context
       *
       *
       * Please note that the HTML structure is purposely 'loose', allowing multiple design systems
       * to be compatible
       * with the CSS component.
       * Note that every occurence of '::slotted(*)' can be rewritten to '> *' for use in an other
       * context
       */

      /**
       * {block} .form-field
       *
       * Structure:
       * - {element}  .form-field__label : a wrapper element around the projected label
       * - {element}  .form-field__help-text (optional) : a wrapper element around the projected
       *               help-text
       * - {block}    .input-group : a container around the input element, including prefixes and
       *               suffixes
       * - {element}  .form-field__feedback (optional) : a wrapper element around the projected
       *               (validation) feedback message
       *
       * Modifiers:
       * - {state} [disabled] when .form-control (<input>, <textarea> etc.) has disabled set
       *            to true
       * - {state} [filled] whether <input> has a value
       * - {state} [touched] whether the user had blurred the field once
       * - {state} [dirty] whether the value has changed since initial value
       *
       * TODO: update states below
       * These classes are now attributes. Check them agains the new attribute names inside ValidateMixin
       * and InteractionStateMixin. Some states got renamed. Make sure to use the correct ones!
       * - {state} .state-focused: when .form-control (<input>, <textarea> etc.) <input> has focus
       * - {state} .state-invalid: when input has error(s) (regardless of whether they should be
       *            shown to the user)
       * - {state} .state-error: when input has error(s) and this/these should be shown to the user
       * - {state} .state-warning: when input has warning(s) and this/these should be shown to the
       *            user
       * - {state} .state-info: when input has info feedback message(s) and this/these should be shown
       *            to the user
       * - {state} .state-success: when input has success feedback message(s) and this/these should be
       *            shown to the user
       */

      /**
       * {block} .input-group
       *
       * Structure:
       * - {element} .input-group__before (optional) : a prefix that resides outside the container
       * - {element} .input-group__container : an inner container: this element contains all styling
       *  - {element} .input-group__prefix (optional) : a prefix that resides in the container,
       *               allowing it to be detectable as a :first-child
       *  - {element} .input-group__input : a wrapper around the form-control component
       *   - {block} .form-control : the actual input element (input/select/textarea)
       *  - {element} .input-group__suffix (optional) : a suffix that resides inside the container,
       *               allowing it to be detectable as a :last-child
       *  - {element} .input-group__bottom (optional) : placeholder element for additional styling
       *               (like an animated line for material design input)
       * - {element} .input-group__after (optional) :  a suffix that resides outside the container
       */
      static get styles() {
        return [
          i`
          /**********************
            {block} .form-field
           ********************/

          :host {
            display: block;
          }

          :host([hidden]) {
            display: none;
          }

          :host([disabled]) {
            pointer-events: none;
          }

          :host([disabled]) .form-field__label ::slotted(*),
          :host([disabled]) .form-field__help-text ::slotted(*) {
            color: var(--disabled-text-color, #767676);
          }

          :host([label-sr-only]) .form-field__label {
            position: absolute;
            top: 0;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(100%);
            clip: rect(1px, 1px, 1px, 1px);
            white-space: nowrap;
            border: 0;
            margin: 0;
            padding: 0;
          }

          /***********************
            {block} .input-group
           *********************/

          .input-group__container {
            display: flex;
          }

          .input-group__input {
            flex: 1;
            display: flex;
          }

          /***** {state} :disabled *****/
          :host([disabled]) .input-group ::slotted([slot='input']) {
            color: var(--disabled-text-color, #767676);
          }

          /***********************
            {block} .form-control
           **********************/

          .input-group__container > .input-group__input ::slotted(.form-control) {
            flex: 1 1 auto;
            margin: 0; /* remove input margin in Safari */
            font-size: 100%; /* normalize default input font-size */
          }
        `,
        ];
      }

      /**
       * This function exposes descripion elements that a FormGroup should expose to its
       * children. See FormGroupMixin.__getAllDescriptionElementsInParentChain()
       * @return {Array.<HTMLElement>}
       * @protected
       */
      // Returns dom references to all elements that should be referred to by field(s)
      _getAriaDescriptionElements() {
        return [this._helpTextNode, this._feedbackNode];
      }

      /**
       * Allows to add extra element references to aria-labelledby attribute.
       * @param {HTMLElement} element
       * @param {{idPrefix?:string; reorder?: boolean}} customConfig
       */
      addToAriaLabelledBy(element, { idPrefix = '', reorder = true } = {}) {
        // eslint-disable-next-line no-param-reassign
        element.id = element.id || `${idPrefix}-${this._inputId}`;
        if (!this._ariaLabelledNodes.includes(element)) {
          this._ariaLabelledNodes = [...this._ariaLabelledNodes, element];
          // This value will be read when we need to reflect to attr
          /** @type {boolean} */
          this.__reorderAriaLabelledNodes = Boolean(reorder);
        }
      }

      /**
       * Allows to remove element references from aria-labelledby attribute.
       * @param {HTMLElement} element
       */
      removeFromAriaLabelledBy(element) {
        if (this._ariaLabelledNodes.includes(element)) {
          this._ariaLabelledNodes.splice(this._ariaLabelledNodes.indexOf(element), 1);
          this._ariaLabelledNodes = [...this._ariaLabelledNodes];
          // This value will be read when we need to reflect to attr
          /** @type {boolean} */
          this.__reorderAriaLabelledNodes = false;
        }
      }

      /**
       * Allows to add element references to aria-describedby attribute.
       * @param {HTMLElement} element
       * @param {{idPrefix?:string; reorder?: boolean}} customConfig
       */
      addToAriaDescribedBy(element, { idPrefix = '', reorder = true } = {}) {
        // eslint-disable-next-line no-param-reassign
        element.id = element.id || `${idPrefix}-${this._inputId}`;
        if (!this._ariaDescribedNodes.includes(element)) {
          this._ariaDescribedNodes = [...this._ariaDescribedNodes, element];
          // This value will be read when we need to reflect to attr
          /** @type {boolean} */
          this.__reorderAriaDescribedNodes = Boolean(reorder);
        }
      }

      /**
       * Allows to remove element references from aria-describedby attribute.
       * @param {HTMLElement} element
       */
      removeFromAriaDescribedBy(element) {
        if (this._ariaDescribedNodes.includes(element)) {
          this._ariaDescribedNodes.splice(this._ariaDescribedNodes.indexOf(element), 1);
          this._ariaDescribedNodes = [...this._ariaDescribedNodes];
          // This value will be read when we need to reflect to attr
          /** @type {boolean} */
          this.__reorderAriaLabelledNodes = false;
        }
      }

      /**
       * @param {string} slotName
       * @return {HTMLElement | undefined}
       */
      __getDirectSlotChild(slotName) {
        return /** @type {HTMLElement[]} */ (Array.from(this.children)).find(
          el => el.slot === slotName,
        );
      }

      _dispatchInitialModelValueChangedEvent() {
        // When we are not a fieldset / choice-group, we don't need to wait for our children
        // to send a unified event
        if (this._repropagationRole === 'child') {
          return;
        }

        // Initially we don't repropagate model-value-changed events coming
        // from children. On firstUpdated we re-dispatch this event to maintain
        // 'count consistency' (to not confuse the application developer with a
        // large number of initial events). Initially the source field will not
        // be part of the formPath but afterwards it will.
        /** @type {boolean} */
        this.__repropagateChildrenInitialized = true;
        this.dispatchEvent(
          new CustomEvent('model-value-changed', {
            bubbles: true,
            detail: /** @type {ModelValueEventDetails} */ ({
              formPath: [this],
              initialize: true,
              isTriggeredByUser: false,
            }),
          }),
        );
      }

      /**
       * Hook for Subclassers to add logic before repropagation
       * @configurable
       * @param {CustomEvent} ev
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this, no-unused-vars
      _onBeforeRepropagateChildrenValues(ev) {}

      /**
       * @param {CustomEvent} ev
       */
      __repropagateChildrenValues(ev) {
        // Allows sub classes to internally listen to the children change events
        // (before stopImmediatePropagation is called below).
        this._onBeforeRepropagateChildrenValues(ev);
        // Normalize target, we also might get it from 'portals' (rich select)
        const target = (ev.detail && ev.detail.element) || ev.target;
        const isEndpoint =
          this._isRepropagationEndpoint || this._repropagationRole === 'choice-group';

        // Prevent eternal loops after we sent the event below.
        if (target === this) {
          return;
        }

        // A. Stop sibling handlers
        //
        // Make sure our sibling event listeners (added by Application developers) will not get
        // the child model-value-changed event, but the repropagated one at the bottom of this
        // method
        ev.stopImmediatePropagation();

        // B1. Are we still initializing? If so, halt...
        //
        // Stop repropagating children events before firstUpdated and make sure we de not
        // repropagate init events of our children (we already sent our own
        // initial model-value-change event in firstUpdated)
        const isGroup = this._repropagationRole !== 'child'; // => fieldset or choice-group
        const isSelfInitializing = isGroup && !this.__repropagateChildrenInitialized;
        const isChildGroupInitializing = ev.detail && ev.detail.initialize;
        if (isSelfInitializing || isChildGroupInitializing) {
          return;
        }

        // B2. Are we a single choice choice-group? If so, halt when target unchecked
        // and something else is checked, meaning we will get
        // another model-value-changed dispatch for the checked target
        //
        // We only send the checked changed up (not the unchecked). In this way a choice group
        // (radio-group, checkbox-group, select/listbox) acts as an 'endpoint' (a single Field)
        // just like the native <select>
        if (!this._repropagationCondition(target)) {
          return;
        }

        // C1. We are ready to dispatch. Create a formPath
        //
        // Compute the formPath. Choice groups are regarded 'end points'
        let parentFormPath = [];
        if (!isEndpoint) {
          parentFormPath = (ev.detail && ev.detail.formPath) || [target];
        }
        const formPath = [...parentFormPath, this];

        // C2. Finally, redispatch a fresh model-value-changed event from our host, consumable
        // for an Application Developer
        //
        // Since for a11y everything needs to be in lightdom, we don't add 'composed:true'
        this.dispatchEvent(
          new CustomEvent('model-value-changed', {
            bubbles: true,
            detail: /** @type {ModelValueEventDetails} */ ({
              formPath,
              isTriggeredByUser: Boolean(ev.detail?.isTriggeredByUser),
            }),
          }),
        );
      }

      /**
       * Based on provided target, this condition determines whether received model-value-changed
       * event should be repropagated
       * @param {FormControlHost} target
       * @protected
       * @overridable
       */
      // eslint-disable-next-line class-methods-use-this
      _repropagationCondition(target) {
        return Boolean(target);
      }

      /**
       * @overridable
       * A Subclasser should only override this method if the interactive element
       * ([slot=input]) is not a native element(like input, textarea, select)
       * that already receives focus on label click.
       *
       * @example
       * _onLabelClick() {
       *   this._invokerNode.focus();
       * }
       * @protected
       */
      // eslint-disable-next-line class-methods-use-this
      _onLabelClick() {}
    };

  const FormControlMixin = dedupeMixin(FormControlMixinImplementation);

  const sym = Symbol.for('lion::SingletonManagerClassStorage');

  /**
   * Allow compatibility with node-js (for ssr).
   * In the future, we can just use globalThis directly
   * (for now, we're backwards compatible with browsers that still only use window, since we don't know all contexts singleton-manager is used in).
   */
  // eslint-disable-next-line no-undef
  const globalThisOrWindow = globalThis || window;
  class SingletonManagerClass {
    constructor() {
      /** @protected */
      this._map = globalThisOrWindow[sym]
        ? globalThisOrWindow[sym]
        : (globalThisOrWindow[sym] = new Map());
    }

    /**
     * Ignores already existing keys (e.g. it will not override)
     *
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
      if (!this.has(key)) {
        this._map.set(key, value);
      }
    }

    /**
     * @param {string} key
     * @returns
     */
    get(key) {
      return this._map.get(key);
    }

    /**
     * @param {string} key
     */
    has(key) {
      return this._map.has(key);
    }
  }

  const singletonManager = new SingletonManagerClass();

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  // @flow
  var LONG = 'long';
  var SHORT = 'short';
  var NARROW = 'narrow';
  var NUMERIC = 'numeric';
  var TWODIGIT = '2-digit';

  /**
   * formatting information
   **/
  var formatMessageFormats = {
    number: {
      decimal: {
        style: 'decimal'
      },
      integer: {
        style: 'decimal',
        maximumFractionDigits: 0
      },
      currency: {
        style: 'currency',
        currency: 'USD'
      },
      percent: {
        style: 'percent'
      },
      default: {
        style: 'decimal'
      }
    },
    date: {
      short: {
        month: NUMERIC,
        day: NUMERIC,
        year: TWODIGIT
      },
      medium: {
        month: SHORT,
        day: NUMERIC,
        year: NUMERIC
      },
      long: {
        month: LONG,
        day: NUMERIC,
        year: NUMERIC
      },
      full: {
        month: LONG,
        day: NUMERIC,
        year: NUMERIC,
        weekday: LONG
      },
      default: {
        month: SHORT,
        day: NUMERIC,
        year: NUMERIC
      }
    },
    time: {
      short: {
        hour: NUMERIC,
        minute: NUMERIC
      },
      medium: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
      },
      long: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: SHORT
      },
      full: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: SHORT
      },
      default: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
      }
    },
    duration: {
      default: {
        hours: {
          minimumIntegerDigits: 1,
          maximumFractionDigits: 0
        },
        minutes: {
          minimumIntegerDigits: 2,
          maximumFractionDigits: 0
        },
        seconds: {
          minimumIntegerDigits: 2,
          maximumFractionDigits: 3
        }
      }
    },
    parseNumberPattern: function (pattern/*: ?string */) {
      if (!pattern) return
      var options = {};
      var currency = pattern.match(/\b[A-Z]{3}\b/i);
      var syms = pattern.replace(/[^¤]/g, '').length;
      if (!syms && currency) syms = 1;
      if (syms) {
        options.style = 'currency';
        options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
        options.currency = currency ? currency[0].toUpperCase() : 'USD';
      } else if (pattern.indexOf('%') >= 0) {
        options.style = 'percent';
      }
      if (!/[@#0]/.test(pattern)) return options.style ? options : undefined
      options.useGrouping = pattern.indexOf(',') >= 0;
      if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
        var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
        options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
        options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
      } else {
        var parts = pattern.replace(/[^#0.]/g, '').split('.');
        var integer = parts[0];
        var n = integer.length - 1;
        while (integer[n] === '0') --n;
        options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
        var fraction = parts[1] || '';
        n = 0;
        while (fraction[n] === '0') ++n;
        options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);
        while (fraction[n] === '#') ++n;
        options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
      }
      return options
    },
    parseDatePattern: function (pattern/*: ?string */) {
      if (!pattern) return
      var options = {};
      for (var i = 0; i < pattern.length;) {
        var current = pattern[i];
        var n = 1;
        while (pattern[++i] === current) ++n;
        switch (current) {
          case 'G':
            options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
            break
          case 'y':
          case 'Y':
            options.year = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 'M':
          case 'L':
            n = Math.min(Math.max(n - 1, 0), 4);
            options.month = [ NUMERIC, TWODIGIT, SHORT, LONG, NARROW ][n];
            break
          case 'E':
          case 'e':
          case 'c':
            options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
            break
          case 'd':
          case 'D':
            options.day = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 'h':
          case 'K':
            options.hour12 = true;
            options.hour = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 'H':
          case 'k':
            options.hour12 = false;
            options.hour = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 'm':
            options.minute = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 's':
          case 'S':
            options.second = n === 2 ? TWODIGIT : NUMERIC;
            break
          case 'z':
          case 'Z':
          case 'v':
          case 'V':
            options.timeZoneName = n === 1 ? SHORT : LONG;
            break
        }
      }
      return Object.keys(options).length ? options : undefined
    }
  };

  // @flow
  // "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
  // assumes normalized language tags, and matches in a case sensitive manner
  var lookupClosestLocale = function lookupClosestLocale (locale/*: string | string[] | void */, available/*: { [string]: any } */)/*: ?string */ {
    if (typeof locale === 'string' && available[locale]) return locale
    var locales = [].concat(locale || []);
    for (var l = 0, ll = locales.length; l < ll; ++l) {
      var current = locales[l].split('-');
      while (current.length) {
        var candidate = current.join('-');
        if (available[candidate]) return candidate
        current.pop();
      }
    }
  };

  // @flow

  /*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */
  var zero = 'zero', one = 'one', two = 'two', few = 'few', many = 'many', other = 'other';
  var f = [
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return 0 <= n && n <= 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var n = +s;
      return i === 0 || n === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 0 ? zero
        : n === 1 ? one
        : n === 2 ? two
        : 3 <= n % 100 && n % 100 <= 10 ? few
        : 11 <= n % 100 && n % 100 <= 99 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return i === 1 && v === 0 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n % 10 === 1 && n % 100 !== 11 ? one
        : (2 <= n % 10 && n % 10 <= 4) && (n % 100 < 12 || 14 < n % 100) ? few
        : n % 10 === 0 || (5 <= n % 10 && n % 10 <= 9) || (11 <= n % 100 && n % 100 <= 14) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n % 10 === 1 && (n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91) ? one
        : n % 10 === 2 && (n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92) ? two
        : ((3 <= n % 10 && n % 10 <= 4) || n % 10 === 9) && ((n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100)) ? few
        : n !== 0 && n % 1000000 === 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var f = +(s + '.').split('.')[1];
      return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one
        : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) || (2 <= f % 10 && f % 10 <= 4) && (f % 100 < 12 || 14 < f % 100) ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return i === 1 && v === 0 ? one
        : (2 <= i && i <= 4) && v === 0 ? few
        : v !== 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 0 ? zero
        : n === 1 ? one
        : n === 2 ? two
        : n === 3 ? few
        : n === 6 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
      var n = +s;
      return n === 1 || t !== 0 && (i === 0 || i === 1) ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var f = +(s + '.').split('.')[1];
      return v === 0 && i % 100 === 1 || f % 100 === 1 ? one
        : v === 0 && i % 100 === 2 || f % 100 === 2 ? two
        : v === 0 && (3 <= i % 100 && i % 100 <= 4) || (3 <= f % 100 && f % 100 <= 4) ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      return i === 0 || i === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var f = +(s + '.').split('.')[1];
      return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && (i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9) || v !== 0 && (f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9) ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n === 2 ? two
        : 3 <= n && n <= 6 ? few
        : 7 <= n && n <= 10 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 || n === 11 ? one
        : n === 2 || n === 12 ? two
        : ((3 <= n && n <= 10) || (13 <= n && n <= 19)) ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return v === 0 && i % 10 === 1 ? one
        : v === 0 && i % 10 === 2 ? two
        : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few
        : v !== 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var n = +s;
      return i === 1 && v === 0 ? one
        : i === 2 && v === 0 ? two
        : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
      return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n === 2 ? two
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 0 ? zero
        : n === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var n = +s;
      return n === 0 ? zero
        : (i === 0 || i === 1) && n !== 0 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var f = +(s + '.').split('.')[1];
      var n = +s;
      return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one
        : (2 <= n % 10 && n % 10 <= 9) && (n % 100 < 11 || 19 < n % 100) ? few
        : f !== 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var v = (s + '.').split('.')[1].length;
      var f = +(s + '.').split('.')[1];
      var n = +s;
      return n % 10 === 0 || (11 <= n % 100 && n % 100 <= 19) || v === 2 && (11 <= f % 100 && f % 100 <= 19) ? zero
        : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var f = +(s + '.').split('.')[1];
      return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      var n = +s;
      return i === 1 && v === 0 ? one
        : v !== 0 || n === 0 || n !== 1 && (1 <= n % 100 && n % 100 <= 19) ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n === 0 || (2 <= n % 100 && n % 100 <= 10) ? few
        : 11 <= n % 100 && n % 100 <= 19 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return i === 1 && v === 0 ? one
        : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few
        : v === 0 && i !== 1 && (0 <= i % 10 && i % 10 <= 1) || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (12 <= i % 100 && i % 100 <= 14) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      return 0 <= i && i <= 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one
        : v === 0 && (2 <= i % 10 && i % 10 <= 4) && (i % 100 < 12 || 14 < i % 100) ? few
        : v === 0 && i % 10 === 0 || v === 0 && (5 <= i % 10 && i % 10 <= 9) || v === 0 && (11 <= i % 100 && i % 100 <= 14) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var n = +s;
      return i === 0 || n === 1 ? one
        : 2 <= n && n <= 10 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var f = +(s + '.').split('.')[1];
      var n = +s;
      return (n === 0 || n === 1) || i === 0 && f === 1 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      var v = (s + '.').split('.')[1].length;
      return v === 0 && i % 100 === 1 ? one
        : v === 0 && i % 100 === 2 ? two
        : v === 0 && (3 <= i % 100 && i % 100 <= 4) || v !== 0 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return (0 <= n && n <= 1) || (11 <= n && n <= 99) ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one
        : n === 2 || n === 3 ? two
        : n === 4 ? few
        : n === 6 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      return (i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8) || (i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80) ? one
        : (i % 10 === 3 || i % 10 === 4) || (i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900) ? few
        : i === 0 || i % 10 === 6 || (i % 100 === 40 || i % 100 === 60 || i % 100 === 90) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return (n % 10 === 2 || n % 10 === 3) && (n % 100 !== 12 && n % 100 !== 13) ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 || n === 3 ? one
        : n === 2 ? two
        : n === 4 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 0 || n === 7 || n === 8 || n === 9 ? zero
        : n === 1 ? one
        : n === 2 ? two
        : n === 3 || n === 4 ? few
        : n === 5 || n === 6 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n % 10 === 1 && n % 100 !== 11 ? one
        : n % 10 === 2 && n % 100 !== 12 ? two
        : n % 10 === 3 && n % 100 !== 13 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n === 2 || n === 3 ? two
        : n === 4 ? few
        : n === 6 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 || n === 5 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 11 || n === 8 || n === 80 || n === 800 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      return i === 1 ? one
        : i === 0 || ((2 <= i % 100 && i % 100 <= 20) || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var i = Math.floor(Math.abs(+s));
      return i % 10 === 1 && i % 100 !== 11 ? one
        : i % 10 === 2 && i % 100 !== 12 ? two
        : (i % 10 === 7 || i % 10 === 8) && (i % 100 !== 17 && i % 100 !== 18) ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n === 2 || n === 3 ? two
        : n === 4 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return 1 <= n && n <= 4 ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return (n === 1 || n === 5 || (7 <= n && n <= 9)) ? one
        : n === 2 || n === 3 ? two
        : n === 4 ? few
        : n === 6 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n === 1 ? one
        : n % 10 === 4 && n % 100 !== 14 ? many
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return (n % 10 === 1 || n % 10 === 2) && (n % 100 !== 11 && n % 100 !== 12) ? one
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return (n % 10 === 6 || n % 10 === 9) || n === 10 ? few
        : other
    },
    function (s/*: string | number */)/*: Rule */ {
      var n = +s;
      return n % 10 === 3 && n % 100 !== 13 ? few
        : other
    }
  ];

  var plurals = {
    af: { cardinal: f[0] },
    ak: { cardinal: f[1] },
    am: { cardinal: f[2] },
    ar: { cardinal: f[3] },
    ars: { cardinal: f[3] },
    as: { cardinal: f[2], ordinal: f[34] },
    asa: { cardinal: f[0] },
    ast: { cardinal: f[4] },
    az: { cardinal: f[0], ordinal: f[35] },
    be: { cardinal: f[5], ordinal: f[36] },
    bem: { cardinal: f[0] },
    bez: { cardinal: f[0] },
    bg: { cardinal: f[0] },
    bh: { cardinal: f[1] },
    bn: { cardinal: f[2], ordinal: f[34] },
    br: { cardinal: f[6] },
    brx: { cardinal: f[0] },
    bs: { cardinal: f[7] },
    ca: { cardinal: f[4], ordinal: f[37] },
    ce: { cardinal: f[0] },
    cgg: { cardinal: f[0] },
    chr: { cardinal: f[0] },
    ckb: { cardinal: f[0] },
    cs: { cardinal: f[8] },
    cy: { cardinal: f[9], ordinal: f[38] },
    da: { cardinal: f[10] },
    de: { cardinal: f[4] },
    dsb: { cardinal: f[11] },
    dv: { cardinal: f[0] },
    ee: { cardinal: f[0] },
    el: { cardinal: f[0] },
    en: { cardinal: f[4], ordinal: f[39] },
    eo: { cardinal: f[0] },
    es: { cardinal: f[0] },
    et: { cardinal: f[4] },
    eu: { cardinal: f[0] },
    fa: { cardinal: f[2] },
    ff: { cardinal: f[12] },
    fi: { cardinal: f[4] },
    fil: { cardinal: f[13], ordinal: f[0] },
    fo: { cardinal: f[0] },
    fr: { cardinal: f[12], ordinal: f[0] },
    fur: { cardinal: f[0] },
    fy: { cardinal: f[4] },
    ga: { cardinal: f[14], ordinal: f[0] },
    gd: { cardinal: f[15] },
    gl: { cardinal: f[4] },
    gsw: { cardinal: f[0] },
    gu: { cardinal: f[2], ordinal: f[40] },
    guw: { cardinal: f[1] },
    gv: { cardinal: f[16] },
    ha: { cardinal: f[0] },
    haw: { cardinal: f[0] },
    he: { cardinal: f[17] },
    hi: { cardinal: f[2], ordinal: f[40] },
    hr: { cardinal: f[7] },
    hsb: { cardinal: f[11] },
    hu: { cardinal: f[0], ordinal: f[41] },
    hy: { cardinal: f[12], ordinal: f[0] },
    io: { cardinal: f[4] },
    is: { cardinal: f[18] },
    it: { cardinal: f[4], ordinal: f[42] },
    iu: { cardinal: f[19] },
    iw: { cardinal: f[17] },
    jgo: { cardinal: f[0] },
    ji: { cardinal: f[4] },
    jmc: { cardinal: f[0] },
    ka: { cardinal: f[0], ordinal: f[43] },
    kab: { cardinal: f[12] },
    kaj: { cardinal: f[0] },
    kcg: { cardinal: f[0] },
    kk: { cardinal: f[0], ordinal: f[44] },
    kkj: { cardinal: f[0] },
    kl: { cardinal: f[0] },
    kn: { cardinal: f[2] },
    ks: { cardinal: f[0] },
    ksb: { cardinal: f[0] },
    ksh: { cardinal: f[20] },
    ku: { cardinal: f[0] },
    kw: { cardinal: f[19] },
    ky: { cardinal: f[0] },
    lag: { cardinal: f[21] },
    lb: { cardinal: f[0] },
    lg: { cardinal: f[0] },
    ln: { cardinal: f[1] },
    lt: { cardinal: f[22] },
    lv: { cardinal: f[23] },
    mas: { cardinal: f[0] },
    mg: { cardinal: f[1] },
    mgo: { cardinal: f[0] },
    mk: { cardinal: f[24], ordinal: f[45] },
    ml: { cardinal: f[0] },
    mn: { cardinal: f[0] },
    mo: { cardinal: f[25], ordinal: f[0] },
    mr: { cardinal: f[2], ordinal: f[46] },
    mt: { cardinal: f[26] },
    nah: { cardinal: f[0] },
    naq: { cardinal: f[19] },
    nb: { cardinal: f[0] },
    nd: { cardinal: f[0] },
    ne: { cardinal: f[0], ordinal: f[47] },
    nl: { cardinal: f[4] },
    nn: { cardinal: f[0] },
    nnh: { cardinal: f[0] },
    no: { cardinal: f[0] },
    nr: { cardinal: f[0] },
    nso: { cardinal: f[1] },
    ny: { cardinal: f[0] },
    nyn: { cardinal: f[0] },
    om: { cardinal: f[0] },
    or: { cardinal: f[0], ordinal: f[48] },
    os: { cardinal: f[0] },
    pa: { cardinal: f[1] },
    pap: { cardinal: f[0] },
    pl: { cardinal: f[27] },
    prg: { cardinal: f[23] },
    ps: { cardinal: f[0] },
    pt: { cardinal: f[28] },
    'pt-PT': { cardinal: f[4] },
    rm: { cardinal: f[0] },
    ro: { cardinal: f[25], ordinal: f[0] },
    rof: { cardinal: f[0] },
    ru: { cardinal: f[29] },
    rwk: { cardinal: f[0] },
    saq: { cardinal: f[0] },
    scn: { cardinal: f[4], ordinal: f[42] },
    sd: { cardinal: f[0] },
    sdh: { cardinal: f[0] },
    se: { cardinal: f[19] },
    seh: { cardinal: f[0] },
    sh: { cardinal: f[7] },
    shi: { cardinal: f[30] },
    si: { cardinal: f[31] },
    sk: { cardinal: f[8] },
    sl: { cardinal: f[32] },
    sma: { cardinal: f[19] },
    smi: { cardinal: f[19] },
    smj: { cardinal: f[19] },
    smn: { cardinal: f[19] },
    sms: { cardinal: f[19] },
    sn: { cardinal: f[0] },
    so: { cardinal: f[0] },
    sq: { cardinal: f[0], ordinal: f[49] },
    sr: { cardinal: f[7] },
    ss: { cardinal: f[0] },
    ssy: { cardinal: f[0] },
    st: { cardinal: f[0] },
    sv: { cardinal: f[4], ordinal: f[50] },
    sw: { cardinal: f[4] },
    syr: { cardinal: f[0] },
    ta: { cardinal: f[0] },
    te: { cardinal: f[0] },
    teo: { cardinal: f[0] },
    ti: { cardinal: f[1] },
    tig: { cardinal: f[0] },
    tk: { cardinal: f[0], ordinal: f[51] },
    tl: { cardinal: f[13], ordinal: f[0] },
    tn: { cardinal: f[0] },
    tr: { cardinal: f[0] },
    ts: { cardinal: f[0] },
    tzm: { cardinal: f[33] },
    ug: { cardinal: f[0] },
    uk: { cardinal: f[29], ordinal: f[52] },
    ur: { cardinal: f[4] },
    uz: { cardinal: f[0] },
    ve: { cardinal: f[0] },
    vo: { cardinal: f[0] },
    vun: { cardinal: f[0] },
    wa: { cardinal: f[1] },
    wae: { cardinal: f[0] },
    xh: { cardinal: f[0] },
    xog: { cardinal: f[0] },
    yi: { cardinal: f[4] },
    zu: { cardinal: f[2] },
    lo: { ordinal: f[0] },
    ms: { ordinal: f[0] },
    vi: { ordinal: f[0] }
  };

  var formatMessageInterpret = createCommonjsModule(function (module, exports) {




  /*::
  import type {
    AST,
    SubMessages
  } from '../format-message-parse'
  type Locale = string
  type Locales = Locale | Locale[]
  type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
  export type Type = (Placeholder, Locales) => (any, ?Object) => any
  export type Types = { [string]: Type }
  */

  exports = module.exports = function interpret (
    ast/*: AST */,
    locale/*:: ?: Locales */,
    types/*:: ?: Types */
  )/*: (args?: Object) => string */ {
    return interpretAST(ast, null, locale || 'en', types || {}, true)
  };

  exports.toParts = function toParts (
    ast/*: AST */,
    locale/*:: ?: Locales */,
    types/*:: ?: Types */
  )/*: (args?: Object) => any[] */ {
    return interpretAST(ast, null, locale || 'en', types || {}, false)
  };

  function interpretAST (
    elements/*: any[] */,
    parent/*: ?Placeholder */,
    locale/*: Locales */,
    types/*: Types */,
    join/*: boolean */
  )/*: Function */ {
    var parts = elements.map(function (element) {
      return interpretElement(element, parent, locale, types, join)
    });

    if (!join) {
      return function format (args) {
        return parts.reduce(function (parts, part) {
          return parts.concat(part(args))
        }, [])
      }
    }

    if (parts.length === 1) return parts[0]
    return function format (args) {
      var message = '';
      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }
      return message
    }
  }

  function interpretElement (
    element/*: Placeholder */,
    parent/*: ?Placeholder */,
    locale/*: Locales */,
    types/*: Types */,
    join/*: boolean */
  )/*: Function */ {
    if (typeof element === 'string') {
      var value/*: string */ = element;
      return function format () { return value }
    }

    var id = element[0];
    var type = element[1];

    if (parent && element[0] === '#') {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([ id, 'number' ], locale);
      return function format (args) {
        return formatter(getArg(id, args) - offset, args)
      }
    }

    // pre-process children
    var children;
    if (type === 'plural' || type === 'selectordinal') {
      children = {};
      Object.keys(element[3]).forEach(function (key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [ element[0], element[1], element[2], children ];
    } else if (element[2] && typeof element[2] === 'object') {
      children = {};
      Object.keys(element[2]).forEach(function (key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [ element[0], element[1], children ];
    }

    var getFrmt = type && (types[type] || defaults[type]);
    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format (args) {
        return frmt(getArg(id, args), args)
      }
    }

    return join
      ? function format (args) { return String(getArg(id, args)) }
      : function format (args) { return getArg(id, args) }
  }

  function getArg (id/*: string */, args/*: ?Object */)/*: any */ {
    if (args && (id in args)) return args[id]
    var parts = id.split('.');
    var a = args;
    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }
    return a
  }

  function interpretNumber (element/*: Placeholder */, locales/*: Locales */) {
    var style = element[2];
    var options = formatMessageFormats.number[style] || formatMessageFormats.parseNumberPattern(style) || formatMessageFormats.number.default;
    return new Intl.NumberFormat(locales, options).format
  }

  function interpretDuration (element/*: Placeholder */, locales/*: Locales */) {
    var style = element[2];
    var options = formatMessageFormats.duration[style] || formatMessageFormats.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';

    return function (s, args) {
      s = +s;
      if (!isFinite(s)) return fs(s)
      var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc
      var m = ~~(s / 60 % 60);
      var dur = (h ? (fh(Math.abs(h)) + sep) : '') +
        fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur
    }
  }

  function interpretDateTime (element/*: Placeholder */, locales/*: Locales */) {
    var type = element[1];
    var style = element[2];
    var options = formatMessageFormats[type][style] || formatMessageFormats.parseDatePattern(style) || formatMessageFormats[type].default;
    return new Intl.DateTimeFormat(locales, options).format
  }

  function interpretPlural (element/*: Placeholder */, locales/*: Locales */) {
    var type = element[1];
    var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
    var offset = element[2];
    var children = element[3];
    var pluralRules;
    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, { type: pluralType });
    } else {
      var locale = lookupClosestLocale(locales, plurals);
      var select = (locale && plurals[locale][pluralType]) || returnOther;
      pluralRules = { select: select };
    }

    return function (value, args) {
      var clause =
        children['=' + +value] ||
        children[pluralRules.select(value - offset)] ||
        children.other;
      return clause(args)
    }
  }

  function returnOther (/*:: n:number */) { return 'other' }

  function interpretSelect (element/*: Placeholder */, locales/*: Locales */) {
    var children = element[2];
    return function (value, args) {
      var clause = children[value] || children.other;
      return clause(args)
    }
  }

  var defaults/*: Types */ = {
    number: interpretNumber,
    ordinal: interpretNumber, // TODO: support rbnf
    spellout: interpretNumber, // TODO: support rbnf
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
  });
  formatMessageInterpret.toParts;
  formatMessageInterpret.types;

  var formatMessageParse = createCommonjsModule(function (module, exports) {

  /*::
  export type AST = Element[]
  export type Element = string | Placeholder
  export type Placeholder = Plural | Styled | Typed | Simple
  export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
  export type Styled = [ string, string, string | SubMessages ]
  export type Typed = [ string, string ]
  export type Simple = [ string ]
  export type SubMessages = { [string]: AST }
  export type Token = [ TokenType, string ]
  export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
  type Context = {|
    pattern: string,
    index: number,
    tagsType: ?string,
    tokens: ?Token[]
  |}
  */

  var ARG_OPN = '{';
  var ARG_CLS = '}';
  var ARG_SEP = ',';
  var NUM_ARG = '#';
  var TAG_OPN = '<';
  var TAG_CLS = '>';
  var TAG_END = '</';
  var TAG_SELF_CLS = '/>';
  var ESC = '\'';
  var OFFSET = 'offset:';
  var simpleTypes = [
    'number',
    'date',
    'time',
    'ordinal',
    'duration',
    'spellout'
  ];
  var submTypes = [
    'plural',
    'select',
    'selectordinal'
  ];

  /**
   * parse
   *
   * Turns this:
   *  `You have { numBananas, plural,
   *       =0 {no bananas}
   *      one {a banana}
   *    other {# bananas}
   *  } for sale`
   *
   * into this:
   *  [ "You have ", [ "numBananas", "plural", 0, {
   *       "=0": [ "no bananas" ],
   *      "one": [ "a banana" ],
   *    "other": [ [ '#' ], " bananas" ]
   *  } ], " for sale." ]
   *
   * tokens:
   *  [
   *    [ "text", "You have " ],
   *    [ "syntax", "{" ],
   *    [ "space", " " ],
   *    [ "id", "numBananas" ],
   *    [ "syntax", ", " ],
   *    [ "space", " " ],
   *    [ "type", "plural" ],
   *    [ "syntax", "," ],
   *    [ "space", "\n     " ],
   *    [ "selector", "=0" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "no bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n    " ],
   *    [ "selector", "one" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "a banana" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n  " ],
   *    [ "selector", "other" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "syntax", "#" ],
   *    [ "text", " bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n" ],
   *    [ "syntax", "}" ],
   *    [ "text", " for sale." ]
   *  ]
   **/
  exports = module.exports = function parse (
    pattern/*: string */,
    options/*:: ?: { tagsType?: string, tokens?: Token[] } */
  )/*: AST */ {
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: (options && options.tagsType) || null,
      tokens: (options && options.tokens) || null
    }, '')
  };

  function parseAST (current/*: Context */, parentType/*: string */)/*: AST */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var elements/*: AST */ = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text) elements.push(text);
    if (text && current.tokens) current.tokens.push([ 'text', pattern.slice(start, current.index) ]);
    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType) throw expected(current)
        break
      }
      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text) elements.push(text);
      if (text && current.tokens) current.tokens.push([ 'text', pattern.slice(start, current.index) ]);
    }
    return elements
  }

  function parseText (current/*: Context */, parentType/*: string */)/*: string */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = (parentType === 'plural' || parentType === 'selectordinal');
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = (parentType === '{style}');
    var text = '';
    while (current.index < length) {
      var char = pattern[current.index];
      if (
        char === ARG_OPN || char === ARG_CLS ||
        (isHashSpecial && char === NUM_ARG) ||
        (isAngleSpecial && char === TAG_OPN) ||
        (isArgStyle && isWhitespace(char.charCodeAt(0)))
      ) {
        break
      } else if (char === ESC) {
        char = pattern[++current.index];
        if (char === ESC) { // double is always 1 '
          text += char;
          ++current.index;
        } else if (
          // only when necessary
          char === ARG_OPN || char === ARG_CLS ||
          (isHashSpecial && char === NUM_ARG) ||
          (isAngleSpecial && char === TAG_OPN) ||
          isArgStyle
        ) {
          text += char;
          while (++current.index < length) {
            char = pattern[current.index];
            if (char === ESC && pattern[current.index + 1] === ESC) { // double is always 1 '
              text += ESC;
              ++current.index;
            } else if (char === ESC) { // end of quoted
              ++current.index;
              break
            } else {
              text += char;
            }
          }
        } else { // lone ' is just a '
          text += ESC;
          // already incremented
        }
      } else {
        text += char;
        ++current.index;
      }
    }
    return text
  }

  function isWhitespace (code/*: number */)/*: boolean */ {
    return (
      (code >= 0x09 && code <= 0x0D) ||
      code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E ||
      (code >= 0x2000 && code <= 0x200D) ||
      code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F ||
      code === 0x2060 || code === 0x3000 || code === 0xFEFF
    )
  }

  function skipWhitespace (current/*: Context */)/*: void */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;
    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }
    if (start < current.index && current.tokens) {
      current.tokens.push([ 'space', current.pattern.slice(start, current.index) ]);
    }
  }

  function parsePlaceholder (current/*: Context */)/*: Placeholder */ {
    var pattern = current.pattern;
    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens) current.tokens.push([ 'syntax', NUM_ARG ]);
      ++current.index; // move passed #
      return [ NUM_ARG ]
    }

    var tag = parseTag(current);
    if (tag) return tag

    /* istanbul ignore if should be unreachable if parseAST and parseText are right */
    if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN)
    if (current.tokens) current.tokens.push([ 'syntax', ARG_OPN ]);
    ++current.index; // move passed {
    skipWhitespace(current);

    var id = parseId(current);
    if (!id) throw expected(current, 'placeholder id')
    if (current.tokens) current.tokens.push([ 'id', id ]);
    skipWhitespace(current);

    var char = pattern[current.index];
    if (char === ARG_CLS) { // end placeholder
      if (current.tokens) current.tokens.push([ 'syntax', ARG_CLS ]);
      ++current.index; // move passed }
      return [ id ]
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', ARG_SEP ]);
    ++current.index; // move passed ,
    skipWhitespace(current);

    var type = parseId(current);
    if (!type) throw expected(current, 'placeholder type')
    if (current.tokens) current.tokens.push([ 'type', type ]);
    skipWhitespace(current);
    char = pattern[current.index];
    if (char === ARG_CLS) { // end placeholder
      if (current.tokens) current.tokens.push([ 'syntax', ARG_CLS ]);
      if (type === 'plural' || type === 'selectordinal' || type === 'select') {
        throw expected(current, type + ' sub-messages')
      }
      ++current.index; // move passed }
      return [ id, type ]
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', ARG_SEP ]);
    ++current.index; // move passed ,
    skipWhitespace(current);

    var arg;
    if (type === 'plural' || type === 'selectordinal') {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [ id, type, offset, parseSubMessages(current, type) ];
    } else if (type === 'select') {
      arg = [ id, type, parseSubMessages(current, type) ];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [ id, type, parseSimpleFormat(current) ];
    } else { // custom placeholder type
      var index = current.index;
      var format/*: string | SubMessages */ = parseSimpleFormat(current);
      skipWhitespace(current);
      if (pattern[current.index] === ARG_OPN) {
        current.index = index; // rewind, since should have been submessages
        format = parseSubMessages(current, type);
      }
      arg = [ id, type, format ];
    }

    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', ARG_CLS ]);
    ++current.index; // move passed }
    return arg
  }

  function parseTag (current/*: Context */)/*: ?Placeholder */ {
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN) return

    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, 'closing tag without matching opening tag')
    }
    if (current.tokens) current.tokens.push([ 'syntax', TAG_OPN ]);
    ++current.index; // move passed <

    var id = parseId(current, true);
    if (!id) throw expected(current, 'placeholder id')
    if (current.tokens) current.tokens.push([ 'id', id ]);
    skipWhitespace(current);

    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens) current.tokens.push([ 'syntax', TAG_SELF_CLS ]);
      current.index += TAG_SELF_CLS.length;
      return [ id, tagsType ]
    }
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', TAG_CLS ]);
    ++current.index; // move passed >

    var children = parseAST(current, tagsType);

    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', TAG_END ]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens) current.tokens.push([ 'id', closeId ]);
    if (id !== closeId) {
      current.index = end; // rewind for better error message
      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS)
    }
    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS)
    if (current.tokens) current.tokens.push([ 'syntax', TAG_CLS ]);
    ++current.index; // move passed >

    return [ id, tagsType, { children: children } ]
  }

  function parseId (current/*: Context */, isTag/*:: ?: boolean */)/*: string */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var id = '';
    while (current.index < length) {
      var char = pattern[current.index];
      if (
        char === ARG_OPN || char === ARG_CLS || char === ARG_SEP ||
        char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) ||
        (isTag && (char === TAG_OPN || char === TAG_CLS || char === '/'))
      ) break
      id += char;
      ++current.index;
    }
    return id
  }

  function parseSimpleFormat (current/*: Context */)/*: string */ {
    var start = current.index;
    var style = parseText(current, '{style}');
    if (!style) throw expected(current, 'placeholder style name')
    if (current.tokens) current.tokens.push([ 'style', current.pattern.slice(start, current.index) ]);
    return style
  }

  function parsePluralOffset (current/*: Context */)/*: number */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;
    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens) current.tokens.push([ 'offset', 'offset' ], [ 'syntax', ':' ]);
      current.index += OFFSET.length; // move passed offset:
      skipWhitespace(current);
      var start = current.index;
      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }
      if (start === current.index) throw expected(current, 'offset number')
      if (current.tokens) current.tokens.push([ 'number', pattern.slice(start, current.index) ]);
      offset = +pattern.slice(start, current.index);
    }
    return offset
  }

  function isDigit (code/*: number */)/*: boolean */ {
    return (code >= 0x30 && code <= 0x39)
  }

  function parseSubMessages (current/*: Context */, parentType/*: string */)/*: SubMessages */ {
    var pattern = current.pattern;
    var length = pattern.length;
    var options/*: SubMessages */ = {};
    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector) throw expected(current, 'sub-message selector')
      if (current.tokens) current.tokens.push([ 'selector', selector ]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }
    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType)
    }
    return options
  }

  function parseSubMessage (current/*: Context */, parentType/*: string */)/*: AST */ {
    if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message')
    if (current.tokens) current.tokens.push([ 'syntax', ARG_OPN ]);
    ++current.index; // move passed {
    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message')
    if (current.tokens) current.tokens.push([ 'syntax', ARG_CLS ]);
    ++current.index; // move passed }
    return message
  }

  function expected (current/*: Context */, expected/*:: ?: ?string */, found/*:: ?: ?string */, message/*:: ?: string */) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (
      (current.index >= pattern.length) ? 'end of message pattern'
        : (parseId(current) || pattern[current.index])
    );
    if (!message) message = errorMessage(expected, found);
    message += ' in ' + pattern.replace(/\r?\n/g, '\n');
    return new SyntaxError(message, expected, found, offset, line, column)
  }

  function errorMessage (expected/*: ?string */, found/* string */) {
    if (!expected) return 'Unexpected ' + found + ' found'
    return 'Expected ' + expected + ' but found ' + found
  }

  /**
   * SyntaxError
   *  Holds information about bad syntax found in a message pattern
   **/
  function SyntaxError (message/*: string */, expected/*: ?string */, found/*: ?string */, offset/*: number */, line/*: number */, column/*: number */) {
    Error.call(this, message);
    this.name = 'SyntaxError';
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }
  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
  });
  formatMessageParse.SyntaxError;

  var supportedExp = new RegExp(
    '^(' + Object.keys(plurals).join('|') + ')\\b'
  );

  /*::
  import type { Types } from 'format-message-interpret'
  import type { AST } from 'format-message-parse'
  type Options = {
    types: Types
  }
  type Internals = {
    ast: AST,
    format: (args?: Object) => string,
    locale: string,
    locales?: string | string[],
    toParts?: (args?: Object) => any[],
    options?: Options
  }
  */

  var internals/*: WeakMap<MessageFormat, Internals> */ = new WeakMap();

  /*!
   * Intl.MessageFormat prollyfill
   * Copyright(c) 2015 Andy VanWagoner
   * MIT licensed
   **/
  function MessageFormat (
    pattern/*: string */,
    locales/*:: ?: string | string[] */,
    options/*:: ?: Options */
  ) {
    if (!(this instanceof MessageFormat) || internals.has(this)) {
      throw new TypeError('calling MessageFormat constructor without new is invalid')
    }
    var ast = formatMessageParse(pattern);
    internals.set(this, {
      ast: ast,
      format: formatMessageInterpret(ast, locales, options && options.types),
      locale: MessageFormat.supportedLocalesOf(locales)[0] || 'en',
      locales: locales,
      options: options
    });
  }
  var messageFormat = MessageFormat;

  // $FlowFixMe It thinks `value` needs to be defined for format
  Object.defineProperties(MessageFormat.prototype, {
    format: {
      configurable: true,
      get: function format () {
        var values = internals.get(this);
        if (!values) throw new TypeError('MessageFormat.prototype.format called on value that\'s not an object initialized as a MessageFormat')
        return values.format
      }
    },
    formatToParts: {
      configurable: true,
      writable: true,
      value: function formatToParts (args/*:: ?: Object */) {
        var values = internals.get(this);
        if (!values) throw new TypeError('MessageFormat.prototype.formatToParts called on value that\'s not an object initialized as a MessageFormat')
        var frmt = values.toParts || (values.toParts = formatMessageInterpret.toParts(
          values.ast,
          values.locales,
          values.options && values.options.types
        ));
        return frmt(args)
      }
    },
    resolvedOptions: {
      configurable: true,
      writable: true,
      value: function resolvedOptions () {
        var values = internals.get(this);
        if (!values) throw new TypeError('MessageFormat.prototype.resolvedOptions called on value that\'s not an object initialized as a MessageFormat')
        return {
          locale: values.locale
        }
      }
    }
  });

  /* istanbul ignore else */
  if (typeof Symbol !== 'undefined') {
    Object.defineProperty(MessageFormat.prototype, Symbol.toStringTag, { value: 'Object' });
  }

  Object.defineProperties(MessageFormat, {
    supportedLocalesOf: {
      configurable: true,
      writable: true,
      value: function supportedLocalesOf (requestedLocales/*:: ?: string | string[] */) {
        return [].concat(
          Intl.NumberFormat.supportedLocalesOf(requestedLocales),
          Intl.DateTimeFormat.supportedLocalesOf(requestedLocales),
          Intl.PluralRules ? Intl.PluralRules.supportedLocalesOf(requestedLocales) : [],
          [].concat(requestedLocales || []).filter(function (locale) {
            return supportedExp.test(locale)
          })
        ).filter(function (v, i, a) { return a.indexOf(v) === i })
      }
    }
  });

  /**
   * @param {Object.<string, Object>} obj
   * @returns {boolean}
   */
  function isLocalizeESModule(obj) {
    return !!(obj && obj.default && typeof obj.default === 'object' && Object.keys(obj).length === 1);
  }

  // @ts-expect-error [external]: no types for this package

  /**
   * @typedef {import('../types/LocalizeMixinTypes').NamespaceObject} NamespaceObject
   */

  /** @typedef {import('../types/LocalizeMixinTypes').DatePostProcessor} DatePostProcessor */
  /** @typedef {import('../types/LocalizeMixinTypes').NumberPostProcessor} NumberPostProcessor */

  /**
   * `LocalizeManager` manages your translations (includes loading)
   */
  class LocalizeManager {
    // eslint-disable-line no-unused-vars
    constructor({
      autoLoadOnLocaleChange = false,
      fallbackLocale = '',
      showKeyAsFallback = false,
    } = {}) {
      /** @private */
      this.__delegationTarget = document.createDocumentFragment();
      /** @protected */
      this._autoLoadOnLocaleChange = !!autoLoadOnLocaleChange;
      /** @protected */
      this._fallbackLocale = fallbackLocale;
      /** @protected */
      this._showKeyAsFallback = showKeyAsFallback;

      /**
       * @type {Object.<string, Object.<string, Object>>}
       * @private
       */
      this.__storage = {};

      /**
       * @type {Map.<RegExp|string, function>}
       * @private
       */
      this.__namespacePatternsMap = new Map();

      /**
       * @type {Object.<string, function|null>}
       * @private
       */
      this.__namespaceLoadersCache = {};

      /**
       * @type {Object.<string, Object.<string, Promise.<Object|void>>>}
       * @private
       */
      this.__namespaceLoaderPromisesCache = {};

      this.formatNumberOptions = {
        returnIfNaN: '',
        /** @type {Map<string,DatePostProcessor>} */
        postProcessors: new Map(),
      };

      this.formatDateOptions = {
        /** @type {Map<string,DatePostProcessor>} */
        postProcessors: new Map(),
      };

      /**
       * Via html[data-localize-lang], developers are allowed to set the initial locale, without
       * having to worry about whether locale is initialized before 3rd parties like Google Translate.
       * When this value differs from html[lang], we assume the 3rd party took
       * control over the page language and we set this._langAttrSetByTranslationTool to html[lang]
       */
      const initialLocale = document.documentElement.getAttribute('data-localize-lang');

      /** @protected */
      this._supportExternalTranslationTools = Boolean(initialLocale);

      if (this._supportExternalTranslationTools) {
        this.locale = initialLocale || 'en-GB';
        this._setupTranslationToolSupport();
      }

      if (!document.documentElement.lang) {
        document.documentElement.lang = this.locale || 'en-GB';
      }

      /** @protected */
      this._setupHtmlLangAttributeObserver();
    }

    /** @protected */
    _setupTranslationToolSupport() {
      /**
       * This value allows for support for Google Translate (or other 3rd parties taking control
       * of the html[lang] attribute).
       *
       * Have the following scenario in mind:
       * 1. locale is initialized by developer via html[data-localize-lang="en-US"] and
       * html[lang="en-US"]. When localize is loaded (note that this also can be after step 2 below),
       * it will sync its initial state from html[data-localize-lang]
       * 2. Google Translate kicks in for the French language. It will set html[lang="fr"].
       * This new language is not one known by us, so we most likely don't have translations for
       * this file. Therefore, we do NOT sync this value to LocalizeManager. The manager should
       * still ask for known resources (in this case for locale 'en-US')
       * 3. locale is changed (think of a language dropdown)
       * It's a bit of a weird case, because we would not expect an end user to do this. If he/she
       * does, make sure that we do not go against Google Translate, so we maintain accessibility
       * (by not altering html[lang]). We detect this by reading _langAttrSetByTranslationTool:
       * when its value is null, we consider Google translate 'not active'.
       *
       * When Google Translate is turned off by the user (html[lang=auto]),
       * `localize.locale` will be synced to html[lang] again
       *
       * Keep in mind that all of the above also works with other tools than Google Translate,
       * but this is the most widely used tool and therefore used as an example.
       */
      this._langAttrSetByTranslationTool = document.documentElement.lang || null;
    }

    teardown() {
      this._teardownHtmlLangAttributeObserver();
    }

    /**
     * @returns {string}
     */
    get locale() {
      if (this._supportExternalTranslationTools) {
        return this.__locale || '';
      }
      return document.documentElement.lang;
    }

    /**
     * @param {string} value
     */
    set locale(value) {
      /** @type {string} */
      let oldLocale;
      if (this._supportExternalTranslationTools) {
        oldLocale = /** @type {string} */ (this.__locale);
        this.__locale = value;
        if (this._langAttrSetByTranslationTool === null) {
          this._setHtmlLangAttribute(value);
        }
      } else {
        oldLocale = document.documentElement.lang;
        this._setHtmlLangAttribute(value);
      }

      if (!value.includes('-')) {
        this.__handleLanguageOnly(value);
      }

      this._onLocaleChanged(value, oldLocale);
    }

    /**
     * @param {string} locale
     * @protected
     */
    _setHtmlLangAttribute(locale) {
      this._teardownHtmlLangAttributeObserver();
      document.documentElement.lang = locale;
      this._setupHtmlLangAttributeObserver();
    }

    /**
     * @param {string} value
     * @throws {Error} Language only locales are not allowed(Use 'en-GB' instead of 'en')
     * @private
     */
    // eslint-disable-next-line class-methods-use-this
    __handleLanguageOnly(value) {
      throw new Error(`
      Locale was set to ${value}.
      Language only locales are not allowed, please use the full language locale e.g. 'en-GB' instead of 'en'.
      See https://github.com/ing-bank/lion/issues/187 for more information.
    `);
    }

    /**
     * @returns {Promise.<Object|void>}
     */
    get loadingComplete() {
      if (typeof this.__namespaceLoaderPromisesCache[this.locale] === 'object') {
        return Promise.all(Object.values(this.__namespaceLoaderPromisesCache[this.locale]));
      }
      return Promise.resolve();
    }

    reset() {
      this.__storage = {};
      this.__namespacePatternsMap = new Map();
      this.__namespaceLoadersCache = {};
      this.__namespaceLoaderPromisesCache = {};
    }

    /**
     * @param {string} locale
     * @param {string} namespace
     * @param {object} data
     * @throws {Error} Namespace can be added only once, for a given locale
     */
    addData(locale, namespace, data) {
      if (this._isNamespaceInCache(locale, namespace)) {
        throw new Error(
          `Namespace "${namespace}" has been already added for the locale "${locale}".`,
        );
      }

      this.__storage[locale] = this.__storage[locale] || {};
      this.__storage[locale][namespace] = data;
    }

    /**
     * @param {RegExp|string} pattern
     * @param {function} loader
     */
    setupNamespaceLoader(pattern, loader) {
      this.__namespacePatternsMap.set(pattern, loader);
    }

    /**
     * @param {NamespaceObject[]} namespaces
     * @param {Object} [options]
     * @param {string} [options.locale]
     * @returns {Promise.<Object>}
     */
    loadNamespaces(namespaces, { locale } = {}) {
      return Promise.all(
        namespaces.map(
          /** @param {NamespaceObject} namespace */
          namespace => this.loadNamespace(namespace, { locale }),
        ),
      );
    }

    /**
     * @param {NamespaceObject} namespaceObj
     * @param {Object} [options]
     * @param {string} [options.locale]
     * @returns {Promise.<Object|void>}
     */
    loadNamespace(namespaceObj, { locale = this.locale } = { locale: this.locale }) {
      const isDynamicImport = typeof namespaceObj === 'object';

      const namespace = /** @type {string} */ (
        isDynamicImport ? Object.keys(namespaceObj)[0] : namespaceObj
      );

      if (this._isNamespaceInCache(locale, namespace)) {
        return Promise.resolve();
      }

      const existingLoaderPromise = this._getCachedNamespaceLoaderPromise(locale, namespace);
      if (existingLoaderPromise) {
        return existingLoaderPromise;
      }

      return this._loadNamespaceData(locale, namespaceObj, isDynamicImport, namespace);
    }

    /**
     * @param {string | string[]} keys
     * @param {Object.<string,?>} [vars]
     * @param {Object} [opts]
     * @param {string} [opts.locale]
     * @returns {string}
     */
    msg(keys, vars, opts = {}) {
      const locale = opts.locale ? opts.locale : this.locale;
      const message = this._getMessageForKeys(keys, locale);
      if (!message) {
        return '';
      }
      const formatter = new messageFormat(message, locale);
      return formatter.format(vars);
    }

    /** @protected */
    _setupHtmlLangAttributeObserver() {
      if (!this._htmlLangAttributeObserver) {
        this._htmlLangAttributeObserver = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (this._supportExternalTranslationTools) {
              if (document.documentElement.lang === 'auto') {
                // Google Translate is switched off
                this._langAttrSetByTranslationTool = null;
                this._setHtmlLangAttribute(this.locale);
              } else {
                this._langAttrSetByTranslationTool = document.documentElement.lang;
              }
            } else {
              this._onLocaleChanged(document.documentElement.lang, mutation.oldValue || '');
            }
          });
        });
      }
      this._htmlLangAttributeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang'],
        attributeOldValue: true,
      });
    }

    /** @protected */
    _teardownHtmlLangAttributeObserver() {
      if (this._htmlLangAttributeObserver) {
        this._htmlLangAttributeObserver.disconnect();
      }
    }

    /**
     * @param {string} locale
     * @param {string} namespace
     * @protected
     */
    _isNamespaceInCache(locale, namespace) {
      return !!(this.__storage[locale] && this.__storage[locale][namespace]);
    }

    /**
     * @param {string} locale
     * @param {string} namespace
     * @protected
     */
    _getCachedNamespaceLoaderPromise(locale, namespace) {
      if (this.__namespaceLoaderPromisesCache[locale]) {
        return this.__namespaceLoaderPromisesCache[locale][namespace];
      }
      return null;
    }

    /**
     * @param {string} locale
     * @param {NamespaceObject} namespaceObj
     * @param {boolean} isDynamicImport
     * @param {string} namespace
     * @returns {Promise.<Object|void>}
     * @protected
     */
    _loadNamespaceData(locale, namespaceObj, isDynamicImport, namespace) {
      const loader = this._getNamespaceLoader(namespaceObj, isDynamicImport, namespace);
      const loaderPromise = this._getNamespaceLoaderPromise(loader, locale, namespace);
      this._cacheNamespaceLoaderPromise(locale, namespace, loaderPromise);
      return loaderPromise.then(
        /**
         * @param {Object} obj
         * @param {Object} obj.default
         */
        obj => {
          // add data only if we have the promise in cache
          if (
            this.__namespaceLoaderPromisesCache[locale] &&
            this.__namespaceLoaderPromisesCache[locale][namespace] === loaderPromise
          ) {
            const data = isLocalizeESModule(obj) ? obj.default : obj;
            this.addData(locale, namespace, data);
          }
        },
      );
    }

    /**
     * @param {NamespaceObject} namespaceObj
     * @param {boolean} isDynamicImport
     * @param {string} namespace
     * @throws {Error} Namespace shall setup properly. Check loader!
     * @protected
     */
    _getNamespaceLoader(namespaceObj, isDynamicImport, namespace) {
      let loader = this.__namespaceLoadersCache[namespace];
      if (!loader) {
        if (isDynamicImport) {
          const _namespaceObj = /** @type {Object.<string,function>} */ (namespaceObj);
          loader = _namespaceObj[namespace];
          this.__namespaceLoadersCache[namespace] = loader;
        } else {
          loader = this._lookupNamespaceLoader(namespace);
          this.__namespaceLoadersCache[namespace] = loader;
        }
      }

      if (!loader) {
        throw new Error(`Namespace "${namespace}" was not properly setup.`);
      }

      this.__namespaceLoadersCache[namespace] = loader;

      return loader;
    }

    /**
     * @param {function} loader
     * @param {string} locale
     * @param {string} namespace
     * @param {string} [fallbackLocale]
     * @returns {Promise.<any>}
     * @throws {Error} Data for namespace and (locale or fallback locale) could not be loaded.
     * @protected
     */
    _getNamespaceLoaderPromise(loader, locale, namespace, fallbackLocale = this._fallbackLocale) {
      return loader(locale, namespace).catch(() => {
        const lang = this._getLangFromLocale(locale);
        return loader(lang, namespace).catch(() => {
          if (fallbackLocale) {
            return this._getNamespaceLoaderPromise(loader, fallbackLocale, namespace, '').catch(
              () => {
                const fallbackLang = this._getLangFromLocale(fallbackLocale);
                throw new Error(
                  `Data for namespace "${namespace}" and current locale "${locale}" or fallback locale "${fallbackLocale}" could not be loaded. ` +
                    `Make sure you have data either for locale "${locale}" (and/or generic language "${lang}") or for fallback "${fallbackLocale}" (and/or "${fallbackLang}").`,
                );
              },
            );
          }
          throw new Error(
            `Data for namespace "${namespace}" and locale "${locale}" could not be loaded. ` +
              `Make sure you have data for locale "${locale}" (and/or generic language "${lang}").`,
          );
        });
      });
    }

    /**
     * @param {string} locale
     * @param {string} namespace
     * @param {Promise.<Object|void>} promise
     * @protected
     */
    _cacheNamespaceLoaderPromise(locale, namespace, promise) {
      if (!this.__namespaceLoaderPromisesCache[locale]) {
        this.__namespaceLoaderPromisesCache[locale] = {};
      }
      this.__namespaceLoaderPromisesCache[locale][namespace] = promise;
    }

    /**
     * @param {string} namespace
     * @returns {function|null}
     * @protected
     */
    _lookupNamespaceLoader(namespace) {
      /* eslint-disable no-restricted-syntax */
      for (const [key, value] of this.__namespacePatternsMap) {
        const isMatchingString = typeof key === 'string' && key === namespace;
        const isMatchingRegexp =
          typeof key === 'object' && key.constructor.name === 'RegExp' && key.test(namespace);
        if (isMatchingString || isMatchingRegexp) {
          return value;
        }
      }
      return null;
      /* eslint-enable no-restricted-syntax */
    }

    /**
     * @param {string} locale
     * @returns {string}
     * @protected
     */
    // eslint-disable-next-line class-methods-use-this
    _getLangFromLocale(locale) {
      return locale.substring(0, 2);
    }

    /**
     * @param {string} type
     * @param {EventListener} listener
     * @param {...Object} options
     */
    addEventListener(type, listener, ...options) {
      this.__delegationTarget.addEventListener(type, listener, ...options);
    }

    /**
     * @param {string} type
     * @param {EventListener} listener
     * @param {...Object} options
     */
    removeEventListener(type, listener, ...options) {
      this.__delegationTarget.removeEventListener(type, listener, ...options);
    }

    /**
     *  @param {CustomEvent} event
     */
    dispatchEvent(event) {
      this.__delegationTarget.dispatchEvent(event);
    }

    /**
     * @param {string} newLocale
     * @param {string} oldLocale
     * @returns {undefined}
     * @protected
     */
    _onLocaleChanged(newLocale, oldLocale) {
      // Event firing immediately, does not wait for loading the translations
      this.dispatchEvent(new CustomEvent('__localeChanging'));
      if (newLocale === oldLocale) {
        return;
      }
      if (this._autoLoadOnLocaleChange) {
        this._loadAllMissing(newLocale, oldLocale);
        this.loadingComplete.then(() => {
          this.dispatchEvent(new CustomEvent('localeChanged', { detail: { newLocale, oldLocale } }));
        });
      } else {
        this.dispatchEvent(new CustomEvent('localeChanged', { detail: { newLocale, oldLocale } }));
      }
    }

    /**
     * @param {string} newLocale
     * @param {string} oldLocale
     * @protected
     */
    _loadAllMissing(newLocale, oldLocale) {
      const oldLocaleNamespaces = this.__storage[oldLocale] || {};
      const newLocaleNamespaces = this.__storage[newLocale] || {};
      Object.keys(oldLocaleNamespaces).forEach(namespace => {
        const newNamespaceData = newLocaleNamespaces[namespace];
        if (!newNamespaceData) {
          this.loadNamespace(namespace, {
            locale: newLocale,
          });
        }
      });
    }

    /**
     * @param {string | string[]} keys
     * @param {string} locale
     * @returns {string | undefined}
     * @protected
     */
    _getMessageForKeys(keys, locale) {
      if (typeof keys === 'string') {
        return this._getMessageForKey(keys, locale);
      }
      const reversedKeys = Array.from(keys).reverse(); // Array.from prevents mutation of argument
      let key;
      let message;
      while (reversedKeys.length) {
        key = reversedKeys.pop();
        message = this._getMessageForKey(key, locale);
        if (message) {
          return message;
        }
      }
      return undefined;
    }

    /**
     * @param {string | undefined} key
     * @param {string} locale
     * @returns {string}
     * @throws {Error} `key`is missing namespace. The format for `key` is "namespace:name"
     * @protected
     *
     */
    _getMessageForKey(key, locale) {
      if (!key || key.indexOf(':') === -1) {
        throw new Error(
          `Namespace is missing in the key "${key}". The format for keys is "namespace:name".`,
        );
      }
      const [ns, namesString] = key.split(':');
      const namespaces = this.__storage[locale];
      const messages = namespaces ? namespaces[ns] : {};
      const names = namesString.split('.');
      const result = names.reduce(
        /**
         * @param {Object.<string, any> | string} message
         * @param {string} name
         * @returns {string}
         */
        (message, name) => (typeof message === 'object' ? message[name] : message),
        messages,
      );

      return String(result || (this._showKeyAsFallback ? key : ''));
    }

    /**
     * @param {{locale:string, postProcessor:DatePostProcessor}} options
     */
    setDatePostProcessorForLocale({ locale, postProcessor }) {
      this.formatDateOptions.postProcessors.set(locale, postProcessor);
    }

    /**
     * @param {{locale:string, postProcessor:NumberPostProcessor}} options
     */
    setNumberPostProcessorForLocale({ locale, postProcessor }) {
      this.formatNumberOptions.postProcessors.set(locale, postProcessor);
    }
  }

  /** @type {LocalizeManager} */
  // eslint-disable-next-line import/no-mutable-exports
  let localize =
    singletonManager.get('@lion/localize::localize::0.10.x') ||
    new LocalizeManager({
      autoLoadOnLocaleChange: true,
      fallbackLocale: 'en-GB',
    });

  // TODO: still needed? It can be solved with while loop as well

  /**
   * Use the `.add` method to add async functions to the queue
   * Await the `.complete` if you want to ensure the queue is empty at any point
   * `complete` resolves whenever no more tasks are running.
   * Important note: Currently runs tasks 1 by 1, there is no concurrency option at the moment
   */
  class AsyncQueue {
    constructor() {
      this.__running = false;
      /** @type {function[]} */
      this.__queue = [];
    }

    /**
     *
     * @param {function} task
     */
    add(task) {
      this.__queue.push(task);
      if (!this.__running) {
        // We have a new queue, because before there was nothing in the queue
        this.complete = new Promise(resolve => {
          /** @type {function} */
          this.__callComplete = resolve;
        });
        this.__run();
      }
    }

    /** @private */
    async __run() {
      this.__running = true;
      await this.__queue[0]();
      this.__queue.shift();
      if (this.__queue.length > 0) {
        this.__run();
      } else {
        this.__running = false;
        if (this.__callComplete) {
          this.__callComplete();
        }
      }
    }
  }

  /**
   * Return PascalCased version of the camelCased string
   *
   * @param {string} str
   * @return {string}
   */
  function pascalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // TODO: will be moved to @Lion/core later?

  /**
   * @typedef {import('../../types/utils/SyncUpdatableMixinTypes').SyncUpdatableMixin} SyncUpdatableMixin
   * @typedef {import('../../types/utils/SyncUpdatableMixinTypes').SyncUpdatableNamespace} SyncUpdatableNamespace
   */

  /**
   * Why this mixin?
   * - it adheres to the "Member Order Independence" web components standard:
   * https://github.com/webcomponents/gold-standard/wiki/Member-Order-Independence
   * - sync observers can be dependent on the outcome of the render function (or, more generically
   * speaking, the light and shadow dom). This aligns with the 'updated' callback that is supported
   * out of the box by LitElement, which runs after connectedCallback as well.
   * - makes the propertyAccessor.`hasChanged` compatible in synchronous updates:
   * `updateSync` will only be called when new value differs from old value.
   * See: https://lit-element.polymer-project.org/guide/lifecycle#haschanged
   * - it is a stable abstraction on top of a protected/non official lifecycle LitElement api.
   * Whenever the implementation of `requestUpdate` changes (this happened in the past for
   * `requestUpdate`) we only have to change our abstraction instead of all our components
   * @type {SyncUpdatableMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const SyncUpdatableMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends superclass {
      constructor() {
        super();

        /**
         * Namespace for this mixin that guarantees naming clashes will not occur...
         * @type {SyncUpdatableNamespace}
         */
        this.__SyncUpdatableNamespace = {};
      }

      /**
       * Empty pending queue in order to guarantee order independence
       *
       * @param {import('lit-element').PropertyValues } changedProperties
       */
      firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.__syncUpdatableInitialize();
      }

      connectedCallback() {
        super.connectedCallback();
        this.__SyncUpdatableNamespace.connected = true;
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.__SyncUpdatableNamespace.connected = false;
      }

      /**
       * Makes the propertyAccessor.`hasChanged` compatible in synchronous updates
       * @param {string} name
       * @param {*} newValue
       * @param {*} oldValue
       * @private
       */
      static __syncUpdatableHasChanged(name, newValue, oldValue) {
        // @ts-expect-error [external]: accessing private lit property
        const properties = this.elementProperties;
        if (properties.get(name) && properties.get(name).hasChanged) {
          return properties.get(name).hasChanged(newValue, oldValue);
        }
        return newValue !== oldValue;
      }

      /** @private */
      __syncUpdatableInitialize() {
        const ns = this.__SyncUpdatableNamespace;
        const ctor =
          /** @type {typeof SyncUpdatableMixin & typeof import('../../types/utils/SyncUpdatableMixinTypes').SyncUpdatableHost} */ (
            this.constructor
          );

        ns.initialized = true;
        // Empty queue...
        if (ns.queue) {
          Array.from(ns.queue).forEach(name => {
            // @ts-ignore [allow-private] in test
            if (ctor.__syncUpdatableHasChanged(name, this[name], undefined)) {
              this.updateSync(name, undefined);
            }
          });
        }
      }

      /**
       * @param {string} name
       * @param {*} oldValue
       */
      requestUpdate(name, oldValue) {
        super.requestUpdate(name, oldValue);

        this.__SyncUpdatableNamespace = this.__SyncUpdatableNamespace || {};
        const ns = this.__SyncUpdatableNamespace;

        const ctor =
          /** @type {typeof SyncUpdatableMixin & typeof import('../../types/utils/SyncUpdatableMixinTypes').SyncUpdatableHost} */ (
            this.constructor
          );
        // Before connectedCallback: queue
        if (!ns.initialized) {
          ns.queue = ns.queue || new Set();
          // Makes sure that we only initialize one time, with most up to date value
          ns.queue.add(name);
        } // After connectedCallback: guarded proxy to updateSync
        // @ts-ignore [allow-private] in test
        else if (ctor.__syncUpdatableHasChanged(name, this[name], oldValue)) {
          this.updateSync(name, oldValue);
        }
      }

      /**
       * An abstraction that has the exact same api as `requestUpdate`, but taking
       * into account:
       * - [member order independence](https://github.com/webcomponents/gold-standard/wiki/Member-Order-Independence)
       * - property effects start when all (light) dom has initialized (on firstUpdated)
       * - property effects don't interrupt the first meaningful paint
       * - compatible with propertyAccessor.`hasChanged`: no manual checks needed or accidentally
       * run property effects / events when no change happened
       * effects when values didn't change
       * All code previously present in requestUpdate can be placed in this method.
       * @param {string} name
       * @param {*} oldValue
       */
      updateSync(name, oldValue) {} // eslint-disable-line class-methods-use-this, no-unused-vars
    };

  const SyncUpdatableMixin = dedupeMixin(SyncUpdatableMixinImplementation);

  /**
   * @typedef {import('../validate/Validator').Validator} Validator
   * @typedef {import('@lion/core').TemplateResult} TemplateResult
   * @typedef {Object} messageMap
   * @property {string | Node} message
   * @property {string} type
   * @property {Validator} [validator]
   */

  /**
   * @desc Takes care of accessible rendering of error messages
   * Should be used in conjunction with FormControl having ValidateMixin applied
   */
  class LionValidationFeedback extends s {
    static get properties() {
      return {
        feedbackData: { attribute: false },
      };
    }

    /**
     * @overridable
     * @param {Object} opts
     * @param {string | Node | TemplateResult } opts.message message or feedback node or TemplateResult
     * @param {string} [opts.type]
     * @param {Validator} [opts.validator]
     * @protected
     */
    // eslint-disable-next-line class-methods-use-this
    _messageTemplate({ message }) {
      return message;
    }

    /**
     * @param {import('@lion/core').PropertyValues } changedProperties
     */
    updated(changedProperties) {
      super.updated(changedProperties);
      if (this.feedbackData && this.feedbackData[0]) {
        this.setAttribute('type', this.feedbackData[0].type);
        this.currentType = this.feedbackData[0].type;
        window.clearTimeout(this.removeMessage);
        // TODO: this logic should be in ValidateMixin, so that [show-feedback-for] is in sync,
        // plus duration should be configurable
        if (this.currentType === 'success') {
          this.removeMessage = window.setTimeout(() => {
            this.removeAttribute('type');
            /** @type {messageMap[]} */
            this.feedbackData = [];
          }, 3000);
        }
      } else if (this.currentType !== 'success') {
        this.removeAttribute('type');
      }
    }

    render() {
      return x`
      ${this.feedbackData &&
      this.feedbackData.map(
        ({ message, type, validator }) => x`
          ${this._messageTemplate({ message, type, validator })}
        `,
      )}
    `;
    }
  }

  /**
   * @typedef {import('../../types/validate').FeedbackMessageData} FeedbackMessageData
   * @typedef {import('../../types/validate').ValidatorParam} ValidatorParam
   * @typedef {import('../../types/validate').ValidatorConfig} ValidatorConfig
   * @typedef {import('../../types/validate').ValidatorOutcome} ValidatorOutcome
   * @typedef {import('../../types/validate').ValidatorName} ValidatorName
   * @typedef {import('../../types/validate').ValidationType} ValidationType
   * @typedef {import('../FormControlMixin').FormControlHost} FormControlHost
   */

  // TODO: support attribute validators like <my-el my-validator=${dynamicParam}></my-el> =>
  // register in a ValidateService that is read by Validator and adds these attrs in properties
  // object.
  // They would become like configurable
  // [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
  // for FormControls.

  class Validator extends EventTarget {
    /**
     * @param {ValidatorParam} [param]
     * @param {ValidatorConfig} [config]
     */
    constructor(param, config) {
      super();

      /** @type {ValidatorParam} */
      this.__param = param;
      /** @type {ValidatorConfig} */
      this.__config = config || {};
      /** @type {ValidationType} */
      this.type = config?.type || 'error'; // Default type supported by ValidateMixin
    }

    /**
     * The name under which validation results get registered. For convience and predictability, this
     * should always be the same as the constructor name (since it will be obfuscated in js builds,
     * we need to provide it separately).
     * @type {ValidatorName}
     */
    static validatorName = '';

    /**
     * Whether the validator is asynchronous or not. When true., this means execute function returns
     * a Promise. This can be handy for:
     * - server side calls
     * - validations that are dependent on lazy loaded resources (they can be async until the dependency
     * is loaded)
     * @type {boolean}
     */
    static async = false;

    /**
     * The function that returns a validity outcome. When we need to show feedback,
     * it should return true, otherwise false. So when an error\info|warning|success message
     * needs to be shown, return true. For async Validators, the function can return a Promise.
     * It's also possible to return an enum. Let's say that a phone number can have multiple
     * states: 'invalid-country-code' | 'too-long' | 'too-short'
     * Those states can be retrieved in the getMessage
     * @param {any} modelValue
     * @param {ValidatorParam} [param]
     * @param {ValidatorConfig} [config]
     * @returns {ValidatorOutcome|Promise<ValidatorOutcome>}
     */
    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    execute(modelValue, param, config) {
      const ctor = /** @type {typeof Validator} */ (this.constructor);
      if (!ctor.validatorName) {
        throw new Error(
          'A validator needs to have a name! Please set it via "static get validatorName() { return \'IsCat\'; }"',
        );
      }
      return true;
    }

    /**
     * The first argument of the constructor, for instance 3 in `new MinLength(3)`. Will
     * be stored on Validator instance and passed to `execute` function
     * @example
     * ```js
     *  // Store reference to Validator instance
     *  const myValidatorInstance = new MyValidator(1);
     *  // Use this instance initially on a FormControl (that uses ValidateMixin)
     *  render(html`<validatable-element .validators="${[myValidatorInstance]}"></validatable-element>`, document.body);
     *  // Based on some event, we need to change the param
     *  myValidatorInstance.param = 2;
     * ```
     * @property {ValidatorParam}
     */
    set param(p) {
      this.__param = p;
      /**
       * This event is listened for by ValidateMixin. Whenever the validation parameter has
       * changed, the FormControl will revalidate itself
       */
      this.dispatchEvent(new Event('param-changed'));
    }

    get param() {
      return this.__param;
    }

    /**
     * The second argument of the constructor, for instance
     * `new MinLength(3, {getFeedMessage: async () => 'too long'})`.
     * Will be stored on Validator instance and passed to `execute` function.
     * @example
     * ```js
     *  // Store reference to Validator instance
     *  const myValidatorInstance = new MyValidator(1, {getMessage() => 'x'});
     *  // Use this instance initially on a FormControl (that uses ValidateMixin)
     *  render(html`<validatable-element .validators="${[myValidatorInstance]}"></validatable-element>`, document.body);
     *  // Based on some event, we need to change the param
     *  myValidatorInstance.config = {getMessage() => 'y'};
     * ```
     * @property {ValidatorConfig}
     */
    set config(c) {
      this.__config = c;
      /**
       * This event is listened for by ValidateMixin. Whenever the validation config has
       * changed, the FormControl will revalidate itself
       */
      this.dispatchEvent(new Event('config-changed'));
    }

    get config() {
      return this.__config;
    }

    /**
     * This is a protected method that usually should not be overridden. It is called by ValidateMixin
     * and it gathers data to be passed to getMessage functions found:
     * - `this.config.getMessage`, locally provided by consumers of the Validator (overrides global getMessage)
     * - `MyValidator.getMessage`, globally provided by creators or consumers of the Validator
     *
     * Confusion can arise because of similarities with former mentioned methods. In that regard, a
     * better name for this function would have been _pepareDataAndCallHighestPrioGetMessage.
     * @example
     * ```js
     * class MyValidator extends Validator {
     *   // ...
     *   // 1. globally defined
     *   static async getMessage() {
     *     return 'lowest prio, defined globally by Validator author'
     *   }
     * }
     * // 2. globally overridden
     * MyValidator.getMessage = async() => 'overrides already configured message';
     * // 3. locally overridden
     * new MyValidator(myParam, { getMessage: async() => 'locally defined, always wins' });
     * ```
     * @param {Partial<FeedbackMessageData>} [data]
     * @returns {Promise<string|Element>}
     * @protected
     */
    async _getMessage(data) {
      const ctor = /** @type {typeof Validator} */ (this.constructor);
      const composedData = {
        name: ctor.validatorName,
        type: this.type,
        params: this.param,
        config: this.config,
        ...data,
      };
      if (this.config.getMessage) {
        if (typeof this.config.getMessage === 'function') {
          return this.config.getMessage(composedData);
        }
        throw new Error(
          `You must provide a value for getMessage of type 'function', you provided a value of type: ${typeof this
          .config.getMessage}`,
        );
      }
      return ctor.getMessage(composedData);
    }

    /**
     * Called inside Validator.prototype._getMessage (see explanation).
     * @example
     * ```js
     * class MyValidator extends Validator {
     *   static async getMessage() {
     *     return 'lowest prio, defined globally by Validator author'
     *   }
     * }
     * // globally overridden
     * MyValidator.getMessage = async() => 'overrides already configured message';
     * ```
     * @overridable
     * @param {Partial<FeedbackMessageData>} [data]
     * @returns {Promise<string|Element>}
     */
    // eslint-disable-next-line no-unused-vars
    static async getMessage(data) {
      return `Please configure an error message for "${this.name}" by overriding "static async getMessage()"`;
    }

    /**
     * Validators are allowed to have knowledge about FormControls.
     * In some cases (in case of the Required Validator) we wanted to enhance accessibility by
     * adding [aria-required]. Also, it would be possible to write an advanced MinLength
     * Validator that adds a .preprocessor that restricts from typing too many characters
     * (like the native [minlength] validator).
     * Will be called when Validator is added to FormControl.validators.
     * @example
     * ```js
     * onFormControlConnect(formControl) {
     *   if(formControl.inputNode) {
     *     inputNode.setAttribute('aria-required', 'true');
     *   }
     * }
     *
     * ```
     * @configurable
     * @param {FormControlHost} formControl
     */
    onFormControlConnect(formControl) {} // eslint-disable-line

    /**
     * Also see `onFormControlConnect`.
     * Will be called when Validator is removed from FormControl.validators.
     * @example
     * ```js
     * onFormControlDisconnect(formControl) {
     *   if(formControl.inputNode) {
     *     inputNode.removeAttribute('aria-required');
     *   }
     * }
     * @configurable
     * @param {FormControlHost} formControl
     */
    onFormControlDisconnect(formControl) {} // eslint-disable-line

    /**
     * @desc Used on async Validators, makes it able to do perf optimizations when there are
     * pending "execute" calls with outdated values.
     * ValidateMixin calls Validator.abortExecution() an async Validator can act accordingly,
     * depending on its implementation of the "execute" function.
     * - For instance, when fetch was called:
     * https://stackoverflow.com/questions/31061838/how-do-i-cancel-an-http-fetch-request
     * - Or, when a webworker was started, its process could be aborted and then restarted.
     */
    abortExecution() {} // eslint-disable-line
  }

  // For simplicity, a default validator only handles one state:
  // it can either be true or false an it will only have one message.
  // In more advanced cases (think of the feedback mechanism for the maximum number of
  // characters in Twitter), more states are needed. The alternative of
  // having multiple distinct validators would be cumbersome to create and maintain,
  // also because the validations would tie too much into each others logic.

  /**
   * @desc Instead of evaluating the result of a regular validator, a ResultValidator looks
   * at the total result of regular Validators. Instead of an execute function, it uses a
   * 'executeOnResults' Validator.
   * ResultValidators cannot be async, and should not contain an execute method.
   */
  class ResultValidator extends Validator {
    /**
     * @param {Object} context
     * @param {Validator[]} context.regularValidationResult
     * @param {Validator[]} context.prevValidationResult
     * @param {Validator[]} context.prevShownValidationResult
     * @param {Validator[]} [context.validators]
     * @returns {boolean}
     */
    /* eslint-disable no-unused-vars */
    // eslint-disable-next-line class-methods-use-this
    executeOnResults({
      regularValidationResult,
      prevValidationResult,
      prevShownValidationResult,
      validators,
    }) {
      /* eslint-enable no-unused-vars */
      return true;
    }
  }

  /**
   * @typedef {import('../../../types/FormControlMixinTypes.js').FormControlHost} FormControlHost
   */

  class Required extends Validator {
    static get validatorName() {
      return 'Required';
    }

    /**
     * In order to prevent accessibility violations, the aria-required attribute will
     * be combined with compatible aria roles: https://www.w3.org/TR/wai-aria/#aria-required
     */
    static get _compatibleRoles() {
      return [
        'combobox',
        'gridcell',
        'input',
        'listbox',
        'radiogroup',
        'select',
        'spinbutton',
        'textarea',
        'textbox',
        'tree',
      ];
    }

    /**
     * In order to prevent accessibility violations, the aria-required attribute will
     * be combined with compatible platform input elements
     */
    static get _compatibleTags() {
      return ['input', 'select', 'textarea'];
    }

    /**
     * We don't have an execute function, since the Required validator is 'special'.
     * The outcome depends on the modelValue of the FormControl and
     * FormControl.__isEmpty / FormControl._isEmpty.
     */

    /**
     * @param {FormControlHost & HTMLElement} formControl
     */
    // @ts-ignore [allow-protected] we are allowed to know FormControl protcected props in form-core
    // eslint-disable-next-line class-methods-use-this
    onFormControlConnect({ _inputNode: inputNode }) {
      if (inputNode) {
        const role = inputNode.getAttribute('role') || '';
        const elementTagName = inputNode.tagName.toLowerCase();
        const ctor = /** @type {typeof Required} */ (this.constructor);
        if (ctor._compatibleRoles.includes(role) || ctor._compatibleTags.includes(elementTagName)) {
          inputNode.setAttribute('aria-required', 'true');
        }
      }
    }

    /**
     * @param {FormControlHost & HTMLElement} formControl
     */
    // @ts-ignore [allow-protected] we are allowed to know FormControl protcected props in form-core
    // eslint-disable-next-line class-methods-use-this
    onFormControlDisconnect({ _inputNode: inputNode }) {
      if (inputNode) {
        inputNode.removeAttribute('aria-required');
      }
    }
  }

  /* eslint-disable class-methods-use-this, camelcase, no-param-reassign, max-classes-per-file */

  // TODO: [v1] make all @readOnly => @readonly and actually make sure those values cannot be set

  /**
   * @typedef {import('../../types/validate/ValidateMixinTypes').ValidateMixin} ValidateMixin
   * @typedef {import('../../types/validate/ValidateMixinTypes').ValidationType} ValidationType
   * @typedef {import('../../types/validate/ValidateMixinTypes').ValidateHost} ValidateHost
   * @typedef {typeof import('../../types/validate/ValidateMixinTypes').ValidateHost} ValidateHostConstructor
   * @typedef {{validator:Validator; outcome:boolean|string}} ValidationResultEntry
   * @typedef {{[type:string]: {[validatorName:string]:boolean|string}}} ValidationStates
   */

  /**
   * @param {any[]} array1
   * @param {any[]} array2
   */
  function arrayDiff(array1 = [], array2 = []) {
    return array1.filter(x => !array2.includes(x)).concat(array2.filter(x => !array1.includes(x)));
  }

  /**
   * Handles all validation, based on modelValue changes. It has no knowledge about dom and
   * UI. All error visibility, dom interaction and accessibility are handled in FeedbackMixin.
   *
   * @type {ValidateMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const ValidateMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends FormControlMixin(
      SyncUpdatableMixin(DisabledMixin(SlotMixin(ScopedElementsMixin(superclass)))),
    ) {
      static get scopedElements() {
        const scopedElementsCtor =
          /** @type {typeof import('@open-wc/scoped-elements/src/types').ScopedElementsHost} */ (
            super.constructor
          );
        return {
          ...scopedElementsCtor.scopedElements,
          'lion-validation-feedback': LionValidationFeedback,
        };
      }

      /** @type {any} */
      static get properties() {
        return {
          validators: { attribute: false },
          hasFeedbackFor: { attribute: false },
          shouldShowFeedbackFor: { attribute: false },
          showsFeedbackFor: {
            type: Array,
            attribute: 'shows-feedback-for',
            reflect: true,
            converter: {
              fromAttribute: /** @param {string} value */ value => value.split(','),
              toAttribute: /** @param {[]} value */ value => value.join(','),
            },
          },
          validationStates: { attribute: false },
          isPending: {
            type: Boolean,
            attribute: 'is-pending',
            reflect: true,
          },
          defaultValidators: { attribute: false },
          _visibleMessagesAmount: { attribute: false },
          __childModelValueChanged: { attribute: false },
        };
      }

      /**
       * Types of validation supported by this FormControl (for instance 'error'|'warning'|'info')
       * @overridable
       * @type {ValidationType[]}
       */
      static get validationTypes() {
        return ['error'];
      }

      /**
       * @overridable
       * Adds "._feedbackNode" as described below
       */
      get slots() {
        /**
         * FIXME: Ugly workaround https://github.com/microsoft/TypeScript/issues/40110
         * @callback getScopedTagName
         * @param {string} tagName
         * @returns {string}
         *
         * @typedef {Object} ScopedElementsObj
         * @property {getScopedTagName} getScopedTagName
         */
        return {
          ...super.slots,
          feedback: () => {
            const feedbackEl = this.createScopedElement('lion-validation-feedback');
            feedbackEl.setAttribute('data-tag-name', 'lion-validation-feedback');
            return feedbackEl;
          },
        };
      }

      /**
       * Combination of validators provided by Application Developer and the default validators
       * @type {Validator[]}
       * @protected
       */
      get _allValidators() {
        return [...this.validators, ...this.defaultValidators];
      }

      constructor() {
        super();

        /**
         * As soon as validation happens (after modelValue/validators/validator param change), this
         * array is updated with the active ValidationTypes ('error'|'warning'|'success'|'info' etc.).
         * Notice the difference with `.showsFeedbackFor`, which filters `.hasFeedbackFor` based on
         * `.feedbackCondition()`.
         *
         * For styling purposes, will be reflected to [has-feedback-for="error warning"]. This can
         * be useful for subtle visual feedback on keyup, like a red/green border around an input.
         *
         * @example
         * ```css
         * :host([has-feedback-for~="error"]) .input-group__container {
         *   border: 1px solid red;
         * }
         * ```
         * @type {ValidationType[]}
         * @readOnly
         */
        this.hasFeedbackFor = [];

        /**
         * Based on outcome of feedbackCondition, this array decides what ValidationTypes should be
         * shown in validationFeedback, based on meta data like interaction states.
         *
         * For styling purposes, it reflects it `[shows-feedback-for="error warning"]`
         * @type {ValidationType[]}
         * @readOnly
         * @example
         * ```css
         * :host([shows-feedback-for~="success"]) .form-field__feedback {
         *   transform: scaleY(1);
         * }
         * ```
         */
        this.showsFeedbackFor = [];

        // TODO: [v1] make this fully private (prefix __)?
        /**
         * A temporary storage to transition from hasFeedbackFor to showsFeedbackFor
         * @type {ValidationType[]}
         * @readOnly
         * @private
         */
        this.shouldShowFeedbackFor = [];

        /**
         * The outcome of a validation 'round'. Keyed by ValidationType and Validator name
         * @readOnly
         * @type {ValidationStates}
         */
        this.validationStates = {};

        /**
         * Flag indicating whether async validation is pending.
         * Creates attribute [is-pending] as a styling hook
         * @type {boolean}
         */
        this.isPending = false;

        /**
         * Used by Application Developers to add Validators to a FormControl.
         * @example
         * ```html
         * <form-control .validators="${[new Required(), new MinLength(4, {type: 'warning'})]}">
         * </form-control>
         * ```
         * @type {Validator[]}
         */
        this.validators = [];

        /**
         * Used by Subclassers to add default Validators to a particular FormControl.
         * A date input for instance, always needs the isDate validator.
         * @example
         * ```js
         * this.defaultValidators.push(new IsDate());
         * ```
         * @type {Validator[]}
         */
        this.defaultValidators = [];

        /**
         * The amount of feedback messages that will visible in LionValidationFeedback
         * @configurable
         * @protected
         */
        this._visibleMessagesAmount = 1;

        /**
         * @type {ValidationResultEntry[]}
         * @private
         */
        this.__syncValidationResult = [];

        /**
         * @type {ValidationResultEntry[]}
         * @private
         */
        this.__asyncValidationResult = [];

        /**
         * Aggregated result from sync Validators, async Validators and ResultValidators
         * @type {ValidationResultEntry[]}
         * @private
         */
        this.__validationResult = [];

        /**
         * @type {ValidationResultEntry[]}
         * @private
         */
        this.__prevValidationResult = [];

        /**
         * @type {ValidationResultEntry[]}
         * @private
         */
        this.__prevShownValidationResult = [];

        /**
         * The updated children validity affects the validity of the parent. Helper to recompute
         * validity of parent FormGroup
         * @private
         */
        this.__childModelValueChanged = false;

        /** @protected */
        this._onValidatorUpdated = this._onValidatorUpdated.bind(this);
        /** @protected */
        this._updateFeedbackComponent = this._updateFeedbackComponent.bind(this);
      }

      connectedCallback() {
        super.connectedCallback();
        localize.addEventListener('localeChanged', this._updateFeedbackComponent);
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        localize.removeEventListener('localeChanged', this._updateFeedbackComponent);
      }

      /**
       * @param {import('@lion/core').PropertyValues} changedProperties
       */
      firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.__validateInitialized = true;
        this.validate();
        if (this._repropagationRole !== 'child') {
          this.addEventListener('model-value-changed', () => {
            this.__childModelValueChanged = true;
          });
        }
      }

      /**
       * @param {string} name
       * @param {?} oldValue
       */
      updateSync(name, oldValue) {
        super.updateSync(name, oldValue);
        if (name === 'validators') {
          // trigger validation (ideally only for the new or changed validator)
          this.__setupValidators();
          this.validate({ clearCurrentResult: true });
        } else if (name === 'modelValue') {
          this.validate({ clearCurrentResult: true });
        }

        if (
          [
            'touched',
            'dirty',
            'prefilled',
            'focused',
            'submitted',
            'hasFeedbackFor',
            'filled',
          ].includes(name)
        ) {
          this._updateShouldShowFeedbackFor();
        }

        if (name === 'showsFeedbackFor') {
          // This can't be reflected asynchronously in Safari
          // Screen reader output should be in sync with visibility of error messages
          if (this._inputNode) {
            this._inputNode.setAttribute('aria-invalid', `${this._hasFeedbackVisibleFor('error')}`);
            // this._inputNode.setCustomValidity(this._validationMessage || '');
          }

          const diff = arrayDiff(this.showsFeedbackFor, oldValue);
          if (diff.length > 0) {
            this.dispatchEvent(new Event(`showsFeedbackForChanged`, { bubbles: true }));
          }
          diff.forEach(type => {
            this.dispatchEvent(
              new Event(`showsFeedbackFor${pascalCase(type)}Changed`, { bubbles: true }),
            );
          });
        }

        if (name === 'shouldShowFeedbackFor') {
          const diff = arrayDiff(this.shouldShowFeedbackFor, oldValue);
          if (diff.length > 0) {
            this.dispatchEvent(new Event(`shouldShowFeedbackForChanged`, { bubbles: true }));
          }
        }
      }

      /**
       * Triggered by:
       *  - modelValue change
       *  - change in the 'validators' array
       *  - change in the config of an individual Validator
       *
       * Three situations are handled:
       * - a1) the FormControl is empty: further execution is halted. When the Required Validator
       * (being mutually exclusive to the other Validators) is applied, it will end up in the
       * validation result (as the only Validator, since further execution was halted).
       * - a2) there are synchronous Validators: this is the most common flow. When modelValue hasn't
       * changed since last async results were generated, 'sync results' are merged with the
       * 'async results'.
       * - a3) there are asynchronous Validators: for instance when server side evaluation is needed.
       * Executions are scheduled and awaited and the 'async results' are merged with the
       * 'sync results'.
       *
       * - b) there are ResultValidators. After steps a1, a2, or a3 are finished, the holistic
       * ResultValidators (evaluating the total result of the 'regular' (a1, a2 and a3) validators)
       * will be run...
       *
       * Situations a2 and a3 are not mutually exclusive and can be triggered within one `validate()`
       * call. Situation b will occur after every call.
       *
       * @param {{ clearCurrentResult?: boolean }} [opts]
       */
      async validate({ clearCurrentResult } = {}) {
        if (this.disabled) {
          this.__clearValidationResults();
          this.__finishValidation({ source: 'sync', hasAsync: true });
          this._updateFeedbackComponent();
          return;
        }
        if (!this.__validateInitialized) {
          return;
        }

        this.__prevValidationResult = this.__validationResult;
        if (clearCurrentResult) {
          // Clear ('invalidate') all pending and existing validation results.
          // This is needed because we have async (pending) validators whose results
          // need to be merged with those of sync validators and vice versa.
          this.__clearValidationResults();
        }
        await this.__executeValidators();
      }

      /**
       * @desc step a1-3 + b (as explained in `validate()`)
       */
      async __executeValidators() {
        /**
         * Allows Application Developer to wait for (async) validation
         * @example
         * ```js
         * await el.validateComplete;
         * ```
         * @type {Promise<boolean>}
         */
        this.validateComplete = new Promise(resolve => {
          this.__validateCompleteResolve = resolve;
        });

        // When the modelValue can't be created by FormatMixin.parser, still allow all validators
        // to give valuable feedback to the user based on the current viewValue.
        const value =
          this.modelValue instanceof Unparseable ? this.modelValue.viewValue : this.modelValue;

        /** @type {Validator | undefined} */
        const requiredValidator = this._allValidators.find(v => v instanceof Required);

        /**
         * 1. Handle the 'exceptional' Required validator:
         * - the validatity is dependent on the formControl type and therefore determined
         * by the formControl.__isEmpty method. Basically, the Required Validator is a means
         * to trigger formControl.__isEmpty.
         * - when __isEmpty returns true, the input was empty. This means we need to stop
         * validation here, because all other Validators' execute functions assume the
         * value is not empty (there would be nothing to validate).
         */
        // TODO: Try to remove this when we have a single lion form core package, because then we can
        // depend on FormControlMixin directly, and _isEmpty will always be an existing method on the prototype then
        const isEmpty = this.__isEmpty(value);
        if (isEmpty) {
          if (requiredValidator) {
            this.__syncValidationResult = [{ validator: requiredValidator, outcome: true }];
          }
          this.__finishValidation({ source: 'sync' });
          return;
        }

        // Separate Validators in sync and async
        const /** @type {Validator[]} */ filteredValidators = this._allValidators.filter(
            v => !(v instanceof ResultValidator) && !(v instanceof Required),
          );
        const /** @type {Validator[]} */ syncValidators = filteredValidators.filter(v => {
            const vCtor = /** @type {typeof Validator} */ (v.constructor);
            return !vCtor.async;
          });
        const /** @type {Validator[]} */ asyncValidators = filteredValidators.filter(v => {
            const vCtor = /** @type {typeof Validator} */ (v.constructor);
            return vCtor.async;
          });

        /**
         * 2. Synchronous validators
         */
        this.__executeSyncValidators(syncValidators, value, {
          hasAsync: Boolean(asyncValidators.length),
        });

        /**
         * 3. Asynchronous validators
         */
        await this.__executeAsyncValidators(asyncValidators, value);
      }

      /**
       * step a2 (as explained in `validate()`): calls `__finishValidation`
       * @param {Validator[]} syncValidators
       * @param {unknown} value
       * @param {{ hasAsync: boolean }} opts
       * @private
       */
      __executeSyncValidators(syncValidators, value, { hasAsync }) {
        if (syncValidators.length) {
          this.__syncValidationResult = syncValidators
            .map(v => ({
              validator: v,
              outcome: /** @type {boolean|string} */ (v.execute(value, v.param, { node: this })),
            }))
            .filter(v => Boolean(v.outcome));
        }
        this.__finishValidation({ source: 'sync', hasAsync });
      }

      /**
       * step a3 (as explained in `validate()`), calls __finishValidation
       * @param {Validator[]} asyncValidators all Validators except required and ResultValidators
       * @param {?} value
       * @private
       */
      async __executeAsyncValidators(asyncValidators, value) {
        if (asyncValidators.length) {
          this.isPending = true;
          const resultPromises = asyncValidators.map(v => v.execute(value, v.param, { node: this }));
          const asyncExecutionResults = await Promise.all(resultPromises);

          this.__asyncValidationResult = asyncExecutionResults
            .map((r, i) => ({
              validator: asyncValidators[i],
              outcome: /** @type {boolean|string} */ (asyncExecutionResults[i]),
            }))
            .filter(v => Boolean(v.outcome));

          this.__finishValidation({ source: 'async' });
          this.isPending = false;
        }
      }

      /**
       * step b (as explained in `validate()`), called by __finishValidation
       * @param {{validator: Validator;outcome: boolean | string;}[]} regularValidationResult result of steps 1-3
       * @private
       */
      __executeResultValidators(regularValidationResult) {
        const resultValidators = /** @type {ResultValidator[]} */ (
          this._allValidators.filter(v => {
            const vCtor = /** @type {typeof Validator} */ (v.constructor);
            return !vCtor.async && v instanceof ResultValidator;
          })
        );

        if (!resultValidators.length) {
          return [];
        }

        // If empty, do not show the ResulValidation message (e.g. Correct!)
        if (this._isEmpty(this.modelValue)) {
          this.__prevShownValidationResult = [];
          return [];
        }

        // Map everything to Validator[] for backwards compatibility
        return resultValidators
          .map(v => ({
            validator: v,
            outcome: /** @type {boolean|string} */ (
              v.executeOnResults({
                regularValidationResult: regularValidationResult.map(entry => entry.validator),
                prevValidationResult: this.__prevValidationResult.map(entry => entry.validator),
                prevShownValidationResult: this.__prevShownValidationResult.map(
                  entry => entry.validator,
                ),
              })
            ),
          }))
          .filter(v => Boolean(v.outcome));
      }

      /**
       * @param {object} options
       * @param {'sync'|'async'} options.source
       * @param {boolean} [options.hasAsync] whether async validators are configured in this run.
       * @private
       * If not, we have nothing left to wait for.
       */
      __finishValidation({ source, hasAsync }) {
        const syncAndAsyncOutcome = [...this.__syncValidationResult, ...this.__asyncValidationResult];
        // if we have any ResultValidators left, now is the time to run them...
        const resultOutCome = /** @type {ValidationResultEntry[]} */ (
          this.__executeResultValidators(syncAndAsyncOutcome)
        );
        this.__validationResult = [...resultOutCome, ...syncAndAsyncOutcome];

        const ctor = /** @type {ValidateHostConstructor} */ (this.constructor);

        /** @type {ValidationStates} */
        const validationStates = ctor.validationTypes.reduce(
          (acc, type) => ({ ...acc, [type]: {} }),
          {},
        );
        this.__validationResult.forEach(({ validator, outcome }) => {
          if (!validationStates[validator.type]) {
            validationStates[validator.type] = {};
          }
          const vCtor = /** @type {typeof Validator} */ (validator.constructor);
          validationStates[validator.type][vCtor.validatorName] = outcome;
        });
        this.validationStates = validationStates;

        this.hasFeedbackFor = [
          ...new Set(this.__validationResult.map(({ validator }) => validator.type)),
        ];
        /** private event that should be listened to by LionFieldSet */
        this.dispatchEvent(new Event('validate-performed', { bubbles: true }));
        if (source === 'async' || !hasAsync) {
          if (this.__validateCompleteResolve) {
            this.__validateCompleteResolve(true);
          }
        }
      }

      /**
       * @private
       */
      __clearValidationResults() {
        this.__syncValidationResult = [];
        this.__asyncValidationResult = [];
      }

      /**
       * @param {Event|CustomEvent} e
       * @protected
       */
      _onValidatorUpdated(e) {
        if (e.type === 'param-changed' || e.type === 'config-changed') {
          this.validate();
        }
      }

      /**
       * @private
       */
      __setupValidators() {
        const events = ['param-changed', 'config-changed'];
        if (this.__prevValidators) {
          this.__prevValidators.forEach(v => {
            events.forEach(e => {
              if (v.removeEventListener) {
                v.removeEventListener(e, this._onValidatorUpdated);
              }
            });
            v.onFormControlDisconnect(this);
          });
        }
        this._allValidators.forEach(v => {
          if (!(v instanceof Validator)) {
            // throws in constructor are not visible to end user so we do both
            const errorType = Array.isArray(v) ? 'array' : typeof v;
            const errorMessage = `Validators array only accepts class instances of Validator. Type "${errorType}" found. This may be caused by having multiple installations of @lion/form-core.`;
            // eslint-disable-next-line no-console
            console.error(errorMessage, this);
            throw new Error(errorMessage);
          }
          const ctor = /** @type {ValidateHostConstructor} */ (this.constructor);
          if (ctor.validationTypes.indexOf(v.type) === -1) {
            const vCtor = /** @type {typeof Validator} */ (v.constructor);
            // throws in constructor are not visible to end user so we do both
            const errorMessage = `This component does not support the validator type "${v.type}" used in "${vCtor.validatorName}". You may change your validators type or add it to the components "static get validationTypes() {}".`;
            // eslint-disable-next-line no-console
            console.error(errorMessage, this);
            throw new Error(errorMessage);
          }
          /** Updated the code to fix issue #1607 to sync the calendar date with validators params
           *  Here _onValidatorUpdated is responsible for responding to the event
           */
          events.forEach(eventName => {
            if (v.addEventListener) {
              v.addEventListener(eventName, e => {
                // @ts-ignore for making validator param dynamic
                this._onValidatorUpdated(e, { validator: v });
              });
            }
          });
          v.onFormControlConnect(this);
        });
        this.__prevValidators = this._allValidators;
      }

      /**
       * Helper method for the mutually exclusive Required Validator
       * @param {?} v
       * @private
       */
      __isEmpty(v) {
        if (typeof this._isEmpty === 'function') {
          return this._isEmpty(v);
        }
        return (
          this.modelValue === null || typeof this.modelValue === 'undefined' || this.modelValue === ''
        );
      }

      // ------------------------------------------------------------------------------------------
      // -- Feedback specifics --------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------

      /**
       * @typedef {object} FeedbackMessage
       * @property {string | Node} message this
       * @property {string} type will be 'error' for messages from default Validators. Could be
       * 'warning', 'info' etc. for Validators with custom types. Needed as a directive for
       * feedbackNode how to render a message of a certain type
       * @property {Validator} [validator] when the message is directly coupled to a Validator
       * (in most cases), this property is filled. When a message is not coupled to a Validator
       * (in case of success feedback which is based on a diff or current and previous validation
       * results), this property can be left empty.
       */

      /**
       * @param {ValidationResultEntry[]} validationResults list of objects having a .getMessage method
       * @return {Promise.<FeedbackMessage[]>}
       * @private
       */
      async __getFeedbackMessages(validationResults) {
        let fieldName = await this.fieldName;
        return Promise.all(
          validationResults.map(async ({ validator, outcome }) => {
            if (validator.config.fieldName) {
              fieldName = await validator.config.fieldName;
            }
            // @ts-ignore [allow-protected]
            const message = await validator._getMessage({
              modelValue: this.modelValue,
              formControl: this,
              fieldName,
              outcome,
            });
            return { message, type: validator.type, validator };
          }),
        );
      }

      /**
       * Responsible for retrieving messages from Validators and
       * (delegation of) rendering them.
       *
       * For `._feedbackNode` (extension of LionValidationFeedback):
       * - retrieve messages from highest prio Validators
       * - provide the result to custom feedback node and let the
       * custom node decide on their renderings
       *
       * In both cases:
       * - we compute the 'show' flag (like 'hasErrorVisible') for all types
       * - we set the customValidity message of the highest prio Validator
       * - we set aria-invalid="true" in case hasErrorVisible is true
       * @protected
       */
      _updateFeedbackComponent() {
        const { _feedbackNode } = this;
        if (!_feedbackNode) {
          return;
        }

        if (!this.__feedbackQueue) {
          this.__feedbackQueue = new AsyncQueue();
        }

        if (this.showsFeedbackFor.length > 0) {
          this.__feedbackQueue.add(async () => {
            /** @type {Validator[]} */
            const prioritizedValidators = this._prioritizeAndFilterFeedback({
              validationResult: this.__validationResult.map(entry => entry.validator),
            });

            this.__prioritizedResult = prioritizedValidators
              .map(v => {
                const found = /** @type {ValidationResultEntry} */ (
                  this.__validationResult.find(r => v === r.validator)
                );
                return found;
              })
              .filter(Boolean);

            if (this.__prioritizedResult.length > 0) {
              this.__prevShownValidationResult = this.__prioritizedResult;
            }

            const messageMap = await this.__getFeedbackMessages(this.__prioritizedResult);
            _feedbackNode.feedbackData = messageMap.length ? messageMap : [];
          });
        } else {
          this.__feedbackQueue.add(async () => {
            _feedbackNode.feedbackData = [];
          });
        }
        this.feedbackComplete = this.__feedbackQueue.complete;
      }

      /**
       * Default feedbackCondition condition, used by Subclassers, that will be used when
       * `feedbackCondition()` is not overridden by Application Developer.
       * Show the validity feedback when returning true, don't show when false
       * @param {string} type could be 'error', 'warning', 'info', 'success' or any other custom
       * Validator type
       * @param {object} meta meta info (interaction states etc)
       * @protected
       */
      // eslint-disable-next-line no-unused-vars
      _showFeedbackConditionFor(type, meta) {
        return true;
      }

      /**
       * Allows Subclassers to add meta info for feedbackCondition
       * @configurable
       */
      get _feedbackConditionMeta() {
        return { modelValue: this.modelValue, el: this };
      }

      /**
       * Allows the Application Developer to specify when a feedback message should be shown
       * @example
       * ```js
       * feedbackCondition(type, meta, defaultCondition) {
       *   if (type === 'info') {
       *     return true;
       *   } else if (type === 'prefilledOnly') {
       *     return meta.prefilled;
       *   }
       *   return defaultCondition(type, meta);
       * }
       * ```
       * @overridable
       * @param {string} type could be 'error', 'warning', 'info', 'success' or any other custom
       * Validator type
       * @param {object} meta meta info (interaction states etc)
       * @param {((type: string, meta: object) => boolean)} currentCondition this is the _showFeedbackConditionFor
       * that can be used if a developer wants to override for a certain type, but wants to fallback
       * for other types
       * @returns {boolean}
       */
      feedbackCondition(
        type,
        meta = this._feedbackConditionMeta,
        currentCondition = this._showFeedbackConditionFor.bind(this),
      ) {
        return currentCondition(type, meta);
      }

      /**
       * Used to translate `.hasFeedbackFor` and `.shouldShowFeedbackFor` to `.showsFeedbackFor`
       * @param {string} type
       * @protected
       */
      _hasFeedbackVisibleFor(type) {
        return (
          this.hasFeedbackFor &&
          this.hasFeedbackFor.includes(type) &&
          this.shouldShowFeedbackFor &&
          this.shouldShowFeedbackFor.includes(type)
        );
      }

      /**
       * @param {import('@lion/core').PropertyValues} changedProperties
       */
      updated(changedProperties) {
        super.updated(changedProperties);

        if (
          changedProperties.has('shouldShowFeedbackFor') ||
          changedProperties.has('hasFeedbackFor')
        ) {
          const ctor = /** @type {ValidateHostConstructor} */ (this.constructor);
          // Necessary typecast because types aren't smart enough to understand that we filter out undefined
          this.showsFeedbackFor = /** @type {string[]} */ (
            ctor.validationTypes
              .map(type => (this._hasFeedbackVisibleFor(type) ? type : undefined))
              .filter(Boolean)
          );
          this._updateFeedbackComponent();
        }

        if (changedProperties.has('__childModelValueChanged') && this.__childModelValueChanged) {
          this.validate({ clearCurrentResult: true });
          this.__childModelValueChanged = false;
        }

        if (changedProperties.has('validationStates')) {
          const prevStates = /** @type {{[key: string]: object;}} */ (
            changedProperties.get('validationStates')
          );
          if (prevStates) {
            Object.entries(this.validationStates).forEach(([type, feedbackObj]) => {
              if (
                prevStates[type] &&
                JSON.stringify(feedbackObj) !== JSON.stringify(prevStates[type])
              ) {
                this.dispatchEvent(new CustomEvent(`${type}StateChanged`, { detail: feedbackObj }));
              }
            });
          }
        }
      }

      /**
       * @protected
       */
      _updateShouldShowFeedbackFor() {
        const ctor = /** @type {ValidateHostConstructor} */ (this.constructor);

        // Necessary typecast because types aren't smart enough to understand that we filter out undefined
        const newShouldShowFeedbackFor = /** @type {string[]} */ (
          ctor.validationTypes
            .map(type =>
              this.feedbackCondition(
                type,
                this._feedbackConditionMeta,
                this._showFeedbackConditionFor.bind(this),
              )
                ? type
                : undefined,
            )
            .filter(Boolean)
        );

        if (JSON.stringify(this.shouldShowFeedbackFor) !== JSON.stringify(newShouldShowFeedbackFor)) {
          this.shouldShowFeedbackFor = newShouldShowFeedbackFor;
        }
      }

      /**
       * Orders all active validators in this.__validationResult.
       * Can also filter out occurrences (based on interaction states)
       * @overridable
       * @param {{ validationResult: Validator[] }} opts
       * @return {Validator[]} ordered list of Validators with feedback messages visible to the end user
       * @protected
       */
      _prioritizeAndFilterFeedback({ validationResult }) {
        const ctor = /** @type {ValidateHostConstructor} */ (this.constructor);
        const types = ctor.validationTypes;
        // Sort all validators based on the type provided.
        const res = validationResult
          .filter(v =>
            this.feedbackCondition(
              v.type,
              this._feedbackConditionMeta,
              this._showFeedbackConditionFor.bind(this),
            ),
          )
          .sort((a, b) => types.indexOf(a.type) - types.indexOf(b.type));
        return res.slice(0, this._visibleMessagesAmount);
      }
    };

  const ValidateMixin = dedupeMixin(ValidateMixinImplementation);

  /* eslint-disable class-methods-use-this */


  /**
   * @typedef {import('../types/FormatMixinTypes').FormatMixin} FormatMixin
   * @typedef {import('../types/FormatMixinTypes').FormatOptions} FormatOptions
   * @typedef {import('../types/FormControlMixinTypes.js').ModelValueEventDetails} ModelValueEventDetails
   */

  // For a future breaking release:
  // - do not allow the private `.formattedValue` as property that can be set to
  // trigger a computation loop.
  // - do not fire events for those private and protected concepts
  // - simplify _calculateValues: recursive trigger lock can be omitted, since need for connecting
  // the loop via sync observers is not needed anymore.
  // - consider `formatOn` as an overridable function, by default something like:
  // `(!_isHandlingUserInput || !hasError) && !focused`
  // This would allow for more advanced scenarios, like formatting an input whenever it becomes valid.
  // This would make formattedValue as a concept obsolete, since for maximum flexibility, the
  // formattedValue condition needs to be evaluated right before syncing back to the view

  /**
   * @desc Designed to be applied on top of a LionField.
   * To understand all concepts within the Mixin, please consult the flow diagram in the
   * documentation.
   *
   * ## Flows
   * FormatMixin supports these two main flows:
   * [1] Application Developer sets `.modelValue`:
   *     Flow: `.modelValue` (formatter) -> `.formattedValue` -> `._inputNode.value`
   *                         (serializer) -> `.serializedValue`
   * [2] End user interacts with field:
   *     Flow: `@user-input-changed` (parser) -> `.modelValue` (formatter) -> `.formattedValue` - (debounce till reflect condition (formatOn) is met) -> `._inputNode.value`
   *                                 (serializer) -> `.serializedValue`
   *
   * For backwards compatibility with the platform, we also support `.value` as an api. In that case
   * the flow will be like [2], without the debounce.
   *
   * ## Difference between value, viewValue and formattedValue
   * A viewValue is a concept rather than a property. To be compatible with the platform api, the
   * property for the concept of viewValue is thus called `.value`.
   * When reading code and docs, one should be aware that the term viewValue is mostly used, but the
   * terms can be used interchangeably.
   * The `.formattedValue` should be seen as the 'scheduled' viewValue. It is computed realtime and
   * stores the output of formatter. It will replace viewValue. once condition `formatOn` is met.
   * Another difference is that formattedValue lives on `LionField`, whereas viewValue is shared
   * across `LionField` and `._inputNode`.
   *
   * For restoring serialized values fetched from a server, we could consider one extra flow:
   * [3] Application Developer sets `.serializedValue`:
   *     Flow: serializedValue (deserializer) -> `.modelValue` (formatter) -> `.formattedValue` -> `._inputNode.value`
   *
   * @type {FormatMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const FormatMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class FormatMixin extends ValidateMixin(FormControlMixin(superclass)) {
      /** @type {any} */
      static get properties() {
        return {
          formattedValue: { attribute: false },
          serializedValue: { attribute: false },
          formatOptions: { attribute: false },
        };
      }

      /**
       * @param {string} name
       * @param {any} oldVal
       */
      requestUpdate(name, oldVal) {
        super.requestUpdate(name, oldVal);

        if (name === 'modelValue' && this.modelValue !== oldVal) {
          this._onModelValueChanged({ modelValue: this.modelValue }, { modelValue: oldVal });
        }
        if (name === 'serializedValue' && this.serializedValue !== oldVal) {
          this._calculateValues({ source: 'serialized' });
        }
        if (name === 'formattedValue' && this.formattedValue !== oldVal) {
          this._calculateValues({ source: 'formatted' });
        }
      }

      /**
       * The view value. Will be delegated to `._inputNode.value`
       */
      get value() {
        return (this._inputNode && this._inputNode.value) || this.__value || '';
      }

      /** @param {string} value */
      set value(value) {
        // if not yet connected to dom can't change the value
        if (this._inputNode) {
          this._inputNode.value = value;
          /** @type {string | undefined} */
          this.__value = undefined;
        } else {
          this.__value = value;
        }
      }

      /**
       * Preprocessors could be considered 'live formatters'. Their result is shown to the user
       * on keyup instead of after blurring the field. The biggest difference between preprocessors
       * and formatters is their moment of execution: preprocessors are run before modelValue is
       * computed (and work based on view value), whereas formatters are run after the parser (and
       * are based on modelValue)
       * Automatically formats code while typing. It depends on a preprocessro that smartly
       * updates the viewValue and caret position for best UX.
       * @example
       * ```js
       * preprocessor(viewValue) {
       *   // only use digits
       *   return viewValue.replace(/\D/g, '');
       * }
       * @param {string} v - the raw value from the <input> after keyUp/Down event
       * @param {FormatOptions & { prevViewValue: string; currentCaretIndex: number }} opts - the raw value from the <input> after keyUp/Down event
       * @returns {{ viewValue:string; caretIndex:number; }|string|undefined} preprocessedValue: the result of preprocessing for invalid input
       */
      // eslint-disable-next-line no-unused-vars
      preprocessor(v, opts) {
        return undefined;
      }

      /**
       * Converts viewValue to modelValue
       * For instance, a localized date to a Date Object
       * @param {string} v - viewValue: the formatted value inside <input>
       * @param {FormatOptions} opts
       * @returns {*} modelValue
       */
      // eslint-disable-next-line no-unused-vars
      parser(v, opts) {
        return v;
      }

      /**
       * Converts modelValue to formattedValue (formattedValue will be synced with
       * `._inputNode.value`)
       * For instance, a Date object to a localized date.
       * @param {*} v - modelValue: can be an Object, Number, String depending on the
       * input type(date, number, email etc)
       * @param {FormatOptions} opts
       * @returns {string} formattedValue
       */
      // eslint-disable-next-line no-unused-vars
      formatter(v, opts) {
        return v;
      }

      /**
       * Converts `.modelValue` to `.serializedValue`
       * For instance, a Date object to an iso formatted date string
       * @param {?} v - modelValue: can be an Object, Number, String depending on the
       * input type(date, number, email etc)
       * @returns {string} serializedValue
       */
      serializer(v) {
        return v !== undefined ? v : '';
      }

      /**
       * Converts `.serializedValue` to `.modelValue`
       * For instance, an iso formatted date string to a Date object
       * @param {?} v - modelValue: can be an Object, Number, String depending on the
       * input type(date, number, email etc)
       * @returns {?} modelValue
       */
      deserializer(v) {
        return v === undefined ? '' : v;
      }

      /**
       * Responsible for storing all representations(modelValue, serializedValue, formattedValue
       * and value) of the input value. Prevents infinite loops, so all value observers can be
       * treated like they will only be called once, without indirectly calling other observers.
       * (in fact, some are called twice, but the __preventRecursiveTrigger lock prevents the
       * second call from having effect).
       *
       * @param {{source:'model'|'serialized'|'formatted'|null}} config - the type of value that triggered this method. It should not be
       * set again, so that its observer won't be triggered. Can be:
       * 'model'|'formatted'|'serialized'.
       * @protected
       */
      _calculateValues({ source } = { source: null }) {
        if (this.__preventRecursiveTrigger) return; // prevent infinite loops

        /** @type {boolean} */
        this.__preventRecursiveTrigger = true;
        if (source !== 'model') {
          if (source === 'serialized') {
            /** @type {?} */
            this.modelValue = this.deserializer(this.serializedValue);
          } else if (source === 'formatted') {
            this.modelValue = this._callParser();
          }
        }
        if (source !== 'formatted') {
          this.formattedValue = this._callFormatter();
        }
        if (source !== 'serialized') {
          this.serializedValue = this.serializer(this.modelValue);
        }
        this._reflectBackFormattedValueToUser();
        this.__preventRecursiveTrigger = false;
        this.__prevViewValue = this.value;
      }

      /**
       * @param {string|undefined} value
       * @return {?}
       * @private
       */
      _callParser(value = this.formattedValue) {
        // A) check if we need to parse at all

        // A.1) The end user had no intention to parse
        if (value === '') {
          // Ideally, modelValue should be undefined for empty strings.
          // For backwards compatibility we return an empty string:
          // - it can be expected by 3rd parties (for instance unit tests)
          // TODO(@tlouisse): In a breaking refactor of the Validation System, this behavior can be corrected.
          return '';
        }

        // A.2) Handle edge cases. We might have no view value yet, for instance because
        // _inputNode.value was not available yet
        if (typeof value !== 'string') {
          // This means there is nothing to find inside the view that can be of
          // interest to the Application Developer or needed to store for future
          // form state retrieval.
          return undefined;
        }

        // B) parse the view value

        // - if result:
        // return the successfully parsed viewValue
        // - if no result:
        // Apparently, the parser was not able to produce a satisfactory output for the desired
        // modelValue type, based on the current viewValue. Unparseable allows to restore all
        // states (for instance from a lost user session), since it saves the current viewValue.
        const result = this.parser(value, this.formatOptions);
        return result !== undefined ? result : new Unparseable(value);
      }

      /**
       * @returns {string|undefined}
       * @private
       */
      _callFormatter() {
        // - Why check for this.hasError?
        // We only want to format values that are considered valid. For best UX,
        // we only 'reward' valid inputs.
        // - Why check for _isHandlingUserInput?
        // Downwards sync is prevented whenever we are in an `@user-input-changed` flow, [2].
        // If we are in a 'imperatively set `.modelValue`' flow, [1], we want to reflect back
        // the value, no matter what.
        // This means, whenever we are in hasError and modelValue is set
        // imperatively, we DO want to format a value (it is the only way to get meaningful
        // input into `._inputNode` with modelValue as input)

        if (
          this._isHandlingUserInput &&
          this.hasFeedbackFor?.length &&
          this.hasFeedbackFor.includes('error') &&
          this._inputNode
        ) {
          return this._inputNode ? this.value : undefined;
        }

        if (this.modelValue instanceof Unparseable) {
          // When the modelValue currently is unparseable, we need to sync back the supplied
          // viewValue. In flow [2], this should not be needed.
          // In flow [1] (we restore a previously stored modelValue) we should sync down, however.
          return this.modelValue.viewValue;
        }

        return this.formatter(this.modelValue, this.formatOptions);
      }

      /**
       * Responds to modelValue changes in the synchronous cycle (most subclassers should listen to
       * the asynchronous cycle ('modelValue' in the .updated lifecycle))
       * @param {{ modelValue: unknown; }[]} args
       * @protected
       */
      _onModelValueChanged(...args) {
        this._calculateValues({ source: 'model' });
        this._dispatchModelValueChangedEvent(...args);
      }

      /**
       * This is wrapped in a distinct method, so that parents can control when the changed event
       * is fired. For objects, a deep comparison might be needed.
       * @param {{ modelValue: unknown; }[]} args
       * @protected
       */
      // eslint-disable-next-line no-unused-vars
      _dispatchModelValueChangedEvent(...args) {
        /** @event model-value-changed */
        this.dispatchEvent(
          /** @privateEvent model-value-changed: FormControl redispatches it as public event */
          new CustomEvent('model-value-changed', {
            bubbles: true,
            detail: /** @type { ModelValueEventDetails } */ ({
              formPath: [this],
              isTriggeredByUser: Boolean(this._isHandlingUserInput),
            }),
          }),
        );
      }

      /**
       * Synchronization from `._inputNode.value` to `LionField` (flow [2])
       * Downwards syncing should only happen for `LionField`.value changes from 'above'.
       * This triggers _onModelValueChanged and connects user input
       * to the parsing/formatting/serializing loop.
       * @protected
       */
      _syncValueUpwards() {
        if (!this.__isHandlingComposition) {
          this.__handlePreprocessor();
        }
        const prevFormatted = this.formattedValue;
        this.modelValue = this._callParser(this.value);

        // Sometimes, the formattedValue didn't change, but the viewValue did...
        // We need this check to support pasting values that need to be formatted right on paste
        if (prevFormatted === this.formattedValue && this.__prevViewValue !== this.value) {
          this._calculateValues();
        }
      }

      /**
       * Handle view value and caretIndex, depending on return type of .preprocessor.
       * @private
       */
      __handlePreprocessor() {
        const unprocessedValue = this.value;
        let currentCaretIndex = this.value.length;
        // Be gentle with Safari
        if (
          this._inputNode &&
          'selectionStart' in this._inputNode &&
          /** @type {HTMLInputElement} */ (this._inputNode)?.type !== 'range'
        ) {
          currentCaretIndex = /** @type {number} */ (this._inputNode.selectionStart);
        }
        const preprocessedValue = this.preprocessor(this.value, {
          ...this.formatOptions,
          currentCaretIndex,
          prevViewValue: this.__prevViewValue,
        });

        this.__prevViewValue = unprocessedValue;
        if (preprocessedValue === undefined) {
          // Make sure we do no set back original value, so we preserve
          // caret index (== selectionStart/selectionEnd)
          return;
        }
        if (typeof preprocessedValue === 'string') {
          this.value = preprocessedValue;
        } else if (typeof preprocessedValue === 'object') {
          const { viewValue, caretIndex } = preprocessedValue;
          this.value = viewValue;
          if (caretIndex && this._inputNode && 'selectionStart' in this._inputNode) {
            this._inputNode.selectionStart = caretIndex;
            this._inputNode.selectionEnd = caretIndex;
          }
        }
      }

      /**
       * Synchronization from `LionField.value` to `._inputNode.value`
       * - flow [1] will always be reflected back
       * - flow [2] will not be reflected back when this flow was triggered via
       *   `@user-input-changed` (this will happen later, when `formatOn` condition is met)
       * @protected
       */
      _reflectBackFormattedValueToUser() {
        if (this._reflectBackOn()) {
          // Text 'undefined' should not end up in <input>
          this.value = typeof this.formattedValue !== 'undefined' ? this.formattedValue : '';
        }
      }

      /**
       * Every time .formattedValue is attempted to sync to the view value (on change/blur and on
       * modelValue change), this condition is checked. When enhancing it, it's recommended to
       * call via `return this._myExtraCondition && super._reflectBackOn()`
       * @overridable
       * @return {boolean}
       * @protected
       */
      _reflectBackOn() {
        return !this._isHandlingUserInput;
      }

      /**
       * This can be called whenever the view value should be updated. Dependent on component type
       * ("input" for <input> or "change" for <select>(mainly for IE)) a different event should be
       * used  as source for the "user-input-changed" event (which can be seen as an abstraction
       * layer on top of other events (input, change, whatever))
       * @protected
       */
      _proxyInputEvent() {
        // TODO: [v1] remove composed (and bubbles as well if possible)
        /** @protectedEvent user-input-changed meant for usage by Subclassers only */
        this.dispatchEvent(new Event('user-input-changed', { bubbles: true }));
      }

      /** @protected */
      _onUserInputChanged() {
        // Upwards syncing. Most properties are delegated right away, value is synced to
        // `LionField`, to be able to act on (imperatively set) value changes
        this._isHandlingUserInput = true;
        this._syncValueUpwards();
        this._isHandlingUserInput = false;
      }

      /**
       * @param {Event} event
       */
      __onCompositionEvent({ type }) {
        if (type === 'compositionstart') {
          this.__isHandlingComposition = true;
        } else if (type === 'compositionend') {
          this.__isHandlingComposition = false;
          // in all other cases this would be triggered via user-input-changed
          this._syncValueUpwards();
        }
      }

      constructor() {
        super();

        // TODO: [v1] delete; use 'change' event directly within this file
        /**
         * Event that will trigger formatting (more precise, visual update of the view, so the
         * user sees the formatted value)
         * Default: 'change'
         * @deprecated use _reflectBackOn()
         * @protected
         */
        this.formatOn = 'change';

        /**
         * Configuration object that will be available inside the formatter function
         */
        this.formatOptions = /** @type {FormatOptions} */ ({});

        /**
         * The view value is the result of the formatter function (when available).
         * The result will be stored in the native _inputNode (usually an input[type=text]).
         *
         * Examples:
         * - For a date input, this would be '20/01/1999' (dependent on locale).
         * - For a number input, this could be '1,234.56' (a String representation of modelValue
         * 1234.56)
         * @type {string|undefined}
         * @readOnly
         */
        this.formattedValue = undefined;

        /**
         * The serialized version of the model value.
         * This value exists for maximal compatibility with the platform API.
         * The serialized value can be an interface in context where data binding is not
         * supported and a serialized string needs to be set.
         *
         * Examples:
         * - For a date input, this would be the iso format of a date, e.g. '1999-01-20'.
         * - For a number input this would be the String representation of a float ('1234.56'
         *   instead of 1234.56)
         *
         * When no parser is available, the value is usually the same as the formattedValue
         * (being _inputNode.value)
         * @type {string|undefined}
         */
        this.serializedValue = undefined;

        /**
         * Whether the user is pasting content. Allows Subclassers to do this in their subclass:
         * @example
         * ```js
         * _reflectBackOn() {
         *   return super._reflectBackOn() || this._isPasting;
         * }
         * ```
         * @protected
         * @type {boolean}
         */
        this._isPasting = false;

        /**
         * Flag that will be set when user interaction takes place (for instance after an 'input'
         * event). Will be added as meta info to the `model-value-changed` event. Depending on
         * whether a user is interacting, formatting logic will be handled differently.
         * @protected
         * @type {boolean}
         */
        this._isHandlingUserInput = false;
        /**
         * @private
         * @type {string}
         */
        this.__prevViewValue = '';
        this.__onCompositionEvent = this.__onCompositionEvent.bind(this);
        // This computes formattedValue
        this.addEventListener('user-input-changed', this._onUserInputChanged);
        // This sets the formatted viewValue after paste
        this.addEventListener('paste', this.__onPaste);

        /**
         * @protected
         */
        this._reflectBackFormattedValueToUser = this._reflectBackFormattedValueToUser.bind(this);

        /**
         * @private
         */
        this._reflectBackFormattedValueDebounced = () => {
          // Make sure this is fired after the change event of _inputNode, so that formattedValue
          // is guaranteed to be calculated
          setTimeout(this._reflectBackFormattedValueToUser);
        };
      }

      /**
       * @private
       */
      __onPaste() {
        this._isPasting = true;
        this.formatOptions.mode = 'pasted';
        setTimeout(() => {
          this._isPasting = false;
          this.formatOptions.mode = 'auto';
        });
      }

      connectedCallback() {
        super.connectedCallback();

        // Connect the value found in <input> to the formatting/parsing/serializing loop as a
        // fallback mechanism. Assume the user uses the value property of the
        // `LionField`(recommended api) as the api (this is a downwards sync).
        // However, when no value is specified on `LionField`, have support for sync of the real
        // input to the `LionField` (upwards sync).
        if (typeof this.modelValue === 'undefined') {
          this._syncValueUpwards();
        }
        /** @type {string} */
        this.__prevViewValue = this.value;

        this._reflectBackFormattedValueToUser();

        if (this._inputNode) {
          this._inputNode.addEventListener(this.formatOn, this._reflectBackFormattedValueDebounced);
          this._inputNode.addEventListener('input', this._proxyInputEvent);
          this._inputNode.addEventListener('compositionstart', this.__onCompositionEvent);
          this._inputNode.addEventListener('compositionend', this.__onCompositionEvent);
        }
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        if (this._inputNode) {
          this._inputNode.removeEventListener('input', this._proxyInputEvent);
          this._inputNode.removeEventListener(
            this.formatOn,
            /** @type {EventListenerOrEventListenerObject} */ (
              this._reflectBackFormattedValueDebounced
            ),
          );
          this._inputNode.removeEventListener('compositionstart', this.__onCompositionEvent);
          this._inputNode.removeEventListener('compositionend', this.__onCompositionEvent);
        }
      }
    };

  const FormatMixin = dedupeMixin(FormatMixinImplementation);

  /**
   * @typedef {import('../types/InteractionStateMixinTypes').InteractionStateMixin} InteractionStateMixin
   * @typedef {import('../types/InteractionStateMixinTypes').InteractionStates} InteractionStates
   */

  /**
   * @desc `InteractionStateMixin` adds meta information about touched and dirty states, that can
   * be read by other form components (ing-uic-input-error for instance, uses the touched state
   * to determine whether an error message needs to be shown).
   * Interaction states will be set when a user:
   * - leaves a form field(blur) -> 'touched' will be set to true. 'prefilled' when a
   *   field is left non-empty
   * - on keyup (actually, on the model-value-changed event) -> 'dirty' will be set to true
   *
   * @type {InteractionStateMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const InteractionStateMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class InteractionStateMixin extends FormControlMixin(superclass) {
      /** @type {any} */
      static get properties() {
        return {
          touched: { type: Boolean, reflect: true },
          dirty: { type: Boolean, reflect: true },
          filled: { type: Boolean, reflect: true },
          prefilled: { attribute: false },
          submitted: { attribute: false },
        };
      }

      /**
       * @param {PropertyKey} name
       * @param {*} oldVal
       */
      requestUpdate(name, oldVal) {
        super.requestUpdate(name, oldVal);
        if (name === 'touched' && this.touched !== oldVal) {
          this._onTouchedChanged();
        }

        if (name === 'modelValue') {
          // We do this in requestUpdate because we don't want to fire another re-render (e.g. when doing this in updated)
          // Furthermore, we cannot do it on model-value-changed event because it isn't fired initially.
          this.filled = !this._isEmpty();
        }

        if (name === 'dirty' && this.dirty !== oldVal) {
          this._onDirtyChanged();
        }
      }

      constructor() {
        super();

        /**
         * True when user has focused and left(blurred) the field.
         * @type {boolean}
         */
        this.touched = false;

        /**
         * True when user has changed the value of the field.
         * @type {boolean}
         */
        this.dirty = false;

        /**
         * True when user has left non-empty field or input is prefilled.
         * The name must be seen from the point of view of the input field:
         * once the user enters the input field, the value is non-empty.
         * @type {boolean}
         */
        this.prefilled = false;

        /**
         * True when the modelValue is non-empty (see _isEmpty in FormControlMixin)
         * @type {boolean}
         */
        this.filled = false;

        /**
         * True when user has attempted to submit the form, e.g. through a button
         * of type="submit"
         * @type {boolean}
         */
        // TODO: [v1] this might be fixable by scheduling property effects till firstUpdated
        // this.submitted = false;

        /**
         * The event that triggers the touched state
         * @type {string}
         * @protected
         */
        this._leaveEvent = 'blur';

        /**
         * The event that triggers the dirty state
         * @type {string}
         * @protected
         */
        this._valueChangedEvent = 'model-value-changed';

        /**
         * @type {(event: Event) => unknown}
         * @protected
         */
        this._iStateOnLeave = this._iStateOnLeave.bind(this);

        /**
         * @type {(event: Event) => unknown}
         * @protected
         */
        this._iStateOnValueChange = this._iStateOnValueChange.bind(this);
      }

      /**
       * Register event handlers and validate prefilled inputs
       */
      connectedCallback() {
        super.connectedCallback();
        this.addEventListener(this._leaveEvent, this._iStateOnLeave);
        this.addEventListener(this._valueChangedEvent, this._iStateOnValueChange);
        this.initInteractionState();
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(this._leaveEvent, this._iStateOnLeave);
        this.removeEventListener(this._valueChangedEvent, this._iStateOnValueChange);
      }

      /**
       * Evaluations performed on connectedCallback.
       * This method is public, so it can be called at a later moment (when we need to wait for
       * registering children for instance) as well.
       * Since this method will be called twice in last mentioned scenario, it must stay idempotent.
       */
      initInteractionState() {
        this.dirty = false;
        this.prefilled = !this._isEmpty();
      }

      /**
       * Sets touched value to true and reevaluates prefilled state.
       * When false, on next interaction, user will start with a clean state.
       * @protected
       */
      _iStateOnLeave() {
        this.touched = true;
        this.prefilled = !this._isEmpty();
      }

      /**
       * Sets dirty value and validates when already touched or invalid
       * @protected
       */
      _iStateOnValueChange() {
        this.dirty = true;
      }

      /**
       * Resets touched and dirty, and recomputes prefilled
       */
      resetInteractionState() {
        this.touched = false;
        this.submitted = false;
        this.dirty = false;
        this.prefilled = !this._isEmpty();
      }

      /**
       * Dispatches event on touched state change
       * @protected
       */
      _onTouchedChanged() {
        /** @protectedEvent touched-changed */
        this.dispatchEvent(new Event('touched-changed', { bubbles: true, composed: true }));
      }

      /**
       * Dispatches event on touched state change
       * @protected
       */
      _onDirtyChanged() {
        /** @protectedEvent dirty-changed */
        this.dispatchEvent(new Event('dirty-changed', { bubbles: true, composed: true }));
      }

      /**
       * @override ValidateMixin
       * Show the validity feedback when one of the following conditions is met:
       *
       * - submitted
       *   If the form is submitted, always show the error message.
       *
       * - prefilled
       *   the user already filled in something, or the value is prefilled
       *   when the form is initially rendered.
       *
       * - touched && dirty
       *   When a user starts typing for the first time in a field with for instance `required`
       *   validation, error message should not be shown until a field becomes `touched`
       *   (a user leaves(blurs) a field).
       *   When a user enters a field without altering the value(making it `dirty`),
       *   an error message shouldn't be shown either.
       * @protected
       * @param {string} type
       * @param {InteractionStates} meta
       */
      // @ts-expect-error FIXME: istatemixin should implement validatemixin, then @override is valid
      // eslint-disable-next-line class-methods-use-this, no-unused-vars
      _showFeedbackConditionFor(type, meta) {
        return (meta.touched && meta.dirty) || meta.prefilled || meta.submitted;
      }

      /**
       * @enhance ValidateMixin
       */
      get _feedbackConditionMeta() {
        return {
          // @ts-ignore to fix, InteractionStateMixin needs to depend on ValidateMixin
          ...super._feedbackConditionMeta,
          submitted: this.submitted,
          touched: this.touched,
          dirty: this.dirty,
          filled: this.filled,
          prefilled: this.prefilled,
        };
      }
    };

  const InteractionStateMixin = dedupeMixin(InteractionStateMixinImplementation);

  /**
   * `LionField`: wraps <input>, <textarea>, <select> and other interactable elements.
   * Also it would follow a nice hierarchy: lion-form -> lion-fieldset -> lion-field
   *
   * Note: We don't support placeholders, because we have a helper text and
   * placeholders confuse the user with accessibility needs.
   *
   * Please see the docs for in depth information.
   *
   * @example
   * <lion-field name="myName">
   *   <label slot="label">My Input</label>
   *   <input type="text" slot="input">
   * </lion-field>
   *
   * @customElement lion-field
   */
  class LionField extends FormControlMixin(
    InteractionStateMixin(FocusMixin(FormatMixin(ValidateMixin(SlotMixin(s))))),
  ) {
    /**
     * @param {import('@lion/core').PropertyValues } changedProperties
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      /** @type {any} */
      this._initialModelValue = this.modelValue;
    }

    connectedCallback() {
      super.connectedCallback();
      this._onChange = this._onChange.bind(this);
      this._inputNode.addEventListener('change', this._onChange);
      this.classList.add('form-field'); // eslint-disable-line
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._inputNode.removeEventListener('change', this._onChange);
    }

    resetInteractionState() {
      super.resetInteractionState();
      this.submitted = false;
    }

    /**
     * Resets modelValue to initial value.
     * Interaction states are cleared
     */
    reset() {
      this.modelValue = this._initialModelValue;
      this.resetInteractionState();
    }

    /**
     * Clears modelValue.
     * Interaction states are not cleared (use resetInteractionState for this)
     */
    clear() {
      // TODO: [v1] set to undefined
      this.modelValue = '';
    }

    /**
     * Dispatches custom bubble event
     * @protected
     */
    _onChange() {
      /** @protectedEvent user-input-changed */
      this.dispatchEvent(new Event('user-input-changed', { bubbles: true }));
    }

    /**
     * @configure InteractionStateMixin, ValidateMixin
     */
    get _feedbackConditionMeta() {
      return { ...super._feedbackConditionMeta, focused: this.focused };
    }

    /**
     * @configure FocusMixin
     */
    get _focusableNode() {
      return this._inputNode;
    }
  }

  /* eslint-disable */

  /**
   * This class closely mimics the natively
   * supported HTMLFormControlsCollection. It can be accessed
   * both like an array and an object (based on control/element names).
   * @example
   * // This is how a native form works:
   * <form>
   *   <input id="a" name="a">
   *   <fieldset>
   *      <input id="b1" name="b[]">
   *      <input id="b2" name="b[]">
   *      <input id="c" name="c">
   *   </fieldset>
   *   <select id="d" name="d">
   *     <option></option>
   *   </select>
   *   <fieldset>
   *     <input type="radio" id="e1" name="e">
   *     <input type="radio" id="e2" name="e">
   *   </fieldset>
   *   <select id="f" name="f" multiple>
   *     <option></option>
   *   </select>
   *   <fieldset>
   *     <input type="checkbox" id="g1" name="g">
   *     <input type="checkbox" id="g2" name="g">
   *   </fieldset>
   * </form>
   *
   * form.elements[0]; // Element input#a
   * form.elements[1]; // Element input#b1
   * form.elements[2]; // Element input#b2
   * form.elements[3]; // Element input#c
   * form.elements.a;  // Element input#a
   * form.elements.b;  // RadioNodeList<Element> [input#b1, input#b2]
   * form.elements.c;  // input#c
   *
   * // This is how a Lion form works (for simplicity Lion components have the 'l'-prefix):
   * <l-form>
   *  <form>
   *
   *    <!-- fields -->
   *
   *    <l-input id="a" name="a"></l-input>
   *
   *
   *    <!-- field sets ('sub forms') -->
   *
   *    <l-fieldset>
   *      <l-input id="b1" name="b"</l-input>
   *      <l-input id="b2" name="b"></l-input>
   *      <l-input id="c" name="c"></l-input>
   *    </l-fieldset>
   *
   *
   *    <!-- choice groups (children are 'end points') -->
   *
   *    <!-- single selection choice groups -->
   *    <l-select id="d" name="d">
   *      <l-option></l-option>
   *    </l-select>
   *    <l-radio-group id="e" name="e">
   *      <l-radio></l-radio>
   *      <l-radio></l-radio>
   *    </l-radio-group>
   *
   *    <!-- multi selection choice groups -->
   *    <l-select id="f" name="f" multiple>
   *      <l-option></l-option>
   *    </l-select>
   *    <l-checkbox-group id="g" name="g">
   *      <l-checkbox></l-checkbox>
   *      <l-checkbox></l-checkbox>
   *    </l-checkbox-group>
   *
   *  </form>
   * </l-form>
   *
   * lionForm.formElements[0];                  // Element l-input#a
   * lionForm.formElements[1];                  // Element l-input#b1
   * lionForm.formElements[2];                  // Element l-input#b2
   * lionForm.formElements.a;                   // Element l-input#a
   * lionForm.formElements['b[]'];              // Array<Element> [l-input#b1, l-input#b2]
   * lionForm.formElements.c;                   // Element l-input#c
   *
   * lionForm.formElements[d-g].formElements; // Array<Element>
   *
   * lionForm.formElements[d-e].value;          // String
   * lionForm.formElements[f-g].value;          // Array<String>
   */
  class FormControlsCollection extends Array {
    /**
     * @desc Gives back the named keys and filters out array indexes
     * @return {string[]}
     * @protected
     */
    _keys() {
      return Object.keys(this).filter(k => Number.isNaN(Number(k)));
    }
  }

  // eslint-disable-next-line max-classes-per-file

  /**
   * @typedef {import('../../types/FormControlMixinTypes').FormControlHost} FormControlHost
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').FormRegistrarMixin} FormRegistrarMixin
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').FormRegistrarHost} FormRegistrarHost
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').ElementWithParentFormGroup} ElementWithParentFormGroup
   * @typedef {import('../../types/registration/FormRegisteringMixinTypes').FormRegisteringHost} FormRegisteringHost
   * @typedef {FormControlHost & HTMLElement & {_parentFormGroup?:HTMLElement, checked?:boolean}} FormControl
   */

  /**
   * @desc This allows an element to become the manager of a register.
   * It basically keeps track of a FormControlsCollection that it stores in .formElements
   * This will always be an array of all elements.
   * In case of a form or fieldset(sub form), it will also act as a key based object with FormControl
   * (fields, choice groups or fieldsets)as keys.
   * For choice groups, the value will only stay an array.
   * See FormControlsCollection for more information
   * @type {FormRegistrarMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const FormRegistrarMixinImplementation = superclass =>
    // eslint-disable-next-line no-shadow, no-unused-vars
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class extends FormRegisteringMixin(superclass) {
      /** @type {any} */
      static get properties() {
        return {
          _isFormOrFieldset: { type: Boolean },
        };
      }

      constructor() {
        super();

        /**
         * Closely mimics the natively supported HTMLFormControlsCollection. It can be accessed
         * both like an array and an object (based on control/element names).
         * @type {FormControlsCollection}
         */
        this.formElements = new FormControlsCollection();

        /**
         * Flag that determines how ".formElements" should behave.
         * For a regular fieldset (see LionFieldset) we expect ".formElements"
         * to be accessible as an object.
         * In case of a radio-group, a checkbox-group or a select/listbox,
         * it should act like an array (see ChoiceGroupMixin).
         * Usually, when false, we deal with a choice-group (radio-group, checkbox-group,
         * (multi)select)
         * @type {boolean}
         * @protected
         */
        this._isFormOrFieldset = false;

        this._onRequestToAddFormElement = this._onRequestToAddFormElement.bind(this);
        this._onRequestToChangeFormElementName = this._onRequestToChangeFormElementName.bind(this);

        this.addEventListener(
          'form-element-register',
          /** @type {EventListenerOrEventListenerObject} */ (this._onRequestToAddFormElement),
        );
        this.addEventListener(
          'form-element-name-changed',
          /** @type {EventListenerOrEventListenerObject} */ (this._onRequestToChangeFormElementName),
        );

        /**
         * initComplete resolves after all pending initialization logic
         * (for instance `<form-group .serializedValue=${{ child1: 'a', child2: 'b' }}>`)
         * is executed
         * @type {Promise<any>}
         */
        this.initComplete = new Promise((resolve, reject) => {
          this.__resolveInitComplete = resolve;
          this.__rejectInitComplete = reject;
        });

        /**
         * registrationComplete waits for all children formElements to have registered
         * @type {Promise<any> & {done?:boolean}}
         */
        this.registrationComplete = new Promise((resolve, reject) => {
          this.__resolveRegistrationComplete = resolve;
          this.__rejectRegistrationComplete = reject;
        });
        this.registrationComplete.done = false;
        this.registrationComplete.then(
          () => {
            this.registrationComplete.done = true;
            this.__resolveInitComplete(undefined);
          },
          () => {
            this.registrationComplete.done = true;
            this.__rejectInitComplete(undefined);
            throw new Error(
              'Registration could not finish. Please use await el.registrationComplete;',
            );
          },
        );
      }

      connectedCallback() {
        super.connectedCallback();
        this._completeRegistration();
      }

      /**
       * Resolves the registrationComplete promise. Subclassers can delay if needed
       * @overridable
       */
      _completeRegistration() {
        Promise.resolve().then(() => this.__resolveRegistrationComplete(undefined));
      }

      disconnectedCallback() {
        super.disconnectedCallback();

        if (this.registrationComplete.done === false) {
          Promise.resolve().then(() => {
            Promise.resolve().then(() => {
              this.__rejectRegistrationComplete();
            });
          });
        }
      }

      /**
       *
       * @param {ElementWithParentFormGroup} el
       */
      isRegisteredFormElement(el) {
        return this.formElements.some(exitingEl => exitingEl === el);
      }

      /**
       * @param {FormControl} child the child element (field)
       * @param {number} indexToInsertAt index to insert the form element at
       */
      addFormElement(child, indexToInsertAt) {
        // This is a way to let the child element (a lion-fieldset or lion-field) know, about its parent
        // eslint-disable-next-line no-param-reassign
        child._parentFormGroup = /** @type {* & FormRegistrarHost} */ (this);

        // 1. Add children as array element
        if (indexToInsertAt >= 0) {
          this.formElements.splice(indexToInsertAt, 0, child);
        } else {
          this.formElements.push(child);
        }

        // 2. Add children as object key
        if (this._isFormOrFieldset) {
          const { name } = child;
          if (name === this.name) {
            console.info('Error Node:', child); // eslint-disable-line no-console
            throw new TypeError(`You can not have the same name "${name}" as your parent`);
          }

          if (name.substr(-2) === '[]') {
            if (!Array.isArray(this.formElements[name])) {
              this.formElements[name] = new FormControlsCollection();
            }
            if (indexToInsertAt > 0) {
              this.formElements[name].splice(indexToInsertAt, 0, child);
            } else {
              this.formElements[name].push(child);
            }
          } else if (!this.formElements[name]) {
            this.formElements[name] = child;
          } else {
            console.info('Error Node:', child); // eslint-disable-line no-console
            throw new TypeError(
              `Name "${name}" is already registered - if you want an array add [] to the end`,
            );
          }
        }
      }

      /**
       * @param {FormControlHost} child the child element (field)
       */
      removeFormElement(child) {
        // 1. Handle array based children
        const index = this.formElements.indexOf(child);
        if (index > -1) {
          this.formElements.splice(index, 1);
        }

        // 2. Handle name based object keys
        if (this._isFormOrFieldset) {
          const { name } = child; // FIXME: <-- ElementWithParentFormGroup should become LionFieldWithParentFormGroup so that "name" exists
          if (name.substr(-2) === '[]' && this.formElements[name]) {
            const idx = this.formElements[name].indexOf(child);
            if (idx > -1) {
              this.formElements[name].splice(idx, 1);
            }
          } else if (this.formElements[name]) {
            delete this.formElements[name];
          }
        }
      }

      /**
       * Hook for Subclassers to perform logic before an element is added
       * @param {CustomEvent} ev
       * @protected
       */
      _onRequestToAddFormElement(ev) {
        const child = ev.detail.element;
        if (child === this) {
          // as we fire and listen - don't add ourselves
          return;
        }
        if (this.isRegisteredFormElement(child)) {
          // do not readd already existing elements
          return;
        }
        ev.stopPropagation();

        // Check for DOM order to determine the right order to insert into formElements
        // If there is no other element, index is -1 (e.g. add it to the end)
        let indexToInsertAt = -1;
        if (this.formElements && Array.isArray(this.formElements)) {
          // we start comparing from the end of the array as it's the most likely position where the element will be added
          for (const [i, formElement] of this.formElements.entries()) {
            // compareDocumentPosition returns a bitmask
            // eslint-disable-next-line no-bitwise
            if (formElement.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_FOLLOWING) ; else {
              // first time child is NOT after formElement in DOM we insert it
              indexToInsertAt = i;
              break;
            }
          }
        }
        this.addFormElement(child, indexToInsertAt);
      }

      /**
       * @param {CustomEvent} ev
       * @protected
       */
      _onRequestToChangeFormElementName(ev) {
        const element = this.formElements[ev.detail.oldName];
        if (element) {
          this.formElements[ev.detail.newName] = element;
          delete this.formElements[ev.detail.oldName];
        }
      }

      /**
       * @param {CustomEvent} ev
       * @protected
       */
      _onRequestToRemoveFormElement(ev) {
        const child = ev.detail.element;
        if (child === this) {
          // as we fire and listen - don't remove ourselves
          return;
        }
        if (!this.isRegisteredFormElement(child)) {
          // do not remove non existing elements
          return;
        }
        ev.stopPropagation();

        this.removeFormElement(child);
      }
    };

  const FormRegistrarMixin = dedupeMixin(FormRegistrarMixinImplementation);

  /**
   * @typedef {import('../types/NativeTextFieldMixinTypes').NativeTextFieldMixin} NativeTextFieldMixin
   * @type {NativeTextFieldMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass} superclass
   */
  const NativeTextFieldMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class NativeTextFieldMixin extends FormatMixin(FocusMixin(FormControlMixin(superclass))) {
      /** @type {any} */
      static get properties() {
        return {
          autocomplete: { type: String, reflect: true },
        };
      }

      constructor() {
        super();

        /**
         * Delegates this property to input/textarea/select.
         * @type {string | undefined}
         */
        this.autocomplete = undefined;
      }

      /**
       * @protected
       * @type {HTMLInputElement | HTMLTextAreaElement}
       */
      get _inputNode() {
        return /** @type {HTMLInputElement | HTMLTextAreaElement} */ (super._inputNode);
      }

      /** @type {number} */
      get selectionStart() {
        const native = this._inputNode;
        if (native && native.selectionStart) {
          return native.selectionStart;
        }
        return 0;
      }

      set selectionStart(value) {
        const native = this._inputNode;
        if (native && native.selectionStart) {
          native.selectionStart = value;
        }
      }

      /** @type {number} */
      get selectionEnd() {
        const native = this._inputNode;
        if (native && native.selectionEnd) {
          return native.selectionEnd;
        }
        return 0;
      }

      set selectionEnd(value) {
        const native = this._inputNode;
        if (native && native.selectionEnd) {
          native.selectionEnd = value;
        }
      }

      /**
       * The view value. Will be delegated to `._inputNode.value`
       * @override FormatMixin
       */
      get value() {
        return (this._inputNode && this._inputNode.value) || this.__value || '';
      }

      /**
       * @param {string} value
       * @override FormatMixin - We don't delegate, because we want to preserve caret position via _setValueAndPreserveCaret
       */
      set value(value) {
        // if not yet connected to dom can't change the value
        if (this._inputNode) {
          // Only set if newValue is new, fix for Safari bug: https://github.com/ing-bank/lion/issues/1415
          if (this._inputNode.value !== value) {
            this._setValueAndPreserveCaret(value);
          }
          /** @type {string | undefined} */
          this.__value = undefined;
        } else {
          this.__value = value;
        }
      }

      /**
       * Restores the cursor to its original position after updating the value.
       * @param {string} newValue The value that should be saved.
       * @protected
       */
      _setValueAndPreserveCaret(newValue) {
        // Only preserve caret if focused (changing selectionStart will move focus in Safari)
        if (this.focused) {
          // Not all elements might have selection, and even if they have the
          // right properties, accessing them might throw an exception (like for
          // <input type=number>)
          try {
            // SelectElement doesn't have selectionStart/selectionEnd
            if (!(this._inputNode instanceof HTMLSelectElement)) {
              const start = this._inputNode.selectionStart;
              this._inputNode.value = newValue;
              // The cursor automatically jumps to the end after re-setting the value,
              // so restore it to its original position.
              this._inputNode.selectionStart = start;
              this._inputNode.selectionEnd = start;
            }
          } catch (error) {
            // Just set the value and give up on the caret.
            this._inputNode.value = newValue;
          }
        } else {
          this._inputNode.value = newValue;
        }
      }

      /**
       * @override FormatMixin
       */
      _reflectBackFormattedValueToUser() {
        super._reflectBackFormattedValueToUser();
        if (this._reflectBackOn() && this.focused) {
          try {
            // try/catch, because Safari is a bit sensitive here
            this._inputNode.selectionStart = this._inputNode.value.length;
            // eslint-disable-next-line no-empty
          } catch (_) {}
        }
      }

      /**
       * @configure FocusMixin
       */
      get _focusableNode() {
        return this._inputNode;
      }
    };

  const NativeTextFieldMixin = dedupeMixin(NativeTextFieldMixinImplementation);

  /* eslint-disable max-classes-per-file */

  /**
   * @param {?} value
   */
  const isString = value => typeof value === 'string';

  /**
   * @param {?} value
   * @param {RegExp} pattern
   */
  const hasPattern = (value, pattern) => pattern.test(value);
  class Pattern extends Validator {
    static get validatorName() {
      return 'Pattern';
    }

    /**
     * @param {?} value
     */
    // eslint-disable-next-line class-methods-use-this
    execute(value, pattern = this.param) {
      if (!(pattern instanceof RegExp)) {
        throw new Error(
          'Psst... Pattern validator expects RegExp object as parameter e.g, new Pattern(/#LionRocks/) or new Pattern(RegExp("#LionRocks")',
        );
      }
      let hasError = false;
      if (!isString(value) || !hasPattern(value, pattern)) {
        hasError = true;
      }

      return hasError;
    }
  }

  /**
   * @typedef {import('../../types/choice-group/ChoiceGroupMixinTypes').ChoiceGroupMixin} ChoiceGroupMixin
   * @typedef {import('../../types/FormControlMixinTypes').FormControlHost} FormControlHost
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').ElementWithParentFormGroup} ElementWithParentFormGroup
   * @typedef {import('../../types/form-group/FormGroupMixinTypes').FormControl} FormControl
   * @typedef {import('../../types/choice-group/ChoiceInputMixinTypes').ChoiceInputHost} ChoiceInputHost
   */

  /**
   * ChoiceGroupMixin applies on both Fields (listbox/select-rich/combobox)  and FormGroups
   * (radio-group, checkbox-group)
   * TODO: Ideally, the ChoiceGroupMixin should not depend on InteractionStateMixin, which is only
   * designed for usage with Fields, in other words: their interaction states are not derived from
   * children events, like in FormGroups
   *
   * @type {ChoiceGroupMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const ChoiceGroupMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class ChoiceGroupMixin extends FormRegistrarMixin(InteractionStateMixin(superclass)) {
      /** @type {any} */
      static get properties() {
        return {
          multipleChoice: { type: Boolean, attribute: 'multiple-choice' },
        };
      }

      get modelValue() {
        const elems = this._getCheckedElements();
        if (this.multipleChoice) {
          return elems.map(el => el.choiceValue);
        }
        return elems[0] ? elems[0].choiceValue : '';
      }

      set modelValue(value) {
        /**
         * @param {ChoiceInputHost} el
         * @param {any} val
         */
        const checkCondition = (el, val) => {
          if (typeof el.choiceValue === 'object') {
            return JSON.stringify(el.choiceValue) === JSON.stringify(value);
          }
          return el.choiceValue === val;
        };

        if (this.__isInitialModelValue) {
          this.registrationComplete.then(() => {
            this.__isInitialModelValue = false;
            this._setCheckedElements(value, checkCondition);
            this.requestUpdate('modelValue', this._oldModelValue);
          });
        } else {
          this._setCheckedElements(value, checkCondition);
          this.requestUpdate('modelValue', this._oldModelValue);
        }
        this._oldModelValue = this.modelValue;
      }

      get serializedValue() {
        // We want to filter out disabled values out by default:
        // The goal of serializing values could either be submitting state to a backend
        // ot storing state in a backend. For this, only values that are entered by the end
        // user are relevant, choice values are always defined by the Application Developer
        // and known by the backend.

        // Assuming values are always defined as strings, modelValues and serializedValues
        // are the same.
        const elems = this._getCheckedElements();
        if (this.multipleChoice) {
          return elems.map(el => el.serializedValue.value);
        }
        return elems[0] ? elems[0].serializedValue.value : '';
      }

      set serializedValue(value) {
        /**
         * @param {ChoiceInputHost} el
         * @param {string} val
         */
        const checkCondition = (el, val) => el.serializedValue.value === val;

        if (this.__isInitialSerializedValue) {
          this.registrationComplete.then(() => {
            this.__isInitialSerializedValue = false;
            this._setCheckedElements(value, checkCondition);
            this.requestUpdate('serializedValue');
          });
        } else {
          this._setCheckedElements(value, checkCondition);
          this.requestUpdate('serializedValue');
        }
      }

      get formattedValue() {
        const elems = this._getCheckedElements();
        if (this.multipleChoice) {
          return elems.map(el => el.formattedValue);
        }
        return elems[0] ? elems[0].formattedValue : '';
      }

      set formattedValue(value) {
        /**
         * @param {{ formattedValue: string }} el
         * @param {string} val
         */
        const checkCondition = (el, val) => el.formattedValue === val;

        if (this.__isInitialFormattedValue) {
          this.registrationComplete.then(() => {
            this.__isInitialFormattedValue = false;
            this._setCheckedElements(value, checkCondition);
          });
        } else {
          this._setCheckedElements(value, checkCondition);
        }
      }

      constructor() {
        super();

        /**
         * When false (default), modelValue and serializedValue will reflect the
         * currently selected choice (usually a string). When true, modelValue will and
         * serializedValue will be an array of strings.
         * @type {boolean}
         */
        this.multipleChoice = false;

        /**
         * @type {'child'|'choice-group'|'fieldset'}
         * @configure FormControlMixin event propagation
         * @protected
         */
        this._repropagationRole = 'choice-group';
        /** @private */
        this.__isInitialModelValue = true;
        /** @private */
        this.__isInitialSerializedValue = true;
        /** @private */
        this.__isInitialFormattedValue = true;
      }

      connectedCallback() {
        super.connectedCallback();

        this.registrationComplete.then(() => {
          this.__isInitialModelValue = false;
          this.__isInitialSerializedValue = false;
          this.__isInitialFormattedValue = false;
        });
      }

      /**
       * @enhance FormRegistrarMixin: we need one extra microtask to complete
       */
      _completeRegistration() {
        // Double microtask queue to account for Webkit race condition
        Promise.resolve().then(() => super._completeRegistration());
      }

      /** @param {import('@lion/core').PropertyValues} changedProperties */
      updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('name') && this.name !== changedProperties.get('name')) {
          this.formElements.forEach(child => {
            // eslint-disable-next-line no-param-reassign
            child.name = this.name;
          });
        }
      }

      /**
       * @enhance FormRegistrarMixin
       * @param {FormControl} child
       * @param {number} indexToInsertAt
       */
      addFormElement(child, indexToInsertAt) {
        this._throwWhenInvalidChildModelValue(child);
        // eslint-disable-next-line no-param-reassign
        child.name = this.name;
        super.addFormElement(child, indexToInsertAt);
      }

      clear() {
        if (this.multipleChoice) {
          this.modelValue = [];
        } else {
          this.modelValue = '';
        }
      }

      /**
       * @override from FormControlMixin
       * @protected
       */
      _triggerInitialModelValueChangedEvent() {
        this.registrationComplete.then(() => {
          this._dispatchInitialModelValueChangedEvent();
        });
      }

      /**
       * A filter function which will exclude a form field when returning false
       * By default, exclude form fields which are disabled
       *
       * The type is be passed as well for more fine grained control, e.g.
       * distinguish the filter when fetching modelValue versus serializedValue
       *
       * @param {FormControl} el
       * @param {string} type
       * @returns {boolean}
       */
      // eslint-disable-next-line class-methods-use-this, no-unused-vars
      _getFromAllFormElementsFilter(el, type) {
        return true;
      }

      /**
       * Implicit :( @override for FormGroupMixin, as choice fields "fieldsets"
       * will always implement both mixins
       *
       * TODO: Consider making this explicit by extracting this method to its own mixin and
       * using it in both FormGroupMixin and ChoiceGroupMixin, then override it here
       * This also makes it more DRY as we have same method with similar implementation
       * in FormGroupMixin. I (@jorenbroekema) think the abstraction is worth it here..
       *
       * @param {string} property
       * @param {(el: FormControl, property?: string) => boolean} [filterFn]
       * @returns {{[name:string]: any}}
       * @protected
       */
      _getFromAllFormElements(property, filterFn) {
        // Prioritizes imperatively passed filter function over the protected method
        const _filterFn = filterFn || this._getFromAllFormElementsFilter;

        // For modelValue, serializedValue and formattedValue, an exception should be made,
        // The reset can be requested from children
        if (
          property === 'modelValue' ||
          property === 'serializedValue' ||
          property === 'formattedValue'
        ) {
          return this[property];
        }
        return this.formElements.filter(el => _filterFn(el, property)).map(el => el.property);
      }

      /**
       * @param {FormControl} child
       * @protected
       */
      _throwWhenInvalidChildModelValue(child) {
        if (
          typeof child.modelValue.checked !== 'boolean' ||
          !Object.prototype.hasOwnProperty.call(child.modelValue, 'value')
        ) {
          throw new Error(
            `The ${this.tagName.toLowerCase()} name="${
            this.name
          }" does not allow to register ${child.tagName.toLowerCase()} with .modelValue="${
            child.modelValue
          }" - The modelValue should represent an Object { value: "foo", checked: false }`,
          );
        }
      }

      /**
       * @protected
       */
      _isEmpty() {
        if (this.multipleChoice) {
          return this.modelValue.length === 0;
        }

        if (typeof this.modelValue === 'string' && this.modelValue === '') {
          return true;
        }
        if (this.modelValue === undefined || this.modelValue === null) {
          return true;
        }
        return false;
      }

      /**
       * @param {CustomEvent & {target:FormControl}} ev
       * @protected
       */
      _checkSingleChoiceElements(ev) {
        const { target } = ev;
        if (target.checked === false) return;

        const groupName = target.name;
        this.formElements
          .filter(i => i.name === groupName)
          .forEach(choice => {
            if (choice !== target) {
              choice.checked = false; // eslint-disable-line no-param-reassign
            }
          });
        // this.__triggerCheckedValueChanged();
      }

      /**
       * @protected
       */
      _getCheckedElements() {
        // We want to filter out disabled values by default
        return this.formElements.filter(el => el.checked && !el.disabled);
      }

      /**
       * @param {string | any[]} value
       * @param {Function} check
       * @protected
       */
      _setCheckedElements(value, check) {
        if (value === null || value === undefined) {
          // Uncheck all
          // eslint-disable-next-line no-return-assign, no-param-reassign
          this.formElements.forEach(fe => (fe.checked = false));
          return;
        }
        for (let i = 0; i < this.formElements.length; i += 1) {
          if (this.multipleChoice) {
            let valueIsIncluded = value.includes(this.formElements[i].modelValue.value);

            // For complex values, do a JSON Stringified includes check, because [{ v: 'foo'}].includes({ v: 'foo' }) => false
            if (typeof this.formElements[i].modelValue.value === 'object') {
              valueIsIncluded = /** @type {any[]} */ (value)
                .map(/** @param {Object} v */ v => JSON.stringify(v))
                .includes(JSON.stringify(this.formElements[i].modelValue.value));
            }

            this.formElements[i].checked = valueIsIncluded;
          } else if (check(this.formElements[i], value)) {
            // Allows checking against custom values e.g. formattedValue or serializedValue
            this.formElements[i].checked = true;
          } else {
            this.formElements[i].checked = false;
          }
        }
      }

      /**
       * @private
       */
      __setChoiceGroupTouched() {
        const value = this.modelValue;
        if (value != null && value !== this.__previousCheckedValue) {
          // TODO: what happens here exactly? Needs to be based on user interaction (?)
          this.touched = true;
          this.__previousCheckedValue = value;
        }
      }

      /**
       * @override FormControlMixin
       * @param {CustomEvent} ev
       * @protected
       */
      _onBeforeRepropagateChildrenValues(ev) {
        // Normalize target, since we might receive 'portal events' (from children in a modal,
        // see select-rich)
        const target = (ev.detail && ev.detail.element) || ev.target;
        if (this.multipleChoice || !target.checked) {
          return;
        }
        this.formElements.forEach(option => {
          if (target.choiceValue !== option.choiceValue) {
            option.checked = false; // eslint-disable-line no-param-reassign
          }
        });
        this.__setChoiceGroupTouched();
        this.requestUpdate('modelValue', this._oldModelValue);
        this._oldModelValue = this.modelValue;
      }

      /**
       * @param {FormControlHost & ChoiceInputHost} target
       * @protected
       * @configure FormControlMixin: don't repropagate unchecked single choice choiceInputs
       */
      _repropagationCondition(target) {
        return !(
          this._repropagationRole === 'choice-group' &&
          !this.multipleChoice &&
          !target.checked
        );
      }
    };

  const ChoiceGroupMixin = dedupeMixin(ChoiceGroupMixinImplementation);

  /* eslint-disable class-methods-use-this */


  /**
   * @typedef {import('../../types/FormControlMixinTypes').FormControlHost} FormControlHost
   * @typedef {FormControlHost & HTMLElement & {_parentFormGroup?:HTMLElement, checked?:boolean}} FormControl
   * @typedef {import('../../types/choice-group/ChoiceInputMixinTypes').ChoiceInputMixin} ChoiceInputMixin
   * @typedef {import('../../types/choice-group/ChoiceInputMixinTypes').ChoiceInputModelValue} ChoiceInputModelValue
   */

  /**
   * @param {ChoiceInputModelValue} nw\
   * @param {{value?:any, checked?:boolean}} old
   */
  const hasChanged = (nw, old = {}) => nw.value !== old.value || nw.checked !== old.checked;

  /**
   * @type {ChoiceInputMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const ChoiceInputMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class ChoiceInputMixin extends FormatMixin(superclass) {
      /** @type {any} */
      static get properties() {
        return {
          checked: { type: Boolean, reflect: true },
          disabled: { type: Boolean, reflect: true },
          modelValue: { type: Object, hasChanged },
          choiceValue: { type: Object },
        };
      }

      /**
       * The value that will be registered to the modelValue of the parent ChoiceGroup. Recommended
       * to be a string
       * @type {string|any}
       */
      get choiceValue() {
        return this.modelValue.value;
      }

      set choiceValue(value) {
        this.requestUpdate('choiceValue', this.choiceValue);
        if (this.modelValue.value !== value) {
          /** @type {ChoiceInputModelValue} */
          this.modelValue = { value, checked: this.modelValue.checked };
        }
      }

      /**
       * @param {string} name
       * @param {any} oldValue
       */
      requestUpdate(name, oldValue) {
        super.requestUpdate(name, oldValue);

        if (name === 'modelValue') {
          if (this.modelValue.checked !== this.checked) {
            this.__syncModelCheckedToChecked(this.modelValue.checked);
          }
        } else if (name === 'checked') {
          if (this.modelValue.checked !== this.checked) {
            this.__syncCheckedToModel(this.checked);
          }
        }
      }

      /**
       * @param {import('@lion/core').PropertyValues } changedProperties
       */
      firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (changedProperties.has('checked')) {
          // Here we set the initial value for our [slot=input] content,
          // which has been set by our SlotMixin
          this.__syncCheckedToInputElement();
        }
      }

      /**
       * @param {import('@lion/core').PropertyValues } changedProperties
       */
      updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('modelValue')) {
          this.__syncCheckedToInputElement();
        }

        if (
          changedProperties.has('name') &&
          this._parentFormGroup &&
          this._parentFormGroup.name !== this.name
        ) {
          this._syncNameToParentFormGroup();
        }
      }

      constructor() {
        super();
        /**
         * Boolean indicating whether or not this element is checked by the end user.
         */
        // TODO: [v1] this can be solved when property effects are scheduled until firstUpdated
        // this.checked = false;
        /**
         * Whereas 'normal' `.modelValue`s usually store a complex/typed version
         * of a view value, choice inputs have a slightly different approach.
         * In order to remain their Single Source of Truth characteristic, choice inputs
         * store both the value and 'checkedness', in the format { value: 'x', checked: true }
         * Different from the platform, this also allows to serialize the 'non checkedness',
         * allowing to restore form state easily and inform the server about unchecked options.
         * @type {{value:string|any,checked:boolean}}
         */
        this.modelValue = { value: '', checked: false };
        // TODO: maybe disabled is more a concern of FormControl/Field?
        /**
         * Boolean indicating whether or not this element is disabled.
         * @type {boolean}
         */
        this.disabled = false;

        /**
         * The value property of the modelValue. It provides an easy interface for storing
         * (complex) values in the modelValue
         */

        /** @protected */
        this._preventDuplicateLabelClick = this._preventDuplicateLabelClick.bind(this);
        /** @protected */
        this._toggleChecked = this._toggleChecked.bind(this);
      }

      /**
       * Styles for [input=radio] and [input=checkbox] wrappers.
       * For [role=option] extensions, please override completely
       */
      static get styles() {
        return [
          ...(super.styles || []),
          i`
          :host {
            display: flex;
            flex-wrap: wrap;
          }

          :host([hidden]) {
            display: none;
          }

          .choice-field__graphic-container {
            display: none;
          }
          .choice-field__help-text {
            display: block;
            flex-basis: 100%;
          }
        `,
        ];
      }

      /**
       * Template for [input=radio] and [input=checkbox] wrappers.
       * For [role=option] extensions, please override completely
       */
      render() {
        return x`
        <slot name="input"></slot>
        <div class="choice-field__graphic-container">${this._choiceGraphicTemplate()}</div>
        <div class="choice-field__label">
          <slot name="label"></slot>
        </div>
        <small class="choice-field__help-text">
          <slot name="help-text"></slot>
        </small>
        ${this._afterTemplate()}
      `;
      }

      /**
       * @protected
       */
      _choiceGraphicTemplate() {
        return A;
      }

      /**
       * @protected
       */
      _afterTemplate() {
        return A;
      }

      connectedCallback() {
        super.connectedCallback();
        if (this._labelNode) {
          this._labelNode.addEventListener('click', this._preventDuplicateLabelClick);
        }
        this.addEventListener('user-input-changed', this._toggleChecked);
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        if (this._labelNode) {
          this._labelNode.removeEventListener('click', this._preventDuplicateLabelClick);
        }
        this.removeEventListener('user-input-changed', this._toggleChecked);
      }

      /**
       * The native platform fires an event for both the click on the label, and also
       * the redispatched click on the native input element.
       * This results in two click events arriving at the host, but we only want one.
       * This method prevents the duplicate click and ensures the correct isTrusted event
       * with the correct event.target arrives at the host.
       * @param {Event} ev
       * @protected
       */
      // eslint-disable-next-line no-unused-vars
      _preventDuplicateLabelClick(ev) {
        const __inputClickHandler = /** @param {Event} _ev */ _ev => {
          _ev.stopImmediatePropagation();
          this._inputNode.removeEventListener('click', __inputClickHandler);
        };
        this._inputNode.addEventListener('click', __inputClickHandler);
      }

      /**
       * @param {Event} ev
       * @protected
       */
      // eslint-disable-next-line no-unused-vars
      _toggleChecked(ev) {
        if (this.disabled) {
          return;
        }
        this._isHandlingUserInput = true;
        this.checked = !this.checked;
        this._isHandlingUserInput = false;
      }

      // TODO: make this less fuzzy by applying these methods in LionRadio and LionCheckbox
      // via instanceof (or feat. detection for tree-shaking in case parentGroup not needed)
      /**
       * Override this in case of extending ChoiceInputMixin and requiring
       * to sync differently with parent form group name
       * Right now it checks tag name match where the parent form group tagname
       * should include the child field tagname ('checkbox' is included in 'checkbox-group')
       * @protected
       */
      _syncNameToParentFormGroup() {
        // @ts-expect-error [external]: tagName should be a prop of HTMLElement
        if (this._parentFormGroup.tagName.includes(this.tagName)) {
          this.name = this._parentFormGroup?.name || '';
        }
      }

      /**
       * @param {boolean} checked
       * @private
       */
      __syncModelCheckedToChecked(checked) {
        this.checked = checked;
      }

      /**
       * @param {any} checked
       * @private
       */
      __syncCheckedToModel(checked) {
        this.modelValue = { value: this.choiceValue, checked };
      }

      /**
       * @private
       */
      __syncCheckedToInputElement() {
        // ._inputNode might not be available yet(slot content)
        // or at all (no reliance on platform construct, in case of [role=option])
        if (this._inputNode) {
          /** @type {HTMLInputElement} */
          (this._inputNode).checked = this.checked;
        }
      }

      /**
       * @override
       * This method is overridden from FormatMixin. It originally fired the normalizing
       * 'user-input-changed' event after listening to the native 'input' event.
       * However on Chrome on Mac whenever you use the keyboard
       * it fires the input AND change event. Other Browsers only fires the change event.
       * Therefore we disable the input event here.
       * @protected
       */
      _proxyInputEvent() {}

      /**
       * @override
       * hasChanged is designed for async (updated) callback, also check for sync
       * (requestUpdate) callback
       * @param {{ modelValue:unknown }} newV
       * @param {{ modelValue:unknown }} [old]
       * @protected
       */
      _onModelValueChanged({ modelValue }, old) {
        let _old;
        if (old && old.modelValue) {
          _old = old.modelValue;
        }
        // @ts-expect-error [external]: lit private property
        if (this.constructor.elementProperties.get('modelValue').hasChanged(modelValue, _old)) {
          super._onModelValueChanged({ modelValue });
        }
      }

      /**
       * @override
       * Overridden from FormatMixin, since a different modelValue is used for choice inputs.
       * Sets modelValue based on checked state (instead of value), so that changes will be detected.
       */
      parser() {
        return this.modelValue;
      }

      /**
       * @override Overridden from FormatMixin, since a different modelValue is used for choice inputs.
       * @param {ChoiceInputModelValue } modelValue
       */
      formatter(modelValue) {
        return modelValue && modelValue.value !== undefined ? modelValue.value : modelValue;
      }

      /**
       * @override
       * Overridden from LionField, since the modelValue should not be cleared.
       */
      // @ts-expect-error FIXME: @override gives error because LionField is not superclass type, this mixin should only allow LionField extensions
      clear() {
        this.checked = false;
      }

      /**
       * Used for required validator.
       * @protected
       */
      _isEmpty() {
        return !this.checked;
      }

      /**
       * @override
       * Overridden from FormatMixin, since a different modelValue is used for choice inputs.
       * Synchronization from user input is already arranged in this Mixin.
       * @protected
       */
      _syncValueUpwards() {}
    };

  const ChoiceInputMixin = dedupeMixin(ChoiceInputMixinImplementation);

  class FormElementsHaveNoError extends Validator {
    static get validatorName() {
      return 'FormElementsHaveNoError';
    }

    /**
     * @param {unknown} [value]
     * @param {string | undefined} [options]
     * @param {{ node: any }} [config]
     */
    // eslint-disable-next-line class-methods-use-this
    execute(value, options, config) {
      const hasError = config?.node._anyFormElementHasFeedbackFor('error');
      return hasError;
    }

    static async getMessage() {
      return '';
    }
  }

  /**
   * @typedef {import('../../types/form-group/FormGroupMixinTypes').FormGroupMixin} FormGroupMixin
   * @typedef {import('../../types/form-group/FormGroupMixinTypes').FormGroupHost} FormGroupHost
   * @typedef {import('../../types/form-group/FormGroupMixinTypes').FormControl} FormControl
   * @typedef {import('../../types/FormControlMixinTypes').FormControlHost} FormControlHost
   * @typedef {import('../../types/registration/FormRegisteringMixinTypes').FormRegisteringHost} FormRegisteringHost
   * @typedef {import('../../types/registration/FormRegistrarMixinTypes').ElementWithParentFormGroup} ElementWithParentFormGroup
   */

  /**
   * @desc Form group mixin serves as the basis for (sub) forms. Designed to be put on
   * elements with [role="group|radiogroup"] (think of checkbox-group, radio-group, fieldset).
   * It bridges all the functionality of the child form controls:
   * ValidateMixin, InteractionStateMixin, FormatMixin, FormControlMixin etc.
   * It is designed to be used on top of FormRegistrarMixin and ChoiceGroupMixin.
   * Also, it is th basis of the LionFieldset element (which supports name based retrieval of
   * children via formElements and the automatic grouping of formElements via '[]').
   *
   * @type {FormGroupMixin}
   * @param {import('@open-wc/dedupe-mixin').Constructor<import('@lion/core').LitElement>} superclass
   */
  const FormGroupMixinImplementation = superclass =>
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/36821#issuecomment-588375051
    class FormGroupMixin extends FormRegistrarMixin(
      FormControlMixin(ValidateMixin(DisabledMixin(SlotMixin(superclass)))),
    ) {
      /** @type {any} */
      static get properties() {
        return {
          submitted: { type: Boolean, reflect: true },
          focused: { type: Boolean, reflect: true },
          dirty: { type: Boolean, reflect: true },
          touched: { type: Boolean, reflect: true },
          prefilled: { type: Boolean, reflect: true },
        };
      }

      /**
       * The host element with role group (or radigroup or form) containing neccessary aria attributes
       * @protected
       */
      get _inputNode() {
        return this;
      }

      /**
       * Object keyed by formElements names, containing formElements' modelValues
       */
      get modelValue() {
        return this._getFromAllFormElements('modelValue');
      }

      set modelValue(values) {
        if (this.__isInitialModelValue) {
          this.__isInitialModelValue = false;
          this.registrationComplete.then(() => {
            this._setValueMapForAllFormElements('modelValue', values);
          });
        } else {
          this._setValueMapForAllFormElements('modelValue', values);
        }
      }

      /**
       * Object keyed by formElements names, containing formElements' serializedValues
       */
      get serializedValue() {
        return this._getFromAllFormElements('serializedValue');
      }

      set serializedValue(values) {
        if (this.__isInitialSerializedValue) {
          this.__isInitialSerializedValue = false;
          this.registrationComplete.then(() => {
            this._setValueMapForAllFormElements('serializedValue', values);
          });
        } else {
          this._setValueMapForAllFormElements('serializedValue', values);
        }
      }

      /**
       * Object keyed by formElements names, containing formElements' formattedValues
       */
      get formattedValue() {
        return this._getFromAllFormElements('formattedValue');
      }

      set formattedValue(values) {
        this._setValueMapForAllFormElements('formattedValue', values);
      }

      /**
       * True when all of the children are prefilled (see InteractionStateMixin for more details.)
       */
      get prefilled() {
        return this._everyFormElementHas('prefilled');
      }

      constructor() {
        super();

        // ._inputNode === this, which always requires a value prop
        this.value = '';

        /**
         * Disables all formElements in group
         */
        this.disabled = false;

        /**
         * True when parent form is submitted
         */
        this.submitted = false;

        /**
         * True when any of the children is dirty (see InteractionStateMixin for more details.)
         */
        this.dirty = false;

        /**
         * True when the group as a whole is blurred (see InteractionStateMixin for more details.)
         */
        this.touched = false;

        /**
         * True when any of the children is focused.
         */
        this.focused = false;

        /** @private */
        this.__addedSubValidators = false;
        /** @private */
        this.__isInitialModelValue = true;
        /** @private */
        this.__isInitialSerializedValue = true;
        /** @private */
        this._checkForOutsideClick = this._checkForOutsideClick.bind(this);

        this.addEventListener('focusin', this._syncFocused);
        this.addEventListener('focusout', this._onFocusOut);
        this.addEventListener('dirty-changed', this._syncDirty);
        this.addEventListener('validate-performed', this.__onChildValidatePerformed);

        this.defaultValidators = [new FormElementsHaveNoError()];

        this.__descriptionElementsInParentChain = new Set();

        /** @type {{modelValue?:{[key:string]: any}, serializedValue?:{[key:string]: any}}} */
        this.__pendingValues = { modelValue: {}, serializedValue: {} };
      }

      connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'group');

        this.initComplete.then(() => {
          this.__isInitialModelValue = false;
          this.__isInitialSerializedValue = false;
          this.__initInteractionStates();
        });
      }

      disconnectedCallback() {
        super.disconnectedCallback();

        if (this.__hasActiveOutsideClickHandling) {
          document.removeEventListener('click', this._checkForOutsideClick);
          this.__hasActiveOutsideClickHandling = false;
        }
        this.__descriptionElementsInParentChain.clear();
      }

      __initInteractionStates() {
        this.formElements.forEach(el => {
          if (typeof el.initInteractionState === 'function') {
            el.initInteractionState();
          }
        });
      }

      /**
       * @override from FormControlMixin
       */
      _triggerInitialModelValueChangedEvent() {
        this.registrationComplete.then(() => {
          this._dispatchInitialModelValueChangedEvent();
        });
      }

      /**
       * @param {import('@lion/core').PropertyValues } changedProperties
       */
      updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has('disabled')) {
          if (this.disabled) {
            this.__requestChildrenToBeDisabled();
          } else {
            this.__retractRequestChildrenToBeDisabled();
          }
        }

        if (changedProperties.has('focused')) {
          if (this.focused === true) {
            this.__setupOutsideClickHandling();
          }
        }
      }

      __setupOutsideClickHandling() {
        if (!this.__hasActiveOutsideClickHandling) {
          document.addEventListener('click', this._checkForOutsideClick);
          this.__hasActiveOutsideClickHandling = true;
        }
      }

      /**
       * @param {Event} event
       */
      _checkForOutsideClick(event) {
        const outsideGroupClicked = !this.contains(/** @type {Node} */ (event.target));
        if (outsideGroupClicked) {
          this.touched = true;
        }
      }

      __requestChildrenToBeDisabled() {
        this.formElements.forEach(child => {
          if (child.makeRequestToBeDisabled) {
            child.makeRequestToBeDisabled();
          }
        });
      }

      __retractRequestChildrenToBeDisabled() {
        this.formElements.forEach(child => {
          if (child.retractRequestToBeDisabled) {
            child.retractRequestToBeDisabled();
          }
        });
      }

      // eslint-disable-next-line class-methods-use-this
      _inputGroupTemplate() {
        return x`
        <div class="input-group">
          <slot></slot>
        </div>
      `;
      }

      /**
       * Handles interaction state 'submitted'.
       * This allows children to enable visibility of validation feedback
       */
      submitGroup() {
        this.submitted = true;
        this.formElements.forEach(child => {
          if (typeof child.submitGroup === 'function') {
            child.submitGroup();
          } else {
            child.submitted = true; // eslint-disable-line no-param-reassign
          }
        });
      }

      /**
       * Resets to initial/prefilled values and interaction states of all FormControls in group,
       */
      resetGroup() {
        this.formElements.forEach(child => {
          if (typeof child.resetGroup === 'function') {
            child.resetGroup();
          } else if (typeof child.reset === 'function') {
            child.reset();
          }
        });

        this.resetInteractionState();
      }

      /**
       * Clears all values and resets all interaction states of all FormControls in group,
       */
      clearGroup() {
        this.formElements.forEach(child => {
          if (typeof child.clearGroup === 'function') {
            child.clearGroup();
          } else if (typeof child.clear === 'function') {
            child.clear();
          }
        });

        this.resetInteractionState();
      }

      /**
       * Resets all interaction states for all formElements
       */
      resetInteractionState() {
        this.submitted = false;
        this.touched = false;
        this.dirty = false;
        this.formElements.forEach(formElement => {
          if (typeof formElement.resetInteractionState === 'function') {
            formElement.resetInteractionState();
          }
        });
      }

      /**
       * A filter function which will exclude a form field when returning false
       * By default, exclude form fields which are disabled
       *
       * The type is be passed as well for more fine grained control, e.g.
       * distinguish the filter when fetching modelValue versus serializedValue
       *
       * @param {FormControl} el
       * @param {string} type
       * @returns {boolean}
       */
      // eslint-disable-next-line class-methods-use-this, no-unused-vars
      _getFromAllFormElementsFilter(el, type) {
        return !el.disabled;
      }

      /**
       * Gets a keyed be name object for requested property (like modelValue/serializedValue)
       * @param {string} property
       * @param {(el: FormControl, property?: string) => boolean} [filterFn]
       * @returns {{[name:string]: any}}
       */
      _getFromAllFormElements(property, filterFn) {
        const result = {};

        // Prioritizes imperatively passed filter function over the protected method
        const _filterFn = filterFn || this._getFromAllFormElementsFilter;

        // @ts-ignore [allow-protected]: allow Form internals to access this protected method
        this.formElements._keys().forEach(name => {
          const elem = this.formElements[name];
          if (elem instanceof FormControlsCollection) {
            result[name] = elem.filter(el => _filterFn(el, property)).map(el => el[property]);
          } else if (_filterFn(elem, property)) {
            if (typeof elem._getFromAllFormElements === 'function') {
              result[name] = elem._getFromAllFormElements(property);
            } else {
              result[name] = elem[property];
            }
          }
        });
        return result;
      }

      /**
       * Sets the same value for requested property in all formElements
       * @param {string | number} property
       * @param {any} value
       */
      _setValueForAllFormElements(property, value) {
        this.formElements.forEach(el => {
          el[property] = value; // eslint-disable-line no-param-reassign
        });
      }

      /**
       * Allows to set formElements values via a keyed object structure
       * @param {string} property
       * @param {{ [x: string]: any; }} values
       */
      _setValueMapForAllFormElements(property, values) {
        if (values && typeof values === 'object') {
          Object.keys(values).forEach(name => {
            if (Array.isArray(this.formElements[name])) {
              this.formElements[name].forEach(
                (/** @type {FormControl} */ el, /** @type {number} */ index) => {
                  el[property] = values[name][index]; // eslint-disable-line no-param-reassign
                },
              );
            }
            if (this.formElements[name]) {
              this.formElements[name][property] = values[name];
            } else {
              this.__pendingValues[property][name] = values[name];
            }
          });
        }
      }

      /**
       * Returns true when one of the formElements has requested
       * @param {string} property
       */
      _anyFormElementHas(property) {
        return Object.keys(this.formElements).some(name => {
          if (Array.isArray(this.formElements[name])) {
            return this.formElements[name].some((/** @type {FormControl} */ el) => !!el[property]);
          }
          return !!this.formElements[name][property];
        });
      }

      /**
       * @param {string} state one of ValidateHost.validationTypes
       */
      _anyFormElementHasFeedbackFor(state) {
        return Object.keys(this.formElements).some(name => {
          if (Array.isArray(this.formElements[name])) {
            return this.formElements[name].some((/** @type {FormControl} */ el) =>
              Boolean(el.hasFeedbackFor && el.hasFeedbackFor.includes(state)),
            );
          }
          return Boolean(
            this.formElements[name].hasFeedbackFor &&
              this.formElements[name].hasFeedbackFor.includes(state),
          );
        });
      }

      /**
       * Returns true when all of the formElements have requested property
       * @param {string} property
       */
      _everyFormElementHas(property) {
        return Object.keys(this.formElements).every(name => {
          if (Array.isArray(this.formElements[name])) {
            return this.formElements[name].every((/** @type {FormControl} */ el) => !!el[property]);
          }
          return !!this.formElements[name][property];
        });
      }

      // TODO: the same functionality has been implemented with model-value-changed event, which
      // covers the same and works with FormRegistrarPortalMixin
      /**
       * Gets triggered by event 'validate-performed' which enabled us to handle 2 different situations
       *  - react on modelValue change, which says something about the validity as a whole
       *  (at least two checkboxes for instance) and nothing about the children's values
       *  - children validity states have changed, so fieldset needs to update itself based on that
       * @param {Event} ev
       */
      __onChildValidatePerformed(ev) {
        if (ev && this.isRegisteredFormElement(/** @type {FormControl} */ (ev.target))) {
          this.validate();
        }
      }

      _syncFocused() {
        this.focused = this._anyFormElementHas('focused');
      }

      /**
       * @param {Event} ev
       */
      _onFocusOut(ev) {
        const lastEl = this.formElements[this.formElements.length - 1];
        if (ev.target === lastEl) {
          this.touched = true;
        }
        this.focused = false;
      }

      _syncDirty() {
        this.dirty = this._anyFormElementHas('dirty');
      }

      /**
       * Traverses the _parentFormGroup tree, and gathers all aria description elements
       * (feedback and helptext) that should be provided to children.
       *
       * In the example below, when the input for 'street' has focus, a screenreader user
       * would hear the #group-error.
       * In case one of the inputs was in error state as well, the SR user would
       * first hear the local error, followed by #group-error
       * @example
       * ```html
       * <lion-fieldset name="address">
       *   <lion-input name="street" label="Street" .modelValue="${'Park Avenue'}"></lion-input>
       *   <lion-input name="number" label="Number" .modelValue="${100}">...</lion-input>
       *   <div slot="feedback" id="group-error">
       *      Park Avenue only has numbers up to 80
       *   </div>
       * </lion-fieldset>
       * ```
       */
      __storeAllDescriptionElementsInParentChain() {
        const unTypedThis = /** @type {unknown} */ (this);
        let parent = /** @type {FormControlHost & { _parentFormGroup:any }} */ (unTypedThis);
        while (parent) {
          // @ts-ignore [allow-protected]: in parent/child relations we are allowed to call protected methods
          const descriptionElements = parent._getAriaDescriptionElements();
          const orderedEls = getAriaElementsInRightDomOrder(descriptionElements, { reverse: true });
          orderedEls.forEach(el => {
            this.__descriptionElementsInParentChain.add(el);
          });
          // Also check if the newly added child needs to refer grandparents
          parent = parent._parentFormGroup;
        }
      }

      /**
       * @param {FormControl} child
       */
      __linkParentMessages(child) {
        this.__descriptionElementsInParentChain.forEach(el => {
          if (typeof child.addToAriaDescribedBy === 'function') {
            child.addToAriaDescribedBy(el, { reorder: false });
          }
        });
      }

      /**
       * @param {FormControl} child
       */
      __unlinkParentMessages(child) {
        this.__descriptionElementsInParentChain.forEach(el => {
          if (typeof child.removeFromAriaDescribedBy === 'function') {
            child.removeFromAriaDescribedBy(el);
          }
        });
      }

      /**
       * @enhance FormRegistrarMixin: connects ValidateMixin and DisabledMixin.
       * On top of this, error messages of children are linked to their parents
       * @param {FormControl & {serializedValue:string|object}} child
       * @param {number} indexToInsertAt
       */
      addFormElement(child, indexToInsertAt) {
        super.addFormElement(child, indexToInsertAt);
        if (this.disabled) {
          child.makeRequestToBeDisabled();
        }
        if (!this.__descriptionElementsInParentChain.size) {
          this.__storeAllDescriptionElementsInParentChain();
        }
        this.__linkParentMessages(child);
        this.validate({ clearCurrentResult: true });

        if (typeof child.addToAriaLabelledBy === 'function' && this._labelNode) {
          child.addToAriaLabelledBy(this._labelNode, { reorder: false });
        }
        if (!child.modelValue) {
          const pVals = this.__pendingValues;
          if (pVals.modelValue && pVals.modelValue[child.name]) {
            // eslint-disable-next-line no-param-reassign
            child.modelValue = pVals.modelValue[child.name];
          } else if (pVals.serializedValue && pVals.serializedValue[child.name]) {
            // eslint-disable-next-line no-param-reassign
            child.serializedValue = pVals.serializedValue[child.name];
          }
        }
      }

      /**
       * Gathers initial model values of all children. Used when resetGroup() is called.
       */
      get _initialModelValue() {
        return this._getFromAllFormElements('_initialModelValue');
      }

      /**
       * @override FormRegistrarMixin; Connects ValidateMixin
       * @param {FormRegisteringHost & FormControl} el
       */
      removeFormElement(el) {
        super.removeFormElement(el);
        this.validate({ clearCurrentResult: true });

        if (typeof el.removeFromAriaLabelledBy === 'function' && this._labelNode) {
          el.removeFromAriaLabelledBy(this._labelNode, { reorder: false });
        }
        this.__unlinkParentMessages(el);
      }
    };

  const FormGroupMixin = dedupeMixin(FormGroupMixinImplementation);

  /**
   * A wrapper around multiple radios.
   */
  class LionRadioGroup extends ChoiceGroupMixin(FormGroupMixin(s)) {
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute('role', 'radiogroup');
    }

    /**
     * @override FormGroupMixin, during a reset if the current checked value is behind
     * the initial checked value, they both got unchecked
     */
    resetGroup() {
      let initValue;
      this.formElements.forEach(child => {
        if (typeof child.resetGroup === 'function') {
          child.resetGroup();
        } else if (typeof child.reset === 'function') {
          child.reset();
          // If the value was initially checked save this
          if (child.checked) {
            initValue = child.value;
          }
        }
      });
      this.modelValue = initValue;

      this.resetInteractionState();
    }
  }

  /**
   * LionInput: extension of lion-field with native input element in place and user friendly API.
   *
   * @customElement lion-input
   */
  class LionInput extends NativeTextFieldMixin(LionField) {
    /** @type {any} */
    static get properties() {
      return {
        /**
         * A Boolean attribute which, if present, indicates that the user should not be able to edit
         * the value of the input. The difference between disabled and readonly is that read-only
         * controls can still function, whereas disabled controls generally do not function as
         * controls until they are enabled.
         *
         * (From: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly)
         */
        readOnly: {
          type: Boolean,
          attribute: 'readonly',
          reflect: true,
        },
        type: {
          type: String,
          reflect: true,
        },
        placeholder: {
          type: String,
          reflect: true,
        },
      };
    }

    get slots() {
      return {
        ...super.slots,
        input: () => {
          // TODO: Find a better way to do value delegation via attr
          const native = document.createElement('input');
          const value = this.getAttribute('value');
          if (value) {
            native.setAttribute('value', value);
          }
          return native;
        },
      };
    }

    /**
     * @type {HTMLInputElement}
     * @protected
     */
    get _inputNode() {
      return /** @type {HTMLInputElement} */ (super._inputNode); // casts type
    }

    constructor() {
      super();
      this.readOnly = false;
      this.type = 'text';
      this.placeholder = '';
    }

    /**
     * @param {PropertyKey} [name]
     * @param {?} [oldValue]
     */
    requestUpdate(name, oldValue) {
      super.requestUpdate(name, oldValue);
      if (name === 'readOnly') {
        this.__delegateReadOnly();
      }
    }

    /** @param {import('@lion/core').PropertyValues } changedProperties */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.__delegateReadOnly();
    }

    /** @param {import('@lion/core').PropertyValues } changedProperties */
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has('type')) {
        this._inputNode.type = this.type;
      }

      if (changedProperties.has('placeholder')) {
        this._inputNode.placeholder = this.placeholder;
      }

      if (changedProperties.has('disabled')) {
        this._inputNode.disabled = this.disabled;
        this.validate();
      }

      if (changedProperties.has('name')) {
        this._inputNode.name = this.name;
      }

      if (changedProperties.has('autocomplete')) {
        this._inputNode.autocomplete = /** @type {string} */ (this.autocomplete);
      }
    }

    /** @private */
    __delegateReadOnly() {
      if (this._inputNode) {
        this._inputNode.readOnly = this.readOnly;
      }
    }
  }

  /**
   * Lion-radio can be used inside a lion-radio-group.
   *
   * <lion-radio-group name="radios">
   *   <label slot="label">My Radio</label>
   *   <lion-radio>
   *     <label slot="label">Male</label>
   *   </lion-radio>
   *   <lion-radio>
   *     <label slot="label">Female</label>
   *   </lion-radio>
   * </lion-radio-group>
   *
   * You can preselect an option by setting marking an lion-radio checked.
   *   Example:
   *   <lion-radio checked>
   *
   * @customElement lion-radio
   */
  class LionRadio extends ChoiceInputMixin(LionInput) {
    connectedCallback() {
      super.connectedCallback();
      this.type = 'radio';
    }
  }

  class LionCheckbox extends ChoiceInputMixin(LionInput) {
    connectedCallback() {
      super.connectedCallback();
      this.type = 'checkbox';
    }
  }

  const isKeyboardClickEvent = (/** @type {KeyboardEvent} */ e) => e.key === ' ' || e.key === 'Enter';
  const isSpaceKeyboardClickEvent = (/** @type {KeyboardEvent} */ e) => e.key === ' ';

  /**
   * @typedef {import('@lion/core').TemplateResult} TemplateResult
   */

  /**
   * Use LionButton (or LionButtonReset|LionButtonSubmit) when there is a need to extend HTMLButtonElement.
   * It allows to create complex shadow DOM for buttons needing this. Think of:
   * - a material Design button that needs a JS controlled ripple
   * - a LionSelectRich invoker that needs a complex shadow DOM structure
   * (for styling/maintainability purposes)
   * - a specialized button (for instance a primary button or icon button in a Design System) that
   * needs a simple api: `<my-button>text</my-button>` is always better than
   * `<button class="my-button"><div class="my-button__container">text</div><button>`
   *
   * In other cases, whenever you can, still use native HTMLButtonElement (`<button>`).
   *
   * Note that LionButton is meant for buttons with type="button". It's cleaner and more
   * lightweight than LionButtonReset and LionButtonSubmit, which should only be considered when native
   * `<form>` support is needed:
   * - When type="reset|submit" should be supported, use LionButtonReset.
   * - When implicit form submission should be supported on top, use LionButtonSubmit.
   */
  class LionButton extends DisabledWithTabIndexMixin(s) {
    static get properties() {
      return {
        active: { type: Boolean, reflect: true },
        type: { type: String, reflect: true },
      };
    }

    render() {
      return x` <div class="button-content" id="${this._buttonId}"><slot></slot></div> `;
    }

    static get styles() {
      return [
        i`
        :host {
          position: relative;
          display: inline-flex;
          box-sizing: border-box;
          vertical-align: middle;
          line-height: 24px;
          background: #eee; /* minimal styling to make it recognizable as btn */
          padding: 8px; /* padding to fix with min-height */
          outline: none; /* focus style handled below */
          cursor: default; /* we should always see the default arrow, never a caret */
          /* TODO: remove, native button also allows selection. Could be usability concern... */
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        :host::before {
          content: '';

          /* center vertically and horizontally */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          /* Minimum click area to meet [WCAG Success Criterion 2.5.5 Target Size (Enhanced)](https://www.w3.org/TR/WCAG22/#target-size-enhanced) */
          min-height: 44px;
          min-width: 44px;
          width: 100%;
          height: 100%;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Show focus styles on keyboard focus. */
        :host(:focus:not([disabled])),
        :host(:focus-visible) {
          /* if you extend, please overwrite */
          outline: 2px solid #bde4ff;
        }

        /* Hide focus styles if they're not needed, for example,
        when an element receives focus via the mouse. */
        :host(:focus:not(:focus-visible)) {
          outline: 0;
        }

        :host(:hover) {
          /* if you extend, please overwrite */
          background: #f4f6f7;
        }

        :host(:active), /* keep native :active to render quickly where possible */
        :host([active]) /* use custom [active] to fix IE11 */ {
          /* if you extend, please overwrite */
          background: gray;
        }

        :host([hidden]) {
          display: none;
        }

        :host([disabled]) {
          pointer-events: none;
          /* if you extend, please overwrite */
          background: lightgray;
          color: #adadad;
          fill: #adadad;
        }
      `,
      ];
    }

    constructor() {
      super();
      this.type = 'button';
      this.active = false;

      this._buttonId = `button-${Math.random().toString(36).substr(2, 10)}`;
      if (browserDetection.isIE11) {
        this.updateComplete.then(() => {
          if (!this.hasAttribute('aria-labelledby')) {
            this.setAttribute('aria-labelledby', this._buttonId);
          }
        });
      }
      this.__setupEvents();
    }

    connectedCallback() {
      super.connectedCallback();
      if (!this.hasAttribute('role')) {
        this.setAttribute('role', 'button');
      }
    }

    /**
     * @param {import('@lion/core').PropertyValues } changedProperties
     */
    updated(changedProperties) {
      super.updated(changedProperties);

      if (changedProperties.has('disabled')) {
        this.setAttribute('aria-disabled', `${this.disabled}`); // create mixin if we need it in more places
      }
    }

    /**
     * @private
     */
    __setupEvents() {
      this.addEventListener('mousedown', this.__mousedownHandler);
      this.addEventListener('keydown', this.__keydownHandler);
      this.addEventListener('keyup', this.__keyupHandler);
    }

    /**
     * @private
     */
    __mousedownHandler() {
      this.active = true;
      const mouseupHandler = () => {
        this.active = false;
        document.removeEventListener('mouseup', mouseupHandler);
        this.removeEventListener('mouseup', mouseupHandler);
      };
      document.addEventListener('mouseup', mouseupHandler);
      this.addEventListener('mouseup', mouseupHandler);
    }

    /**
     * @param {KeyboardEvent} event
     * @private
     */
    __keydownHandler(event) {
      if (this.active || !isKeyboardClickEvent(event)) {
        if (isSpaceKeyboardClickEvent(event)) {
          event.preventDefault();
        }
        return;
      }

      if (isSpaceKeyboardClickEvent(event)) {
        event.preventDefault();
      }

      this.active = true;
      /**
       * @param {KeyboardEvent} keyupEvent
       */
      const keyupHandler = keyupEvent => {
        if (isKeyboardClickEvent(keyupEvent)) {
          this.active = false;
          document.removeEventListener('keyup', keyupHandler, true);
        }
      };
      document.addEventListener('keyup', keyupHandler, true);
    }

    /**
     * @param {KeyboardEvent} event
     * @private
     */
    __keyupHandler(event) {
      if (isKeyboardClickEvent(event)) {
        // Fixes IE11 double submit/click. Enter keypress somehow triggers the __keyUpHandler on the native <button>
        if (event.target && event.target !== this) {
          return;
        }
        // dispatch click
        this.click();
      }
    }
  }

  var styles = [
      i`
        * {
            font-family: sans-serif;
        }

        .warning {
            font-weight: bold;
            color: red;
        }
    `
  ];

  const proxyPattern = new Pattern(/(?:(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|.+\..{2,}):\d{2,5}/, {
      getMessage: () => 'Please enter a valid address (<address>:<port>)'
  });

  class ProxyPopup extends ScopedElementsMixin(s) {
      static scopedElements = {
          'lion-radio-group': LionRadioGroup,
          'lion-radio': LionRadio,
          'lion-input': LionInput,
          'lion-checkbox': LionCheckbox,
          'lion-button': LionButton
      }

      static styles = styles;

      static properties = {
          httpProxyAll: { type: Boolean },
          error: { type: String}
      }

      constructor() {
          super();

          this.error = "";
          this.settings = {};
          this.setSettings = this.setSettings.bind(this);
          this.setPrivateAllowed = this.setPrivateAllowed.bind(this);
          
          browser.proxy.settings.get({}).then(result => {
              this.setSettings(result.value);
          });

          browser.extension.isAllowedIncognitoAccess().then(value => {
              this.setPrivateAllowed(value);
          });
      }

      setSettings(settings) {
          const { httpProxyAll } = settings;
          this.httpProxyAll = httpProxyAll;
          this.settings = settings;
          this.requestUpdate();
      }

      setPrivateAllowed(value) {
          this.privateAllowed = value;
          this.requestUpdate();
      }

      changeSetting(changeEvent) {
          this.error = '';

          const newValue = changeEvent.srcElement.value;

          browser.proxy.settings.get({}).then(result => {
              const newSettings = {
                  ...result.value,
                  proxyType: newValue
              };
              
              if ( newValue !== 'autoConfig' || result.value.autoConfigUrl) {
                  browser.proxy.settings.set({
                      "value": newSettings
                  });
              } else {
                  this.error = 'the config URL is required for Auto Configure';
              }

              this.setSettings(newSettings);
          });
      }

      saveManualSettings() {
          browser.proxy.settings.get({}).then(result => {
              const http = this.shadowRoot.getElementById('httpProxy').modelValue;
              const ssl = this.shadowRoot.getElementById('httpsProxy').modelValue;
              const ftp = this.shadowRoot.getElementById('ftpProxy').modelValue;
              const socks = this.shadowRoot.getElementById('socksProxy').modelValue;
              const httpProxyAll = this.shadowRoot.getElementById('httpProxyAll').checked;

              const newSettings = {
                  ...result.value,
                  http,
                  ssl,
                  ftp,
                  socks,
                  httpProxyAll
              };

              browser.proxy.settings.set({
                  "value": newSettings
              });
              this.setSettings(newSettings);
          });
      }

      saveConfigURL() {
          this.error = '';

          browser.proxy.settings.get({}).then(result => {
              const autoConfigUrl = this.shadowRoot.getElementById('autoProxyConfURL').modelValue;

              const newSettings = {
                  ...result.value,
                  proxyType: 'autoConfig',
                  autoConfigUrl
              };
              
              if (autoConfigUrl.length > 0) {
                  browser.proxy.settings.set({
                      "value": newSettings
                  }).catch(e => {
                      console.log(e);
                      this.error = e.message;
                  });
              } else {
                  this.error = 'the config URL is required for Auto Configure';
              }

              this.setSettings(newSettings);
          });
      }

      render() {
          return x`
            ${this.privateAllowed ? this.renderSelector() : this.renderPrivateWarning()}
        `;
      }

      renderSelector() {
          return x`
            <p class="warning" >${this.error}</p>
            <lion-radio-group name='proxySettings' label='What setting do you want?' @change=${this.changeSetting}>
                <lion-radio label='Off' .choiceValue=${'none'} ?checked=${this.settings.proxyType === 'none'}></lion-radio>
                <lion-radio label='System' .choiceValue=${'system'} ?checked=${this.settings.proxyType === 'system'}></lion-radio>
                <lion-radio label='Manual' .choiceValue=${'manual'} ?checked=${this.settings.proxyType === 'manual'}></lion-radio>
                <lion-radio label='Auto Detect' .choiceValue=${'autoDetect'} ?checked=${this.settings.proxyType === 'autoDetect'}></lion-radio>
                <lion-radio label='Auto Configure' .choiceValue=${'autoConfig'} ?checked=${this.settings.proxyType=== 'autoConfig'}></lion-radio>
            </lion-radio-group>
            ${this.settings.proxyType === 'manual' ? this.renderManualProxyInput() : ''}
            ${this.settings.proxyType === 'autoConfig' ? this.renderAutomaticProxyConfig() : ''}
        `;
      }

      renderManualProxyInput() {
          return x`
            <div class="manualProxyInput">
                <p>Manual proxy settings</p>
                <lion-input .validators=${[proxyPattern]} id='httpProxy' label='HTTP Proxy' .modelValue=${this.settings.http}></lion-input>
                <lion-checkbox id='httpProxyAll' label='Use HTTP Proxy for all protocols' .checked=${this.settings.httpProxyAll} @change=${(e) => this.httpProxyAll = e.target.checked}></lion-checkbox>
                <lion-input .validators=${[proxyPattern]} id='httpsProxy' label='HTTPS Proxy' .modelValue=${this.settings.ssl} ?hidden=${this.httpProxyAll}></lion-input>
                <lion-input .validators=${[proxyPattern]} id='ftpProxy' label='FTP Proxy' .modelValue=${this.settings.ftp} ?hidden=${this.httpProxyAll}></lion-input>
                <lion-input .validators=${[proxyPattern]} id='socksProxy' label='SOCKS Host' .modelValue=${this.settings.socks}></lion-input>
                <lion-button @click=${this.saveManualSettings}>Save</lion-button>
            </div>
        `;
      }

      renderAutomaticProxyConfig() {
          return x`
            <div class="autoProxyConfInput">
                <lion-input id='autoProxyConfURL' label='Automatic proxy configuration URL' .modelValue=${this.settings.autoConfigUrl}></lion-input>
                <lion-button @click=${this.saveConfigURL}>Reload</lion-button>
            </div>
        `;
      }

      renderPrivateWarning() {
          return x`
            <p class="warning">For this Add-on to work. It must be allowed in private windows</p>
            <p class="warning">Go to 'Add-ons', click 'Manage' on this addon and Allow 'Run in Private Windows'</p>
        `;
      }
  }

  customElements.define('proxy-popup', ProxyPopup);

})();
