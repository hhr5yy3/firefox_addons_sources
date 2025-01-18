import{a as F}from"./chunk-IOYAAKXP.js";import{a as b}from"./chunk-HEKERJFX.js";import{a as w}from"./chunk-43EFDBRI.js";import"./chunk-ON463HRP.js";import"./chunk-AXLC6CXS.js";import"./chunk-4GILUK27.js";import"./chunk-JFQRFZX3.js";import"./chunk-LVMBU3FX.js";import"./chunk-MUB4J7OI.js";import{Ma as T,z as x}from"./chunk-YZCUSBGT.js";import"./chunk-KXI2KMWF.js";import"./chunk-FMREIR6A.js";import"./chunk-MENUYYDR.js";import"./chunk-FHJZZIAO.js";import"./chunk-2T5DYFEN.js";import"./chunk-JIDRUHKY.js";import"./chunk-YCBJ5FHL.js";import"./chunk-NONJMAAF.js";import"./chunk-Q7KEQOCZ.js";import"./chunk-ESIBJFWT.js";import"./chunk-U7XNP6KE.js";import"./chunk-PLEWWF6Z.js";import"./chunk-HYEZWSH6.js";import"./chunk-BZBOBPE4.js";import"./chunk-LGKOF6SU.js";import"./chunk-KJVVMFPV.js";import"./chunk-GDFURPOT.js";import{h as g}from"./chunk-6764LP7U.js";import"./chunk-QKMXDYYI.js";import"./chunk-2F7DB24L.js";import{a as y}from"./chunk-AHIMJGAR.js";import"./chunk-H7PQ2ZKL.js";import"./chunk-XXD2S4BV.js";import"./chunk-K2NEFY4Z.js";import"./chunk-HP7NJF3J.js";import"./chunk-C72BMBWH.js";import"./chunk-MP4HMVYC.js";import"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import"./chunk-WD5G2AXB.js";import"./chunk-MHZC233D.js";import"./chunk-3C7O5H7L.js";import"./chunk-R24F5SOK.js";import"./chunk-P3EQXKJ7.js";import{j as P}from"./chunk-YSJD33JQ.js";import{o as i}from"./chunk-KWIQ74SK.js";import{Na as R,ab as h,bb as C,ja as f,qa as v,ya as S}from"./chunk-7PJSEK45.js";import"./chunk-TYRC5IHT.js";import"./chunk-K6SPXOGF.js";import"./chunk-UKIEYEQ5.js";import"./chunk-RTLU3EDP.js";import{v as c}from"./chunk-XEZHZYHW.js";import"./chunk-D6DH2FN4.js";import"./chunk-WHWVEQ4K.js";import"./chunk-QLNQOJCN.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-W3KE72YO.js";import"./chunk-VBZS3GR4.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import{$d as u}from"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import{m as d}from"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as M}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as I,h as l,n as m}from"./chunk-XJB76KNJ.js";l();m();var e=I(M());var D=i.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
  padding: 16px 16px ${78}px; // footer height + padding
`,E=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,H=i.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  position: absolute;
  bottom: 0;
`,Q=i.div`
  background-color: #2a2a2a;
  border-radius: 6px;
  width: 100%;

  > *:first-child {
    border-bottom: 1px solid #222222;
  }
`,W=()=>{let{t}=d(),{handleHideModalVisibility:r}=T(),{pushDetailView:n}=g(),{resume:p}=v(),o=f(a=>a.quoteResponse),{data:s}=u(),V=(0,e.useMemo)(()=>s?.addresses.find(a=>a.networkID===o?.sellToken.chainId),[s,o]);(0,e.useEffect)(()=>{R()},[]),c(V,"SWAP_FUNGIBLE");let B=(0,e.useCallback)(()=>n(e.default.createElement(b,null)),[n]),k=S({goToConfirmation:B}),A=(0,e.useCallback)(()=>{p(),r("swapReview")},[r,p]);return{...k,hideSwapReview:A,t}},q=e.default.memo(({buyToken:t,sellToken:r,hideSwapReview:n,onSwap:p,t:o})=>{let{infoRowDisplayStrategy:s}=C();return e.default.createElement(D,null,e.default.createElement(E,null,e.default.createElement(x,{leftButton:{type:"close",onClick:n}},o("swapReviewFlowPrimaryText")),e.default.createElement(Q,null,e.default.createElement(w,{...r,title:o("swapReviewFlowYouPay")}),e.default.createElement(w,{...t,title:o("swapReviewFlowYouReceive")})),e.default.createElement(F,{isSwapReview:!0,rowDisplayStrategy:s})),e.default.createElement(H,null,e.default.createElement(y,{removeFooterExpansion:!0,removeShadowFooter:!0},e.default.createElement(P,{theme:"primary",onClick:p},o("swapReviewFlowActionButtonPrimary")))))}),N=()=>{let t=W();return e.default.createElement(h,null,e.default.createElement(q,{...t}))},Y=()=>e.default.createElement(N,null),ne=Y;export{Y as SwapReviewPage,ne as default};
//# sourceMappingURL=SwapReviewPage-DYU5RLFB.js.map
