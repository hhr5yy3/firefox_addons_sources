"use strict"
;__filename="background/exclusions.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./settings","./ports"],(e,l,t,n,r,i,u,o)=>{
Object.defineProperty(l,"__esModule",{value:true}),l.nn=l.in=l.ls=l.un=l.on=l.rs=l.kl=l.zl=l.fn=void 0,l.fn=(e,l)=>{
let t,r,u
;return l=l&&l.replace(/<(\S+)>/g,"$1"),"^"===e[0]?(t=n.pl(e.startsWith("^$|")?e.slice(3):e,"",0))||console.log("Failed in creating an RegExp from %o",e):"`"===e[0]&&((r=n.sn(e.slice(1),0))||console.log("Failed in creating an URLPattern from %o",e)),
u=t?{t:1,v:t,k:l}:r?{t:3,v:{p:r,s:e.slice(1)},k:l}:{t:2,
v:e.startsWith(":vimium://")?i.an(e.slice(10),false,-1):e.slice(1),k:l},u},l.zl=e=>{let l;if("^"===e[0]){
e=e.startsWith("^$|")?e.slice(3):e,l=".*$".includes(e.slice(-2))?e.endsWith(".*$")?3:e.endsWith(".*")?2:0:0,
e=0!==l&&"\\"!==e[e.length-l]?e.slice(0,-l):e;let t=n.pl(e,"");return t?{t:1,v:t}:null}if("`"===e[0]){
let l=e.slice(1),t=n.sn(l);return t?{t:3,v:{p:t,s:l}}:null}
if("localhost"===e||!e.includes("/")&&e.includes(".")&&(!/:(?!\d+$)/.test(e)||n.vn(e,6))){let l
;e=(e=(e=e.toLowerCase()).endsWith("*")?e.slice(0,/^[^\\]\.\*$/.test(e.slice(-3))?-2:-1):e).startsWith(".*")&&!/[(\\[]/.test(e)?"*."+e.slice(2):e
;let t=n.pl("^https?://"+(e.startsWith("*")&&"."!==e[1]?"[^/]"+e:(l=e.replace(/\./g,"\\."),
l.startsWith("*")?l.replace("*\\.","(?:[^./]+\\.)*?"):l)),"",0);return t?{t:1,v:t}:e.includes("*")?null:{t:2,
v:"https://"+(e.startsWith(".")?e.slice(1):e)+"/"}}
return l=(e=(e=(":"===e[0]?e.slice(1):e).replace(/([\/?#])\*$/,"$1")).startsWith("vimium://")?i.an(e.slice(9),false,-1):e.startsWith("extension:")?"moz-"+e:e).indexOf("://"),
{t:2,v:l>0&&l+3<e.length&&e.indexOf("/",l+3)<0?e+"/":e}
},l.kl=(e,l)=>1===e.t?e.v.test(l):2===e.t?l.startsWith(e.v):e.v.p.test(l);let f=false;l.rs=f;let s=false;l.on=s
;let a=false,v=[],c=e=>{v=e.map(e=>l.fn(e.pattern,e.passKeys))};l.un=e=>(e?[l.fn(e,"")]:v).map(e=>({t:e.t,
v:1===e.t?e.v.source:2===e.t?e.v:e.v.s})),l.ls=(e,r)=>{var i;let u=""
;for(let l of v)if(1===l.t?l.v.test(e):2===l.t?e.startsWith(l.v):l.v.p.test(e)){let e=l.k
;if(0===e.length||"^"===e[0]&&e.length>2||a)return e&&e.trim();u+=e}
if(!u&&r.E&&e.lastIndexOf("://",5)<0&&!n.tn.test(e)){let e=null===(i=t.ss.get(r.d))||void 0===i?void 0:i.T
;if(null!=e)return l.ls(e.s.Fl,e.s)}return u?u.trim():null};let d=()=>{let e=!r.H()||false?null:e=>{t.cn[10](e)}
;return d=()=>e,e};l.in=()=>{let e=new Set;for(let{k:l}of v)if(l){if("^"===l[0]&&l.length>2)return true
;for(let t of l.split(" "))e.add(t)}return e.size?e:null},l.nn=e=>{let n=v.length>0?null:{N:1,p:null,f:0}
;if(e)return void(n||u.dn({N:3,H:10,U:0}));let r=null!=t.l||void 0!==t.l&&t.t,i=v;o.p(4096,e=>{let i=e.a.s.c,u=e.a.s
;for(let t of e.B){let r=null,i=0;if(n){if(0===t.s.c)continue}else if(r=l.ls(t.s.Fl,t.s),i=null===r?0:r?1:2,
!r&&t.s.c===i)continue;e.ts||(t.postMessage(n||{N:1,p:r,f:0}),t.s.c=i)}r&&i!==u.c&&t.o(u.d,u.c)},()=>i===v)};let m=()=>{
let e=v.length>0,n=e||f?d():null;if(!n)return;if(f!==e){l.rs=f=e;let t=r.H().onHistoryStateUpdated
;e?t.addListener(n):t.removeListener(n)}let i=e&&t.q.exclusionListenHash;if(s!==i){l.on=s=i
;let e=r.H().onReferenceFragmentUpdated;i?e.addListener(n):e.removeListener(n)}};t.fl.exclusionRules=e=>{
let n=!v.length,r=t.mn;c(e),a=t.q.exclusionOnlyFirstMatch,m(),setTimeout(()=>{setTimeout(l.nn,10,n),
t.mn===r&&u._l("keyMappings",null)},1)},t.fl.exclusionOnlyFirstMatch=e=>{a=e},t.fl.exclusionListenHash=m,u.sl.then(()=>{
c(t.q.exclusionRules),a=t.q.exclusionOnlyFirstMatch})});