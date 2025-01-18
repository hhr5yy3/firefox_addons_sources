(()=>{var Qe=Object.defineProperty;var a=(T,F)=>Qe(T,"name",{value:F,configurable:!0});(()=>{var P;"use strict";var T={},F={};function c(s){var e=F[s];if(e!==void 0)return e.exports;var t=F[s]={exports:{}};return T[s](t,t.exports,c),t.exports}a(c,"__webpack_require__"),c.m=T,c.d=(s,e)=>{for(var t in e)c.o(e,t)&&!c.o(s,t)&&Object.defineProperty(s,t,{enumerable:!0,get:e[t]})},c.f={},c.e=s=>Promise.all(Object.keys(c.f).reduce((e,t)=>(c.f[t](s,e),e),[])),c.u=s=>"brcm/vue.js",c.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),c.o=(s,e)=>Object.prototype.hasOwnProperty.call(s,e),(()=>{var s={},e="ffz-addons:";c.l=(t,r,n,o)=>{if(s[t]){s[t].push(r);return}var i,d;if(n!==void 0)for(var l=document.getElementsByTagName("script"),m=0;m<l.length;m++){var u=l[m];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==e+n){i=u;break}}i||(d=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,c.nc&&i.setAttribute("nonce",c.nc),i.setAttribute("data-webpack",e+n),i.src=t,i.src.indexOf(window.location.origin+"/")!==0&&(i.crossOrigin="anonymous")),s[t]=[r];var y=a((Re,Te)=>{i.onerror=i.onload=null,clearTimeout(N);var Fe=s[t];if(delete s[t],i.parentNode&&i.parentNode.removeChild(i),Fe&&Fe.forEach(Ze=>Ze(Te)),Re)return Re(Te)},"onScriptComplete"),N=setTimeout(y.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=y.bind(null,i.onerror),i.onload=y.bind(null,i.onload),d&&document.head.appendChild(i)}})(),c.r=s=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},(()=>{var s;c.g.importScripts&&(s=c.g.location+"");var e=c.g.document;if(!s&&e&&(e.currentScript&&(s=e.currentScript.src),!s)){var t=e.getElementsByTagName("script");if(t.length)for(var r=t.length-1;r>-1&&!s;)s=t[r--].src}if(!s)throw new Error("Automatic publicPath is not supported in this browser");s=s.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),c.p=s+"../"})(),(()=>{var s={742:0};c.f.j=(r,n)=>{var o=c.o(s,r)?s[r]:void 0;if(o!==0)if(o)n.push(o[2]);else{var i=new Promise((u,y)=>o=s[r]=[u,y]);n.push(o[2]=i);var d=c.p+c.u(r),l=new Error,m=a(u=>{if(c.o(s,r)&&(o=s[r],o!==0&&(s[r]=void 0),o)){var y=u&&(u.type==="load"?"missing":u.type),N=u&&u.target&&u.target.src;l.message="Loading chunk "+r+` failed.
(`+y+": "+N+")",l.name="ChunkLoadError",l.type=y,l.request=N,o[1](l)}},"loadingEnded");c.l(d,m,"chunk-"+r,r)}};var e=a((r,n)=>{var[o,i,d]=n,l,m,u=0;if(o.some(N=>s[N]!==0)){for(l in i)c.o(i,l)&&(c.m[l]=i[l]);if(d)var y=d(c)}for(r&&r(n);u<o.length;u++)m=o[u],c.o(s,m)&&s[m]&&s[m][0](),s[m]=0},"webpackJsonpCallback"),t=globalThis.ffzAddonsWebpackJsonp=globalThis.ffzAddonsWebpackJsonp||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))})();var et={},C={};c.r(C),c.d(C,{color_background:()=>Me,color_border:()=>Ce,color_header_background:()=>ve,color_header_separators:()=>Pe,color_highlight:()=>$e,color_menu_item_background:()=>ke,color_menu_item_separators:()=>Ne,color_text:()=>qe,config_borderRadius:()=>xe,config_borderWidth:()=>ye,config_displayHeader:()=>fe,config_displayHeaderSeparators:()=>be,config_displayMenuItemSeparators:()=>we,config_headerTextSize:()=>_e,config_menuItemTextSize:()=>Se,config_menuWidth:()=>Ee,css_enabled:()=>Ue,pathCSS:()=>A,pathColors:()=>S,pathConfig:()=>_});const Ae=a(s=>({x:s.pageX?s.pageX:s.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft),y:s.pageY?s.pageY:s.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)}),"getMousePos"),z=a((s,e=Number.MAX_SAFE_INTEGER,t=0)=>`${s.className} ${t<e&&s.parentElement?z(s.parentElement,e,++t):""}`,"getParentClassNames"),he=a((s,e,t=1)=>s===e?[s]:[s,...he(s+1,e)].filter(r=>r%t===0),"range"),Ie=a(s=>s.split("_").map(e=>e.charAt(0).toUpperCase()+e.substring(1).toLowerCase()).join(" "),"titlize"),ue=a(s=>(s.charAt(0).toUpperCase()+s.substring(1).toLowerCase()).split("_").join(" "),"capitalize"),f=a((s,e)=>`add_ons.brcm.module.${s}.module.config.${e}`,"getConfigKey");var ze=Object.defineProperty,Le=a((s,e,t)=>e in s?ze(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,"__defNormalProp"),pe=a((s,e,t)=>(Le(s,typeof e!="symbol"?e+"":e,t),t),"__publicField"),Be=a((s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)},"__accessCheck"),w=a((s,e,t)=>(Be(s,e,"read from private field"),t?t.call(s):e.get(s)),"__privateGet"),Oe=a((s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},"__privateAdd"),g;const De=(P=class{constructor(){Oe(this,g,[])}addSegment(e,t,r){const n={};return t&&(n.sort=t),r&&(n.description=r),w(this,g).push(`${e}@${JSON.stringify(n)}`),this}copy(){const e=new P;return w(this,g).forEach(t=>w(e,g).push(t)),e}toString(){const e="Add-Ons > BRCM";switch(w(this,g).length){case 0:return e.replace(">",">>");case 1:return`${e} >> ${w(this,g)[0]}`;case 2:return`${e} > ${w(this,g)[0]} >> ${w(this,g)[1]}`;default:const t=w(this,g).pop();return`${e} > ${w(this,g).join(" > ")} >> ${t}`}}},a(P,"_ConfigPath2"),P);g=new WeakMap;let $=De;const J=class J{constructor(e,t=new $,r,n){pe(this,"config"),pe(this,"key"),this.key=e,this.config={ui:{path:t.toString(),title:r||ue(e)}},n&&(this.config.ui.description=n)}setTitle(e){return this.title=e,this}setDescription(e){return this.config.ui.description=e,this}setOnChangeEvent(e){return this.config.changed=e,this}setSort(e){return this.config.ui.sort=e,this}setPath(e){return this.config.ui.path=`${e}`,this}setProcess(e){return this.config.process=e,this}setUIProcess(e){return this.config.ui.process=e,this}};a(J,"Config");let E=J;const V=class V extends E{constructor(e,t,r,n,o){super(e,r,n,o),this.config.default=t,this.config.ui.component="setting-check-box"}};a(V,"BooleanConfig");let v=V;const Y=class Y extends E{constructor(e,t,r,n,o){super(e,r,n,o),this.config.default=t,this.config.ui.component="setting-color-box"}};a(Y,"ColorConfig");let b=Y;const K=class K extends null{constructor(e,t,r,n,o,i){super(e,n,o,i),this.config.default=t,this.config.ui.data=r,this.config.ui.component="setting-select-box"}};a(K,"SelectBoxConfig");let me=K;const Z=class Z extends E{constructor(e,t,r,n,o,i=1,d,l,m){super(e,d,l,m),this.config.default=r,this.config.ui.data=he(n,o,i).map(u=>({value:u,title:t(u)})),this.config.ui.component="setting-select-box"}};a(Z,"IntSelectBoxConfig");let L=Z;const Q=class Q extends E{constructor(e,t,r,n,o,i,d){super(e,r,i,d),this.config.default=t,this.config.ui.component="setting-text-box",o&&(this.config.process=o),n&&(this.config.ui.process=n)}};a(Q,"TextBoxConfig");let k=Q;const ee=class ee extends null{constructor(e,t,r,n,o,i,d){super(e,o,i,d),this.config.default=t,this.config.ui.process=l=>(l=parseInt(l,10),n||(n=Number.MAX_SAFE_INTEGER),r||(r=Number.MIN_SAFE_INTEGER),isNaN(l)||!isFinite(l)?t:l>n?n:l<r?r:l),this.config.ui.component="setting-text-box"}};a(ee,"IntTextBoxConfig");let ge=ee;const q=a((s,e)=>{if(s.endsWith("rem")){const t=parseInt(s.split("rem")[0]);return isNaN(t)||!isFinite(t)?`${e}px`:s}else if(s.endsWith("px")){const t=parseInt(s.split("px")[0]);return isNaN(t)||!isFinite(t)?`${e}px`:s}else{const t=parseInt(s);return isNaN(t)||!isFinite(t)?`${e}px`:`${s}px`}},"process");let B=0;const _=new $().addSegment("Config",B++),fe=new v("display_header",!0,_),be=new v("display_header_separator",!0,_),we=new v("display_menu_item_separators",!1,_),_e=new k("header_text_size","15px",_).setUIProcess(s=>q(s,15)),Se=new k("menu_item_text_size","12px",_).setUIProcess(s=>q(s,12)),xe=new k("border_radius","3px",_).setUIProcess(s=>q(s,3)),ye=new k("border_width","1px",_).setUIProcess(s=>q(s,1)),Ee=new k("menu_width","150px",_).setUIProcess(s=>q(s,150)),S=new $().addSegment("Colors",B++),ve=new b("header_background","rgb(24,24,27)",S),ke=new b("menu_item_background","rgb(31,31,35)",S),Me=new b("background","rgb(31,31,35)",S),Ce=new b("border","rgb(54,54,57)",S),$e=new b("highlight","rgb(76,76,79)",S),Pe=new b("header_separators","rgb(53,53,57)",S),Ne=new b("menu_item_separators","rgb(53,53,57)",S),qe=new b("text","rgb(255,255,255)",S),A=new $().addSegment("Custom CSS",B++),Ue=new v("css_enabled",!1,A,"Enabled").setSort(0);var We=Object.defineProperty,He=a((s,e,t)=>e in s?We(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,"module_defNormalProp"),p=a((s,e,t)=>(He(s,typeof e!="symbol"?e+"":e,t),t),"module_publicField");const te=class te{constructor(e,t,r){p(this,"key"),p(this,"path"),p(this,"title"),p(this,"description"),p(this,"clickFunc"),p(this,"requiresVIP",!1),p(this,"requiresMod",!1),p(this,"requiresBroadcaster",!1),this.key=e,this.path=t,this.clickFunc=r,this.title=ue(e)}setRequiresVIP(){return this.requiresVIP=!0,this}setRequiresMod(){return this.requiresMod=!0,this}setRequiresBroadcaster(){return this.requiresBroadcaster=!0,this}setTitle(e){return this.title=e,this}setDescription(e){return this.description=e,this}onClick(e){this.clickFunc(e)}};a(te,"RightClickSubModule");let h=te;const se=class se{constructor(e,t,r){p(this,"brcm"),p(this,"key"),p(this,"name"),p(this,"path"),p(this,"supportsHeader",!1),p(this,"injects",[]),p(this,"modules",[]),p(this,"configs",[]),p(this,"displayConfigRequirements",!0),p(this,"displayMenuRequirements",!0),this.brcm=e,this.key=t,this.name=r||Ie(this.key)}checkElement(e){return!1}onClickElement(e,t){return!1}};a(se,"RightClickModule");let I=se;var je=Object.defineProperty,Xe=a((s,e,t)=>e in s?je(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,"chat_module_defNormalProp"),Ge=a((s,e,t)=>(Xe(s,typeof e!="symbol"?e+"":e,t),t),"chat_module_publicField");const re=class re extends I{constructor(e){super(e,"chat"),Ge(this,"user"),this.supportsHeader=!0,this.displayConfigRequirements=!1,this.displayMenuRequirements=!1,this.path=new $().addSegment(this.name);const t=this.path.copy().addSegment("Config",1),r=this.path.copy().addSegment("Toggles (User)",2),n=this.path.copy().addSegment("Toggles (Moderation)",3),o=this.path.copy().addSegment("Toggles (Broadcaster)",4);this.configs.push(new L("timeout_duration",i=>`${i} Seconds`,300,30,1800,30).setPath(t)),this.modules.push(new h("block",r,i=>i.sendMessage(`/block ${this.user}`))),this.modules.push(new h("open_in_this_tab",r,i=>window.location.href=`https://twitch.tv/${this.user}`)),this.modules.push(new h("open_in_new_tab",r,i=>window.open(`https://twitch.tv/${this.user}`,"_blank"))),this.modules.push(new h("ping",r,i=>i.sendMessage(`@${this.user}`))),this.modules.push(new h("unblock",r,i=>i.sendMessage(`/unblock ${this.user}`))),this.modules.push(new h("ban",n,i=>i.sendMessage(`/ban ${this.user}`)).setRequiresMod()),this.modules.push(new h("purge",n,i=>i.sendMessage(`/timeout ${this.user} 1`)).setRequiresMod()),this.modules.push(new h("timeout",n,i=>i.sendMessage(`/timeout ${this.user} ${i.settings.get(f(this.key,"timeout_duration"))}`)).setRequiresMod()),this.modules.push(new h("unban",n,i=>i.sendMessage(`/unban ${this.user}`)).setRequiresMod()),this.modules.push(new h("mod",o,i=>i.sendMessage(`/mod ${this.user}`)).setRequiresBroadcaster().setTitle("Add Mod")),this.modules.push(new h("vip",o,i=>i.sendMessage(`/vip ${this.user}`)).setRequiresBroadcaster().setTitle("Add VIP")),this.modules.push(new h("host",o,i=>i.sendMessage(`/host ${this.user}`)).setRequiresBroadcaster()),this.modules.push(new h("raid",o,i=>i.sendMessage(`/raid ${this.user}`)).setRequiresBroadcaster()),this.modules.push(new h("unmod",o,i=>i.sendMessage(`/unmod ${this.user}`)).setRequiresBroadcaster().setTitle("Remove Mod")),this.modules.push(new h("unvip",o,i=>i.sendMessage(`/unvip ${this.user}`)).setRequiresBroadcaster().setTitle("Remove VIP")),this.modules=this.modules.sort((i,d)=>(i=i.title.toLowerCase(),d=d.title.toLowerCase(),i<d?-1:i>d?1:0))}checkElement(e){return z(e,5).includes("chat-line__message")}onClickElement(e,t){let r,n=e.target;for(;n.parentElement;)if(n.classList.contains("chat-line__message")){r=n;break}else n=n.parentElement;if(!r||!r.hasAttribute("data-user"))return!0;this.user=r.getAttribute("data-user"),this.userID=r.getAttribute("data-user-id"),this.room=r.getAttribute("data-room"),this.roomID=r.getAttribute("data-room-id");const o=t.getElementsByClassName("header");o.length===1&&(o[0].innerText=this.user,this.brcm.twitch_data.getUser(this.userID).then(i=>{i.stream&&(o[0].innerText+=" (Live)")}))}};a(re,"ChatModule");let O=re;const ie=class ie extends I{constructor(e){super(e,"video_player"),this.injects=["site.player"],this.path=new $().addSegment(this.name);const t=this.path.copy().addSegment("Config",1),r=this.path.copy().addSegment("Toggles",2);this.modules.push(new h("clip",r,n=>{const o=document.querySelectorAll('[data-a-target="player-clip-button"]');o.length===1?o[0].click():alert("ERROR: Couldn't find clip button.")})),document.pictureInPictureEnabled&&this.modules.push(new h("picture_in_picture",r,n=>n.player.Player.instances.forEach(o=>n.player.pipPlayer(o)))),this.modules.push(new h("reset_player",r,n=>n.player.Player.instances.forEach(o=>n.player.resetPlayer(o))))}checkElement(e){return z(e).includes("video-player__container")}onClickElement(e,t){}};a(ie,"VideoPlayerModule");let D=ie;var Je=Object.defineProperty,Ve=a((s,e,t)=>e in s?Je(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,"preset_defNormalProp"),U=a((s,e,t)=>(Ve(s,typeof e!="symbol"?e+"":e,t),t),"preset_publicField");const ne=class ne{constructor(e,t,r){U(this,"key"),U(this,"name"),U(this,"css"),this.key=e,this.name=t,this.css=r.trim()}};a(ne,"Preset");let M=ne;const oe=class oe extends M{constructor(){super("ffdark","Firefox (Dark)",`#brcm-main-container .show {
	background-color: rgb(59,63,69);
	border:           1px solid rgb(95,98,102);
	border-radius:    0px;
	color:            rgb(255,255,255);
	box-shadow:       0 0 10px rgba(0,0,0,0.75);
	min-width:        190px;
	
	padding-top:      2px;
	padding-bottom:   2px;
	padding-left:     2px;
	padding-right:    2px;
}

#brcm-main-container .show li.separator-header {
	background-color: rgb(71,77,82);
	height:           1px;
	margin-left:      12px;
}

#brcm-main-container .show li.separator-menu-item {
	background-color: rgb(71,77,82);
	height:           1px;
	margin-left:      20px;
}

#brcm-main-container .show li.header {
	background-color: rgb(59,63,69);
	font-size:        14px;
	padding-top:      6px;
	padding-bottom:   6px;
	padding-left:     10px;
	padding-right:    10px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header) {
	background-color: rgb(59,63,69);
	font-size:        12px;
	padding-top:      3px;
	padding-bottom:   2px;
	padding-left:     23px;
	padding-right:    6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
	background-color: rgb(87,91,96);
}`)}};a(oe,"FirefoxDarkPreset");let W=oe;const ae=class ae extends M{constructor(){super("fflight","Firefox (Light)",`#brcm-main-container .show {
	background-color: rgb(242,242,242);
	border:           1px solid rgb(221,221,221);
	border-radius:    0px;
	color:            rgb(0,0,0);
	box-shadow:       0 0 10px rgba(0,0,0,0.75);
	min-width:        190px;
	
	padding-top:      2px;
	padding-bottom:   2px;
	padding-left:     2px;
	padding-right:    2px;
}

#brcm-main-container .show li.separator-header {
	background-color: rgb(221,221,221);
	height:           1px;
	margin-left:      12px;
}

#brcm-main-container .show li.separator-menu-item {
	background-color: rgb(221,221,221);
	height:           1px;
	margin-left:      20px;
}

#brcm-main-container .show li.header {
	background-color: rgb(242,242,242);
	font-size:        14px;
	padding:          6px 10px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header) {
	background-color: rgb(242,242,242);
	font-size:        12px;
	padding-top:      3px;
	padding-bottom:   2px;
	padding-left:     23px;
	padding-right:    6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
	background-color: rgb(144,201,246);
}`)}};a(ae,"FirefoxLightPreset");let H=ae;const ce=class ce extends M{constructor(){super("twitch","Twitch (Default)",`#brcm-main-container .show {
		border:           1px solid #232223;
		border-radius:    3px;
		color:            #FFFFFF;
		box-shadow:       0 0 3px rgb(0,0,0);
		min-width:        150px;
}

#brcm-main-container .show li.separator-header {
		background-color: #232223;
		height:           1px;
}

#brcm-main-container .show li.separator-menu-item {
		background-color: #232223;
		height:           1px;
}

#brcm-main-container .show li.header {
		background-color: #18181B;
		font-size:        15px;
		padding:          2px 6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header) {
		background-color: #1E1E22;
		font-size:        12px;
		padding:          4px 6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
		background-color: #772CE8;
}`)}};a(ce,"TwitchDefaultPreset");let j=ce;const de=class de extends M{constructor(){super("twitch_ffz","Twitch (FFZ)",`#brcm-main-container .show {
    color:            var(--color-text-base) !important;
    background-color: var(--color-background-alt) !important;
    border:           var(--border-width-default) solid var(--color-border-base) !important;
    box-shadow:       var(--shadow-elevation-3) !important;
    border-radius:    var(--border-radius-small) !important;
    min-width:        150px !important;
}

#brcm-main-container .show li.separator-header {
    background-color: var(--color-border-base) !important;
    height:           var(--border-width-default) !important;
}

#brcm-main-container .show li.separator-menu-item {
    background-color: var(--color-border-base) !important;
    height:           var(--border-width-default) !important;
}

#brcm-main-container .show li.header {
    background-color: var(--color-background-base) !important;
    font-size:        var(--font-size-4) !important;
    padding:          var(--button-padding-y) var(--button-padding-x) !important;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header) {
    font-size:        var(--font-size-5) !important;
    padding:          var(--button-padding-y) var(--button-padding-x) !important;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
    background-color: var(--color-background-button-text-hover) !important;
}`)}};a(de,"TwitchFZZPreset");let X=de;var Ye=Object.defineProperty,Ke=a((s,e,t)=>e in s?Ye(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,"brcm_defNormalProp"),R=a((s,e,t)=>(Ke(s,typeof e!="symbol"?e+"":e,t),t),"brcm_publicField");const{createElement:x}=FrankerFaceZ.utilities.dom,le=class le extends FrankerFaceZ.utilities.addon.Addon{constructor(...e){super(...e),R(this,"modules",[new O(this),new D(this)]),R(this,"menuPresets",[new M("empty","Custom",""),new j,new X,new W,new H]),R(this,"customStyleElement"),R(this,"staticStyleElement"),R(this,"containerElement"),this.log.info("Constructing BRCM");const t=["chat.actions","chat.badges","site.chat","site.twitch_data"];this.modules.forEach(r=>r.injects.forEach(n=>t.push(n))),[...new Set(t)].forEach(r=>this.inject(r)),this.loadMenuSettings(),this.loadModuleSettings(),this.loadDevBadge(),this.log.info("Successfully constructed BRCM")}loadMenuSettings(){let e=0;for(const t in C)C[t]instanceof E&&this.settings.add(f("menu",C[t].key),C[t].setSort(e++).setOnChangeEvent(()=>this.reloadElements()).config);this.settings.addUI(f("menu","css"),{ui:{path:`${A}`,sort:999999,title:"Preset",description:"Presets require Custom CSS to be enabled. Twitch (FFZ) preset uses variables provided by FFZ to mimic the custom style set by yourself.",data:this.menuPresets.map(t=>({value:t.key,title:t.name})),component:()=>c.e(670).then(c.bind(c,264)),getPreset:t=>this.menuPresets[t],onChange:()=>this.reloadElements()}}),this.settings.add(f("menu","css"),{default:this.menuPresets[0].css,ui:{path:`${A}`,sort:Number.MAX_SAFE_INTEGER,value:this.getCSS(),component:()=>c.e(670).then(c.bind(c,804)),isValid:t=>this._getCSS()!==t,changed:()=>{this.setCSS(),this.setHTML()}}})}loadModuleSettings(){let e=0,t=0;for(const r of this.modules){this.settings.add(f(r.key,"enabled"),new v("enabled",!0,r.path.copy().addSegment(`Main ${r.name} Toggle`,-100).toString()).setOnChangeEvent(()=>this.reloadElements()).config);for(const n of r.configs)this.settings.add(f(r.key,n.key),n.setSort(t++).setOnChangeEvent(()=>this.reloadElements()).config);for(const n of r.modules){const o={default:!0,ui:{sort:e++,path:`${n.path}`,title:(r.displayConfigRequirements?n.requiresMod?"(Moderator) ":n.requiresBroadcaster?"(Broadcaster) ":"":"")+n.title,component:"setting-check-box"},changed:()=>this.reloadElements()};n.description&&(o.ui.description=n.description),this.settings.add(f(r.key,n.key),o)}}}onEnable(){this.log.info("Setting up BRCM"),document.body.appendChild(this.containerElement=x("div",{id:"brcm-main-container",className:"chat-shell"})),document.head.appendChild(this.staticStyleElement=x("style",null,this.getStaticCSS())),this.reloadElements(),document.addEventListener("contextmenu",e=>this.onRightClick(e)),document.addEventListener("click",e=>this.onLeftClick(e)),this.log.info("Successfully setup BRCM")}onDisable(){this.log.info("Disabling BRCM"),document.removeEventListener("contextmenu",e=>this.onRightClick(e)),document.removeEventListener("click",e=>this.onLeftClick(e)),this.containerElement&&(this.containerElement.remove(),this.containerElement=null),this.customStyleElement&&(this.customStyleElement.remove(),this.customStyleElement=null),this.staticStyleElement&&(this.staticStyleElement.remove(),this.staticStyleElement=null),this.log.info("Successfully disabled BRCM")}onRightClick(e){for(const t of this.containerElement.children)if(t===e.target.parentElement){this.onLeftClick(e),e.preventDefault();return}for(const t of this.containerElement.children)if(t.className==="show"){t.className="hide",e.preventDefault();return}for(const t of this.modules)if(this.settings.get(f(t.key,"enabled"))&&t.checkElement(e.target)){const r=document.getElementById(`brcm-${t.key}-menu`);if(t.onClickElement(e,r))continue;e.preventDefault();const n=Ae(e);r.className="show",r.style.top=`${n.y-(window.innerHeight-e.pageY>r.offsetHeight?0:r.offsetHeight)}px`,r.style.left=`${n.x-(window.innerWidth-e.pageX>r.offsetWidth?0:r.offsetWidth)}px`;break}}onLeftClick(e){for(const t of this.containerElement.children)if(t.className==="show"&&(t.className="hide"),e.target.parentElement===t&&t.id.split("-").length===3){const r=t.id.split("-")[1],n=this.modules.filter(o=>o.key===r);if(n.length===1){const i=n[0].modules.filter(d=>d.key===e.target.className);if(i.length===1){const d=i[0];(!d.requiresMod||this.isMod())&&d.onClick(this)}}}}reloadElements(){console.log("reloading"),this.setCSS(),this.setHTML();const e=document.getElementById("brcm-css-text-area");e&&!this.getMenuSetting("css")&&(e.textContent=this.getCSS())}setHTML(){this.containerElement&&(this.containerElement.remove(),document.body.appendChild(this.containerElement=x("div",{id:"brcm-main-container",className:"chat-shell"})),this.modules.forEach(e=>{const t=x("ul",{id:`brcm-${e.key}-menu`,className:"hide"});this.getMenuSetting(fe)&&e.supportsHeader&&(t.appendChild(x("li",{className:"header"})),this.getMenuSetting(be)&&t.appendChild(x("li",{className:"separator-header"}))),e.modules.filter(r=>this.settings.get(f(e.key,r.key))).filter(r=>r.requiresVIP?this.isVIP():!0).filter(r=>r.requiresMod?this.isMod():!0).filter(r=>r.requiresBroadcaster?this.isBroadcaster():!0).forEach(r=>{this.getMenuSetting(we)&&t.childElementCount>0&&(!t.lastElementChild||!t.lastElementChild.className.includes("separator"))&&t.appendChild(x("li",{className:"separator-menu-item"})),t.appendChild(x("li",{className:r.key},(e.displayMenuRequirements?r.requiresMod?"(Mod) ":r.requiresBroadcaster?"(Streamer) ":"":"")+r.title))}),this.containerElement.appendChild(t)}))}setCSS(){const e=this.getCSS();this.customStyleElement?this.customStyleElement.textContent=e:document.head.appendChild(this.customStyleElement=x("style",null,e))}getCSS(){return this.getMenuSetting("css_enabled")?this.getMenuSetting("css")?this.getMenuSetting("css"):this._getCSS():this._getCSS()}_getCSS(){return`#brcm-main-container .show {
	background-color: ${this.getMenuSetting(Me)};
	border:           ${this.getMenuSetting(ye)} solid ${this.getMenuSetting(Ce)};
	border-radius:    ${this.getMenuSetting(xe)};
	color:            ${this.getMenuSetting(qe)};
	box-shadow:       0 0 3px rgb(0,0,0);
	min-width:        ${this.getMenuSetting(Ee)};
}

#brcm-main-container .show li.separator-header {
	background-color: ${this.getMenuSetting(Pe)};
	height:           1px;
}

#brcm-main-container .show li.separator-menu-item {
	background-color: ${this.getMenuSetting(Ne)};
	height:           1px;
}

#brcm-main-container .show li.header {
	background-color: ${this.getMenuSetting(ve)};
	font-size:        ${this.getMenuSetting(_e)};
	padding-top:      2px;
	padding-bottom:   2px;
	padding-left:     6px;
	padding-right:    6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header) {
	background-color: ${this.getMenuSetting(ke)};
	font-size:        ${this.getMenuSetting(Se)};
	padding-top:      4px;
	padding-bottom:   4px;
	padding-left:     6px;
	padding-right:    6px;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
	background-color: ${this.getMenuSetting($e)};
}`}getStaticCSS(){return`#brcm-css-text-area {
	font-family:        "Roboto Mono";
}

#brcm-main-container .show {
	display:            block;
	position:           absolute;
	z-index:            ${Number.MAX_SAFE_INTEGER};
}

#brcm-main-container .hide {
	display:            none;
}

#brcm-main-container .show li {
	list-style-type:    none;
}

#brcm-main-container .show li:not(.separator-menu-item):not(.separator-header):not(.header):hover {
	background-color: var(--color-background-accent);
	cursor:           default;
}`}sendMessage(e){this.chat.ChatService.first.sendMessage(e)}isVIP(e=!1){return(e?!1:this.isMod())||this.chat.ChatContainer.first.props.commandPermissionLevel===1}isMod(e){return(e?!1:this.isBroadcaster())||this.chat.ChatContainer.first.props.commandPermissionLevel===2}isBroadcaster(){return this.chat.ChatContainer.first.props.commandPermissionLevel===3}getMenuSetting(e){return this.settings.get(f("menu",e.key||e))}loadDevBadge(){this.badges.loadBadgeData("add_ons.brcm--badge-developer",{id:"brcm_developer",title:"BRCM Developer",slot:7,color:"#71D400",image:"https://i.imgur.com/OFA5S7d.png",urls:{1:"https://i.imgur.com/OFA5S7d.png",2:"https://i.imgur.com/bkIP2Sq.png",4:"https://i.imgur.com/rrD2aTS.png"}}),this.resolve("chat").getUser(523772148,"l3afme").addBadge("add_ons.brcm","add_ons.brcm--badge-developer")}};a(le,"BetterRightClickMenuAddon");let G=le;G.register("brcm",null,"1.0.0")})();})();

//# sourceMappingURL=script.js.map