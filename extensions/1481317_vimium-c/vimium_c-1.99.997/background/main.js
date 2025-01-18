"use strict"
;__filename="background/main.js",define(["require","exports","./store","./utils","./browser","./settings","./ports","./key_mappings","./run_commands","./normalize_urls","./parse_urls","./exclusions","./ui_css","./eval_urls","./open_urls","./all_commands","./request_handlers","./tools"],(e,o,s,t,n,i,r,l,u)=>{
Object.defineProperty(o,"__esModule",{value:true});let a=e=>{let o=s.ss.get(s.he);"quickNext"===e&&(e="nextTab")
;let t=l.da
;6!==s.Xe||(t&&t.get(e)?null==o||4&o.u||s.he<0?u.executeShortcut(e,o):n.tabsGet(s.he,o=>(u.executeShortcut(e,o&&"complete"===o.status?s.ss.get(o.id):null),
n.le())):(t&&null!==t.get(e)&&(t.set(e,null),console.log("Shortcut %o has not been configured.",e)),o&&(s.g=o.a),
r.showHUD(`Shortcut "${e}" has not been configured.`)))};s.eo=()=>{if(6===s.Xe){
if(s.eo)return t.oo(i.sl.then.bind(i.sl,s.eo)),void(s.eo=null);s.mn||(i._l("keyMappings"),s.Z||(l.bi["m-s-c"]=36)),
i._l("exclusionListenHash"),i._l("vomnibarOptions"),i._l("autoDarkMode"),i._l("autoReduceMotion"),
n.n.runtime.onConnect.addListener(e=>r.OnConnect(e,0|e.name)),n.n.runtime.onConnectExternal.addListener(e=>{
let o,{sender:t,name:n}=e;if(t&&r.isExtIdAllowed(t)&&n.startsWith("vimium-c.")&&(o=n.split("@")).length>1){
if(o[1]!==s.J.GitVer)return e.postMessage({N:2,t:1}),void e.disconnect();r.OnConnect(e,1024|o[0].slice(9))
}else e.disconnect()}),n.n.extension.isAllowedIncognitoAccess(o=>{s.J.so=false===o,setTimeout(()=>{new Promise((o,s)=>{
e(["/background/others.js"],o,s)}).then(e=>e),setTimeout(()=>{new Promise((o,s)=>{
e(["/background/browsing_data_manager.js"],o,s)}).then(e=>e),new Promise((o,s)=>{
e(["/background/completion_utils.js"],o,s)}).then(e=>e),new Promise((o,s)=>{e(["/background/completion.js"],o,s)
}).then(e=>e)},200)},200)})}},!n.n.commands||n.n.commands.onCommand.addListener(a),i.sl.then(()=>{i._l("extAllowList"),
n.n.runtime.onMessageExternal.addListener((e,o,t)=>{if(r.isExtIdAllowed(o)){if("string"==typeof e)u.executeExternalCmd({
command:e},o);else if("object"==typeof e&&e)switch(e.handler){case"shortcut":let n=e.shortcut;n&&a(n+"");break;case"id":
return void t({name:"Vimium C",host:location.host,shortcuts:true,injector:s.J.to,version:s.J.Ta});case 99:
return void t({s:e.scripts?s.J.Ue:null,version:s.J.Ta,host:location.host,h:"@"+s.J.GitVer});case"command":
u.executeExternalCmd(e,o)}}else t(false)}),i._l("vomnibarPage",null),i._l("searchUrl",null)}),
!n.Me.onReplaced||n.Me.onReplaced.addListener((e,o)=>{let t=s.ss.get(o);if(s.no===o&&(s.no=e),t){s.ss.delete(o),
s.ss.set(e,t);for(let o of t.B)o.s.d=e;t.a.s.d=e;for(let t of s.Ce)t.s.d===o&&(t.s.d=e)}}),s.ml.Bl=(e,o,t)=>{
setTimeout(()=>{s.ml.Bl(e,o,t)},210)},n.v([{permissions:["cookies"]}],e=>{s.Je=e[0]}),s.Xe=4|s.Xe,s.eo(),
window.onunload=()=>{for(let e of s.Ce)e.disconnect();s.ss.forEach(e=>{for(let o of e.B)o.disconnect()})}});