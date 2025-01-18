import{a as O,c as V}from"./chunk-T45F2HJ2.js";import{a as G}from"./chunk-2F7DB24L.js";import{j as W}from"./chunk-YSJD33JQ.js";import{$a as M,Ma as I,Na as d,Oa as p,Pa as g,Qa as S,Ra as f,Sa as x,Ta as k,Ua as y,Va as w,Wa as L,Xa as T,Ya as v,Za as C,_a as P,ab as b,bb as a,cb as D,o,rb as F}from"./chunk-KWIQ74SK.js";import{c as l}from"./chunk-QLNQOJCN.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import{b as u}from"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as h}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as m,h as i,n as c}from"./chunk-XJB76KNJ.js";i();c();var t=m(h());i();c();var A=m(h());var z={[G]:a,vote:y,"vote-2":w,stake:L,"stake-2":T,view:v,chat:C,tip:P,mint:M,"mint-2":b,"generic-link":a,"generic-add":D,discord:I,twitter:d,"twitter-2":p,x:p,instagram:g,telegram:S,leaderboard:k,gaming:f,"gaming-2":x};function B({icon:s,...n}){let r=z[s];return A.default.createElement(r,{...n})}var E=o.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -16px; // compensate for generic screen margins
`,H=o.footer`
  margin-top: auto;
  flex-shrink: 0;
  min-height: 16px;
`,Y=o.div`
  overflow: scroll;
`,_=o.ul`
  flex: 1;
  max-height: 350px;
  padding-top: 16px; // compensate for the override of the generic screen margins
`,j=o.li``,q=o.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
`,N=o(F)`
  text-align: left;
`;N.defaultProps={margin:"12px 0px"};function J({shortcuts:s,...n}){let r=(0,t.useMemo)(()=>n.hostname.includes("//")?new URL(n.hostname).hostname:n.hostname,[n.hostname]);return t.default.createElement(E,null,t.default.createElement(Y,null,t.default.createElement(_,null,s.map(e=>t.default.createElement(j,{key:e.uri},t.default.createElement(W,{type:"button",onClick:()=>{l.capture("walletShortcutsLinkOpenClick",O(n,e)),self.open(e.uri)},theme:"text",paddingY:6},t.default.createElement(q,null,t.default.createElement(B,{icon:V(e.uri,e.icon)})),e.label))))),t.default.createElement(H,null,r&&t.default.createElement(N,{color:"#777777",size:14,lineHeight:17},u("shortcutsWarningDescription",{url:r}))))}var ct=J;export{J as ShortcutsModal,ct as default};
//# sourceMappingURL=ShortcutsModal-SQZSPB7J.js.map
