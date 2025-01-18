// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[542],{87795:function(){},3609:function(a,b,c){"use strict";c.d(b,{
Y:function(){return j}});c(87795);var d=c(62172),e=c(18101),f=c(60954),g=c(4153),h=c(78440),i=c(13117);function j(a){
window.m_rf_save_forms_dialog_shown||(window.m_rf_save_forms_dialog_shown=!0,(0,h.uT)((async()=>{try{
const b=await a.Init(null),c=await(0,f.y)(a);await(0,e.c)(a,c.options);const i=(0,d.sg)({view:a,service:c.service,
dataStorage:c.data,usageInfo:c.usageInfo,settings:c.settings,policies:c.policies,commands:(0,g.TT)(c.commands),
passwordHistory:c.passwordsHistory,data:b,onSizeChanged:async(b,c)=>{await a.UpdateViewPosition({contentWidth:b,contentHeight:c
})}}),j=await i.Create((c=>{(0,h.fI)((async()=>{c?b.autosave&&await a.CallViewHandler({id:"autosave-done"
}):await a.CallViewHandler({id:"use-different-provider"}),i.OnBeforeHide(),await a.CloseView()})())}),(()=>{(0,h.fI)((async()=>{
await a.CallViewHandler({id:"autosave-cancel"}),i.OnBeforeHide(),await a.CloseView()})())}));document.body.appendChild(j),
i.OnAfterShow()}catch(b){(0,i.Rm)("!!! Could not show Save Forms UI",b),window.m_rf_save_forms_dialog_shown=!1}
})(),"InitSaveFormsDialogPage"))}},3164:function(a,b,c){"use strict";var d=c(3609),e=c(85294);(0,d.Y)((0,e.L)(null))},
29165:function(){}},function(a){a.O(0,[612],(function(){return b=3164,a(a.s=b);var b}));a.O()}]);