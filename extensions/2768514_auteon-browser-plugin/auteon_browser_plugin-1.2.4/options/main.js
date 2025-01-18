import { d as defineComponent, p as ref, A as computed, y as onMounted, L as onUnmounted, M as h$1, K as Fragment, C as watchEffect, B as watch, k as createApp, l as i18n, r as resolveComponent, c as createElementBlock, f as createBaseVNode, t as toDisplayString$1, g as createVNode, b as withCtx, N as cloneVNode, a as createBlock, O as renderList, s as script$6, o as openBlock, m as createTextVNode, P as toRaw, Q as provide, H as nextTick, j as createCommentVNode, q as renderSlot, n as normalizeClass, T as Transition, R as inject, S as pushScopeId, U as popScopeId } from '../chunks/AutStylesheet-2c420ffc.js';
import { s as script$8 } from '../chunks/AutLogo-574084e3.js';
import { f as script$4, a as script$3$1, e as script$7, c as script$5$1 } from '../chunks/AutTooltip-eab14967.js';
import { s as script$5, u as useShortcut } from '../chunks/AutButton-9a5afc83.js';
import { s as syncedStorage } from '../chunks/event-bus-eb77ec2c.js';

var script$3 = defineComponent({
    name: 'AutOnboarding',
    components: {
        AutTooltip: script$4,
    },
    setup() {
        const { shortcut } = useShortcut();
        return {
            shortcut,
        };
    },
    data() {
        return {
            selection: {
                placement: 'top',
                text: '4UT30N',
                height: 0,
                width: 0,
                left: 0,
                top: 0,
            },
        };
    },
});

const _hoisted_1$3 = { class: "mb-8 text-center" };
const _hoisted_2$3 = { class: "text-4xl" };
const _hoisted_3$3 = { class: "flex items-end m-auto max-w-[500px] min-h-[450px]" };
const _hoisted_4$2 = { class: "aut-article-number" };
const _hoisted_5$2 = { class: "inline-block px-2 py-0.5 bg-red-100 whitespace-nowrap" };

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutTooltip = resolveComponent("AutTooltip");
  const _component_i18n_t = resolveComponent("i18n-t");

  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$3, [
      createBaseVNode("h1", _hoisted_2$3, toDisplayString$1(_ctx.$t('options.onboarding.title')), 1 /* TEXT */)
    ]),
    createBaseVNode("div", _hoisted_3$3, [
      createVNode(_component_i18n_t, {
        keypath: "options.onboarding.sectionText",
        tag: "p"
      }, {
        articleNumber: withCtx(() => [
          createBaseVNode("span", _hoisted_4$2, [
            createVNode(_component_AutTooltip, {
              selection: _ctx.selection,
              active: "",
              demo: ""
            }, null, 8 /* PROPS */, ["selection"]),
            createTextVNode(" " + toDisplayString$1(_ctx.$t('options.onboarding.articleNumber')), 1 /* TEXT */)
          ])
        ]),
        shortcut: withCtx(() => [
          createBaseVNode("span", _hoisted_5$2, toDisplayString$1(_ctx.shortcut.text), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
      })
    ])
  ]))
}

script$3.render = render$6;
script$3.__scopeId = "data-v-de4c37be";
script$3.__file = "src/options/AutOnboarding.vue";

function d$2(u,e,r){let i=ref(r==null?void 0:r.value),f=computed(()=>u.value!==void 0);return [computed(()=>f.value?u.value:i.value),function(t){return f.value||(i.value=t),e==null?void 0:e(t)}]}

function t$5(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(o=>setTimeout(()=>{throw o}));}

function o$4(){let a=[],s={addEventListener(e,t,r,i){return e.addEventListener(t,r,i),s.add(()=>e.removeEventListener(t,r,i))},requestAnimationFrame(...e){let t=requestAnimationFrame(...e);s.add(()=>cancelAnimationFrame(t));},nextFrame(...e){s.requestAnimationFrame(()=>{s.requestAnimationFrame(...e);});},setTimeout(...e){let t=setTimeout(...e);s.add(()=>clearTimeout(t));},microTask(...e){let t={current:!0};return t$5(()=>{t.current&&e[0]();}),s.add(()=>{t.current=!1;})},style(e,t,r){let i=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:r}),this.add(()=>{Object.assign(e.style,{[t]:i});})},group(e){let t=o$4();return e(t),this.add(()=>t.dispose())},add(e){return a.push(e),()=>{let t=a.indexOf(e);if(t>=0)for(let r of a.splice(t,1))r();}},dispose(){for(let e of a.splice(0))e();}};return s}

let t$4=Symbol("headlessui.useid"),i$4=0;function I$1(){return inject(t$4,()=>`${++i$4}`)()}

function o$3(e){var l;if(e==null||e.value==null)return null;let n=(l=e.value.$el)!=null?l:e.value;return n instanceof Node?n:null}

function u$4(r,n,...a){if(r in n){let e=n[r];return typeof e=="function"?e(...a):e}let t=new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,u$4),t}

var i$3=Object.defineProperty;var d$1=(t,e,r)=>e in t?i$3(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var n$3=(t,e,r)=>(d$1(t,typeof e!="symbol"?e+"":e,r),r);class s$2{constructor(){n$3(this,"current",this.detect());n$3(this,"currentId",0);}set(e){this.current!==e&&(this.currentId=0,this.current=e);}reset(){this.set(this.detect());}nextId(){return ++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window=="undefined"||typeof document=="undefined"?"server":"client"}}let c$3=new s$2;

function i$2(r){if(c$3.isServer)return null;if(r instanceof Node)return r.ownerDocument;if(r!=null&&r.hasOwnProperty("value")){let n=o$3(r);if(n)return n.ownerDocument}return document}

let c$2=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var N$2=(n=>(n[n.First=1]="First",n[n.Previous=2]="Previous",n[n.Next=4]="Next",n[n.Last=8]="Last",n[n.WrapAround=16]="WrapAround",n[n.NoScroll=32]="NoScroll",n))(N$2||{}),T$1=(o=>(o[o.Error=0]="Error",o[o.Overflow=1]="Overflow",o[o.Success=2]="Success",o[o.Underflow=3]="Underflow",o))(T$1||{}),F=(t=>(t[t.Previous=-1]="Previous",t[t.Next=1]="Next",t))(F||{});function E$2(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(c$2)).sort((r,t)=>Math.sign((r.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}var h=(t=>(t[t.Strict=0]="Strict",t[t.Loose=1]="Loose",t))(h||{});function w$3(e,r=0){var t;return e===((t=i$2(e))==null?void 0:t.body)?!1:u$4(r,{[0](){return e.matches(c$2)},[1](){let l=e;for(;l!==null;){if(l.matches(c$2))return !0;l=l.parentElement;}return !1}})}var y$1=(t=>(t[t.Keyboard=0]="Keyboard",t[t.Mouse=1]="Mouse",t))(y$1||{});typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="");},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="");},!0));function S$1(e){e==null||e.focus({preventScroll:!0});}let H=["textarea","input"].join(",");function I(e){var r,t;return (t=(r=e==null?void 0:e.matches)==null?void 0:r.call(e,H))!=null?t:!1}function O(e,r=t=>t){return e.slice().sort((t,l)=>{let o=r(t),i=r(l);if(o===null||i===null)return 0;let n=o.compareDocumentPosition(i);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function P(e,r,{sorted:t=!0,relativeTo:l=null,skipElements:o=[]}={}){var m;let i=(m=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?m:document,n=Array.isArray(e)?t?O(e):e:E$2(e);o.length>0&&n.length>1&&(n=n.filter(s=>!o.includes(s))),l=l!=null?l:i.activeElement;let x=(()=>{if(r&5)return 1;if(r&10)return -1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),p=(()=>{if(r&1)return 0;if(r&2)return Math.max(0,n.indexOf(l))-1;if(r&4)return Math.max(0,n.indexOf(l))+1;if(r&8)return n.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),L=r&32?{preventScroll:!0}:{},a=0,d=n.length,u;do{if(a>=d||a+d<=0)return 0;let s=p+a;if(r&16)s=(s+d)%d;else {if(s<0)return 3;if(s>=d)return 1}u=n[s],u==null||u.focus(L),a+=x;}while(u!==i.activeElement);return r&6&&I(u)&&u.select(),2}

function t$3(){return /iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function i$1(){return /Android/gi.test(window.navigator.userAgent)}function n$2(){return t$3()||i$1()}

function u$3(e,t,n){c$3.isServer||watchEffect(o=>{document.addEventListener(e,t,n),o(()=>document.removeEventListener(e,t,n));});}

function w$2(e,n,t){c$3.isServer||watchEffect(o=>{window.addEventListener(e,n,t),o(()=>window.removeEventListener(e,n,t));});}

function w$1(f,m,l=computed(()=>!0)){function a(e,r){if(!l.value||e.defaultPrevented)return;let t=r(e);if(t===null||!t.getRootNode().contains(t))return;let c=function o(n){return typeof n=="function"?o(n()):Array.isArray(n)||n instanceof Set?n:[n]}(f);for(let o of c){if(o===null)continue;let n=o instanceof HTMLElement?o:o$3(o);if(n!=null&&n.contains(t)||e.composed&&e.composedPath().includes(n))return}return !w$3(t,h.Loose)&&t.tabIndex!==-1&&e.preventDefault(),m(e,t)}let u=ref(null);u$3("pointerdown",e=>{var r,t;l.value&&(u.value=((t=(r=e.composedPath)==null?void 0:r.call(e))==null?void 0:t[0])||e.target);},!0),u$3("mousedown",e=>{var r,t;l.value&&(u.value=((t=(r=e.composedPath)==null?void 0:r.call(e))==null?void 0:t[0])||e.target);},!0),u$3("click",e=>{n$2()||u.value&&(a(e,()=>u.value),u.value=null);},!0),u$3("touchend",e=>a(e,()=>e.target instanceof HTMLElement?e.target:null),!0),w$2("blur",e=>a(e,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0);}

function r$1(t,e){if(t)return t;let n=e!=null?e:"button";if(typeof n=="string"&&n.toLowerCase()==="button")return "button"}function s$1(t,e){let n=ref(r$1(t.value.type,t.value.as));return onMounted(()=>{n.value=r$1(t.value.type,t.value.as);}),watchEffect(()=>{var u;n.value||o$3(e)&&o$3(e)instanceof HTMLButtonElement&&!((u=o$3(e))!=null&&u.hasAttribute("type"))&&(n.value="button");}),n}

function r(e){return [e.screenX,e.screenY]}function u$2(){let e=ref([-1,-1]);return {wasMoved(n){let t=r(n);return e.value[0]===t[0]&&e.value[1]===t[1]?!1:(e.value=t,!0)},update(n){e.value=r(n);}}}

var N$1=(o=>(o[o.None=0]="None",o[o.RenderStrategy=1]="RenderStrategy",o[o.Static=2]="Static",o))(N$1||{}),S=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(S||{});function A$2({visible:r=!0,features:t=0,ourProps:e,theirProps:o,...i}){var a;let n=j(o,e),l=Object.assign(i,{props:n});if(r||t&2&&n.static)return y(l);if(t&1){let d=(a=n.unmount)==null||a?0:1;return u$4(d,{[0](){return null},[1](){return y({...i,props:{...n,hidden:!0,style:{display:"none"}}})}})}return y(l)}function y({props:r,attrs:t,slots:e,slot:o,name:i}){var m,h;let{as:n,...l}=T(r,["unmount","static"]),a=(m=e.default)==null?void 0:m.call(e,o),d={};if(o){let u=!1,c=[];for(let[p,f]of Object.entries(o))typeof f=="boolean"&&(u=!0),f===!0&&c.push(p);u&&(d["data-headlessui-state"]=c.join(" "));}if(n==="template"){if(a=b(a!=null?a:[]),Object.keys(l).length>0||Object.keys(t).length>0){let[u,...c]=a!=null?a:[];if(!v(u)||c.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${i} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(l).concat(Object.keys(t)).map(s=>s.trim()).filter((s,g,R)=>R.indexOf(s)===g).sort((s,g)=>s.localeCompare(g)).map(s=>`  - ${s}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(s=>`  - ${s}`).join(`
`)].join(`
`));let p=j((h=u.props)!=null?h:{},l,d),f=cloneVNode(u,p,!0);for(let s in p)s.startsWith("on")&&(f.props||(f.props={}),f.props[s]=p[s]);return f}return Array.isArray(a)&&a.length===1?a[0]:a}return h$1(n,Object.assign({},l,d),{default:()=>a})}function b(r){return r.flatMap(t=>t.type===Fragment?b(t.children):[t])}function j(...r){if(r.length===0)return {};if(r.length===1)return r[0];let t={},e={};for(let i of r)for(let n in i)n.startsWith("on")&&typeof i[n]=="function"?((e[n])!=null||(e[n]=[]),e[n].push(i[n])):t[n]=i[n];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(e).map(i=>[i,void 0])));for(let i in e)Object.assign(t,{[i](n,...l){let a=e[i];for(let d of a){if(n instanceof Event&&n.defaultPrevented)return;d(n,...l);}}});return t}function E$1(r){let t=Object.assign({},r);for(let e in t)t[e]===void 0&&delete t[e];return t}function T(r,t=[]){let e=Object.assign({},r);for(let o of t)o in e&&delete e[o];return e}function v(r){return r==null?!1:typeof r.type=="string"||typeof r.type=="object"||typeof r.type=="function"}

var u$1=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(u$1||{});let f$2=defineComponent({name:"Hidden",props:{as:{type:[Object,String],default:"div"},features:{type:Number,default:1}},setup(t,{slots:n,attrs:i}){return ()=>{var r;let{features:e,...d}=t,o={"aria-hidden":(e&2)===2?!0:(r=d["aria-hidden"])!=null?r:void 0,hidden:(e&4)===4?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(e&4)===4&&(e&2)!==2&&{display:"none"}}};return A$2({ourProps:o,theirProps:d,slot:{},attrs:i,slots:n,name:"Hidden"})}}});

let n$1=Symbol("Context");var i=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(i||{});function l$1(){return inject(n$1,null)}function t$2(o){provide(n$1,o);}

var o$2=(r=>(r.Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r))(o$2||{});

var g$2=(f=>(f[f.Left=0]="Left",f[f.Right=2]="Right",f))(g$2||{});

function t$1(n){function e(){document.readyState!=="loading"&&(n(),document.removeEventListener("DOMContentLoaded",e));}typeof window!="undefined"&&typeof document!="undefined"&&(document.addEventListener("DOMContentLoaded",e),e());}

let t=[];t$1(()=>{function e(n){n.target instanceof HTMLElement&&n.target!==document.body&&t[0]!==n.target&&(t.unshift(n.target),t=t.filter(r=>r!=null&&r.isConnected),t.splice(10));}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0});});

function u(l){throw new Error("Unexpected object: "+l)}var c$1=(i=>(i[i.First=0]="First",i[i.Previous=1]="Previous",i[i.Next=2]="Next",i[i.Last=3]="Last",i[i.Specific=4]="Specific",i[i.Nothing=5]="Nothing",i))(c$1||{});function f$1(l,n){let t=n.resolveItems();if(t.length<=0)return null;let r=n.resolveActiveIndex(),s=r!=null?r:-1;switch(l.focus){case 0:{for(let e=0;e<t.length;++e)if(!n.resolveDisabled(t[e],e,t))return e;return r}case 1:{s===-1&&(s=t.length);for(let e=s-1;e>=0;--e)if(!n.resolveDisabled(t[e],e,t))return e;return r}case 2:{for(let e=s+1;e<t.length;++e)if(!n.resolveDisabled(t[e],e,t))return e;return r}case 3:{for(let e=t.length-1;e>=0;--e)if(!n.resolveDisabled(t[e],e,t))return e;return r}case 4:{for(let e=0;e<t.length;++e)if(n.resolveId(t[e],e,t)===l.id)return e;return r}case 5:return null;default:u(l);}}

function e(i={},s=null,t=[]){for(let[r,n]of Object.entries(i))o$1(t,f(s,r),n);return t}function f(i,s){return i?i+"["+s+"]":s}function o$1(i,s,t){if(Array.isArray(t))for(let[r,n]of t.entries())o$1(i,f(s,r.toString()),n);else t instanceof Date?i.push([s,t.toISOString()]):typeof t=="boolean"?i.push([s,t?"1":"0"]):typeof t=="string"?i.push([s,t]):typeof t=="number"?i.push([s,`${t}`]):t==null?i.push([s,""]):e(t,s,i);}

var Ee$1=(r=>(r[r.Open=0]="Open",r[r.Closed=1]="Closed",r))(Ee$1||{}),Ve=(r=>(r[r.Single=0]="Single",r[r.Multi=1]="Multi",r))(Ve||{}),ke=(y=>(y[y.Pointer=0]="Pointer",y[y.Focus=1]="Focus",y[y.Other=2]="Other",y))(ke||{});

function E(n,e,o,r){c$3.isServer||watchEffect(t=>{n=n!=null?n:window,n.addEventListener(e,o,r),t(()=>n.removeEventListener(e,o,r));});}

var d=(r=>(r[r.Forwards=0]="Forwards",r[r.Backwards=1]="Backwards",r))(d||{});function n(){let o=ref(0);return w$2("keydown",e=>{e.key==="Tab"&&(o.value=e.shiftKey?1:0);}),o}

function B(t){if(!t)return new Set;if(typeof t=="function")return new Set(t());let n=new Set;for(let r of t.value){let l=o$3(r);l instanceof HTMLElement&&n.add(l);}return n}var A$1=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(A$1||{});Object.assign(defineComponent({name:"FocusTrap",props:{as:{type:[Object,String],default:"div"},initialFocus:{type:Object,default:null},features:{type:Number,default:30},containers:{type:[Object,Function],default:ref(new Set)}},inheritAttrs:!1,setup(t,{attrs:n$1,slots:r,expose:l}){let o=ref(null);l({el:o,$el:o});let i=computed(()=>i$2(o)),e=ref(!1);onMounted(()=>e.value=!0),onUnmounted(()=>e.value=!1),$$2({ownerDocument:i},computed(()=>e.value&&Boolean(t.features&16)));let m=z({ownerDocument:i,container:o,initialFocus:computed(()=>t.initialFocus)},computed(()=>e.value&&Boolean(t.features&2)));J({ownerDocument:i,container:o,containers:t.containers,previousActiveElement:m},computed(()=>e.value&&Boolean(t.features&8)));let f=n();function a(u){let T=o$3(o);if(!T)return;(w=>w())(()=>{u$4(f.value,{[d.Forwards]:()=>{P(T,N$2.First,{skipElements:[u.relatedTarget]});},[d.Backwards]:()=>{P(T,N$2.Last,{skipElements:[u.relatedTarget]});}});});}let s=ref(!1);function F(u){u.key==="Tab"&&(s.value=!0,requestAnimationFrame(()=>{s.value=!1;}));}function H(u){if(!e.value)return;let T=B(t.containers);o$3(o)instanceof HTMLElement&&T.add(o$3(o));let d$1=u.relatedTarget;d$1 instanceof HTMLElement&&d$1.dataset.headlessuiFocusGuard!=="true"&&(N(T,d$1)||(s.value?P(o$3(o),u$4(f.value,{[d.Forwards]:()=>N$2.Next,[d.Backwards]:()=>N$2.Previous})|N$2.WrapAround,{relativeTo:u.target}):u.target instanceof HTMLElement&&S$1(u.target)));}return ()=>{let u={},T={ref:o,onKeydown:F,onFocusout:H},{features:d,initialFocus:w,containers:Q,...O}=t;return h$1(Fragment,[Boolean(d&4)&&h$1(f$2,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:a,features:u$1.Focusable}),A$2({ourProps:T,theirProps:{...n$1,...O},slot:u,attrs:n$1,slots:r,name:"FocusTrap"}),Boolean(d&4)&&h$1(f$2,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:a,features:u$1.Focusable})])}}}),{features:A$1});function W(t$1){let n=ref(t.slice());return watch([t$1],([r],[l])=>{l===!0&&r===!1?t$5(()=>{n.value.splice(0);}):l===!1&&r===!0&&(n.value=t.slice());},{flush:"post"}),()=>{var r;return (r=n.value.find(l=>l!=null&&l.isConnected))!=null?r:null}}function $$2({ownerDocument:t},n){let r=W(n);onMounted(()=>{watchEffect(()=>{var l,o;n.value||((l=t.value)==null?void 0:l.activeElement)===((o=t.value)==null?void 0:o.body)&&S$1(r());},{flush:"post"});}),onUnmounted(()=>{n.value&&S$1(r());});}function z({ownerDocument:t,container:n,initialFocus:r},l){let o=ref(null),i=ref(!1);return onMounted(()=>i.value=!0),onUnmounted(()=>i.value=!1),onMounted(()=>{watch([n,r,l],(e,m)=>{if(e.every((a,s)=>(m==null?void 0:m[s])===a)||!l.value)return;let f=o$3(n);f&&t$5(()=>{var F,H;if(!i.value)return;let a=o$3(r),s=(F=t.value)==null?void 0:F.activeElement;if(a){if(a===s){o.value=s;return}}else if(f.contains(s)){o.value=s;return}a?S$1(a):P(f,N$2.First|N$2.NoScroll)===T$1.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.value=(H=t.value)==null?void 0:H.activeElement;});},{immediate:!0,flush:"post"});}),o}function J({ownerDocument:t,container:n,containers:r,previousActiveElement:l},o){var i;E((i=t.value)==null?void 0:i.defaultView,"focus",e=>{if(!o.value)return;let m=B(r);o$3(n)instanceof HTMLElement&&m.add(o$3(n));let f=l.value;if(!f)return;let a=e.target;a&&a instanceof HTMLElement?N(m,a)?(l.value=a,S$1(a)):(e.preventDefault(),e.stopPropagation(),S$1(f)):S$1(l.value);},!0);}function N(t,n){for(let r of t)if(r.contains(n))return !0;return !1}

function a$2(o,r){let t=o(),n=new Set;return {getSnapshot(){return t},subscribe(e){return n.add(e),()=>n.delete(e)},dispatch(e,...s){let i=r[e].call(t,...s);i&&(t=i,n.forEach(c=>c()));}}}

function c(){let o;return {before({doc:e}){var l;let n=e.documentElement;o=((l=e.defaultView)!=null?l:window).innerWidth-n.clientWidth;},after({doc:e,d:n}){let t=e.documentElement,l=t.clientWidth-t.offsetWidth,r=o-l;n.style(t,"paddingRight",`${r}px`);}}}

function w(){return t$3()?{before({doc:r,d:n,meta:c}){function a(o){return c.containers.flatMap(l=>l()).some(l=>l.contains(o))}n.microTask(()=>{var s;if(window.getComputedStyle(r.documentElement).scrollBehavior!=="auto"){let t=o$4();t.style(r.documentElement,"scrollBehavior","auto"),n.add(()=>n.microTask(()=>t.dispose()));}let o=(s=window.scrollY)!=null?s:window.pageYOffset,l=null;n.addEventListener(r,"click",t=>{if(t.target instanceof HTMLElement)try{let e=t.target.closest("a");if(!e)return;let{hash:f}=new URL(e.href),i=r.querySelector(f);i&&!a(i)&&(l=i);}catch{}},!0),n.addEventListener(r,"touchstart",t=>{if(t.target instanceof HTMLElement)if(a(t.target)){let e=t.target;for(;e.parentElement&&a(e.parentElement);)e=e.parentElement;n.style(e,"overscrollBehavior","contain");}else n.style(t.target,"touchAction","none");}),n.addEventListener(r,"touchmove",t=>{if(t.target instanceof HTMLElement){if(t.target.tagName==="INPUT")return;if(a(t.target)){let e=t.target;for(;e.parentElement&&e.dataset.headlessuiPortal!==""&&!(e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth);)e=e.parentElement;e.dataset.headlessuiPortal===""&&t.preventDefault();}else t.preventDefault();}},{passive:!1}),n.add(()=>{var e;let t=(e=window.scrollY)!=null?e:window.pageYOffset;o!==t&&window.scrollTo(0,o),l&&l.isConnected&&(l.scrollIntoView({block:"nearest"}),l=null);});});}}:{}}

function l(){return {before({doc:e,d:o}){o.style(e.documentElement,"overflow","hidden");}}}

function m(e){let n={};for(let t of e)Object.assign(n,t(n));return n}let a$1=a$2(()=>new Map,{PUSH(e,n){var o;let t=(o=this.get(e))!=null?o:{doc:e,count:0,d:o$4(),meta:new Set};return t.count++,t.meta.add(n),this.set(e,t),this},POP(e,n){let t=this.get(e);return t&&(t.count--,t.meta.delete(n)),this},SCROLL_PREVENT({doc:e,d:n,meta:t}){let o={doc:e,d:n,meta:m(t)},c$1=[w(),c(),l()];c$1.forEach(({before:r})=>r==null?void 0:r(o)),c$1.forEach(({after:r})=>r==null?void 0:r(o));},SCROLL_ALLOW({d:e}){e.dispose();},TEARDOWN({doc:e}){this.delete(e);}});a$1.subscribe(()=>{let e=a$1.getSnapshot(),n=new Map;for(let[t]of e)n.set(t,t.documentElement.style.overflow);for(let t of e.values()){let o=n.get(t.doc)==="hidden",c=t.count!==0;(c&&!o||!c&&o)&&a$1.dispatch(t.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",t),t.count===0&&a$1.dispatch("TEARDOWN",t);}});

var s=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(s||{});

var Te=(l=>(l[l.Open=0]="Open",l[l.Closed=1]="Closed",l))(Te||{});

var $$1=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))($$1||{});

let a=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function o(e){var r,i;let n=(r=e.innerText)!=null?r:"",t=e.cloneNode(!0);if(!(t instanceof HTMLElement))return n;let u=!1;for(let f of t.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))f.remove(),u=!0;let l=u?(i=t.innerText)!=null?i:"":n;return a.test(l)&&(l=l.replace(a,"")),l}function g$1(e){let n=e.getAttribute("aria-label");if(typeof n=="string")return n.trim();let t=e.getAttribute("aria-labelledby");if(t){let u=t.split(" ").map(l=>{let r=document.getElementById(l);if(r){let i=r.getAttribute("aria-label");return typeof i=="string"?i.trim():o(r).trim()}return null}).filter(Boolean);if(u.length>0)return u.join(", ")}return o(e).trim()}

function p(a){let t=ref(""),r=ref("");return ()=>{let e=o$3(a);if(!e)return "";let l=e.innerText;if(t.value===l)return r.value;let u=g$1(e).trim().toLowerCase();return t.value=l,r.value=u,u}}

function pe$1(o,b){return o===b}var ce=(r=>(r[r.Open=0]="Open",r[r.Closed=1]="Closed",r))(ce||{}),ve=(r=>(r[r.Single=0]="Single",r[r.Multi=1]="Multi",r))(ve||{}),be=(r=>(r[r.Pointer=0]="Pointer",r[r.Other=1]="Other",r))(be||{});function me(o){requestAnimationFrame(()=>requestAnimationFrame(o));}let $=Symbol("ListboxContext");function A(o){let b=inject($,null);if(b===null){let r=new Error(`<${o} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,A),r}return b}let Ie=defineComponent({name:"Listbox",emits:{"update:modelValue":o=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],default:()=>pe$1},horizontal:{type:[Boolean],default:!1},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},multiple:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(o,{slots:b,attrs:r,emit:w}){let n=ref(1),e$1=ref(null),f=ref(null),v=ref(null),s=ref([]),m=ref(""),p=ref(null),a=ref(1);function u(t=i=>i){let i=p.value!==null?s.value[p.value]:null,l=O(t(s.value.slice()),O=>o$3(O.dataRef.domRef)),d=i?l.indexOf(i):null;return d===-1&&(d=null),{options:l,activeOptionIndex:d}}let D=computed(()=>o.multiple?1:0),[y,L]=d$2(computed(()=>o.modelValue),t=>w("update:modelValue",t),computed(()=>o.defaultValue)),M=computed(()=>y.value===void 0?u$4(D.value,{[1]:[],[0]:void 0}):y.value),k={listboxState:n,value:M,mode:D,compare(t,i){if(typeof o.by=="string"){let l=o.by;return (t==null?void 0:t[l])===(i==null?void 0:i[l])}return o.by(t,i)},orientation:computed(()=>o.horizontal?"horizontal":"vertical"),labelRef:e$1,buttonRef:f,optionsRef:v,disabled:computed(()=>o.disabled),options:s,searchQuery:m,activeOptionIndex:p,activationTrigger:a,closeListbox(){o.disabled||n.value!==1&&(n.value=1,p.value=null);},openListbox(){o.disabled||n.value!==0&&(n.value=0);},goToOption(t,i,l){if(o.disabled||n.value===1)return;let d=u(),O=f$1(t===c$1.Specific?{focus:c$1.Specific,id:i}:{focus:t},{resolveItems:()=>d.options,resolveActiveIndex:()=>d.activeOptionIndex,resolveId:h=>h.id,resolveDisabled:h=>h.dataRef.disabled});m.value="",p.value=O,a.value=l!=null?l:1,s.value=d.options;},search(t){if(o.disabled||n.value===1)return;let l=m.value!==""?0:1;m.value+=t.toLowerCase();let O=(p.value!==null?s.value.slice(p.value+l).concat(s.value.slice(0,p.value+l)):s.value).find(I=>I.dataRef.textValue.startsWith(m.value)&&!I.dataRef.disabled),h=O?s.value.indexOf(O):-1;h===-1||h===p.value||(p.value=h,a.value=1);},clearSearch(){o.disabled||n.value!==1&&m.value!==""&&(m.value="");},registerOption(t,i){let l=u(d=>[...d,{id:t,dataRef:i}]);s.value=l.options,p.value=l.activeOptionIndex;},unregisterOption(t){let i=u(l=>{let d=l.findIndex(O=>O.id===t);return d!==-1&&l.splice(d,1),l});s.value=i.options,p.value=i.activeOptionIndex,a.value=1;},theirOnChange(t){o.disabled||L(t);},select(t){o.disabled||L(u$4(D.value,{[0]:()=>t,[1]:()=>{let i=toRaw(k.value.value).slice(),l=toRaw(t),d=i.findIndex(O=>k.compare(l,toRaw(O)));return d===-1?i.push(l):i.splice(d,1),i}}));}};w$1([f,v],(t,i)=>{var l;k.closeListbox(),w$3(i,h.Loose)||(t.preventDefault(),(l=o$3(f))==null||l.focus());},computed(()=>n.value===0)),provide($,k),t$2(computed(()=>u$4(n.value,{[0]:i.Open,[1]:i.Closed})));let C=computed(()=>{var t;return (t=o$3(f))==null?void 0:t.closest("form")});return onMounted(()=>{watch([C],()=>{if(!C.value||o.defaultValue===void 0)return;function t(){k.theirOnChange(o.defaultValue);}return C.value.addEventListener("reset",t),()=>{var i;(i=C.value)==null||i.removeEventListener("reset",t);}},{immediate:!0});}),()=>{let{name:t,modelValue:i,disabled:l,form:d,...O}=o,h={open:n.value===0,disabled:l,value:M.value};return h$1(Fragment,[...t!=null&&M.value!=null?e({[t]:M.value}).map(([I,Q])=>h$1(f$2,E$1({features:u$1.Hidden,key:I,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:d,disabled:l,name:I,value:Q}))):[],A$2({ourProps:{},theirProps:{...r,...T(O,["defaultValue","onUpdate:modelValue","horizontal","multiple","by"])},slot:h,slots:b,attrs:r,name:"Listbox"})])}}}),Ee=defineComponent({name:"ListboxLabel",props:{as:{type:[Object,String],default:"label"},id:{type:String,default:null}},setup(o,{attrs:b,slots:r}){var f;let w=(f=o.id)!=null?f:`headlessui-listbox-label-${I$1()}`,n=A("ListboxLabel");function e(){var v;(v=o$3(n.buttonRef))==null||v.focus({preventScroll:!0});}return ()=>{let v={open:n.listboxState.value===0,disabled:n.disabled.value},{...s}=o,m={id:w,ref:n.labelRef,onClick:e};return A$2({ourProps:m,theirProps:s,slot:v,attrs:b,slots:r,name:"ListboxLabel"})}}}),je=defineComponent({name:"ListboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(o,{attrs:b,slots:r,expose:w}){var p;let n=(p=o.id)!=null?p:`headlessui-listbox-button-${I$1()}`,e=A("ListboxButton");w({el:e.buttonRef,$el:e.buttonRef});function f(a){switch(a.key){case o$2.Space:case o$2.Enter:case o$2.ArrowDown:a.preventDefault(),e.openListbox(),nextTick(()=>{var u;(u=o$3(e.optionsRef))==null||u.focus({preventScroll:!0}),e.value.value||e.goToOption(c$1.First);});break;case o$2.ArrowUp:a.preventDefault(),e.openListbox(),nextTick(()=>{var u;(u=o$3(e.optionsRef))==null||u.focus({preventScroll:!0}),e.value.value||e.goToOption(c$1.Last);});break}}function v(a){switch(a.key){case o$2.Space:a.preventDefault();break}}function s(a){e.disabled.value||(e.listboxState.value===0?(e.closeListbox(),nextTick(()=>{var u;return (u=o$3(e.buttonRef))==null?void 0:u.focus({preventScroll:!0})})):(a.preventDefault(),e.openListbox(),me(()=>{var u;return (u=o$3(e.optionsRef))==null?void 0:u.focus({preventScroll:!0})})));}let m=s$1(computed(()=>({as:o.as,type:b.type})),e.buttonRef);return ()=>{var y,L;let a={open:e.listboxState.value===0,disabled:e.disabled.value,value:e.value.value},{...u}=o,D={ref:e.buttonRef,id:n,type:m.value,"aria-haspopup":"listbox","aria-controls":(y=o$3(e.optionsRef))==null?void 0:y.id,"aria-expanded":e.listboxState.value===0,"aria-labelledby":e.labelRef.value?[(L=o$3(e.labelRef))==null?void 0:L.id,n].join(" "):void 0,disabled:e.disabled.value===!0?!0:void 0,onKeydown:f,onKeyup:v,onClick:s};return A$2({ourProps:D,theirProps:u,slot:a,attrs:b,slots:r,name:"ListboxButton"})}}}),Ae=defineComponent({name:"ListboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(o,{attrs:b,slots:r,expose:w}){var p;let n=(p=o.id)!=null?p:`headlessui-listbox-options-${I$1()}`,e=A("ListboxOptions"),f=ref(null);w({el:e.optionsRef,$el:e.optionsRef});function v(a){switch(f.value&&clearTimeout(f.value),a.key){case o$2.Space:if(e.searchQuery.value!=="")return a.preventDefault(),a.stopPropagation(),e.search(a.key);case o$2.Enter:if(a.preventDefault(),a.stopPropagation(),e.activeOptionIndex.value!==null){let u=e.options.value[e.activeOptionIndex.value];e.select(u.dataRef.value);}e.mode.value===0&&(e.closeListbox(),nextTick(()=>{var u;return (u=o$3(e.buttonRef))==null?void 0:u.focus({preventScroll:!0})}));break;case u$4(e.orientation.value,{vertical:o$2.ArrowDown,horizontal:o$2.ArrowRight}):return a.preventDefault(),a.stopPropagation(),e.goToOption(c$1.Next);case u$4(e.orientation.value,{vertical:o$2.ArrowUp,horizontal:o$2.ArrowLeft}):return a.preventDefault(),a.stopPropagation(),e.goToOption(c$1.Previous);case o$2.Home:case o$2.PageUp:return a.preventDefault(),a.stopPropagation(),e.goToOption(c$1.First);case o$2.End:case o$2.PageDown:return a.preventDefault(),a.stopPropagation(),e.goToOption(c$1.Last);case o$2.Escape:a.preventDefault(),a.stopPropagation(),e.closeListbox(),nextTick(()=>{var u;return (u=o$3(e.buttonRef))==null?void 0:u.focus({preventScroll:!0})});break;case o$2.Tab:a.preventDefault(),a.stopPropagation();break;default:a.key.length===1&&(e.search(a.key),f.value=setTimeout(()=>e.clearSearch(),350));break}}let s=l$1(),m=computed(()=>s!==null?(s.value&i.Open)===i.Open:e.listboxState.value===0);return ()=>{var y,L;let a={open:e.listboxState.value===0},{...u}=o,D={"aria-activedescendant":e.activeOptionIndex.value===null||(y=e.options.value[e.activeOptionIndex.value])==null?void 0:y.id,"aria-multiselectable":e.mode.value===1?!0:void 0,"aria-labelledby":(L=o$3(e.buttonRef))==null?void 0:L.id,"aria-orientation":e.orientation.value,id:n,onKeydown:v,role:"listbox",tabIndex:0,ref:e.optionsRef};return A$2({ourProps:D,theirProps:u,slot:a,attrs:b,slots:r,features:N$1.RenderStrategy|N$1.Static,visible:m.value,name:"ListboxOptions"})}}}),Fe=defineComponent({name:"ListboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(o,{slots:b,attrs:r,expose:w}){var C;let n=(C=o.id)!=null?C:`headlessui-listbox-option-${I$1()}`,e=A("ListboxOption"),f=ref(null);w({el:f,$el:f});let v=computed(()=>e.activeOptionIndex.value!==null?e.options.value[e.activeOptionIndex.value].id===n:!1),s=computed(()=>u$4(e.mode.value,{[0]:()=>e.compare(toRaw(e.value.value),toRaw(o.value)),[1]:()=>toRaw(e.value.value).some(t=>e.compare(toRaw(t),toRaw(o.value)))})),m=computed(()=>u$4(e.mode.value,{[1]:()=>{var i;let t=toRaw(e.value.value);return ((i=e.options.value.find(l=>t.some(d=>e.compare(toRaw(d),toRaw(l.dataRef.value)))))==null?void 0:i.id)===n},[0]:()=>s.value})),p$1=p(f),a=computed(()=>({disabled:o.disabled,value:o.value,get textValue(){return p$1()},domRef:f}));onMounted(()=>e.registerOption(n,a)),onUnmounted(()=>e.unregisterOption(n)),onMounted(()=>{watch([e.listboxState,s],()=>{e.listboxState.value===0&&s.value&&u$4(e.mode.value,{[1]:()=>{m.value&&e.goToOption(c$1.Specific,n);},[0]:()=>{e.goToOption(c$1.Specific,n);}});},{immediate:!0});}),watchEffect(()=>{e.listboxState.value===0&&v.value&&e.activationTrigger.value!==0&&nextTick(()=>{var t,i;return (i=(t=o$3(f))==null?void 0:t.scrollIntoView)==null?void 0:i.call(t,{block:"nearest"})});});function u(t){if(o.disabled)return t.preventDefault();e.select(o.value),e.mode.value===0&&(e.closeListbox(),nextTick(()=>{var i;return (i=o$3(e.buttonRef))==null?void 0:i.focus({preventScroll:!0})}));}function D(){if(o.disabled)return e.goToOption(c$1.Nothing);e.goToOption(c$1.Specific,n);}let y=u$2();function L(t){y.update(t);}function M(t){y.wasMoved(t)&&(o.disabled||v.value||e.goToOption(c$1.Specific,n,0));}function k(t){y.wasMoved(t)&&(o.disabled||v.value&&e.goToOption(c$1.Nothing));}return ()=>{let{disabled:t}=o,i={active:v.value,selected:s.value,disabled:t},{value:l,disabled:d,...O}=o,h={id:n,ref:f,role:"option",tabIndex:t===!0?void 0:-1,"aria-disabled":t===!0?!0:void 0,"aria-selected":s.value,disabled:void 0,onClick:u,onFocus:D,onPointerenter:L,onMouseenter:L,onPointermove:M,onMousemove:M,onPointerleave:k,onMouseleave:k};return A$2({ourProps:h,theirProps:O,slot:i,attrs:r,slots:b,name:"ListboxOption"})}}});

var Z=(i=>(i[i.Open=0]="Open",i[i.Closed=1]="Closed",i))(Z||{}),ee=(i=>(i[i.Pointer=0]="Pointer",i[i.Other=1]="Other",i))(ee||{});

var Se=(s=>(s[s.Open=0]="Open",s[s.Closed=1]="Closed",s))(Se||{});

var ie=(u=>(u[u.Empty=1]="Empty",u[u.Active=2]="Active",u))(ie||{});

var te=(s=>(s[s.Forwards=0]="Forwards",s[s.Backwards=1]="Backwards",s))(te||{}),le=(d=>(d[d.Less=-1]="Less",d[d.Equal=0]="Equal",d[d.Greater=1]="Greater",d))(le||{});

var g=(i=>(i.Finished="finished",i.Cancelled="cancelled",i))(g||{});

var pe=(a=>(a.Visible="visible",a.Hidden="hidden",a))(pe||{});N$1.RenderStrategy;

function render$5(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z",
      "clip-rule": "evenodd"
    })
  ]))
}

function render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
      "clip-rule": "evenodd"
    })
  ]))
}

var script$2 = defineComponent({
    components: {
        ExclamationCircleIcon: render$3,
        Listbox: Ie,
        ListboxButton: je,
        ListboxLabel: Ee,
        ListboxOption: Fe,
        ListboxOptions: Ae,
        CheckIcon: render$5,
        ChevronUpDownIcon: render$4,
    },
    props: {
        modelValue: {
            type: [String, Object],
            required: false,
            default: null,
        },
        items: {
            type: Array,
            required: false,
            default: () => ([]),
        },
        itemKey: {
            type: String,
            required: false,
            default: null,
        },
        itemValue: {
            type: [Function, String],
            required: false,
            default: null,
        },
        label: {
            type: String,
            required: false,
            default: undefined,
        },
        placeholder: {
            type: String,
            required: false,
            default: undefined,
        },
        returnObject: {
            type: Boolean,
            required: false,
            default: false,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    emits: [
        'update:modelValue',
        'update',
        'change',
        'input',
    ],
    data() {
        return {
            identifier: Math.random().toString(36).substring(2, 15),
            selectedKey: null,
        };
    },
    computed: {
        /**
         * Get parsed model value.
         * This will check if item key should be used and returns
         * the matching item.
         */
        parsedModelValue() {
            const key = this.itemKey;
            const selectedValue = this.selectedKey || this.modelValue;
            let parsedValue = key && typeof selectedValue === 'string'
                ? this.items.find((item) => item?.[key] === selectedValue)
                : this.items.find((item) => item === selectedValue);
            if (this.required && !parsedValue) {
                parsedValue = this.items?.[0];
            }
            return parsedValue;
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            deep: true,
            handler(modelValue) {
                this.selectedKey = modelValue?.[this.itemKey] || null;
                if (this.required && !modelValue && this.parsedModelValue) {
                    this.onModelValueUpdate(this.parsedModelValue);
                }
            },
        },
    },
    methods: {
        /**
         * Get item value.
         * @param item
         */
        getItemValue(item) {
            let value = item;
            if (this.itemValue && item) {
                value = typeof this.itemValue === 'function'
                    ? this.itemValue(item)
                    : item?.[this.itemValue];
            }
            return Array.isArray(value)
                ? value.join(', ')
                : value;
        },
        /**
         * On model value update.
         * @param value
         */
        onModelValueUpdate(value) {
            let parsedValue = value;
            const key = this.itemKey;
            if (!this.returnObject && key && value && typeof Object.keys(value).includes(key)) {
                parsedValue = parsedValue[key];
            }
            this.selectedKey = parsedValue;
            this.$emit('update:modelValue', parsedValue);
            this.$emit('update', parsedValue);
            this.$emit('change', parsedValue);
            this.$emit('input', parsedValue);
        },
    },
});

const _hoisted_1$2 = { class: "mt-1 relative" };
const _hoisted_2$2 = { class: "block truncate" };
const _hoisted_3$2 = { class: "absolute inset-y-0 right-0 flex items-center pointer-events-none" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ListboxLabel = resolveComponent("ListboxLabel");
  const _component_ChevronUpDownIcon = resolveComponent("ChevronUpDownIcon");
  const _component_ListboxButton = resolveComponent("ListboxButton");
  const _component_CheckIcon = resolveComponent("CheckIcon");
  const _component_ListboxOption = resolveComponent("ListboxOption");
  const _component_ListboxOptions = resolveComponent("ListboxOptions");
  const _component_Listbox = resolveComponent("Listbox");

  return (openBlock(), createBlock(_component_Listbox, {
    as: "div",
    "model-value": _ctx.parsedModelValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (_ctx.onModelValueUpdate($event)))
  }, {
    default: withCtx(() => [
      createCommentVNode(" Select label "),
      (_ctx.label || _ctx.$slots.label)
        ? (openBlock(), createBlock(_component_ListboxLabel, {
            key: 0,
            for: _ctx.identifier,
            class: "block text-sm font-medium text-gray-700"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "label", {}, () => [
                createTextVNode(toDisplayString$1(_ctx.label), 1 /* TEXT */)
              ])
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["for"]))
        : createCommentVNode("v-if", true),
      createCommentVNode(" Select element "),
      createBaseVNode("div", _hoisted_1$2, [
        createVNode(_component_ListboxButton, { class: "bg-gray-350 relative w-full rounded-md h-10 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-tertiary sm:text-sm" }, {
          default: withCtx(() => [
            createBaseVNode("span", _hoisted_2$2, toDisplayString$1(_ctx.getItemValue(_ctx.parsedModelValue) || _ctx.placeholder || ' '), 1 /* TEXT */),
            createBaseVNode("span", _hoisted_3$2, [
              createVNode(_component_ChevronUpDownIcon, {
                class: "h-5 w-5 text-gray-400",
                "aria-hidden": "true"
              })
            ])
          ]),
          _: 1 /* STABLE */
        }),
        createVNode(Transition, {
          "leave-active-class": "transition ease-in duration-100",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            createVNode(_component_ListboxOptions, { class: "absolute z-10 mt-1 w-full bg-gray-350 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
                  return (openBlock(), createBlock(_component_ListboxOption, {
                    key: item.id,
                    as: "template",
                    value: item
                  }, {
                    default: withCtx(({ active, selected }) => [
                      createBaseVNode("li", {
                        class: normalizeClass({
                'cursor-default select-none relative py-2 pl-3 pr-9': true,
                'text-white bg-tertiary': active,
                'text-gray-900': !active
              })
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass({
                  'block truncate': true,
                  'font-semibold': selected,
                  'font-normal': !selected,
                })
                        }, toDisplayString$1(_ctx.getItemValue(item)), 3 /* TEXT, CLASS */),
                        selected
                          ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              class: normalizeClass({
                  'absolute inset-y-0 right-0 flex items-center pr-4': true,
                  'text-white': active,
                  'text-tertiary': !active,
                })
                            }, [
                              createVNode(_component_CheckIcon, {
                                class: "h-5 w-5",
                                "aria-hidden": "true"
                              })
                            ], 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ], 2 /* CLASS */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value"]))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _: 1 /* STABLE */
            })
          ]),
          _: 1 /* STABLE */
        })
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["model-value"]))
}

script$2.render = render$2;
script$2.__file = "src/components/ui/AutSelect.vue";

var script$1 = defineComponent({
    name: 'AutSettings',
    components: {
        AutSuccessIcon: script$3$1,
        AutSelect: script$2,
        AutCloseIcon: script$7,
        AutButton: script$5,
        AutInput: script$5$1,
    },
    setup() {
        const { shortcut, getDefaultShortcut, detectShortcut, saveShortcut } = useShortcut();
        const editableShortcut = ref(getDefaultShortcut());
        return {
            defaultShortcut: getDefaultShortcut(),
            shortcut,
            editableShortcut,
            detectShortcut,
            saveShortcut,
        };
    },
    data() {
        return {
            urls: [],
            showSuccessState: false,
            performSearchMode: 'existing-tab',
            performSearchModes: [{
                    key: 'existing-tab',
                    value: this.$t('options.settings.performSearchModeExistingTab'),
                }, {
                    key: 'new-tab',
                    value: this.$t('options.settings.performSearchModeNewTab'),
                }],
        };
    },
    watch: {
        shortcut: {
            immediate: true,
            deep: true,
            handler(shortcut) {
                this.editableShortcut = shortcut;
            },
        },
    },
    mounted() {
        const emitDefaultShortcutEvent = (data) => {
            if (data?.command === 'tooltip') {
                this.onDetectShortcut(new KeyboardEvent('keydown', {
                    shiftKey: this.defaultShortcut.keys.shift,
                    ctrlKey: this.defaultShortcut.keys.ctrl,
                    altKey: this.defaultShortcut.keys.alt,
                    metaKey: this.defaultShortcut.keys.meta,
                    location: this.defaultShortcut.keys.location,
                    code: this.defaultShortcut.keys.code,
                }));
            }
        };
        // Add event listener to the handle native browser commands.
        chrome.runtime.onMessage.removeListener(emitDefaultShortcutEvent);
        chrome.runtime.onMessage.addListener(emitDefaultShortcutEvent);
        // Load settings from synced storage.
        this.loadSettingsFromSyncedStorage();
    },
    methods: {
        /**
         * Load settings from synced storage.
         * Will load the settings from the browser storage.
         */
        async loadSettingsFromSyncedStorage() {
            this.urls = await syncedStorage.get('disabledArticleNumberDetection') || [];
            this.performSearchMode = await syncedStorage.get('performSearchMode') || 'existing-tab';
        },
        /**
         * Remove disabled article number detection url.
         * Will remove the url from the list of disabled article number detection urls.
         * @param url
         */
        async removeDisabledArticleNumberDetectionUrl(url) {
            this.urls = await syncedStorage.drop('disabledArticleNumberDetection', url) || [];
        },
        /**
         * On detect shortcut action.
         * Will analyse the keyboard event and return shortcut.
         * @param event
         */
        async onDetectShortcut(event) {
            this.editableShortcut = this.detectShortcut(event);
        },
        /**
         * On save action.
         * Will store the new shortcut to browser storage.
         */
        async onSave() {
            await syncedStorage.set('performSearchMode', this.performSearchMode);
            await this.saveShortcut(this.editableShortcut);
            this.showSuccessState = true;
            setTimeout(() => {
                this.showSuccessState = false;
            }, 5000);
        },
    },
});

const _hoisted_1$1 = { class: "space-y-8" };
const _hoisted_2$1 = { class: "mb-8 text-center" };
const _hoisted_3$1 = { class: "text-4xl" };
const _hoisted_4$1 = { class: "text-base font-bold" };
const _hoisted_5$1 = { class: "text-base font-light mb-2" };
const _hoisted_6$1 = {
  key: 0,
  class: "text-base font-light text-xs flex gap-2"
};
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = { class: "bg-gray-400 group-hover:bg-gray-200 p-1 rounded-full" };
const _hoisted_9 = {
  key: 1,
  class: "text-base font-light text-xs text-gray-700"
};
const _hoisted_10 = { class: "text-base font-bold" };
const _hoisted_11 = { class: "text-base font-light" };
const _hoisted_12 = { class: "text-base font-bold" };
const _hoisted_13 = { class: "text-base font-light" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutCloseIcon = resolveComponent("AutCloseIcon");
  const _component_AutSelect = resolveComponent("AutSelect");
  const _component_AutInput = resolveComponent("AutInput");
  const _component_AutSuccessIcon = resolveComponent("AutSuccessIcon");
  const _component_AutButton = resolveComponent("AutButton");

  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("h1", _hoisted_3$1, toDisplayString$1(_ctx.$t('options.settings.title')), 1 /* TEXT */)
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("label", _hoisted_4$1, toDisplayString$1(_ctx.$t('options.settings.disabledArticleNumberDetectionLabel')), 1 /* TEXT */),
      createBaseVNode("div", _hoisted_5$1, toDisplayString$1(_ctx.$t('options.settings.disabledArticleNumberDetectionDescription')), 1 /* TEXT */),
      (_ctx.urls && _ctx.urls.length)
        ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.urls, (url) => {
              return (openBlock(), createElementBlock("button", {
                key: url,
                class: "group flex items-center justify-center gap-2 p-2 bg-gray-100 text-gray-700 hover:!bg-white rounded-xl",
                onClick: $event => (_ctx.removeDisabledArticleNumberDetectionUrl(url))
              }, [
                createBaseVNode("div", _hoisted_8$1, [
                  createVNode(_component_AutCloseIcon, { class: "w-3 h-3 text-gray-700" })
                ]),
                createBaseVNode("span", null, toDisplayString$1(url), 1 /* TEXT */)
              ], 8 /* PROPS */, _hoisted_7$1))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString$1(_ctx.$t('options.settings.disabledArticleNumberDetectionNoEntries')), 1 /* TEXT */))
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("label", _hoisted_10, toDisplayString$1(_ctx.$t('options.settings.performSearchModeLabel')), 1 /* TEXT */),
      createBaseVNode("div", _hoisted_11, toDisplayString$1(_ctx.$t('options.settings.performSearchModeDescription')), 1 /* TEXT */),
      createVNode(_component_AutSelect, {
        modelValue: _ctx.performSearchMode,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.performSearchMode) = $event)),
        items: _ctx.performSearchModes,
        "item-key": "key",
        "item-value": "value",
        class: "mt-4",
        required: ""
      }, null, 8 /* PROPS */, ["modelValue", "items"])
    ]),
    createBaseVNode("div", null, [
      createBaseVNode("label", _hoisted_12, toDisplayString$1(_ctx.$t('options.settings.shortcutLabel')), 1 /* TEXT */),
      createBaseVNode("div", _hoisted_13, toDisplayString$1(_ctx.$t('options.settings.shortcutDescription')), 1 /* TEXT */),
      createVNode(_component_AutInput, {
        modelValue: _ctx.editableShortcut.text,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.editableShortcut.text) = $event)),
        placeholder: _ctx.$t('options.settings.shortcutPlaceholder'),
        class: "mt-4",
        readonly: "",
        onKeydown: _ctx.onDetectShortcut
      }, null, 8 /* PROPS */, ["modelValue", "placeholder", "onKeydown"])
    ]),
    createVNode(_component_AutButton, {
      class: "mt-4 gap-2",
      onClick: _ctx.onSave
    }, {
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass({
          'transition-all': true,
          'w-6 opacity-100': _ctx.showSuccessState,
          'w-0 opacity-0': !_ctx.showSuccessState,
        })
        }, [
          createVNode(_component_AutSuccessIcon, { class: "w-6 h-6" })
        ], 2 /* CLASS */),
        createTextVNode(" " + toDisplayString$1(_ctx.$t('options.settings.saveButton')), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["onClick"])
  ]))
}

script$1.render = render$1;
script$1.__file = "src/options/AutSettings.vue";

var script = defineComponent({
    name: 'AutOptions',
    components: {
        AutStylesheet: script$6,
        AutSettings: script$1,
        AutOnboarding: script$3,
        AutTooltip: script$4,
        AutLogo: script$8,
    },
    setup() {
        const name = chrome.runtime.getManifest().name;
        const version = chrome.runtime.getManifest().version;
        const pointer = ref(0);
        const refresh = () => pointer.value++;
        const changeLogUrl = chrome.runtime.getURL('changelog/index.html');
        return { name, version, pointer, refresh, changeLogUrl };
    },
});

const _withScopeId = n => (pushScopeId("data-v-883edff0"),n=n(),popScopeId(),n);
const _hoisted_1 = { class: "w-full min-h-screen bg-gray-300 p-8" };
const _hoisted_2 = { class: "container m-auto" };
const _hoisted_3 = { class: "mb-12" };
const _hoisted_4 = { class: "space-y-20" };
const _hoisted_5 = { class: "flex flex-row justify-center gap-2 mt-12 text-sm text-black-400 text-center" };
const _hoisted_6 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", null, "/", -1 /* HOISTED */));
const _hoisted_7 = ["href"];
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", null, "/", -1 /* HOISTED */));

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutStylesheet = resolveComponent("AutStylesheet");
  const _component_AutLogo = resolveComponent("AutLogo");
  const _component_AutOnboarding = resolveComponent("AutOnboarding");
  const _component_AutSettings = resolveComponent("AutSettings");

  return (openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_AutStylesheet, { onLoad: _ctx.refresh }, null, 8 /* PROPS */, ["onLoad"]),
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createVNode(_component_AutLogo, { class: "text-primary" })
        ]),
        createBaseVNode("div", _hoisted_4, [
          (openBlock(), createBlock(_component_AutOnboarding, { key: _ctx.pointer })),
          (openBlock(), createBlock(_component_AutSettings, { key: _ctx.pointer }))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", null, toDisplayString$1(_ctx.name), 1 /* TEXT */),
          _hoisted_6,
          createBaseVNode("div", null, [
            createBaseVNode("a", {
              href: _ctx.changeLogUrl,
              target: "_blank"
            }, toDisplayString$1(_ctx.$t('options.latestChanges')), 9 /* TEXT, PROPS */, _hoisted_7)
          ]),
          _hoisted_8,
          createBaseVNode("div", null, toDisplayString$1(_ctx.$t('options.version')) + " " + toDisplayString$1(_ctx.version), 1 /* TEXT */)
        ])
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script.render = render;
script.__scopeId = "data-v-883edff0";
script.__file = "src/options/AutOptions.vue";

// Initialize vue app and mount it.
const app = createApp(script);
app.use(i18n);
app.mount('#app-auteon-plugin-tooltip');
