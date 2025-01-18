import{c as f,d as g,e as A,j as k}from"./chunk-QAQXNWR7.js";import"./chunk-7V76OJ4M.js";import{a as h}from"./chunk-MUB4J7OI.js";import"./chunk-HYEZWSH6.js";import"./chunk-5Q6RGSEY.js";import"./chunk-MP4HMVYC.js";import{c as m,n as l,t as u}from"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import{o as e,rb as x,za as d}from"./chunk-KWIQ74SK.js";import"./chunk-TYRC5IHT.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import{J as r}from"./chunk-SBICKOM7.js";import{m as c}from"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as T}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as E,h as p,n as a}from"./chunk-XJB76KNJ.js";p();a();var t=E(T());var _=e.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 6px;
`,w=e.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,S=e.div`
  background: #2a2a2a;
  border-radius: 6px;
  padding: 12px 16px;
`,I=e.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  width: fit-content;
  margin-bottom: 8px;

  > span {
    min-height: 14px !important;
    height: 14px !important;
    min-width: 14px !important;
    width: 14px !important;
    border-radius: 3px !important;
  }
`,W=e.div`
  display: flex;
  gap: 16px;
`,b=e.div`
  padding: 27px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`,G=t.default.memo(({requestId:i})=>{let{t:n}=c(),s=k(),[o,y]=(0,t.useState)(!1),C=(0,t.useCallback)(()=>{s({jsonrpc:"2.0",id:i,result:o?r.user_selectEthWallet.result.enum.ALWAYS_USE_PHANTOM:r.user_selectEthWallet.result.enum.CONTINUE_WITH_PHANTOM})},[i,s,o]),M=(0,t.useCallback)(()=>{s({jsonrpc:"2.0",id:i,result:o?r.user_selectEthWallet.result.enum.ALWAYS_USE_METAMASK:r.user_selectEthWallet.result.enum.CONTINUE_WITH_METAMASK})},[i,s,o]);return t.default.createElement(g,null,t.default.createElement(f,{style:{display:"flex",alignItems:"center"}},t.default.createElement(b,null,t.default.createElement(h,{icon:t.default.createElement(W,null,t.default.createElement(m.LogoFill,{size:64,color:"accentPrimary"}),t.default.createElement(d,{width:64,height:64})),primaryText:n("whichExtensionToConnectWith"),headerStyle:"small"}))),t.default.createElement(A,{plain:!0},t.default.createElement(_,null,t.default.createElement(w,null,t.default.createElement(l,{onClick:M,testID:"select_wallet--metamask"},n("useMetaMask"))),t.default.createElement(w,null,t.default.createElement(l,{theme:"primary",onClick:C,testID:"select_wallet--phantom"},n("usePhantom"))),t.default.createElement(S,null,t.default.createElement(I,null,t.default.createElement(u,{checked:o,onChange:()=>y(!o),label:{text:n("dontAskMeAgain"),color:"textPrimary"},variant:{shape:"square"}})),t.default.createElement(x,{color:"#777777",size:13,weight:500,lineHeight:16,textAlign:"left"},n("configureInSettings"))))))}),L=G;export{G as EthSelectWallet,L as default};
//# sourceMappingURL=EthSelectWallet-QAYGVHOD.js.map
