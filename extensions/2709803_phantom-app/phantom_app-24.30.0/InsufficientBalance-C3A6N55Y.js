import{a as h,b as c,d as s,e as T}from"./chunk-ON463HRP.js";import{a as I}from"./chunk-AXLC6CXS.js";import{Ma as b,ba as g}from"./chunk-YZCUSBGT.js";import"./chunk-KXI2KMWF.js";import"./chunk-FMREIR6A.js";import"./chunk-MENUYYDR.js";import"./chunk-FHJZZIAO.js";import"./chunk-2T5DYFEN.js";import"./chunk-JIDRUHKY.js";import"./chunk-YCBJ5FHL.js";import"./chunk-NONJMAAF.js";import"./chunk-Q7KEQOCZ.js";import"./chunk-ESIBJFWT.js";import"./chunk-U7XNP6KE.js";import"./chunk-PLEWWF6Z.js";import"./chunk-HYEZWSH6.js";import"./chunk-BZBOBPE4.js";import"./chunk-LGKOF6SU.js";import"./chunk-KJVVMFPV.js";import"./chunk-GDFURPOT.js";import"./chunk-6764LP7U.js";import"./chunk-QKMXDYYI.js";import"./chunk-2F7DB24L.js";import"./chunk-AHIMJGAR.js";import"./chunk-H7PQ2ZKL.js";import"./chunk-XXD2S4BV.js";import"./chunk-K2NEFY4Z.js";import"./chunk-HP7NJF3J.js";import"./chunk-C72BMBWH.js";import"./chunk-MP4HMVYC.js";import"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import"./chunk-WD5G2AXB.js";import"./chunk-MHZC233D.js";import"./chunk-3C7O5H7L.js";import"./chunk-R24F5SOK.js";import"./chunk-P3EQXKJ7.js";import{j as x,k as C}from"./chunk-YSJD33JQ.js";import{o,rb as l}from"./chunk-KWIQ74SK.js";import"./chunk-7PJSEK45.js";import"./chunk-TYRC5IHT.js";import"./chunk-K6SPXOGF.js";import"./chunk-UKIEYEQ5.js";import"./chunk-RTLU3EDP.js";import"./chunk-XEZHZYHW.js";import"./chunk-D6DH2FN4.js";import"./chunk-WHWVEQ4K.js";import"./chunk-QLNQOJCN.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-W3KE72YO.js";import"./chunk-VBZS3GR4.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import{Pa as r,Xa as y,kb as B}from"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import{m as d}from"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as v}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as S,h as p,n as u}from"./chunk-XJB76KNJ.js";p();u();var n=S(v());var M=o.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`,D=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`,P=o(l).attrs({size:28,weight:500,color:"#FFF"})`
  margin: 16px;
`,V=o(l).attrs({size:14,weight:400,lineHeight:17,color:"#999"})`
  max-width: 275px;

  span {
    color: white;
  }
`,$=o(h)`
  width: 100%;
  margin-top: 32px;
`,q=({networkId:t,token:a})=>{let{t:i}=d(),{handleHideModalVisibility:f}=b(),m=(0,n.useCallback)(()=>{f("insufficientBalance")},[f]),w=t&&y(B(r.getChainID(t))),{canBuy:F,openBuy:k}=g(w||"","modal","fiatOnrampFromInsufficientBalance"),e=t?r.getTokenSymbol(t):i("tokens");return n.default.createElement(M,null,n.default.createElement("div",null,n.default.createElement(D,null,n.default.createElement(I,{type:"failure",backgroundWidth:75}),n.default.createElement(P,null,i("insufficientBalancePrimaryText",{tokenSymbol:e})),n.default.createElement(V,null,i("insufficientBalanceSecondaryText",{tokenSymbol:e})),a?n.default.createElement($,{roundedTop:!0,roundedBottom:!0},n.default.createElement(c,{label:i("insufficientBalanceRemaining")},n.default.createElement(s,{color:"#EB3742"},`${a.balance} ${e}`)),n.default.createElement(T,{gap:1}),n.default.createElement(c,{label:i("insufficientBalanceRequired")},n.default.createElement(s,null,`${a.required} ${e}`))):null)),F?n.default.createElement(C,{primaryText:i("buyAssetInterpolated",{tokenSymbol:e}),onPrimaryClicked:k,secondaryText:i("commandCancel"),onSecondaryClicked:m}):n.default.createElement(x,{onClick:m},i("commandCancel")))},Q=q;export{q as InsufficientBalance,Q as default};
//# sourceMappingURL=InsufficientBalance-C3A6N55Y.js.map
