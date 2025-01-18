// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[864],{361:function(a,b,c){c.r(b),c.d(b,{
LoginEditorView:function(){return F},LoginViewerView:function(){return E}})
;var d=c(53166),e=c(98266),f=c(87965),g=c(30045),h=c(47333),i=c(19380),j=c(4601),k=c(41107),l=c(65852),m=c(4234),n=c(45638),o=c(88579),p=c(78949),q=c(62851),r=c(55493),s=c(31173),t=c(32105),u=c(63956),v=c(58605),w=c(95399),x=c(13113),y=c(73863),z=c(4153),A=c(78440),B=c(97490),C=c(69893),D=(c(13117),
c(91764)._);function E(a,b,c,e,E,F,J,K,N,O,P,Q,R,S,T,U){const V=c,W=T,X=e,Y=J,Z=K,aa=N,ab=O,ac=E,ad=Q,ae=S.LocalizeString
;let af=Object.assign({},a),ag=M(b),ah=!1;const ai=ac,aj=300,ak=251;let al,am,an,ao,ap,aq,ar,as,at,au,av=null;const aw=[]
;let ax,ay,az,aA=null,aB=null,aC=null,aD=null,aE=null,aF=!1,aG=!1,aH=!1;const[aI,aJ]=(0,B.Uw)(!1);let aK=!1,aL=null;const aM=(0,
j.zd)({imageSize:"imgLogo",rfDataItemImages:V,OnSetImage:(a,b)=>(0,j.rd)(a,am,an,b),OnResetImage:()=>{(0,j._K)(am,an)}
}),aN=window.ResizeObserver?new ResizeObserver((()=>aR())):null;return{Create:async function(c,d){const e=!ad&&4!==af.type
;return al=D("div",{className:"editor-view editor-inline editor-login view-mode"},D("div",{className:"editor-content"
},am=D("div",{className:"content-header"},D("div",{className:"header-container "+(R?"tab-view":"")},an=D("div",{
className:"header-image"}),D("div",{className:"header-title-pane"},ao=D("div",{className:"header-title"},ap=D("div",{
className:"title-name",onclick:aW}),aq=D("div",{className:"title-folder hidden"})),az=(0,t.nM)("hidden",aZ,aX,aY)),D("div",{
className:"header-actionbar "+(P?"":"hidden")},e?D("div",{className:"action-button action-login",
title:await ae("StartPage_Login_ActionLogInTip"),onclick:()=>(0,A.fI)(aS())},D("div",{className:"icon"}),D("div",{
className:"title"},await ae("Cmd_Login_Flat"))):null,e?D("div",{className:"action-button action-gofill",
title:await ae("StartPage_Login_ActionGoFillTip"),onclick:()=>(0,A.fI)(async function(){if(!ag.m_goto_url||(0,
o.HB)(ag.m_goto_url))return;const a=ag.m_goto_url
;if(a&&(0,s.oK)(a))return void U.ShowNotification(await ae("CannotOpenUrlForSecurityReasons"),5,2);a&&await Y.GoFillSubmit({
navigate:!0,path:af.path,submit:!1,newTab:!0},null)}())},D("div",{className:"icon"}),D("div",{className:"title"
},await ae("Cmd_GoFill_Flat"))):null,D("div",{className:"action-button action-goto",
title:await ae("StartPage_Login_ActionGoToTip"),onclick:()=>(0,A.fI)(async function(){if(!ag.m_goto_url||(0,
o.HB)(ag.m_goto_url))return;const a=ag.m_goto_url
;if(a&&(0,s.oK)(a))return void U.ShowNotification(await ae("CannotOpenUrlForSecurityReasons"),5,2);a&&await Y.GoTo(af.path,{
newTab:!0,dontAddToRecentlyUsedAndLogs:4===af.type})}())},D("div",{className:"icon"}),D("div",{className:"title"
},await ae("Cmd_Goto_Flat")))),D("div",{className:"editor-cmdbar cmdbar-main"},a.readOnly?null:D("div",{
className:"editor-cmd editor-cmd-edit",title:await ae("StartPage_Cmd_Edit"),onclick:()=>{(0,u.D$)((async()=>{const a=(0,
A.f4)(null,null,null),b=await ai.GetDataItem(af.path,4,null,a);await U.ShowDataEditModeInDetailsPane(af,b,!1,a)
}),(()=>()=>{}),0,null)}}),ar=D("div",{className:"editor-cmd editor-cmd-more",title:await ae("StartPage_MoreActions_Tip"),
onmousedown:aT,onclick:aU}),R?null:D("div",{className:"editor-cmd editor-cmd-close",title:await ae("Cmd_Close_Flat"),
onclick:()=>d((0,C.JS)())})),R?D("div",{className:"editor-cmdbar cmdbar-navigation"},D("div",{
className:"editor-cmd editor-cmd-home",title:await ae("StartPage_Cmd_Home"),onclick:()=>{const a={startPage:(0,l.vj)()};(0,
A.fI)(J.OpenStartPage(a))}})):null)),as=D("div",{className:"content-data "+(R?"tab-view":"")},at=D("div",{
className:"login-field field-url hidden"}),au=D("div",{className:"data-fields hidden"}),(async a=>aI(a)?D("div",{
className:"security-warning"},D("div",{className:"security-warning-pane"},D("div",{className:"title"},D("div",{className:"icon"
}),await ae("LoginIsCompromised_Notification_Title")),D("div",{className:"message"
},await ae("LoginIsCompromised_Notification_Message2")," ",D("a",{className:"link learn-more",target:"_blank",
href:"https://help.roboform.com/hc/articles/360060772192",title:await ae("PassAud_TabCompromised_Description_Part1")
},await ae("LearnMore")),D("br",null),D("br",null),D("span",{className:"link",onclick:()=>(0,A.fI)(aS())
},await ae("LoginIsCompromised_Notification_Login_Hint_Login")),await ae("LoginIsCompromised_Notification_Login_Hint_Text",[(0,
o.pK)(b.m_goto_url||"").toLowerCase()])))):D("div",{className:"security-warning hidden"})),ax=D("div",{
className:"passkey-fields hidden"}),aC=L()?D("div",{className:"login-field field-totp-key hidden"}):null,ay=D("div",{
className:"login-field field-note hidden"})))),(0,A.C)((()=>{aO(af,ag),null==aN||aN.observe(au)})),al},OnAfterShow:function(){
ai.onDataChanged.Add(a0)},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){null==aN||aN.disconnect(),
ai.onDataChanged.Remove(a0)}};function aO(a,b){(0,u.PQ)((async()=>{var c,d;const e=!(0,z.XM)(ag,b),f=!(0,z.XM)(af,a);(0,
u.l5)(am),(0,k.BC)((0,m.em)(a.path),ap),(0,A.fI)(aM.UpdateBySiteUrl((0,q.g4)(b.m_goto_url||"",b.m_match_url))),
await async function(a){if(a){const b=function(a){if(0!==a.search(/^(.*:\/\/)/))return!1;const b=(0,x.vN)(a)
;if(null===b||!b.m_host)return!1;let c="";c=void 0===b.m_port||80===b.m_port||443===b.m_port?b.m_host:`${b.m_host}:${b.m_port}`
;c.length>2&&'"'===c[0]&&'"'===c[c.length-1]&&(c=c.substring(1,c.length-1));return c}(a)||a;let c,d,e;const f=D("div",{
className:"login-field field-url"},D("div",{className:"field-caption"},ae("PassCard_Field_Url")),av=D("div",{
className:"field-value"},D("div",{className:"text"},c=D("span",{className:"text-value"},b)),D("div",{
className:"inline-onhover-buttons-pane"},d=D("div",{className:"onhover-button onhover-button-expand"+(b===a?" hidden":""),
title:await ae("StartPage_Login_ShowFullURL"),onclick:()=>{(0,u.SE)(d),(0,u.l5)(e),f.classList.add("full-url-shown"),
c.textContent=a}}),e=D("div",{className:"onhover-button onhover-button-collapse hidden",
title:await ae("StartPage_Login_HideFullURL"),onclick:()=>{(0,u.l5)(d),(0,u.SE)(e),f.classList.remove("full-url-shown"),
c.textContent=b}}),D("div",{className:"onhover-button onhover-button-copy",title:await ae("Editor_Cmd_Copy_Flat"),onclick:g}))))
;function g(){var a;const b=null!==(a=c.textContent)&&void 0!==a?a:"";(0,A.fI)((async()=>{await aV(b),
U.ShowNotification(await ae("Notification_URL_Copyied_Text"),null,null)})())}as.replaceChild(f,at),at=f}else(0,u.SE)(at)
}(b.m_goto_url||""),await aP(a.path),(e||f||!ah)&&(await async function(a){if(aJ(!1),
1!==a.type||a.readOnly||a.hidePasswords||!aa||!ab)return;try{
if(!await aa.GetSecurityWarningEnabledForDataItem(a.path,[0],null))return
;const b=await ab.GetUpdateUserDataItemBreaches(a.path,null);b&&b.m_breaches.length>0&&aJ(!0)}catch(b){return}}(a),
await async function(a,b){const c=b.m_fields||[];(0,u.rK)(au),(0,u.SE)(au);let d=null,e=!1;for(let g=0;g<c.length;g++){
const f=c[g],h=f.m_type;if(3===h||4===h||5===h)continue;const i=I(a.type,f);if(i.serviceField)continue;const j=f.m_value
;if(!j||j===m.AN)continue;i.userIdField&&(d=j);const k=await aQ(g,a,b,f,i);au.appendChild(k),e=!0}const f=(0,m.OG)(b);if(f){
const a=(0,r.cr)(f),b=null==a?void 0:a.p[0];b&&!d&&(au.appendChild(D("div",{className:"login-field"},D("div",{
className:"field-caption"},await ae("PassCards_UserId")),D("div",{className:"field-value"},D("div",{className:"text"},D("span",{
className:"text-value"},b.u)),D("div",{className:"onhover-button onhover-button-copy visible-copy",
title:await ae("Editor_Cmd_Copy_Flat"),onclick:()=>{(0,A.fI)((async()=>{await aV(b.u),
U.ShowNotification(await ae("PassCards_UserId"),null,null)})())}})))),e=!0)}e&&(0,u.l5)(au)}(a,b),(0,A.C)(aR)),
!e&&ah||(await async function(a,b){if(b){if(aK=!1,!a)return void(0,u.SE)(ay)}else ah||(aK=!a);if(!aK){const b=D("div",{
className:"login-field field-note field-note-row"},D("div",{className:"field-caption"},await ae("PassCards_Note")),aD=D("div",{
className:"field-value"},D("div",{className:"text"},D("span",{className:"text-value"},(0,t.cC)(a))),D("div",{
className:"inline-onhover-buttons-pane"},D("div",{className:"onhover-button onhover-button-copy",
title:await ae("Editor_Cmd_Copy_Flat"),onclick:j}))));return as.replaceChild(b,ay),void(ay=b)}let d,e,f,g,h;const i=D("div",{
className:"login-field field-note"},D("div",{className:"field-header"},D("div",{className:"field-caption"
},await ae("PassCards_Note")),d=D("div",{className:"field-buttons hidden"},f=D("div",{onclick:p,
className:"field-btn cancel-btn",tabIndex:-1}),e=D("div",{onclick:o,className:"field-btn save-btn",tabIndex:-1}))),h=D("div",{
className:"login-field field-with-title field-border"},g=D("textarea",{className:"input-field textarea",value:a,oninput:k,
onblur:a=>(0,A.fI)(n(a)),placeholder:await ae("Editor_Cmd_AddNote_Flat"),required:!0})));as.replaceChild(i,ay),ay=i,a&&(0,
A.C)(l);function j(){(0,A.fI)((async()=>{await aV(a),U.ShowNotification(await ae("Notification_Note_Copyied_Text"),null,null)
})())}function k(){(0,A.C)(l),m()}function l(){const a=g.cloneNode(!0);a.style.position="absolute",a.style.top="-1000px",
a.style.left="-1000px",a.style.height="auto",h.appendChild(a);const b=a.scrollHeight;h.removeChild(a),g.style.height=(0,s.Md)(b)
}function m(){a!==g.value?(0,u.l5)(d):(0,u.SE)(d)}async function n(b){if((0,y.hG)(a)===g.value)return;const d=b.relatedTarget
;if(d===e||d===f)return;const h=await ae("AdminCenter_NoteChangeConfirmation_Text");try{
await U.ShowConfirmationDialog(await ae("AdminCenter_SaveChanges_Text"),h,await ae("AdminCenter_ConfirmationDialog_DontSave"),await ae("AdminCenter_ConfirmationDialog_Save"))?o():p()
}catch(c){g.focus()}}function o(){const a=g.value.trim();if(!a)return void(0,u.SE)(d);const b=Object.assign({},ag);b.m_note=a,
(0,u.D$)((async()=>{try{await ai.PutDataItem(af.path,b,null),aO(af,b),await F.SetUsageInfo(af.path,0,4!==af.type,null),(0,
u.SE)(d),U.ShowNotification(await ae("Notification_Changes_Saved_Text"),null,null)}catch(a){}}),(()=>((0,u.aZ)(g),()=>{(0,
u.r9)(g)})),aj,(()=>((0,u.aZ)(g),()=>{(0,u.r9)(g)})))}function p(){g.value=a||"",(0,u.SE)(d),l()}
window.addEventListener("resize",(()=>{l()}))}(null!==(c=b.m_note)&&void 0!==c?c:"",null!==(d=a.readOnly)&&void 0!==d&&d),
await async function(a){var b,c;(0,u.rK)(ax);const d=(0,m.OG)(a);if(!d)return void(0,u.SE)(ax);const e=(0,
r.cr)(d),f=null!==(b=await S.GetLanguageTag(null))&&void 0!==b?b:"en",g=await ae("Passkey_Title")
;for(const h of null!==(c=null==e?void 0:e.p)&&void 0!==c?c:[null])if(h){const a=h.cr;ax.appendChild(D("div",{
className:"login-field passkey-field"},D("div",{className:"passkey-icon"},D("div",{className:"passkey-icon-content"})),D("div",{
className:"passkey-info"},D("div",{className:"passkey-title"},(null==h?void 0:h.n)||(null==h?void 0:h.d)||g),D("div",{
className:"passkey-text"},a?D("span",null,await ae("Passkey_CreatedAt",[(0,w.BL)(a,f)])):null))))}else ax.appendChild(D("div",{
className:"login-field passkey-field"},D("div",{className:"passkey-icon"},D("div",{className:"passkey-icon-content"})),D("div",{
className:"passkey-info"},D("div",{className:"passkey-title"},await ae("Passkey_Title")),D("div",{className:"passkey-text"
},await ae("Passkey_CannotDecode")))));(0,u.l5)(ax)}(b)),function(a,b){var c;if(!aC)return;if(1!==a.type)return void f()
;const d=(0,m.JG)(b);if(a.readOnly&&!d)return void f();const e=d?(0,i.Re)({localization:S,totpKey:d,
readonly:null!==(c=a.readOnly)&&void 0!==c&&c,editMode:!1},{GenerateTOTPCode:async a=>(0,v._b)(a),OnRemoveTOTPKey:()=>{},
OnCopyTOTPCode:a=>{(0,A.fI)((async()=>{await aV(a),U.ShowNotification(await ae("Login_OneTimeCode_Copied_Text"),null,null)})())
},OnCopyTOTPSetupKey:()=>{const a=(0,m.JG)(b);a&&(0,A.fI)((async()=>{await aV(a),
U.ShowNotification(await ae("Login_OneTimeCode_SetupKey_Copied_Text"),null,null)})())},OnReplaceTOTPKey:()=>null}):(0,
g._3)((async()=>(0,i.XC)(S,(()=>{(0,A.fI)((async()=>{await(0,i.N6)((0,o.pK)(ag.m_goto_url).toLowerCase(),S,(0,
z.TT)(al),W,(async(a,b)=>{const c=Object.assign({},ag);(0,m.O4)(a,c),await ai.PutDataItem(af.path,c,null),aO(af,c),
U.ShowNotification(await ae("Login_OneTimeCode_AuthKeyAdded_Notification",[(0,m.em)(af.path)]),null,null),b()}))})())}),(()=>{
(0,A.fI)(X.OpenUrl({url:h.K9,newTab:!0},null))}))));function f(){aC&&((0,u.SE)(aC),null==aL||aL.OnBeforeHide(),(0,u.rK)(aC),
null==aL||aL.Dispose(),aL=null)}(0,A.fI)((async()=>{f();const a=await e.Create((()=>{}),(()=>{}));aC.appendChild(a),
e.OnAfterShow(),(0,u.l5)(aC),aL=e})())}(a,b),(0,A.C)(aR),af=Object.assign({},a),ag=M(b),ah=!0}),(()=>(az.Enable(!1),()=>{
az.Enable(!0)})),0,null,(a=>()=>{}))}async function aP(a){const b=(0,x.fA)(a);if(""===b)return(0,u.SE)(aq),
void ao.classList.remove("folder-shown");const c=await ae("StartPage_HomeFolder")+b;aq.textContent=c,aq.title=c,
ao.classList.add("folder-shown"),(0,u.l5)(aq)}async function aQ(a,b,c,e,f){const g=H(e),h=await G(e,S),i=e.m_value||"";let j,l
;if(g){let b,f,g,q,r;j=D("div",{className:"secret-field"},D("div",{className:"login-field field-id-"+(0,z.bf)(a)},D("div",{
className:"field-caption"},h),l=D("div",{className:"field-value"},D("div",{className:"text"},b=D("span",{className:"text-value"
},(0,k.Ss)())),D("div",{className:"inline-onhover-buttons-pane password-pane-container"},f=D("div",{
className:"onhover-button onhover-button-show-secrete",title:await ae("StartPage_Login_ShowPasswordTip"),onclick:()=>{(0,
u.SE)(f),(0,u.l5)(g),(0,u.rK)(b),b.appendChild((0,t.cC)(i))}}),g=D("div",{
className:"onhover-button onhover-button-hide-secrete hidden",title:await ae("StartPage_Login_HidePasswordTip"),onclick:()=>{(0,
u.SE)(g),(0,u.l5)(f),b.textContent=(0,k.Ss)()}})),D("div",{className:"onhover-button onhover-button-copy visible-copy",
title:await ae("Editor_Cmd_Copy_Flat"),onclick:m})),q=D("div",{className:"security-score"},r=D("div",{
className:"security-password-strength"}),(async a=>aI(a)?[]:D("div",{className:"security-password-expand-handler"}))))),
r.classList.add("loading"),(0,A.fI)((async()=>{const a=await U.GetDataLoginPasswordStrength(i);if(null!==a){
const b=await U.GetTextByPasswordStrength(a),f=(0,d.jp)(a);r.classList.remove("loading"),r.textContent=b,r.classList.add(f),
j.classList.add(aI(null)?"compromised":f);const g=await ae("CL_Password_Strength");r.title=`${g}: ${b}`,
aI(null)&&aB&&(aB.remove(),aB=null,aH=!1);const h=(0,n.G)(c);function l(){aB&&(j.classList.add("strength-details-shown"),(0,
u.l5)(aB),aH||(0,k.wz)(aB,300,null),aH=!0)}function m(){aB&&(j.classList.remove("strength-details-shown"),aH?(0,
k.bV)(aB,300,(()=>{(0,u.SE)((0,z.TT)(aB))})):(0,u.SE)((0,z.TT)(aB)),aH=!1)}
aI(null)||null!==aB||h.password!==e.m_value||(j.classList.add("password-details-enabled"),(0,A.fI)((async()=>{var a
;const b=await Z.GetUpdatePasswordStrengthInfo(null!==(a=h.password)&&void 0!==a?a:"",null);aB=await async function(a){
const b=a.strength,c=a.complexity,d=a.complexity-a.strength,e=(0,p.AY)(b),f=D("span",{className:"link",onclick:()=>(0,
A.fI)(aS())},await ae("LoginIsCompromised_Notification_Login_Hint_Login")),g=D("span",{className:"domain"},(0,
o.pK)(ag.m_goto_url||"").toLowerCase());let h;h=e>3?D("div",{className:"password-strength-details strong"},D("div",{
className:"title"},D("div",{className:"text"},await ae("PassDetails_Strong_Title"))),D("div",{className:"description"
},0===d&&await ae("PassDetails_Strong_Description_Result_1"),d>0&&d<50&&await ae("PassDetails_Strong_Description_Result_3"),d>=50&&await ae("PassDetails_Strong_Description_Result_3")," ",(0,
k.R1)(await ae("PassDetails_Strong_Description_Action"),[f,g])),await j(),await i()):e>2?D("div",{
className:"password-strength-details good"},D("div",{className:"title"},D("div",{className:"text"
},await ae("PassDetails_Good_Title"))),D("div",{className:"description"
},0===d&&await ae("PassDetails_Good_Description_Result_1"),d>0&&d<50&&await ae("PassDetails_Good_Description_Result_3_2"),d>=50&&await ae("PassDetails_Good_Description_Result_3_2")," ",(0,
k.R1)(await ae("PassDetails_Description_Action"),[f,g])),await j(),await i()):e>1?D("div",{
className:"password-strength-details medium"},D("div",{className:"title"},D("div",{className:"text"
},await ae("PassDetails_Medium_Title"))),D("div",{className:"description"
},0===d&&await ae("PassDetails_Description_Result_1"),d>0&&d<50&&await ae("PassDetails_Description_Result_3"),d>=50&&await ae("PassDetails_Description_Result_3")," ",(0,
k.R1)(await ae("PassDetails_Description_Action"),[f,g])),await j(),await i()):D("div",{
className:"password-strength-details weak"},D("div",{className:"title"},D("div",{className:"icon"}),D("div",{className:"text"
},await ae("PassDetails_Weak_Title"))),D("div",{className:"description"
},0===d&&await ae("PassDetails_Description_Result_1"),d>0&&d<50&&await ae("PassDetails_Description_Result_3"),d>=50&&await ae("PassDetails_Description_Result_3")," ",(0,
k.R1)(await ae("PassDetails_Description_Action"),[f,g])),await j(),await i());return h;async function i(){return D("div",{
className:"total-score"},D("div",{className:"text"},await ae("PassDetails_TotalScore")),D("div",{className:"bar"},D("div",{
className:"slider",style:{width:(0,z.bf)(b)+"%"}})),D("div",{className:"value"},(0,z.bf)(b)+"/100"))}async function j(){
let a,b,e,f,g,i;const j=D("div",{className:"factors"+(0===d?" zero-uniqueness":"")},D("div",{className:"title"},D("div",{
className:"text"},await ae("PassDetails_Factors")),g=D("div",{className:"tip hidden"},D("span",{className:"bold"
},await ae("PassDetails_Uniqueness3")+":")," ",await ae("PassDetails_Uniqueness_Description"),D("br",null),D("br",null),D("span",{
className:"bold"},await ae("PassDetails_Complexity")+":")," ",await ae("PassDetails_Complexity_Description")),i=D("div",{
className:"icon"})),D("div",{className:"chart"},D("div",{className:"headers"},D("div",{className:"header"
},await ae("PassDetails_Uniqueness3")),D("div",{className:"header"},await ae("PassDetails_Complexity"))),D("div",{
className:"scale"},D("div",{className:"min-value"},"-100"),D("div",{className:"axis-uniqueness"},a=D("div",{
className:"slider-uniqueness"}),e=D("div",{className:"value value-uniqueness"},"-"+(0,z.bf)(d))),D("div",{
className:"value value-zero"},"0"),D("div",{className:"axis-complexity"},b=D("div",{className:"slider-complexity"}),f=D("div",{
className:"value value-complexity"},(0,z.bf)(c))),D("div",{className:"max-value"},"100"))))
;return i.addEventListener("mouseenter",(()=>{(0,u.l5)(g),h.style.overflow="visible",
au.children.length<=3&&(au.style.overflow="visible")})),i.addEventListener("mouseleave",(()=>{(0,u.SE)(g),h.style.overflow="",
au.style.overflow=""})),a.style.width=(0,z.bf)(d)+"%",b.style.width=(0,z.bf)(c)+"%",0===d?((0,u.SE)(a),(0,
u.SE)(e)):d<=13?e.style.right="16px":d>=92?e.style.left="0":e.style.right=`calc(${(0,z.bf)(d)}% - 7px`,0===c?((0,u.SE)(b),(0,
u.SE)(f)):c<=15?f.style.left="18px":c>=95?f.style.right="0":f.style.left=`calc(${(0,z.bf)(c)}% - 7px`,j}}(b),j.appendChild(aB),
q.addEventListener("click",(()=>{aH?m():l()})),aH?l():m()})()))}})())}else j=D("div",{className:"login-field field-id-"+(0,
z.bf)(a)},D("div",{className:"field-caption"},h),l=D("div",{className:"field-value"},D("div",{className:"text"},D("span",{
className:"text-value"},(0,t.cC)(i))),f.userIdField?D("div",{className:"onhover-button onhover-button-copy visible-copy",
title:await ae("Editor_Cmd_Copy_Flat"),onclick:m}):D("div",{className:"inline-onhover-buttons-pane"},D("div",{
className:"onhover-button onhover-button-copy",title:await ae("Editor_Cmd_Copy_Flat"),onclick:m}))));return g?(aA&&aw.push(aA),
aA=l):aw.push(l),j;function m(){(0,A.fI)((async()=>{await U.CopyTextToClipboardWithAutoClear(i,null),
U.ShowNotification(await ae("StartPage_Editor_CopiedToClipboard",[h]),null,null)})())}}function aR(){let a=0
;aA?a=aA.offsetWidth||0:aw.forEach((b=>{a=Math.max(b.offsetWidth||a)}));const b=(0,s.Md)(a);av&&(av.style.minWidth=b),
aD&&(aD.style.minWidth=b),aw.forEach((a=>{a.style.minWidth=b}))}async function aS(){if(!(!!ag.m_goto_url&&!(0,
o.HB)(ag.m_goto_url)))return;const a=ag.m_goto_url
;a&&(0,s.oK)(a)?U.ShowNotification(await ae("CannotOpenUrlForSecurityReasons"),5,2):a&&await Y.GoFillSubmit({navigate:!0,
path:af.path,submit:!0,newTab:!0},null)}function aT(a){aG&&a.stopPropagation()}function aU(){aG?aE&&(aE.Hide(),
aE=null):function(){aG=!0;const a=null==ar?void 0:ar.getBoundingClientRect(),b=new DOMRect(a.left+20,a.bottom-10,0,0)
;async function c(){return await U.GetLoginCommands(af,aW)}function d(){const a=(0,f.NI)(ar);return a.onHide=g,a.onShow=e,a}
function e(){aG=!0}function g(){aG=!1}aE=(0,f.Lj)(b,(()=>c()),d(),(function(){return ar.getBoundingClientRect()}),((a,b)=>(0,
A.fI)(a(b,(0,A.f4)(null,null,null)))))}()}async function aV(a){await W.WriteText(a)}function aW(){(0,u.SE)(ao),az.SetValue((0,
m.em)(af.path)),az.Show(),aF=!0}function aX(){az.Hide(),(0,u.l5)(ao),aF=!1}function aY(){
const a=az.GetValue().trim().toLowerCase(),b=(0,x.HE)((0,x._p)(af.path));(0,z.RA)(a,b)?aX():(0,A.fI)((async()=>{
const a=await ae("AdminCenter_LoginRenameConfirmation_Text")
;await U.ShowConfirmationDialog(await ae("AdminCenter_SaveChanges_Text"),a,await ae("AdminCenter_ConfirmationDialog_DontSave"),await ae("AdminCenter_ConfirmationDialog_Save"))?aZ():aX()
})())}function aZ(){(0,u.PQ)((async()=>{const a=az.GetValue().trim(),b=(0,m.KF)(a,null)
;if(!b)return await U.ShowErrorDialog(await ae("NameInvalidCharacter_Error2")),void az.Focus()
;if(b.length>ak)return await U.ShowErrorDialog(await ae("WrongNameLenght_Error",[(0,z.bf)(ak)])),void az.Focus()
;const c=af.path,d=(0,m.kd)(af.type),e=(0,x.fA)(c)+"/"+b+d;if((0,z.RA)(c,e))aF&&aX();else{let c=null;try{
c=await ai.GetInfo(e,1,null)}catch(f){if(!(0,C.r5)(f,C.Y$))return void(0,C.au)(f)}if(c){
const b=await ae("AlreadyExists_Error2",["Item",a]);return await U.ShowErrorDialog(await ae("Cmd_Rename_Error",["Item",a,b])),
void az.Focus()}{const a=(0,m.em)(af.path);await ai.MoveFile(af.path,e,null),aF&&aX();aO(await ai.GetInfo(e,63,null),ag)
;const c=await ae("Notification_Item_Renamed_Text",[a,b]);U.ShowNotification(c,null,null)}}}),(()=>(az.Enable(!1),()=>{
az.Enable(!0)})),0,null,(a=>{(0,A.fI)((async()=>{(0,C.r5)(a,C.kd)||await U.ShowErrorDialog((0,h.Qo)(a))})())}))}function a0(a){
for(const b of a)switch(b.event){case 8:if(8===b.type&&b.path&&(0,m.QC)(b.path,af.path)&&b.to&&b.to.path){
const a=af.path.replace(b.path,b.to.path);af=Object.assign(Object.assign({},af),{path:a}),(0,A.fI)(aP(af.path))}
if(1===b.type&&b.path===af.path&&b.to&&b.to.path){af=Object.assign(Object.assign({},af),{path:b.to.path});const a=(0,
m.em)(b.to.path);ap.textContent=a,ap.title=a,az.SetValue(a),(0,A.fI)(aP(af.path))}break;case 12:(0,A.fI)((async()=>{
const a=await ac.GetInfo(af.path,63,null);a.favorite!==af.favorite&&(af=Object.assign(Object.assign({},af),{favorite:a.favorite
}))})())}}}function F(a,b,c,k,l,p,y,E,F,H,J){const K=c,N=y,O=k,P=l,Q=H,R=F.LocalizeString
;let S=Object.assign({},a),T=M(b),U=M(b),V=!1,W=!1;const X=300,Y=300,Z=251
;let aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an=null,ao=null,ap=null,aq=!0;const ar=(0,A.tG)();let as;as=E?(0,j.zd)({
imageSize:"imgLogo",rfDataItemImages:O,OnSetImage:(a,b)=>(0,j.rd)(a,ab,ac,b),OnResetImage:()=>{(0,j._K)(ab,ac)}}):(0,j.zd)({
imageSize:"img32",imageSizeForBackground:"imgLogo",rfDataItemImages:O,OnSetImage:(a,b)=>{const c={};return c.imgLogo={
url:b.img32.url,background:b.img32.background,size:b.img32.size},(0,j.rd)("imgLogo",ab,ac,c)},OnResetImage:()=>{(0,j._K)(ab,ac)}
});const at={Create:async function(a,b){return aa=D("div",{className:"editor-view editor-inline editor-login edit-mode"
},D("div",{className:"editor-content"},ab=E?D("div",{className:"content-header seperate-tab"},D("div",{
className:"header-container tab-view"},ac=D("div",{className:"header-image"}),D("div",{className:"header-title-pane"},D("div",{
className:"header-title"},ad=D("div",{className:"title-name",onclick:aA})),aj=(0,t.nM)("hidden",aC,aB,aD)))):D("div",{
className:"content-header"},D("div",{className:"header-title-pane"},ac=D("div",{className:"header-image"}),D("div",{
className:"header-title"},ad=D("span",{className:"title-name",onclick:aA})),aj=(0,t.nM)("hidden",aC,aB,aD)),ae=D("div",{
className:"editor-cmdbar cmdbar-main"},D("div",{className:"editor-cmd editor-cmd-close",title:await R("Cmd_Close_Flat"),
onclick:function(){(0,A.fI)((async()=>{if(aN()){
const a=await R("StartPage_Editor_CloseChangesConfirm",[await R("RoboformType_Login")])
;await J.ShowConfirmationDialog(await R("AdminCenter_SaveChanges_Text"),a,await R("AdminCenter_ConfirmationDialog_DontSave"),await R("AdminCenter_ConfirmationDialog_Save"))&&ay(!1)
}b((0,C.JS)())})())}}))),E?D("div",{className:"buttons-bar"},D("div",{className:"buttons-container"},D("div",{
className:"button",onclick:c},await R("Cmd_Cancel_Flat")),af=D("div",{className:"button default-button disabled",
onclick:()=>ay(!0)},await R("Cmd_ApplyChanges_Flat")))):D("div",{className:"buttons-bar"},D("div",{className:"button",onclick:c
},await R("Cmd_Cancel_Flat")),af=D("div",{className:"button default-button disabled",onclick:()=>ay(!0)
},await R("Cmd_ApplyChanges_Flat"))),ai=D("div",{className:"loading-progress hidden"}),ag=D("div",{
className:"fields-list "+(E?"tab-view":"")},ah=D("div",{className:"error-text"})))),(0,A.C)((()=>au(S,T,!1))),aa;function c(){
(0,u.D$)((async()=>{if(aN()){const a=await R("StartPage_Editor_CloseChangesConfirm",[await R("RoboformType_Login")])
;if(await J.ShowConfirmationDialog(await R("AdminCenter_SaveChanges_Text"),a,await R("AdminCenter_ConfirmationDialog_DontSave"),await R("AdminCenter_ConfirmationDialog_Save")))return void ay(!0)
}K&&b((0,C.JS)());const a=(0,A.f4)(null,null,null),c=await P.GetDataItem(S.path,4,null,a)
;await J.ShowDataViewModeInDetailsPane(S,c,!1,a)}),(()=>()=>{}),0,null)}},OnAfterShow:function(){P.onDataChanged.Add(aT),
document.addEventListener("keydown",av),window.addEventListener("beforeunload",aw)},OnBeforeHide:function(){},Focus:function(){
null==ak||ak.Focus()},Dispose:function(){ar.Cancel(),P.onDataChanged.Remove(aT),document.removeEventListener("keydown",av),
window.removeEventListener("beforeunload",aw)}};return at;function au(a,b,c){if(V&&!c)return;const d=(0,m.em)(a.path)
;ad.textContent=d,ad.title=d,(0,A.fI)(as.UpdateBySiteUrl((0,q.g4)(b.m_goto_url,b.m_match_url))),(0,A.fI)(ax(b)),
S=Object.assign({},a),T=M(b),U=M(b),V=!0}function av(a){a.ctrlKey&&"KeyS"===a.code&&(a.preventDefault(),a.stopPropagation(),
ay(!1))}function aw(a){if(aN()){const b="RoboForm file was changed. Do you want to save changes?"
;return(a||window.event).returnValue=b,b}}async function ax(a){var b,c,d,j;(0,u.rK)(ag),ak=(0,t.ap)({
className:"editor-field field-gotourl",title:await R("AdminCenter_GoToUrl_Text"),value:null!==(b=a.m_goto_url)&&void 0!==b?b:"",
oninput:aF,onblur:()=>function(){const a=aE(ak.GetValue().trim());ak.SetValue(a),U=Object.assign(Object.assign({},U),{
m_goto_url:a})}()}),ag.appendChild(ak),al=(0,t.ap)({className:"editor-field field-matchurl",
title:await R("AdminCenter_MatchUrl_Text"),value:null!==(c=a.m_match_url)&&void 0!==c?c:"",oninput:aG,onblur:()=>function(){
const a=aE(al.GetValue().trim());al.SetValue(a),U=Object.assign(Object.assign({},U),{m_match_url:a})}()}),ag.appendChild(al)
;let k=null;const l=a.m_fields;for(let p=0;p<l.length;p++){const q=p,x=l[p],y=x.m_type;if(3===y||4===y||5===y)continue
;const E=I(S.type,x);if(E.serviceField)continue
;const H=null!==(d=x.m_value)&&void 0!==d?d:"",K=await G(x,F),O=x.m_order_index?`${K}[${(0,z.TT)(x.m_order_index)}]`:K;let V
;if(E.passwordField){let af,ah;const ai=D("div",{className:"inline-onhover-buttons-pane"},af=D("div",{
className:"onhover-button onhover-button-show-secrete",title:await R("StartPage_Login_ShowPasswordTip"),onclick:()=>{(0,
u.SE)(af),(0,u.l5)(ah),V.SetInputType("text")}}),ah=D("div",{className:"onhover-button onhover-button-hide-secrete hidden",
title:await R("StartPage_Login_HidePasswordTip"),onclick:()=>{(0,u.SE)(ah),(0,u.l5)(af),V.SetInputType("password")}}));V=(0,
t.ap)({className:`editor-field secret-field field-${q}`,title:O,value:H,inputType:"password",onhoverButtonsPane:ai,
oninput:()=>aI(q,V)})}else V=E.infoField||E.userIdField?(0,t.ap)({className:`editor-field field-${q}`,title:O,value:H,
oninput:()=>aI(q,V)}):(0,t.fs)({className:`editor-field field-${q}`,title:O,value:H,oninput:()=>aI(q,V),resizable_heigth:!0,
onresize:a=>{const b=window.getComputedStyle(a),c=parseInt(b.minHeight)||0;if(a.scrollHeight>c&&(a.style.height=(0,s.Md)(c),
a.scrollHeight>a.clientHeight)){a.style.height="auto";const b=Math.min(a.scrollHeight+2,X);a.style.height=(0,s.Md)(b)}}})
;let W,Y=!1;const Z=D("div",{className:"field-with-actions"},V,W=D("div",{className:"cmdbutton cmd-actions",onmousedown:ab,
onclick:ac}));function ab(a){Y&&a.stopPropagation()}function ac(){Y?ae():ad()}function ad(){Y=!0
;const a=null==W?void 0:W.getBoundingClientRect(),b=new DOMRect(a.left-10,a.top,0,0);function c(){Y=!0}function d(){Y=!1}k=(0,
f.Lj)(b,(()=>async function(){const a=[];E.loginTipField||E.scriptField||E.passwordField||E.userIdField||a.push({
title:await R("Cmd_Rename_Flat"),imageClass:"admin-center-view cmd-rename-icon",onCommand:async(a,b)=>{await aK(q,K)}})
;return a.push({title:await R("Cmd_Delete_Flat"),imageClass:"admin-center-view cmd-delete-icon",onCommand:async(a,b)=>{
await aL(q)}}),a}()),function(){const a=(0,f.NI)(W);return a.onHide=d,a.onShow=c,a}(),(function(){
return W.getBoundingClientRect()}),((a,b)=>(0,A.fI)(a(b,(0,A.f4)(null,null,null)))))}function ae(){k&&(k.Hide(),k=null)}
ag.appendChild(Z),"Resize"in V&&V.Resize()}if(1===S.type){const aj=D("div",{className:"editor-field add-field-section"
},D("div",{className:"title",onclick:()=>(0,A.fI)(async function(){const a=await async function(){let a,b,c;const d=(0,
n.G)(U),[f,h]=(0,
B.Uw)(d.login?d.password?1:0:3),i=new Map([[1,await R("PassCards_Custom")],[3,await R("PassCards_UserId")],[0,await R("PassCards_Password")],[2,await R("PassCards_Script")]])
;U.m_fields.some((a=>a.m_name===m.jJ))&&i.set(4,await R("PassCards_LoginTip_Title"));const[j,k]=(0,B.Uw)(!0);return(0,e.Sw)((0,
z.TT)(aa),(0,e.p)((0,e.dK)("dialog-modal add-field-dialog",await R("PassCards_Cmd_AddField_Key"),null),(()=>(0,
g._3)((async(d,e)=>{return D("div",{className:"content"},(0,t.l6)(f(null),!0,i,(a=>{k(!0),h(a)}),{
upperTitle:await R("PassCards_AddField_Prompt"),ariaLabel:await R("PassCards_AddField_Prompt"),seamlessDropdown:!0
}),(a=>2===f(a)?D("a",{className:"link",target:"_blank",
href:"https://help.roboform.com/hc/articles/360003796591-How-to-create-a-custom-script"
},R("AdminCenter_LearnMore_Text")):[]),(d=>{const e=f(d);return(0,A.C)((()=>p(e))),[a=(0,t.ap)({
title:R("PassCards_Cmd_AddField_Prompt"),value:o(e),className:1!==e?"hidden":void 0,oninput:()=>l(e)}),b=(0,t.ap)({
title:R("PassCards_AddField_FieldValue_Title"),className:2===e?"hidden":void 0,inputType:0===e?"password":"text",
oninput:()=>l(e)}),c=(0,t.fs)({className:2!==e?"hidden":void 0,title:R("PassCards_AddField_FieldValue_Title"),oninput:()=>l(e)
})]}),D("div",{className:"buttons-bar"},D("button",{className:"button",onclick:()=>e((0,C.JS)())
},await R("Cmd_Cancel_Flat")),(a=>{const b=j(a);return D("button",{
className:b?"button default-button disabled":"button default-button",onclick:b?null:g},R("PassCards_Cmd_Add_Button"))})))
;function g(){const e=a.GetValue().trim(),g=f(null);d({m_name:e,m_type:0===g?2:1,m_value:2===g?c.GetValue():b.GetValue(),
m_order_index:0})}function l(d){switch(d){case 0:case 3:case 4:k(""===b.GetValue().trim(),n);break;case 2:
k(""===c.GetValue().trim(),n);break;case 1:k(""===a.GetValue().trim()||""===b.GetValue().trim(),n)}}function n(a,b){return a===b
}function o(a){switch(a){case 0:return m.Aq;case 2:return m._6;case 3:return m.Df;case 4:return m.jJ;case 1:return""}}
function p(d){switch(d){case 3:case 0:case 4:b.Focus();break;case 2:c.Focus();break;case 1:a.Focus()}}}))))).Execute(null)}()
;let b;for(const c of U.m_fields)a.m_name===c.m_name&&(b=c);b&&void 0!==b.m_order_index&&(a.m_order_index=b.m_order_index+1)
;U.m_fields.push({m_type:a.m_type,m_name:a.m_name,m_value:a.m_value,m_order_index:a.m_order_index}),await ax(U),aM()}())
},D("div",{className:"image-plus"}),D("div",{className:"text"},await R("PassCards_Cmd_AddField_Title"))));ag.appendChild(aj)}
1===S.type&&(an=D("div",{className:"passkey-fields hidden"}),ag.appendChild((0,z.TT)(an)),(0,A.fI)(async function(a){var b,c
;if(!an)return;(0,u.rK)(an);const d=(0,m.OG)(a);if(!d)return void(0,u.SE)(an);const e=(0,r.cr)(d);let g=e?[...e.p]:[]
;const h=null!==(b=await F.GetLanguageTag(null))&&void 0!==b?b:"en",i=await R("Passkey_Title");let j=null
;for(const k of null!==(c=null==e?void 0:e.p)&&void 0!==c?c:[null]){if(!k){an.appendChild(D("div",{
className:"login-field passkey-field"},D("div",{className:"passkey-icon"},D("div",{className:"passkey-icon-content"})),D("div",{
className:"passkey-info"},D("div",{className:"passkey-title"},await R("Passkey_Title")),D("div",{className:"passkey-text"
},await R("Passkey_CannotDecode")))));continue}let l,n,o=!1;const p=k.cr;function q(){if(!k)return;const b=l.GetValue().trim()
;if(g=g.map((a=>a.c===k.c?Object.assign(Object.assign({},a),{n:b}):a)),!g||!e)return;const c=Object.assign(Object.assign({},e),{
p:g}),d=(0,r.uM)(c);(0,m.E5)(d,a),aM()}async function s(){if(!k)return;const a=k.u||"",b=k.c,c=(0,
m.em)(S.path),d=await R("CL_Confirmation"),e=await R("Passkey_Remove_Confirmation_Text",[c,a])
;if(await J.ShowConfirmationDialog(d,e,await R("Options_No"),await R("Options_Yes"))){(0,m.kF)(T,b),(0,m.kF)(U,b);try{
await P.PutDataItem(S.path,U,null),J.ShowNotification(await R("Passkey_Removed_Notification",[c]),null,null),await az()
}catch(f){}}}function v(a){o&&a.stopPropagation()}function x(){o?z():y()}function y(){o=!0
;const a=null==n?void 0:n.getBoundingClientRect(),b=new DOMRect(a.left-10,a.top,0,0);async function c(){const a=[]
;return a.push({title:await R("Cmd_Delete_Flat"),imageClass:"admin-center-view cmd-delete-icon",onCommand:async(a,b)=>{(0,
A.fI)(s())}}),a}function d(){const a=(0,f.NI)(n);return a.onHide=g,a.onShow=e,a}function e(){o=!0}function g(){o=!1}j=(0,
f.Lj)(b,(()=>c()),d(),(function(){return n.getBoundingClientRect()}),((a,b)=>(0,A.fI)(a(b,(0,A.f4)(null,null,null)))))}
function z(){j&&(j.Hide(),j=null)}an.appendChild(D("div",{className:"login-field passkey-field"},D("div",{
className:"passkey-icon"},D("div",{className:"passkey-icon-content"})),D("div",{className:"passkey-info"},l=(0,t.ap)({
className:"",title:i,value:(null==k?void 0:k.n)||"",oninput:q}),D("div",{className:"passkey-text"
},p?D("span",null,await R("Passkey_CreatedAt",[(0,w.BL)(p,h)])):null)),n=D("div",{className:"cmdbutton cmd-actions",
onmousedown:v,onclick:x})))}return void(0,u.l5)(an)}(U))),L()&&1===S.type&&(ao=D("div",{
className:"editor-field field-totp-key hidden"}),ag.appendChild(ao),function(a,b){var c;if(!ao)return
;if(1!==a.type)return void f();const d=(0,m.JG)(b);if(a.readOnly&&!d)return void f();const e=d?(0,i.Re)({localization:F,
totpKey:d,readonly:null!==(c=a.readOnly)&&void 0!==c&&c,editMode:!0},{GenerateTOTPCode:async a=>(0,v._b)(a),
OnRemoveTOTPKey:()=>{(0,A.fI)((async()=>{
const a=(0,m.em)(S.path),b=(0,o.pK)(T.m_goto_url||"").toLowerCase(),c=await R("CL_Confirmation"),d=D("div",{
className:"confirmation-text"
},await R("Login_OneTimeCode_RemoveAuthKey_Confirmation_Title",[a]),D("ul",null,D("li",null,await R("Login_OneTimeCode_RemoveAuthKey_Confirmation_Item1",[b])),D("li",null,await R("Login_OneTimeCode_RemoveAuthKey_Confirmation_Item2",[b])),D("li",null,await R("Login_OneTimeCode_RemoveAuthKey_Confirmation_Item3",[a]))),await R("Login_OneTimeCode_RemoveAuthKey_Confirmation_Question",[a]))
;if(await J.ShowConfirmationDialog(c,d,await R("Options_No"),await R("Options_Yes"))){const b=!aN(),c=Object.assign({},U);(0,
m.Qt)(c),
await P.PutDataItem(S.path,c,null),au(S,c,!0),aM(),J.ShowNotification(await R("Login_OneTimeCode_AuthKeyRemoved_Notification",[a]),null,null),
b&&(0,A.fI)(az())}})())},OnCopyTOTPCode:a=>{(0,A.fI)((async()=>{
await aJ(a),J.ShowNotification(await R("Login_OneTimeCode_Copied_Text"),null,null)})())},OnCopyTOTPSetupKey:()=>{const a=(0,
m.JG)(b);a&&(0,A.fI)((async()=>{await aJ(a),J.ShowNotification(await R("Login_OneTimeCode_SetupKey_Copied_Text"),null,null)})())
},OnReplaceTOTPKey:()=>{(0,A.fI)((async()=>{const a=(0,m.JG)(U);if(!a)return;const b=await(0,i.k_)(S,T,Q,(0,z.TT)(aa),F)
;if(!b)return;const c=await F.GetLanguageTag(null)||"en",d=await R("SaveDlg_Note_TOTPKeyChanged_Text",[(0,w.Sy)((0,
w.t2)(),c),a]);T=Object.assign(Object.assign({},T),{m_note:T.m_note?T.m_note+"\n"+d:d}),U=Object.assign(Object.assign({},U),{
m_note:U.m_note?U.m_note+"\n"+d:d}),(0,m.O4)(b,T),(0,m.O4)(b,U),await P.PutDataItem(S.path,T,null),au(S,U,!0),
J.ShowNotification(await R("Login_OneTimeCode_ReplacedAuthKey_Notification"),null,null)})())}}):(0,g._3)((async()=>(0,
i.XC)(F,(()=>{(0,A.fI)((async()=>{await(0,i.N6)((0,o.pK)(T.m_goto_url).toLowerCase(),F,(0,z.TT)(aa),Q,(async(a,b)=>{const c=M(T)
;(0,
m.O4)(a,c),await P.PutDataItem(S.path,c,null),au(S,c,!1),J.ShowNotification(await R("Login_OneTimeCode_AuthKeyAdded_Notification",[(0,
m.em)(S.path)]),null,null),(0,A.fI)(az()),b()}))})())}),(()=>{(0,A.fI)(N.OpenUrl({url:h.K9,newTab:!0},null))}))));function f(){
ao&&((0,u.SE)(ao),null==ap||ap.OnBeforeHide(),(0,u.rK)(ao),null==ap||ap.Dispose(),ap=null)}(0,A.fI)((async()=>{f()
;const a=await e.Create((()=>{}),(()=>{}));ao.appendChild(a),e.OnAfterShow(),(0,u.l5)(ao),ap=e})())}(S,a)),am=(0,t.fs)({
className:"editor-field field-note",title:await R("AdminCenter_Note_Text"),value:null!==(j=a.m_note)&&void 0!==j?j:"",
oninput:aH,resizable_heigth:!0,max_height:X}),ag.appendChild(am),(0,A.fI)((async()=>{await(0,A.Gu)(100,null),am.Resize()})())}
function ay(a){if(aq)return;((0,m.fb)(U)?(0,o.dy)(U.m_goto_url):function(){const a=ak.GetValue()||"",b=(0,x.OZ)(a,!0)||""
;a!==b&&ak.SetValue(b);return b}())?(0,u.D$)((async()=>{try{await P.PutDataItem(S.path,U,null),
await p.SetUsageInfo(S.path,0,4!==S.type,null),J.ShowNotification(await R("Notification_Changes_Saved_Text"),null,null),
a?await az():T=M(U)}catch(b){}}),aP,Y,aR):(0,A.fI)(async function(a){(0,d.eX)(ah,await a),ak.SetErrorState(),ak.Focus()
}(R("NameInvalidCharacter_Error2")))}async function az(){
const a=(0,A.f4)(null,null,null),b=await P.GetInfo(S.path,63,null),c=await P.GetDataItem(S.path,4,null,null)
;await J.ShowDataViewModeInDetailsPane(b,c,!1,a)}function aA(){ab.classList.add("inplace-rename"),(0,u.SE)(ad),E||(0,u.SE)(ae),
aj.SetValue((0,m.em)(S.path)),aj.Show(),W=!0}function aB(){ab.classList.remove("inplace-rename"),aj.Hide(),(0,u.l5)(ad),E||(0,
u.l5)(ae),W=!1}function aC(){(0,u.PQ)((async()=>{const a=aj.GetValue().trim(),b=(0,m.KF)(a,null)
;if(!b)return await J.ShowErrorDialog(await R("NameInvalidCharacter_Error2")),void aj.Focus()
;if(b.length>Z)return await J.ShowErrorDialog(await R("WrongNameLenght_Error",[(0,z.bf)(Z)])),void aj.Focus()
;const c=S.path,d=(0,m.kd)(S.type),e=(0,x.fA)(c)+"/"+b+d;if((0,z.RA)(c,e))W&&aB();else{let c=null;try{
c=await P.GetInfo(e,1,null)}catch(f){if(!(0,C.r5)(f,C.Y$))return void(0,C.au)(f)}if(c){
const b=await R("AlreadyExists_Error2",["Item",a]);return await J.ShowErrorDialog(await R("Cmd_Rename_Error",["Item",a,b])),
void aj.Focus()}{const a=(0,m.em)(S.path);await P.MoveFile(S.path,e,null),W&&aB();au(await P.GetInfo(e,63,null),T,!0)
;const c=await R("Notification_Item_Renamed_Text",[a,b]);J.ShowNotification(c,null,null)}}}),(()=>(aj.Enable(!1),()=>{
aj.Enable(!0)})),0,null,(a=>{(0,A.fI)((async()=>{(0,C.r5)(a,C.kd)||await J.ShowErrorDialog((0,h.Qo)(a))})())}))}function aD(){
const a=aj.GetValue().trim().toLowerCase(),b=(0,x.HE)((0,x._p)(S.path));(0,z.RA)(a,b)?aB():(0,A.fI)((async()=>{
const a=await R("AdminCenter_LoginRenameConfirmation_Text")
;await J.ShowConfirmationDialog(await R("AdminCenter_SaveChanges_Text"),a,await R("AdminCenter_ConfirmationDialog_DontSave"),await R("AdminCenter_ConfirmationDialog_Save"))?aC():aB()
})())}function aE(a){const b=(0,o.dy)(a);if(!a||!b||!b.m_schema||b.m_schema.length<3){const b="https://"+a;return(0,
o.dy)(b)?b:"https://"}return a}function aF(){aO(),U=Object.assign(Object.assign({},U),{m_goto_url:ak.GetValue().trim()}),aM()}
function aG(){aO(),U=Object.assign(Object.assign({},U),{m_match_url:al.GetValue().trim()}),aM()}function aH(){
U=Object.assign(Object.assign({},U),{m_note:am.GetValue().trim()}),aM()}function aI(a,b){const c=b.GetValue().trim()
;U.m_fields[a].m_value=c,aM()}async function aJ(a){await Q.WriteText(a)}async function aK(a,b){const c=await async function(a){
let b
;const c=(0,e.Sw)((0,z.TT)(aa),(0,e.p)((0,e.dK)("dialog-modal rename-field-dialog",await R("PassCards_Cmd_RenameField_Title"),null),(()=>({
Create:async(c,d)=>{return D("div",{className:"content"},b=(0,t.ap)({title:await R("PassCards_Cmd_AddField_Prompt"),value:a
}),D("div",{className:"buttons-bar"},D("div",{className:"button",onclick:()=>d((0,C.JS)())
},await R("Cmd_Cancel_Flat")),D("div",{className:"button default-button",onclick:()=>e()},await R("Cmd_Ok_Flat"))))
;function e(){const a=b.GetValue().trim();c(a)}},OnAfterShow:()=>{null==b||b.Focus()},OnBeforeHide:()=>{},Focus:()=>{},
Dispose:()=>{}}))));return c.Execute(null)}(b),d=U.m_fields[a];d&&(d.m_name=c,d.m_caption&&(d.m_caption=c)),await ax(U),aM()}
async function aL(a){
const b=await G(U.m_fields[a],F),c=await R("CL_Confirmation"),d=await R("PassCards_Cmd_DeleteField_Confirm",[b])
;await J.ShowConfirmationDialog(c,d,await R("Options_No"),await R("Options_Yes"))&&(U.m_fields.splice(a,1),await ax(U),aM())}
function aM(){aN()?((0,u.r9)(af),aq=!1):((0,u.aZ)(af),aq=!0)}function aN(){if((0,u.o3)(T.m_goto_url,U.m_goto_url))return!0
;if((0,u.o3)(T.m_match_url,U.m_match_url))return!0;if((0,u.o3)(T.m_note,U.m_note))return!0;const a=T.m_fields,b=U.m_fields
;if(a.length!==b.length)return!0;for(const[c,d]of b.entries()){const b=d.m_value;if(void 0===b)continue;const e=a[(0,z.fB)(c)]
;if(void 0===e)return!0;const f=e.m_value;if((0,u.o3)(f,b))return!0;if((0,u.o3)(e.m_name,d.m_name))return!0}return!1}
function aO(){(0,d.eX)(ah,""),ak.RemoveErrorState()}function aP(){return(0,u.aZ)(ak),(0,u.aZ)(am),(0,u.aZ)(af),aq=!0,aQ}
function aQ(){(0,u.r9)(ak),(0,u.r9)(am),aM()}function aR(){return(0,u.l5)(ai),(0,u.aZ)(ak),(0,u.aZ)(am),(0,u.aZ)(af),aq=!0,aS}
function aS(){(0,u.SE)(ai),(0,u.r9)(ak),(0,u.r9)(am),(0,u.r9)(af),aq=!1}function aT(a){
for(const b of a)if(8===b.event)if(8===b.type&&b.path&&(0,
m.QC)(b.path,S.path)&&b.to&&b.to.path&&(S.path=S.path.replace(b.path,b.to.path)),1===b.type&&b.path===S.path&&b.to&&b.to.path){
S.path=b.to.path;const a=(0,m.em)(b.to.path);ad.textContent=a,ad.title=a,aj.SetValue(a)}}}function G(a,b){
const c=b.LocalizeString,d=a.m_name||"";switch(d){case m.Df:return c("PassCards_UserId");case m.Aq:
return c("PassCards_Password");case m.zY:return c("PassCards_Note");case m.jJ:return c("PassCards_LoginTip_Title");case m.Pf:
return c("PassCards_Prompt");case m._6:return c("PassCards_Script")}let e=(a.m_caption||"").trim();if(!e&&(e=d,
e.length>4&&e.search(K)>=0&&(e=e.split("$").pop()||e),e.length>J)){let a
;for(a=e.length-1;a>=0&&"."!==e[a]&&"/"!==e[a]&&":"!==e[a];a--);let b=Math.min(J,e.length-a-1);b<3&&(b=J-2),
b<e.length&&(e="..."+e.slice(e.length-b))}return Promise.resolve(e)}function H(a){return 2===a.m_type||a.m_name===m.Aq}
function I(a,b){const c=(0,z.TT)(b.m_name),d={userIdField:c===m.Df,passwordField:H(b),defaultField:b.m_value_is_default||!1,
promptField:3===a&&c===m.Pf,loginTipField:c===m.jJ,scriptField:c===m._6,noteField:c===m.zY||"$Note$"===c,totpField:c===m.M4,
passKeyField:c===m.I4};return d.serviceField=!d.promptField&&!d.loginTipField&&!d.scriptField&&m.jW.includes(c),d}
const J=20,K=/^(_ctl|ctl00)/;function L(){return"msie"!==(0,s.m)()}function M(a){const b=Object.assign({},a),c=[]
;return a.m_fields&&a.m_fields.forEach((a=>{c.push(Object.assign({},a))})),b.m_fields=c,b}}}]);