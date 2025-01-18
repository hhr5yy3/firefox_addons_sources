"use strict"
;__filename="background/page_handlers.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./exclusions","./ui_css","./key_mappings","./run_commands","./tools","./open_urls","./frame_commands"],(l,e,t,n,r,u,s,o,i,a,f,d,m,c,v,p)=>{
Object.defineProperty(e,"__esModule",{value:true}),e.onReq=void 0;let _=[()=>[o.K,t.Z,t.J.ka],l=>{
if(t.Sn)return t.Sn.then(_[1].bind(null,l,null));let e={};for(let l in o.K){let n=t.q[l];n!==o.K[l]&&(e[l]=n)}return e
},l=>{var e,n;if(t.Sn)return t.Sn.then(_[2].bind(null,l,null))
;let r=l.key,u=null!==(n=null!==(e=l.val)&&void 0!==e?e:o.K[r])&&void 0!==n?n:null;o.La(r,u);let s=t.q[r]
;return s!==u?s:null},l=>{let e=o.V(l.key,l.val);return e!==l.val?e:null},l=>{o.dn({N:6,d:l})},l=>t.q[l.key],l=>{
t.ss.has(l)||r.s(l)},()=>{let l=d.di;if(1&t.A.l&&!l){let l=l=>/[^ -\xff]/.test(l.join("")),e=l(Object.keys(t.mn))?1:0
;if(e|=t.ya&&l(Object.keys(t.ya))?2:0,e&&(e|=2&e||!t.ya||!l(Object.values(t.ya))?0:4,2&e||!(4&e)))return true}
return l?(l=>{let e,t,n=l.length>1?l.length+" Errors:\n":"Error: ";for(t of l)e=0,
n+=t[0].replace(/%([a-z])/g,(l,n)=>(++e,"c"===n?"":"s"===n||"d"===n?t[e]:JSON.stringify(t[e]))),
e+1<t.length&&(n+=" "+t.slice(e+1).map(l=>"object"==typeof l&&l?JSON.stringify(l):l).join(" ")),n+=".\n";return n
})(l):""},l=>{let e=i.indexFrame(l[1],0);return e&&e.s&&(e.s.u|=44),f.mergeCSS(l[0],-1)},l=>{
l&&o.xn("isHC_f",l.hc?"1":null),f.Nn(2)},l=>[u.Xl(l[0],null,l[1]),u.Yl],()=>{c.Jn.En()},()=>{
let l=t.ui.get("?"),e=l&&8===l.oi&&l.ai?"?":"";return e||t.ui.forEach((l,t)=>{
8===l.oi&&l.ai&&(e=e&&e.length<t.length?e:t)}),e},l=>{var e
;return[l=u.Xl(l,null,0),null!==(e=t.We.get(l))&&void 0!==e?e:null]},l=>{let e=new Map;s.Un("k:"+l,e);let t=e.get("k")
;if(null==t)return null;let n=u.Xl(t.Fl,null,-2),r=u.Yl>2
;return[!r,r?t.Fl:n.replace(/\s+/g,"%20")+(t.Tr&&"k"!==t.Tr?" "+t.Tr:"")]},l=>{v.pn(l)},l=>{let e=null
;return l.startsWith("vimium://")&&(e=t.$r(l.slice(9),1,true)),e=null!==e?e:u.Xl(l,null,-1),
"string"==typeof e&&(e=s.In(e,"whole"),e=u.$i(e)),e},()=>t.hn&&t.hn(),l=>t.j(l[0],l[1]),l=>v.wn(l),()=>{
let l=t.he>=0&&t.ss.get(t.he)||null,e=l?t.he:-1,u=l?l.a.s.E:-1,s=u>=0&&r.H()||null
;return Promise.all([r.ye(r.getCurTab).then(l=>l&&l.length?l:e<0?null:r.ye(r.tabsGet,e).then(l=>l&&[l])),s?r.ye(s.getFrame,{
tabId:e,frameId:u}):null,t.Sn]).then(([l,s])=>{var i
;let f=l&&l[0]||null,d=f?f.id:t.he,m=null!==(i=t.ss.get(d))&&void 0!==i?i:null
;s&&s.url&&e===d&&m.a.s.E===u&&(m.a.s.Fl=s.url);let c=f?r.getTabUrl(f):m&&(m.T||m.a).s.Fl||"";f&&m&&m.T&&(m.T.s.Fl=c)
;let v=!m||m.a.s.E&&!n.tn.test(m.a.s.Fl)?null:m.a.s,p=!(m||f&&c&&"loading"===f.status&&/^(ht|s?f)tp/.test(c)),_=k(m),g=!p&&!_,b=g?null:_||!c?_:c.startsWith(location.protocol)&&!c.startsWith(t.Ge)?new URL(c).host:null,y=b?t.qn.get(b):null
;if(g||null==y||true===y)b=null;else{m&&(m.zn=-1);{let l=t.qn.get(b);b="string"==typeof l&&l?l:b}}return{ver:t.J.aa,
runnable:g,url:c,tabId:d,frameId:m&&(v||m.T)?(v||m.T.s).E:0,topUrl:v&&v.E&&m.T?m.T.s.Fl:null,frameUrl:v&&v.Fl,
lock:m&&m.ts?m.ts.c:null,status:v?v.c:0,unknownExt:b,exclusions:g?{rules:t.q.exclusionRules,
onlyFirst:t.q.exclusionOnlyFirstMatch,matchers:a.un(null),defaults:o.K.exclusionRules}:null,os:t.Z,reduceMotion:t.A.m}})
},([l,e])=>{let u=t.q.extAllowList,s=u.split("\n");if(s.indexOf(e)<0){let l=s.indexOf("# "+e)+1||s.indexOf("#"+e)+1
;s.splice(l?l-1:s.length,l?1:0,e),u=s.join("\n"),o.La("extAllowList",u)}let i=t.ss.get(l);return i&&(i.zn=null),
r.ye(r.n.tabs.get,l).then(l=>{let e=n.jt(),t=()=>(m.runNextOnTabLoaded({},l,e.Et),r.n.runtime.lastError)
;return l?r.n.tabs.reload(l.id,t):r.n.tabs.reload(t),e.Ot})},([l,e,n])=>{t.$r("status/"+l,3)
;let r=i.indexFrame(e,n)||i.indexFrame(e,0),u=r?t.ss.get(e).ts:null;return r&&!u&&t.cn[10]({u:r.s.Fl},r),
[r?r.s.c:0,u?u.c:null]},l=>a.un(l)[0],(l,e)=>p.initHelp({f:true},e),l=>{let e=l.module,t=l.name,n=g[e]
;if(!g.hasOwnProperty(e)||!n.includes(t))return[void 0,{message:"refused"}];let u=r.n[e]
;return u[t].apply(u,l.args).then(l=>[l,void 0],l=>[void 0,b(l)])},(l,e)=>e.s.d,l=>{let e=n.Q();if(l){let n=t.Ln.get(l)
;e[l]=null!=n?n:null}else t.Ln.forEach((l,t)=>{e[t]=l});return e},({key:l,val:e})=>{l.includes("|")&&o.xn(l,e)
},({key:l,val:e},n)=>{let r=n&&n.s&&n.s.d||t.he,u=t.Ce.find(l=>l.s.d===r);u&&u.postMessage({N:47,d:{[l]:e}})},()=>{
t.q.vimSync&&t.fl.vimSync(true,"vimSync")},()=>({os:t.Z}),l=>{r.tabsCreate({url:l.url}),r.n.tabs.remove(l.tabId)}],g={
permissions:["contains","request","remove"],tabs:["update"]},b=l=>({message:l&&l.message?l.message+"":JSON.stringify(l)
});e.onReq=(l,e)=>_[l.n](l.q,e);let k=l=>l&&"string"==typeof l.zn&&true!==t.qn.get(l.zn)?l.zn:null});