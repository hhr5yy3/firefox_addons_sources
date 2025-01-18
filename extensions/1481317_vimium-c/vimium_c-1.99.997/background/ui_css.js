"use strict"
;__filename="background/ui_css.js",define(["require","exports","./store","./utils","./browser","./settings","./ports"],(e,n,i,t,l,r,s)=>{
let o;Object.defineProperty(n,"__esModule",{value:true}),n.Fe=n.mergeCSS=n.Nn=void 0,n.Nn=(e,l)=>{
if(-1===e)return n.mergeCSS(l,-1);2===e&&(i.na=null);{let n;if(0===e&&(n=i.Ln.get("findCSS")))return i.ii=u(n),
i.Rn=l.slice(o.length),void(i.Nr.c=i.Ln.get("omniCSS")||"")}t.ki("vimium-c.css").then(t=>{
let l=o.slice(o.indexOf(",")+1).includes("a");i.Qe<69&&(t=t.replace(/user-select\b/g,"-moz-$&"))
;let s=f(t),u=false,a=false;if(matchMedia("(forced-colors)").matches||(u="1"===i.Ln.get("isHC_f")),a=i.Sa!==u,i.Sa=u,
t=s.ui,l){let e=t.indexOf("all:"),n=t.lastIndexOf("{",e),i=t.indexOf(";",e)
;t=t.slice(0,n+1)+t.slice(e,i+1)+t.slice(t.indexOf("\n",i)+1||t.length)}else t=t.replace(/all:\s?\w+;?/,"");{
let e=t.indexOf("display:"),n=t.lastIndexOf("{",e);t=t.slice(0,n+1)+t.slice(e)}{
let e=(t=t.replace(".LH{",".LH{box-sizing:border-box;")).indexOf(".LH{")+4,n=t.indexOf("}",e),i=t.slice(e,n).replace("0.5px","1px")
;t=t.slice(0,e)+i+t.slice(n)}u&&(t=t.replace(/\n\.D[^@]+/,"").replace("@media(forced-colors:active){","").slice(0,-1)),
t=t.replace(/\n/g,""),r.xn("innerCSS",o+(t+=".DLG>.Omnibar{position:absolute}"));let d=s.find
;r.xn("findCSS",d.length+"\n"+d),a&&6===i.Xe&&r._l("vomnibarOptions"),n.mergeCSS(i.q.userDefinedCss,e)})};let f=e=>{
let n=e?e.split(/^\/\*\s?#!?([A-Za-z:]+)\s?\*\//m):[""],i={ui:n[0].trim()};for(let e=1;e<n.length;e+=2){
let t=n[e].toLowerCase();i[t]=(i[t]||"")+n[e+1].trim()}return i},u=e=>{
let n=(e=e.slice(e.indexOf("\n")+1)).indexOf("\n")+1,i=e.indexOf("\n",n);return{c:e.slice(0,n-1).replace("  ","\n"),
s:e.slice(n,i).replace("  ","\n"),i:e.slice(i+1)}};n.mergeCSS=(e,t)=>{let l=i.Ln.get("innerCSS"),a=l.indexOf("\n")
;l=a>0?l.slice(0,a):l
;let d=f(e),S=d.ui?l+"\n"+d.ui:l,c=d["find:host"],m=d["find:selection"],b=d.find,C=d.omni,v="findCSS",g="omniCSS"
;l=i.Ln.get(v),a=l.indexOf("\n"),l=l.slice(0,a+1+ +l.slice(0,a));let p=l.indexOf("\n",a+1),_=l.slice(0,p).indexOf("  ")
;m=m?"  "+m.replace(/\n/g," "):"",(_>0?l.slice(_,p)!==m:m)&&(_=_>0?_:p,l=l.slice(a+1,_)+m+l.slice(p),p=_-(a+1)+m.length,
a=-1);let x=l.indexOf("\n",p+1),H=l.slice(0,x).indexOf("  ",p);if(c=c?"  "+c.replace(/\n/g," "):"",
(H>0?l.slice(H,x)!==c:c)&&(l=l.slice(a+1,H>0?H:x)+c+l.slice(x),a=-1),a<0&&(l=l.length+"\n"+l),b=b?l+"\n"+b:l,
l=(i.Ln.get(g)||"").split("\n",1)[0],C=C?l+"\n"+C:l,-1===t)return{ui:S.slice(o.length),find:u(b),omni:C}
;r.xn("innerCSS",S),r.xn(v,b),r.xn(g,C||null),n.Nn(0,S),0!==t&&1!==t&&(s.p(16384,e=>{
for(let n of e.B)8&n.s.u&&n.postMessage({N:11,H:i.Rn,f:32&n.s.u?i.ii:void 0})}),r.Ha({N:47,d:{c:i.Nr.c}}))},
n.Fe=(e,n)=>{let l,r=i.Nr.t;if(!e.o&&i.Ca)return;{let n=` ${e.t} `,s=r&&` ${r} `,o=s.includes(n),f=null!=e.e?e.e:o
;if(l=f?o?r:r+n:s.replace(n," "),l=l.trim().replace(t.C," "),false===e.b)return void(i.Nr.t=l)
;e.o&&(i.Ca=f!==` ${i.q.vomnibarOptions.styles} `.includes(n))}if(l===r)return;i.Nr.t=l;let s={N:47,d:{t:l}}
;t.Bn(i.Ce.slice(0),e=>(e!==n&&i.Ce.includes(e)&&e.postMessage(s),1))},r.sl.then(()=>{o=i.J.Ta+","+i.Qe+"a;",
i.Rn=i.Ln.get("innerCSS")||"",i.Rn&&!i.Rn.startsWith(o)?(i.Ln.set("vomnibarPage_f",""),n.Nn(1)):(n.Nn(0,i.Rn),
i.Ye&&i.Ye.then(e=>e&&n.Nn(1))),i.fl.userDefinedCss=n.mergeCSS})});