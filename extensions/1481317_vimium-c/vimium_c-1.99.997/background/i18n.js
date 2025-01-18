"use strict";__filename="background/i18n.js",define(["require","exports","./store","./utils","./browser"],(e,r,n,t,l)=>{
let u;Object.defineProperty(r,"__esModule",{value:true}),r.$n=r.getI18nJson=r.bn=r.gn=r._n=r.D=r.Se=r.jn=r.kn=void 0,
r.kn=1;let i=0;r.jn=[],r.Se=e=>l.n.i18n.getMessage(e),r.D=(e,n)=>{if(1===i){let r=u.get(e)
;return null!=n&&r?r.replace(/\$\d/g,e=>n[+e[1]-1]):r||""}return i||(i=r.getI18nJson("background").then(e=>{u=e,i=1})),
i.then(r.D.bind(null,e,n))},r._n=(e,n)=>{if(n.forEach((e,n,t)=>{if(e instanceof Array){let l=e[0]
;t[n]=1===i?u.get(l)||l:r.D(l).then(e=>e||l)}}),n.some(e=>e instanceof Promise)){let t=Promise.all(n)
;return(1===i?t:(i||r.D("NS")).then(()=>t)).then(n=>r.D(e,n))}return r.D(e,n)
},r.gn=(e,r)=>e&&e.split(" ").reduce((e,n)=>e||(n.includes("=")?r&&n.startsWith(r)?n.slice(r.length+1):e:n),""),
r.bn=e=>{let n=r.Se("i18n");return r.gn(n,e||"background")||r.Se("lang1")||"en"},
r.getI18nJson=e=>t.ki(`/i18n/${r.bn(e)}/${e}.json`),r.$n=()=>{let e=r.jn,n=["$1","$2","$3","$4"]
;for(let r=0;r<116;r++)e.push(l.n.i18n.getMessage(""+r,n));r.$n=null}});