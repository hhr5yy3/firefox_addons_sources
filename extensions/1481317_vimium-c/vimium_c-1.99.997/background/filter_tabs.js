"use strict"
;__filename="background/filter_tabs.js",define(["require","exports","./store","./utils","./browser","./ports","./exclusions","./run_commands"],(e,l,t,r,u,n,a,i)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.eu=l.lu=l.re=l.we=l.mayRequireActiveTab=l.getNecessaryCurTabInfo=l._e=l.getNearArrIndex=l.tu=l.He=l.ke=l.getTabRange=void 0,
l.getTabRange=(e,l,r,u)=>s(e,l,r,t.M,u,t.y.limited,t.y.filter);let s=(e,l,t,r,u,n,a)=>{let i=r>0;u&&(r+=i?u:-u)
;let s=e+r
;return s<=l&&s>-2?i?[e,s]:[s+1,e+1]:false===n||(null==n||"auto"===n)&&(Math.abs(r)<2*(t||l)||r<10||a&&null==n)?Math.abs(r)<l?i?[l-r,l]:[0,-r]:[0,l]:i?[e,l]:[0,e+1]
};l.ke=(e,r,n,a,s,d)=>{let o=a=>{if(!a||!a.length)return s(0),u.le()
;let d=u.selectIndexFrom(a),[o,c]=f?[0,a.length]:l.getTabRange(d,a.length,0,r);f&&(i.overrideCmdOptions({limited:false
},true),i.overrideOption("$limit",t.M),t.M=t.M>0?9999:-9999),n(a,e?[o,d,c]:[d+1===c||t.M>0&&o!==d?o:c-1,d,c],s)
},c=t.y.filter,f=c&&/(^|[&+])limit(ed)?=count\b/.test(c+"")
;if(a)if(0===a.length||Math.abs(t.M)>1||f)if(0===a.length||f||true===d){let e=a[0]?a[0].windowId:t.xe
;e>=0?u.Me.query(true===d?{windowId:e}:{windowId:e,hidden:false},o):(e>=0?u.ye(u.Ae.get,e,{populate:true
}):u.ye(u.getCurWnd,true)).then(e=>{o(e?true!==d?e.tabs.filter(u.$e):e.tabs:[])})
}else o(a);else r?a[0].index+t.M<0?u.te(o):u.Me.query({windowId:a[0].windowId,index:a[0].index+t.M
},r=>(r&&r.length&&(true===d||u.$e(r[0])&&(!d||d(r[0])))&&(!c||l.re(a[0],r,c).length>0)?t.M<0?n([r[0],a[0]],[0,1,e?2:1],s):n([a[0],r[0]],[e?0:1,0,2],s):u.te(o),
u.le())):n(a,[0,0,1],s);else s(0)},l.He=()=>{let e=0,l=-1;return t.qe.forEach((r,u)=>{r>e&&u!==t.he&&(e=r,l=u)}),l},
l.tu=(e,t,r)=>{let n
;return e&&(e.index||t)?r&&r[n=Math.max(r.indexOf(e),0)+(t?1:-1)]&&u.$e(r[n])?Promise.resolve(r[n]):u.ye(u.Me.query,{
windowId:e.windowId,index:e.index+(t?1:-1)
}).then(n=>n&&n[0]?u.$e(n[0])?n[0]:(r&&r.length>2?Promise.resolve(r.filter(u.$e)):u.ye(u.te)).then(r=>r&&r.length?r[l.getNearArrIndex(r,e.index+(t?1:-1),t)]:null):null):Promise.resolve(null)
},l.getNearArrIndex=(e,l,t)=>{
for(let r=e.length>1?0:1;r<e.length;r++)if(e[r].index>=l)return e[r].index===l||t?r:r>0?r-1:0;return e.length-1},
l._e=(e,l)=>{1===Math.abs(e)?u.getCurTab(t=>{let r=t[0].index+e;r>=0?u.Me.query({windowId:t[0].windowId,index:r
},r=>(r&&r[0]?l(e>0?[t[0],r[0]]:[r[0],t[0]]):u.getCurTabs(l),u.le())):u.getCurTabs(l)}):u.getCurTabs(l)},
l.getNecessaryCurTabInfo=e=>{if(!e)return null;let t=l.mayRequireActiveTab(e)
;return t>2?u.ye(u.getCurTab).then(e=>e&&e[0]||null):t?Promise.resolve(n.P(null,t>1)).then(e=>e?{url:e}:null):null},
l.mayRequireActiveTab=e=>{let l=0;for(let t of(e+"").split(/[&+]/)){
let e=t.split("=",1)[0],r=e.includes(".")?"":e||t,u=t.slice(r?r.length+1:0)
;if(r&&"same"===u&&"hidden"!==r&&!r.startsWith("discard"))return 3;if(!u&&r){
if(r.startsWith("title")||"group"===r)return 3;l="hash"===r?2:l||("host"===r||"url"===r?1:0)}}return l}
;let d=(e,l)=>""===(e=e&&e.toLowerCase())||"1"===e||"true"===e?!l||null:"only"===e||"0"!==e&&"false"!==e&&null
;l.we=(e,l,t)=>{let r=e?(e+"").split(/[&+]/).find(e=>e.startsWith(l)):null,u=r?r.slice(1+l.length):null
;return null!==u?d(u,t):null};let o=(e,l)=>{
let t=e&&"/"===e[0]?e.lastIndexOf("/"):0,u=t>1&&/^[a-z]+$/.test(e.slice(t+1))?r.pl(e.slice(1,t),e.slice(t+1).replace(/g/g,""),0):null
;return u?e=>u.test(e||""):l?e=>(e||"").includes(l):null};l.re=(e,l,i,c)=>{var f;let h=0,m=0,b=0,w=[]
;for(let l of(i+"").split(/[&+]/)){
let n=l.split("=",1)[0],i=n.includes("."),s=!i&&n.endsWith("!"),c=i?"":(s?n.slice(0,-1):n)||l,k=l.slice(i?0:n.length+("="===l.charAt(n.length+1)?2:1)),v=k&&r.Le(k),p="same"===v||"cur"===v||"current"===v,g=null
;switch(c){case"title":case"title*":let l=o(v,v||e&&e.title);g=l?e=>l(e.title):null;break;case"url":case"urlhash":
case"url+hash":case"url-hash":case"hash":let n=null;if("url"===c&&v)n=a.zl(v);else{
let l=e?u.getTabUrl(e):null,t=c.includes("hash");n=l?a.zl(":"+(t?l:l.split("#",1)[0])):null}
g=n?e=>a.kl(n,u.getTabUrl(e)):g;break;case"title+url":let i=v&&o(v,v);g=i?e=>i(e.title)||i(u.getTabUrl(e)):g;break
;case"host":case"":let s=v||(c&&e?null===(f=r.ru(u.getTabUrl(e)))||void 0===f?void 0:f.host:"");g=s?e=>{var l
;return s===(null===(l=r.ru(u.getTabUrl(e)))||void 0===l?void 0:l.host)}:g;break;case"active":let w=d(v,1)
;g=null!=w?e=>e.active===w:g;break;case"new":case"old":case"visited":let k=d(v)===("new"!==c);g=e=>t.qe.has(e.id)===k
;case"discarded":case"discard":let x=!p&&d(v,1);g=null!=x?e=>e.discarded===x:g;break;case"group":
let I=v||(e?null!=u.getGroupId(e)?u.getGroupId(e)+"":"":null);g=null!=I?e=>{var l
;return(null!==(l=u.getGroupId(e))&&void 0!==l?l:"")+""===I}:g;break;case"hidden":let M=!p&&d(v,1)
;g=null!=M?e=>u.$e(e)!==M:g;break;case"highlight":case"highlighted":let _=p?e?e.highlighted:null:d(v)
;g=null!=_?e=>e.highlighted===_:g;break;case"incognito":let P=p?e?e.incognito:null:d(v);g=null!=P?e=>e.incognito===P:g
;break;case"pinned":let $=p?e?e.pinned:null:d(v,1);g=null!=$?e=>e.pinned===$:g;break;case"mute":case"muted":{
let l=p?e?u.isTabMuted(e):null:d(v);g=null!=l?e=>u.isTabMuted(e)===l:g}break;case"audible":case"audio":{
let l=p?e?e.audible:null:d(v);g=null!=l?e=>e.audible===l:g}break;case"min":case"max":case"limit":case"limited":
let y="count"===v?t.y.$limit||t.M:parseInt(v)||0;"min"===c?m=y:"max"===c?b=y:h=y||1,g=()=>true}g&&w.push([g,s])}
if(c&&(c.known=w.length>0),0===w.length)return l.slice(0);let k=l,v=l.filter(e=>{
for(let l of w)if(l[0](e)===l[1])return false;return true}),p=v.length
;if(!p||m>0&&p<m||b>0&&p>b)return t.y&&t.y.$else||n.showHUD(p?`${p} tabs found but expect ${p<m?m:b}`:"No tabs matched the filter parameter"),
[];if(h){let l=e?k.indexOf(e):-1;if(l<0){let r=e?e.id:t.he;l=k.findIndex(e=>e.id===r)}if(l>=0){
let e=v.findIndex(e=>k.indexOf(e)>=l),r=e>=0&&k.indexOf(v[e])>l;r&&v.splice(e,0,null)
;let u=s(e>=0?e:p-1,p,0,t.M>0?h:-h,r?1:0,false);v=v.slice(u[0],u[1]),r&&(v=v.filter(e=>!!e))
}else v=h>0?v.slice(0,h):v.slice(-h)}return v},l.lu=(e,l)=>{let r,n=(e,l)=>{e.ind=l
},a=(e,l)=>e<l?-1:e>l?1:0,i=e.map((e,l)=>({tab:e,ind:l,time:null,rhost:null,group:u.getGroupId(e),pinned:e.pinned
})),s=-1,d=false,o=0
;for(let e of(l instanceof Array?l.slice(0):(true===l?"time":l+"").split(/[, ]+/g)).reverse())r="r"===e[0]&&"e"!==e[1]||"-"===e[0]?(e=e.slice(1),
-1):1,e.includes("time")&&!e.includes("creat")||e.includes("recen")?(null==i[0].time&&i.forEach(e=>{
let l=e.tab.id,r=t.qe.get(l);e.time=l===t.he?1:null!=r?r:(o||(o=performance.timeOrigin),(e.tab.lastAccessed||o)-o||l+2)
}),s=1):e.startsWith("host")||"url"===e?(i[0].rhost||i.forEach(e=>{
let l=e.tab.url,t=l.indexOf("://")+3,r=t>3?l.indexOf("/",t):0;if(r<t)return void(e.rhost=l)
;let u=l.slice(t,r),n=u.lastIndexOf(":"),a=n>0&&u.lastIndexOf(":",n-1)>0
;e.rhost=a?u:u.slice(0,n>0?n:u.length).split(".").reverse().join(".")+(n>0?" "+u.slice(1):"")}),
s="url"===e?3:2):s="title"===e?4:e.includes("creat")||"id"===e?5:"window"===e?6:"index"===e?7:"reverse"===e?(r=-1,7):-1,
s<0||(i.sort((e,l)=>(1===s?e.time-l.time:s<4?a(e.rhost,l.rhost)||(3===s?a(e.tab.url,l.tab.url):0):4===s?a(e.tab.title,l.tab.title):5===s?e.tab.id-l.tab.id:6===s?e.tab.windowId-l.tab.windowId:e.ind-l.ind)*r||e.ind-l.ind),
i.forEach(n),d=true)
;return d&&i.some(e=>null!=e.group)&&i.sort((e,l)=>null==e.group?null==l.group?e.ind-l.ind:1:null==l.group||e.group<l.group?-1:e.group>l.group?1:e.ind-l.ind),
d&&(i.forEach(n),i.sort((e,l)=>e.pinned!==l.pinned?e.pinned?-1:1:e.ind-l.ind)),d?i.map(e=>e.tab):e},
l.eu=async(e,l,r,n,a)=>{let i=l=>(!e||l.type===e)&&(null==r||l.incognito===r)&&(a||"minimized"!==l.state);if(t.uu>=0){
let e=await u.ye(u.Ae.get,t.uu);if(e&&i(e))return e;t.uu=-1}let s=[];{let e=(await u.ye(u.getCurTabs)||[]).map(e=>e.id)
;e.push(t.he),t.qe.forEach((l,t)=>{e.includes(t)||s.push([t,l])}),s.sort((e,l)=>l[1]-e[1])}if(s.length>0){
let e=await u.je(u.Me.get,s[0][0]);if(!e){let l=s.find(e=>t.ss.has(e[0]));e=l&&await u.je(u.Me.get,l[0])}
let l=e&&await u.je(u.Ae.get,e.windowId);if(l&&i(l))return l}
let d=await u.je(u.Ae.getAll),o=d.filter(i),c=o.filter(e=>e.id!==n);return c.sort((e,l)=>l.id-e.id),
(c.length>0?c[0]:null)||(l?d.find(e=>e.id===n)||d.find(e=>e.focused)||null:[o,d.find(e=>e.id===n)])}});