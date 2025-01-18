"use strict"
;__filename="background/completion_utils.js",define(["require","exports","./store","./browser","./utils","./settings","./normalize_urls","./tools","./browsing_data_manager"],(e,t,l,r,n,u,o,i)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.Wl=t.Kr=t.sortBy0=t.shortenUrl=t.highlight=t.cutTitle=t.dr=t.get2ndArg=t.ComputeRelevancy=t.ComputeRecency=t.ComputeWordRelevancy=t.ql=t.Ul=t.tr=t.vr=t.vt=t.or=t.Or=t.kr=t.setupQueryTerms=t.Cr=t.ur=t.tabsInNormal=void 0
;let a=[0,0],f=null;t.tabsInNormal=f;let s,_,c,m,h=null,d=0,b=[],w=0,p=3;t.ur=p,t.Cr=()=>{t.tabsInNormal=f=null},
t.setupQueryTerms=(e,t,l)=>{s=e,_=t,m=_,c=l},t.kr=e=>{s=e},t.Or=e=>{w=e},t.or=e=>{t.ur=p=e},t.vt={Pl:null,Ql:null,Zt:0,
Lr:0,Zr(e){let r=null,n=0,u=s.join(" ");for(let t=b,l=u?t.length:0;0<=--l;){if(!t[l].Hr&&e)continue
;let n=t[l].Jr,u=0,o=0;for(;u<n.length&&o<s.length;o++)s[o].includes(n[u])&&u++;if(u>=n.length){r=t[l];break}}t.vt.Pl=r,
r&&(l.Nr.i<200||!r.qt||r.qt.length>1e3)&&(n=performance.now())-r.$t<Math.max(300,1.3*l.Nr.i)?(t.vt.Ql=r,
r.Jr=s.slice(0)):!u||r&&u===r.Jr.join(" ")||!(u.length>4||/\w\S|[^\x00-\x80]/.test(u))?t.vt.Ql=null:(t.vt.Ql={
Jr:s.slice(0),Hr:e,$t:n||performance.now(),qt:r&&r.qt,ne:r&&r.ne},b.push(t.vt.Ql),
t.vt.Zt||(t.vt.Zt=setInterval(t.vt.Vr,6e3)))},Vr(){let e=b,l=-1,r=performance.now()-5983;for(;++l<e.length&&e[l].$t<r;);
l++,l<e.length?e.splice(0,l):(e.length=0,clearInterval(t.vt.Zt),t.vt.Zt=0)},pe(e){
for(let t of b)e<2?t.qt=null:e<3?t.ne=null:h=null},cl(e){h!==e&&(t.vt.Lr&&(clearTimeout(t.vt.Lr),t.vt.Lr=0),h=e,
e&&(t.vt.Lr=setTimeout(t.vt.cl,3e3,null)))}},t.vr={Wr:0,mt:0,gr(){let e=s[0],r=l.Tl.keywords
;return null===r?(t.vr.mt=t.vr.mt||setTimeout(t.vr.Xr,67),true):!(e.length>=t.vr.Wr)&&r.includes("\n"+e)},Xr(){
let e=n.Yr(l.Tl.map).sort(),r=0,u="",o=[];for(let t=e.length;0<=--t;){let l=e[t];if(!u.startsWith(l)){let e=l.length
;r=e>r?e:r,u=l,o.push(l)}}l.Tl.keywords="\n"+o.join("\n"),t.vr.Wr=r,t.vr.mt=0}},t.tr={er:null,lr:null,Qr:null,Ir(){
let e=t.tr.er=[];t.tr.lr=t.tr.Qr=null
;for(let t of s)e.push(new RegExp(n.ul(t),t!==t.toUpperCase()&&t.toLowerCase()===t?"i":""))},rr(){
let e=t.tr.lr=[],l=t.tr.Qr=[];for(let r of t.tr.er){let t="\\b"+r.source,n=r.flags;e.push(new RegExp(t,n)),
l.push(new RegExp(t+"\\b",n))}},Ur(e,l){
t.tr.er&&(e=n.ul(l?e:e.slice(0,-1)),t.tr.er[0]=new RegExp(l?e:e+"(?:/|$)",t.tr.er[0].flags))}},t.Ul=(e,l)=>{
for(let r of t.tr.er)if(!(r.test(e)||r.test(l)))return false;return true},t.ql=(e,l)=>{let r=0,n=0,u=0,o=0,i=!!l
;t.tr.lr||t.tr.rr();for(let t=0,a=s.length;t<a;t++){let a=x(t,e);o+=a[0],u+=a[1],i&&(a=x(t,l),n+=a[0],r+=a[1])}
return o=o/p*g(u,e.length),0===r?l?o/2:o:(n=n/p*g(r,l.length),o<n?n:(o+n)/2)};let g=(e,t)=>e<t?e/t:t/e,x=(e,l)=>{
let r=0,n=0;return r=l.split(t.tr.er[e]).length,r<1?a:(n=1,t.tr.lr[e].test(l)&&(n+=1,t.tr.Qr[e].test(l)&&(n+=1)),
[n,(r-1)*s[e].length])};t.ComputeWordRelevancy=e=>t.ql(e.t,e.title),t.ComputeRecency=e=>{let t=(e-w)/18144e5
;return t<0?0:t<1?t*t*.666667:t<1.000165?.666446:0},t.ComputeRelevancy=(e,l,r)=>{let n=t.ComputeRecency(r),u=t.ql(e,l)
;return n<=u?u:(u+n)/2},t.get2ndArg=(e,t)=>t,t.dr=e=>{if(null!=e.textSplit)return void(e.t===e.u&&(e.t=""))
;e.title=t.cutTitle(e.title);let l,r=e.t,n=o.en(r,e.u)
;n.length!==r.length?l=M(r,"\\"===n[0]?5:"/"===r.charAt(7)&&"%3a"===r.substr(9,3).toLowerCase()?10:8):(n=t.shortenUrl(r),
l=T(n)),e.t=r.length!==e.u.length?n:"",e.textSplit=k(n,l,r.length-n.length,_?c-13-Math.min(e.title.length,40):c)},
t.cutTitle=(e,l)=>{let r=e.length>c+40;return r&&(e=n.el(e,0,c+39)),t.highlight(r?e+"\u2026":e,l||T(e))},
t.highlight=(e,t)=>{if(m)return e;if(0===t.length)return n.zr(e);let l="",r=0;for(let u=0;u<t.length;u+=2){
let o=t[u],i=t[u+1];o>=e.length||(l+=n.zr(e.slice(r,o)),l+="<match>",l+=n.zr(e.slice(o,i)),l+="</match>",r=i)}
return l+n.zr(e.slice(r))},t.shortenUrl=e=>{let t=n.Ar(e)
;return!t||t>=e.length?e:e.slice(t,e.length-+(e.endsWith("/")&&!e.endsWith("://")))};let M=(e,t)=>{let l=T(e)
;for(let e=0;e<l.length;)l[e+1]<=t?l.splice(e,2):(l[e]=Math.max(l[e]-t,0),l[e+1]-=t,e+=2);return l},T=e=>{let l=[]
;for(let r=0,n=s.length;r<n;r++){let n,u=0,o=0,i=e.split(t.tr.er[r]),a=i.length-1,f=s[r].length;for(;u<a;u++,
o=n)n=(o+=i[u].length)+f,l.push([o,n])}if(0===l.length)return l;if(1===l.length)return l[0];l.sort(t.sortBy0);let r=l[0]
;for(let e=1,t=1,n=l.length;t<n;t++){let n=l[t];r[e]>=n[0]?r[e]<n[1]&&(r[e]=n[1]):(r.push(n[0],n[1]),e+=2)}return r}
;t.sortBy0=(e,t)=>e[0]-t[0];let k=(e,t,l,r)=>{let u="",o=e.length,i=o,a=""
;if(o<=r||(l>1?i=e.indexOf("/")+1||o:(i=e.indexOf(":"))<0?i=o:n.tn.test(e.slice(0,i+3).toLowerCase())?i=e.indexOf("/",i+4)+1||o:i+=22),
i<o&&t.length)for(let e=t.length,l=o+8;(e-=2)>-4&&l>=i;l=e<0?0:t[e]){let n=e<0?i:t[e+1],u=l-20-Math.max(n,i)
;if(u>0&&(o-=u,o<=r)){i=n+(r-o);break}}o=0;for(let l=0;o<r&&l<t.length;l+=2){let f=t[l],s=Math.max(o,i),_=f-20-s
;_>0?(r+=_,a=n.el(e,o,s+11),u+=m?a:n.zr(a),u+="\u2026",a=n.ln(e,f-8,f),u+=m?a:n.zr(a)):o<f&&(a=e.slice(o,f),
u+=m?a:n.zr(a)),o=t[l+1],a=e.slice(f,o),m?u+=a:(u+="<match>",u+=n.zr(a),u+="</match>")}
return a=e.length<=r?e.slice(o):n.el(e,o,r-1>o?r-1:o+10),u+(m?a:n.zr(a))+(e.length<=r?"":"\u2026")};t.Kr=0,
t.Wl=(e,n,u,o,i)=>{{t.tabsInNormal=f=2!==l.fe&&!(2048&n);let a=(f?2:0)|(e?1:0);if(a|=e&&512&n?4:0,d!==a&&(h=null,d=a),
i=i||h)u(o,i);else{let t=u.bind(null,o);e?(512&n?r.getCurTabs:r.te)(t):r.Me.query({},t)}}},i.ze.rn=()=>{
h&&(1&d||!(2&d)!=(2===l.fe))&&t.vt.cl(null)},u.sl.then(()=>{u._l("searchEngines",null)})});