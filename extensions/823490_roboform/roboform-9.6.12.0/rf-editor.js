// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[103],{80793:function(a,b,c){c.d(b,{d:function(){return n}})
;var d=c(30045),e=c(98266),f=c(31173),g=c(63956),h=c(73863),i=c(78440),j=c(4153),k=c(69893),l=c(95399),m=c(91764)._
;function n(a,b,c,n){const o=b.LocalizeString;let p=null,q=[],r=[],s=[],t=null,u=null,v=[],w=null,x=!1;return{
Create:async function(){if(0===a.size){const a=m("div",{className:"item-changes-list-view"},m("div",{className:"no-changes-view"
},await o("ItemHistory_NoChanges")));return p=a,a}q=[],r=[],s=[],v=[];const b=[],c=(0,
j.VH)([...a.keys()],((a,b)=>null===a?-1:null===b?1:0));for(const h of c){const c=(0,j.TT)(a.get(h)),[d,e,f,g,i]=await A(h,c)
;b.push(d);for(const a of e)q.push(a);for(const a of f)r.push(a);for(const a of g)s.push(a);for(const a of i)v.push(a)}let d,e,f
;const g=m("div",{className:"item-history-view"},m("div",{className:"buttons-bar"},m("div",{className:"flex-gap"}),m("div",{
className:"buttons rf-right-align noselect"},m("div",{className:"button",onclick:n.Cancel
},await o("Cmd_Cancel_Flat")),w=m("div",{className:"button default-button disabled-button",onclick:y
},await o("ItemHistory_ApplyChanges_Button_Text")))),t=m("div",{className:"fields-title"},d=m("div",{
className:"title date-column"},await o("ItemHistory_Date_Title")),e=m("div",{className:"title field-name"
},await o("ItemHistory_FieldName_Title")),m("div",{className:"title previous-version"
},await o("ItemHistory_PreviousVersion_Title")),f=m("div",{className:"title restore-title"}),m("div",{
className:"title current-version"},await o("ItemHistory_CurrentVersion_Title"))),u=m("div",{className:"fields-list"},b))
;return q.unshift(d),r.unshift(e),s.unshift(f),p=g,g},OnAfterShow:function(){if(0!==a.size&&(b(q),b(r),b(s),t&&u)){
const a=t.clientWidth,b=u.clientWidth;a>b&&(t.style.paddingRight=(0,f.Md)(6+a-b))}return;function b(a){let b=null
;for(const c of a){const a=c.getBoundingClientRect();a.width>(null!=b?b:0)&&(b=a.width)}
if(null!==b)for(const c of a)c.style.width=(0,f.Md)(b)}},OnBeforeHide:function(){},Focus:function(){},Dispose:function(){}}
;function y(){if(x)return;const a=v.filter((a=>a.m_selected));0===a.length||(0,g.D$)((async()=>{try{const b=(0,
i.f4)(null,null,null),c=await async function(a){return(0,e.Sw)((0,j.TT)(p),(0,e.p)((0,
e.dK)("restore-confirmation",o("ItemHistory_RestoreDialog_Title"),null),(()=>(0,d._3)((async(a,b)=>m("div",{
className:"modal-dialog-content"},m("div",{className:"text"},m("div",{className:"question"
},await o("ItemHistory_RestoreDialog_Confirm_Text")),m("div",{className:"warning"
},await o("ItemHistory_RestoreDialog_Warning_Text"))),m("div",{className:"footer"},m("input",{className:"button",type:"button",
value:await o("Cmd_Cancel_Flat"),onclick:()=>{a(!1)}}),m("input",{className:"default-button button",type:"button",
value:await o("BackupAndRestore_RestoreSelectedButton_Text"),onclick:()=>{a(!0)}})))))))).Execute(a)}(b);if(!c)return
;const f=a.map((a=>a.m_field_change));await n.ApplyChanges(f,b),n.CloseOnSuccess()}catch(b){(0,k.r5)(b,k.kd)||n.ShowError(b)}
}),z,null,null)}function z(){return x=!0,B(),()=>{x=!1,B()}}async function A(a,d){const e=[],f=[],k=[],p=[],q=[];if(a){
const b=function(a){const b=m("div",{className:"instance-title"},a.m_icon_classname?m("div",{className:(0,
h.bt)("icon"," ",a.m_icon_classname)}):null,m("div",{className:"title"},a.m_title));return b}(a);e.push(b)}for(const b of d){
const[c,d,g,h,i]=await r(a,b);e.push(c),f.push(d),k.push(g),p.push(h),q.push(i)}return[m("div",{className:"group-list"
},e),f,k,p,q];async function r(a,d){var e,f,k;let p,q,r,s,t,u=!1,w=null,x=null,y=!1,A=null
;const C=null!==(e=await b.GetLanguageTag(null))&&void 0!==e?e:"default",D=(0,l.hb)(d.m_time_secs,C),E=m("div",{className:(0,
h.bt)("field"," ",d.m_is_note_field?"expanded":"")},p=m("div",{className:"field-column date-column"},m("div",{className:"date"
},`${D.day}-${D.month}-${D.year}`)),q=m("div",{className:"field-column field-name"},d.m_field_display_name),m("div",{
className:(0,h.bt)("field-column previous-version"," ",d.m_prev_value?"":"empty")},m("div",{className:"value"
},s=I(d.m_prev_value||await o("ItemHistory_EmptyValue"),!d.m_prev_value)),m("div",{className:"buttons"
},d.m_is_password_field&&d.m_prev_value?w=m("div",{className:"show-password-button",
title:await o("StartPage_Login_ShowPasswordTip")},m("div",{className:"show-password-icon",onclick:G
})):null,d.m_prev_value?m("div",{className:"copy-button",title:await o("StartPage_Editor_CopyTip")},m("div",{
className:"copy-icon",onclick:()=>H((0,j.TT)(d.m_prev_value))})):null)),r=m("div",{className:"field-column restore"},m("div",{
className:"apply-change-arrow",title:await o("ItemHistory_RestoreButton_Tooltip"),onclick:()=>{const b=!F.m_selected
;b&&function(a,b){for(const c of v)c.m_group_data===a&&c.m_field_unique_id===b&&c.m_selected&&c.SelectBackupValue(!1)
}(a,d.m_field_unique_id),F.SelectBackupValue(b),B()}},m("div",{className:"apply-change-arrow-icon"}))),m("div",{className:(0,
h.bt)("field-column current-version"," ",d.m_current_value?"":"empty")},m("div",{className:"value"
},t=I(d.m_current_value||await o("ItemHistory_EmptyValue"),!d.m_current_value)),m("div",{className:"buttons"
},d.m_is_password_field&&d.m_current_value?x=m("div",{className:"show-password-button",
title:await o("StartPage_Login_ShowPasswordTip")},m("div",{className:"show-password-icon",onclick:G
})):null,d.m_current_value?m("div",{className:"copy-button",title:await o("StartPage_Editor_CopyTip")},m("div",{
className:"copy-icon",onclick:()=>H((0,j.TT)(d.m_current_value))
})):null,!d.m_is_note_field&&((null!==(f=d.m_prev_value)&&void 0!==f?f:"").length>=20||(null!==(k=d.m_current_value)&&void 0!==k?k:"").length>=20)?A=m("div",{
className:"expand-button",title:await o("ItemHistory_ExpandField_Tip")},m("div",{className:"expand-icon",onclick:function(){
y=!y,E.classList.toggle("expanded"),A&&(0,i.fI)((async()=>{
A&&(A.title=y?await o("ItemHistory_CollapseField_Tip"):await o("ItemHistory_ExpandField_Tip"))})())}})):null))),F={
m_selected:!1,m_group_data:a,m_field_unique_id:d.m_field_unique_id,m_field_change:d,SelectBackupValue:a=>{F.m_selected=a,
a?E.classList.add("selected"):E.classList.remove("selected")}};return[E,p,q,r,F];function G(){if(u=!u,
E.classList.toggle("password-shown"),d.m_prev_value){const a=I(d.m_prev_value,u);s.replaceWith(a),s=a}if(d.m_current_value){
const a=I(d.m_current_value,u);t.replaceWith(a),t=a}(w||x)&&(0,i.fI)((async()=>{
const a=u?await o("StartPage_Login_HidePasswordTip"):await o("StartPage_Login_ShowPasswordTip");w&&(w.title=a),x&&(x.title=a)
})())}function H(a){(0,g.D$)((async()=>{await c.WriteText(a),n.ShowFieldCopiedNotification(d.m_field_display_name)
}),z,null,null)}function I(a,b){return a&&!b&&d.m_is_password_field?m("div",null,"••••••••"):m("div",null,a)}}}function B(){
if(x)return void(null==w||w.classList.add("disabled-button"))
;v.some((a=>a.m_selected))?null==w||w.classList.remove("disabled-button"):null==w||w.classList.add("disabled-button")}}},
80794:function(a,b,c){c.r(b),c.d(b,{EditorController:function(){return B},InitEditorContext:function(){return y},
UpdateEditorContext:function(){return z},g_rf_editor_context:function(){return A}})
;var d=c(37367),e=c(41107),f=c(11834),g=c(55195),h=c(4601),i=c(75748),j=c(74435),k=c(30045),l=c(98266),m=c(6998),n=c(4234),o=c(12131),p=c(47333),q=c(31173),r=c(63956),s=c(13113),t=c(78440),u=c(69893),v=c(4153),w=c(13117),x=c(91764)._
;function y(a){A=a}function z(a){(0,v.T1)(A,a)}let A;function B(a,b,c){let y=!1,z=!1;const B=a.m_rf_manager,C=a
;let D,I,J,K=!1,L=null;const M=b,N=c;let O,P=null,Q=!1,R=!1,S=null,T="";const U=(0,t.tG)();let V=null;const W=12e4;let X=null
;return{Activate:function(){if(y)return;y=!0,(0,j.P7)().editorInSeparateTab?(0,r.l5)(N):(0,
t.C)((()=>M.classList.add("rf-editor-inline-shown")))},Deactivate:function(){if(!y)return;ad(),ab(),Z(),y=!1,
null==V||V.Cancel(),V=null,(0,j.P7)().editorInSeparateTab?(0,r.SE)(N):(B.GetController(1).Collapse(null),(0,
t.C)((()=>M.classList.remove("rf-editor-inline-shown"))));!function(a){if((0,j.P7)().editorInSeparateTab)return
;if(window.innerWidth<E)return;const b=(0,v.TT)(a);if(!b)return;(function(a){if(window.innerWidth>=E){
const b=A.m_page_preferences;(0,t.fI)(b.SetValue("StartPage.InlineEditorWidth",(0,v.bf)(a.clientWidth)))}})(b),(0,
e.dR)("hide-inline-editor",b,"left",b.offsetLeft,window.innerWidth,F,(()=>{b.style.width="",b.style.left=""}))
;const c=A.m_main_view_html_elements.header;(0,e.dR)("hide-inline-editor",c,"width",c.offsetWidth,window.innerWidth,F,(()=>{
c.style.width=""}));const d=A.m_main_view_html_elements.mainFrame
;(0,e.dR)("hide-inline-editor",d,"width",d.offsetWidth,window.innerWidth,F,(()=>{d.style.width=""}))}(P)},
UpdateView:function(a){a&&(z=!1);if(!y)return;if(L)return void(z=!0);if(J)return void(z=!0)
;if(!C.m_rf_data_editor_info.IsUptodate()||!z){const b=D?D.path:"",c=I||!1;(0,t.fI)(async function(a,b,c){if(L)return
;if(!X||a)try{const a=await C.m_rf_service.GetRFOnlineUserId();if(X){
if(X.userId!==a.userId||X.serverUrl!==a.serverUrl)return void C.m_rf_manager.CloseEditor()}else X=a}catch(d){(0,u.r5)(d,u.kd)}
try{if(await C.m_rf_data_editor_info.Update("update-editor-info",b,null),!Y({path:b,editMode:c}))throw(0,u.JS)()
;const a=C.m_rf_data_editor_info.GetData();if(!a)throw(0,u.ZU)(u.V2,"no item info");D=a}catch(d){return void((0,
u.r5)(d,u.kd)||(0,w.Rm)("!!! Editor. Update: Cannot get an item info",b,d))}}(a,b,c))}z=!0},Invalidate:()=>{z=!1},
IsStillActual:Y,GetIsStillActual:function(){if(L)return()=>!0;let a,b;D&&(a=D.path,b=I||!1);return function(){return Y({path:a,
editMode:b})}},InitEditor:function(a,b,c,d,g){const h=(0,t.f4)(null,null,null);P||(P=x("div",{className:"rf-editor"}),
A.m_main_view_html_elements.editor=P,(0,j.P7)().editorInSeparateTab?(P.classList.add("rf-editor-page"),
N.appendChild(P)):M.appendChild(P));const k=D?D.path:void 0,l=I||!1,o=K,p="stand-alone"===A.m_rf_page_status.mode;let q=!1
;if((void 0!==a.path||k!==a.path)&&g&&b){const c=(0,i.k)(a,b,C.m_rf_cache,C.m_sharing_api,A.m_rf_api.data,C.m_clipboard);(0,
t.fI)(aa((()=>c),h)),C.m_rf_data_editor_info.Invalidate(),C.m_rf_data_editor_data.Invalidate()
}else if(void 0===a.path||k!==a.path||l!==c||o!==g){try{switch(a.type){case 2:(0,t.fI)((async()=>{try{const d=await(0,
e.As)(m.Aj,300,h);if(c){const c=d.BookmarkEditorView(a,b,!1,A.m_rf_data_item_images,A.m_rf_api.data,A.m_rf_api.usageInfo,(0,
j.P7)().editorInSeparateTab,{ShowNotification:ae,ShowErrorDialog:af,ShowDataViewModeInDetailsPane:ay,ShowConfirmationDialog:az
},A.m_localization);await aa((()=>c),h)}else{
const c=d.BookmarkViewerView(a,b,A.m_rf_data_item_images,A.m_view_api,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,!0,(0,
j.P7)().editorInSeparateTab,A.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
GetBookmarkCommands:ag,ShowDataEditModeInDetailsPane:ax});await aa((()=>c),h)}}catch(d){Z(),(0,u.r5)(d,u.kd)||await(0,
f.nn)("Cannot open Bookmark Editor: "+(0,u.EB)(d))}})());break;case 1:case 3:case 4:(0,t.fI)((async()=>{try{const d=await(0,
e.As)(m.Rj,300,h);if(c){
const c=d.LoginEditorView(a,b,!1,A.m_rf_data_item_images,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_view_api,(0,
j.P7)().editorInSeparateTab,A.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowDataViewModeInDetailsPane:ay});await aa((()=>c),h)}else{
const c=d.LoginViewerView(a,b,A.m_rf_data_item_images,A.m_view_api,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,A.password_audit_service,A.m_rf_api.securityWarningsManager,A.m_breach_mon_service,!0,p,(0,
j.P7)().editorInSeparateTab,C.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
GetLoginCommands:ag,GetDataLoginPasswordStrength:av,GetTextByPasswordStrength:aw,ShowDataEditModeInDetailsPane:ax,
CopyTextToClipboardWithAutoClear:aA});await aa((()=>c),h)}}catch(d){Z(),(0,u.r5)(d,u.kd)||await(0,
f.nn)("Cannot open Login Editor: "+(0,u.EB)(d))}})());break;case 5:(0,t.fI)((async()=>{try{
d?await aE(a,b,h):await aD(a,b,"","",h)}catch(c){Z(),(0,u.r5)(c,u.kd)||await(0,f.nn)("Cannot open Identity Editor: "+(0,
u.EB)(c))}})());break;case 6:(0,t.fI)((async()=>{try{d?await aE(a,b,h):await aD(a,b,"","",h)}catch(c){Z(),(0,
u.r5)(c,u.kd)||await(0,f.nn)("Cannot open Identity Editor: "+(0,u.EB)(c))}})());break;case 7:{const c=b?null:{path:(0,
s.fA)(a.path),type:0};q=!d,(0,t.fI)((async()=>{try{
const f=(await(0,e.As)(m.fH,300,h)).SafenoteEditorView(d?null:a,d?null:b,d?a:null,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,c,!0,!1,(0,
j.P7)().editorInSeparateTab,A.m_localization,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowModalDialog:aB,GetSafenoteCommands:ah,CopyTextToClipboard:a=>aA(a,null),OnCreate:async b=>{
const c=await A.m_rf_api.data.GetDataItem(b.path,4,null,null);A.m_rf_manager.OnEditorItemCreated(a,b),await ay(b,c,!1,h)}})
;await aa((()=>f),h)}catch(g){Z(),(0,u.r5)(g,u.kd)||await(0,f.nn)("Cannot open Safenote Editor: "+(0,u.EB)(g))}})())}break
;default:throw(0,u.ZU)(u.V2,"unexpected data type")}}catch(r){return(0,w.Rm)("!!! Cannot open editor",r),(0,t.fI)((0,
f.nn)(C.m_localization.LocalizeString("StartPage_OpenEditor_Error",[(0,n.XE)(a.path,!1),(0,u.EB)(r)]))),!1}
C.m_rf_data_editor_info.Invalidate(),C.m_rf_data_editor_data.Invalidate()}J=d||!1,D=a,I=c,K=g,L=null,
(void 0===a.path||k!==a.path)&&((0,t.fI)(C.m_ui_commands.LogGroupFileAccess(a,"View")),q&&(0,
t.fI)(C.m_ui_commands.UpdateDataItemUsedUsageInfo(a)));return!0},InitEditorWithCustomView:function(a){if(L===a)return
;P||(P=x("div",{className:"rf-editor"}),A.m_main_view_html_elements.editor=P,(0,
j.P7)().editorInSeparateTab?N.appendChild(P):M.appendChild(P));L=a;const b=function(a){const b={Create:c,OnAfterShow:d,
OnBeforeHide:e,Focus:f,Dispose:g};return b;async function c(){return x("div",null,a)}function d(){}function e(){}function f(){}
function g(){}}(a),c=(0,t.f4)(null,null,null);(0,t.fI)(aa((()=>b),c))},UninitEditor:Z,IsEditorInitialized:function(){
return void 0!==D||null!==L},ItemRenamed:function(a){D&&(D.path=a)},ItemCreated:function(a,b){Y({path:a.path,editMode:!1
})&&(D=b,J=!1)},OnChanges:function(a){if(!y)return;if(!a)return;if(L)return;const b=D;if(!b)return;const c=b.path
;for(let d=0;d<a.length;d++){const e=a[d];if(8===e.event)c===e.path&&e.to&&(b.path=(0,v.TT)(e.to.path),b.type=(0,n.hF)((0,
v.TT)(e.to.path)))}},GetState:function(){if(L)return{m_mode:"custom",m_in_separate_tab:(0,j.P7)().editorInSeparateTab}
;if(!D)return null;return{m_item_info:D,m_mode:J?"create":I?"edit":K?"item history":"view",m_in_separate_tab:(0,
j.P7)().editorInSeparateTab}}};function Y(a){if(!y)return!1;if(L)return!0;const b=a&&a.path,c=a&&a.editMode
;if(void 0===b)return!0;if(!(D&&D.path===b))return!1;return!((I||!1)!==c)}function Z(){D=void 0,I=void 0,X=null,Q=!1,L=null}
async function aa(a,b){return(0,t.W0)((async(b,c,d)=>{if(P&&(d.onTaskCancel.Add((()=>{f((0,u.JS)())})),O&&O.Dispose(),O=(0,
k.BQ)((async(a,b,c)=>x("div",{className:"details-view"},await a.Create(b,c))),a(d)),function(){if(!S)return void(R=!1)
;null==P||P.removeChild((0,v.TT)(S)),R=!1,S=null}(),S=await O.Create((function(a){b(a),ac()}),f),
!d.ShouldStop()))return await async function(){if(Q)return;Q=!0,P&&await async function(a){if((0,
j.P7)().editorInSeparateTab)return;if(window.innerWidth<E)return;const b=(0,v.TT)(a);if(!b)return
;const c=A.m_page_preferences,d=parseInt(await c.GetValue("StartPage.InlineEditorWidth",""))||0;H(d);const f=G(d)
;b.style.width=(0,q.Md)(f),(0,e.dR)("show-inline-editor",b,"left",b.offsetLeft,window.innerWidth-f,F)
;const g=A.m_main_view_html_elements.header;(0,e.dR)("show-inline-editor",g,"width",g.offsetWidth,window.innerWidth-f,F)
;const h=A.m_main_view_html_elements.mainFrame;(0,e.dR)("show-inline-editor",h,"width",h.offsetWidth,window.innerWidth-f,F)}(P)
;!function(){if((0,j.P7)().editorInSeparateTab)return;const a=x("div",{className:"rf-resize-handle"});function b(a){P&&((0,
j.P7)().editorInSeparateTab||(a.preventDefault(),function(a,b){if((0,j.P7)().editorInSeparateTab)return;if(!a)return;H(b),
b=G(b),a.style.width=(0,q.Md)(b),a.style.left=(0,q.Md)(window.innerWidth-b);A.m_main_view_html_elements.header.style.width=(0,
q.Md)(window.innerWidth-b);A.m_main_view_html_elements.mainFrame.style.width=(0,q.Md)(window.innerWidth-b),
A.m_rf_manager.OnEditorResized()}(P,window.innerWidth-a.clientX)))}null==P||P.appendChild(a),
a.addEventListener("mousedown",(a=>{Q&&(a.preventDefault(),document.body.style.cursor="e-resize",
document.addEventListener("mousemove",b))})),document.addEventListener("mouseup",(()=>{document.body.style.cursor="",
document.removeEventListener("mousemove",b)}))}()}(),P.appendChild(S),R=!0,S.focus(),O.OnAfterShow(),void O.Focus()
;function f(a){try{c(a)}finally{ac()}}}),b)}function ab(){R&&O&&(O.OnBeforeHide(),O.Dispose())}function ac(){
Q&&A.m_rf_manager.CloseEditor()}function ad(){const a=null==P?void 0:P.querySelector(".rf-resize-handle")
;a&&(null==P||P.removeChild(a))}function ae(a){(0,e.Fp)(a)}async function af(a){
const b=A.m_localization.LocalizeString,c=await b("AdminCenter_ErrorDialog_Title"),d=await b("StartPage_DialogButton_Ok")
;return aB((0,l.Sw)((0,v.TT)(M),(0,l.p)((0,l.dK)("dialog-modal",c,null),(()=>(0,k._3)((async(b,c)=>x("div",{className:"content"
},x("div",{className:"confirmation-text"},a),x("div",{className:"buttons-bar"},x("div",{className:"button default-button",
onclick:()=>b()},d)))))))),null)}async function ag(a,b){const c=[],d=await(0,h._w)(a);let e=!1
;return d.viewInNewTabAllowed&&(await aj(a,c,null),c.push("separator")),d.shareAllowed&&(await ak(a,c,null),e=!0),
d.sendAllowed&&(await al(a,c,null),e=!0),d.printAllowed&&(await am(a,c),e=!0),e&&(c.push("separator"),e=!1),
d.openFileLocationAllowed&&(await an(a,c),e=!0),e&&(c.push("separator"),e=!1),d.renameAllowed&&await ao(c,b),
d.moveAllowed&&await ap(a,c),d.cloneAllowed&&await aq(a,c),d.pinAllowed&&await ar(a,c),d.unpinAllowed&&await as(a,c),
d.deleteAllowed&&await at(a,c),d.viewBackupHistoryAllowed&&!J&&(c.push("separator"),await au(a,c)),c}async function ah(a,b,c,d){
const e=[],f=await(0,h._w)(a);let g=!1;return f.viewInNewTabAllowed&&(await aj(a,e,d),e.push("separator")),
f.shareAllowed&&(await ak(a,e,d),g=!0),f.sendAllowed&&(await al(a,e,d),g=!0),f.printAllowed&&(await am(a,e),g=!0),
g&&(e.push("separator"),g=!1),f.openFileLocationAllowed&&(await an(a,e),g=!0),g&&(e.push("separator"),g=!1),
f.renameAllowed&&await ao(e,c),f.moveAllowed&&!b&&await ap(a,e),f.cloneAllowed&&!b&&await aq(a,e),
f.pinAllowed&&!b&&await ar(a,e),f.unpinAllowed&&await as(a,e),f.deleteAllowed&&!b&&await at(a,e),
f.viewBackupHistoryAllowed&&!b&&(e.push("separator"),await au(a,e)),e}async function ai(a,b,c){
const d=A.m_localization.LocalizeString,e=[],f=await(0,h._w)(a);let g=!1;return f.shareAllowed&&(await ak(a,e,null),g=!0),
f.sendAllowed&&(await al(a,e,null),g=!0),f.printAllowed&&(await am(a,e),g=!0),g&&(e.push("separator"),g=!1),
f.openFileLocationAllowed&&(await an(a,e),g=!0),g&&(e.push("separator"),g=!1),f.renameAllowed&&await ao(e,(()=>(0,t.fI)(b()))),
f.moveAllowed&&await ap(a,e),f.cloneAllowed&&await aq(a,e),e.push({title:await d("AdminCenter_CopyAllFields_Text"),
imageClass:"cmd-copy-icon",onCommand:async(b,c)=>{const e=await A.m_rf_api.data.GetDataItem(a.path,4,null,c);try{
const a=await(0,n._1)(e,C.m_identity_view_structure_loader,A.m_localization);await aA(a,W)
;ae(await d("Notification_Identity_Fields_Copyied_Text"))}catch(f){ae((0,p.Qo)(f))}}}),f.changeCountryAllowed&&e.push({
title:await d("Identities_ChangeCountry_Title"),imageClass:"cmd-change-country",onCommand:c}),f.pinAllowed&&await ar(a,e),
f.unpinAllowed&&await as(a,e),f.deleteAllowed&&await at(a,e),f.viewBackupHistoryAllowed&&!J&&(e.push("separator"),
await au(a,e)),e}async function aj(a,b,c){const d=A.m_localization.LocalizeString;b.push({
title:await d("StartPage_EditorInSeparateTab"),imageClass:"cmd-view-new-tab-icon",onCommand:async b=>{if(J){
const b=await d("StartPage_Safenote_SaveNewBeforeActionConfirm",[await(0,e.en)(a.type,A.m_localization)])
;if(await az(await d("AdminCenter_SaveChanges_Text"),b,await d("AdminCenter_ConfirmationDialog_DontSave"),await d("AdminCenter_ConfirmationDialog_Save"))&&c){
const a=await c();a&&A.m_rf_manager.OnOpenEditor(a,!1,!1,!0)}}else A.m_rf_manager.OnOpenEditor(a,!1,!1,!0)}})}
async function ak(a,b,c){const f=A.m_localization.LocalizeString;b.push({title:await f("StartPage_Cmd_Share"),
imageClass:"cmd-share-icon",onCommand:async b=>{if(J){const b=await f("StartPage_Safenote_SaveNewBeforeActionConfirm",[await(0,
e.en)(a.type,A.m_localization)])
;if(await az(await f("AdminCenter_SaveChanges_Text"),b,await f("AdminCenter_ConfirmationDialog_DontSave"),await f("AdminCenter_ConfirmationDialog_Save"))&&c){
const a=await c();a&&await(0,d.RE)(A.m_ui_commands,a)}}else await(0,d.RE)(A.m_ui_commands,a)}})}async function al(a,b,c){
const f=A.m_localization.LocalizeString;b.push({title:await f("Cmd_SendFile_Flat"),imageClass:"cmd-send-icon",
onCommand:async b=>{if(J){const b=await f("StartPage_Safenote_SaveNewBeforeActionConfirm",[await(0,
e.en)(a.type,A.m_localization)])
;if(await az(await f("AdminCenter_SaveChanges_Text"),b,await f("AdminCenter_ConfirmationDialog_DontSave"),await f("AdminCenter_ConfirmationDialog_Save"))&&c){
const a=await c();a&&await(0,d.eh)(A.m_ui_commands,a)}}else await(0,d.eh)(A.m_ui_commands,a)}})}async function am(a,b){
const c=A.m_localization.LocalizeString;b.push({title:await c("Cmd_PrintCurrent_Flat"),imageClass:"cmd-print-icon",
onCommand:async b=>{A.m_ui_commands.Print(a)}})}async function an(a,b){const c=A.m_localization.LocalizeString;b.push({
title:await c("Cmd_OpenFileLocation_Flat"),imageClass:"cmd-open-file-location-icon",onCommand:async b=>{
A.m_rf_manager.OpenFileLocation(a)}})}async function ao(a,b){const c=A.m_localization.LocalizeString;a.push({
title:await c("Cmd_Rename_Flat"),imageClass:"cmd-rename-icon",onCommand:async()=>b()})}async function ap(a,b){
const c=A.m_localization.LocalizeString;b.push({title:await c("Cmd_Move_Flat"),imageClass:"cmd-move-icon",onCommand:async b=>{
await async function(a){try{const b=await(0,d.$K)({itemInfo:a,showFolders:!1,uiCommands:A.m_ui_commands,
localization:A.m_localization},{OnBeforeMoveOrClone:g.Xc});a.path=b}catch(b){}}(a)}})}async function aq(a,b){
const c=A.m_localization.LocalizeString;b.push({title:await c("Cmd_Clone_Flat"),imageClass:"cmd-clone-icon",onCommand:async b=>{
await async function(a){try{const b=await(0,d.FT)({itemInfo:a,
showFolders:await A.m_rf_items_existance.HasFolders("has-folders-login-viewer",null),uiCommands:A.m_ui_commands,
localization:A.m_localization},{OnBeforeMoveOrClone:g.Xc})
;await(0,g.OF)(a.path,b,A.m_rf_manager,A.m_rf_cached_data_info,A.m_localization)}catch(b){}}(a)}})}async function ar(a,b){
const c=A.m_localization.LocalizeString;b.push({title:await c("StartPage_Cmd_AddToPinned"),imageClass:"cmd-pin-icon",
onCommand:async b=>{A.m_ui_commands.PinItem(!0,a)}})}async function as(a,b){const c=A.m_localization.LocalizeString;b.push({
title:await c("StartPage_Cmd_RemoveFromPinned"),imageClass:"cmd-unpin-icon",onCommand:async b=>{A.m_ui_commands.PinItem(!1,a)}})
}async function at(a,b){const c=A.m_localization.LocalizeString;b.push({title:await c("Cmd_Delete_Flat"),
imageClass:"cmd-delete-icon",onCommand:async b=>{await(0,d.DR)(a,A.m_ui_commands,A.m_rf_manager,A.m_localization)}})}
async function au(a,b){const c=A.m_localization.LocalizeString;b.push({title:await c("StartPage_Cmd_ViewBackupHistory"),
imageClass:"cmd-view-backup-history-icon",onCommand:async b=>{
if(!await A.m_ui_commands.CheckClientReadOnlyStatusAndAskForUpgradeIfNeed())throw o.JF
;await A.m_rf_manager.SwitchToEditor(a,!1,!0)}})}async function av(a){try{
return(await A.password_audit_service.GetUpdatePasswordStrengthInfo(a,null)).strength}catch(b){return null}}
async function aw(a){const b=A.m_localization.LocalizeString;switch((0,e.vA)(a)){case"strong":
return b("PassAud_PwdStrengthStrong");case"good":return b("PassAud_PwdStrengthGood");case"medium":
return b("PassAud_PwdStrengthMedium");default:return b("PassAud_PwdStrengthWeak")}}async function ax(a,b,c,d){
if(2===a.type||1===a.type||4===a.type)if(D=a,I=!0,2!==a.type)if(1!==a.type&&4!==a.type);else{const f=(await(0,
e.As)(m.Rj,300,d)).LoginEditorView(a,b,c,A.m_rf_data_item_images,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_view_api,(0,
j.P7)().editorInSeparateTab,A.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowDataViewModeInDetailsPane:ay});await aa((()=>f),d)}else{
const f=(await(0,e.As)(m.Aj,300,d)).BookmarkEditorView(a,b,c,A.m_rf_data_item_images,A.m_rf_api.data,A.m_rf_api.usageInfo,(0,
j.P7)().editorInSeparateTab,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,ShowDataViewModeInDetailsPane:ay
},A.m_localization);await aa((()=>f),d)}}async function ay(a,b,c,d){
if(!c&&7!==a.type&&1!==a.type&&2!==a.type&&5!==a.type&&6!==a.type&&4!==a.type)return;D=a,I=!1
;const f="stand-alone"===A.m_rf_page_status.mode
;if(1!==a.type&&4!==a.type)if(2!==a.type)if(7!==a.type)5!==a.type&&6!==a.type||await aD(a,b,"","",d);else{const f=b?null:{
path:(0,s.fA)(a.path),type:0
},g=(await(0,e.As)(m.fH,300,d)).SafenoteEditorView(c?null:a,c?null:b,c?a:null,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,f,!0,!1,(0,
j.P7)().editorInSeparateTab,A.m_localization,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowModalDialog:aB,GetSafenoteCommands:ah,CopyTextToClipboard:aA,OnCreate:async b=>{
const c=await A.m_rf_api.data.GetDataItem(b.path,4,null,null);A.m_rf_manager.OnEditorItemCreated(a,b),await ay(b,c,!1,d)}})
;await aa((()=>g),d)}else{
const c=(await(0,e.As)(m.Aj,300,d)).BookmarkViewerView(a,b,A.m_rf_data_item_images,A.m_view_api,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,!0,(0,
j.P7)().editorInSeparateTab,C.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
GetBookmarkCommands:ag,ShowDataEditModeInDetailsPane:ax});await aa((()=>c),d)}else{const c=(await(0,
e.As)(m.Rj,300,d)).LoginViewerView(a,b,A.m_rf_data_item_images,A.m_view_api,A.m_rf_api.data,A.m_rf_api.usageInfo,A.m_rf_commands,A.password_audit_service,A.m_rf_api.securityWarningsManager,A.m_breach_mon_service,!0,f,(0,
j.P7)().editorInSeparateTab,C.m_localization,C.m_clipboard,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
GetLoginCommands:ag,GetDataLoginPasswordStrength:av,GetTextByPasswordStrength:aw,ShowDataEditModeInDetailsPane:ax,
CopyTextToClipboardWithAutoClear:aA});await aa((()=>c),d)}}async function az(a,b,c,d){return aB((0,l.Sw)((0,v.TT)(M),(0,l.p)((0,
l.dK)("dialog-modal",a,{onCancel:(a,b)=>a(!1),onEscape:(a,b)=>a(!1),onClickOutside:null}),(()=>(0,k._3)((async(a,e)=>x("div",{
className:"content"},"string"==typeof b?x("div",{className:"confirmation-text"},b):b,x("div",{className:"buttons-bar"},x("div",{
className:"button",onclick:()=>a(!1)},c),x("div",{className:"button default-button",onclick:()=>a(!0)},d)))))))),null)}
async function aA(a,b){await C.m_clipboard.WriteText(a),T=a,b&&function(a){U.Start((async b=>{await(0,t.Gu)(a,b);let c="";try{
c=await C.m_clipboard.ReadText()}catch(d){}if(T===c||!c)try{await C.m_clipboard.WriteText(" "),T=""}catch(d){}}))}(b)}
async function aB(a,b){V=a;try{return await a.Execute(b)}finally{V=null}}async function aC(a,b,c,d,f){D=a,I=!0;const g=(await(0,
e.As)(m.ow,300,f)).IdentityEditorView(a,b,c,d,!1,A.m_rf_api.data,A.m_rf_api.usageInfo,C.m_identity_view_structure_loader,A.m_initial_identity_provider,(0,
j.P7)().editorInSeparateTab,A.m_localization,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowDataViewModeInDetailsPane:aD,OnRename:A.m_rf_manager.OnEditorItemRenamed});await aa((()=>g),f)}async function aD(a,b,c,d,f){
D=a,I=!1
;const g=(await(0,e.As)(m.ow,300,f)).IdentityViewerView(a,b,c,d,A.m_rf_api.data,A.m_rf_api.usageInfo,C.m_identity_view_structure_loader,A.m_initial_identity_provider,A.m_rf_commands,!0,(0,
j.P7)().editorInSeparateTab,A.m_localization,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
GetIdentityCommands:ai,ShowDataEditModeInDetailsPane:aC,CopyTextToClipboardWithAutoClear:aA,
OnRename:A.m_rf_manager.OnEditorItemRenamed,OnViewInNewTab:a=>{A.m_rf_manager.OnOpenEditor(a,!1,!1,!0)}});await aa((()=>g),f)}
async function aE(a,b,c){D=a,I=!0;let d="",f="";if(b.m_groups.length&&b.m_groups[0]){const a=b.m_groups[0];d=a.m_name,
a.m_instances.length&&a.m_instances[0]&&(f=a.m_instances[0].m_name)}const g=(await(0,
e.As)(m.ow,300,c)).IdentityEditorView(a,b,d||"Person",f||"Main",!0,A.m_rf_api.data,A.m_rf_api.usageInfo,C.m_identity_view_structure_loader,A.m_initial_identity_provider,(0,
j.P7)().editorInSeparateTab,A.m_localization,{ShowNotification:ae,ShowConfirmationDialog:az,ShowErrorDialog:af,
ShowDataViewModeInDetailsPane:aD,OnRename:A.m_rf_manager.OnEditorItemRenamed});await aa((()=>g),c)}}
const C=630,D=590,E=1220,F=500;function G(a){let b=Math.max(C,a);return b=Math.min(b,window.innerWidth-D),b=Math.max(b,C),b}
function H(a){const b=Math.max(C,a);A.m_rf_manager.GetController(1).Collapse(b)}window.addEventListener("resize",(()=>{
if(!A)return;if(!A.m_rf_manager.IsInlineEditorShown())return;const a=A.m_main_view_html_elements.editor;if(!a)return
;const b=A.m_main_view_html_elements.header,c=A.m_main_view_html_elements.mainFrame
;if(window.innerWidth<E)return a.style.width="",a.style.left="",b.style.width="",void(c.style.width="");H(a.clientWidth)
;const d=G(a.clientWidth);a.style.width=(0,q.Md)(d),a.style.left=(0,q.Md)(window.innerWidth-d),b.style.width=(0,
q.Md)(window.innerWidth-d),c.style.width=(0,q.Md)(window.innerWidth-d)}))},75748:function(a,b,c){c.d(b,{k:function(){return w}})
;var d=c(80794),e=c(41107),f=c(4601),g=c(11834),h=c(80793),i=c(47333),j=c(32130),k=c(4234),l=c(12131),m=c(62851),n=c(84479),o=c(59283),p=c(78440),q=c(63956),r=c(13113),s=c(69893),t=c(4153),u=c(3566),v=c(91764)._
;function w(a,b,c,w,x,y){let z=null;const A=x,B=d.g_rf_editor_context.m_localization.LocalizeString;let C,D,E,F,G,H=null
;const I=1===a.type?"login":2===a.type?"bookmark":5===a.type?"identity":6===a.type?"contact":7===a.type?"safenote":"",J=(0,
f.zd)({imageSize:"img32",rfDataItemImages:d.g_rf_editor_context.m_rf_data_item_images,OnSetImage:(a,b)=>(0,f.rd)(a,D,E,b),
OnResetImage:()=>{(0,f._K)(D,E)}}),K={Create:async function(e,f){return C=v("div",{
className:"editor-view editor-inline editor-history"},v("div",{className:"editor-content"},D=v("div",{
className:`content-header ${I}`},E=v("div",{className:"header-image"}),v("div",{className:"header-title-pane"},v("div",{
className:"header-title"},v("div",{className:"title-name"},(0,k.em)(a.path)))),v("div",{className:"editor-cmd editor-cmd-close",
title:await B("Cmd_Close_Flat"),onclick:()=>f((0,s.JS)())})),F=v("div",{className:"content-data"})),G=v("div",{
className:"loading hidden"},v("div",{className:"loading-progress"}),v("div",null,B("StartPage_ViewBackupHistory_Loading")))),
K(),C;function g(){f((0,s.JS)()),A.onDataChanged.Remove(P)}function i(){return(0,q.rK)(F),(0,q.l5)(G),x}function x(){(0,q.SE)(G)
}function K(){(0,q.D$)((async()=>{if(5===a.type){const b=(0,u.Q0)((0,k.em)(a.path));E.textContent=(0,u.KG)((0,k.em)(a.path)),
E.classList.add(b)}else if(1===a.type||2===a.type){const b=1===a.type?(0,m.g4)(a.gotoUrl||"",a.matchUrl):a.gotoUrl||""
;await J.UpdateBySiteUrl(b)}const b=await async function(a,b){var e;const f=[];try{
const e=await d.g_rf_editor_context.m_rf_api.backups.GetLocalBackups(b);for(const d of e)try{let e;try{
e=await c.backups.GetItemsToRestoreFromLocalBackup(d.folder,null,b)}catch(u){if((0,s.bf)(u))throw u;continue}
const g=e.find((b=>b.targetPath===a.path));if(!g)continue;f.push({m_backup_time:d.createdTime,
m_modification_time:g.currentModTime&&g.currentModTime<d.createdTime?g.currentModTime:d.createdTime,m_file_info:g})}catch(u){
if(!(0,s.r5)(u,s.Y$))throw u}}catch(u){if(!(0,l.tM)(u,9))throw u}try{let e;if(a.received){e=(await w.GetSharedFolderInfo((0,
r.Y0)(a.path),b)).accountId}else e=null;const g=await d.g_rf_editor_context.m_rf_api.backups.GetServerBackups(e,b)
;for(const d of g){let g;try{g=await c.backups.GetItemsToRestoreFromServerBackup(d.id,{accountId:null!=e?e:void 0},b)}catch(u){
if((0,s.bf)(u))throw u;continue}const h=g.find((b=>b.targetPath===a.path));h&&f.push({m_backup_time:d.createdTime,
m_modification_time:h.currentModTime&&h.currentModTime<d.createdTime?h.currentModTime:d.createdTime,m_file_info:h})}}catch(u){
if(!(0,l.tM)(u,9))throw u}if(0===f.length)return new Map;z=await c.FetchDataItem(a.path);const g=[];for(const c of f){
const b=(0,j.m6)(JSON.parse(c.m_file_info.content),a.type);(await q(b,z,a.type,c.m_modification_time)).forEach((a=>{g.push(a)}))
}g.sort(((a,b)=>a.m_field_change.m_time_secs-b.m_field_change.m_time_secs));const h=new Map,i=new Map,m=new Map
;for(let c=g.length-1;c>=0;c--){const a=g[c],b=p(a),d=null!==(e=m.get(b))&&void 0!==e?e:null
;if(a.m_field_change.m_prev_value===(null==d?void 0:d.m_prev_value)){
a.m_field_change.m_time_secs<d.m_time_secs&&(d.m_time_secs=a.m_field_change.m_time_secs);continue}
if(null===a.m_field_change.m_prev_value)continue;let f=i.get(a.m_field_group);if(!f){if(a.m_field_group){const b={
m_title:a.m_field_group,m_icon_classname:a.m_field_group_icon};h.set(b,f=[])}else h.set(null,f=[]);i.set(a.m_field_group,f)}
f.push(a.m_field_change),m.set(b,a.m_field_change)}for(const c of h.values())c.sort(((a,b)=>b.m_time_secs-a.m_time_secs))
;return h;function p(a){var b;return`${null!==(b=a.m_field_group)&&void 0!==b?b:""}|${a.m_field_change.m_field_unique_id}`}
async function q(a,b,c,e){switch(c){case 1:case 3:return f(a,b,e);case 2:return g(a,b,e);case 7:return h(a,b,e);case 5:case 6:
return i(a,b,e);default:return[]}async function f(a,b,c){var d,f,g,h,i,j,l,m,o,p,q
;const r=[],s=a.m_goto_url,t=null!==(d=null==b?void 0:b.m_goto_url)&&void 0!==d?d:"";s!==t&&s&&r.push({m_field_group:null,
m_field_group_icon:null,m_field_change:{m_time_secs:c,m_field_unique_id:"GoTo Url$",
m_field_display_name:await B("PassCards_Prompt_GoToUrl_Text"),m_prev_value:s,m_current_value:t,m_is_password_field:!1,
m_is_note_field:!1,ApplyChange:a=>{a.m_goto_url=s}}})
;const u=a.m_match_url,v=null!==(f=null==b?void 0:b.m_match_url)&&void 0!==f?f:"";u!==v&&u&&r.push({m_field_group:null,
m_field_group_icon:null,m_field_change:{m_time_secs:e,m_field_unique_id:"Match Url$",
m_field_display_name:await B("PassCards_Prompt_MatchUrl_Text"),m_prev_value:u,m_current_value:v,m_is_password_field:!1,
m_is_note_field:!1,ApplyChange:a=>{a.m_match_url=u}}});const w=new Map;a.m_fields.forEach((a=>{w.set(C(a),a)}));const x=new Map
;null==b||b.m_fields.forEach((a=>{x.set(C(a),a)}));for(const[k,B]of x){const a=w.get(k);if(!a)continue
;const b=null!==(g=a.m_value)&&void 0!==g?g:"";b!==(null!==(h=B.m_value)&&void 0!==h?h:"")?b&&(r.push({m_field_group:null,
m_field_group_icon:null,m_field_change:{m_time_secs:e,m_field_unique_id:k,
m_field_display_name:await A(null!==(i=B.m_name)&&void 0!==i?i:n.PY),m_prev_value:null!==(j=a.m_value)&&void 0!==j?j:"",
m_current_value:null!==(l=B.m_value)&&void 0!==l?l:"",m_is_password_field:2===B.m_type,m_is_note_field:!1,ApplyChange:b=>{var c
;const d=b.m_fields.find((a=>C(a)===k));d&&(d.m_value=null!==(c=a.m_value)&&void 0!==c?c:"")}}}),w.delete(k)):w.delete(k)}
for(const k of w.values()){if(!k.m_value)continue;const a=C(k);r.push({m_field_group:null,m_field_group_icon:null,
m_field_change:{m_time_secs:e,m_field_unique_id:a,m_field_display_name:await A(null!==(m=k.m_name)&&void 0!==m?m:n.PY),
m_prev_value:null!==(o=k.m_value)&&void 0!==o?o:"",m_current_value:null,m_is_password_field:2===k.m_type,m_is_note_field:!1,
ApplyChange:b=>{var c;const d=b.m_fields.find((b=>C(b)===a))
;d?d.m_value=null!==(c=k.m_value)&&void 0!==c?c:"":b.m_fields.push(k)}}})}
const y=null!==(p=a.m_note)&&void 0!==p?p:"",z=null!==(q=null==b?void 0:b.m_note)&&void 0!==q?q:"";return y!==z&&y&&r.push({
m_field_group:null,m_field_group_icon:null,m_field_change:{m_time_secs:e,m_field_unique_id:k.zY,
m_field_display_name:await B("PassCards_Note"),m_prev_value:y,m_current_value:z,m_is_password_field:!1,m_is_note_field:!0,
ApplyChange:a=>{a.m_note=y}}}),r;async function A(a){
return a===n.Df?B("PassCards_UserId"):a===n.Aq?B("PassCards_Password"):a===k.jJ?B("PassCards_LoginTip_Title"):a===k.dm?B("PassType_BasicAuth_Const2"):a===k.xr?B("Passw_SubmitButton_Text"):a===k.M4?B("Login_OneTimeCode_Text"):a===k.I4?B("Passkey_Title"):a
}function C(a){var b,c;return`${null!==(b=a.m_name)&&void 0!==b?b:""}|${null!==(c=a.m_order_index)&&void 0!==c?c:0}`}}
async function g(a,b,c){var d,e,f;const g=[],h=a.m_goto_url,i=null!==(d=null==b?void 0:b.m_goto_url)&&void 0!==d?d:""
;h!==i&&h&&g.push({m_field_group:null,m_field_group_icon:null,m_field_change:{m_time_secs:c,m_field_unique_id:"GoTo Url$",
m_field_display_name:await B("PassCards_Prompt_GoToUrl_Text"),m_prev_value:h,m_current_value:i,m_is_password_field:!1,
m_is_note_field:!1,ApplyChange:a=>{a.m_goto_url=h}}})
;const j=null!==(e=a.m_note)&&void 0!==e?e:"",l=null!==(f=null==b?void 0:b.m_note)&&void 0!==f?f:"";return j!==l&&j&&g.push({
m_field_group:null,m_field_group_icon:null,m_field_change:{m_time_secs:c,m_field_unique_id:k.zY,
m_field_display_name:await B("PassCards_Note"),m_prev_value:j,m_current_value:l,m_is_password_field:!1,m_is_note_field:!0,
ApplyChange:a=>{a.m_note=j}}}),g}async function h(a,b,c){var d,e
;const f=null!==(d=a.m_note)&&void 0!==d?d:"",g=null!==(e=null==b?void 0:b.m_note)&&void 0!==e?e:"";return f!==g&&f?[{
m_field_group:null,m_field_group_icon:null,m_field_change:{m_time_secs:c,m_field_unique_id:k.zY,
m_field_display_name:await B("PassCards_Note"),m_prev_value:f,m_current_value:g,m_is_password_field:!1,m_is_note_field:!0,
ApplyChange:a=>{a.m_note=f}}}]:[]}async function i(a,b,c){var e,f,g,h,i,j,l,m,n,p,q,r;b=null!=b?b:{m_groups:[],m_options:{}}
;const s=[],u=new Set;for(const d in a.m_options)u.add(d);for(const d in b.m_options)u.add(d);for(const d of u.keys()){
const g=null!==(e=a.m_options[d])&&void 0!==e?e:"",h=null!==(f=b.m_options[d])&&void 0!==f?f:"";g!==h&&s.push({
m_field_group:null,m_field_group_icon:null,m_field_change:{m_time_secs:c,m_field_unique_id:d,m_field_display_name:await y(d),
m_current_value:h,m_prev_value:g,m_is_password_field:!1,m_is_note_field:!1,ApplyChange:a=>{a.m_options[d]=g}}})}const v=new Map
;a.m_groups.forEach((a=>{v.set(a.m_name,a)}));const w=new Map;b.m_groups.forEach((a=>{w.set(a.m_name,a)}))
;const x=new Set([...a.m_groups.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""})),...b.m_groups.map((a=>{var b
;return null!==(b=a.m_name)&&void 0!==b?b:""}))]);for(const d of x){
const a=v.get(d),b=w.get(d),e=void 0===a||a.m_instances.every((a=>0===a.m_fields.length)),f=void 0===b||b.m_instances.every((a=>0===a.m_fields.length))
;if(!e||!f)if(void 0===a);else if(void 0===b){if(void 0===a)continue
;for(const b of a.m_instances)for(const e of b.m_fields)e.m_value&&s.push({m_field_group:await z(b.m_name,d),
m_field_group_icon:"identity-group-"+d.toLowerCase().replace(" ","-")+"-icon",m_field_change:{m_time_secs:c,
m_field_unique_id:null!==(g=e.m_name)&&void 0!==g?g:"",m_field_display_name:await B((0,
o.pb)(null!==(h=e.m_name)&&void 0!==h?h:"")),m_current_value:null,m_prev_value:e.m_value,m_is_password_field:!1,
m_is_note_field:!1,ApplyChange:c=>{var d
;C(c,a.m_name,b.m_name,null!==(d=e.m_name)&&void 0!==d?d:"",e.m_value,e.m_custom_matches)}}})}else{
const e=a.m_instances,f=b.m_instances,g=new Map;e.forEach((a=>{g.set(a.m_name||"",a)}));const h=new Map;f.forEach((a=>{
h.set(a.m_name||"",a)}));const k=new Set([...e.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""})),...f.map((a=>{var b
;return null!==(b=a.m_name)&&void 0!==b?b:""}))]);for(const a of k){
const b=g.get(a),e=h.get(a),f=void 0===b||0===b.m_fields.length,k=void 0===e||0===e.m_fields.length
;if(!f||!k)if(void 0===b);else if(void 0===e)for(const a of b.m_fields)a.m_value&&s.push({m_field_group:await z(b.m_name,d),
m_field_group_icon:"identity-group-"+d.toLowerCase().replace(" ","-")+"-icon",m_field_change:{m_time_secs:c,
m_field_unique_id:null!==(i=a.m_name)&&void 0!==i?i:"",m_field_display_name:await B((0,
o.pb)(null!==(j=a.m_name)&&void 0!==j?j:"")),m_current_value:null,m_prev_value:a.m_value,m_is_password_field:!1,
m_is_note_field:!1,ApplyChange:c=>{var e;C(c,d,b.m_name,null!==(e=a.m_name)&&void 0!==e?e:"",a.m_value,a.m_custom_matches)}}
});else{const a=new Map;b.m_fields.forEach((b=>{var c;a.set(null!==(c=b.m_name)&&void 0!==c?c:"",b)}));const f=new Map
;e.m_fields.forEach((a=>{var b;f.set(null!==(b=a.m_name)&&void 0!==b?b:"",a)}));const g=new Set([...b.m_fields.map((a=>{var b
;return null!==(b=a.m_name)&&void 0!==b?b:""})),...e.m_fields.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""}))])
;for(const e of g){const g=a.get(e),h=f.get(e);!A(g,h)&&(null==g?void 0:g.m_value)&&s.push({m_field_group:await z(b.m_name,d),
m_field_group_icon:"identity-group-"+d.toLowerCase().replace(" ","-")+"-icon",m_field_change:{m_time_secs:c,
m_field_unique_id:null!==(m=null!==(l=null==g?void 0:g.m_name)&&void 0!==l?l:null==h?void 0:h.m_name)&&void 0!==m?m:"",
m_field_display_name:await B((0,
o.pb)(null!==(p=null!==(n=null==g?void 0:g.m_name)&&void 0!==n?n:null==h?void 0:h.m_name)&&void 0!==p?p:"")),
m_current_value:null!==(q=null==h?void 0:h.m_value)&&void 0!==q?q:"",
m_prev_value:null!==(r=null==g?void 0:g.m_value)&&void 0!==r?r:"",m_is_password_field:!1,m_is_note_field:!1,ApplyChange:a=>{
var c
;C(a,d,b.m_name,null!==(c=null==g?void 0:g.m_name)&&void 0!==c?c:"",null==g?void 0:g.m_value,null==g?void 0:g.m_custom_matches)}
}})}}}}}return s;async function y(a){switch(a){case k.lb:return B("CL_Country");case k.nJ:
return B("Identities_Cmd_PhonePrefix_Title");default:return a}}async function z(a,b){return a&&"Main"!==a?a:(0,
o.hq)(b,d.g_rf_editor_context.m_localization)}function A(a,b){var c,d,e,f,g,h
;return(null!==(c=null==a?void 0:a.m_name)&&void 0!==c?c:"")===(null!==(d=null==b?void 0:b.m_name)&&void 0!==d?d:"")&&(null!==(e=null==a?void 0:a.m_value)&&void 0!==e?e:"")===(null!==(f=null==b?void 0:b.m_value)&&void 0!==f?f:"")&&(0,
t.Fu)(null!==(g=null==a?void 0:a.m_custom_matches)&&void 0!==g?g:[],null!==(h=null==b?void 0:b.m_custom_matches)&&void 0!==h?h:[])
}function C(a,b,c,d,e,f){let g=a.m_groups.find((a=>a.m_name===b));g||(g={m_name:b,m_instances:[]},a.m_groups.push(g))
;let h=g.m_instances.find((a=>a.m_name===c));h||(h={m_name:c,m_fields:[]},g.m_instances.push(h))
;let i=h.m_fields.find((a=>a.m_name===d));i||(i={m_name:d},h.m_fields.push(i)),i.m_value=e,i.m_custom_matches=f}}}}(a,null)
;H=(0,h.d)(b,d.g_rf_editor_context.m_localization,y,{ApplyChanges:L,Cancel:g,CloseOnSuccess:M,ShowError:N,
ShowFieldCopiedNotification:O});const e=v("div",null,await H.Create());F.appendChild(e),H.OnAfterShow(),A.onDataChanged.Add(P)
}),(()=>()=>{}),300,i)}function P(a){for(const c of a)6===c.event&&(1!==c.type&&3!==c.type||(0,p.fI)((async()=>{await Q(b)&&K()
})()),2===c.type&&(0,p.fI)((async()=>{await R(b)&&K()})()),7===c.type&&(0,p.fI)((async()=>{await S(b)&&K()})()),
5!==c.type&&6!==c.type||(0,p.fI)((async()=>{await T(b)&&K()})()))}async function Q(b){var c,d,e,f
;const g=await A.GetDataItem(a.path,4,null,null)
;if(b.m_goto_url!==g.m_goto_url||b.m_match_url!==g.m_match_url||(null!==(c=b.m_note)&&void 0!==c?c:"")!==(null!==(d=g.m_note)&&void 0!==d?d:""))return!0
;if(b.m_fields.length!==g.m_fields.length)return!0;const h=new Map;for(const a of b.m_fields)h.set(i(a),a)
;for(const a of g.m_fields){const b=h.get(i(a));if(!b)return!0
;if((null!==(e=a.m_value)&&void 0!==e?e:"")!==(null!==(f=b.m_value)&&void 0!==f?f:""))return!0}return!1;function i(a){var b,c
;return`${null!==(b=a.m_name)&&void 0!==b?b:""}|${null!==(c=a.m_order_index)&&void 0!==c?c:0}`}}async function R(b){var c,d
;const e=await A.GetDataItem(a.path,4,null,null)
;return b.m_goto_url!==e.m_goto_url||(null!==(c=b.m_note)&&void 0!==c?c:"")!==(null!==(d=e.m_note)&&void 0!==d?d:"")}
async function S(b){var c,d;const e=await A.GetDataItem(a.path,4,null,null)
;return(null!==(c=b.m_note)&&void 0!==c?c:"")!==(null!==(d=e.m_note)&&void 0!==d?d:"")}async function T(b){var c,d,e,f
;const g=await A.GetDataItem(a.path,4,null,null),h=new Map;for(const a in b.m_options)h.set(a,b.m_options[a]);const i=new Map
;for(const a in g.m_options)i.set(a,g.m_options[a]);if(h.size!==i.size)return!0;for(const[a,m]of h){const b=i.get(a)
;if(!b||b!==m)return!0}const j=new Map;b.m_groups.forEach((a=>{j.set(a.m_name,a)}));const k=new Map;g.m_groups.forEach((a=>{
k.set(a.m_name,a)}));const l=new Set([...b.m_groups.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""
})),...g.m_groups.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""}))]);for(const a of l){
const b=j.get(a),g=k.get(a),h=void 0===b||b.m_instances.every((a=>0===a.m_fields.length)),i=void 0===g||g.m_instances.every((a=>0===a.m_fields.length))
;if(h!==i)return!0;if(h||i)continue;const l=b.m_instances,m=g.m_instances,n=new Map;l.forEach((a=>{n.set(a.m_name||"",a)}))
;const o=new Map;m.forEach((a=>{o.set(a.m_name||"",a)}));const p=new Set([...l.map((a=>{var b
;return null!==(b=a.m_name)&&void 0!==b?b:""})),...m.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""}))])
;for(const a of p){const b=n.get(a),g=o.get(a),h=void 0===b||0===b.m_fields.length,i=void 0===g||0===g.m_fields.length
;if(h!==i)return!0;if(h||i)continue;const j=new Map;b.m_fields.forEach((a=>{var b;j.set(null!==(b=a.m_name)&&void 0!==b?b:"",a)
}));const k=new Map;g.m_fields.forEach((a=>{var b;k.set(null!==(b=a.m_name)&&void 0!==b?b:"",a)}))
;const l=new Set([...b.m_fields.map((a=>{var b;return null!==(b=a.m_name)&&void 0!==b?b:""})),...g.m_fields.map((a=>{var b
;return null!==(b=a.m_name)&&void 0!==b?b:""}))]);for(const a of l){const b=j.get(a),g=k.get(a)
;if((null!==(c=null==b?void 0:b.m_value)&&void 0!==c?c:"")!==(null!==(d=null==g?void 0:g.m_value)&&void 0!==d?d:"")||!(0,
t.Fu)(null!==(e=null==b?void 0:b.m_custom_matches)&&void 0!==e?e:[],null!==(f=null==g?void 0:g.m_custom_matches)&&void 0!==f?f:[]))return!0
}}}return!1}},OnAfterShow:function(){},OnBeforeHide:function(){H&&H.OnBeforeHide()},Focus:function(){},Dispose:function(){}}
;return K;async function L(b,c){const e=await A.GetDataItem(a.path,4,null,null);if(!e)throw(0,s.ZU)(s.Y$,"Item doesn't exist")
;for(const a of b)a.ApplyChange(e);await d.g_rf_editor_context.m_rf_api.data.PutDataItem(a.path,e,c)}function M(){(0,
e.Fp)(B("RestoreUserDataDialog_RestoreSuccess_Caption3")),(0,p.fI)(d.g_rf_editor_context.m_rf_manager.SwitchToEditor(a,!1,!1))}
function N(a){(0,p.fI)((0,g.nn)((0,i.Qo)(a)))}function O(a){(0,e.Fp)(B("StartPage_Editor_CopiedToClipboard",[a]))}}}}]);