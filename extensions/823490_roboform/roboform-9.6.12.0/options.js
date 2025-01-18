// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[575],{3180:function(){},234:function(a,b,c){"use strict";c.d(b,{
C:function(){return i},G:function(){return j}});c(3180);var d=c(83343),e=c(47333),f=c(97490),g=c(78440),h=c(91764)._
;function i(a,b,c,e,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){
const z=a,A=b,B=c,C=e,D=i,E=j,F=k,G=l,H=r,I=s,J=m,K=n,L=o,M=p,N=q,O=w,P=x,Q=y;return async b=>{const[c,e]=(0,f.Uw)(null),i={
onDone:()=>{},OnOpenPaymentPage:m.OpenPaymentPage,ShowViewInRightPanel:a=>{e(a)},HideViewInRightPanel:()=>{e(null)}},j=(0,
d.r)(0,!0,!A,!0,!1,a,J,K,L,B,C,M,N,D,E,F,G,u,v,z,H,I,t,O,P,Q,i);return[h("div",{className:"options-page-view"},j,function(){
const[a,b]=(0,f.Uw)(!1),[d,e]=(0,f.Uw)(!1),[i,j]=(0,f.Uw)(null),k=(0,g.tG)();return async f=>{await f.Effect((async f=>{
const h=c(f);h?k.Start((async c=>{j(h),a(null)||b(!0),d(null)||(await(0,g.Gu)(100,c),e(!0))})):k.Start((async c=>{e(!1),await(0,
g.Gu)(500,c),j(null),a(null)&&b(!1)}))}));if(a(f)){const a=h("div",{className:"right-panel"},(async a=>{const b=i(a)
;return b?b(a):[]}));return await f.Effect((async b=>{d(b)?a.classList.add("expanded"):a.classList.remove("expanded")})),[a]}
return[]}}())]}}function j(a,b,c){return async d=>[h("div",{className:"options-page-view"},h("div",{className:"overlay"
},h("div",{className:"message-box"},h("div",{className:"message-box"},h("div",{className:"content"},h("div",{
className:"icon error-icon"}),h("div",{className:"text error-text"},(0,e.Qo)(b))),h("div",{className:"footer"},h("input",{
type:"button",value:await a.LocalizeString("Cmd_Ok_Flat"),className:"normal-button important-button",onclick:c.onDone}))))))]}},
31729:function(a,b,c){"use strict"
;var d=c(234),e=c(18101),f=c(60954),g=c(70346),h=c(94061),i=c(95239),j=c(5971),k=c(53895),l=c(95250),m=c(66423),n=c(97490),o=c(78440),p=c(4153)
;c(13117);(0,o.uT)(async function(){const a=(0,j.pW)(),b=(0,k.x)(a);try{await b.Init(null);const c=await(0,f.y)(b),j=await(0,
e.c)(b,c.options),k=(0,l.Lz)(a);k.Init();const o=(0,l.Bq)(a);let q
;if(window.matchMedia("(prefers-color-scheme: dark)").matches&&document.body.classList.replace("light-theme","dark-theme"),
j.IsBreachMonSupported()){const a=(0,g.v)(b);await a.Init(),q=(0,g.r)(a)}else q=null;const r=(0,
d.C)(b,j.IsStandalone(),c.service,c.data,q,c.options,c.settings,c.policies,(0,p.TT)(c.commands),(0,p.TT)(c.rfo),(0,
p.TT)(c.enterprise),c.usageInfo,c.backups,b.storage,k,(0,l.d7)(a),(()=>(0,i.BO)(b)),(()=>(0,
h.O9)(b)),await o.GetPlatformOS(),await o.GetBrowserType(),(0,m.k)());(await(0,n.Dn)((0,
n.i2)(),r)).forEach((a=>document.body.appendChild(a)))}catch(c){let a=[];const e=(0,d.G)(b,c,{
onDone:()=>a.forEach((a=>document.body.removeChild(a)))});a=await(0,n.Dn)((0,n.i2)(),e),
a.forEach((a=>document.body.appendChild(a)))}}(),"Options:Initialize")},44974:function(){},49701:function(){},29165:function(){}
},function(a){a.O(0,[612],(function(){return b=31729,a(a.s=b);var b}));a.O()}]);