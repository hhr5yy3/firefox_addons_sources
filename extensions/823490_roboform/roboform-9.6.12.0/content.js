// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[854],{70691:function(a,b,c){
var d=c(34476),e=c(60327),f=c(78440),g=c(31173),h=c(97514);(0,f.fI)((0,d.s)((0,e.C)(null,(()=>{(0,
g.Cx)(browser.runtime.getURL("inject.js"),`script-${(0,h.Oz)()}`)}))))},59256:function(a,b,c){c.d(b,{c:function(){return e}})
;var d=c(78440);c(13117);function e(a,b,c){const e=(0,d.f4)(null,c,null),f=`${b}-${e.taskId}`
;return e.onTaskCancel.Add((function(b){a.NotifyBackgroundScript("_Cancel",f,b)})),f}},89100:function(a,b,c){c.d(b,{
Nn:function(){return G},QK:function(){return F},Yk:function(){return r}})
;var d=c(79441),e=c(31173),f=c(85871),g=c(40868),h=c(4153),i=c(13113),j=c(40371),k=c(78440),l=c(12190),m=c(69893),n=c(73863),o=c(13117),p=c(97514),q=c(84224)
;function r(a,b,c,d){const o=a,p=b;let r;const E=c,F=d;let G=!1,H=!1;const I=(0,k.SI)(1e4);let J,K,L=null
;const M=new Map,N=`${s}-${(0,n.Be)()}`,O=new WeakMap;let P=null,Q=null;const R=new WeakMap;let S=!0,T=!1,U=null;const V=new Set
;let W=!1,X=null,Y=null,Z=!1;const aa=new Map;let ab,ac=!1;const ad=new Map;let ae=!1,af=!1,ag=!1
;const ah=new Set,ai=new Set,aj=new Set;let ak=!0;const al=new Map,am=(0,k.AB)(),an=(0,h.y8)(),ao={onKeyDown:(0,j.C1)(),
onMouseDown:(0,j.C1)(),onMouseUp:(0,j.C1)(),onScroll:(0,j.C1)(),onResize:(0,j.C1)(),onMove:(0,j.C1)(),
GetDocumentScreenPos:function(){
const a="mac"===r?1:window.devicePixelRatio||1,b=void 0!==J?J:window.screenX+10,c=void 0!==K?K:window.screenY+50
;return[b,c,b+Math.round(window.innerWidth*a),c+Math.round(window.innerHeight*a)]},IsInpageUIElement:function(a){if(!a)return!1
;if(P){if(a===P.host||O.has(a)||P.contains(a))return!0}else if("string"==typeof a.id&&a.id.startsWith(s))return!0;return!1},
SetUIEventsEnabled:aq,SetAllowToChangeOnPageUIParent:function(a){T=a},SetElementVisibilityCheckApi:function(a){U=a}};return{
Init:async function(){ap(),G=!0,r=(0,e.yY)(),window.addEventListener("mousedown",ar,!0),
window.addEventListener("mouseup",ar,!0),window.addEventListener("click",ar,!0),window.addEventListener("mouseenter",ar,!0),
window.addEventListener("mouseover",ar,!0),window.addEventListener("mousemove",ar,!0),
window.addEventListener("mouseleave",as,!0),window.addEventListener("mouseout",as,!0),
window.addEventListener("touchstart",at,!0),window.addEventListener("touchend",at,!0),window.addEventListener("blur",au,!0),
document.addEventListener("keydown",az,{passive:!0,capture:!0}),document.addEventListener("mousedown",aA,{passive:!0,capture:!0
}),document.addEventListener("mouseup",aB,{passive:!0,capture:!0}),await(0,e.eA)(),window.addEventListener("scroll",aD,{
passive:!0,capture:!0}),window.addEventListener("resize",aF,{passive:!0,capture:!0}),window.addEventListener("pagehide",aG),
document.documentElement&&document.documentElement.addEventListener("mouseenter",aH,{passive:!0,capture:!0})},UnInit:ap,
HandleBackgroundGone:function(){ap(),o.onBackgroundGone.HaveHandlers()&&!L&&(L=setTimeout((()=>{
L&&o.onBackgroundGone.HaveHandlers()&&(0,k.uT)(o.onBackgroundGone.CallAll(),"Content:onBackgroundGone")}),0))},
HandleInternalMessage:function(a,...b){switch(a){case"_CreateInpageUI":return async function(a){return aJ(),aI(a,!0)}(b[0])
;case"_UpdateAllInpageUI":return async function(a){aJ();const b=new Set(M.keys()),c={};for(const f of a){const a=f.key
;b.delete(a);try{const b=await aI(f,f.create||!1);b&&(c[a]=b)}catch(e){}}for(const f of b.keys())aQ(f,!1,null)
;const d=document.querySelectorAll("."+s);if(d)for(let f=0;f<d.length;f++){const a=d[f];O.has(a)||a.remove()}return c}(b[0])
;case"_CloseInpageUI":return async function(a){const b=a&&a.key&&"*"!==a.key&&a.key||null;if(b)aQ(b,!1,null);else{
const b=a&&a.groupId;if(b)for(const[a,c]of M)c.m_options.groupId===b&&aQ(a,!1,null);else{for(const a of M.keys())aQ(a,!1,null)
;M.clear()}}}(b[0]);case"_UpdateInpageUIElement":return async function(a,b){const c=M.get(a);if(c){
const e=c.m_container_id,f=P&&P.getElementById(e);if(f){const g=R.get(f);if(aW(f,c.m_options,!!g&&g.m_moved,b),
void 0!==b.className&&(f.className=b.className,f.classList.add(v)),b.content&&Q)for(const h of b.content){
const i=h.sel.replace(/__id__/g,e),j=Q.querySelectorAll(i);for(let l=0;l<j.length;l++){const n=j[l]
;if(h.props)for(const p in h.props){const q=h.props[p],[r,s]=p.split(":");try{switch(r){case"class":case"className":
case"classList":switch(s){case"add":n.classList.add(q);break;case"remove":n.classList.remove(q);break;case"toggle":
n.classList.toggle(q);break;default:n.className=q}break;case"canvas":if("draw"===s){const u=q;if(u){const w=n;(0,
k.fI)(aO(u,w,null))}}break;case"forceUpdateLayout":await(0,k.xy)(0),aV(n);break;default:switch(s){case"set":if(!t(r))throw(0,
m.ZU)(m.wg,"Internal error");n.setAttribute(r,q);break;case"remove":n.removeAttribute(r);break;default:if("string"==typeof r){
if(!t(r))throw(0,m.ZU)(m.wg,"Internal error");n[r]=q}}}function t(a){return!a.startsWith("on")&&!a.startsWith("src")}}catch(d){}
}const o=h.image;o&&aN(n,o)}}}}}(b[0],b[1]);case"_WebPageTabActivated":return async function(){}();case"_ScrollWindow":
return async function(a){window.scrollTo((0,h.TT)(a.x),(0,h.TT)(a.y))}(b[0]);case"_SendHttpRequest":return async function(a){
return F.SendHttpRequest(a,null)}(b[0]);default:return null}},api:ao};function ap(){if(G){G=!1,am.CancelAllWaitingCallers(),
I.Cancel();try{window.removeEventListener("mousedown",ar,!0)}catch(a){}try{window.removeEventListener("mouseup",ar,!0)
}catch(a){}try{window.removeEventListener("click",ar,!0)}catch(a){}try{window.removeEventListener("mouseenter",ar,!0)}catch(a){}
try{window.removeEventListener("mouseover",ar,!0)}catch(a){}try{window.removeEventListener("mousemove",ar,!0)}catch(a){}try{
window.removeEventListener("mouseleave",as,!0)}catch(a){}try{window.removeEventListener("mouseout",as,!0)}catch(a){}try{
window.removeEventListener("touchstart",at,!0)}catch(a){}try{window.removeEventListener("touchend",at,!0)}catch(a){}try{
window.removeEventListener("blur",au,!0)}catch(a){}try{window.removeEventListener("scroll",aD,!0)}catch(a){}try{
window.removeEventListener("resize",aF,!0)}catch(a){}try{window.addEventListener("pagehide",aG,!0)}catch(a){}try{
document.removeEventListener("keydown",az,!0)}catch(a){}try{document.removeEventListener("mousedown",aA,!0)}catch(a){}try{
document.removeEventListener("mouseup",aB,!0)}catch(a){}try{
document.documentElement&&document.documentElement.removeEventListener("mouseenter",aH,!0)}catch(a){}aU(),L&&(clearTimeout(L),
L=null)}}function aq(a){S=a}function ar(a){
0===V.size&&a.isTrusted&&a.composed&&(H||av(a)||ao.IsInpageUIElement(a.target)&&(ab=a.timeStamp,ay(a)))}function as(a){
0===V.size&&a.isTrusted&&(H||av(a)||(ao.IsInpageUIElement(a.target)?ay(a):ao.IsInpageUIElement(a.relatedTarget)&&(a.preventDefault(),
a.stopImmediatePropagation())))}function at(a){
0===V.size&&a.isTrusted&&a.composed&&(H||(a.touches.length>0&&(ao.IsInpageUIElement(a.target)||(af=!0)),
a.touches.length>1&&(ae=!0,aE()),ao.IsInpageUIElement(a.target)&&(a.stopImmediatePropagation(),
"touchend"===a.type&&ae&&a.preventDefault),0===a.touches.length&&(af=!1,ag&&(ag=!1,(0,k.fI)(ao.onScroll.CallAll(a))),ae&&(ae=!1,
(0,k.fI)(ao.onResize.CallAll(a))))))}function au(a){if(0!==V.size)return;if(!a.isTrusted)return;if(!a.composed)return
;void 0!==ab&&a.timeStamp-ab<50&&!ao.IsInpageUIElement(a.target)&&(a.stopImmediatePropagation(),a.preventDefault())}
function av(a){const b=ac,c=aa.get(a.type);if(c)for(const e of c)try{if(e(a))return!0}catch(d){}return!!b&&(a.preventDefault(),
a.stopImmediatePropagation(),!0)}function aw(a,b){const c=aa.get(a);c?c.add(b):aa.set(a,new Set([b]))}function ax(a,b){
const c=aa.get(a);c&&c.delete(b)}function ay(a){var b,c,d,e;const f=document.querySelector("#"+N);if(!f)return
;if(a.target!==f)return;const g=O.get(f);if(!g)return;if(g.m_root!==P)return;if(aL(f,g))return void aM()
;const h=null===(c=(b=P).elementFromPoint)||void 0===c?void 0:c.call(b,a.clientX,a.clientY);if(!h)return
;if(h!==P.host&&!P.contains(h))return;let i=ad.get(a.type);i||ad.set(a.type,i=new WeakMap);const j=i.get(h)
;if(void 0!==j&&j===a.timeStamp)return void a.stopImmediatePropagation();i.set(h,a.timeStamp),
X="input"===(null===(e=null===(d=h.tagName)||void 0===d?void 0:d.toLowerCase)||void 0===e?void 0:e.call(d))&&"checkbox"===h.type?h:null
;const k=function(a,b){return new MouseEvent(a,{bubbles:!0,composed:!1,cancelable:!0,relatedTarget:b.relatedTarget,
clientX:b.clientX,clientY:b.clientY,button:b.button,buttons:b.buttons,altKey:b.altKey,ctrlKey:b.ctrlKey,shiftKey:b.shiftKey})
}(a.type,a);W=!1,Y=null,Z=!1,V.add(k);try{h.dispatchEvent(k)||a.preventDefault();const b=Y;if(b){const a=Z;setTimeout((()=>{
b.checked=a}),0)}W&&a.preventDefault()}finally{V.delete(k),W=!1,Y=null,Z=!1}a.stopImmediatePropagation(),
"mousedown"===a.type&&aC()}function az(a){
a.isTrusted&&aC(),H||S&&(a.isTrusted&&(a.altKey||a.ctrlKey)&&o.NotifyBackgroundScript("_OnKeyDown",{key:a.key,code:a.code,
keyCode:a.keyCode,altKey:a.altKey,ctrlKey:a.ctrlKey,shiftKey:a.shiftKey
}),(0,k.uT)(ao.onKeyDown.CallAll(a),"Content:_OnKeyDown"))}function aA(a){S&&(0,
k.uT)(ao.onMouseDown.CallAll(a),"Content:_OnMouseDown")}function aB(a){a.isTrusted&&aC(),
H||S&&(a.isTrusted&&o.NotifyBackgroundScript("_OnMouseUp",{clientX:a.clientX,clientY:a.clientY,button:a.button,altKey:a.altKey,
ctrlKey:a.ctrlKey,shiftKey:a.shiftKey}),(0,k.uT)(ao.onMouseUp.CallAll(a),"Content:_OnMouseUp"))}function aC(){
I.Start((async()=>{o.NotifyBackgroundScript("_UserActivity")}))}function aD(a){try{const b=a.target
;if("marquee"===(b&&b.tagName&&b.tagName.toLowerCase&&b.tagName.toLowerCase()))return;aE(),(0,
k.uT)(ao.onScroll.CallAll(a),"Content:_OnScroll")}catch(b){}}function aE(){for(const a of ah)aQ(a,!0,null);ah.clear(),
af&&(ag=!0)}function aF(a){try{aE(),(0,k.uT)(ao.onResize.CallAll(a),"Content:_OnResize")}catch(b){}}function aG(a){aU()}
function aH(a){try{if(a.target!==document.documentElement)return
;const b="mac"===r?1:window.devicePixelRatio||1,c=Math.round(a.screenX-a.clientX*b),d=Math.round(a.screenY-a.clientY*b)
;c===J&&d===K||(J=c,K=d,(0,k.uT)(ao.onMove.CallAll(a),"Content:_OnMouseEnter"))}catch(b){}}async function aI(a,b){var c
;if(H)return null;const d=a.tabId,g=a.key,j=a.options,m=function(a){try{if(a.querySelector(":modal")){
const b=a.querySelectorAll(":modal");if(1===b.length)return b[0]}}catch(b){}return null}(document)||document.body
;let o=null,q=null,C=document.querySelector("#"+N);if(C){const a=O.get(C);if(a){if(aL(C,a))return aM(),null
;const b=a.m_root.querySelector("."+t)
;b?(C.parentNode!==m&&(T||m===document.body&&"body-append-el"===(null===(c=C.parentElement)||void 0===c?void 0:c.id)&&m.contains(C.parentElement)||(C.remove(),
m.appendChild(C)),O.set(C,{m_root:a.m_root,m_parent:m})),q=b,o=a.m_root):(O.delete(C),C.remove(),C=null)}else C.remove()}
if(!C||!o||!q){C=document.createElement("div"),C.setAttribute("style",A),C.id=N,C.classList.add(s),o=C.attachShadow({
mode:"closed"});for(const b of y)o.addEventListener(b,a0,!1);{const a=document.createElement("div");a.setAttribute("style",A),
a.classList.add(t),e.Pl.forEach((b=>{const c="platform-"+b;b===r?a.classList.add(c):a.classList.remove(c)})),
a.oncontextmenu=()=>!1,q=a}o.appendChild(q),m.appendChild(C);const a={m_root:o,m_parent:m};if(O.set(C,a),aL(C,a))return aM(),
null}const F=(0,h.TT)(o),G=(0,h.TT)(q);P=F,Q=G;const I=j.cssUrl;if(I)for(const f of I){const a=f.replace(/[:/.?=+&;#]/g,"-")
;await(0,k.Hv)(am,(async()=>{var b;if(!F.querySelector("#"+a)){let c=null,d=al.get(f);if(ak){if(!d){
const a=await E.GetTextResources([f]);for(const c of a){al.set(f,d={m_css_text:null!==(b=c[1])&&void 0!==b?b:"",
m_inject_svg_images:new Map});break}}if(d){const b=document.createElement("style");b.setAttribute("id",a),b.type="text/css",
b.appendChild(document.createTextNode(d.m_css_text)),F.appendChild(b),c=b.sheet,c||(ak=!1,F.removeChild(b))}}if(!c){
const b=document.createElement("link");b.setAttribute("id",a),b.setAttribute("rel","stylesheet");const d=(0,h.TT)((0,
i.vN)(f)).m_schema?f:p.GetExtensionFileUrl(f);b.setAttribute("href",d),F.appendChild(b),await(0,e.B9)(b,null),c=b.sheet}if(c){
d||al.set(f,d={m_css_text:"",m_inject_svg_images:new Map});const a=new Map;for(let b=0;b<c.cssRules.length;b++){
const d=c.cssRules.item(b),e=null==d?void 0:d.style;if(e){const b=e.backgroundImage;if(b){const c=B.exec(b);if(c){let b=c[1]
;if(b.startsWith(location.origin)){
const a=location.pathname.substring(0,location.pathname.lastIndexOf("/")+1),c=location.origin+a
;b.startsWith(c)&&(b=b.substring(c.length))}if(null==b?void 0:b.endsWith(".svg")){e.backgroundImage="none"
;const c=d.selectorText,f=a.get(b);f?f.add(c):a.set(b,new Set([c]))}}}}}if(0!==a.size){
const b=await E.GetTextResources([...a.keys()]);for(const[c,e]of b){const b=a.get(c)
;if(b)for(const a of b)d.m_inject_svg_images.set(a,e)}}}}}),null)}return function(a,b,c,d){var e,g,i;let j,k,m=M.get(b)
;if(m)j=(0,h.TT)(Q).querySelector("#"+m.m_container_id),j&&m.m_key===b&&(0,h.XM)(m.m_options,d)?k=!1:(k=!0,m.m_key=b,
m.m_options=d);else{if(!c&&d.temporary)return null;j=null,k=!0,m={m_key:b,m_options:d,m_tab_id:a,m_container_id:`${N}-${(0,
n.Be)()}`,m_parent:null,m_parent_hide_on_scroll:!1,m_children:new Set,m_modal_children:new Set},M.set(b,m)}
const o=m.m_container_id,p=d.templateHtml.replace(/__id__/g,o);let q,r,s,t=j&&R.get(j);if(t&&j)p===t.m_html?r=!1:(r=!0,D(j,p)),
s=!(0,h.XM)(null!==(e=d.images)&&void 0!==e?e:[],t.m_images),q=j;else{j&&j.parentNode&&j.parentNode.removeChild(j),j=null,r=!0,
s=!0;const a=document.createElement("div");a.id=o,D(a,p),a.style.visibility="visible",a.style.position="fixed",
a.style.overflow="visible",a.style.height="auto",a.style.width="auto",a.draggable=!1,a.classList.add(v),q=a}if(r){
const a=d.cssUrl;if(a)for(const b of a){const a=al.get(b);if(a)for(const[b,c]of a.m_inject_svg_images)try{
const a=q.querySelectorAll(b);for(let b=0;b<a.length;b++){const d=a[b];D(d,(0,h.f$)(c,(()=>`svg-id-${an.GetNext()}`))),
d.style.backgroundImage="none",d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center"}}catch(A){}}}
if(r||s){const a=q.querySelectorAll(".inpage-ui-image-placeholder");if(0!==a.length&&d.images){const b=new Map(d.images)
;for(let c=0;c<a.length;c++){const d=a[c],e=d.id,f=b.get(e);f&&aN(d,f)}}}
if(q.style.pointerEvents=d.noPointerEvents?"none":"auto",q.style.zIndex=d.zIndex||"4000",t){if((r||k)&&0!==t.m_handlers.size){
for(const[a,b]of t.m_handlers)b.m_target.removeEventListener(b.m_type,a,b.m_capture);t.m_handlers.clear()}r&&(t.m_html=p),
s&&(t.m_images=null!==(g=d.images)&&void 0!==g?g:[])}else t={m_html:p,m_images:null!==(i=d.images)&&void 0!==i?i:[],m_moved:!1,
m_handlers:new Map};const y=(0,h.TT)(t);if(aW(q,d,y.m_moved),r||k){const c=d.messages||[{id:"close",type:"click",custom:"close"
}];for(const d of c){const c=d.id.includes("__id__")?d.id.replace(/__id__/g,o):o+d.id,e=q.querySelector("#"+c);if(e){let c,f
;"close"===d.id&&"click"===d.type?(c=c=>{if(!c.isTrusted&&0===V.size)return;if(!M.has(b))return;aZ(c)
;const f=e.getBoundingClientRect();aQ(b,!1,c),aX(a,b,d,c,f,o)},f="click"):(c=c=>{if(!c.isTrusted&&0===V.size)return
;const f=M.get(b);if(!f)return;if(H)return;if(aK())return void aM();if(0!==V.size&&!V.has(c)){
if(X&&("input"===c.type||"change"===c.type)&&c.currentTarget){const a=c.currentTarget;if("checkbox"===a.type)Y=a,Z=!a.checked,
a.checked=Z}W=!0}const g=e.getBoundingClientRect();if("click"===c.type){if((0,l.X4)(g)&&"close"!==d.id)return;const a=c
;for(const b of f.m_modal_children){const d=M.get(b);if(!d)continue;if(aR(d.m_container_id)&&(d.m_options.dockToRect&&(0,
l.CG)(d.m_options.dockToRect,a.clientX,a.clientY)))return void(d.m_options.autoClose&&aQ(b,!0,c))}}else if(ac)return
;aX(a,b,d,c,g,o)},f=d.type||"click"),e.addEventListener(f,c,!1),y.m_handlers.set(c,{m_target:e,m_type:f,m_capture:!1,m_data:d})}
}}if(!r)for(const f of y.m_handlers.values())if("input"===f.m_type){const c=f.m_target;if("input"===c.tagName.toLowerCase()){
const d=c;switch(d.type){case"checkbox":d.checked!==d.defaultChecked&&aY(a,b,f.m_data,o,d);break;case"radio":
d.checked!==d.defaultChecked&&d.checked&&aY(a,b,f.m_data,o,d)}}}if(d.url&&r){
const c=o+"frame",e=q.querySelector("#"+c)||q.querySelector("iframe");if(e){let c=d.url+"?ui-key="+b+"|"+a;0,e.src=c,
q.style.visibility="hidden"}}j||(0,h.TT)(Q).appendChild(q);(d.hideOnScroll||m.m_parent_hide_on_scroll)&&ah.add(b);if(d.parent){
const a=M.get(d.parent);if(a){const c=aR(a.m_container_id);if(c&&(m.m_parent=d.parent,a.m_children.add(b),
m.m_parent_hide_on_scroll=a.m_options.hideOnScroll||a.m_parent_hide_on_scroll||!1,m.m_parent_hide_on_scroll&&ah.add(b),
d.modal)){q.classList.add(w),a.m_modal_children.add(b),Q&&!Q.classList.contains(u)&&Q.classList.add(u),aj.add(b),
c.classList.add(x);const e=d.modalParentClassNames;e&&aP(c,a.m_container_id,e,!0)}}}d.autoClose&&(ai.add(b),
1===ai.size&&function(){for(const a of z)aw(a,aT)}());if(R.set(q,y),!1!==d.draggable&&!j){
const a=q.querySelector("iframe"),b=new WeakMap;(0,f.R)(q,{IsTrusted:a=>V.has(a),OnStarted:()=>{a&&(a.style.zIndex="-1"),ac=!0,
y.m_moved=!0},OnStopped:()=>{a&&(a.style.zIndex=""),ac=!1}},{addEventListener:(a,c,d)=>{if(c)if(d){function e(a){var b
;const d=ac;return(null!==(b=c.handleEvent)&&void 0!==b?b:c)(a),!!d&&(a.preventDefault(),a.stopImmediatePropagation(),!0)}
aw(a,e),b.set(c,e)}else window.addEventListener(a,c,d)},removeEventListener:(a,c,d)=>{if(c)if(d){const d=b.get(c);d&&ax(a,d)
}else window.removeEventListener(a,c,d)},dispatchEvent:a=>!0})}return o}(d,g,b,j)}function aJ(){if(!document.body)throw(0,
m.ZU)(m.V2,"Can not show in-page UI on this page");if("frameset"===document.body.tagName.toLowerCase())throw(0,
m.ZU)(m.V2,"Can not show in-page UI on this page");if(ae||ag)throw(0,m.ZU)(m.V2,"Can not show in-page UI during scroll/zooom")}
function aK(){if(H)return!0;const a=document.querySelector("#"+N);if(a){const b=O.get(a);if(b&&aL(a,b))return!0}return!1}
function aL(a,b){const c=a.parentElement;if(!c)return!1;if(T){if(c!==b.m_parent&&!b.m_parent.contains(c))return!0
}else if(c!==b.m_parent){if(b.m_parent!==document.body||"body-append-el"!==c.id||!b.m_parent.contains(c))return!0
;if(!(null==U?void 0:U.IsElementVisibleByOpacity(c,window)))return!0}const d=window.getComputedStyle(a)
;return parseFloat(d.opacity)<.7||"2147483647"!==d.zIndex}function aM(){H||(H=!0,aq(!1))}function aN(a,b){var c,d
;if(b.m_pixels_base64){let d;"CANVAS"===a.tagName?d=a:(d=document.createElement("canvas"),d.setAttribute("width","16"),
d.setAttribute("height","16"),null===(c=a.parentElement)||void 0===c||c.replaceChild(d,a)),(0,k.fI)(async function(a,b){if(b){
const c=(0,g.fI)(b),d=a.getContext("2d");if(d){const b=d.createImageData(a.width,a.height);c.forEach(((a,c)=>b.data[c]=a)),
d.putImageData(b,0,0)}}}(d,b.m_pixels_base64))}else if(b.m_data_url){const c=document.createElementNS(C,"svg")
;c.setAttribute("width","16"),c.setAttribute("height","16"),c.setAttribute("viewBox","0 0 16 16"),c.setAttribute("fill","none")
;const e=document.createElementNS(C,"image");e.setAttribute("href",b.m_data_url),c.appendChild(e),
null===(d=a.parentElement)||void 0===d||d.replaceChild(c,a)}else b.m_svg&&D(a,b.m_svg)}async function aO(a,b,c){const d=await(0,
e.GG)(a,c);b.setAttribute("width","16"),b.setAttribute("height","16");const f=b.getContext("2d");f&&f.drawImage(d,0,0,16,16)}
function aP(a,b,c,d){for(const e of c){let c,f=e;const g=e.indexOf(":");if(g>=0&&(f=e.substring(0,g),
c=e.substring(g+1).replace(/__id__/g,b)),!f)continue;const h=c?a.querySelector(c):a
;h&&(d?h.classList.add(f):h.classList.remove(f))}}function aQ(a,b,c){const d=M.get(a);if(!d)return;M.delete(a),ah.delete(a),
ai.delete(a)&&0===ai.size&&aS();const e=d.m_container_id,f=aR(e);let g=null;if(f){if(f.classList.remove(w),
g=f.getBoundingClientRect(),f.parentNode)try{f.parentNode.removeChild(f)}catch(h){}const a=R.get(f);if(a){
for(const[b,c]of a.m_handlers)c.m_target.removeEventListener(c.m_type,b,c.m_capture);a.m_handlers.clear()}}if(d.m_parent){
const b=M.get(d.m_parent);if(b&&(b.m_children.delete(a),b.m_modal_children.delete(a)&&0===b.m_modal_children.size)){
const a=aR(b.m_container_id);if(a){a.classList.remove(x);const c=d.m_options.modalParentClassNames
;c&&aP(a,b.m_container_id,c,!1)}}}if(0!==d.m_children.size){for(const a of d.m_children)aQ(a,b,c);d.m_children.clear(),
d.m_modal_children.clear()}0!==aj.size&&(aj.delete(a),0===aj.size&&Q&&Q.classList.remove(u)),f&&b&&aX(d.m_tab_id,a,{id:"cancel"
},c,g,e)}function aR(a){return Q?Q.querySelector("#"+a):null}function aS(){for(const a of z)ax(a,aT)}function aT(a){
return function(a){if(!a.isTrusted)return;if(0===ai.size)return;switch(a.type){case"click":{const b=a;for(const c of ai){
const d=M.get(c);if(!d)continue;const e=aR(d.m_container_id);if(!e)continue;const f=e.getBoundingClientRect();if(!(0,l.X4)(f)){
if((0,l.TA)(f,b.clientX,b.clientY))continue
;if(d.m_options.dockToRect&&(0,l.CG)(d.m_options.dockToRect,b.clientX,b.clientY))continue}aQ(c,!0,a)}}break;case"focus":
case"wheel":b();break;case"keyup":if(a.key===q.U.Escape)b()}return;function b(){for(const b of ai){const c=M.get(b)
;if(!c)continue;aR(c.m_container_id)&&aQ(b,!0,a)}}}(a),!1}function aU(){try{if(M.clear(),ah.clear(),0!==ai.size&&(aS(),
ai.clear()),aj.clear(),Q){for(;Q.lastChild;)Q.removeChild(Q.lastChild);Q.classList.remove(u)}}catch(a){}}function aV(a){
const b=a.style.height,c=""===b?"auto":"";a.style.height=c,a.style.height=b}function aW(a,b,c,d){let f=!1
;""===a.style.left&&""===a.style.right&&(void 0!==b.left&&(f=!0),void 0!==b.right&&(f=!0),
void 0===b.left&&void 0===b.right&&void 0!==b.width&&(a.style.left=`max(0px, (${(0,e.Md)(window.innerWidth)} - ${(0,
e.Md)(b.width)}) / 2)`,f=!0),void 0!==b.minWidth&&(f=!0),void 0!==b.maxWidth&&(f=!0)),void 0!==b.minWidth&&(a.style.minWidth=(0,
e.Md)(b.minWidth)),void 0!==b.maxWidth&&(a.style.maxWidth=(0,e.Md)(b.maxWidth));let g,h=!1
;if(""===a.style.top&&""===a.style.bottom&&(void 0!==b.top&&(h=!0),void 0!==b.bottom&&(h=!0),
void 0===b.top&&void 0===b.bottom&&void 0!==b.height&&(a.style.top=`max(0px, (${(0,e.Md)(window.innerHeight)} - ${(0,
e.Md)(b.height)}) /2)`,h=!0),void 0!==b.minHeight&&(h=!0),void 0!==b.maxHeight&&(h=!0)),
void 0!==b.minHeight&&(a.style.minHeight=(0,e.Md)(b.minHeight)),void 0!==b.maxHeight){const c=(0,e.Md)(b.maxHeight)
;a.style.maxHeight=c;const d=a.querySelector(".set-max-height");d&&(d.style.maxHeight=c)}
if(!f&&c||(void 0!==b.left&&(a.style.left=(0,e.Md)(b.left)),void 0!==b.right&&(a.style.right=(0,e.Md)(b.right))),
!h&&c||(void 0!==b.top&&(a.style.top=(0,e.Md)(b.top)),void 0!==b.bottom&&(a.style.bottom=(0,e.Md)(b.bottom))),b.url){
const b=a.id+"frame";g=a.querySelector("#"+b)||a.querySelector("iframe")}if(g){let c=!1
;d&&(void 0!==d.contentWidth?(g.style.width=(0,e.Md)(d.contentWidth),void 0!==d.width?a.style.width=(0,
e.Md)(d.width):a.style.width="auto",c=!0):void 0!==d.width&&(g.style.width=(0,e.Md)(d.width),a.style.width="auto",c=!0)),
!c&&f&&(void 0!==b.width?a.style.width=(0,e.Md)(b.width):void 0===b.minWidth&&void 0===b.maxWidth||(a.style.width="auto"),
g.style.width="100%");let i=!1;d&&(void 0!==d.contentHeight?(g.style.height=(0,e.Md)(d.contentHeight),
void 0!==d.height?a.style.height=(0,e.Md)(d.height):a.style.height="auto",i=!0):void 0!==d.height&&(g.style.height=(0,
e.Md)(d.height),a.style.height="auto",i=!0)),!i&&h&&(void 0!==b.height?a.style.height=(0,
e.Md)(b.height):void 0===b.minHeight&&void 0===b.maxHeight||(a.style.height="auto"),g.style.height="100%")}else{let c=!1
;d&&void 0!==d.width&&(a.style.width=(0,e.Md)(d.width),c=!0),!c&&f&&(void 0!==b.width?a.style.width=(0,
e.Md)(b.width):void 0===b.minWidth&&void 0===b.maxWidth||(a.style.width="auto"));let g=!1
;d&&void 0!==d.height&&(a.style.height=(0,e.Md)(d.height),g=!0),!g&&h&&(void 0!==b.height?a.style.height=(0,
e.Md)(b.height):void 0===b.minHeight&&void 0===b.maxHeight||(a.style.height="auto"))}
d&&void 0!==d.visible&&(!0===d.visible?a.style.visibility="visible":!1===d.visible&&(a.style.visibility="hidden"))}
function aX(a,b,c,d,f,g){const h={tabId:a,key:b,data:c,event:d&&(0,e.V6)(d)||void 0};if(f&&!(0,l.X4)(f)&&(h.pos=(0,l.gv)(f)),
d&&("input"===d.type||"change"===d.type)&&d.currentTarget){const a=d.currentTarget
;"checkbox"!==a.type&&"radio"!==a.type||(h.checked=a.checked||!1)}o.NotifyBackgroundScript("_NotifyInpageUI",h,g)}
function aY(a,b,c,d,e){const f={tabId:a,key:b,data:c};switch(e.type){case"checkbox":case"radio":f.checked=e.checked||!1}
o.NotifyBackgroundScript("_NotifyInpageUI",f,d)}function aZ(a){try{a.preventDefault()}catch(b){}try{a.stopPropagation()
}catch(b){}}function a0(a){let b=!1;const c=a.target;if(function(a){if(a&&void 0!==a.tagName)return!0;return!1}(c)){
if("a"===c.tagName.toLowerCase())b=!0}if(b)try{a.preventDefault()}catch(d){}try{a.stopPropagation()}catch(d){}}}const s="z"+(0,
p.Oz)(),t="inpage-ui-top",u="modal-ui-shown",v="inpage-ui-el",w="modal-ui",x="have-modal-child",y=["mousedown","mouseup","mousemove","click","keydown","keyup","keypressed"],z=["click","wheel","focus","keyup","touchend"],A='all: initial;-webkit-user-select: none !important;-moz-user-select: none !important;-ms-user-select: none !important;user-select: none !important;cursor: default !important;margin: 0px !important;padding: 0px !important;border: 0px !important;overflow: visible !important;visibility: visible;display: block !important;position: fixed !important;float: none !important;clear: none !important;line-height: normal !important;z-index: 2147483647 !important;opacity: 1 !important;width: 0px !important;height: 0px !important;font-family: "Segoe UI", "Helvetica Neue", sans-serif !important;font-size: 15px !important;font-weight: normal !important;color: black !important;background-color: transparent !important;text-align: left !important;',B=/url\(["']?([^"')]*)["']?\)/,C="http://www.w3.org/2000/svg"
;function D(a,b){if(!E)try{return void(a.innerHTML=b)}catch(c){if(null===E)throw c;const a=window.trustedTypes
;if(!a)throw E=null,c;try{const b=(0,n.Be)();E=a.createPolicy(b,{createHTML:a=>a})}catch(c){throw E=null,c}}
a.innerHTML=E.createHTML(b)}let E;function F(a){const b=a;return{Init:function(){},UnInit:function(){},
GetTextResources:async function(a){return b.CallBackgroundScript("_GetResources",null,a)}}}function G(a){const b=a
;let c,e,f,g=!1,i=!1;const j=(0,h.y8)();return{Init:function(){l(),g=!0,document.addEventListener(d.pP,n,!1)},UnInit:l,
HandleInternalMessage:function(a,...b){switch(a){case"_NotifyWebPages":return async function(a){if(!i)return;q({
notification:a||!0})}(b[0]);case"_BackgroundReloaded":return async function(){const a=new CustomEvent(d.YA,{detail:""})
;document.dispatchEvent(a)}();default:return null}}};function l(){g&&document.removeEventListener(d.pP,n,!1)}function n(){
if(i)return;i=!0,f=(0,h.bf)(Math.random());const a=(0,h.bf)(Date.now()+Math.random());e="to-"+a,c="from-"+a,
document.addEventListener(c,p,!1);const b=`attr${Math.random()}`,g=document.createElement("script")
;g.id=`script${Math.random()}`,
g.textContent=`(function(){\n            if(typeof(window["${d.K2}"])!=="undefined"){return;}\n            window["${d.ti}"]( { secret:"${f}", domEventName:"${a}", version:2 });\n            document.getElementById("${g.id}").setAttribute("${b}", "1");\n        })();`
;const j=document.head||document.documentElement;j.appendChild(g),j.removeChild(g),"1"===g.getAttribute(b)||((0,
o.Rm)("!!! Disable connection with webpage"),document.removeEventListener(c,p)),document.removeEventListener(d.pP,n,!1)}
function p(a){if("string"!=typeof a.detail)return;const c=JSON.parse(a.detail);if("object"!=typeof c)return;const d=c.callbackId
;if(!d)return;if(c.secret!==f)return;const e=c.progressId;if(!g)return q({callback:{id:d,error:(0,
m.ZU)(m.yI,"background is disconnected")}});const h={fromWebPage:!0,toBackground:!0,name:c.name,args:c.args,progressId:e}
;j.GetNext();(0,k.fI)((async()=>{try{const a=await b.SendInternalMessageToBackgroundScript(h);q({callback:{id:d,response:a}})
}catch(a){q({callback:{id:d,error:a}})}})())}function q(a){const b=new CustomEvent(e,{detail:JSON.stringify(a)})
;document.dispatchEvent(b)}}},97864:function(a,b,c){function d(a){const b=a,c=new Map;return{Init:function(){c.clear()},
GetTextResources:async function(a){const d=[],e=[];for(const b of a){const a=c.get(b);void 0!==a?d.push([b,a]):e.push(b)}
if(0!==e.length){const a=await b.GetTextResources(e);d.push(...a)}return d}}}c.d(b,{e:function(){return d}})},
48106:function(a,b,c){c.d(b,{z:function(){return f}});var d=c(40371),e=(c(13117),c(97514));function f(){let a=!1;const b=`${(0,
e.Oz)()}-shadow-0`,c=`${(0,e.Oz)()}-shadow-1`,f={Init:function(){g(),window.addEventListener(c,h),a=!0},UnInit:g,
Start:function(){window.dispatchEvent(new CustomEvent(b,{}))},onFoundShadowDOMRoot:(0,d.dU)()};return f;function g(){if(a){a=!1,
f.onFoundShadowDOMRoot.RemoveAll();try{window.removeEventListener(c,h)}catch(b){}}}function h(a){const b=a.relatedTarget
;f.onFoundShadowDOMRoot.CallAllSync(b)}}},60327:function(a,b,c){c.d(b,{C:function(){return q}})
;var d=c(5971),e=c(88523),f=c(95250),g=c(89100),h=c(59256),i=c(75568),j=c(97864),k=c(46947),l=c(45637),m=c(40371),n=c(78440),o=c(69893),p=c(4153)
;c(13117);function q(a,b){const c=a||(0,d.pW)(),q={CallBackgroundScript:async function(a,b,...c){let d;b&&(d=(0,
h.c)(y,null!=w?w:"",b));const e={toBackground:!0,fromContent:!0,name:a,args:c,progressId:d};return await A(e)},
onCallFromBackgroundScript:(0,n.Ol)(),NotifyBackgroundScript:function(a,...b){const d={toBackground:!0,fromContent:!0,name:a,
args:b};try{c.runtime.sendMessage(d)}catch(e){
(0,o.n4)(e)&&(e.message.indexOf("Invocation of form runtime.connect")>=0||e.message.indexOf("context invalidated")>=0)&&t.HandleBackgroundGone()
}},onBackgroundGone:(0,m.C1)()},r={SendInternalMessageToBackgroundScript:A},s=(0,i.X)(q),t=(0,g.Yk)(q,(0,f.EI)(c),(0,j.e)((0,
g.QK)(q)),(0,k.p)()),u=(0,g.Nn)(r),v=(0,e.F)(c);let w,x=!1;const y=Object.assign(Object.assign(Object.assign({
Init:async function(){z(),await t.Init(),u.Init(),b(),s.Init(),c.runtime.onMessage.addListener(B),!1;x=!0},UnInit:z},q),t.api),{
storage:v,sessionStorage:(0,l.XG)()});return y;function z(){if(x){x=!1,s.UnInit(),u.UnInit(),t.UnInit();try{
c.runtime.onMessage.removeListener(B)}catch(a){}}}async function A(a){try{const b=await(0,
d.Kr)(c,c.runtime,c.runtime.sendMessage,a);if((0,d.Yc)(b))throw b.error;return b.result}catch(b){if((0,o.n4)(b)){
if(b.message.indexOf("Invocation of form runtime.connect")>=0||b.message.indexOf("context invalidated")>=0)throw t.HandleBackgroundGone(),
(0,o.JS)();if(b.message.indexOf("message port closed before a response was received")>=0)throw(0,
o.ZU)(o.Un,"No response from background")}throw b}}function B(a,b,c){if(a.toContent){const b=a.name||"",d=a.args||[];let e
;if(e="_"===b[0]?t.HandleInternalMessage(b,...d)||u.HandleInternalMessage(b,...d):y.onCallFromBackgroundScript.Call((0,
p.TT)(a.tabId),(0,p.TT)(a.frameId),b,...d),e)return e.then((a=>{C({result:a},c)})).catch((a=>{C({error:a?(0,p.qO)(a):(0,
o.ZU)(o.V2,"Unexpected error: got empty error information")},c)})),!0}}function C(a,b){try{b(a)}catch(c){
t.HandleBackgroundGone()}}}},75568:function(a,b,c){c.d(b,{X:function(){return g}});var d=c(78440),e=c(69893),f=(c(13117),
c(97514));function g(a){const b=a;let c=!1;const g=(0,f.Oz)(),h=`${g}-1`,i=`${g}-2`,j=new Map;return{Init:function(){k(),
window.addEventListener(i,l),c=!0},UnInit:k};function k(){if(!c)return;c=!1;try{window.removeEventListener(i,l)}catch(d){}
const a=[...j.values()],b={error:(0,e.ZU)(e.yI,"Disconnected"),disconnectIds:[...j.keys()]};j.clear,a.forEach((a=>a.Cancel())),
window.dispatchEvent(new CustomEvent(h,{detail:JSON.stringify(b)}))}function l(a){const c=a.detail;if(c&&"string"==typeof c){
const a=JSON.parse(c);(null==a?void 0:a.callbackId)&&(0,d.fI)(async function(a,c){if("create"===c.call||"get"===c.call){let f
;if(c.params){try{const e=(0,d.f4)(null,null,null);j.set(a,e);f={callbackId:a,
result:await b.CallBackgroundScript("create"===c.call?"_WebAuthnCreate":"_WebAuthnGet",e,c.params)}}catch(e){f={callbackId:a,
error:e}}j.delete(a)}else f={callbackId:a,result:null};window.dispatchEvent(new CustomEvent(h,{detail:JSON.stringify(f)}))}else{
const b=j.get(a);b&&(j.delete(a),b.Cancel())}}(a.callbackId,a))}}}},85871:function(a,b,c){c.d(b,{R:function(){return f}})
;c(13117);var d=c(31173),e=c(4153);function f(a,b,c){const f=a,g=b,h=c;let i=null,j=null,k=null,l=!1,m=!1
;return void f.addEventListener("mousedown",(function(a){if(!r(a))return;0===a.button&&1===a.buttons&&(l=!0,j=a.clientX,
k=a.clientY,i=f.getBoundingClientRect(),h.addEventListener("mousemove",n,!0),h.addEventListener("mouseup",o,!0))}),!1)
;function n(a){if(!r(a))return;const b=a,c=b.clientX-(0,e.TT)(j),d=b.clientY-(0,e.TT)(k);if(!m&&Math.abs(c)+Math.abs(d)>=4){m=!0
;try{g.OnStarted()}catch(f){}}m&&(q(c,d),b.preventDefault(),b.stopPropagation())}function o(a){if(!r(a))return;const b=a
;if(l&&(l=!1,h.removeEventListener("mousemove",n,!0),h.removeEventListener("mouseup",o,!0),m)){m=!1;try{g.OnStopped()}catch(c){}
q(b.clientX-(0,e.TT)(j),b.clientY-(0,e.TT)(k)),i=f.getBoundingClientRect(),b.preventDefault(),b.stopPropagation(),
f.addEventListener("click",p,!0)}}function p(a){f.removeEventListener("click",p,!0),a.preventDefault(),a.stopPropagation()}
function q(a,b){const c=(0,e.TT)(document.documentElement).clientWidth,g=(0,e.TT)(document.documentElement).clientHeight,h=(0,
e.TT)(i);let j=h.left+a,k=h.top+b;j+h.width>c&&(j=c-h.width),k+h.height>g&&(k=g-h.height),j<0&&(j=0),k<0&&(k=0),
function(a,b,c,e,g,h){""!==f.style.right?(f.style.right=(0,d.Md)(g-(a+c)),f.style.left=""):(f.style.left=(0,d.Md)(a),
f.style.right="");""!==f.style.bottom?(f.style.bottom=(0,d.Md)(h-(b+e)),f.style.top=""):(f.style.top=(0,d.Md)(b),
f.style.bottom="")}(j,k,h.width,h.height,c,g)}function r(a){return a.isTrusted||g.IsTrusted(a)}}},46947:function(a,b,c){c.d(b,{
p:function(){return h}});var d=c(88262),e=c(78440),f=c(4153),g=(c(13117),c(69893));function h(){return{SendHttpRequest:j}}
const i=(0,f.y8)();async function j(a,b){var c,f;const h="string"==typeof a?{url:a
}:a,j=h.url,k=h.method||h.sendBody&&"POST"||"GET",l=null===(c=h.sendCookies)||void 0===c||c;i.GetNext();let m,n
;"POST"===h.method&&h.sendBody&&"application/octet-stream"!==h.sendBodyType&&"object"==typeof h.sendBody?(m=JSON.stringify(h.sendBody),
n="application/json"):(m=h.sendBody,n=h.sendBodyType);let o=null;function p(){null==o||o.abort(),
null==b||b.onTaskCancel.Remove(p)}b&&(b.onTaskCancel.Add(p),o=new AbortController);const q=Object.assign({},h.sendHeaders)
;n&&!(0,d.Ai)("Content-Type",h.sendHeaders)&&(q["Content-Type"]=n),h.receiveBodyType||(0,
d.Ai)("Accept",h.sendHeaders)||(q.Accept="application/json, text/javascript, */*");const r={method:k,mode:"cors",
cache:"default",credentials:l?"include":"omit",redirect:"follow",body:m,headers:q,
signal:null!==(f=null==o?void 0:o.signal)&&void 0!==f?f:null};let s;try{s=await fetch(j,r)}catch(u){
if(null==o?void 0:o.signal.aborted)throw(0,g.JS)();const a=(0,g.EB)(u);throw"Failed to fetch"===a?(0,
g.ZU)(g.Un,"Cannot connect to server"):a.includes("headers")?(0,
g.ZU)(g.V2,`Unexpected error: invalid HTTP header value: ${a}`):(0,g.ZU)(g.Un,a)}finally{null==b||b.onTaskCancel.Remove(p)}
const t=await async function(a){var b,c;const e={ok:a.ok&&a.status>=200&&a.status<300||"HEAD"===k&&304===a.status,
status:a.status,statusText:a.statusText,url:a.url,headers:(a=>{const b={};return a.forEach(((a,c,d)=>{b[c.toLowerCase()]=a})),b
})(a.headers)};try{switch(h.receiveBodyType){default:case"text":e.bodyAsText=e.bodyAsValue=await a.text(),
e.bodyAsValueType="text";break;case"json":if(s.ok)e.bodyAsValue=await a.json(),e.bodyAsValueType="json";else{
const b=await a.text();if(e.bodyAsText=b,b.length>=2&&"{"===b[0])try{e.bodyAsValue=JSON.parse(b),e.bodyAsValueType="json"
}catch(u){e.bodyAsValue=b,e.bodyAsValueType="text"}else e.bodyAsValue=b,e.bodyAsValueType="text"}break;case"blob":
s.ok||(null===(b=e.headers["content-type"])||void 0===b?void 0:b.startsWith("image/"))?(e.bodyAsValue=await a.blob(),
e.bodyAsValueType="blob"):e.bodyAsText=await a.text();break;case"arraybuffer":
s.ok||(null===(c=e.headers["content-type"])||void 0===c?void 0:c.startsWith("image/"))?(e.bodyAsValue=await a.arrayBuffer(),
e.bodyAsValueType="arraybuffer"):e.bodyAsText=await a.text()}}catch(u){throw{sibError:g.V2,
description:`Cannot get server response: ${(0,g.EB)(u)}`,httpResponse:e}}if(!e.ok){throw Object.assign(Object.assign({},(0,
d.gG)(e)),{httpResponse:e})}return e}(s);return b&&(0,e.fI)(b.Progress({percents:100})),t}},34476:function(a,b,c){c.d(b,{
s:function(){return h}});var d=c(63033),e=c(28138),f=c(92549),g=c(13117);async function h(a){if(window.m_rf_injected)return
;window.m_rf_injected=!0;const b=(0,e.zB)(f.A);if(b.ShouldNotAttachToFrame(window.document.location.href))return;const c=a,h=(0,
d.h)();try{c.onBackgroundGone.Add((function(){!function(){window.m_rf_injected=!1;try{c.UnInit()}catch(a){(0,g.Rm)(a)}try{
h.UnInit()}catch(a){(0,g.Rm)(a)}}()})),await c.Init();const a=await c.storage.GetValue("doc-traits",null)
;b.SetDocumentTraits(a),await h.Init(c,window.document,b)}catch(i){throw i}}},63033:function(a,b,c){c.d(b,{h:function(){return l
}});var d=c(27874),e=c(26307),f=c(48106),g=c(4153),h=c(95399),i=c(78440),j=c(73863),k=c(69893);c(13117);function l(){const a=(0,
d.l)(),b=(a.GetContentId(),(0,f.z)());let c=!1,l=null,m=null,n=null,o=null,p=null,q=null,r=null,s=null,t=null,u=!1,v=null
;const w=1500;let x=!1;return{Init:async function(d,f,g){var h;y(),c=!0,l=g;const i=l.GetMatchingDocumentTraits(f);n=f,o=(0,
e.K)(),o.AdjustForSite(i),r=f.URL,a.Init(),a.SetDocumentApi(o),a.onUserInput=I,m=d,
m.SetAllowToChangeOnPageUIParent(null!==(h=null==i?void 0:i.allowToChangeOnPageUIParent)&&void 0!==h&&h),
m.SetElementVisibilityCheckApi(o),m.onCallFromBackgroundScript.Add(z),m.onKeyDown.Add(B),m.onMouseDown.Add(C),
m.onMouseUp.Add(D),m.onScroll.Add(F),m.onResize.Add(G),m.onMove.Add(H),o.onShouldIgnoreElement=m.IsInpageUIElement,
o.onBeforeSubmit.Add(N),!1;b.Init(),b.onFoundShadowDOMRoot.Add(O),b.Start()},UnInit:y};function y(){c&&(c=!1,L(),
o&&(o.onShouldIgnoreElement=null,o.onBeforeSubmit.Remove(N)),m&&(m.onCallFromBackgroundScript.Remove(z),m.onKeyDown.Remove(B),
m.onMouseDown.Remove(C),m.onMouseUp.Remove(D),m.onScroll.Remove(F),m.onResize.Remove(G),m.onMove.Remove(H)),b.UnInit(),m=null,
n=null,o=null,x=!1,a.onUserInput=null,a.Init())}async function z(b,c,d,...e){var f,h;switch(b&&!p&&(p=b),c&&!q&&(q=c),d){
case"GetDocumentInfo":{if(A(),u&&null!==v&&performance.now()-v<w)throw(0,k.ZU)(k.m,"busy, try later");if(L(),
v=performance.now(),o&&n&&r!==n.URL){if((0,j.Wi)(null!=r?r:"","#")!==(0,j.Wi)(n.URL,"#")){
const b=null!==(f=null==l?void 0:l.GetMatchingDocumentTraits(n))&&void 0!==f?f:null
;null==m||m.SetAllowToChangeOnPageUIParent(null!==(h=null==b?void 0:b.allowToChangeOnPageUIParent)&&void 0!==h&&h),
o.AdjustForSite(b),a.ClearFieldsCache()}r=n.URL}const b=e[0],c=await a.GetDocumentInfo((0,g.TT)(n),b)
;return c&&c.frame&&!c.frame.m_content_pos&&((0,g.QN)(c.frame).m_content_pos=(0,g.TT)(m).GetDocumentScreenPos()),c}
case"FillFields":{A();const b=e[0];x=!0!==b.testerMode;try{return await a.FillFields((0,g.TT)(n),b)}finally{x=!1}}break
;case"localStorage.setItem":try{localStorage.setItem(e[0],e[1])}catch(i){}}}function A(){
if(n&&"complete"!==n.readyState&&"interactive"!==n.readyState)throw(0,k.ZU)(k.m,"loading, try later")}function B(a){
if("Enter"!==a.key)return;const b=E(a);(0,i.uT)(M(a,b,!0),`_OnKeyDown: ENTER frame=${q||""}`)}function C(a){let b=E(a)
;b.shadowRoot&&(b=function(a,b){for(let d=0;d<5&&a.shadowRoot;++d){const d=a.shadowRoot
;if(!d.elementsFromPoint&&!d.elementFromPoint)break;if(d.elementsFromPoint){let e;try{e=d.elementsFromPoint(b.x,b.y)}catch(c){
break}if(!e||0===e.length)break;const f=e[0];if(!f||f===a)break;a=f}else{let e;try{e=d.elementFromPoint(b.x,b.y)}catch(c){break}
if(!e||e===a)break;a=e}}return a}(b,a)),(0,i.uT)(M(a,b,!1),`_OnMouseDown: frame=${q||""}`)}function D(a){J(300,!0)}
function E(a){{const b=a.composedPath&&a.composedPath();if(b&&0!==b.length&&b[0])return b[0]}const b=a.path
;return b&&0!==b.length&&b[0]||a.target}function F(){s&&null!==t&&performance.now()-t>w||J(300,!0)}function G(){J(300,!0)}
function H(){J(100,!0)}function I(){J(1e3,!1)}function J(a,b){s&&clearTimeout(s),s=setTimeout(K,a),
b&&null===t&&(t=performance.now()),u=b}function K(){L(),u=!1,(0,i.uT)(a.GetFrameInfo((0,
g.TT)(n)).then((a=>(a&&!a.m_content_pos&&(a.m_content_pos=(0,g.TT)(m).GetDocumentScreenPos()),(0,
g.TT)(m).CallBackgroundScript("OnLayoutChanged",null,{frame:a})))),"_OnLayoutChanged")}function L(){s&&(clearTimeout(s),s=null,
t=null)}async function M(a,b,c){if(x)return void J(500,!0);const d=await P(function(a){return a instanceof KeyboardEvent?{
type:a.type,isTrusted:a.isTrusted,timeStamp:a.timeStamp,shiftKey:a.shiftKey,altKey:a.altKey,ctrlKey:a.ctrlKey,key:a.key}:{
type:a.type,isTrusted:a.isTrusted,timeStamp:a.timeStamp,shiftKey:a.shiftKey,altKey:a.altKey,ctrlKey:a.ctrlKey,button:a.button,
buttons:a.buttons}}(a),b,c,void 0);d&&J(500,!1)}function N(a,b,c){if(b){return P({type:"keydown",timeStamp:(0,h.Mv)(),
isTrusted:!0,key:"Enter"},a,!0,c)}return P({type:"mousedown",timeStamp:(0,h.Mv)(),isTrusted:!0,button:0,buttons:1},a,!1,c)}
function O(a){null==o||o.AddKnownShadowRoot(a)}async function P(b,c,d,e){const f=await a.GetDocumentInfo((0,g.TT)(n),{
notSynced:!0,updateCaptions:!1,highPriority:!0});if(f&&f.frame&&!f.frame.m_content_pos&&((0,g.QN)(f.frame).m_content_pos=(0,
g.TT)(m).GetDocumentScreenPos()),c){const h=await a.GetHtmlElementInfo((0,g.TT)(n),{element:c,clickable:!0});if(!h)return!1
;const i=h.m_info;if(i.m_id)if(d);else{if(!h.m_clickable)return a.SetLastClickedField(i.m_id),!0
;if(b.altKey||b.ctrlKey);else if(!1===h.m_action)return!0}const j=h.m_html_element,k=a.GetSubmitInfo(j,b);k&&(i.m_submit_info=k)
;const l={frame:(0,g.TT)(f.frame),event:b,fields:f.fields,element:i,simulatedInfo:e};await(0,
g.TT)(m).CallBackgroundScript("OnBeforeFrameSubmit",null,l)}else{const a={frame:(0,g.TT)(f.frame),event:b,fields:f.fields,
simulatedInfo:e};await(0,g.TT)(m).CallBackgroundScript("OnBeforeFrameSubmit",null,a)}return!1}}},26307:function(a,b,c){c.d(b,{
K:function(){return y}})
;var d=c(28138),e=c(93648),f=c(31173),g=c(78440),h=c(12190),i=c(95399),j=c(4153),k=c(73863),l=c(11050),m=c(69893);c(13117)
;const n="input:not([hidden]), select, textarea, div[contenteditable=true], div[contenteditable=''], span[contenteditable=true], span[contenteditable=''], td[contenteditable=true], td[contenteditable=''], a[role='checkbox'], div[role='checkbox'], a[role='radio'], div[role='radio'], button, a[role='button'], div[role='button'], a[class^='button'], div[class^='button'], td[class^='button'], a[class$='button'], div[class$='button'], td[class$='button'], a[class*=' button'], div[class*=' button'], td[class*=' button'], a[class*='button '], div[class*='button '], td[class*='button '], a[class^='btn-'], div[class^='btn-'], td[class^='btn-'], a[class$='-btn'], div[class$='-btn'], td[class$='-btn'], a[class*='-btn '], div[class*='-btn '], td[class*='-btn '], a[class*=' btn-'], div[class*=' btn-'], td[class*=' btn-'], a.btn, div.btn, td.btn",o="input:not([type=button]):not([hidden]), select, textarea, div[contenteditable=true], div[contenteditable=''], span[contenteditable=true], span[contenteditable=''], td[contenteditable=true], td[contenteditable=''], a[role='checkbox'], div[role='checkbox'], a[role='radio'], div[role='radio']",p="input[type='button']:not([hidden]), button, a[role='button'], div[role='button'], a[class^='button'], div[class^='button'], td[class^='button'], a[class$='button'], div[class$='button'], td[class$='button'], a[class*=' button'], div[class*=' button'], td[class*=' button'], a[class*='button '], div[class*='button '], td[class*='button '], a[class^='btn-'], div[class^='btn-'], td[class^='btn-'], a[class$='-btn'], div[class$='-btn'], td[class$='-btn'], a[class*='-btn '], div[class*='-btn '], td[class*='-btn '], a[class*=' btn-'], div[class*=' btn-'], td[class*=' btn-'], a.btn, div.btn, td.btn",q="form, input:not([type=hidden]), textarea, select, radio, a, button, img, div, span, tr, td, table, m",r="img, canvas, svg",s="[data-rf], [name^=_rf_], [id^=_rf_]",t=new Set(["_rf_ver_","_rf_type_","_rf_computerdescr_"]),u=["go","go!","next","ok","los","save","下一步","登录","siguiente","entrar","ingresar","iniciarsesión","التالي","تسجيلالدخول","próxima","seguinte","iniciarsessão","次へ","ログイン","suivant","seconnecter","poursuivre","doorgaan","ок","далее","даље","dalje","avanti","accedi","næste"],v=["autologin","accessibility","back","cancel","clear","demo","exit","forget","forgot","lost","hint","home","mailto","neuanmeld","nuevo","recordar","recall","rebate","recover","remember","remind","reset","restore","alreadyhave","unmask","toggle","reveal","show","hide","maximize","minimize","close","options","can’t","can't","cannot","securitykey","google","facebook","apple","microsoft","amazon","twitter","alightmobile","otherways","anotherway","assomeoneelse","emailaloginlink","signinwith","signinvia","withsso","withsaml","viasso","viasaml","usingsso","usingsaml","nologin","loginhere","customersupport","loginvk","логинvk","vkconnect","входспомощью","войтипо","нет","companyorschool","сбербанкid","сберid","sberid","linkedin","twitter","tips","subscribe","trouble","problem","aslender","asdealer","忘","選項","安全性金鑰","olvida","restablecer","opciones","nopuede","llavedeseguridad","consejos","نسي","إعادةضبط","خيارات","هليتعذر","مفتاحأمان","esqueceu","esqueceste","opções","chavedesegurança","オプション","スできな","セキュリティキー","annuler","oublié","réinitialiser","n’estpas","n'estpas","nestpas","clédesécurité","zurück","vergessen","wiederherstellen","zurücksetzen","optionen","könnennicht","sicherheitsschlüssel","vergeten","glemt","отмен","закр","прер","выход","вый","обратно","назад","возвр","верну","сброс","нов","отсоед","откл","восстанов","забыл","непомню","немогу","вспомнить","демо","параметры","опции","неудается","проблемы","заборавили","zaboravili","ключомбезопасности","ключбезопасности","ключабезопасности","получ","подписаться","annulla","nonricordi","dimenticata","dimenticato","reimposta","opzioni","chiavedisicurezza","שכחת","попочте","потелефону","mitmobilnummereinloggen"],w=["1sttime","agree","auto","ameritrade","cookie","favorit","firsttime","lookup","help","hilfe","aide","aiuto","name","personali","problem","speed","where","when","zip","sendemail"],x=["access","acceso","aceptar","authenticate","buttonok","connexion","connectez","continue","einloggen","enter","entra","enviar","gobutton","gobeige","inloggen","jatka","logginn","login","logmein","loginn","logon","logpa","nybruger","send","signin","signon","summary","submit","validate","valider","verwerk","zaloguj","zugang","generatetan","вход","войти","подкл","соед","присоед","посла","отправ","откр","дал","вперед","логин","продолж","כניסה","weiter","fortfahren","tangenerieren","verzenden","conferma","prijavise","play","spielen","играть","Խաղալ","jugar","jogar","graj"]
;function y(){const a=(0,e.q0)(document),b=6,c=.5,u={"input|button":30,"input|submit":40,"input|reset":30,"input|image":30,
"input|file":20,"input|color":20,"button|button":30,"button|submit":40,"a|":30,"textarea|textarea":50},v=5,w=3,x=5
;let y=null,B=null,C=1,D=0;const E=new Map,F=new WeakMap,G=new WeakMap;let H=!0;const I={AdjustForSite:function(a){if(a!==y){
switch(a&&a.fillTextField){case"SendAllKeys":I.FillTextField=O;break;case"SendOnlyLastKey":I.FillTextField=M;break;default:
I.FillTextField=L}if(H=!(a&&a.doNotUseElementsFromPoint),C=a&&a.delayAfterFocus||1,D=a&&a.delayAfterChange||0,
a&&(B=a.userId||a.password?a.fields?a.fields.slice():[]:a.fields,B)){let b;if(a.password){const c=(0,
j.HP)(a.password),d=c.info||(c.info={});d.caption||(d.caption="Password"),d.type||(d.type="password"),(b||(b=[])).push(c)}
if(a.userId){const c=(0,j.HP)(a.userId),d=c.info||(c.info={});d.caption||(d.caption="User ID"),d.type||(d.type="text"),
(b||(b=[])).push(c)}b&&(B=B.concat(b))}y=a}},GetFrameInfo:function(a){const b=a&&a.defaultView;if(!b)return null;const c={
m_scroll_x:b.scrollX,m_scroll_y:b.scrollY,m_width:b.innerWidth,m_height:b.innerHeight};if(b===b.top){
c.m_window_pos=[b.screenX,b.screenY,b.screenX+b.outerWidth,b.screenY+b.outerHeight];const d=(0,e.D)(a)
;c.m_scroll_width=d&&d.scrollWidth||void 0,c.m_scroll_height=d&&d.scrollHeight||void 0,
c.m_client_width=d&&d.clientWidth||void 0,c.m_client_height=d&&d.clientHeight||void 0}else{const a=b.top;let d
;if(a&&(function(a){try{if(!a.document)return!1}catch(b){return!1}return!0}(a)||(c.m_foreign_domain=!0)),d=!0,
d&&b.frameElement){const a=R(b.frameElement);a&&(c.m_data=a.m_data)}else{const a=b.parent
;for(let d=0;d<a.frames.length;d++)if(b===a.frames[d]){c.m_index=d;break}}}
const d=a.querySelectorAll("iframe, frame, embed, object");if(d&&d.length>0){c.m_sub_frames=[];const a=[]
;for(let e=0;e<b.frames.length;e++){const f=b.frames[e];let g=!1;for(let b=0;b<d.length;b++){const e=d[b]
;if(f===e.contentWindow){const d=R(e);c.m_sub_frames.push(d?d.m_data:null),g=!0,a[b]=!0;break}}g||c.m_sub_frames.push(void 0)}
for(let b=0;b<d.length;b++){const e=d[b];if(a[b]);else{const a=R(e);c.m_sub_frames.push(a?a.m_data:null)}}}return c},
GetFieldsList:async function(a,b,c){var e,f,g,h,k,m;l.F.now();let q;if((0,d.hR)(a.location.href)){
if(!b.includeInputs||!b.includeButtons)return[];q=s
}else if(b.includeInputs&&b.includeButtons)q=n;else if(b.includeInputs&&!b.includeButtons)q=o;else if(!b.includeInputs&&b.includeButtons)q=p;else{
if(!b.includePossibleQRCodeImages)return[];q=r}if(B)for(const d of B)d.main?q+=", "+d.main:d.list&&(q+=", "+d.list)
;const v=[],w=new Map,x=new Set,z=[];0;const A=[a,...z,...E.keys()],C=1+z.length,D=new Set
;if(null==y?void 0:y.shadowRootSelector){const b=a.querySelectorAll(y.shadowRootSelector);for(let a=0;a<b.length;a++){
const c=b[a].shadowRoot;!c||D.has(c)||E.has(c)||(A.push(c),D.add(c))}}const F=(0,i.Iw)();let G=!1;const H=l.F.now()
;for(let d=0;d<A.length;d++){const a=A[d],b=(l.F.now(),a.querySelectorAll(q));if(B&&x.size<B.length){l.F.now();let b=0
;for(const c of B)if(!x.has(c))if(c.main){const d=a.querySelector(c.main);if(d){if(b++,x.add(c),w.set(d,c),c.real){
Q(d,a.querySelector(c.real))}if(c.placeholder){const a=T(d,c.placeholder);a&&(b++,x.add(c),w.set(a,{ignore:!0}))}}
}else if(c.list){const d=a.querySelectorAll(c.list);if(d&&d.length>0){x.add(c);for(let a=0;a<d.length;a++){const e=d[a];e&&(b++,
w.set(e,c))}}}}const i=a.activeElement;if(i){const a=w.get(i)
;if(null===(e=null==a?void 0:a.info)||void 0===e?void 0:e.custom);else{const a=i.shadowRoot;!a||D.has(a)||E.has(a)||(A.push(a),
D.add(a))}}let n=0,o=0;const p=b.length>500;let r;const s=new Map,y=new WeakSet;for(let d=0;d<b.length;d++){const e=b[d]
;await c.ReleaseThread(d,b.length);let h=!1;const i=e.id,k=e.name;(k&&t.has(k)||i&&t.has(i))&&""===e.value&&(h=!0)
;const m=`${e.tagName}|${e.type||""}`.toLowerCase();if(r&&r.has(m))continue;const q=w.get(e);if(q&&q.ignore)continue;{
const a=(null!==(f=s.get(m))&&void 0!==f?f:0)+1;if(a>(null!==(g=u[m])&&void 0!==g?g:500)){(r||(r=new Set)).add(m);continue}
s.set(m,a)}const x=R(e,q,a,h);let z=!1;if(x){const a=x.m_visible_element,b=a&&a!==e,c=x.m_real_element,d=c&&c!==e
;if((y.has(e)||b&&y.has((0,j.TT)(a))||d&&y.has((0,j.TT)(c)))&&(z=!0),z)continue;y.add(e),b&&y.add((0,j.TT)(a)),d&&y.add((0,
j.TT)(c))}if(!x)continue;const A=(0,j.QN)(x.m_data);if(A){if(q){const b=q.info;if(q.value){const b=a.querySelector(q.value)
;b&&(A.m_value=b.value)}else if("User ID"===(null==b?void 0:b.caption)&&"generic"===A.m_type){let a=e.innerText||e.textContent
;if(a&&(a=a.trim()),a){if(a.indexOf("@")>0){const b=/\s(.+@.+\..+)\s*/.exec(a);b&&b[1]&&(a=b[1])}}A.m_value=a||""
}else if("select"===(null==b?void 0:b.type)){let a=e.innerText||e.textContent;a&&(a=a.trim()),A.m_value=a||""}if(b){
if(b.type)A.m_type=b.type;else if(b.typeAttr){const a=e.getAttribute(b.typeAttr);a&&(A.m_type=a)}
if(b.caption)if("string"==typeof b.caption)A.m_caption=b.caption;else{const a=U(e,b.caption)
;a&&1===a.length&&a[0].innerText&&(A.m_caption=a[0].innerText)}const a=(0,j.QN)(A.m_html||(A.m_html={m_tag:void 0}))
;void 0!==b.name&&(a.m_name=b.name),void 0!==b.id&&(a.m_id=b.id),void 0!==b.readOnly&&(a.m_read_only=b.readOnly),
void 0!==b.disabled&&(a.m_disabled=b.disabled)}}
(p||G)&&(!A||!A.m_visible||A.m_html&&A.m_html.m_overlapped)||(G||H-l.F.now()>=50&&(G=!0),A.m_index=o++,v.push(x),n++)}}if(d>=C){
const b=E.get(a);if(0!==n)if(b){if(0===b.m_found_by)null===(h=b.m_selectors)||void 0===h||h.add(q);b.m_access=F}else E.set(a,{
m_found_by:0,m_selectors:new Set([q]),m_access:F
});else if(b&&0===b.m_found_by)null===(k=b.m_selectors)||void 0===k||k.delete(q),
0===(null===(m=b.m_selectors)||void 0===m?void 0:m.size)&&E.delete(a)}}if(0!==E.size){const a=new Date(F.getTime()-9e5);let b=0
;for(const[c,d]of E)if(0===d.m_found_by)d.m_access<a&&(E.delete(c),b++)}return v},GetFieldsInfo:async function(a,b,c){l.F.now()
;const d=b.fieldInfo,f=b.allCaptions,g=b.updateCaptions,i=[],k=b.fields;let m=!1;for(const[e,h]of k.entries()){let a
;if(await c.ReleaseThread(e,k.length),d?(a=R(h.m_html_element,h.m_traits),a&&(a.m_id=h.m_id,a.m_data&&h.m_data&&((0,
j.QN)(a.m_data).m_index=h.m_data.m_index))):(a={m_data:void 0,m_id:h.m_id,m_html_element:h.m_html_element,
m_real_element:h.m_real_element,m_visible_element:h.m_visible_element,m_traits:h.m_traits,m_keys:h.m_keys},f?(a.m_data=(0,
j.HP)(h.m_data),a.m_data&&((0,j.QN)(a.m_data).m_have_captions=!1)):g&&h.m_data&&h.m_data.m_have_captions?a.m_data=(0,
j.HP)(h.m_data):a.m_data=h.m_data),a&&(i.push(a),a.m_data&&(f||g&&!a.m_data.m_have_captions)))switch(a.m_data.m_type){
case"button":case"link":case"generic":break;default:m=!0}}return m?async function(a,b,c,d){l.F.now();const f=(0,j.TT)((0,
e.y0)(a)),g=(0,h.PW)(f),i=b.length,k=c.onlyVisible,m=c.useDOMScan,n=c.useProbing;let o=0,p=0;l.F.now();for(const e of b){
const a=e.m_data;if(!a||k&&(!a.m_visible||a.m_html&&a.m_html.m_overlapped))continue;switch(a.m_type){case"text":case"password":
case"select":break;default:continue}const b=a.m_pos;o+=b[2]-b[0],p++}0!==p&&(o/=p);await!0;const q=[];l.F.now()
;for(const[e,j]of b.entries()){const a=j.m_data;if(!a||k&&(!a.m_visible||a.m_html&&a.m_html.m_overlapped))continue;let b=!0
;switch(a.m_type){case"button":case"generic":continue;case"checkbox":b=!1}const c=(0,h.Z8)(a.m_pos);let d=c[2]-c[0]
;const f=c[3]-c[1];d<o&&(d=o),b?(0,h.Ek)(c,[2*-d,-3*f,3*d/2,f]):(0,h.Ek)(c,[0,-3*f,3*d/2,f]),q[e]=c}await!0;l.F.now()
;for(const[e,j]of b.entries()){const a=q[e];if(!a)continue;const c=j.m_data
;if(!c||c.m_html&&c.m_html.m_overlapped||k&&!c.m_visible)continue;let d=c.m_pos;switch(c.m_type){case"checkbox":case"radio":{
const a=d[2]-d[0],b=d[3]-d[1];if(a<3*b){const a=(0,h.Z8)(c.m_pos);a[2]+=3*b,d=a}}}for(const[f,g]of b.entries()){
if(f===e)continue;const b=null==g?void 0:g.m_data;if(!b||b.m_html&&b.m_html.m_overlapped||k&&!b.m_visible)continue;let c=b.m_pos
;switch(b.m_type){case"checkbox":case"radio":{const a=c[2]-c[0],d=c[3]-c[1];if(a<3*d){const a=(0,h.Z8)(b.m_pos);a[2]+=3*d,c=a}}}
ac(a,d,c,!q[f])}}for(const[r,s]of b.entries()){await d.ReleaseThread(r,i);let a,b,c=!1,f=!0,o=!0;if(s&&(b=(0,
e.HW)(s.m_html_element),
a=s.m_data,b&&a&&!a.m_have_captions&&(!k||!(!a.m_visible||a.m_html&&a.m_html.m_overlapped))))switch(a.m_type){case"button":
case"generic":break;case"checkbox":c=!0,f=!1,o=!1;break;case"radio":c=!0,o=!1;break;default:c=!0}if(c&&a&&b){
const c=a.m_pos,d=q[r];if(n&&(0,e.Th)(b)&&a.m_visible&&(!a.m_html||!a.m_html.m_overlapped)&&(!m&&(0,h.d6)(c,g)||m&&(0,
h.I2)(g,c))){l.F.now();(0,h.XF)(d,g),ad((0,j.QN)(a),c,d,b,f,o)}else if(m){l.F.now();af(s.m_html_element,(0,j.QN)(a),c,d,f,o)}}}
return b}(a,i,b,c):d?i:null},GetFieldInfo:async function(a,b){const c=b.field,d=c.m_html_element,f=c.m_traits;let g=null
;if(b.clickable){const b=(0,e.D)(a),c=a&&a.body;for(let a=d,e=0;a&&e<10&&a!==b&&a!==c;a=a.parentElement,e++){
const b=R(a,0===e?f:null);if(!b)break;if(b.m_clickable){g=b;break}if(b.m_data&&"generic"===b.m_data.m_type){
const c=60,d=b.m_data.m_pos,e=window.devicePixelRatio||1,f=d&&(d[3]-d[1])*e>c;if(void 0!==b.m_action||aB(a)){f||(g=b);break}
if(f)break}}}else g=R(d,f);g&&(g.m_id=c.m_id,g.m_data&&c.m_data&&((0,j.QN)(g.m_data).m_index=c.m_data.m_index));return g},
GetSubmitInfo:function(a,b){const c=aF(a),d=aE(a);let e=null
;if(a.form)e=X(a.form);else for(let j=a.parentElement;j;j=j.parentElement)if(j.tagName.toLowerCase&&"form"===j.tagName.toLowerCase()){
e=X(j);break}const f=a.type&&a.type.toLowerCase&&a.type.toLowerCase();let g
;b&&b.type.startsWith("key")?"Enter"===b.key&&(g="enter"):g="click";const h=aB(a),i=aD(a),k={m_x:c.m_x,m_y:c.m_y,m_caption:d,
m_element_type:f,m_navigation_link:h,m_image_url:i,m_action:g};e&&((0,j.TT)(k).m_form_key=e);const l={m_v8:k}
;e&&(l.m_form_key=e);return l},FillFields:async function(a,b){let c;if(b.keepSelection){const b=a.getSelection();c=b&&{
anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}}let d=0,e=0;const f=[]
;for(const[i,j]of b.fields.entries()){const c=j.action||b.action;if("fill"===c||"clear"===c||"reset"===c){
"fill"===c&&("button"===j.data.m_type||"link"===j.data.m_type)&&i>0&&await(0,g.XR)(800);const h=await J(a,j,c,b.simulatedInfo)
;h?(d++,f.push(i)):null===h&&(e++,f.push(i))}else"changed"===c?(e++,f.push(i)):"none"===c||await J(a,j,c,b.simulatedInfo)}
if(b.submit){await(0,g.XR)(800);return{filledFields:f,result:{submitted:await K(a,b),filledFieldsCount:d,alreadyFilledCount:e}}}
if(b.keepSelection&&c){const b=a.getSelection()
;if(b)if(b.anchorNode===c.anchorNode&&b.anchorOffset===c.anchorOffset&&b.focusNode===c.focusNode&&b.focusOffset===c.focusOffset);else if(c.anchorNode&&c.focusNode)try{
b.setBaseAndExtent(c.anchorNode,c.anchorOffset,c.focusNode,c.focusOffset)}catch(h){}}return{filledFields:f,result:{submitted:!1,
filledFieldsCount:d,alreadyFilledCount:e}}},FillField:J,SubmitFilledForm:K,FillTextField:L,
FillSelectField:async function(a,b,c,d){if(a.selectedIndex===b)return null;if(c&&c.options){
const d=U(a,c.options),e=c.options.indexShift,f=e?b+e:b;if(!(d&&f>=0&&f<d.length))return!1;d[f].click()}else{
const c=await av(a,C,d);if(!c)return!1;const e=c;if(e.selectedIndex===b)return null
;if(e.options&&e.options[b]&&e.options[b].disabled)return null;e.selectedIndex=b,d.SendInputEvent(c),d.SendChangeEvent(c)}
return await(0,g.XR)(D),!0},FillMultiselectSelectField:async function(a,b,c){let d=!1;for(let e=0;e<a.length;e++){
const c=a.item(e);if(!c||c.disabled)continue;const f=b.includes(e);c.selected!==f&&(c.selected=f,d=!0)}if(!d)return null
;return c.SendInputEvent(a),c.SendChangeEvent(a),await(0,g.XR)(D),!0},ClickOnField:async function(a,b){try{
if(b.SendMouseEvent("mouseover",a),b.SendMouseEvent("mousedown",a),a.focus(),b.SendFocusEvent(a),await(0,g.XR)(C),
b.SendMouseEvent("mouseup",a),!b.SendMouseEvent("click",a))return!1}finally{await(0,g.XR)(1)}return!0},
FocusField:async function(a,b){await av(a,0,b)},AddKnownShadowRoot:function(a){const b=E.get(a);b?(b.m_found_by=1,
b.m_selectors=null,b.m_access=(0,i.Iw)()):E.set(a,{m_found_by:1,m_selectors:null,m_access:(0,i.Iw)()})},
onBeforeFillTextField:(0,g.Ol)(),onShouldIgnoreElement:null,onBeforeSubmit:(0,g.Ol)(),SetRealElement:Q,
IsElementVisibleByOpacity:function(a,b){let d=1;for(let f=a;;){for(;;){const a=b.getComputedStyle(f);if(""!==a.opacity){
const b=parseFloat(a.opacity);if(!Number.isNaN(b)&&(d*=b,d<c))return!1}let e
;if(e="static"===a.position||"relative"===a.position?f.parentElement:f.offsetParent,!e)break;f=e}const a=(0,e.HW)(f).host
;if(!a)break;f=a}return!0}};return I;async function J(b,c,d,e){
const f=c.element,g=c.visibleElement,h=c.data,i=h.m_type,k=c.traits,l=h.m_html;switch(c.action||d){case"fill":case"reset":
case"clear":switch(i){case"text":case"password":{const b=f;let d;switch(c.action){case"fill":d=c.value;break;case"reset":
d=b.defaultValue||"";break;case"clear":d=""}if(void 0!==d){const c=b.name,e=f.id
;if(c&&t.has(c)||e&&t.has(e))return b.value===d?null:(P(b,d),!0);return await I.FillTextField(f,d,l,k,a)}}break;case"checkbox":{
const a=f;let b;switch(c.action){case"fill":b=c.value;break;case"reset":b=a.defaultChecked||!1;break;case"clear":b=!1}
if(void 0!==b)return b!==a.checked?(g?g.click():f.click(),!0):null}break;case"radio":{const a=f;let b;switch(c.action){
case"fill":b=c.value;break;case"reset":b=a.defaultChecked||!1;break;case"clear":b=!1}
if(void 0!==b)return b!==a.checked?b?(f.click(),!0):(a.checked=!1,!0):null}break;case"select":{const b=f;if(b.multiple){let b=[]
;switch(c.action){case"fill":b=c.value;break;case"reset":case"clear":
if(h.m_options)for(let a=0;a<h.m_options.length;a++)h.m_options[a].m_default&&b.push(a)}if(0!==b.length){
return await I.FillMultiselectSelectField(f,b,a)}}else switch(c.action){case"fill":return await I.FillSelectField(f,c.value,k,a)
;case"reset":if(h.m_options){let b;for(let a=0;a<h.m_options.length;a++)if(h.m_options[a].m_default){b=a;break}if(void 0!==b){
return await I.FillSelectField(f,b,k,a)}}break;case"clear":return P(b,""),f.selectedIndex=-1,!0}}break;case"button":case"link":{
const b=f;if("fill"===c.action){await I.onBeforeSubmit.Call(b,!1,e);return await I.ClickOnField(f,a)}}}break;case"hilite":
case"highlight":{const a=c.options&&c.options.highlight&&c.options.highlight.style;a?(0,
j.T1)(f.style,a):(f.style.outline="solid 3px green",f.style.outlineOffset="-3px")}break;case"unhilite":case"unhighlight":{
const a=c.options&&c.options.highlight&&c.options.highlight.style;a?(0,j.T1)(f.style,a):f.style.outline=""}break;case"focus":
return await I.ClickOnField(f,a);default:throw(0,m.ZU)(m.V2,`Internal error: unknown action: ${c.action||""}`)}return!1}
async function K(b,c){{const a=b.querySelectorAll("iframe");for(let b=0;b<a.length;b++){const c=a[b];if(!c)continue
;const e=c.getAttribute("src");if(e&&(0,d.qK)(e))return!1}}const e=c.submitInfo,f=e&&e.m_v8,g=f&&"enter"===f.m_action;let h
;if(f&&f.m_navigation_link){if(h=function(a,b){const c=b.submitInfo,d=c&&c.m_v8;if(!d)return null;const e=a&&a.defaultView
;if(!e)return null;const f=void 0!==d.m_x&&void 0!==d.m_y;let g=null,h=-1;const i=a.querySelectorAll("a")
;for(let k=0;k<i.length;k++){const a=i[k],b=aE(a),c=aF(a),l=f?Math.abs(c.m_x-(0,j.TT)(d.m_x)):-1,m=f?Math.abs(c.m_y-(0,
j.TT)(d.m_y)):-1
;if((d.m_caption&&b===d.m_caption||d.m_image_url&&aD(a)===d.m_image_url||!d.m_caption&&!b&&ap(e,a)&&0===l&&0===m)&&(g?f&&l+m<h&&(g=a,
h=l+m):(g=a,f&&(h=l+m)),f&&l<5&&m<5))return g}if(g)return g;return null}(b,c),!h)return!1}else if(g){{const d=aw(b,c)
;if(d)return await I.onBeforeSubmit.Call(d,!0,c.simulatedInfo),await ax(d,a),!0}h=ay(b,c)}else if(h=ay(b,c),!h){const d=aw(b,c)
;if(d)return await I.onBeforeSubmit.Call(d,!0,c.simulatedInfo),await ax(d,a),!0}if(h){
await I.onBeforeSubmit.Call(h,!1,c.simulatedInfo);return await I.ClickOnField(h,a)}let i=null;for(const a of c.fields){
const b=a.element.form;if(b)if(i){if(b!==i){i=null;break}}else i=b}if(i){const a=i.querySelectorAll("input[type='submit']")
;if(a&&1===a.length){const b=a[0];if(1!==z(aE(b)))return await I.onBeforeSubmit.Call(b,!1,c.simulatedInfo),b.click(),!0
}else i=null}return!1}async function L(a,b,c,d,e){return c&&"tel"===c.m_type?O(a,b,c,d,e):M(a,b,c,d,e)}
async function M(a,b,c,d,e){var f
;if(null===(f=null==d?void 0:d.info)||void 0===f?void 0:f.valueAttr)return N(a,d.info.valueAttr,b,e)
;if(c&&c.m_editable)return async function(a,b,c){if(a.textContent===b)return null;const d=await av(a,C,c);if(!d)return!1
;if(d.textContent===b)return null;const e=I.onBeforeFillTextField.Call(b);if(e){if(!1!==await e)return!0}
return c.SendKeyboardEvent("keydown",d,b),c.SendKeyboardEvent("keypress",d,b),d.textContent=b,c.SendKeyboardEvent("keyup",d,b),
await(0,g.XR)(D),!0}(a,b,e);if(a.value===b)return null;const h=await av(a,C,e);if(!h)return!1;if(h.hasAttribute("readonly")){
if(c&&c.m_read_only)return!1;for(const a=l.F.now()+500;l.F.now()<a&&(await(0,g.XR)(30),h.hasAttribute("readonly")););
if(h.hasAttribute("readonly"))return!1}if(h.value===b)return null;e.SendKeyboardEvent("keydown",h,b),
e.SendKeyboardEvent("keypress",h,b);let i=!1;const j=I.onBeforeFillTextField.Call(b);if(j){!1!==await j&&(i=!0)}return await(0,
g.XR)(1),i||P(h,b),e.SendInputEvent(h),e.SendKeyboardEvent("keyup",h,b),e.SendChangeEvent(h),await(0,g.XR)(D),!0}
async function N(a,b,c,d){if(a.getAttribute(b)===c)return null;const e=I.onBeforeFillTextField.Call(c);if(e){
if(!1!==await e)return!0}return a.setAttribute(b,c),await(0,g.XR)(D),!0}async function O(a,b,c,d,e){var f
;if(null===(f=null==d?void 0:d.info)||void 0===f?void 0:f.valueAttr)return N(a,d.info.valueAttr,b)
;if(c&&c.m_editable)return async function(a,b,c){if(a.textContent===b)return null;const d=await av(a,C,c);if(!d)return!1
;if(d.textContent===b)return null;let e="";for(let f=0;f<b.length;++f)e+=b.charAt(f),c.SendKeyboardEvent("keydown",d,e),
c.SendKeyboardEvent("keypress",d,e),d.textContent=e,c.SendKeyboardEvent("keyup",d,e);return await(0,g.XR)(D),!0}(a,b,e)
;if(a.value===b)return null;const h=await av(a,C,e);if(!h)return!1;if(h.hasAttribute("readonly")){if(c&&c.m_read_only)return!1
;for(const a=l.F.now()+500;l.F.now()<a&&(await(0,g.XR)(30),h.hasAttribute("readonly")););if(h.hasAttribute("readonly"))return!1}
if(h.value===b)return null;let i="";for(let j=0;j<b.length;++j)i+=b.charAt(j),e.SendKeyboardEvent("keydown",h,i),
e.SendKeyboardEvent("keypress",h,i),P(h,i),e.SendInputEvent(h),e.SendKeyboardEvent("keyup",h,i),await(0,g.XR)(D)
;return e.SendChangeEvent(h),await(0,g.XR)(D),!0}function P(a,b){a.value=b}function Q(a,b){b&&b!==a?(G.set(a,b),
F.set(b,a)):(G.delete(a),b&&F.delete(b))}function R(a,c,d,g){var i,k,m,o,p,q;const r=a.ownerDocument,s=r&&r.defaultView
;if(!s)return null;const t=(0,j.TT)(r);if(!d&&!(d=(0,e.HW)(a)))return null;const u=an(a);let y=u
;const A=a.tagName,B=A&&A.toLowerCase&&A.toLowerCase()||null,C=a.type,D=C&&C.toLowerCase&&C.toLowerCase()||null
;let E,I=a.getAttribute("role");I&&(I=I.toLowerCase());let J,K,L,M,N,O,P=!1,Q=!1,R=!0,V=!0,ac=!1,ad=null,ae=null,af=!1
;switch(B){case"input":switch(D){case"hidden":return null;case"text":if(a.readOnly&&u.width<=10)return null
;if(null===(i=a.name)||void 0===i?void 0:i.includes("disable-lastpass-search"))return null;E=D,J=a.value,K=a.defaultValue,
O=a.maxLength,P=!0,Q=!0;break;case"password":E=D,J=a.value,K=a.defaultValue,O=a.maxLength,P=!0,Q=!0;break;case"checkbox":E=D,
ad=a.checked,ae=a.defaultChecked,V=!1,ac=!0,P=!0;break;case"radio":if("link"===I)E="link",L=a.innerText||a.textContent;else E=D,
J=a.value,K=a.defaultValue,ac=!0,ad=a.checked,ae=a.defaultChecked,P=!0;break;case"submit":case"button":E="button",L=a.value,
V=!1,P=!0;break;case"reset":case"image":E="button",L=a.value,V=!1;break;case"file":case"color":E=D,J=a.value,K=a.defaultValue
;break;case"email":case"search":case"tel":case"number":O=a.maxLength,E="text",J=a.value,K=a.defaultValue,P=!0,Q=!0;break
;case"name":case"username":case"textbox":case"nickname":case"date":E="text",J=a.value,K=a.defaultValue,P=!0,Q=!0;break;default:
E="text",J=a.value,K=a.defaultValue}break;case"button":if("hidden"===D)return null;if(E="button",L=a.innerText||a.textContent,
L&&(L=L.trim()),!L){const b=s.getComputedStyle(a,":before");b&&(L=b.content,L.trim(),"none"===L&&(L=""))}if(!L){
const b=s.getComputedStyle(a,":after");b&&(L=b.content,L.trim(),"none"===L&&(L=""))}P=!0;break;case"textarea":E="text",
J=a.value,K=a.defaultValue,O=a.maxLength;break;case"select":E="select";{let b;const c=a,d=c.multiple?[]:null
;if(c.options&&0!==c.options.length){let a,e=!1;M=[];for(let f=0;f<c.options.length;f++){const g=c.options[f]
;let h=g.label||g.innerText||g.title||g.textContent||"";h&&(h=h.trim()),g.defaultSelected&&(e||(e=!0,a=g),g.disabled&&!b&&(b=g))
;const i={m_text:h};void 0!==g.value&&(i.m_value=g.value),g.selected&&(i.m_selected=!0,d&&null!==h&&d.push(h)),
g.defaultSelected&&(i.m_default=!0),g.disabled&&(i.m_disabled=!0),M.push(i)}b||(b=e?a:c.options[0])}if(b){
let a=b.innerText||b.title||b.textContent;a&&(a=a.trim()),L=a}c.multiple?(J=d||[],N=!0):(J=c.value,K=a.defaultValue,P=!0)}break
;case"a":{const b=a;switch(I){case"button":E=I,L=b.innerText||b.textContent;break;case"checkbox":case"radio":E=I,
L=b.innerText||b.textContent,ac=!0,ad="true"===b.getAttribute("aria-checked");break;default:E="link",
L=b.innerText||b.textContent}}break;case"div":if(af=a.isContentEditable,af)E="text";else{const b=a;switch(I){case"button":
case"link":E=I,L=b.innerText||b.textContent;break;case"checkbox":case"radio":E=I,L=b.innerText||b.textContent,ac=!0,
ad="true"===b.getAttribute("aria-checked");break;default:if(b.querySelector(n))return null
;b.hasAttribute("onclick")||b.hasAttribute("ng-click")||S(b)?(E="button",L=b.innerText||b.textContent):E="generic"}}break
;case"td":if(af=a.isContentEditable,af)E="text";else{if(a.querySelector(n))return null
;a.hasAttribute("onclick")||a.hasAttribute("ng-click")||S(a)?(E="button",L=a.innerText||a.textContent):E="generic"}break
;case"span":af=a.isContentEditable,E=af?"text":"generic";break;case"frame":case"iframe":case"embed":case"object":E="frame",R=!1
;break;default:E="generic"}L&&(L=L.trim());const ag=s.getComputedStyle(a);if("text"===E){const a=ag.webkitTextSecurity
;a&&"none"!==a&&(E="password");const b=ag.fontFamily.toLowerCase();"password"!==b&&'"password"'!==b||(E="password")}let ah=ag
;const ai=(0,e.D)(t),aj=(0,e.y0)(t),ak=t.body;let al,am,ap,at=!0;if(c&&c.avatar){const b=T(a,c.avatar);if(!b)return null;al=b,
y=an(al),ah=s.getComputedStyle(al)}else al=a;let au,av=(0,h.gv)(y),aw=(0,h.Z8)(av)
;if(aq(y,ah))al=null;else if(aj)if(ar(y,ah,aj))al=null,Q&&(P=!1);else{if(ai){const a=as(al,aw,s,t,ai,d,c);if(2===a)al=null,
aw=null,av=null;else if(1===a){const a=(0,h.Z8)(av);(0,h.XF)(a,aw),aw=a,am=!1,at=!1}}aw&&((0,
h.ZJ)(aw,aj.left,aj.top,aj.right,aj.bottom),(0,h.aH)(aw)&&(am=!1,at=!1))}if(!al&&(null==c?void 0:c.placeholder)){
const b=T(a,c.placeholder);if(b){const a=an(b),c=s.getComputedStyle(b);aq(a,c)||aj&&ar(a,c,aj)?(P=!1,Q=!1):(al=b,y=an(al),
ah=s.getComputedStyle(al))}}if(!al){if(Q){if(F.has(a)&&(Q=!1),Q&&"password"===E&&"none"===ah.display){
const b=a.previousElementSibling,c=a.nextElementSibling;(Z(b,"text","password")&&!Y(b)||Z(c,"text","password")&&!Y(c))&&(Q=!1)}
if(Q){const b=ab(a);if(b){if("text"===(b.type&&b.type.toLowerCase())){const a=an(b),c=s.getComputedStyle(b)
;aq(a,c)||aj&&ar(a,c,aj)||(Q=!1)}}}Q||(P=!1)}if(P){let c=!0;if(!al){const b=a.labels;if(b){const f=b.length;let g=!0
;if(f>1)for(let c=0;c<f;c++){const e=b[c].htmlFor;if(e){let b;try{b=d.querySelectorAll("#"+CSS.escape(e))}catch(aR){g=!1;break}
const c=b.length;if(0===c)continue;if(1!==c){g=!1;break}if(b[0]!==a){g=!1;break}}}if(g)for(let c=0;c<f;c++){const d=b[c],f=an(d)
;if((0,h.X4)(f))continue;const g=s.getComputedStyle(d);if(aq(f,g)||aj&&ar(f,g,aj))continue;if(!((0,e.Kk)(d,a)>=v)){al=d,y=f,ah=g
;break}}!al&&f>0&&(c=!1)}}if(!al){const d=a.previousElementSibling,e=a.nextElementSibling
;if(c&&(aa(d,"iframe")||aa(e,"iframe"))&&(c=!1),c&&("text"===E||"password"===E)&&aa(e,"input")){const d=an(a);if(!(0,
h.dX)(d)&&d.width<=b&&d.height<=b){const a=e.getBoundingClientRect();!(0,h.dX)(a)&&Math.abs(d.right-a.left)<=b&&(c=!1)}}
if(c&&("text"===E||"password"===E)&&ab(a)&&(c=!1),c)for(let b=a.parentElement,c=0;b&&c<3&&b!==ai&&b!==ak;b=b.parentElement,c++){
const c=an(b);if((0,h.X4)(c))continue;if(c.height>=50)break;const d=s.getComputedStyle(b);if(aq(c,d)||aj&&ar(c,d,aj))continue
;if(b.querySelectorAll(n).length>1)break;const e=b.querySelectorAll("a[target=_blank]");if(e.length>0&&a!==e[0])break;y=c,al=b,
ah=d}}}else al=null,at=!1;if(!al){if(!g)return null;at=!1}}if(at&&ai&&al){av=(0,h.gv)(y),aw=(0,h.Z8)(av)
;const a=as(al,aw,s,t,ai,d,c);let b=!1;if(2===a){if(!g)return null;am=!1,at=!1,b=!0}else 1===a&&(am=!1,at=!1,b=!0);if(b){
const a=(0,h.Z8)(av);(0,h.XF)(a,aw),aw=a}aj&&(0,h.ZJ)(aw,aj.left,aj.top,aj.right,aj.bottom),(0,h.aH)(aw)&&(am=!1,at=!1)}
if(at&&aw&&al&&av){const b=(aw[0]+aw[2])/2,e=(aw[1]+aw[3])/2;let i
;if("text"===E||"password"===E||"select"===E||"checkbox"===E||"radio"===E)if("rtl"===ag.direction||"right"===ag.textAlign){
let c=20;a===al&&(c+=(0,f.i7)(ah.paddingRight));const d=aw[2]-c;i=d>b?d:b}else{let c=20;a===al&&(c+=(0,f.i7)(ah.paddingLeft))
;const d=aw[0]+c;i=d<b?d:b}else i=b;if(d.elementsFromPoint||d.elementFromPoint){am=!1;let b=null;const j=a.labels
;if(j)for(let c=0;c<j.length;c++){const d=j[c];if(d&&d.contains(a)){b=d;break}}if(!b){const c=4
;for(let d=a.parentElement,e=0;d&&e<c&&d!==ai&&d!==ak;d=d.parentElement,e++){const a=an(d);if(!(0,h.X4)(a)){const b=(0,h.gv)(a)
;if(!(0,h.d6)(b,aw))break;if(a.height>=4*(av[3]-av[1])/3)break}b=d}}const m="none"===ah.pointerEvents;let n,o
;if(m)for(let a=al.parentElement;a;a=a.parentElement){if("none"!==s.getComputedStyle(a).pointerEvents){n=a;break}}
if(H&&d.elementsFromPoint){const a=l.F.now()
;if(o=d.elementsFromPoint(i,e),null===(k=null==c?void 0:c.info)||void 0===k?void 0:k.custom);else if(o.length>0){
let a=o[0],b=a.shadowRoot;for(let c=0;c<=2&&b&&b.elementsFromPoint&&(o=b.elementsFromPoint(i,e),o.length>0);++c)a=o[0],
b=a.shadowRoot}l.F.now()-a>200&&(H=!1)}else{const a=d.elementFromPoint(i,e);a&&(o=[a])}if(o){let c;for(c=0;c<o.length;c++){
const d=o[c];if(W(d))continue;if(d===a||d===al){am=!0;break}if(m&&d===n){am=!0;break}const e=d.tagName&&d.tagName.toLowerCase()
;if("input"===e||"button"===e||"a"===e){if(al!==a&&al.contains(d)){if(!g)return null;am=!1}else am=!0,ap=!0;break}
if(al.contains(d)){am=!0;break}if(d===a.previousElementSibling||d===a.nextElementSibling){am=!0;break}if(b&&b.contains(d)){am=!0
;break}if(aa(d,"label")){am=!0;break}if(j){let a=!1;for(let b=0;b<j.length;b++){if(j[b].contains(d)){a=!0;break}}if(a){am=!0
;break}}const h=s.getComputedStyle(d);if(!d.hasChildNodes()||(ax=h)&&"fixed"===ax.position){const a=d.getBoundingClientRect()
;if(a&&(a.width>y.width||a.height>y.height)){if(!h.opacity||"0"===h.opacity)continue;if("1"===h.opacity){
const a=h.backgroundColor;if(a&&"rgba(0, 0, 0, 0)"!==a){const b=(0,f.q3)(a);if(null!==b&&b<=.01)continue}else{
if(!h.backgroundImage)continue}}}}am=!0,ap=!0;break}const d=a
;if(am&&!ap&&!L&&(!d.labels||0===d.labels.length)&&(("text"===E||"password"===E||"select"===E)&&!d.placeholder&&!d.value||"button"===E&&!a.innerText&&!a.textContent)){
for(;c<o.length;c++){const d=o[c];if(d===a)continue
;if(b&&(b===d||b.compareDocumentPosition(d)&Node.DOCUMENT_POSITION_CONTAINS))break;const e=an(d);if((0,h.X4)(e))break
;if(e.width>=4*(av[2]-av[0])/3||e.height>=4*(av[3]-av[1])/3)break;let f=d.innerText||d.textContent;if(f&&(f=f.trim(),f)){au=f
;break}}if(!au){const b=a.nextElementSibling;if(0===(null==b?void 0:b.childElementCount)){const a=an(b);if(!(0,h.X4)(a)){
const c=(0,h.gv)(a);if((0,h.I2)(av,c)){const a=(null==b?void 0:b.innerText)||(null==b?void 0:b.textContent);a&&(au=a)}else{
const a=av[3]-av[1],d=c[3]-c[1];if(c[1]<av[1]&&(0,h.tZ)(c[0],c[2],av[0],av[2])&&d<=a&&av[1]-c[3]<=a){
const a=(null==b?void 0:b.innerText)||(null==b?void 0:b.textContent);a&&(au=a)}}}}}}}else am=!1}}var ax
;const ay=t&&d.activeElement===a;let az=G.get(a);if(az);else if(am&&!ay&&"input"===B&&"text"===D){let b=!1
;const c=a.nextElementSibling;if(Z(c,"password")&&function(a,b){const c=an(a),d=b.getComputedStyle(a);return(0,
h.X4)(c)&&"none"===d.display}(c,s)&&(Z(c.nextElementSibling,"password","text")||aa(c.nextElementSibling,"button")||(b=!0,az=c,
E="password",J=az.value,K=az.defaultValue)),!b){const b=ab(a);if(b){const c=b.type&&b.type.toLowerCase()
;if("password"===c||"text"===c&&!a.name&&b.name){const a=an(b),d=s.getComputedStyle(b);"password"===c?((0,
h.X4)(a)&&"none"===d.display||(0,h.kF)(y,a)&&(0,h.PY)(y,a)>.5)&&(az=b,E=c,J=az.value,K=az.defaultValue):"text"===c&&(0,
h.X4)(a)&&"none"===d.display&&(az=b,E=c,J=az.value,K=az.defaultValue)}}}}az||(az=a);const aA={},aB={m_pos:av||[0,0,0,0],
m_type:E,m_visible:am,m_html:aA},aC={m_data:aB,m_html_element:a};if(al&&(aC.m_visible_element=al),az&&(aC.m_real_element=az),c){
if(aC.m_traits=c,!M&&c.options){M=[];const b=U(a,c.options);if(b)for(let a=0;a<b.length;++a){const c=b[a];M.push({
m_text:c.innerText})}}(null===(m=c.info)||void 0===m?void 0:m.valueAttr)&&(aA.m_has_value=!0)}let aD
;const aF=s&&(0!==s.scrollX||0!==s.scrollY);if(y)if(aF){const a=Math.round(s.scrollX),b=Math.round(s.scrollY);aD=(0,h.DS)((0,
h.gv)(y),a,b),aB.m_pos_doc=aD}else aD=av;B&&(aA.m_tag=B),az.id&&(aA.m_id=az.id);const aG=az.getAttribute("name")
;aG&&(aA.m_name=aG);const aH=az.getAttribute("data-rf");if(null!==aH&&(aA.m_data_rf=aH),
"true"===az.getAttribute("data-val"))if(az.getAttribute("data-val-creditcard"))aA.m_validation_text="Credit card number";else if(az.getAttribute("data-val-email"))aA.m_validation_text="Email";else{
const a=["data-val-required","data-val-regex","data-val-range","data-val-length","data-val-minlength","data-val-maxlength","data-val-equalto"]
;for(const b of a){const a=az.getAttribute(b);if(a){aA.m_validation_text=a;break}}}let aI;ap&&(aA.m_overlapped=!0);try{
aI=d.getSelection?d.getSelection():t.getSelection()}catch(aR){aI=t.getSelection()}
if((null==aI?void 0:aI.containsNode(a))&&(aA.m_selected=!0),ay&&(aA.m_focused=!0),d.host&&(aA.m_shadow_dom=!0),R){if(af){
aA.m_editable=!0;"true"===a.getAttribute("aria-multiline")&&(aA.m_multiline=!0),a.textContent&&(aB.m_value=a.textContent)
;const b=getComputedStyle(a,"::before");if(b&&b.content&&"none"!==b.content){const c=/\battr\s*\(([^\s)]*)\s*\)/.exec(b.content)
;if(c&&c[1]){const b=a.getAttribute(c[1]);b&&(aA.m_placeholder=b)}aA.m_placeholder||(aA.m_placeholder=b.content)}
if(!aA.m_placeholder){const b=a.getAttribute("data-ph");b&&(aA.m_placeholder=b)}
}else if(null===(o=null==c?void 0:c.info)||void 0===o?void 0:o.custom){if(void 0===aB.m_value&&c.info.valueAttr){
const b=a.getAttribute(c.info.valueAttr);b&&(aB.m_value=b)}}else{if(D&&(aA.m_type=D),az.readOnly&&(aA.m_read_only=!0),
az.disabled&&(aA.m_disabled=!0),
L?aA.m_caption=L:au&&(aA.m_caption=au),(a.placeholder||az.placeholder)&&(aA.m_placeholder=a.placeholder||az.placeholder),
!aA.m_placeholder){const b=a.getAttribute("data-ph")||az.getAttribute("data-ph");b&&(aA.m_placeholder=b)}
void 0!==O&&O>0&&(aA.m_maxlength=O),"textarea"===B&&(aA.m_multiline=!0),V&&(J&&(ay||J!==aA.m_placeholder)&&(aB.m_value=J),
K&&(aB.m_default_value=K)),ac&&(null!==ad&&(aB.m_checked=ad),null!==ae&&(aB.m_default_checked=ae)),M&&(aB.m_options=M,
aB.m_multiselect=N)}I&&(aA.m_role=I)}const aJ=aD?aD.join():""
;aA.m_name||aA.m_id?aC.m_keys=[aJ,aB.m_type+"|"+(aA.m_name||"")+"|"+(aA.m_id||"")]:aC.m_keys=[aJ]
;const aK=az.getAttribute("autocomplete");if(aK&&"off"!==aK&&(aA.m_autocomplete=aK),a.title&&(aA.m_title=a.title),
!aB.m_caption&&(null===(p=null==c?void 0:c.info)||void 0===p?void 0:p.captionAttr)){const b=a.getAttribute(c.info.captionAttr)
;b&&(aB.m_caption=b)}if(null===(q=null==c?void 0:c.info)||void 0===q?void 0:q.labelAttr){
const b=a.getAttribute(c.info.labelAttr);b&&(aA.m_labels||(aA.m_labels=[]),aA.m_labels.push({m_text:b.trim()}))}
const aL=a.labels;if(aL){let b=!1,c=!1;for(let f=0;f<aL.length;f++){const g=aL[f];if(g){const f=g.htmlFor;if(f)try{
const a=d.querySelectorAll("#"+CSS.escape(f)),c=a.length;0===c||(1===c?a[0]:c>1&&(b=!0))}catch(aR){}
let i=g.innerText||g.textContent;if(i&&(i=i.trim()),i){aA.m_labels||(aA.m_labels=[]);const b={m_text:i
},d=an(g),f=s.getComputedStyle(g);if((0,h.X4)(d)||ao(f)){(0,e.Kk)(g,a)>=v&&(c=!0)}else b.m_pos=(0,h.gv)(d),aF&&(b.m_pos_doc=(0,
h.DS)((0,h.gv)(d),scrollX,scrollY));aA.m_labels.push(b)}}}aA.m_labels&&(b||c)&&(aA.m_labels=aA.m_labels.filter((a=>a.m_pos)),
0===aA.m_labels.length&&delete aA.m_labels)}let aM=a.getAttribute("aria-label");aM&&(aM=aM.trim()),
aM&&(aA.m_labels||(aA.m_labels=[]),aA.m_labels.push({m_text:aM,m_aria_label:!0}));const aN=a.getAttribute("aria-labelledby")
;if(aN){const a=aN.split(" ");for(const b of a)try{const a=d.querySelector("#"+CSS.escape(b));if(!a)continue
;let c=a.innerText||a.textContent;if(c&&(c=c.trim()),!c)continue;aA.m_labels||(aA.m_labels=[]),aA.m_labels.push({m_text:c,
m_aria_label:!0})}catch(aR){continue}}if(!aA.m_labels&&"checkbox"!==E&&"radio"!==E&&"button"!==E&&"link"!==E){
const b=a.previousElementSibling,c=a.nextElementSibling,e=c&&aa(c,"label")?c:void 0,f=b&&aa(b,"label")?b:void 0;let g;if(e&&!f){
const a=c.nextElementSibling;if(a&&aa(a,"input")||b&&a){const a=an(c);(0,h.PY)(a,y)>.33&&(g=c)}else g=c}else if(f&&!e){
const a=b.previousElementSibling;if(a&&aa(a,"input")||c&&a){const a=an(b);(0,h.PY)(a,y)>.33&&(g=b)}else g=b
}else if(!f&&!e)for(let d=a.parentElement,h=0;d&&h<w&&!(d===ak||d.children.length>x);d=d.parentElement,h++){
const a=d.getElementsByTagName("label");if(a[0]){if(a[1])break;g=a[0]}}if(g){let b=!1;if(g.htmlFor)try{
const c=d.querySelectorAll("#"+CSS.escape(g.htmlFor));if(0===c.length)b=!0;else if(1===c.length){
const d=c[0].getElementsByTagName("input");d[0]&&!d[1]&&(b=d[0]===a)}}catch(aR){}else b=!0;if(b){
let a=g.innerText||g.textContent;if(a&&(a=a.trim()),a){aA.m_labels||(aA.m_labels=[]);const b={m_text:a
},c=an(g),d=s.getComputedStyle(g);(0,h.X4)(c)||ao(d)||(b.m_pos=(0,h.gv)(c),aF&&(b.m_pos_doc=(0,h.DS)((0,
h.gv)(c),scrollX,scrollY))),aA.m_labels.push(b)}}}}const aO=a.tabIndex;aO>0&&(aA.m_tab_index=aO),
"rtl"===ag.direction&&(aA.m_dir=ag.direction);const aP=a.form;if(aP){const a=X(aP);a&&(aA.m_form_key=a)}
if("iframe"===B&&a.hasAttribute("sandbox")){const b=a.getAttribute("sandbox");null!==b&&(aA.m_sandbox=b)}let aQ=!1
;if("link"===E||"button"===E?(aQ=!0,aC.m_clickable=!0):"generic"===E&&(aQ=!0),aQ){const b=z(aE(a))
;if(1===b)a.id&&a.id.toLowerCase&&a.id.toLowerCase().includes("action")||"button"===E&&"submit"===D||(aC.m_action=!1);else if(0===b)aC.m_action=!0;else{
let b=a.getAttribute("aria-describedby");b&&(b=b.trim(),b&&d.getElementById(b)&&(aC.m_action=!0))}}return aC}function S(a){
const b=a.className
;return b&&/^button| button|button |button$|-btn |-btn$/g.test(b)&&!b.endsWith("bar")&&!b.endsWith("group")&&!b.startsWith("slider")||!1
}function T(a,b){if(b){if("string"==typeof b){return(0,e.HW)(a).querySelector(b)}{const c=b.selector,d=V(a,b.parentLevel)
;if(c&&d){const b=c.replace(/{[-\w]+}/g,(b=>{if(b){const c=b.substring(1,b.length-1);if(c)return a.getAttribute(c)||""}return""
}));return d.querySelector(b)}}}return null}function U(a,b){if(b){const c=b.selector,d=V(a,b.parentLevel);if(c&&d){
const b=c.replace(/{[-\w]+}/g,(b=>{if(b){const c=b.substring(1,b.length-1);if(c)return a.getAttribute(c)||""}return""}))
;return d.querySelectorAll(b)}}return null}function V(a,b){if(!a)return null;if(0===b)return a;if(b){for(let c=0;c<b;++c){
const b=a.parentNode;if(!b)return null;a=b}return a}return(0,e.HW)(a)}function W(a){const b=I.onShouldIgnoreElement
;return b&&b(a)||!1}function X(a){if(!a)return null;const b=an(a);return(0,h.H6)(b)?null:(0,h.gv)(b).join()}function Y(a){
const b=an(a);return(0,h.X4)(b)}function Z(a,b,c){if(!a)return!1
;const d=a.tagName&&a.tagName.toLowerCase(),e=a.type&&a.type.toLowerCase();return"input"===d&&(e===b||void 0!==c&&e===c)}
function aa(a,b){if(!a)return!1;return(a.tagName&&a.tagName.toLowerCase())===b}function ab(a){let b,c
;for(let d=a.nextElementSibling,e=5;d&&0!==e;d=d.nextElementSibling,e--){const a=d.tagName&&d.tagName.toLowerCase()
;if("input"===a){if(b){b=null;break}b=d}else if("button"===a){b=null;break}}
for(let d=a.previousElementSibling,e=5;d&&0!==e;d=d.previousElementSibling,e--){const a=d.tagName&&d.tagName.toLowerCase()
;if("input"===a){if(c){c=null;break}c=d}else if("button"===a){c=null;break}}if(c){if(!b)return c}else if(b)return b;return null}
function ac(a,b,c,d){let e,f;if(e=c[3]<=b[1]?0:c[1]>=b[3]?2:1,c[2]<=b[0])f=0;else if(c[0]>=b[2])f=2;else if(f=1,1===e){
const a=(c[3]+c[1])/2;a<b[1]?e=0:a>b[3]&&(e=2);const d=(c[2]+c[0])/2;d<b[0]?f=0:d>b[2]&&(f=2)}let g;if(1===f){
const f=b[2]-b[0],h=c[2]-c[0];if(d&&2*h<f);else switch(e){case 0:g=d?c[3]:(2*c[3]+b[1])/3,g>a[1]&&(a[1]=g);break;case 2:
g=d?c[1]:(c[1]+2*b[3])/3,g<a[3]&&(a[3]=g)}}else if(1===e)switch(f){case 0:g=d?c[2]:(2*c[2]+b[0])/3,g>a[0]&&(a[0]=g);break
;case 2:g=d?c[0]:(c[0]+2*b[2])/3,g<a[2]&&(a[2]=g)}}function ad(a,b,c,d,e,f){
const g=Math.min((b[3]-b[1])/5,10),i=(b[3]-b[1])/3,j={};let k
;const l=[c[0],b[1]+g,b[0],b[3]-g],m=-b[0],n=-b[1],o="password"===a.m_type;let p;p=ae(d,0,i,l,!o,k),p&&((0,h.c5)(p.m_pos,m,n),
j.left=p),e&&(l[0]=b[0]+g,l[1]=c[1],l[2]=b[2]-g,l[3]=b[1],p=ae(d,1,i,l,!o,k),p&&((0,h.c5)(p.m_pos,m,n),j.top=p)),l[0]=b[2],
l[1]=b[1]+g,l[2]=c[2],l[3]=b[3]-g,p=ae(d,2,i,l,!o,k),p&&((0,h.c5)(p.m_pos,m,n),j.right=p),f&&(l[0]=b[0]+g,l[1]=b[3],l[2]=b[2]-g,
l[3]=c[3],p=ae(d,3,i,l,!o,k),p&&((0,h.c5)(p.m_pos,m,n),j.bottom=p)),a.m_have_captions=!0,a.m_captions=j}
function ae(a,b,c,d,f,g){const h=(0,j.TT)((0,e.y0)(a));let i,k,l,m,n,o;switch(b){case 0:i=d[2]-1,k=d[1],n=d[0],o=d[3],l=-c,m=c
;break;case 1:i=d[0],k=d[3]-1,n=d[2],o=d[1],l=c,m=-c;break;case 2:case 3:i=d[0],k=d[1],n=d[2],o=d[3],l=c,m=c;break;default:
return null}switch(b){case 0:case 2:{const c=[(k+o)/2,k,o],e=(n-i)/5/l;for(let g=i,j=0;l>0?g<n:g>=n;g+=l,j++){
const i=ai(a,g,c[j%3],d,0===b,2===b,f,h);if(null!==i)return!1===i?null:i;j>0&&j<e&&(l*=1.5)}}break;case 1:case 3:{
const b=(o-k)/m;for(let c=k,e=0;m>0?c<o:c>=o;c+=m,e++){for(let b=i,g=0;l>0?b<n:b>=n;b+=l,g++){if(g%3!=e%3)continue
;const i=ai(a,b,c,d,!1,!0,f,h);if(null!==i)return!1===i?null:i}e>0&&e<b&&(m*=1.5)}}}return null}function af(a,b,c,d,f,g){
const i=Math.min((c[3]-c[1])/5,10),j={},k=[d[0],c[1]+i,c[0],c[3]-i],l=[c[0]+i,d[1],c[2]-i,c[1]],m=[c[2],c[1]+i,d[2],c[3]-i],n=[c[0]+i,c[3],c[2]-i,d[3]],o=a.ownerDocument
;if(!o)return;const p=o.defaultView;if(!p)return;const q=(0,e.HW)(a)&&(0,e.D)(o);if(!q)return;const r=an(q),s=-c[0],t=-c[1]
;const u=o.createRange(),v=1+(f?1:0);let w=0;const x="password"===b.m_type;for(let e=ah(a),A=0;e&&A<50&&w<v;e=ah(e),A++){
if(e.nodeType!==Node.TEXT_NODE)continue;u.setStart(e,0),u.setEnd(e,e.textContent&&e.textContent.length||0)
;const a=u.getClientRects();if(!a)break;const b=e.parentElement;if(!b)break;if(b.isContentEditable)break
;if(ap(p,b,r))for(let c=a.length-1;c>=0;c--){const b=(0,h.gv)(a[c]),d=(0,h.d6)(b,k),g=(0,h.d6)(b,l),i=(0,h.d6)(b,m),o=(0,
h.d6)(b,n);if(d&&!(g||i||o)){if(!j.left){const a=aj(e,k,1,!0,!1,!x,r);a&&((0,h.c5)(a.m_pos,s,t),j.left=a,w++)}
}else if(f&&g&&!(d||i||o)&&!j.top){const a=aj(e,l,1,!0,!1,!x,r);a&&((0,h.c5)(a.m_pos,s,t),j.top=a,w++)}if(w>=v)break}}
const y=1+(g?1:0);let z=0;for(let e=ag(a),A=0;e&&A<50&&z<y;e=ag(e),A++){if(e.nodeType!==Node.TEXT_NODE)continue;u.setStart(e,0),
u.setEnd(e,e.textContent&&e.textContent.length||0);const a=u.getClientRects();if(!a)break;const b=e.parentElement;if(b){
if(b.isContentEditable)break;if(ap(p,b,r))for(let b=0;b<a.length;b++){const c=a[b],d=(0,h.gv)(c),f=(0,h.d6)(d,k),i=(0,
h.d6)(d,l),o=(0,h.d6)(d,m),p=(0,h.d6)(d,n);if(o&&!(f||i||p)){if(!j.right){const a=aj(e,m,3,!1,!0,!x,r);a&&((0,
h.c5)(a.m_pos,s,t),j.right=a,z++)}}else if(g&&p&&!(f||i||o)&&!j.bottom){const a=aj(e,n,3,!1,!0,!x,r);a&&((0,h.c5)(a.m_pos,s,t),
j.bottom=a,z++)}if(z>=y)break}}}b.m_have_captions=!0,b.m_captions=j}function ag(a){if(!a)return null;let b=a.firstChild
;if(b)return b;for(;a;){if(b=a.nextSibling,b)return b;a=a.parentNode}return null}function ah(a){if(!a)return null
;let b=a.previousSibling;if(!b)return b=a.parentNode,b||null;for(;b;){const a=b.lastChild;if(!a)return b;b=a}return null}
function ai(a,b,c,d,f,g,h,i){const j=(0,e.R6)(a,b,c);if(!j)return!1;return aj(j.node,d,null,f,g,h,i)}function aj(a,b,c,d,e,f,g){
const i=a.ownerDocument;if(!i)return null;let k=b;if(a.nodeType===Node.TEXT_NODE){const b=a.textContent;if(!b)return null
;const m=a.parentElement;if(m){if(m.isContentEditable)return null;switch(m.tagName.toLowerCase&&m.tagName.toLowerCase()){
case"button":case"textarea":case"select":return null;case"a":if(!f)return null}}if(0===b.length)return null
;let n=b.trim(),o=a,p=0,q=a,r=b.length;const s=i.createRange(),t=(0,j.TT)(i.defaultView);let u=!1,v=!1,w=!1
;const x=(k[3]-k[1])/2;if(d){let b=al(a);for(let a=0;b&&a<10;a++,b=al(b)){const a=b.nodeType===Node.TEXT_NODE;if(!a)continue
;try{s.setStart(b,0)}catch(l){return null}s.setEnd(b,b.textContent&&b.textContent.length||0);const d=s.getClientRects()
;if(!d)break;const e=b.parentElement;if(!e)continue;if(e.isContentEditable)break;if(!ap(t,e,g))continue;let f=!1,i=!1
;for(let b=d.length-1;b>=0;b--){const a=d[b];let e=!1;if(a.height<8)e=!0;else if((0,
h.nc)(a.left,a.top,a.right,a.bottom,k[0],k[1],k[2],k[3])){const b=(0,h.gv)(a);(0,h.XF)(b,k);const d=b[3]-b[1]
;if(d<x&&d<a.height/2)e=!0;else if(i=!0,!w)if(w=!0,1===c){const a=b[1]-d/2;if(a>k[1]){const b=(0,h.Z8)(k);b[1]=a,k=b}
}else if(3===c){const a=b[3]+d/2;if(a<k[3]){const b=(0,h.Z8)(k);b[3]=a,k=b}}}else e=!0;if(e&&(f=!0,i))break}if(i&&a){
const a=b.textContent,c=a&&a.trim();c&&(0!==n.length&&" "!==n.charAt(0)&&(n=" "+n),n=c+n,o=b,p=0,u=!0)}if(f)break}}if(e){
let b=ak(a);for(let a=0;b&&a<10;a++,b=ak(b)){const a=b.nodeType===Node.TEXT_NODE;if(!a)continue;try{s.setStart(b,0)}catch(l){
return null}const d=b.textContent&&b.textContent.length||0;s.setEnd(b,d);const e=s.getClientRects();if(!e)break
;const f=b.parentElement;if(!f)continue;if(f.isContentEditable)break;if(!ap(t,f,g))continue;let i=!1,j=!1
;for(let b=0;b<e.length;b++){const a=e[b];let d=!1;if(a.height<8)d=!0;else if((0,
h.nc)(a.left,a.top,a.right,a.bottom,k[0],k[1],k[2],k[3])){const b=(0,h.gv)(a);(0,h.XF)(b,k);const e=b[3]-b[1]
;if(e<x&&e<a.height/2)d=!0;else if(j=!0,!w)if(w=!0,1===c){const a=b[1]-e/2;if(a>k[1]){const b=(0,h.Z8)(k);b[1]=a,k=b}
}else if(3===c){const a=b[3]+e/2;if(a<k[3]){const b=(0,h.Z8)(k);b[3]=a,k=b}}}else d=!0;if(d&&(i=!0,j))break}if(j&&a){
const a=b.textContent;a&&a.trim()&&(0!==n.length&&" "!==n.charAt(n.length-1)&&(n+=" "),n+=a,q=b,r=d,v=!0)}if(i)break}}
if(n=n.trim(),0===n.length)return null;try{s.setStart(o,p)}catch(l){return null}s.setEnd(q,r);const y=s.getClientRects()
;if(!y)return null;let z=null;for(let a=0;a<y.length;a++){const b=y[a]
;(0,h.nc)(b.left,b.top,b.right,b.bottom,k[0],k[1],k[2],k[3])&&(z=(0,h.Bm)(z,b.left,b.top,b.right,b.bottom))}return z?((0,
h.D2)(z),(0,h.aH)(z)?null:{m_text:n,m_pos:z}):!(d&&!e&&u)&&(!(e&&!d&&v)&&null)}return null}function ak(a){if(!a)return null
;if(am(a))return null;let b=a.firstChild;if(b)return am(b)?null:b;for(;a;){if(b=a.nextSibling,b)return am(b)?null:b
;if((a=a.parentNode)&&am(a))return null}return null}function al(a){if(!a)return null;if(am(a))return null
;let b=a.previousSibling;if(!b)return b=a.parentNode,b?am(b)?null:b:null;for(;b;){if(am(b))return null;const a=b.lastChild
;if(!a)return b;b=a}return null}function am(a){if(a.nodeType===Node.ELEMENT_NODE){const b=a;if(b.isContentEditable)return!0
;switch(b.tagName.toLowerCase&&b.tagName.toLowerCase()){case"select":case"option":case"input":case"button":case"textarea":
case"a":case"br":return!0}}return!1}function an(a){return a.getBoundingClientRect()}function ao(a){
return a&&("hidden"===a.visibility||"collapsed"===a.visibility)||!1}function ap(a,b,c){const d=an(b);if(!d)return!1
;const f=a.getComputedStyle(b);if(aq(d,f))return!1;if(!c){const a=(0,e.HW)(b);if(!(c=a&&(0,e.y0)(a)))return!1}return!ar(d,f,c)}
function aq(a,c){if((0,h.X4)(a))return!0;if((0,j.TT)(a).width<=b||(0,j.TT)(a).height<=b)return!0;if(c){if(ao(c))return!0;if((0,
f.i7)(c.opacity)<.05&&"none"===c.pointerEvents)return!0}return!1}function ar(a,c,d){if(c&&"fixed"===c.position){
const e=a.left+(0,f.i7)(c.paddingLeft),g=a.top+(0,f.i7)(c.paddingTop),h=a.right-(0,f.i7)(c.paddingRight),i=a.bottom-(0,
f.i7)(c.paddingBottom);if(h<=d.left+b||i<=d.top+b||e>=d.right-b||g>=d.bottom-b)return!0
;if(h-e<=b&&(a.left<=d.left+b||a.right>=d.right-b)||i-g<=b&&(a.top<=d.top+b||a.bottom>=d.bottom-b))return!0}return!1}
function as(a,d,f,g,i,k,l){var m
;const n=(0,h.Z8)(d),o=(0,h.Z8)(d),p=[null,null,null,null],q=[null,null,null,null],r=g&&g.body,s=null===(m=null==l?void 0:l.info)||void 0===m?void 0:m.opacity
;let t=1;for(let u=a,v=k;u;){const a=v.host;for(let d=f.getComputedStyle(u);;){let e,g
;if("static"===d.position||"relative"===d.position?e=u.parentElement:(e=u.offsetParent,g=!e&&u!==r),void 0!==s){if(s<c)return 2
}else if(""!==d.opacity){const a=parseFloat(d.opacity);if(!Number.isNaN(a)&&(t*=a,t<c))return 2}if(e)if(e===i){
const a=f.getComputedStyle(i),b=f.getComputedStyle(r);let c=a.overflowX;"visible"===c&&(c=b.overflowX,"visible"===c&&(c="auto"))
;let d=a.overflowY;"visible"===d&&(d=b.overflowY,"visible"===d&&(d="auto")),au(i,c,d,p,q),e=null}else if(e===r){
if(!r.parentElement)break;d=f.getComputedStyle(r)}else{const a=f.getComputedStyle(e);at(e,a,p,q),d=a}else if(g)(0,
h.vv)(b,b,f.innerWidth-b,f.innerHeight-b,p),(0,h.vv)(b,b,f.screen.width,f.screen.height,q);else if(a){
at(a,f.getComputedStyle(a),p,q)}else(0,h.vv)(b,b,f.screen.width,f.screen.height,p),(0,
h.vv)(-i.scrollLeft+b,-i.scrollTop+b,(i.scrollWidth>i.clientWidth?i.scrollWidth-i.scrollLeft:f.screen.width)-b,(i.scrollHeight>i.clientHeight?i.scrollHeight-i.scrollTop:f.screen.height)-b,q)
;if(null!==q[0]){const a=(0,j.TT)(p[0]),c=(0,j.TT)(p[2]);(0,h.Zr)(n,a,c);const d=(0,j.TT)(q[0]),e=(0,j.TT)(q[2]);if(c-a<e-d){
if((0,h.Zr)(o,d,e),o[2]-o[0]<b)return 2;o[0]=a,o[2]=c}else(0,h.Zr)(o,a,c);if(o[2]-o[0]<b)return 2}if(null!==q[1]){const a=(0,
j.TT)(p[1]),c=(0,j.TT)(p[3]);(0,h.S_)(n,a,c);const d=(0,j.TT)(q[1]),e=(0,j.TT)(q[3]);if(c-a<e-d){if((0,h.S_)(o,d,e),
o[3]-o[1]<b)return 2;o[1]=a,o[3]=c}else(0,h.S_)(o,a,c);if(o[3]-o[1]<b)return 2}if(!e)break;u=e}if(!a)break;u=a,v=(0,e.HW)(u)}
return(0,h.Z8)(n,d),(0,h.aH)(o)?2:(0,h.aH)(n)?1:0}function at(a,b,c,d){if((0,h.vv)(null,null,null,null,d),(0,
h.vv)(null,null,null,null,c),"inline"===b.display||"contents"===b.display)return;const e=an(a)
;if("hidden"===b.overflowX||"clip"===b.overflowX)d[0]=c[0]=e.left,
d[2]=c[2]=e.right;else if("auto"===b.overflowX||"scroll"===b.overflowX){c[0]=e.left,c[2]=e.right;const b=e.left-a.scrollLeft
;d[0]=b,d[2]=b+a.scrollWidth}if("hidden"===b.overflowY||"clip"===b.overflowY)d[1]=c[1]=e.top,
d[3]=c[3]=e.bottom;else if("auto"===b.overflowY||"scroll"===b.overflowY){c[1]=e.top,c[3]=e.bottom;const b=e.top-a.scrollTop
;d[1]=b,d[3]=b+a.scrollHeight}}function au(a,c,d,e,f){(0,h.vv)(null,null,null,null,f),(0,h.vv)(null,null,null,null,e),
"hidden"===c||"clip"===c?(f[0]=e[0]=a.clientLeft+b,
f[2]=e[2]=a.clientLeft+a.clientWidth-b):"auto"!==c&&"scroll"!==c||(e[0]=a.clientLeft+b,e[2]=a.clientLeft+a.clientWidth-b,
f[0]=e[0]-a.scrollLeft,f[2]=a.scrollWidth-a.scrollLeft-b),"hidden"===d||"clip"===d?(f[1]=e[1]=a.clientTop+b,
f[3]=e[3]=a.clientTop+a.clientHeight-b):"auto"!==d&&"scroll"!==d||(e[1]=a.clientTop+b,e[3]=a.clientTop+a.clientHeight-b,
f[1]=e[1]-a.scrollTop,f[3]=a.scrollHeight-a.scrollTop-b)}async function av(a,b,c){var d,f;const h=(0,e.HW)(a),i=h.activeElement
;if(i&&i===a)return i;a.focus(),c.SendFocusEvent(a);const j=l.F.now()+500;for(let e=0;e<50&&l.F.now()<j;e++){await(0,g.XR)(b)
;const c=h.activeElement;if(c!==a){if(c===i)return null;{
const a=null===(f=null===(d=null==c?void 0:c.tagName)||void 0===d?void 0:d.toLowerCase)||void 0===f?void 0:f.call(d)
;if("input"!==a&&"select"!==a&&"textarea"!==a)continue;return c}}return a}return null}function aw(a,b){
const c=b.submitInfo,d=c&&c.m_v8;if(!d)return null;const e=[];let f=!1
;for(const i of b.fields)i.data.m_html&&(d.m_element_type&&i.data.m_type!==d.m_element_type||(e.push(i),
!f&&i.data.m_html.m_form_key&&(f=!0)));let g=null,h=-1;for(let i=0;i<e.length;i++){const a=e[i]
;if(!f||a.data.m_html&&a.data.m_html.m_form_key)if(g){if(void 0!==d.m_x&&void 0!==d.m_y){
const b=aF(a.element),c=Math.abs(b.m_x-d.m_x)+Math.abs(b.m_y-d.m_y);if(c<h){if(g=a.element,0===c)return g;h=c}}}else{
if(g=a.element,void 0===d.m_x||void 0===d.m_y)return g;const b=aF(a.element);if(h=Math.abs(b.m_x-d.m_x)+Math.abs(b.m_y-d.m_y),
0===h)return g}}return g||null}async function ax(a,b){a.focus(),b.SendFocusEvent(a),await(0,g.XR)(C)
;const c=String.fromCharCode(13);b.SendKeyboardEvent("keydown",a,c),b.SendKeyboardEvent("keypress",a,c),await(0,g.XR)(1),
b.SendKeyboardEvent("keyup",a,c)}function ay(a,b){const c=new Set;let d,e,f;{const a=(0,
j.VH)(b.fields,((a,b)=>(a.data.m_index||0)-(b.data.m_index||0))),f=new Set;for(const b of a){const a=b.element;d||(d=a)
;const g=a.form;g&&!f.has(g)&&(f.add(g),c.add(a)),"password"===b.data.m_type&&(void 0===e?e=a:null!==e&&(e=null))}}
f=a.querySelectorAll(q);const g=[],i=c.size>0;if(i)for(let h=0;h<f.length;h++){const a=f[h];c.has(a)&&g.push(h)
}else if(d)for(let h=0;h<f.length;h++){if(f[h]===d){g.push(h);break}}else g.push(-1)
;const l=b.submitInfo,m=l&&l.m_v8,n=m&&m.m_navigation_link;let o=null,p=-1;const r=[];let s=null,t=!1;const u=(0,
j.TT)(a&&a.defaultView);for(let j=0;j<g.length;j++){let a=0,b=!1;for(let c=g[j]+1;c<f.length;c++){
const d=f[c],l=d.tagName.toLowerCase&&d.tagName.toLowerCase()||void 0;if(l&&aA(d,l)){
const c=d.type&&d.type.toLowerCase(),f=aE(d),g=ap(u,d);if(!g)continue;if(g&&f&&f.length>1&&(a++,a>=40))break;const j=aB(d)
;if(n){if(!j)continue}else if(j)continue
;const q=aF(d),v=m&&void 0!==m.m_x?Math.abs(q.m_x-m.m_x):-1,w=m&&void 0!==m.m_y?Math.abs(q.m_y-m.m_y):-1,x=aD(d);if(m){
const a=m.m_caption,b=m.m_image_url;if((a&&a===f||b&&b===x||!a&&!f&&g&&0===v&&0===w)&&(o?v+w<=p&&(o=d,p=v+w):(o=d,p=v+w),
v<5&&w<5&&"link"!==l&&"tr"!==l&&"td"!==l&&"div"!==l&&"span"!==l)){t=!0;break}}let y=!1
;i&&b||null!==d.form&&("input"!==l||"button"!==c&&"submit"!==c?"button"===l&&"submit"===c&&(y=!0):y=!0);const A=z(f)
;if(0===A||1!==A&&y&&0===r.length||v>=0&&v<5&&w>=0&&w<5){if(e){const a=(0,h.gv)(an(e)),b=(0,h.gv)(an(d)),c=(0,h.xq)(a,b)
;c<u.screen.height+u.screen.width&&r.push({m_elem:d,m_type:A,m_distance_to_filled_password:c})}else r.push({m_elem:d,m_type:A})
;if(1===r.length&&!i&&!m){t=!0;break}}else if(!s&&2===A){if(0===z(d.getAttribute("name"))){s=d;continue}if(x){let a=x
;const b=a.lastIndexOf("/");if(b>=0&&(a=a.substr(b+1)),a=(0,k.v$)(a.substr(0,1e3).toLowerCase()).replace(/[-_:]+/g,"").trim(),
0===z(a)){s=d;continue}}if("a"===l){const a=d.href.toLowerCase(),b=d.getAttribute("href")
;if(b&&!b.startsWith("#")&&(a.startsWith("http")||a.startsWith("file"))){let b=aC(a);const c=b.lastIndexOf("/")
;if(c>=0&&(b=b.substr(c+1)),b=(0,k.v$)(b.substr(0,1e3).toLowerCase()).replace(/[-_:]+/g,"").trim(),0===z(b)){s=d;continue}}}}
}else if(i&&"form"===l){if(b=!0,j!==g.length-1)break;if(0!==r.length){t=!0;break}}}if(t)break}if(o)return o;if(r.length>0){
let a=r;e&&(a=(0,j.VH)(r,((a,b)=>(0,j.TT)(a.m_distance_to_filled_password)-(0,j.TT)(b.m_distance_to_filled_password))))
;for(const b of a)if(0===b.m_type)return b.m_elem;return a[0].m_elem}return s||null}function az(a,b){
return!(!a.getAttribute(b)&&!a[b])}function aA(a,b){switch(b){case"a":case"button":return!0;case"input":{
const b=a.type&&a.type.toLowerCase();return"image"===b||"submit"===b||"button"===b}case"img":
return az(a,"onclick")||az(a,"ng-click")||az(a,"onmousedown")||az(a,"ng-mousedown")||az(a,"onmouseup")||az(a,"ng-mouseup")
;case"div":case"span":case"tr":case"td":case"table":case"m":{const b=a.getAttribute("role")
;if(b&&"button"===b.toLowerCase())return!0;const c=a.classList;let d
;if(az(a,"onclick")||az(a,"ng-click"))return!c.contains("tabcontrol")
;if(az(a,"onmouseup")||az(a,"ng-mouseup")||az(a,"onmousedown")||az(a,"ng-mousedown"))return!0
;if(d=a.getAttribute("data-dojo-attach-event")){if(d.includes("onClick"))return!0
}else if(c.contains("button")||c.contains("buttonLogin"))return!0}return!1;default:return!1}}function aB(a){
if("a"!==(a&&a.tagName.toLowerCase&&a.tagName.toLowerCase()))return!1;const b=a.href.toLowerCase()
;if(!b.startsWith("http")&&!b.startsWith("file"))return!1;const c=a.getAttribute("href")
;return!(!c||c.startsWith("#"))&&!(az(a,"onclick")||az(a,"ng-click")||az(a,"onmousedown")||az(a,"ng-mousedown")||az(a,"onmouseup")||az(a,"ng-mouseup"))
}function aC(a){const b=a.indexOf("://");b>=0&&(a=a.substr(b+3));const c=a.indexOf("/");return c>=0&&(a=a.substr(c+1)),a}
function aD(a){if(!a.tagName.toLowerCase)return"";switch(a.tagName.toLowerCase()){case"a":{let b=""
;const c=a.querySelectorAll("img");if(c)for(let a=0;a<c.length;a++){const d=aC(c[a].src);d&&(b&&(b+="|"),b+=d)}return b}
case"input":return"image"===(a.type&&a.type.toLowerCase())?aC(a.src):"";case"img":return aC(a.src);default:return""}}
function aE(a){if(!a.tagName.toLowerCase)return"";switch(a.tagName.toLowerCase()){case"a":{const b=A(a.textContent)
;if(b)return b;const c=A(a.title);if(c)return c;let d="";const e=a.querySelectorAll("img");if(e)for(let a=0;a<e.length;a++){
const b=A(aC(e[a].alt));b&&(d&&(d+="|"),d+=b)}if(d)return d;const f=a.getAttribute("class")
;return f?f.toLowerCase():a.id?a.id.toLowerCase():""}case"input":{const b=a.type?a.type.toLowerCase():null
;if("image"===b)return A(a.getAttribute("alt"));if("submit"===b||"button"===b)return A(a.value)}return"";case"button":
return A(a.textContent||a.getAttribute("aria-label")||null);case"img":return A(a.alt);case"div":case"span":case"tr":case"td":
case"table":case"m":return A(a.textContent);default:if("button"===a.getAttribute("role"))return A(a.textContent);return""}}
function aF(a){let b=0,c=0,d=a;for(;d;){b+=d.offsetLeft-d.scrollLeft,c+=d.offsetTop-d.scrollTop;const a=d.offsetParent
;for(let e=d;e&&e!==a;e=e.parentNode)e.scrollLeft>0&&(b-=e.scrollLeft),e.scrollTop>0&&(c-=e.scrollTop);d=a}return{m_x:b,m_y:c}}}
function z(a){if(!a)return 2;if(a=a.toLowerCase(),u.includes(a))return 0;for(const b of v)if(a.includes(b))return 1
;for(const b of w)if(a.includes(b))return 2;for(const b of x)if(a.includes(b))return 0
;return a.includes("anmelden")&&!a.includes("neu")?0:2}function A(a){return a?(0,
k.v$)(a.substr(0,1e3).toLowerCase()).replace(/[-_:»>]+/g,"").trim():""}},27874:function(a,b,c){c.d(b,{l:function(){return m}})
;var d=c(93648),e=c(31173),f=c(20901),g=c(69893),h=c(95399),i=c(4153),j=c(40868),k=c(78440),l=c(11050);c(13117);function m(){
let a=null;const b=new Map;let c=0;const m=(0,k.E5)(),n=new WeakMap,o=(0,i.y8)(),p=(0,h.Mv)(),q=new Map;let r,s,t=!1;const u={
Init:function(){m.Cancel(),a=null;for(const a of b.values())H(a);b.clear(),q.forEach((a=>{var b
;return null===(b=a.m_task)||void 0===b?void 0:b.Cancel((0,g.ZU)(g.kd,"UnInit"))})),q.clear()},SetDocumentApi:function(b){a=b},
GetContentId:function(){return p},GetFrameInfo:async function(b){return(0,i.TT)(a).GetFrameInfo(b)},
GetDocumentInfo:async function(f,h){const n=h.highPriority?2:1;if(0!==c&&n<=c)throw(0,g.ZU)(g.m,"Busy collecting document info")
;c=n;try{const c=await m.Execute({async action(c){try{return await async function(c,f,h){let m;f.highPriority?m=function(a){
return{async ReleaseThread(){null==a||a.ThrowIfShouldStop()}}}(h):(await(0,e.KK)(500,h),m=y(h));await async function(c,d,e){
await v(c,e);const f=[];for(const[a,h]of b){const b={m_id:a,m_data:h.m_info.m_data,m_html_element:h.m_html_element,
m_real_element:h.m_real_element,m_visible_element:h.m_visible_element,m_traits:h.m_traits,m_keys:h.m_keys};f.push(b)}
if(0===f.length)return;const g=await(null==a?void 0:a.GetFieldsInfo(c,{updateCaptions:d&&d.updateCaptions,onlyVisible:!1,
useProbing:!0,useDOMScan:!0,fields:f},e));if(!g)return;!function(a,c){for(const d of a){const a=d.m_id&&b.get(d.m_id)
;a?E(a,d,c):F(o.GetNext(),d,c)}}(g,{})}(c,{updateCaptions:null==f?void 0:f.updateCaptions},m);l.F.now()
;const n=await async function(b,c,e){var f,h,i,l;const m=await(null==a?void 0:a.GetFieldsList(b,{includePossibleQRCodeImages:!0
},c));if(!m)return;const n=new Set(m.map((a=>a.m_html_element)));for(const s of q.keys())if(!n.has(s)){const t=q.get(s)
;t&&(null===(f=t.m_task)||void 0===f||f.Cancel((0,g.ZU)(g.kd,"Gone")),q.delete(s))}if(0===m.length)return
;null==e||e.ThrowIfShouldStop();const o=(0,d.D)(b),p=[];a:for(const u of m){
const v=u.m_html_element,x=null===(i=null===(h=u.m_data)||void 0===h?void 0:h.m_html)||void 0===i?void 0:i.m_tag;if(w(u,o)){{
const y=q.get(v);if(y){if(!y.m_sent&&y.m_image){if(y.m_sent=!0,p.push(y.m_image),delete y.m_image,p.length>=4)break a;continue a
}if("img"!==x)continue a;{const C=(null==v?void 0:v.src)||null;if(y.m_src===C)continue a
;null===(l=y.m_task)||void 0===l||l.Cancel((0,g.ZU)(g.kd,"IMG.src changed")),q.delete(v)}}}
if("img"!==x||v.complete&&v.src)switch(x){case"img":case"canvas":case"svg":{const D=(null==v?void 0:v.src)||null,E=(0,k.YZ)({
action:G}),F={m_src:D,m_task:E};q.set(v,F),(0,k.fI)(E.Execute(null));break;async function G(a){try{let b;switch(x){case"img":
b=await z(v,a);break;case"canvas":b=A(v);break;case"svg":b=await B(v,a)}if(b)return void(F.m_image={width:b.width,
height:b.height,colorSpace:b.colorSpace,data:await(0,j.n1)(new Uint8Array(b.data))})}catch(b){(0,g.au)(b)}finally{
delete F.m_task}F.m_image={width:0,height:0,colorSpace:"srgb",data:""}}}}}}if(0===p.length)return;null==e||e.ThrowIfShouldStop()
;const r=p.filter((a=>null==a?void 0:a.data));if(0===r.length)return;return p}(c,m,null);l.F.now();return{fields:await x(f),
newPossibleQRCodeImages:n,frame:(0,i.TT)(a).GetFrameInfo(c),contentId:p,lastClickedFieldID:r,lastClickedTime:s}}(f,h,c)
}catch(m){if((0,g.r5)(m,g.kd))throw(0,g.ZU)(g.m,"Retry later");throw m}}},null);return c}catch(t){throw t}finally{c=0}},
GetHtmlElementInfo:async function(c,d){var e;const f=d.clickable,g=d.element
;for(const a of[!0,!1])for(const[c,d]of b)if(d.m_html_element.contains(g)||(null===(e=d.m_visible_element)||void 0===e?void 0:e.contains(g))){
const b=d&&d.m_info&&d.m_info.m_data&&d.m_info.m_data.m_type;if(a&&"button"!==b&&"link"!==b)continue;return{
m_info:Object.assign({},d.m_info),m_html_element:d.m_html_element,m_real_element:d.m_real_element,
m_visible_element:d.m_visible_element,m_traits:d.m_traits,m_clickable:d.m_clickable,m_action:d.m_action}}const h={
m_html_element:g},j=await(0,i.TT)(a).GetFieldInfo(c,{field:h,clickable:f});if(!j)return null;j.m_data&&j.m_data.m_type;return{
m_info:{m_id:0,m_data:j.m_data},m_html_element:j.m_html_element,m_real_element:j.m_real_element,
m_visible_element:j.m_visible_element,m_traits:j.m_traits,m_clickable:j.m_clickable,m_action:j.m_action}},
ClearFieldsCache:function(){for(const a of b.values())H(a);b.clear(),r=void 0,s=void 0},FillFields:async function(c,d){
await v(c,y(null));const e=[],f=d.action||"fill";for(const a of d.fields){const c=a.id,d=b.get(c);if(!d)throw(0,
g.ZU)(g.m,"Fields list not in sync");const h={data:(0,i.TT)(d.m_info.m_data),element:d.m_html_element,
visibleElement:d.m_visible_element,traits:d.m_traits,action:a.action||f,value:a.value};e.push(h)}const h=await(0,
i.TT)(a).FillFields(c,{fields:e,submit:d.submit,submitInfo:d.submitInfo,simulatedInfo:d.simulatedInfo},f)
;if(h&&0!==h.filledFields.length){const a={};J(a);for(const c of h.filledFields){const e=d.fields[c].id,f=b.get(e)
;f&&(f.m_info.m_update_id=a.m_update_id,
f.m_info.m_update_time=a.m_update_time,f.m_clickable||(f.m_info.m_change_id=a.m_update_id,
f.m_info.m_change_time=a.m_update_time,f.m_info.m_simulated_change=!0),f.m_synced=!1)}}return h&&h.result},
GetSubmitInfo:function(b,c){return(0,i.TT)(a).GetSubmitInfo(b,c)},SetLastClickedField:function(a){if(!b.get(a))return;r=a,s=(0,
h.Mv)()},onUserInput:null};return u;async function v(c,d){const e=await(null==a?void 0:a.GetFieldsList(c,{includeInputs:!0,
includeButtons:!0},d));await async function(a){const c={},d=new Map,e=[];for(const[h,i]of b)if(d.set(h,!0),
i&&i.m_keys)for(let a=0;a<i.m_keys.length;a++){const b=e[a]||(e[a]=new Map),c=i.m_keys[a];if(!c)continue;b.has(c)||b.set(c,i)}
const f=a.length;let g=0;for(const[b,h]of a.entries()){if(!h)continue
;const f=h.m_html_element,i=h.m_real_element,j=i&&n.get(i)||f!==i&&n.get(f)||null;if(j){d.delete(j.m_info.m_id);const f=j.m_keys
;if(f)for(let a=0;a<f.length;a++){const b=e[a];if(b){const c=f[a];c&&b.delete(c)}}E(j,h,c),a[b]=null,g++}}
if(g<f)for(let b=0;b<e.length;b++){const h=e[b];if(h)for(let i=0;i<f;i++){const f=a[i];if(!f)continue;const j=f.m_keys
;if(!j)continue;const k=j[b];if(!k)continue;const l=h.get(k);if(l){const h=l.m_info.m_id;d.delete(h);const j=l.m_keys
;if(j)for(let a=b;a<j.length;a++){const b=e[a];if(b){const c=j[a];c&&b.delete(c)}}E(l,f,c),a[i]=null,g++}}}
if(g<f)for(let b=0;b<f;b++){const d=a[b];d&&F(o.GetNext(),d,c)}for(const b of d.keys())I(b)}(e||[])}function w(a,b){
if(!b)return!0;const c=a.m_data;if(!c)return!1;const d=(c.m_pos[2]-c.m_pos[0])/3,e=(c.m_pos[3]-c.m_pos[1])/3
;return c.m_pos[0]+d<=b.clientWidth&&c.m_pos[1]+e<=b.clientHeight&&c.m_pos[2]-d>=0&&c.m_pos[3]-e>=0}async function x(a){
const c=a&&a.fields;if(!c){const c=a&&a.notSynced,d=[];for(const[a,e]of b){const b=e.m_info;c&&e.m_synced?d.push({m_id:a
}):(d.push(b),e.m_synced=!0)}return d}const d=a.contentId!==p,e=[];let f=!1;if(0===b.size)(0,i.f7)(c)||(f=!0);else{
const a=new Map(b);for(const g in c){const h=c[g],j=(0,i.fB)(g),k=b.get(j);if(k){const b=k.m_info,c=h.valueId,g=c?h.updateId:h
;d||g!==b.m_update_id||c&&c!==b.m_value_id?(f=!0,e.push(b),k.m_synced=!0):e.push({m_id:j}),a.delete(j)}else f=!0}
for(const c of a.keys()){f=!0;const a=b.get(c);a&&(e.push(a.m_info),a.m_synced=!0)}}return f?e:null}function y(a){
null==a||a.ThrowIfShouldStop();let b=l.F.now();return{async ReleaseThread(a,c){l.F.now()-b>=30&&(await(0,k.XR)(0),await(0,
e.KK)(300,null),b=l.F.now())}}}async function z(a,b){if(a.complete||await(0,e.B9)(a,b),!C(a.width,a.height))return null
;if(!a.src.startsWith("https:")&&!a.src.startsWith("http:")||(0,
f.N)(a.src,`${window.origin}*`)||"anonymous"===a.crossOrigin)return c(a);{if(t)return h(a);try{return await c(a)}catch(d){
if(!(0,g.n4)(d)||!d.message.includes("tainted"))throw d;return t=!0,h(a)}async function h(a){const d=new Image
;return d.src=a.src,d.crossOrigin="anonymous",await(0,e.B9)(d,b),c(d)}}async function c(a){const[b,c]=D(a.width,a.height)
;return(0,e.eL)(a,{width:b,height:c})}}function A(a){if(!C(a.width,a.height))return null;const[b,c]=D(a.width,a.height)
;return(0,e.HU)(a,{width:b,height:c})}async function B(a,b){if(!C(a.clientWidth,a.clientHeight))return null
;const[c,d]=D(a.clientWidth,a.clientHeight),f=(new XMLSerializer).serializeToString(a),g=await(0,
e.GG)("data:image/svg+xml,"+encodeURIComponent(f),b);return(0,e.eL)(g,{width:c,height:d})}function C(a,b){
return a>=100&&a<=400&&b>=100&&b<=400&&Math.abs(b-a)<20}function D(a,b){const c=190;let d=a,e=b;return a>c?(d=c,
e*=d/a):b>c&&(e=c,d*=e/b),[d,e]}function E(b,c,d){const e=b.m_info,f=c&&c.m_data;{
const d=b.m_html_element,g=b.m_real_element,h=c.m_html_element,j=c.m_real_element,k=h!==d,l=j!==g
;(k||l)&&(k&&d===g&&h===j&&f&&e.m_data&&"text"===e.m_data.m_type&&"password"===f.m_type&&(0,i.TT)(a).SetRealElement(d,h),H(b),
k&&(b.m_html_element=h),l&&(b.m_real_element=j),G(b))}let g,h=!1,j=!1,k=!1,l=!1;{const a=e.m_data;a===f||(a&&f?!function(a,b){
const c=a.m_html,d=b.m_html;if(!c||!d)return!1
;return c.m_selected===d.m_selected&&c.m_focused===d.m_focused&&c.m_disabled===d.m_disabled&&a.m_index===b.m_index&&a.m_type===b.m_type&&a.m_multiselect===b.m_multiselect&&a.m_default_value===b.m_default_value&&a.m_default_checked===b.m_default_checked&&a.m_caption===b.m_caption&&c.m_maxlength===d.m_maxlength&&c.m_tag===d.m_tag&&c.m_id===d.m_id&&c.m_name===d.m_name&&c.m_data_rf===d.m_data_rf&&c.m_type===d.m_type&&c.m_has_value===d.m_has_value&&c.m_read_only===d.m_read_only&&c.m_caption===d.m_caption&&c.m_placeholder===d.m_placeholder&&c.m_autocomplete===d.m_autocomplete&&c.m_title===d.m_title&&c.m_z_index===d.m_z_index&&c.m_font_size===d.m_font_size&&c.m_shadow_dom===d.m_shadow_dom
}(a,f)?h=!0:!function(a,b){if(a.m_visible!==b.m_visible)return!1;if(!(0,i.Fu)(a.m_pos,b.m_pos))return!1;if(!(0,
i.Fu)(a.m_pos_doc,b.m_pos_doc))return!1;const c=a.m_html,d=b.m_html;if(c&&d)return c.m_overlapped===d.m_overlapped&&(0,
i.XM)(c.m_labels,d.m_labels)&&c.m_form_key===d.m_form_key;if(c||d)return!1;return!0}(a,f)?(h=!0,
f.m_have_captions?j=!0:a.m_captions&&(k=!0,
g=a.m_captions,a.m_have_captions&&g&&delete g.m_dbg)):f.m_have_captions?a.m_have_captions&&(0,
i.XM)(a.m_captions,f.m_captions)||(j=!0):(a.m_have_captions||a.m_captions)&&(k=!0,g=a.m_captions):h=!0),f&&a&&!function(a,b){
if(a.m_type!==b.m_type)return!1;switch(a.m_type){case"select":return a.m_value instanceof Array||b.m_value instanceof Array?(0,
i.Fu)(a.m_value,b.m_value):a.m_value===b.m_value;case"radio":case"checkbox":return a.m_checked===b.m_checked;default:
return a.m_value===b.m_value}}(a,f)&&(l=!0)}let m=!1;if(h||l)b.m_keys=c.m_keys,e.m_data=f,k&&f&&((0,i.QN)(f).m_captions=g),
m=!0;else if(j&&f&&e.m_data){const a=e.m_data;(0,i.QN)(a).m_captions=f.m_captions,(0,i.QN)(a).m_have_captions=!0,m=!0}m&&(J(d),
e.m_update_id=d.m_update_id,e.m_update_time=d.m_update_time,l&&(e.m_value_id=e.m_update_id),b.m_synced=!1)}function F(a,c,d){
J(d);const e=c.m_data,f=c.m_html_element,g=c.m_real_element,h={m_info:{m_id:a,m_data:e,m_update_id:d.m_update_id,
m_update_time:d.m_update_time},m_keys:c.m_keys,m_html_element:f,m_real_element:g,m_visible_element:c.m_visible_element,
m_traits:c.m_traits,m_clickable:c.m_clickable,m_action:c.m_action};b.set(a,h),G(h)}function G(b){function c(c){!function(b,c){
if(b.target!==c.m_html_element)return;const d={m_id:c.m_info.m_id,m_data:c.m_info.m_data,m_html_element:c.m_html_element};(0,
k.uT)((async()=>{var e;const f=await(0,i.TT)(a).GetFieldInfo((0,i.TT)(b.target.ownerDocument),{field:d});if(!f)return;const g={}
;J(g),E(c,f,{}),c.m_info.m_change_id=g.m_update_id,c.m_info.m_change_time=g.m_update_time,
null===(e=u.onUserInput)||void 0===e||e.call(u)})(),"_OnHtmlElementInput")}(c,b)}b.m_handlers={input:c},
b.m_html_element.addEventListener("input",c,!0),
n.set(b.m_html_element,b),b.m_real_element&&b.m_real_element!==b.m_html_element&&n.set(b.m_real_element,b)}function H(a){if(a){
if(a.m_handlers){for(const c in a.m_handlers)try{a.m_html_element.removeEventListener(c,a.m_handlers[c],!0)}catch(b){}
delete a.m_handlers}
a.m_html_element&&n.delete(a.m_html_element),a.m_real_element&&a.m_real_element!==a.m_html_element&&n.delete(a.m_real_element)}}
function I(a){const c=b.get(a);c&&(b.delete(a),H(c))}function J(a){a.m_update_id||(a.m_update_id=o.GetNext(),a.m_update_time=(0,
h.Mv)())}}},93648:function(a,b,c){c.d(b,{D:function(){return e},HW:function(){return g},Kk:function(){return h},R6:function(){
return j},Th:function(){return i},q0:function(){return d},y0:function(){return f}});c(31173),c(13117),c(97514);function d(a){
return a=a||document,function(){let a=null;try{a=new KeyboardEvent("keypress"),a=null,a=new MouseEvent("mousedown")}catch(b){}
return null!==a}()?function(){return{SendMouseEvent:a,SendKeyboardEvent:b,SendInputEvent:c,SendChangeEvent:d,SendFocusEvent:e}
;function a(a,b){try{if(!b.ownerDocument)return!1;0;const c=new MouseEvent(a,{bubbles:!0,cancelable:!0,button:0,
view:b.ownerDocument.defaultView});return b.dispatchEvent(c),!0}catch(c){return!1}}function b(a,b,c){try{if(!c)return
;if(!b.ownerDocument)return;const d=c.substr(-1),e=d.charCodeAt(0),f={bubbles:!0,location:0,key:13===e?"Enter":d,
view:b.ownerDocument.defaultView,char:13===e?"":d,charCode:"keypress"===a?e:0,keyCode:e,which:e};13===e&&(f.code="Enter")
;const g=new KeyboardEvent(a,f);0,b.dispatchEvent(g)}catch(d){}}function c(a){try{a.dispatchEvent(new Event("input",{bubbles:!0,
cancelable:!1}))}catch(b){}}function d(a){try{a.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!1}))}catch(b){}}
function e(a){try{a.dispatchEvent(new FocusEvent("focus",{bubbles:!1,cancelable:!1}))}catch(b){}}}():function(a){
const b=a.createEvent("KeyboardEvent");return!!b.initKeyEvent}(a)?{SendMouseEvent:b,SendKeyboardEvent:function(a,b,c){try{
if(!c)return;if(!b.ownerDocument)return;const d=b.ownerDocument.createEvent("KeyboardEvent")
;d.initKeyEvent(a,!0,!0,null,!1,!1,!1,!1,"a".charCodeAt(0),0),b.dispatchEvent(d)}catch(d){}},SendInputEvent:c,SendChangeEvent:d,
SendFocusEvent:e}:{SendMouseEvent:b,SendKeyboardEvent:function(a,b,c){try{if(!c)return;const d=b.ownerDocument;if(!d)return
;const e=c.substr(-1),f=d.createEvent("KeyboardEvent");f.initKeyboardEvent(a,!0,!0,d.defaultView,e,0,"",!1,!1,!1,"en-US"),
b.dispatchEvent(f)}catch(d){}},SendInputEvent:c,SendChangeEvent:d,SendFocusEvent:e};function b(a,b){try{
if(!b.ownerDocument)return!1;const c=b.ownerDocument.createEvent("MouseEvents");return c.initEvent(a,!0,!0),b.dispatchEvent(c),
!0}catch(c){return!1}}function c(a){try{if(!a.ownerDocument)return;const b=a.ownerDocument.createEvent("Events")
;b.initEvent("input",!0,!1),a.dispatchEvent(b)}catch(b){}}function d(a){try{if(!a.ownerDocument)return
;const b=a.ownerDocument.createEvent("Events");b.initEvent("change",!0,!1),a.dispatchEvent(b)}catch(b){}}function e(a){try{
if(!a.ownerDocument)return;const b=a.ownerDocument.createEvent("Events");b.initEvent("focus",!1,!1),a.dispatchEvent(b)
}catch(b){}}}function e(a){return a&&(a.scrollingElement||a.documentElement||a.host)}function f(a){if(!a)return
;const b=a.scrollingElement||a.documentElement
;return b?new DOMRect(b.clientLeft,b.clientTop,b.clientWidth,b.clientHeight):a.host?a.host.getBoundingClientRect():null}
function g(a){return a?a.getRootNode?a.getRootNode():function(a){if(!a)return null;for(;;){const b=a.parentNode;if(!b)return a
;a=b}}(a):a}function h(a,b){var c;if(a===b)return 0;const d=new Map;let e=0,f=a,g=b;for(;f&&g;f=f.parentElement,
g=g.parentElement,e++){if(f===g)return 2*e;const a=null!==(c=d.get(f))&&void 0!==c?c:d.get(g);if(void 0!==a)return a+e
;d.set(f,e),d.set(g,e)}for(e*=2;f;f=f.parentElement,e++);for(;g;g=g.parentElement,e++);return e}function i(a){
return!(!a||!a.caretPositionFromPoint&&!a.caretRangeFromPoint)}function j(a,b,c){let d,e;if(a.caretPositionFromPoint){
const f=a.caretPositionFromPoint(b,c);if(!f)return null;if(d=f.offsetNode,!d)return null;e=f.offset}else{
if(!a.caretRangeFromPoint)return!1;{const f=a.caretRangeFromPoint(b,c);if(!f)return null;d=f.startContainer,e=f.startOffset}}
return{node:d,offset:e}}},92549:function(a,b,c){c.d(b,{A:function(){return d}});const d=[{ignoreFrame:!0,
url:["*://*facebook.com/plugins/*","*://*facebook.com/v2.2/plugins/*","*://*facebook.com/v3.3/plugins/*","*://*facebook.com/extern/*","*://*facebook.com/widgets/*","*://*facebook.com/connect/*","*://*twitter.com/widgets/*","*://*plusone.google.com/*","*://*google.com/ads/*","*://*google.ru/ads/*","*://*google.com/maps/embed*","*://*adservice.google.com/*","*://*doubleclick.net/pagead/*","*://*doubleclick.net/xbbe/*","*://*doubleclick.net/ddm/*","*://*fls.doubleclick.net/*","*://*vk.com/widget/*","*://*interceptedby.admuncher.com/*","*://*staticxx.facebook.com/*","*://*tpc.googlesyndication.com/*","*://*pagead2.googlesyndication.com/*","*://*imasdk.googleapis.com/*","*://*s7.addthis.com/static/*","*://*s.tribalfusion.com/*","*://*assoc-amazon.com/widgets/*","*://*.amazon-adsystem.com/*","*://*assets.bounceexchange.com/*","*://*.roboform.com/password-generator*","*://*.roboform.com/how-secure-is-my-password*","https://passwords.google.com/checkup*","https://passwords.google.com/password*","https://www.tby.org/admin/item_admin*"]
},{url:"https://login.live.com/*",userId:{main:"#displayName",info:{name:"loginfmt",id:""}}},{
url:"https://accounts.google.com/*",userId:{main:"[data-profile-identifier]",info:{name:"identifier",id:""}}},{
url:"https://payments.google.com/*",fillTextField:"SendOnlyLastKey"},{url:"https://login.yahoo.com/*",userId:{
main:"#password-challenge .username"}},{url:"https://*.paypal.com/bizsignup/#/createPassword",fields:[{
main:"input[id=password]",info:{caption:"New Password"}}]},{url:"https://*.paypal.com/authflow/twofactor/*",
fillTextField:"SendOnlyLastKey"},{url:"https://*.paypal.com/*",userId:{main:".profileDisplayEmail",info:{name:"login_email",
id:""}}},{url:"https://signup.hulu.com/account",fields:[{main:"input[id=password]",info:{caption:"New Password"}}]},{
url:"https://*.chase.com/web/auth/*",shadowRootSelector:"#userId, #password, #signin-button"},{
url:["https://*.airbnb.com/*","https://*.airbnb.com.*/*","https://*.airbnb.co.*/*","https://www.airbnb.*/*","https://fr.airbnb.ch/*","https://fr.airbnb.ca/*","https://fr.airbnb.be/*","https://ga.airbnb.ie/*","https://it.airbnb.ch/*"],
notSelector:"input[id=email-signup-email]",fields:[{main:"input[id=email-signup-password]",info:{caption:"Password"}}]},{
url:"https://passport.yandex.ru/auth/*",userId:{main:".CurrentAccount-displayName",info:{name:"login",id:"passp-field-login"}}
},{url:"https://twitter.com/i/flow/signup",fields:[{main:"input[name=password]",info:{caption:"New Password"}},{
main:'select[aria-label="Month"]',info:{caption:"Birth Month"}},{main:'select[aria-label="Day"]',info:{caption:"Birth Day"}},{
main:'select[aria-label="Year"]',info:{caption:"Birth Year"}}]},{url:"https://www.facebook.com/*",fields:[{
list:'[contenteditable="true"][role="textbox"][spellcheck="true"]',info:{caption:"Message"}}]},{
url:"https://secure.login.gov/sign_up/enter_password*",fields:[{main:'input[name="password_form\\[password\\]"]',info:{
caption:"New password"}}]},{url:"https://vk.com/*",fields:[{list:'div[contenteditable="true"]',info:{caption:{
selector:".placeholder",parentLevel:1}}}]},{url:"https://wellsoffice.ceo.wellsfargo.com/portal/signon/*",delayAfterChange:50},{
url:"https://secure.bankofamerica.com/login/sign-in/signOnV2Screen*",password:{main:"#tlpvt-passcode-input",info:{disabled:!1}}
},{url:"https://staticweb.bankofamerica.com/cavmwebbactouch/common/index*",password:{main:"#btCustomPasscode",info:{disabled:!1}
}},{url:"https://signin.ea.com/p/juno/create*",fields:[{main:"#password",info:{caption:"New Password"}}]},{
url:"https://*.bet365.com/*",delayAfterFocus:50},{
url:["https://*/*idp/Authn/UserPassword*","https://*/*idp/Authn/ExternalSafemls*"],fillTextField:"SendAllKeys",
delayAfterFocus:50,password:{main:"#password",value:"#j_password"}},{url:["https://*/idp/login","https://*/idp/login/*"],
userId:{main:"#clareity"},fillTextField:"SendAllKeys",delayAfterFocus:50},{url:"https://*.eclinicalweb.com/*/login_otp.jsp*",
password:{main:"#txtPlainPassword",real:"#pwdStore1"}},{url:"*://*.hscampaigns.com/*",fields:[{list:"select[class=drop]",
options:{selector:'a[data-id="{name}"]',parentLevel:1,indexShift:-1}},{list:"input[type=checkbox][class=field-checkbox]",
avatar:{selector:"ins[class=iCheck-helper]",parentLevel:1}},{main:"input[type=checkbox][name=tos]",avatar:{
selector:"ins[class=iCheck-helper]",parentLevel:1}}]},{url:"https://*.ewealthmanager.com/eWMLogin/account/login*",
delayAfterFocus:50},{url:"https://*.pivotaltracker.com/signin*",userId:{main:"#credentials_username",info:{readOnly:!1}}},{
url:"*://www.dwerden.com/forum*",password:{main:"#navbar_password_hint",real:"#navbar_password"}},{
url:"https://www.tenforums.com/*",password:{main:"#navbar_password_hint",real:"#navbar_password"}},{
selector:'script[src*="login2.adesa.com/login-context-web-api/logincontextapi.js"]',userId:{main:"#accountName_temp",
real:"#accountName"},password:{main:"#password_temp",real:"#password"}},{url:"https://*.anyti.me/*",password:{
main:"input.txt_hidden"}},{url:"https://*.businessdirect.att.com/portal/*",password:{main:"#field",real:"#Password"}},{
url:"https://etrakit.cityofparkland.org/etrakit3/*",password:{main:"#ucLogin_RadTextBox2, #ctl00_ucLogin_RadTextBox2",
real:"#ucLogin_txtPassword, #ctl00_ucLogin_txtPassword"}},{
url:["https://allsavers.optum.com/tpa-ap-web/*","https://member-allsavers.optum.com/tpa-ap-web/*","https://employer-allsavers.optum.com/tpa-ap-web/*","https://provider-allsavers.optum.com/tpa-ap-web/*"],
userId:{main:"#fakeUsernameInputField",real:"#usernameInputField"},password:{main:"#shadowPassInputField",
real:"#passwordInputField"}},{url:["https://*mail.ru/*"],userId:{main:"#mailbox\\:mailHeaderSecondStepEmail"}},{
url:"https://*.l2arcana.ru/*",fields:[{main:"input[name=account]",info:{caption:"User ID"}},{main:"input[name=keystring]",info:{
caption:"Turing Number"}}]},{url:"https://*store.steampowered.com/checkout/*",fields:[{list:".trigger",options:{
selector:".dropcontainer a",parentLevel:1,indexShift:0},info:{type:"select"}}]},{url:"https://*aosconnect.com/*",fields:[{
main:"#txt_password",placeholder:"#txt_password_text",info:{caption:"Password",type:"password"}},{main:"#txt_agent_password",
placeholder:"#txt_agent_password_txt",info:{caption:"Password",type:"password"}}]},{
url:"https://payments.homeaway.com/sensitiveForms/*",fields:[{main:".pan",info:{caption:"Card Number"}},{main:".cvn",info:{
caption:"Card Validation Code"}}]},{url:"https://*jirav.com/*",doNotUseElementsFromPoint:!0},{
url:"https://account.swtor.com/user/login*",fields:[{main:"#security_key",info:{caption:"Authenticator OTP"}}]},{
url:"http://*/*rf-test-twitter-create-account-page.html",fields:[{main:"#password",info:{caption:"New password"}}]},{
url:"https://*dashboard.stripe.com/*",fillTextField:"SendOnlyLastKey",fields:[{main:".CodePuncher-controlInput",info:{opacity:1}
}]},{url:"https://*app.ramp.com/sign-in*",fields:[{main:"input[name=email]",info:{opacity:1}},{main:"input[name=password]",
info:{opacity:1}}]},{url:"https://*udemy.com/join/login-popup*",fields:[{main:"input[name=email]",info:{opacity:1}},{
main:"input[name=password]",info:{opacity:1}}]},{url:"https://*.schwab.com/ui/*",fields:[{
main:"input#placeholderCode[type=number]",info:{caption:"Authenticator OTP"}}]},{url:"https://mytax.illinois.gov/*",fields:[{
main:"input#Dc-a[type=text]",info:{caption:"Authenticator OTP"}}]},{url:"https://pfloginapp.cloud.aa.com/*",fields:[{
main:"input#username[type=text]",info:{caption:"User ID"}}]},{url:"https://*.appsflyer.com/auth/*",fields:[{
main:"input#code[name=otp-input]",info:{caption:"OTP"}}]},{url:"https://*.bankmassad.co.il/*",password:{main:"input#password"}
},{url:"https://*.akamai.com/create-account",fields:[{main:"input#BizPassword",info:{caption:"New Password"}}]},{
url:"https://*.instra.com/*/create_user_account/*",fields:[{main:"input#phone_areacode",info:{caption:"Phone Number"}},{
main:"input#fax_areacode",info:{caption:"Fax Phone"}}]},{url:"https://*.cvs.com/*",fields:[{
main:"input[autocomplete=new-password]",info:{caption:"New Password"}}]},{url:"https://*.epicgames.com/*",fields:[{
main:"input#password[autocomplete=new-password]",info:{caption:"New Password"}}]}]}},function(a){a.O(0,[612],(function(){
return b=70691,a(a.s=b);var b}));a.O()}]);