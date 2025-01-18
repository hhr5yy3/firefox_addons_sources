"use strict";__filename="background/browser.js",define(["require","exports","./store","./utils"],(e,l,t,r)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.import2=l.s=l.f=l.v=l.w=l.removeTempTab=l.downloadFile=l.makeTempWindow_r=l.makeWindow=l.openMultiTabs=l.tabsCreate=l.selectWndIfNeed=l.selectWnd=l.selectTab=l.h=l.k=l.je=l.Oe=l.ye=l.N=l.selectIndexFrom=l.selectFrom=l.getCurWnd=l.$e=l.te=l.getCurTabs=l.getCurTab=l.isTabMuted=l.getTabUrl=l.getGroupId=l.tabsUpdate=l.tabsGet=l.le=l.H=l.Te=l.Ae=l.Me=l.n=void 0,
l.n=browser,globalThis.chrome&&(globalThis.chrome=null),l.Me=l.n.tabs,l.Ae=l.n.windows,l.Te=()=>l.n.sessions,
l.H=()=>l.n.webNavigation,l.le=()=>l.n.runtime.lastError,l.tabsGet=l.Me.get,l.tabsUpdate=l.Me.update,l.getGroupId=e=>{
let l=e.cookieStoreId;return"firefox-default"!==l&&l||null},l.getTabUrl=e=>e.url||"",l.isTabMuted=e=>e.mutedInfo.muted,
l.getCurTab=l.Me.query.bind(null,{active:true,lastFocusedWindow:true}),l.getCurTabs=l.Me.query.bind(null,{
lastFocusedWindow:true}),l.te=l.Me.query.bind(null,{lastFocusedWindow:true,hidden:false}),l.$e=e=>!e.hidden,
l.getCurWnd=(e,r)=>{let u={populate:e};return t.xe>=0?l.Ae.get(t.xe,u,r):l.Ae.getCurrent(u,r)},
l.selectFrom=e=>e[l.selectIndexFrom(e)],l.selectIndexFrom=e=>{for(let l=e.length;0<--l;)if(e[l].active)return l;return 0
},l.N=e=>/^extension:/.test(e)?t.J.U+"-"+e.slice(e.indexOf("ext")):e,l.ye=function(e){
return e.apply(void 0,[].slice.call(arguments,1)).then(u,t.r)};let u=e=>void 0!==e?e:null;l.Oe=e=>e!==t.r?()=>{
let t=l.le();return e(!t),t}:l.le,l.je=function(e){let l=[].slice.call(arguments,1);return e.apply(0,l)};let n=e=>{
let l=t.We.get(e);return 1===l||2===l&&true};l.h=e=>{l.k=e},l.selectTab=(e,t)=>{l.tabsUpdate(e,{active:true},t)},
l.selectWnd=e=>(e&&l.Ae.update(e.windowId,{focused:true
}),l.le()),l.selectWndIfNeed=e=>(e&&e.windowId!==t.xe&&l.selectWnd(e),l.le());let o=()=>{
let e=t.J.Ee,l=e?0:navigator.userAgentData,r=e||!l?(e||navigator.userAgent+"").includes("Thunderbird"):l.brands.some(e=>e.brand.includes("Thunderbird"))
;return o=()=>r,r};l.tabsCreate=(e,r,u)=>{let{url:i}=e;return i?n(i)&&delete e.url:(i=t.newTabUrl_f,
2===t.fe&&(-1===u?i.includes("pages/blank.html")&&i.startsWith(t.Ge):!u&&i.startsWith(location.protocol))||n(i)||(e.url=i),
e.url||delete e.url),o()&&delete e.openerTabId,l.Me.create(e,r)},l.openMultiTabs=(e,r,u,n,o,i,a)=>{let s,f=t=>{var u
;if(l.le())return a&&a(),l.le()
;e.index=t.index,e.windowId=t.windowId,e.cookieStoreId=null!==(u=l.getGroupId(t))&&void 0!==u?u:void 0,a&&a(t),
e.active=false;let o=null!=e.index,i=n?n.length:1,s=l.le;n.length>1&&(n[0]=e.url)
;for(let t=0;t<r;t++)for(let r=t>0?0:1;r<i;r++)n.length>1&&(e.url=n[r]),o&&++e.index,l.Me.create(e,s)}
;if((o=false!==o)&&t.Je){if(i&&null!=(s=l.getGroupId(i)))return e.cookieStoreId=s,
void l.tabsCreate(e,t=>(l.le()&&(l.le()+"").includes("No permission for cookieStoreId")?(delete e.cookieStoreId,
l.Me.create(e,f)):f(t),l.le()),u)}else o||null==e.openerTabId||i&&!l.getGroupId(i)||delete e.openerTabId
;l.tabsCreate(e,f,u)},l.makeWindow=(e,r,u)=>{let o=false!==e.focused
;(r=r?"minimized"===r===o||"popup"===e.type||"normal"===r||"docked"===r?"":r:"")&&!r.includes("fullscreen")&&(e.state=r,
r=""),delete e.focused;let i=e.url;i||null!=e.tabId||(i=e.url=t.newTabUrl_f),"string"==typeof i&&n(i)&&delete e.url,
l.Ae.create(e,r||!o||u?e=>{if(u&&u(e),!(r||!o)||!e)return l.le();let t=o?{}:{focused:false};r&&(t.state=r),
l.Ae.update(e.id,t)}:l.le)},l.makeTempWindow_r=(e,t,r)=>{let u={type:"normal",focused:false,incognito:t,
state:"minimized",tabId:e};delete u.focused,delete u.state,u.left=u.top=0,u.width=u.height=50,l.Ae.create(u,r)},
l.downloadFile=(e,u,n)=>l.ye(l.n.permissions.contains,{permissions:["downloads"]}).then(o=>{if(!o)return false;let i={
url:e};if(u){let l=/\.[a-z\d]{1,4}(?=$|[?&])/i
;if(u=(u="#"===(u=r.Le(u))[0]?u.slice(1):u).replace(/[\r\n]+/g," ").replace(/[/\\?%*:|"<>_]+/g,"_"),!l.test(u)){
let t=l.exec(e);u+=t?t[0]:e.includes(".")?"":".bin"}i.filename=u}return t.Qe>69&&n&&(i.headers=[{name:"Referer",value:n
}]),l.ye(l.n.downloads.download,i).then(()=>true)});let i=null;l.removeTempTab=(e,r,u)=>{var n
;if(!(null===(n=l.Te())||void 0===n?void 0:n.forgetClosedTab))return void l.Me.remove(e,l.le);let o,a=i;o=(async()=>{
await l.Me.remove(e).catch(t.r),await a;let n=await l.Te().getRecentlyClosed({maxResults:1}),s=n&&n[0]&&n[0].tab
;s&&s.url===u&&await l.Te().forgetClosedTab(r,s.sessionId).catch(t.r),i===o&&(i=null)})(),i=o},
l.w=e=>(e=e.slice(0,99).toLowerCase(),1!==t.We.get(e)&&(e.startsWith("about:")?"about:blank"!==e:e.startsWith(t.J.U))),
l.v=(e,t)=>{let r=l.n.permissions,u=Promise.all(e.map(e=>e&&l.ye(l.n.permissions.contains,e)))
;if(!r.onAdded)return void u.then(e=>{t(e,false)});let n=e.map(e=>e&&(e.permissions||e.origins)[0]);u.then(e=>{
let l=false,u=false,o=(o,s)=>{let f=!s;if(s){let l=s.permissions;for(let t of l||[]){let l=n.indexOf(t);l>=0&&(e[l]=o,
f=true)}for(let t of(!l||l.length<=0)&&s.origins||[]){let l=n.indexOf(t);l>=0&&(e[l]=o,f=true)}}
f&&(false===t(e,true)&&(l=u=false),l!==e.includes(false)&&r.onAdded[(l=!l)?"addListener":"removeListener"](i),
u!==e.includes(true)&&r.onRemoved[(u=!u)?"addListener":"removeListener"](a))},i=o.bind(null,true),a=o.bind(null,false)
;e.includes(false)||e.includes(true)?o(true):t(e,false)})},l.f=(e,t,r,u,n,o)=>{{let i=t>=0?{frameId:t}:{allFrames:true,
matchAboutBlank:true}
;i.runAt="document_start",u?i.code=`${(u+"").split("{")[1].split("(")[0].trim()}(${n?n.join(","):""})`:i.file=r[0],
l.Me.executeScript(e,i,o||l.le)}},l.s=e=>{let r=t.Ge.length-1;for(let u of t.J.Ue.slice(0,-1))l.f(e,-1,[u.slice(r)])},
l.import2=l=>new Promise((t,r)=>{e([l],t,r)}).then(e=>e),t.Xe<6&&(t.Ye=new Promise(e=>{
let t=l.n.runtime.onInstalled,r=l=>{let u=r;u&&(r=null,e(l),t.removeListener(u))};t.addListener(r),
setTimeout(r,6e3,null)}))});