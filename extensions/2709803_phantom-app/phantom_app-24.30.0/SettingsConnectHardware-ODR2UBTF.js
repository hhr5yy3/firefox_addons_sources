import{a as F,c as L,d as N,g as D}from"./chunk-GBPLRCRM.js";import{a as f}from"./chunk-3HJQC75H.js";import"./chunk-AXLC6CXS.js";import"./chunk-7V76OJ4M.js";import"./chunk-I5STSCB5.js";import{a as $}from"./chunk-NUNHBQJD.js";import"./chunk-LVMBU3FX.js";import"./chunk-MUB4J7OI.js";import"./chunk-YZCUSBGT.js";import"./chunk-KXI2KMWF.js";import"./chunk-FMREIR6A.js";import"./chunk-MENUYYDR.js";import"./chunk-FHJZZIAO.js";import"./chunk-2T5DYFEN.js";import"./chunk-JIDRUHKY.js";import"./chunk-YCBJ5FHL.js";import"./chunk-NONJMAAF.js";import"./chunk-Q7KEQOCZ.js";import"./chunk-ESIBJFWT.js";import{a as _}from"./chunk-U7XNP6KE.js";import"./chunk-PLEWWF6Z.js";import"./chunk-HYEZWSH6.js";import"./chunk-BZBOBPE4.js";import"./chunk-LGKOF6SU.js";import"./chunk-KJVVMFPV.js";import"./chunk-GDFURPOT.js";import{e as T}from"./chunk-6764LP7U.js";import{a as m}from"./chunk-QKMXDYYI.js";import"./chunk-2F7DB24L.js";import"./chunk-AHIMJGAR.js";import"./chunk-5Q6RGSEY.js";import"./chunk-H7PQ2ZKL.js";import{a as g}from"./chunk-NC6JDD77.js";import"./chunk-XXD2S4BV.js";import"./chunk-K2NEFY4Z.js";import"./chunk-HP7NJF3J.js";import"./chunk-C72BMBWH.js";import"./chunk-MP4HMVYC.js";import"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import"./chunk-WD5G2AXB.js";import"./chunk-MHZC233D.js";import"./chunk-3C7O5H7L.js";import"./chunk-R24F5SOK.js";import"./chunk-P3EQXKJ7.js";import{a as P,b as O}from"./chunk-YSJD33JQ.js";import{o as c,v as E}from"./chunk-KWIQ74SK.js";import"./chunk-7PJSEK45.js";import"./chunk-TYRC5IHT.js";import"./chunk-K6SPXOGF.js";import"./chunk-UKIEYEQ5.js";import"./chunk-RTLU3EDP.js";import"./chunk-XEZHZYHW.js";import"./chunk-D6DH2FN4.js";import"./chunk-WHWVEQ4K.js";import"./chunk-QLNQOJCN.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-W3KE72YO.js";import"./chunk-VBZS3GR4.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import{Kd as v,Sd as B}from"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import"./chunk-QLCKU4H4.js";import{g as y}from"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as H}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as b,h as r,n}from"./chunk-XJB76KNJ.js";r();n();var o=b(H());r();n();var i=b(H());r();n();var G=c(m)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: background-color 200ms ease;
  background-color: ${t=>t.$isExpanded?"#000":"#333"} !important;
  :hover {
    background-color: #444444;
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${t=>t.$isExpanded?"white":"#666666"};
    transition: fill 200ms ease;
    position: relative;
    ${t=>t.top?`top: ${t.top}px;`:""}
    ${t=>t.right?`right: ${t.right}px;`:""}
  }
`;var U=c(_).attrs({justify:"space-between"})`
  background-color: #222222;
  padding: 10px 16px;
  border-bottom: 1px solid #323232;
  height: 46px;
  opacity: ${t=>t.opacity??"1"};
`,V=c.div`
  display: flex;
  margin-left: 10px;
  > * {
    margin-right: 10px;
  }
`,I=c.div`
  width: 24px;
  height: 24px;
`,M=({onBackClick:t,totalSteps:a,currentStepIndex:p,isHidden:l,showBackButtonOnFirstStep:e,showBackButton:u=!0})=>i.default.createElement(U,{opacity:l?0:1},u&&(e||p!==0)?i.default.createElement(G,{right:1,onClick:t},i.default.createElement(E,null)):i.default.createElement(I,null),i.default.createElement(V,null,y(a).map(s=>{let d=s<=p?"#AB9FF2":"#333";return i.default.createElement(m,{key:s,diameter:12,color:d})})),i.default.createElement(I,null));r();n();var z=()=>{let{mutateAsync:t}=B(),{hardwareStepStack:a,pushStep:p,popStep:l,currentStep:e,setOnConnectHardwareAccounts:u,setOnConnectHardwareDone:w,setExistingAccounts:s}=F(),{data:d=[],isFetched:x,isError:k}=v(),C=T(a,(h,J)=>h?.length===J.length),W=a.length>(C??[]).length,A=C?.length===0,X={initial:{x:A?0:W?150:-150,opacity:A?1:0},animate:{x:0,opacity:1},exit:{opacity:0},transition:{duration:.2}},j=(0,o.useCallback)(()=>{e()?.props.preventBack||(e()?.props.onBackCallback&&e()?.props.onBackCallback?.(),l())},[e,l]);return $(()=>{u(async h=>{await t(h),await g.set(f,!await g.get(f))}),w(()=>self.close()),p(o.default.createElement(D,null))},a.length===0),(0,o.useEffect)(()=>{s({data:d,isFetched:x,isError:k})},[d,x,k,s]),o.default.createElement(L,null,o.default.createElement(M,{totalSteps:3,onBackClick:j,showBackButton:!e()?.props.preventBack,currentStepIndex:a.length-1}),o.default.createElement(O,{mode:"wait"},o.default.createElement(P.div,{style:{display:"flex",flexGrow:1},key:`${a.length}_${C?.length}`,...X},o.default.createElement(N,null,e()))))},yt=z;export{yt as default};
//# sourceMappingURL=SettingsConnectHardware-ODR2UBTF.js.map
