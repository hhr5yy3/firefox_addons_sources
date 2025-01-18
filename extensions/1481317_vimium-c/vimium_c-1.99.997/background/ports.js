"use strict"
;__filename="background/ports.js",define(["require","exports","./store","./utils","./browser","./exclusions","./i18n"],(e,l,t,r,n,u,o)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.ji=l.An=l.tryToKeepAliveIfNeeded_mv3_non_ff=l.getParentFrame=l.complainNoSession=l.complainLimits=l.p=l.ensuredExitAllGrab=l.showHUDEx=l.showHUD=l.safePost=l.isNotVomnibarPage=l.ensureInnerCSS=l.indexFrame=l.ri=l.I=l.isExtIdAllowed=l.findCPort=l.be=l.P=l.OnFreeze=l.OnConnect=l.sendResponse=void 0
;let f=(e,l)=>{if(90!==e.H)t.cn[e.H](e,l);else{let r=t.cn[e.c](e.a,l,e.i);r!==l&&l.postMessage({N:4,m:e.i,r})}}
;l.sendResponse=(e,t,r)=>{let n=l.ri(e);if(n&&n.B.includes(e))try{e.postMessage({N:4,m:t,r})}catch(e){}},
l.OnConnect=(e,l)=>{if(128&l)return void c(e,l)
;let r=e.sender.documentLifecycle,o=!!r&&"active"!==r,a=d(e),_=a.Fl,p=_===t.vomnibarPage_f;if(l>7||p){
if(999===l)return void(a.d>=0&&!a.E&&n.removeTempTab(a.d,e.sender.tab.windowId,a.Fl))
;if(256&l||p)return void s(e,l,p||_===t.J.ci);if(o)return void e.disconnect()}
let m,N,g,k=a.d,I=k>=0?t.ss.get(k):void(k=a.d=t.getNextFakeTabId()),h=1!=(9&l)&&33!=(33&l)&&void 0!==I
;if(h&&null!==I.ts?(N=I.ts.as,m=I.ts.c,g=2===m?3:1):(N=!u.rs||8&l?null:u.ls(_,a),m=null===N?0:N?1:2,g=0),a.c=m,
64&l&&(a.u=g|=64),h&&(g|=4&I.u,1024&l&&(g|=128,I.u|=128),a.u=g),8&l)4096&l&&e.postMessage({N:1,p:1&g?N:u.ls(_,a),f:3&g
}),b(I,e,l);else if(e.postMessage(4&l?{N:0,c:null,d:o,f:g,p:N}:{N:0,c:t.A,d:o,f:g,k:t.mn,m:t.ya,p:N,t:t.ha}),
o)return void e.disconnect();e.sender.tab=null,e.onDisconnect.addListener(i),e.onMessage.addListener(f);let y=0===a.E
;h?(2&l?(t.t&&I.a.s.c!==m&&t.o(k,m),I.a=e):512&I.a.s.u&&(I.a=e),y&&(I.T=e),I.B.push(e)):(t.ss.set(k,{a:e,T:y?e:null,
B:[e],ts:null,u:0}),0!==m&&t.t&&t.o(k,m),void 0!==I&&v(I.B))};let i=e=>{let l,{d:r}=e.s,u=t.ss.get(r)
;if(!u)return n.le();let o=u.B;if(l=o.lastIndexOf(e),e.s.E)return l===o.length-1?--o.length:l>=0&&o.splice(l,1),
o.length?e===u.a&&(u.a=o[0]):512&u.u||t.ss.delete(r),n.le();l>=0&&t.ss.delete(r)},s=(e,l,u)=>{if(256&l){
if(u)return e.s.d<0&&(e.s.d=8&l?t.getNextFakeTabId():t.g?t.g.s.d:t.he),e.s.u|=256,t.Ce.push(e),e.sender.tab=null,
e.onDisconnect.addListener(a),e.onMessage.addListener(f),void(8&l||e.postMessage({N:42,l:t.Nr,s:r.gi(false)}))
}else e.s.d<0||0===e.s.E||n.f(e.s.d,e.s.E,[t.J.Hn]);e.disconnect()},a=e=>{let l=t.Ce,r=l.lastIndexOf(e)
;return r===l.length-1?--l.length:r>=0&&l.splice(r,1),n.le()},c=(e,l)=>{if(1024&l)e.disconnect();else if(e.s=false,
2048&l){let l=t.li(null,null);if(l&&l.t){l.d=null,e.postMessage({N:49,t:l.t,s:l.s});let t=e=>{l&&(clearTimeout(l.i),
l.r&&l.r(e)),l=null};e.onMessage.addListener(t),e.onDisconnect.addListener(()=>{t(false)})}else e.disconnect()
}else e.onMessage.addListener(f)},d=e=>{let l=e.sender,t=l.tab;return e.s={E:l.frameId||0,u:0,c:0,
se:null!=t&&t.incognito,d:null!=t?t.id:-3,Fl:l.url}},v=e=>{for(let l of e)l.s.E&&_(l)},_=e=>{try{e.s.u|=512,
e.onDisconnect.removeListener(i),e.postMessage({N:15})}catch(l){return e.disconnect(),1}};l.OnFreeze=(e,l)=>{
l.onDisconnect.removeListener(i),l.s.E||(l.s.E=2),i(l)},l.P=(e,o,f,i)=>{var s
;return(e=e||(null===(s=t.ss.get(t.he))||void 0===s?void 0:s.T)||null)&&!f&&u.rs&&(o||u.on)?e.s.Fl:new Promise(t=>{
let u=e&&e.s.E&&r.isNotPriviledged(e)?n.H():null;e?(e.s.E?u?u.getFrame:(e,l)=>l(null):n.tabsGet)(u?{tabId:e.s.d,
frameId:e.s.E}:e.s.d,r=>{let u=r?r.url:"";return!u&&i&&(i.N=3,l.safePost(e,i)),t(u),n.le()
}):n.getCurTab(e=>(t(e&&e.length?n.getTabUrl(e[0]):""),n.le()))})},l.be=(e,r,n,u)=>{var o
;u||(t.g=u=t.g||(null===(o=t.ss.get(t.he))||void 0===o?void 0:o.T));let f=l.P(u,r,n,e)
;if("string"!=typeof f)return f.then(l=>(e.u=l,l&&t.cn[e.H](e,u),l));e.u=f,t.cn[e.H](e,u)},l.findCPort=e=>{
let l=t.ss.get(e&&e.s.d>=0?e.s.d:t.he);return l?l.a:null},l.isExtIdAllowed=e=>{
let l=null!=e.id?e.id:"unknown_sender",r=e.url,n=e.tab,u=t.qn,o=u.get(l);if(true!==o&&n){
let e=t.ss.get(n.id),r=e?e.zn:null;e&&(null==r||r!==l&&"string"==typeof r)&&(e.zn=null==r?l:2)}if(null!=o)return o
;if(r===t.vomnibarPage_f)return true;if(null==o&&r){if(r=new URL(r).host,true===u.get(r))return u.set(l,true),true
;r!==l&&u.set(r,l)}
return console.log("%cReceive message from an extension/sender not in the allow list: %c%s","background-color:#fffbe5","background-color:#fffbe5;color:red",l),
u.set(l,false),false},l.I=()=>t.ss.get(t.g?t.g.s.d:t.he),l.ri=e=>t.ss.get(e.s.d),l.indexFrame=(e,l)=>{let r=t.ss.get(e)
;for(let e of r?r.B:[])if(e.s.E===l)return e;return null},l.ensureInnerCSS=e=>{if(8&e.u)return null;let l=t.ss.get(e.d)
;return l&&(l.u|=4),e.u|=12,t.Rn},l.isNotVomnibarPage=(e,l)=>{let t=e.s,r=t.u
;return!(256&r)&&(l||2048&r||(console.warn("Receive a request from %can unsafe source page%c (should be vomnibar) :\n %s @ tab %o","color:red","color:auto",t.Fl.slice(0,128),t.d),
t.u|=2048),true)},l.safePost=(e,l)=>{try{let t=512&e.s.u;return t||e.postMessage(l),t?0:1}catch(e){return 0}}
;let p=(e,t)=>{l.showHUD(t+"",e)};l.showHUD=(e,r)=>{if("string"!=typeof e)return void e.then(p.bind(null,r))
;let n=14===r||15===r;n&&(e.startsWith(t.J.U+"-")&&e.includes("://")&&(e=e.slice(e.indexOf("/",e.indexOf("/")+2)+1)||e),
e=e.length>41?e.slice(0,41)+"\u2026":e&&e+(t.Vn?"\u3002":".")),t.g&&!l.safePost(t.g,{N:11,H:l.ensureInnerCSS(t.g.s),
k:n&&e?20:r||1,t:e})&&(t.g=null)},l.showHUDEx=(e,t,r,n,u)=>{if(!e)return;let f=u||o._n(t,n)
;"string"==typeof f?l.safePost(e,{N:11,H:l.ensureInnerCSS(e.s),k:1,d:r,t:f}):f.then(l.showHUDEx.bind(null,e,"NS",r,[]))
},l.ensuredExitAllGrab=e=>{let l={N:8};for(let t of e.B)4&t.s.u||(t.s.u|=4,t.postMessage(l));e.u|=4},l.p=(e,l,n)=>{
let u=r.Yr(t.ss),o=t.he,f=r=>{let n=t.ss.get(r),u=0;return void 0!==n&&(512&n.u&&e&&(n.u|=e),u=Math.min(n.B.length,8),
l(n)),u};if(u.length>=10){let e=u.indexOf(o);e>=0&&(u.splice(e,1),f(o)),r.Bn(u,f,n)}else u.forEach(f)},
l.complainLimits=e=>{l.showHUDEx(t.g,"notAllowA",0,[e])},l.complainNoSession=()=>{
l.complainLimits("control tab sessions")},l.getParentFrame=(e,t,r)=>t&&n.H()?1===r&&true?n.ye(n.H().getFrame,{tabId:e,
frameId:t}).then(t=>{let r=t?t.parentFrameId:0;return r>0?l.indexFrame(e,r):null}):n.ye(n.H().getAllFrames,{tabId:e
}).then(n=>{let u=false,o=t;if(!n)return null;do{u=false;for(let e of n)if(e.frameId===o){o=e.parentFrameId,u=o>0;break}
}while(u&&0<--r);return o>0&&o!==t?l.indexFrame(e,o):null}):Promise.resolve(null),
l.tryToKeepAliveIfNeeded_mv3_non_ff=()=>{},l.An=(e,l)=>{
(131072&e.u||r.isNotPriviledged(e.a))&&(n.f(e.a.s.d,-1,null,(e,l)=>{"object"==typeof VApi&&VApi&&VApi.q(0,l)
},[0,512|(l?8:0)|126976&e.u]),e.u&=-258561)};let b=(e,r,n)=>{r.s.u|=16&n&&8,e||l.An({a:r,T:null,B:[],ts:null,u:131072
},0);let u=n;if(!(512&n)){if(!(2&n&&e&&512&e.u))return;u=258048&e.u,(131072&u||r.s.E)&&l.An(e,0)}8192&u&&r.postMessage({
N:6,d:t.A}),32768&u&&r.postMessage({N:9,m:t.ya,t:t.ha,k:65536&u?t.mn:null}),16384&u&&8&r.s.u&&(r.s.u|=32,r.postMessage({
N:11,H:t.Rn,f:t.ii}))};l.ji=(e,t)=>{let u=r.jt(),o=e&&(t?e.a:e.T);if(e&&(!o||512&o.s.u)){l.An(e,0),
/^(?:http|file|ftp)/i.test(e.a.s.Fl)||n.selectTab(e.a.s.d,n.selectWndIfNeed);let r=0,o=setInterval(()=>{r++
;let l=t?e.a:e.T;5!==r&&(!l||512&l.s.u)||(clearInterval(o),u.Et())},33)}else u.Et();return u.Ot},setInterval(()=>{
let e=performance.now();for(let e of t.Ce){if(!(1024&e.s.u)){e.s.u|=1024;continue}let l=e.s.u!==t.he;l&&e.postMessage({
N:48,d:l})}let l=0;{let r=[];t.ss.forEach((e,l)=>{let n=e.B.length&&l>=0&&t.qe.get(l)||0;n>0&&r.push(n)}),
r.sort((e,l)=>l-e),l=Math.max(e-288e3,r.length?r[Math.min(5,r.length-1)]-1e3:0)}let n=[];t.ss.forEach((e,u)=>{
let o=e.B,f=o.length;if(!f)return;let i=[];for(let e of o)1024&e.s.u?i.push(e):e.s.u|=1024
;if(i.length&&(u>=0&&t.qe.get(u)||0)<l&&u!==t.he&&(1===f&&!(131072&e.u)&&o[0]===e.T||o.some(r.isNotPriviledged))){
e.u|=512;for(let e of i)e.s.u|=512;n.push(e)}});for(let e of n){let l=[];for(let t of e.B)512&t.s.u?(t.disconnect(),
t.s.E&&(e.u|=131072)):l.push(t);e.B.length=0,l.length&&e.B.push(...l)}},144e3)});