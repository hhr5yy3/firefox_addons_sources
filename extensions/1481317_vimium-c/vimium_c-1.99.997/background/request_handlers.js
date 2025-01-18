"use strict"
;__filename="background/request_handlers.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./settings","./ports","./exclusions","./ui_css","./i18n","./key_mappings","./run_commands","./run_keys","./tools","./open_urls","./frame_commands","./tab_commands"],function(e,l,t,r,n,u,i,o,s,a,f,d,m,c,v,p,b,g,y){
let N;Object.defineProperty(l,"__esModule",{value:true}),t.cn=[(e,l)=>{let r=e.handler
;r&&"string"==typeof r&&("focus"===r?(4&l.s.u||(l.s.u|=4,l.postMessage({N:8
})),t.cn[12]({},l)):"command"===r?c.executeExternalCmd(e,null,l):"tip"===r&&(t.g=s.indexFrame(l.s.d,0)||l,
s.showHUD(e.tip||"Error: Lack .tip")))},()=>0,(e,l)=>{let r=e.k,n=o.Gn;if(!(r>=0&&r<n.length))return t.g=l,
s.complainLimits(d.D("notModify",[r]));let u=n[r],i=t.Sn;t.q[u]!==e.v&&(i?i.then(()=>{o.La(u,e.v)}):o.La(u,e.v))
},(e,l)=>{let t="object"==typeof e;return p.ce.Jr(l.s.se,t?e.q:"",t?1:e)},(e,l)=>{let t=i.Ne(e);if(null==e.i)return t
;l.postMessage({N:44,i:e.i,s:t})},(e,l)=>{let u=e.u,o=e.e,a=i.fu(e);r.Sl(),e.e=a,null==a.p?(t.g=l,
s.showHUD(a.u)):o||u!==a.u?!l||"file://"===a.u.slice(0,7).toLowerCase()&&"file://"!==u.slice(0,7).toLowerCase()?n.tabsUpdate({
url:a.u}):c.sendFgCmd(18,false,{r:1,u:a.u}):(t.g=l,s.showHUD("Here is just root"),e.e={p:null,u:"(just root)"})
},(e,l)=>{let r,n=i.Ne(e);if(!n||!n.k)return t.g=l,s.showHUD(d.D("noEngineFound")),void(e.n&&c.runNextCmdBy(0,e.n))
;let u=e.o||b.parseOpenPageUrlOptions(e.n),o={}
;r=e.t.trim()&&t.j(e.t.trim(),524288,u.s,o).trim()||(e.c?t.Ol(u.s,0,o={}):""),Promise.resolve(r).then(r=>{var i
;let a=null===r?"It's not allowed to read clipboard":(r=r.trim())?"":d.D("noSelOrCopied");if(a)return t.g=l,
s.showHUD(a),void(e.n&&c.runNextCmdBy(0,e.n));u.k=null!==(i=o.R)&&void 0!==i?i:null==u.k?n.k:u.k,t.cn[8]({u:r,o:u,r:0,
n:c.parseFallbackOptions(e.n)||{}},l)})},(e,l)=>{let r=e.s,u=0!==e.a,i=2===e.a,o=t.xe;if(t.g=s.findCPort(l),
"number"==typeof r)return void n.selectTab(r,e=>(n.le()?s.showHUD(d.D("noTabItem")):n.selectWnd(e),n.le()))
;if(!n.Te())return void s.complainNoSession();let a=l.s.d>=0?l.s.d:t.he>=0?t.he:null,f=u?null:a;n.Te().restore(r[1],e=>{
let l=n.le();return l?s.showHUD(d.D("noSessionItem")):y.Ie(o,e,f).then(e=>{i&&a&&e&&e.windowId!==o&&n.tabsGet(a,l=>{
n.Me.move(e.id,{windowId:o,index:l?l.index+1:-1},n.le),n.tabsUpdate(e.id,{active:true})})}),l}),f&&n.selectTab(f,n.le)
},b.openUrlReq,(e,l)=>{128&l.s.u&&l.postMessage({N:2,t:3});let r,n=l.s.d,u=t.ss.get(n)
;if(!u)return void(t.t&&t.o(n,l.s.c));let i=u.a;l!==i&&(u.a=l,t.t&&(r=l.s.c)!==i.s.c&&t.o(n,r))},(e,l)=>{let r=l
;if(!r&&(r=s.indexFrame(e.tabId,e.frameId),!r)){let l=t.ss.get(e.tabId);return void(l&&512&l.u&&(l.u|=4096))}
let{s:n}=r,u=n.Fl,i=t.ss.get(n.d),o=n.Fl=l?e.u:e.url;if(i&&i.ts)return;let f=a.rs?a.ls(o,n):null,d=null===f?0:f?1:2
;if(n.c!==d)n.c=d,t.t&&i.a===r&&t.o(n.d,d);else if(!f||f===a.ls(u,n))return;r.postMessage({N:1,p:f,f:0})},(e,l)=>{
let r,n=e.t||0
;t.g=l,t.M=n||t.M>0?1:-1,t.Re=e.k,c.replaceCmdOptions(e.f||{}),2!==n?1===n?g.parentFrame():g.nextFrame():(r=s.ri(l))?g.focusFrame(r.a,r.B.length<=2,e.o?1:2):s.safePost(l,{
N:45,l:t.Re})},(e,l)=>{let t=s.ri(l);if(!t)return;if(l.s.u|=4,t.u|=4,t.B.length<2)return;let r={N:8};for(let e of t.B){
let l=e.s.u;e.s.u|=4,4&l||e.postMessage(r)}},(e,l,r)=>{let u,i=l.s.d,o=s.ri(l),a=e.u,f=e.f
;if(!o||o.B.length<2)return false;if(t.Qe>95)u=o.B.find(e=>e.s.E===f);else for(let e of o.B)if(e.s.Fl===a&&e!==o.T){
if(u){u=null;break}u=e}return u&&u!==l?(t.Re=e.k,k(e,l,u,1),true):!!n.H()&&(n.H().getAllFrames({tabId:l.s.d},n=>{
let u=0,o=l.s.E;for(let e of n)if(e.parentFrameId===o){if(u){u=0;break}u=e.frameId}let a=u&&s.indexFrame(i,u)
;a&&(t.Re=e.k,k(e,l,a,1)),r&&s.sendResponse(l,r,!!a)}),!!r&&l)},g.initHelp,(e,l)=>{s.ri(l).u|=4,l.s.u|=12,
l.postMessage({N:11,H:t.Rn})},(e,l)=>{var n;let{i:u}=e;if(t.Re=0,null!=e.u){let{m:l,t:r}=e,u=l>=42&&l<=64,o=e.u,s={}
;o=u?i.Tn(o,true):o,o=t.j(o,u?1048576:524288,e.o&&e.o.s,s),c.replaceCmdOptions({url:o,newtab:null!=r?!!r:!u,
keyword:null!==(n=s.R)&&void 0!==n?n:e.o.k}),I(e.f),t.M=1}else{if(true!==e.r)return;if(null==t.y||"omni"!==t.y.k){
if(u)return;t.y=r.Q(),t.M=1}else if(u&&t.y.v===t.J.ci)return}t.g=l,g.showVomnibar(u)},(e,l)=>{
s.isNotVomnibarPage(l,false)||t.ml.Bl(e.q,e,_.bind(l,0|e.i))},(e,l)=>{if(null!=e.i){
let u=(e.r||"")+"",i=e.i,o=u.includes("name")?e.u:""
;return void Promise.all([/^data:/i.test(i)?Promise.resolve(i):r.Kn(i||e.u),t.fe?null:n.ye(n.getCurTab)]).then(([e,i])=>{
let a="string"==typeof e,f=a?e:e?e[1]:"";t.g=l
;let m=f.indexOf(",")+1,c=f.slice(5,Math.max(5,m)).toLowerCase(),v=c.split(";")[0]
;if(!e||v.startsWith("text/"))return void(e?s.showHUD("",74):s.showHUD(d.D(0===e?"downloadTimeout":"downloadFail")))
;let p=f.slice(m,m+8);p=c.includes("base64")?r.Le(p,"atob"):p.slice(0,6)
;let b=p.startsWith("\x89PNG")?"PNG":p.startsWith("\xff\xd8\xff")?"JPEG":/^GIF8[79]a/.test(p)?"GIF":(v.split("/")[1]||"").toUpperCase()||v,y=o&&/^(http|ftp|file)/i.test(o)?o:"",N=u.includes("safe")&&"GIF"!==b||u.includes("force")
;g.handleImageUrl(a?e:"",a?null:e[0],N&&"PNG"!==b?9:1,e=>{
s.showHUD(d.D(e?"imgCopied":"failCopyingImg",[1===e?"HTML":N?"PNG":b]))},o,y,null,!i||!i[0]||null!==n.getGroupId(i[0])),
r.Sl()})}
let u=e.n,o=e.o||u&&b.parseOpenPageUrlOptions(u)||{},a=!!(u&&u.copy&&u.o),f=null!=e.s&&e.m||0,v=a?null:o.s,p=a?null:o.k,y=f>=42&&f<=64&&(!v||false!==v.r),N=e.d?false!==o.d:!!o.d
;if(!e.s&&u&&null!=u.type&&"frame"!==u.type){let e=u.type,n=c.concatOptions(u,r.mi({url:null,
type:"tab"===e&&u.url||"tab-url"===e?null:"tab-title"===e?"title":e}));return t.g=l,t.M=1,
void c.executeCommand(m.la("copyWindowInfo",n),1,t.Re,l,1,u.$f&&{c:u.$f,r:u.$retry,u:0,w:0})}let _=e.u||e.s||""
;if(N)if("string"!=typeof _)for(let e=_.length;0<=--e;)y&&(_[e]=i.Tn(_[e]+"")),_[e]=r.Ll(_[e]+"");else y&&(_=i.Tn(_)),
_=r.Ll(_);else"string"==typeof _&&_.length<4&&!_.trim()&&" "===_[0]&&(_="");let k=!!_,I=_&&t.Il(_,e.j,v,p)
;I=e.s&&"object"==typeof e.s?`[${e.s.length}] `+e.s.slice(-1)[0]:I,Promise.resolve(I).then(r=>{t.g=l,
u&&c.runNextCmdBy(k?1:0,u)||s.showHUD(N?r.replace(/%[0-7][\dA-Fa-f]/g,decodeURIComponent):r,e.u?14:15)})},(e,l)=>{
let n=null!=l?l.s:null;if(null!==n&&!(4&n.u)){n.u|=4;let e=s.ri(l);e&&(e.u|=4)}let u=e.k,i=1,o=/^\d+|^-\d*/.exec(u)
;if(null!=o){let e=o[0];u=u.slice(e.length),i="-"!==e?parseInt(e,10)||1:-1
}else u.length>6&&u.startsWith(`<c-v-${u[5]}>`)&&(u=u[5]+u.slice(7));let a=t.ui.get(u);a||(o=u.match(m.pa),
u=o[o.length-1],i=1,a=t.ui.get(u)),r.Sl(),a&&(38===a.oi&&a.ai&&t.oa(a),e.e&&(t.yn={element:r.Wn(e.e)}),
c.executeCommand(a,i,e.l,l,0,null))},c.waitAndRunKeyReq,(e,l)=>{if(2===e.c){let l=p.ve.pe(e.u)
;return void(e.f&&c.runNextCmdBy(l>0?1:0,e.f))}let r=!!e.f,n=e.c.o;r||(t.g=l);let u=!r&&g.me(l,n.type,e.l)||l
;Promise.resolve(u).then(t=>{if(!(r||t===l&&e.u)){let l=e;return l.U=(n.extUrl?1:0)|(e.c.a?2:0),l.f=true,
void s.be(l,true,1,t)}
1===e.c.a?(p.ve.La(e,l.s.se,l.s.d),s.showHUDEx(l,"mNormalMarkTask",1,[["mCreate"],[e.l?"Local":"Global"],e.n]),
c.runNextCmdBy(1,n)):p.ve.Qn(n,e,l,e.l&&r?e.k:0)})},b.pn,c.onBeforeConfirm,c.onConfirmResponse,(e,l)=>{var r
;if("e"===e.t)return void s.showHUD(d.D("cannotDelSug"))
;let{t:u,s:i,u:o}=e,a="history"===u&&null!=i?"session":u,f="tab"===a?a:a+" item",m=e=>{
Promise.resolve(d.D("sugs")).then(l=>{s.showHUD(d.D(e?"delSug":"notDelSug",[l&&d.gn(l,a[0])||f]))})}
;if(t.g=s.findCPort(l),
"tab"===a&&t.he===i)s.showHUD(d.D("notRemoveCur"));else if("session"!==a)t.ml.al("tab"===a?i:o,a,m);else if(null===(r=n.Te())||void 0===r?void 0:r.forgetClosedTab){
let e=i;n.Te().forgetClosedTab(e[0],e[1]).then(()=>1,t.r).then(m)}},g.openImgReq,(e,l)=>{t.g=null,
b.openJSUrl(e.u,{},()=>{t.g=l,s.showHUD(d.D("jsFail"))})},(e,l)=>{var t
;2!==e.c&&4!==e.c?k(e,l,(null===(t=s.ri(l))||void 0===t?void 0:t.T)||null,e.f):s.getParentFrame(l.s.d,l.s.E,1).then(t=>{
var r;k(e,l,t||(null===(r=s.ri(l))||void 0===r?void 0:r.T)||null,e.f)})},f.Fe,(e,l)=>{c.replaceCmdOptions({active:true,
returnToViewport:true,extend:!!(1&e.c),direction:e.c>=56?"before":null}),t.g=l,t.M=1,g.performFind()
},g.framesGoBack,()=>(d.$n&&d.$n(),d.jn),(e,l)=>{l.s.u|=8},(e,l)=>{c.replaceCmdOptions({mode:e.c?"caret":"",start:true
}),I(e.f),t.g=l,t.M=1,g.enterVisualMode()},e=>{if(performance.now()-e.r.n<500){let l=e.r.c;l.element=r.Wn(e.e),
v.runKeyWithCond(l)}},(e,l)=>{var r
;let o=e.o||{},a={},f=t.j(i.Tn(e.u,true),1048576,o.s,a),d=null!==(r=a.R)&&void 0!==r?r:o.k;f=f!==e.u||d?u.Xl(f,d,0):f,
t.g=l,s.showHUD(f,78),n.downloadFile(f,e.f,e.r||"").then(e.m<44?r=>{r||t.cn[26]({m:37,f:e.f,u:f},l)}:void 0)
},(e,l,t)=>(setTimeout(()=>{s.sendResponse(l,t,9)},e),l),({k:e,v:l})=>{let t=l!==!!l
;s.showHUD(d.D(t?"useVal":l?"turnOn":"turnOff",[e,t?JSON.stringify(l):""]))},(e,l)=>{t.cn[19](e,s.findCPort(l))
},(e,l,r)=>!(false!==l.s&&!l.s.Fl.startsWith(t.Ge))&&(w(e.q,e.i,l).then(e=>{l.postMessage(r?{N:4,m:r,r:e}:e)}),
l),(e,l)=>{let r=e.u,n=r.indexOf("://");r=n>0?r.slice(r.indexOf("/",n+4)+1):r,r=r.length>40?r.slice(0,39)+"\u2026":r,
t.g=l,s.showHUD(r,78)},(e,l)=>{
let n=e.t,u=r.Ll(e.u),i=n&&u?(t.vi.actions.find(e=>e.startsWith("itemJoin="))||"").slice(9):""
;i=i?i.includes("\\")?r.tryParse('"'===i[0]?i:`"${i}"`):r.Le(i):"\n",t.cn[18]({s:n&&u?n+i+u:u||n,d:false,m:0
},s.findCPort(l))},(e,l)=>{t.g=s.findCPort(l),s.showHUD(e.t,15)},(e,l)=>{
s.showHUDEx(l,"mLocalMarkTask",1,[[e.n?"mCreate":"mJumpTo"],e.i>1?e.i:["mLastMark"]]),t.g=l,c.runNextCmdBy(1,e.c.o)
},()=>{let e=t.li(null,null);return e&&(clearTimeout(e.i),e.r&&e.r(false)),!e},(e,l)=>{let r=e>0&&s.indexFrame(l.s.d,e)
;return r?(g.focusFrame(r,false,2,1),2):(e<=0&&t.cn[45](),e?4:2)},s.OnFreeze,(e,l)=>{
let[r,n,u]=e.s,i=u&&(n?"^ ":"")+u.join(" "),o={N:1,p:i,f:r};l.postMessage(o);let a=s.ri(l),f=3===r?2:0
;if(a&&(!a.ts||a.ts.c!==f||a.ts.as!==i)){a.ts={c:f,as:i},t.t&&a.a.s.c!==f&&t.o(l.s.d,f);for(let e of a.B)e.s.c=f,
512&e.s.u||e.postMessage(o)}},(e,l)=>{let r=l.s.d,u=0,i=setInterval(()=>{let e=t.ss.get(r)
;r!==t.he&&e?(clearInterval(i),
(e.B.includes(l)||512&l.s.u)&&n.selectTab(r,n.selectWndIfNeed)):(++u>=12||!e)&&clearInterval(i)},17)}]
;let _=function(e,l,t,n,u,i,o,a){let f=2===e?2:0;f=l.some(e=>"tab"===e.e)?f:0,s.safePost(this,{N:43,a:t,c:a,i:f,l,m:n,
r:o,s:u,t:i}),r.Sl()};t.Xn=(e,l,r,n,u)=>{e.postMessage({N:7,H:u||4!==l?s.ensureInnerCSS(e.s):null,m:u?5:0,k:u?t.Re:0,
f:{},c:l,n:n||0,a:r})};let k=(e,l,r,n)=>{r&&2!==r.s.c?t.Xn(r,e.c,e.a,e.n,n):(e.a.$forced=1,
c.portSendFgCmd(l,e.c,false,e.a,e.n||0))},I=e=>{e&&("string"==typeof e&&(e=v.parseEmbeddedOptions(e)),
e&&"object"==typeof e&&Object.assign(t.y,r.mi(e)))
},w=(e,l,t)=>(N||(N=n.import2("/background/sync.js").then(()=>o.sl).then(()=>n.import2("/background/page_handlers.js"))),
N.then(l=>Promise.all(e.map(e=>l.onReq(e,t)))).then(e=>({i:l,a:e.map(e=>void 0!==e?e:null)})));window.onPagesReq=e=>{
if(-3===e.i){let e=t.li(null,null);return e&&clearTimeout(e.i),e}
let l="function"==typeof structuredClone?structuredClone(e.q):JSON.parse(JSON.stringify(e.q));return w(l,e.i,null)}});