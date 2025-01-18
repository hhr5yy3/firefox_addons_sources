import{a as U}from"./chunk-WD5G2AXB.js";import{a as C}from"./chunk-NKSPH4HU.js";import"./chunk-MHZC233D.js";import{b as I}from"./chunk-3C7O5H7L.js";import"./chunk-R24F5SOK.js";import{a as P}from"./chunk-P3EQXKJ7.js";import"./chunk-YSJD33JQ.js";import{d as L,l as T,o as a,rb as l,s as v}from"./chunk-KWIQ74SK.js";import{a as z,c as W}from"./chunk-HX5AQMSI.js";import{h as k,k as x}from"./chunk-7PJSEK45.js";import"./chunk-TYRC5IHT.js";import"./chunk-K6SPXOGF.js";import"./chunk-UKIEYEQ5.js";import"./chunk-RTLU3EDP.js";import"./chunk-XEZHZYHW.js";import"./chunk-D6DH2FN4.js";import"./chunk-WHWVEQ4K.js";import{a as y}from"./chunk-QLNQOJCN.js";import{a as B}from"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-W3KE72YO.js";import"./chunk-VBZS3GR4.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import{m as S}from"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import{qa as O}from"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as b}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as p,h as n,n as s}from"./chunk-XJB76KNJ.js";n();s();var w=p(b());var E=p(z());n();s();var e=p(b());n();s();var r=p(b());var m="#ca3214",K=a.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fffdf8;
  padding: clamp(24px, 16vh, 256px) 24px;
  box-sizing: border-box;
`,$=a.div`
  margin-bottom: 24px;
  padding-bottom: 8vh;
`,A=a.div`
  max-width: 100ch;
  margin: auto;

  * {
    text-align: left;
  }
`,N=a.a`
  text-decoration: underline;
  color: ${m};
`,d=new y,D=({origin:i,subdomain:t})=>{let{t:g}=S(),c=i?x(i):"",J=i??"",f=new URL(J).hostname,u=t==="true"?f:c,M=async()=>{if(t==="true"){let h=await d.get("userWhitelistedSubdomains"),o=JSON.parse(`${h}`);o?o.push(f):o=[f],o=[...new Set(o)],d.set("userWhitelistedSubdomains",JSON.stringify(o))}else{let h=await d.get("userWhitelistedOrigins"),o=JSON.parse(`${h}`);o?o.push(c):o=[c],o=[...new Set(o)],d.set("userWhitelistedOrigins",JSON.stringify(o))}self.location.href=i};return r.default.createElement(K,null,r.default.createElement(A,null,r.default.createElement($,null,r.default.createElement(v,{width:128,fill:"#bbb9b6"})),r.default.createElement(l,{size:30,color:m,weight:"600"},g("blocklistOriginDomainIsBlocked",{domainName:u||g("blocklistOriginThisDomain")})),r.default.createElement(l,{color:m},g("blocklistOriginSiteIsMalicious")),r.default.createElement(l,{color:m},r.default.createElement(U,{i18nKey:"blocklistOriginCommunityDatabaseInterpolated"},"This site has been flagged as part of a",r.default.createElement(N,{href:k,rel:"noopener",target:"_blank"},"community-maintained database"),"of known phishing websites and scams. If you believe the site has been flagged in error,",r.default.createElement(N,{href:k,rel:"noopener",target:"_blank"},"please file an issue"),".")),u?r.default.createElement(l,{color:m,onClick:M,hoverUnderline:!0},g("blocklistOriginIgnoreWarning",{domainName:i})):r.default.createElement(r.default.Fragment,null)))};var G=()=>{let i;try{i=new URLSearchParams(self.location.search).get("origin")||"",new URL(i)}catch{i=""}return i},H=()=>new URLSearchParams(self.location.search).get("subdomain")||"",_=()=>{let i=(0,e.useMemo)(G,[]),t=(0,e.useMemo)(H,[]);return e.default.createElement(L,{future:{v7_startTransition:!0}},e.default.createElement(I,null,e.default.createElement(D,{origin:i,subdomain:t})))};B();O.init({provider:C});W();var j=document.getElementById("root"),q=(0,E.createRoot)(j);q.render(w.default.createElement(T,{theme:P},w.default.createElement(_,null)));
//# sourceMappingURL=Phishing.js.map
