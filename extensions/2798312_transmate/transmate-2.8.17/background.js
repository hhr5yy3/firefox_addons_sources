(()=>{var Zt=Object.create;var Se=Object.defineProperty;var Yt=Object.getOwnPropertyDescriptor;var Xt=Object.getOwnPropertyNames;var Qt=Object.getPrototypeOf,ea=Object.prototype.hasOwnProperty;var re=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ta=(t,e)=>{for(var a in e)Se(t,a,{get:e[a],enumerable:!0})},aa=(t,e,a,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Xt(e))!ea.call(t,r)&&r!==a&&Se(t,r,{get:()=>e[r],enumerable:!(n=Yt(e,r))||n.enumerable});return t};var ke=(t,e,a)=>(a=t!=null?Zt(Qt(t)):{},aa(e||!t||!t.__esModule?Se(a,"default",{value:t,enumerable:!0}):a,t));var Ce=re((ze,Ge)=>{(function(t,e){if(typeof define=="function"&&define.amd)define("webextension-polyfill",["module"],e);else if(typeof ze<"u")e(Ge);else{var a={exports:{}};e(a),t.browser=a.exports}})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:ze,function(t){"use strict";if(!globalThis.chrome?.runtime?.id)throw new Error("This script should only be loaded in a browser extension.");if(typeof globalThis.browser>"u"||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){let e="The message port closed before a response was received.",a=n=>{let r={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(r).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class o extends WeakMap{constructor(m,w=void 0){super(w),this.createItem=m}get(m){return this.has(m)||this.set(m,this.createItem(m)),super.get(m)}}let s=d=>d&&typeof d=="object"&&typeof d.then=="function",l=(d,m)=>(...w)=>{n.runtime.lastError?d.reject(new Error(n.runtime.lastError.message)):m.singleCallbackArg||w.length<=1&&m.singleCallbackArg!==!1?d.resolve(w[0]):d.resolve(w)},c=d=>d==1?"argument":"arguments",u=(d,m)=>function(A,...C){if(C.length<m.minArgs)throw new Error(`Expected at least ${m.minArgs} ${c(m.minArgs)} for ${d}(), got ${C.length}`);if(C.length>m.maxArgs)throw new Error(`Expected at most ${m.maxArgs} ${c(m.maxArgs)} for ${d}(), got ${C.length}`);return new Promise((B,E)=>{if(m.fallbackToNoCallback)try{A[d](...C,l({resolve:B,reject:E},m))}catch{A[d](...C),m.fallbackToNoCallback=!1,m.noCallback=!0,B()}else m.noCallback?(A[d](...C),B()):A[d](...C,l({resolve:B,reject:E},m))})},y=(d,m,w)=>new Proxy(m,{apply(A,C,B){return w.call(C,d,...B)}}),b=Function.call.bind(Object.prototype.hasOwnProperty),g=(d,m={},w={})=>{let A=Object.create(null),C={has(E,v){return v in d||v in A},get(E,v,N){if(v in A)return A[v];if(!(v in d))return;let M=d[v];if(typeof M=="function")if(typeof m[v]=="function")M=y(d,d[v],m[v]);else if(b(w,v)){let V=u(v,w[v]);M=y(d,d[v],V)}else M=M.bind(d);else if(typeof M=="object"&&M!==null&&(b(m,v)||b(w,v)))M=g(M,m[v],w[v]);else if(b(w,"*"))M=g(M,m[v],w["*"]);else return Object.defineProperty(A,v,{configurable:!0,enumerable:!0,get(){return d[v]},set(V){d[v]=V}}),M;return A[v]=M,M},set(E,v,N,M){return v in A?A[v]=N:d[v]=N,!0},defineProperty(E,v,N){return Reflect.defineProperty(A,v,N)},deleteProperty(E,v){return Reflect.deleteProperty(A,v)}},B=Object.create(d);return new Proxy(B,C)},p=d=>({addListener(m,w,...A){m.addListener(d.get(w),...A)},hasListener(m,w){return m.hasListener(d.get(w))},removeListener(m,w){m.removeListener(d.get(w))}}),f=new o(d=>typeof d!="function"?d:function(w){let A=g(w,{},{getContent:{minArgs:0,maxArgs:0}});d(A)}),h=new o(d=>typeof d!="function"?d:function(w,A,C){let B=!1,E,v=new Promise(X=>{E=function(F){B=!0,X(F)}}),N;try{N=d(w,A,E)}catch(X){N=Promise.reject(X)}let M=N!==!0&&s(N);if(N!==!0&&!M&&!B)return!1;let V=X=>{X.then(F=>{C(F)},F=>{let Te;F&&(F instanceof Error||typeof F.message=="string")?Te=F.message:Te="An unexpected error occurred",C({__mozWebExtensionPolyfillReject__:!0,message:Te})}).catch(F=>{})};return V(M?N:v),!0}),x=({reject:d,resolve:m},w)=>{n.runtime.lastError?n.runtime.lastError.message===e?m():d(new Error(n.runtime.lastError.message)):w&&w.__mozWebExtensionPolyfillReject__?d(new Error(w.message)):m(w)},_=(d,m,w,...A)=>{if(A.length<m.minArgs)throw new Error(`Expected at least ${m.minArgs} ${c(m.minArgs)} for ${d}(), got ${A.length}`);if(A.length>m.maxArgs)throw new Error(`Expected at most ${m.maxArgs} ${c(m.maxArgs)} for ${d}(), got ${A.length}`);return new Promise((C,B)=>{let E=x.bind(null,{resolve:C,reject:B});A.push(E),w.sendMessage(...A)})},S={devtools:{network:{onRequestFinished:p(f)}},runtime:{onMessage:p(h),onMessageExternal:p(h),sendMessage:_.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:_.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},j={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return r.privacy={network:{"*":j},services:{"*":j},websites:{"*":j}},g(n,S,r)};t.exports=a(chrome)}else t.exports=globalThis.browser})});var Ke=re((es,Ve)=>{"use strict";Ve.exports=()=>{let t={};return t.promise=new Promise((e,a)=>{t.resolve=e,t.reject=a}),t}});var Ze=re((ts,Je)=>{"use strict";var na=Ke();function ra(t,e="maxAge"){let a,n,r,o=async()=>{if(a!==void 0)return;let c=async u=>{r=na();let y=u[1][e]-Date.now();if(y<=0){t.delete(u[0]),r.resolve();return}return a=u[0],n=setTimeout(()=>{t.delete(u[0]),r&&r.resolve()},y),typeof n.unref=="function"&&n.unref(),r.promise};try{for(let u of t)await c(u)}catch{}a=void 0},s=()=>{a=void 0,n!==void 0&&(clearTimeout(n),n=void 0),r!==void 0&&(r.reject(void 0),r=void 0)},l=t.set.bind(t);return t.set=(c,u)=>{t.has(c)&&t.delete(c);let y=l(c,u);return a&&a===c&&s(),o(),y},o(),t}Je.exports=ra});var Xe=re((as,Ye)=>{"use strict";var oa=Ze(),Me=class{constructor(e,a){if(this.maxAge=e,this[Symbol.toStringTag]="Map",this.data=new Map,oa(this.data),a)for(let[n,r]of a)this.set(n,r)}get size(){return this.data.size}clear(){this.data.clear()}delete(e){return this.data.delete(e)}has(e){return this.data.has(e)}get(e){let a=this.data.get(e);if(a)return a.data}set(e,a){return this.data.set(e,{maxAge:Date.now()+this.maxAge,data:a}),this}values(){return this.createIterator(e=>e[1].data)}keys(){return this.data.keys()}entries(){return this.createIterator(e=>[e[0],e[1].data])}forEach(e,a){for(let[n,r]of this.entries())e.apply(a,[r,n,this])}[Symbol.iterator](){return this.entries()}*createIterator(e){for(let a of this.data.entries())yield e(a)}};Ye.exports=Me});var U=ke(Ce());var Rt=ke(Xe());var oe,sa=new Uint8Array(16);function Pe(){if(!oe&&(oe=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!oe))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return oe(sa)}var I=[];for(let t=0;t<256;++t)I.push((t+256).toString(16).slice(1));function Qe(t,e=0){return(I[t[e+0]]+I[t[e+1]]+I[t[e+2]]+I[t[e+3]]+"-"+I[t[e+4]]+I[t[e+5]]+"-"+I[t[e+6]]+I[t[e+7]]+"-"+I[t[e+8]]+I[t[e+9]]+"-"+I[t[e+10]]+I[t[e+11]]+I[t[e+12]]+I[t[e+13]]+I[t[e+14]]+I[t[e+15]]).toLowerCase()}var ia=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ie={randomUUID:ia};function la(t,e,a){if(Ie.randomUUID&&!e&&!t)return Ie.randomUUID();t=t||{};let n=t.random||(t.rng||Pe)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,e){a=a||0;for(let r=0;r<16;++r)e[a+r]=n[r];return e}return Qe(n)}var $=la;function et(t){let e,a,n,r,o,s,l;return c(),{feed:u,reset:c};function c(){e=!0,a="",n=0,r=-1,o=void 0,s=void 0,l=""}function u(b){a=a?a+b:b,e&&ca(a)&&(a=a.slice(tt.length)),e=!1;let g=a.length,p=0,f=!1;for(;p<g;){f&&(a[p]===`
`&&++p,f=!1);let h=-1,x=r,_;for(let S=n;h<0&&S<g;++S)_=a[S],_===":"&&x<0?x=S-p:_==="\r"?(f=!0,h=S-p):_===`
`&&(h=S-p);if(h<0){n=g-p,r=x;break}else n=0,r=-1;y(a,p,x,h),p+=h+1}p===g?a="":p>0&&(a=a.slice(p))}function y(b,g,p,f){if(f===0){l.length>0&&(t({type:"event",id:o,event:s||void 0,data:l.slice(0,-1)}),l="",o=void 0),s=void 0;return}let h=p<0,x=b.slice(g,g+(h?f:p)),_=0;h?_=f:b[g+p+1]===" "?_=p+2:_=p+1;let S=g+_,j=f-_,d=b.slice(S,S+j).toString();if(x==="data")l+=d?"".concat(d,`
`):`
`;else if(x==="event")s=d;else if(x==="id"&&!d.includes("\0"))o=d;else if(x==="retry"){let m=parseInt(d,10);Number.isNaN(m)||t({type:"reconnect-interval",value:m})}}}var tt=[239,187,191];function ca(t){return tt.every((e,a)=>t.charCodeAt(a)===e)}var ua=typeof global=="object"&&global&&global.Object===Object&&global,se=ua;var da=typeof self=="object"&&self&&self.Object===Object&&self,fa=se||da||Function("return this")(),L=fa;var ma=L.Symbol,K=ma;var at=Object.prototype,pa=at.hasOwnProperty,ga=at.toString,Q=K?K.toStringTag:void 0;function ha(t){var e=pa.call(t,Q),a=t[Q];try{t[Q]=void 0;var n=!0}catch{}var r=ga.call(t);return n&&(e?t[Q]=a:delete t[Q]),r}var nt=ha;var ba=Object.prototype,xa=ba.toString;function ya(t){return xa.call(t)}var rt=ya;var wa="[object Null]",va="[object Undefined]",ot=K?K.toStringTag:void 0;function _a(t){return t==null?t===void 0?va:wa:ot&&ot in Object(t)?nt(t):rt(t)}var q=_a;function Aa(t){return t!=null&&typeof t=="object"}var J=Aa;var Ta=Array.isArray,st=Ta;function Sa(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var ie=Sa;var ka="[object AsyncFunction]",za="[object Function]",Ca="[object GeneratorFunction]",Ma="[object Proxy]";function Pa(t){if(!ie(t))return!1;var e=q(t);return e==za||e==Ca||e==ka||e==Ma}var le=Pa;var Ia=L["__core-js_shared__"],ce=Ia;var it=function(){var t=/[^.]+$/.exec(ce&&ce.keys&&ce.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function ja(t){return!!it&&it in t}var lt=ja;var La=Function.prototype,Ba=La.toString;function Ea(t){if(t!=null){try{return Ba.call(t)}catch{}try{return t+""}catch{}}return""}var H=Ea;var Na=/[\\^$.*+?()[\]{}|]/g,Oa=/^\[object .+?Constructor\]$/,Wa=Function.prototype,Da=Object.prototype,Fa=Wa.toString,qa=Da.hasOwnProperty,Ha=RegExp("^"+Fa.call(qa).replace(Na,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Ra(t){if(!ie(t)||lt(t))return!1;var e=le(t)?Ha:Oa;return e.test(H(t))}var ct=Ra;function Ua(t,e){return t?.[e]}var ut=Ua;function $a(t,e){var a=ut(t,e);return ct(a)?a:void 0}var D=$a;var Ga=D(L,"WeakMap"),ue=Ga;var Va=9007199254740991;function Ka(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Va}var de=Ka;function Ja(t){return t!=null&&de(t.length)&&!le(t)}var dt=Ja;var Za=Object.prototype;function Ya(t){var e=t&&t.constructor,a=typeof e=="function"&&e.prototype||Za;return t===a}var fe=Ya;var Xa="[object Arguments]";function Qa(t){return J(t)&&q(t)==Xa}var je=Qa;var ft=Object.prototype,en=ft.hasOwnProperty,tn=ft.propertyIsEnumerable,an=je(function(){return arguments}())?je:function(t){return J(t)&&en.call(t,"callee")&&!tn.call(t,"callee")},mt=an;function nn(){return!1}var pt=nn;var bt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,gt=bt&&typeof module=="object"&&module&&!module.nodeType&&module,rn=gt&&gt.exports===bt,ht=rn?L.Buffer:void 0,on=ht?ht.isBuffer:void 0,sn=on||pt,xt=sn;var ln="[object Arguments]",cn="[object Array]",un="[object Boolean]",dn="[object Date]",fn="[object Error]",mn="[object Function]",pn="[object Map]",gn="[object Number]",hn="[object Object]",bn="[object RegExp]",xn="[object Set]",yn="[object String]",wn="[object WeakMap]",vn="[object ArrayBuffer]",_n="[object DataView]",An="[object Float32Array]",Tn="[object Float64Array]",Sn="[object Int8Array]",kn="[object Int16Array]",zn="[object Int32Array]",Cn="[object Uint8Array]",Mn="[object Uint8ClampedArray]",Pn="[object Uint16Array]",In="[object Uint32Array]",k={};k[An]=k[Tn]=k[Sn]=k[kn]=k[zn]=k[Cn]=k[Mn]=k[Pn]=k[In]=!0;k[ln]=k[cn]=k[vn]=k[un]=k[_n]=k[dn]=k[fn]=k[mn]=k[pn]=k[gn]=k[hn]=k[bn]=k[xn]=k[yn]=k[wn]=!1;function jn(t){return J(t)&&de(t.length)&&!!k[q(t)]}var yt=jn;function Ln(t){return function(e){return t(e)}}var wt=Ln;var vt=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ee=vt&&typeof module=="object"&&module&&!module.nodeType&&module,Bn=ee&&ee.exports===vt,Le=Bn&&se.process,En=function(){try{var t=ee&&ee.require&&ee.require("util").types;return t||Le&&Le.binding&&Le.binding("util")}catch{}}(),Be=En;var _t=Be&&Be.isTypedArray,Nn=_t?wt(_t):yt,At=Nn;function On(t,e){return function(a){return t(e(a))}}var Tt=On;var Wn=Tt(Object.keys,Object),St=Wn;var Dn=Object.prototype,Fn=Dn.hasOwnProperty;function qn(t){if(!fe(t))return St(t);var e=[];for(var a in Object(t))Fn.call(t,a)&&a!="constructor"&&e.push(a);return e}var kt=qn;var Hn=D(L,"Map"),me=Hn;var Rn=D(L,"DataView"),pe=Rn;var Un=D(L,"Promise"),ge=Un;var $n=D(L,"Set"),he=$n;var zt="[object Map]",Gn="[object Object]",Ct="[object Promise]",Mt="[object Set]",Pt="[object WeakMap]",It="[object DataView]",Vn=H(pe),Kn=H(me),Jn=H(ge),Zn=H(he),Yn=H(ue),G=q;(pe&&G(new pe(new ArrayBuffer(1)))!=It||me&&G(new me)!=zt||ge&&G(ge.resolve())!=Ct||he&&G(new he)!=Mt||ue&&G(new ue)!=Pt)&&(G=function(t){var e=q(t),a=e==Gn?t.constructor:void 0,n=a?H(a):"";if(n)switch(n){case Vn:return It;case Kn:return zt;case Jn:return Ct;case Zn:return Mt;case Yn:return Pt}return e});var jt=G;var Xn="[object Map]",Qn="[object Set]",er=Object.prototype,tr=er.hasOwnProperty;function ar(t){if(t==null)return!0;if(dt(t)&&(st(t)||typeof t=="string"||typeof t.splice=="function"||xt(t)||At(t)||mt(t)))return!t.length;var e=jt(t);if(e==Xn||e==Qn)return!t.size;if(fe(t))return!kt(t).length;for(var a in t)if(tr.call(t,a))return!1;return!0}var be=ar;async function*nr(t){let e=t.getReader();try{for(;;){let{done:a,value:n}=await e.read();if(a)return;yield n}}finally{e.releaseLock()}}async function Ee(t,e){let{onMessage:a,...n}=e;try{let r=await fetch(t,n);if(!r.ok){let s=await r.json().catch(()=>({}));s.status=r.status;try{window.postMessage({type:"error",msg:JSON.stringify(s)})}catch(l){throw new Error(be(l)?`${r.status} ${r.statusText}`:JSON.stringify(l))}}let o=et(s=>{s.type==="event"&&a(s.data)});for await(let s of nr(r.body)){let l=new TextDecoder().decode(s);o.feed(l)}}catch(r){try{window.postMessage({type:"error",msg:`${r.message}`})}catch(o){throw new Error(be(o)?`${o.message}`:JSON.stringify(o))}}}function R(){}R.prototype={diff:function(e,a){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.callback;typeof n=="function"&&(r=n,n={}),this.options=n;var o=this;function s(h){return r?(setTimeout(function(){r(void 0,h)},0),!0):h}e=this.castInput(e),a=this.castInput(a),e=this.removeEmpty(this.tokenize(e)),a=this.removeEmpty(this.tokenize(a));var l=a.length,c=e.length,u=1,y=l+c;n.maxEditLength&&(y=Math.min(y,n.maxEditLength));var b=[{newPos:-1,components:[]}],g=this.extractCommon(b[0],a,e,0);if(b[0].newPos+1>=l&&g+1>=c)return s([{value:this.join(a),count:a.length}]);function p(){for(var h=-1*u;h<=u;h+=2){var x=void 0,_=b[h-1],S=b[h+1],j=(S?S.newPos:0)-h;_&&(b[h-1]=void 0);var d=_&&_.newPos+1<l,m=S&&0<=j&&j<c;if(!d&&!m){b[h]=void 0;continue}if(!d||m&&_.newPos<S.newPos?(x=or(S),o.pushComponent(x.components,void 0,!0)):(x=_,x.newPos++,o.pushComponent(x.components,!0,void 0)),j=o.extractCommon(x,a,e,h),x.newPos+1>=l&&j+1>=c)return s(rr(o,x.components,a,e,o.useLongestToken));b[h]=x}u++}if(r)(function h(){setTimeout(function(){if(u>y)return r();p()||h()},0)})();else for(;u<=y;){var f=p();if(f)return f}},pushComponent:function(e,a,n){var r=e[e.length-1];r&&r.added===a&&r.removed===n?e[e.length-1]={count:r.count+1,added:a,removed:n}:e.push({count:1,added:a,removed:n})},extractCommon:function(e,a,n,r){for(var o=a.length,s=n.length,l=e.newPos,c=l-r,u=0;l+1<o&&c+1<s&&this.equals(a[l+1],n[c+1]);)l++,c++,u++;return u&&e.components.push({count:u}),e.newPos=l,c},equals:function(e,a){return this.options.comparator?this.options.comparator(e,a):e===a||this.options.ignoreCase&&e.toLowerCase()===a.toLowerCase()},removeEmpty:function(e){for(var a=[],n=0;n<e.length;n++)e[n]&&a.push(e[n]);return a},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};function rr(t,e,a,n,r){for(var o=0,s=e.length,l=0,c=0;o<s;o++){var u=e[o];if(u.removed){if(u.value=t.join(n.slice(c,c+u.count)),c+=u.count,o&&e[o-1].added){var b=e[o-1];e[o-1]=e[o],e[o]=b}}else{if(!u.added&&r){var y=a.slice(l,l+u.count);y=y.map(function(p,f){var h=n[c+f];return h.length>p.length?h:p}),u.value=t.join(y)}else u.value=t.join(a.slice(l,l+u.count));l+=u.count,u.added||(c+=u.count)}}var g=e[s-1];return s>1&&typeof g.value=="string"&&(g.added||g.removed)&&t.equals("",g.value)&&(e[s-2].value+=g.value,e.pop()),e}function or(t){return{newPos:t.newPos,components:t.components.slice(0)}}var sr=new R;function Et(t,e,a){return sr.diff(t,e,a)}var Lt=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,Bt=/\S/,Nt=new R;Nt.equals=function(t,e){return this.options.ignoreCase&&(t=t.toLowerCase(),e=e.toLowerCase()),t===e||this.options.ignoreWhitespace&&!Bt.test(t)&&!Bt.test(e)};Nt.tokenize=function(t){for(var e=t.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),a=0;a<e.length-1;a++)!e[a+1]&&e[a+2]&&Lt.test(e[a])&&Lt.test(e[a+2])&&(e[a]+=e[a+2],e.splice(a+1,2),a--);return e};var Ot=new R;Ot.tokenize=function(t){var e=[],a=t.split(/(\n|\r\n)/);a[a.length-1]||a.pop();for(var n=0;n<a.length;n++){var r=a[n];n%2&&!this.options.newlineIsToken?e[e.length-1]+=r:(this.options.ignoreWhitespace&&(r=r.trim()),e.push(r))}return e};var ir=new R;ir.tokenize=function(t){return t.split(/(\S.+?[.!?])(?=\s+|$)/)};var lr=new R;lr.tokenize=function(t){return t.split(/([{}:;,]|\s+)/)};function xe(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?xe=function(e){return typeof e}:xe=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},xe(t)}var cr=Object.prototype.toString,te=new R;te.useLongestToken=!0;te.tokenize=Ot.tokenize;te.castInput=function(t){var e=this.options,a=e.undefinedReplacement,n=e.stringifyReplacer,r=n===void 0?function(o,s){return typeof s>"u"?a:s}:n;return typeof t=="string"?t:JSON.stringify(Ne(t,null,null,r),r,"  ")};te.equals=function(t,e){return R.prototype.equals.call(te,t.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"))};function Ne(t,e,a,n,r){e=e||[],a=a||[],n&&(t=n(r,t));var o;for(o=0;o<e.length;o+=1)if(e[o]===t)return a[o];var s;if(cr.call(t)==="[object Array]"){for(e.push(t),s=new Array(t.length),a.push(s),o=0;o<t.length;o+=1)s[o]=Ne(t[o],e,a,n,r);return e.pop(),a.pop(),s}if(t&&t.toJSON&&(t=t.toJSON()),xe(t)==="object"&&t!==null){e.push(t),s={},a.push(s);var l=[],c;for(c in t)t.hasOwnProperty(c)&&l.push(c);for(l.sort(),o=0;o<l.length;o+=1)c=l[o],s[c]=Ne(t[c],e,a,n,c);e.pop(),a.pop()}else s=t;return s}var Oe=new R;Oe.tokenize=function(t){return t.slice()};Oe.join=Oe.removeEmpty=function(t){return t};var T=class{constructor(){this._dataLength=0,this._bufferLength=0,this._state=new Int32Array(4),this._buffer=new ArrayBuffer(68),this._buffer8=new Uint8Array(this._buffer,0,68),this._buffer32=new Uint32Array(this._buffer,0,17),this.start()}static hashStr(e,a=!1){return this.onePassHasher.start().appendStr(e).end(a)}static hashAsciiStr(e,a=!1){return this.onePassHasher.start().appendAsciiStr(e).end(a)}static _hex(e){let a=T.hexChars,n=T.hexOut,r,o,s,l;for(l=0;l<4;l+=1)for(o=l*8,r=e[l],s=0;s<8;s+=2)n[o+1+s]=a.charAt(r&15),r>>>=4,n[o+0+s]=a.charAt(r&15),r>>>=4;return n.join("")}static _md5cycle(e,a){let n=e[0],r=e[1],o=e[2],s=e[3];n+=(r&o|~r&s)+a[0]-680876936|0,n=(n<<7|n>>>25)+r|0,s+=(n&r|~n&o)+a[1]-389564586|0,s=(s<<12|s>>>20)+n|0,o+=(s&n|~s&r)+a[2]+606105819|0,o=(o<<17|o>>>15)+s|0,r+=(o&s|~o&n)+a[3]-1044525330|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&s)+a[4]-176418897|0,n=(n<<7|n>>>25)+r|0,s+=(n&r|~n&o)+a[5]+1200080426|0,s=(s<<12|s>>>20)+n|0,o+=(s&n|~s&r)+a[6]-1473231341|0,o=(o<<17|o>>>15)+s|0,r+=(o&s|~o&n)+a[7]-45705983|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&s)+a[8]+1770035416|0,n=(n<<7|n>>>25)+r|0,s+=(n&r|~n&o)+a[9]-1958414417|0,s=(s<<12|s>>>20)+n|0,o+=(s&n|~s&r)+a[10]-42063|0,o=(o<<17|o>>>15)+s|0,r+=(o&s|~o&n)+a[11]-1990404162|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&s)+a[12]+1804603682|0,n=(n<<7|n>>>25)+r|0,s+=(n&r|~n&o)+a[13]-40341101|0,s=(s<<12|s>>>20)+n|0,o+=(s&n|~s&r)+a[14]-1502002290|0,o=(o<<17|o>>>15)+s|0,r+=(o&s|~o&n)+a[15]+1236535329|0,r=(r<<22|r>>>10)+o|0,n+=(r&s|o&~s)+a[1]-165796510|0,n=(n<<5|n>>>27)+r|0,s+=(n&o|r&~o)+a[6]-1069501632|0,s=(s<<9|s>>>23)+n|0,o+=(s&r|n&~r)+a[11]+643717713|0,o=(o<<14|o>>>18)+s|0,r+=(o&n|s&~n)+a[0]-373897302|0,r=(r<<20|r>>>12)+o|0,n+=(r&s|o&~s)+a[5]-701558691|0,n=(n<<5|n>>>27)+r|0,s+=(n&o|r&~o)+a[10]+38016083|0,s=(s<<9|s>>>23)+n|0,o+=(s&r|n&~r)+a[15]-660478335|0,o=(o<<14|o>>>18)+s|0,r+=(o&n|s&~n)+a[4]-405537848|0,r=(r<<20|r>>>12)+o|0,n+=(r&s|o&~s)+a[9]+568446438|0,n=(n<<5|n>>>27)+r|0,s+=(n&o|r&~o)+a[14]-1019803690|0,s=(s<<9|s>>>23)+n|0,o+=(s&r|n&~r)+a[3]-187363961|0,o=(o<<14|o>>>18)+s|0,r+=(o&n|s&~n)+a[8]+1163531501|0,r=(r<<20|r>>>12)+o|0,n+=(r&s|o&~s)+a[13]-1444681467|0,n=(n<<5|n>>>27)+r|0,s+=(n&o|r&~o)+a[2]-51403784|0,s=(s<<9|s>>>23)+n|0,o+=(s&r|n&~r)+a[7]+1735328473|0,o=(o<<14|o>>>18)+s|0,r+=(o&n|s&~n)+a[12]-1926607734|0,r=(r<<20|r>>>12)+o|0,n+=(r^o^s)+a[5]-378558|0,n=(n<<4|n>>>28)+r|0,s+=(n^r^o)+a[8]-2022574463|0,s=(s<<11|s>>>21)+n|0,o+=(s^n^r)+a[11]+1839030562|0,o=(o<<16|o>>>16)+s|0,r+=(o^s^n)+a[14]-35309556|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^s)+a[1]-1530992060|0,n=(n<<4|n>>>28)+r|0,s+=(n^r^o)+a[4]+1272893353|0,s=(s<<11|s>>>21)+n|0,o+=(s^n^r)+a[7]-155497632|0,o=(o<<16|o>>>16)+s|0,r+=(o^s^n)+a[10]-1094730640|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^s)+a[13]+681279174|0,n=(n<<4|n>>>28)+r|0,s+=(n^r^o)+a[0]-358537222|0,s=(s<<11|s>>>21)+n|0,o+=(s^n^r)+a[3]-722521979|0,o=(o<<16|o>>>16)+s|0,r+=(o^s^n)+a[6]+76029189|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^s)+a[9]-640364487|0,n=(n<<4|n>>>28)+r|0,s+=(n^r^o)+a[12]-421815835|0,s=(s<<11|s>>>21)+n|0,o+=(s^n^r)+a[15]+530742520|0,o=(o<<16|o>>>16)+s|0,r+=(o^s^n)+a[2]-995338651|0,r=(r<<23|r>>>9)+o|0,n+=(o^(r|~s))+a[0]-198630844|0,n=(n<<6|n>>>26)+r|0,s+=(r^(n|~o))+a[7]+1126891415|0,s=(s<<10|s>>>22)+n|0,o+=(n^(s|~r))+a[14]-1416354905|0,o=(o<<15|o>>>17)+s|0,r+=(s^(o|~n))+a[5]-57434055|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~s))+a[12]+1700485571|0,n=(n<<6|n>>>26)+r|0,s+=(r^(n|~o))+a[3]-1894986606|0,s=(s<<10|s>>>22)+n|0,o+=(n^(s|~r))+a[10]-1051523|0,o=(o<<15|o>>>17)+s|0,r+=(s^(o|~n))+a[1]-2054922799|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~s))+a[8]+1873313359|0,n=(n<<6|n>>>26)+r|0,s+=(r^(n|~o))+a[15]-30611744|0,s=(s<<10|s>>>22)+n|0,o+=(n^(s|~r))+a[6]-1560198380|0,o=(o<<15|o>>>17)+s|0,r+=(s^(o|~n))+a[13]+1309151649|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~s))+a[4]-145523070|0,n=(n<<6|n>>>26)+r|0,s+=(r^(n|~o))+a[11]-1120210379|0,s=(s<<10|s>>>22)+n|0,o+=(n^(s|~r))+a[2]+718787259|0,o=(o<<15|o>>>17)+s|0,r+=(s^(o|~n))+a[9]-343485551|0,r=(r<<21|r>>>11)+o|0,e[0]=n+e[0]|0,e[1]=r+e[1]|0,e[2]=o+e[2]|0,e[3]=s+e[3]|0}start(){return this._dataLength=0,this._bufferLength=0,this._state.set(T.stateIdentity),this}appendStr(e){let a=this._buffer8,n=this._buffer32,r=this._bufferLength,o,s;for(s=0;s<e.length;s+=1){if(o=e.charCodeAt(s),o<128)a[r++]=o;else if(o<2048)a[r++]=(o>>>6)+192,a[r++]=o&63|128;else if(o<55296||o>56319)a[r++]=(o>>>12)+224,a[r++]=o>>>6&63|128,a[r++]=o&63|128;else{if(o=(o-55296)*1024+(e.charCodeAt(++s)-56320)+65536,o>1114111)throw new Error("Unicode standard supports code points up to U+10FFFF");a[r++]=(o>>>18)+240,a[r++]=o>>>12&63|128,a[r++]=o>>>6&63|128,a[r++]=o&63|128}r>=64&&(this._dataLength+=64,T._md5cycle(this._state,n),r-=64,n[0]=n[16])}return this._bufferLength=r,this}appendAsciiStr(e){let a=this._buffer8,n=this._buffer32,r=this._bufferLength,o,s=0;for(;;){for(o=Math.min(e.length-s,64-r);o--;)a[r++]=e.charCodeAt(s++);if(r<64)break;this._dataLength+=64,T._md5cycle(this._state,n),r=0}return this._bufferLength=r,this}appendByteArray(e){let a=this._buffer8,n=this._buffer32,r=this._bufferLength,o,s=0;for(;;){for(o=Math.min(e.length-s,64-r);o--;)a[r++]=e[s++];if(r<64)break;this._dataLength+=64,T._md5cycle(this._state,n),r=0}return this._bufferLength=r,this}getState(){let e=this._state;return{buffer:String.fromCharCode.apply(null,Array.from(this._buffer8)),buflen:this._bufferLength,length:this._dataLength,state:[e[0],e[1],e[2],e[3]]}}setState(e){let a=e.buffer,n=e.state,r=this._state,o;for(this._dataLength=e.length,this._bufferLength=e.buflen,r[0]=n[0],r[1]=n[1],r[2]=n[2],r[3]=n[3],o=0;o<a.length;o+=1)this._buffer8[o]=a.charCodeAt(o)}end(e=!1){let a=this._bufferLength,n=this._buffer8,r=this._buffer32,o=(a>>2)+1;this._dataLength+=a;let s=this._dataLength*8;if(n[a]=128,n[a+1]=n[a+2]=n[a+3]=0,r.set(T.buffer32Identity.subarray(o),o),a>55&&(T._md5cycle(this._state,r),r.set(T.buffer32Identity)),s<=4294967295)r[14]=s;else{let l=s.toString(16).match(/(.*?)(.{0,8})$/);if(l===null)return;let c=parseInt(l[2],16),u=parseInt(l[1],16)||0;r[14]=c,r[15]=u}return T._md5cycle(this._state,r),e?this._state:T._hex(this._state)}};T.stateIdentity=new Int32Array([1732584193,-271733879,-1732584194,271733878]);T.buffer32Identity=new Int32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);T.hexChars="0123456789abcdef";T.hexOut=[];T.onePassHasher=new T;if(T.hashStr("hello")!=="5d41402abc4b2a76b9719d911017c592")throw new Error("Md5 self test failed.");function Z(t,e=[]){return()=>new Promise((a,n)=>{e.push(a,n),t(...e)})}async function dr(t,e,a=()=>{},n=()=>{}){try{if(!t)return n(),!1;chrome.storage.local.set({[t]:e},function(r){let o=chrome.runtime.lastError;o&&n(JSON.stringify(o)),a(r)})}catch(r){n(r)}}async function fr(t,e=()=>{},a=()=>{}){try{if(!t)return a(),!1;chrome.storage.local.set(t,function(n){e(t)})}catch(n){a(n)}}async function mr(t,e=null,a=()=>{},n=()=>{}){try{if(!t)return n(),!1;chrome.storage.local.get({[t]:null},function(r){r[t]?a(r[t]):a(e)})}catch(r){n(r)}}async function pr(t,e=()=>{},a=()=>{}){try{if(!t)return a(),!1;chrome.storage.local.get(t,function(n){e(n)})}catch(n){a(n)}}async function gr(t,e=()=>{},a=()=>{}){try{if(!t)return a(),!1;chrome.storage.local.remove(t,function(n){e(n)})}catch(n){a(n)}}async function hr(t=()=>{},e=()=>{}){try{chrome.storage.local.clear(function(a){t(a)})}catch(a){e(a)}}var br={get:async function(t,e=null){return await Z(mr,[t,e])()},get_objects:async function(t){return await Z(pr,[t])()},set:async function(t,e){return await Z(dr,[t,e])()},set_objects:async function(t){return await Z(fr,[t])()},remove:async function(t){return await Z(gr,[t])()},clear:async function(){return await Z(hr)()}},W=br;var Dt=ke(Ce());var Y={};ta(Y,{Signin:()=>Gr,Signup:()=>Vr,already_have_account:()=>Qr,batchProcessingHistory:()=>jo,"check-remaining-dialogues":()=>Wo,choose_language:()=>Sr,"click-upload":()=>Oo,click_to_upload:()=>po,completed:()=>ko,completed_task:()=>Ur,confirmpassword:()=>Xr,create_free_account:()=>fo,current_date_placeholder_tip:()=>Er,decomposing_task:()=>qr,default:()=>Ro,default_prompt:()=>xr,discord_button_tip:()=>Fr,donot_have_account:()=>mo,download:()=>Ar,email:()=>Kr,failed:()=>zo,fileSizeLimitExceeded:()=>Io,filelargetip:()=>qo,forgot:()=>Zr,github_button_tip:()=>Dr,gotit:()=>ho,inProgress:()=>Mo,language:()=>yr,login:()=>lo,name:()=>Yr,name_placeholder:()=>Br,new_prompt:()=>Lr,next:()=>Po,ongoing:()=>So,overrideConfirmation:()=>Co,page_command_description:()=>Mr,password:()=>Jr,pause:()=>_r,pending:()=>To,positonprompt:()=>wo,previous_task:()=>Rr,privacypolicy:()=>ro,process_the_first_task:()=>Hr,promptName:()=>bo,query:()=>Tr,query_placeholder_tip:()=>Or,reg_tip:()=>io,reg_tipbefore:()=>ao,reset_password:()=>to,save:()=>jr,search:()=>Lo,searchFiles:()=>Bo,selectedLanguageMessage:()=>so,sign_in_transmate:()=>co,signinwithemail:()=>vo,signupwithemail:()=>_o,site_command_description:()=>Cr,start:()=>vr,support_me:()=>Ir,support_this_project:()=>Pr,supportedfiletype:()=>Ho,taskhasnoprompt:()=>Eo,terms:()=>no,textarea_placeholder:()=>kr,tip:()=>oo,tipNo:()=>Do,tipYes:()=>Fo,tour_des:()=>yo,translate_to:()=>wr,"ts-upload":()=>No,twitter_button_tip:()=>Wr,typeall:()=>Ao,verify_email:()=>uo,verifycode:()=>eo,"waiting-model-response":()=>$r,web_results_placeholder_tip:()=>Nr,welcome:()=>go,you_can_use_duckduckgo_bangs:()=>zr,yourPromptContent:()=>xo});var xr={en:`Web search results:

{web_results}
Current date: {current_date}

Instructions: Using the provided web search results, write a comprehensive reply to the given query. Make sure to cite results using [[number](URL)] notation after the reference. If the provided search results refer to multiple subjects with the same name, write separate answers for each subject.
Query: {query}`},yr={en:"Language",pt:"Idioma",es:"Idioma",fr:"Langue",de:"Sprache",it:"Lingua",zh:"\u8BED\u8A00","zh-TW":"\u8A9E\u8A00",ja:"\u8A00\u8A9E",ko:"\uC5B8\uC5B4",he:"\u05E9\u05E4\u05D4",ru:"\u044F\u0437\u044B\u043A",pl:"J\u0119zyk"},wr={en:"Translate To",pt:"traduzir para",es:"traducir a",fr:"traduire en",de:"\xFCbersetzen auf",it:"tradurre in",zh:"\u7FFB\u8BD1\u6210","zh-TW":"\u7FFB\u8B6F\u505A",ja:"\u301C\u306B\u7FFB\u8A33\u3059\u308B",ko:"\u301C\uB85C \uBC88\uC5ED\uD558\uB2E4",he:"\u05DC\u05EA\u05E8\u05D2\u05DD \u05DC",ru:"\u043F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u043D\u0430",pl:"przet\u0142umaczy\u0107 na"},vr={en:"Start",pt:"come\xE7ar",es:"empezar",fr:"d\xE9marrer",de:"starten",it:"avviare",zh:"\u5F00\u59CB","zh-TW":"\u958B\u59CB",ja:"\u958B\u59CB\u3059\u308B",ko:"\uC2DC\uC791\uD558\uB2E4",he:"\u05D4\u05EA\u05D7\u05DC",ru:"\u043D\u0430\u0447\u0430\u0442\u044C",pl:"rozpocz\u0105\u0107"},_r={en:"Pause",pt:"pausar",es:"pausar",fr:"pause",de:"pausieren",it:"pausa",zh:"\u6682\u505C","zh-TW":"\u66AB\u505C",ja:"\u4E00\u6642\u505C\u6B62",ko:"\uC77C\uC2DC \uC815\uC9C0",he:"\u05D4\u05E9\u05D4\u05D9\u05D9\u05D4",ru:"\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",pl:"pauzowa\u0107"},Ar={en:"Download",pt:"baixar",es:"descargar",fr:"t\xE9l\xE9charger",de:"herunterladen",it:"scaricare",zh:"\u4E0B\u8F7D","zh-TW":"\u4E0B\u8F09",ja:"\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3059\u308B",ko:"\uB2E4\uC6B4\uB85C\uB4DC\uD558\uB2E4",he:"\u05D4\u05D5\u05E8\u05D3\u05D4",ru:"\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",pl:"pobiera\u0107"},Tr={en:"query",pt:"consulta",es:"consulta",fr:"requ\xEAte",de:"Abfrage",it:"interrogazione",zh:"\u67E5\u8BE2","zh-TW":"\u67E5\u8A62",ja:"\u30AF\u30A8\u30EA",ko:"\uCFFC\uB9AC",he:"\u05E9\u05D0\u05D9\u05DC\u05EA\u05D4",ru:"\u0437\u0430\u043F\u0440\u043E\u0441",pl:"zapytanie"},Sr={en:"Choose language",pt:"Escolha o idioma",es:"Elegir idioma",fr:"Choisir la langue",de:"Sprache ausw\xE4hlen",it:"Scegli la lingua",zh:"\u9009\u62E9\u8BED\u8A00","zh-TW":"\u9078\u64C7\u8A9E\u8A00",ja:"\u8A00\u8A9E\u3092\u9078\u629E",ko:"\uC5B8\uC5B4 \uC120\uD0DD",he:"\u05D1\u05D7\u05E8 \u05E9\u05E4\u05D4",ru:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u044F\u0437\u044B\u043A",pl:"Wybierz j\u0119zyk"},kr={en:"Press / to open the commands menu",pt:"Pressione / para abrir o menu de comandos",es:"Presione / para abrir el men\xFA de comandos",fr:"Appuyez sur / pour ouvrir le menu des commandes",de:"Dr\xFCcken Sie /, um das Befehlsmen\xFC zu \xF6ffnen",it:"Premi / per aprire il menu dei comandi",zh:"\u6309 / \u6253\u5F00\u547D\u4EE4\u83DC\u5355","zh-TW":"\u6309 / \u6253\u958B\u547D\u4EE4\u83DC\u55AE",ja:"/ \u3092\u62BC\u3057\u3066\u30B3\u30DE\u30F3\u30C9 \u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304D\u307E\u3059",ko:"/\uB97C \uB20C\uB7EC \uBA85\uB839 \uBA54\uB274\uB97C \uC5FD\uB2C8\uB2E4.",he:"\u05DC\u05D7\u05E5 \u05E2\u05DC / \u05DB\u05D3\u05D9 \u05DC\u05E4\u05EA\u05D5\u05D7 \u05D0\u05EA \u05EA\u05E4\u05E8\u05D9\u05D8 \u05D4\u05E4\u05E7\u05D5\u05D3\u05D5\u05EA",ru:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 / \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E \u043A\u043E\u043C\u0430\u043D\u0434"},zr={en:"You can use DuckDuckGo bangs to search on other websites. Learn more:",pt:"Voc\xEA pode usar os bangs do DuckDuckGo para pesquisar em outros sites. Saiba mais:",es:"Puede usar los bangs de DuckDuckGo para buscar en otros sitios. Obtenga m\xE1s informaci\xF3n:",fr:"Vous pouvez utiliser les bangs DuckDuckGo pour rechercher sur d'autres sites. En savoir plus:",de:"Sie k\xF6nnen DuckDuckGo-Bangs verwenden, um auf anderen Websites zu suchen. Erfahren Sie mehr:",it:"Puoi usare i DuckDuckGo bang per cercare su altri siti web. Ulteriori informazioni:",zh:"\u60A8\u53EF\u4EE5\u4F7F\u7528 DuckDuckGo bang \u5728\u5176\u4ED6\u7F51\u7AD9\u4E0A\u641C\u7D22\u3002\u4E86\u89E3\u66F4\u591A\uFF1A","zh-TW":"\u60A8\u53EF\u4EE5\u4F7F\u7528 DuckDuckGo bang \u5728\u5176\u4ED6\u7DB2\u7AD9\u4E0A\u641C\u5C0B\u3002\u4E86\u89E3\u66F4\u591A\uFF1A",ja:"DuckDuckGo bang\u3092\u4F7F\u7528\u3057\u3066\u4ED6\u306EWeb\u30B5\u30A4\u30C8\u3067\u691C\u7D22\u3067\u304D\u307E\u3059\u3002\u8A73\u7D30\u306F\u6B21\u3092\u53C2\u7167\u3057\u3066\u304F\u3060\u3055\u3044:",ko:"DuckDuckGo bang\uC744 \uC0AC\uC6A9\uD558\uC5EC \uB2E4\uB978 \uC6F9\uC0AC\uC774\uD2B8\uC5D0\uC11C \uAC80\uC0C9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC790\uC138\uD55C \uB0B4\uC6A9:",he:"\u05D0\u05EA\u05D4 \u05D9\u05DB\u05D5\u05DC \u05DC\u05D4\u05E9\u05EA\u05DE\u05E9 \u05D1- DuckDuckGo bangs \u05DB\u05D3\u05D9 \u05DC\u05D7\u05E4\u05E9 \u05D1\u05D0\u05EA\u05E8\u05D9\u05DD \u05D0\u05D7\u05E8\u05D9\u05DD. \u05DC\u05DE\u05D3 \u05E2\u05D5\u05D3:",ru:"\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C DuckDuckGo bang \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430 \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445. \u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435:"},Cr={en:"Restrict search results to a specific website, e.g. /site:wikipedia.com",pt:"Restringir resultados de pesquisa a um website espec\xEDfico, por exemplo /site:wikipedia.com",es:"Restringir los resultados de b\xFAsqueda a un sitio web espec\xEDfico, por ejemplo /site:wikipedia.com",fr:"Restreindre les r\xE9sultats de recherche \xE0 un site Web sp\xE9cifique, par exemple /site:wikipedia.com",de:"Suchergebnisse auf eine bestimmte Website einschr\xE4nken, z. B. /site:wikipedia.com",it:"Limita i risultati della ricerca a un sito Web specifico, ad esempio /site:wikipedia.com",zh:"\u5C06\u641C\u7D22\u7ED3\u679C\u9650\u5236\u4E3A\u7279\u5B9A\u7F51\u7AD9\uFF0C\u4F8B\u5982 /site:wikipedia.com","zh-TW":"\u5C07\u641C\u5C0B\u7D50\u679C\u9650\u5236\u70BA\u7279\u5B9A\u7DB2\u7AD9\uFF0C\u4F8B\u5982 /site:wikipedia.com",ja:"\u7279\u5B9A\u306EWeb\u30B5\u30A4\u30C8\u306E\u691C\u7D22\u7D50\u679C\u3092\u5236\u9650\u3057\u307E\u3059\u3002\u4F8B: /site:wikipedia.com",ko:"\uAC80\uC0C9 \uACB0\uACFC\uB97C \uD2B9\uC815 \uC6F9\uC0AC\uC774\uD2B8\uB85C \uC81C\uD55C\uD569\uB2C8\uB2E4. \uC608: /site:wikipedia.com",he:"\u05D4\u05D2\u05D1\u05DC \u05D0\u05EA \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05D7\u05D9\u05E4\u05D5\u05E9 \u05DC\u05D0\u05EA\u05E8 \u05DE\u05E1\u05D5\u05D9\u05DD, \u05DC\u05DE\u05E9\u05DC /site:wikipedia.com",ru:"\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u043C \u0441\u0430\u0439\u0442\u043E\u043C, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, /site:wikipedia.com"},Mr={en:"Get the content of a specific page, e.g. /page:buymeacoffee.com/anzorq",pt:"Obter o conte\xFAdo de uma p\xE1gina espec\xEDfica, por exemplo /page:buymeacoffee.com/anzorq",es:"Obtener el contenido de una p\xE1gina espec\xEDfica, por ejemplo /page:buymeacoffee.com/anzorq",fr:"Obtenir le contenu d'une page sp\xE9cifique, par exemple /page:buymeacoffee.com/anzorq",de:"Den Inhalt einer bestimmten Seite erhalten, z. B. /page:buymeacoffee.com/anzorq",it:"Ottenere il contenuto di una pagina specifica, ad esempio, /page:buymeacoffee.com/anzorq",zh:"\u83B7\u53D6\u7279\u5B9A\u9875\u9762\u7684\u5185\u5BB9\uFF0C\u4F8B\u5982 /page:buymeacoffee.com/anzorq","zh-TW":"\u53D6\u5F97\u7279\u5B9A\u9801\u9762\u7684\u5167\u5BB9\uFF0C\u4F8B\u5982 /page:buymeacoffee.com/anzorq",ja:"\u7279\u5B9A\u306E\u30DA\u30FC\u30B8\u306E\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u53D6\u5F97\u3057\u307E\u3059\u3002\u4F8B: /page:buymeacoffee.com/anzorq",ko:"\uD2B9\uC815 \uD398\uC774\uC9C0\uC758 \uB0B4\uC6A9\uC744 \uAC00\uC838\uC635\uB2C8\uB2E4. \uC608: /page:buymeacoffee.com/anzorq",he:"\u05E7\u05D1\u05DC \u05D0\u05EA \u05EA\u05D5\u05DB\u05DF \u05D3\u05E3 \u05DE\u05E1\u05D5\u05D9\u05DD, \u05DC\u05DE\u05E9\u05DC /page:buymeacoffee.com/anzorq",ru:"\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, /page:buymeacoffee.com/anzorq"},Pr={en:"Support this project",pt:"Apoie este projeto",es:"Apoya este proyecto",fr:"Soutenez ce projet",de:"Unterst\xFCtzen Sie dieses Projekt",it:"Sostieni questo progetto",zh:"\u652F\u6301\u6B64\u9879\u76EE","zh-TW":"\u652F\u6301\u6B64\u5C08\u6848",ja:"\u3053\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u652F\u63F4",ko:"\uC774 \uD504\uB85C\uC81D\uD2B8 \uC9C0\uC6D0",he:"\u05DC\u05EA\u05E8\u05D5\u05DD \u05DC\u05E4\u05E8\u05D5\u05D9\u05D9\u05E7\u05D8",ru:"\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",pl:"Wesprzyj ten projekt"},Ir={en:"If you find this extension useful, please consider supporting me \u2935\uFE0F",pt:"Se voc\xEA achar \xFAtil esta extens\xE3o, por favor, considere apoiar-me \u2935\uFE0F",es:"Si encuentra \xFAtil esta extensi\xF3n, por favor considere apoyarme \u2935\uFE0F",fr:"Si vous trouvez cette extension utile, pensez \xE0 me soutenir \u2935\uFE0F",de:"Wenn Sie diese Erweiterung n\xFCtzlich finden, unterst\xFCtzen Sie mich bitte \u2935\uFE0F",it:"Se trovi questo estensione utile, considera di supportarmi \u2935\uFE0F",zh:"\u5982\u679C\u60A8\u89C9\u5F97\u8FD9\u4E2A\u6269\u5C55\u6709\u7528\uFF0C\u8BF7\u8003\u8651\u652F\u6301\u6211\u2935\uFE0F","zh-TW":"\u5982\u679C\u60A8\u89BA\u5F97\u9019\u500B\u64F4\u5145\u529F\u80FD\u6709\u7528\uFF0C\u8ACB\u8003\u616E\u652F\u6301\u6211\u2935\uFE0F",ja:"\u3053\u306E\u62E1\u5F35\u6A5F\u80FD\u304C\u5F79\u7ACB\u3064\u3068\u601D\u308F\u308C\u308B\u5834\u5408\u306F\u3001\u79C1\u3092\u30B5\u30DD\u30FC\u30C8\u3059\u308B\u3053\u3068\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044 \u2935\uFE0F",ko:"\uC774 \uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC720\uC6A9\uD558\uB2E4\uACE0 \uC0DD\uAC01\uB418\uBA74 \uC800\uB97C \uC9C0\uC6D0\uD574 \uC8FC\uC138\uC694 \u2935\uFE0F",he:"\u05D0\u05DD \u05D0\u05EA\u05D4 \u05DE\u05E6\u05D0\u05EA \u05D0\u05EA \u05D4\u05EA\u05D5\u05E1\u05E3 \u05E9\u05D9\u05DE\u05D5\u05E9\u05D9, \u05D0\u05E0\u05D0 \u05E9\u05E7\u05D5\u05DC \u05DC\u05EA\u05DE\u05D5\u05DA \u05D1\u05D9 \u2935\uFE0F",ru:"\u0415\u0441\u043B\u0438 \u0432\u0430\u043C \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u044D\u0442\u043E \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u043C\u0435\u043D\u044F \u2935\uFE0F",pl:"Je\u015Bli uwa\u017Casz to rozszerzenie za przydatne, rozwa\u017C prosz\u0119 wsparcie mnie \u2935\uFE0F"},jr={en:"Save",pt:"Salvar",es:"Guardar",fr:"Enregistrer",de:"Speichern",it:"Salva",zh:"\u4FDD\u5B58","zh-TW":"\u5132\u5B58",ja:"\u4FDD\u5B58",ko:"\uC800\uC7A5",he:"\u05E9\u05DE\u05D5\u05E8",ru:"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",pl:"Zapisz"},Lr={en:"New prompt",pt:"Novo prompt",es:"Nuevo prompt",fr:"Nouveau prompt",de:"Neues Prompt",it:"Nuovo prompt",zh:"\u65B0\u63D0\u793A","zh-TW":"\u65B0\u63D0\u793A",ja:"\u65B0\u3057\u3044\u30D7\u30ED\u30F3\u30D7\u30C8",ko:"\uC0C8\uB85C\uC6B4 \uD504\uB86C\uD504\uD2B8",he:"\u05D1\u05E7\u05E9\u05D4 \u05D7\u05D3\u05E9\u05D4",ru:"\u041D\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441",pl:"Nowe zapytanie"},Br={en:"Name",pt:"Nome",es:"Nombre",fr:"Nom",de:"Name",it:"Nome",zh:"\u540D\u79F0","zh-TW":"\u540D\u7A31",ja:"\u540D\u524D",ko:"\uC774\uB984",he:"\u05E9\u05DD",ru:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",pl:"Nazwa"},Er={en:"Insert placeholder for the current date (optional)",pt:"Insira o espa\xE7o reservado para a data atual (opcional)",es:"Ingrese un marcador de posici\xF3n para la fecha actual (opcional)",fr:"Ins\xE9rer un marqueur de place pour la date actuelle (facultatif)",de:"Platzhalter f\xFCr das aktuelle Datum einf\xFCgen (optional)",it:"Inserisci il segnaposto per la data attuale (opzionale)",zh:"\u63D2\u5165\u5F53\u524D\u65E5\u671F\u7684\u5360\u4F4D\u7B26\uFF08\u53EF\u9009\uFF09","zh-TW":"\u63D2\u5165\u76EE\u524D\u65E5\u671F\u7684\u4F54\u4F4D\u7B26\uFF08\u9078\u586B\uFF09",ja:"\u73FE\u5728\u306E\u65E5\u4ED8\u306E\u30D7\u30EC\u30FC\u30B9\u30DB\u30EB\u30C0\u30FC\u3092\u633F\u5165\uFF08\u4EFB\u610F\uFF09",ko:"\uD604\uC7AC \uB0A0\uC9DC\uC758 \uC790\uB9AC \uD45C\uC2DC\uC790\uB97C \uC0BD\uC785 (\uC120\uD0DD \uC0AC\uD56D)",he:"\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E6\u05D9\u05D9\u05DF \u05DE\u05D9\u05E7\u05D5\u05DD \u05E2\u05D1\u05D5\u05E8 \u05D4\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9 (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)",ru:"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0434\u0430\u0442\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",pl:"Wstaw znacznik dla bie\u017C\u0105cej daty (opcjonalne)"},Nr={en:"Insert placeholder for the web results (required)",pt:"Insira o espa\xE7o reservado para os resultados da pesquisa na web (obrigat\xF3rio)",es:"Ingrese un marcador de posici\xF3n para los resultados de b\xFAsqueda web (requerido)",fr:"Ins\xE9rer un marqueur de place pour les r\xE9sultats de recherche web (requis)",de:"Platzhalter f\xFCr die Web-Ergebnisse einf\xFCgen (erforderlich)",it:"Inserisci il segnaposto per i risultati web (richiesto)",zh:"\u63D2\u5165\u7F51\u7EDC\u641C\u7D22\u7ED3\u679C\u7684\u5360\u4F4D\u7B26\uFF08\u5FC5\u9700\uFF09","zh-TW":"\u63D2\u5165\u7DB2\u8DEF\u641C\u5C0B\u7D50\u679C\u7684\u4F54\u4F4D\u7B26\uFF08\u5FC5\u586B\uFF09",ja:"Web\u7D50\u679C\u306E\u30D7\u30EC\u30FC\u30B9\u30DB\u30EB\u30C0\u30FC\u3092\u633F\u5165\uFF08\u5FC5\u9808\uFF09",ko:"\uC6F9 \uAC80\uC0C9 \uACB0\uACFC\uC758 \uC790\uB9AC \uD45C\uC2DC\uC790\uB97C \uC0BD\uC785 (\uD544\uC218)",he:"\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E6\u05D9\u05D9\u05DF \u05DE\u05D9\u05E7\u05D5\u05DD \u05E2\u05D1\u05D5\u05E8 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D4\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 (\u05D7\u05D5\u05D1\u05D4)",ru:"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440 \u0432\u0435\u0431-\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 (\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",pl:"Wstaw znacznik dla wynik\xF3w wyszukiwania w sieci (wymagane)"},Or={en:"Insert placeholder for the initial query (required)",pt:"Insira o espa\xE7o reservado para a pergunta inicial (obrigat\xF3rio)",es:"Ingrese un marcador de posici\xF3n para la consulta inicial (requerido)",fr:"Ins\xE9rer un marqueur de place pour la requ\xEAte initiale (requis)",de:"Platzhalter f\xFCr die urspr\xFCngliche Anfrage einf\xFCgen (erforderlich)",it:"Inserisci il segnaposto per la query iniziale (richiesto)",zh:"\u63D2\u5165\u521D\u59CB\u67E5\u8BE2\u7684\u5360\u4F4D\u7B26\uFF08\u5FC5\u9700\uFF09","zh-TW":"\u63D2\u5165\u521D\u59CB\u67E5\u8A62\u7684\u4F54\u4F4D\u7B26\uFF08\u5FC5\u586B\uFF09",ja:"\u521D\u671F\u30AF\u30A8\u30EA\u306E\u30D7\u30EC\u30FC\u30B9\u30DB\u30EB\u30C0\u30FC\u3092\u633F\u5165\uFF08\u5FC5\u9808\uFF09",ko:"\uCD08\uAE30 \uCFFC\uB9AC\uC758 \uC790\uB9AC \uD45C\uC2DC\uC790\uB97C \uC0BD\uC785 (\uD544\uC218)",he:"\u05D4\u05D5\u05E1\u05E3 \u05DE\u05E6\u05D9\u05D9\u05DF \u05DE\u05D9\u05E7\u05D5\u05DD \u05E2\u05D1\u05D5\u05E8 \u05D4\u05E9\u05D0\u05D9\u05DC\u05EA\u05D4 \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D9\u05EA (\u05D7\u05D5\u05D1\u05D4)",ru:"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",pl:"Wstaw znacznik dla pocz\u0105tkowego zapytania (wymagane)"},Wr={en:"Follow me on Twitter",pt:"Siga-me no Twitter",es:"S\xEDgueme en Twitter",fr:"Me suivre sur Twitter",de:"Folgen Sie mir auf Twitter",it:"Seguimi su Twitter",zh:"\u5728 Twitter \u4E0A\u5173\u6CE8\u6211","zh-TW":"\u5728 Twitter \u4E0A\u8DDF\u96A8\u6211",ja:"Twitter\u3067\u79C1\u3092\u30D5\u30A9\u30ED\u30FC",ko:"Twitter\uC5D0\uC11C \uB098\uB97C \uD314\uB85C\uC6B0\uD558\uC138\uC694",he:"\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9 \u05D1\u05D8\u05D5\u05D5\u05D9\u05D8\u05E8",ru:"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043C\u0435\u043D\u044F \u0432 Twitter",pl:"Obserwuj mnie na Twitterze"},Dr={en:"View the source code on GitHub",pt:"Veja o c\xF3digo fonte no GitHub",es:"Ver el c\xF3digo fuente en GitHub",fr:"Voir le code source sur GitHub",de:"Quellcode auf GitHub anzeigen",it:"Visualizza il codice sorgente su GitHub",zh:"\u5728 GitHub \u4E0A\u67E5\u770B\u6E90\u4EE3\u7801","zh-TW":"\u5728 GitHub \u4E0A\u67E5\u770B\u539F\u59CB\u78BC",ja:"GitHub\u4E0A\u306E\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u3092\u898B\u308B",ko:"GitHub\uC5D0\uC11C \uC18C\uC2A4 \uCF54\uB4DC \uBCF4\uAE30",he:"\u05E8\u05D0\u05D5 \u05D0\u05EA \u05D4\u05E7\u05D5\u05D3 \u05D1\u05D2\u05D9\u05D8\u05D4\u05D0\u05D1",ru:"\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043A\u043E\u0434 \u043D\u0430 GitHub",pl:"Zobacz kod \u017Ar\xF3d\u0142owy na GitHubie"},Fr={en:"Join our Discord community",pt:"Junte-se \xE0 nossa comunidade no Discord",es:"\xDAnete a nuestra comunidad de Discord",fr:"Rejoignez notre communaut\xE9 Discord",de:"Treten Sie unserer Discord-Community bei",it:"Unisciti alla nostra comunit\xE0 su Discord",zh:"\u52A0\u5165\u6211\u4EEC\u7684 Discord \u793E\u533A","zh-TW":"\u52A0\u5165\u6211\u5011\u7684 Discord \u793E\u7FA4",ja:"\u79C1\u305F\u3061\u306EDiscord\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u306B\u53C2\u52A0\u3057\u3066\u304F\u3060\u3055\u3044",ko:"\uC6B0\uB9AC\uC758 Discord \uCEE4\uBBA4\uB2C8\uD2F0\uC5D0 \uAC00\uC785\uD558\uC138\uC694",he:"\u05D1\u05D5\u05D0\u05D5 \u05DC\u05E7\u05D4\u05D9\u05DC\u05EA \u05D4\u05D3\u05D9\u05E1\u05E7\u05D5\u05E8\u05D3 \u05E9\u05DC\u05E0\u05D5",ru:"\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A \u043D\u0430\u0448\u0435\u043C\u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0443 \u043D\u0430 Discord",pl:"Do\u0142\u0105cz do naszej spo\u0142eczno\u015Bci na Discordzie"},qr={en:"Decomposing task...",pt:"Decomposi\xE7\xE3o de tarefas...",es:"Descomposici\xF3n de tareas...",fr:"D\xE9composition de t\xE2ches...",de:"Zerlegung von Aufgaben...",it:"Scomposizione di compiti...",zh:"\u4EFB\u52A1\u5206\u89E3...","zh-TW":"\u4EFB\u52D9\u5206\u89E3...",ja:"\u30BF\u30B9\u30AF\u5206\u89E3...",ko:"\uC791\uC5C5 \uBD84\uD574...",ru:"\u0420\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438...",pl:"Dekompozycja zadania..."},Hr={en:"Processing the first subtask...",pt:"Processando a primeira sub-tarefa...",es:"Procesando la primera sub-tarea...",fr:"Traitement de la premi\xE8re sous-t\xE2che...",de:"Verarbeitung der ersten Teilaufgabe...",it:"Elaborazione della prima sotto-attivit\xE0...",zh:"\u5904\u7406\u7B2C\u4E00\u4E2A\u5B50\u4EFB\u52A1...","zh-TW":"\u8655\u7406\u7B2C\u4E00\u500B\u5B50\u4EFB\u52D9...",ja:"\u6700\u521D\u306E\u30B5\u30D6\u30BF\u30B9\u30AF\u306E\u51E6\u7406...",ko:"\uCCAB \uBC88\uC9F8 \uD558\uC704 \uC791\uC5C5 \uCC98\uB9AC... ",ru:"\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0435\u0440\u0432\u043E\u0439 \u043F\u043E\u0434\u0437\u0430\u0434\u0430\u0447\u0438...",pl:"Przetwarzanie pierwszego podzadania..."},Rr={en:"The previous task has been completed, waiting for {time} to process the next subtask...",pt:"A tarefa anterior foi conclu\xEDda, aguardando {time} para processar a pr\xF3xima sub tarefa...",es:"La tarea anterior se ha completado, esperando {time} para procesar la siguiente subtarea...",fr:"La t\xE2che pr\xE9c\xE9dente a \xE9t\xE9 termin\xE9e, en attente de {time} pour traiter la prochaine sous-t\xE2che...",de:"Die vorherige Aufgabe wurde abgeschlossen. Warten auf {time}, um die n\xE4chste Teilaufgabe zu bearbeiten...",it:"Il compito precedente \xE8 stato completato, in attesa di {time} per elaborare la prossima sottoattivit\xE0...",zh:"\u4E0A\u4E00\u4E2A\u4EFB\u52A1\u5DF2\u7ECF\u5B8C\u6210\uFF0C\u7B49\u5F85 {time} \u5904\u7406\u4E0B\u4E00\u4E2A\u5B50\u4EFB\u52A1...","zh-TW":"\u4E0A\u4E00\u500B\u4EFB\u52D9\u5DF2\u7D93\u5B8C\u6210\uFF0C\u7B49\u5F85 {time} \u8655\u7406\u4E0B\u4E00\u500B\u5B50\u4EFB\u52D9...",ja:"\u524D\u306E\u30BF\u30B9\u30AF\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002\u6B21\u306E\u30B5\u30D6\u30BF\u30B9\u30AF\u3092\u51E6\u7406\u3059\u308B\u305F\u3081\u306B {time} \u5F85\u6A5F\u4E2D\u3067\u3059...",ko:"\uC774\uC804 \uC791\uC5C5\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C \uD558\uC704 \uC791\uC5C5\uC744 \uCC98\uB9AC\uD558\uAE30 \uC704\uD574 {time}\uAE4C\uC9C0 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4...",he:"\u05D4\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D4\u05E7\u05D5\u05D3\u05DE\u05EA \u05D4\u05D5\u05E9\u05DC\u05DE\u05D4, \u05DE\u05DE\u05EA\u05D9\u05DF \u05DC {time} \u05DB\u05D3\u05D9 \u05DC\u05E2\u05D1\u05D3 \u05D0\u05EA \u05D4\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D4\u05D1\u05D0\u05D4...",ru:"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 {time} \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u043E\u0434\u0437\u0430\u0434\u0430\u043D\u0438\u044F...",pl:"Poprzednie zadanie zosta\u0142o zako\u0144czone, czekam {time} na przetworzenie kolejnego podzadania..."},Ur={en:"All tasks have been completed, generating the target file...",pt:"Todas as tarefas foram conclu\xEDdas, gerando o arquivo de destino...",es:"Todas las tareas han sido completadas, generando el archivo de destino...",fr:"Toutes les t\xE2ches ont \xE9t\xE9 effectu\xE9es, g\xE9n\xE9rant le fichier cible...",de:"Alle Aufgaben wurden abgeschlossen, die Zieldatei wird generiert...",it:"Tutti i compiti sono stati completati, generando il file di destinazione...",zh:"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210\uFF0C\u6B63\u5728\u751F\u6210\u76EE\u6807\u6587\u4EF6","zh-TW":"\u6240\u6709\u4EFB\u52D9\u5DF2\u5B8C\u6210\uFF0C\u6B63\u5728\u751F\u6210\u76EE\u6A19\u6587\u4EF6...",ja:"\u3059\u3079\u3066\u306E\u30BF\u30B9\u30AF\u304C\u5B8C\u4E86\u3057\u3001\u30BF\u30FC\u30B2\u30C3\u30C8\u30D5\u30A1\u30A4\u30EB\u304C\u751F\u6210\u3055\u308C\u3066\u3044\u307E\u3059...",ko:"\uBAA8\uB4E0 \uC791\uC5C5\uC774 \uC644\uB8CC\uB418\uC5B4 \uB300\uC0C1 \uD30C\uC77C\uC774 \uC0DD\uC131\uB418\uACE0 \uC788\uC2B5\uB2C8\uB2E4...",ru:"\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B, \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u0444\u0430\u0439\u043B...",pl:"Wszystkie zadania zosta\u0142y wykonane, generuj\u0105c plik docelowy..."},$r={en:"Waiting for the Language Model's response...",pt:"Aguardando a resposta do Modelo de Linguagem...",es:"Esperando la respuesta del Modelo de Lenguaje...",fr:"En attente de la r\xE9ponse du mod\xE8le de langage...",de:"Warte auf die Antwort des Sprachmodells...",it:"In attesa della risposta del modello di linguaggio...",zh:"\u7B49\u5F85\u8BED\u8A00\u6A21\u578B\u7684\u56DE\u590D...","zh-TW":"\u7B49\u5F85\u8A9E\u8A00\u6A21\u578B\u7684\u56DE\u8986...",ja:"\u8A00\u8A9E\u30E2\u30C7\u30EB\u306E\u5FDC\u7B54\u3092\u5F85\u3063\u3066\u3044\u307E\u3059...",ko:"\uC5B8\uC5B4 \uBAA8\uB378\uC758 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4...",he:"\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC\u05EA\u05E9\u05D5\u05D1\u05D4 \u05DE\u05D4\u05D3\u05D2\u05DD \u05D4\u05E9\u05E4\u05EA\u05D9...",ru:"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 \u044F\u0437\u044B\u043A\u043E\u0432\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438...",pl:"Oczekiwanie na odpowied\u017A modelu j\u0119zykowego..."},Gr={en:"Sign in",pt:"Entrar",es:"Iniciar sesi\xF3n",fr:"Se connecter",de:"Anmelden",it:"Accedi",zh:"\u767B\u5F55","zh-TW":"\u767B\u9304",ja:"\u30B5\u30A4\u30F3\u30A4\u30F3",ko:"\uB85C\uADF8\uC778",he:"\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA",ru:"\u0412\u043E\u0439\u0442\u0438",pl:"Zaloguj si\u0119"},Vr={en:"Sign up",pt:"Inscreva-se",es:"Reg\xEDstrate",fr:"S'inscrire",de:"Registrieren",it:"Registrati",zh:"\u6CE8\u518C","zh-TW":"\u8A3B\u518A",ja:"\u30B5\u30A4\u30F3\u30A2\u30C3\u30D7",ko:"\uAC00\uC785\uD558\uAE30",he:"\u05D4\u05D9\u05E8\u05E9\u05DD",ru:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F",pl:"Zarejestruj si\u0119"},Kr={en:"Email",pt:"E-mail",es:"Correo electr\xF3nico",fr:"E-mail",de:"E-Mail",it:"Email",zh:"\u7535\u5B50\u90AE\u4EF6","zh-TW":"\u96FB\u5B50\u90F5\u4EF6",ja:"\u30E1\u30FC\u30EB",ko:"\uC774\uBA54\uC77C",he:"\u05D3\u05D5\u05D0\u05E8 \u05D0\u05DC\u05E7\u05D8\u05E8\u05D5\u05E0\u05D9",ru:"\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430",pl:"E-mail"},Jr={en:"Password",pt:"Senha",es:"Contrase\xF1a",fr:"Mot de passe",de:"Passwort",it:"Password",zh:"\u5BC6\u7801","zh-TW":"\u5BC6\u78BC",ja:"\u30D1\u30B9\u30EF\u30FC\u30C9",ko:"\uBE44\uBC00\uBC88\uD638",he:"\u05E1\u05D9\u05E1\u05DE\u05D4",ru:"\u041F\u0430\u0440\u043E\u043B\u044C",pl:"Has\u0142o"},Zr={en:"Forgot password",pt:"Esqueci minha senha",es:"Olvid\xE9 mi contrase\xF1a",fr:"Mot de passe oubli\xE9",de:"Passwort vergessen",it:"Password dimenticata",zh:"\u5FD8\u8BB0\u5BC6\u7801","zh-TW":"\u5FD8\u8A18\u5BC6\u78BC",ja:"\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5FD8\u308C\u305F",ko:"\uBE44\uBC00\uBC88\uD638\uB97C \uC78A\uC5B4\uBC84\uB838\uC2B5\uB2C8\uB2E4",he:"\u05E9\u05DB\u05D7\u05EA\u05D9 \u05D0\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D4",ru:"\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",pl:"Zapomnia\u0142em has\u0142a"},Yr={en:"Name (Optional)",pt:"Nome (opcional)",es:"Nombre (opcional)",fr:"Nom (optionnel)",de:"Name (optional)",it:"Nome (facoltativo)",zh:"\u59D3\u540D\uFF08\u9009\u586B\uFF09","zh-TW":"\u59D3\u540D\uFF08\u9078\u586B\uFF09",ja:"\u540D\u524D\uFF08\u4EFB\u610F\uFF09",ko:"\uC774\uB984 (\uC120\uD0DD \uC0AC\uD56D)",he:"\u05E9\u05DD (\u05D0\u05D5\u05E4\u05E6\u05D9\u05D5\u05E0\u05DC\u05D9)",ru:"\u0418\u043C\u044F (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",pl:"Imi\u0119 (opcjonalne)"},Xr={en:"Confirm Password",pt:"Confirmar senha",es:"Confirmar contrase\xF1a",fr:"Confirmer le mot de passe",de:"Passwort best\xE4tigen",it:"Conferma password",zh:"\u786E\u8BA4\u5BC6\u7801","zh-TW":"\u78BA\u8A8D\u5BC6\u78BC",ja:"\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u78BA\u8A8D\u3059\u308B",ko:"\uBE44\uBC00\uBC88\uD638 \uD655\uC778",he:"\u05D0\u05D9\u05E9\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D4",ru:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F",pl:"Potwierd\u017A has\u0142o"},Qr={en:"Already have an account?",pt:"J\xE1 tem uma conta?",es:"\xBFYa tienes una cuenta?",fr:"Vous avez d\xE9j\xE0 un compte?",de:"Sie haben bereits ein Konto?",it:"Hai gi\xE0 un account?",zh:"\u5DF2\u6709\u8D26\u53F7\uFF1F","zh-TW":"\u5DF2\u7D93\u6709\u5E33\u6236\u4E86\u55CE\uFF1F",ja:"\u3059\u3067\u306B\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u304A\u6301\u3061\u3067\u3059\u304B\uFF1F",ko:"\uC774\uBBF8 \uACC4\uC815\uC774 \uC788\uC2B5\uB2C8\uAE4C?",he:"\u05DB\u05D1\u05E8 \u05D9\u05E9 \u05DC\u05DA \u05D7\u05E9\u05D1\u05D5\u05DF?",ru:"\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?",pl:"Masz ju\u017C konto?"},eo={en:"Verification Code",pt:"C\xF3digo de verifica\xE7\xE3o",es:"C\xF3digo de verificaci\xF3n",fr:"Code de v\xE9rification",de:"Verifizierungscode",it:"Codice di verifica",zh:"\u9A8C\u8BC1\u7801","zh-TW":"\u9A57\u8B49\u78BC",ja:"\u8A8D\u8A3C\u30B3\u30FC\u30C9",ko:"\uC778\uC99D \uCF54\uB4DC",he:"\u05E7\u05D5\u05D3 \u05D0\u05D9\u05DE\u05D5\u05EA",ru:"\u041A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F",pl:"Kod weryfikacyjny"},to={en:"Reset Password",pt:"Redefinir senha",es:"Restablecer contrase\xF1a",fr:"R\xE9initialiser le mot de passe",de:"Passwort zur\xFCcksetzen",it:"Resetta password",zh:"\u91CD\u7F6E\u5BC6\u7801","zh-TW":"\u91CD\u8A2D\u5BC6\u78BC",ja:"\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u30EA\u30BB\u30C3\u30C8\u3059\u308B",ko:"\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815",he:"\u05D0\u05D9\u05E4\u05D5\u05E1 \u05E1\u05D9\u05E1\u05DE\u05D4",ru:"\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",pl:"Zresetuj has\u0142o"},ao={en:"By clicking 'Sign up' you acknowledge that you have read, understood, and agree to",pt:"Ao clicar em 'Registrar', voc\xEA reconhece que leu, entendeu e concorda com",es:"Al hacer clic en 'Registrarse', aceptas que has le\xEDdo, comprendido y aceptado",fr:"En cliquant sur 'S'inscrire', vous reconnaissez avoir lu, compris et accept\xE9",de:"Durch Anklicken von 'Registrieren' best\xE4tigen Sie, dass Sie gelesen haben, verstanden haben und einverstanden sind mit",it:"Cliccando su 'Registrati' riconosci di aver letto, capito e accettato",zh:"\u901A\u8FC7\u70B9\u51FB\u201C\u6CE8\u518C\u201D\u6309\u94AE\uFF0C\u5373\u8868\u793A\u60A8\u5DF2\u9605\u8BFB\u3001\u7406\u89E3\u5E76\u540C\u610F","zh-TW":"\u900F\u904E\u9EDE\u9078\u300C\u8A3B\u518A\u300D\u6309\u9215\uFF0C\u5373\u8868\u793A\u60A8\u5DF2\u95B1\u8B80\u3001\u7406\u89E3\u4E26\u540C\u610F",ja:"\u300C\u767B\u9332\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3053\u3068\u3067\u3001\u3042\u306A\u305F\u306F\u8AAD\u3093\u3067\u7406\u89E3\u3057\u3001\u540C\u610F\u3057\u305F\u3053\u3068\u306B\u306A\u308A\u307E\u3059\u3002",ko:"'\uAC00\uC785'\uC744 \uD074\uB9AD\uD568\uC73C\uB85C\uC368, \uB2F9\uC2E0\uC740 \uC77D\uC5C8\uC73C\uBA70 \uC774\uD574\uD558\uACE0 \uB3D9\uC758\uD588\uB2E4\uB294 \uAC83\uC744 \uC778\uC815\uD569\uB2C8\uB2E4.",he:"\u05E2\u05DC \u05D9\u05D3\u05D9 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC '\u05D4\u05E8\u05E9\u05DE\u05D4', \u05D0\u05EA\u05D4 \u05DE\u05DB\u05D9\u05E8 \u05DB\u05D9 \u05E7\u05E8\u05D0\u05EA, \u05D4\u05D1\u05E0\u05EA \u05D5\u05D4\u05E1\u05DB\u05DE\u05EA",ru:"\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443 '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F', \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u043B\u0438\u0441\u044C, \u043F\u043E\u043D\u044F\u043B\u0438 \u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u044B \u0441",pl:"Klikaj\u0105c przycisk \u201EZarejestruj si\u0119\u201D, potwierdzasz, \u017Ce przeczyta\u0142e\u015B, zrozumia\u0142e\u015B i zgadzasz si\u0119 z"},no={en:"Transmate's Terms",pt:"Termos da Transmate",es:"T\xE9rminos de Transmate",fr:"Conditions de Transmate",de:"Transmate's Bedingungen",it:"Termini di Transmate",zh:"Transmate \u7684\u6761\u6B3E","zh-TW":"Transmate \u7684\u689D\u6B3E",ja:"Transmate \u306E\u5229\u7528\u898F\u7D04",ko:"Transmate\uC758 \uC57D\uAD00",he:"\u05EA\u05E0\u05D0\u05D9 \u05D4\u05E9\u05D9\u05DE\u05D5\u05E9 \u05E9\u05DC Transmate",ru:"\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F Transmate",pl:"Warunki korzystania z Transmate"},ro={en:"Privacy Policy",pt:"Pol\xEDtica de Privacidade",es:"Pol\xEDtica de privacidad",fr:"Politique de confidentialit\xE9",de:"Datenschutzrichtlinie",it:"Informativa sulla privacy",zh:"\u9690\u79C1\u653F\u7B56","zh-TW":"\u96B1\u79C1\u653F\u7B56",ja:"\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC",ko:"\uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uC815\uCC45",he:"\u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05E4\u05E8\u05D8\u05D9\u05D5\u05EA",ru:"\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",pl:"Polityka prywatno\u015Bci"},oo={en:"Tip",pt:"Dica",es:"Consejo",fr:"Conseil",de:"Tipp",it:"Suggerimento",zh:"\u63D0\u793A","zh-TW":"\u63D0\u793A",ja:"\u30D2\u30F3\u30C8",ko:"\uD301",he:"\u05D8\u05D9\u05E4",ru:"\u0421\u043E\u0432\u0435\u0442",pl:"Wskaz\xF3wka"},so={en:"The selected language is the same as the main language of the file. Please confirm if you want to proceed.",pt:"O idioma selecionado \xE9 o mesmo que o idioma principal do arquivo. Confirme se deseja continuar.",es:"El idioma seleccionado es el mismo que el idioma principal del archivo. Por favor, confirme si desea continuar.",fr:"La langue s\xE9lectionn\xE9e est identique \xE0 la langue principale du fichier. Veuillez confirmer si vous souhaitez continuer.",de:"Die ausgew\xE4hlte Sprache entspricht der Hauptsprache der Datei. Bitte best\xE4tigen Sie, ob Sie fortfahren m\xF6chten.",it:"La lingua selezionata \xE8 la stessa della lingua principale del file. Conferma se desideri procedere.",zh:"\u6240\u9009\u62E9\u7684\u8BED\u8A00\u4E0E\u6587\u4EF6\u7684\u4E3B\u8BED\u8A00\u76F8\u540C\u3002\u8BF7\u786E\u8BA4\u662F\u5426\u7EE7\u7EED\u6267\u884C\u3002","zh-TW":"\u6240\u9078\u64C7\u7684\u8A9E\u8A00\u8207\u6A94\u6848\u7684\u4E3B\u8A9E\u8A00\u76F8\u540C\u3002\u8ACB\u78BA\u8A8D\u662F\u5426\u7E7C\u7E8C\u57F7\u884C\u3002",ja:"\u9078\u629E\u3057\u305F\u8A00\u8A9E\u306F\u30D5\u30A1\u30A4\u30EB\u306E\u4E3B\u8981\u8A00\u8A9E\u3068\u540C\u3058\u3067\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\u3001\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uC120\uD0DD\uD55C \uC5B8\uC5B4\uB294 \uD30C\uC77C\uC758 \uAE30\uBCF8 \uC5B8\uC5B4\uC640 \uB3D9\uC77C\uD569\uB2C8\uB2E4. \uACC4\uC18D \uC9C4\uD589\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",he:"\u05D4\u05E9\u05E4\u05D4 \u05E9\u05E0\u05D1\u05D7\u05E8\u05D4 \u05D4\u05D9\u05D0 \u05D6\u05D4\u05D4 \u05DC\u05E9\u05E4\u05EA \u05D4\u05E8\u05D0\u05E9\u05D9\u05EA \u05E9\u05DC \u05D4\u05E7\u05D5\u05D1\u05E5. \u05D0\u05E0\u05D0 \u05D0\u05E9\u05E8 \u05D0\u05DD \u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05D4\u05DE\u05E9\u05D9\u05DA.",ru:"\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u044F\u0437\u044B\u043A \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C \u0444\u0430\u0439\u043B\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0435 \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C.",pl:"Wybrany j\u0119zyk jest taki sam jak g\u0142\xF3wny j\u0119zyk pliku. Prosz\u0119 potwierdzi\u0107, czy chcesz kontynuowa\u0107."},io={en:"By clicking 'Sign up' you acknowledge that you have read, understood, and agree to Transmate's Terms & Conditions and Privacy Policy",pt:"Ao clicar em 'Inscreva-se', voc\xEA reconhece que leu, entendeu e concorda com os Termos e Condi\xE7\xF5es e a Pol\xEDtica de Privacidade da Transmate",es:"Al hacer clic en 'Registrarse' aceptas que has le\xEDdo, comprendido y aceptado los T\xE9rminos y Condiciones y la Pol\xEDtica de Privacidad de Transmate",fr:"En cliquant sur 'S'inscrire', vous reconnaissez avoir lu, compris et accept\xE9 les Conditions g\xE9n\xE9rales et la Politique de confidentialit\xE9 de Transmate",de:"Durch Klicken auf 'Registrieren' best\xE4tigen Sie, dass Sie die Allgemeinen Gesch\xE4ftsbedingungen und Datenschutzrichtlinien von Transmate gelesen, verstanden und akzeptiert haben",it:"Cliccando su 'Iscriviti' confermi di aver letto, compreso e accettato i Termini e condizioni e l'Informativa sulla privacy di Transmate",zh:"\u70B9\u51FB\u201C\u6CE8\u518C\u201D\u5373\u8868\u793A\u60A8\u5DF2\u9605\u8BFB\u3001\u7406\u89E3\u5E76\u540C\u610FTransmate\u7684\u6761\u6B3E\u548C\u9690\u79C1\u653F\u7B56","zh-TW":"\u9EDE\u9078\u300C\u8A3B\u518A\u300D\u5373\u8868\u793A\u60A8\u5DF2\u95B1\u8B80\u3001\u7406\u89E3\u4E26\u540C\u610FTransmate\u7684\u689D\u6B3E\u548C\u96B1\u79C1\u653F\u7B56",ja:"\u300C\u767B\u9332\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3053\u3068\u3067\u3001\u3042\u306A\u305F\u306FTransmate\u306E\u5229\u7528\u898F\u7D04\u3068\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC\u3092\u8AAD\u307F\u3001\u7406\u89E3\u3057\u3001\u540C\u610F\u3057\u305F\u3053\u3068\u306B\u306A\u308A\u307E\u3059",ko:"'\uAC00\uC785'\uC744 \uD074\uB9AD\uD568\uC73C\uB85C\uC368, Transmate\uC758 \uC774\uC6A9\uC57D\uAD00\uACFC \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638 \uC815\uCC45\uC744 \uBAA8\uB450 \uC77D\uACE0 \uC774\uD574\uD558\uC600\uC73C\uBA70 \uB3D9\uC758\uD558\uC2E0 \uAC83\uC73C\uB85C \uAC04\uC8FC\uB429\uB2C8\uB2E4",he:"\u05E2\u05DC \u05D9\u05D3\u05D9 \u05DC\u05D7\u05D9\u05E6\u05D4 \u05E2\u05DC '\u05D4\u05D9\u05E8\u05E9\u05DD' \u05D0\u05EA\u05D4 \u05DE\u05DB\u05D9\u05E8 \u05DB\u05D9 \u05E7\u05E8\u05D0\u05EA, \u05D4\u05D1\u05E0\u05EA \u05D5\u05D4\u05E1\u05DB\u05DE\u05EA \u05DC\u05EA\u05E0\u05D0\u05D9 \u05D4\u05E9\u05D9\u05DE\u05D5\u05E9 \u05D5\u05DC\u05DE\u05D3\u05D9\u05E0\u05D9\u05D5\u05EA \u05D4\u05E4\u05E8\u05D8\u05D9\u05D5\u05EA \u05E9\u05DC \u05D8\u05E8\u05E0\u05E1\u05DE\u05D9\u05D9\u05D8",ru:"\u041D\u0430\u0436\u0438\u043C\u0430\u044F '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F', \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u043B\u0438\u0441\u044C, \u043F\u043E\u043D\u044F\u043B\u0438 \u0438 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u044B \u0441 \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 Transmate",pl:"Klikaj\u0105c przycisk \u201EZarejestruj si\u0119\u201D, potwierdzasz, \u017Ce przeczyta\u0142e\u015B, zrozumia\u0142e\u015B i zgadzasz si\u0119 z warunkami korzystania i polityk\u0105 prywatno\u015Bci Transmate"},lo={en:"Login",pt:"Login",es:"Inicio de sesi\xF3n",fr:"Connexion",de:"Anmeldung",it:"Accesso",zh:"\u767B\u5F55","zh-TW":"\u767B\u5165",ja:"\u30ED\u30B0\u30A4\u30F3",ko:"\uB85C\uADF8\uC778",he:"\u05DB\u05E0\u05D9\u05E1\u05D4",ru:"\u0412\u0445\u043E\u0434",pl:"Logowanie"},co={en:"Sign in to Transmate",pt:"Fa\xE7a login no Transmate",es:"Iniciar sesi\xF3n en Transmate",fr:"Se connecter \xE0 Transmate",de:"Bei Transmate anmelden",it:"Accedi a Transmate",zh:"\u767B\u5F55Transmate","zh-TW":"\u767B\u5165Transmate",ja:"Transmate\u306B\u30B5\u30A4\u30F3\u30A4\u30F3\u3059\u308B",ko:"Transmate\uC5D0 \uB85C\uADF8\uC778\uD558\uAE30",he:"\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA \u05DC-Transmate",ru:"\u0412\u0445\u043E\u0434 \u0432 Transmate",pl:"Zaloguj si\u0119 do Transmate"},uo={en:"Verify email",pt:"Verificar email",es:"Verificar correo electr\xF3nico",fr:"V\xE9rifier l'email",de:"E-Mail \xFCberpr\xFCfen",it:"Verifica email",zh:"\u9A8C\u8BC1\u7535\u5B50\u90AE\u4EF6","zh-TW":"\u9A57\u8B49\u96FB\u5B50\u90F5\u4EF6",ja:"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u78BA\u8A8D\u3059\u308B",ko:"\uC774\uBA54\uC77C \uC778\uC99D",he:"\u05D0\u05DE\u05EA \u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC",ru:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443",pl:"Potwierd\u017A adres e-mail"},fo={en:"Create a free account",pt:"Criar uma conta gratuita",es:"Crear una cuenta gratuita",fr:"Cr\xE9er un compte gratuit",de:"Kostenloses Konto erstellen",it:"Creare un account gratuito",zh:"\u521B\u5EFA\u514D\u8D39\u8D26\u6237","zh-TW":"\u5EFA\u7ACB\u514D\u8CBB\u5E33\u6236",ja:"\u7121\u6599\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F5C\u6210\u3059\u308B",ko:"\uBB34\uB8CC \uACC4\uC815 \uB9CC\uB4E4\uAE30",he:"\u05E6\u05D5\u05E8 \u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05D7\u05D9\u05E0\u05DD",ru:"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442",pl:"Utw\xF3rz darmowe konto"},mo={en:"Don't have an account?",pt:"N\xE3o tem uma conta?",es:"\xBFNo tienes una cuenta?",fr:"Vous n'avez pas de compte?",de:"Sie haben noch kein Konto?",it:"Non hai un account?",zh:"\u8FD8\u6CA1\u6709\u8D26\u6237\uFF1F","zh-TW":"\u9084\u6C92\u6709\u5E33\u6236\uFF1F",ja:"\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u304A\u6301\u3061\u3067\u306A\u3044\u3067\u3059\u304B\uFF1F",ko:"\uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694?",he:"\u05D0\u05D9\u05DF \u05DC\u05DA \u05D7\u05E9\u05D1\u05D5\u05DF?",ru:"\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?",pl:"Nie masz konta?"},po={en:"Upload the document you want to process in bulk.",pt:"Carregue o documento que deseja processar em massa.",es:"Cargue el documento que desea procesar en masa.",fr:"T\xE9l\xE9chargez le document que vous souhaitez traiter en masse.",de:"Laden Sie das Dokument hoch, das Sie in gro\xDFen Mengen verarbeiten m\xF6chten.",it:"Carica il documento che desideri elaborare in blocco.",zh:"\u4E0A\u4F20\u60A8\u8981\u6279\u91CF\u5904\u7406\u7684\u6587\u6863\u3002","zh-TW":"\u4E0A\u50B3\u60A8\u8981\u6279\u6B21\u8655\u7406\u7684\u6587\u4EF6\u3002",ja:"\u4E00\u62EC\u3067\u51E6\u7406\u3057\u305F\u3044\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uC77C\uAD04 \uCC98\uB9AC\uD558\uB824\uB294 \uBB38\uC11C\uB97C \uC5C5\uB85C\uB4DC\uD558\uC138\uC694.",he:"\u05D4\u05E2\u05DC\u05D4 \u05D0\u05EA \u05D4\u05DE\u05E1\u05DE\u05DA \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05E2\u05D1\u05D3 \u05D1\u05DB\u05DE\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D4.",ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0432 \u0431\u043E\u043B\u044C\u0448\u043E\u043C \u043E\u0431\u044A\u0435\u043C\u0435.",pl:"Prze\u015Blij dokument, kt\xF3ry chcesz przetworzy\u0107 zbiorczo."},go={en:"Welcome to Transmate: AI-powered Bulk Translator!",pt:"Bem-vindo(a) ao Transmate: AI-powered Bulk Translator!",es:"Bienvenido(a) a Transmate: AI-powered Bulk Translator!",fr:"Bienvenue \xE0 Transmate: AI-powered Bulk Translator!",de:"Willkommen bei Transmate: AI-powered Bulk Translator!",it:"Benvenuto(a) su Transmate: AI-powered Bulk Translator!",zh:"\u6B22\u8FCE\u4F7F\u7528 Transmate: AI-powered Bulk Translator!","zh-TW":"\u6B61\u8FCE\u4F7F\u7528 Transmate: AI-powered Bulk Translator!",ja:"\u3088\u3046\u3053\u305D Transmate: AI-powered Bulk Translator!",ko:"\uD658\uC601\uD569\uB2C8\uB2E4 Transmate: AI-powered Bulk Translator!",he:"\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC Transmate: AI-powered Bulk Translator!",ru:"\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 Transmate: AI-powered Bulk Translator!",pl:"Witaj w Transmate: AI-powered Bulk Translator!"},ho={en:"Got it!",pt:"Entendi!",es:"\xA1Entendido!",fr:"Compris !",de:"Verstanden!",it:"Capito!",zh:"\u660E\u767D\u4E86\uFF01","zh-TW":"\u4E86\u89E3\uFF01",ja:"\u4E86\u89E3\u3057\u307E\u3057\u305F\uFF01",ko:"\uC54C\uACA0\uC2B5\uB2C8\uB2E4!",he:"\u05D4\u05D1\u05E0\u05EA\u05D9!",ru:"\u041F\u043E\u043D\u044F\u043B!",pl:"Rozumiem!"},bo={en:"Prompt Name",pt:"Nome da solicita\xE7\xE3o",es:"Nombre de la indicaci\xF3n",fr:"Nom de la consigne",de:"Aufgabenname",it:"Nome della prompt",zh:"\u63D0\u793A\u540D\u79F0","zh-TW":"\u63D0\u793A\u540D\u7A31",ja:"\u30D7\u30ED\u30F3\u30D7\u30C8\u540D",ko:"\uD504\uB86C\uD504\uD2B8 \uC774\uB984",he:"\u05E9\u05DD \u05D4\u05EA\u05E8\u05D2\u05D9\u05DC",ru:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438",pl:"Nazwa polecenia"},xo={en:"Your prompt content",pt:"O conte\xFAdo da sua solicita\xE7\xE3o",es:"El contenido de tu indicaci\xF3n",fr:"Le contenu de votre consigne",de:"Der Inhalt Ihrer Aufgabenstellung",it:"Il contenuto della tua prompt",zh:"\u60A8\u7684\u63D0\u793A\u5185\u5BB9","zh-TW":"\u60A8\u7684\u63D0\u793A\u5167\u5BB9",ja:"\u30D7\u30ED\u30F3\u30D7\u30C8\u306E\u5185\u5BB9",ko:"\uD504\uB86C\uD504\uD2B8 \uB0B4\uC6A9",he:"\u05EA\u05D5\u05DB\u05DF \u05D4\u05EA\u05E8\u05D2\u05D9\u05DC \u05E9\u05DC\u05DA",ru:"\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438",pl:"Zawarto\u015B\u0107 polecenia"},yo={en:"Click this button to upload the document you want to process in bulk.",pt:"Clique neste bot\xE3o para fazer o upload do documento que deseja processar em massa.",es:"Haga clic en este bot\xF3n para cargar el documento que desea procesar en lotes.",fr:"Cliquez sur ce bouton pour t\xE9l\xE9charger le document que vous souhaitez traiter en vrac.",de:"Klicken Sie auf diese Schaltfl\xE4che, um das Dokument hochzuladen, das Sie im Batch verarbeiten m\xF6chten.",it:"Fare clic su questo pulsante per caricare il documento che si desidera elaborare in blocco.",zh:"\u70B9\u51FB\u6B64\u6309\u94AE\u4E0A\u4F20\u60A8\u8981\u6279\u91CF\u5904\u7406\u7684\u6587\u6863\u3002","zh-TW":"\u9EDE\u64CA\u6B64\u6309\u9215\u4E0A\u50B3\u60A8\u8981\u6279\u6B21\u8655\u7406\u7684\u6587\u4EF6\u3002",ja:"\u3053\u306E\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u3001\u4E00\u62EC\u51E6\u7406\u3059\u308B\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uC774 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC \uB300\uB7C9\uC73C\uB85C \uCC98\uB9AC\uD558\uB824\uB294 \uBB38\uC11C\uB97C \uC5C5\uB85C\uB4DC\uD558\uC2ED\uC2DC\uC624.",he:"\u05DC\u05D7\u05E5 \u05E2\u05DC \u05D4\u05DB\u05E4\u05EA\u05D5\u05E8 \u05D4\u05D6\u05D4 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E2\u05DC\u05D5\u05EA \u05D0\u05EA \u05D4\u05DE\u05E1\u05DE\u05DA \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05E2\u05D1\u05D3 \u05D1\u05DE\u05E7\u05D1\u05D9\u05DC\u05D9\u05D5\u05EA.",ru:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u044D\u0442\u0443 \u043A\u043D\u043E\u043F\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043F\u0430\u043A\u0435\u0442\u043D\u043E.",pl:"Kliknij ten przycisk, aby przes\u0142a\u0107 dokument, kt\xF3ry chcesz przetworzy\u0107 zbiorczo."},wo={en:"Add to Transmate as prompt",pt:"Adicionar ao Transmate como prompt",es:"Agregar a Transmate como indicaci\xF3n",fr:"Ajouter \xE0 Transmate comme invitation",de:"Zu Transmate als Aufforderung hinzuf\xFCgen",it:"Aggiungi a Transmate come prompt",zh:"\u5C06\u5176\u6DFB\u52A0\u5230Transmate\u4F5C\u4E3A\u63D0\u793A","zh-TW":"\u52A0\u5165Transmate\u4F5C\u70BA\u63D0\u793A",ja:"\u30D7\u30ED\u30F3\u30D7\u30C8\u3068\u3057\u3066Transmate\u306B\u8FFD\u52A0\u3059\u308B",ko:"\uD504\uB86C\uD504\uD2B8\uB85C Transmate\uC5D0 \uCD94\uAC00",he:"\u05D4\u05D5\u05E1\u05E3 \u05DC-Transmate \u05DB\u05E4\u05E8\u05D5\u05DE\u05D8",ru:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 Transmate \u043A\u0430\u043A \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443",pl:"Dodaj do Transmate jako polecenie"},vo={en:"or sign in with email",pt:"ou fa\xE7a login com email",es:"o inicia sesi\xF3n con tu correo electr\xF3nico",fr:"ou connectez-vous avec votre adresse e-mail",de:"oder melde dich mit deiner E-Mail an",it:"o accedi con la tua email",zh:"\u6216\u4F7F\u7528\u7535\u5B50\u90AE\u4EF6\u767B\u5F55","zh-TW":"\u6216\u4F7F\u7528\u96FB\u5B50\u90F5\u4EF6\u767B\u9304",ja:"\u307E\u305F\u306F\u30E1\u30FC\u30EB\u3067\u30B5\u30A4\u30F3\u30A4\u30F3",ko:"\uC774\uBA54\uC77C\uB85C \uB85C\uADF8\uC778",he:"\u05D0\u05D5 \u05D4\u05EA\u05D7\u05D1\u05E8 \u05E2\u05DD \u05DB\u05EA\u05D5\u05D1\u05EA \u05D4\u05DE\u05D9\u05D9\u05DC \u05E9\u05DC\u05DA",ru:"\u0438\u043B\u0438 \u0432\u043E\u0439\u0434\u0438\u0442\u0435 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",pl:"lub zaloguj si\u0119 za pomoc\u0105 adresu e-mail"},_o={en:"or sign up with email",pt:"ou cadastre-se com o seu e-mail",es:"o registrarse con correo electr\xF3nico",fr:"ou inscrivez-vous avec votre email",de:"oder registrieren Sie sich mit Ihrer E-Mail-Adresse",it:"o registrati con l'email",zh:"\u6216\u4F7F\u7528\u7535\u5B50\u90AE\u4EF6\u6CE8\u518C","zh-TW":"\u6216\u4F7F\u7528\u96FB\u5B50\u90F5\u4EF6\u8A3B\u518A",ja:"\u307E\u305F\u306F\u30E1\u30FC\u30EB\u3067\u767B\u9332",ko:"\uB610\uB294 \uC774\uBA54\uC77C\uB85C \uAC00\uC785\uD558\uC138\uC694",he:"\u05D0\u05D5 \u05D4\u05D9\u05E8\u05E9\u05DD \u05D1\u05D0\u05DE\u05E6\u05E2\u05D5\u05EA \u05DB\u05EA\u05D5\u05D1\u05EA \u05D4\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05E9\u05DC\u05DA",ru:"\u0438\u043B\u0438 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0441\u0432\u043E\u044E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443",pl:"lub zarejestruj si\u0119 przy u\u017Cyciu adresu e-mail"},Ao={en:"All",pt:"Todos",es:"Todos",fr:"Tous",de:"Alle",it:"Tutti",zh:"\u5168\u90E8","zh-TW":"\u5168\u90E8",ja:"\u3059\u3079\u3066",ko:"\uBAA8\uB450",he:"\u05D4\u05DB\u05DC",ru:"\u0412\u0441\u0435",pl:"Wszystkie"},To={en:"Pending",pt:"Pendente",es:"Pendiente",fr:"En attente",de:"Ausstehend",it:"In attesa",zh:"\u5F85\u5904\u7406","zh-TW":"\u5F85\u8655\u7406",ja:"\u4FDD\u7559\u4E2D",ko:"\uB300\uAE30 \uC911",he:"\u05DE\u05DE\u05EA\u05D9\u05DF \u05DC\u05D8\u05D9\u05E4\u05D5\u05DC",ru:"\u041E\u0436\u0438\u0434\u0430\u0435\u0442",pl:"Oczekuj\u0105ce"},So={en:"Ongoing",pt:"Em andamento",es:"En curso",fr:"En cours",de:"Im Gange",it:"In corso",zh:"\u8FDB\u884C\u4E2D","zh-TW":"\u9032\u884C\u4E2D",ja:"\u9032\u884C\u4E2D",ko:"\uC9C4\uD589 \uC911",he:"\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA",ru:"\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435",pl:"W trakcie"},ko={en:"Completed",pt:"Conclu\xEDdo",es:"Completado",fr:"Termin\xE9",de:"Abgeschlossen",it:"Completato",zh:"\u5DF2\u5B8C\u6210","zh-TW":"\u5DF2\u5B8C\u6210",ja:"\u5B8C\u4E86",ko:"\uC644\uB8CC\uB428",he:"\u05D4\u05D5\u05E9\u05DC\u05DD",ru:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",pl:"Zako\u0144czone"},zo={en:"Failed",pt:"Falhou",es:"Fallido",fr:"\xC9chec",de:"Fehlgeschlagen",it:"Fallito",zh:"\u5931\u8D25","zh-TW":"\u5931\u6557",ja:"\u5931\u6557",ko:"\uC2E4\uD328",he:"\u05E0\u05DB\u05E9\u05DC",ru:"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C",pl:"Niepowodzenie"},Co={en:"A file is already being executed. Do you want to override it?",pt:"Um arquivo j\xE1 est\xE1 sendo executado. Deseja substitu\xED-lo?",es:"Ya hay un archivo en ejecuci\xF3n. \xBFDesea reemplazarlo?",fr:"Un fichier est d\xE9j\xE0 en cours d'ex\xE9cution. Voulez-vous le remplacer ?",de:"Eine Datei wird bereits ausgef\xFChrt. M\xF6chten Sie sie \xFCberschreiben?",it:"Un file \xE8 gi\xE0 in esecuzione. Vuoi sovrascriverlo?",zh:"\u5F53\u524D\u5DF2\u7ECF\u6709\u6587\u4EF6\u5728\u6267\u884C\uFF0C\u662F\u5426\u8986\u76D6\uFF1F","zh-TW":"\u76EE\u524D\u5DF2\u6709\u6A94\u6848\u5728\u57F7\u884C\uFF0C\u662F\u5426\u8986\u84CB\uFF1F",ja:"\u73FE\u5728\u5B9F\u884C\u4E2D\u306E\u30D5\u30A1\u30A4\u30EB\u304C\u3042\u308A\u307E\u3059\u3002\u4E0A\u66F8\u304D\u3057\u307E\u3059\u304B\uFF1F",ko:"\uD604\uC7AC \uD30C\uC77C\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB36E\uC5B4\uC50C\uC6B0\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",he:"\u05DB\u05D1\u05E8 \u05D9\u05E9 \u05E7\u05D5\u05D1\u05E5 \u05D1\u05D1\u05D9\u05E6\u05D5\u05E2. \u05D4\u05D0\u05DD \u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05E9\u05DB\u05E4\u05DC \u05D0\u05D5\u05EA\u05D5?",ru:"\u0424\u0430\u0439\u043B \u0443\u0436\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F. \u0412\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C?",pl:"Plik jest ju\u017C wykonywany. Czy chcesz go zast\u0105pi\u0107?"},Mo={en:"In Progress",pt:"Em Progresso",es:"En Progreso",fr:"En Cours",de:"In Bearbeitung",it:"In Corso",zh:"\u8FDB\u884C\u4E2D","zh-TW":"\u9032\u884C\u4E2D",ja:"\u9032\u884C\u4E2D",ko:"\uC9C4\uD589 \uC911",he:"\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA",ru:"\u0412 \u041F\u0440\u043E\u0446\u0435\u0441\u0441\u0435",pl:"W Trakcie"},Po={en:"Next",pt:"Pr\xF3ximo",es:"Siguiente",fr:"Suivant",de:"Weiter",it:"Successivo",zh:"\u4E0B\u4E00\u6B65","zh-TW":"\u4E0B\u4E00\u500B",ja:"\u6B21\u3078",ko:"\uB2E4\uC74C",he:"\u05D4\u05D1\u05D0",ru:"\u0414\u0430\u043B\u0435\u0435",pl:"Nast\u0119pny"},Io={en:"File size exceeds the limit. Please log in to continue.",pt:"O tamanho do arquivo excede o limite. Por favor, fa\xE7a login para continuar.",es:"El tama\xF1o del archivo excede el l\xEDmite. Por favor, inicia sesi\xF3n para continuar.",fr:"La taille du fichier d\xE9passe la limite autoris\xE9e. Veuillez vous connecter pour continuer.",de:"Die Dateigr\xF6\xDFe \xFCberschreitet das Limit. Bitte melden Sie sich an, um fortzufahren.",it:"La dimensione del file supera il limite consentito. Effettua l'accesso per continuare.",zh:"\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF0C\u8BF7\u767B\u5F55\u540E\u4F7F\u7528\u3002","zh-TW":"\u6A94\u6848\u5927\u5C0F\u8D85\u904E\u9650\u5236\uFF0C\u8ACB\u767B\u5165\u5F8C\u4F7F\u7528\u3002",ja:"\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u304C\u5236\u9650\u3092\u8D85\u3048\u3066\u3044\u307E\u3059\u3002\u7D9A\u884C\u3059\u308B\u306B\u306F\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uD30C\uC77C \uD06C\uAE30\uAC00 \uC81C\uD55C\uC744 \uCD08\uACFC\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD558\uB824\uBA74 \uB85C\uADF8\uC778\uD558\uC138\uC694.",he:"\u05D2\u05D5\u05D3\u05DC \u05D4\u05E7\u05D5\u05D1\u05E5 \u05D7\u05D5\u05E8\u05D2 \u05DE\u05D4\u05DE\u05D2\u05D1\u05DC\u05D4. \u05D0\u05E0\u05D0 \u05D4\u05EA\u05D7\u05D1\u05E8 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05DE\u05E9\u05D9\u05DA.",ru:"\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0445\u043E\u0434, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C.",pl:"Rozmiar pliku przekracza limit. Zaloguj si\u0119, aby kontynuowa\u0107."},jo={en:"You can view the history of batch processing tasks here.",pt:"Voc\xEA pode visualizar o hist\xF3rico de tarefas de processamento em lote aqui.",es:"Puede ver el historial de tareas de procesamiento por lotes aqu\xED.",fr:"Vous pouvez consulter l'historique des t\xE2ches de traitement par lots ici.",de:"Hier k\xF6nnen Sie den Verlauf der Stapelverarbeitungsaufgaben anzeigen.",it:"\xC8 possibile visualizzare lo storico delle attivit\xE0 di elaborazione batch qui.",zh:"\u60A8\u53EF\u4EE5\u5728\u8FD9\u91CC\u67E5\u770B\u6279\u5904\u7406\u4EFB\u52A1\u7684\u5386\u53F2\u8BB0\u5F55\u3002","zh-TW":"\u60A8\u53EF\u4EE5\u5728\u9019\u88E1\u67E5\u770B\u6279\u6B21\u8655\u7406\u4EFB\u52D9\u7684\u6B77\u53F2\u8A18\u9304\u3002",ja:"\u30D0\u30C3\u30C1\u51E6\u7406\u30BF\u30B9\u30AF\u306E\u5C65\u6B74\u3092\u3053\u3053\u3067\u8868\u793A\u3067\u304D\u307E\u3059\u3002",ko:"\uC77C\uAD04 \uCC98\uB9AC \uC791\uC5C5\uC758 \uC774\uB825\uC744 \uC5EC\uAE30\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",he:"\u05E0\u05D9\u05EA\u05DF \u05DC\u05E6\u05E4\u05D5\u05EA \u05D1\u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05D4 \u05E9\u05DC \u05DE\u05E9\u05D9\u05DE\u05D5\u05EA \u05E2\u05D9\u05D1\u05D5\u05D3 \u05D1\u05D0\u05E6\u05D5\u05D5\u05D4 \u05DB\u05D0\u05DF.",ru:"\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0437\u0430\u0434\u0430\u0447 \u043F\u0430\u043A\u0435\u0442\u043D\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438.",pl:"Mo\u017Cesz tutaj zobaczy\u0107 histori\u0119 zada\u0144 przetwarzania wsadowego."},Lo={en:"Search",pt:"Buscar",es:"Buscar",fr:"Rechercher",de:"Suchen",it:"Cerca",zh:"\u641C\u7D22","zh-TW":"\u641C\u5C0B",ja:"\u691C\u7D22",ko:"\uAC80\uC0C9",he:"\u05D7\u05D9\u05E4\u05D5\u05E9",ru:"\u041F\u043E\u0438\u0441\u043A",pl:"Szukaj"},Bo={en:"Search Files",pt:"Buscar Arquivos",es:"Buscar Archivos",fr:"Rechercher des Fichiers",de:"Dateien durchsuchen",it:"Cerca File",zh:"\u641C\u7D22\u6587\u4EF6","zh-TW":"\u641C\u5C0B\u6A94\u6848",ja:"\u30D5\u30A1\u30A4\u30EB\u3092\u691C\u7D22",ko:"\uD30C\uC77C \uAC80\uC0C9",he:"\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E7\u05D1\u05E6\u05D9\u05DD",ru:"\u041F\u043E\u0438\u0441\u043A \u0444\u0430\u0439\u043B\u043E\u0432",pl:"Wyszukaj pliki"},Eo={en:"The current task has NOT set prompt, please select one prompt and target language before starting.",pt:"A tarefa atual N\xC3O definiu uma instru\xE7\xE3o, por favor, selecione uma instru\xE7\xE3o e um idioma-alvo antes de come\xE7ar.",es:"La tarea actual NO tiene una instrucci\xF3n establecida, por favor selecciona una instrucci\xF3n y un idioma objetivo antes de comenzar.",fr:"La t\xE2che actuelle n'a PAS d\xE9fini d'instruction, veuillez s\xE9lectionner une instruction et une langue cible avant de commencer.",de:"Die aktuelle Aufgabe hat keine Anweisung festgelegt. Bitte w\xE4hlen Sie vor dem Start eine Anweisung und Zielsprache aus.",it:"Il compito attuale NON ha impostato un prompt, seleziona un prompt e una lingua di destinazione prima di iniziare.",zh:"\u5F53\u524D\u4EFB\u52A1\u672A\u8BBE\u7F6E\u63D0\u793A\uFF0C\u8BF7\u5728\u5F00\u59CB\u4E4B\u524D\u9009\u62E9\u4E00\u4E2A\u63D0\u793A\u548C\u76EE\u6807\u8BED\u8A00\u3002","zh-TW":"\u76EE\u524D\u7684\u4EFB\u52D9\u5C1A\u672A\u8A2D\u5B9A\u63D0\u793A\uFF0C\u8ACB\u5728\u958B\u59CB\u4E4B\u524D\u9078\u64C7\u4E00\u500B\u63D0\u793A\u548C\u76EE\u6A19\u8A9E\u8A00\u3002",ja:"\u73FE\u5728\u306E\u30BF\u30B9\u30AF\u306B\u306F\u30D7\u30ED\u30F3\u30D7\u30C8\u304C\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u958B\u59CB\u3059\u308B\u524D\u306B\u30D7\u30ED\u30F3\u30D7\u30C8\u3068\u5BFE\u8C61\u8A00\u8A9E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uD604\uC7AC \uC791\uC5C5\uC5D0\uB294 \uD504\uB86C\uD504\uD2B8\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC2DC\uC791\uD558\uAE30 \uC804\uC5D0 \uD504\uB86C\uD504\uD2B8\uC640 \uB300\uC0C1 \uC5B8\uC5B4\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.",he:"\u05D4\u05DE\u05E9\u05D9\u05DE\u05D4 \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9\u05EA \u05D0\u05D9\u05E0\u05D4 \u05D4\u05D2\u05D3\u05D9\u05E8\u05D4 \u05D4\u05D5\u05E8\u05D0\u05D4. \u05E0\u05D0 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05D4\u05D5\u05E8\u05D0\u05D4 \u05D5\u05E9\u05E4\u05EA \u05D9\u05E2\u05D3 \u05DC\u05E4\u05E0\u05D9 \u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05DE\u05E9\u05D9\u05DE\u05D4.",ru:"\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430 \u041D\u0415 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0430 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443 \u0438 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u044F\u0437\u044B\u043A \u043F\u0435\u0440\u0435\u0434 \u043D\u0430\u0447\u0430\u043B\u043E\u043C.",pl:"Bie\u017C\u0105ce zadanie nie ustawi\u0142o tre\u015Bci polecenia. Przed rozpocz\u0119ciem prosz\u0119 wybra\u0107 tre\u015B\u0107 polecenia oraz docelowy j\u0119zyk."},No={en:"Upload",pt:"Enviar",es:"Subir",fr:"T\xE9l\xE9charger",de:"Hochladen",it:"Caricare",zh:"\u4E0A\u4F20","zh-TW":"\u4E0A\u50B3",ja:"\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",ko:"\uC5C5\uB85C\uB4DC",he:"\u05D4\u05E2\u05DC\u05D0\u05D4",ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",pl:"Prze\u015Blij"},Oo={en:"Click here to upload file",pt:"Clique aqui para enviar o arquivo",es:"Haz clic aqu\xED para subir el archivo",fr:"Cliquez ici pour t\xE9l\xE9charger le fichier",de:"Klicken Sie hier, um die Datei hochzuladen",it:"Clicca qui per caricare il file",zh:"\u70B9\u51FB\u8FD9\u91CC\u4E0A\u4F20\u6587\u4EF6","zh-TW":"\u9EDE\u64CA\u9019\u88E1\u4E0A\u50B3\u6A94\u6848",ja:"\u30D5\u30A1\u30A4\u30EB\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3059\u308B\u306B\u306F\u3053\u3053\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044",ko:"\uD30C\uC77C\uC744 \uC5C5\uB85C\uB4DC\uD558\uB824\uBA74 \uC5EC\uAE30\uB97C \uD074\uB9AD\uD558\uC138\uC694",he:"\u05DC\u05D7\u05E5 \u05DB\u05D0\u05DF \u05DB\u05D3\u05D9 \u05DC\u05D4\u05E2\u05DC\u05D5\u05EA \u05E7\u05D5\u05D1\u05E5",ru:"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B",pl:"Kliknij tutaj, aby przes\u0142a\u0107 plik"},Wo={en:"Please check the current model's remaining dialogue count.",pt:"Por favor, verifique a quantidade de di\xE1logos restantes do modelo atual.",es:"Por favor, verifica la cantidad de di\xE1logos restantes del modelo actual.",fr:"Veuillez v\xE9rifier le nombre de dialogues restants du mod\xE8le actuel.",de:"Bitte \xFCberpr\xFCfen Sie die verbleibende Anzahl an Dialogen des aktuellen Modells.",it:"Si prega di verificare il conteggio dei dialoghi rimanenti del modello corrente.",zh:"\u8BF7\u68C0\u67E5\u5F53\u524D\u6A21\u578B\u7684\u5269\u4F59\u5BF9\u8BDD\u6570\u91CF\u3002","zh-TW":"\u8ACB\u6AA2\u67E5\u7576\u524D\u6A21\u578B\u7684\u5269\u9918\u5C0D\u8A71\u6578\u91CF\u3002",ja:"\u73FE\u5728\u306E\u30E2\u30C7\u30EB\u306E\u6B8B\u308A\u306E\u5BFE\u8A71\u6570\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",ko:"\uD604\uC7AC \uBAA8\uB378\uC758 \uB0A8\uC740 \uB300\uD654 \uD69F\uC218\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.",he:"\u05E0\u05D0 \u05DC\u05D1\u05D3\u05D5\u05E7 \u05D0\u05EA \u05DE\u05E1\u05E4\u05E8 \u05D4\u05E9\u05D9\u05D7\u05D5\u05EA \u05D4\u05E0\u05D5\u05EA\u05E8\u05D5\u05EA \u05E9\u05DC \u05D4\u05DE\u05D5\u05D3\u05DC \u05D4\u05E0\u05D5\u05DB\u05D7\u05D9.",ru:"\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0445\u0441\u044F \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u043C\u043E\u0434\u0435\u043B\u0438.",pl:"Prosz\u0119 sprawdzi\u0107 liczb\u0119 pozosta\u0142ych dialog\xF3w w bie\u017C\u0105cym modelu."},Do={en:"\u5426",pt:"N\xE3o",es:"No",fr:"Non",de:"Nein",it:"No",zh:"\u5426","zh-TW":"\u5426",ja:"\u3044\u3044\u3048",ko:"\uC544\uB2C8\uC694",he:"\u05DC\u05D0",ru:"\u041D\u0435\u0442",pl:"Nie"},Fo={en:"Yes",pt:"Sim",es:"S\xED",fr:"Oui",de:"Ja",it:"S\xEC",zh:"\u662F","zh-TW":"\u662F",ja:"\u306F\u3044",ko:"\uB124",he:"\u05DB\u05DF",ru:"\u0414\u0430",pl:"Tak"},qo={en:"The uploaded file exceeds the maximum limit",pt:"O arquivo enviado excede o limite m\xE1ximo",es:"El archivo subido supera el l\xEDmite m\xE1ximo",fr:"Le fichier t\xE9l\xE9charg\xE9 d\xE9passe la limite maximale",de:"Die hochgeladene Datei \xFCberschreitet das maximale Limit",it:"Il file caricato supera il limite massimo",zh:"\u4E0A\u4F20\u7684\u6587\u4EF6\u8D85\u8FC7\u4E86\u6700\u5927\u9650\u5236","zh-TW":"\u4E0A\u50B3\u7684\u6A94\u6848\u8D85\u904E\u4E86\u6700\u5927\u9650\u5236",ja:"\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB\u306F\u6700\u5927\u5236\u9650\u3092\u8D85\u3048\u3066\u3044\u307E\u3059",ko:"\uC5C5\uB85C\uB4DC\uB41C \uD30C\uC77C\uC774 \uCD5C\uB300 \uC81C\uD55C\uC744 \uCD08\uACFC\uD588\uC2B5\uB2C8\uB2E4",he:"\u05D4\u05E7\u05D5\u05D1\u05E5 \u05E9\u05D4\u05D5\u05E2\u05DC\u05D4 \u05D7\u05D5\u05E8\u05D2 \u05DE\u05D4\u05D4\u05D2\u05D1\u05DC\u05D4 \u05D4\u05DE\u05E8\u05D1\u05D9\u05EA",ru:"\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u0435\u0434\u0435\u043B",pl:"Przes\u0142any plik przekracza maksymalny limit"},Ho={en:"Supported text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",pt:"Formatos suportados: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",es:"Formatos admitidos: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",fr:"Formats pris en charge : text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",de:"Unterst\xFCtzte Formate: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",it:"Formati supportati: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",zh:"\u652F\u6301\u7684\u683C\u5F0F\uFF1Atext/plain\u3001.pdf\u3001.epub\u3001.srt\u3001.ass\u3001.docx\u3001.doc\u3001.xlsx\u3001.xls\u3001.vtt","zh-TW":"\u652F\u63F4\u7684\u683C\u5F0F\uFF1Atext/plain\u3001.pdf\u3001.epub\u3001.srt\u3001.ass\u3001.docx\u3001.doc\u3001.xlsx\u3001.xls\u3001.vtt",ja:"\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u308B\u5F62\u5F0F\uFF1Atext/plain\u3001.pdf\u3001.epub\u3001.srt\u3001.ass\u3001.docx\u3001.doc\u3001.xlsx\u3001.xls\u3001.vtt",ko:"\uC9C0\uC6D0\uB418\uB294 \uD615\uC2DD: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",he:"\u05E4\u05D5\u05E8\u05DE\u05D8\u05D9\u05DD \u05E0\u05EA\u05DE\u05DB\u05D9\u05DD: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",ru:"\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u044B: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt",pl:"Obs\u0142ugiwane formaty: text/plain,.pdf,.epub,.srt,.ass,.docx,.doc,.xlsx,.xls,.vtt"},Ro={default_prompt:xr,language:yr,translate_to:wr,start:vr,pause:_r,download:Ar,query:Tr,choose_language:Sr,textarea_placeholder:kr,you_can_use_duckduckgo_bangs:zr,site_command_description:Cr,page_command_description:Mr,support_this_project:Pr,support_me:Ir,save:jr,new_prompt:Lr,name_placeholder:Br,current_date_placeholder_tip:Er,web_results_placeholder_tip:Nr,query_placeholder_tip:Or,twitter_button_tip:Wr,github_button_tip:Dr,discord_button_tip:Fr,decomposing_task:qr,process_the_first_task:Hr,previous_task:Rr,completed_task:Ur,"waiting-model-response":$r,Signin:Gr,Signup:Vr,email:Kr,password:Jr,forgot:Zr,name:Yr,confirmpassword:Xr,already_have_account:Qr,verifycode:eo,reset_password:to,reg_tipbefore:ao,terms:no,privacypolicy:ro,tip:oo,selectedLanguageMessage:so,reg_tip:io,login:lo,sign_in_transmate:co,verify_email:uo,create_free_account:fo,donot_have_account:mo,click_to_upload:po,welcome:go,gotit:ho,promptName:bo,yourPromptContent:xo,tour_des:yo,positonprompt:wo,signinwithemail:vo,signupwithemail:_o,typeall:Ao,pending:To,ongoing:So,completed:ko,failed:zo,overrideConfirmation:Co,inProgress:Mo,next:Po,fileSizeLimitExceeded:Io,batchProcessingHistory:jo,search:Lo,searchFiles:Bo,taskhasnoprompt:Eo,"ts-upload":No,"click-upload":Oo,"check-remaining-dialogues":Wo,tipNo:Do,tipYes:Fo,filelargetip:qo,supportedfiletype:Ho};var Uo=()=>Dt.default.i18n.getUILanguage().split("-")[0];var $o="en",Wt=Uo();var We=(t,e)=>e?Y[t][e]:Wt in Y[t]?Y[t][Wt]:Y[t][$o],De={defaultPrompt:"default_prompt",UI:{language:"language",supportThisProject:"support_this_project",supportMe:"support_me",chooseLanguage:"choose_language",textareaPlaceholder:"textarea_placeholder",youCanUseDuckDuckGoBangs:"you_can_use_duckduckgo_bangs",promptName:"promptName",yourPromptContent:"yourPromptContent",fileSizeLimitExceeded:"fileSizeLimitExceeded",search:"search",searchFiles:"searchFiles"},slashCommandsMenu:{siteCommandDescription:"site_command_description",pageCommandDescription:"page_command_description"},placeholders:{namePlaceholder:"name_placeholder"},buttons:{save:"save",newPrompt:"new_prompt",start:"start",download:"download",query:"query",pause:"pause"},placeHolderTips:{currentDate:"current_date_placeholder_tip",webResults:"web_results_placeholder_tip",query:"query_placeholder_tip"},socialButtonTips:{twitter:"twitter_button_tip",github:"github_button_tip",discord:"discord_button_tip"},task:{decomposing_task:"decomposing_task",process_the_first_task:"process_the_first_task",previous_task:"previous_task",completed_task:"completed_task",typeall:"typeall",pending:"pending",ongoing:"ongoing",completed:"completed",failed:"failed",overrideConfirmation:"overrideConfirmation",inProgress:"inProgress",checkremainingdialogues:"check-remaining-dialogues",waitingmodelresponse:"waiting-model-response"},login:{Signin:"Signin",Signup:"Signup",email:"email",password:"password",forgot:"forgot",name:"name",confirmpassword:"confirmpassword",already_have_account:"already_have_account",verifycode:"verifycode",reset_password:"reset_password",reg_tip:"reg_tip",sign_in_transmate:"sign_in_transmate",login:"login",verify_email:"verify_email",create_free_account:"create_free_account",donot_have_account:"donot_have_account",reg_tipbefore:"reg_tipbefore",terms:"terms",privacypolicy:"privacypolicy",signinwithemail:"signinwithemail",signupwithemail:"signupwithemail"},tour:{click_to_upload:"click_to_upload",welcome:"welcome",tour_des:"tour_des",gotit:"gotit",next:"next",batchProcessingHistory:"batchProcessingHistory",taskhasnoprompt:"taskhasnoprompt",languagetip:"tip",selectedLanguageMessage:"selectedLanguageMessage"},tip:{positonprompt:"positonprompt",tsupload:"ts-upload",clickupload:"click-upload",tipno:"tipNo",tipyes:"tipYes",filelargetip:"filelargetip",supportedfiletype:"supportedfiletype"}};var Ue="https://transmate.ai",Al=Ue+"/paltform/task",Tl=Ue+"/platform/profile",Sl=Ue+"/platform/signout";var P={conversation_id:"",input:"",message_id:"",model:""},Ft="",Fe=!1;async function _e(t,e,a,n){return fetch(`https://chat.openai.com/backend-api${a}`,{method:e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},referrerPolicy:"same-origin",mode:"cors",credentials:"same-origin",body:n===void 0?void 0:JSON.stringify(n)})}var ye="accessToken",qe="modalName",z=new Rt.default(60*1e3*10),kl=$();async function Ae(){if(z.get(ye))return z.get(ye);let t=await fetch("https://chat.openai.com/api/auth/session");if(t.status===403)throw new Error("CLOUDFLARE");let e=await t.json().catch(()=>({}));if(!e.accessToken)throw new Error("UNAUTHORIZED");return z.set(ye,e.accessToken),e.accessToken}async function Ut(t,e,a){await _e(t,"PATCH",`/conversation/${e}`,a)}var we=class{constructor(e){this.token=e;this.token=e}async fetchModels(){if(z.get(qe))return z.get(qe);let e=await _e(this.token,"GET","/models").then(a=>a.json());return z.set(qe,e.models),e.models}async getModelName(){try{return(await this.fetchModels())[0].slug}catch(e){return"text-davinci-002-render"}}async generateAnswer(e){let a,n,r=this.token,o=()=>{a&&Ut(this.token,a,{is_visible:!1})},s=await W.get("apiConversationRequestJson"),l=await W.get("isChatGPTPlus"),c="text-davinci-002-render";if(l==!1)c=await this.getModelName();else{let b=await W.get("currentchatgptmodal");b&&(c=b)}let u=null,y={action:"next",conversationId:P.conversation_id,arkose_token:null,history_and_training_disabled:!1,messages:[{id:$(),role:"user",content:{content_type:"text",parts:[e.prompt]}}],model:c,parent_message_id:P.message_id,timezone_offset_min:new Date().getTimezoneOffset()};try{let g=new Date().getTimezoneOffset().toString(),p="false",f=s;f=f.replace("${action}",'"'+y.action+'"'),f=f.replace("${id}",'"'+$()+'"'),f=f.replace("${part}",""),f=f.replace("${model}",'"'+c+'"'),f=f.replace("${parent_message_id}",'"'+$()+'"'),f=f.replace("${timezone_offset_min}",g),f=f.replace("${conversation_id}",'"'+P.conversation_id+'"'),f=f.replace("${arkose_token}",null),f=f.replace("${history_and_training_disabled}",p);let h=JSON.parse(f);h.messages[0].content.parts.push(e.prompt),P.conversation_id==""?delete h.conversation_id:h.parent_message_id=P.message_id,P.message_id==""&&(h.messages[0].id=$()),u=h}catch(b){u=y}return await Ee("https://chat.openai.com/backend-api/conversation",{method:"POST",signal:e.signal,headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify(u),onMessage(b){var f,h,x,_,S,j;if(b==="[DONE]"){n=="max_tokens"?Go(e,r,c,P.conversation_id,P.message_id,Ft):(e.onEvent({type:"done"}),$t(P));return}let g;try{g=JSON.parse(b)}catch(d){return}n=(x=(h=(f=g.message)==null?void 0:f.metadata)==null?void 0:h.finish_details)==null?void 0:x.type;let p=(j=(S=(_=g.message)==null?void 0:_.content)==null?void 0:S.parts)==null?void 0:j[0];p&&(a=g.conversation_id,P.input=e.prompt,P.conversation_id=g.conversation_id,P.message_id=g.message.id,Ft=p,P.model="text-moderation-playground",e.onEvent({type:"answer",data:{text:p,messageId:g.message.id,conversationId:g.conversation_id}}))}}),{cleanup:o}}};function $t(t){let e=z.get(ye);e&&_e(e,"POST","/moderations",t)}async function Gt(t,e){await _e(t,"POST","/conversation/message_feedback",e)}function Vt(t,e){chrome.storage.sync.get([t],function(a){e(a[t])})}var He="poechannel";var Re="minSeq",qt="channelHash",Ht="boxName",ae="chatId";async function ne(t,e,a,n,r){return fetch(`https://poe.com${a}`,{method:e,headers:{"Content-Type":"application/json",...t},credentials:"include",body:n===void 0?void 0:JSON.stringify(n)})}async function Kt(){if(z.get(He)&&z.get(Re))return{channel:z.get(He),formkey:"",minSeq:z.get(Re),channelHash:z.get(qt),boxName:z.get(Ht)};let e=await(await fetch("https://poe.com/api/settings")).json().catch(()=>({}));return z.set(He,e.tchannelData.channel),z.set(Re,e.tchannelData.minSeq),z.set(qt,e.tchannelData.channelHash),z.set(Ht,e.tchannelData.boxName),{channel:e.tchannelData.channel,formkey:"",minSeq:e.tchannelData.minSeq,channelHash:e.tchannelData.channelHash,boxName:e.tchannelData.boxName}}var O,ve=class{constructor(e,a,n,r,o){this.channel=e;this.formkey=a;this.minSeq=n;this.channelHash=r;this.boxName=o;this.generateUUID=()=>{let e="",a="abcdef0123456789";for(let n=0;n<32;n++)(n===8||n===12||n===16||n===20)&&(e+="-"),e+=a.charAt(Math.floor(Math.random()*a.length));return e};this.generateRandomString=e=>{let a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return Array.from({length:e},()=>a.charAt(Math.floor(Math.random()*a.length))).join("")};this.channel=e,this.formkey=a,this.minSeq=n,this.channelHash=r,this.boxName=o}async getAnnotate(e){let a={extensions:{hash:"b4e6992c3af8f208ab2b3979dce48889835736ed29f623ea9f609265018d0d8f"},queryName:"AnnotateWithIdsProviderQuery",variables:{}},n=T.hashStr(JSON.stringify(a)+this.formkey+e),r={"poe-formkey":this.formkey,"poe-tchannel":this.channel,origin:"https://poe.com","poe-tag-id":n},o=await ne(r,"POST","/api/gql_POST",a).then(s=>s.json())}async subscribe(e){let a={queryName:"subscriptionsMutation",extensions:{hash:"61c1bfa1ba167fd0857e3f6eaf9699e847e6c3b09d69926b12b5390076fe36e6"},variables:{subscriptions:[{subscriptionName:"messageAdded",query:`subscription subscriptions_messageAdded_Subscription(
  $chatId: BigInt!
) {
  messageAdded(chatId: $chatId) {
    id
    messageId
    creationTime
    clientNonce
    state
    ...ChatMessage_message
    ...chatHelpers_isBotMessage
  }
}

fragment ChatMessageDownvotedButton_message on Message {
  ...MessageFeedbackReasonModal_message
  ...MessageFeedbackOtherModal_message
}

fragment ChatMessageDropdownMenu_message on Message {
  id
  messageId
  vote
  text
  author
  ...chatHelpers_isBotMessage
}

fragment ChatMessageFeedbackButtons_message on Message {
  id
  messageId
  vote
  voteReason
  ...ChatMessageDownvotedButton_message
}

fragment ChatMessageOverflowButton_message on Message {
  text
  ...ChatMessageDropdownMenu_message
  ...chatHelpers_isBotMessage
}

fragment ChatMessageSuggestedReplies_SuggestedReplyButton_message on Message {
  messageId
}

fragment ChatMessageSuggestedReplies_message on Message {
  suggestedReplies
  author
  ...ChatMessageSuggestedReplies_SuggestedReplyButton_message
}

fragment ChatMessage_message on Message {
  id
  messageId
  text
  author
  linkifiedText
  state
  contentType
  ...ChatMessageSuggestedReplies_message
  ...ChatMessageFeedbackButtons_message
  ...ChatMessageOverflowButton_message
  ...chatHelpers_isHumanMessage
  ...chatHelpers_isBotMessage
  ...chatHelpers_isChatBreak
  ...chatHelpers_useTimeoutLevel
  ...MarkdownLinkInner_message
  ...IdAnnotation_node
}

fragment IdAnnotation_node on Node {
  __isNode: __typename
  id
}

fragment MarkdownLinkInner_message on Message {
  messageId
}

fragment MessageFeedbackOtherModal_message on Message {
  id
  messageId
}

fragment MessageFeedbackReasonModal_message on Message {
  id
  messageId
}

fragment chatHelpers_isBotMessage on Message {
  ...chatHelpers_isHumanMessage
  ...chatHelpers_isChatBreak
}

fragment chatHelpers_isChatBreak on Message {
  author
}

fragment chatHelpers_isHumanMessage on Message {
  author
}

fragment chatHelpers_useTimeoutLevel on Message {
  id
  state
  text
  messageId
  author
  chat {
    chatId
    defaultBotNickname
    id
  }
}
`},{subscriptionName:"messageDeleted",query:`subscription subscriptions_messageDeleted_Subscription(
  $chatId: BigInt!
) {
  messageDeleted(chatId: $chatId) {
    id
    messageId
  }
}
`},{subscriptionName:"viewerStateUpdated",query:`subscription subscriptions_viewerStateUpdated_Subscription {
  viewerStateUpdated {
    id
    ...ChatPageBotSwitcher_viewer
  }
}

fragment BotHeader_bot on Bot {
  displayName
  messageLimit {
    dailyLimit
  }
  ...BotImage_bot
  ...BotLink_bot
  ...IdAnnotation_node
  ...botHelpers_useViewerCanAccessPrivateBot
  ...botHelpers_useDeletion_bot
}

fragment BotImage_bot on Bot {
  displayName
  ...botHelpers_useDeletion_bot
  ...BotImage_useProfileImage_bot
}

fragment BotImage_useProfileImage_bot on Bot {
  image {
    __typename
    ... on LocalBotImage {
      localName
    }
    ... on UrlBotImage {
      url
    }
  }
  ...botHelpers_useDeletion_bot
}

fragment BotLink_bot on Bot {
  displayName
}

fragment ChatPageBotSwitcher_viewer on Viewer {
  availableBots {
    id
    handle
    ...BotHeader_bot
  }
}

fragment IdAnnotation_node on Node {
  __isNode: __typename
  id
}

fragment botHelpers_useDeletion_bot on Bot {
  deletionState
}

fragment botHelpers_useViewerCanAccessPrivateBot on Bot {
  isPrivateBot
  viewerIsCreator
}
`},{subscriptionName:"viewerMessageLimitUpdated",query:`subscription subscriptions_viewerMessageLimitUpdated_Subscription {
  viewerMessageLimitUpdated {
    ...SettingsSubscriptionSection_viewer
    id
  }
}

fragment SettingsSubscriptionPaywallModal_viewer on Viewer {
  ...WebSubscriptionPaywall_viewer
}

fragment SettingsSubscriptionSectionNonSubscriberView_viewer on Viewer {
  ...SettingsSubscriptionPaywallModal_viewer
}

fragment SettingsSubscriptionSectionSubscriberView_viewer on Viewer {
  subscription {
    isActive
    expiresTime
    purchaseType
    isAnnualSubscription
    willCancelAtPeriodEnd
    id
  }
}

fragment SettingsSubscriptionSection_viewer on Viewer {
  availableBots {
    displayName
    messageLimit {
      canSend
      numMessagesRemaining
      resetTime
      dailyBalance
      dailyLimit
      monthlyBalance
      monthlyLimit
      monthlyBalanceRefreshTime
      shouldShowRemainingMessageCount
    }
    id
  }
  subscription {
    isActive
    id
  }
  isEligibleForWebSubscriptions
  ...SettingsSubscriptionSectionNonSubscriberView_viewer
  ...SettingsSubscriptionSectionSubscriberView_viewer
  ...WebSubscriptionSuccessMessage_viewer
}

fragment SubscriptionMessageLimitExplanation_viewer on Viewer {
  availableBots {
    displayName
    messageLimit {
      monthlyLimit
    }
    id
  }
}

fragment WebSubscriptionPaywall_viewer on Viewer {
  ...SubscriptionMessageLimitExplanation_viewer
  webSubscriptionPriceInfo {
    monthlyPrice
    yearlyPrice
    yearlyPricePerMonth
    yearlyPercentageSavings
    id
  }
}

fragment WebSubscriptionSuccessMessage_viewer on Viewer {
  subscription {
    isActive
    expiresTime
    willCancelAtPeriodEnd
    id
  }
}
`}]}},n=T.hashStr(JSON.stringify(a)+this.formkey+e),r={"poe-formkey":this.formkey,"poe-tchannel":this.channel,origin:"https://poe.com","poe-tag-id":n},o=await ne(r,"POST","/api/gql_POST",a).then(s=>s.json())}async getchatId(e){let a=W.get("trans-poe-chatId");if(a)return a;if(z.get(ae))return z.get(ae);let n=W.get("trans-poe-cursor"),r=W.get("trans-poe-Id"),o={queryName:"ChatListPaginationQuery",variables:{count:25,cursor:n,id:r},query:`query ChatListPaginationQuery(
  $count: Int = 5
  $cursor: String
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...ChatPageMain_chat_1G22uz
    id
  }
}

fragment BotImage_bot on Bot {
  displayName
  ...botHelpers_useDeletion_bot
  ...BotImage_useProfileImage_bot
}

fragment BotImage_useProfileImage_bot on Bot {
  image {
    __typename
    ... on LocalBotImage {
      localName
    }
    ... on UrlBotImage {
      url
    }
  }
  ...botHelpers_useDeletion_bot
}

fragment BotInfoCardBody_bot on Bot {
  description
}

fragment BotInfoCardFooter_bot on Bot {
  poweredBy
}

fragment BotInfoCardHeader_bot on Bot {
  displayName
  ...BotImage_bot
  ...IdAnnotation_node
  creator {
    ...UserHandle_user
    id
  }
}

fragment BotInfoCard_bot on Bot {
  ...BotInfoCardHeader_bot
  ...BotInfoCardBody_bot
  ...BotInfoCardFooter_bot
}

fragment ChatMessageDownvotedButton_message on Message {
  ...MessageFeedbackReasonModal_message
  ...MessageFeedbackOtherModal_message
}

fragment ChatMessageDropdownMenu_message on Message {
  id
  messageId
  vote
  text
  author
  ...chatHelpers_isBotMessage
}

fragment ChatMessageFeedbackButtons_message on Message {
  id
  messageId
  vote
  voteReason
  ...ChatMessageDownvotedButton_message
}

fragment ChatMessageInputView_chat on Chat {
  id
  chatId
  defaultBotObject {
    nickname
    messageLimit {
      dailyBalance
      shouldShowRemainingMessageCount
    }
    hasClearContext
    isDown
    ...botHelpers_useDeletion_bot
    id
  }
  shouldShowDisclaimer
  ...chatHelpers_useSendMessage_chat
  ...chatHelpers_useSendChatBreak_chat
}

fragment ChatMessageInputView_edges on MessageEdge {
  node {
    ...chatHelpers_isChatBreak
    ...chatHelpers_isHumanMessage
    state
    text
    id
  }
}

fragment ChatMessageOverflowButton_message on Message {
  text
  ...ChatMessageDropdownMenu_message
  ...chatHelpers_isBotMessage
}

fragment ChatMessageSuggestedReplies_SuggestedReplyButton_chat on Chat {
  ...chatHelpers_useSendMessage_chat
}

fragment ChatMessageSuggestedReplies_SuggestedReplyButton_message on Message {
  messageId
}

fragment ChatMessageSuggestedReplies_chat on Chat {
  ...ChatWelcomeView_chat
  ...ChatMessageSuggestedReplies_SuggestedReplyButton_chat
  defaultBotObject {
    hasWelcomeTopics
    hasSuggestedReplies
    id
  }
}

fragment ChatMessageSuggestedReplies_message on Message {
  suggestedReplies
  author
  ...ChatMessageSuggestedReplies_SuggestedReplyButton_message
}

fragment ChatMessage_chat on Chat {
  defaultBotObject {
    hasWelcomeTopics
    hasSuggestedReplies
    disclaimerText
    displayName
    ...ChatPageDisclaimer_bot
    ...ChatPageRateLimitedBanner_bot
    id
  }
  ...ChatMessageSuggestedReplies_chat
  ...ChatWelcomeView_chat
}

fragment ChatMessage_message on Message {
  id
  messageId
  text
  author
  linkifiedText
  state
  contentType
  ...ChatMessageSuggestedReplies_message
  ...ChatMessageFeedbackButtons_message
  ...ChatMessageOverflowButton_message
  ...chatHelpers_isHumanMessage
  ...chatHelpers_isBotMessage
  ...chatHelpers_isChatBreak
  ...chatHelpers_useTimeoutLevel
  ...MarkdownLinkInner_message
  ...IdAnnotation_node
}

fragment ChatMessagesView_EmptyChat_chat on Chat {
  defaultBotObject {
    hasWelcomeTopics
    ...BotInfoCard_bot
    ...ChatPageRateLimitedBanner_bot
    id
  }
  ...ChatWelcomeView_chat
}

fragment ChatMessagesView_chat on Chat {
  ...ChatMessagesView_EmptyChat_chat
  ...ChatMessage_chat
  ...IdAnnotation_node
  defaultBotObject {
    ...BotInfoCard_bot
    id
  }
}

fragment ChatMessagesView_edges on MessageEdge {
  ...ChatMessagesView_useMessagePairs_edges
}

fragment ChatMessagesView_useMessagePairs_edges on MessageEdge {
  node {
    id
    messageId
    creationTime
    ...ChatMessage_message
    ...chatHelpers_isBotMessage
    ...chatHelpers_isHumanMessage
    ...chatHelpers_isChatBreak
  }
}

fragment ChatPageDeleteFooter_chat on Chat {
  ...MessageDeleteConfirmationModal_chat
}

fragment ChatPageDisclaimer_bot on Bot {
  disclaimerText
}

fragment ChatPageMainFooter_chat on Chat {
  defaultBotObject {
    ...ChatPageMainFooter_useAccessMessage_bot
    id
  }
  ...ChatMessageInputView_chat
  ...ChatPageShareFooter_chat
  ...ChatPageDeleteFooter_chat
}

fragment ChatPageMainFooter_edges on MessageEdge {
  ...ChatMessageInputView_edges
}

fragment ChatPageMainFooter_useAccessMessage_bot on Bot {
  ...botHelpers_useDeletion_bot
  ...botHelpers_useViewerCanAccessPrivateBot
}

fragment ChatPageMain_chat_1G22uz on Chat {
  id
  chatId
  ...ChatPageShareFooter_chat
  ...ChatPageDeleteFooter_chat
  ...ChatMessagesView_chat
  ...MarkdownLinkInner_chat
  ...chatHelpers_useUpdateStaleChat_chat
  ...ChatSubscriptionPaywallContextWrapper_chat
  ...ChatPageMainFooter_chat
  messagesConnection(last: $count, before: $cursor) {
    edges {
      ...ChatMessagesView_edges
      ...ChatPageMainFooter_edges
      ...MarkdownLinkInner_edges
      node {
        ...chatHelpers_useUpdateStaleChat_message
        id
        __typename
      }
      cursor
      id
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
    id
  }
}

fragment ChatPageRateLimitedBanner_bot on Bot {
  messageLimit {
    numMessagesRemaining
  }
  ...subscriptionHelpers_useBotLogData_bot
}

fragment ChatPageShareFooter_chat on Chat {
  chatId
}

fragment ChatSubscriptionPaywallContextWrapper_chat on Chat {
  defaultBotObject {
    messageLimit {
      numMessagesRemaining
      shouldShowRemainingMessageCount
    }
    ...ChatSubscriptionPaywallModal_bot
    ...WebSubscriptionAnnouncementModalOpener_bot
    id
  }
}

fragment ChatSubscriptionPaywallMain_bot on Bot {
  ...BotImage_bot
  ...MessageLimitInfo_bot
  ...IneligibleForWebSubscription_bot
  ...subscriptionHelpers_useBotLogData_bot
}

fragment ChatSubscriptionPaywallModal_bot on Bot {
  ...ChatSubscriptionPaywallMain_bot
}

fragment ChatWelcomeView_ChatWelcomeButton_chat on Chat {
  ...chatHelpers_useSendMessage_chat
}

fragment ChatWelcomeView_chat on Chat {
  ...ChatWelcomeView_ChatWelcomeButton_chat
  defaultBotObject {
    displayName
    id
  }
}

fragment IdAnnotation_node on Node {
  __isNode: __typename
  id
}

fragment IneligibleForWebSubscription_bot on Bot {
  messageLimit {
    numMessagesRemaining
  }
  ...BotImage_bot
  ...MessageLimitInfo_bot
}

fragment MarkdownLinkInner_chat on Chat {
  id
  chatId
  defaultBotObject {
    nickname
    id
  }
  ...chatHelpers_useSendMessage_chat
}

fragment MarkdownLinkInner_edges on MessageEdge {
  node {
    state
    id
  }
}

fragment MarkdownLinkInner_message on Message {
  messageId
}

fragment MessageDeleteConfirmationModal_chat on Chat {
  id
}

fragment MessageFeedbackOtherModal_message on Message {
  id
  messageId
}

fragment MessageFeedbackReasonModal_message on Message {
  id
  messageId
}

fragment MessageLimitInfo_bot on Bot {
  displayName
  messageLimit {
    dailyLimit
    numMessagesRemaining
    shouldShowRemainingMessageCount
    resetTime
  }
  ...BotImage_bot
}

fragment UserHandle_user on PoeUser {
  profilePhotoUrl(size: small)
  fullName
  handle
  ...IdAnnotation_node
}

fragment WebSubscriptionAnnouncementModalOpener_bot on Bot {
  isSystemBot
}

fragment botHelpers_useDeletion_bot on Bot {
  deletionState
}

fragment botHelpers_useViewerCanAccessPrivateBot on Bot {
  isPrivateBot
  viewerIsCreator
}

fragment chatHelpers_isBotMessage on Message {
  ...chatHelpers_isHumanMessage
  ...chatHelpers_isChatBreak
}

fragment chatHelpers_isChatBreak on Message {
  author
}

fragment chatHelpers_isHumanMessage on Message {
  author
}

fragment chatHelpers_useSendChatBreak_chat on Chat {
  id
  chatId
  defaultBotObject {
    nickname
    introduction
    model
    id
  }
  shouldShowDisclaimer
}

fragment chatHelpers_useSendMessage_chat on Chat {
  id
  chatId
  defaultBotObject {
    id
    nickname
  }
  shouldShowDisclaimer
}

fragment chatHelpers_useTimeoutLevel on Message {
  id
  state
  text
  messageId
  author
  chat {
    chatId
    defaultBotNickname
    id
  }
}

fragment chatHelpers_useUpdateStaleChat_chat on Chat {
  chatId
  defaultBotObject {
    contextClearWindowSecs
    id
  }
  ...chatHelpers_useSendChatBreak_chat
}

fragment chatHelpers_useUpdateStaleChat_message on Message {
  creationTime
  ...chatHelpers_isChatBreak
}

fragment subscriptionHelpers_useBotLogData_bot on Bot {
  nickname
  displayName
  messageLimit {
    numMessagesRemaining
  }
}
`},s=T.hashStr(JSON.stringify(o)+this.formkey+e),l={"poe-formkey":this.formkey,"poe-tchannel":this.channel,origin:"https://poe.com","poe-tag-id":s};return(await ne(l,"POST","/api/gql_POST",o).then(u=>u.json())).data.node.chatId}async getpoeChatinfo(e,a,n,r){let o=this.generateRandomString(16),s=this.generateUUID(),l={extensions:{hash:"5fd489242adf25bf399a95c6b16de9665e521b76618a97621167ae5e11e4bce4"},queryName:"chatHelpers_sendMessageMutation_Mutation",variables:{chatId:e,bot:n,query:a,clientNonce:o,source:null,sdid:s,withChatBreak:!1}},c=T.hashStr(JSON.stringify(l)+this.formkey+r),u={"poe-formkey":this.formkey,"poe-tchannel":this.channel,origin:"https://poe.com","poe-tag-id":c};return await ne(u,"POST","/api/gql_POST",l).then(b=>b.json())}async deletePoeMessageById(e,a){let n=W.get("trans-poe-chatId"),r=W.get("trans-poe-cursor"),o=W.get("trans-poe-Id"),s={queryName:"MessageDeleteConfirmationModal_deleteMessageMutation_Mutation",variables:{connections:["client:Q2hhdDo3MDgwNjEx:__ChatMessagesView_chat_messagesConnection_connection"],messageIds:e},query:`mutation MessageDeleteConfirmationModal_deleteMessageMutation_Mutation(
  $messageIds: [BigInt!]!
) {
  messagesDelete(messageIds: $messageIds) {
    edgeIds
  }
}
`},l=T.hashStr(JSON.stringify(s)+this.formkey+a),c={"poe-formkey":this.formkey,"poe-tchannel":this.channel,origin:"https://poe.com","poe-tag-id":l},u=await ne(c,"POST","/api/gql_POST",s).then(y=>y.json())}async getPoeAsw(e){let a=[];Fe=!1;let n=await W.get("tagIdMd5Key")||"WpuLMiXEKKE98j56k",r=async()=>{a.length>0&&(await this.deletePoeMessageById(a,n),a=[])};if(z.get(ae)){let o=await this.getpoeChatinfo(z.get(ae),e.prompt,e.bot,n);if(o.data.messageEdgeCreate.message==null){e.onEvent({type:"error",data:We(De.task.checkremainingdialogues)});return}else a.indexOf(o.data.messageEdgeCreate.message.node.messageId)<0&&(a.push(o.data.messageEdgeCreate.message.node.messageId),r())}else{await this.getAnnotate(n),await this.subscribe(n);let o=await this.getchatId(n);z.set(ae,o);let s=await this.getpoeChatinfo(o,e.prompt,e.bot,n);if(s.data.messageEdgeCreate.message==null){e.onEvent({type:"error",data:We(De.task.checkremainingdialogues)});return}else a.indexOf(s.data.messageEdgeCreate.message.node.messageId)<0&&(a.push(s.data.messageEdgeCreate.message.node.messageId),r());let l="ws://tch"+Math.floor(1e6*Math.random())+1+".tch.poe.com/up/"+this.boxName+"/updates?min_seq="+this.minSeq+"&channel="+this.channel+"&hash="+this.channelHash;(O==null||(O==null?void 0:O.readyState)!==1)&&(O=new WebSocket(l)),O.onopen=function(){chrome.storage.sync.set({wsState:O.readyState})};let c="";O.onmessage=function(u){let y=u.data,b=JSON.parse(y);if(b.messages&&b.messages.length>0){let p=JSON.parse(b.messages[0]).payload.data;if(p.messageAdded){let f=p.messageAdded.text;if(p.messageAdded.state!="complete"){let x=Et(c,f),_="";x.forEach(S=>{S.added&&(_+=S.value)}),c=f,e.onEvent({type:"answer",data:{text:c}})}else Fe||(a.push(p.messageAdded.messageId),r(),e.onEvent({type:"done",data:{text:f}}),Fe=!0)}}},O.onclose=function(){},O.onerror=function(){O.close(),O=new WebSocket(l)}}return{cleanup:r}}};var Go=async(t,e,a,n,r,o)=>{let s=()=>{n&&Ut(e,n,{is_visible:!1})},l={action:"continue",arkose_token:null,conversation_id:n,history_and_training_disabled:!1,model:a,parent_message_id:r};return await Ee("https://chat.openai.com/backend-api/conversation",{method:"POST",signal:t.signal,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(l),onMessage(c){var g,p,f,h,x,_;if(c==="[DONE]"){t.onEvent({type:"done"}),$t(P),s();return}let u;try{u=JSON.parse(c)}catch(S){return}let y=(f=(p=(g=u.message)==null?void 0:g.metadata)==null?void 0:p.finish_details)==null?void 0:f.type,b=o+((_=(x=(h=u.message)==null?void 0:h.content)==null?void 0:x.parts)==null?void 0:_[0]);b&&(P.input=t.prompt,P.conversation_id=u.conversation_id,P.message_id=u.message.id,P.model="text-moderation-playground",t.onEvent({type:"answer",data:{text:b,messageId:u.message.id,conversationId:u.conversation_id}}))}}),{cleanup:s}};var $e,Vo=(a=>(a.ChatGPT="chatgpt",a.GPT3="gpt3",a))(Vo||{});async function Ko(){let{provider:t="chatgpt"}=await U.default.storage.local.get("provider"),e="provider:gpt3",a=await U.default.storage.local.get(e);return{provider:t,configs:{["gpt3"]:a[e]}}}U.default.runtime.onConnect.addListener(t=>{t.name=="GET_INCLUDECHATGPT",t.onMessage.addListener(async e=>{if(e.hosttype=="poe"){$e=t;try{await Zo(t,e.question,e.bot)}catch(a){t.postMessage({error:a.message})}}else e.type=="GET_CHATGPTANSWER"?Jo(t,e.question):e.type==="CREATECHATGPTTAB"?chrome.tabs.create({url:"https://chat.openai.com/",active:!1}):e.type=="ASKCHATGPT"?chrome.tabs.query({},function(a){var n=a.some(function(r){if(r.url.includes("https://chat.openai.com/")){t.postMessage({message:"includechatgpt",tabId:r.id});let o=r.id;return chrome.scripting.executeScript({target:{tabId:r.id},args:[e.question,o],func:(s,l)=>{window.askgpt=function(c){function u(g){if(g=="")return"";let p=document.querySelector("textarea");p.value=g;let f=!1,h=new Event("input",{bubbles:!0,cancelable:!0});document.querySelector("#prompt-textarea").dispatchEvent(h);let x=p.parentNode.querySelector("button");x.disabled=!1;let _=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});x.dispatchEvent(_);let S="";chrome.runtime.onMessage.addListener(function(j,d,m){if(j&&j.type=="conversationend"){let w=document.querySelectorAll('div[class*="markdown"]'),A=w[w.length-1],C=y(A.innerHTML);window.postMessage({msg:C,type:"chantgptconversationend"})}})}function y(g){let p=document.createElement("div");p.innerHTML=g;let f="";return p.querySelectorAll("pre, p").forEach(x=>{if(x.tagName==="PRE")f+=b(x);else if(x.tagName==="P"){let _=x.textContent.trim();f+=_+`
`}}),f}function b(g){let p=g.querySelector("code"),f="";return f=p.textContent.trim(),f}u(c)},window.askgpt(s)}}),!0}});n||t.postMessage({message:"noincludechatgpt"})}):e.type=="ASKPOE"?chrome.tabs.query({},function(a){var n=a.some(function(r){if(r.url.includes("https://poe.com/")){t.postMessage({message:"includepoe",tabId:r.id});let o=r.id;return chrome.scripting.executeScript({target:{tabId:r.id},args:[e.question,o],func:(s,l)=>{function c(u){if(u=="")return"";let y=document.querySelector("textarea");y.value=u;let b=new Event("input",{bubbles:!0,cancelable:!0});y.dispatchEvent(b);let g;if(g=document.querySelector("button[class*='ChatMessageSendButton_sendButton__OMyK1']"),g){g.disabled=!1;let p=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});g.dispatchEvent(p),setTimeout(()=>{y.value="",y.disabled=!0;let f=new Event("input",{bubbles:!0,cancelable:!0});y.dispatchEvent(f),g.disabled=!0},300),window.addEventListener("message",function(f){let h=f.data;if(h.type=="done"){let x=h.data.text;window.postMessage({msg:x,type:"poeconversationend"})}})}}c(s)}}),!0}});n||t.postMessage({message:"noincludechatgpt"})}):e.type=="chantgptconversationend"?chrome.tabs.query({},function(a){var n=a[0];chrome.scripting.executeScript({target:{tabId:n.id},args:[e.msg],func:r=>{function o(){window.postMessage({type:"recivechatgptresult",msg:r})}o()}})}):e.type=="poeconversationend"&&chrome.tabs.query({},function(a){var n=a[0];chrome.scripting.executeScript({target:{tabId:n.id},args:[e.msg],func:r=>{function o(){window.postMessage({type:"recivepoeresult",msg:r})}o()}})})})});async function Jo(t,e){let a=await Ko(),n,r=await Ae();n=new we(r);let o=new AbortController;t.onDisconnect.addListener(()=>{o.abort(),s==null||s()});let{cleanup:s}=await n.generateAnswer({prompt:e,signal:o.signal,onEvent(l){if(l.type==="done"){t.postMessage({event:"DONE"});return}t.postMessage(l.data)}})}U.default.runtime.onMessage.addListener(async t=>{if(t.type==="FEEDBACK"){let e=await Ae();await Gt(e,t.data)}else if(t.type==="OPEN_OPTIONS_PAGE")U.default.runtime.openOptionsPage();else if(t.type==="GET_ACCESS_TOKEN")return Ae()});U.default.runtime.onInstalled.addListener(t=>{t.reason==="install"&&chrome.tabs.create({url:"https://transmate.ai/install-extension-success"})});U.default.tabs.onActivated.addListener(t=>{});async function Zo(t,e,a){let n=await Kt(),r;Vt("formkey",async function(o){o!=null&&o!=null&&(r=new ve(n.channel,o,n.minSeq,n.channelHash,n.boxName),await r.getPoeAsw({prompt:e,bot:a,onEvent(s){if(s.type==="done"){try{$e.postMessage({type:"done",data:{text:s.data}})}catch(l){}return}$e.postMessage(s)}}))})}async function Yo(){let t=await U.default.scripting.getRegisteredContentScripts()}Yo();chrome.tabs.onUpdated.addListener(function(t,e,a){if(a.status==="complete"){try{}catch(n){}Xo(t,e,a)}});async function Xo(t,e,a){chrome.tabs.sendMessage(t,{response:"urlchange"})}var Jt={urls:["<all_urls>"]};chrome.webRequest.onBeforeRequest.addListener(t=>{let{tabId:e}=t;chrome.tabs.sendMessage(e,{details:t}),t.type=="websocket"&&setTimeout(()=>{chrome.tabs.sendMessage(e,{type:"websocket",details:t})},1e3),t.type=="xmlhttprequest"&&t.method=="POST"&&t.url},Jt);chrome.webRequest.onCompleted.addListener(t=>{let{tabId:e}=t;t.type=="xmlhttprequest"&&t.method=="POST"&&t.url==="https://chat.openai.com/backend-api/conversation"&&setTimeout(()=>{chrome.tabs.sendMessage(e,{type:"conversationend",details:t})},1e3)},Jt);})();
