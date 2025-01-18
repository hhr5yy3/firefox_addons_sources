// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[671],{60830:function(a,b,c){c.d(b,{N:function(){return f}})
;var d=c(13113),e=c(73863);function f(){return{OpenUrl:async function(a,b){a.tabId||a.windowId;let c,f=""
;a.newWindow?(c="_blank",f=""):a.newTab?c="_blank":(c="_self",f="");"popup"===a.type&&(f=(0,e.bt)(f,",","popup"))
;void 0!==a.left&&(f=(0,e.bt)(f,",",`left=${a.left}`));void 0!==a.top&&(f=(0,e.bt)(f,",",`top=${a.top}`))
;void 0!==a.width&&(f=(0,e.bt)(f,",",`width=${a.width}`));void 0!==a.height&&(f=(0,e.bt)(f,",",`height=${a.height}`))
;null==b||b.ThrowIfShouldStop();let g=!1;if(a.url&&!a.newTab&&!a.newWindow&&"popup"!==a.type){const b=(0,
d.vN)(window.location.href),c=(0,d.vN)(a.url);let e=(null==b?void 0:b.m_extra)||"";{const a=e.indexOf("#")
;a>-1&&(e=e.slice(0,a))}let f=(null==c?void 0:c.m_extra)||"";{const a=f.indexOf("#");a>-1&&(f=f.slice(0,a))}
e===f&&(null==b?void 0:b.m_host)===(null==c?void 0:c.m_host)&&(null==b?void 0:b.m_port)===(null==c?void 0:c.m_port)&&(null==b?void 0:b.m_schema)===(null==c?void 0:c.m_schema)&&(g=!0)
}window.open(a.url,c,f),g&&window.location.reload();return""}}}},13835:function(a,b,c){c.d(b,{f:function(){return f}})
;var d=c(40371),e=c(4153);function f(a){const b=[],c=a;return{Get:f,GetValue:async function(a,b){const c=await f(a)
;return void 0!==c[a]?c[a]:b},Set:g,SetValue:async function(a,b){const c={};return c[a]=b,g(c)},Remove:async function(a){
const b={};let d=!1;if("string"==typeof a){const e=i(a);e&&(c.removeItem(a),b[a]={oldValue:e},d=!0)
}else if(Array.isArray(a))for(const e of a){const a=i(e);a&&(c.removeItem(e),b[e]={oldValue:a},d=!0)}d&&await h(b)},
Clear:async function(){const a={};let b=!1;for(let d=0;d<c.length;d++){const e=c.key(d);e&&(a[e]={oldValue:i(e)},b=!0)}
c.clear(),b&&await h(a)},AddOnChangeListener:function(a){b.push(a)},RemoveOnChangeListener:function(a){const c=b.indexOf(a)
;c>0&&b.splice(c,1)}};async function f(a){const b={};if(null==a){a=[];for(let b=0;b<c.length;b++)a.push(c.key(b))}
if("string"==typeof a){const c=i(a);void 0!==c&&(b[a]=c)}else if(Array.isArray(a))for(const c of a){const a=i(c)
;void 0!==a&&(b[c]=a)}else for(const c in a){const d=i(c);b[c]=void 0===d?a[c]:d}return b}async function g(a){const b={}
;let c=!1;for(const d in a){if(!Object.prototype.hasOwnProperty.call(a,d))continue;const f=(0,e.TT)(a[d]),g=i(d);j(d,f),b[d]={
oldValue:g,newValue:f},c=!0}c&&await h(b)}async function h(a){await(0,d.SY)(b,a)}function i(a){const b=c.getItem(a)
;return null===b?void 0:b?JSON.parse(b).value:b}function j(a,b){c.setItem(a,JSON.stringify({value:b}))}}},90237:function(a,b,c){
c.r(b),c.d(b,{WebPageApplication:function(){return I}})
;var d=c(19365),e=c(37156),f=c(47333),g=c(11719),h=c(12131),i=c(81871),j=c(20855),k=c(52090),l=c(78949),m=c(54811),n=c(62376),o=c(94652),p=c(88579),q=c(4234),r=c(42058),s=c(62851),t=c(13835),u=c(31173),v=c(60830),w=c(97973),x=c(73863),y=c(13113),z=c(45637),A=c(78440),B=c(40371),C=c(88262),D=c(46764),E=c(4153),F=c(34943),G=c(69893),H=c(13117)
;function I(a,b,c,I,J,K,L,M,N){const O=a,P=function(){const a=(0,u.m)(),b={GetBrowserType:c,GetBrowserAppName:d,
GetBrowserVersion:e,GetPlatformOS:f,GetOSName:g,GetOSVersion:i,GetBrowserInformation:j};return b;async function c(){return a}
async function d(){switch(await c()){case"firefox":return"Firefox";case"edge":return"Edge";case"chrome":
if(null===navigator||void 0===navigator?void 0:navigator.userAgent){const a=k(navigator.userAgent);if(a.m_name)return a.m_name}
return"Chrome";case"safari":return"Safari";case"opera":return"Opera";case"msie":return"Internet Explorer";default:
return"Unknown"}}async function e(){switch(await c()){case"firefox":if(navigator&&navigator.userAgent){
const a=navigator.userAgent;if(a.includes(" Firefox/")){const b=/Firefox([0-9.]+)/.exec(a);if(b)return b[1]}}break;case"edge":
if(navigator&&navigator.userAgent){const a=navigator.userAgent;if(a.includes(" Edg/")){const b=/Edg\/([0-9.]+)/.exec(a)
;if(b)return b[1]}}break;case"chrome":case"opera":if(navigator&&navigator.userAgent){const a=k(navigator.userAgent)
;if(a.m_version)return a.m_version}break;case"safari":if(navigator&&navigator.userAgent){const a=navigator.userAgent
;if(a.includes(" Safari/")){const b=/Version\/([0-9.]+) Safari/.exec(a);if(b)return b[1]}}break;default:return""}return""}
async function f(){return(0,u.Cp)(await h())}async function g(){return(0,u.xn)(await h())}async function h(){
const a=/(?:[^;]+;){2}.*?([\w.]+);/g.exec(navigator.userAgent);let b="";return a&&(b=a[1]),b}async function i(){return(0,u.VU)()
}async function j(){return{type:await c(),name:await d(),version:await e(),language:navigator.language,os:await f(),
osName:await g(),osVersion:await i()}}function k(a){let b=null,c=null;return a.includes(" OPR/")?(b="Opera",
c=/OPR\/([0-9.]+)/.exec(a)):a.includes(" YaBrowser/")?(b="YandexBrowser",
c=/YaBrowser\/([0-9.]+)/.exec(a)):a.includes(" Chrome/")&&(b="Chrome",c=/Chrome\/([0-9.]+)/.exec(a)),{m_name:b,
m_version:null!==c?c[1]:null}}}(),Q=b,R=K,S=(0,F.b)(),T=Object.assign(Object.assign(Object.assign(Object.assign({
Init:async()=>null,UnInit(){},GetParentTabId(){},CallViewHandler(){throw(0,G.Lh)()},UpdateViewPosition(){throw(0,G.Lh)()},
CloseView(){throw(0,G.Lh)()}},(0,v.N)()),{async CallBackgroundScript(a,b,c,...d){const e=await async function(a,b,c,...d){
if("start-page-loaded"===a){return{extension:"extension-v9",extensionMode:"stand-alone",isBreachMonSupported:!0,
isPasswordAuditSupported:!0,isAccountSetupSupported:!1,isViewStorageSupported:!1,isDesktopAppSetupSupported:!1,
isPasswordDetailsSupported:!0,isPassgenOnStartPageSupported:!0,isInAppPaymentDisabled:!1,isPaymentPageSupported:!0,
isSSOLoginSupported:!0,isUpdatePaymentPageAvailable:!0}}throw(0,G.Lh)()}(a,b,c,...d);return e},
onNotificationFromBackgroundScript:(0,B.dU)()}),a),{storage:b,sessionStorage:c}),U=I,V=J,W=L,X=M,Y=N,Z=(0,z.Wq)(Q,"p",(0,
r.ie)(X,Y));let aa=!1,ab=null,ac=null;const ad=(0,m.PN)({GetDefaultAutoLogoffTimeMins:async()=>120,IsStandalone:()=>!0,
async Logoff(a){if(!ab)throw(0,G.ZU)(G.VH,"Not initialized");await ab.service.Logoff(a)}});let ae=null,af=null,ag=null
;const ah=(0,E.kA)();let ai=null;const aj=(0,u.fy)(!0);aj.onUserActivity.Add((async()=>{ad.ResetInactivityTimer()}));let ak=!0
;return{Init:async function(a){await al();const b=(0,w.Op)(Z,"h"),c=(0,w.Nc)(X,b),l=await T.Init(a);ae=(0,j.kq)(Y);const m=(0,
i.R)(Q,c,Y);m.Init();const v=(0,D.f$)(),y=(0,g.VA)(m,O,Q,Z,ae,an,b,U,{m_client_type:"Site"
},V,null,W,c,v,Y),z=Object.assign(Object.assign({},y.service),{async Login(a,b){const c=y.service,d=await c.Login(a,b);try{
if(!ab)throw(0,G.ZU)(G.VH,"Not initialized");if(ak){const a=ab.service,c=ab.options;await async function(a,b,c){var d,e
;const f=await a.GetRoboFormAccountInfo(c);if(!f.clientKey)return!1
;const g=(0,n.yD)(!1,null!==(d=f.enterprise)&&void 0!==d&&d,null!==(e=f.createdTime)&&void 0!==e?e:null),h=await b.GetValue("AuthenticationMethod",g)
;if(1===h)return!1;const i=await a.GetRfoConnectionInfo(!0);if(!i.password)return!1;const j=(0,o.Bc)(W,X,Y)
;j.Connect(i.clientInfo,i.deviceId,i.serverUrl,i.loginToken,i.password,{useSessionCookies:i.useSessionCookies,
deviceDescription:i.deviceDescr}),await j.LoginWithSession("sync",c);const k=await(0,r.tx)(i.password,f.clientKey,X,Y,c),l={
source:"self",login:i.loginToken,password:k},m=(0,t.f)(window.sessionStorage)
;return await m.SetValue("rfo-cred",JSON.stringify(l)),!0}(a,c,b)}}catch(e){
(0,H.Rm)("!!! Cannot store info for the next session",(0,G.EB)(e))}return d},async Logoff(a){const b=y.service;await b.Logoff(a)
;try{const a=(0,t.f)(window.sessionStorage);await a.Remove("rfo-cred")}catch(c){(0,
H.Rm)("!!! Cannot cleanup info for the next session",(0,G.EB)(c))}}});return ab=Object.assign(Object.assign({},y),{service:z}),
ac={OpenExtensionSettings(){throw h.lU},GoFillSubmit(){throw h.lU},async GoTo(a,b){if(!ab)throw(0,G.ZU)(G.VH,"Not initialized")
;const c=window.open("about:blank","_blank");if(!c)throw(0,G.ZU)(G.V2,"Cannot open a new window")
;const d=await ab.data.GetInfo(a,4,null),e=(0,s.PH)(d.gotoUrl,d.matchUrl)||"";if(!e)throw c.close(),(0,G.ZU)(G.V2,"Empty URL")
;if((0,u.oK)(e))throw c.close(),(0,G.ZU)(G.V2,await T.LocalizeString("CannotOpenUrlForSecurityReasons"));if((0,
p.HB)(e))throw c.close(),(0,G.ZU)(G.V2,"Cannot open application")
;b&&b.dontAddToRecentlyUsedAndLogs||!1||(await ab.usageInfo.SetUsageInfo(a,0,!0,null),
await ab.usageInfo.SetUsageInfo(a,2,!0,null),await ab.data.LogFileAccess(a,"Use"),d.readOnly||d.hidePasswords||(0,
A.fI)(async function(a,b){ae&&1===(0,q.hF)(a)&&await ae.GetUpdateUserDataItemBreaches(a,b)}(a,null))),c.location=e},FillForms(){
throw h.lU},FillFieldsWithGeneratedPassword(){throw h.lU},ClearFields(){throw h.lU},ResetFields(){throw h.lU},SetFields(){
throw h.lU},ShowLoginUI(){throw h.lU},ShowSaveFormsDialog(){throw h.lU},BatchLogin(){throw h.lU},CheckItemDuplicates(){
throw h.lU},ShowDuplicatesDialog(){throw h.lU},async OpenRFOPage(a,b,c,d){
const e=`${window.location.origin}/site/account/manage?type=${b||"dashboard"}`;window.location.replace(e)},
async ContactSupport(a,b){const c=await async function(a){const b=(0,d.U)(),c=await P.GetBrowserInformation(),e={
m_diagnostic_info:await am(),m_web_page_field_index:a.fieldIndex,m_extension_version:b,m_os:c.osName,m_browser:c.name,
m_browser_version:c.version,m_browser_language:c.language};return{m_info:e,m_active_tab_screenshot_url:void 0,
m_report_message:"",m_report_subject:""}}(a),e="ContactSupport"===a.reportType?0:1;await async function(a,b,c){const e=await(0,
E.TT)(ab).rfo.GetSupportUrlFromServer(c),g=await(0,E.TT)(ab).service.GetRfoConnectionInfo(!1);try{const h=(0,
d.U)(),i=await P.GetBrowserInformation(),j=await(0,f.O2)(g.deviceId,i,e,h,a.m_report_subject,a.m_report_message,(0,
x.Ex)(a.m_info),a.m_active_tab_screenshot_url,b,W,S,c);j&&await T.OpenUrl({url:j,newTab:!0},c)}catch(h){(0,G.au)(h),
await T.OpenUrl({url:e,newTab:!0},c)}}(c,e,b)},OpenPaymentPage:async(a,b)=>(0,e.X)(a),ShowSharedFolderDialog(){throw h.lU},
ShowSharedFileSettings(){throw h.lU},ShowSendFileDialog(){throw h.lU},OpenStartPage(){throw h.lU},OpenFile(){throw h.lU},
OpenFolder(){throw h.lU},OpenInitialIdentity(){throw h.lU},OpenPinned(){throw h.lU},OpenPasswordGenerator(){throw h.lU},
OpenAuthenticator(){throw h.lU},OpenEmergencyAccess(){throw h.lU},OpenSharingCenter(){throw h.lU},OpenSecurityCenter(){
throw h.lU},OpenAdminCenter(){throw h.lU},OpenSignUpEnterprise(){throw h.lU},CreateNew(){throw h.lU},
ShowCreateSharedFolderDialog(){throw h.lU},ShowCreateGroupDialog(){throw h.lU},ShowRenameSharedFolderDialog(){throw h.lU},
StartSyncWithUI(){throw h.lU},SyncInBackground(a){if(!ab)throw(0,G.ZU)(G.VH,"Not initialized");return ab.SyncNow(a)},
OpenDesktopEditor(){throw h.lU},ShowDesktopOptionsDialog(){throw h.lU},RunProblemStepsRecorder(){throw h.lU},
OpenChangeMasterPasswordDialog(){throw h.lU},ShowBackupRestoreDialog(){throw h.lU},ShowImportDialog(){throw h.lU},
ShowAccountSetupDialog(){throw h.lU},OpenSwitchToDesktopPage(){throw h.lU},QuitRoboForm(){throw h.lU},CheckForUpdate(){
throw h.lU},SelectFolderToCreateBackupIn(){throw h.lU},ScanQRCode(){throw h.lU}},af=(0,j.j8)(W),await af.SetServerAddress(U),
ag=(0,
j.EE)(),await ag.Init(ab.data),await ae.Init(af,ag,ab.data),ai=(0,k.V)(),await ai.Init(ab.data,an,ab.securityWarningsManager,ae),
await ad.Init(ab.service,ab.data,ab.options),aj.Init(window),aa=!0,{viewApi:T,rfApi:ab,rfCommands:ac,userDataBreachesService:ae,
passwordAuditService:ai,initData:l}},UnInit:al,Connect:async function(a){if(!ab)throw(0,G.ZU)(G.VH,"Not initialized");try{
await ab.Connect(a)}catch(c){if(!(0,h.tM)(c,10))throw c}const b=ab.service;try{await b.Login({},a)}catch(c){if(R&&(0,
h.tM)(c,10))try{ak=!1,await async function(a,b,d){var e;if(!a.login)return!1;let f=await b.GetRfoConnectionInfo(!0)
;if(f.accountId){if(f.serverUrl!==location.origin)return!1}else f=Object.assign(Object.assign({},f),{serverUrl:location.origin})
;if(!f.serverUrl)return!1;if(f.accountId&&(0,o.pC)(a.login)!==f.accountId)return!1;if(f.loginToken&&(0,o.pC)(a.login)!==(0,
o.pC)(f.loginToken))return!1;const g=(0,o.Bc)(W,X,Y);g.Connect(f.clientInfo,"",f.serverUrl,a.login,"",{useSessionCookies:!0,
deviceDescription:f.deviceDescr});const h=await g.GetAccountInfo(null,d);if(!h.clientKey)return!1
;"self"!==(null==a?void 0:a.source)&&f.deviceId&&await g.AddUserDevice({id:f.deviceId,description:f.deviceDescr||"RFO Web Site",
enroll:!0},d);const i=await(0,r.lr)(a.password,h.clientKey,X,d);if(!i)return!1
;const j=f.accountId?a.login:null!==(e=h.email)&&void 0!==e?e:"";try{f.loginToken?await b.Login({password:i},d):await b.Login({
server:f.serverUrl,email:j,password:i},d)}catch(c){return!1}return!0}(R,b,a)}catch(c){}finally{ak=!0}}},
Disconnect:async function(){await(null==ab?void 0:ab.Disconnect())}};async function al(){aa&&(aj.UnInit(),await ad.UnInit(),
ai&&(await ai.UnInit(),ai=null),ae&&(await ae.UnInit(),ae=null),ag&&(await ag.UnInit(),ag=null),af&&(af=null),ac=null,ab=null,
aa=!1)}async function am(){const a=window.location.href,b=(0,E.TT)((0,y.vN)(a));let c="normal"
;window.outerHeight===screen.height&&window.outerWidth===screen.width&&(c="maximized");const d={m_app_window:{id:"1",focused:!0,
state:c,width:window.innerWidth,height:window.innerHeight,type:"normal"},m_web_page_data:{m_url:window.location.href,
m_domain:(0,E.TT)(b.m_host),m_title:document.title}};return{m_web_page_data:(0,E.TT)(d.m_web_page_data),
m_app_window:d.m_app_window,m_web_page_url:a,m_web_page_domain:(0,E.TT)(b.m_host),m_history:[]}}async function an(a){
return ah.GetOnce((async()=>(0,l.v5)(await(0,C.$)("pwd-dict.json",a,W))))}}}}]);