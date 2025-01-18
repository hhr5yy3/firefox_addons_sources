"use strict"
;__filename="background/tools.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./ui_css","./i18n","./run_commands","./open_urls","./tab_commands"],function(e,t,l,r,n,o,a,i,s,u,f,c,m){
function d(e){let t=e.tabId,r=l.ss.get(t);if(r&&512&r.u&&s.An(r,0),e.windowId!==l.xe)return void n.Ae.get(e.windowId,_)
;let o=performance.now();if(o-v>666){let e=1===l.Z?Date.now():o;M.set(l.he,e)}l.he=t,v=o}function _(e){
if(!e||!e.focused)return n.le();let t=e.id;t!==l.xe&&(l.uu=l.xe,l.xe=t),n.Me.query({windowId:t,active:true},e=>{
e&&e.length>0&&t===l.xe&&p(e)})}function p(e){if(!e||0===e.length)return n.le();let r=e[0],o=r.windowId,a=l.xe
;o!==a&&(l.xe=o,l.uu=a),l.fe=r.incognito?2:0,t.ze.rn(),d({tabId:r.id,windowId:o})}Object.defineProperty(t,"__esModule",{
value:true}),t.ze=t.Jn=t.ce=t.ve=t.ae=void 0,t.ae={ue(){s.showHUD("Vimium C has no permissions to set CSs")}},t.ve={
La({l:e,n:r,s:n,u:o},a,s){if(e&&0===n[0]&&0===n[1])if(2===n.length){let e=o.indexOf("#")
;e>0&&e<o.length-1&&(n=[0,0,o.slice(e)])}else(n[2]||"").length<2&&(n=[0,0]);s=s>=0?s:-1
;let u=a?n:2!==n.length||n[0]||n[1]?2!==n.length||n[1]>524287||n[0]>8191?n:Math.max(0,n[0])|Math.max(0,n[1])<<13:0,f=t.ve.uo(r,e?o:""),c=e?u:u?{
s:u,t:s,u:o.slice(0,8192)}:{t:s,u:o.slice(0,8192)};a?(l._a||(h.fo(),l._a=new Map)).set(f,c):i.xn(f,c)},Qn(e,o,a,u){
let{n:f}=o,d=t.ve.uo(f,o.l?o.u:""),_=a.s.se&&(null==l._a?void 0:l._a.get(d))||i.ro(d),p="number"==typeof _?[8191&_,_>>>13]:"string"==typeof _?JSON.parse(_):_?_ instanceof Array?_.slice(0):{
url:_.u,tabId:_.t,scroll:"number"!=typeof _.s?_.s||[0,0]:[8191&_.s,_.s>>>13]}:_;if("string"==typeof _&&t.ve.La({l:o.l,
n:f,s:p instanceof Array?p:p.scroll||[0,0],u:o.u},false,a.s.d),!p&&o.s)try{let e=JSON.parse(o.s)
;if(e&&"object"==typeof e){let t=+e.scrollX,l=+e.scrollY;t>=0&&l>=0&&(p=[0|t,0|l,""+(e.hash||"")])}}catch(e){}
if(!p)return s.showHUDEx(a,"noMark",0,[[o.l?"Local":"Global"],f]),void c.runNextCmdBy(0,e)
;let h=c.parseFallbackOptions(e);if(p instanceof Array)return h&&(h.$else=null),
void t.ve.do(a.s.d,null,a,true,f,p,0,h,u);h&&(h.$else=h.$then);let b=p.tabId,y=e.wait,M=e.prefix,v=p.url,g={n:f,
a:!!e.parent&&!M,p:true,q:m.parseOpenPageUrlOptions(e),s:p.scroll||[0,0],t:b,u:v,f:h,
w:"number"==typeof y?Math.min(Math.max(0,y||0),2e3):y}
;g.p=!!M||null==M&&!g.a&&0===g.s[1]&&0===g.s[0]&&!!r.Ar(v)&&(!v.includes("#")||o.u.startsWith(v)),
t.ve._o(o.u,v,g)?t.ve.do(a.s.d,null,a,false,f,g.s,0,h,u):b>=0&&l.ss.has(b)?n.tabsGet(b,t.ve.po.bind(0,g,u)):m.pn(g)},
_o(e,t,l){let r=e.split("#",1)[0],n=t.split("#",1)[0]
;return r===n||!!l.p&&r.startsWith(n.endsWith("/")||n.includes("?")?n:n+"/")||!!l.a&&n.startsWith(r.endsWith("/")||r.includes("?")?r:r+"/")
},po(e,r,o){let a=n.getTabUrl(o);if(t.ve._o(a,e.u,e)){let a=o.id===l.he;a||n.selectTab(o.id,n.selectWndIfNeed),
t.ve.Pn(e,o.id,a?r:0,true)}else m.pn(e)},
uo:(e,t)=>t?"vimiumMark|"+a.iu(t.slice(0,499).split("#",1)[0])+(t.length>1?"|"+e:""):"vimiumGlobalMark|"+e,
do(e,t,r,o,a,i,s,u,m){if(r=!t||!t.T||512&t.T.s.u?r:t.T){let e={g:!o,s:i,t:"",f:u||{},w:s||0}
;Promise.resolve(a&&f._n("mNormalMarkTask",[["mJumpTo"],[o?"Local":"Global"],a])).then(t=>{e.t=t||"",m?(l.Re=m,
l.Xn(r,19,e,1,1)):c.portSendFgCmd(r,19,true,e,1)})}else n.f(e,0,null,(e,t)=>{window.scrollTo(e,t)
},[i[0],i[1]],u?()=>(c.runNextCmdBy(1,u),n.le()):null)},Pn(e,r,n,o){let a=l.ss.get(r),i=e.w;s.ji(a).then(()=>{
t.ve.do(r,a,null,false,e.n,e.s,o||false===i?0:"number"!=typeof i?200:i,e.f,n)}),e.t!==r&&e.n&&t.ve.La({l:false,n:e.n,
s:e.s,u:e.u},2===l.fe,r)},pe(e){let r=t.ve.uo("",e),n=0;l.Ln.forEach((e,t)=>{t.startsWith(r)&&(n++,i.xn(t,null))})
;let o=l._a;return o&&o.forEach((e,t)=>{t.startsWith(r)&&(n++,o.delete(t))
}),s.showHUDEx(l.g,"markRemoved",0,[n,["#"===e?"allLocal":e?"Local":"Global"],[1!==n?"have":"has"]]),n}},t.ce={bo:null,
Zt:0,yo(){let e=l.Ln.get("findModeRawQueryList")||"";t.ce.bo=e?e.split("\n"):[],t.ce.yo=null},Jr(e,n,o){let a=t.ce
;a.yo&&a.yo();let s=e?l.Ma||(h.fo(),l.Ma=a.bo.slice(0)):a.bo;if(!n)return(s[s.length-(o||1)]||"").replace(/\r/g,"\n")
;if(n=n.replace(/\n/g,"\r"),e)return void a.Mo(n,s,true);n=r.el(n,0,99);let u=a.Mo(n,s)
;u&&i.xn("findModeRawQueryList",u),l.Ma&&a.Mo(n,l.Ma,true)},Mo(e,t,l){let r=t.lastIndexOf(e);if(r>=0){
if(r===t.length-1)return;t.splice(r,1)}else t.length>=50&&t.shift();if(t.push(e),!l)return t.join("\n")},de(e){
e?l.Ma&&(l.Ma=[]):(t.ce.yo=null,t.ce.bo=[],i.xn("findModeRawQueryList",""))}};let h={vo:false,Zt:0,fo(){
h.vo||(n.Ae.onRemoved.addListener(h.go),h.vo=true)},go(){h.vo&&(h.Zt=h.Zt||setTimeout(h.Io,34))},Io(){h.Zt=0
;for(let e of l.ss.values())if(e.a.s.se)return;n.Ae.getAll(e=>{e.some(e=>e.incognito)||h.ko()})},ko(){l.Ma=null,
l._a=null,n.Ae.onRemoved.removeListener(h.go),h.vo=false}},b=false,y=b?-1:0;i.sl.then(()=>{b=l.Qe>77,y=b?-1:0}),t.Jn={
jo:[2,1],Lo(e){let l=t.Jn.jo[e];return"object"==typeof l?l.matches:null},To(e,l){
let r=2===l,n=t.Jn,o=n.jo,a=o[e],i=e?"prefers-color-scheme":"prefers-reduced-motion"
;if(1===a&&r&&(o[e]=a=matchMedia(`(${i})`).matches?2:0),r&&2===a){let l=matchMedia(`(${i}: ${e?"dark":"reduce"})`)
;l.onchange=n.Co,o[e]=l,0!==y&&-2!==y||(y=setInterval(t.Jn.En,6e4))}else r||"object"!=typeof a||(a.onchange=null,o[e]=2,
(y>0||-2===y)&&o.every(e=>"object"!=typeof e)&&(y>0&&clearInterval(y),y=0))},Zr(e,r,n){
let o=t.Jn.jo[e],a="object"==typeof o;if(!b&&null==r&&a){let l=matchMedia(o.media);l.onchange=o.onchange,
o.onchange=null,t.Jn.jo[e]=o=l}
let s=e?"dark":"less-motion",f=a?o.matches:null!=n?n:1===(0===e?l.q.autoReduceMotion:l.q.autoDarkMode),c=e?"d":"m",m=i.V(c,f)
;l.A[c]!==m&&(l.A[c]=m,r||i.dn({N:6,d:[c]})),u.Fe({t:s,e:f||` ${l.q.vomnibarOptions.styles} `.includes(` ${s} `),b:!r})
},En(){y>0&&performance.now()-v>27e4&&(clearInterval(y),y=-2)
;for(let e=t.Jn.jo,l=e.length;0<=--l;)"object"==typeof e[l]&&t.Jn.Zr(l)},Ro(){t.Jn.En(),y=setInterval(t.Jn.En,6e4)},
Co(){b||(y>0&&clearInterval(y),y=-1,b=true);let e=t.Jn.jo.indexOf(this);e>=0&&t.Jn.Zr(e)}};let M=l.qe;t.ze={De(e,t){
return M.get(t.id)-M.get(e.id)},rn:l.r};let v=0;n.Me.onActivated.addListener(d),
!n.Ae||n.Ae.onFocusChanged.addListener(e=>{-1!==e&&n.Me.query({windowId:e,active:true},p)}),
n.Me.onRemoved.addListener(e=>{l.ss.delete(e),M.delete(e)}),i.sl.then(()=>{n.getCurTab(e=>{v=performance.now()
;let t=e&&e[0];if(!t)return n.le();l.he=t.id,l.xe=t.windowId,l.fe=t.incognito?2:0})}),
l.fl.autoDarkMode=l.fl.autoReduceMotion=(e,l)=>{let r=l.length>12?0:1;t.Jn.To(r,e="boolean"==typeof e?e?2:0:e),
t.Jn.Zr(r,0,2===e?null:e>0)},l.fl.vomnibarOptions=e=>{
let r=i.K.vomnibarOptions,n=l.Nr,o=true,{actions:a,maxMatches:s,queryInterval:u,styles:f,sizes:c}=r
;if(e!==r&&e&&"object"==typeof e){
let t=Math.max(3,Math.min(0|e.maxMatches||s,25)),r=e.actions,n=r?r.replace(/[,\s]+/g," ").trim():"",i=+e.queryInterval,m=((e.sizes||"")+"").trim(),d=((e.styles||"")+"").trim(),_=Math.max(0,Math.min(i>=0?i:u,1200))
;o=s===t&&u===_&&m===c&&a===n&&f===d,o||(s=t,u=_,c=m,f=d),l.vi.actions=n?n.split(" "):[],e.actions=n,e.maxMatches=t,
e.queryInterval=_,e.sizes=m,e.styles=d}l.Sa&&!/(^|\s)high-contrast(\s|$)/.test(f)&&(f+=" high-contrast"),
l.q.vomnibarOptions=o?r:e,n.n=s,n.i=u,n.s=c,n.t=f,t.Jn.Zr(0,1),t.Jn.Zr(1,1),i.Ha({N:47,d:{n:s,i:u,s:c,t:n.t}})}});