import{a as g,b as _}from"./chunk-GB2HS422.js";import{a as u,b as P,m as N}from"./chunk-BZBOBPE4.js";import{c as D}from"./chunk-LGKOF6SU.js";import{a as v}from"./chunk-GDFURPOT.js";import{m as I,n as S}from"./chunk-6764LP7U.js";import{a as T,g as b}from"./chunk-6ZZIWD2R.js";import{j as H}from"./chunk-YSJD33JQ.js";import{o as t,rb as c,z as B}from"./chunk-KWIQ74SK.js";import{Bb as k,Pa as A,Pb as y,Sc as w}from"./chunk-QTEEUEUK.js";import{m as h}from"./chunk-QLCKU4H4.js";import{a as x}from"./chunk-335V6TFQ.js";import{f as l,h as a,n as m}from"./chunk-XJB76KNJ.js";a();m();var s=l(x());var oo=s.default.memo(({chainAddress:n,onQRClick:p})=>{let{networkID:d,address:e}=n,{buttonText:i,copied:f,copy:C}=g(e),E=y(e,4),L=w(n.networkID),M=(0,s.useCallback)(O=>{O.stopPropagation(),C()},[C]);return s.default.createElement(b,{copied:f,copiedText:i,formattedAddress:E,networkBadge:s.default.createElement(N,{networkID:d,address:e}),networkLogo:s.default.createElement(u,{networkID:d,size:40}),networkName:L,onCopyClick:M,onQRClick:p})});a();m();var W=l(_()),o=l(x());a();m();var r=l(x());var j=t.div`
  width: 100%;
`,F=t(D)`
  background: #181818;
  border: 1px solid #2f2f2f;
  border-radius: 6px 6px 0 0;
  border-bottom: none;
  margin: 0;
  padding: 16px 22px;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  text-align: center;
  resize: none;
  overflow: hidden;
`,U=t.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #181818;
  border: 1px solid #2f2f2f;
  border-radius: 0 0 6px 6px;
  border-top: none;
  height: 40px;
  width: 100%;
  padding: 0;
  cursor: pointer;

  &:hover {
    background: #1c1c1c;
  }
`,q=t(c).attrs({size:16,weight:600,lineHeight:16})`
  margin-left: 6px;
`,Q=({value:n})=>{let{buttonText:p,copy:d}=g(n),e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{(()=>{if(e&&e.current){let f=e.current.scrollHeight;e.current.style.height=f+"px"}})()},[]),r.default.createElement(j,null,r.default.createElement(F,{ref:e,readOnly:!0,value:n}),r.default.createElement(U,{onClick:d},r.default.createElement(B,null),r.default.createElement(q,null,p)))};var G=48,Bo=o.default.memo(({address:n,networkID:p,headerType:d,onCloseClick:e})=>{let{t:i}=h();return o.default.createElement(o.default.Fragment,null,o.default.createElement(d==="page"?I:S,null,i("depositAddress")),o.default.createElement(P,null,o.default.createElement(v,{align:"center",justify:"center",id:"column"},o.default.createElement(Z,{id:"QRCodeWrapper"},o.default.createElement(R,{value:n,size:160,level:"Q",id:"styledqrcode"}),o.default.createElement(u,{networkID:p,size:G,borderColor:"bgWallet",className:T({position:"absolute"})}))),o.default.createElement(c,{size:16,lineHeight:22,weight:600,margin:"16px 0 8px"},i("depositAddressChainInterpolated",{chain:A.getNetworkName(p)})),o.default.createElement(Q,{value:n}),o.default.createElement(c,{size:14,color:"#777777",lineHeight:20,margin:"16px 0"},i("depositAssetSecondaryText")," ",o.default.createElement(J,{href:k,target:"_blank",rel:"noopener noreferrer"},i("commandLearnMore")))),o.default.createElement(H,{onClick:e},i("commandClose")))}),R=t(W.default)`
  padding: 8px;
  background: #ffffff;
  border-radius: 6px;
  position: relative;
`,Z=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`,J=t.a`
  color: #ab9ff2;
  text-decoration: none;
  font-weight: 500;
`;export{oo as a,Q as b,Bo as c};
//# sourceMappingURL=chunk-OGURXC7L.js.map
