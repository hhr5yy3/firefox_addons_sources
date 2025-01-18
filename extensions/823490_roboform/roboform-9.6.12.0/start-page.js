// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[471],{260:function(){},43246:function(a,b,c){"use strict";c.d(b,{
r:function(){return q}})
;var d=c(47333),e=c(401),f=c(76259),g=c(95239),h=c(94061),i=c(70346),j=c(79997),k=c(21253),l=c(60954),m=c(78440),n=c(13113),o=c(69893),p=c(13117)
;async function q(a,b,c,q,r,s){const t=a,u=await t.Init(null),v=c,w=await(0,l.y)(t),x={initialized:!1,type:"local",
mode:"extension-v9",extensionMode:"use-native",status:"initial",rfVersion:[],platformOs:await b.GetPlatformOS(),
browserType:await b.GetBrowserType(),staging:!1,testRoboFormSetup:!1,showUsageInfo:!1,isBreachMonSupported:!1,
isPasswordAuditSupported:!1,isAccountSetupSupported:!1,isDesktopAppSetupWithAccountInfoFromExtensionSupported:!1,
isPasswordDetailsSupported:!1,isPassgenOnStartPageSupported:!1,isInAppPaymentDisabled:!1,isPaymentPageSupported:!0,
isSSOLoginSupported:!1,isUpdatePaymentPageAvailable:!0};t.onNotificationFromBackgroundScript.Add((function(a,...b){
"BackgroundReloaded"===a&&(0,m.fI)(z(null))}));let y=!1;return void await z(u);async function z(a){if(!y)try{y=!0;let c=0
;const d=10;for(;;){if(c++,x.initialized)return;let e,f=2;c>=3&&(f=5);try{e=await t.CallBackgroundScript("start-page-loaded",{
timeoutSec:f},null)}catch(b){if(c>=d)throw(0,p.Rm)(`!!! DoStartLocalStartPage: 'start-page-loaded' error, tried ${c} times`,b),b
;let a=500;(0,o.n4)(b)&&b.message.indexOf("Receiving end does not exist")>=0&&(a=500),(0,o.r5)(b,o.ut)&&(c=0,a=0),(0,
o.r5)(b,o.Un)&&(a=0),await(0,m.xy)(a);continue}return void await A(e,a)}}finally{y=!1}}async function A(b,c){var l,m,o,u,y,z,A,B
;if(x.initialized)return;if("object"==typeof b);else{if("string"!=typeof b)return void(0,
p.Rm)("!!! RF Start Page initialization failed: wrong params");b=JSON.parse(b)}x.initialized=!0,x.mode="extension-v9",
x.extensionMode=b.extensionMode,x.isBreachMonSupported=null!==(l=b.isBreachMonSupported)&&void 0!==l&&l,
x.isPasswordAuditSupported=null!==(m=b.isPasswordAuditSupported)&&void 0!==m&&m,
x.isAccountSetupSupported=null!==(o=b.isAccountSetupSupported)&&void 0!==o&&o,
x.isDesktopAppSetupWithAccountInfoFromExtensionSupported=null!==(u=b.isDesktopAppSetupSupported)&&void 0!==u&&u,
x.isPasswordDetailsSupported=null!==(y=b.isPasswordDetailsSupported)&&void 0!==y&&y,
x.isPassgenOnStartPageSupported=null!==(z=b.isPassgenOnStartPageSupported)&&void 0!==z&&z,
x.isInAppPaymentDisabled=null!==(A=b.isInAppPaymentDisabled)&&void 0!==A&&A,
x.isSSOLoginSupported=null!==(B=b.isSSOLoginSupported)&&void 0!==B&&B,x.isUpdatePaymentPageAvailable;let C=null,D=null
;if(x.isBreachMonSupported){const b=(0,i.v)(a);await b.Init();const c=(0,k.o)();await c.Init(b,w.data),C=c}
x.isPasswordAuditSupported&&(D=(0,j.N)(a),await D.Init());let E=()=>null;let F=()=>null;x.isSSOLoginSupported&&(E=()=>(0,
g.BO)(a),F=()=>(0,h.O9)(a));const G=t.storage,H=t.storage,I=(0,n._V)((0,n.R2)(location.hash)),J=!(0,n.a8)(I,"admin-center")
;await(0,e.O)(x,a,w,w.commands,C,D,E,(()=>null),F,(()=>null),null!=c?c:null,J,H,G,f.g,(async()=>{
const{StartPageUrl:b}=await a.storage.Get({StartPageUrl:d.xC});return null!=b?b:""}),null,null,v,q,r,s)}}},
51443:function(a,b,c){"use strict"
;var d=c(43246),e=(c(260),c(53895)),f=c(95250),g=c(5971),h=c(66423),i=c(52965),j=c(5197),k=c(78440),l=c(13117);(0,
k.fI)((async()=>{const a=(0,g.pW)();try{await(0,d.r)((0,e.x)(a),(0,f.Bq)(a),(0,f.d7)(a),(0,h.k)(),(0,i.c)(),(0,j.T)())}catch(b){
(0,l.Rm)("!!! StartPage load error",b)}})())},53707:function(a,b,c){"use strict";c(34365),c(31173),c(78440),c(40371),c(4153),
c(95399),c(69893),c(13113),c(13117)},34365:function(a,b,c){"use strict";c(13117)},70289:function(a,b,c){"use strict";c(53707),
c(98539),c(13117)},54802:function(a,b,c){"use strict"},18540:function(a,b,c){"use strict";c(34365),c(54802),c(70289),c(87450),
c(79441),c(22188),c(31173),c(78440),c(69893),c(40371);var d=c(4153);c(73863),c(13117);(0,d.y8)()},57724:function(a,b,c){
"use strict";c(87450),c(31173);var d=c(79441),e=(c(18540),c(40371)),f=(c(69893),c(4153)),g=(c(78440),c(73863),c(13117))
;let h="",i="",j=1;!function(){try{Object.defineProperty(window,d.ti,{configurable:!1,enumerable:!1,writable:!1,
value:function(a){h=a.secret,i=a.domEventName,j=a.version?a.version:1}})}catch(a){(0,
g.Rm)("!!! Cannot create WebPage connection function"),Object.defineProperty(window,d.K2,{configurable:!1,enumerable:!1,
writable:!1,value:!0})}}();(0,f.y8)(),(0,e.C1)(),(0,e.C1)()},60759:function(a,b,c){"use strict";c.d(b,{r:function(){return f}})
;var d=c(20855),e=c(67793);function f(a){const b=new Set;return{IsPasswordCompromised:async function(c,f){if(b.has(c))return!0
;const g=(0,d.j8)(a),h=e.s8;await g.SetServerAddress(h);const i=await g.GetUserDataBreaches({password:c},f);let j=!1
;i&&i.length>0&&(j=i.some((a=>1===a.m_type)));j&&b.add(c);return j}}}},85e3:function(a,b,c){"use strict";c.d(b,{v:function(){
return v}})
;var d=c(65852),e=c(11834),f=c(41107),g=c(63956),h=c(32105),i=c(30045),j=c(55674),k=c(78949),l=c(62806),m=c(98266),n=c(21176),o=c(78440),p=c(88262),q=c(95399),r=c(4153),s=c(69893),t=(c(13117),
c(97514)),u=c(91764)._;function v(a,b){
const c=b,v=b.passwordGenerator,w=a.m_rf_api,x=a.m_localization,y=a.m_rf_manager,z=w.settings,A=w.options,B=w.passwordsHistory,C=a.m_http,D=a.m_rng,E=a.m_view_api,F=a.m_clipboard_cleaner,G=x.LocalizeString
;let H=null,I=null,J=null,K=null,L=null,M=null,N=null,O=null,P=null,Q=null,R=null;const S=new Map;let T=null,U=null;const V=1e3
;let W=!1,X=!1,Y=!0,Z=null,aa=null,ab=null;const ac=(0,o.tG)();let ad,ae="",af="",ag="",ah=""
;["password-generator-random-password","password-generator-passphrase"].forEach((a=>{S.set(a,function(a){switch(a){
case"password-generator-random-password":{const a=u("div",{className:"selector-item",onclick:ak},u("span",{className:"title"
},(0,g.LX)(G("PassGen_RandomPass"),"")));return v.orderSelector.appendChild(a),a}case"password-generator-passphrase":{
const a=u("div",{className:"selector-item",onclick:al},u("span",{className:"title"},(0,g.LX)(G("PassGen_Passphrase"),"")))
;return v.orderSelector.appendChild(a),a}}}(a))}));return{Activate:function(){if(W)return;W=!0,(0,g.l5)(c.files),(0,
g.l5)(v.main),az(),T||(I=(0,o.YZ)({action:aj}),(0,o.fI)(I.Execute(null)))},Deactivate:function(){if(!W)return;W=!1,T=null,(0,
g.SE)(v.main),Q&&R&&(v.main.removeChild(Q),v.main.removeChild(R))},UpdateView:function(a){a&&(X=!1);if(!W)return
;if(y.IsEditorShown())return;if(y.IsSearchResultShown())return;if(X)return;X=!0},Invalidate:function(){X=!1},
IsStillActual:function(){return W},GetIsStillActual:function(){return function(){return W}}};async function ai(){Q=function(){
const a=u("div",{className:"separator rf-progress"},u("div",{className:"rf-progress-runner hidden"}));return ad=(0,d.ZP)(a),a
}(),R=await async function(){ae=await G("PassAud_PwdStrengthStrong"),af=await G("PassAud_PwdStrengthGood"),
ag=await G("PassAud_PwdStrengthMedium"),ah=await G("PassAud_PwdStrengthWeak");const a=u("section",{
className:"rf-password-generator-container"},K=u("div",{className:"rf-password-view-and-actions","data-score":"none"},u("div",{
className:"rf-password-view-and-generate"},L=u("span",{className:"rf-generated-password"}),M=u("div",{
className:"rf-generate-password-button",onclick:an,title:await G("PassGen_Generate_Tip")})),u("div",{
className:"rf-password-view-and-actions-separator"}),u("div",{className:"rf-password-score-and-copy"},u("div",{
className:"rf-password-score"},u("div",{className:"rf-password-score-image"}),N=u("span",{className:"rf-password-score-value"
})),O=u("div",{className:"rf-copy-password-button",onclick:ap,title:await G("PassGen_Copy_Tip")
},await G("StartPage_Cmd_CopyContent")))),P=u("div",{className:"rf-password-generator-settings"}));return a}(),
v.main.append(Q,R),ad.StartIfNotStarted()}async function aj(a){await ai(),Z=await async function(){Z||(Z=(0,k.v5)(await(0,
p.$)(`pwd-dict.json?vvv=${(0,t.RD)()}`,null,C)));return Z}(),aa=await async function(){if(aa)return aa;return aa=await(0,
p.$)(`pwd-gen-words.json?vvv=${(0,t.RD)()}`,null,C),aa}();const b=[...await B.GetHistory(a)]
;Y=b.length>0?0===b[0].m_generator_type:await z.GetValue("PassGenIsWord",!0),await z.SetValue("PassGenIsWord",Y),Y?ak():al()}
function ak(){
Y&&T||(T="password-generator-random-password",(0,g.D$)((()=>am("password-generator-random-password")),az,V,(()=>ad.StartIfNotStarted)))
}function al(){
!Y&&T||(T="password-generator-passphrase",(0,g.D$)((()=>am("password-generator-passphrase")),az,V,(()=>ad.StartIfNotStarted)))}
async function am(a){const b=S.get(a);S.forEach((a=>a.classList.remove("active"))),(0,r.TT)(b).classList.add("active"),
Y="password-generator-random-password"===a,(0,g.rK)((0,r.TT)(P)),U=function(a,b,c,d,k,p,t,v){
const w=a,x=d,y=k,z=p,A=t,B=v,C=b.LocalizeString
;let D=c?(0,l.H5)():(0,l.CZ)(),E=null,F=null,G=null,H=null,I=null,J=null,K=null,L=null,M=null,N=null,O="";const P={Create:Q,
OnAfterShow:R,OnBeforeHide:S,Focus:T,Dispose:U,SetValues:V,GetValues:W,CorrectInputValues:X};return P;async function Q(){
const a="chars-number-input-startpage",b="chars-number-label-startpage";O=await C("PassGen_BitStrength");const d=c?u("div",{
className:"password-generator-settings-container"},u("div",{className:"password-generator-settings-list"},u("div",{
className:"chars-number"},u("label",{className:"setting-name-text setting-name-text-chars",
title:await C("PassGen_CharNumber_Tip"),id:b,htmlFor:a},await C("PassGen_CharNumber_Text")),E=u(h.x8,{className:"number-input",
min:1,max:512,step:1,value:D.m_length,onchange:Y,id:a,labeledById:b})),u("div",{className:"toggle-option"},u("span",{
className:"setting-name-text"},await C("PassGen_Number_Text")),F=u(h.Ig,{checked:D.m_include_digits,onchange:Z})),u("div",{
className:"toggle-option"},u("span",{className:"setting-name-text"},await C("PassGen_Upper_Text")),G=u(h.Ig,{
checked:D.m_include_upper_case_chars,onchange:aa})),u("div",{className:"toggle-option"},u("span",{className:"setting-name-text"
},await C("PassGen_Lower_Text")),H=u(h.Ig,{checked:D.m_include_lower_case_chars,onchange:ab})),u("div",{
className:"toggle-option"},u("span",{className:"setting-name-text"},await C("PassGen_UseHexChars")),K=u(h.Ig,{
checked:D.m_hex_digits_only,onchange:ai})),u("div",{className:"toggle-option"},u("span",{className:"setting-name-text"
},await C("PassGen_ExcludeSimilar_Text")),L=u(h.Ig,{checked:D.m_exclude_similar_chars,onchange:ah})),u("div",{
className:"toggle-option toggle-option-with-input",title:await C("PassGen_UseSpecial_Tip")},u("div",{className:"input-wrapper"
},u("span",{className:"setting-name-text"},await C("PassGen_Special_Text")),J=u("input",{type:"text",maxLength:30,
className:"input chars-input-identity",value:D.m_specific_chars||j.OZ,oninput:ad,onpaste:ae})),I=u(h.Ig,{
checked:D.m_include_specific_chars,onchange:ac}))),u("div",{className:"password-generator-restore-and-history"},u("a",{
className:"restore-link flat-link",onclick:aj},await C("PassGen_RestoreDefaults_Text")),M=u("div",{
className:"password-generator-history-button disabled",onclick:an},await C("PassGen_ShowHistory"))),N=u("div",{
className:"password-generator-bitstrength"})):u("div",{className:"password-generator-settings-container"},u("div",{
className:"password-generator-settings-list"},u("div",{className:"chars-number"},u("label",{
className:"setting-name-text setting-name-text-chars",title:await C("PassGen_WordsNumber_Tip"),id:b,htmlFor:a
},await C("PassGen_WordsNumber_Text")),E=u(h.x8,{className:"number-input",min:2,max:8,step:1,value:D.m_length,onchange:Y,id:a,
labeledById:b})),u("div",{className:"toggle-option toggle-option-with-input",title:await C("PassGen_UseDelim_Tip")},u("div",{
className:"input-wrapper"},u("span",{className:"setting-name-text"},await C("PassGen_WordSeparator")),J=u("input",{type:"text",
maxLength:1,className:"input chars-input-identity",value:D.m_specific_chars||j.lt,onpaste:ae,onfocus:af,onkeydown:ag
})),I=u(h.Ig,{checked:D.m_include_specific_chars,onchange:ac})),u("div",{className:"toggle-option"},u("span",{
className:"setting-name-text"},await C("PassGen_Capitalize_Text")),G=u(h.Ig,{checked:D.m_include_upper_case_chars,onchange:aa
})),u("div",{className:"toggle-option"},u("span",{className:"setting-name-text"},await C("PassGen_AddNumber")),F=u(h.Ig,{
checked:D.m_include_digits,onchange:Z}))),u("div",{className:"password-generator-restore-and-history"},u("a",{
className:"restore-link flat-link",onclick:aj},await C("PassGen_RestoreDefaults_Text")),M=u("div",{
className:"password-generator-history-button disabled",onclick:an},await C("PassGen_ShowHistory"))));return ak(),am(),d}
function R(){}function S(){}function T(){}function U(){}function V(a){const b=c?j.OZ:j.lt;(0,r.TT)(E).SetValue(a.m_length),(0,
r.TT)(F).SetChecked(a.m_include_digits),(0,r.TT)(G).SetChecked(a.m_include_upper_case_chars),(0,
r.TT)(I).SetChecked(!!a.m_specific_chars),(0,r.TT)(J).value=a.m_specific_chars||b,c&&((0,
r.TT)(H).SetChecked(a.m_include_lower_case_chars),(0,r.TT)(K).SetChecked(a.m_hex_digits_only),(0,
r.TT)(L).SetChecked(a.m_exclude_similar_chars)),D=a,am(),ak()}function W(){return D}function X(){D.m_length<1?D.m_length=c?(0,
l.H5)().m_length:(0,l.CZ)().m_length:D.m_length>j.wd&&(D.m_length=j.wd),(0,r.TT)(E).SetValue(D.m_length)}function Y(){
const a=c?(0,l.H5)().m_length:(0,l.CZ)().m_length;D.m_length=(0,r.TT)(E).GetValue()||a;try{am(),z(D,c)}catch(b){}}function Z(){
D.m_include_digits=(0,r.TT)(F).IsChecked(),am(),z(D,c)}function aa(){D.m_include_upper_case_chars=(0,r.TT)(G).IsChecked(),am(),
z(D,c)}function ab(){D.m_include_lower_case_chars=(0,r.TT)(H).IsChecked(),am(),z(D,c)}function ac(){const a=(0,
r.TT)(I).IsChecked();a?((0,r.TT)(J).removeAttribute("disabled"),(0,r.TT)(J).removeAttribute("readonly")):((0,
r.TT)(J).setAttribute("disabled","true"),(0,r.TT)(J).setAttribute("readonly","true")),D.m_include_specific_chars=a,
D.m_specific_chars=(0,r.TT)(J).value,z(D,c)}function ad(){D.m_specific_chars=(0,r.TT)(J).value,al(),am(),z(D,c)}function ae(){
setTimeout((function(){D.m_specific_chars=(0,r.TT)(J).value,c&&(al(),am()),z(D,c)}),0)}function af(){(0,r.TT)(J).select()}
function ag(a){const b=(0,r.TT)(J).value,d=a.key;b!==d&&1===d.length&&((0,r.TT)(J).value=d,D.m_specific_chars=d,z(D,c))}
function ah(){D.m_exclude_similar_chars=(0,r.TT)(L).IsChecked(),am(),z(D,c)}function ai(){D.m_hex_digits_only=(0,
r.TT)(K).IsChecked(),ak(),am(),z(D,c)}function aj(){A(c)}function ak(){(0,r.TT)(G).SetChecked(D.m_include_upper_case_chars),(0,
r.TT)(F).SetChecked(D.m_include_digits),(0,r.TT)(I).SetChecked(D.m_include_specific_chars),D.m_include_specific_chars?((0,
r.TT)(J).removeAttribute("disabled"),(0,r.TT)(J).removeAttribute("readonly")):((0,r.TT)(J).setAttribute("disabled","true"),(0,
r.TT)(J).setAttribute("readonly","true")),c&&(0,r.TT)(H).SetChecked(D.m_include_lower_case_chars),D.m_hex_digits_only?((0,
r.TT)(J).setAttribute("disabled","true"),(0,r.TT)(G).Enable(!1),(0,r.TT)(F).Enable(!1),(0,r.TT)(I).Enable(!1),c&&(0,
r.TT)(H).Enable(!1)):(D.m_include_specific_chars&&(0,r.TT)(J).removeAttribute("disabled"),(0,r.TT)(G).Enable(!0),(0,
r.TT)(F).Enable(!0),(0,r.TT)(I).Enable(!0),c&&(0,r.TT)(H).Enable(!0))}function al(){const a=(0,
l.gp)(D.m_specific_chars),b=new Set;let c="";for(const d of a)b.has(d)||(b.add(d),c+=d)
;c!==D.m_specific_chars&&(D.m_specific_chars=c,(0,r.TT)(J).value=D.m_specific_chars)}function am(){if(!c)return;let a=D.m_length
;a<1&&(a=1),a>512&&(a=512);const b=(0,n.uQ)(a,D);(0,r.TT)(N).textContent=`${O}${b.toString()}`}function an(){(0,
r.TT)(M).classList.contains("disabled")||(0,g.D$)((()=>ao()),(()=>()=>{}),0,null)}async function ao(){var a
;const b=null!==(a=C("ContextMenuAndShortcuts_RunPassHistory_Text"))&&void 0!==a?a:"",c=(0,e.BG)((0,m.p)((0,
e.IW)("rf-passwords-history-dialog",b,null),(()=>(0,i._3)((async(a,b)=>{let c,d=null;const e=new Map,h=u("div",{
className:"rf-passwords-history-wrapper"},u("span",{className:"history-clears-caution"
},await C("PassGen_PassHistory_Clears_Text")),c=u("div",{className:"passwords-history-list"}),u("div",{
className:"passwords-history-footer"},u("div",{className:"passwords-history-clear-btn",onclick:k
},await C("PassGen_ClearHistory")))),i=[...await x.GetHistory(null)];i.sort(((a,b)=>{var c,d,e,f,g,h
;const i=Math.max(a.m_time_generated_utc_secs,null!==(c=a.m_time_last_copied_utc_secs)&&void 0!==c?c:0,null!==(e=a.m_fill_history&&(null===(d=a.m_fill_history[0])||void 0===d?void 0:d.m_time_utc_secs))&&void 0!==e?e:0),j=Math.max(b.m_time_generated_utc_secs,null!==(f=b.m_time_last_copied_utc_secs)&&void 0!==f?f:0,null!==(h=b.m_fill_history&&(null===(g=b.m_fill_history[0])||void 0===g?void 0:g.m_time_utc_secs))&&void 0!==h?h:0)
;return j>i?1:j<i?-1:0}));for(const f of i){const a=u("div",{className:"passwords-history-item",onclick:()=>(0,o.fI)(j(f))
},u("span",{className:"passwords-history-item-value"},f.m_password),d=u("div",{className:"passwords-history-item-actions"
}),u("div",{className:"passwords-history-item-copy-icon"}))
;if(e.set(f,d),f.m_fill_history&&f.m_fill_history.length>0)for(const b of f.m_fill_history){m(await(0,
l.nY)(w,b.m_time_utc_secs,"fill",b.m_domain),d)}if(f.m_time_last_copied_utc_secs){m(await(0,
l.nY)(w,f.m_time_last_copied_utc_secs,"copy",null),d)}
if(!(f.m_fill_history&&0!==f.m_fill_history.length||f.m_time_last_copied_utc_secs)){m(await(0,
l.nY)(w,f.m_time_generated_utc_secs,"generate",null),d)}c.appendChild(a)}return h;async function j(a){
const b=Object.assign({},a);b.m_time_last_copied_utc_secs=(0,q.t2)(),await x.UpdatePasswordData(b,null)
;for(const c of e)if(b.m_password===c[0].m_password){const a=c[1];if((0,g.rK)((0,r.TT)(a)),
b.m_fill_history)for(const c of b.m_fill_history){m(await(0,l.nY)(w,c.m_time_utc_secs,"fill",c.m_domain),a)}m(await(0,
l.nY)(w,b.m_time_last_copied_utc_secs,"copy",null),a);break}
(0,o.fI)((0,f.sZ)(b.m_password||"",C("StartPage_PasswordCopy_Notification"),f.jG,y))}function k(){i&&0!==i.length&&(B(),(0,
g.rK)((0,r.TT)(c)),b((0,s.JS)()))}function m(a,b){if(!b)return;const c=u("span",{className:"history-action-text"},a);(0,
r.TT)(b).appendChild(c)}})))));await c.Execute(null)}}(E,x,Y,B,F,ar,as,aw),H=(0,o.YZ)({action:aq}),(0,
r.TT)(P).appendChild(await U.Create()),(0,o.fI)(H.Execute(null));const c=[...await B.GetHistory(null)];let d=!1
;if(c.length>0)for(const e of c)if(Y&&0===e.m_generator_type||!Y&&1===e.m_generator_type){d=!0,ab=e;break}
if(d)ab&&ax(ab);else try{await au(null)}catch(k){await at(),await au(null)}ay()}function an(){(0,
r.TT)(M).classList.contains("disabled")||(J=(0,o.YZ)({action:ao}),(0,g.D$)((()=>(0,
r.TT)(J).Execute(null)),az,V,(()=>ad.StartIfNotStarted)))}async function ao(a){await au(a)}function ap(){const a=(0,
r.TT)(L).textContent,b=(0,r.TT)(O).classList.contains("disabled");a&&!b&&(0,g.D$)((()=>async function(){if(!ab)return
;ab.m_time_last_copied_utc_secs=(0,
q.t2)(),(0,o.fI)((0,f.sZ)(ab.m_password||"",G("StartPage_PasswordCopy_Notification"),f.jG,F)),
await B.UpdatePasswordData(ab,null)}()),(()=>()=>{}),0,null)}async function aq(a){if(Y){const b=(0,l.H5)(),c=await A.Get({
PassGenCharNumber:b.m_length,PassGenExcludeSimilar:b.m_exclude_similar_chars,PassGenUseHexChars:b.m_hex_digits_only,
PassGenCheckUpper:b.m_include_upper_case_chars,PassGenCheckLower:b.m_include_lower_case_chars,
PassGenCheckNumber:b.m_include_digits,PassGenCheckSpecial:b.m_include_specific_chars,PassGenCharSet:b.m_specific_chars})
;a.ThrowIfShouldStop();const d={m_length:c.PassGenCharNumber,m_include_digits:c.PassGenCheckNumber,
m_include_upper_case_chars:c.PassGenCheckUpper,m_include_lower_case_chars:c.PassGenCheckLower,
m_include_specific_chars:c.PassGenCheckSpecial,m_specific_chars:c.PassGenCharSet,m_min_digits:-1,
m_hex_digits_only:c.PassGenUseHexChars,m_exclude_similar_chars:c.PassGenExcludeSimilar};(0,r.TT)(U).SetValues(d)}else{
const b=(0,l.CZ)(),c=await A.Get({PassphraseGenCharNumber:b.m_length,PassphraseGenExcludeSimilar:b.m_exclude_similar_chars,
PassphraseGenUseHexChars:b.m_hex_digits_only,PassphraseGenCheckUpper:b.m_include_upper_case_chars,
PassphraseGenCheckLower:b.m_include_lower_case_chars,PassphraseGenCheckNumber:b.m_include_digits,
PassphraseGenCheckSpecial:b.m_include_specific_chars,PassphraseGenCharSet:b.m_specific_chars});a.ThrowIfShouldStop();const d={
m_length:c.PassphraseGenCharNumber,m_include_digits:c.PassphraseGenCheckNumber,
m_include_upper_case_chars:c.PassphraseGenCheckUpper,m_include_lower_case_chars:c.PassphraseGenCheckLower,
m_include_specific_chars:c.PassphraseGenCheckSpecial,m_specific_chars:c.PassphraseGenCharSet,m_min_digits:-1,
m_hex_digits_only:c.PassphraseGenUseHexChars,m_exclude_similar_chars:c.PassphraseGenExcludeSimilar};(0,r.TT)(U).SetValues(d)}
ay()}function ar(a,b){ac.Start((async c=>{b?await z.Set({PassGenCharNumber:a.m_length,
PassGenExcludeSimilar:a.m_exclude_similar_chars,PassGenUseHexChars:a.m_hex_digits_only,
PassGenCheckUpper:a.m_include_upper_case_chars,PassGenCheckLower:a.m_include_lower_case_chars,
PassGenCheckNumber:a.m_include_digits,PassGenCheckSpecial:a.m_include_specific_chars,PassGenCharSet:a.m_specific_chars
}):await z.Set({PassphraseGenCharNumber:a.m_length,PassphraseGenExcludeSimilar:a.m_exclude_similar_chars,
PassphraseGenUseHexChars:a.m_hex_digits_only,PassphraseGenCheckUpper:a.m_include_upper_case_chars,
PassphraseGenCheckLower:a.m_include_lower_case_chars,PassphraseGenCheckNumber:a.m_include_digits,
PassphraseGenCheckSpecial:a.m_include_specific_chars,PassphraseGenCharSet:a.m_specific_chars}),c.ThrowIfShouldStop()})),ay()}
function as(){(0,g.D$)((()=>at()),az,V,(()=>ad.StartIfNotStarted))}async function at(){
Y?(await z.Remove(["PassGenCharNumber","PassGenExcludeSimilar","PassGenUseHexChars","PassGenCheckUpper","PassGenCheckLower","PassGenCheckNumber","PassGenCheckSpecial","PassGenCharSet"]),
(0,
r.TT)(U).SetValues((0,l.H5)())):(await z.Remove(["PassphraseGenCharNumber","PassphraseGenExcludeSimilar","PassphraseGenUseHexChars","PassphraseGenCheckUpper","PassphraseGenCheckLower","PassphraseGenCheckNumber","PassphraseGenCheckSpecial","PassphraseGenCharSet"]),
(0,r.TT)(U).SetValues((0,l.CZ)())),ay()}async function au(a){ab=Y?function(){(0,r.TT)(U).CorrectInputValues();const a=(0,
r.TT)(U).GetValues();return{m_password:(0,n.Zf)(a.m_length,a,D),m_generator_type:0,m_time_generated_utc_secs:(0,q.t2)()}
}():function(){(0,r.TT)(U).CorrectInputValues();const a=(0,r.TT)(U).GetValues(),b=(0,r.TT)(aa).words;return{m_password:(0,
n.e3)(a.m_length,a,b),m_generator_type:1,m_time_generated_utc_secs:(0,q.t2)()}}(),ax(ab),await B.AddPassword(ab,a)}
function av(a){if(!a)return(0,r.TT)(N).textContent="",void((0,r.TT)(K).dataset.score="none");const b=(0,k.im)(a,[],null,Z);let c
;b>75?((0,r.TT)(N).textContent=ae,c="strong"):b>50?((0,r.TT)(N).textContent=af,c="good"):b>25?((0,r.TT)(N).textContent=ag,
c="medium"):((0,r.TT)(N).textContent=ah,c="weak"),(0,r.TT)(K).dataset.score=c}function aw(){(0,g.D$)((()=>async function(){
ab=null,(0,r.TT)(L).textContent="",av(""),ay(),await B.Clear(null)}()),(()=>()=>{}),0,null)}function ax(a){(0,
r.TT)(L).textContent=a.m_password,av(a.m_password),ay()}function ay(){const a=(0,
r.TT)(L).textContent,b=document.querySelector(".password-generator-history-button");a?((0,r.TT)(O).classList.remove("disabled"),
(0,r.TT)(b).classList.remove("disabled")):((0,r.TT)(O).classList.add("disabled"),(0,r.TT)(b).classList.add("disabled"))
;const c=(0,r.TT)(U).GetValues()
;c.m_hex_digits_only||c.m_include_upper_case_chars||c.m_include_lower_case_chars||c.m_include_digits||c.m_specific_chars?(0,
r.TT)(M).classList.remove("disabled"):(0,r.TT)(M).classList.add("disabled")}function az(){
return window.addEventListener("mousedown",aB,!0),aA}function aA(){window.removeEventListener("mousedown",aB,!0),(0,
r.TT)(O).classList.remove("disabled"),(0,r.TT)(M).classList.remove("disabled"),ad.Stop()}function aB(a){a.preventDefault(),
a.stopPropagation(),(0,r.TT)(O).classList.add("disabled"),(0,r.TT)(M).classList.add("disabled")}}},37156:function(a,b,c){
"use strict";c.d(b,{X:function(){return f}});c(60954),c(57724),c(22188),c(78440);var d=c(13113),e=c(4153);c(69893),c(13117)
;function f(a){var b,c;const f=a.type?{"payment-page":a.action,"product-type":a.type}:{"payment-page":a.action
},g=a.urlParams?(0,d.HT)(a.urlParams):"",h=`${window.location.origin+window.location.pathname}${g?`?${g}`:""}#${(0,
d.HT)(f)}`,i=(0,d.vN)(window.location.href),j=(0,d._V)((0,d.TG)(null!==(b=null==i?void 0:i.m_extra)&&void 0!==b?b:"")),k=(0,
e.XM)(null!==(c=a.urlParams)&&void 0!==c?c:{},j);window.location.replace(h),k&&window.location.reload()}},76259:function(a,b,c){
"use strict";c.d(b,{g:function(){return d}})
;const d=["login-page-bg-1.jpg","login-page-bg-2.jpg","login-page-bg-3.jpg","login-page-bg-4.jpg","login-page-bg-5.jpg","login-page-bg-6.jpg","login-page-bg-7.jpg","login-page-bg-8.jpg","login-page-bg-9.jpg","login-page-bg-10.jpg","login-page-bg-11.jpg","login-page-bg-12.jpg","login-page-bg-13.jpg","login-page-bg-14.jpg"]
},63452:function(a,b,c){"use strict";c(58863),c(25116),c(21217),c(2346),c(15482),c(6353),c(36029),c(3846),c(76853),c(30526),
c(14755),c(41808),c(42244),c(43503),c(24713),c(26781),c(74072),c(47974),c(38664),c(42609),c(51796),c(20958),c(1597),c(41656),
c(85122),c(14497),c(31586),c(59212),c(15422),c(775),c(89257),c(30588),c(57837),c(81465),c(73627),c(90942),c(21625),c(90292),
c(67857),c(4181),c(31733),c(82755),c(7299),c(40260),c(78143),c(48017),c(27641),c(19865),c(36205),c(44760),c(68741),c(58496),
c(88502),c(54730),c(15153),c(25507),c(22744),c(85726),c(34732),c(89398),c(53306),c(48374),c(19921),c(18927),c(78920),c(87492),
c(31913),c(23870),c(54369),c(61817),c(24034),c(23869),c(70712),c(83374),c(41388),c(86379),c(53022),c(14816),c(18735),c(27402),
c(5540),c(28737),c(13083),c(65012),c(25921),c(37604),c(25148),c(80275),c(98550),c(2672),c(91505),c(77353),c(41836),c(58004),
c(54640),c(77079),c(49788),c(20796),c(38456),c(36915),c(85163),c(1191),c(53867),c(91953),c(64085),c(18144),c(44119),c(96779),
c(21491),c(40216),c(15272),c(48486),c(8818),c(99007),c(19135),c(39971),c(77534),c(64293),c(16670),c(61633),c(12711),c(28486),
c(24995),c(88132),c(1052),c(65496),c(83033),c(65180),c(90969),c(21421),c(51367),c(81753),c(99925),c(7842),c(54498),c(54564),
c(40912),c(15943),c(87108),c(38870),c(35441),c(71523),c(89476),c(10562),c(51043),c(82060),c(83712),c(81518),c(36914),c(47264),
c(32816),c(73806),c(85683),c(67644),c(79119),c(28469),c(24478),c(16337),c(82759),c(20349),c(36980),c(64192),c(12049),c(3329),
c(54715),c(38162),c(18267),c(53957),c(12454),c(27113),c(90957),c(45691),c(96601),c(6825),c(9269),c(8578),c(66043),c(4473),
c(38779),c(11422),c(50471),c(1982),c(24382),c(7863),c(18516),c(45788),c(56907),c(76768),c(47808),c(10659),c(20589),c(60734),
c(90185),c(3364),c(91986),c(15096),c(9335),c(17037),c(24403),c(9403),c(89993),c(84166),c(10529),c(40944),c(41104),c(54011),
c(66069),c(58262),c(99848),c(22275),c(8251),c(31750),c(91424),c(50750),c(57188),c(43667),c(11),c(97226),c(82288),c(64891),
c(5085),c(49651),c(90579),c(41955),c(72757),c(52663),c(66721),c(71577),c(59748),c(54163),c(39545),c(38538),c(48771),c(25385),
c(48762),c(29491),c(77324),c(99635),c(87400),c(412),c(57214),c(10119),c(13018),c(62703),c(2882),c(19548),c(18796),c(15712),
c(80323),c(11677),c(84676),c(28144),c(3626),c(75576),c(6247),c(53848),c(68809),c(96886),c(68409),c(90886),c(57034),c(59108),
c(36724),c(38715),c(5848),c(20271),c(26009),c(21621),c(85994),c(14172),c(21009),c(16276),c(59051),c(69492),c(3409),c(36462),
c(65421),c(21813),c(6399),c(65864),c(94782),c(61410),c(99457),c(58322),c(73374),c(25019),c(36078),c(21736),c(51350),c(45919),
c(53484),c(18370),c(45337)},42160:function(a,b,c){"use strict";c.d(b,{r:function(){return n}})
;var d=c(41107),e=c(11834),f=c(65852),g=c(38221),h=c(19365),i=c(47333),j=c(32105),k=c(78440),l=c(97514),m=c(91764)._
;function n(a,b,c,n,o,p,q,r,s,t,u){const v=u.LocalizeString,w=r,x=o().AccountEnterprise,y=p().SelfHostedServer;(0,k.fI)((0,
d.zK)(a.rfo,a.service,a.enterprise||null,a.options,u,w.account));const z=(0,d.Kw)();z.AddCommand({cmdCommand:"manual",
cmdCaption:v("Cmd_Help_Manual_Key"),cmdCssClass:"rf-account-manual-item",cmdShowImage:!1,cmdAction:()=>{const a=(0,
i.nF)("manual",s.platformOs);(0,k.fI)(t.OpenUrl({url:a,newTab:!0,reuseExisting:!1},null))}}),z.AddCommand({cmdCommand:"faq",
cmdCaption:v("Cmd_Help_FaqAll_Key"),cmdCssClass:"rf-account-faq-item",cmdShowImage:!1,cmdAction:()=>{(0,k.fI)(t.OpenUrl({
url:i.qP,newTab:!0,reuseExisting:!1},null))}}),z.AddCommand({cmdCommand:"help-center",cmdCaption:v("Cmd_Help_HelpCenter_Key"),
cmdCssClass:"rf-account-help-center-item",cmdShowImage:!1,cmdAction:()=>{(0,k.fI)(t.OpenUrl({url:i.f6,newTab:!0,reuseExisting:!1
},null))}}),y||(z.AddSeparator(),z.AddCommand({cmdCommand:"contact-support",cmdCaption:v("Cmd_Help_ContactSupport_Key"),
cmdCssClass:"rf-account-contact-support-item",cmdShowImage:!1,cmdAction:()=>{(0,k.fI)(b.ContactSupport({
reportType:"ContactSupport"},null))}})),z.AddSeparator(),z.AddCommand({cmdCommand:"about",cmdCaption:v("StartPage_About"),
cmdCssClass:"rf-account-about-item",cmdShowImage:!1,cmdAction:()=>{
const a="extension-legacy"===s.mode?"":s.mode,b=[`${s.staging?`${(0,h.U)()}, built ${(0,l.RD)()}`:`${(0,
h.U)()}`}${a?", "+a:""}`];(0,k.fI)((0,e.qR)(v("StartPage_Version",b),v("StartPage_Tutorial"),v("StartPage_DialogButton_Ok")))}})
;const A=(0,d.Kw)();let B;A.AddCommand({cmdCommand:"dark-theme",cmdCaption:v("StartPage_DarkMode"),
cmdCssClass:"rf-account-theme-item",cmdShowImage:!0,cmdDoNotHideOnAction:!0,cmdAddElem:a=>{(0,k.fI)((async()=>{
const b=await q.GetValue("StartPage.Theme",(0,g.Cj)()),c=w.main;let d=!1;"dark"===b?d=!0:"light"===b&&(d=!1),
d?(c.classList.remove("light-theme"),c.classList.add("dark-theme")):(c.classList.remove("dark-theme"),
c.classList.add("light-theme")),B=m(j.Ig,{checked:d}),a.appendChild(B)})())},cmdAction:a=>{const b=a.target,c=null!==(0,
g.LP)(b,".toggle");let d=B.IsChecked();c||(d=!d,B.SetChecked(d));const e=w.main;let f;d?(e.classList.add("dark-theme"),
e.classList.remove("light-theme"),f="dark"):(e.classList.add("light-theme"),e.classList.remove("dark-theme"),f="light"),(0,
k.fI)(q.SetValue("StartPage.Theme",f))}}),A.AddCommand({cmdCommand:"settings",cmdCaption:v("StartPage_Settings"),
cmdCssClass:"rf-account-settings-item",cmdShowImage:!0,cmdAction:()=>{
"extension-legacy"!==s.mode?n.OnSelectCategory("category-settings"):(0,k.fI)(b.ShowDesktopOptionsDialog(0))}}),A.AddCommand({
cmdCommand:"admin-center",cmdCaption:v("Cmd_Sync_OpenAdminCenter"),cmdCssClass:"rf-account-admin-center-item",cmdShowImage:!0,
cmdAction:()=>{(0,k.fI)((async()=>{const c=await a.service.GetRoboFormAccountInfo(null);await b.OpenAdminCenter({startPage:(0,
f.vj)(),companyCreatedTime:null==c?void 0:c.createdTime},null)})())}}),A.AddCommand({cmdCommand:"import",
cmdCaption:v("Cmd_RunImport_Flat"),cmdCssClass:"rf-import-item",cmdShowImage:!0,cmdAction:()=>{(0,k.fI)(c.Import())}}),
A.AddSeparator(),x||y||s.isInAppPaymentDisabled||(A.AddCommand({cmdCommand:"upgrade",cmdCaption:v("Cmd_License_BuyNow"),
cmdCssClass:"rf-account-upgrade-item rf-command-upgrade",cmdShowImage:!0,cmdAction:()=>{(0,k.fI)(n.OnUpgrade())}}),
A.AddCommand({cmdCommand:"referral",cmdCaption:v("Cmd_RenewalRewards_Flat"),cmdCssClass:"rf-account-referral-item",
cmdShowImage:!0,cmdAction:()=>{(0,k.fI)(b.OpenRFOPage(null,i.Uq,{newTab:!0},null))}})),A.AddCommand({cmdCommand:"help",
cmdCaption:v("Cmd_Help_Flat"),cmdCssClass:"rf-account-help-item",cmdShowImage:!0,cmdSubmenu:z}),A.AddSeparator(),A.AddCommand({
cmdCommand:"logout",cmdCssClass:"rf-account-logout-item rf-command-logout",cmdShowImage:!0,cmdCaption:v("StartPage_LogOut"),
cmdAction:()=>{(0,k.fI)(c.RoboFormLogout())}}),(0,d.O8)({dropdownHandlerEl:w.account.box,dropdownPopupEl:w.account.menu,
dropdownModalScreenEl:w.account.modalScreen,commands:A,onShow:async()=>{A.ShowCommand("dark-theme",!0),
A.ShowCommand("settings",!0),(0,d.DP)(!1);const a=p().DisableLogoff;A.ShowCommand("logout",!a)
;const b=await n.ShouldShowUpgradePromo();A.ShowCommand("upgrade",b)
;const c=o().AccountEnterprise&&(o().AccountCompanyAdmin||o().AccountGroupManager)||!1;A.ShowCommand("admin-center",c)}})}},
47048:function(a,b,c){"use strict";c.d(b,{B:function(){return s}})
;var d=c(37367),e=c(48658),f=c(36786),g=c(4601),h=c(41107),i=c(38221),j=c(47333),k=c(54811),l=c(4234),m=c(63956),n=c(4153),o=c(13113),p=c(69893),q=c(78440),r=c(13117)
;function s(a,b,c){const s=c,t=s.LocalizeString;let u=!1,v=!1
;const w=a,x=a.m_rf_manager,y=w.m_rf_api.policies,z=a.m_rf_data_popular,A=a.m_data_item_display_name_provider,B=a.m_initial_identity_provider,C=a.m_rf_cached_data_info,D=a.m_rf_page_status,E=b,F=[E.createItem,E.actualItem,E.categoryItem]
;let G=[],H=null,I=null;const J=(0,q.E5)(),K=(0,e.nj)("actual-identity",L);if(F.forEach((a=>{a.addEventListener("click",(a=>{
const b=a.target,c=b.classList.contains("rf-actual-identity")||null!==(0,i.Yw)(b,".rf-actual-identity");if(I){
if(b.classList.contains("rf-item-menu"))return;const c={path:l.xG,type:5};x.OnOpenEditor(c,!1,!1,(0,g.l7)(a))
}else if(0===G.length)(0,q.fI)((async()=>{try{const a=await N();await w.OnNew(a)}catch(a){}})());else if(null!==H&&c){
if(b.classList.contains("rf-item-menu"))return;x.OnOpenEditor(H,!1,!1,(0,g.l7)(a))
}else x.OnSelectItemTypeFilter("item-type-filter-identities")}))})),(0,i.sj)(E.actualItem,(a=>{const b=a.target
;H&&!b.classList.contains("rf-item-menu")&&x.OnOpenEditor(H,!1,!1,!0)
})),(0,h.YC)("#v8 .identity-select.rf-create-identity .select-title",t("StartPage_Create_Identity_Tip")),D.staging){
const a=["KeyI","KeyI","KeyI"];let b=[];document.addEventListener("keydown",(c=>{
if(c.code===a[b.length]&&c.altKey&&c.shiftKey&&c.ctrlKey){if(b.push(a[b.length]),(0,n.Fu)(b,a)){if(b=[],!u)return;if(I)return
;H&&(0,q.fI)((0,d.DR)(H,w.m_ui_commands,x,s))}}else b.length>0&&(b=[])}))}return{Activate:function(){if(u)return;u=!0},
Deactivate:function(){if(!u)return;u=!1},UpdateView:function(){if(!u)return;return void(0,q.fI)(async function(){try{
const a=await async function(a){let b=[],c=!1;try{await a.UpdateData((async(a,d,e)=>{
if(d&&0!==d.length&&(b=b.concat(d.filter((a=>5===a.type))),b.length>1))throw c=!0,(0,p.JS)()}),null)}catch(d){if(!c)throw d}
return b}(K),b=await async function(a){if(0===a.length)return null;const b=a[0];if(1===a.length)return d(b);try{
await z.Update("get-my-identity",null,null)}catch(e){return d(b)}const c=z.GetData()||[]
;for(const f of c)if(5===f.type)return d(f);return d(b);async function d(a){return C.FetchDataInfo(a.path,!0)}}(a);if(G=a,b)H=b,
I=null;else{if(await(0,k.h$)(y)){const a=await B.GetInitialIdentity(null);H=null,I=a}else H=null,I=null}v=!0,
G.length<2&&"category-folders"===x.GetCategory()&&"item-type-filter-identities"===x.GetItemTypeFilter()&&x.OnSelectItemTypeFilter("item-type-filter-all"),
F.forEach((a=>{(0,m.SE)(a)})),I?(P(),await O()):0===G.length?await M():1===G.length?(P(),H&&await O()):(P(),H&&await O(),(0,
m.l5)(E.categoryItem)),x.GetController(1).UpdateScrollMode()}catch(a){(0,p.r5)(a,p.ut)?x.ScheduleUpdateViewsAfterError():(0,
r.Rm)("!!! Actual Identity View: cannot get identities",a)}}())},Invalidate:()=>{v=!1},IsStillActual:L,
GetIsStillActual:function(){return L},UpdateCreateIdentity:M};function L(){return u}async function M(){if(a())try{
if(await J.Execute({action:N},null),!a())return;P(),(0,m.l5)(E.createItem)}catch(b){if((0,p.r5)(b,p.kd))return;if(!a())return
;!function(){const a=E.section;(0,m.SE)(a)}()}else;function a(){return u&&v&&0===G.length&&!I}}async function N(){try{
return await(0,f.YO)("new-identity","",c),""}catch(a){const b="category-folders"===x.GetCategory()&&x.GetFolder()||""
;if(""!==b){let a=(0,o.Y0)(b);return a=""===a?b:a,await(0,f.YO)("new-identity",a,c),a}throw a}}async function O(){
const a=E.actualItem;if(I){(0,m.l5)(a);const b=I,c=await(0,j.D5)(b,{},s);E.actualItemName.textContent=c
;const d=E.actualItemImage;(0,g.EI)(c,"",d,d),E.actualItemSharing&&(E.actualItemSharing.remove(),E.actualItemSharing=null)}else{
if(!H)return;{(0,m.l5)(a);const b=H;if(0===(0,l.Wi)(b.path).type){(0,h.YC)(a,t("StartPage_Category_Tip_Identity",[(0,
l.em)(b.path)])),E.actualItemName.textContent=(0,l.em)(b.path);const c=E.actualItemImage;(0,g.EI)(b.path,b.path,c,c)}else{
const a=await A.GetDisplayNameByPath(b.path,null);E.actualItemName.textContent=a;const c=E.actualItemImage;(0,
g.EI)(a,b.path,c,c)}E.actualItemSharing?(0,g.bv)(a,b):(E.actualItemSharing=(0,g.sj)(b,!0),a.appendChild(E.actualItemSharing))}}
if(null===E.actualItemMenu){const b=document.createElement("div");(0,h.YC)(b,t("StartPage_MoreActions_Tip")),
b.classList.add("rf-item-menu","rf-cmdbutton","auto-hide"),b.addEventListener("click",(()=>{if(I){const c=(0,i.VC)(b);(0,
q.fI)((0,g.KR)(I,a,{clientX:c.left,clientY:c.top+b.offsetHeight}))}else if(H){const c=(0,i.VC)(b);(0,q.fI)((0,g.j1)(H,a,{
clientX:c.left,clientY:c.top+b.offsetHeight}))}})),a.addEventListener("contextmenu",(b=>(I?(0,q.fI)((0,g.KR)(I,a,(0,
h.Eo)(b))):H&&(0,q.fI)((0,g.j1)(H,a,(0,h.Eo)(b))),b.preventDefault(),!1))),E.actualItemMenu=b,a.appendChild(b)}}function P(){
const a=E.section;(0,h.YC)(a,t("StartPage_Category_Tip_Identities")),(0,m.l5)(a),(0,
q.C)((()=>x.GetController(1).UpdateScrollMode()))}}},1871:function(a,b,c){"use strict";c.d(b,{Z:function(){return n},
i:function(){return o}});var d=c(4601),e=c(41107),f=c(38221),g=c(65852),h=c(31173),i=c(63956),j=c(78440),k=c(69893),l=c(4153)
;c(13117);function m(a){return"section-title"===a.type}function n(a){
const b=a.m_get_is_still_actual,c=a.m_items_list,e=a.m_data_item_display_name_provider,k=(0,
g.ZP)(a.m_progress_indicator),n=a.m_rf_cached_data_info,o=a.m_on_finish_update,p=a.m_show_all_items;let q,r,s=0;const t=new Map
;let u=[],v=-1,w=-1;const x=(0,l.TT)(document.querySelector("#v8 .rf-data-view .rf-no-items")),y=(0,
l.TT)(document.querySelector("#v8 .rf-data-view .rf-data"));if(y.addEventListener("scroll",(()=>A(c,!1))),
window.addEventListener("resize",(()=>A(c,!1))),window.ResizeObserver){new ResizeObserver((()=>A(c,!1))).observe(c)}const z={
StartUpdate:function(a){const b=q!==a.m_view_id;q=a.m_view_id,r=a.m_data_item_appearence_rules,b&&D()
;const d=c.querySelector(".rf-add-new-item");null!==d&&d.remove();(0,i.SE)(x),s=y.scrollTop,t.forEach((a=>{a.invalidated=!0})),
u=[],v=-1,w=-1,k.StartIfNotStarted()},UpdateItems:function(a){const b=a.m_items_in_folders_count||{};if(q!==a.m_view_id)return
;u=[];for(const c of a.m_items){const a=c.path;if(m(c))continue;const d=n.GetDataInfo(a)||c;let e=t.get(a);e?(e.uptodate=!1,
e.invalidated=!1,e.item_info=d,e.items_in_folder_count=b[a]):(e={path:a,item_info:d,items_in_folder_count:b[a],elem:null,
uptodate:!1,invalidated:!1},t.set(a,e)),u.push(e)}A(c,!0),a.m_preserve_scroll_position&&s?y.scrollTop=s:y.scrollTop=0
;k.ScheduleStop(500)},FinishUpdate:function(a){if(q!==a.m_view_id)return;E(),(0,j.fI)((0,
d.XV)(c,(async a=>e.GetDisplayNameByPath(a,null)),(()=>q===a.m_view_id))),(0,j.fI)(b()),
a.m_not_final?k.ScheduleStop(500):k.Stop();return;async function b(){const b=u.length,e=a.m_total_shown_items_number||b
;if(0===e&&!0!==a.m_not_final){const b=await(0,d.w8)();if(q!==a.m_view_id)return;if(b)return(0,i.l5)(x),void await(0,
d.y4)(c,y.offsetHeight,!0)}if(e>0&&(0,i.l5)((0,l.TT)(document.querySelector("#v8 .rf-data-view .rf-data-view-header"))),
!0!==a.m_not_final&&((0,i.SE)(x),await(0,d.y4)(c,y.offsetHeight,!1)),a.m_select_item){const b=a.m_select_item.path;(0,
j.C)((()=>function(a){let b=-1;for(let c=0;c<u.length;++c)if(u[c].path===a){b=c;break}if(-1===b)return
;const d=C(c),e=Math.floor(b/d.items_per_line)*d.item_height;y.scrollTop=e,A(c,!1);const f=u[b].elem
;null!==f&&(f.classList.add("selected"),setTimeout((()=>{f.classList.remove("selected")}),3e3))}(b)))}o&&o(b)}},
RemoveAllElements:D};return z;function A(a,b){if(0===a.clientWidth)return;if(p||r.fixed_items_per_line)return v=0,w=u.length-1,
void(b&&B());const c=C(a);let d=a.querySelector(".virtual-list-scroller");null===d&&(d=document.createElement("div"),
d.classList.add("virtual-list-scroller"),
a.appendChild(d)),d.style.height=(0,h.Md)(c.item_height*Math.ceil(u.length/c.items_per_line))
;const e=Math.floor(y.scrollTop/c.item_height),f=Math.floor((y.scrollTop+c.viewport_height)/c.item_height),g=e*c.items_per_line,i=Math.min(u.length-1,(f+1)*c.items_per_line-1),j=i-g+1,k=Math.max(0,g-j),l=Math.min(u.length-1,i+j)
;(b||v!==k||w!==l)&&(v=k,w=l,B())}function B(){for(let e=0;e<u.length;++e){const h=u[e]
;e<=w?(null===h.elem?h.elem=(a=h.item_info,
g=h.items_in_folder_count,(0,d.ef)(a,r.image_size,b(),g)):h.uptodate||H(h.elem,h.item_info,h.items_in_folder_count),
h.uptodate=!0,G(h),(0,f.k)(c,h.elem,e)):F(h)}var a,g;(0,j.fI)((0,d.XV)(c,(async a=>e.GetDisplayNameByPath(a,null)),b()))}
function C(a){const b=a.clientWidth,c=Math.floor((0,f.VC)(y).top),d=window.innerHeight-c-38;let e=r.default_item_outer_width
;r.fixed_items_per_line&&(e=Math.floor(b/r.fixed_items_per_line));const g=r.default_item_outer_height
;let h=Math.max(1,Math.floor(b/e));return r.fixed_items_per_line&&(h=r.fixed_items_per_line),{viewport_width:b,
viewport_height:d,item_width:e,item_height:g,items_per_line:h}}function D(){(0,f.Nt)(c),t.clear(),u=[]}function E(){
t.forEach((a=>{var b;a.invalidated&&(F(a),null===(b=a.elem)||void 0===b||b.setAttribute("data-invalidated","true"))}))}
function F(a){var b;null!==a.elem&&((0,i.SE)(a.elem),null===(b=a.elem)||void 0===b||b.removeAttribute("data-invalidated"))}
function G(a){var b;null!==a.elem&&((0,i.l5)(a.elem),null===(b=a.elem)||void 0===b||b.removeAttribute("data-invalidated"))}
function H(a,c,e){(0,d.Td)(a,c,r.image_size,b(),e)}}function o(a){
const b=a.m_get_is_still_actual,c=a.m_data_item_display_name_provider,f=a.m_items_list,h=(0,
g.ZP)(a.m_progress_indicator),n=a.m_on_finish_update;let o;const p=(0,e.wj)({elem:f,itemHeight:50,itemsListTopPadding:50,
alwaysSelectFirstItem:!1,onScrollEvent:()=>{(0,e.DN)(f)&&(0,e.b2)(!1)},onViewportItemsUpdated:function(){
const a=f.querySelector(".rf-add-new-item");if(null!==a){const b=a.nextElementSibling
;b&&b.classList.contains("rf-list-item-row")&&(a.remove(),(0,l.TT)(f.querySelector(".rf-virt-list-viewport")).appendChild(a))}}
});let q=[],r=0;const s={StartUpdate:function(a){const b=o!==a.m_view_id;o=a.m_view_id,b&&t();(0,i.SE)((0,
l.TT)(document.querySelector("#v8 .rf-data-view .rf-no-items")));const c=f.querySelector(".rf-add-new-item")
;null!==c&&c.remove();(0,d.RN)(f),r=f.scrollTop,h.StartIfNotStarted()},UpdateItems:function(a){
const c=a.m_items,g=a.m_items_in_folders_count||{};if(o!==a.m_view_id)return;const h=c.map((a=>a.path))
;q=q.filter((a=>h.includes(a.path)));let i=l("");for(let b=0;b<c.length;b++){const a=c[b];i++;const d=l(a.path)
;-1===d?q.splice(i,0,a):d!==i&&(q.splice(d,1),d<i&&i--,q.splice(i,0,a))}p.UpdateItems({items:q.map((a=>a.path)),
CreateItem:function(a){let c=null;const f=j(a);if(f&&(c=function(a,c){let f=null;!function(a){return!m(a)
}(a)?m(a)&&"section-title"===a.type&&(f=document.createElement("div"),f.classList.add("rf-section-title"),(0,
e.$9)(f,a.title)):f=(0,d.Ip)(a,"img32",(()=>b()()&&p.IsItemReal(a.path)),c,!0);if(!f)return null;return f}(f,g[a])),!c)throw(0,
k.ZU)(k.V2,"Cannot create item element");return c},UpdateItem:function(a,c){const e=j(a);e&&function(a,c,e){if(m(a))return;(0,
d.Td)(c,a,"img32",(()=>b()()&&p.IsItemReal(a.path)),e)}(e,c,g[a])},DeleteItem:function(a){(0,d.Pi)(a)}}),
a.m_preserve_scroll_position&&r&&(f.scrollTop=r);return;function j(a){for(let b=0;b<q.length;++b)if(q[b].path===a)return q[b]
;return null}function l(a){for(let b=0;b<q.length;++b)if(q[b].path===a)return b;return-1}},FinishUpdate:function(a){
if(o!==a.m_view_id)return;(0,j.fI)((0,d.XV)(f,(async a=>c.GetDisplayNameByPath(a,null)),(()=>o===a.m_view_id))),(0,j.fI)(b()),
a.m_not_final?h.ScheduleStop(500):h.Stop();return;async function b(){if(0===q.length&&!0!==a.m_not_final){const b=await(0,
d.w8)();if(o!==a.m_view_id)return;if(b){(0,i.l5)((0,l.TT)(document.querySelector("#v8 .rf-data-view .rf-no-items"))),await(0,
d.y4)((0,l.TT)(f.querySelector(".rf-virt-list-viewport")),f.offsetHeight-50,!0);const a=f.querySelector(".rf-list-item-header")
;return void(a&&a.remove())}}
if(q.length>0&&(0,i.l5)((0,l.TT)(document.querySelector("#v8 .rf-data-view .rf-data-view-header"))),
!0!==a.m_not_final&&(await(0,d.y4)((0,l.TT)(f.querySelector(".rf-virt-list-viewport")),f.offsetHeight-50,!1),(0,d.gt)()),
a.m_select_item){const b=a.m_select_item.path;p.Select(b),setTimeout((()=>{p.Deselect(b)}),3e3)}n(q.length)}},
RemoveAllElements:t};return s;function t(){q=[];const a=f.querySelector(".rf-add-new-item");null!==a&&a.remove()}}},
84428:function(a,b,c){"use strict";c.d(b,{F:function(){return w}})
;var d=c(48658),e=c(83645),f=c(1871),g=c(4601),h=c(11834),i=c(41107),j=c(38221),k=c(65852),l=c(98266),m=c(4234),n=c(54811),o=c(31173),p=c(63956),q=c(13113),r=c(4153),s=c(78440),t=c(73863),u=c(69893),v=(c(13117),
c(91764)._);function w(a,b){const c=a.m_localization,e=c.LocalizeString;let k=!1,q=!1
;const w=a,z=a.m_rf_manager,A=a.m_rf_cached_data_info,B=a.m_rf_items_existance,C=a.m_data_item_display_name_provider,D=a.m_start_page_preferences,E=b,F=b.dataItems,G=a.m_rf_api.sharing,H=(0,
s.tG)(),I=(0,s.tG)(),J=(0,s.h1)(),K=(0,s.h1)();let L,M=[],N=[],O="rf-view-large",P="",Q="",R="",S=null;const T=(0,f.Z)({
m_get_is_still_actual:ad,m_items_list:ae("data-items-section-main").items,m_progress_indicator:F.progress,
m_rf_cached_data_info:A,m_data_item_display_name_provider:C,m_on_finish_update:ak,m_show_all_items:!1}),U=(0,f.i)({
m_get_is_still_actual:ad,m_data_item_display_name_provider:C,m_items_list:ae("data-items-section-main-list-view").items,
m_progress_indicator:F.progress,m_on_finish_update:ak}),V=(0,f.Z)({m_get_is_still_actual:ad,
m_items_list:ae("data-items-section-shared-folders").items,m_progress_indicator:F.progress,m_rf_cached_data_info:A,
m_data_item_display_name_provider:C,m_show_all_items:!0}),W=(0,f.Z)({m_get_is_still_actual:ad,
m_items_list:ae("data-items-section-groups").items,m_progress_indicator:F.progress,m_rf_cached_data_info:A,
m_data_item_display_name_provider:C,m_show_all_items:!0}),X=(0,f.Z)({m_get_is_still_actual:ad,
m_items_list:ae("data-items-section-shared-files").items,m_progress_indicator:F.progress,m_rf_cached_data_info:A,
m_data_item_display_name_provider:C,m_show_all_items:!0}),Y=new Map;Y.set("pinned-view",x({m_view_id:"pinned-view",
m_data_items_list:T,m_subfolders:!0,m_get_data:()=>w.m_rf_data_pinned,
m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,m_is_still_actual:ad("pinned-view")})),
Y.set("popular-view",x({m_view_id:"popular-view",m_data_items_list:T,m_subfolders:!0,m_get_data:()=>w.m_rf_data_popular,
m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,m_is_still_actual:ad("popular-view")})),
Y.set("popular-list-view",x({m_view_id:"popular-list-view",m_data_items_list:U,m_subfolders:!0,
m_get_data:()=>w.m_rf_data_popular,m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,
m_is_still_actual:ad("popular-list-view")})),Y.set("recent-view",x({m_view_id:"recent-view",m_data_items_list:T,m_subfolders:!0,
m_get_data:()=>w.m_rf_data_recent,m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,
m_is_still_actual:ad("recent-view")})),Y.set("recent-list-view",x({m_view_id:"recent-list-view",m_data_items_list:U,
m_subfolders:!0,m_get_data:()=>w.m_rf_data_recent,m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,
m_is_still_actual:ad("recent-list-view")})),Y.set("one-folder-view",x({m_view_id:"one-folder-view",m_data_items_list:T,
m_subfolders:!0,m_get_data:a=>w.AllItemsPerFolderData(a),m_get_folder_items_count:B.GetItemsCount,
m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,m_is_still_actual:ad("one-folder-view")})),
Y.set("one-folder-list-view",x({m_view_id:"one-folder-list-view",m_data_items_list:U,m_subfolders:!1,
m_get_data:a=>w.AllItemsPerFolderData(a),m_get_folder_items_count:B.GetItemsCount,
m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,m_is_still_actual:ad("one-folder-list-view")})),
Y.set("authenticator-view",x({m_view_id:"authenticator-view",m_data_items_list:U,m_subfolders:!0,
m_get_data:()=>a.m_rf_data_totp,m_schedule_update_views_after_error:z.ScheduleUpdateViewsAfterError,
m_is_still_actual:ad("authenticator-view")})),Y.set("sharing-center-view",function(a){
const b=a.view_id,c=a.data_collector,d=a.showDataItemsSection,e=a.shared_folders_data_items_list,f=a.shared_files_data_items_list,g=a.groups_data_items_list,h=(0,
r.y8)();let i,j=h.GetNext(),k="sharing-center-shared-with-me",l=[],m=[],n=[];const o={UpdateView:p,
GetAllShownItems:()=>l.concat(m,n)};return o;function p(a){i=a.data_item_appearence_rules||i,k=a.sort_order||k
;const o=j=h.GetNext();l=[],m=[],n=[];const p=b+"--shared-folders--"+k,q=b+"--groups--"+k,r=b+"--shared-files--"+k
;return void c.UpdateData(s,null).then((()=>{t(),d("data-items-section-shared-files",l.length>0)})).catch((a=>{(0,u.r5)(a,u.kd),
o===j&&t()}));async function s(b,c,h,j){const o=""===b;let s=!1;for(let a=0;a<c.length;a++){const b=c[a]
;(o&&b.sharedFolder||b.sharedFile)&&(await y(b,k)&&(b.sharedFile?(l.push(b),
s=!0):o&&(b.sharedGroup?m.push(b):b.sharedFolder&&n.push(b))))}o&&(v(p,"data-items-section-shared-folders",e,n),
v(q,"data-items-section-groups",g,m),f.StartUpdate({m_view_id:r,m_data_item_appearence_rules:i})),
s&&(d("data-items-section-shared-files",l.length>0),f.UpdateItems({m_view_id:r,m_items:l,
m_preserve_scroll_position:a.preserve_scroll_position}))}function t(){f.FinishUpdate({m_view_id:r,
m_total_shown_items_number:l.length+m.length+n.length})}function v(b,c,e,f){d(c,f.length>0),0!==f.length&&(e.StartUpdate({
m_view_id:b,m_data_item_appearence_rules:i}),e.UpdateItems({m_view_id:b,m_items:f,
m_preserve_scroll_position:a.preserve_scroll_position}),e.FinishUpdate({m_view_id:b,m_not_final:!0}))}}}({
view_id:"sharing-center-view",data_collector:(0,d.nj)("sharing-center",ad("sharing-center-view")),showDataItemsSection:af,
shared_folders_data_items_list:V,shared_files_data_items_list:X,groups_data_items_list:W})),
Y.set("sharing-center-list-view",function(a){
const b=a.localization,c=b.LocalizeString,d=a.view_id,e=a.data_items_list,f=a.data_collector,g=a.showDataItemsSection,h=(0,
r.y8)();let i=h.GetNext(),j="sharing-center-shared-with-me",k=[],l=[],m=[];const n={UpdateView:o,
GetAllShownItems:()=>k.concat(l,m)};return n;function o(a){j=a.sort_order||j;const b=i=h.GetNext(),n=d+j;let o=[];return k=[],
l=[],m=[],void f.UpdateData(p,null).then((()=>{q(),g("data-items-section-main-list-view",o.length>0)})).catch((a=>{(0,
u.r5)(a,u.kd),b===i&&(q(),g("data-items-section-main-list-view",o.length>0))}));async function p(b,d,f,g){const h=""===b
;let i=!1;for(let a=0;a<d.length;a++){const b=d[a]
;(h&&b.sharedFolder||b.sharedFile)&&(await y(b,j)&&(h?(b.sharedGroup?l.push(b):b.sharedFolder?m.push(b):b.sharedFile&&k.push(b),
i=!0):b.sharedFile&&(k.length>0?o.push(b):(k.push(b),r("sharing-section-files",c("StartPage_Sharing_SectionFiles"),k)),i=!0)))}
h&&(e.StartUpdate({m_view_id:n,m_data_item_appearence_rules:{}
}),r("sharing-section-folders",c("StartPage_Sharing_SectionFolders"),m),
r("sharing-section-groups",c("StartPage_Sharing_SectionGroups"),l),
r("sharing-section-files",c("StartPage_Sharing_SectionFiles"),k)),i&&e.UpdateItems({m_view_id:n,m_items:o,
m_preserve_scroll_position:a.preserve_scroll_position})}function q(){e.FinishUpdate({m_view_id:n})}function r(a,b,c){
c.length>0&&(o.push({type:"section-title",path:"section-title-"+a,title:b}),o=o.concat(c))}}}({
view_id:"sharing-center-list-view",data_items_list:U,
data_collector:(0,d.nj)("sharing-center-list",ad("sharing-center-list-view")),showDataItemsSection:af,localization:c})),(0,
i.YC)(F.viewStyleLarge,e("StartPage_ViewStyle_Grid")),(0,i.YC)(F.viewStyleCompact,e("StartPage_ViewStyle_Compact")),(0,
i.YC)(F.viewStyleList,e("StartPage_ViewStyle_List")),(0,i.$9)(F.authenticatorTitle,e("StartPage_Category_Authenticator"))
;const Z=F.header;function aa(){window.innerWidth>650?(Z.classList.remove("rf-view-style-popup-shown"),(0,
p.SE)(F.viewStyleSelector)):(0,p.l5)(F.viewStyleSelector)}window.addEventListener("resize",aa),aa(),
F.viewStyleSelector.addEventListener("click",(()=>{
Z.classList.contains("rf-view-style-popup-shown")?Z.classList.remove("rf-view-style-popup-shown"):Z.classList.add("rf-view-style-popup-shown")
})),F.viewStyleLarge.addEventListener("click",(()=>{const a=O;Z.classList.remove("rf-view-style-popup-shown"),
ai("rf-view-large",!0),"rf-view-large"!==a&&ab(!0)})),F.viewStyleList.addEventListener("click",(()=>{const a=O
;Z.classList.remove("rf-view-style-popup-shown"),ai("rf-view-list",!0),"rf-view-list"!==a&&ab(!0)})),
F.viewStyleCompact.addEventListener("click",(()=>{const a=O;Z.classList.remove("rf-view-style-popup-shown"),
ai("rf-view-condensed",!0),"rf-view-condensed"!==a&&ab(!0)})),function(){const a=10,b=ae("data-items-section-main").items
;if(b.classList.contains("rf-sortable"))return;let c,d,e,f,h,i,l,m,n=null,p=null,q=[],s=5,t=!1
;return b.classList.add("rf-sortable"),void b.addEventListener("mousedown",(function(a){if(D())return;if(A(),1!==a.which)return
;let e=a.target;for(;e.parentElement&&e.parentElement!==b;)e=e.parentElement;if(n=e&&C(e)?e:null,!n)return;c=a.clientX,
d=a.clientY,document.addEventListener("mousemove",u),document.addEventListener("mouseup",x)}));function u(g){
D()||n&&1===g.which&&(!t&&Math.abs(g.clientX-c)<a&&Math.abs(g.clientY-d)<a||(t||function(a){if(!n)return;t=!0,
document.addEventListener("keydown",y),b.classList.add("rf-dragging-in-process")
;const c=window.getComputedStyle(n),d=n.getBoundingClientRect();h=d.width+parseInt(c.marginLeft)+ +parseInt(c.marginRight),
i=d.height+parseInt(c.marginTop)+ +parseInt(c.marginBottom),s=Math.max(1,Math.floor(b.clientWidth/h));const g=(0,j.VC)(n)
;e=Math.max(3,a.clientX-g.left),f=Math.max(3,a.clientY-g.top),n.style.position="absolute",n.style.zIndex="1000",
q=Array.prototype.slice.call(b.children).filter((a=>C(a))),p=v("li",{className:"rf-sortable-paceholder "+n.className,style:{
visibility:"hidden"}});for(let e=0;e<q.length;++e)if(q[e]===n){m=l=e,b.insertBefore(p,n);break}}(g),function(a){if(!t||!n)return
;const c=(0,j.VC)(b),d=a.clientX-c.left,g=a.clientY-c.top;n.style.left=(0,o.Md)(d-e),n.style.top=(0,o.Md)(g-f)
;const k=Math.max(0,Math.floor(g/i)),m=Math.min(Math.max(Math.floor(d/h),0),s-1),p=Math.min(k*s+m,q.length-1);p!==l&&(B(l,p),
l=p);const u=(0,r.TT)((0,j.Yw)(b,".rf-data"));if(u.offsetHeight<u.scrollHeight||u.offsetWidth<u.scrollWidth){const b=(0,
j.VC)(u),c=a.clientX-b.left,d=a.clientY-b.top;c<14&&(u.scrollLeft-=15),c>u.offsetWidth-24&&(u.scrollLeft+=15),
d<14&&(u.scrollTop-=15),d>u.offsetHeight-24&&(u.scrollTop+=15)}}(g)))}function x(){D()||(A(),l!==m&&function(){if(!k)return
;if("category-pinned"!==z.GetCategory())return;const a=[],c=b.querySelectorAll(".rf-item");for(let b=0;b<c.length;++b){
const d=c[b];if(!C(d))continue;const e=(0,g.Kx)(d);e&&e.path&&(a[b]={path:e.path,type:e.type})}
w.m_rf_api.usageInfo.SetUsageInfoList(0,1,a,null).then((()=>{})).catch((a=>{}))}())}function y(a){
a.which!==j.O5.ESCAPE&&a.keyCode!==j.O5.ESCAPE||(m!==l&&B(l,m),A())}function A(){n&&(n.style.position="",n.style.zIndex="",
n.style.left="",n.style.top="",n=null),p&&(p.remove(),p=null),t=!1,b.classList.remove("rf-dragging-in-process"),
document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",x),document.removeEventListener("keydown",y)}
function B(a,c){if(!n||0===q.length)return;const d=q[q.length-1];q.splice(a,1),q.splice(c,0,n),
c>=q.length-1?null!==d.nextElementSibling?b.insertBefore(n,d.nextElementSibling):b.appendChild(n):b.insertBefore(n,q[c+1]),
p&&b.insertBefore(p,n)}function C(a){return a.classList.contains("rf-item")&&(0,
j.Sd)(a)&&!a.classList.contains("rf-add-new-item")}function D(){
return!b.classList.contains("rf-sortable")||b.classList.contains("rf-sortable-disabled")}}(),function(){const a=v("div",{
className:"selector-item sort-order-popular",onclick:()=>z.OnSelectCategoryOrder("sort-order-popular")},v("div",{
className:"select-title"},(0,p.LX)(e("StartPage_SortOrder_Popular"),"")));F.orderSelectorSortPopular=a,
F.orderSelectorSort.appendChild(a);const b=v("div",{className:"selector-item sort-order-recent",
onclick:()=>z.OnSelectCategoryOrder("sort-order-recent")},v("div",{className:"select-title"},(0,
p.LX)(e("StartPage_SortOrder_Recent"),"")));F.orderSelectorSortRecent=b,F.orderSelectorSort.appendChild(b);const c=v("div",{
className:"selector-item sort-order-alphabet",onclick:()=>z.OnSelectCategoryOrder("sort-order-alphabet")},v("div",{
className:"select-title"},(0,p.LX)(e("StartPage_SortOrder_Alphabetical"),"")));F.orderSelectorSortAlphabet=c,
F.orderSelectorSort.appendChild(c);const d=v("div",{className:"selector-item sharing-center-shared-with-me",
onclick:()=>z.OnSelectCategoryOrder("sharing-center-shared-with-me")},v("div",{className:"select-title"},(0,
p.LX)(e("StartPage_Sharing_SharedWithMe"),"")));F.orderSelectorSharingCenterWithMe=d,F.orderSelectorSharingCenter.appendChild(d)
;const f=v("div",{className:"selector-item sharing-center-shared-by-me",
onclick:()=>z.OnSelectCategoryOrder("sharing-center-shared-by-me")},v("div",{className:"select-title"},(0,
p.LX)(e("StartPage_Sharing_SaredByMe"),"")));F.orderSelectorSharingCenterByMe=f,F.orderSelectorSharingCenter.appendChild(f)}()
;return{Activate:function(){if(k)return;k=!0,(0,p.l5)(E.files),(0,p.l5)(F.main),
"stand-alone"===a.page_status.extensionMode&&(H.Cancel(),I.Cancel(),J.Cancel(),(0,s.fI)(J.Execute({action:ao},null)),
null===(b=a.m_rf_api.service.onSyncSucceeded)||void 0===b||b.Add(am));var b},Deactivate:function(){if(!k)return;(0,
p.SE)(F.main),
k=!1,"stand-alone"===a.page_status.extensionMode&&(null===(b=a.m_rf_api.service.onSyncSucceeded)||void 0===b||b.Remove(am),
H.Cancel(),I.Cancel(),J.Cancel(),N=[],M=[]);var b},UpdateView:ab,Invalidate:()=>{q=!1},IsStillActual:ac,GetIsStillActual:ad,
GetViewStyle:()=>O,SelectViewStyle:ai,SetDataItemFilter:function(a){S=a,ab(!1)},GetAllShownItems:()=>""!==P&&Y.get(P)?(0,
r.TT)(Y.get(P)).GetAllShownItems():[],ScheduleSelectItemAfterUpdate:a=>{L=a}};function ab(b){if(b&&(q=!1),
k&&"category-folders"===z.GetCategory()||(Q=""),!k)return void(R="");if(z.IsEditorShown())return
;if(z.IsSearchResultShown())return;(0,s.fI)(w.m_rf_new_menu.UpdateNewItemButton());if(function(a){
const b=ae("data-items-section-main").items
;b&&b.classList.contains("rf-sortable")&&(a?b.classList.remove("rf-sortable-disabled"):b.classList.add("rf-sortable-disabled"))
}("category-pinned"===z.GetCategory()),q)return void function(){const a=Y.get(P);if(!a)return;const b=z.GetCategory();let c,d=!1
;"category-folders"===b&&(c=z.GetFolder(),"item-type-filter-all"!==z.GetItemTypeFilter()&&(d=!0));const e=al();a.UpdateView({
folder_path:c,sort_order:z.GetSortOrder(),show_only_folders_with_items:d,data_items_filter:aj(b),preserve_scroll_position:e===R,
select_item:L}),L=void 0,R=e}();q=!0;const c=O,d=z.GetCategory(),e=z.GetSortOrder(),f=ae("data-items-section-main").items
;"category-pinned"===d?f.classList.add("rf-items-fixed-num-per-line"):f.classList.remove("rf-items-fixed-num-per-line"),
"category-sharing-center"===d?((0,p.SE)(F.authenticatorTitle),(0,p.SE)(F.orderSelectorSort),(0,p.l5)(F.viewStylePopup),(0,
p.l5)(F.orderSelectorSharingCenter),
af("data-items-section-main",!1),F.data.classList.add("sharing-data-view")):"category-authenticator"===d?((0,
p.SE)(F.orderSelectorSort),(0,p.SE)(F.orderSelectorSharingCenter),(0,p.SE)(F.viewStylePopup),(0,p.l5)(F.authenticatorTitle),
F.data.classList.remove("sharing-data-view")):((0,p.l5)(F.viewStylePopup),(0,p.l5)(F.orderSelectorSort),(0,
p.SE)(F.authenticatorTitle),(0,p.SE)(F.orderSelectorSharingCenter),af("data-items-section-main",!0),
af("data-items-section-shared-folders",!1),af("data-items-section-groups",!1),af("data-items-section-shared-files",!1),
F.data.classList.remove("sharing-data-view")),"rf-view-list"===c?(af("data-items-section-main-list-view",!0),
af("data-items-section-main",!1),af("data-items-section-shared-folders",!1),af("data-items-section-groups",!1),
af("data-items-section-shared-files",!1)):af("data-items-section-main-list-view",!1);const g=F.data;switch(c){
case"rf-view-condensed":g.classList.remove("rf-view-large"),g.classList.remove("rf-view-list"),
g.classList.add("rf-view-condensed");break;case"rf-view-list":g.classList.remove("rf-view-large"),
g.classList.remove("rf-view-condensed"),g.classList.add("rf-view-list");break;case"rf-view-large":
g.classList.remove("rf-view-list"),g.classList.remove("rf-view-condensed"),g.classList.add("rf-view-large")}const h=P
;let i,j,l="",m=!1;switch(d){case"category-pinned":j=[1,2,3,4,5,6,7],l="pinned-view";break;case"category-folders":
switch(j=[8,1,2,3,4,5,6,7],z.GetItemTypeFilter()){case"item-type-filter-logins":j=[1,3];break;case"item-type-filter-bookmarks":
j=[2];break;case"item-type-filter-logins-and-bookmarks":j=[1,3,4,2];break;case"item-type-filter-safenotes":j=[7];break
;case"item-type-filter-identities":j=[5]}switch(i=z.GetFolder(),e){case"sort-order-alphabet":-1===j.indexOf(8)&&j.push(8),
"item-type-filter-all"!==z.GetItemTypeFilter()&&(m=!0),l="rf-view-list"===c?"one-folder-list-view":"one-folder-view";break
;case"sort-order-popular":l="rf-view-list"===c?"popular-list-view":"popular-view";break;case"sort-order-recent":
l="rf-view-list"===c?"recent-list-view":"recent-view";break;default:l="popular-view"}break;case"category-authenticator":j=[1],
l="authenticator-view";break;case"category-sharing-center":
j=[8,1,2,3,4,5,6,7],l="rf-view-list"===c?"sharing-center-list-view":"sharing-center-view";break;default:j=[1,2,3,4,5,6,7],
l="popular-view"}const n=Y.get(l);if(!n)return
;P=l,h!==l&&("sharing-center-view"!==h&&"sharing-center-list-view"!==h&&""!==h&&"stand-alone"===a.page_status.extensionMode&&(N=[],
M=[],J.Cancel(),H.Cancel(),I.Cancel(),(0,s.fI)(J.Execute({action:ao},null))),T.RemoveAllElements(),V.RemoveAllElements(),
W.RemoveAllElements(),X.RemoveAllElements());const o=al();n.UpdateView({folder_path:i,item_types_to_show:j,
data_item_appearence_rules:ag(c,d),sort_order:z.GetSortOrder(),show_only_folders_with_items:m,data_items_filter:aj(d),
preserve_scroll_position:R===o,select_item:L}),L=void 0,R=o}function ac(a){if(!k)return!1;const b=a&&a.imageSize;if(void 0!==b){
if(b!==ah(O))return!1}return!0}function ad(a){const b=a||P;return function(a){return ac(a)&&P===b}}function ae(a){
const b=F.itemsSections.get(a);if(b)return b;let c,d;switch(a){case"data-items-section-shared-folders":c=v("div",{
className:"rf-items-section rf-items-section-shared-folders hidden"},v("div",{className:"rf-section-header"},v("div",{
className:"rf-section-title"},(0,p.LX)(e("StartPage_Sharing_SectionFolders"),""))),d=v("div",{className:"rf-items"}));break
;case"data-items-section-groups":c=v("div",{className:"rf-items-section rf-items-section-groups hidden"},v("div",{
className:"rf-section-header"},v("div",{className:"rf-section-title"
},(0,p.LX)(e("StartPage_Sharing_SectionGroups"),""))),d=v("div",{className:"rf-items"}));break
;case"data-items-section-shared-files":c=v("div",{className:"rf-items-section rf-items-section-shared-files hidden"},v("div",{
className:"rf-section-header"},v("div",{className:"rf-section-title"
},(0,p.LX)(e("StartPage_Sharing_SectionFiles"),""))),d=v("div",{className:"rf-items"}));break
;case"data-items-section-main-list-view":c=v("div",{className:"rf-items-section rf-items-section-main-list-view hidden"
},d=v("div",{className:"rf-items"}));break;default:c=v("div",{className:"rf-items-section rf-items-section-main"},d=v("div",{
className:"rf-items"}))}F.data.appendChild(c);const f={section:c,items:d};return F.itemsSections.set(a,f),f}function af(a,b){
const c=ae(a).section;b?(0,p.l5)(c):(0,p.SE)(c)}function ag(a,b){let c,d;"rf-view-large"===a?(c=229,
d=150):"rf-view-condensed"===a?(c=229,d=90):(c=230,d=150);const e="category-pinned"===b&&5;return{image_size:ah(a),
default_item_outer_width:c,default_item_outer_height:d,fixed_items_per_line:e}}function ah(a){let b="img16";switch(a){
case"rf-view-large":b="imgLogo";break;case"rf-view-list":b="img32";break;case"rf-view-condensed":b="img48"}return b}
function ai(a,b){const c=F.viewStyleLarge,d=F.viewStyleCompact,f=F.viewStyleList,g=F.viewStyleSelector
;switch(g.classList.remove("rf-view-style-large","rf-view-style-condensed","rf-view-style-list"),a){case"rf-view-condensed":
d.classList.add("active"),c.classList.remove("active"),f.classList.remove("active"),g.classList.add("rf-view-style-condensed"),
(0,i.YC)(g,e("StartPage_ViewStyle_Compact")),O="rf-view-condensed";break;case"rf-view-list":f.classList.add("active"),
d.classList.remove("active"),c.classList.remove("active"),g.classList.add("rf-view-style-list"),O="rf-view-list",(0,
i.YC)(g,e("StartPage_ViewStyle_List"));break;default:c.classList.add("active"),d.classList.remove("active"),
f.classList.remove("active"),g.classList.add("rf-view-style-large"),O="rf-view-large",(0,i.YC)(g,e("StartPage_ViewStyle_Grid"))}
if(b){const b="category-pinned"===z.GetCategory()?"StartPage.PinnedViewStyle":"StartPage.NonPinnedViewStyle";(0,
s.fI)(D.SetValue(b,a))}}function aj(a){return"category-pinned"===a?null:S}function ak(a){
0===a&&"category-folders"===z.GetCategory()&&""!==z.GetFolder()&&-1!==["sort-order-popular","sort-order-recent"].indexOf(z.GetLastSortOrder("category-folders"))&&Q!==z.GetFolder()&&z.SetState("state-change-event-folder-sort-order-autochanged",{
category:"category-folders",order:"sort-order-alphabet"}),"category-folders"===z.GetCategory()&&(Q=z.GetFolder())}function al(){
let a=z.GetCategory()+O;return"category-pinned"!==z.GetCategory()&&(a+=z.GetSortOrder()),
"category-folders"===z.GetCategory()&&(a+=z.GetItemTypeFilter()+z.GetFolder()),a}function am(a){an(a.pendingItems)}
function an(a){const b=200;if("category-sharing-center"!==z.GetCategory())return;let c=!1,d=!1;if((0,r.XM)(M,a.accounts)){
if(!(0,r.XM)(N,a.files)){if(K.IsExecuting())return void(N=[]);if(I.IsExecuting())return;d=!0,N=a.files}}else{
if(K.IsExecuting())return void(M=[]);if(c=!0,M=a.accounts,H.IsExecuting()){if(!(a.accounts.length>0))return;N=[],H.Cancel()}}
if(c&&a.accounts.length>0){
const a=(0,h.BG)((0,l.p)((0,h.IW)("rf-pending-dialog",e("StartPage_Category_SharingCenter"),null),(a=>function(a,c,d,f){
const g={Create:j,OnAfterShow:k,OnBeforeHide:l,Focus:n,Dispose:o};return g;async function j(g,j){const k=new Set([]),l=[]
;let n,o,q;for(const b of a){const a=b.name||"",c=(0,m.em)(a),d=`${b.senderName||""} <${b.senderEmail}>`;let e;const f=v("div",{
className:"item-row"},v("div",{className:"checkbox"},v("label",{className:"flex-cell"},v("div",{
className:"icon-section folder-icon"}),v("div",{className:"text-section"},v("div",{className:"normal-text item-name-text"
},c),v("div",{className:"hint-text sender-name-text"},d)),v("div",{className:"item-check"},e=v("input",{type:"checkbox",
checked:!0,onchange:()=>{e.checked?k.add(b):k.delete(b),0===k.size?((0,h.DG)(n),(0,h.DG)(o),n.disabled=!0,o.disabled=!0):((0,
h.aV)(n),(0,h.aV)(o),n.disabled=!1,o.disabled=!1)}}),v("div",{className:"checkbox-check"})))));k.add(b),l.push(f)}
const r=v("div",null,v("div",{className:"rf-body"},v("div",{className:"invitation-text"
},e("SharedFoldersConfirmation_Title")),v("div",{className:"items-container"},l)),v("div",{className:"rf-buttons-bar"
},q=v("button",{className:"rf-button",onclick:g},e("Cmd_Skip_Flat")),o=v("button",{className:"rf-button reject-btn",
onclick:()=>{(0,p.D$)(u,(()=>w()),b,(()=>s.Show()))}},e("SharedFolderSettings_RejectSharedFolder")),n=v("button",{
className:"rf-button default-button",onclick:()=>{(0,p.D$)(t,(()=>w()),b,(()=>s.Show()))}
},e("EmergencyAccess_Accept_Invitation_Text")))),s=(0,i.yd)(r);return r;async function t(){try{await c(Array.from(k),f),g()
}catch(a){j(a)}}async function u(){try{await d(Array.from(k),f),g()}catch(a){j(a)}}function w(){return(0,h.DG)(n),(0,h.DG)(o),
(0,h.DG)(q),n.disabled=!0,o.disabled=!0,q.disabled=!0,()=>{(0,h.aV)(n),(0,h.aV)(o),(0,h.aV)(q),n.disabled=!1,o.disabled=!1,
q.disabled=!1}}}function k(){}function l(){}function n(){}function o(){}}(M,aq,ap,a))));I.Start((async b=>{await a.Execute(b),
(0,s.fI)(J.Execute({action:ao},b))}))}else if(d&&a.files.length>0){const a=(0,h.BG)((0,l.p)((0,
h.IW)("rf-pending-dialog",e("StartPage_Category_SharingCenter"),null),(a=>function(a,c,d,f){const g={Create:j,OnAfterShow:k,
OnBeforeHide:l,Focus:o,Dispose:q};return g;async function j(g,j){const k=new Set([]),l=[];let o,q,r;for(const b of a){
const a=b.name||"",c=(0,m.em)(a);let d=""
;b.grantorName&&b.grantorEmail&&b.grantorName!==b.grantorEmail?d=`${b.grantorName} <${b.grantorEmail}>`:b.grantorName?d=b.grantorName:b.grantorEmail&&(d=b.grantorEmail)
;const e=(0,m.hF)(a);let f;const g=v("div",{className:"item-row"},v("div",{className:"checkbox"},v("label",{
className:"flex-cell"},v("div",{className:(0,t.bt)("icon-section"," ",(0,n._m)(e))}),v("div",{className:"text-section"
},v("div",{className:"normal-text item-name-text"},c),v("div",{className:"hint-text sender-name-text"},d)),v("div",{
className:"item-check"},f=v("input",{type:"checkbox",checked:!0,onchange:()=>{f.checked?k.add(b):k.delete(b),0===k.size?((0,
h.DG)(o),(0,h.DG)(q),o.disabled=!0,q.disabled=!0):((0,h.aV)(o),(0,h.aV)(q),o.disabled=!1,q.disabled=!1)}}),v("div",{
className:"checkbox-check"})))));l.push(g),k.add(b)}const s=v("div",null,v("div",{className:"rf-body"},v("div",{
className:"invitation-text"},e("SharedFilesConfirmation_Title")),v("div",{className:"items-container"},l)),v("div",{
className:"rf-buttons-bar"},r=v("button",{className:"rf-button",onclick:g},e("Cmd_Skip_Flat")),q=v("button",{
className:"rf-button reject-btn",onclick:()=>{(0,p.D$)(x,(()=>y()),b,(()=>u.Show()))}
},e("SharedFolderSettings_RejectSharedFolder")),o=v("button",{className:"rf-button default-button",onclick:()=>{(0,
p.D$)(w,(()=>y()),b,(()=>u.Show()))}},e("EmergencyAccess_Accept_Invitation_Text")))),u=(0,i.yd)(s);return s;async function w(){
try{await c(Array.from(k),f),g()}catch(a){j(a)}}async function x(){try{await d(Array.from(k),f),g()}catch(a){j(a)}}function y(){
return(0,h.DG)(o),(0,h.DG)(q),(0,h.DG)(r),o.disabled=!0,q.disabled=!0,r.disabled=!0,()=>{(0,h.aV)(o),(0,h.aV)(q),(0,h.aV)(r),
o.disabled=!1,q.disabled=!1,r.disabled=!1}}}function k(){}function l(){}function o(){}function q(){}}(N,as,ar,a))))
;H.Start((async b=>{await a.Execute(b),(0,s.fI)(J.Execute({action:ao},b))}))
}else I.IsExecuting()&&0===a.accounts.length&&(I.Cancel(),(0,s.fI)(J.Execute({action:ao},null))),
H.IsExecuting()&&0===a.files.length&&H.Cancel()}async function ao(){const b=await a.m_rf_api.service.GetSyncPendingItems(null)
;b&&an(b)}async function ap(a,b){await K.Execute({action:async()=>{
await Promise.all(a.map((a=>G.RejectSharedAccount(a.accountId,b))))}},b)}async function aq(a,b){await K.Execute({
action:async()=>{await Promise.all(a.map((a=>G.AcceptSharedAccount(a.accountId,b))))}},b)}async function ar(a,b){
await K.Execute({action:async()=>{await Promise.all(a.map((a=>G.RejectSharedFile(a,b))))}},b)}async function as(a,b){
await K.Execute({action:async()=>{await Promise.all(a.map((a=>G.AcceptSharedFile(a,b))))}},b)}}function x(a){
const b="single-data-view",c=a.m_view_id,d=a.m_data_items_list,e=a.m_get_data,f=a.m_get_folder_items_count||null,g=a.m_schedule_update_views_after_error,h=a.m_is_still_actual,i=a.m_subfolders
;let j,l,n,o,p=new Map,r=null,t=[1,2,3,4,5,6,7],v=null;const w=(0,s.tG)(),x={UpdateView:function(a){let i=!1,m="",q=!1
;void 0!==a.folder_path&&(m=a.folder_path,q=!0);m===j&&q===l||(j=m.slice(0),l=q,i=!0);t=a.item_types_to_show||t,
n=a.data_item_appearence_rules||n,v!==(a.data_items_filter||null)&&(v=a.data_items_filter||null,i=!0);const s=new Set(t);o&&(0,
k.cD)(o,s)||(i=!0);return o=s,void w.Start((async k=>{const l=c+j;d.StartUpdate({m_view_id:l,m_data_item_appearence_rules:n})
;try{await async function(g,i,j){const k=e(m),l=!k.IsUptodate();if(l&&(await k.Update(b,m,j),!h()))throw(0,u.JS)()
;const n=k.GetData()||[],o=g||l||null!==r&&r.length!==n.length||n.length>0&&0===p.size;r=n
;const q=!!v,s={},w=[],x=a.show_only_folders_with_items&&null!==f;let A;if(x||q){A=[];for(const a of n)if(8===a.type){if(f){
const b=t.filter((a=>8!==a)),d=await f(b,a.path,"get-folder-items-"+c,j);if(!h())throw(0,u.JS)();if(q||(s[a.path]=d),
d<=0)continue}A.push(a),q&&w.push(a)}else A.push(a)}else A=n;const B=w.length>0;if(await async function(b,c,e,f,g,h){if(b){
const a=new Map,b=p;for(let d=0;d<c.length;d++){const e=c[d];let g;g=8!==e.type?await y(e,h):!!f||b.has(e.path),
g&&a.set(e.path,e)}p=a}d.UpdateItems({m_view_id:g,m_items:c.filter((a=>p.has(a.path))),m_items_in_folders_count:e,
m_preserve_scroll_position:a.preserve_scroll_position})}(o,A,s,!B,i,j),B){for(const a of w){const c=await z(b,a,j)
;if(!h())throw(0,u.JS)();c?p.has(a.path)||p.set(a.path,a):p.delete(a.path)}d.UpdateItems({m_view_id:i,
m_items:A.filter((a=>p.has(a.path))),m_items_in_folders_count:s,m_preserve_scroll_position:a.preserve_scroll_position})}}(i,l,k)
}catch(o){if((0,u.r5)(o,u.ut))return void g();if((0,u.r5)(o,u.kd))return;throw o}d.FinishUpdate({m_view_id:l,
m_select_item:a.select_item})}))},GetAllShownItems:()=>Array.from(p.values())};return x;async function y(a,c){
if(!o.has(a.type))return!1;if(8===a.type)return!0;if(!l)return z(b,a,c);if(i)return(0,m.QC)(j,a.path)&&z(b,a,c);return(0,
q.fA)(a.path)===j&&z(b,a,c)}async function z(a,b,c){return!v||v.DoesItemPathMatchFilter(a,b,c)}}async function y(a,b){
const c=await(0,e.d1)(a),d=0===c||4===c||8===c;return"sharing-center-shared-by-me"===b?d:"sharing-center-shared-with-me"!==b||!d
}},26227:function(a,b,c){"use strict";c.d(b,{Q:function(){return v},g:function(){return u}})
;var d=c(41107),e=c(11834),f=c(38221),g=c(97455),h=c(65852),i=c(4234),j=c(98266),k=c(31173),l=c(63956),m=c(88262),n=c(13113),o=c(32105),p=c(4153),q=c(78440),r=c(69893),s=(c(13117),
c(91764)._);const t=200;function u(a,b,c){const u=a,v=u.rf_api,w=u.rf_manager,x=(0,
p.TT)(v.emergencyAccess),y=b,z=c,A=u.localization,B=A.LocalizeString;let C=!1,D=[],E=[];const F=[],G=(0,q.tG)(),H=(0,
h.ZP)(y.progress);let I;const J=y.newButton;J.addEventListener("click",(()=>(0,q.fI)(Q()))),(0,
d.YC)(J,B("EmergencyAccess_AddContact_Title2")),function(){let a;const b=s("div",{
className:"selector-item emergency-access-my-contacts",onclick:()=>w.OnSelectCategoryOrder("emergency-access-my-contacts")
},s("div",{className:"select-title"},B("EmergencyAccess_Contacts_Title"),a=s("span",{className:"rf-bandge-count"})));let c
;const d=s("div",{className:"selector-item emergency-access-im-contact-for",
onclick:()=>w.OnSelectCategoryOrder("emergency-access-im-contact-for")},s("div",{className:"select-title"
},B("EmergencyAccess_Testators_Title"),c=s("span",{className:"rf-bandge-count"})));y.orderSelectorContacts=b,
y.orderSelectorTestators=d,y.orderSelector.appendChild(b),y.orderSelector.appendChild(d),y.contactsBandge=a,y.testatorsBandge=c
}();return{UpdateView:K,UpdatePendingEAEventsCount:L};async function K(a,b){if(F.forEach((a=>{clearInterval(a)})),a&&C)c();else{
H.StartIfNotStarted();try{
await(0,g.en)(M,v,A),I=new Map([[0,await B("EmergencyAccess_TimeoutImmediately_Text")],[43200,await B("EmergencyAccess_Timeout12hours_Text")],[86400,await B("EmergencyAccess_Timeout24hours_Text")],[172800,await B("EmergencyAccess_Timeout2days_Text")],[259200,await B("EmergencyAccess_Timeout3days_Text")],[604800,await B("EmergencyAccess_Timeout7days_Text")],[1209600,await B("EmergencyAccess_Timeout14days_Text")],[2592e3,await B("EmergencyAccess_Timeout30days_Text")]]),
c()}catch(m){if((0,r.r5)(m,r.m))return void await K(a,b);(0,r.r5)(m,r.kd)||await(0,
e.nn)(B("EmergencyAccess_GetAccounts_Error",[(0,r.EB)(m)]))}finally{H.ScheduleStop(500)}}function c(){N(!0),N(!1),function(a){
const b=a?E:D,c=y.accounts;(0,f.Nt)(c);const n=y.noAccounts;if(0===b.length)return(0,l.l5)(n),(0,f.Nt)(n),
n.appendChild(s("div",{className:"rf-ea-no-accounts-icon"})),n.appendChild(s("div",{className:"rf-ea-no-accounts-text"
},B(a?"EmergencyAccess_TestatorsTabDescription_Text":"EmergencyAccess_Help_Hint"))),void(a||n.appendChild(s("div",{
className:"rf-no-items-btn btn-secondary",onclick:()=>(0,q.fI)(Q())},(async()=>B("EmergencyAccess_AddContact_Title2")))));(0,
l.SE)(n);const o=document.createElement("tr"),C=document.createElement("thead");C.appendChild(o),c.appendChild(C),
o.appendChild(s("td",null,B("EmergencyAccess_Name_Title"))),a||o.appendChild(s("td",{className:"rf-ea-pending-action-mark"}))
;o.appendChild(s("td",{className:"rf-status"},B("EmergencyAccess_Access_Status_Title"))),o.appendChild(s("td",{
className:"rf-timeout"},B("EmergencyAccess_Timeout_Period_Title"))),a&&o.appendChild(s("td",{
className:"rf-ea-pending-action-mark"}));o.appendChild(s("td",{className:"rf-status"
},B("EmergencyAccess_Contact_Status_Title"))),o.appendChild(s("td",{className:"rf-commands"}));const G=s("tbody",null)
;c.appendChild(G),b.forEach((b=>{G.appendChild(function(a,b){let c="invited"
;1===a.status?c="accepted":2===a.status&&(c="rejected");let n=Promise.resolve("—"),o="n-a"
;a.accessStatus&&1===a.accessStatus?(n=B("EmergencyAccess_AccessRequested_Status"),
o="requested"):a.accessStatus&&2===a.accessStatus&&(n=B("EmergencyAccess_AccessGranted_Status"),o="access-granted")
;const y=b?function(a){const b=(0,d.Kw)();0===a.status?b.AddCommand({cmdCommand:"accept-invitation",
cmdCaption:B("EmergencyAccess_Accept_Invitation_Text"),cmdCssClass:"rf-accept-invitation-cmd",cmdShowImage:!0,cmdAction:()=>{
return void(0,q.fI)((async()=>{
2===await(0,e.dD)(B("EmergencyAccess_AcceptInvitation_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.AcceptEmergencyContactInvitation(a.accountId,null)),v,A),await K(!1,!0),
await L(),(0,d.Fp)(B("EmergencyAccess_AcceptInvitation_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_AcceptInvitation_Error",[a.email,(0,r.EB)(m)]))}}}
}):1!==a.status||a.accessStatus&&(1===a.accessStatus||2===a.accessStatus)?a.accessStatus&&1===a.accessStatus?b.AddCommand({
cmdCommand:"revoke-request",cmdCaption:B("EmergencyAccess_RevokeRequest_Text"),cmdCssClass:"rf-revoke-request-cmd",
cmdShowImage:!0,cmdAction:()=>{return void(0,q.fI)((async()=>{
2===await(0,e.dD)(B("EmergencyAccess_RejectPendingAccessTestator_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.RejectEmergencyAccess(a.accountId,null)),v,A),await K(!1,!0),(0,
d.Fp)(B("EmergencyAccess_RejectPendingAccessTestator_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_RejectPendingAccessTestator_Error",[(0,r.EB)(m)]))}}}
}):a.accessStatus&&2===a.accessStatus&&b.AddCommand({cmdCommand:"get-data",cmdCssClass:"rf-get-data-cmd",cmdShowImage:!0,
cmdCaption:B("EmergencyAccess_GetData_Request_Text"),cmdAction:()=>(0,q.fI)(async function(a){const b=await l();let c=[],g=null
;const h=(0,e.BG)((0,j.p)((async(a,b,c)=>{
const d=(0,j.dK)("rf-ea-dialog rf-ea-user-data-dialog rf-modal-dialog",B("EmergencyAccess_Title"),null);return g=await d(a,b,c),
g}),(()=>function(a){let b,c,g,h,j;const l=new Map;let n="",o=null;const p={Create:t,OnAfterShow:u,OnBeforeHide:v,Focus:x,
Dispose:y};return p;async function t(c){return b=await A(),(0,q.fI)((async()=>{const e=(0,d.p8)(b);e.Show(),await a.OnLoad(c),
e.Hide(),C(a.GetDownloadedItemInfos())})()),b}function u(){K()}function v(){L()}function x(){}function y(){}async function A(){
const b=s("div",{className:"rf-body"},s("div",{className:"rf-ea-description"
},await B("EmergencyAccess_GetData_Help_Text2",[a.GetAccountData().name||a.GetAccountData().email,(0,
i.XE)(a.GetBaseTargetPath(),!0)])),s("div",{className:"rf-ea-search-box"},c=s("input",{oninput:G,className:"rf-ea-search",
placeholder:"Search",spellcheck:!1}),g=s("div",{className:"rf-ea-search-icon",onclick:H})),h=s("div",{className:"rf-ea-files"}))
;return s("div",null,b,s("div",{className:"rf-buttons-bar"},j=s("div",{className:"rf-button rf-ea-download-all-button",onclick:J
},B("EmergencyAccess_DownloadAll_Text"))))}function C(a){
0===a.length?j.classList.add("disabled-button"):j.classList.remove("disabled-button"),(0,f.Nt)(h),l.clear(),a.forEach((a=>{
const b=D(a);h.appendChild(b)}))}function D(b){const c=(0,i.em)(b.path),e=(0,i.hF)(b.path),f=b.item;let g;const h=s("div",{
className:"rf-ea-file"},s("div",{className:"rf-ea-file-title"},s("div",{className:"rf-ea-file-icon "+(0,d.Av)({path:"",type:e})
}),s("div",{className:"rf-ea-file-name"},c)),g=s("div",{className:"rf-ea-file-fields"}));if((0,q.fI)((async()=>{
if(await a.IsItemExist(b.path))h.appendChild(F(b));else{const a=E(b);h.appendChild(a),l.set(b.path,a)}})()),
7===e)g.appendChild(s("div",{className:"rf-ea-file-field"},f.m_note));else if(1===e||3===e||4===e){g.appendChild(s("div",{
className:"rf-ea-file-field rf-url"},f.m_goto_url));f.m_fields.forEach((a=>{let b;if(a.m_name===i.Aq||2===a.m_type){
const c=s("span",{className:"rf-password-value"});c.textContent=(0,d.Ss)(),b=s("div",{className:"rf-ea-file-field rf-password",
title:a.m_name},c,s("span",{className:"rf-password-icon",onclick:b=>{const e=b.currentTarget
;e.classList.contains("shown")?(e.classList.remove("shown"),c.textContent=(0,d.Ss)()):(e.classList.add("shown"),
c.textContent=a.m_value||"")}}))}else b=s("div",{className:"rf-ea-file-field",title:a.m_name},a.m_value);g.appendChild(b)}))
}else if(2===e)g.appendChild(s("div",{className:"rf-ea-file-field rf-url"},f.m_goto_url));else if(5===e||6===e){
const a=f.m_groups;if(a&&a.length&&"Person"===a[0].m_name&&a[0].m_instances&&a[0].m_instances.length){
const b=a[0].m_instances[0];for(let a=0;a<b.m_fields.length&&a<4;a++)g.appendChild(s("div",{className:"rf-ea-file-field",
title:b.m_fields[a].m_name},b.m_fields[a].m_value))}}return h}function E(a){return s("div",{
className:"rf-ea-file-download-btn rf-ea-download",onclick:()=>(0,q.fI)(I(a))},B("EmergencyAccess_Download"))}function F(b){
return s("div",{className:"rf-ea-file-download-btn rf-ea-open",onclick:()=>(0,q.fI)(a.OnOpenEditor(b.path))
},B("EmergencyAccess_Open"))}function G(){const b=c.value.trim();if(n===b)return;n=b,
b?g.classList.add("rf-ea-eraser-icon"):g.classList.remove("rf-ea-eraser-icon");const d=[],e=new RegExp(b,"i")
;a.GetDownloadedItemInfos().forEach((a=>{const b=a.path?(0,i.em)(a.path):"";null!==e.exec(b)&&d.push(a)})),C(d)}function H(){
g.classList.contains("rf-ea-eraser-icon")&&(g.classList.remove("rf-ea-eraser-icon"),c.value="",c.focus(),G())}
async function I(b){try{await a.OnDownloadItem(b);const c=l.get(b.path);if(c){const a=F(b);c.replaceWith(a),l.delete(b.path)}
}catch(m){await(0,e.nn)(B("EmergencyAccess_DownloadItem_Error",[(0,r.EB)(m)]))}}function J(){
a.GetDownloadedItemInfos().forEach((a=>{l.get(a.path)&&(0,q.fI)(I(a))}))}function K(){const b=a.GetParentModalScreen()
;function c(){if(z){const a=parseInt(z.style.left)||0;b&&(b.style.paddingRight=0===a?"":(0,k.Md)(window.innerWidth-a))}}
null==b||b.classList.add("ea-modal-screen"),o=new MutationObserver(c),z&&o.observe(z,{attributes:!0,attributeFilter:["style"]}),
w.IsInlineEditorShown()&&c()}function L(){const b=a.GetParentModalScreen();b&&(b.classList.remove("ea-modal-screen"),
b.style.paddingRight=""),null!==o&&o.disconnect()}}({GetAccountData:()=>a,GetBaseTargetPath:()=>b,GetDownloadedItemInfos:()=>c,
async OnLoad(d){try{const d=await x.GetEmergencyContactDataItems(a.accountId,b,null);c=d.items||[]}catch(m){(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_GetData_Error",[a.email,(0,r.EB)(m)])),d()}},async IsItemExist(a){const b=n(a)
;try{return await u.GetDataItemInfo(b),!0}catch(m){return!1}},async OnOpenEditor(a){const b=n(a);try{
const a=await u.GetDataItemInfo(b);u.OnOpenEditor(a,!1,!1,!1)}catch(m){await(0,e.nn)(B("EmergencyAccess_OpenItem_Error",[(0,
i.XE)(b,!1),(0,r.EB)(m)]))}},async OnDownloadItem(a){const b=n(a.path);await u.rf_api.data.PutDataItem(b,a.item,null)},
GetParentModalScreen:()=>g}))));async function l(){const b=a.name?`${a.name}(${a.email})`:a.email;return`/${(0,
i.KF)(await B("EmergencyAccess_FolderName"),null)||"Emergency Access"}/${b}`}function n(a){return b+a}await h.Execute(null)}(a))
}):b.AddCommand({cmdCommand:"request-access",cmdCaption:B("EmergencyAccess_Request_Access_Text"),
cmdCssClass:"rf-request-access-cmd",cmdShowImage:!0,cmdAction:()=>{async function b(){try{await(0,
g.en)((async()=>x.RequestEmergencyAccess(a.accountId,null)),v,A),await K(!1,!0),(0,
d.Fp)(B("EmergencyAccess_RequestAccess_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_RequestAccess_Error2",[(0,r.EB)(m)]))}}(0,q.fI)((async()=>{2===await(0,
e.dD)(B("EmergencyAccess_RequestAccess_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})())}});return b.AddCommand({cmdCommand:"reject-invitation",cmdCaption:B("EmergencyAccess_Remove_Me"),
cmdCssClass:"rf-reject-invitation-cmd",cmdShowImage:!0,cmdAction:()=>{return void(0,q.fI)((async()=>{
const c=a.name?`${a.name} (${a.email})`:a.email
;2===await(0,e.dD)(B("EmergencyAccess_RejectTestator_Question",[c]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.RejectEmergencyContactInvitation(a.accountId,null)),v,A),await K(!1,!0),
await L(),(0,d.Fp)(B("EmergencyAccess_RejectTestator_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_RejectTestator_Error",[(0,r.EB)(m)]))}}}}),b}(a):function(a){const b=(0,d.Kw)()
;a.accessStatus&&1===a.accessStatus&&(b.AddCommand({cmdCommand:"grant-access",cmdCaption:B("EmergencyAccess_GrantAccess_Title"),
cmdCssClass:"rf-grant-access-cmd",cmdShowImage:!0,cmdAction:()=>{return void(0,q.fI)((async()=>{2===await(0,
e.dD)(B("EmergencyAccess_GrantAccess_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.GrantEmergencyAccess(a.accountId,null)),v,A),await K(!1,!1),await L(),(0,
d.Fp)(B("EmergencyAccess_GrantAccess_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_GrantAccess_Error",[a.email,(0,r.EB)(m)]))}}}}),b.AddCommand({
cmdCommand:"deny-access",cmdCaption:B("EmergencyAccess_DenyAccess_Text"),cmdCssClass:"rf-deny-access-cmd",cmdShowImage:!0,
cmdAction:()=>{return void(0,q.fI)((async()=>{
2===await(0,e.dD)(B("EmergencyAccess_DenyAccess_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.RevokeEmergencyAccess(a.accountId,null)),v,A),await K(!1,!1),await L(),
(0,d.Fp)(B("EmergencyAccess_DenyAccess_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_DenyAccess_Error",[a.email,(0,r.EB)(m)]))}}}}))
;a.accessStatus&&2===a.accessStatus&&b.AddCommand({cmdCommand:"revoke-access",cmdCaption:B("EmergencyAccess_RevokeAccess_Text"),
cmdCssClass:"rf-revoke-access-cmd",cmdShowImage:!0,cmdAction:()=>{return void(0,q.fI)((async()=>{2===await(0,
e.dD)(B("EmergencyAccess_RevokeAccess_Question",[a.email]),B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()
})());async function b(){try{await(0,g.en)((async()=>x.RevokeEmergencyAccess(a.accountId,null)),v,A),await K(!1,!1),(0,
d.Fp)(B("EmergencyAccess_RevokeAccess_Notification"))}catch(m){if((0,r.r5)(m,r.m))return void await b();(0,
r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_RevokeAccess_Error",[a.email,(0,r.EB)(m)]))}}}});return b.AddCommand({
cmdCommand:"change-timeout-period",cmdCssClass:"rf-change-time-cmd",cmdShowImage:!0,
cmdCaption:B("EmergencyAccess_ChangeTimeoutPeriod_Text"),cmdAction:()=>(0,q.fI)(async function(a){const b=(0,e.BG)((0,j.p)((0,
e.IW)("rf-ea-dialog rf-ea-change-timeout-dialog",B("EmergencyAccess_EditTimeoutPeriod_Text"),null),(()=>function(a,b){let c,f,g
;const h={Create:i,OnAfterShow:j,OnBeforeHide:k,Focus:n,Dispose:o};return h;async function i(b,e){const h=s("div",null,s("div",{
className:"rf-body"},s("div",{className:"select-wrapper"},c=await P(a,u)),s("div",{className:"rf-buttons-bar"},s("div",{
className:"rf-button rf-cancel-btn",onclick:()=>e((0,r.JS)())},B("StartPage_DialogButton_Cancel")),f=s("div",{
className:"rf-button rf-ok-button default-button disabled-button",onclick:()=>p()},B("StartPage_DialogButton_Ok")))))
;return g=(0,d.yd)(h),h}function j(){u()}function k(){}function n(){}function o(){}function p(){if(!v())return
;const a=c.GetSelectedValue()||0;(0,l.D$)((()=>q(a)),(()=>w()),t,(()=>g.Show()))}async function q(a){try{
await b.OnUpdateTimeout(a),await K(!1,!1),(0,d.Fp)(B("EmergencyAccess_EditTimeoutPeriod_Notification"))}catch(m){if((0,
r.r5)(m,r.m))return void await q(a);(0,r.r5)(m,r.kd)||await(0,e.nn)(B("EmergencyAccess_EditTimeoutPeriod_Error",[(0,r.EB)(m)]))}
}function u(){v()?(0,e.aV)(f):(0,e.DG)(f)}function v(){return c.GetSelectedValue()!==a}function w(){return c.Enable(!1),(0,
e.DG)(f),x}function x(){c.Enable(!0),(0,e.aV)(f)}}((0,p.TT)(a.timeoutSecs),{OnUpdateTimeout:async c=>{await(0,
g.en)((async()=>x.UpdateEmergencyContactInfo(a.accountId,{timeoutSec:c},null)),v,A),b.Cancel()}}))));await b.Execute(null)}(a))
}),b.AddCommand({cmdCommand:"revoke-contact",cmdCssClass:0===a.status?"rf-revoke-contact-cmd":"rf-remove-contact-cmd",
cmdShowImage:!0,cmdCaption:0===a.status?B("EmergencyAccess_RevokeInvitation_Text"):B("EmergencyAccess_RemoveContact_Text"),
cmdAction:()=>{async function b(){try{await(0,g.en)((async()=>x.RevokeEmergencyContact(a.accountId,!1,null)),v,A),
await K(!1,!1),
(0,d.Fp)(0===a.status?B("EmergencyAccess_RevokeContactInvitation_Notification"):B("EmergencyAccess_RemoveContact_Notification"))
}catch(m){if((0,r.r5)(m,r.m))return void await b()
;(0,r.r5)(m,r.kd)||await(0,e.nn)(0===a.status?B("EmergencyAccess_RevokeContactInvitation_Error",[a.email,(0,
r.EB)(m)]):B("EmergencyAccess_RemoveContact_Error",[a.email,(0,r.EB)(m)]))}}(0,q.fI)((async()=>{
const c=0===a.status?B("EmergencyAccess_RevokeContactInvitation_Question2",[a.email]):B("EmergencyAccess_RemoveContact_Question2",[a.email])
;2===await(0,e.dD)(c,B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await b()})())}}),b}(a);let C,D,E
;const G=s("td",{className:"rf-ea-pending-action-mark"});let H;const J=s("tr",{
className:"rf-ea-account rf-item "+(b?"rf-ea-contact":"rf-ea-testator")},s("td",{className:"rf-title"},s("div",{
className:"rf-name"},a.name),s("div",{className:"rf-email"},a.email)),b?null:G,C=s("td",{
className:"rf-status rf-access-status "+o},n),D=s("td",{className:"rf-timeout"},I.get((0,
p.TT)(a.timeoutSecs))),b?G:null,E=s("td",{className:"rf-status rf-contact-status "+c},M()),s("td",{className:"rf-commands"
},H=s("div",{className:"rf-item-menu rf-cmdbutton auto-hide",onclick:()=>{const a=(0,f.VC)(H),b={clientX:a.left,
clientY:a.top+H.offsetHeight};(0,q.fI)((0,d.Wz)({dropdownHandlerEl:J,position:b,commands:y,isContextMenu:!0,
cssClass:"commands-menu"}))}})));!b&&a.accessStatus&&1===a.accessStatus&&(D.style.fontWeight="bold",O(D,a),
F.push(setInterval((()=>{O(D,a)}),1e3)),R(C,G,a,b));b&&0===a.status&&R(E,G,a,b);return J;function M(){
const c=a.name||"",e=a.email,f=(0,h.rR)((0,p.TT)(a.statusChangedTime));let g=Promise.resolve(""),i=Promise.resolve("")
;b?0===a.status?(g=B("EmergencyAccess_Status_TestatorInvited_Tip",[c,e,f]),
i=B("EmergencyAccess_ContactInvited_Status")):1===a.status&&(g=B("EmergencyAccess_Status_TestatorAccepted_Tip",[c,e,f]),
i=B("EmergencyAccess_ContactAccepted_Status")):0===a.status?(g=B("EmergencyAccess_Status_ContactIvited_Tip",[c,e,f]),
i=B("EmergencyAccess_ContactInvited_Status")):1===a.status?(g=B("EmergencyAccess_Status_ContactAccepted_Tip",[c,e,f]),
i=B("EmergencyAccess_ContactAccepted_Status")):2===a.status&&(g=B("EmergencyAccess_Status_ContactRejected_Tip",[c,e,f]),
i=B("EmergencyAccess_ContactRejected_Status"));const j=s("div",{className:"rf-status-content"},s("div",{
className:"rf-status-icon"}),s("div",{className:"rf-status-text"},i));return(0,d.YC)(j,g),j}}(b,a))}))}(b)}}async function L(){}
async function M(){const a=await Promise.all([x.GetEmergencyContacts(null),x.GetTestators(null)])
;D=a[0].map((a=>void 0===a.status?Object.assign(Object.assign({},a),{status:0}):a)),
E=a[1].map((a=>void 0===a.status?Object.assign(Object.assign({},a),{status:0}):a)).filter((a=>2!==a.status)),C=!0}function N(a){
const b=a?y.testatorsBandge:y.contactsBandge
;null!==b&&(a&&E.length?b.textContent=`(${E.length})`:!a&&D.length?b.textContent=`(${D.length})`:(0,l.SE)(b))}function O(a,b){
let c=(0,p.TT)(b.timeoutSecs)-(Math.floor(Date.now()/1e3)-(0,p.TT)(b.accessRequestedTime));c=Math.max(0,c);let d=""
;const e=Math.floor(c/3600);c-=3600*e,d+=(e<10?"0":"")+(0,p.bf)(e)+":";const f=Math.floor(c/60);c-=60*f,d+=("00"+(0,
p.bf)(f)).slice(-2)+":",d+=("00"+(0,p.bf)(c)).slice(-2),a.textContent=d}async function P(a,b){return(0,o.l6)(a,!0,I,b,{
CustomTitleRender:(a,b,c,d)=>s("div",{className:"select-title unselectable",onclick:()=>{c&&d.ToggleDropdown()}},s("span",{
className:"title"},B("EmergencyAccess_AddContact_Timeout_Caption")),s("div",{className:"select-option selected"},b)),
seamlessDropdown:!0,fixedDropdownDirection:1})}async function Q(){const a=(0,e.BG)((0,j.p)((0,
e.IW)("rf-ea-dialog rf-ea-new-contact-dialog",B("EmergencyAccess_AddContact_Title2"),null),(()=>function(a){let b,c,f,g,h,i,j=!1
;const k=80,o={Create:p,OnAfterShow:u,OnBeforeHide:v,Focus:w,Dispose:x};return o;async function p(a,e){
const j=s("div",null,s("div",{className:"rf-body"},s("div",{className:"rf-ea-description"
},await B("EmergencyAccess_ContactsTabDescription_Text")),i=s("div",{className:"field-with-title field-border"},b=s("input",{
className:"input-field",oninput:y,onblur:z,spellcheck:!1,required:!0}),s("div",{className:"title"
},await B("EmergencyAccess_AddContact_Email_Caption"))),c=s("div",{className:"rf-field-error"}),s("div",{
className:"select-wrapper"},f=await P(172800,(()=>{}))),s("div",{className:"rf-buttons-bar"},s("div",{
className:"rf-button rf-cancel-btn",onclick:()=>e((0,r.JS)())},B("StartPage_DialogButton_Cancel")),g=s("div",{
className:"rf-button rf-ok-button default-button disabled-button",onclick:()=>A()},B("StartPage_EmergencyAccess_Invite")))))
;return h=(0,d.yd)(j),j}function u(){F()}function v(){}function w(){b.focus()}function x(){}function y(){L(),I()?D():E()}
function z(){if(!b.value)return;if(b.value.length>k)return void J(B("EmailMaxLength_Error",[k.toString()]));(0,
n.MA)(b.value).ok||J(B("EmailIncorrect_Error"))}function A(){if(!H())return;if(!I())return
;const a=b.value.trim(),c=f.GetSelectedValue()||0;(0,l.D$)((()=>C(a,c)),(()=>(L(),M())),t,(()=>h.Show()))}async function C(b,c){
try{await a.OnInvite(b,c),await K(!1,!1),(0,d.Fp)(B("EmergencyAccess_AddContact_Success_Prompt"))}catch(f){let a="";if((0,
m.dW)(f)){a=(f.httpResponse.headers||{})["x-sib-reason"]||""}(0,r.r5)(f,r.m)?await C(b,c):(0,r.r5)(f,r.Y$)||(0,
r.r5)(f,r.FN)&&"user-not-found"===a?await(0,e.nn)(B("EmergencyAccess_AddContact_NonExistingUser_Message",[b])):(0,
r.r5)(f,r.kd)||await(0,e.nn)(B("EmergencyAccess_AddContact_Error",[b,(0,r.EB)(f)]))}}function D(){G.Start((async a=>{await(0,
q.Gu)(200,a,!1),(0,e.aV)(g)}))}function E(){G.Start((async a=>{await(0,q.Gu)(200,a,!1),(0,e.DG)(g)}))}function F(){H()?(0,
e.aV)(g):(0,e.DG)(g)}function H(){return!j&&""!==b.value.trim()}function I(){const a=b.value;if(a.length>k)return!1;return!!(0,
n.MA)(a).ok}function J(a){c.classList.add("shown"),i.classList.add("error"),(0,d.$9)(c,a)}function L(){
c.classList.remove("shown"),i.classList.remove("error"),c.textContent=""}function M(){return j=!0,b.disabled=!0,f.Enable(!1),(0,
e.DG)(g),N}function N(){j=!1,b.disabled=!1,f.Enable(!0),(0,e.aV)(g)}}({OnInvite:async(b,c)=>{await(0,
g.en)((async()=>x.InviteEmergencyContact(b,!1,{timeoutSec:c},null)),v,A),a.Cancel()}}))));await a.Execute(null)}
function R(a,b,c,g){const h=c.email,i=c.name?`${c.name} (${c.email})`:c.email,j=s("div",{className:"rf-ea-pending-action"
},g?s("fragment",null,s("div",{className:"rf-ea-pending-action-desc"
},B("EmergencyAccess_Pending_InvitationReceived_Title")),k("accept",B("EmergencyAccess_Accept_Invitation_Text"),B("EmergencyAccess_AcceptInvitation_Question",[h]),B("EmergencyAccess_AcceptInvitation_Notification"),(a=>B("EmergencyAccess_AcceptInvitation_Error",[h,a])),(()=>x.AcceptEmergencyContactInvitation(c.accountId,null))),k("reject",B("EmergencyAccess_Remove_Me"),B("EmergencyAccess_RejectTestator_Question",[i]),B("EmergencyAccess_RejectTestator_Notification"),(a=>B("EmergencyAccess_RejectTestator_Error",[a])),(()=>x.RejectEmergencyContactInvitation(c.accountId,null)))):s("fragment",null,s("div",{
className:"rf-ea-pending-action-desc"
},B("EmergencyAccess_Pending_AccessRequested_Title")),k("grant",B("EmergencyAccess_GrantAccess_Title"),B("EmergencyAccess_GrantAccess_Question",[h]),B("EmergencyAccess_GrantAccess_Notification"),(a=>B("EmergencyAccess_GrantAccess_Error",[h,a])),(()=>x.GrantEmergencyAccess(c.accountId,null))),k("deny",B("EmergencyAccess_DenyAccess_Text"),B("EmergencyAccess_DenyAccess_Question",[h]),B("EmergencyAccess_DenyAccess_Notification"),(a=>B("EmergencyAccess_DenyAccess_Error",[h,a])),(()=>x.RevokeEmergencyAccess(c.accountId,null)))))
;function k(a,b,c,f,g,h){const i=s("div",{className:"rf-ea-pending-action-btn rf-ea-pending-action-"+a,onclick:()=>{(0,
q.fI)((async()=>{2===await(0,e.dD)(c,B("StartPage_DialogButton_Yes"),B("StartPage_DialogButton_No"))&&await l(f,g,h)})())}})
;return(0,d.YC)(i,b),i}return(0,f.Nt)(a),a.appendChild(j),b.classList.add("rf-shown"),
void b.appendChild(s("div",null,B("EmergencyAccess_Pending_Action")));async function l(a,b,c){try{await c(),await K(!1,g),
await L(),(0,d.Fp)(a)}catch(f){if((0,r.r5)(f,r.m))return void await l(a,b,c);(0,r.r5)(f,r.kd)||await(0,e.nn)(b((0,r.EB)(f)))}}}}
function v(a,b){let c=!1,f=!1;const g=a,h=b,i=(0,p.TT)(g.rf_api.emergencyAccess),k=(0,q.tG)(),m=(0,q.tG)(),n=(0,q.h1)(),r=(0,
q.h1)();let u=[],v=[];const w=a.localization.LocalizeString;return{Activate:function(){if(c)return;c=!0,(0,l.l5)(h.files),(0,
l.l5)(h.emergencyAccess.main),"stand-alone"===a.page_status.extensionMode&&((0,q.fI)(n.Execute({action:x},null)),
null===(b=a.rf_api.service.onSyncSucceeded)||void 0===b||b.Add(y));var b},Deactivate:function(){if(!c)return;c=!1,(0,
l.SE)(h.emergencyAccess.main),"stand-alone"===a.page_status.extensionMode&&(u=[],v=[],
null===(b=a.rf_api.service.onSyncSucceeded)||void 0===b||b.Remove(y),k.Cancel(),m.Cancel());var b},UpdateView:function(a){
const b=g.rf_manager.GetController(1);if(g.GetPolicies().DisableEmergencyAccess)return b.ShowSelector(10,!1,null),
void(c&&g.rf_manager.OnSelectCategory("category-folders"));b.ShowSelector(10,!0,null);a&&(f=!1);if(!c)return
;if(g.rf_manager.IsEditorShown())return;if(g.rf_manager.IsSearchResultShown())return;(0,
q.fI)(g.GetEmergencyAccess().UpdateView(f,"emergency-access-im-contact-for"===g.rf_manager.GetSortOrder())),f=!0},
Invalidate:()=>{f=!1},IsStillActual:()=>c,GetIsStillActual:function(){return function(){return c}}};async function x(){
const b=await a.rf_api.service.GetSyncPendingItems(null);b&&z(b)}function y(a){z(a.pendingItems)}function z(a){
if(a.emergencyAccess.length>0){let b=!1,c=!1;const f=[],g=[]
;for(const d of a.emergencyAccess)1===d.status&&1===d.accessStatus?g.push(d):f.push(d);if((0,p.XM)(v,g)){if(!(0,p.XM)(u,f)){
if(r.IsExecuting())return void(u=[]);if(m.IsExecuting())return;b=!0,u=f}}else{if(r.IsExecuting())return void(v=[]);if(c=!0,v=g,
k.IsExecuting()){if(!(g.length>0))return;u=[],k.Cancel()}}if(c&&g.length>0){const a=(0,e.BG)((0,j.p)((0,
e.IW)("rf-pending-dialog rf-ea-request-pending",w("StartPage_Category_EmergencyAccess"),null),(a=>function(a,b,c,f){const g={
Create:h,OnAfterShow:i,OnBeforeHide:j,Focus:k,Dispose:m};return g;async function h(g,h){const i=new Set,j=[];let k,m,n
;for(const b of a){let a;const c=s("div",{className:"item-row"},a=s(o.b_,{text:`${b.name||""} (${b.email})`,checked:!0,
onchange:()=>{a.GetChecked()?i.add(b):i.delete(b),0===i.size?((0,e.DG)(k),(0,e.DG)(m),k.disabled=!0,m.disabled=!0):((0,e.aV)(k),
(0,e.aV)(m),k.disabled=!1,m.disabled=!1)}}));j.push(c),i.add(b)}const p=s("div",null,s("div",{className:"rf-body"},s("div",{
className:"invitation-text"},w("EmergencyAccessDataAccessConfirmationDescription_Text")),s("div",{className:"items-container"
},j)),s("div",{className:"rf-buttons-bar"},n=s("button",{className:"rf-button",onclick:g},w("Cmd_Later_Flat")),m=s("button",{
className:"rf-button reject-btn",onclick:()=>{(0,l.D$)(u,(()=>v()),t,(()=>q.Show()))}
},w("EmergencyAccess_DenyAccess_Text")),k=s("button",{className:"rf-button default-button",onclick:()=>{(0,
l.D$)(r,(()=>v()),t,(()=>q.Show()))}},w("EmergencyAccess_GrantAccess_Title")))),q=(0,d.yd)(p);return p;async function r(){try{
await b(Array.from(i),f),g()}catch(a){h(a)}}async function u(){try{await c(Array.from(i),f),g()}catch(a){h(a)}}function v(){
return(0,e.DG)(k),(0,e.DG)(m),(0,e.DG)(n),k.disabled=!0,m.disabled=!0,n.disabled=!0,()=>{(0,e.aV)(k),(0,e.aV)(m),(0,e.aV)(n),
k.disabled=!1,m.disabled=!1,n.disabled=!1}}}function i(){}function j(){}function k(){}function m(){}}(g,A,B,a))))
;m.Start((async b=>{await a.Execute(b),(0,q.fI)(n.Execute({action:x},b))}))}else if(b&&f.length>0){const a=(0,e.BG)((0,j.p)((0,
e.IW)("rf-pending-dialog",w("StartPage_Category_EmergencyAccess"),null),(a=>function(a,b,c,f){const g={Create:h,OnAfterShow:i,
OnBeforeHide:j,Focus:k,Dispose:m};return g;async function h(g,h){const i=new Set,j=[];let k,m,n;for(const b of a){let a
;const c=s("div",{className:"item-row"},a=s(o.b_,{text:`${b.name||""} (${b.email})`,checked:!0,onchange:()=>{
a.GetChecked()?i.add(b):i.delete(b),0===i.size?((0,e.DG)(k),(0,e.DG)(m),k.disabled=!0,m.disabled=!0):((0,e.aV)(k),(0,e.aV)(m),
k.disabled=!1,m.disabled=!1)}}));j.push(c),i.add(b)}const p=s("div",null,s("div",{className:"rf-body"},s("div",{
className:"invitation-text"},await w("EmergencyAccessContactConfirmationDescription_Text")),s("div",{className:"items-container"
},j)),s("div",{className:"rf-buttons-bar"},n=s("button",{className:"rf-button",onclick:g},w("Cmd_Later_Flat")),m=s("button",{
className:"rf-button reject-btn",onclick:()=>{(0,l.D$)(u,(()=>v()),t,(()=>q.Show()))}
},w("EmergencyAccess_Reject_Invitation_Text2")),k=s("button",{className:"rf-button default-button",onclick:()=>{(0,
l.D$)(r,(()=>v()),t,(()=>q.Show()))}},w("EmergencyAccess_Accept_Invitation_Text")))),q=(0,d.yd)(p);return p;async function r(){
try{await b(Array.from(i),f),g()}catch(a){h(a)}}async function u(){try{await c(Array.from(i),f),g()}catch(a){h(a)}}function v(){
return(0,e.DG)(k),(0,e.DG)(m),(0,e.DG)(n),k.disabled=!0,m.disabled=!0,n.disabled=!0,()=>{(0,e.aV)(k),(0,e.aV)(m),(0,e.aV)(n),
k.disabled=!1,m.disabled=!1,n.disabled=!1}}}function i(){}function j(){}function k(){}function m(){}}(f,C,D,a))))
;k.Start((async b=>{await a.Execute(b),(0,q.fI)(n.Execute({action:x},b))}))}else m.IsExecuting()&&0===g.length&&(m.Cancel(),(0,
q.fI)(n.Execute({action:x},null))),k.IsExecuting()&&0===f.length&&k.Cancel()}else m.Cancel(),k.Cancel()}async function A(a,b){
await r.Execute({action:async()=>{await Promise.all(a.map((a=>i.GrantEmergencyAccess(a.email,b))))}},b)}async function B(a,b){
await r.Execute({action:async()=>{await Promise.all(a.map((a=>i.RevokeEmergencyAccess(a.accountId,b))))}},b)}
async function C(a,b){await r.Execute({action:async()=>{
await Promise.all(a.map((a=>i.AcceptEmergencyContactInvitation(a.email,b))))}},b)}async function D(a,b){await r.Execute({
action:async()=>{await Promise.all(a.map((a=>i.RejectEmergencyContactInvitation(a.email,b))))}},b)}}},37042:function(a,b,c){
"use strict";c.d(b,{b:function(){return f}});var d=c(48658),e=c(55195);function f(a){const b=a,c=(0,d.Xe)(""),f={};return{
GetItemsCount:g,HasItems:async function(a,b,c,d){return await g([a],b,c,d)>0},HasFolders:async function(a,b){
const c=await h(a,b);for(const d of c)if(8===d.type)return!0;return!1},HasNonSharedFolders:async function(a){
const b=await h("has-non-shared-folders",a);for(const c of b)if(8===c.type&&!c.sharedFolder)return!0;return!1}}
;async function g(a,c,d,g){const h=function(a){let c=f[a];if(c)return c;return c=(0,e.Xp)({UpdateData:async(a,c)=>{
const d=await b.data.GetCounts(a,c),e=new Map;for(const b of d)e.set(b.type,b.count);return e},
onDataChanged:b.data.onDataChanged,ShouldChangeCauseUpdate:(a,b)=>{switch(b.event){case 1:case 2:case 3:case 5:case 7:case 8:
case 10:return!0}return!1}}),f[a]=c,c}(c);h.IsUptodate()||await h.Update(d,c,g);const i=h.GetData()
;return i?a.reduce(((a,b)=>a+=i.get(b)||0),0):0}async function h(a,b){return c.IsUptodate()||await c.Update(a,"",b),
c.GetData()||[]}}},25057:function(a,b,c){"use strict";c.d(b,{I:function(){return s}})
;var d=c(13064),e=c(37367),f=c(83645),g=c(48141),h=c(4601),i=c(11834),j=c(41107),k=c(38221),l=c(4234),m=c(31173),n=c(63956),o=c(78440),p=c(69893),q=c(4153),r=c(91764)._
;function s(a,b,c,s,v,w){const x=v.LocalizeString,y=w;let z=null,A=null,B=!1,C=!1,D=!1;const E=new Set;let F=null,G=null,H=!1
;const I=new Set;let J=null;document.body.addEventListener("mousedown",(b=>{if(!C)return;const c=b.target,d=t(a)
;if(d&&c.classList.contains("rf-items")||!d&&c.classList.contains("rf-data")){const a=(0,k.VC)(c)
;if(b.clientX>c.clientWidth+a.left)return;if(b.clientY>c.clientHeight+a.top)return}(0,
k.LP)(c,"#v8 .rf-multiselect-in-process .rf-item-folder")||a.IsInlineEditorShown()&&c.classList.contains("rf-command-close-editor")||(null===(0,
k.LP)(c,"#v8 .modal-dialog-screen")||c.classList.contains("default-button"))&&(null!==(0,
k.LP)(c,"#v8 .rf-items.rf-multiselect-in-process")||null!==(0,k.LP)(c,"#v8 .context-menu-popup")||null!==(0,
k.LP)(c,"#v8 .rf-multiselect-cmdbar")?"category-security-center"!==a.GetCategory()?(0,
k.LP)(c,"#v8 .rf-items.rf-multiselect-in-process")&&null===(0,k.LP)(c,"#v8 .rf-list-item-row")&&null===(0,
k.LP)(c,"#v8 .rf-list-item-header")&&null===(0,k.LP)(c,"#v8 .rf-item")&&null===(0,
k.LP)(c,"#v8 .rf-add-new-item")&&(u(b.clientX,b.clientY-18,d)||u(b.clientX-18,b.clientY,d)||u(b.clientX-18,b.clientY-18,d)||S()):H&&(0,
k.LP)(c,".rf-security-center-item")&&b.preventDefault():S())})),document.body.addEventListener("mousemove",(b=>{if(F&&!T()){
const c=b.target;G=t(a)?(0,k.LP)(c,"#v8 .rf-list-item-row"):"category-security-center"===a.GetCategory()?(0,
k.LP)(c,".rf-security-center-item"):(0,k.LP)(c,"#v8 .rf-data-view .rf-item"),H?V():U()}})),
document.body.addEventListener("keydown",(a=>{if(I.add(a.which),C)return I.size>1?(H&&U(),
void(H=!1)):void(H||a.which!==k.O5.SHIFT||a.altKey||a.ctrlKey||a.metaKey||(H=!0,F&&!T()&&V()))})),
document.body.addEventListener("keyup",(a=>{I.delete(a.which),C&&(H&&U(),H=!1)})),window.addEventListener("blur",(()=>{H=!1,
I.clear()})),window.addEventListener("focus",(()=>{H=!1,I.clear()}));const K={SelectItem:async function(b){
b.classList.contains("rf-item")&&t(a)&&(b=(0,q.TT)((0,k.LP)(b,".rf-list-item-row")))
;"category-security-center"!==a.GetCategory()||a.IsSearchResultShown()||(b=(0,q.TT)((0,k.LP)(b,".rf-security-center-item")))
;const c=(0,q.TT)((0,k.Yw)(b,".rf-items"));if(H&&F&&F!==b){try{const a=await W(F,b);Y(a).forEach((a=>{
a.classList.remove("rf-multiselect-hovered"),a.classList.add("rf-multiselect-selected"),E.add((0,j.eK)(a))})),a.forEach((a=>{
E.add(a)}))}catch(d){return}b.classList.add("rf-multiselect-hovered")}else b.classList.toggle("rf-multiselect-selected")
;b.classList.contains("rf-multiselect-selected")?(F=b,E.add((0,j.eK)(b))):(F=null,E.delete((0,j.eK)(b)));E.size>0?(L(c),
await M()):S()},InitListView:function(a,b){if(z===a)return;z=a,A=b,a.removeEventListener("click",ab),
a.addEventListener("click",ab),A.removeEventListener("mousemove",ac),A.addEventListener("mousemove",ac),
A.removeEventListener("mouseleave",ad),A.addEventListener("mouseleave",ad)},UpdateItemSelection:function(a,b){
if(E.has(a)&&(b.classList.add("rf-multiselect-selected"),F)){a===(0,j.eK)(F)&&(F=b)}},IsItemSelected:function(a){
return a.classList.contains("rf-multiselect-selected")},GetSelectedItemPaths:()=>[...E],GetMenuCommands:P,Clear:S,
IsInProcess:()=>C,IsDraggingAllowed:function(){const b=a.GetCategory(),c=a.GetSortOrder()
;return C&&!H&&!a.IsSearchResultShown()&&("category-sharing-center"===b||"category-folders"===b&&"sort-order-alphabet"===c)}}
;return K;function L(c){C=!0,D=!1,y.main.classList.add("rf-multiselect-in-process"),
c.classList.add("rf-multiselect-in-process"),
(0,o.fI)(Q(E.size)),a.IsSearchResultShown()||"category-security-center"===a.GetCategory()||function(a,b,c,d){
if(a.classList.contains("rf-multiselect-draggable-initialized"))return;const e=10;let g,i,j=null,l=null;const n=60,p=15;let s=!1
;return a.addEventListener("mousedown",v),void a.classList.add("rf-multiselect-draggable-initialized");function v(a){
if(!d.IsDraggingAllowed())return;if(y(),1!==a.which)return;let b=(0,k.LP)(a.target,".rf-list-item-row");b||(b=(0,
k.LP)(a.target,".rf-item")),b&&d.IsItemSelected(b)&&(g=a.clientX,i=a.clientY,document.addEventListener("mousemove",w),
document.addEventListener("mouseup",x))}function w(b){
if(d.IsDraggingAllowed()&&1===b.which&&!(!s&&Math.abs(b.clientX-g)<e&&Math.abs(b.clientY-i)<e))return s||o(),void v(b)
;function o(){const b=window.getSelection();b&&b.removeAllRanges(),j||(j=r("div",{className:"rf-multiselect-drag-item"}),
a.appendChild(j)),j.textContent=`${d.GetSelectedItemPaths().length} files`,s=!0,a.classList.add("rf-dragging-in-process")}
function v(b){if(!s||!j)return
;const d=t(c),e=(0,k.VC)(a),g=b.clientX-e.left+(d?a.scrollLeft:0),i=b.clientY-e.top+(d?a.scrollTop:0);j.style.left=(0,
m.Md)(g-n),j.style.top=(0,m.Md)(i-p);const o=u(b.clientX,b.clientY,d)
;if(l&&l!==o&&(l.classList.remove("rf-multiselect-can-drop"),l=null),o&&o!==l){const a=(0,h.Kx)(o);a&&8===a.type?(0,
f.Xl)(a)?j.style.cursor="no-drop":(o.classList.add("rf-multiselect-can-drop"),l=o,j.style.cursor="pointer"):j.style.cursor=""}
o||(j.style.cursor="");const r=d?a:(0,q.TT)((0,k.Yw)(a,".rf-data"))
;if(r.offsetHeight<r.scrollHeight||r.offsetWidth<r.scrollWidth){const a=(0,k.VC)(r),c=b.clientX-a.left,e=b.clientY-a.top
;c<14&&(r.scrollLeft-=15),c>r.offsetWidth-24&&(r.scrollLeft+=15),e<(d?64:14)&&(r.scrollTop-=15),
e>r.offsetHeight-24&&(r.scrollTop+=15)}}}function x(){if(d.IsDraggingAllowed()){if(l){const a=(0,h.Kx)(l);a&&8===a.type&&!(0,
f.Xl)(a)&&(0,o.fI)(b.MoveOrCloneMultiselectItems(!0,d.GetSelectedItemPaths(),a.path)),d.Clear()}y()}else y()}function y(){
j&&(j.remove(),j=null),l&&(l.classList.remove("rf-multiselect-can-drop"),l=null),s=!1,
a.classList.remove("rf-dragging-in-process"),document.removeEventListener("mousemove",w),
document.removeEventListener("mouseup",x)}}(c,b,a,K);const d=R();"category-authenticator"!==a.GetCategory()&&(0,n.l5)(d),
window.ResizeObserver&&null===J&&(J=new ResizeObserver(aa),J.observe(d),aa())}async function M(){if(z)if(C){
await O()?z.classList.add("checked"):z.classList.remove("checked")}else z.classList.remove("checked")}async function N(){try{
(await X()).forEach((a=>E.add(a)))}catch(a){return}Z().forEach((a=>{
if(a.classList.contains("rf-item-folder")||a.classList.contains("rf-add-new-item")||!(0,
k.Sd)(a)&&a.getAttribute("data-invalidated")||null!==a.querySelector(".rf-item-folder"))return;const b=(0,j.eK)(a)
;b&&(a.classList.add("rf-multiselect-selected"),E.add(b))})),await M(),(0,o.fI)(Q(E.size))}async function O(){if(!C)return!1
;try{const a=await X();for(const b of a)if(!E.has(b))return!1}catch(a){return!1}return!0}async function P(){const f=(0,
j.Kw)(),g=function(){const a=[];return E.forEach((b=>{const d=c.GetDataInfo(b);d&&a.push(d)})),a}();(0,
d.Cr)(a,null)&&(f.AddCommand({cmdCommand:"multiselect-disable-user-data-breach-warning",
cmdCaption:x("Cmd_ExcludeFromSecurityScore"),cmdCssClass:"rf-menu-cmd-disable-user-data-breach-warning",cmdShowImage:!0,
cmdAction:()=>(0,o.fI)((async()=>{D=!1;const a=[...E];if(0===a.length)return void await(0,
i.nn)(v.LocalizeString("StartPage_NoSelectedItems_Error"));const c=1===a.length?`'${(0,
l.XE)(a[0],!1)}'`:await x("StartPage_SelectedItems",[(0,q.bf)(a.length),await x((0,
l.Y5)(1,!0))]),d=x("StartPage_ExcludeFromSecurityScore_Confirmation",[c]);2===await(0,
i.dD)(d,x("StartPage_DialogButton_Yes"),x("StartPage_DialogButton_No"))&&(await b.DisableSecurityWarningForMultiselectItems(!0,a),
S())})())}),f.AddSeparator()),(0,d.Jh)(a)&&(f.AddCommand({cmdCommand:"multiselect-enable-user-data-breach-warning",
cmdCaption:x("Cmd_IncludeToSecurityScore"),cmdCssClass:"rf-menu-cmd-enable-user-data-breach-warning",cmdShowImage:!0,
cmdAction:()=>{D=!1,(0,o.fI)((async()=>{await b.DisableSecurityWarningForMultiselectItems(!1,[...E]),S()})())}}),
f.AddSeparator());if(g.filter((a=>1===a.type||2===a.type)).length===g.length){const a={cmdCommand:"multiselect-batch-login",
cmdCaption:x("StartPage_Cmd_BatchLogIn"),cmdCssClass:"rf-menu-cmd-login",cmdShowImage:!0,hidden:!0};(0,h.$R)(a,g,!0,(()=>{D=!1
}))&&(f.AddCommand(a),f.AddSeparator())}f.AddCommand({cmdCommand:"multiselect-move",cmdCaption:x("Cmd_Move_Flat"),
cmdCssClass:"rf-menu-cmd-move",cmdShowImage:!0,cmdAction:()=>{D=!1,(0,o.fI)((0,e.ng)([...E],!0,b,v))}}),f.AddCommand({
cmdCommand:"multiselect-clone",cmdCaption:x("Cmd_Clone_Flat"),cmdCssClass:"rf-menu-cmd-clone",cmdShowImage:!0,cmdAction:()=>{
D=!1,(0,o.fI)((0,e.ng)([...E],!1,b,v))}}),f.AddCommand({cmdCommand:"multiselect-unpin",
cmdCaption:x("StartPage_Cmd_RemoveFromPinned"),cmdCssClass:"rf-menu-cmd-unpin",cmdShowImage:!0,
hidden:"category-pinned"!==a.GetCategory(),cmdAction:()=>{D=!1,(0,o.fI)((async()=>{await b.PinMultiselectItems(!1,[...E]),S()
})())}}),f.AddCommand({cmdCommand:"multiselect-delete",cmdCaption:x("Cmd_Delete_Flat"),cmdCssClass:"rf-menu-cmd-delete",
cmdShowImage:!0,cmdAction:()=>{D=!1,(0,o.fI)((0,e.TH)([...E],b,a,v))}})
;return await s.HasFolders("has-folders-multiselect-context-menu",null)||(f.ShowCommand("multiselect-move",!1),
f.ShowCommand("multiselect-clone",!1)),f}async function Q(b){const c=await P();if(!C)return;const d=c.GetSortedCommands(),e=R()
;(0,k.Nt)(e);for(const a of d){if(a.hidden)continue;if(a.separator)continue
;"multiselect-disable-user-data-breach-warning"===a.cmdCommand&&(a.cmdCaption=x("Cmd_ExcludeFromSecurityScore")),
"multiselect-enable-user-data-breach-warning"===a.cmdCommand&&(a.cmdCaption=x("Cmd_IncludeToSecurityScore"))
;l(a,!1).classList.add("cmd-framed")}e.appendChild(r("div",{className:"rf-flex-gap"}));const f={
cmdCommand:"multiselect-select-all",cmdCaption:x("StartPage_Cmd_SelectAll"),cmdCssClass:"rf-menu-cmd-select-all",
cmdShowImage:!0,cmdAction:()=>{(0,o.fI)((async()=>{const a=f.cmdElement
;a&&!a.classList.contains("rf-cmd-processing")&&(a.classList.add("rf-cmd-processing"),await N(),
a.classList.remove("rf-cmd-processing"))})())}},h={cmdCommand:"multiselect-deselect",cmdCaption:x("StartPage_Cmd_Deselect",[(0,
q.bf)(b)]),cmdCssClass:"rf-menu-cmd-deselect",cmdShowImage:!0,cmdAction:S},i=l(f,!1);return l(h,!0),
void(a.IsSearchResultShown()&&((0,n.SE)(i),(0,o.fI)((async()=>{const a=await(0,g.x3)()
;C&&i.parentElement===e&&(null===a?await(0,o.xy)(100):a.length<200&&(0,n.l5)(i))})())));function l(a,b){let c;const d=r("div",{
className:"rf-multiselect-cmd-item-image"}),f=r("div",{className:"rf-multiselect-cmd-item "+(a.cmdCssClass||"")
},b?null:d,c=r("div",{className:"rf-multiselect-cmd-item-text"}),b?d:null);return a.cmdCaption&&((0,j.$9)(c,a.cmdCaption),(0,
j.YC)(f,a.cmdCaption)),f.addEventListener("click",(b=>{a.cmdAction&&a.cmdAction(b)})),a.cmdElement=f,e.appendChild(f),f}}
function R(){let b=y.dataItems.multiselectCmdbar
;return a.IsSearchResultShown()?b=y.searchResults.multiselectCmdbar:"category-security-center"===a.GetCategory()&&(b=y.securityCenter.multiselectCmdbar),
b}function S(){C=!1,D=!1,E.clear(),F=null,G=null,H=!1,I.clear(),y.main.classList.remove("rf-multiselect-in-process"),
Z().forEach((a=>{a.classList.remove("rf-multiselect-selected","rf-multiselect-hovered")})),
document.querySelectorAll("#v8 .rf-items").forEach((a=>{a.classList.remove("rf-multiselect-in-process")})),J&&(J.disconnect(),
J=null),(0,n.SE)(R()),(0,o.fI)(M()),B&&(B=!1,z&&(0,n.SE)(z))}function T(){if(F){const a=(0,k.Yw)(F,".rf-items")
;return a&&a.classList.contains("rf-dragging-in-process")||!1}return!1}function U(){Z().forEach((a=>{
a.classList.remove("rf-multiselect-hovered")}))}function V(){G&&F&&(U(),(0,o.fI)((async()=>{try{Y(await W(F,G)).forEach((a=>{
a.classList.add("rf-multiselect-hovered")}))}catch(a){return}})()))}async function W(a,b){const c=await X(),d=(0,j.eK)(a),e=(0,
j.eK)(b);let f=c.indexOf(d),g=c.indexOf(e);return f>g&&([f,g]=[g,f]),f>=0&&g>=0&&g<c.length?c.slice(f,g+1):[]}
async function X(){let b=[];if(a.IsSearchResultShown())for(D=!0;;){const a=await(0,g.x3)();if(!C||!D)throw(0,p.JS)()
;if(null!==a){b=a;break}await(0,o.xy)(50)
}else if("category-security-center"===a.GetCategory())b=a.GetController(9).GetAllItemPaths();else{
a.GetController(3).GetAllShownItems().forEach((a=>{8!==a.type&&b.push(a.path)}))}return D=!1,b}function Y(a){const b=Z(),c=[]
;return b.forEach((b=>{const d=(0,j.eK)(b);-1!==a.indexOf(d)&&c.push(b)})),c}function Z(){
return t(a)?a.IsSearchResultShown()?Array.from(document.querySelectorAll("#v8 .rf-search-result-view .rf-items .rf-list-item-row")):Array.from(document.querySelectorAll("#v8 .rf-data-view .rf-items .rf-list-item-row")):"category-security-center"===a.GetCategory()?Array.from(document.querySelectorAll("#v8 .rf-security-center .rf-items.rf-multiselect-in-process .rf-security-center-item")):Array.from(document.querySelectorAll("#v8 .rf-data-view .rf-items-section-main .rf-items .rf-item"))
}function aa(){const b=R(),c=b.offsetWidth;let d=850,e=730;"category-pinned"===a.GetCategory()?(d=980,
e=820):"category-security-center"===a.GetCategory()&&("security-center-compromised"===a.GetSortOrder()||"security-center-excluded"===a.GetSortOrder()?(d=1100,
e=830):(d=810,e=710)),b.classList.remove("medium","compact"),c<=e?b.classList.add("compact"):c<=d&&b.classList.add("medium")}
function ab(){(0,o.fI)((async()=>{await O()?S():(!C&&A&&L(A),await N())})())}function ac(b){if(!A||!z)return;if(C)return void(0,
n.l5)(z);const c=b.target;t(a)?(0,k.LP)(c,".rf-list-item-header")||(0,k.LP)(c,".rf-list-item-row:not(.rf-item-folder)")?(0,
n.l5)(z):(0,n.SE)(z):"category-security-center"===a.GetCategory()&&((0,k.LP)(c,".table-items")?(0,n.l5)(z):(0,n.SE)(z))}
function ad(){C?B=!0:A&&z&&(0,n.SE)(z)}}function t(a){
return a.IsSearchResultShown()||-1!==["category-folders","category-sharing-center","category-authenticator"].indexOf(a.GetCategory())&&"rf-view-list"===a.GetItemsViewStyle()
}function u(a,b,c){let d=[];var e
;document.elementsFromPoint?d=document.elementsFromPoint(a,b):(e=document)&&void 0!==e.msElementsFromPoint&&(d=Array.from(document.msElementsFromPoint(a,b)))
;for(const f of d){const a=c?"rf-list-item-row":"rf-item";if(f.classList.contains(a)&&f.matches("#v8 .rf-items ."+a))return f}
return null}},3342:function(a,b,c){"use strict";c.d(b,{C:function(){return F}})
;var d=c(41107),e=c(11834),f=c(63744),g=c(37367),h=c(89090),i=c(65852),j=c(30045),k=c(97184),l=c(12072),m=c(65239),n=c(37694),o=c(18939),p=c(47333),q=c(10637),r=c(95697),s=c(4234),t=c(73529),u=c(54811),v=c(67793),w=c(94652),x=c(12131),y=c(83382),z=c(63956),A=c(13113),B=c(78440),C=c(69893),D=c(4153),E=(c(13117),
c(91764)._);function F(a,b,c,f,q,F,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X){
const Y=a,Z=b,aa=b.rfo,ab=c,ac=f,ad=q,ae=F,af=J,ag=K,ah=L,ai=M,aj=N,ak=O,al=ak.login,am=U,an=V,ao=X,ap=W
;let aq,ar=null,as=!1,at=!1;const au=Q,av=P;let aw=null;const ax=function(a,b,c,d){const f=a,g=b,h=(0,B.tG)();let i=null
;const j={Show:k,Hide:l};return j;function k(){(0,B.fI)((async()=>{if(!c.WatchForLoginStatus()){const a=await c.GetAccountInfo()
;if(2===(0,r.z)(a)){if(1===i)return;return i=1,void h.Start((async b=>G(f,a,c,d,b)))}}0!==i&&(i=0,h.Start((async a=>{
await H(f,(()=>(0,n.Qo)("setup-page",g,{OnLogin:async a=>{try{await c.OnLogin()}catch(b){(0,C.r5)(b,C.kd)||await(0,
e.nn)(`Cannot Log In: ${(0,C.EB)(b)}`)}},GetAccountDisplayInfo:c.GetAccountDisplayInfo},d)),!1,a)})))})())}function l(){
h.Cancel(),i=null}}(al,au,Object.assign(Object.assign({},(0,g.HK)(ab,Z.rfo,Y,ap)),{WatchForLoginStatus:()=>(at=!0,aq=aM(),aq),
GetAccountInfo:aL,GetAccountDisplayInfo:aK,OnLogin:async()=>null==ar?void 0:ar(null)}),ap),ay=function(a,b,c,d,f){
const g=a,h=(0,B.tG)(),i=(0,o.n)(),k={Show:l,Hide:m};return k;function l(){i.Init(g,null,[]),h.Start((async a=>{let h;try{
h=await c.ShouldShowLoadingBeforeLogin()}catch(l){if((0,C.r5)(l,C.kd))h=!1;else{if((0,C.bf)(l))return void await(0,
e.nn)(`Cannot log in: ${(0,C.EB)(l)}`);h=!1}}if(h){let b=null;if(await H(g,(()=>((0,B.fI)((async()=>{try{await c.OnLoading(a)
}finally{b&&b()}})()),(0,j._3)((async a=>(b=a,E("div",{className:"rf-loading"})))))),!1,a),b=null,a.ShouldStop())return}
if(!c.StartWatchForLoginStatus()){const b=await c.GetAccountInfo();if(2===(0,r.z)(b))return void await G(g,b,c,d,a)}
const i=await c.GetAccountDisplayInfo();let k=!1;try{k=await c.ShouldUseSSOLogin(i.userId,a)}catch(l){if((0,C.r5)(l,C.kd))return
;if((0,C.bf)(l))return void await(0,e.nn)(`Cannot log in: ${(0,C.EB)(l)}`)}if(k)try{await H(g,(()=>(0,
n.C8)("setup-page",d,i.userId,i.serverTitle,"Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.",{
ChangeAccount:c.OnChangeAccount,async SSOLogin(a){const b=(0,B.f4)(null,null,null),d=await c.GetLoginMethod(a,b)
;return await c.LoginViaSSO(a,(0,D.TT)(d.loginMethod.sso),!1,{oidcConfig:d.oidcConfig,returnUrlAdditionalFragmentParams:(0,
A.XG)(location.hash)},b),""}})),!0,a)}catch(l){(0,x.tM)(l,15)?await G(g,await c.GetAccountInfo(),c,d,a):(0,
C.r5)(l,C.kd)||await(0,e.nn)("SSO error: "+(0,C.EB)(l))}else{let h;!function(a){a[a.LoggenIn=0]="LoggenIn",
a[a.NotAllowedByLicense=1]="NotAllowedByLicense",a[a.ChangeAccount=2]="ChangeAccount"}(h||(h={}));try{await H(g,(()=>(0,
n.cx)("setup-page",!0,null,b,{GetAccountDisplayInfo:c.GetAccountDisplayInfo,OnLogin:async(a,b)=>{c.StopWhatchForLoginStatus()
;try{await c.OnLogin(a,b)}catch(l){if((0,x.tM)(l,15))return h.NotAllowedByLicense;throw c.StartWatchForLoginStatus(),l}
return 2===(0,r.z)(await c.GetAccountInfo())?h.NotAllowedByLicense:h.LoggenIn},onForgotPassword:c.OnForgotPassword,
onChangeAccount:async()=>(await c.OnChangeAccount(),h.ChangeAccount)
},d,f)),!0,a)===h.NotAllowedByLicense&&(c.StartWatchForLoginStatus(),await G(g,await c.GetAccountInfo(),c,d,a))}catch(l){(0,
C.r5)(l,C.kd)||await(0,e.nn)("Login error: "+(0,C.EB)(l))}}}))}function m(){h.Cancel(),i.UnInit()}
}(al,au,Object.assign(Object.assign({},(0,g.HK)(ab,Z.rfo,Y,ap)),{async ShouldShowLoadingBeforeLogin(){
if("stand-alone"===ah.extensionMode){if(!(1===await Z.options.GetValue("AuthenticationMethod",1)))return!1
;return!!(await Z.service.GetRfoConnectionInfo(!0)).password}return!1},StartWatchForLoginStatus:()=>(at=!0,aq=aM(),aq),
StopWhatchForLoginStatus(){at=!1,aq=null},GetAccountInfo:aL,GetAccountDisplayInfo:aK,async OnLoading(a){for(let c=0;c<10;c++){
const c=Z.service.GetGlobalStatus();if(!c.m_connected_to_server||c.m_storage_connected)return ai.UpdatePage(!0),void await(0,
B.Gu)(5e3,a);await(0,B.Gu)(1e3,a);try{await Z.data.GetInfo("",0,a)}catch(b){if((0,C.r5)(b,C.kd))return;if((0,x.tM)(b,10))return}
}},async OnLogin(a,b){await aP({password:a},b)},async OnChangeAccount(){ai.StartAccountSetup(await aJ())},
async OnForgotPassword(){throw await Y.OpenUrl({url:p.i0,newTab:!0,reuseExisting:!0},null),(0,C.JS)()},
async ShouldUseSSOLogin(a,b){if(!await Z.options.GetValue("AccountEnterprise",!0))return!1
;return"sso"===(await aQ(a,b)).loginMethod.type},GetLoginMethod:async(a,b)=>aQ(a,b),LoginViaSSO:aR,
async ContinueSSOLoginAfterRedirect(a,b){await aS(a,b)},async ContinueSwitchToSSOAfterRedirect(a,b){await aT(a,b)}
}),ap,ao),az=function(a,b,c,f,g,h){let i={rfoServer:null,screen:"choose"};const j=a,l=b;let m,o=null;!function(a){
a[a.LoginWithCredentials=0]="LoginWithCredentials",a[a.CreateAccount=1]="CreateAccount",
a[a.SignUpEnterprise=2]="SignUpEnterprise"}(m||(m={}));const q={Show:r,Hide:s,SetSetupDialogInfo:t};return q;function r(){
o||(o=(0,B.YZ)({action:u})),(0,B.uT)(o.Execute(null),"SetupPane:Show")}function s(){o&&(o.Cancel(),o=null)}function t(a){i=a}
async function u(a){const b="new-account"===i.screen,c=await f.ShouldCompleteAppInstallation(a);if(c)try{
if(await y(c,a))return void await f.AccountSetupFinished(b)}catch(j){(0,C.r5)(j,C.kd)||(0,x.tM)(j,10)||(0,
d.Fp)(`Cannot configure RoboForm Desktop: ${(0,C.EB)(j)}`)}const g=f.ShouldRequireInstallatonWhenSignUp()
;let h=g||"existing-account"===i.screen?m.LoginWithCredentials:"new-account"===i.screen?m.CreateAccount:await z(a);for(;;){
switch(h){case m.LoginWithCredentials:{const b=await E(a);if("create-account"===b){h=m.CreateAccount;continue}
if("not-allowsed-by-license"===b)break;if("sso-login-for-company-user"===b){try{await F(a)}catch(j){(0,C.r5)(j,C.kd)||await(0,
e.nn)((0,C.EB)(j)),h=m.LoginWithCredentials;continue}break}}break;case m.CreateAccount:{
if(g)return f.OpenInstallationInstructions(a);if(l)try{let a=await f.GetServerStartPageUrl()
;if(a)return a+="?init=setup-account-new",void location.replace(a)}catch(j){}const b=await G(a)
;if("login-with-credentials"===b){h=m.LoginWithCredentials;continue}if("logged-in"===b)break
;if("not-allowsed-by-license"===b)break;try{await J(b,a)}catch(j){(0,C.r5)(j,C.kd)||await(0,e.nn)(`Cannot log in: ${(0,
C.EB)(j)}`),h=await z(a);continue}}break;case m.SignUpEnterprise:await f.OpenSignUpEnterprise({userType:"new"},a)}break}
await f.AccountSetupFinished(b)}async function y(a,b){const e=(0,B.YZ)({action:a=>H(j,(()=>(0,d.ES)()),!1,a)});(0,
B.fI)(e.Execute(b));try{return await f.CompleteAccountTransition(null,b),!0}catch(i){if(!(0,x.tM)(i,1))throw i}finally{
e.Cancel()}if(a.userId&&await f.ShouldUseSSOLogin(a.userId,b))return await H(j,(()=>(0,
n.C8)("setup-page",g,a.userId||"",I(a.serverUrl||v.s8),"Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.",{
ChangeAccount:null,async SSOLogin(a){const c=await f.GetLoginMethod(a,b);return await f.LoginViaSSO(a,(0,
D.TT)(c.loginMethod.sso),!0,{oidcConfig:c.oidcConfig,returnUrlAdditionalFragmentParams:(0,A.XG)(location.hash)},b),""}})),!0,b),
!0;return await H(j,(()=>(0,n.cx)("setup-page",!1,null,c,{GetAccountDisplayInfo:async()=>({userId:a.userId||"",
serverTitle:I(a.serverUrl||v.s8)}),OnLogin:async(a,b)=>(await f.CompleteAccountTransition(a,b),!0),onForgotPassword:async()=>{
f.OnOpenUrl(p.i0)},onChangeAccount:async()=>!1},g,h)),!0,b)}async function z(a){return H(j,(()=>(0,k.iz)("setup-page",g,K(),c,{
OnCreateNewAccount:a=>a(m.CreateAccount),OnSignUpEnterprise:a=>a(m.SignUpEnterprise),
OnLoginWithExistingAccount:a=>a(m.LoginWithCredentials)})),!1,a)}async function E(a){return H(j,(()=>(0,
k.JR)("setup-page",g,K(),c,{OnLogin:async(a,b,c)=>{try{await f.Login(i.rfoServer||"",a,b,c)}catch(d){if((0,
x.tM)(d,15))return"not-allowsed-by-license";throw d}return 0},OnSSOLoginForCompanyUser:()=>"sso-login-for-company-user",
OnCreateNewAccount:()=>"create-account",OnSignUpEnterprise:()=>f.OpenSignUpEnterprise({userType:"new"},a),
OnForgotPassword:()=>f.OnOpenUrl(p.i0)})),!0,a)}async function F(a){let b,c,e,k=null;for(;;){b=await H(j,(()=>(0,
n.B0)(g,b,K(),e)),!0,a);try{k=await m(),c=await f.GetLoginMethod(b,a);break}catch(o){e=(0,
C.r5)(o)?o.description:await g.LocalizeString("Passw_InvalidMail")}finally{null==k||k(),k=null}}e=void 0
;const l=await g.LocalizeString("Passw_Generic_Header");switch(c.loginMethod.type){case"mp":await H(j,(()=>(0,
n.kg)("setup-page login-dialog",l,{async OnOk(a,c){await f.Login(i.rfoServer||"",b,a,c)}},g,h)),!0,a);break;case"sso":
if(void 0===c.loginMethod.sso)throw(0,C.ZU)(C.V2,"Incorrect login method");k=await m();try{
await f.LoginViaSSO(b,c.loginMethod.sso,!0,{oidcConfig:c.oidcConfig,returnUrlAdditionalFragmentParams:(0,A.XG)(location.hash)
},a)}finally{null==k||k(),k=null}break;default:throw(0,C.ZU)(C.V2,`Unknown login method to set: ${c.loginMethod.type}`)}
async function m(){const b=(0,B.YZ)({action:a=>H(j,(()=>(0,d.ES)()),!1,a)});return(0,B.fI)(b.Execute(a)),()=>{b.Cancel()}}}
async function G(a){let b=!0;return H(j,(()=>{return(0,k.tw)("setup-page",g,K(),{IsPasswordBreached:f.IsPasswordCompromised,
OnCreateNewAccount:a,OnHaveAccount:a=>a("login-with-credentials"),OnOpenTerms:()=>f.OnOpenUrl(p.$j),
OnOpenPrivacyPolicy:()=>f.OnOpenUrl(p.Bz)});async function a(a,c,d,e){try{await f.CreateAccount(a,c,d,e)}catch(g){if((0,
w.fZ)(g)&&(0,w.UX)(g)&&b){b=!1;try{return await f.Login("",a,c,e),"logged-in"}catch(h){if((0,
x.tM)(h,15))return"not-allowsed-by-license"}}throw g}return{userId:a,password:c,email:a,fullName:d,phone:""}}}),!1,a)}
async function J(a,b){return H(j,(()=>(0,k.x4)("setup-page",g,a.userId,a.password,(async b=>{
await f.Login("",a.userId,a.password,b);try{await f.SetSuitableAuthenticationMethodAfterAccountCreation(a.password,b)}catch(c){
(0,C.r5)(c,C.kd)||await(0,e.nn)(`Cannot set account settings: ${(0,C.EB)(c)}`)}try{
await f.CreateInitialIdentity(a.fullName,a.email,a.phone,b)}catch(c){(0,C.r5)(c,C.kd)||await(0,
e.nn)(`Cannot create Initial Identity: ${(0,C.EB)(c)}`)}}))),!1,b)}function K(){return I(i.rfoServer||v.s8)}
}(al,"local"===ah.type,au,{async CreateAccount(a,b,c,d){if(ah.testRoboFormSetup){await(0,B.Gu)(5e3,d);try{
await(null==am?void 0:am.AccountCreated(a,d))}catch(h){}return}const e={},f=await ap.GetLanguageTag(d);f&&(e.language=(0,
y.YW)(f)),c&&(e.name=c);const g=(0,i.gV)();if(g)e.affId=g;else{const{AffId:a}=await Z.options.Get({AffId:""});a&&(e.affId=a)}
await(0,D.TT)(Z.rfo).CreateAccount(a,b,e,d);try{await(null==am?void 0:am.AccountCreated(a,d))}catch(h){}},
IsPasswordCompromised:av.IsPasswordCompromised,async Login(a,b,c,d){await aP({server:a,email:b,password:c},d)},
async ShouldUseSSOLogin(a,b){if(!await Z.options.GetValue("AccountEnterprise",!0))return!1
;return"sso"===(await aQ(a,b)).loginMethod.type},GetLoginMethod:aQ,LoginViaSSO:aR,ContinueSSOLoginAfterRedirect:aS,
async ContinueSwitchToSSOAfterRedirect(a,b){await aT(a,b)},async SetSuitableAuthenticationMethodAfterAccountCreation(a,b){
if("use-native"===ah.extensionMode){
await Z.options.GetValue("AccountEnterprise",!1)||(await Z.settings.SetValue("AuthenticationMethod",1),await(0,
p.qj)(Z.settings,1),await Z.service.StorePasswordInSystemProtectedStorage(a,b))}},async CreateInitialIdentity(a,b,c,d){
if(!await(0,u.h$)(Z.policies))return;const e=await(0,u.lb)(an,ap,d),f=(0,u.Pq)(a,b,c,e),g=(0,p.eQ)(f,{}),h="/"+(0,s.wE)(5,0)
;await(0,u.Oe)(h,g,Z.data,d)},async ShouldCompleteAppInstallation(a){if("stand-alone"===ah.mode)return null
;if(!ah.isDesktopAppSetupWithAccountInfoFromExtensionSupported)return null;try{
if((await Z.service.GetRFOnlineUserId()).userId)return null}catch(b){if(!(0,C.r5)(b,C.Y$))return null}try{
return await Y.CallBackgroundScript("GetAccountConnectionInfoStoredInExtension",null,a)}catch(b){return(0,C.r5)(b,C.kd)||(0,
d.Fp)(`Cannot get connection info: ${(0,C.EB)(b)}`),null}},async CompleteAccountTransition(a,b){
await Y.CallBackgroundScript("SetupDesktopAppWithAccountInfoFromExtension",null,b,a)},OnOpenUrl(a){(0,B.fI)(Y.OpenUrl({url:a,
newTab:!0},null))},GetServerStartPageUrl:async()=>S(),async AccountSetupFinished(b){let c=!1
;if(ag&&b&&"local"!==ah.type&&await(0,p.Bt)(ag,(()=>(c=!0,"")),null),c)try{
await a.CallBackgroundScript("ReloadBrowserTabWithLocalWebPage",null,null,"start-page","")}catch(d){}ai.OnAccountSetupFinished()
},OpenSignUpEnterprise:async(a,b)=>ab.OpenSignUpEnterprise(a,b),
ShouldRequireInstallatonWhenSignUp:()=>null!==T&&"rfo"===L.type&&"stand-alone"===L.mode,OpenInstallationInstructions(){
if(null===T)throw(0,x.rb)(9,"Cannot open installation instruction page: Not Implemented");return T()}},ap,ao),aA={
GetCurrentPassword:()=>aw,GetMasterPasswordRestrictons:async()=>(0,u.dt)(Z.policies),
IsPasswordCompromised:av.IsPasswordCompromised,async WasNewMasterPasswordAlreadyUsed(a,b,c){
if(!await Z.options.GetValue("AccountEnterprise",!1))return!1;const d=await Z.policies.GetValue("EnforceMPHistory",0)
;if(0===d)return!1;try{return await Z.service.WasNewMasterPasswordAlreadyUsed(a,b,d,c)}catch(e){if((0,x.tM)(e,9)||(0,
x.tM)(e,7))return!1;throw e}},async ChangeMasterPassword(a,b,c){await(0,D.TT)(Z.rfo).ChangeAccountPassword(a,b,c)},
async Login(a,b){await aP({password:a},b)}},aB={GetCurrentLoginMethod:aQ,GetCurrentPassword:()=>aw,
IsMasterPassword:(a,b)=>Z.service.IsMasterPassword(a,b),SSOLoginAndGetAccountLoginData(a,b,c,d,e){const f=ac();if(!f)throw x.lU
;return f.SSOLoginAndGetAccountLoginData(a,b,c,d,e)},GetAccountInfo:async a=>Z.service.GetRoboFormAccountInfo(a),
GetMasterPasswordRestrictons:async()=>(0,u.dt)(Z.policies),IsPasswordCompromised:av.IsPasswordCompromised,
async WasNewMasterPasswordAlreadyUsed(a,b,c){if(!await Z.options.GetValue("AccountEnterprise",!1))return!1
;const d=await Z.policies.GetValue("EnforceMPHistory",0);if(0===d)return!1;try{
return await Z.service.WasNewMasterPasswordAlreadyUsed(a,b,d,c)}catch(e){if((0,x.tM)(e,9)||(0,x.tM)(e,7))return!1;throw e}},
async ChangeLoginMethodToMasterPassword(a,b,c,d,e){var f;if(!ae)throw x.lU
;await(null===(f=ae())||void 0===f?void 0:f.ChangeLoginMethodToMasterPassword(a,c,d,b,e))},
SkipLoginMethodSwitching:aa.SkipLoginMethodSwitching,async ChangeLoginMethodToSSO(a,b,c,d,e){const f=ae();if(!f)throw(0,
x.rb)(9,"Login Method switching is not implemented. Please update or try different client")
;return f.ChangeLoginMethodToSSO(a,b,c,d,e)},async Login(a,b){await aP({password:a},b)},SyncInBackground:ab.SyncInBackground
},aC={FallbackOnLoginPage(){(0,h.$)(ay,aH)},IsMasterPassword:(a,b)=>Z.service.IsMasterPassword(a,b),
ContinueSSOLoginAndGetAccountLoginData(a,b){const c=ad();if(!c)throw x.lU;return c.ContinueSSOAndGetAccountLoginData(a,b)},
GetMasterPasswordRestrictons:async()=>(0,u.dt)(Z.policies),IsPasswordCompromised:av.IsPasswordCompromised,
async WasNewMasterPasswordAlreadyUsed(a,b,c){if(!await Z.options.GetValue("AccountEnterprise",!1))return!1
;const d=await Z.policies.GetValue("EnforceMPHistory",0);if(0===d)return!1;try{
return await Z.service.WasNewMasterPasswordAlreadyUsed(a,b,d,c)}catch(e){if((0,x.tM)(e,9)||(0,x.tM)(e,7))return!1;throw e}},
async ChangeLoginMethodToMasterPassword(a,b,c,d,e){var f;if(!ae)throw x.lU
;await(null===(f=ae())||void 0===f?void 0:f.ChangeLoginMethodToMasterPassword(a,c,d,b,e))},
async ChangeLoginMethodToSSO(a,b,c,d,e){const f=ae()
;if(!f)throw(0,x.rb)(9,"Login Method switching is not implemented. Please update or try different client")
;return f.ChangeLoginMethodToSSO(a,b,c,d,e)},async Login(a,b,c){await aP({email:a,password:b},c)},
ContinueSwitchToSSOAfterRedirect:aT},aD=function(a,b,c){const d=a,e=c,f=(0,o.n)();let g=null;const h={Show:i,Hide:j};return h
;function i(){f.Init(d,null,[]),g||(g=(0,B.YZ)({action:k})),(0,B.uT)(g.Execute(null),"ChangeMasterPasswordPane:Show")}
function j(){f.UnInit(),g&&(g.Cancel(),g=null)}async function k(a){await f.ShowViewAndWaitResult((0,
l.qz)(b.GetCurrentPassword(),await b.GetMasterPasswordRestrictons(),"setup-page",{IsPasswordCompromised:b.IsPasswordCompromised,
WasNewMasterPasswordAlreadyUsed:b.WasNewMasterPasswordAlreadyUsed,ChangeMasterPassword:b.ChangeMasterPassword,Login:b.Login
},e,a),!1,a),f.UnInit()}}(al,aA,ap),aE=function(a,b,c,d){const f=a,g=c,h=d,i=(0,o.n)();let j=null;const k={Show:l,Hide:n}
;return k;function l(){i.Init(f,null,[]),j||(j=(0,B.YZ)({action:p})),(0,B.uT)(j.Execute(null),"ChangeLoginMethodPane:Show")}
function n(){i.UnInit(),j&&(j.Cancel(),j=null)}async function p(a){try{
const c=b.GetCurrentPassword(),d=await b.GetAccountInfo(a);if(!d.email||!d.loginMethodToSwitch)throw(0,
C.ZU)(C.V2,"Unexpected error: cannot get information about account. Please try again or contact support if error is persistent")
;const e=await b.GetCurrentLoginMethod(d.email,a),f={loginMethodToSwitch:d.loginMethodToSwitch,oidcConfig:d.oidcConfig}
;await i.ShowViewAndWaitResult((0,
m.b)(d.email,c,await b.GetMasterPasswordRestrictons(),e.loginMethod,e.oidcConfig||null,d.loginMethodToSwitch,d.oidcConfig||null,d.canSkipLoginMethodToSwitch||!1,(0,
A.XG)(location.hash),f,"setup-page",b,g,h,a),!1,a)}catch(c){(0,C.au)(c),await(0,e.nn)((0,C.EB)(c)),await p(a)}}
}(al,aB,ap,ao),aF=function(a,b,c){const f=a,g=c,h=(0,o.n)();let i=null;const j={Show:k,Hide:m};return j;function k(){
h.Init(f,null,[]),i||(i=(0,B.YZ)({action:n})),(0,B.uT)(i.Execute(null),"HandleSSORedirectPane:Show")}function m(){h.UnInit(),
i&&(i.Cancel(),i=null)}async function n(a){const i=(0,B.YZ)({action:a=>H(f,(()=>(0,d.ES)()),!1,a)});try{(0,B.fI)(i.Execute(a))
;const d=(0,t.nn)(location.href),e=location.href;switch(location.hash=(0,t.Lq)(location.hash),d){case t.pM.Login:{
const d=await b.ContinueSSOLoginAndGetAccountLoginData(e,a);let f=null;if(d.clientData&&(f=JSON.parse(d.clientData)),
!d.email||!d.password)throw(0,C.ZU)(C.rS,"Incorect login data. Please try again.");if(f&&f.loginMethodToSwitch){
const e=f.loginMethodToSwitch;switch(f.loginMethodToSwitch.type){case"mp":{i.Cancel();const f=await h.ShowViewAndWaitResult((0,
l.rm)("setup-page",g,d.password,await b.GetMasterPasswordRestrictons(),{IsPasswordCompromised:b.IsPasswordCompromised,
WasNewMasterPasswordAlreadyUsed:b.WasNewMasterPasswordAlreadyUsed,OnChangeMasterPassword:async(a,c,f,g)=>{
await b.ChangeLoginMethodToMasterPassword(d.email||"",a,c,e,f),g(a)}}),!1,a);await h.ShowViewAndWaitResult((0,
l.Dn)("setup-page",c,f,{OnDone:async(a,c)=>{await b.Login(d.email||"",f,a),c()}}),!1,a);break}case"sso":
await b.ChangeLoginMethodToSSO(d.email,d.password,f.loginMethodToSwitch,{oidcConfig:f.oidcConfig,
returnUrlAdditionalFragmentParams:(0,A.XG)(location.hash)},a)}}else await b.Login(d.email,d.password,a);break}
case t.pM.Switching:await b.ContinueSwitchToSSOAfterRedirect(e,a);break;default:throw(0,
C.ZU)(C.rS,"Incorrect redirect url. Please try again")}}catch(j){(0,C.r5)(j,C.kd)||(await(0,e.nn)("SSO Error: "+(0,C.EB)(j)),
b.FallbackOnLoginPage())}finally{i.Cancel()}}}(al,aC,ap);let aG=null;const aH=[ax,ay,az,aD,aE,aF],aI=(0,d.Ou)(ak.main,R,S)
;return{Activate:function(){if(as)return;as=!0,aw=null,(0,z.SE)((0,D.TT)(ak.navigator).main),(0,z.SE)(ak.files),(0,
z.SE)(ak.header),(0,z.l5)(ak.login),(0,z.l5)(ak.loginCopyright),at=!1,aq=null,Z.data.onDataChanged.Add(aU),aG=aO(),(0,
h.$)(aG,aH),ak.main.classList.add("rf-login-page-shown");const a=aG!==az;aI.Show(a),aj.Empty(),(0,e.DN)(),(0,d.DP)(!0)},
Deactivate:function(){if(!as)return;at=!1,aq=null,Z.data.onDataChanged.Remove(aU),aG&&aG.Hide(),as=!1,aw=null,aI.Reset(),(0,
z.SE)(ak.login),(0,z.SE)(ak.loginCopyright),(0,D.TT)(ak.main).classList.remove("rf-login-page-shown"),(0,
D.TT)(ak.main).style.backgroundImage="",(0,z.l5)(ak.header)},UpdateView:function(){if(!as)return;const a=aO();aG!==a&&(aG=a,(0,
h.$)(aG,aH))},Invalidate:()=>{},IsStillActual:()=>as,GetIsStillActual:function(){return function(){return as}},
async SetAccountSetupDialogInfo(a){a||(a=await aJ()),az.SetSetupDialogInfo(a)},SetShowNativeLoginDialog(a){ar=a}}
;async function aJ(){return{rfoServer:await aN(),screen:"choose"}}async function aK(){try{
const a=await Z.service.GetRFOnlineUserId();return{userId:a.userId,serverTitle:I(a.serverUrl)}}catch(a){return{userId:"",
serverTitle:I(await aN()||v.s8)}}}async function aL(){return Z.options.Get({AccountEnterprise:!1,AccountCompanyAdmin:!1,
AccountLicenseTrial:!1,AccountClientReadOnly:!1,AccountClientBlocked:!1,AccountOneFreeDevice:!1,AccountCanSwitchToFreeMode:!1,
AccountCanSetFreeDevice:!1,AccountFreeDeviceSwitchesLeft:0,AccountInitialFreeDeviceSwitch:!1,AccountOneFreeDeviceId:"",
AccountOneFreeDeviceName:"",AccountCanSetReadonlyDevice:!1,AccountReadOnlyDevicesLimitReached:!1})}function aM(){
const a=Z.service.GetGlobalStatus();if("stand-alone"===ah.extensionMode){if(!a.m_connected_to_server||!a.m_logged_in)return!0
}else{if(!a.m_connected_to_server)return!1;if(a.m_one_file){if(!a.m_storage_connected)return!0;if(!a.m_logged_in)return!0}}
return!1}async function aN(){try{return(await Z.service.GetRfoConnectionInfo(!1)).serverUrl}catch(a){return(0,x.tM)(a,9)||(0,
x.tM)(a,7)||(0,C.r5)(a,C.V2)&&a.description.toLowerCase().indexOf("not implemented")>=0||(0,C.r5)(a,C.kd)||(0,
d.Fp)(`Cannot get server URL: ${(0,C.EB)(a)}`),null}}function aO(){
return ah.testRoboFormSetup?az:"stand-alone"===ah.extensionMode?"setup-account"===ah.status?az:"change-login-method"===ah.status?aE:"change-password"===ah.status?aD:"handle-sso-redirect"===ah.status?aF:ay:ah.isAccountSetupSupported&&"setup-account"===ah.status?az:ax
}async function aP(a,b){var c;aw=null;try{await ai.RoboFormLogIn(a,b)}catch(d){throw(0,x.u7)(d)?(0,
x.rb)(9,await W.LocalizeString("SwitchLoginMethod_NewSP_LegacyBG_Error")):d}aw=null!==(c=a.password)&&void 0!==c?c:null}
async function aQ(a,b){try{try{return await aa.GetLoginMethod2(a,b)}catch(c){if((0,x.tM)(c,9)||(0,x.tM)(c,7)||(0,C.o)(c)){
return{loginMethod:await aa.GetLoginMethod(a,b)}}throw c}}catch(c){if((0,x.tM)(c,9)||(0,x.tM)(c,7)||(0,C.o)(c)){return{
loginMethod:{type:"mp"}}}throw c}}async function aR(a,b,c,d,e){try{aw=null,await ai.RoboFormLogInViaSSO(a,b,c,d,e)}catch(f){
throw(0,x.u7)(f)?(0,x.rb)(9,await W.LocalizeString("SwitchLoginMethod_NewSP_LegacyBG_Error")):f}}async function aS(a,b){aw=null
;const c=ad();if(!c)throw(0,x.rb)(9,"SSO redirect handler is not implemented");try{
const d=await c.ContinueSSOAndGetAccountLoginData(a,b);await ai.RoboFormLogIn({email:d.email,password:d.password,
usedLoginMethodType:d.usedLoginMethodType},b)}catch(d){
throw(0,x.u7)(d)?(0,x.rb)(9,await W.LocalizeString("SwitchLoginMethod_NewSP_LegacyBG_Error")):d}}async function aT(a,b){var c
;const d=await(null===(c=af())||void 0===c?void 0:c.ContinueChangeLoginMethodToSSO(a,b));await ai.RoboFormLogIn({
email:null==d?void 0:d.email,password:null==d?void 0:d.password,usedLoginMethodType:"sso"},b)}function aU(a){if(!as)return
;let b=!1;for(const c of a)switch(c.event){case 3:case 2:case 10:case 11:case 9:b=!0}if(b&&aG&&at&&null!==aq){
aM()!==aq&&aG.Show()}}}async function G(a,b,c,d,e){if(b.AccountEnterprise&&!b.AccountCompanyAdmin)await H(a,(()=>(0,
f.Rv)(d)),!1,e);else try{a.classList.add("show-upgrade-ui"),await H(a,(()=>(0,q.J_)(!1,!1,b,d,c)),!1,e)}finally{
a.classList.remove("show-upgrade-ui")}}function H(a,b,c,d){let e=!1;return(0,B.W0)((async(d,f,g)=>{g.onTaskCancel.Add((()=>{
k((0,C.JS)())}));const h=(0,j.BQ)((async(a,b,c)=>E("div",{className:"dialog-view"
},await a.Create(b,c))),b(g)),i=await h.Create((function(a){d(a),l()}),k)
;if(!g.ShouldStop())return c&&document.addEventListener("visibilitychange",m),a.appendChild(i),e=!0,i.focus(),h.OnAfterShow(),
void h.Focus();function k(a){try{f(a)}finally{l()}}function l(){c&&document.removeEventListener("visibilitychange",m),
e&&h.OnBeforeHide(),h.Dispose(),e&&a.removeChild(i),e=!1}function m(){document.hidden||e&&h.Focus()}}),d)}function I(a){
const b=(0,A.GG)(a)?a:"https://"+a;return(0,p.sU)(b)||""}},95890:function(a,b,c){"use strict";c.d(b,{E:function(){return n},
x:function(){return o}});var d=c(48658),e=c(41107),f=c(38221),g=c(31173),h=c(63956),i=c(40371),j=c(78440),k=c(4153),l=(c(13117),
c(91764)._);const m="upgrade-stars-anim.svg";function n(a,b){let c,d,n,o=!1,p=!1
;const q=a,r=a.rf_manager,s=a.rf_items_existance,t=b,u=(0,k.TT)(b.navigator),v=(0,j.SI)(300);let w=!1
;const x=new Set,y=t.main,z=u.main;!function(){const a=t.contextMenuPopup;function b(){y.classList.add("rf-navigator-hovered"),
d()||(0,e.b2)(!1),u.upgradeSelect&&(u.upgradeSelect.style.backgroundImage="")}function c(){
y.classList.remove("rf-navigator-hovered"),d()&&(0,e.b2)(!1),u.upgradeSelect&&(0,h.hX)(m,u.upgradeSelect)}function d(){return(0,
e.DN)(z)}z.addEventListener("scroll",(()=>{d()&&(0,e.b2)(!1)})),z.addEventListener("mouseenter",(()=>{w&&b()})),
z.addEventListener("mouseleave",(a=>{if(w){if(L()){const b=a.target
;null===(0,f.LP)(b,".more-categories-select")&&z.classList.remove("rf-more-categories-shown")}
const b=a.relatedTarget&&null!==(0,f.LP)(a.relatedTarget,".context-menu-popup");d()&&b||c()}})),
a.addEventListener("mouseenter",(()=>{w&&d()&&b()})),a.addEventListener("mouseleave",(a=>{const b=a.relatedTarget&&null!==(0,
f.LP)(a.relatedTarget,".rf-navigator");w&&d()&&!b&&c()}))}();const A=(0,k.TT)(u.foldersPane);let B=!1;const C=(0,
k.TT)(u.dataFilterInput);C.addEventListener("keydown",(function(a){if(a.which===f.O5.ESCAPE)P(),a.preventDefault(),
a.stopPropagation()})),(0,h.uA)(C,(function(){C.value?(0,h.l5)(D):(0,h.SE)(D);G.onFilterChanged.CallAllSync(C.value)}),!1)
;const D=(0,k.TT)(u.dataFilterEraser);D.addEventListener("click",(function(){P()})),(0,h.SE)(D);const E=(0,k.TT)(u.foldersTree)
;E.addEventListener("scroll",(function(){(0,e.DN)(E)&&(0,e.b2)(!1)}));const F=r.GetController(2).GetFoldersTreeView()
;window.addEventListener("resize",(()=>{M(),H(null)}));const G={Activate:function(){var b;if(o)return;o=!0,(0,h.l5)(z),H(null),
R(),"stand-alone"===a.page_status.extensionMode&&(null===(b=a.rf_api.service.onSyncSucceeded)||void 0===b||b.Add(S))},
Deactivate:function(){var b
;(0,h.SE)(z),o=!1,"stand-alone"===a.page_status.extensionMode&&(null===(b=a.rf_api.service.onSyncSucceeded)||void 0===b||b.Remove(S))
},UpdateView:function(a){a&&(p=!1);if(!o)return;if(r.IsEditorShown())return;if((0,j.fI)(N()),(0,j.fI)(O()),p)return;p=!0,J(),(0,
j.fI)(q.GetEmergencyAccess().UpdatePendingEAEventsCount()),(0,j.fI)(async function(){
const a=await r.ShouldShowUpgradePromo(),b=u.sectionUpgrade;if(a){const a=await c();u.upgradeSelect=a,(0,f.Nt)(b),
b.appendChild(a),(0,h.l5)(b)}else(0,h.SE)(b);return;async function c(){const a=q.localization.LocalizeString;return l("div",{
className:"upgrade-select"},await d(),l("div",{className:"buttons-bar"},l("div",{className:"button learn-more-btn",onclick:()=>{
(0,j.fI)(r.ShowUpgradePromo())}},await a("StartPage_Upgrade_Button_LearnMore")),l("div",{className:"separator"}),l("div",{
className:"button upgrade-btn",onclick:()=>{(0,j.fI)(r.OnUpgrade())}},await a("Cmd_License_BuyNow"))))}async function d(){
const a=q.localization,b=a.LocalizeString,c=await q.rf_api.options.Get({AccountLicenseActive:!1,AccountLicenseExpirationTime:0,
AccountClientReadOnly:!1});if(c.AccountClientReadOnly){return l("div",{className:"text"},(0,
e.R1)(await b("StartPage_Upgrade_ReadOnlyMode_Text"),[]))}if(c.AccountLicenseActive&&c.AccountLicenseExpirationTime>0){
const d=new Date(1e3*c.AccountLicenseExpirationTime).toLocaleDateString(await a.GetLanguageTag(null),{day:"numeric",
month:"short"});return l("div",{className:"text"},(0,e.R1)(await b("StartPage_Upgrade_TrialMode_Text"),[l("span",null,d)]))}
return l("div",{className:"text"},(0,e.R1)(await b("StartPage_Upgrade_FreeMode_Text"),[]))}}())},Invalidate:()=>{p=!1},
IsStillActual:()=>o,GetIsStillActual:function(){return function(){return o}},ShowSelector:I,UpdateCategoryAndOrderSelectors:J,
Collapse:H,ToggleMoreCategories:function(){
L()?z.classList.contains("rf-more-categories-shown")?z.classList.remove("rf-more-categories-shown"):z.classList.add("rf-more-categories-shown"):z.classList.remove("rf-more-categories-shown")
},UpdateScrollMode:M,UpdateNarrowStyle:function(){let a=0;F.GetAllFoldersElements().forEach((b=>{(0,
f.Sd)(b)&&(a=Math.max(a,parseInt(b.getAttribute("data-level")||"")||0))
})),a<3?E.classList.add("narrow"):E.classList.remove("narrow")},ShowFoldersTree:function(a){if(a&&B||!a&&!B)return;M(a),a?(B=!0,
z.classList.add("rf-folders-pane-shown")):(B=!1,z.classList.remove("rf-folders-pane-shown"))
;a?u.foldersDropdownHandler.classList.add("shown-popup-menu"):(u.foldersDropdownHandler.classList.remove("shown-popup-menu"),
P());(0,e.b2)(!1),I(1,a,{slideIn:!0,slideOut:!0,onAnimationEnd:()=>{M(a)}})},SetFilterValue:function(a){C.value=a,a?(0,
h.l5)(D):(0,h.SE)(D)},onFilterChanged:(0,i.dU)()};return G;function H(a){const b=window.innerWidth,c=w;let d=c
;if(r.IsInlineEditorShown()){if(null===a)return;d=b<=920+a}else d=b<=1170
;w=d,d?y.classList.add("rf-navigator-collapsed"):(y.classList.remove("rf-navigator-collapsed"),
y.classList.remove("rf-navigator-hovered")),d!==c&&(r.GetController(2).UpdateView(!1),u.upgradeSelect&&(d?(0,
h.hX)(m,u.upgradeSelect):u.upgradeSelect.style.backgroundImage=""))}function I(a,b,c){let d=null;switch(a){case 0:case 1:
d=u.sectionFolders;break;case 2:d=u.sectionPinned;break;case 3:case 4:case 5:d=u.sectionCategories;break;case 6:
d=u.sectionWhyRoboForm;break;case 10:d=u.sectionMoreCategories}let g=null;switch(a){case 0:g=u.categoryFolders;break;case 1:
g=u.foldersPane;break;case 2:g=u.categoryPinned;break;case 3:g=u.categoryLogins;break;case 4:g=u.categoryLoginsAndBookmarks
;break;case 5:g=u.categoryBookmarks;break;case 6:g=u.categoryWhyRoboForm;break;case 10:g=u.categoryEmergencyAccess}
if(null!==d&&null!==g)if(b)(0,h.l5)(d),(0,h.l5)(g),c&&c.slideIn&&((0,e.wz)(g,300,null),c.onAnimationEnd()),x.delete(a);else{
c&&c.slideOut?(0,e.bV)(g,300,(()=>{(0,h.SE)((0,k.TT)(g)),c.onAnimationEnd()})):(0,h.SE)(g);let b=!0
;d.querySelectorAll(".selector-item").forEach((a=>{(0,f.Sd)(a)&&(b=!1)})),b&&(0,h.SE)(d),x.add(a)}}function J(){
const a=r.GetCategory(),b=r.GetSortOrder();switch(F.GetAllFoldersElements().forEach((a=>{a.classList.remove("active")})),
[u.categoryFolders,u.categoryPinned,u.categoryAll,u.categoryLogins,u.categoryBookmarks,u.categoryLoginsAndBookmarks,u.categorySafenotes,u.identity.categoryItem,u.categoryWhyRoboForm,u.categorySecurityCenter,u.categorySharingCenter,u.categoryAuthenticator,u.categoryEmergencyAccess,u.categoryMoreCategories,u.categoryPasswordGenerator].forEach((a=>{
a.classList.remove("active")})),a){case"category-pinned":u.categoryPinned.classList.add("active");break;case"category-folders":{
const a=r.GetFolder(),b=""===a?u.categoryFolders:F.GetFolderElement(a);b&&B&&b.classList.add("active")}
switch(r.GetItemTypeFilter()){case"item-type-filter-logins":u.categoryLogins.classList.add("active");break
;case"item-type-filter-bookmarks":u.categoryBookmarks.classList.add("active");break;case"item-type-filter-logins-and-bookmarks":
u.categoryLoginsAndBookmarks.classList.add("active");break;case"item-type-filter-safenotes":
u.categorySafenotes.classList.add("active");break;case"item-type-filter-identities":
u.identity.categoryItem.classList.add("active");break;default:u.categoryAll.classList.add("active")}break
;case"category-why-roboform":u.categoryWhyRoboForm.classList.add("active");break;case"category-authenticator":
u.categoryAuthenticator.classList.add("active"),u.categoryMoreCategories.classList.add("active");break
;case"category-password-generator":u.categoryPasswordGenerator.classList.add("active"),
u.categoryMoreCategories.classList.add("active");break;case"category-emergency-access":
u.categoryEmergencyAccess.classList.add("active"),u.categoryMoreCategories.classList.add("active");break
;case"category-sharing-center":u.categorySharingCenter.classList.add("active"),u.categoryMoreCategories.classList.add("active")
;break;case"category-security-center":u.categorySecurityCenter.classList.add("active"),
u.categoryMoreCategories.classList.add("active")}const c=u.categoryMoreCategories
;switch(c.classList.remove("more-categories-authenticator","more-categories-password-generator","more-categories-emergency-access","more-categories-sharing-center","more-categories-security-center"),
a){case"category-authenticator":c.classList.add("more-categories-authenticator");break;case"category-password-generator":
c.classList.add("more-categories-password-generator");break;case"category-emergency-access":
c.classList.add("more-categories-emergency-access");break;case"category-sharing-center":
c.classList.add("more-categories-sharing-center");break;case"category-security-center":
c.classList.add("more-categories-security-center")}
if("category-folders"===a?E.classList.add("active"):E.classList.remove("active"),"category-emergency-access"===a){if((0,
h.l5)(t.emergencyAccess.orderSelector),
null!==t.emergencyAccess.orderSelectorContacts&&null!==t.emergencyAccess.orderSelectorTestators)switch(t.emergencyAccess.orderSelectorContacts.classList.remove("active"),
t.emergencyAccess.orderSelectorTestators.classList.remove("active"),b){case"emergency-access-my-contacts":(0,
h.l5)(t.emergencyAccess.newButton),t.emergencyAccess.orderSelectorContacts.classList.add("active");break
;case"emergency-access-im-contact-for":
(0,h.SE)(t.emergencyAccess.newButton),t.emergencyAccess.orderSelectorTestators.classList.add("active")}
}else if("category-password-generator"===a)(0,h.l5)(t.passwordGenerator.orderSelector);else if("category-sharing-center"===a){
if((0,
h.l5)(t.dataItems.orderSelectorSharingCenter),null!==t.dataItems.orderSelectorSharingCenterWithMe&&null!==t.dataItems.orderSelectorSharingCenterByMe)switch(t.dataItems.orderSelectorSharingCenterWithMe.classList.remove("active"),
t.dataItems.orderSelectorSharingCenterByMe.classList.remove("active"),b){case"sharing-center-shared-with-me":
t.dataItems.orderSelectorSharingCenterWithMe.classList.add("active");break;case"sharing-center-shared-by-me":
t.dataItems.orderSelectorSharingCenterByMe.classList.add("active")}
}else if(("category-folders"===a||"category-pinned"===a)&&((0,h.l5)(t.dataItems.orderSelectorSort),
null!==t.dataItems.orderSelectorSortPopular&&null!==t.dataItems.orderSelectorSortRecent&&null!==t.dataItems.orderSelectorSortAlphabet&&(t.dataItems.orderSelectorSortPopular.classList.remove("active"),
t.dataItems.orderSelectorSortRecent.classList.remove("active"),t.dataItems.orderSelectorSortAlphabet.classList.remove("active"),
"category-folders"===a)))switch(b){case"sort-order-popular":t.dataItems.orderSelectorSortPopular.classList.add("active");break
;case"sort-order-recent":t.dataItems.orderSelectorSortRecent.classList.add("active");break;case"sort-order-alphabet":
t.dataItems.orderSelectorSortAlphabet.classList.add("active")}}function K(a){const b=u.flexyGap.clientHeight-10;let c=0
;[7,9,8,10].forEach((a=>{x.has(a)||c++
})),!L()&&c<=1?z.classList.remove("rf-more-categories-collapsed","rf-more-categories-shown"):a?z.classList.add("rf-more-categories-collapsed"):L()?b>50*(c-1)?z.classList.remove("rf-more-categories-collapsed","rf-more-categories-shown"):z.classList.add("rf-more-categories-collapsed"):b<=0?z.classList.add("rf-more-categories-collapsed"):z.classList.remove("rf-more-categories-collapsed","rf-more-categories-shown")
}function L(){return z.classList.contains("rf-more-categories-collapsed")}function M(a){v.Start((async()=>{
z.offsetHeight<z.scrollHeight?z.classList.add("has-vertical-scroll"):z.classList.remove("has-vertical-scroll")}))
;const b=u.flexyGap.clientHeight-10;let c=a||!1;if(void 0===a&&(c=B),!c)return A.style.maxHeight="",void K(!1)
;const d=240,e=A.clientHeight;let f=E.scrollHeight;const h=(()=>{const a=E.cloneNode(!0);a.style.position="absolute",
a.style.top="0",a.style.left="-10px",a.style.width="1px",a.style.height="auto",a.style.maxHeight="none",a.style.display="block",
z.appendChild(a);const b=a.clientHeight;return a.remove(),b})();(0===f||h<f)&&(f=h),E.offsetWidth<E.scrollWidth&&(f+=16)
;let i=e+b
;i<f+40&&(K(!0),i=e+b,i<f+40&&i<d&&(i=d)),z.clientHeight<z.scrollHeight&&i>d&&(i=Math.max(d,i-(z.scrollHeight-z.clientHeight-10))),
A.style.maxHeight=(0,g.Md)(i);const j=Math.min(f,i-40);E.style.height=(0,g.Md)(j)}async function N(){
const a=await s.HasItems(2,"","has-bookmarks-from-navigator",null),b=r.GetItemTypeFilter(),e=q.GetOptions().ShowBookmarksAndLoginsTogether&&a
;let f=!1
;if(e!==d?f=!0:(!e||"item-type-filter-logins"!==b&&"item-type-filter-bookmarks"!==b)&&(e||"item-type-filter-logins-and-bookmarks"!==b)||(f=!0),
f){let c=b;d=e,e?("item-type-filter-logins"!==b&&"item-type-filter-bookmarks"!==b||(c="item-type-filter-logins-and-bookmarks"),
I(3,!1,null),I(5,!1,null),I(4,!0,null)):("item-type-filter-logins-and-bookmarks"===b&&(c="item-type-filter-logins"),
I(3,!0,null),I(5,a,null),I(4,!1,null)),"category-folders"===r.GetCategory()&&c!==b&&r.OnSelectItemTypeFilter(c)}c!==a&&(c=a,
d||I(5,a,null),a||"item-type-filter-bookmarks"!==r.GetItemTypeFilter()||r.OnSelectItemTypeFilter("item-type-filter-logins"))}
async function O(){const b=a.rf_data_pinned;b.IsUptodate()||await b.Update("pinned-items-visibility","",null)
;const c=b.GetData(),d=c&&0!==c.length||"category-pinned"===r.GetCategory();d!==n&&(n=d,I(2,d,null))}function P(){C.value="",(0,
h.SE)(D),G.onFilterChanged.CallAllSync(C.value)}function Q(a){
a&&(a.accounts.length>0||a.files.length>0?(u.sharingBadge.textContent=`${a.accounts.length+a.files.length}`,(0,
h.l5)(u.sharingBadge),u.categorySharingCenter.classList.add("badge-shown")):((0,h.SE)(u.sharingBadge),
u.categorySharingCenter.classList.remove("badge-shown")),
a.emergencyAccess.length>0?(u.emergencyAccessBadge.textContent=`${a.emergencyAccess.length}`,(0,h.l5)(u.emergencyAccessBadge),
u.categoryEmergencyAccess.classList.add("badge-shown")):((0,h.SE)(u.emergencyAccessBadge),
u.categoryEmergencyAccess.classList.remove("badge-shown")))}function R(){"stand-alone"===a.page_status.extensionMode&&(0,
j.fI)((async()=>{const b=await a.rf_api.service.GetSyncPendingItems(null);b&&Q(b)})())}function S(a){Q(a.pendingItems)}}
function o(a,b,c,f){const g=b.LocalizeString;let i,j,k,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q
;const R=l("div",{className:"rf-navigator noselect hidden"},n=l("div",{
className:"navigator-section-folders navigator-section navigator-section-with-separator hidden"},A=l("div",{
className:"selector-item rf-folders selector-with-dropdown",onclick:()=>a.OnSelectFoldersView(!1)},z=l("div",{
className:"dropdown-handler select-ext",onclick:b=>{if("category-folders"===a.GetCategory())a.OnSelectFoldersView(!0);else{
const b=a.GetController(2),c=b.ShowFolders();b.ShowFolders(!c),b.UpdateView(!1)}(0,d.OZ)(c.dataItems),b&&(b.preventDefault(),
b.stopPropagation())}}),l("div",{className:"select-image"}),l("div",{className:"select-title"},(0,
h.LX)(g("StartPage_HomeFolder"),""))),i=l("div",{className:"rf-folders-pane navigator-flexy-item narrow rf-dark hidden"
},l("div",{className:"rf-data-filter rf-input-box"},l("div",{className:"rf-filter"}),j=l("input",{type:"text",
placeholder:"Filter"}),k=l("div",{className:"rf-eraser"})),m=l("div",{className:"rf-folders-tree"}))),o=l("div",{
className:"navigator-section-pinned navigator-section navigator-section-with-separator hidden"},B=l("div",{
className:"selector-item category-pinned",onclick:()=>a.OnSelectCategory("category-pinned")},l("div",{className:"select-image"
}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_Pinned"),"")))),p=l("div",{
className:"categories-selector navigator-section navigator-section-with-separator"},C=l("div",{
className:"selector-item category-all",onclick:()=>a.OnSelectItemTypeFilter("item-type-filter-all")},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_All"),""))),D=l("div",{
className:"selector-item category-logins",onclick:()=>a.OnSelectItemTypeFilter("item-type-filter-logins")},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_Logins"),""))),E=l("div",{
className:"selector-item category-bookmarks",onclick:()=>a.OnSelectItemTypeFilter("item-type-filter-bookmarks")},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_Bookmarks"),""))),F=l("div",{
className:"selector-item category-logins-and-bookmarks hidden",
onclick:()=>a.OnSelectItemTypeFilter("item-type-filter-logins-and-bookmarks")},l("div",{className:"select-image"}),l("div",{
className:"select-title"},(0,h.LX)(g("StartPage_Category_LoginsAndBookmarks"),""))),G=l("div",{
className:"selector-item category-safenotes",onclick:()=>a.OnSelectItemTypeFilter("item-type-filter-safenotes")},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_Safenotes"),"")))),t=l("div",{
className:"rf-identities navigator-section navigator-section-with-separator hidden"},u=l("div",{
className:"identity-select selector-item rf-create-identity hidden"},l("div",{className:"select-image"}),l("div",{
className:"select-title action-handler"},(0,h.LX)(g("StartPage_Create_Identity"),"")),l("div",{
className:"plus-image action-handler"})),v=l("div",{className:"identity-select selector-item rf-actual-identity hidden"
},y=l("div",{className:"select-image"}),l("div",{className:"select-title"},x=l("div",{className:"rf-actual-identity-name"},(0,
h.LX)(g("IdentityType_MyIdentity"),"")))),w=l("div",{className:"identity-select selector-item rf-category-identity hidden"
},l("div",{className:"select-image"}),l("div",{className:"select-title"},l("div",{className:"rf-actual-identity-title"},(0,
h.LX)(g("StartPage_Category_Identities"),""))))),Q=l("div",{className:"navigator-flexy-gap navigator-flexy navigator-section"
}),q=l("div",{className:"navigator-section-why-roboform navigator-section hidden"},H=l("div",{
className:"selector-item category-why-roboform hidden",onclick:()=>a.OnSelectCategory("category-why-roboform")},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_WhyRoboForm"),"")))),r=l("div",{
className:"rf-more-categories navigator-section navigator-section-with-separator separator-top"},l("div",{
className:"rf-more-categories-popup"},J=l("div",{className:"selector-item password-generator-select",onclick:()=>{
R.classList.remove("rf-more-categories-shown"),a.OnSelectCategory("category-password-generator")}},l("div",{
className:"select-image"}),l("div",{className:"select-title"
},(0,h.LX)(g("StartPage_Category_PasswordGenerator"),""))),I=l("div",{className:"selector-item authenticator-select",
onclick:()=>{R.classList.remove("rf-more-categories-shown"),a.OnSelectCategory("category-authenticator")}},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_Authenticator"),""))),K=l("div",{
className:"selector-item security-center-select",onclick:()=>{R.classList.remove("rf-more-categories-shown"),
a.OnSelectCategory("category-security-center")}},l("div",{className:"select-image"}),l("div",{className:"select-title"},(0,
h.LX)(g("StartPage_Category_SecurityCenter"),""))),L=l("div",{className:"selector-item sharing-center-select",onclick:()=>{
R.classList.remove("rf-more-categories-shown"),a.OnSelectCategory("category-sharing-center")}},l("div",{className:"select-image"
}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_SharingCenter"),"")),M=l("div",{
className:"category-badge hidden"})),N=l("div",{className:"selector-item emergency-access-select",onclick:()=>{
R.classList.remove("rf-more-categories-shown"),a.OnSelectCategory("category-emergency-access")}},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_EmergencyAccess"),"")),l("div",{
className:"rf-events-count select-ext hidden"}),O=l("div",{className:"category-badge hidden"}))),P=l("div",{
className:"selector-item more-categories-select",onclick:()=>a.GetController(1).ToggleMoreCategories()},l("div",{
className:"select-image"}),l("div",{className:"select-title"},(0,h.LX)(g("StartPage_Category_MoreCategories"),"")))),s=l("div",{
className:"navigator-section-upgrade navigator-section hidden"}));(0,e.YC)(z,g("StartPage_ShowAllFolders_Tip")),(0,
e.YC)(B,g("StartPage_Category_Tip_Pinned")),(0,e.YC)(C,g("StartPage_Category_Tip_All")),(0,
e.YC)(D,g("StartPage_Category_Tip_Logins")),(0,e.YC)(E,g("StartPage_Category_Tip_Bookmarks")),(0,
e.YC)(F,g("StartPage_Category_Tip_LoginsAndBookmarks")),(0,e.YC)(G,g("StartPage_Category_Tip_Safenotes")),(0,
e.YC)(H,g("StartPage_Category_WhyRoboForm")),(0,e.YC)(J,g("StartPage_Category_PasswordGenerator")),(0,
e.YC)(I,g("StartPage_Category_Authenticator")),(0,e.YC)(K,g("StartPage_Category_SecurityCenter")),(0,
e.YC)(L,g("StartPage_Category_SharingCenter")),(0,e.YC)(N,g("StartPage_Category_EmergencyAccess")),(0,
e.YC)(P,g("StartPage_Category_Tip_MoreCategories")),f.isPassgenOnStartPageSupported||(0,h.SE)(J);const S={main:R,foldersPane:i,
dataFilterInput:j,dataFilterEraser:k,foldersTree:m,foldersDropdownHandler:z,identity:{section:t,createItem:u,actualItem:v,
categoryItem:w,actualItemName:x,actualItemImage:y,actualItemSharing:null,actualItemMenu:null},sectionFolders:n,sectionPinned:o,
sectionCategories:p,sectionWhyRoboForm:q,sectionMoreCategories:r,sectionUpgrade:s,categoryFolders:A,categoryPinned:B,
categoryAll:C,categoryLogins:D,categoryBookmarks:E,categoryLoginsAndBookmarks:F,categorySafenotes:G,categoryWhyRoboForm:H,
categoryAuthenticator:I,categoryPasswordGenerator:J,categorySecurityCenter:K,categorySharingCenter:L,sharingBadge:M,
categoryEmergencyAccess:N,emergencyAccessBadge:O,categoryMoreCategories:P,flexyGap:Q,upgradeSelect:null}
;return c.mainFrame.insertBefore(R,c.navigatorStub),c.navigatorStub.remove(),c.navigator=S,S}},64737:function(a,b,c){
"use strict";c.d(b,{$:function(){return u},I:function(){return t}})
;var d=c(48658),e=c(4601),f=c(41107),g=c(3566),h=c(4234),i=c(99196),j=c(78949),k=c(88579),l=c(88262),m=c(63956),n=c(13113),o=c(95399),p=c(4153),q=c(78440),r=c(69893),s=(c(13117),
c(91764)._);function t(a,b,c){const d=a.m_localization.LocalizeString;let i=!1,j=!1
;const l=a,o=a.m_rf_api,t=a.m_rf_manager,u=a.m_breach_mon_service,v=a.m_page_preferences,w=l.m_rf_items_multiselect,x=b,y=c,z=(0,
q.tG)();let A=null,B=null,C=!1,D=!1,E=!1,F=null,G=null,H=null
;const I=new Map,J=new Map,K=new Map,L=new Map,M=new Map,N=new Map,O=x.main
;["security-center-compromised","security-center-weak","security-center-reused","security-center-all","security-center-duplicates","security-center-excluded"].forEach((c=>{
I.set(c,function(a){let b,c=Promise.resolve(""),e=Promise.resolve("");switch(a){case"security-center-compromised":
c=d("PassAud_TabCompromised_Title"),e=d("PassAud_TabCompromised_Description_Part1");break;case"security-center-weak":
c=d("PassAud_TabWeak_Title"),e=d("PassAud_TabWeak_Description_Part1");break;case"security-center-reused":
c=d("PassAud_TabReusedkPasswords_Title"),e=d("PassAud_TabReusedPasswords_Description_Part1");break;case"security-center-all":
c=d("PassAud_TabAllPasswords_Title");break;case"security-center-duplicates":c=d("PassAud_TabCompleteDuplicates_Title"),
e=d("PassAud_TabCompleteDuplicates_Description_Part1");break;case"security-center-excluded":c=d("PassAud_TabExcluded_Title"),
e=d("PassAud_TabExcluded_Description_Part1")}const g=s("div",{className:"selector-item"},s("span",{className:"title"
},c),b=s("span",{className:"badge"}));return(0,f.YC)(g,e),J.set(a,b),g.addEventListener("click",(()=>Y(a))),
x.orderSelector.appendChild(g),g}(c));const g=function(a){const b=s("div",{className:"rf-items "+a});return b}(c);K.set(c,g)
;const i=function(c){const g=(0,f.kZ)({itemHeight:50,parentElWithScroll:b.main,CreateHeaderFields:()=>function(a){let b=[]
;switch(a){case"security-center-compromised":case"security-center-excluded":
b=[c("name"),c("password"),c("strength"),c("commands")];break;case"security-center-weak":case"security-center-all":
b=[c("name"),c("password"),c("strength"),c("age"),c("commands")];break;case"security-center-reused":
b=[c("name"),c("url"),c("password"),c("strength"),c("age"),c("commands")];break;case"security-center-duplicates":
b=[c("name"),c("folder"),c("username"),c("password"),c("strength"),c("commands")]}return b;function c(b){let c,e,g="";switch(b){
case"name":g=d("PassAud_ItemName_Title");break;case"password":g=d("PassAud_ItemPassword_Title");break;case"strength":
g=d("PassAud_ItemPasswordStrength_Title");break;case"age":g=d("PassAud_ItemAge_Title2");break;case"breaches-age":
g=d("PassAud_ItemBreachesDetectionAge_Title");break;case"url":g=d("PassAud_ItemUrl_Title");break;case"folder":g=d("CL_Folder")
;break;case"username":g=d("StartPage_CL_Username");break;case"commands":g=""}if("commands"===b)e=s("td",{
className:"commands-header-column"},c=s("div",{className:"real-fixed-header-content"}));else if("password"===b){let d;e=s("td",{
className:b+"-header-column header-sort"},c=s("div",{className:"real-fixed-header-content"},s("span",{className:"text"
},g),d=s("span",{className:"toggle-pwd toggle-pwd-hide"}),s("span",{className:"sort-arrow"}))),d.addEventListener("click",(b=>{
var c;b.preventDefault(),b.stopPropagation(),d.classList.toggle("toggle-pwd-show"),d.classList.toggle("toggle-pwd-hide"),
M.set(a,d.classList.contains("toggle-pwd-show")),null===(c=L.get(a))||void 0===c||c.UpdateItems(null)}))}else e=s("td",{
className:b+"-header-column header-sort"},c=s("div",{className:"real-fixed-header-content"},s("span",{className:"text"
},g),s("span",{className:"sort-arrow"})));if((0,f.YC)(c,g),"name"===b){const b=s("div",{
className:"multiselect-cmd-select-all hidden"});c.appendChild(b),N.set(a,b)}return{name:b,elem:e,contentEl:c,
sortable:"commands"!==b}}}(c),CreateItem:b=>b.is_group_title?function(a,b){let c=s("tr",null),e=null
;"security-center-reused"===a?c=s("tr",{className:"_row_group"},s("td",{colSpan:6,className:"data_column group"},s("div",{
className:"data_column_outer"},s("div",{className:"data_column_inner"},s("span",{
className:"icon-expand "+(b.collapsed?"icon-expand-hidden":"icon-expand-shown")
}),s("span",null,d("PassAud_ReusedGroup_Title2")))))):"security-center-duplicates"===a&&(c=s("tr",{className:"_row_group"
},s("td",{colSpan:6,className:"data_column group"},s("div",{className:"data_column_outer"},s("div",{
className:"data_column_inner"},s("span",{className:"icon-expand "+(b.collapsed?"icon-expand-hidden":"icon-expand-shown")
}),e=s("span",{className:"group_url"}))))));null!==e&&(e.textContent=(0,k.pK)(b.gotoUrl||""),e.title=b.gotoUrl||"")
;return c.addEventListener("click",(()=>{var c
;ag(!b.collapsed,b.group_id,a),null===(c=L.get(a))||void 0===c||c.UpdateItems(null)})),c}(c,b):function(b,c){
const g=l.m_ui_commands,i=l.m_rf_cache,j=o.securityWarningsManager,m=c.itemInfo;let r=s("tr",null);const u=s("td",{
className:"c_name"});let v=null,x=null,y=null;const z=null;let A=null,B=null,C=null;const D=s("td",{className:"c_commands"})
;"security-center-compromised"===b?r=s("tr",{className:"_row rf-security-center-item"},u,s("td",null,v=s("div",{
className:"c_password"})),x=s("td",{className:"c_strength"}),D):"security-center-weak"===b?r=s("tr",{
className:"_row rf-security-center-item"},u,s("td",null,v=s("div",{className:"c_password"})),x=s("td",{className:"c_strength"
}),y=s("td",{className:"c_age"}),D):"security-center-reused"===b?r=s("tr",{className:"_row rf-security-center-item"
},u,s("td",null,A=s("div",{className:"c_url"})),s("td",null,v=s("div",{className:"c_password"})),x=s("td",{
className:"c_strength"}),y=s("td",{className:"c_age"}),D):"security-center-all"===b?r=s("tr",{
className:"_row rf-security-center-item"},u,s("td",null,v=s("div",{className:"c_password"})),x=s("td",{className:"c_strength"
}),y=s("td",{className:"c_age"}),D):"security-center-duplicates"===b?r=s("tr",{className:"_row rf-security-center-item"
},u,s("td",null,B=s("div",{className:"c_location"})),s("td",null,C=s("div",{className:"c_username"})),s("td",null,v=s("div",{
className:"c_password"})),x=s("td",{className:"c_strength"}),D):"security-center-excluded"===b&&(r=s("tr",{
className:"_row rf-security-center-item"},u,s("td",null,v=s("div",{className:"c_password"})),x=s("td",{className:"c_strength"
}),D));const E=(0,e.gU)(b,m,"img32",t.GetController(9).GetIsStillActual());u.appendChild(E);const F=(0,
k.pK)(c.gotoUrl).toLowerCase();null!==A&&(A.textContent=F,A.title=c.gotoUrl)
;null!==v&&(!0===M.get(b)?v.textContent=c.password||"—":v.textContent=(0,f.Ss)());null!==x&&(0,q.fI)((async()=>{
x.appendChild(await(0,f.kS)(c.strength,!1,a.m_localization))})());if(null!==B){const a=(0,h.XE)((0,n.fA)(m.path),!0);if(""===a){
const a=d("StartPage_HomeFolder");(0,f.$9)(B,a),(0,f.YC)(B,a)}else B.textContent=B.title=a}null!==C&&(0,q.fI)((async()=>{
const a=await i.FetchDataItem(m.path);(0,e.O1)(C,m,a)})());null!==y&&(0,f.$9)(y,c.timeNotModified?(0,
p.bf)(Math.floor(c.timeNotModified/86400)):d("PassAud_ItemAge_NotAvaliable"));if(null!==z){const a=ah(c);(0,f.$9)(z,a?(0,
p.bf)(a):"")}if(null!==D){let a=null;a="security-center-excluded"===b?(0,e.gR)({cmdCommand:"include-to-security-score",
cmdTip:d("Cmd_IncludeToSecurityScore"),cmdCssClass:"rf-item-include-to-security-score",cmdAction:()=>{(0,
q.fI)(j.DisableSecurityWarningForDataItem(m.path,[0],!1,null))}
}):"security-center-all"===b||"security-center-duplicates"===b?null:c.breaches&&c.breaches.length>0?(0,e.gR)({
cmdCommand:"login",cmdTip:d("LoginIsCompromised_Notification_Login_Hint",[F]),cmdCssClass:"rf-item-log-in",cmdAction:()=>(0,
q.fI)(g.GoFillSubmit(m,!0))}):(0,e.gR)({cmdCommand:"login",cmdTip:d("Cmd_Login_Flat"),cmdCssClass:"rf-item-log-in",
cmdAction:()=>(0,q.fI)(g.GoFillSubmit(m,!0))});const f=s("div",{className:"rf-item-cmdbar"},(0,e.gR)({cmdCommand:"view",
cmdTip:d("StartPage_Cmd_View"),cmdCssClass:"rf-item-view hover-action-cmd",cmdAction:()=>{t.OnOpenEditor(m,!1,!1,!1)}}),a,(0,
e.WF)(r,m.path));D.appendChild(f),(0,e.Gu)(D,f,r)}return r.addEventListener("contextmenu",(a=>{a.preventDefault();const b=(0,
f.Eo)(a);w.IsInProcess()?w.IsItemSelected(r)&&(0,q.fI)((0,e.bL)(E,b)):(0,q.fI)((0,e.j1)(m,r,b))})),(0,e.SA)(r,(a=>{
if(w.IsInProcess())(0,q.fI)(w.SelectItem(r));else{const b=a.event.target
;if(b.classList.contains("rf-item-multiselect")||b.classList.contains("rf-sec-warning-button")||b.classList.contains("rf-buttons-bar")||w.IsInProcess())return
;t.OnOpenEditor(m,!1,!1,!1)}}),null),(0,f.eY)(r,m),w.UpdateItemSelection(m.path,r),r}(c,b),CompareItems:ae,onScrollEvent:a=>{(0,
f.DN)(a)&&(0,f.b2)(!1)}});return g}(c);L.set(c,i),g.appendChild(i.GetTopElement()),x.data.appendChild(g)}))
;let P=!1,Q=null,R=null,S=null;(0,q.fI)((async()=>{
U(window.innerHeight<600||""!==await v.GetValue("StartPage.SecurityCenterHeaderCollapsed",""))})()),(0,
f.YC)(x.newLogin,(async()=>d("StartPage_New_ButtonTip",[await d("StartPage_New_Login")]))),
x.newLogin.addEventListener("click",(()=>{(0,q.fI)(l.m_rf_new_menu.CreateNew("new-login","",!0))}));let T=window.innerHeight
;window.addEventListener("resize",(()=>{V(0),window.innerHeight<600&&T>window.innerHeight&&!P&&U(!0),T=window.innerHeight}))
;return{Activate:function(){if(i)return;i=!0,(0,m.l5)(y),(0,m.l5)(O),(0,q.C)(af),t.IsInlineEditorShown()&&U(!0)
;j&&null===H&&null===F&&(0,q.C)(Z)},Deactivate:function(){if(!i)return;if(i=!1,H){const a=L.get(H)
;null==a||a.DeactivateParentScrollHandler()}H=null,(0,q.fI)(async function(){if(!A||C)return;C=!0;try{await A.Stop()}catch(a){}
A=null,C=!1}()),(0,m.SE)(O)},UpdateView:function(a){a&&(j=!1);if(!i)return;if(t.IsEditorShown())return
;if(t.IsSearchResultShown())return;if(j)return void(F&&aa());j=!0,(0,q.fI)(async function(){if(A)return
;const a=null!==u,b=o.securityWarningsManager,c=new Set;A=(0,q.YZ)({action:async d=>{if(function(a){
const b=["security-center-compromised","security-center-excluded"];for(const c of b){const b=I.get(c);a?b&&(0,m.l5)(b):b&&(0,
m.SE)(b)}}(a),u){const a=await b.GetAllDataItemsWhereSecurityWarningIsDisabled([0],d);for(const b of a)c.add(b.path)}
return l.m_password_audit_service.GetUpdateAuditResult(!0,d)}}),function(){if(E&&!D)return;D=!1,W({all:[],duplicates:[],
reused:[],compromised:[],statistics:{score:0}},!0,""),(0,m.SE)(x.data),I.forEach((a=>{a.classList.remove("active"),
a.classList.add("disabled")})),J.forEach((a=>(0,m.SE)(a))),O.classList.remove("low","average","good","excellent","nodata"),
O.classList.add("processing")}();try{B=await A.Execute(null),A=null,function(a,b){var c,d,f
;const g=null!==(d=null!==(c=b.statistics.sa)&&void 0!==c?c:b.statistics.score)&&void 0!==d?d:0,h=X(b),i=x.noItems
;if(0===g&&!h)return x.noItemsText||(x.noItemsText=s("div",{className:"rf-no-items-text"}),i.appendChild(s("div",{
className:"rf-no-items-icon"})),i.appendChild(x.noItemsText)),(0,q.fI)((async()=>{i.replaceChild(await(0,e.RX)(),(0,
p.TT)(x.noItemsText))})()),O.classList.add("rf-no-items-shown"),(0,m.l5)(i),(0,m.SE)(x.data),void(0,m.SE)(x.summaryPane)
;W(b,!1,""),O.classList.remove("rf-no-items-shown"),(0,m.l5)(x.data),(0,m.SE)(i);let j=null
;const k=a?["security-center-compromised","security-center-weak","security-center-reused","security-center-all","security-center-duplicates","security-center-excluded"]:["security-center-weak","security-center-reused","security-center-all","security-center-duplicates"]
;k.forEach((a=>{var c,d,e,f;if(!L.has(a))return;E=!0;let g=0,h=null;switch(a){case"security-center-all":{const a=b.all||[]
;g=a.length,h=ab(a)}break;case"security-center-weak":{const a=b.all.filter((a=>a.strength<=1&&!a.excludedFromScore));g=a.length,
h=ab(a)}break;case"security-center-reused":{const a=b.reused||[];g=a.reduce(((a,b)=>a+b.items.length),0),h=function(a){
const b=[];for(let c=0;c<a.length;c++){const d=a[c],e=2*c;b.push(ac(d.items[0],e,!0)),ad(d.items)
;for(let a=0;a<d.items.length;a++)b.push(ac(d.items[a],e))}return b}(a)}break;case"security-center-duplicates":{
const a=b.duplicates||[];g=a.length,h=function(a){const b=[];a.sort(((a,b)=>{
const c=(a.gotoUrl||"").toLowerCase(),d=(b.gotoUrl||"").toLowerCase();return c>d?1:c<d?-1:0}));for(let c=0;c<a.length;c++){
const d=a[c],e=2*c;b.push(ac(d.items[0],e,!0)),ad(d.items);for(let a=0;a<d.items.length;a++)b.push(ac(d.items[a],e))}return b
}(a)}break;case"security-center-compromised":if(u){
const a=null!==(d=null!==(c=b.compromised)&&void 0!==c?c:b.all.filter((a=>null!==a.breaches&&0!==a.breaches.length&&!a.excludedFromScore)))&&void 0!==d?d:[]
;g=a.length,h=ab(a)}break;case"security-center-excluded":if(u){const a=b.all.filter((a=>a.excludedFromScore));g=a.length,h=ab(a)
}}
null!==h&&L.has(a)&&(null===(e=L.get(a))||void 0===e||e.UpdateItems(h)),null===(f=L.get(a))||void 0===f||f.SortByField(null,!1,null)
;const i=(0,p.TT)(I.get(a)),k=(0,p.TT)(J.get(a));g?(j||(j=a),i.classList.remove("disabled"),k.textContent=`(${g})`,(0,
m.l5)(k)):(-1!==["security-center-compromised","security-center-weak","security-center-reused"].indexOf(a)?i.classList.remove("disabled"):i.classList.add("disabled"),
(0,m.SE)(k))})),null!==H&&(null===(f=L.get(H))||void 0===f?void 0:f.GetItems().length)||(H=j||"security-center-all");F?aa():Y(H)
}(a,B)}catch(f){A=null,await async function(a){if((0,r.r5)(a,r.kd))return;D=!0;const b=(0,
r.EB)(a),c=await d("PassAud_Error_NotFound"),e=(0,r.r5)(a,r.Y$)?c+" "+b:b;W({all:[],duplicates:[],reused:[],compromised:[],
statistics:{score:0}},!1,e),(0,m.SE)(x.data),J.forEach((a=>(0,m.SE)(a))),O.classList.remove("processing"),U(!1)}(f)}return}())},
Invalidate:function(){j=!1},IsStillActual:function(){return i},GetIsStillActual:function(){return function(){return i}},
OnChanges:function(a){for(const b of a){if(14===b.event){j=!1;break}if(void 0!==b.type&&1===b.type){j=!1;break}}},
CollapseSummaryPane:U,AdjustTabHeaderColumnWidths:V,GetAllItemPaths:function(){
const a=[],b=t.GetLastSortOrder("category-security-center"),c=L.get(b);c&&c.GetItems().forEach((b=>{
b.itemInfo&&a.push(b.itemInfo.path)}));return a},GetLoginAge:function(a){let b=""
;if(B)for(const c of B.all)if(c.itemInfo.path===a){
b=c.timeNotModified?(0,p.bf)(Math.floor(c.timeNotModified/86400)):d("PassAud_ItemAge_NotAvaliable");break}return b},
ScheduleScrollToLoginAfterUpdate:function(a,b){F=b,G=a}};function U(a){a?(O.classList.add("summary-pane-collapsed"),
Q&&R&&S&&((0,m.SE)(Q),(0,m.SE)(R),(0,f.$9)(S,d("StartPage_SecurityCenter_ShowMore"))),P=!0,(0,
q.fI)(v.SetValue("StartPage.SecurityCenterHeaderCollapsed","true"))):(O.classList.remove("summary-pane-collapsed"),Q&&R&&S&&((0,
m.l5)(Q),(0,m.l5)(R),(0,f.$9)(S,d("StartPage_SecurityCenter_ShowLess"))),P=!1,(0,
q.fI)(v.SetValue("StartPage.SecurityCenterHeaderCollapsed","")))}function V(a){z.Start((async()=>{await(0,q.Gu)(a,null),
function(){var a;if(!i)return;null!==H&&(null===(a=L.get(H))||void 0===a||a.AdjustTableFixedHeaderFieldsSize())}()}))}
function W(a,b,c){var e,h;let i=null,j=null,k=null,l=null,m=null
;const n=X(a),q=null!==(h=null!==(e=a.statistics.sa)&&void 0!==e?e:a.statistics.score)&&void 0!==h?h:0
;let r=Promise.resolve(""),t=Promise.resolve(""),u="";q>90?(r=d("PassAud_GoodSafetyLevel_Tittle"),
t=d("PassAud_GoodSafetyLevel_Text"),u="excellent",m="Excellent"):q>60?(r=d("PassAud_MediumSafetyLevel_Tittle"),
t=d("PassAud_MediumSafetyLevel_Text"),u="good",m="Good"):q>30?(r=d("PassAud_AverageSafetyLevel_Tittle"),
t=d("PassAud_AverageSafetyLevel_Text"),u="average",m="Average"):q>0&&(r=d("PassAud_BadSafetyLevel_Tittle"),
t=d("PassAud_BadSafetyLevel_Text"),
u="low",m="Low"),O.classList.remove("processing","low","average","good","excellent","nodata"),
n?O.classList.add("nodata"):O.classList.add(u||"nodata")
;const v=a.all.filter((a=>!a.excludedFromScore)).length,w=a.all.filter((a=>null!==a.breaches&&0!==a.breaches.length&&!a.excludedFromScore)).length,y=a.all.filter((a=>a.strength<=1&&!a.excludedFromScore)).length-w,z=a.statistics.medium||0,A=a.statistics.good||0,B=a.statistics.excellent||0,C=(a.reused||[]).reduce(((a,b)=>a+b.items.length),0),E=v-C,F=[]
;F.push({type:0,number:B,percent:K(B),title:d("PassAud_PwdStrengthStrong"),css_class:"strong"}),F.push({type:1,number:A,
percent:K(A),title:d("PassAud_PwdStrengthGood"),css_class:"good"}),F.push({type:2,number:z,percent:K(z),
title:d("PassAud_PwdStrengthMedium"),css_class:"medium"}),F.push({type:3,number:y,percent:K(y),
title:d("PassAud_PwdStrengthWeak"),css_class:"weak"}),F.push({type:4,number:w,percent:K(w),
title:d("PassAud_PwdStrengthCompromised"),css_class:"compromised"});const G=[],H=n?0:K(C);G.push({type:5,number:E,
percent:n?0:100-H,title:d("PassAud_PwdStrengthUnique"),css_class:"unique"}),G.push({type:6,number:C,percent:H,
title:d("PassAud_PwdStrengthReused"),css_class:"reused"});const I=F.reduce(((a,b)=>a+b.percent),0);if(I>100){
let a=F[0].percent,b=F[0];F.forEach((c=>{a<c.percent&&(a=c.percent,b=c)})),b.percent-=I-100
}else if(I<100&&v>0)for(let d=F.length-1;d>=0;--d)if(F[d].number>0){F[d].percent+=100-I;break}const J=s("div",{
className:"summary-pane"},Q=b||n?s("div",{className:"chart-pane"+(P?" hidden":"")},s("div",{className:"chart"},s("div",{
className:"chart-title"},M()))):s("div",{className:"chart-pane"+(P?" hidden":"")},function(a,b){const c=s("div",{
className:"chart"});g(a,c,!1);const d=s("div",{className:"reused-chart"});g(b,d,!0),c.appendChild(d);const e=s("div",{
className:"chart-title"});return c.appendChild(e),(0,f.$9)(e,M()),c;function g(a,b,c){let d=0;[...a].reverse().forEach((a=>{
const e=a.percent/100*360,g=function(a,b){const c=50*(1-h(1)),d=s("div",{
className:"chart-chunk chart-gap "+(b?"inner-chart-gap":""),style:{clipPath:`polygon(50% 50%, 50% 0, ${c}% 0, ${c}% 50%)`,
transform:`rotate(-${a}deg)`}});return d}(d,c);b.appendChild(g);const i=function(a,b,c){let d=""
;if(0===b)d="polygon(50% 50%, 50% 0, 50% 0)";else if(b<=45){d=`polygon(50% 50%, 50% 0, ${50*(1-h(b))}% 0)`}else if(b<=90){
d=`polygon(50% 50%, 50% 0, 0 0, 0 ${50*(1-h(b=90-b))}%)`}else if(b<=135){d=`polygon(50% 50%, 50% 0, 0 0, 0 ${50*h(b-=90)+50}%)`
}else if(b<=180){d=`polygon(50% 50%, 50% 0, 0 0, 0 100%, ${50*(1-h(b=180-b))}% 100%)`}else if(b<=225){
d=`polygon(50% 50%, 50% 0, 0 0, 0 100%, ${50*h(b-=180)+50}% 100%)`}else if(b<=270){
d=`polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% ${50*h(b=270-b)+50}%)`}else if(b<=315){
d=`polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% ${50*(1-h(b=45-(315-b)))}%)`}else if(b<360){
d=`polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% 0, ${50*h(b=360-b)+50}% 0)`}else 360===b&&(d="");const e=s("div",{
className:"chart-chunk "+a.css_class,style:{clipPath:d,transform:`rotate(-${c}deg)`}});return(0,f.M_)(e,(async()=>(0,
p.bf)(a.percent)+"% "+await a.title)),e}(a,e,d);i.addEventListener("click",(()=>{var b;switch(a.type){case 4:
Y("security-center-compromised");break;case 3:Y("security-center-weak");break;case 6:Y("security-center-reused");break;default:
Y("security-center-all"),null===(b=L.get("security-center-all"))||void 0===b||b.SortByField("strength",!1,-1)}})),
b.appendChild(i),d+=e}))}function h(a){return 0===a?0:45===a?1:Math.tan(a*Math.PI/180)}}(F,G),s("div",{className:"legend"
},[...F].filter((a=>a.percent>0)).map((a=>s("div",{className:"legend-item "+a.css_class},s("div",{className:"icon"}),s("div",{
className:"value"},s("div",{className:"text"},a.title),s("div",{className:"percent"},(0,p.bf)(a.percent)+"%"))))),s("div",{
className:"reused-legend"},[...G].filter((a=>a.percent>0)).map((a=>s("div",{className:"legend-item "+a.css_class},s("div",{
className:"icon"}),s("div",{className:"value"},s("div",{className:"text"},a.title),s("div",{className:"percent"},(0,
p.bf)(a.percent)+"%")))))))),D&&c?s("div",{className:"score-column"},s("div",{className:"score-pane error"},s("div",{
className:"score-result"},s("div",{className:"title"},d("PassAud_Error"),":"),s("div",{className:"score-value"
},c)))):b?s("div",{className:"score-column"},s("div",{className:"score-pane processing"},s("div",{className:"score-result"
},s("div",{className:"title"},d("PassAud_SummaryScore"),":"),s("div",{className:"score-value"},s("div",{className:"value"
},d("PassAud_Calculating_Title"))))),R=s("div",{className:"recomendation"+(P?" hidden":"")},s("div",{className:"text"
},d("PassAud_Calculating_Desc")))):n?s("div",{className:"score-column"},s("div",{className:"score-pane nodata"},s("div",{
className:"score-result"},s("div",{className:"title"},d("PassAud_SummaryScore"),":"),s("div",{className:"score-value"},s("div",{
className:"value"},"N/A"),s("div",{className:"text"},d("PassAud_ItemAge_NotAvaliable")))),s("div",{className:"progressbar"
},i=s("div",{className:"progressbar-overlay weak-overlay"}),s("div",{className:"separator separator-one"}),j=s("div",{
className:"progressbar-overlay average-overlay"}),s("div",{className:"separator separator-two"}),k=s("div",{
className:"progressbar-overlay medium-overlay"}),s("div",{className:"separator separator-three"}),l=s("div",{
className:"progressbar-overlay good-overlay"}))),R=s("div",{className:"recomendation"+(P?" hidden":"")},s("div",{
className:"text"},d("StartPage_SecurityCenter_ExcludedOnly_Text2")))):s("div",{className:"score-column"},s("div",{
className:"score-pane "+u},s("div",{className:"score-result"},s("div",{className:"title"
},d("PassAud_SummaryScore"),":"),s("div",{className:"score-value"},s("div",{className:"value"},(0,p.bf)(q)),s("div",{
className:"text"},r))),s("div",{className:"progressbar"},i=s("div",{className:"progressbar-overlay weak-overlay"}),s("div",{
className:"separator separator-one"}),j=s("div",{className:"progressbar-overlay average-overlay"}),s("div",{
className:"separator separator-two"}),k=s("div",{className:"progressbar-overlay medium-overlay"}),s("div",{
className:"separator separator-three"}),l=s("div",{className:"progressbar-overlay good-overlay"}),s("div",{className:"score",
style:{left:`${q}%`}}))),R=s("div",{className:"recomendation"+(P?" hidden":"")},s("div",{className:"title"
},d("StartPage_SecurityCenter_Recomendation")),s("div",{className:"text"},t))),S=s("div",{className:"show-less",onclick:()=>{
J.classList.contains("animating")||(J.classList.add("animating"),
(0,f.dR)("security-center-summary-pane",J,"height",J.offsetHeight,P?360:90,230,(()=>{U(!P),J.classList.remove("animating"),
J.style.height=""})))}},d(P?"StartPage_SecurityCenter_ShowMore":"StartPage_SecurityCenter_ShowLess")));return i&&("Low"===m?(0,
f.M_)(i,s("div",null,(async()=>s("fragment",null,(0,
f.R1)(await d("PassAud_BadSafetyLevel_Tooltip_Owner_Text"),[s("b",null,d("PassAud_BadSafetyLevel_OwnerScore_Title"))]))))):(0,
f.M_)(i,s("div",null,(async()=>s("fragment",null,(0,
f.R1)(await d("PassAud_BadSafetyLevel_Tooltip_Text"),[s("b",null,d("PassAud_BadSafetyLevel_Tittle"))])))))),
j&&("Average"===m?(0,
f.M_)(j,s("div",null,(async()=>s("fragment",null,(0,f.R1)(await d("PassAud_AverageSafetyLevel_Tooltip_Owner_Text"),[s("b",null,d("PassAud_AverageSafetyLevel_OwnerScore_Title"))]))))):(0,
f.M_)(j,s("div",null,(async()=>s("fragment",null,(0,
f.R1)(await d("PassAud_AverageSafetyLevel_Tooltip_Text"),[s("b",null,d("PassAud_AverageSafetyLevel_Tittle"))])))))),
k&&("Good"===m?(0,
f.M_)(k,s("div",null,(async()=>s("fragment",null,(0,f.R1)(await d("PassAud_MediumSafetyLevel_Tooltip_Owner_Text"),[s("b",null,d("PassAud_MediumSafetyLevel_OwnerScore_Title"))]))))):(0,
f.M_)(k,s("div",null,(async()=>s("fragment",null,(0,
f.R1)(await d("PassAud_MediumSafetyLevel_Tooltip_Text"),[s("b",null,d("PassAud_MediumSafetyLevel_Tittle"))])))))),
l&&("Excellent"===m?(0,
f.M_)(l,s("div",null,(async()=>s("fragment",null,(0,f.R1)(await d("PassAud_GoodSafetyLevel_Tooltip_Owner_Text"),[s("b",null,d("PassAud_GoodSafetyLevel_OwnerScore_Title"))]))))):(0,
f.M_)(l,s("div",null,(async()=>s("fragment",null,(0,
f.R1)(await d("PassAud_GoodSafetyLevel_Tooltip_Text"),[s("b",null,d("PassAud_GoodSafetyLevel_Tittle"))])))))),
x.summaryPane.replaceWith(J),void(x.summaryPane=J);function K(a){if(0===v)return 0;const b=Math.round(a/v*100)
;return a>0?Math.max(1,b):0}async function M(){var a
;const b=null!==(a=(await o.service.GetRoboFormAccountInfo(null)).name)&&void 0!==a?a:"";return(0,g.KG)(b)}}function X(a){
const b=u?a.all.filter((a=>a.excludedFromScore)):[];return b.length>0&&b.length===a.all.length}function Y(a){const b=I.get(a)
;if(!b)return;if(b.classList.contains("disabled"))return;L.forEach((a=>a.DeactivateParentScrollHandler())),
I.forEach((a=>a.classList.remove("active"))),b.classList.add("active"),K.forEach((a=>(0,m.SE)(a)))
;const c=K.get(a),e=x.noItemsTab,g=L.get(a);if(g&&g.GetItems().length&&c)x.data.classList.remove("rf-no-items-shown"),
g.ActivateParentScrollHandler(),(0,m.SE)(e),(0,m.l5)(c);else{x.noItemsText||(x.noItemsText=s("div",{className:"rf-no-items-text"
}),e.appendChild(s("div",{className:"rf-no-items-icon"})),e.appendChild(x.noItemsText));let b=Promise.resolve("");switch(a){
case"security-center-compromised":b=d("StartPage_SecurityCenter_NoResults_Compromised");break;case"security-center-weak":
b=d("StartPage_SecurityCenter_NoResults_Weak");break;case"security-center-reused":
b=d("StartPage_SecurityCenter_NoResults_Reused")}(0,f.$9)((0,p.TT)(x.noItemsText),b),(0,m.l5)(x.data),
x.data.classList.add("rf-no-items-shown"),(0,m.l5)(e)}t.OnSelectCategoryOrder(a),H=a,N.has(a)&&w.InitListView((0,
p.TT)(N.get(a)),(0,p.TT)(K.get(a))),(0,q.C)(af)}function Z(){
for(const a of["security-center-compromised","security-center-weak","security-center-reused","security-center-all","security-center-duplicates","security-center-excluded"]){
const b=L.get(a);if(b&&b.GetItems().length){Y(a);break}}}function aa(){var a;if(!F||!G||null===B)return;let b=G;const c=F
;if("security-center-all"!==b&&"security-center-compromised"!==b){let a=!1,d=!1;B.reused.forEach((b=>{a||b.items.forEach((b=>{
b.itemInfo.path===c&&(a=!0)}))})),a||B.duplicates.forEach((a=>{d||a.items.forEach((a=>{a.itemInfo.path===c&&(d=!0)}))})),
b=a?"security-center-reused":d?"security-center-duplicates":"security-center-all"}Y(b);const d=L.get(b);if(d){
const e=d.GetItems(),f=e.findIndex((a=>a.itemInfo.path===c));if(-1!==f){const g=e[f];g.hidden&&(ag(!1,g.group_id,b),
null===(a=L.get(b))||void 0===a||a.UpdateItems(null))
;const h=d.GetVisibleItems().findIndex((a=>!a.is_group_title&&a.itemInfo.path===c));-1!==h&&d.ScrollToVisibleItem(h)}}F=null,
G=null}function ab(a){const b=[];return a.forEach((a=>b.push(ac(a)))),ad(b),b}function ac(a,b,c){return{password:a.password,
login:a.login,strength:a.strength,timeNotModified:a.timeNotModified,itemInfo:a.itemInfo,gotoUrl:a.gotoUrl,breaches:a.breaches,
excludedFromScore:a.excludedFromScore,hasPasskey:a.hasPasskey,item_name:(0,h.em)(a.itemInfo.path).toLowerCase(),group_id:b,
is_group_title:c}}function ad(a){a.sort(((a,b)=>(a.item_name=a.item_name||(0,h.em)(a.itemInfo.path).toLowerCase(),
b.item_name=b.item_name||(0,h.em)(b.itemInfo.path).toLowerCase(),a.item_name>b.item_name?1:a.item_name<b.item_name?-1:0)))}
function ae(a,b,c){if(b.is_group_title||c.is_group_title)return 0;if(b.group_id!==c.group_id)return 0
;let d="alpha",e="",f="",g=0,i=0
;switch("name"===a?(e=b.item_name||"",f=c.item_name||""):"password"===a?(e=b.password.toLowerCase(),
f=c.password.toLowerCase()):"strength"===a?(d="number",g=b.strength,i=c.strength):"age"===a?(d="number",g=b.timeNotModified||1,
i=c.timeNotModified||1):"breaches-age"===a?(d="number",g=ah(b),i=ah(c)):"url"===a?(e=(0,k.pK)(b.gotoUrl),f=(0,
k.pK)(c.gotoUrl)):"folder"===a&&(e=(0,h.XE)((0,n.fA)(b.itemInfo.path),!0).toLowerCase(),f=(0,h.XE)((0,
n.fA)(c.itemInfo.path),!0).toLowerCase()),d){case"alpha":return e>f?1:e<f?-1:0;case"number":return g-i}return 0}function af(){
var a,b
;null!==H&&(null===(a=L.get(H))||void 0===a||a.ResetScroll(),null===(b=L.get(H))||void 0===b||b.AdjustTableFixedHeaderFieldsSize())
}function ag(a,b,c){var d;void 0!==b&&(null===(d=L.get(c))||void 0===d||d.GetItems().forEach((c=>{
c.group_id===b&&(c.is_group_title?c.collapsed=a:c.hidden=a)})))}function ah(a){if(!a.breaches)return 0
;const b=Math.round((new Date).getTime()/1e3),c=a.breaches.reduce(((a,b)=>b.m_checked_time_utc_secs<a?b.m_checked_time_utc_secs:a),a.breaches[0].m_checked_time_utc_secs)
;return Math.floor((b-c)/86400)}}function u(a,b,c,e,f,g){const h=a,k=b,m=c,n=e,p=(0,i.Je)();let r=null,s=!1,t=null,u=null
;return{GetCachedPasswordStrengthInfo:async function(a,b){return w(a,b)},GetUpdatePasswordStrengthInfo:async function(a,b){
return w(a,b)},GetCachedPasswordStrengthLevel:async function(a,b){return x(a,b)},
GetUpdatePasswordStrengthLevel:async function(a,b){return x(a,b)},GetUpdateAuditResult:async function(a,b){return await y(b),
p.GetSecurityReportForAddedItems()},GetLastUpdateTime:async function(a){return u}};async function v(a,b){var c;s||await z(b)
;const d=null!==(c=e&&await e.GetCachedUserDataBreaches({password:a},null,b))&&void 0!==c?c:null;let f=0
;return d&&d.find((a=>1===a.m_type))||(f=Math.floor((0,j.im)(a,[],null,t)+.5),f>100&&(f=100)),f}async function w(a,b){
const c=await v(a,b);return{strength:c,complexity:c}}async function x(a,b){const c=await v(a,b);return(0,j.AY)(c)}
async function y(a){if(!f)return;await z(a),r||(r=(0,d.nj)("security-center",f().GetController(9).GetIsStillActual()))
;const b=new Set;if(n&&m){const c=await m.GetAllDataItemsWhereSecurityWarningIsDisabled([0],a);for(const a of c)b.add(a.path)}
a&&a.ThrowIfShouldStop();const c=[],g=[];await r.UpdateData((async function(d,f,j){const l=f;for(const a of l)(0,
i.pp)(a,h)&&g.push((async function(d){var f;d.ThrowIfShouldStop()
;const g=await k.GetDataItem(a.path,3,null,null),h=b.has(a.path),i=null!==(f=e&&await e.GetCachedUserDataItemBreaches(a.path,d))&&void 0!==f?f:null
;c.push({info:a,data:g,breaches:i,excludedFromScore:h,includeToPersonalStats:!0})}));a&&a.ThrowIfShouldStop()}),a);try{await(0,
q.Cp)({actions:g,progress:a})}catch(j){throw j}for(const d of c)a&&await a.YieldToUI(30),p.AddItem(d);u=(0,o.t2)()}
async function z(a){try{t||(t=(0,j.v5)(await(0,l.$)("pwd-dict.json",a,g))),p.Init(t),p.SetLegacyStrengthCalculation(!0),s=!0
}catch(b){throw b}}}},401:function(a,b,c){"use strict";c.d(b,{O:function(){return aa}});c(63452)
;var d=c(34842),e=c(13064),f=c(3342),g=c(95890),h=c(48658),i=c(83645),j=c(47048),k=c(84428),l=c(42160),m=c(37042),n=c(36786),o=c(41107),p=c(26227),q=c(64737),r=c(48141),s=c(16494),t=c(34560),u=c(58860),v=c(25057),w=c(55195),x=c(4601),y=c(37367),z=c(37156),A=c(60759),B=c(85e3),C=c(93075),D=c(38221),E=c(74435),F=c(47333),G=c(83382),H=c(4234),I=c(61211),J=c(54811),K=c(12131),L=c(71796),M=c(79999),N=c(87450),O=c(98539),P=c(31173),Q=c(88262),R=c(13113),S=c(78440),T=c(4153),U=c(70026),V=c(95399),W=c(69893),X=c(13117),Y=c(97514)
;const Z="rf-editor.css";async function aa(a,b,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at){
const au=a,av=b,aw=aa,ax="use-native"===a.extensionMode?Object.assign(Object.assign({},ab),{ShowLoginUI:async function(a){
a2.GetController(0).SetShowNativeLoginDialog(ab.ShowLoginUI),a2.ActivateControllers([0]),a2.UpdateViews(!0)},
OpenPaymentPage:async(a,b)=>a7(a,ab,b),OpenAdminCenter:a8,OpenSignUpEnterprise:async a=>a9(a),OpenRFOPage:ba
}):Object.assign(Object.assign({},ab),{ShowLoginUI:async function(a){a2.ActivateControllers([0]),a2.UpdateViews(!0)},
ShowSharedFolderDialog:async function(a){const b=await aw.data.GetInfo(a,1,null);await(0,i.Ng)(b)},
ShowSharedFileSettings:async function(a){const b=await aw.data.GetInfo(a,1,null);await(0,i.Gl)(b)},
ShowSendFileDialog:async function(a){if(0===a.length)return;const b=await aw.data.GetInfo(a[0],1,null);await(0,i.wJ)(b,null)},
ShowCreateSharedFolderDialog:async function(){const a=await(0,i.sJ)(!1);if(null!==a){const b=(0,R.fA)(a);(0,
h.Xe)(b).Invalidate(),a2.SetState("state-change-event-folder-or-group-created",{category:"category-folders",folder:a})}},
ShowCreateGroupDialog:async function(){const a=await(0,i.sJ)(!0);if(null!==a){const b=(0,R.fA)(a);(0,h.Xe)(b).Invalidate(),
a2.SetState("state-change-event-folder-or-group-created",{category:"category-folders",folder:a})}},
ShowRenameSharedFolderDialog:async function(a){try{const b=await aw.data.GetInfo(a.path,1,null),c=await(0,
y.gk)(b,aW,aw.data,aw.sharing,aB);if("category-folders"===a2.GetCategory()&&a2.GetFolder()===b.path){
a2.SetState("state-change-event-selected-folder-renamed",{category:"category-folders",folder:c});const a=(0,R.fA)(c);(0,
h.Xe)(a).Invalidate()}}catch(b){}},OpenPaymentPage:async(a,b)=>a7(a,ab,b),OpenAdminCenter:a8,
OpenSignUpEnterprise:async a=>a9(a),OpenRFOPage:ba}),ay=ac,az=al,aA=ap,aB=b,aC=ar,aD=as,aE=aq;let aF=null
;const aG=null!=ad?ad:(0,q.$)({receivedFiles:!1,groups:!0,regularSharedFolders:!0,onlyLogins:!0
},aw.data,aw.securityWarningsManager,ay,(()=>a2),at),aH=(0,U.t)();aw.rfTemplates=(0,L.P4)({GetServerTemplates:async function(){
var a;const b=`rf-templates.json?vvv=${(0,Y.RD)()}`,c={};return null!==(a=await aH.GetData(b,{maxAgeSec:86400,default:c,
onGetData:async a=>(0,Q.$)(b,a,at)}))&&void 0!==a?a:c},GetEnterpriseTemplates:async function(){const a=a5.RfTemplates||""
;return(0,L.mG)(a)},GetCustomTemplates:async function(){if(!au.staging)return{};return window.RfCustomTemplates||{}},
GetDisableCommonTemplates:async function(){return a5.DisableCommonTemplates||!1}});const aI=ae,aJ=af,aK=ag,aL=ah,aM=(0,
C._)(aw.service,at),aN=(0,w.NF)(aw),aO=(0,w.ZK)(aw),aP=(0,S.SI)(300),aQ=(0,S.tG)(),aR=(0,S.SI)(300),aS=(0,S.tG)(),aT=(0,
o.rH)(au.browserType,av),aU=(0,F.au)(aw.data,aB);aU.Init();const aV=(0,J.I9)(aw.data,aw.service,aw.rfo,aE,aB);aV.Init()
;const aW=function(){const a=(0,y.v9)(aw,ax,av,au,aU,aB),b=a.Share;return a.Share=async function(a){try{
const c=await async function(a){if(!a.received&&!a.granted)return a;const b=a.path,c=(0,R.Y0)(b);if(!c)return a;const d=await(0,
h.VO)(c);if(d)return d;return a}(a);return b(c)}catch(c){}},a}();let aX=null,aY=!1,aZ=null,a0=ai?(0,e.Nt)(ai):null;await bf()
;const a1=await(0,d.V)(aB,au),a2=(0,e.fN)({m_rf_api:aw,m_extension_storage:ak,m_rf_commands:ax,m_ui_commands:aW,
m_rf_page_status:au,m_rf_cached_data_info:aN,m_initial_identity_provider:aV,m_page_preferences:az,GetNewMenu:()=>bt,
m_view_api:b,m_get_rf_sso_login:aI,m_get_rf_sso_login_callback_handler:aJ,m_get_rf_login_method:aK,
m_get_rf_login_method_callback_handler:aL,m_browser_language_info:aE,m_localization:aB,m_rng:aD,m_http:at
},a1,a0&&a0.setup||null,a0&&a0.view||null,a0&&a0.editor||null,a0&&a0.settings||null,a0&&a0.sharing||null);a0=a0&&a0.new?{
new:a0.new}:a0&&a0.import?{import:a0.import}:a0&&a0.paymentPage?{paymentPage:a0.paymentPage}:a0&&a0.adminCenter?{
adminCenter:a0.adminCenter}:a0&&a0.signupEnterprise?{signupEnterprise:a0.signupEnterprise}:null,
a2.onPageStatusChanged.Add((async function(){const b=aw.service.GetGlobalStatus();b.m_connected_to_server&&!a3&&(a3=!0,
await bd());b.m_storage_connected&&au.showUsageInfo&&!aZ&&await be();if(b.m_storage_connected&&b.m_logged_in){if(!a0){
if(aj)return;const b=await aa.options.Get({AccountEnterprise:!1,AccountCompanyAdmin:!1,AccountGroupManager:!1})
;return b.AccountEnterprise&&(b.AccountCompanyAdmin||b.AccountGroupManager)?void("local"===a.type?window.location.replace(`${window.location.origin}/admin-center.html`):(window.location.replace(`${window.location.origin+window.location.pathname}#admin-center`),
window.location.reload())):void 0}const b=a0;a0=null,bC(b,!1)}}));let a3=!1,a4={},a5={};await async function(){
a2.UpdatePage(!0),aw.data.onDataChanged.Add(bb),aw.options.AddOnChangeListener(bc),aw.policies.AddOnChangeListener(bc)}(),
av.onNotificationFromBackgroundScript.Add((function(a,...b){if("DataFromBackground"===a){{const a=b[0],c=b[1];(0,
S.uT)(bg(a,c,!1),"_OnNotificationFromBackgroundScript:DataFromBackground")}return}}));const a6=await(0,N.Z)(av,null)
;async function a7(a,b,c){if("local"!==au.type&&!au.isInAppPaymentDisabled){const b=aw.service.GetGlobalStatus()
;if(b.m_storage_connected){if(b.m_logged_in)return(0,z.X)(a);throw K.SP}throw(0,W.ZU)(W.yI,"Disconnected")}
await b.OpenPaymentPage(a,c)}async function a8(b,c){var d;if("stand-alone"===a.mode)await e();else{
0===(null!==(d=await(null==ak?void 0:ak.GetValue("AdminCenterPage",1)))&&void 0!==d?d:1)?await ax.OpenRFOPage(null,F.q2,{
newTab:!0},null):"local"===a.type?await ab.OpenAdminCenter(b,c):await e()}async function e(){
const c=aw.service.GetGlobalStatus();if(!c.m_storage_connected)throw(0,W.ZU)(W.yI,"Disconnected");if(!c.m_logged_in)throw K.SP;{
const c=b&&b.view?`#admin-center&ac-view=${b.view}`:"#admin-center&ac-view=dashboard"
;if("stand-alone"===a.mode)window.location.assign(c),window.location.reload();else{
const a=`${window.location.origin+window.location.pathname}${c}`,b=window.open(a,"_admincenter")
;null==b||b.window.location.reload()}}}}async function a9(a){var b
;const c=null!==(b=null==a?void 0:a.userType)&&void 0!==b?b:"new",d=aw.service.GetGlobalStatus()
;if(!d.m_storage_connected)throw window.location.replace(`${window.location.origin+window.location.pathname}#signup-enterprise&business-user=new`),
window.location.reload(),(0,W.ZU)(W.yI,"Disconnected")
;if(!d.m_logged_in)throw window.location.replace(`${window.location.origin+window.location.pathname}#signup-enterprise&business-user=new`),
window.location.reload(),K.SP
;window.location.replace(`${window.location.origin+window.location.pathname}#signup-enterprise&business-user=${c}`),
window.location.reload()}async function ba(b,c,d,e){if("stand-alone"!==a.mode)await ab.OpenRFOPage(b,c,d,e);else{
const b=a.staging?`https://online-test.roboform.com/site/account/manage?type=${c||"dashboard"}`:`https://online.roboform.com/site/account/manage?type=${c||"dashboard"}`
;window.open(b,"_blank")}}function bb(a){let b=!1,c=!1;for(let d=0;d<a.length;d++){switch(a[d].event){case 2:b=!0;break;case 10:
case 11:a2.OnLogOut(),b=!0;break;case 14:c=!0}}if(au.showUsageInfo){let b=!1;for(let c=0;c<a.length;c++){switch(a[c].event){
case 2:case 3:case 12:b=!0}}b&&aQ.Start((async a=>{await(0,S.Gu)(100,a);await be()&&a2.UpdatePage(!0)}))}aO.OnChanges(a),
a2.GetController(5).OnChanges(a),a2.GetController(9).OnChanges(a),b?a2.UpdatePage(!0):aP.Start((async()=>{a2.UpdatePage(!1)})),
c&&aR.Start((async()=>{(0,x.kI)()}))}function bc(){aS.Start((async a=>{await(0,S.Gu)(300,a),await bd(),a2.UpdatePage(!0)}))}
async function bd(){var a;const b={ShowBookmarksAndLoginsTogether:!1,SyncIsOn:!1,AccountCompanyAdmin:!1,AccountGroupManager:!1,
AccountEnterprise:!1,LocalizationFile:"",DontShowCompromisedDataIcons:!1},c={SelfHostedServer:!1,DisableCreateLogins:!1,
NoPasscards:!1,DisableCreateBookmarks:!1,NoBookmarks:!1,DisableCreateIdentities:!1,NoIdentities:!1,DisableCreateContacts:!1,
NoContacts:!1,DisableCreateSafenotes:!1,NoSafenotes:!1,DisableNonGroupData:!1,DisableSharing:!1,DisableEmergencyAccess:!1,
ShowPasswordsAsStarsInEditor:!1,DisableLogoff:!1,RfTemplates:"",DisableCommonTemplates:!1};try{a4=await aw.options.Get(b),
a5=await aw.policies.Get(c),a3=!0}catch(e){a4=b,a5=c}await bf()
;const d=null!==(a=a4.DontShowCompromisedDataIcons)&&void 0!==a&&a;aY!==d&&(aY=d,aR.Start((async()=>{(0,x.kI)()}))),
aF&&aF.UpdateEditorContext({m_rf_options:a4,m_rf_policies:a5})}async function be(){aZ=aZ||new Map;const a={mru:{},mruExt:{},
mruExt2:{}};try{const b=await aw.data.GetFile(I.dc,"utf16",null);a.mru=JSON.parse(b)||{}}catch(c){a.mru={}}try{
const b=await aw.data.GetFile(I.LN,"utf16",null);a.mruExt=JSON.parse(b)||{}}catch(c){a.mruExt={}}try{
const b=await aw.data.GetFile(I.l$,"utf16",null);a.mruExt2=JSON.parse(b)||{}}catch(c){a.mruExt2={}}let b=!1;try{const c=aZ,d=(0,
I.uI)();d.Load(a);const e=d.GetItemsUsageInfoDetails(null),f=new Set(c.keys());if(e.forEach((a=>{const d=a.path,e=c.get(d)
;e&&(0,T.XM)(e,a)||(b=!0,c.set(d,a),f.delete(d))})),f.size>0){b=!0;for(const a of f)c.delete(a)}}catch(c){(0,
X.Rm)("!!! UpdateItemsUsageDetails failed",c),aZ.clear(),b=!0}return b}async function bf(){
const a=await aw.options.GetValue("LocalizationFile","");if(aX!==a){aX=a;const b=(0,G.p3)(aX)||"";let c=(0,G.Mi)(b)
;c||(c="extension-legacy"===au.mode||"extension-v9"===au.mode&&"use-native"===au.extensionMode?"en":(0,P.Jy)()),
await aB.SetLanguageTag(c,null),await(0,O.oz)(document.body,aB)}}async function bg(a,b,c){if((b||!a)&&!(a=await(0,
N.Z)(av,null)))return;const d=(0,e.Nt)(a);if(d)if(d.view)a2.RestoreState(d.view),
a2.UpdateViews(!1);else if(d.setup)a2.StartAccountSetup(d.setup);else{const a=aw.service.GetGlobalStatus()
;a.m_storage_connected&&a.m_logged_in&&(a0=null,bC(d,c))}}a6&&await bg(a6,!1,!0),
window.addEventListener("visibilitychange",(()=>{a2.OnPageVisibilityChanged(document.visibilityState)}))
;const bh=39,bi=[1,2,3,5,6,7],bj=(0,w.Xp)({UpdateData:async(a,b)=>{const c=await aw.usageInfo.GetUsageInfoList(0,1,b)
;for(let d=0;d<c.length;d++)c[d]=aN.GetDataInfo(c[d].path)||c[d],c[d].favorite=!0;return(0,w.lX)(aN,c,bi,32)},
onDataChanged:aw.data.onDataChanged,ShouldChangeCauseUpdate:(a,b)=>(0,w.yJ)(b,bi)});function bk(a){return(0,w.Xp)({
UpdateData:async(b,c)=>(bj.IsUptodate()||await bj.Update(a,b,c),bj.GetData()||[]),onDataChanged:aw.data.onDataChanged,
ShouldChangeCauseUpdate:(a,b)=>(0,w.yJ)(b,bi)})}const bl=(0,w.Xp)({UpdateData:async(a,b)=>{
const c=await aw.usageInfo.GetUsageInfoList(0,3,b);return(0,w.lX)(aN,c,null,32)},onDataChanged:aw.data.onDataChanged,
ShouldChangeCauseUpdate:(a,b)=>(0,w.yJ)(b,null)}),bm=(0,w.Xp)({UpdateData:async(a,b)=>{const c=[];await(0,
J.s_)(aw.data,(async a=>{if(1===a.type)try{const d=await aw.data.GetDataItem(a.path,4,null,b);(0,H.JG)(d)&&c.push(a)}catch(d){
(0,W.au)(d)}}),{deep:!0,parts:bh},b);return(0,w.lX)(aN,c,[1],bh).sort(((a,b)=>(0,R.Gx)((0,R._p)(a.path),(0,R._p)(b.path))))},
onDataChanged:aw.data.onDataChanged,ShouldChangeCauseUpdate:(a,b)=>(0,w.yJ)(b,[1])}),bn=(0,w.Xp)({UpdateData:async(a,b)=>{
const c=await aw.usageInfo.GetUsageInfoList(0,0,b);return(0,w.lX)(aN,c,null,32)},onDataChanged:aw.data.onDataChanged,
ShouldChangeCauseUpdate:(a,b)=>(0,w.yJ)(b,null)}),bo=(0,w.Xp)({UpdateData:async(a,b)=>{if(a===H.xG){return{path:H.xG,type:5}}
const c=await aw.data.GetInfo(a,bh,b);return aN.UpdateDataInfo(c,bh),c},onDataChanged:aw.data.onDataChanged,
ShouldChangeCauseUpdate:(a,b)=>(0,w.Ie)(b,a)}),bp=(0,w.Xp)({UpdateData:async(a,b)=>{if(a===H.xG){
const a=await aV.GetInitialIdentity(null);return(0,F.eQ)(a,{})}return await aw.data.GetDataItem(a,4,null,b)},
onDataChanged:aw.data.onDataChanged,ShouldChangeCauseUpdate:(a,b)=>(0,w.Ie)(b,a)}),bq=(0,M.AZ)(at);(0,o.AV)({
mainViewHtmlElements:a1,HideSearchDropdown:r.sx}),(0,y.g_)({m_rf_cached_data_info:aN,m_localization:aB}),(0,i.wP)({m_rf_api:aw,
m_rf_cache:aO,m_rf_cached_data_info:aN,GetOptions:()=>a4,m_modal_parent_el:a1.commonDialogsParent,m_localization:aB}),(0,h.CE)({
m_rf_api:aw,m_ui_commands:aW,m_rf_manager:a2,m_rf_cached_data_info:aN,m_rf_cache:aO,GetOptions:function(){return a4},
GetPolicies:function(){return a5},m_rf_data_item_info_parts:bh,m_localization:aB});const br=(0,m.b)(aw),bs=(0,
v.I)(a2,aW,aN,br,aB,a1),bt=(0,n.IB)({m_rf_api:aw,m_rf_commands:ax,m_rf_page_status:au,m_ui_commands:aW,m_rf_manager:a2,
m_rf_items_existance:br,GetOptions:function(){return a4},GetPolicies:function(){return a5},m_identity_view_structure_loader:bq,
m_initial_identity_provider:aV,m_localization:aB},a1.newMenu);(0,x.C3)({m_rf_api:aw,m_rf_commands:ax,m_rf_page_status:au,
m_ui_commands:aW,m_rf_manager:a2,m_rf_items_existance:br,m_data_item_display_name_provider:aU,m_rf_cached_data_info:aN,
m_rf_cache:aO,GetOptions:()=>a4,GetPolicies:()=>a5,m_rf_cached_data_images:aM,m_rf_new_menu:bt,m_rf_pinned_items_types:bi,
AllItemsPerFolderData:h.Xe,m_items_usage_details:au.showUsageInfo?aZ:null,m_rf_items_multiselect:bs,m_breach_mon_service:ay,
m_rf_password_audit_service:aG,m_clipboard_cleaner:aT,m_clipboard:aC,m_identity_view_structure_loader:bq,m_localization:aB,
m_main_view_html_elements:a1}),(0,n.zd)({rf_page_status:au,rf_cached_data_info:aN,GetOptions:function(){return a4},
GetPolicies:function(){return a5}});const bu=(0,A.r)(at)
;a2.AddController(0,(0,f.C)(av,aw,ax,aI,aJ,aK,aL,ak,au,a2,aN,a1,bu,a0&&void 0!==a0.signupEnterprise||!1,am,an,ao,aA,aE,aB,aC)),
(0,g.x)(a2,aB,a1,au),a2.AddController(2,(0,h.Ue)({m_ui_commands:aW,m_rf_manager:a2,m_rf_new_menu:bt,m_rf_cached_data_info:aN,
m_localization:aB},a1)),a2.AddController(1,(0,g.E)({rf_api:aw,rf_manager:a2,page_status:au,
rf_data_pinned:bk("navigator-pinned-items"),rf_items_existance:br,GetOptions:()=>a4,GetEmergencyAccess:()=>bz,localization:aB
},a1)),a2.AddController(3,(0,k.F)({m_rf_api:aw,m_ui_commands:aW,m_rf_manager:a2,page_status:au,m_rf_new_menu:bt,
m_rf_items_existance:br,m_data_item_display_name_provider:aU,m_rf_cached_data_info:aN,AllItemsPerFolderData:h.Xe,
m_rf_data_pinned:bk("data-list-pinned-items"),m_rf_data_popular:bl,m_rf_data_recent:bn,m_rf_data_totp:bm,
m_start_page_preferences:az,m_localization:aB},a1));let bv="",bw=null;async function bx(a,b,c,d){if(8===b.type){const e=(0,
h.Xe)(b.path);e.IsUptodate()||await e.Update(a,b.path,d);const f=e.GetData()||[]
;for(const a of f)if(8!==a.type&&by(a.path,c))return!0;for(const b of f)if(8===b.type){if(await bx(a,b,c,d))return!0}return!1}
return by(b.path,c)}function by(a,b){const c=(0,H.em)(a);return b.test(c)}a2.GetController(1).onFilterChanged.Add((a=>{
if(bv!==a){if(bv=a,a){const b=new RegExp(a,"i");bw={DoesItemPathMatchFilter:async(a,c,d)=>bx(a,c,b,d),GetDisplayText:()=>a}
}else bw=null;a2.GetController(3).SetDataItemFilter(bw),a2.GetController(2).SetDataItemFilter(bw),(0,h.NL)(bv,a1.dataItems)}})),
a2.AddController(4,(0,j.B)({m_rf_api:aw,m_ui_commands:aW,m_rf_manager:a2,m_rf_data_popular:bl,
m_data_item_display_name_provider:aU,m_initial_identity_provider:aV,m_rf_cached_data_info:aN,m_rf_page_status:au,
OnNew:async a=>bt.CreateNew("new-identity",a,!0)},(0,T.TT)(a1.navigator).identity,aB)),a2.AddController(5,function(d,f,g){
let h=null,i=null,j=null,k=null,l=!1
;const m=(0,e.fy)((async e=>(aF=aF||await Promise.all([c.e(612),c.e(103)]).then(c.bind(c,80794)),await(0,o.D4)(Z),
aF.InitEditorContext({m_rf_page_status:au,m_rf_api:aw,m_rf_commands:ax,m_ui_commands:aW,m_rf_manager:a2,
m_rf_cached_data_info:aN,m_rf_items_existance:br,m_data_item_display_name_provider:aU,m_initial_identity_provider:aV,
m_rf_options:a4,m_rf_policies:a5,m_page_preferences:az,m_breach_mon_service:ay,password_audit_service:aG,
m_rf_data_item_images:aM,IsStillActual:()=>a2.GetController(5).IsStillActual(),m_clipboard_cleaner:aT,m_clipboard:aC,
m_view_api:b,m_localization:aB,m_main_view_html_elements:a1,m_enable_password_strength_details:a.isPasswordDetailsSupported}),
h=aF.EditorController(d,f,g),i&&(h.InitEditor(i.itemInfo,i.itemData,i.edit,i.create,i.viewItemHistory),i=null),
j&&(h.InitEditorWithCustomView(j),j=null),h)));return Object.assign(Object.assign({},m),{InitEditor(a,b,c,d,e){
if(h)return h.InitEditor(a,b,c,d,e);{let f;return i={itemInfo:a,itemData:b,edit:c,create:d,viewItemHistory:e},
f=e?"item history":d?"create":c?"edit":"view",k={m_item_info:a,m_mode:f,m_in_separate_tab:(0,E.P7)().editorInSeparateTab},l=!0,
!0}},InitEditorWithCustomView(a){h?h.InitEditorWithCustomView(a):j=a},UninitEditor(){h?h.UninitEditor():(i=null,j=null,k=null,
l=!1)},IsEditorInitialized:()=>h?h.IsEditorInitialized():l,ItemRenamed(a){null==h||h.ItemRenamed(a)},ItemCreated(a,b){
null==h||h.ItemCreated(a,b)},OnChanges(a){null==h||h.OnChanges(a)},GetState:()=>h?h.GetState():k})}({m_ui_commands:aW,
m_rf_manager:a2,m_rf_service:aw.service,m_rf_data_editor_info:bo,m_rf_data_editor_data:bp,m_identity_view_structure_loader:bq,
m_localization:aB,m_rf_cache:aO,m_sharing_api:aa.sharing,m_clipboard:aC},a1.main,a1.editorScreen)),(0,s.ph)({
m_view_messaging:av,m_browser_type:au.browserType,m_rf_api:aw,m_rf_manager:a2,m_ui_commands:aW,m_rf_items_existance:br,
m_cached_data_images:aM,m_localization:aB}),a2.AddController(6,(0,r.gY)()),a2.AddController(7,(0,r.DB)()),a2.AddController(8,(0,
p.Q)({rf_api:aw,rf_manager:a2,GetPolicies:function(){return a5},GetEmergencyAccess:function(){return bz},page_status:au,
localization:aB},a1));const bz=(0,p.g)({rf_api:aw,rf_commands:ax,rf_manager:a2,page_status:au,OnOpenEditor:a2.OnOpenEditor,
GetDataItemInfo:aN.FetchDataInfo,localization:aB},a1.emergencyAccess,a1.editor);a2.AddController(13,(0,B.v)({m_rf_api:aw,
m_rf_manager:a2,m_ui_commands:aW,m_localization:aB,m_http:at,m_rng:aD,m_view_api:b,m_page_status:au,m_clipboard_cleaner:aT
},a1)),a2.AddController(9,(0,q.I)({m_rf_api:aw,m_breach_mon_service:ay,m_password_audit_service:aG,m_rf_manager:a2,
m_ui_commands:aW,m_rf_cache:aO,m_rf_items_multiselect:bs,m_rf_new_menu:bt,GetOptions:async()=>a4,GetPolicies:async()=>a5,
m_page_preferences:az,m_localization:aB
},a1.securityCenter,a1.files)),a1.loginCopyright.textContent="Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.",
document.body.addEventListener("mousedown",(a=>{document.querySelectorAll("#v8 .rf-data-view .rf-items .selected").forEach((a=>{
a.classList.remove("selected")}));const b=a.target
;(0,o.ve)()&&null!==(0,D.Yw)(b,".rf-data-view .rf-view-style-item,.rf-data-view-header .selector-item, .rf-items .rf-item,.rf-search-list .rf-item,.rf-search,.rf-account,.rf-new-menu,.rf-navigator .selector-item,.rf-navigator .rf-item-folder,.rf-button,.rf-cmdbutton")&&(0,
o.C1)(),
null===(0,D.LP)(b,"#v8 .rf-view-style-popup")&&null===(0,D.LP)(b,"#v8 .rf-view-style-selector")&&a1.dataItems.header.classList.remove("rf-view-style-popup-shown"),
null===(0,D.LP)(b,"#v8 .rf-more-categories-popup")&&null===(0,D.LP)(b,"#v8 .more-categories-select")&&(0,
T.TT)(a1.navigator).main.classList.remove("rf-more-categories-shown"),(0,D.LP)(b,".dropdown-handler")||(0,
D.LP)(b,".dropdown-popup")||0===a.button&&(0,
D.Yw)(b,".shown-popup-menu")&&b.matches(".rf-item-menu")||0===a.button&&b.matches(".rf-command-more-commands")||(0,o.b2)(!1)}))
;const bA=[{key:"F",auxKeys:["ctrlKey"],action:()=>((0,r.o5)(!0),!0)},{key:"S",auxKeys:["ctrlKey"],action:()=>!0}]
;document.addEventListener("keydown",(a=>{for(let b=0;b<bA.length;b++){const c=bA[b];if(c.keyCode){
if(a.which===c.keyCode)return a.preventDefault(),!c.action()}else if(c.key){if(a.keyCode!==c.key.charCodeAt(0))continue
;const b=c.auxKeys;if(!b)return a.preventDefault(),!c.action();for(let d=0;d<b.length;d++)if(a[b[d]])return a.preventDefault(),
!c.action()}}return!0})),(0,l.r)(aw,ax,aW,a2,(()=>a4),(()=>a5),az,a1,au,b,aB),a2.AddController(10,(0,
e.m_)(aw,ax,aI,aK,a2,au,bu,ak,aE,b,aB,aC,a1));const bB="use-native"===au.extensionMode?()=>ax.ShowImportDialog(!0):null
;function bC(a,b){if(a.settings)a2.OpenSettings(a.settings.section);else if(a.editor)(0,
S.fI)(a2.OpenEditorFromBrowserExtension(a.editor));else if(a.sharing)(0,
S.fI)(a2.OpenSharingDialogFromBrowserExtension(a.sharing,b));else if(a.new){const b=a.new;(0,
S.fI)(a2.CreateNewItemFromBrowserExtension(b.item,b.folderPath||"",b.url))}else a.paymentPage?(0,
S.fI)(ax.OpenPaymentPage(a.paymentPage,null)):a.adminCenter?(0,S.fI)(ax.OpenAdminCenter({view:a.adminCenter.view,
companyCreatedTime:a.adminCenter.companyCreatedTime},null)):a.signupEnterprise?(0,S.fI)(ax.OpenSignUpEnterprise({
userType:a.signupEnterprise},null)):a.import&&(0,S.fI)(a2.OpenImportFromBrowserExtension())}if(a2.AddController(11,(0,t.q)({
rf_api:aw,rf_new_menu:bt,parentFrame:a1.mainFrame,localization:aB},{on_show_native_import_dialog:bB,OnStart:()=>{const a=(0,
V.t2)();(0,S.fI)(az.SetValue("StartPage.StepByStepGuideShownTimestamp",(0,T.bf)(a)))},OnShowPinExtensionStep:()=>{const a=(0,
V.t2)();(0,S.fI)(az.SetValue("StartPage.PinExtensionShownTimestamp",(0,T.bf)(a)))}})),a2.AddController(12,(0,u.n)({rf_api:aw,
rf_manager:a2,localization:aB},a1.files,a1.whyRoboForm)),a1.dataItems.data.addEventListener("scroll",(()=>{(0,
o.DN)(a1.dataItems.data)&&(0,o.b2)(!1)})),a1.dataItems.data.addEventListener("contextmenu",(a=>{
if("category-folders"!==a2.GetCategory())return a.preventDefault(),!1;const b=(0,o.Eo)(a),c=a2.GetFolder()||""
;if(!c)return a.preventDefault(),!1;const d=a.target;return!d||null===(0,D.LP)(d,".rf-item")&&null===(0,
D.LP)(d,".rf-list-item-row")?((0,S.fI)((async()=>{const a=await aN.FetchDataInfo(c);await(0,x.mC)(a,a1.dataItems.data,b)})()),
a.preventDefault(),!1):(a.preventDefault(),!1)})),(0,r.xp)({m_ui_commands:aW,m_rf_api:aw,m_rf_manager:a2,m_items_multiselect:bs,
m_data_collector:(0,h.nj)("search",a2.GetController(6).GetIsStillActual()),m_data_item_display_name_provider:aU,
m_data_item_info_parts:bh,m_main_view_html_elements:a1,m_search_pane_view_components:a1.searchPane,
m_search_results_view_components:a1.searchResults,ShowSearchResults:function(){
a2.IsSearchResultShown()||(a2.ActivateControllers([6,7],[3,8,9]),setTimeout((()=>{a2.UpdateViews(!1)}),0))},
HideSearchResults:function(){a2.ActivateControllers([a2.GetActiveDataControllerId(a2.GetCategory())],[7]),a2.UpdateViews(!0)},
localization:aB}),window.ResizeObserver){new ResizeObserver((()=>(0,x.gt)())).observe(a1.files)
}else window.addEventListener("resize",x.gt)}},34842:function(a,b,c){"use strict";c.d(b,{V:function(){return i}})
;var d=c(11834),e=c(41107),f=c(31173),g=(c(13117),c(91764)._);const h="start-page-v8.css";async function i(a,b){var c,i;await(0,
f.eA)(),await(0,e.D4)(h);const aB=function(a){
let b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au
;const av=g("div",{id:"v8",className:"light-theme"},b=g("div",{className:"rf-main-header hidden"},g("a",{
className:"rf-header-logo",title:"RoboForm",onclick:()=>{
window.location.replace(`${window.location.origin+window.location.pathname}#start-page`),window.location.reload()}}),q=g("div",{
className:"rf-search"},r=g("div",{className:"rf-search-box"},g("div",{className:"rf-search-box-header"}),s=g("div",{
className:"rf-search-box-edit"},t=g("input",{type:"text",placeholder:"Search RoboForm"})),u=g("div",{
className:"rf-search-box-count"}),v=g("div",{className:"rf-search-box-eraser"}),w=g("div",{className:"rf-search-box-arrow"
})),x=g("div",{className:"rf-search-dropdown"}),y=g("div",{className:"rf-progress"},g("div",{
className:"rf-progress-runner hidden"}))),g("div",{className:"rf-flex-gap"}),m=g("div",{className:"rf-start-guide rf-cmdbutton"
}),D=g("div",{className:"rf-account noselect"},E=g("div",{className:"rf-account-box selector-with-dropdown"},G=g("div",{
className:"selector-image"}),F=g("div",{className:"selector-title"}),H=g("div",{className:"dropdown-image"})),I=g("div",{
className:"rf-account-menu rf-fade-in rf-fade-out hidden"}),J=g("div",{
className:"rf-modal-screen rf-account-dropdown-screen rf-fade-in rf-fade-out hidden"}))),c=g("div",{className:"main-frame"
},e=g("div",{className:"rf-login hidden"}),f=g("div",{className:"rf-login-page-copyright hidden"}),d=g("div",{
className:"rf-navigator noselect hidden"}),h=g("div",{className:"rf-view-frame hidden"},z=g("div",{
className:"rf-search-result-view rf-view-list hidden"},C=g("div",{className:"rf-multiselect-cmdbar hidden"}),A=g("div",{
className:"rf-search-list rf-items"}),B=g("div",{className:"rf-no-items rf-no-items-search hidden"})),K=g("div",{
className:"rf-data-view hidden"},P=g("div",{className:"rf-folder-breadcrumbs"},Q=g("div",{className:"container"})),L=g("div",{
className:"rf-data-view-header"},M=g("div",{className:"sort-order-selector order-selector noselect"}),N=g("div",{
className:"sharing-center-order-selector order-selector noselect"}),O=g("div",{className:"authenticator-title"}),R=g("div",{
className:"rf-multiselect-cmdbar noselect hidden"}),g("div",{className:"rf-flex-gap"}),S=g("div",{
className:"rf-view-style-selector rf-view-style-item active hidden"}),T=g("div",{className:"rf-view-style-popup"},U=g("div",{
className:"rf-view-style-item rf-view-style-large"}),V=g("div",{className:"rf-view-style-item rf-view-style-condensed"
}),W=g("div",{className:"rf-view-style-item rf-view-style-list"}))),X=g("div",{className:"separator rf-progress"},g("div",{
className:"rf-progress-runner hidden"})),Y=g("div",{className:"rf-data"},Z=g("div",{
className:"rf-items-section rf-items-section-main"},aa=g("div",{className:"rf-items"})),g("div",{className:"rf-no-items hidden"
},g("div",{className:"rf-no-items-icon"}),g("div",{className:"rf-no-items-text"}))),ar=g("div",{className:"rf-new-menu"
},as=g("div",{className:"rf-new-button plus-image"}),at=g("div",{className:"rf-new-dropdown rf-fade-out hidden"}),au=g("div",{
className:"rf-modal-screen rf-new-dropdown-screen rf-fade-in rf-fade-out hidden"}))),ab=g("div",{
className:"rf-password-generator hidden"},g("div",{className:"rf-data-view-header"},ac=g("div",{
className:"password-generator-order-selector order-selector noselect"}))),ad=g("div",{className:"rf-emergency-access hidden"
},g("div",{className:"rf-data-view-header"},ae=g("div",{className:"emergency-access-order-selector order-selector noselect"
})),af=g("div",{className:"separator rf-progress"},g("div",{className:"rf-progress-runner hidden"})),g("div",{
className:"rf-ea-data"},ag=g("table",{className:"rf-ea-accounts"}),ah=g("div",{className:"rf-ea-no-accounts hidden"
})),ai=g("div",{className:"rf-ea-new-contact"},g("div",{className:"rf-new-button plus-image"}))),aj=g("div",{
className:"rf-security-center hidden"},ak=g("div",{className:"summary-pane"}),g("div",{className:"rf-data-view-header"
},ap=g("div",{className:"security-center-order-selector order-selector noselect"}),aq=g("div",{
className:"rf-multiselect-cmdbar hidden"})),am=g("div",{className:"rf-data"},ao=g("div",{
className:"rf-no-items rf-no-items-security-center-tab hidden"})),an=g("div",{
className:"rf-no-items rf-no-items-security-center hidden"}),al=g("div",{className:"rf-security-center-new-login"},g("div",{
className:"rf-new-button plus-image"}))),i=g("div",{className:"rf-settings hidden"},g("div",{className:"rf-progress"
})),j=g("div",{className:"rf-why-roboform hidden"})),o=g("div",{className:"rf-notification rf-common-notification"},g("div",{
className:"rf-notification-msg"}),g("div",{className:"rf-close-btn"})),k=g("div",{
className:"rf-editor-screen rf-modal-screen hidden"}),n=g("div",{className:"rf-notification rf-editor-notification"},g("div",{
className:"rf-notification-msg"}),g("div",{className:"rf-close-btn"}))),p=g("div",{className:"rf-tooltip"}),l=g("div",{
className:"dropdown-popup context-menu-popup hidden"})),aw=new Map;return aw.set("data-items-section-main",{section:Z,items:aa
}),{main:av,commonDialogsParent:c,header:b,startGuideButton:m,account:{main:D,box:E,title:F,image:G,dropdown:H,menu:I,
modalScreen:J},mainFrame:c,login:e,loginCopyright:f,navigator:null,navigatorStub:d,files:h,dataItems:{main:K,header:L,
orderSelectorSort:M,orderSelectorSortPopular:null,orderSelectorSortRecent:null,orderSelectorSortAlphabet:null,
orderSelectorSharingCenter:N,orderSelectorSharingCenterWithMe:null,orderSelectorSharingCenterByMe:null,authenticatorTitle:O,
folderBreadcrumbs:{main:P,container:Q,filterTag:null,filterTagText:null},multiselectCmdbar:R,viewStyleSelector:S,
viewStylePopup:T,viewStyleLarge:U,viewStyleCompact:V,viewStyleList:W,progress:X,data:Y,itemsSections:aw},newMenu:{main:ar,
button:as,dropdown:at,modalScreen:au},passwordGenerator:{main:ab,orderSelector:ac},emergencyAccess:{main:ad,orderSelector:ae,
orderSelectorContacts:null,orderSelectorTestators:null,contactsBandge:null,testatorsBandge:null,progress:af,accounts:ag,
noAccounts:ah,newButton:ai},securityCenter:{main:aj,summaryPane:ak,newLogin:al,data:am,noItems:an,noItemsTab:ao,
noItemsText:null,orderSelector:ap,multiselectCmdbar:aq},settings:i,whyRoboForm:j,editorScreen:k,searchPane:{main:q,options:x,
box:r,boxEdit:s,boxInput:t,boxCount:u,boxEraser:v,boxArrow:w,progress:y},searchResults:{main:z,list:A,noItems:B,
noItemsText:null,multiselectCmdbar:C},editor:null,editorNotification:n,commonNotification:o,tooltip:p,contextMenuPopup:l,
shownDropdownMenuHandler:null,shownDropdownMenuPopup:null,shownDropdownMenuModalScreen:null}}()
;"msie"===b.browserType&&aB.main.classList.add("msie"),
(0,e.Qn)([j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O]),
(0,e.Qn)([P,Q,R,S,T,U,V,W,X,Y,Z,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA])
;const aC=document.querySelector("#v8")
;return aC&&aC.remove(),null===(c=document.querySelector("#rf-start-page-not-loaded"))||void 0===c||c.remove(),
null===(i=document.querySelector("#rf-loading-screen"))||void 0===i||i.remove(),document.body.classList.add("body-v8"),
document.body.appendChild(aB.main),(0,d.Ic)(aB.commonDialogsParent,a),aB}
const j="navigator-all-black87.svg",k="navigator-all-white87.svg",l="navigator-login-black87.svg",m="navigator-login-white87.svg",n="navigator-bookmark-black87.svg",o="navigator-bookmark-white87.svg",p="navigator-safenote-black87.svg",q="navigator-safenote-white87.svg",r="navigator-identity-black87.svg",s="navigator-identity-white87.svg",t="navigator-sharing-center-black87.svg",u="navigator-sharing-center-white87.svg",v="navigator-security-center-black87.svg",w="navigator-security-center-white87.svg",x="navigator-emergency-access-black87.svg",y="navigator-emergency-access-white87.svg",z="navigator-authenticator-black87.svg",A="navigator-authenticator-white87.svg",B="navigator-password-generator-black87.svg",C="navigator-password-generator-white87.svg",D="view-style-grid-black40.svg",E="view-style-grid-white40.svg",F="view-style-grid-active-black87.svg",G="view-style-grid-active-white87.svg",H="view-style-compact-black40.svg",I="view-style-compact-white40.svg",J="view-style-compact-active-black87.svg",K="view-style-compact-active-white87.svg",L="view-style-list-black40.svg",M="view-style-list-white40.svg",N="view-style-list-active-black87.svg",O="view-style-list-active-white87.svg"
;const P="cmd-log-in.svg",Q="cmd-log-in-dark.svg",R="cmd-go-fill-black87.svg",S="cmd-go-fill-hover-dark.svg",T="cmd-go-to-black87.svg",U="cmd-go-to-hover-dark.svg",V="cmd-copy-black87.svg",W="cmd-copy-hover-dark.svg",X="cmd-view-black87.svg",Y="cmd-view-hover-dark.svg",Z="cmd-edit-black87.svg",aa="cmd-edit-hover-dark.svg",ab="cmd-rename-black87.svg",ac="cmd-rename-hover-dark.svg",ad="cmd-move-black87.svg",ae="cmd-move-hover-dark.svg",af="cmd-clone-black87.svg",ag="cmd-clone-hover-dark.svg",ah="cmd-delete-black87.svg",ai="cmd-delete-white87.svg",aj="menu-view-backup-history-hover.svg",ak="menu-view-backup-history-hover-dark.svg",al="cmd-pin-black87.svg",am="cmd-pin-hover-dark.svg",an="cmd-unpin-black87.svg",ao="cmd-unpin-hover-dark.svg",ap="cmd-share-black87.svg",aq="cmd-share-hover-dark.svg",ar="cmd-send-black87.svg",as="cmd-send-hover-dark.svg",at="cmd-print.svg",au="cmd-print-dark.svg",av="cmd-folder-black87.svg",aw="cmd-folder-hover-dark.svg",ax="cmd-exclude-from-security-score.svg",ay="cmd-exclude-from-security-score-dark.svg",az="cmd-include-to-security-score.svg",aA="cmd-include-to-security-score-dark.svg"
},89090:function(a,b,c){"use strict";function d(a,b){for(const c of b)c!==a&&c.Hide();a.Show()}c.d(b,{$:function(){return d}})},
89808:function(a,b,c){"use strict";c.d(b,{A:function(){return d}});const d={version:"9.6.12.0"}},59212:function(a,b,c){
"use strict";a.exports=c.p+"progress-circle.svg"},775:function(a,b,c){"use strict";a.exports=c.p+"search-dark.svg"},
15422:function(a,b,c){"use strict";a.exports=c.p+"search.svg"},85122:function(a,b,c){"use strict";a.exports=c.p+"clear-text.svg"
},20958:function(a,b,c){"use strict";a.exports=c.p+"clone.svg"},47974:function(a,b,c){"use strict";a.exports=c.p+"delete.svg"},
25116:function(a,b,c){"use strict";a.exports=c.p+"editor-close-light.svg"},58863:function(a,b,c){"use strict"
;a.exports=c.p+"editor-close.svg"},6353:function(a,b,c){"use strict";a.exports=c.p+"editor-copy-light.svg"},
15482:function(a,b,c){"use strict";a.exports=c.p+"editor-copy.svg"},2346:function(a,b,c){"use strict"
;a.exports=c.p+"editor-edit-light.svg"},21217:function(a,b,c){"use strict";a.exports=c.p+"editor-edit.svg"},
3846:function(a,b,c){"use strict";a.exports=c.p+"editor-favorite-light.svg"},36029:function(a,b,c){"use strict"
;a.exports=c.p+"editor-favorite.svg"},43503:function(a,b,c){"use strict";a.exports=c.p+"editor-home-light.svg"},
42244:function(a,b,c){"use strict";a.exports=c.p+"editor-home.svg"},41808:function(a,b,c){"use strict"
;a.exports=c.p+"editor-non-favorite-light.svg"},14755:function(a,b,c){"use strict";a.exports=c.p+"editor-non-favorite.svg"},
30526:function(a,b,c){"use strict";a.exports=c.p+"editor-view-in-new-tab-light.svg"},76853:function(a,b,c){"use strict"
;a.exports=c.p+"editor-view-in-new-tab.svg"},89257:function(a,b,c){"use strict";a.exports=c.p+"flag-abkhazia.svg"},
30588:function(a,b,c){"use strict";a.exports=c.p+"flag-afganistan.svg"},57837:function(a,b,c){"use strict"
;a.exports=c.p+"flag-aland-islands.svg"},81465:function(a,b,c){"use strict";a.exports=c.p+"flag-albania.svg"},
73627:function(a,b,c){"use strict";a.exports=c.p+"flag-algeria.svg"},90942:function(a,b,c){"use strict"
;a.exports=c.p+"flag-american-samoa.svg"},21625:function(a,b,c){"use strict";a.exports=c.p+"flag-andorra.svg"},
90292:function(a,b,c){"use strict";a.exports=c.p+"flag-angola.svg"},67857:function(a,b,c){"use strict"
;a.exports=c.p+"flag-anguilla.svg"},4181:function(a,b,c){"use strict";a.exports=c.p+"flag-antigua-and-barbuda.svg"},
31733:function(a,b,c){"use strict";a.exports=c.p+"flag-argentina.svg"},82755:function(a,b,c){"use strict"
;a.exports=c.p+"flag-armenia.svg"},7299:function(a,b,c){"use strict";a.exports=c.p+"flag-aruba.svg"},40260:function(a,b,c){
"use strict";a.exports=c.p+"flag-australia.svg"},78143:function(a,b,c){"use strict";a.exports=c.p+"flag-austria.svg"},
48017:function(a,b,c){"use strict";a.exports=c.p+"flag-azerbaijan.svg"},27641:function(a,b,c){"use strict"
;a.exports=c.p+"flag-azores-islands.svg"},19865:function(a,b,c){"use strict";a.exports=c.p+"flag-bahamas.svg"},
36205:function(a,b,c){"use strict";a.exports=c.p+"flag-bahrain.svg"},44760:function(a,b,c){"use strict"
;a.exports=c.p+"flag-balearic-islands.svg"},68741:function(a,b,c){"use strict";a.exports=c.p+"flag-bangladesh.svg"},
58496:function(a,b,c){"use strict";a.exports=c.p+"flag-barbados.svg"},88502:function(a,b,c){"use strict"
;a.exports=c.p+"flag-basque-country.svg"},54730:function(a,b,c){"use strict";a.exports=c.p+"flag-belarus.svg"},
15153:function(a,b,c){"use strict";a.exports=c.p+"flag-belgium.svg"},25507:function(a,b,c){"use strict"
;a.exports=c.p+"flag-belize.svg"},22744:function(a,b,c){"use strict";a.exports=c.p+"flag-benin.svg"},85726:function(a,b,c){
"use strict";a.exports=c.p+"flag-bermuda.svg"},34732:function(a,b,c){"use strict";a.exports=c.p+"flag-bhutan-1.svg"},
89398:function(a,b,c){"use strict";a.exports=c.p+"flag-bhutan.svg"},53306:function(a,b,c){"use strict"
;a.exports=c.p+"flag-bolivia.svg"},48374:function(a,b,c){"use strict";a.exports=c.p+"flag-bonaire.svg"},19921:function(a,b,c){
"use strict";a.exports=c.p+"flag-bosnia-and-herzegovina.svg"},18927:function(a,b,c){"use strict"
;a.exports=c.p+"flag-botswana.svg"},78920:function(a,b,c){"use strict";a.exports=c.p+"flag-brazil.svg"},87492:function(a,b,c){
"use strict";a.exports=c.p+"flag-british-columbia.svg"},31913:function(a,b,c){"use strict"
;a.exports=c.p+"flag-british-indian-ocean-territory.svg"},23870:function(a,b,c){"use strict"
;a.exports=c.p+"flag-british-virgin-islands.svg"},54369:function(a,b,c){"use strict";a.exports=c.p+"flag-brunei.svg"},
61817:function(a,b,c){"use strict";a.exports=c.p+"flag-bulgaria.svg"},24034:function(a,b,c){"use strict"
;a.exports=c.p+"flag-burkina-faso.svg"},23869:function(a,b,c){"use strict";a.exports=c.p+"flag-burundi.svg"},
70712:function(a,b,c){"use strict";a.exports=c.p+"flag-cambodia.svg"},83374:function(a,b,c){"use strict"
;a.exports=c.p+"flag-cameroon.svg"},41388:function(a,b,c){"use strict";a.exports=c.p+"flag-canada.svg"},86379:function(a,b,c){
"use strict";a.exports=c.p+"flag-canary-islands.svg"},53022:function(a,b,c){"use strict";a.exports=c.p+"flag-cape-verde.svg"},
14816:function(a,b,c){"use strict";a.exports=c.p+"flag-cayman-islands.svg"},18735:function(a,b,c){"use strict"
;a.exports=c.p+"flag-central-african-republic.svg"},27402:function(a,b,c){"use strict";a.exports=c.p+"flag-ceuta.svg"},
5540:function(a,b,c){"use strict";a.exports=c.p+"flag-chad.svg"},28737:function(a,b,c){"use strict"
;a.exports=c.p+"flag-chile.svg"},13083:function(a,b,c){"use strict";a.exports=c.p+"flag-china.svg"},65012:function(a,b,c){
"use strict";a.exports=c.p+"flag-christmas-island.svg"},25921:function(a,b,c){"use strict";a.exports=c.p+"flag-cocos-island.svg"
},37604:function(a,b,c){"use strict";a.exports=c.p+"flag-colombia.svg"},25148:function(a,b,c){"use strict"
;a.exports=c.p+"flag-comoros.svg"},80275:function(a,b,c){"use strict";a.exports=c.p+"flag-cook-islands.svg"},
98550:function(a,b,c){"use strict";a.exports=c.p+"flag-corsica.svg"},2672:function(a,b,c){"use strict"
;a.exports=c.p+"flag-costa-rica.svg"},91505:function(a,b,c){"use strict";a.exports=c.p+"flag-croatia.svg"},
77353:function(a,b,c){"use strict";a.exports=c.p+"flag-cuba.svg"},41836:function(a,b,c){"use strict"
;a.exports=c.p+"flag-curacao.svg"},58004:function(a,b,c){"use strict";a.exports=c.p+"flag-cyprus.svg"},54640:function(a,b,c){
"use strict";a.exports=c.p+"flag-czech-republic.svg"},77079:function(a,b,c){"use strict"
;a.exports=c.p+"flag-democratic-republic-of-congo.svg"},49788:function(a,b,c){"use strict";a.exports=c.p+"flag-denmark.svg"},
20796:function(a,b,c){"use strict";a.exports=c.p+"flag-djibouti.svg"},38456:function(a,b,c){"use strict"
;a.exports=c.p+"flag-dominica.svg"},36915:function(a,b,c){"use strict";a.exports=c.p+"flag-dominican-republic.svg"},
85163:function(a,b,c){"use strict";a.exports=c.p+"flag-east-timor.svg"},1191:function(a,b,c){"use strict"
;a.exports=c.p+"flag-ecuador.svg"},53867:function(a,b,c){"use strict";a.exports=c.p+"flag-egypt.svg"},91953:function(a,b,c){
"use strict";a.exports=c.p+"flag-england.svg"},64085:function(a,b,c){"use strict";a.exports=c.p+"flag-equatorial-guinea.svg"},
18144:function(a,b,c){"use strict";a.exports=c.p+"flag-eritrea.svg"},44119:function(a,b,c){"use strict"
;a.exports=c.p+"flag-estonia.svg"},96779:function(a,b,c){"use strict";a.exports=c.p+"flag-ethiopia.svg"},21491:function(a,b,c){
"use strict";a.exports=c.p+"flag-european-union.svg"},40216:function(a,b,c){"use strict"
;a.exports=c.p+"flag-falkland-islands.svg"},15272:function(a,b,c){"use strict";a.exports=c.p+"flag-faroe-islands.svg"},
48486:function(a,b,c){"use strict";a.exports=c.p+"flag-fiji.svg"},8818:function(a,b,c){"use strict"
;a.exports=c.p+"flag-finland.svg"},99007:function(a,b,c){"use strict";a.exports=c.p+"flag-france.svg"},19135:function(a,b,c){
"use strict";a.exports=c.p+"flag-french-polynesia.svg"},39971:function(a,b,c){"use strict";a.exports=c.p+"flag-gabon.svg"},
77534:function(a,b,c){"use strict";a.exports=c.p+"flag-galapagos-islands.svg"},64293:function(a,b,c){"use strict"
;a.exports=c.p+"flag-gambia.svg"},16670:function(a,b,c){"use strict";a.exports=c.p+"flag-georgia.svg"},61633:function(a,b,c){
"use strict";a.exports=c.p+"flag-germany.svg"},12711:function(a,b,c){"use strict";a.exports=c.p+"flag-ghana.svg"},
28486:function(a,b,c){"use strict";a.exports=c.p+"flag-gibraltar.svg"},24995:function(a,b,c){"use strict"
;a.exports=c.p+"flag-greece.svg"},88132:function(a,b,c){"use strict";a.exports=c.p+"flag-greenland.svg"},1052:function(a,b,c){
"use strict";a.exports=c.p+"flag-grenada.svg"},65496:function(a,b,c){"use strict";a.exports=c.p+"flag-guam.svg"},
83033:function(a,b,c){"use strict";a.exports=c.p+"flag-guatemala.svg"},65180:function(a,b,c){"use strict"
;a.exports=c.p+"flag-guernsey.svg"},90969:function(a,b,c){"use strict";a.exports=c.p+"flag-guinea-bissau.svg"},
21421:function(a,b,c){"use strict";a.exports=c.p+"flag-guinea.svg"},51367:function(a,b,c){"use strict"
;a.exports=c.p+"flag-guyana.svg"},81753:function(a,b,c){"use strict";a.exports=c.p+"flag-haiti.svg"},99925:function(a,b,c){
"use strict";a.exports=c.p+"flag-hawaii.svg"},7842:function(a,b,c){"use strict";a.exports=c.p+"flag-honduras.svg"},
54498:function(a,b,c){"use strict";a.exports=c.p+"flag-hong-kong.svg"},54564:function(a,b,c){"use strict"
;a.exports=c.p+"flag-hungary.svg"},40912:function(a,b,c){"use strict";a.exports=c.p+"flag-iceland.svg"},15943:function(a,b,c){
"use strict";a.exports=c.p+"flag-india.svg"},87108:function(a,b,c){"use strict";a.exports=c.p+"flag-indonesia.svg"},
38870:function(a,b,c){"use strict";a.exports=c.p+"flag-iran.svg"},35441:function(a,b,c){"use strict"
;a.exports=c.p+"flag-iraq.svg"},71523:function(a,b,c){"use strict";a.exports=c.p+"flag-ireland.svg"},89476:function(a,b,c){
"use strict";a.exports=c.p+"flag-isle-of-man.svg"},10562:function(a,b,c){"use strict";a.exports=c.p+"flag-israel.svg"},
51043:function(a,b,c){"use strict";a.exports=c.p+"flag-italy.svg"},82060:function(a,b,c){"use strict"
;a.exports=c.p+"flag-ivory-coast.svg"},83712:function(a,b,c){"use strict";a.exports=c.p+"flag-jamaica.svg"},
81518:function(a,b,c){"use strict";a.exports=c.p+"flag-japan.svg"},36914:function(a,b,c){"use strict"
;a.exports=c.p+"flag-jersey.svg"},47264:function(a,b,c){"use strict";a.exports=c.p+"flag-jordan.svg"},32816:function(a,b,c){
"use strict";a.exports=c.p+"flag-kazakhstan.svg"},73806:function(a,b,c){"use strict";a.exports=c.p+"flag-kenya.svg"},
85683:function(a,b,c){"use strict";a.exports=c.p+"flag-kiribati.svg"},67644:function(a,b,c){"use strict"
;a.exports=c.p+"flag-korea.svg"},79119:function(a,b,c){"use strict";a.exports=c.p+"flag-kosovo.svg"},28469:function(a,b,c){
"use strict";a.exports=c.p+"flag-kuwait.svg"},24478:function(a,b,c){"use strict";a.exports=c.p+"flag-kyrgyzstan.svg"},
16337:function(a,b,c){"use strict";a.exports=c.p+"flag-laos.svg"},82759:function(a,b,c){"use strict"
;a.exports=c.p+"flag-latvia.svg"},20349:function(a,b,c){"use strict";a.exports=c.p+"flag-lebanon.svg"},36980:function(a,b,c){
"use strict";a.exports=c.p+"flag-lesotho.svg"},64192:function(a,b,c){"use strict";a.exports=c.p+"flag-liberia.svg"},
12049:function(a,b,c){"use strict";a.exports=c.p+"flag-libya.svg"},3329:function(a,b,c){"use strict"
;a.exports=c.p+"flag-liechtenstein.svg"},54715:function(a,b,c){"use strict";a.exports=c.p+"flag-lithuania.svg"},
38162:function(a,b,c){"use strict";a.exports=c.p+"flag-luxembourg.svg"},18267:function(a,b,c){"use strict"
;a.exports=c.p+"flag-macao.svg"},53957:function(a,b,c){"use strict";a.exports=c.p+"flag-macedonia.svg"},12454:function(a,b,c){
"use strict";a.exports=c.p+"flag-madagascar.svg"},27113:function(a,b,c){"use strict";a.exports=c.p+"flag-madeira.svg"},
90957:function(a,b,c){"use strict";a.exports=c.p+"flag-malawi.svg"},45691:function(a,b,c){"use strict"
;a.exports=c.p+"flag-malaysia.svg"},96601:function(a,b,c){"use strict";a.exports=c.p+"flag-maldives.svg"},6825:function(a,b,c){
"use strict";a.exports=c.p+"flag-mali.svg"},9269:function(a,b,c){"use strict";a.exports=c.p+"flag-malta.svg"},
8578:function(a,b,c){"use strict";a.exports=c.p+"flag-marshall-island.svg"},66043:function(a,b,c){"use strict"
;a.exports=c.p+"flag-martinique.svg"},4473:function(a,b,c){"use strict";a.exports=c.p+"flag-mauritania.svg"},
38779:function(a,b,c){"use strict";a.exports=c.p+"flag-mauritius.svg"},11422:function(a,b,c){"use strict"
;a.exports=c.p+"flag-melilla.svg"},50471:function(a,b,c){"use strict";a.exports=c.p+"flag-mexico.svg"},1982:function(a,b,c){
"use strict";a.exports=c.p+"flag-micronesia.svg"},24382:function(a,b,c){"use strict";a.exports=c.p+"flag-moldova.svg"},
7863:function(a,b,c){"use strict";a.exports=c.p+"flag-monaco.svg"},18516:function(a,b,c){"use strict"
;a.exports=c.p+"flag-mongolia.svg"},45788:function(a,b,c){"use strict";a.exports=c.p+"flag-montenegro.svg"},
56907:function(a,b,c){"use strict";a.exports=c.p+"flag-montserrat.svg"},76768:function(a,b,c){"use strict"
;a.exports=c.p+"flag-morocco.svg"},47808:function(a,b,c){"use strict";a.exports=c.p+"flag-mozambique.svg"},
10659:function(a,b,c){"use strict";a.exports=c.p+"flag-myanmar.svg"},20589:function(a,b,c){"use strict"
;a.exports=c.p+"flag-namibia.svg"},60734:function(a,b,c){"use strict";a.exports=c.p+"flag-nato.svg"},90185:function(a,b,c){
"use strict";a.exports=c.p+"flag-nauru.svg"},3364:function(a,b,c){"use strict";a.exports=c.p+"flag-nepal.svg"},
91986:function(a,b,c){"use strict";a.exports=c.p+"flag-netherlands.svg"},15096:function(a,b,c){"use strict"
;a.exports=c.p+"flag-new-zealand.svg"},9335:function(a,b,c){"use strict";a.exports=c.p+"flag-nicaragua.svg"},
17037:function(a,b,c){"use strict";a.exports=c.p+"flag-niger.svg"},24403:function(a,b,c){"use strict"
;a.exports=c.p+"flag-nigeria.svg"},9403:function(a,b,c){"use strict";a.exports=c.p+"flag-niue.svg"},89993:function(a,b,c){
"use strict";a.exports=c.p+"flag-norfolk-island.svg"},84166:function(a,b,c){"use strict";a.exports=c.p+"flag-north-korea.svg"},
10529:function(a,b,c){"use strict";a.exports=c.p+"flag-northen-cyprus.svg"},40944:function(a,b,c){"use strict"
;a.exports=c.p+"flag-northern-marianas-islands.svg"},41104:function(a,b,c){"use strict";a.exports=c.p+"flag-norway.svg"},
54011:function(a,b,c){"use strict";a.exports=c.p+"flag-oman.svg"},66069:function(a,b,c){"use strict"
;a.exports=c.p+"flag-orkney-islands.svg"},58262:function(a,b,c){"use strict";a.exports=c.p+"flag-ossetia.svg"},
99848:function(a,b,c){"use strict";a.exports=c.p+"flag-pakistan.svg"},22275:function(a,b,c){"use strict"
;a.exports=c.p+"flag-palau.svg"},8251:function(a,b,c){"use strict";a.exports=c.p+"flag-palestine.svg"},31750:function(a,b,c){
"use strict";a.exports=c.p+"flag-panama.svg"},91424:function(a,b,c){"use strict";a.exports=c.p+"flag-papua-new-guinea.svg"},
50750:function(a,b,c){"use strict";a.exports=c.p+"flag-paraguay.svg"},57188:function(a,b,c){"use strict"
;a.exports=c.p+"flag-peru.svg"},43667:function(a,b,c){"use strict";a.exports=c.p+"flag-philippines.svg"},11:function(a,b,c){
"use strict";a.exports=c.p+"flag-pitcairn-islands.svg"},97226:function(a,b,c){"use strict";a.exports=c.p+"flag-poland.svg"},
82288:function(a,b,c){"use strict";a.exports=c.p+"flag-portugal.svg"},64891:function(a,b,c){"use strict"
;a.exports=c.p+"flag-puerto-rico.svg"},5085:function(a,b,c){"use strict";a.exports=c.p+"flag-qatar.svg"},49651:function(a,b,c){
"use strict";a.exports=c.p+"flag-rapa-nui.svg"},90579:function(a,b,c){"use strict"
;a.exports=c.p+"flag-republic-of-the-congo.svg"},41955:function(a,b,c){"use strict";a.exports=c.p+"flag-romania.svg"},
72757:function(a,b,c){"use strict";a.exports=c.p+"flag-russia.svg"},52663:function(a,b,c){"use strict"
;a.exports=c.p+"flag-rwanda.svg"},66721:function(a,b,c){"use strict";a.exports=c.p+"flag-saba-island.svg"},
71577:function(a,b,c){"use strict";a.exports=c.p+"flag-saint-kitts-and-nevis.svg"},59748:function(a,b,c){"use strict"
;a.exports=c.p+"flag-salvador.svg"},54163:function(a,b,c){"use strict";a.exports=c.p+"flag-samoa.svg"},39545:function(a,b,c){
"use strict";a.exports=c.p+"flag-san-marino.svg"},38538:function(a,b,c){"use strict"
;a.exports=c.p+"flag-sao-tome-and-principe.svg"},48771:function(a,b,c){"use strict";a.exports=c.p+"flag-sardinia.svg"},
25385:function(a,b,c){"use strict";a.exports=c.p+"flag-saudi-arabia.svg"},48762:function(a,b,c){"use strict"
;a.exports=c.p+"flag-scotland.svg"},29491:function(a,b,c){"use strict";a.exports=c.p+"flag-senegal.svg"},77324:function(a,b,c){
"use strict";a.exports=c.p+"flag-serbia.svg"},99635:function(a,b,c){"use strict";a.exports=c.p+"flag-seychelles.svg"},
87400:function(a,b,c){"use strict";a.exports=c.p+"flag-sierra-leone.svg"},412:function(a,b,c){"use strict"
;a.exports=c.p+"flag-singapore.svg"},57214:function(a,b,c){"use strict";a.exports=c.p+"flag-sint-eustatius.svg"},
10119:function(a,b,c){"use strict";a.exports=c.p+"flag-sint-maarten.svg"},13018:function(a,b,c){"use strict"
;a.exports=c.p+"flag-slovakia.svg"},62703:function(a,b,c){"use strict";a.exports=c.p+"flag-slovenia.svg"},2882:function(a,b,c){
"use strict";a.exports=c.p+"flag-solomon-islands.svg"},19548:function(a,b,c){"use strict";a.exports=c.p+"flag-somalia.svg"},
18796:function(a,b,c){"use strict";a.exports=c.p+"flag-somaliland.svg"},15712:function(a,b,c){"use strict"
;a.exports=c.p+"flag-south-africa.svg"},80323:function(a,b,c){"use strict";a.exports=c.p+"flag-south-sudan.svg"},
11677:function(a,b,c){"use strict";a.exports=c.p+"flag-spain.svg"},84676:function(a,b,c){"use strict"
;a.exports=c.p+"flag-sri-lanka.svg"},28144:function(a,b,c){"use strict";a.exports=c.p+"flag-st-barts.svg"},3626:function(a,b,c){
"use strict";a.exports=c.p+"flag-st-lucia.svg"},75576:function(a,b,c){"use strict"
;a.exports=c.p+"flag-st-vincent-and-the-grenadines.svg"},6247:function(a,b,c){"use strict";a.exports=c.p+"flag-sudan.svg"},
53848:function(a,b,c){"use strict";a.exports=c.p+"flag-suriname.svg"},68809:function(a,b,c){"use strict"
;a.exports=c.p+"flag-swaziland.svg"},96886:function(a,b,c){"use strict";a.exports=c.p+"flag-sweden.svg"},68409:function(a,b,c){
"use strict";a.exports=c.p+"flag-switzerland.svg"},90886:function(a,b,c){"use strict";a.exports=c.p+"flag-syria.svg"},
57034:function(a,b,c){"use strict";a.exports=c.p+"flag-taiwan.svg"},59108:function(a,b,c){"use strict"
;a.exports=c.p+"flag-tajikistan.svg"},36724:function(a,b,c){"use strict";a.exports=c.p+"flag-tanzania.svg"},
38715:function(a,b,c){"use strict";a.exports=c.p+"flag-thailand.svg"},5848:function(a,b,c){"use strict"
;a.exports=c.p+"flag-tibet.svg"},20271:function(a,b,c){"use strict";a.exports=c.p+"flag-togo.svg"},26009:function(a,b,c){
"use strict";a.exports=c.p+"flag-tokelau.svg"},21621:function(a,b,c){"use strict";a.exports=c.p+"flag-tonga.svg"},
85994:function(a,b,c){"use strict";a.exports=c.p+"flag-transnistria.svg"},14172:function(a,b,c){"use strict"
;a.exports=c.p+"flag-trinidad-and-tobago.svg"},21009:function(a,b,c){"use strict";a.exports=c.p+"flag-tunisia.svg"},
16276:function(a,b,c){"use strict";a.exports=c.p+"flag-turkey.svg"},59051:function(a,b,c){"use strict"
;a.exports=c.p+"flag-turkmenistan.svg"},69492:function(a,b,c){"use strict";a.exports=c.p+"flag-turks-and-caicos.svg"},
3409:function(a,b,c){"use strict";a.exports=c.p+"flag-tuvalu.svg"},36462:function(a,b,c){"use strict"
;a.exports=c.p+"flag-uganda.svg"},65421:function(a,b,c){"use strict";a.exports=c.p+"flag-ukraine.svg"},21813:function(a,b,c){
"use strict";a.exports=c.p+"flag-united-arab-emirates.svg"},6399:function(a,b,c){"use strict"
;a.exports=c.p+"flag-united-kingdom.svg"},65864:function(a,b,c){"use strict";a.exports=c.p+"flag-united-nations.svg"},
94782:function(a,b,c){"use strict";a.exports=c.p+"flag-united-states.svg"},61410:function(a,b,c){"use strict"
;a.exports=c.p+"flag-uruguay.svg"},99457:function(a,b,c){"use strict";a.exports=c.p+"flag-uzbekistn.svg"},58322:function(a,b,c){
"use strict";a.exports=c.p+"flag-vanuatu.svg"},73374:function(a,b,c){"use strict";a.exports=c.p+"flag-vatican-city.svg"},
25019:function(a,b,c){"use strict";a.exports=c.p+"flag-venezuela.svg"},36078:function(a,b,c){"use strict"
;a.exports=c.p+"flag-vietnam.svg"},21736:function(a,b,c){"use strict";a.exports=c.p+"flag-virgin-islands.svg"},
51350:function(a,b,c){"use strict";a.exports=c.p+"flag-wales.svg"},45919:function(a,b,c){"use strict"
;a.exports=c.p+"flag-western-sahara.svg"},53484:function(a,b,c){"use strict";a.exports=c.p+"flag-yemen.svg"},
18370:function(a,b,c){"use strict";a.exports=c.p+"flag-zambia.svg"},45337:function(a,b,c){"use strict"
;a.exports=c.p+"flag-zimbabwe.svg"},14497:function(a,b,c){"use strict";a.exports=c.p+"folder-black.svg"},26781:function(a,b,c){
"use strict";a.exports=c.p+"go-fill.svg"},24713:function(a,b,c){"use strict";a.exports=c.p+"log-in.svg"},51796:function(a,b,c){
"use strict";a.exports=c.p+"move.svg"},38664:function(a,b,c){"use strict";a.exports=c.p+"print.svg"},31586:function(a,b,c){
"use strict";a.exports=c.p+"rename-dark.svg"},42609:function(a,b,c){"use strict";a.exports=c.p+"rename.svg"},
1597:function(a,b,c){"use strict";a.exports=c.p+"send.svg"},41656:function(a,b,c){"use strict";a.exports=c.p+"share.svg"},
74072:function(a,b,c){"use strict";a.exports=c.p+"view.svg"},44974:function(){},49701:function(){},29165:function(){}
},function(a){a.O(0,[612],(function(){return b=51443,a(a.s=b);var b}));a.O()}]);