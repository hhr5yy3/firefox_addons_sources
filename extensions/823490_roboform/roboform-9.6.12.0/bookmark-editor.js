// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[39],{44426:function(a,b,c){c.r(b),c.d(b,{
BookmarkEditorView:function(){return v},BookmarkViewerView:function(){return u}})
;var d=c(87965),e=c(47333),f=c(4601),g=c(65852),h=c(4234),i=c(88579),j=c(62851),k=c(31173),l=c(97490),m=c(32105),n=c(4153),o=c(78440),p=c(63956),q=c(13113),r=c(69893),s=(c(13117),
c(84224)),t=c(91764)._;function u(a,b,c,l,u,v,w,x,y,z,A,B){const C=c,D=A,E=l,F=u,G=z.LocalizeString
;let H=Object.assign({},a),I=Object.assign({},b);const J=300,K=251,L=300,M=500
;let N,O,P,Q,R,S,T,U,V,W,X,Y,Z,aa=null,ab=null,ac=!1,ad=!1,ae=!1,af=!1;const ag=(0,o.tG)(),ah=(0,f.zd)({imageSize:"imgLogo",
rfDataItemImages:C,OnSetImage:(a,b)=>(0,f.rd)(a,P,Q,b),OnResetImage:()=>{(0,f._K)(P,Q)}});return{Create:async function(b,c){
return N=t("div",{className:"editor-view editor-inline editor-bookmark view-mode"},O=t("div",{className:"editor-content"
},P=t("div",{className:"content-header"},t("div",{className:"header-container "+(y?"tab-view":"")},Q=t("div",{
className:"header-image"}),t("div",{className:"header-title-pane"},R=t("div",{className:"header-title"},S=t("span",{
className:"title-name",onclick:al}),T=t("span",{className:"title-folder hidden"})),Z=(0,m.nM)("hidden",ar,am,ak)),t("div",{
className:"header-actionbar "+(x?"":"hidden")},t("div",{className:"action-button action-goto",
title:await G("StartPage_Login_ActionGoToTip"),onclick:an},t("div",{className:"icon"}),t("div",{className:"title"
},await G("Cmd_Goto_Flat")))),Y=t("div",{className:"editor-cmdbar cmdbar-main"},a.readOnly?null:t("div",{
className:"editor-cmd editor-cmd-edit",title:await G("StartPage_Cmd_Edit"),onclick:ao}),U=t("div",{
className:"editor-cmd editor-cmd-more",title:await G("StartPage_MoreActions_Tip"),onmousedown:ap,onclick:aq}),y?null:t("div",{
className:"editor-cmd editor-cmd-close",title:await G("Cmd_Close_Flat"),onclick:()=>c((0,r.JS)())})),y?t("div",{
className:"editor-cmdbar cmdbar-navigation"},t("div",{className:"editor-cmd editor-cmd-home",
title:await G("StartPage_Cmd_Home"),onclick:()=>{const a={startPage:(0,g.vj)()};(0,o.fI)(w.OpenStartPage(a))}
})):null)),V=t("div",{className:"content-data "+(y?"tab-view":"")},W=t("div",{className:"login-field field-url hidden"
}),X=t("div",{className:"login-field field-note hidden"})))),(0,o.C)((()=>ai(H,I))),N},OnAfterShow:function(){
F.onDataChanged.Add(av)},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){ag.Cancel(),F.onDataChanged.Remove(av)}
};function ai(b,c){var d;const e=!(0,n.XM)(I,c),f=!(0,n.XM)(H,b);if(e||f||!af){if((0,p.l5)(O),(0,p.l5)(P),f||!af){const a=(0,
h.em)(b.path);S.textContent=a,S.title=a;const d=c.m_goto_url||"";d?(0,o.fI)(ah.UpdateBySiteUrl((0,
j.g4)(d,b.matchUrl))):Q.classList.add("default-image"),(0,o.fI)(async function(a){if(a){const b=(0,q.$0)(a)||a;let c,d,e
;const f=t("div",{className:"login-field field-url"},t("div",{className:"field-caption"
},await G("PassCard_Field_Url")),t("div",{className:"field-value"},t("div",{className:"text"},c=t("span",{className:"text-value"
},b)),t("div",{className:"inline-onhover-buttons-pane"},d=t("div",{
className:"onhover-button onhover-button-expand"+(b===a?" hidden":""),title:await G("StartPage_Login_ShowFullURL"),
onclick:()=>g(!0)}),e=t("div",{className:"onhover-button onhover-button-collapse hidden",
title:await G("StartPage_Login_HideFullURL"),onclick:()=>g(!1)}),t("div",{className:"onhover-button onhover-button-copy",
title:await G("Editor_Cmd_Copy_Flat"),onclick:h}))));function g(g){g?((0,p.SE)(d),(0,p.l5)(e),f.classList.add("full-url-shown"),
c.textContent=a):((0,p.l5)(d),(0,p.SE)(e),f.classList.remove("full-url-shown"),c.textContent=b)}function h(){var a
;const b=null!==(a=c.textContent)&&void 0!==a?a:"";(0,o.fI)((async()=>{await as(b),
B.ShowNotification(await G("Notification_URL_Copyied_Text"),null,null)})())}V.replaceChild(f,W),W=f}else(0,p.SE)(W)
}(null!=d?d:"")),(0,o.fI)(aj(b.path))}!e&&af||(0,o.fI)(async function(b,c){let d,e,f,g=null;b?g=t("div",{
className:"login-field field-note field-note-row"},t("span",{className:"field-caption"
},await G("AdminCenter_Note_Text")),t("div",{className:"field-value"},t("div",{className:"text"},t("span",{
className:"text-value"},b)),t("div",{className:"inline-onhover-buttons-pane"},t("div",{
className:"onhover-button onhover-button-copy",title:await G("Editor_Cmd_Copy_Flat"),onclick:h})))):b||a.readOnly||(g=t("div",{
className:"login-field field-note"},t("div",{className:"login-field field-note"},t("div",{className:"field-header"},t("span",{
className:"field-caption"},await G("AdminCenter_Note_Text")),d=t("div",{className:"field-buttons hidden"},f=t("div",{
className:"field-btn cancel-btn",tabIndex:-1,onclick:l}),e=t("div",{className:"field-btn save-btn",tabIndex:-1,onclick:m
}))),t("div",{className:"login-field field-with-title field-border"},aa=t("textarea",{className:"input-field textarea",
placeholder:await G("Editor_Cmd_AddNote_Flat"),oninput:i,onkeydown:j,onblur:k})))));g&&(V.replaceChild(g,X),X=g);function h(){
(0,o.fI)((async()=>{await as(b),B.ShowNotification(await G("Notification_Note_Copyied_Text"),null,null)})())}function i(){(0,
p.gJ)((0,n.TT)(aa),L),ag.Start((async a=>{await(0,o.Gu)(M,a,!1);(0,n.TT)(aa).value.trim()?(0,p.l5)(d):(0,p.SE)(d)}))}
function j(a){a.key===s.U.Escape&&(0,n.TT)(aa).blur()}function k(a){if(!(0,n.TT)(aa).value.trim())return void(0,p.SE)(d)
;const b=a.relatedTarget;b!==e&&b!==f&&(0,o.fI)((async()=>{const a=await G("AdminCenter_NoteChangeConfirmation_Text")
;await B.ShowConfirmationDialog(await G("AdminCenter_SaveChanges_Text"),a,await G("AdminCenter_ConfirmationDialog_DontSave"),await G("AdminCenter_ConfirmationDialog_Save"))?m():l()
})())}function l(){(0,n.TT)(aa).value="",(0,n.TT)(aa).style.height="auto",(0,p.SE)(d)}function m(){var a;const b=(0,
n.TT)(aa).value.trim();if(!b)return void(0,p.SE)(d);const c={m_goto_url:null!==(a=I.m_goto_url)&&void 0!==a?a:"",m_note:b};(0,
p.D$)((async()=>{try{await F.PutDataItem(H.path,c,null),await v.SetUsageInfo(H.path,0,!0,null),ai(H,c),(0,p.SE)(d),
B.ShowNotification(await G("Notification_Changes_Saved_Text"),null,null)}catch(a){}}),(()=>((0,p.aZ)((0,n.TT)(aa)),()=>{(0,
p.r9)((0,n.TT)(aa))})),J,(()=>((0,p.aZ)((0,n.TT)(aa)),()=>{(0,p.r9)((0,n.TT)(aa))})))}
}(null!==(d=c.m_note)&&void 0!==d?d:"",b.readOnly)),H=Object.assign({},b),I=Object.assign({},c),af=!0}}async function aj(a){
const b=(0,q.fA)(a);if(""===b)return(0,p.SE)(T),void R.classList.remove("folder-shown")
;const c=await G("StartPage_HomeFolder")+b;T.textContent=c,T.title=c,R.classList.add("folder-shown"),(0,p.l5)(T)}function ak(){
const a=Z.GetValue().trim().toLowerCase(),b=(0,q.HE)((0,q._p)(H.path));(0,n.RA)(a,b)?am():(0,o.fI)((async()=>{
const a=await G("AdminCenter_BookmarkRenameConfirmation_Text")
;await B.ShowConfirmationDialog(await G("AdminCenter_SaveChanges_Text"),a,await G("AdminCenter_ConfirmationDialog_DontSave"),await G("AdminCenter_ConfirmationDialog_Save"))?ar():am()
})())}function al(){(0,p.SE)(R),Z.SetValue((0,h.em)(H.path)),Z.Show(),ad=!0}function am(){Z.Hide(),(0,p.l5)(R),ad=!1}
function an(){if(!(!!I.m_goto_url&&!(0,i.HB)(I.m_goto_url)))return;const a=I.m_goto_url;a&&(0,k.oK)(a)?(0,o.fI)((async()=>{
B.ShowNotification(await G("CannotOpenUrlForSecurityReasons"),5,2)})()):a&&(0,o.fI)(E.OpenUrl({url:a,newTab:!0},null))}
function ao(){ac||(0,p.D$)((async()=>{const a=(0,o.f4)(null,null,null),b=await F.GetDataItem(H.path,4,null,a)
;await B.ShowDataEditModeInDetailsPane(H,b,!1,a)}),(()=>()=>{}),0,null)}function ap(a){ac||ae&&a.stopPropagation()}
function aq(){ac||(ae?ab&&(ab.Hide(),ab=null):function(){ae=!0
;const a=null==U?void 0:U.getBoundingClientRect(),b=new DOMRect(a.left+20,a.bottom-10,0,0);async function c(){
return await B.GetBookmarkCommands(H,al)}function e(){const a=(0,d.NI)(U);return a.onHide=g,a.onShow=f,a}function f(){ae=!0}
function g(){ae=!1}ab=(0,d.Lj)(b,(()=>c()),e(),(function(){return U.getBoundingClientRect()}),((a,b)=>(0,o.fI)(a(b,(0,
o.f4)(null,null,null)))))}())}function ar(){(0,p.PQ)((async()=>{const a=Z.GetValue().trim(),b=(0,h.KF)(a,null)
;if(!b)return await B.ShowErrorDialog(await G("NameInvalidCharacter_Error2")),void Z.Focus()
;if(b.length>K)return await B.ShowErrorDialog(await G("WrongNameLenght_Error",[(0,n.bf)(K)])),void Z.Focus()
;const c=H.path,d=(0,h.kd)(H.type),f=(0,q.fA)(c)+"/"+b+d;if((0,n.RA)(c,f))ad&&am();else{let c=null;try{
c=await F.GetInfo(f,1,null)}catch(g){if(!(0,r.r5)(g,r.Y$))return void await B.ShowErrorDialog((0,e.Qo)(g))}if(c){
const b=await G("AlreadyExists_Error2",["Item",a]);return await B.ShowErrorDialog(await G("Cmd_Rename_Error",["Item",a,b])),
void Z.Focus()}try{await F.MoveFile(H.path,f,null);const a=(0,h.em)(H.path);ad&&am();ai(await F.GetInfo(f,63,null),I)
;const c=await G("Notification_Item_Renamed_Text",[a,b]);B.ShowNotification(c,null,null)}catch(g){await B.ShowErrorDialog((0,
e.Qo)(g))}}}),at,0,null,(a=>()=>{}))}async function as(a){await D.WriteText(a)}function at(){return(0,p.aZ)(Y),ac=!0,
Z.Enable(!1),aa&&(0,p.aZ)(aa),au}function au(){(0,p.r9)(Y),ac=!1,Z.Enable(!0),aa&&(0,p.r9)(aa)}function av(a){
for(const b of a)switch(b.event){case 8:
if(8===b.type&&b.path&&(0,h.QC)(b.path,H.path)&&b.to&&b.to.path&&(H.path=H.path.replace(b.path,b.to.path),(0,o.fI)(aj(H.path))),
2===b.type&&b.path===H.path&&b.to&&b.to.path){H.path=b.to.path;const a=(0,h.em)(b.to.path);S.textContent=a,S.title=a,
Z.SetValue(a),(0,o.fI)(aj(H.path))}break;case 12:(0,o.fI)((async()=>{const a=await F.GetInfo(H.path,63,null)
;a.favorite!==H.favorite&&(H=Object.assign(Object.assign({},H),{favorite:a.favorite}))})())}}}function v(a,b,c,d,g,i,k,s,u){
const v=c,w=d,x=g,y=u.LocalizeString;let z=Object.assign({},a),A=Object.assign({},b);const B=300,C=251,D=500,[E,F]=(0,l.Uw)((0,
h.em)(z.path)),[G,H]=(0,l.Uw)(!1),[I,J]=(0,l.Uw)(!1),[K,L]=(0,l.Uw)(!0),[M,N]=(0,l.Uw)("");let O,P,Q,R,S;const T=(0,o.tG)()
;let U;U=k?(0,f.zd)({imageSize:"imgLogo",rfDataItemImages:w,OnSetImage:(a,b)=>(0,f.rd)(a,O,P,b),OnResetImage:()=>{(0,f._K)(O,P)}
}):(0,f.zd)({imageSize:"img32",imageSizeForBackground:"imgLogo",rfDataItemImages:w,OnSetImage:(a,b)=>{const c={}
;return c.imgLogo={url:b.img32.url,background:b.img32.background,size:b.img32.size},(0,f.rd)("imgLogo",O,P,c)},
OnResetImage:()=>{(0,f._K)(O,P)}});let V="";const W={Create:async function(a,b){var c,d
;return V=await y("WrongUrlFormat_Error"),t("div",{className:"editor-view editor-inline editor-bookmark edit-mode"},t("div",{
className:"editor-content"},O=k?t("div",{className:"content-header seperate-tab"},t("div",{className:"header-container tab-view"
},P=t("div",{className:"header-image"}),t("div",{className:"header-title-pane"},e()))):t("div",{className:"content-header"
},t("div",{className:"header-title-pane"},P=t("div",{className:"header-image"}),e()),(async a=>G(a)?[]:t("div",{
className:"editor-cmdbar cmdbar-main"},t("div",{className:"editor-cmd editor-cmd-close",title:await y("Cmd_ApplyChanges_Flat"),
onclick:g})))),t("div",{className:"buttons-bar"},k?t("div",{className:"buttons-container"},t(f,null)):t(f,null)),t("div",{
className:"fields-list "+(k?"tab-view":"")},R=(0,m.ap)({title:await y("AdminCenter_GoToUrl_Text"),
value:null!==(c=A.m_goto_url)&&void 0!==c?c:"",oninput:af}),(a=>t("div",{className:"error-text"},M(a))),S=(0,m.fs)({
title:await y("AdminCenter_Note_Text"),value:null!==(d=A.m_note)&&void 0!==d?d:"",oninput:ag,resizable_heigth:!0,max_height:300
})),(a=>I(a)?t("div",{className:"loading-progress"}):[])));function e(){return b=>{const c=E(b),d=G(b);return d&&(0,o.C)((()=>{
Q.SetValue(c),Q.Focus()})),d?Q=(0,m.nM)("",Z,ad,aa):t("div",{className:"header-title"},t("span",{className:"title-name",title:c,
onclick:a},c))};function a(){O.classList.add("inplace-rename"),H(!0)}}function f(){return t("fragment",null,t("button",{
className:"button",onclick:function(){v&&b((0,r.JS)());(0,p.PQ)((async()=>{if(ak())await ab(!0);else{const a=(0,
o.f4)(null,null,null),b=await x.GetDataItem(z.path,4,null,a);await s.ShowDataViewModeInDetailsPane(z,b,!1,a)}
}),(()=>()=>{}),0,null,(a=>{(0,r.au)(a),(0,r.r5)(a,r.kd)||s.ShowNotification((0,r.EB)(a),null,2)}))}
},y("Cmd_Cancel_Flat")),(a=>{const b=K(a);return t("button",{
className:b?"button default-button disabled":"button default-button",onclick:b?null:()=>ac(!0)},y("Cmd_ApplyChanges_Flat"))}))}
function g(){(0,o.fI)((async()=>{await ab(!1),b((0,r.JS)())})())}},OnAfterShow:function(){x.onDataChanged.Add(al),
document.addEventListener("keydown",Y),window.addEventListener("beforeunload",X)},OnBeforeHide:function(){},Focus:function(){
R.Focus(),S.Resize(),(0,o.fI)(U.UpdateBySiteUrl((0,j.g4)(A.m_goto_url,z.matchUrl)))},Dispose:function(){T.Cancel(),
x.onDataChanged.Remove(al),document.removeEventListener("keydown",Y),window.removeEventListener("beforeunload",X)}};return W
;function X(a){if(ak()){const b="RoboForm file was changed. Do you want to save changes?";return(a||window.event).returnValue=b,
b}}function Y(a){a.ctrlKey&&"KeyS"===a.code&&(a.preventDefault(),a.stopPropagation(),ac(!1))}function Z(){(0,p.PQ)((async()=>{
const a=Q.GetValue().trim(),b=(0,h.KF)(a,null);if(!b)return await s.ShowErrorDialog(await y("NameInvalidCharacter_Error2")),
void Q.Focus();if(b.length>C)return await s.ShowErrorDialog(await y("WrongNameLenght_Error",[(0,n.bf)(C)])),void Q.Focus()
;const c=z.path,d=(0,h.kd)(z.type),f=(0,q.fA)(c)+"/"+b+d;if((0,n.RA)(c,f))G(null)&&ad();else{let c=null;try{
c=await x.GetInfo(f,1,null)}catch(g){if(!(0,r.r5)(g,r.Y$))return void await s.ShowErrorDialog((0,e.Qo)(g))}if(c){
const b=await y("AlreadyExists_Error2",["Item",a]);return await s.ShowErrorDialog(await y("Cmd_Rename_Error",["Item",a,b])),
void Q.Focus()}try{const a=(0,h.em)(z.path);await x.MoveFile(z.path,f,null),G(null)&&ad();!function(a,b){!(0,n.XM)(z,a)&&(F((0,
h.em)(a.path)),z=Object.assign({},a),A=Object.assign({},b),S.Resize(),(0,o.fI)(U.UpdateBySiteUrl((0,
j.g4)(b.m_goto_url||"",a.matchUrl))))}(await x.GetInfo(f,63,null),A);const c=await y("Notification_Item_Renamed_Text",[a,b])
;s.ShowNotification(c,null,null)}catch(g){throw(0,r.ZU)(r.V2,(0,r.EB)(g))}}}),ah,B,aj,(a=>{(0,r.au)(a),(0,
o.fI)(s.ShowErrorDialog((0,e.Qo)(a)))}))}function aa(){const a=Q.GetValue().trim().toLowerCase(),b=(0,q.HE)((0,q._p)(z.path))
;(0,n.RA)(a,b)?ad():(0,o.fI)((async()=>{const a=await y("AdminCenter_BookmarkRenameConfirmation_Text")
;await s.ShowConfirmationDialog(await y("AdminCenter_SaveChanges_Text"),a,await y("AdminCenter_ConfirmationDialog_DontSave"),await y("AdminCenter_ConfirmationDialog_Save"))?Z():ad()
})())}async function ab(a){if(!ak())return
;const b=await y("StartPage_Editor_CloseChangesConfirm",[await y("RoboformType_Bookmark")])
;await s.ShowConfirmationDialog(await y("AdminCenter_SaveChanges_Text"),b,await y("AdminCenter_ConfirmationDialog_DontSave"),await y("AdminCenter_ConfirmationDialog_Save"))&&ac(a)
}function ac(a){const b=S.GetValue(),c=function(){const a=R.GetValue()||"",b=(0,q.OZ)(a,!1)||"";a!==b&&R.SetValue(b);return b}()
;if(!c)return N(V),R.SetErrorState(),void R.Focus();const d={m_goto_url:c,m_note:b};(0,p.PQ)((async()=>{
await x.PutDataItem(z.path,d,null),
await i.SetUsageInfo(z.path,0,!0,null),s.ShowNotification(await y("Notification_Changes_Saved_Text"),null,null);const b=(0,
o.f4)(null,null,null),e=Object.assign({},z);e.gotoUrl=c,a?await s.ShowDataViewModeInDetailsPane(e,d,!1,b):A=Object.assign({},d)
}),ah,B,aj,(a=>{(0,r.au)(a),s.ShowNotification((0,r.EB)(a),null,2)}))}function ad(){O.classList.remove("inplace-rename"),H(!1)}
function ae(){var a;const b=R.GetValue(),c=S.GetValue();L((0,n.RA)(b,A.m_goto_url)&&c===(null!==(a=A.m_note)&&void 0!==a?a:""))}
function af(){N(""),R.RemoveErrorState(),ae()}function ag(){T.Start((async a=>{await(0,o.Gu)(D,a,!1),ae()}))}function ah(){
return R.Enable(!1),(0,p.aZ)(S),L(!0),ai}function ai(){R.Enable(!0),(0,p.r9)(S),ae()}function aj(){return J(!0),()=>J(!1)}
function ak(){return(0,p.o3)(A.m_goto_url,R.GetValue().trim())||(0,p.o3)(A.m_note,S.GetValue().trim())}function al(a){
for(const b of a)if(8===b.event)8===b.type&&b.path&&(0,
h.QC)(b.path,z.path)&&b.to&&b.to.path&&(z.path=z.path.replace(b.path,b.to.path)),
2===b.type&&b.path===z.path&&b.to&&b.to.path&&(z.path=b.to.path,F((0,h.em)(b.to.path)))}}}}]);