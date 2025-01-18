"use strict"
;__filename="background/tab_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports","./i18n","./run_commands","./clipboard","./open_urls","./frame_commands","./filter_tabs","./tools"],(e,l,t,r,i,n,o,u,f,d,a,s,v,w,m)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.toggleWindow=l.Ie=l.Pe=l.toggleTabUrl=l.togglePinTab=l.toggleMuteTab=l.removeTab=l.reloadTab=l.moveTabToNextWindow=l.moveTabToNewWindow=l.joinTabs=l.copyWindowInfo=void 0
;let c=Math.abs,p=()=>{t.g&&v.focusFrame(t.g,false,0,1)
},b=e=>t.y.end?null:null!=t.y.position?s.newTabIndex(e,t.y.position,false,false):null!=t.y.rightInOld?e.index+(t.y.rightInOld?0:1):e.index+(false!==t.y.right?1:0)
;l.copyWindowInfo=e=>{
let l=t.y.filter,n=t.y.keyword,o=t.y.decoded,s=null!=o?o:t.y.decode,v=t.y.format,m=t.y.type,p="tab"===m&&(c(t.M)>1||!!l),b=a.O(t.y),I={
d:false!==s,s:b,k:n};if("frame"===m&&t.g&&!v){let l;return 128&t.g.s.u?(t.g.postMessage({N:3,H:18,U:1,o:I}),
l=1):l=u.be({H:18,U:1,o:I}),void(1!==l&&(l&&l instanceof Promise?l.then(()=>{e(1)}):e(1)))}i.Me.query("browser"===m?{
windowType:"normal"}:{active:"window"!==m&&!p||void 0,lastFocusedWindow:true},o=>{var a
;if((!m||"browser"!==m&&"window"!==m&&"tab"!==m&&"string"==typeof m)&&!v){
let e="title"===m?o[0].title:m&&"frame"!==m&&"url"!==m?(null===(a=r.ru(i.getTabUrl(o[0])))||void 0===a?void 0:a[m])||"":i.getTabUrl(o[0]),l="title"===m?{
s:e}:{u:e};return l.o=I,l.n=d.parseFallbackOptions(t.y),void t.cn[18](l,t.g)}
let c=t.g?t.g.s.se:2===t.fe,g=""+(v||"${title}: ${url}"),x=t.y.join,y="json"===x&&!v;if(p){
let e=o.length<2?0:i.selectIndexFrom(o),l=w.getTabRange(e,o.length);o=o.slice(l[0],l[1])
}else o=o.filter(e=>e.incognito===c);if(l){let e=t.g?t.g.s.d:t.he,r=o.find(l=>l.id===e);o=w.re(r,o,l)}
if(!o.length)return void e(0);"browser"===m&&o.sort((e,l)=>e.windowId-l.windowId||e.index-l.index);let _=o.map(e=>y?{
title:e.title,url:s?r.Ll(i.getTabUrl(e)):i.getTabUrl(e)}:g.replace(/\$\{([^}]+)}/g,(l,t)=>t.split("||").reduce((l,t)=>{
let n
;return l||(s&&"url"===t?r.Ll(i.getTabUrl(e)):"host"===t?(n=r.ru(i.getTabUrl(e)))&&n.host||"":"__proto__"!==t&&(n=e[t],
n&&"object"==typeof n?JSON.stringify(n):n||""))},"")));Promise.resolve(t.Il(_,x,b,n)).then(l=>{e(1),
u.showHUD("tab"===m&&o.length<2?l:f.D("copiedWndInfo"),15)})})},l.joinTabs=e=>{
let l=null!=t.y.order?t.y.order:t.y.sort,r=t.y.windows,n="current"===r,o="all"===r,u=u=>{let f=2===t.fe
;u=n?u:u.filter(e=>e.incognito===f);let d=n?u:u.filter(e=>e.id===t.xe);if(!n&&!d.length)return void e(0);let a=r=>{
let o=[],f=e=>{o.push(e)};if(u.sort((e,l)=>e.id-l.id).forEach(e=>{e.tabs.forEach(f)}),!o.length)return void e(0)
;let d=t.y.filter,a=r?r.id:t.xe,s=o.find(e=>e.id===t.he)||(r?i.selectFrom(r.tabs):o[0]);if(n&&c(t.M)>1&&o.length>1){
let e=o.findIndex(e=>e.id===s.id),l=w.getTabRange(e,o.length);o=o.slice(l[0],l[1])}if(d){let e={};o=w.re(s,o,d,e),
d=e.known?d:null}if(!o.length)return void e(0);o=l?w.lu(o,l):o
;let v,m=t.y.position,p="before"===m||(m+"").startsWith("prev")
;d&&r?m&&"string"==typeof m&&"keep"!==m?"begin"===m||"start"===m?v=r.tabs.filter(e=>e.pinned).length:"end"!==m?(o.includes(s)&&o.splice(o.indexOf(s),1),
p?o.push(s):o.unshift(s),
v=Math.max(0,r.tabs.findIndex(e=>e.id===t.he)-o.filter(e=>e.windowId===a&&e.index<s.index).length)):v=r.tabs.length:v=o.reduce((e,l)=>l.windowId===a?Math.min(l.index,e):e,o.length):v=r?r.tabs.length:0
;for(let e of o)i.Me.move(e.id,e.windowId!==a?{windowId:a,index:v++}:{index:v++})
;for(let e of o)e.pinned&&e.windowId!==a&&i.tabsUpdate(e.id,{pinned:true});e(1)};{let e=d.length?d[0]:null
;if(e&&"popup"===e.type&&e.tabs.length){let l=i.selectFrom(e.tabs).id;e.tabs=e.tabs.filter(e=>e.id!==l),i.makeWindow({
tabId:l,incognito:e.incognito},e.state,e=>{e&&(t.xe=e.id,e.tabs[0]&&(t.he=e.tabs[0].id)),a(e)})
}else u=n||!e||o||l&&!r?u:u.filter(l=>l.id!==e.id),a(e)}};n?i.getCurWnd(true,e=>e?u([e]):i.le()):(t.M=1,i.Ae.getAll({
populate:true,windowTypes:["normal","popup"]},u))},l.moveTabToNewWindow=e=>{let l=!!t.y.all,r=n=>{var o
;let a,s=n.tabs,v=s.length,m=false!==t.y.focused,I=i.selectIndexFrom(s),g=s[I]
;if(!l&&v<=1&&(!v||0===g.index&&c(t.M)>1))return void e(0);a=l?[0,v]:1===v?[0,1]:w.getTabRange(I,v)
;let x=t.y.filter,y=s.slice(a[0],a[1]);if(y=x?w.re(g,y,x):y,!y.length)return void e(0);if(!l){let l=y.length
;if(l>=v&&v>1)return e(0),void u.showHUD(f.D("moveAllTabs"))
;if(l>30&&d.oe())return void d.x("moveTabToNewWindow",l).then(r.bind(null,n))
;if(1===v&&0===g.index&&1===c(t.M))return void i.ye(i.Me.query,{windowId:n.id,index:1}).then(l=>{
if(!l||!l.length)return e(0),void u.showHUD(f.D("moveAllTabs"));n.tabs=[n.tabs[0],l[0]],r(n)})}
let _=g.incognito,h=y.includes(g)?g:y[0],T=(null!==(o=b(g))&&void 0!==o?o:g.index+1)<=g.index,k={tabId:h.id,incognito:_,
focused:m},z="normal"===n.type?n.state:"";w.tu(y[T?y.length-1:0],T,s).then(l=>{m||l&&i.selectTab(l.id),
i.makeWindow(k,z,t=>{if(!t)return void e(0);p(),m&&l&&i.selectTab(l.id)
;let r=y.indexOf(h),n=y.slice(0,r),o=y.slice(r+1),u=n.length,f=o.length;if(u)for(let e=0;e<u;e++)i.Me.move(n[e].id,{
index:e,windowId:t.id},i.le);if(f)for(let e=0;e<f;e++)i.Me.move(o[e].id,{index:u+1+e,windowId:t.id},i.le)
;for(let e of y)e.pinned&&i.tabsUpdate(e.id,{pinned:true});e(1)})})},n=l=>{let r=i.selectFrom(l.tabs)
;if(l.incognito&&r.incognito)return e(0),u.showHUD(f.D("hasIncog"));let n=r.id,o={incognito:true},a=i.getTabUrl(r)
;if(r.incognito);else{if(i.w(a))return e(0),u.complainLimits(f.D("openIncog"));o.url=a}l.tabs=null,i.Ae.getAll(r=>{
let u=false!==t.y.focused;if((r=r.filter(e=>e.incognito&&"normal"===e.type)).length)return void i.Me.query({
windowId:s.preferLastWnd(r).id,active:true},([e])=>{i.tabsCreate({url:a,windowId:e.windowId,active:false!==t.y.active,
index:s.newTabIndex(e,t.y.position,false,false)},d.getRunNextCmdBy(3)),u&&i.selectWnd(e),i.Me.remove(n)})
;let f="normal"===l.type?l.state:"",v=null!=o.url;v?t.J.so&&(u=true,f=""):o.tabId=n,o.focused=u,i.makeWindow(o,f,l=>{
v||l&&p(),v&&l?d.getRunNextCmdBy(0)(l.tabs&&l.tabs[0]||null):e(!!l)}),v&&i.Me.remove(n)})},o=!!t.y.incognito
;o&&(t.g?t.g.s.se:2===t.fe)?(u.showHUD(f.D("hasIncog")),
e(0)):(l||1!==c(t.M)&&!o?i.ye(i.getCurWnd,true):i.ye(i.getCurWnd,false).then(e=>e&&i.ye(i.Me.query,{windowId:e.id,
active:true}).then(l=>(e.tabs=l,l&&l.length?e:void 0)))).then(l=>{l?(o?n:r)(l):e(0)})},l.moveTabToNextWindow=([e],r)=>{
function n(n,f){let d,a=false!==t.y.focused,s=t.y.filter,v=!!(t.y.tabs||s||u);if(n.length>0){
d=n.map(e=>e.id).sort((e,l)=>e-l);let l=d.indexOf(e.windowId);if(d.length>=2||d.length>0&&l<0){
let m=t.y.nextWindow,I=u?1:(null==m?1:"boolean"==typeof m?m?1:-1:0|+m||1)*(v?1:t.M),g=u?0:l>=0?I>0?l+1:l:0,x=I>0?g+I-1:g+I
;x=(x%d.length+d.length)%d.length,x=x!==l?x:x+(I>0?1:-1),x=(x%d.length+d.length)%d.length
;let y=d[x],_=n.find(e=>e.id===y),h=a&&!o&&_&&"minimized"===_.state?f&&"maximized"===f.state?f.state:"normal":""
;return void i.Me.query({windowId:y,active:true},([l])=>{let n=b(l),o=null==n||n>l.index,u=null,f=false,d=null,m=()=>{
if(false===f)return void w.tu(e,!o,d).then(e=>{f=e,m()});let s;a||f&&i.selectTab(f.id),i.Me.move(e.id,{
index:null!=n?n:-1,windowId:y},l=>{if(i.le())return r(0),i.selectWnd(e),i.le();Promise.resolve(s).then(()=>r(1)),
u=u||[e];for(let e=0;e<u.length;e++)u[e].id!==l.id&&i.Me.move(u[e].id,{index:l.index+e,windowId:l.windowId},i.le),
u[e].pinned&&i.Me.update(u[e].id,{pinned:true});t.g&&t.g.s.d===l.id&&p()}),a&&(h&&i.Ae.update(y,{state:h}),
i.selectWnd(l)),s=false!==t.y.active&&new Promise(l=>{i.selectTab(e.id,l)}),a&&f&&i.selectTab(f.id)}
;!v||!s&&1===c(t.M)?m():w.ke(true,0,(l,t)=>{if(d=l.slice(0),e=l[t[1]],l=l.slice(t[0],t[2]),s){
if(!(l=w.re(e,l,s)).length)return void r(0);e=l.includes(e)?e:l[0]}u=l,f=(1!==u.length||!u[0].active)&&null,m()},[],r)})
}}else n=f?[f]:[];v&&c(t.M)>1?l.moveTabToNewWindow(r):w.tu(e,false).then(l=>{a||l&&i.selectTab(l.id),i.makeWindow({
tabId:e.id,incognito:e.incognito,focused:a},1===n.length&&"normal"===n[0].type?n[0].state:"",t=>{t&&(p(),
a&&l&&i.selectTab(l.id)),e.pinned&&t&&t.tabs&&t.tabs[0]&&i.tabsUpdate(t.tabs[0].id,{pinned:true}),r(!!t)})})}
let o=false===t.y.minimized||false===t.y.min,u=t.y.last;u?w.eu("normal",false,e.incognito,e.windowId,o).then(e=>{
!e||e instanceof Array?n(e[0].slice(0,1),e[1]):n([e])}):i.Ae.getAll(l=>{
n(l.filter(l=>l.incognito===e.incognito&&"normal"===l.type&&(!o||"minimized"!==l.state)),l.find(l=>l.id===e.windowId))})
},l.reloadTab=(e,[r,n,o],u,f)=>{let a={bypassCache:true===(t.y.hard||t.y.bypassCache)},s=i.Me.reload,v=e
;if(c(t.M)<2||t.y.single)return void s(e[f?n:r].id,a,d.getRunNextCmdBy(0));let m=e[n],p=t.y.filter;if(e=e.slice(r,o),p){
if(!(e=w.re(m,e,p)).length)return void u(0);m=e.includes(m)?m:e[0]}
if(e.length>20&&d.oe())d.x("reloadTab",e.length).then(l.reloadTab.bind(null,v,[r,n,o],u));else{
s(m.id,a,d.getRunNextCmdBy(0));for(let l of e)l!==m&&s(l.id,a)}},l.removeTab=(e,r,n)=>{
let o=t.y.highlighted,u=t.y.goto||(t.y.left?"left":""),f=(u+"").split(/[\/,;\s]/),a=f.length>1?f[c(t.M)>1?1:0]:u+"",s="near"===a||"reverse"===a||a.startsWith("back"),v=a.startsWith("forw"),p=s?t.M>0:v?t.M<0:"left"===a,b=s?t.M<0:v?t.M>0:"right"===a,x=a.includes("previous"),y=x&&a.includes("only")
;if(!r){let r=c(t.M)>1||o||x&&!y;return void(r?i.getCurTabs:i.getCurTab)(l.removeTab.bind(null,e,r?2:1))}
if(!n||!n.length)return e(0),i.le();let _,h=n.length,T=i.selectIndexFrom(n),k=n[T],z=1,j=T,M=T+1;if(c(t.M)>1&&h>1){
let i=0;if(n[0].pinned!==k.pinned&&!(t.M<0&&n[T-1].pinned))for(;n[i].pinned;)i++;let o=w.getTabRange(T-i,h-i,h)
;if(z=o[1]-o[0],z>20&&d.oe()&&r<3)return void d.x("removeTab",z).then(l.removeTab.bind(null,e,2,n));z>1&&(j=i+o[0],
M=i+o[1])}else if(o){let l=n.filter(e=>e.highlighted&&e!==k),t="no-current"===o;if(z=l.length+1,
z>1&&(t||z<h)&&i.Me.remove(l.map(e=>e.id),i.le),t)return void e(z>1)
}else if(t.y.filter&&0===w.re(k,[k],t.y.filter).length)return void e(0)
;if(!j&&z>=h&&true!==(null!=t.y.mayClose?t.y.mayClose:t.y.allow_close))return void(r<2?i.getCurTabs(l.removeTab.bind(null,e,3)):i.Ae.getAll(I.bind(null,e,k,n)))
;if(r<2){if(y){let e=w.He();e>=0&&(_=i.ye(i.tabsGet,e))}else(b||p&&j>0)&&(_=i.ye(i.Me.query,{windowId:k.windowId,
index:p?j-1:j+1}).then(e=>e&&e[0]));if(_)return void _.then(t=>{t&&t.windowId===k.windowId&&i.$e(t)?(i.selectTab(t.id),
i.Me.remove(k.id,i.Oe(e))):i.getCurTabs(l.removeTab.bind(null,e,3))})}let P=h;if(z>=h);else if(x){
let e=!y&&M<h&&!t.qe.has(n[M].id)?n[M]:n.filter((e,l)=>(l<j||l>=M)&&t.qe.has(e.id)).sort(m.ze.De)[0];P=e?n.indexOf(e):h
}else if(p||b){let e=P=p?j>0?j-1:M:M<h?M:j-1;for(;e>=0&&e<h&&(e<j||e>=M)&&!i.$e(n[e]);)e+=e<j?-1:1;P=e>=0&&e<h?e:P}
P>=0&&P<h&&i.selectTab(n[P].id),g(k,n,j,M,e)};let I=(e,l,r,n)=>{let o,u,f=false;n=n.filter(e=>"normal"===e.type),
"always"===t.y.keepWindow?f=!n.length||n.some(e=>e.id===l.windowId):n.length<=1?(f=true,
(u=n[0])&&(u.id!==l.windowId?f=false:u.incognito&&!i.w(t.newTabUrl_f)&&(o=u.id))):l.incognito||1===(n=n.filter(e=>!e.incognito)).length&&n[0].id===l.windowId&&(o=n[0].id,
f=true),f&&i.tabsCreate({index:r.length,url:"",windowId:o},d.getRunNextCmdBy(3)),g(l,r,0,r.length,f?null:e)
},g=(e,l,r,n,o)=>{let u=Math.max(0,l.indexOf(e));i.Me.remove(e.id,o?i.Oe(o):i.le);let f=l.slice(u+1,n),d=l.slice(r,u)
;t.M<0&&([f,d]=[d,f]),
f.length>0&&i.Me.remove(f.map(e=>e.id),i.le),d.length>0&&i.Me.remove(d.map(e=>e.id).reverse(),i.le)}
;l.toggleMuteTab=e=>{let l,r=t.y.filter,n=t.y.currentWindow,o=t.y.others,d=null!=o?o:t.y.other
;if(!(t.y.all||n||r||d))return void i.getCurTab(([l])=>{let r=!i.isTabMuted(l),n=null!=t.y.mute?!!t.y.mute:r
;n===r&&i.tabsUpdate(l.id,{muted:n}),u.showHUD(f.D(n?"muted":"unmuted")),e(1)});let a=n=>{
let o=d?t.g?t.g.s.d:t.he:-1,f=0===n.length||-1!==o&&1===n.length&&n[0].id===o
;if(null!=t.y.mute)f=!!t.y.mute;else for(let e of n)if(e.id!==o&&!i.isTabMuted(e)){f=true;break}
if(r&&!(n=w.re(l,n,r)).length)return void e(0);let a={muted:f}
;for(let e of n)e.id!==o&&f!==i.isTabMuted(e)&&i.tabsUpdate(e.id,a)
;u.showHUDEx(t.g,f?"mute":"unmute",0,[[-1===o?"All":"Other"]]),e(1)},s=w.getNecessaryCurTabInfo(r),v=n&&t.xe>=0?{
audible:true,windowId:t.xe}:{audible:true};s?s.then(e=>{l=e,i.Me.query(v,a)}):i.Me.query(v,a)},l.togglePinTab=(e,l,r)=>{
let n=t.y.filter,o=l[1],u=e[o];e=n?w.re(u,e,n):e;let f=!n||e.includes(u)?!u.pinned:!!e.find(e=>!e.pinned),a={pinned:f
},s=f?0:1,v=0;if(c(t.M)>1&&f)for(;e[v].pinned;)v++
;let m=w.getTabRange(o-v,e.length-v,e.length),p=v+m[s]-s,b=v+m[1-s]-s,I=[]
;for(;p!==b;p+=f?1:-1)(f||e[p].pinned)&&I.push(e[p])
;b=I.length,b?(b<=30||!d.oe()?Promise.resolve(false):d.x("togglePinTab",b)).then(e=>{e&&(I.length=1)}).then(()=>{
let e=I.includes(u)?u.id:I[0].id;for(let l of I)i.tabsUpdate(l.id,a,l.id===e?i.Oe(r):i.le)}):r(0)},
l.toggleTabUrl=(e,r)=>{let a=e[0],v=i.getTabUrl(a),w=t.y.reader,m=t.y.keyword
;if(v.startsWith(t.J.U))return u.complainLimits(f.D(w?"noReader":"openExtSrc")),void r(0);if(w&&m){let l=o.Ne({u:v})
;l&&l.k===m?(d.overrideCmdOptions({keyword:""}),s.openUrlWithActions(l.u,0,true,e)):(v=n.Xl(l&&t.y.parsed?l.u:v,m),
s.openUrlWithActions(v,9,true,e))}else if(w)i.Me.toggleReaderMode(a.id).then(()=>{d.runNextOnTabLoaded(t.y,null)},()=>{
l.Pe(a,0,{openInReaderMode:true})});else{if(w)return u.complainLimits(f.D("noReader")),void r(0)
;v=v.startsWith("view-source:")?v.slice(12):"view-source:"+v,s.openUrlWithActions(v,9,true,e)}},l.Pe=(e,l,r,n)=>{
let o,u=e.id,f=1===l;if(l&&i.Te()&&(false!==n||null==i.getGroupId(e))){let l=0,t=-1,r=()=>{let e=i.le()
;if(e)return i.Te().restore(null,d.getRunNextCmdBy(0)),t>=0&&i.Me.remove(t),t=0,e;l+=1,l>=5||setTimeout(()=>{
i.tabsGet(u,r)},50*l*l)};return f&&i.tabsCreate({url:"about:blank",active:false,windowId:e.windowId},e=>{
t?t=e.id:i.Me.remove(e.id)}),void i.Me.remove(u,()=>(i.tabsGet(u,r),i.le()))}{let l=i.isTabMuted(e);o=e=>{
l!==i.isTabMuted(e)&&i.tabsUpdate(e.id,{muted:l})}}let a={windowId:e.windowId,index:e.index,url:i.getTabUrl(e),
active:e.active,pinned:e.pinned,openerTabId:e.openerTabId};r&&(a=Object.assign(r,a)),null!=a.index&&a.index++,
i.openMultiTabs(a,1,true,[null],n,e,e=>{e&&i.Me.remove(u),e&&o&&o(e),e?d.runNextOnTabLoaded(t.y,e):d.runNextCmd(0)})},
l.Ie=(e,l,r)=>{let n=null;return(async()=>{let e=l?l.window?i.selectFrom(l.window.tabs):l.tab:null;e&&(n=e)
})().then(async()=>(r&&(await i.ye(i.tabsUpdate,r,{active:true}),t.xe!==e&&await i.ye(i.Ae.update,e,{focused:true})),n))
},l.toggleWindow=e=>{let l=t.y.target,r=t.y.states;r="string"==typeof r?r.trim().split(/[\s,;]+/):r,
r=r||["normal","maximized"];let n=t.xe,o=l&&"current"!==l&&"all"!==l?t.uu:n
;o<0?e(0):i.ye(i.Ae.get,o).then(e=>e||i.ye(i.Ae.get,t.xe)).then(async u=>{if(!u)return void e(0)
;let f="other"===l||"others"===l?await i.je(i.Ae.getAll).then(e=>(e=null==e?void 0:e.filter(e=>e.id!==n&&e.id!==o&&"devtools"!==e.type))?e.map(e=>e.id):[]):[],d={}
;if(r instanceof Array){let e=["normal","maximized","fullscreen","minimized"];r=r.map(l=>{var t
;return null!==(t=e.find(e=>e.startsWith(l)))&&void 0!==t?t:"current keep".includes(l)?"":" "}).filter(e=>" "!==e)
;let l=t.M>1?t.M-2:r.indexOf(u.state)+1,i=r.length>0&&r[l%r.length]||u.state;(i!==u.state||f.length>0)&&(d.state=i)}
Object.keys(d).length&&i.Ae.update(o,d,i.Oe(e));for(let e of f)i.Ae.update(e,d,i.le)})}});