"use strict"
;__filename="background/action_icon.js",define(["require","exports","./store","./utils","./i18n","./browser","./ports"],(e,i,n,t,s,l,o)=>{
Object.defineProperty(i,"__esModule",{value:true}),i.e=i.i=void 0;let r=[{19:"/icons/enabled_19.png",
38:"/icons/enabled_38.png"},{19:"/icons/partial_19.png",38:"/icons/partial_38.png"},{19:"/icons/disabled_19.png",
38:"/icons/disabled_38.png"}];i.i=l.n.browserAction,i.e=()=>{let e=n.t;if(e===!!n.l)return;n.o=e?a:n.r
;let i=({a:{s:i},u:t})=>{if(0!==i.c){if(512&t&&e)return void(i.c=0);n.o(i.d,e?i.c:0)}},t=()=>n.t===e;e?(n.l=1,
o.p(0,i,t)):setTimeout(()=>{n.t||null==n.l||(n.l=null,o.p(0,i,t))},200)};let a=(e,n)=>{e<0||i.i.setIcon({tabId:e,
path:r[n]})};i.e()});