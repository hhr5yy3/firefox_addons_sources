"use strict"
;__filename="background/all_commands.js",define(["require","exports","./utils","./store","./browser","./normalize_urls","./parse_urls","./settings","./ports","./ui_css","./i18n","./key_mappings","./run_commands","./run_keys","./clipboard","./open_urls","./frame_commands","./filter_tabs","./tab_commands","./tools"],(e,t,l,r,o,n,i,u,a,s,f,d,c,m,p,v,b,h,y,k)=>{
Object.defineProperty(t,"__esModule",{value:true
}),r.m=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,2,0,1,0,0,0,0,2,0,1,0,2,2,0,0,1,0,0,1,0,0,1,0,2,1,1,0,0,0,0,0,0],
r.b=[()=>{let e=r.y.for||r.y.wait,t=r.y.isError?0:1;if("ready"!==e){
if(e=e?Math.abs("count"===e||"number"===e?r.M:0|e):c.hasFallbackOptions(r.y)?Math.abs(r.M):0,e){e=Math.max(34,e)
;let t=r.y.block;t=null!=t?!!t:e>17&&e<=1e3,t&&r.g&&r.g.postMessage({N:14,t:e+50})}c.runNextCmdBy(r.M>0?t:1-t,r.y,e)
}else c.runNextOnTabLoaded({},null,()=>{c.runNextCmdBy(t,r.y,1)})},()=>{
let e=(r.y.$then||"")+"",t=(r.y.$else||"")+"",l=r.M
;if(!e&&!t)return void a.showHUD('"confirm" requires "$then" or "$else"')
;let o=r.y.question||r.y.ask||r.y.text||r.y.value,n=o?null:[e,t].map(e=>e.split("#",1)[0].split("+").slice(-1)[0]),i=Math.abs(0|(r.y.minRepeat||0)),u=[r.y.$f,r.y.$retry]
;(Math.abs(l)<i?Promise.resolve():c.x([n?n[0]===n[1]?e:n[0].replace(/^([$%][a-zA-Z]\+?)+(?=\S)/,""):[o+""]],l)).then(o=>{
(o?t:e)&&setTimeout(()=>{r.M=l,r.$(o?t:e,r.g,{c:u[0],r:u[1],u:0,w:0},o?1:l)},0)})},()=>{
let e=r.y.rel,t=!!r.y.absolute,o=e?(e+"").toLowerCase():"next",i=null!=r.y.isNext?!!r.y.isNext:!o.includes("prev")&&!o.includes("before"),u=p.O(r.y)
;p.doesNeedToSed(8192,u)||t?Promise.resolve(a.P(r.g&&a.I().T)).then(e=>{
let a=i?r.M:-r.M,s={},f=e&&r.j(e,8192,u),[d,m]=f?v.goToNextUrl(f,a,t):[false,e];if(d&&m){
let e=s.R?n.S(m.trim().split(l.C),s.R,3):m;r.M=a,null==r.y.reuse&&c.overrideOption("reuse",0),c.overrideCmdOptions({
url_f:e,goNext:false}),v.openUrl()}else t?c.runNextCmd(0):b.framesGoNext(i,o)}):b.framesGoNext(i,o)},()=>{var e,t
;let l=r.y.key,o=l&&"string"==typeof l?d.F(l).trim():""
;o=o.length>1||1===o.length&&!/[0-9a-z]/i.test(o)&&o===o.toUpperCase()&&o===o.toLowerCase()?o:""
;let n=null!==(t=null!==(e=r.y.hideHUD)&&void 0!==e?e:r.y.hideHud)&&void 0!==t?t:!o&&r.q.hideHud
;Promise.resolve(f.D("globalInsertMode",[o&&": "+(1===o.length?`" ${o} "`:`<${o}>`)])).then(e=>{
c.sendFgCmd(7,!n,Object.assign({h:n?null:e,k:o||null,i:!!r.y.insert,p:!!r.y.passExitKey,r:+!!r.y.reset,
bubbles:!!r.y.bubbles,u:!!r.y.unhover},c.parseFallbackOptions(r.y)||{})),n&&"force"!==n&&"always"!==n&&a.showHUD(e,1)})
},b.nextFrame,b.parentFrame,b.performFind,e=>{
let t=(r.y.key||"")+"",l="darkMode"===t?"d":"reduceMotion"===t?"m":u.z[t],o=l?r.A[l]:0,n=f.D("quoteA",[t]),i=r.y.value,s="boolean"==typeof i,d=null,m=""
;l?"boolean"==typeof o?s||(i=null):s||void 0===i?d=s?"notBool":"needVal":typeof i!=typeof o&&(m=JSON.stringify(o),
d="unlikeVal",m=m.length>10?m.slice(0,9)+"\u2026":m):d=t in u.K?"notFgOpt":"unknownA",Promise.resolve(n).then(t=>{
if(d)a.showHUD(f.D(d,[t,m]));else{if(i=u.V(l,i),"c"===l||"n"===l){let e=""
;for(let t of i.replace(/\s/g,""))e.includes(t)||(e+=t);i=e}let r=a.I(),o=r.a;for(let e of r.B){let r=e===o
;c.portSendFgCmd(e,8,r,{k:l,n:r?t:"",v:i},1)}e(1)}})},()=>{0!==r.g.s.E||262144&r.g.s.u?(new Promise((t,l)=>{
e([r.J.HelpDialogJS],t,l)}).then(e=>e),c.sendFgCmd(17,true,r.y)):b.initHelp({a:r.y},r.g)},()=>{
let e=c.copyCmdOptions(l.Q(),r.y);if(!e.esc){
let t=e.key,o=(e.type||(t?"keydown":""))+"",n=e.class,i=e.delay,{xy:u,direct:s,directOptions:f}=e
;if(n=n&&"$"===n[0]?n.slice(1):(n&&n[0].toUpperCase()+n.slice(1).replace(/event$/i,"")||(o.startsWith("mouse")||o.includes("click")?"Mouse":"Keyboard"))+"Event",
u=/^(Mouse|Pointer|Wheel)/.test(n)&&null==u?[.5,.5]:u,u=e.xy=l.W(u),u&&!u.n&&(u.n=r.M,r.M=1),e.click)o="click",
e.c=1;else if(r.M<0)for(let e of"down up;enter leave;start end;over out".split(";")){let[t,l]=e.split(" ")
;o=o.replace(t,l)}if(!o)return a.showHUD('Require a "type" parameter'),void c.runNextCmd(0)
;let d=e.init,m=d&&"object"==typeof d?d:e,p={};i=i&&+i>=0?Math.max(0|+i,1):null
;for(let t of["bubbles","cancelable","composed"]){let l=m!==e&&t in m?m[t]:e[t]
;p[t]=false!==l&&(null!=l||"mouseenter"!==o&&"mouseleave"!==o)}let v={e:1,c:1,t:1,class:1,type:1,key:1,return:1,delay:1,
esc:1,click:1,init:1,xy:1,match:1,direct:1,directOptions:1,clickable:1,exclude:1,evenIf:1,scroll:1,typeFilter:1,
textFilter:1,clickableOnHost:1,excludeOnHost:1,closedShadow:1,trust:1,trusted:1,isTrusted:1,superKey:1,target:1,
targetOptions:1}
;for(let[t,l]of Object.entries(m))t&&"$"!==t[0]&&!v.hasOwnProperty(t)&&(p[m===e&&t.startsWith("o.")?t.slice(2):t]=l,
m===e&&delete e[t]);e.superKey&&(r.Z?p.ctrlKey=true:p.metaKey=true,delete e.superKey);let b=null
;if(t&&("object"==typeof t||"string"==typeof t)){"string"==typeof t&&(b=/[^\w]/.exec(t.slice(1)))
;let e="object"==typeof t?t:b?t.split(b[0]):[t];if(e[0]&&(1==e.length||!e[1]||+e[1]>=0)){b&&!e[0]&&(e[0]=t[0],
e[1]||e.splice(1,1))
;let l=e[0],r=/^[a-z]$/i.test(l),n=!r&&l>="0"&&l<="9"&&1===l.length,i=l.toLowerCase(),u=e[1]&&0|+e[1]?0|+e[1]:r?i.charCodeAt(0)-("keypress"!==o||l!==i?32:0):n?l.charCodeAt(0)-0:"Space"===l?32:0
;p.key="Space"===l?" ":"Comma"===l?",":"Slash"===l?"/":"Minus"===l?"-":"$"===l[0]&&l.length>1?l.slice(1):l,
u&&null==m.keyCode&&(p.keyCode=u),
u&&null==m.which&&(p.which=u),(e.length>=3&&e[2]||null==m.code)&&(p.code=e[2]||(r?"Key"+l.toUpperCase():n?"Digit"+l:l))}
}e.type=o,e.class=n,e.init=p,e.delay=i,e.direct=s&&"string"==typeof s?s:"element,hover,scroll,focus",
f&&!f.search&&(f.search="doc"),e.directOptions=f||{search:"doc"},e.e=`Can't create "${n}#${o}"`,
e.t=o.startsWith("key")&&!!(e.trust||e.trusted||"force"===(e.isTrusted||m.isTrusted))}
c.portSendFgCmd(r.g,16,false,e,r.M)},()=>{b.showVomnibar()},b.G,b.enterVisualMode,e=>{
let t=r.y.id,l=null!=t&&t+""||r.y.folder||r.y.path,n=((r.y.position||"")+"").toLowerCase(),i=!!r.y.all
;if(!l||"string"!=typeof l)return a.showHUD('Need "folder" to refer a bookmark folder.'),void e(0)
;r.L(l,null!=t&&!!(t+"")).then(t=>{
if(!t)return e(0),void a.showHUD(false===t?'Need valid "folder".':"The bookmark folder is not found.")
;let l=null!=t.u,u=l?t.X:t.Y,s="begin"===n?0:"end"===n?-1:"before"===n?l?t.ee:0:l&&"after"===n?t.ee+1:-1
;(!i&&r.M*r.M<2?o.getCurTab:o.te)(function t(l){if(!l||!l.length)return e(0),o.le()
;let n=o.selectIndexFrom(l),f=l[n],[d,m]=i?[0,l.length]:h.getTabRange(n,l.length),p=r.y.filter,v=l;if(l=l.slice(d,m),
p&&!(l=h.re(f,l,p)).length)return void e(0);let b=l.length;if(b>20&&c.oe())c.x("addBookmark",b).then(t.bind(0,v));else{
s=s>=0?s:r.ie.ne.length;for(let e of l)o.n.bookmarks.create({parentId:u,title:e.title,url:o.getTabUrl(e),index:s++
},o.le);a.showHUD(`Added ${b} bookmark${b>1?"s":""}.`),e(1)}})})},e=>{false!==r.y.copied?(c.overrideCmdOptions({
copied:r.y.copied||true}),v.openUrl()):e(0)},b.captureTab,e=>{k.ae.ue(e(0))},e=>{let t=r.g?r.g.s.se:2===r.fe;k.ce.de(t),
a.showHUDEx(r.g,"fhCleared",0,[t?["incog"]:""]),e(1)},e=>{let t=r.g&&b.me(r.g,r.y.type,!!r.y.local)
;Promise.resolve(t).then(t=>{let l=r.y.local?r.y.all?k.ve.pe("#"):void a.be({H:21,U:0,c:2,f:c.parseFallbackOptions(r.y)
},true,1,t):k.ve.pe();"number"==typeof l&&e(l>0?1:0)})},y.copyWindowInfo,function e(t,l,n){let i,u=r.y.$pure
;if(null==u&&c.overrideOption("$pure",u=!Object.keys(r.y).some(e=>"opener"!==e&&"position"!==e&&"evenIncognito"!==e&&"$"!==e[0])),
u)if(!(i=t&&t.length>0?t[0]:null)&&r.he>=0&&!o.le()&&"dedup"!==n)o.ye(o.tabsGet,r.he).then(t=>{e(t&&[t],0,"dedup")
});else{let e=true===r.y.opener;o.openMultiTabs(i?{active:true,windowId:i.windowId,openerTabId:e?i.id:void 0,
index:v.newTabIndex(i,r.y.position,e,true)}:{active:true},r.M,r.y.evenIncognito,[null],true,i,e=>{
e&&o.selectWndIfNeed(e),c.getRunNextCmdBy(3)(e)})}else v.openUrl(t)},(e,t)=>{h.ke(true,1,function e(t,[l,n,i],u,s){
s&&([l,i]=h.getTabRange(n,t.length,0,1));let d=r.y.filter,m=t;t=t.slice(l,i)
;let p=o.selectFrom(t),v=(t=d?h.re(p,t,d):t).includes(p)?t.length-1:t.length;if(!v)return void u(0)
;if(v>20&&c.oe())return void c.x("discardTab",v).then(e.bind(null,m,[l,n,i],u))
;let b=t[h.getNearArrIndex(t,p.index+(r.M>0?1:-1),r.M>0)],y=[],k=!b.discarded
;k&&(v<2||false!==b.autoDiscardable)&&y.push(o.ye(o.Me.discard,b.id));for(let e of t)e===p||e===b||e.discarded||(k=true,
false!==e.autoDiscardable&&y.push(o.ye(o.Me.discard,e.id)));y.length?Promise.all(y).then(e=>{
let t=e.filter(e=>void 0!==e),l=t.length>0;a.showHUD(l?`Discarded ${t.length} tab(s).`:f.D("discardFail")),u(l)
}):(a.showHUD(k?f.D("discardFail"):"Discarded."),u(0))},e,t)},e=>{let t=r.g?r.g.s.d:r.he
;if(t<0)return a.complainLimits(f.D("dupTab")),void e(0);let l=false===r.y.active;o.ye(o.Me.duplicate,t).then(n=>{
n?(l&&o.selectTab(t,o.le),l?e(1):c.runNextOnTabLoaded(r.y,n),r.M<2||o.tabsGet(t,e=>{o.openMultiTabs({url:o.getTabUrl(e),
active:false,windowId:e.windowId,pinned:e.pinned,index:e.index+2,openerTabId:e.id},r.M-1,true,[null],true,e,null)
})):e(0)}),l&&o.selectTab(t,o.le)},e=>{e.length&&b.framesGoBack({s:r.M,o:r.y},null,e[0])},e=>{
let t=!!r.y.absolute,l=r.y.filter,n=b.ge(),i=i=>{let u=r.M,a=o.selectFrom(i),s=i.length
;if(l&&!(i=h.re(a,i,l)).length)return void e(0)
;let f=i.length,d=h.getNearArrIndex(i,a.index,u<0),m=t?u>0?Math.min(f,u)-1:Math.max(0,f+u):Math.abs(u)>2*s?u>0?f-1:0:d+u
;if(m=m>=0?m%f:f+(m%f||-f),i[0].pinned&&r.y.noPinned&&!a.pinned&&(u<0||t)){let l=1;for(;l<f&&i[l].pinned;)l++;if(f-=l,
f<1)return void e(0);t||Math.abs(u)>2*s?m=t?Math.max(l,m):m||l:(m=d-l+u,m=m>=0?m%f:f+(m%f||-f),m+=l)}
let p=i[m],v=!p.active;v?o.selectTab(p.id,n?b.blurInsertOnTabChange:c.getRunNextCmdBy(1)):e(v)},u=t=>{
let r=true===h.we(l,"hidden");h.ke(true,1,i,t||[],e,r||null)};t?1!==r.M||l?u():o.ye(o.Me.query,{windowId:r.xe,index:0
}).then(e=>{e&&e[0]&&o.$e(e[0])?i(e):u()}):1===Math.abs(r.M)?o.ye(o.getCurTab).then(u):u()},()=>{var e
;"frame"!==r.y.type&&r.g&&r.g.s.E&&(r.g=(null===(e=a.I())||void 0===e?void 0:e.T)||r.g);let t={H:5,U:0,p:r.M,
t:r.y.trailingSlash,r:r.y.trailing_slash,s:p.O(r.y),e:false!==r.y.reloadOnRoot},l=a.be(t)
;Promise.resolve(l||"").then(()=>{"object"==typeof t.e&&c.getRunNextCmdBy(2)(null!=t.e.p||void 0)})
},y.joinTabs,b.mainFrame,(e,t)=>{let l=o.selectIndexFrom(e)
;if(e.length>0&&(r.M<0?0===(r.M<-1?l:e[l].index):r.M>1&&l===e.length-1))return void t(0)
;let n=r.y.group,i="ignore"!==n&&false!==n;h.ke(true,1,l=>{
let n=o.selectIndexFrom(l),u=l[n],a=u.pinned,s=Math.max(0,Math.min(l.length-1,n+r.M))
;for(;a!==l[s].pinned;)s-=r.M>0?1:-1;if(s!==n&&i){let e=o.getGroupId(u),t=o.getGroupId(l[s])
;if(t!==e&&(1===Math.abs(r.M)||e!==o.getGroupId(l[r.M>0?s<l.length-1?s+1:s:s&&s-1]))){
for(null!==e&&(n>0&&o.getGroupId(l[n-1])===e||n+1<l.length&&o.getGroupId(l[n+1])===e)&&(s=n,t=e);s+=r.M>0?1:-1,
0<=s&&s<l.length&&o.getGroupId(l[s])===t;);s-=r.M>0?1:-1}}s===n&&u.active?t(0):o.Me.move((u.active?u:e[0]).id,{
index:l[s].index},o.Oe(t))},e,t,i?t=>o.getGroupId(e[0])===o.getGroupId(t):null)
},y.moveTabToNewWindow,y.moveTabToNextWindow,()=>{v.openUrl()},(e,t)=>{h.ke(!r.y.single,0,y.reloadTab,e,t)},(e,t)=>{
h.ke(false,1,(e,[t],l)=>{o.Me.remove(e[t].id,o.Oe(l))},e,t)},y.removeTab,e=>{function t(l){let u=l
;if(!u||0===u.length)return o.le()
;let a=i?u.findIndex(e=>e.id===r.he):-1,s=a>=0?a:o.selectIndexFrom(u),f=r.y.noPinned,d=r.y.filter,m=u[s];n>0?(++s,
u=u.slice(s,s+n)):(f=null!=f?f&&u[0].pinned:s>0&&u[0].pinned&&!u[s-1].pinned,
n<0?u=u.slice(Math.max(s+n,0),s):(u=u.slice(0)).splice(s,1)),f&&(u=u.filter(e=>!e.pinned)),d&&(u=h.re(m,u,d))
;let p=r.y.mayConfirm
;p&&u.length>("number"==typeof p?Math.max(p,5):20)&&c.oe()?c.x("closeSomeOtherTabs",u.length).then(t.bind(null,l)):u.length>0?(n<0&&(u=u.reverse()),
o.Me.remove(u.map(e=>e.id),o.Oe(e))):e(0)}let l=r.y.others,n=(null!=l?l:r.y.other)?0:r.M,i=0===n&&r.y.acrossWindows
;i?o.Me.query({},t):h._e(n,t)},(e,t)=>{e.length<=0?t(0):y.Pe(e[0],void 0,void 0,false!==r.y.group)},e=>{let t=o.Te()
;if(!t)return e(0),a.complainNoSession();let l=!!r.y.one,n=+t.MAX_SESSION_RESULTS||25,i=Math.abs(r.M);if(i>n){
if(l)return e(0),void a.showHUD(f.D("indexOOR"));i=n}if(!l&&i<2&&(r.g?r.g.s.se:2===r.fe)&&!r.y.incognito)return e(0),
a.showHUD(f.D("notRestoreIfIncog"));let u=false!==r.y.active,s=true===r.y.currentWindow,d=r.g?r.g.s.d:r.he,m=r.xe,p=t=>{
void 0!==t?y.Ie(m,t,u?null:d).then(t=>{u&&t?c.runNextOnTabLoaded(r.y,t):e(1)}):e(0)};(async()=>{
let r,c=Math.max(1.2*i|0,2),v=false,b=s?e=>!!e.tab&&e.tab.windowId>0&&e.tab.windowId===m:null
;if(s&&i<=Math.min(n,25)&&(r=await o.je(t.getRecentlyClosed,{maxResults:i}),v=r.length>i,r=b?r.filter(b):r,
!v&&r.length<i&&c<=Math.min(n,25)&&(r=await o.je(t.getRecentlyClosed,{maxResults:c}),r=b?r.filter(b):r)),
(!r||!v&&r.length<i)&&(r=await o.je(t.getRecentlyClosed,i<=25&&!s?{maxResults:i}:{}),r=b?r.filter(b):r),
r.length<(l?i:1))return e(0),a.showHUD(f.D("indexOOR"))
;1===i?o.ye(t.restore,s?r[0].tab.sessionId:null).then(p):Promise.all(r.slice(l?i-1:0,i).map(e=>o.ye(t.restore,(e.tab||e.window).sessionId))).then(e=>{
p(l?e[0]:null)}),u||o.selectTab(d,o.le)})()},()=>{null==r.y.$seq?m.runKeyWithCond():m.runKeyInSeq(r.y.$seq,r.M,null)
},e=>{let t=(r.y.keyword||"")+"",l=i.Ne({u:o.getTabUrl(e[0])})
;if(!l||!t)return void(c.runNextCmd(0)||a.showHUD(f.D(t?"noQueryFound":"noKw")));let u={},s=p.O(r.y);l.u=r.j(l.u,0,s,u),
null!=u.R&&(t=u.R);let d=n.S(l.u.split(" "),t,2),m=r.y.reuse;c.overrideCmdOptions({url_f:d,reuse:null!=m?m:0,
opener:true,keyword:""}),v.openUrl(e)},e=>{let t=r.y.id,l=r.y.data
;if(!(t&&"string"==typeof t&&void 0!==l))return a.showHUD('Require a string "id" and message "data"'),void e(0)
;let n=Date.now(),i=l=>{l=l&&l.message||l+"",console.log("Can not send message to the extension %o:",t,l),
a.showHUD("Error: "+l),e(0)};try{o.n.runtime.sendMessage(t,r.y.raw?l:{handler:"message",from:"Vimium C",count:r.M,
keyCode:r.Re,data:l},t=>{let l=o.le();return l?i(l):"string"==typeof t&&Math.abs(Date.now()-n)<1e3&&a.showHUD(t),
l||e(false!==t),l})}catch(e){i(e)}},e=>{let t=r.y.text,l="number"==typeof t,o=!!r.y.silent,n=r.y.isError
;if(!t&&!l&&!o&&null==n&&r.y.$f){let l=r.y.$f;if(t=l&&l.t?f.Se(`${l.t}`):"",!t)return void e(false)}
o||a.showHUD(t||l?t instanceof Promise?t:t+"":f.D("needText")),e(null!=n?!!n:!!t||l)},(e,t)=>{k.ae.ue(t(0))
},y.toggleMuteTab,(e,t)=>{h.ke(true,0,y.togglePinTab,e,t)},y.toggleTabUrl,(e,t)=>{
let l=e[0].id,o=((r.y.style||"")+"").trim(),n=!!r.y.current;if(!o)return a.showHUD(f.D("noStyleName")),void t(0)
;for(let e of r.Ce)if(e.s.d===l)return e.postMessage({N:46,t:o,c:n}),void setTimeout(t,100,1);n||s.Fe({t:o,o:1}),
setTimeout(t,100,1)},b.toggleZoom,e=>{
let t=!!r.y.acrossWindows,l=!!r.y.onlyActive,n=r.y.filter,i=h.we(n,"hidden"),u=b.ge(),s=true!==i?{hidden:false
}:{},f=t=>{if(t.length<2)return l&&a.showHUD("Only found one browser window"),e(0),o.le()
;let i=r.g?r.g.s.d:r.he,s=t.findIndex(e=>e.id===i),f=s>=0?t[s]:null;if(s>=0&&t.splice(s,1),
n&&!(t=h.re(f,t,n)).length)return void e(0)
;let c=t.filter(e=>r.qe.has(e.id)).sort(k.ze.De),m=(t=l&&0===c.length?t.sort((e,t)=>t.id-e.id):c)[r.M>0?Math.min(r.M,t.length)-1:Math.max(0,t.length+r.M)]
;m?l?o.Ae.update(m.windowId,{focused:true},u?()=>b.blurInsertOnTabChange(m):o.Oe(e)):d(m.id):e(0)},d=t=>{
o.selectTab(t,t=>(t&&o.selectWndIfNeed(t),u?b.blurInsertOnTabChange(t):o.Oe(e)()))};if(1===r.M&&!l&&-1!==r.he){
let e=h.He();if(e>=0)return void Promise.all([o.ye(o.tabsGet,e),h.getNecessaryCurTabInfo(n)]).then(([e,l])=>{
e&&(t||e.windowId===r.xe)&&(true!==i?o.$e(e):null==h.we(n,"hidden",1)||!o.$e(e))&&(!n||h.re(l,[e],n).length>0)?d(e.id):t?o.Me.query(s,f):o.te(f)
})}t||l?o.Me.query(l?{active:true}:s,f):o.te(f)},e=>{r.b[29](e)},()=>{let e=a.I(),t=!!r.y.unhover,l=r.y.suppress
;for(let l of e?e.B:[]){let o={r:1,u:t};if(l===e.a){let e=c.parseFallbackOptions(r.y);e&&Object.assign(o,e)}
c.portSendFgCmd(l,7,false,o,1)}(c.hasFallbackOptions(r.y)?true===l:false!==l)&&e&&e.a.postMessage({N:14,t:150})},e=>{
let t,l=r.y.$cache;if(null!=l){let e=r.ie.Ke===l[1]?l[0]:"",o=e&&(r.ie.ne.find(t=>t.Y===e)||r.ie.Ve.find(t=>t.Y===e))
;o?t=Promise.resolve(o):c.overrideOption("$cache",null)}let o=!!t,n=r.M,i=false;if(!t){
let l=r.y.id,o=r.y.path,u=null!=l&&l+""||o||r.y.title
;if(!u||"string"!=typeof u)return a.showHUD("Invalid bookmark "+(null!=l?"id":o?"path":"title")),void e(0)
;let s=c.fillOptionWithMask(u,r.y.mask,"name",["path","title","mask","name","value"],n)
;if(!s.ok)return void a.showHUD((s.result?"Too many potential names":"No name")+" to find bookmarks");i=s.useCount,
t=r.L(s.result,null!=l&&!!(l+""))}t.then(t=>{if(t){o||i||c.overrideOption("$cache",[t.Y,r.ie.Ke]);let e=null!=t.u
;c.overrideCmdOptions(e?{url:t.Be||t.u}:{urls:r.ie.ne.filter(e=>e.X===t.Y).map(e=>e.Be||e.u)},true),r.M=i||!e?1:n,
v.openUrl()}else e(0),a.showHUD(false===t?'Need valid "title" or "title".':"The bookmark node is not found.")})
},y.toggleWindow]});