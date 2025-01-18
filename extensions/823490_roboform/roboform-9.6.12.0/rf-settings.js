// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[43],{41326:function(a,b,c){c.r(b),c.d(b,{
SettingsController:function(){return k}});var d=c(11834),e=c(83343),f=c(97490),g=c(63956),h=c(78440),i=c(69893),j=c(4153)
;c(13117);function k(a,b,c,k,l,m,n,o,p,q,r,s,t){const u=a,v=b,w=c,x=k,y=l,z=m,A=n,B=o,C=r,D=s;let E=!1
;const F=t.main,G=t.files,H=t.settings;let I=null,J=0;return{Activate:function(){if(E)return;E=!0,(0,g.l5)(G),(0,g.l5)(H),
w.IsInlineEditorShown()&&w.CloseEditor();(0,g.PQ)(K,(()=>()=>{}),500,(()=>(H.classList.add("rf-in-proggress"),L)),(a=>(0,
h.fI)((0,d.nn)((0,i.EB)(a)))))},Deactivate:function(){if(!E)return;E=!1,null==I||I.forEach((a=>{H.contains(a)&&H.removeChild(a)
})),I=null,J=0,F.classList.remove("rf-settings-shown"),(0,g.SE)(H)},UpdateView:function(a){if(!E)return},Invalidate:()=>{},
IsStillActual:()=>E,GetIsStillActual:()=>function(){return E},SelectSection:function(a){J=a},GetExtensionStorage:function(){
return z}};async function K(){const a="stand-alone"===x.mode||"extension-v9"===x.mode&&"stand-alone"===x.extensionMode,b={
onDone:()=>w.CloseSettings(),OnOpenPaymentPage:v.OpenPaymentPage,ShowViewInRightPanel:a=>{w.ShowViewInRightPanel(a)},
HideViewInRightPanel:()=>{w.CloseEditor()}},c=(0,e.r)(J,"stand-alone"!==x.mode,!a,!x.isInAppPaymentDisabled,!0,B,v,(0,
j.TT)(u.rfo),(0,
j.TT)(u.enterprise),u.service,u.data,u.usageInfo,u.backups,y,u.options,u.settings,u.policies,p,q,C,z,null,A,x.platformOs,x.browserType,D,b)
;I=await(0,f.Dn)((0,f.i2)(),c),I.forEach((a=>H.appendChild(a))),F.classList.add("rf-settings-shown")}function L(){
H.classList.remove("rf-in-proggress")}}}}]);