"use strict"
;__filename="background/others.js",define(["require","exports","./store","./browser","./utils","./settings","./i18n","./normalize_urls","./normalize_urls","./open_urls"],(e,t,n,i,l,r,o,u,s,c)=>{
Object.defineProperty(t,"__esModule",{value:true}),n.fl.showActionIcon=e=>{let t=i.n.browserAction;t?(n.t=e,
i.import2("/background/action_icon.js").then(e=>{e.e()}),Promise.resolve(o.Se("name")).then(n=>{
e||(n+="\n\n"+o.Se("noActiveState")),t.setTitle({title:n})})):n.fl.showActionIcon=void 0},r.sl.then(()=>{
n.q.showActionIcon?n.fl.showActionIcon(true,"showActionIcon"):n.o=n.r}),setTimeout(()=>{new Promise((t,n)=>{
e(["/background/sync.js"],t,n)}).then(e=>e)},100),(()=>{function e(){h&&(h.Mn=null),P=M=h=T=null,k&&clearTimeout(k),
w&&clearTimeout(w),p=C=F=k=w=0,b="",l.Sl()}function t(){let n=Date.now()-p;if(n>5e3||n<-5e3)return e()
;k=setTimeout(t,3e4)}function r(){w=0;let e=h;if(e&&!e.Cn&&(h=null,e.Mn)){let t=Date.now();return t<p&&(p=t-1e3),
m(e.Fn,e.Mn)}}function a(e,t,r,o,u){if(!e.Mn)return void(h===e&&(h=null));h=null;let c,a=t.length>0?t[0]:null;C=o,F=u,
M=[];let m=new Set;` ${n.Nr.t} `.includes(" type-letter ");for(let e=0,n=r?0:1,i=t.length;e<i;e++){
let i=t[e],{title:r,u:o,e:u}=i,c=o,a="",f=null!=i.s,d=0;c=l.Rl(c,1),c.startsWith("file")&&(c=s.en(c)),
c=c.replace(/%20/g," "),m.has(c)?c=`:${e+n} ${c}`:m.add(c),d&&(a=` ~${e+n}~`),a=(r&&r+" - ")+i.textSplit+a;let p={
content:c,description:a};d&&(p.deletable=true),(d||f)&&(P||(P=new Map),P.has(c)||P.set(c,{On:u,rl:f?i.s:null,Fl:o})),
M.push(p)}if(T=e.Fn,r)if("search"===a.e){let e=a.p
;c=(e&&e+g)+a.textSplit,j=2,(a=t[1])&&"math"===a.e&&(M[1].description=a.textSplit+" = "+a.t)}else j=3,
c=M[0].description;else c=v+"<input>";r&&(b=t[0].u,P&&M.length>0&&b!==M[0].content&&P.set(b,P.get(M[0].content)),
M.shift()),c&&i.n.omnibox.setDefaultSuggestion({description:c}),e.Mn(M),l.Sl()}function m(e,l){if(e=S(e),h){
let t=e===h.Fn;if(h.Mn=t?l:null,t)return}if(e===T)return void(M&&l(M))
;if(1===C&&e.startsWith(T))return i.n.omnibox.setDefaultSuggestion({description:"Open: <input>"}),void l([]);if(h={Mn:l,
Fn:e,Cn:false},w)return;let o=Date.now(),u=n.Nr.i+p-o;if(u>30&&u<3e3)return void(w=setTimeout(r,u));h.Cn=true,
k||(k=setTimeout(t,3e4)),p=o,P=M=null,b="";let s=C<2||!e.startsWith(T)?0:3===C?e.includes(" ")?0:8:F;n.ml.Bl(e,{
o:"omni",t:s,r:O,c:y,f:1},a.bind(null,h))}function f(e,t,i){
return e?":"===e[0]&&/^:([1-9]|1[0-2]) /.test(e)&&(e=e.slice(" "===e[2]?3:4)):e=u.Xl(""),
"file://"===e.slice(0,7).toLowerCase()&&(e=l.Ti().test(e)?u.an("show image "+e,false,0):e),null!=i?n.cn[7]({s:i
}):c.openUrlReq({u:e,r:"currentTab"===t?0:"newForegroundTab"===t?-1:-2})}let d=i.n.omnibox;if(!d)return
;let p,g=": ",_=false,v="Open: ",T=null,b="",h=null,w=0,P=null,y=128,M=null,k=0,j=0,C=0,F=0,O=6,S=e=>{
if(e=e.trim().replace(l.C," "),n.vi.actions.includes("icase")){let t=/^:[WBH] /.test(e)?3:0
;e=t?e.slice(0,t)+e.slice(t).toLowerCase():e.toLowerCase()}return e};d.onInputStarted.addListener(()=>{
if(i.getCurWnd(false,e=>{let t=e&&e.width;y=t?Math.floor((t-160/devicePixelRatio)/7.72):128}),_||(_=true,
Promise.resolve(o.Se("i18n")).then(()=>{"en"!==o.bn()&&Promise.resolve(o.D("colon")).then(e=>{g=e+o.D("NS")||g,
v=o.D("OpenC")||v})})),k)return e()}),d.onInputChanged.addListener(m),d.onInputEntered.addListener(function t(i,l){
let o=h;if(o&&o.Mn){if(o.Mn=t.bind(null,i,l),o.Cn)return;return w&&clearTimeout(w),r()}if(i=S(i),
null===T&&i)return n.ml.Bl(i,{o:"omni",t:0,r:3,c:y,f:1},(e,t)=>t?f(e[0].u,l,e[0].s):f(i,l));b&&i===T&&(i=b)
;let u=null==P?void 0:P.get(i),s=null==u?void 0:u.rl;return e(),f(u?u.Fl:i,l,s)})})(),
n.Ye&&Promise.all([n.Ye,r.sl]).then(([e])=>{let t=e&&e.reason,s="install"===t?"":"update"===t&&e.previousVersion||"none"
;"none"!==s&&setTimeout(()=>{
if(console.log("%cVimium C%c has been %cinstalled%c with %o at %c%s%c.","color:red","color:auto","color:#0c85e9","color:auto",e,"color:#0c85e9",l.now(),"color:auto"),
n.J.so&&console.log("Sorry, but some commands of Vimium C require the permission to run in incognito mode."),!s){
let e=()=>{n.eo||n.Sn?++t<25&&setTimeout(e,200):c.pn({u:n.J.ni+"#commands"})},t=0;return void e()}
if(r._l("vomnibarPage"),parseFloat(s)>=parseFloat(n.J.Ta)&&(s>="1.99.98"||n.J.Ta<"1.99.98"))return
;if(n.Dn?n.Dn(6e3):n.Dn=true,r._l("newTabUrl"),!n.q.notifyUpdate)return;let t="vimium_c-upgrade-notification"
;Promise.all([o.D("Upgrade"),o.D("upgradeMsg",[n.J.aa]),o.D("upgradeMsg2"),o.D("clickForMore")]).then(([e,l,r,o])=>{
let s=i.n.notifications;s&&s.create(t,{type:"basic",iconUrl:n.Ge+"icons/icon128.png",title:"Vimium C "+e,
message:l+r+"\n\n"+o},e=>{let n;if(n=i.le())return n;t=e||t,s.onClicked.addListener(function e(t){t==t&&(s.clear(t),
c.pn({u:u.Xl("vimium://release")}),s.onClicked.removeListener(e))})})})},500)}),setTimeout(()=>{
let e=globalThis.document;e&&e.body&&(e.body.innerText=""),l.Sl()},1e3)});