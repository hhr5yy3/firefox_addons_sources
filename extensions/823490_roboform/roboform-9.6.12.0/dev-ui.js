// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
(self.rf_vlu7ce9uien=self.rf_vlu7ce9uien||[]).push([[523],{35578:function(){},92627:function(a,b,c){"use strict"
;var d=c(8144),e=c(53895),f=c(1630),g=c(66423),h=c(5197),i=c(34943);(0,c(78440).fI)((0,d.K)((0,e.x)(null),(0,f.q)((0,h.T)()),(0,
i.Q)(),(0,g.k)()))},8144:function(a,b,c){"use strict";c.d(b,{K:function(){return n}})
;var d=c(1975),e=c(31173),f=c(40868),g=c(63956),h=c(78440),i=c(69893),j=c(12190),k=c(73863),l=c(95399),m=c(4153);c(13117),
c(35578);async function n(a,b,c,n){const o=a,p=function(a,b,c,n){var o,p,q;const r=a,s=b,t=c
;let u,v=[],w=null,x=null,y=null,z="layout",A=null,B=null,C=null,D="9.6.12.0",E=null!==(o=null===navigator||void 0===navigator?void 0:navigator.platform)&&void 0!==o?o:"",F=null!==(p=null===navigator||void 0===navigator?void 0:navigator.userAgent)&&void 0!==p?p:"",G="",H=null!==(q=null===navigator||void 0===navigator?void 0:navigator.language)&&void 0!==q?q:""
;const I={Init:J,SetViewMode:K,Update:L,onDisconnectFromUpdateEvents:null};return I;function J(){v=[],w=null,x=null,y=null,
z="layout",A=null;ah(".header .text-json-view .set-mode").addEventListener("change",O)
;ah(".header .layout-view .set-mode").addEventListener("change",P)
;ah(".header .list-view .set-mode").addEventListener("change",Q)
;ah(".header .details-view .set-mode").addEventListener("change",R),window.addEventListener("resize",(function(){B&&B()}),!0)
;ah(".history-container .current-page").addEventListener("click",N);ah("#load-report").addEventListener("click",(()=>{
I.onDisconnectFromUpdateEvents&&I.onDisconnectFromUpdateEvents(),(0,h.uT)((async()=>{try{await M()}catch(a){
alert("Cannot load report file: "+(0,i.EB)(a))}})(),"#load-report:click")}));ah("#save-report").addEventListener("click",(()=>{
const a=w;if(a){let b;a.m_web_page_data&&(b=(0,d.MZ)(a.m_web_page_data));const c=(0,l.Mv)()-3e5,e=[];for(const a of v){
const b=a.m_record;if(b.m_time<=c)break;if(b.m_web_page_data){const c=(0,d.MZ)(b.m_web_page_data);e.push({
m_info:Object.assign(Object.assign({},b),{m_web_page_data:c}),m_forms:a.m_forms})}else e.push({m_info:b})}const i={
m_diagnostic_info:{m_web_page_url:(null==b?void 0:b.m_url)||"",m_web_page_domain:(null==b?void 0:b.m_domain)||"",
m_app_window:a.m_app_window,m_web_page_data:b,m_analyzed_forms:a.m_analyzed_forms,m_history:e},m_extension_version:D,m_os:E,
m_browser:F,m_browser_version:G,m_browser_language:H};(0,h.fI)((async()=>{await(0,g.WN)("rf-diagnostic-info.json",await(0,
f.zN)((0,k.Ex)(i)),"application/json")})())}}));ah("#copy-webpagedata").addEventListener("click",(()=>{(0,h.uT)((async()=>{var a
;try{const b=null!==(a=null==w?void 0:w.m_web_page_data)&&void 0!==a?a:null;await t.WriteText((0,k.Ex)(b))}catch(b){
alert("Cannot load report file: "+(0,i.EB)(b))}})(),"#copy-webpagedata:click")}))
;ah("#close-history").addEventListener("click",(()=>{ah(".history-container").classList.add("hidden")})),aa(w),Z(null),V(T()),
ab(w)}function K(a){z=a}function L(a){w=a,aa(a),a.m_history&&0!==a.m_history.length&&Y(a.m_history,a.m_history_forms),V(T()),
null===x&&ab(w)}async function M(){var a,b,c,d,e,h;const j=await(0,g.tf)([".json",".zip"]);if(!j)return;let k,l
;if(document.title=`RoboForm Dev-UI - View: ${j.name}, ${new Date(j.lastModified).toLocaleString()}`,
"application/x-zip-compressed"===j.type){const a=await n.OpenZip(j)
;for(const b of a)if("rf-diagnostic-info.json"===b.m_file_name?k=await(0,
f.Z$)(b.m_bytes):"active-tab-screenshot.htm"===b.m_file_name&&(l=await(0,f.Z$)(b.m_bytes)),void 0!==k&&void 0!==l)break
;if(!k)throw(0,i.ZU)(i.V2,"File rf-diagnostic-info.json not found in ZIP")}else k=await(0,f.wv)(j);if(u=null,l){
const a=(new DOMParser).parseFromString(l,"text/xml").querySelector("img");a&&(u=a.getAttribute("src"))}
const m=JSON.parse(k),o=m.m_diagnostic_info;let p,q=null
;if(null===(a=null==o?void 0:o.m_web_page_data)||void 0===a?void 0:a.m_fields){const a=m.m_web_page_field_index;if(void 0!==a){
const b=o.m_web_page_data.m_fields[a];b&&(q=b.m_pos)}}
if(X(),null==o?void 0:o.m_history)for(const f of o.m_history)f.m_forms&&((p||(p={}))[f.m_info.m_id]=f.m_forms);C=q,
D=null!==(b=m.m_extension_version)&&void 0!==b?b:"",E=null!==(c=m.m_os)&&void 0!==c?c:"",
F=null!==(d=m.m_browser)&&void 0!==d?d:"",G=null!==(e=m.m_browser_version)&&void 0!==e?e:"",
H=null!==(h=m.m_browser_language)&&void 0!==h?h:"",L({m_app_window:null==o?void 0:o.m_app_window,
m_web_page_data:null==o?void 0:o.m_web_page_data,m_analyzed_forms:null==o?void 0:o.m_analyzed_forms,
m_history:(null==o?void 0:o.m_history)&&o.m_history.map((a=>a.m_info)),m_history_forms:p})}function N(){Z(null),V(T()),ab(w)}
function O(a){K("text-json"),ab(y)}function P(a){K("layout"),ab(y)}function Q(a){K("list"),ab(y)}function R(a){K("details"),
ab(y)}function S(a){let b,c;if(a)for(const d of v){const e=d.m_record;e.m_id===a&&(b=e,c=d.m_forms)}b?(Z(b),V(b.m_tab_id),ab({
m_web_page_data:b.m_web_page_data,m_analyzed_forms:c,m_app_window:w&&w.m_app_window||void 0})):(Z(null),V(T()),ab(w))}
function T(){return w&&w.m_web_page_data&&w.m_web_page_data.m_tab_id}function U(){
return y&&y.m_web_page_data&&y.m_web_page_data.m_tab_id}function V(a){if(v)for(const b of v){const c=b.m_view;if(!c)continue
;const d=c;b.m_record.m_tab_id===a?d.classList.add("hilited"):d.classList.remove("hilited")}}async function W(a,b){
return r.CallBackgroundScript("ActivateTab",null,null,a,{focus:b})}function X(){const a=ah(".history-container"),b=ah(a,"tbody")
;(0,g.h9)(b),v=[]}function Y(a,b){const c=ah(".history-container"),d=U(),e=ah(c,"template.item-row"),f=ah(c,"tbody")
;for(let g=a.length-1;g>=0;g--){
const c=a[g],i=c.m_web_page_data,j=document.importNode(e.content,!0),k=ah(j,".item"),l=ah(j,".item-row")
;c.m_time&&(ah(j,".time").textContent=new Date(c.m_time).toLocaleTimeString("en",{hour12:!1}));let m=""
;c.m_event&&(m=c.m_event.toUpperCase()),c.m_submit_reason&&(m+=" ["+c.m_submit_reason+"]"),
c.m_transition_type&&(m+=" ("+c.m_transition_type+")"),ah(j,".event").textContent=m;let n="";c.m_id&&(n=`id=${c.m_id}`,
l.id=`history-${c.m_id}`),c.m_tab_id&&(n+=" tab="+c.m_tab_id),c.m_frame_id&&(n+=" frame="+c.m_frame_id),
n&&(ah(j,".details").textContent=n,ah(j,".details").title=n);const o=c.m_url||(null==i?void 0:i.m_url);if(o&&((0,
h.fI)((async()=>{var a;ah(j,".url-icon").src=null!==(a=await s.GetWebSiteIconUrl(o,null))&&void 0!==a?a:""})()),
ah(j,".url").href=o,
ah(j,".url").textContent=o,ah(j,".url").title=o),"navigation"===c.m_event)k.addEventListener("click",(function(){const a=U()
;c.m_tab_id!==a&&(0,h.uT)((async()=>{await W(c.m_tab_id,!1)&&Z(null)})(),"_UpdatedHistoryRecordSelection")
}),!1);else l.classList.add("selectable"),k.addEventListener("click",(function(){(0,h.uT)((async()=>{await W(c.m_tab_id,!1),
S(c.m_id)})(),"_SelectHistoryRecord")}),!1);d===c.m_tab_id&&l.classList.add("hilited"),f.insertBefore(j,f.firstElementChild),
v.unshift({m_record:c,m_view:f.firstElementChild,m_forms:b&&b[c.m_id]||void 0})}}function Z(a){const b=a&&a.m_id
;if(x&&x===b)return;const c=ah(".history-container"),d=ah(c,".selected");d&&d.classList.remove("selected"),x=b
;const e=ah(".history-container .current-page");let f;if(b&&(f=ah(c,`#history-${b}`)),f||(f=e,x=null),
f&&f.classList.add("selected"),x){const b=T();a&&a.m_tab_id===b?e.classList.add("hilited"):e.classList.remove("hilited")
}else e.classList.add("hilited")}function aa(a){const b=a&&a.m_web_page_data,c=ah(".history-container .current-page");let d=""
;const e=b&&b.m_tab_id;if(e){d+=" tab="+e;const a=b&&b.m_opener_tab_id;a&&(d+=" ("+a+")")}ah(c,".details").textContent=d,
ah(c,".details").title=d;const f=(null==b?void 0:b.m_url)||"";f?(0,h.fI)((async()=>{var a
;ah(c,".url-icon").src=null!==(a=await s.GetWebSiteIconUrl(f,null))&&void 0!==a?a:""})()):ah(c,".url-icon").src="",
ah(c,".url").href=f,ah(c,".url").textContent=f,ah(c,".url").title=f}function ab(a){var b,c,d
;const f=y&&y.m_web_page_data,h=y&&y.m_app_window,i=a&&a.m_web_page_data,l=a&&a.m_app_window,n=f&&f.m_tab_id,o=h&&h.id,p=i&&i.m_tab_id,q=l&&l.id,r=n&&p&&n===p&&o===q
;y=a||{},y.m_web_page_data||(y.m_web_page_data={});const s={},t=[],v={},w={},x=(0,
m.TT)(y.m_web_page_data),I=y.m_analyzed_forms,J=I&&I.m_forms||[];for(let S=0;S<J.length;++S){
const T=J[S],U=T.m_type||"---",V=`${U}[${T.m_instance_index}]`;let W=0;void 0===w[V]?w[V]=0:W=++w[V];let X=""
;void 0!==T.m_mandatory_fields_percent&&T.m_mandatory_fields_percent<100&&(X+=` ${T.m_mandatory_fields_percent}%`)
;const Y=`#${S} ${V} Part[${W}] ${X}`;(v[U]||(v[U]=[])).push(Y);const Z=T.m_fields;for(const aa in Z){
const ab=Z[aa].m_web_page_field_indices;for(let ai=0;ai<ab.length;++ai){const aj=ab[ai],ak=(0,m.TT)(x.m_fields)[aj];if(ak){
const al=`${ak.m_frame_id}-${ak.m_id}`;s[al]||(s[al]={m_field_key:al,m_fields:[],m_form_names:[],m_form_types:[]})
;const am=ab.length>1?`${aa}(part ${ai})`:aa;s[al].m_fields.push(am),s[al].m_form_names.push(Y),s[al].m_form_types.push(U)}}}}
for(const an in v){const ao=v[an];for(const ap of ao)t.push(ap)}const K=A!==z;let L,M;switch(A=z,B=null,
ah(".header .url").textContent=x.m_url||"",ah(".header .url").href=x.m_url||"",ah(".header .title").textContent=x.m_title||"",
ah(".header .icon-image").src=x.m_icon||"",z){case"layout":L="layout-view";break;case"list":L="list-view";break;case"details":
L="details-view";break;default:L="text-json-view"}
const N=ah("template."+L),O=document.importNode(N.content,!0),P=(x.m_fields||[]).slice();let Q=-1;if(x.m_action_element){
const aq=x.m_action_element;if(aq.m_data){Q=P.length;const ar={m_id:aq.m_id,m_index:P.length,m_pos:aq.m_data.m_pos,
m_frame_id:(0,m.TT)(aq.m_frame_id),m_type:aq.m_data.m_type,m_visible:!0};P.push(ar)}else for(let as=0;as<P.length;as++){
const at=P[as];if(at.m_id===aq.m_id&&at.m_frame_id===aq.m_frame_id){Q=as;break}}}switch(z){case"list":{const au=ah(O,"tbody")
;if(0===P.length){const aw=ah(O,"template.empty"),ax=document.importNode(aw.content,!0);au.appendChild(ax)}else{
const ay=ah(O,"template.item");for(let az=0;az<P.length;az++){
const aA=P[az],aB=aA.m_id,aC=aA.m_frame_id,aD=`${aC||0}-${aB||0}`,aE=document.importNode(ay.content,!0),aF=ah(aE,".item")
;aF.classList.remove("visible","not-in-view-port","overlapped","selected","focused"),
aA.m_visible?aA.m_html&&aA.m_html.m_overlapped&&aF.classList.add("overlapped"):aF.classList.add("not-in-view-port"),
aA.m_html&&aA.m_html.m_selected&&aF.classList.add("selected"),aA.m_html&&aA.m_html.m_focused&&aF.classList.add("focused")
;let aG=ah(aE,".field-type");aG.textContent=aA.m_type,aG=ah(aE,".field-id"),aB?(aG.textContent=(0,m.bf)(aB),
az===Q&&(aG.textContent+=" (SUBMIT)")):az===Q&&(aG.textContent="SUBMIT"),aG=ah(aE,".field-index"),aG.textContent=(0,
m.bf)(aA.m_index),
aG=ah(aE,".field-visibility"),aA.m_visible?aA.m_html&&aA.m_html.m_overlapped?aG.textContent="Overlapped":aG.textContent="In viewport":aG.textContent="Not in viewport",
aA.m_html&&aA.m_html.m_selected&&(aG.textContent&&(aG.textContent+=" "),aG.textContent+=" Selected"),
aA.m_html&&aA.m_html.m_focused&&(aG.textContent&&(aG.textContent+=" "),aG.textContent+=" Focused"),
aA.m_html&&aA.m_html.m_shadow_dom&&(aG.textContent&&(aG.textContent+=" "),aG.textContent+=" ShadowDOM"),
aG=ah(aE,".field-frame"),aC&&(aG.textContent="FrameID="+aC);const aH="&ensp;";aG=ah(aE,".field-analyzer-info")
;let aI='<b>"Field"'+aH+"Form:</b>";const aJ=s[aD];if(aJ)for(let aO=0;aO<aJ.m_fields.length;++aO)aI+="<br>",
aI+='"'+aJ.m_fields[aO]+'"',aI+=aH,aI+=aJ.m_form_types[aO];aG.innerHTML=aI
;ah(aE,".left-top-info").textContent=aA.m_pos?`${aA.m_pos[0]},${aA.m_pos[1]}`:""
;ah(aE,".right-bottom-info").textContent=aA.m_pos?`${aA.m_pos[2]},${aA.m_pos[3]}`:""
;ah(aE,".caption-left").textContent=aA.m_captions&&aA.m_captions.left&&aA.m_captions.left.m_text||null
;ah(aE,".caption-top").textContent=aA.m_captions&&aA.m_captions.top&&aA.m_captions.top.m_text||null
;ah(aE,".caption-right").textContent=aA.m_captions&&aA.m_captions.right&&aA.m_captions.right.m_text||null
;ah(aE,".caption-bottom").textContent=aA.m_captions&&aA.m_captions.bottom&&aA.m_captions.bottom.m_text||null
;const aK=ah(aE,".input-container");aK.classList.remove("changed","unchanged","simulated"),
aK.classList.add(aA.m_changed||az===Q?"changed":"unchanged"),aA.m_simulated_change&&aK.classList.add("simulated")
;const aL=ac(az,aA);aK.appendChild(aL);const aM=ah(aE,".html-info table"),aN=aA.m_html;if(ad(aM,"Caption",aN&&aN.m_caption),
aN&&aN.m_labels)for(let aP=0;aP<aN.m_labels.length;aP++){const aQ=aN.m_labels[aP]
;ad(aM,aQ.m_aria_label?"[aria-label]":"Label",aQ.m_text)}ad(aM,"tag",aN&&aN.m_tag),ad(aM,"[type]",aN&&aN.m_type),
"select"===aA.m_type&&ad(aM,"multiselect",aA.m_multiselect?"true":void 0),
(null==aN?void 0:aN.m_has_value)&&ad(aM,"[has_value]","true"),ad(aM,"[disabled]",aN&&aN.m_disabled?"true":void 0),
ad(aM,"[read_only]",aN&&aN.m_read_only?"true":void 0),ad(aM,"[id]",aN&&aN.m_id),ad(aM,"[name]",aN&&aN.m_name),
ad(aM,"[data-rf]",null==aN?void 0:aN.m_data_rf),ad(aM,"[maxlength]",(0,m.bf)(aN&&aN.m_maxlength)),
ad(aM,"[autocomplete]",aN&&aN.m_autocomplete),ad(aM,"[placeholder]",aN&&aN.m_placeholder),ad(aM,"[title]",aN&&aN.m_title),
void 0!==aA.m_default_value?ad(aM,"[default]",aA.m_default_value):void 0!==aA.m_default_checked&&ad(aM,"[default]",aA.m_default_value?"checked":"unchecked"),
au.appendChild(aE)}}(0,m.TT)(O.firstElementChild).classList.add("view"),M=ah(".view"),(0,m.TT)(M.parentNode).replaceChild(O,M),
M=ah(".view");const av=ah(M,".item.focused .input-container>*:first-child");av&&(av.focus(),av.scrollIntoView());break}
case"layout":{let aR,aS;if(r){const be=ah(".content .view .data-view");be&&(aR=be.scrollLeft,aS=be.scrollTop)}
const aT=ah(O,".data-view"),aU=ah(O,".document-area"),aV=ah(O,".visible-area"),aW=ah(O,".overview-map .visible-area"),aX=ah(O,".layout-view .side-bar"),aY=ah(O,".controls")
;let aZ=x&&x.m_width||0,a0=x&&x.m_height||0;const a1=x&&x.m_client_width,a2=x&&x.m_client_height;void 0!==a1&&a1<aZ&&(aZ=a1),
void 0!==a2&&a2<a0&&(a0=a2)
;const a3=x&&x.m_scroll_x||0,a4=x&&x.m_scroll_y||0,a5=x.m_scroll_width||a3+aZ,a6=x.m_scroll_height||a4+a0;if((0,g.BQ)(aU,a5,a6),
(0,g.GF)(aV,a3,a4,aZ,a0),C){const bf=ah(O,"template.bug"),bg=ah(document.importNode(bf.content,!0),".bug");(0,
g.i)(bg,C[2],C[1]),aV.appendChild(bg)}let a7=null,a8=0,a9=0,ba=0,bb=0;const bc={};if(x&&"html"===x.m_type){if(0===P.length){
const bj=ah(O,"template.empty"),bk=document.importNode(bj.content,!0);aV.appendChild(bk),aY.classList.add("hidden")}else{
const bl=[[".controls .filters .captions","captions-hidden"],[".controls .filters .labels","labels-hidden"],[".controls .filters .search-rects","search-rects-hidden"]]
;for(let bv=0;bv<bl.length;bv++){const bw=bl[bv],bx=ah(aY,bw[0]);bx.addEventListener("change",function(a,b){return()=>{
a.checked?bh.classList.remove(b):bh.classList.add(b)}}(bx,bw[1]),!1)}const bm=ah(aY,".controls .filters .screenshot")
;void 0===u?null===(b=bm.parentElement)||void 0===b||b.classList.add("hidden"):null===u?(null===(c=bm.parentElement)||void 0===c||c.classList.remove("hidden"),
bm.disabled=!0,bm.title="No screenshot in report"):(null===(d=bm.parentElement)||void 0===d||d.classList.remove("hidden"),
bm.disabled=!1,bm.title="Show/Hide screenshot from report",bm.addEventListener("change",(()=>{
bm.checked&&u?(aV.style.backgroundImage=`url(${u})`,aW.style.backgroundImage=`url(${u})`):(aV.style.backgroundImage="none",
aW.style.backgroundImage="none")}),!1));const bn=ah(aY,"#autofill_forms");for(let by=0;by<t.length;++by){
const bz=t[by],bA=document.createElement("option");bA.value=ag(bz),bA.innerHTML=bz,bn.appendChild(bA)}
bn.addEventListener("change",(function(){const a=aV.querySelectorAll(".content .layout-view .form-field-name")
;for(let b=0;b<a.length;b++)a[b].classList.remove("form-field-name"),a[b].classList.add("form-field-name-hidden");if(bn.value){
const a=aV.querySelectorAll(".form-"+bn.value);for(let b=0;b<a.length;b++)a[b].classList.remove("form-field-name-hidden"),
a[b].classList.add("form-field-name")}}))
;const bo=ah(O,"template.field"),bp=ah(O,"template.caption"),bq=ah(O,"template.search-rect"),br=ah(O,"template.adjacent-area"),bs=[]
;for(const bB of P){const bC=bB.m_id,bD=`${bB.m_frame_id||0}-${bC||0}`,bE=bB.m_pos;if(bE&&(a7=(0,j.tN)(a7,bE)),bB.m_captions){
const bF={left:bB.m_captions.left,top:bB.m_captions.top,right:bB.m_captions.right,bottom:bB.m_captions.bottom}
;for(const bG in bF){const bH=bF[bG];if(!bH||!bH.m_pos)continue;a7=(0,j.tN)(a7,bH.m_pos);const bI={m_pos:bH.m_pos,
m_caption_for_fields:{},m_text:bH.m_text};bI.m_caption_for_fields&&(bI.m_caption_for_fields[bD]=bG),bs.push(bI)}}
if(bB.m_html&&bB.m_html.m_labels)for(const bJ of bB.m_html.m_labels){if(!bJ||!bJ.m_pos)continue;a7=(0,j.tN)(a7,bJ.m_pos)
;const bK={m_pos:bJ.m_pos,m_label_for_fields:{},m_text:bJ.m_text};bK.m_label_for_fields&&(bK.m_label_for_fields[bD]=bB),
bs.push(bK)}}let bt,bu;for(const bL of P)bL.m_html&&(bu=bL.m_html.m_z_index,void 0!==bu&&(void 0===bt||bu<bt)&&(bt=bu))
;for(const bM of bs)bu=bM.m_z_index,void 0!==bu&&(void 0===bt||bu<bt)&&(bt=bu);for(let bN=0;bN<P.length;bN++){
const bO=P[bN],bP=bO.m_id,bQ=`${bO.m_frame_id||0}-${bP||0}`,bR=bO.m_pos;if(bR){
const bS=document.importNode(bo.content,!0),bT=ah(bS,".input-container")
;bT.classList.remove("not-in-view-port","overlapped","selected","focused","changed","unchanged","simulated"),
bO.m_visible?bO.m_html&&bO.m_html.m_overlapped&&bT.classList.add("overlapped"):bT.classList.add("not-in-view-port"),
bO.m_html&&bO.m_html.m_selected&&bT.classList.add("selected"),bO.m_html&&bO.m_html.m_focused&&bT.classList.add("focused"),
bT.classList.add(bO.m_changed||bN===Q?"changed":"unchanged"),bO.m_simulated_change&&bT.classList.add("simulated"),
bT.classList.add("field-"+bQ);const bU=s[bQ];if(bU){const bX=bU.m_form_names;for(let bY=0;bY<bX.length;++bY){
const bZ=ah(O,"template.field_name"),b0=ah(document.importNode(bZ.content,!0),".form-field-name-hidden")
;b0.innerText=bU.m_fields[bY],b0.classList.add("form-"+ag(bX[bY]));const b1=(bR[3]-bR[1])/2;b0.style.left=(0,e.Md)(bR[0]+b1),
b0.style.top=(0,e.Md)(bR[1]+1),aV.appendChild(b0),b0.classList.add("field-"+bQ),b0.addEventListener("mouseenter",function(a){
return function(){aV.classList.add("dimmed");const b=aV.querySelectorAll(".field-"+a)
;for(let a=0;a<b.length;a++)b[a].classList.add("field-hover")}}(bQ),!1),b0.addEventListener("mouseleave",function(a){
return function(){aV.classList.remove("dimmed");const b=aV.querySelectorAll(".field-"+a)
;for(let a=0;a<b.length;a++)b[a].classList.remove("field-hover")}}(bQ),!1)}}const bV=ac(bN,bO)
;bV.classList.add("web-page-field-control"),bT.appendChild(bV),(0,g.GF)(bT,bR[0],bR[1],bR[2]-bR[0],bR[3]-bR[1]),
bO.m_html&&void 0!==bO.m_html.m_z_index&&void 0!==bt&&(bT.style.zIndex=(0,m.bf)(bO.m_html.m_z_index-bt)),
bT.addEventListener("mouseenter",function(a){return function(){aV.classList.add("dimmed")
;const b=aV.querySelectorAll(".field-"+a);for(let a=0;a<b.length;a++)b[a].classList.add("field-hover")}}(bQ),!1),
bT.addEventListener("mouseleave",function(a){return function(){aV.classList.remove("dimmed")
;const b=aV.querySelectorAll(".field-"+a);for(let a=0;a<b.length;a++)b[a].classList.remove("field-hover")}}(bQ),!1),
aV.appendChild(bS);const bW=bO.m_captions&&bO.m_captions.m_dbg;if(bW){
if(bW.m_search_rects)for(let b2=0;b2<bW.m_search_rects.length;b2++)ae(bW.m_search_rects[b2],bq,bQ,aV)
;bW.m_adjacent_area&&af(bW.m_adjacent_area,br,bQ,aV)}}}for(const b3 of bs){const b4=b3.m_pos;if(b4){
const b5=document.importNode(bp.content,!0),b6=ah(b5,".caption-container");if(b6.textContent=b3.m_text,(0,
g.GF)(b6,b4[0],b4[1],b4[2]-b4[0],b4[3]-b4[1]),b6.style.fontSize=(0,e.Md)(Math.min(Math.max(b4[3]-b4[1]-5,8),18)),
b3.m_caption_for_fields){b6.classList.add("caption-for-field")
;for(const b7 in b3.m_caption_for_fields)b6.classList.add("field-"+b7)}if(b3.m_label_for_fields){
b6.classList.add("label-for-field");for(const b8 in b3.m_label_for_fields)b6.classList.add("field-"+b8)}aV.appendChild(b5)}}}
O.firstElementChild&&O.firstElementChild.classList.add("view"),M=ah(".view"),M.parentNode&&M.parentNode.replaceChild(O,M),
M=ah(".view");const bh=ah(M,".data-view"),bi=ah(bh,".input-container.focused>*:first-child");if(bi&&bi.focus(),
K||void 0===aR||void 0===aS)if(bi){const b9=bh.getBoundingClientRect(),ca=bi.getBoundingClientRect();(0,
j.hF)(b9,ca)||bi.scrollIntoView(!1)}else bh.scrollLeft=a3,bh.scrollTop=a4;else bh.scrollLeft=aR,bh.scrollTop=aS
;if(0===a5||0===a6)aX.classList.add("hidden");else{a7?(a8=a7[0]+a3<0&&-(a7[0]+a3)||0,a9=a7[2]+a3>a5&&a7[2]+a3-a5||0,
ba=a7[1]+a4<0&&-(a7[1]+a4)||0,bb=a7[3]+a4>a6&&a7[3]+a4-a6||0):(a8=0,a9=0,ba=0,bb=0),aU.style.marginLeft=(0,e.Md)(a8),
aU.style.marginTop=(0,e.Md)(ba),aU.style.marginRight=(0,e.Md)(a9),aU.style.marginBottom=(0,e.Md)(bb)
;const cb=ah(M,".overview-map .content .visible-area");for(let cc=0;cc<P.length;cc++){
const cd=P[cc],ce=`${cd.m_frame_id||0}-${cd.m_id||0}`;if(cd.m_pos){const cf=document.createElement("div")
;cf.classList.add("overview-map-element"),cb.appendChild(cf),bc[ce]={element:cf,field:cd}}}bd(),
bh.addEventListener("scroll",(function(){bd()}),!1),B=bd
;ah(M,".overview-map .container").addEventListener("mousedown",(function(a){
const b=ah(M,".overview-map .content"),c=b.getBoundingClientRect(),d=window.getComputedStyle(b),f=c.left-(0,
e.i7)(d.marginLeft),h=c.top-(0,
e.i7)(d.marginTop),i=c.right+(0,e.i7)(d.marginRight)-f,j=a5+a8+a9,k=a6+ba+bb,l=i*k/j,m=a.clientX-f,n=a.clientY-h,o=ah(M,".overview-map .content .viewport-frame"),p=o.getBoundingClientRect(),q=p.width,r=p.height
;let s=m-q/2;s<0?s=0:s>i-q&&(s=i-q),s+=f-c.left;let t=n-r/2;t<0?t=0:t>l-r&&(t=l-r),t+=h-c.top,(0,g.i)(o,s,t),
bh.scrollLeft=s*j/i+a8,bh.scrollTop=t*k/l+ba}),!1)}}else{
const cg=ah(O,"template.non-html"),ch=document.importNode(cg.content,!0);aT.appendChild(ch),aU.classList.add("hidden"),
aX.classList.add("hidden"),aY.classList.add("hidden"),(0,m.TT)(O.firstElementChild).classList.add("view"),M=ah(".view"),(0,
m.TT)(M.parentNode).replaceChild(O,M)}function bd(){
const a=ah(M,".overview-map .container"),b=a.getBoundingClientRect(),c=window.getComputedStyle(a),d=b.left+(0,
e.i7)(c.paddingLeft),f=b.right-(0,e.i7)(c.paddingRight),h=b.top+(0,e.i7)(c.paddingTop),i=b.bottom-(0,
e.i7)(c.paddingBottom),j=ah(M,".overview-map .content"),k=a5+a8+a9,l=a6+ba+bb;let m=f-d,n=m*l/k;n>i-h&&(n=i-h,m=n*k/l)
;const o=a5*m/k,p=a6*n/l,q=a8*m/k;j.style.marginLeft=(0,e.Md)(q);const r=ba*n/l;j.style.marginTop=(0,e.Md)(r);const s=f-d-q-o
;j.style.marginRight=(0,e.Md)(s);const t=i-h-r-p;j.style.marginBottom=(0,e.Md)(t),(0,g.BQ)(j,o,p)
;const u=ah(M,".overview-map .content .document-area");(0,g.BQ)(u,o,p)
;const v=a3*m/k,w=a4*n/l,x=aZ*m/k,y=a0*n/l,z=ah(M,".overview-map .content .visible-area");(0,g.GF)(z,v,w,x,y)
;const A=aT.getBoundingClientRect(),B=(aT.scrollLeft-a8)*m/k,C=(aT.scrollTop-ba)*n/l,D=A.width*m/k,E=A.height*n/l,F=ah(M,".overview-map .content .viewport-frame")
;(0,g.GF)(F,B,C,D,E);for(const e in bc){const a=bc[e],b=a.field.m_pos
;b&&(0,g.GF)(a.element,b[0]*m/k,b[1]*n/l,(b[2]-b[0])*m/k,(b[3]-b[1])*n/l)}}break}case"details":{const ci=y.m_app_window
;ah(O,".details .app-window-id").textContent=ci&&ci.id||"?",ah(O,".details .app-window-type").textContent=ci&&ci.type||"?",
ah(O,".details .app-window-state").textContent=ci&&ci.state||"?",
ah(O,".details .app-window-pos").textContent=[ci&&ci.left,ci&&ci.top,ci&&ci.width,ci&&ci.height].join(", ")}
ah(O,".details .tab-id").textContent=x.m_tab_id||"",ah(O,".details .icon").textContent=x.m_icon||"",
ah(O,".details .browser-window-pos").textContent=R(x.m_window_pos)||"?",
ah(O,".details .browser-client-pos").textContent=R(x.m_content_pos)||"?",
ah(O,".details .web-page-scroll-x").textContent=void 0===x.m_scroll_x?"?":(0,m.bf)(Math.round(x.m_scroll_x)),
ah(O,".details .web-page-scroll-y").textContent=void 0===x.m_scroll_y?"?":(0,m.bf)(Math.round(x.m_scroll_y)),
ah(O,".details .web-page-client-width").textContent=void 0===x.m_width?"?":(0,m.bf)(x.m_width),
ah(O,".details .web-page-client-height").textContent=void 0===x.m_height?"?":(0,m.bf)(x.m_height),
ah(O,".details .extension-version").textContent=D,ah(O,".details .os").textContent=E,ah(O,".details .browser").textContent=F,
ah(O,".details .browser-version").textContent=G,ah(O,".details .browser-language").textContent=H,
O.firstElementChild&&O.firstElementChild.classList.add("view"),M=ah(".view"),M.parentNode&&M.parentNode.replaceChild(O,M);break
;default:ah(O,".text-json").textContent=(0,k.Ex)(y),O.firstElementChild&&O.firstElementChild.classList.add("view"),
M=ah(".view"),M.parentNode&&M.parentNode.replaceChild(O,M)}function R(a){return a&&[a[0],a[1],a[2]-a[0],a[3]-a[1]].join(", ")}}
function ac(a,b){
const c=b.m_html&&b.m_html.m_tag||"input",d=b.m_html&&b.m_html.m_type||b.m_type||"text",f=b.m_value||"",g=b.m_default_value||"",h=b.m_checked||!1,i=b.m_default_checked||!1
;let j,k="";if(b.m_html&&b.m_html.m_labels)for(let e=0;e<b.m_html.m_labels.length;e++){const a=b.m_html.m_labels[e]
;if(a.m_aria_label&&a.m_text){k=a.m_text;break}}let l=!0;switch(c){case"input":{const a=document.createElement(c);switch(j=a,
a.type="password"===d?"text":d,d){case"checkbox":a.checked=h,a.defaultChecked=i;break;case"radio":a.value=f,a.defaultValue=g,
a.checked=h,a.defaultChecked=i;break;case"submit":case"button":case"reset":case"image":
a.value=b.m_html&&b.m_html.m_caption||f||k||b.m_html&&b.m_html.m_title||"",l=!1;break;default:a.value=f,a.defaultValue=g,
a.placeholder=b.m_html&&b.m_html.m_placeholder||b.m_caption||b.m_html&&b.m_html.m_caption||k}break}case"button":{
const a=document.createElement("input");j=a,a.type="button",b.m_html&&b.m_html.m_type&&(a.type=b.m_html.m_type),
a.value=b.m_caption||b.m_html&&b.m_html.m_caption||f||k,l=!1;break}case"textarea":{const a=document.createElement(c);j=a,
a.value=f,a.defaultValue=g,a.placeholder=b.m_html&&b.m_html.m_placeholder||b.m_caption||b.m_html&&b.m_html.m_caption||k;break}
case"select":{const a=document.createElement(c);let d
;if(j=a,b.m_options)for(const c of b.m_options)d=document.createElement("option"),d.text=c.m_text||"",
d.value=c.m_value||c.m_text||"",d.selected=c.m_selected||!1,d.defaultSelected=c.m_default||!1,
a.appendChild(d);else d=document.createElement("option"),d.value=f,a.appendChild(d);void 0!==b.m_value&&(a.value=b.m_value),
b.m_multiselect&&a.setAttribute("multiple","true");break}case"a":switch(b.m_type){case"button":{
const a=document.createElement("input")
;j=a,a.type="button",a.value=b.m_caption||b.m_html&&b.m_html.m_caption||k||b.m_html&&b.m_html.m_title||"",l=!1;break}
case"checkbox":{const a=document.createElement("input");j=a,a.type=b.m_type,a.checked=h;break}default:{
const a=document.createElement("a")
;j=a,a.href="#",a.textContent=b.m_caption||b.m_html&&b.m_html.m_caption||k||b.m_html&&b.m_html.m_title||null;break}}break
;default:switch(d){case"checkbox":{const a=document.createElement("input");j=a,a.type="checkbox",a.checked=h,a.defaultChecked=i
;break}case"radio":{const a=document.createElement("input");j=a,a.type="radio",a.value=f,a.defaultValue=g,a.checked=h,
a.defaultChecked=i;break}case"submit":case"button":case"reset":case"image":{const a=document.createElement("input");j=a,
a.type="button",a.value=b.m_caption||b.m_html&&b.m_html.m_caption||f||k||b.m_html&&b.m_html.m_title||"",l=!1;break}case"text":
case"password":case"":case"hidden":case"file":case"color":case"number":case"email":case"name":case"username":case"textbox":
case"nickname":case"tel":case"search":{const a=document.createElement("input");j=a,a.type="password"===d?"text":d,a.value=f,
a.defaultValue=g,a.placeholder=b.m_html&&b.m_html.m_placeholder||b.m_caption||b.m_html&&b.m_html.m_caption||k;break}default:{
const a=document.createElement("div")
;j=a,a.textContent=b.m_caption||b.m_html&&b.m_html.m_caption||k||b.m_html&&b.m_html.m_title||null;break}}}
return l&&b.m_pos&&(j.style.width=(0,e.Md)(b.m_pos[2]-b.m_pos[0]),j.style.height=(0,e.Md)(b.m_pos[3]-b.m_pos[1])),
b.m_html&&b.m_html.m_font_size?j.style.fontSize=(0,m.bf)(b.m_html.m_font_size)+"px":b.m_pos&&(j.style.fontSize=(0,
e.Md)(Math.min(Math.max(b.m_pos[3]-b.m_pos[1]-4,7),18))),j.title=`field #${a}: ${b.m_frame_id}-${b.m_id}`,j}function ad(a,b,c){
if(!c)return;const d=document.createElement("tr"),e=document.createElement("td");e.textContent=b,d.appendChild(e)
;const f=document.createElement("td");f.textContent="=",d.appendChild(f);const g=document.createElement("td");g.textContent=c,
d.appendChild(g),a.appendChild(d)}function ae(a,b,c,d){const e=document.importNode(b.content,!0),f=ah(e,".search-rect")
;f.classList.add("field-"+c),(0,g.GF)(f,a[0],a[1],a[2]-a[0],a[3]-a[1]),d.appendChild(e)}function af(a,b,c,d){
const e=document.importNode(b.content,!0),f=ah(e,".adjacent-area");f.classList.add("field-"+c),(0,
g.GF)(f,a[0],a[1],a[2]-a[0],a[3]-a[1]),d.appendChild(e)}function ag(a){return a.replace(/[#<> ()[\]%]/g,"-")}function ah(a,b){
if("string"==typeof a)return(0,m.TT)(document.querySelector(a));if(b)return(0,m.TT)(a.querySelector(b));throw(0,
i.ZU)(i.V2,"Bad parameters: missing selector string")}}(o,b,n,c);let q=null,r=null,s=!1;return await o.Init(null),p.Init(),
o.onNotificationFromBackgroundScript.Add(t),p.onDisconnectFromUpdateEvents=()=>{o.onNotificationFromBackgroundScript.Remove(t)},
window.document.title="RoboForm Engine Dev Tool",void await u();function t(a,...b){switch(a){case"WebPageUpdated":
case"WebPageAnalyzed":case"WebPageSubmitted":v(0)}}async function u(){if(s)v(100);else{s=!0;try{const a={historyId:q,getForms:!0
},b=await o.CallBackgroundScript("GetBrowserWindowInfo",null,null,a);p.Update(b,null)
;const c=b.m_history&&b.m_history[0]&&b.m_history[0].m_id;c&&(q=c)}finally{s=!1}}}function v(a){w(),r=setTimeout((function(){
w(),(0,h.uT)(u(),"Update")}),a)}function w(){r&&(clearTimeout(r),r=null)}}}},function(a){a.O(0,[612],(function(){return b=92627,
a(a.s=b);var b}));a.O()}]);