// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[563],{45680:function(a,b,c){c.r(b),c.d(b,{
StepByStepGuideController:function(){return n}})
;var d=c(11834),e=c(36786),f=c(41107),g=c(30045),h=c(13883),i=c(98266),j=c(31173),k=c(78440),l=c(69893),m=c(91764)._
;function n(a,b){const c=a.localization,f=c.LocalizeString;let n=1,q=!1,r=null;return{Activate:function(){if(q)return;q=!0,
r&&r.Cancel();r=(0,k.YZ)({action:async q=>{let r=-1,s=-1;const t=[];let u=null;if(3!==n&&(t.push((()=>(0,d.BG)((0,i.p)((0,
d.IW)("guide-dialog guide-step-welcome-dialog","",{onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>(0,
g._3)((async a=>m("div",{className:"guide-step-welcome"},m("div",{className:"media-content",onclick:()=>a(9)}),m("div",{
className:"text-content"},m("div",{className:"title"},await f("StartPage_Guide_Welcome_Title")),m("div",{className:"text"
},await f("StartPage_Guide_Welcome_Text",[await f("Cmd_Next_Flat")]))),m("div",{className:"buttons-bar"},m("div",{
className:"button",onclick:()=>a(1)},await f("Cmd_Skip_Flat")),m("div",{className:"button",onclick:()=>a(4)
},await f("Cmd_Next_Flat"))))))))))),r=t.length-1),1!==n&&(t.push((()=>(0,d.BG)((0,i.p)((0,
d.IW)("guide-dialog guide-step-pin-dialog","",{onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>o({
asSingleStep:3===n,localization:c},{GetStepsPaginationEl:()=>p(0,t.length-1),OnNext:a=>a(4),OnBack:a=>a(5),OnClose:a=>a(8)
})))))),s=t.length-1),3!==n){const o=1!==n;t.push((()=>(0,d.BG)((0,i.p)((0,d.IW)("guide-dialog guide-step-auto-save-dialog","",{
onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>(0,g._3)((async a=>m("div",{className:"guide-step-auto-save"
},m("div",{className:"media-content"}),m("div",{className:"text-content"},m("div",{className:"title"
},await f("StartPage_Guide_Autosave_Title")),m("div",{className:"text"},await f("StartPage_Guide_Autosave_Text"))),m("div",{
className:"buttons-bar"},m("div",{className:"button",onclick:()=>a(5)
},await f("Cmd_Back_Flat")),p(0+(o?1:0),t.length-1),m("div",{className:"button",onclick:()=>a(4)
},await f("Cmd_Next_Flat"))))))))))),
t.push((()=>(0,d.BG)((0,i.p)((0,d.IW)("guide-dialog guide-step-import-dialog import-dialog",c.LocalizeString("StartPage_Guide_Import_Title"),{
onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>(0,g._3)((async d=>m("div",{className:"guide-step-import"
},await(0,h.M)(!1,c,(e=>{
d(8),(0,k.fI)((0,h.X)(a.parentFrame,a.rf_api.data,a.rf_api.policies,a.rf_api.usageInfo,e,b.on_show_native_import_dialog,(0,
j.yY)(),c,(0,k.f4)(null,null,null)))})),m("div",{className:"buttons-bar"},m("div",{className:"button",onclick:()=>d(5)
},await f("Cmd_Back_Flat")),p(1+(o?1:0),t.length-1),m("div",{className:"button",onclick:()=>d(4)
},await f("Cmd_Next_Flat"))))))))))),t.push((()=>(0,d.BG)((0,i.p)((0,d.IW)("guide-dialog guide-step-manual-save-dialog","",{
onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>(0,g._3)((async b=>m("div",{className:"guide-step-manual-save"
},m("div",{className:"text-content"},m("div",{className:"title"},await f("StartPage_Guide_ManualSave_Title")),m("div",{
className:"text"},await f("StartPage_Guide_ManualSave_Text"))),m("div",{className:"buttons-bar"},m("div",{className:"button",
onclick:()=>b(5)},await f("Cmd_Back_Flat")),p(2+(o?1:0),t.length-1),m("div",{className:"button",onclick:()=>b(8)
},await f("Cmd_Finish_Flat"))),m("div",{className:"new-login-button plus-image",
title:await f("StartPage_New_ButtonTip",[await f("StartPage_New_Login")]),onclick:()=>{b(8),(0,k.fI)((async()=>{try{await(0,
e.YO)("new-login","",c),await a.rf_new_menu.CreateNew("new-login","",!0)}catch(b){await(0,d.nn)((0,l.EB)(b))}})())}}))))))))),
u=()=>(0,d.BG)((0,i.p)((0,d.IW)("guide-video-dialog","",{onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)}),(()=>(0,
g._3)((async()=>m("iframe",{id:"youtube-iframe",className:"guide-video",
src:"https://www.youtube.com/embed/KKSAktrdJKQ?autoplay=1",allow:"autoplay; fullscreen;",style:{width:"100%",height:"440px"},
frameBorder:"0"}))))))}3!==n&&b.OnStart();let v=0;for(;;){v===s&&b.OnShowPinExtensionStep();const a=t[v](),e=await a.Execute(q)
;if(4===e)v<t.length&&v++;else if(5===e)v>0&&v--;else{if(1===e&&v===r&&2===n)return b.OnShowPinExtensionStep(),void await(0,
d.BG)((0,i.p)((0,d.IW)("guide-dialog guide-step-pin-dialog","",{onCancel:a=>a(1),onEscape:a=>a(1),onClickOutside:a=>a(4)
}),(()=>o({asSingleStep:!0,localization:c},{GetStepsPaginationEl:()=>p(0,0),OnNext:a=>a(4),OnBack:a=>a(5),OnClose:a=>a(8)
})))).Execute(q);if(9!==e||null===u)return;await u().Execute(q)}}}}),(0,k.fI)((async()=>{try{await r.Execute(null)}finally{s()}
})())},Deactivate:s,UpdateView:function(a){},Invalidate:function(){},IsStillActual:t,GetIsStillActual:function(){return t},
SetShowingMode:function(a){n=a}};function s(){q=!1,r&&(r.Cancel(),r=null)}function t(){return q}}function o(a,b){
const c=a.localization.LocalizeString;return(0,g._3)((async d=>{let e;const g=m("div",{className:"guide-step-pin-extension"
},m("div",{className:"media-content"}),m("div",{className:"text-content"},m("div",{className:"title"
},await c("StartPage_Guide_Pin_Title")),e=m("div",{className:"text"})),a.asSingleStep?m("div",{
className:"buttons-bar center-buttons"},m("div",{className:"button",onclick:()=>b.OnClose(d)
},await c("Cmd_GotIt_Flat"))):m("div",{className:"buttons-bar"},m("div",{className:"button",onclick:()=>b.OnBack(d)
},await c("Cmd_Back_Flat")),b.GetStepsPaginationEl(),m("div",{className:"button",onclick:()=>b.OnNext(d)
},await c("Cmd_Next_Flat"))));return(0,f.Bh)(e,c("StartPage_Guide_Pin_Text"),[m("span",{className:"icon"})]),g}))}
function p(a,b){return m("div",{className:"steps-pagination"},[...Array(b).keys()].map((b=>m("div",{
className:"step"+(b===a?" active":"")}))))}}}]);