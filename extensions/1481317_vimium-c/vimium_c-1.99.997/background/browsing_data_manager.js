"use strict"
;__filename="background/browsing_data_manager.js",define(["require","exports","./store","./browser","./utils","./settings","./completion_utils"],(e,t,l,r,i,o,n)=>{
Object.defineProperty(t,"__esModule",{value:true}),t.Ze=t.et=t.tt=t.lt=t.rt=t.it=t.ot=t.omniBlockList=void 0
;let f,u,s=decodeURIComponent,_=-1,a="1",m=null,c=null,d=null,p=false;t.omniBlockList=c,t.ot=e=>{let t,l,r=e.slice(0,5)
;if("https"===r)t=8;else if("http:"===r)t=7;else{if(!r.startsWith("ftp"))return null;t=6}return l=e.indexOf("/",t),{
nt:e=e.slice(t,l<0?e.length:l),ft:t}},t.it={ut:null,st:"",_t:"",at:0,mt:0,ct:0,dt:null,pt(){let e=r.n.bookmarks
;e.onCreated.addListener(t.it.Tt),e.onRemoved.addListener(t.it.ht),e.onChanged.addListener(t.it.ht),
e.onMoved.addListener(t.it.Tt)},bt(){if(!r.n.bookmarks){l.ie.c=2;let e=t.it.dt;return t.it.dt=null,void(e&&e())}
l.ie.c=1,t.it.mt&&(clearTimeout(t.it.mt),t.it.mt=0),r.n.bookmarks.getTree(t.it.gt)},gt(e){l.ie.ne=[],l.ie.Ve=[],
l.ie.c=2,n.vt.pe(2),e.forEach(t.it.xt),setTimeout(()=>t.Ze.kt(l.ie.ne),50),t.it.pt&&(setTimeout(t.it.pt,0),t.it.pt=null)
;let r=t.it.dt;t.it.dt=null,r&&r()},xt(e,r){let o=e.title,n=e.id,f=o||n,u=t.it.st+"/"+f;if(e.children){l.ie.Ve.push({
Y:n,yt:u,Dt:f});let r=t.it.st,i=t.it._t;2<++t.it.at&&(t.it.st=u),t.it._t=n,e.children.forEach(t.it.xt),--t.it.at,
t.it.st=r,t.it._t=i}else{let s=e.url,_="javascript:",a=s.startsWith(_);l.ie.ne.push({Y:n,yt:u,Dt:f,t:a?_:s,
wt:c?t.tt(s,p?u:o):1,u:a?_:s,X:t.it._t,ee:r,Be:a?s:null,Pt:a?i.Le(s):null})}},Tt(){let e=()=>{
let r=performance.now()-l.ie.Ke;0===l.ie.c&&(r>=59900||r<-5e3?(t.it.mt=t.it.ct=0,t.it.bt()):t.it.mt=setTimeout(e,3e4))}
;l.ie.Ke=performance.now(),l.ie.c<2||(t.it.mt=setTimeout(e,6e4),l.ie.c=0)},ht(e,r){
let i=l.ie.ne,o=r&&r.title,n=i.findIndex(t=>t.Y===e);if(n>=0){let e=i[n],u=e.u,s=r&&r.url
;if(f&&(null==o?u!==e.t||!r:null!=s&&u!==s)&&l.Rt.has(u)&&t.rt.It&&t.rt.Lt(u)<0&&l.Rt.delete(u),
null!=o)e.yt=e.yt.slice(0,-e.Dt.length)+(o||e.Y),e.Dt=o||e.Y,s&&(e.u=s,e.t=t.Ze.Ut(s,e),t.Ze.Mt()),
c&&(e.wt=t.tt(e.Be||e.u,p?e.yt:e.Dt)),l.ie.Ke=performance.now();else{i.splice(n,1)
;for(let t=r?n:i.length;t<i.length;t++)i[t].X===e.X&&i[t].ee--;r||t.it.Tt()}}else if(l.ie.Ve.find(t=>t.Y===e)){
if(null==o&&!t.it.ct&&f){let e=l.Rt,r=t.rt.Lt;for(let{u:l}of t.rt.It?i:[])e.has(l)&&r(l)<0&&e.delete(l);t.it.ct=1}
t.it.Tt()}}},l.L=(e,r)=>{if(2!==l.ie.c){let o=i.jt();return t.it.dt=o.Et,t.it.bt(),o.Ot.then(l.L.bind(0,e,r))}
let o=!r&&e.includes("/"),n=o?(e+"").replace(/\\\/?|\//g,e=>e.length>1?"/":"\n").split("\n").filter(e=>e):[]
;if(!e||o&&!n.length)return Promise.resolve(false)
;if(r)return Promise.resolve(l.ie.ne.find(t=>t.Y===e)||l.ie.Ve.find(t=>t.Y===e)||null)
;let f=o?"/"+n.slice(1).join("/"):"",u=o?"/"+n[0]+f:""
;for(let t of l.ie.ne)if(o&&(t.yt===u||t.yt===f)||t.Dt===e)return Promise.resolve(t)
;for(let t of l.ie.Ve)if(o&&(t.yt===u||t.yt===f)||t.Dt===e)return Promise.resolve(t);let s=null
;for(let t of l.ie.ne)if(t.Dt.includes(e)){if(s){s=null;break}s=t}return Promise.resolve(s)};let T=e=>{e&&e()};t.rt={
It:false,At:0,Bt:null,St(e){if(t.rt.Bt)e&&t.rt.Bt.push(e);else{if(l.Wt.Vt=Date.now(),!r.n.history)return l.Wt.qt=[],
t.rt.St=T,void T(e);t.rt.Bt=e?[e]:[],t.rt.At||r.n.history.search({text:"",maxResults:2e4,startTime:0},e=>{
setTimeout(t.rt.Ct,0,e)})}},Ct(e){t.rt.Ct=null;for(let l=0,r=e.length;l<r;l++){let r=e[l],i=r.url
;i.length>2e3&&(i=t.rt.Ht(i,r)),e[l]={t:i,Dt:r.title||"",$t:r.lastVisitTime,wt:1,u:i}}
if(c)for(let l of e)0===t.tt(l.t,l.Dt)&&(l.wt=0);setTimeout(()=>{setTimeout(()=>{let e=l.Wt.qt
;for(let l=e.length-1;0<l;){let r=e[l],i=r.u,o=r.t=t.Ze.Ut(i,r),n=o.length>=i.length;for(;0<=--l;){let r=e[l],f=r.u
;if(f.length>=i.length||!i.startsWith(f))break;r.u=i.slice(0,f.length);let u=n?f:t.Ze.Ut(f,r)
;r.t=n||u.length<f.length?o.slice(0,u.length):u}}t.rt.zt&&setTimeout(()=>{t.rt.zt&&t.rt.zt(l.Wt.qt)},200)},100),
l.Wt.qt.sort((e,t)=>e.u>t.u?1:-1),t.rt.It=true,r.n.history.onVisitRemoved.addListener(t.rt.Ft),
r.n.history.onVisited.addListener(t.rt.Gt)},100),l.Wt.qt=e,t.rt.St=T,t.rt.Bt&&t.rt.Bt.length>0&&setTimeout(e=>{
for(let t of e)t()},1,t.rt.Bt),t.rt.Bt=null},Gt(e){let r=e.url;r.length>2e3&&(r=t.rt.Ht(r,e))
;let i=e.lastVisitTime,o=e.title||"",f=++l.Wt.Jt,u=l.Wt.Kt,s=t.rt.Lt(r);s<0&&l.Wt.Nt++,
(f>59||f>10&&Date.now()-l.Wt.Vt>3e5)&&t.rt.Qt();let _,a=s>=0?l.Wt.qt[s]:{t:"",Dt:o,$t:i,wt:c?t.tt(r,o):1,u:r};if(u){
let e=t.ot(r);e&&((_=u.get(e.nt))?(_.$t=i,s<0&&(_.Xt+=a.wt),e.ft>6&&(_.Yt=8===e.ft?1:0)):u.set(e.nt,{$t:i,Xt:a.wt,
Yt:8===e.ft?1:0}))}if(s>=0){if(a.$t=i,o&&o!==a.Dt&&(a.Dt=o,n.vt.Zt&&n.vt.pe(1),c)){let e=t.tt(r,o);a.wt!==e&&(a.wt=e,
_&&(_.Xt+=e||-1))}}else a.t=t.Ze.Ut(r,a),l.Wt.qt.splice(~s,0,a),n.vt.Zt&&n.vt.pe(1)},Ft(e){u.length=0;let r=l.Rt
;if(n.vt.pe(1),e.allHistory){l.Wt.qt=[],l.Wt.Kt=new Map;let e=[];for(let t of l.ie.ne){let l=r.get(t.u)
;l&&e.push([t.u,l])}r.clear();for(let[t,l]of e)r.set(t,l);return}let i,o=t.rt.Lt,{qt:f,Kt:s}=l.Wt;for(let l of e.urls){
let e=o(l);if(e>=0){if(s&&f[e].wt){let e=t.ot(l);e&&(i=s.get(e.nt))&&--i.Xt<=0&&s.delete(e.nt)}f.splice(e,1),r.delete(l)
}}},Ht(e,t){let l=e.lastIndexOf(":",9),r=l>0&&"://"===e.substr(l,3),o=t.title
;return e=e.slice(0,(r?e.indexOf("/",l+4):l)+320)+"\u2026",o&&o.length>160&&(t.title=i.el(o,0,160)),e},Qt(){
let e=Date.now();if(l.Wt.Nt<=0);else{if(e<l.Wt.Vt+1e3&&e>=l.Wt.Vt)return;setTimeout(r.n.history.search,50,{text:"",
maxResults:Math.min(999,l.Wt.Jt+10),startTime:e<l.Wt.Vt?e-3e5:l.Wt.Vt},t.rt.tl)}return l.Wt.Vt=e,l.Wt.Nt=l.Wt.Jt=0,
t.Ze.Mt()},zt(e){t.rt.zt=null;let r=l.Wt.Kt;for(let{u:l,$t:i,wt:o}of e){let e=t.ot(l);if(!e)continue
;let{nt:n,ft:f}=e,u=r.get(n);u?(u.$t<i&&(u.$t=i),u.Xt+=o,f>6&&(u.Yt=8===f?1:0)):r.set(n,{$t:i,Xt:o,Yt:8===f?1:0})}},
tl(e){let r=l.Wt.qt,i=t.rt.Lt;if(!(r.length<=0))for(let o of e){let e=o.url;e.length>2e3&&(o.url=e=t.rt.Ht(e,o))
;let n=i(e);if(n<0)l.Wt.Nt--;else{let e=o.title;if(!e||e===r[n].Dt)continue}l.Wt.Jt--,t.rt.Gt(o)}},Lt(e){
let t="",r=l.Wt.qt,i=r.length-1,o=0,n=0;for(;o<=i;)if(n=o+i>>>1,t=r[n].u,t>e)i=n-1;else{if(t===e)return n;o=n+1}return~o
}},t.lt=(e,i,o)=>{let n=r.Te();if(!n)return void o([]);let f=setTimeout(()=>{f=0,o([])},150);n.getRecentlyClosed({
maxResults:Math.min(Math.round(1.2*e),+n.MAX_SESSION_RESULTS||25,25)},e=>{if(!f)return;clearTimeout(f)
;let n,u=[],s=0,_=Date.now()-performance.now();for(let r of e||[]){let e=r.tab,o=null;if(!e){
if(!(o=r.window)||!o.tabs||!o.tabs.length)continue;s=1,e=o.tabs.find(e=>e.active)||o.tabs[0],o.sessionId||(o=null)}
let f=e.url;f.length>2e3&&(f=t.rt.Ht(f,e));let a=e.title;if(!i&&!t.tt(f,a))continue;n=r.lastModified;let m=e.windowId
;u.push({u:f,Dt:a,ll:n,rl:[m,(o||e).sessionId,o?o.tabs.length:0],
il:o?` +${o.tabs.length>1?o.tabs.length-1:""}`:m&&m!==l.xe&&n>_?" +":""})}return s?setTimeout(o,0,u):o(u),r.le()})},
t.tt=(e,t)=>d.test(t)||d.test(e)?0:1,t.et={ol(e){if(c)for(let t of e)for(let e of c)if(e=e.trim(),
t.includes(e)||e.length>9&&t.length+2>=e.length&&e.includes(t))return true;return false},nl(){
if(l.ie.ne)for(let e of l.ie.ne)e.wt=c?t.tt(e.Be||e.u,p?e.yt:e.Dt):1;if(!l.Wt.qt)return;let e=l.Wt.Kt
;for(let r of l.Wt.qt){let l=c?t.tt(r.u,r.Dt):1;if(r.wt!==l){r.wt=l;let i=e&&t.ot(r.u),o=i&&e.get(i.nt);o&&(o.Xt+=l||-1)
}}}},t.Ze={Ut(e,t){if(e.length>=400||e.lastIndexOf("%")<0)return e;try{return s(e)}catch(e){}
return l.Rt.get(e)||(t&&u.push(t),e)},kt(e){let r,i,o=l.Rt,n=u,f=-1,_=e.length;for(;;)try{for(;++f<_;)r=e[f],i=r.u,
r.t=i.length>=400||i.lastIndexOf("%")<0?i:s(i);break}catch(e){r.t=o.get(i)||(n.push(r),i)}t.Ze.Mt()},Mt(){
0!==u.length&&-1===_&&(_=0,setTimeout(h,17))}};let h=()=>{let e,t=u.length;if(!a||_>=t)return u.length=0,_=-1,
void(m=null);for(t=Math.min(_+32,t),m=m||new TextDecoder(a);_<t;_++){let t=u[_],r="string"==typeof t,i=r?t:t.u
;(e=l.Rt.get(i))?r||(t.t=e):(e=i.replace(/%[a-f\d]{2}(?:%[a-f\d]{2})+/gi,b),e=e.length!==i.length?e:i,
"string"!=typeof t?l.Rt.set(t.u,t.t=e):l.Rt.set(t,e))}_<u.length?setTimeout(h,4):(u.length=0,_=-1,m=null)},b=e=>{
let t=new Uint8Array(e.length/3);for(let l=1,r=0;l<e.length;l+=3)t[r++]=parseInt(e.substr(l,2),16);return m.decode(t)}
;l.fl.omniBlockList=e=>{let r=[];for(let t of e.split("\n"))t.trim()&&"#"!==t[0]&&r.push(t)
;d=r.length>0?new RegExp(r.map(i.ul).join("|"),""):null,p=r.join("").includes("/"),t.omniBlockList=c=r.length>0?r:null,
(l.Wt.qt||l.ie.ne.length)&&setTimeout(t.et.nl,100)},o.sl.then(()=>{o._l("omniBlockList")}),l.fl.localeEncoding=e=>{
let r=!!e&&!(e=e.toLowerCase()).startsWith("utf"),i=a;if(a=r?e:"",a!==i){try{new TextDecoder(a)}catch(e){r=false}
r?"1"!==i&&setTimeout(()=>(l.Wt.qt&&t.Ze.kt(l.Wt.qt),t.Ze.kt(l.ie.ne)),100):(l.Rt.clear(),u&&(u.length=0)),
f!==r&&(u=r?[]:{length:0,push:l.r},f=r,_=-1)}},o._l("localeEncoding"),l.ml.al=(e,l,i)=>{switch(l){case"tab":
n.vt.cl(null),r.Me.remove(+e,()=>{let e=r.le();return e||n.vt.cl(null),i(!e),e});break;case"history":
let l=!t.rt.It||t.rt.Lt(e)>=0;r.n.history.deleteUrl({url:e}),l&&n.vt.pe(1),i(l)}},l.ml.dl=t.et.ol});