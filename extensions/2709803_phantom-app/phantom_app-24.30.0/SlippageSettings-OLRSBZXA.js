import{Ma as T,z as b}from"./chunk-YZCUSBGT.js";import"./chunk-KXI2KMWF.js";import"./chunk-FMREIR6A.js";import"./chunk-MENUYYDR.js";import"./chunk-FHJZZIAO.js";import"./chunk-2T5DYFEN.js";import"./chunk-JIDRUHKY.js";import"./chunk-YCBJ5FHL.js";import"./chunk-NONJMAAF.js";import"./chunk-Q7KEQOCZ.js";import"./chunk-ESIBJFWT.js";import"./chunk-U7XNP6KE.js";import"./chunk-PLEWWF6Z.js";import"./chunk-HYEZWSH6.js";import"./chunk-BZBOBPE4.js";import"./chunk-LGKOF6SU.js";import"./chunk-KJVVMFPV.js";import"./chunk-GDFURPOT.js";import"./chunk-6764LP7U.js";import{a as v}from"./chunk-QKMXDYYI.js";import"./chunk-2F7DB24L.js";import"./chunk-AHIMJGAR.js";import"./chunk-H7PQ2ZKL.js";import"./chunk-XXD2S4BV.js";import"./chunk-K2NEFY4Z.js";import"./chunk-HP7NJF3J.js";import"./chunk-C72BMBWH.js";import"./chunk-MP4HMVYC.js";import{S as H,b as g,d,e as m,f as O,n as V}from"./chunk-6ZZIWD2R.js";import"./chunk-J6OUJ52S.js";import"./chunk-WD5G2AXB.js";import"./chunk-MHZC233D.js";import"./chunk-3C7O5H7L.js";import"./chunk-R24F5SOK.js";import"./chunk-P3EQXKJ7.js";import{j as $}from"./chunk-YSJD33JQ.js";import{o as s,ra as w,rb as S}from"./chunk-KWIQ74SK.js";import{Ba as C}from"./chunk-7PJSEK45.js";import"./chunk-TYRC5IHT.js";import"./chunk-K6SPXOGF.js";import"./chunk-UKIEYEQ5.js";import"./chunk-RTLU3EDP.js";import"./chunk-XEZHZYHW.js";import"./chunk-D6DH2FN4.js";import"./chunk-WHWVEQ4K.js";import"./chunk-QLNQOJCN.js";import"./chunk-FQY2XTIJ.js";import"./chunk-XQSQGLPB.js";import"./chunk-XCHZAS53.js";import"./chunk-W3KE72YO.js";import"./chunk-VBZS3GR4.js";import"./chunk-T4L6EP5D.js";import"./chunk-QSQTX44W.js";import"./chunk-6E56T6PG.js";import"./chunk-R3RTTMHX.js";import"./chunk-APGMW4RI.js";import"./chunk-HAQ4DJZR.js";import"./chunk-QTEEUEUK.js";import"./chunk-SBICKOM7.js";import"./chunk-QLCKU4H4.js";import"./chunk-GHLG6R56.js";import"./chunk-KYG6C6PS.js";import{Ya as I}from"./chunk-OJ65X4PZ.js";import"./chunk-WJHU72V4.js";import{a as F}from"./chunk-335V6TFQ.js";import"./chunk-BVBFOJLU.js";import{f as k,h,n as x}from"./chunk-XJB76KNJ.js";h();x();var P=k(F());h();x();var o=k(F());var E=s.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`,W=s.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 16px;
  width: 100%;
`,M=s(S).attrs({size:28,lineHeight:32,weight:600,color:"#fff"})`
  margin: 20px 0 12px;
`,U=s(S).attrs({size:16,lineHeight:18,weight:400,color:"#777777"})`
  margin-bottom: 32px;
`,Y=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 2px;
  width: 100%;
  background-color: ${t=>t.theme.backgroundDark};
`,X=s.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 10px 8px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${t=>t.selected?"#AB9FF2":"transparent"};
  cursor: pointer;
`,B=s(S).attrs(t=>({size:14,lineHeight:18,weight:t.selected?600:500,color:t.selected?"#222":"#fff"}))`
  text-align: center;
`,_=s(S).attrs(t=>({size:14,lineHeight:18,weight:500,color:t.severity==="critical"?"#EB3742":"#FFDC62"}))`
  align-self: stretch;
  margin-top: 8px;
  text-align: left;
`,q=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`,G=s.input`
  background: transparent;
  color: #222;
  ::placeholder {
    color: #22222299;
  }
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  text-align: right;
  border: none;
  padding: 0;
`,J=()=>{let{handleHideModalVisibility:t}=T(),r=(0,o.useCallback)(()=>{t("slippageSettings")},[t]);return C({onDismiss:r})},K=({options:t,selectedIndex:r,customSlippageValue:n,i18nStrings:i,error:c,submitDisabled:u,onConfirm:a,onSelectOption:l,onChangeCustomSlippage:p,onDismiss:f})=>o.default.createElement(E,null,o.default.createElement(b,{leftButton:{type:"close",onClick:f},titleSize:"small"},i.title),o.default.createElement(W,null,o.default.createElement(v,{diameter:96,color:"#181818"},o.default.createElement(w,{width:38,fill:"#181818"})),o.default.createElement(M,null,i.title),o.default.createElement(U,null,i.subtitle),o.default.createElement(Z,{options:t,selectedIndex:r,customOptionLabel:i.custom,customOptionValue:n,onSelectOption:l,onCustomOptionChange:p}),c?o.default.createElement(_,{severity:c.severity},c.message):null),o.default.createElement($,{disabled:u,theme:"primary",onClick:a},i.button)),N=()=>{let t=J();return o.default.createElement(K,{...t})},z=N,Q=({value:t,onChangeText:r})=>{let n=i=>{i.target.validity.valid?r(i.target.value):i.preventDefault()};return o.default.createElement(q,null,o.default.createElement(G,{autoFocus:!t,placeholder:"0.00%",value:t??"",style:t?{width:`${t.length*10}px`,textAlign:"right"}:{width:"100%",textAlign:"center"},onChange:n}),o.default.createElement(B,{selected:!0},t?"%":""))},Z=({options:t,selectedIndex:r,customOptionLabel:n,customOptionValue:i,onSelectOption:c,onCustomOptionChange:u})=>o.default.createElement(Y,null,t.map((a,l)=>{let p=l===r,f=l===t.length-1&&p,y=()=>c(l);return o.default.createElement(X,{key:`segment-control-option-${l}`,selected:p,onClick:y},f?o.default.createElement(Q,{value:i,onChangeText:u}):o.default.createElement(B,{selected:p},a==="custom"?n:a))}));h();x();var e=k(F());var R=s.input`
  background: transparent;
  text-align: center;
  border: none;
  padding: 0;
  font-style: ${g.typography.font.bodySemibold.letterSpacing};
  font-size: ${g.typography.font.bodySemibold.fontSize};
  font-weight: ${g.typography.font.bodySemibold.fontWeight};
  line-height: ${g.typography.font.bodySemibold.lineHeight};
  color: ${g.colors.legacy.textPrimary};
  ::placeholder {
    color: ${g.colors.legacy.textTertiary};
  }
`,tt=({value:t,onChangeText:r})=>{let n=i=>{i.target.validity.valid?r(i.target.value):i.preventDefault()};return e.default.createElement(d,{display:"flex",direction:"row",alignItems:"center",justifyContent:"center",width:"100%"},e.default.createElement(R,{autoFocus:!t,placeholder:"0.00%",value:t??"",style:t?{width:`${t.length*10}px`,textAlign:"right"}:{width:"100%",textAlign:"center",minWidth:g.space.positive[48]},onChange:n}),t&&e.default.createElement(m,{font:"bodySemibold",color:"textPrimary"},"%"))},et=({options:t,selectedIndex:r,customOptionLabel:n,customOptionValue:i,onSelectOption:c,onCustomOptionChange:u})=>e.default.createElement(d,{display:"flex",direction:"row",alignItems:"center",justifyContent:"center",borderRadius:"row",width:"100%"},t.map((a,l)=>{let p=l===r,f=l===t.length-1&&p,y=()=>c(l);return e.default.createElement(d,{key:`segment-control-option-${l}`,display:"flex",flex:1,direction:"row",paddingX:20,paddingY:14,alignItems:"center",justifyContent:"center",borderRadius:"row",backgroundColor:p?"bgRow":void 0,onPress:y,minWidth:24},f?e.default.createElement(tt,{value:i,onChangeText:u}):e.default.createElement(m,{font:"bodySemibold",color:p?"textPrimary":"textSecondary",align:"center"},a==="custom"?n:a))})),ot=({customSlippageValue:t,error:r,i18nStrings:n,options:i,selectedIndex:c,submitDisabled:u,isAutoEnabled:a,autoLearnMoreUrl:l,onSelectOption:p,onChangeCustomSlippage:f,onConfirm:y,onToggleAutoSlippage:j,onDismiss:D})=>e.default.createElement(d,{height:"100%",overflowY:"auto",display:"flex",direction:"column",justifyContent:"space-between",padding:"screen"},e.default.createElement("div",null,e.default.createElement(b,{leftButton:{type:"close",onClick:D},titleSize:"small"},n.title),e.default.createElement(d,{display:"flex",gap:24,direction:"column",alignItems:"center",width:"100%"},e.default.createElement(d,{display:"flex",direction:"column",alignItems:"center"},e.default.createElement(v,{diameter:96,color:"#181818"},e.default.createElement(w,{width:38,fill:"#181818"})),e.default.createElement(m,{font:"heading2Semibold",color:"textPrimary",marginTop:20},n.title)),e.default.createElement(d,{width:"100%"},e.default.createElement(O,{rounded:!0,topLeft:n.auto,end:e.default.createElement(H,{id:"auto-slippage-switch",checked:a,onChange:j})}),e.default.createElement(m,{marginTop:8,font:"caption",color:"textSecondary"},n.autoSubtitle," ",e.default.createElement(m,{font:"caption",color:"accentPrimary",onPress:()=>self.open(l,"_blank")},n.learnMore))),!a&&e.default.createElement(d,{gap:8,display:"flex",direction:"column",alignItems:"center"},e.default.createElement(et,{options:i,selectedIndex:c,customOptionLabel:n.custom,customOptionValue:t,onSelectOption:p,onCustomOptionChange:f}),e.default.createElement(m,{font:"caption",color:"textSecondary"},n.subtitle),r&&e.default.createElement(m,{font:"caption",color:r.severity==="critical"?"accentAlert":"accentWarning",alignSelf:"stretch"},r.message)))),e.default.createElement(V,{disabled:u,theme:"primary",onClick:y},n.button)),nt=()=>{let{handleHideModalVisibility:t}=T(),r=(0,e.useCallback)(()=>{t("slippageSettings")},[t]);return C({onDismiss:r})},L=()=>{let t=nt();return e.default.createElement(ot,{...t})};var it=()=>{let{data:[t]}=I(["enable-auto-slippage"]);return t?P.default.createElement(L,null):P.default.createElement(z,null)},Ot=it;export{it as SlippageSettings,Ot as default};
//# sourceMappingURL=SlippageSettings-OLRSBZXA.js.map
