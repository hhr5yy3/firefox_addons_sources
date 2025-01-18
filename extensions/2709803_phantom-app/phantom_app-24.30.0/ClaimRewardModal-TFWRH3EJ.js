import{a as I}from"./chunk-NUNHBQJD.js";import{a as M}from"./chunk-QKMXDYYI.js";import{a as B}from"./chunk-AHIMJGAR.js";import{ea as b}from"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import{h as E,j as m}from"./chunk-YSJD33JQ.js";import{Z as y,o as r,rb as a}from"./chunk-KWIQ74SK.js";import{b as F}from"./chunk-WHWVEQ4K.js";import"./chunk-XCHZAS53.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-HAQ4DJZR.js";import"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import{m as T}from"./chunk-QLCKU4H4.js";import{S as l}from"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as v}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as q,h as g,n as h}from"./chunk-XJB76KNJ.js";g();h();var o=q(v());var d=r.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  justify-content: space-between;
`,p=r.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`,P=r(M)`
  margin-bottom: 20px;
`,u=r(a).attrs({size:28,weight:500})`
  margin-bottom: 8px;
  max-width: 85%;
`,C=r(a).attrs({size:16,weight:400,color:"#777"})`
  max-width: 85%;
`,Q=r.img`
  width: 225px;
  margin-bottom: 24px;
`,f=r(B)`
  height: auto;
  margin: 16px;
`,S=t=>{let{questId:i,networkIds:s}=t,{mutateAsync:n,data:e,isPending:x,isIdle:c,isError:w}=F(),k=async()=>{try{await n({questId:i,networkIds:s})}catch{}};return I(()=>{k()},i!==void 0&&s.length>0),(0,o.useMemo)(()=>({...t,data:e,isError:w,isLoading:x||c}),[t,e,x,c,w])},z=o.default.memo(({data:t,isLoading:i,isError:s,onPressDismiss:n})=>{let{t:e}=T();return i?o.default.createElement(d,null,o.default.createElement(p,null,o.default.createElement(P,{diameter:94,color:l("#AB9FF2",.2)},o.default.createElement(E,{diameter:60})),o.default.createElement(u,null,e("questsClaimInProgress")),o.default.createElement(C,null,e("questsVerifyingCompletion"))),o.default.createElement(f,{removeFooterExpansion:!0},o.default.createElement(m,{onClick:n},e("commandDismiss")))):s?o.default.createElement(d,null,o.default.createElement(p,null,o.default.createElement(P,{diameter:94,color:l("#EB3742",.2)},o.default.createElement(y,{width:30,height:30,fill:"#EB3742"})),o.default.createElement(u,null,e("questsClaimError")),o.default.createElement(C,null,e("questsClaimErrorDescription"))),o.default.createElement(f,{removeFooterExpansion:!0},o.default.createElement(m,{onClick:n},e("commandDismiss")))):t?o.default.createElement(d,null,o.default.createElement(b,null),o.default.createElement(p,null,o.default.createElement(Q,{src:t.imageUrl}),o.default.createElement(u,null,t.title),o.default.createElement(C,null,t.description)),o.default.createElement(f,{removeFooterExpansion:!0},o.default.createElement(m,{onClick:n},e("commandDismiss")))):null}),A=t=>{let i=S(t);return o.default.createElement(z,{...i})},Z=A;export{Z as default};
//# sourceMappingURL=ClaimRewardModal-TFWRH3EJ.js.map
