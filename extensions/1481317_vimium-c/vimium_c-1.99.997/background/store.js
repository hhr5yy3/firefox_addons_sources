"use strict";__filename="background/store.js",define(["require","exports"],(e,l)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.J=l.ei=l.hn=l.Dn=l.$r=l.j=l.Ol=l.Il=l.Sn=l.wo=l.o=l.getNextFakeTabId=l.ml=l.r=l.li=l.Xn=l.oa=l.$=l.m=l.b=l.M=l.g=l.Re=l.jl=l.ha=l.ui=l.ya=l.mn=l.L=l.Rt=l.Wt=l.ie=l._a=l.Ma=l.fe=l.uu=l.xe=l.he=l.qe=l.Ce=l.ss=l.Pa=l.no=l.fl=l.cn=l.eo=l.Xe=l.qn=l.We=l.na=l.l=l.ja=l.t=l.Sa=l.Rn=l.ii=l.Ca=l.vi=l.Nr=l.Tl=l.A=l.vomnibarPage_f=l.newTabUrl_f=l.Ln=l.q=l.Je=l.mo=l.Vn=l.Ge=l.Ye=l.Z=l.Qe=l.Ia=l.Va=l.OnSafari=l.OnEdge=l.OnFirefox=l.OnChrome=l.Na=void 0,
l.Na=2,l.OnChrome=!!0,l.OnFirefox=true,l.OnEdge=!!0,l.OnSafari=!!0;let a,n=navigator.userAgentData,o=n&&n.brands
;l.Va=false,
l.Ia=998,l.Qe=o&&(a=o.find(e=>e.brand.includes("Firefox")))&&parseInt(a.version)>=101?parseInt(a.version):parseInt(navigator.userAgent.split("Firefox/")[1]||"0")||999,
l.Z=2,l.Ge=location.origin+"/",l.Vn=navigator.language.startsWith("zh"),l.mo=false,l.Je=false,l.q={},l.Ln=new Map,
l.newTabUrl_f="",l.vomnibarPage_f="",l.A={v:l.Qe,d:"",g:false,m:false},l.Tl={map:new Map,rules:[],keywords:null},l.Nr={
v:l.Qe,c:"",i:0,l:0,m:null,n:0,s:"",t:""},l.vi={actions:[]},l.Ca=false,l.t=false,l.We=new Map,l.qn=new Map,l.Xe=0,
l.fl={},l.no=-1,l.Pa=false,l.ss=new Map,l.Ce=[],l.qe=new Map,l.he=-1,l.xe=-1,l.uu=-1;l.fe=0,l.Ma=null,l._a=null,l.ie={
ne:[],Ve:[],c:0,Ke:0},l.Wt={qt:null,Kt:new Map,Vt:0,Jt:0,Nt:0},l.Rt=new Map,l.mn=null,l.ya=null,l.ha=0,l.jl=new Map,
l.Re=0,l.g=null,l.M=1;let t=null;l.y=null,l.yn=null,l.li=(e,l)=>{let a=t,n=!e||a&&a.i===e;return t=n?l:a,n?a:null},
l.r=()=>{},l.ml={};let r=-4;l.getNextFakeTabId=()=>r--,l.o=l.r,l.wo=l.r,l.Sn=null,l.Il=()=>"",l.Ol=()=>"",l.j=e=>e,
l.$r=()=>null,l.Dn=null,l.hn=null,l.J={xa:0,U:"moz",Ba:0,Fa:":",so:false,Ue:null,Ta:"",aa:"",GitVer:"3f08dd1",
to:"/lib/injector.js",ti:"/front/vomnibar-tee.html",HelpDialogJS:"/background/help_dialog.js",ni:"pages/options.html",
ka:"browser",Ee:"",ta:"https://github.com/gdh1995/vimium-c",wa:null,_i:"/pages/show.html",ci:"",Hn:"/front/vomnibar.js",
pi:""}});