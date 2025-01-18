"use strict"
;__filename="background/parse_urls.js",define(["require","exports","./store","./utils","./normalize_urls"],(e,t,l,u,r)=>{
Object.defineProperty(t,"__esModule",{value:true}),t.iu=t.Un=t.yr=t.Tn=t.In=t.fu=t.Ne=void 0,t.Ne=e=>{
let i,f,n=e.u,s=n.toLowerCase(),a=null,o=false;if(!u.tn.test(r.xi(s)))return u.Sl(),null;if(e.p){let l=t.fu(e);return{
k:"",s:0,u:null!=l.p?l.u:n,e:null!=l.p?l.p:l.u}}for(i of((f=u.Ar(s))&&(s=s.slice(f),n=n.slice(f)),
l.Tl.rules))if(s.startsWith(i.nu)&&(a=n.slice(i.nu.length).match(i.su),a))break;if(!a||!i){let e=l.J._i
;return s.startsWith(e)?(n=n.slice(e.length).replace(/^#!?/,""),{k:"vimium://show",u:n,
s:n.startsWith("image")&&n.lastIndexOf("&",n.indexOf(":")+1)+1||n.indexOf(" ")+1}):(u.Sl(),null)}
a.length>1&&!i.su.global&&a.shift();let p=i.au,g=0;if(a.length>1)o=true;else if(p instanceof RegExp)s=a[0],
(a=s.match(p))?(a.shift(),o=true):a=[s];else if(" "==p||"+"===p){s=a[0].toLowerCase();let e=s.indexOf(":")
;if(e=e>0&&e<s.length?e:0,e&&!u.tn.test(s)&&!s.startsWith("file:")){let t=r.Ei(s,e,s.indexOf(" "));e=-1!==t&&t<=3?e:0}
g=e>0?s.startsWith("data:")?2:1:0,a=g?[a[0]]:a[0].split(p)}else a=a[0].split(p);s="";for(let e of a)s+=" "+(g?e:u.Le(e))
;s=s.trim().replace(g>1?/\xa0/g:u.C," ")
;let m=l.Tl.map.get("~"),$=!!s&&m.Fl===l.Tl.map.get(i.Tr).Fl&&!l.Tl.map.has(s.split(" ",1)[0]);return u.Sl(),{k:i.Tr,
c:$,u:s,s:o?s.lastIndexOf(" ")+1:0}},t.fu=e=>{let{u:t}=e,f=t.toLowerCase();if(1===e.p){let u=l.j(t,131072,e.s)
;if(u!==t&&u&&u!==t+"/"&&u+"/"!==t){let e=r.Xl(u,null,-2);if(0===r.Yl)return{u:e,p:"(sed)"}}}
if(!u.tn.test(r.xi(f)))return{u:"This url has no upper paths",p:null}
;let n,s,a,o,p=encodeURIComponent,g="",m=false,$=false,c=false,d=null,h=0,_=0,b=false
;if((a=t.lastIndexOf("#")+1)&&(g=t.slice(a+ +("!"===t.substr(a,1))),n=u.Le(g),a=n.lastIndexOf("/"),
a>0||0===a&&n.length>1)){b=n!==g;let e=/([^&=]+=)([^&\/=]*\/[^&]*)/
;s=e.exec(n)||/(^|&)([^&\/=]*\/[^&=]*)(?:&|$)/.exec(n),
d=s?s[2]:n,"/"===d||d.includes("://")?d=null:s?b?(n="https://example.com/",n=encodeURI(n+d).slice(n.length),
a=(g.indexOf(n)+1||g.indexOf(n=p(d))+1)-1,a<0&&(b=false,a=g.indexOf(n=d)),_=a+n.length,
a<0&&"&"!==s[1]&&(a=g.indexOf(n=s[1]),a<0&&(b=true,n=p(s[1].slice(0,-1)),a=g.indexOf(n)),a>=0&&(a+=n.length,
_=g.indexOf("&",a)+1)),a>=0?h=a:(o=e.exec(g))?(d=u.Le(o[2]),h=o.index+o[1].length,
_=h+o[2].length):"&"!==(n=s[1])&&(a=t.length-g.length,g=n+p(d),t=t.slice(0,a)+g,h=n.length,
_=0)):h=s.index+s[1].length:h=0,d&&(a=t.length-g.length,h+=a,_>0&&(_+=a))}if(!d){if(f.startsWith(l.J.U)&&!e.f)return{
u:"An extension has no upper-level pages",p:null};g="",h=t.indexOf("/",t.indexOf("://")+3),
f.startsWith("filesystem:")&&(h=t.indexOf("/",h+1)),h=h<0?0:h,a=t.indexOf("?",h),_=t.indexOf("#",h),
a=_<0?a:a<0?_:a<_?a:_,a=a>0?a:t.length,d=t.slice(h,a),_=0,b=false}if(a=e.p,m=d.startsWith("/"),
!g&&f.startsWith("file:")){if(d.length<=1||11===t.length&&t.endsWith(":/")){if(!e.f)return{
u:"Here has been the root path",p:null};a=0}$=true,e.f||1===a&&(a=-1)
}else $=!(g||!f.startsWith("ftp"))||(null!=e.t?!!e.t:null!=e.r?!!e.r:d.length>1&&d.endsWith("/")||/\.([a-z]{2,3}|apng|avif|icon|jpeg|tiff|webp)$/i.test(d))
;let x=d.slice(+m,d.length-+d.endsWith("/")).split("/"),v=x.length,w=a<0?a+v:a;c=v<=1&&a<=-2&&t.lastIndexOf("#",h)>0,
a=w>v?v:a>0?w-1:w>0?w:0,x.length=a,d=x.join("/"),(n=e.a||"")&&(d+="/"===n[0]?n:"/"+n),
d=d?("/"===d[0]?"":"/")+d+(!$||d.endsWith("/")?"":"/"):"/",!_&&t.lastIndexOf("git",h-3)>0&&(d=i(t,d)||d),
!_&&/[/.](?:askubuntu|serverfault|stack(?:overflow|exchange)|superuser)\.com$/.test(t.slice(0,h))&&/^\/questions\/\d+$/i.test(d)&&(d="/questions"),
!c||d&&"/"!==d?(n=b?p(d):d,t=t.slice(0,h)+(_?n+t.slice(_):n)):t=t.split("#",1)[0];let k=l.j(t,64,e.s)||t;if(k!==t){
let e=r.Xl(k,null,-2);t=0===r.Yl?e:t}return{u:t,p:d}};let i=(e,t)=>{let l=u.ru(e),r=l?l.host:"";if(!r)return
;if(!/git\b|\bgit/i.test(r)||!/^[\w\-]+(\.\w+)?(:\d{2,5})?$/.test(r))return;let i=t.split("/"),f=i.length-1;i[f]||(f--,
i.pop());let n=i[f];if(r.startsWith("github.")){
if(3===f)return"pull"===n||"milestone"===n||"commit"===n?t+"s":"tree"===n||"blob"===n?i.slice(0,3).join("/"):null
;if(4===f&&"releases"===i[3]&&("tag"===i[4]||"edit"===i[4]))return i.slice(0,4).join("/")
;if(f>3)return"blob"===i[3]?(i[3]="tree",i.join("/")):null
}else if(r.startsWith("gitee.")&&4===f&&"releases"===i[3]&&"tag"===i[4])return i.slice(0,4).join("/")}
;t.In=(e,l)=>"string"==typeof l&&l.toLowerCase().startsWith("whole")?t.yr(e):f(e),t.Tn=e=>{
if(!/^https?:\/\//i.test(e))return e
;let t=e.indexOf("://")+3,r=e.indexOf("/",t),i=e.slice(t,r>0?r:e.length).toLowerCase(),f=(l.Qe<78?/[\s"(),;>}\u2014\u2018\u2019\u201c\u201d\u3002\u300b\u3011\uff08\uff09\uff1b-\uff1e]/:new RegExp("\\p{S}|[^\\P{P}.:\\uff1a%-]","u")).exec(i)
;if(f)return e.slice(0,t+f.index);let n=i.indexOf("%",i.indexOf("@")+1),s=i.lastIndexOf(".xn--",n>0?n:void 0)+5
;if(s>5&&/^[a-z\d]{2}/.test(i.slice(s))&&!/\.[a-z]/.test(i.slice(s))&&i.lastIndexOf("xn--",s-6)<0&&!/[\x7f-\uffff]/.test(i.slice(0,s-6))){
let l=i.slice(s),r=(/^[a-z\d]+/.exec(l)||[""])[0]
;if(r&&r.length<l.length&&(u.Ni(r,true)||"%-".includes(l[r.length])))return e.slice(0,t+s-4)+e.substr(t+s,r.length)}
return e};let f=e=>{let l,i=e.indexOf("\uff1a")+1||e.indexOf(":")+1;if(i&&"/"!==e[i]){
let t=e.slice(0,i-1).trim().toLowerCase();if("link"!==t&&"\u94fe\u63a5"!==t)return e;l=e.slice(i).trim()
;let f=l.indexOf("\uff1a")+1
;if(i=l.indexOf(":")+1,i=i&&f?Math.min(i,f):i||f,!i||!u.tn.test(l.slice(0,i-1)+"://"))return e
;if(r.Xl(l.slice(i),null,-2),1!==r.Yl)return e}else{if(!i||"/"!==e.substr(i+1,1))return e;l=e}
let f=/\s|[^=][\u3002\uff0c\uff1b]([^a-z?&#-]|$)/.exec(l),n=!!f&&1===f[0].length,s=f?l.slice(0,f.index+(n?0:1)):null,a=/["(\u2018\u201c\u300a\uff08\uff1c]/,o=(s||l).includes("#~:text=")?0:7
;return o&&s&&(n?",.;\u3002\uff0c\uff1b".lastIndexOf(s.slice(-1),2)>=0?(l=s.slice(0,-1),
o=3):'")\u2019\u201d\u300b\uff09\uff1e'.includes(s.slice(-1))&&(o=a.test(s.slice(i))?0:(l=s.slice(0,-1),1)):(l=s,o=3)),
4&o&&",.;\u3002\uff0c\uff1b".includes(l.slice(-1))&&(l=l.slice(0,-1)),
2&o&&'")\u2019\u201d\u300b\uff09\uff1e'.includes(l.slice(-1))&&(a.test(l.slice(i))?o=0:l=l.slice(0,-1)),
l&&",.;\u3002\uff0c\uff1b".includes(l[0])&&(l=l.slice(1).trim()),1&o&&l&&a.test(l[0])&&(l=l.slice(1)),r.zi(),
l=t.yr(l,false,true),r.Yl<=2&&!l.startsWith("vimium:")?l:e};t.yr=(e,t,l)=>{
let u=+e.includes("\u3002")+2*+e.includes("\uff1a");if(!u&&!l)return e;let i=e.indexOf("//")
;if(i=e.indexOf("/",i>=0?i+2:0),i>=0&&i<4)return e;let f=i>0?e.slice(0,i):e
;return/^(data|javascript)[:\uff1a]/i.test(f)?e:(1&u&&(f=f.replace(/\u3002/g,".")),
2&u&&(f=f.replace("\uff1a",":").replace("\uff1a",":")),i>0&&(f+=e.slice(i)),r.Xl(f,null,-2),
r.Yl<=2?f:1!==u||!t||/[^.\w\u3002-]/.test(e)?e:e.replace(/\u3002/g,"."))},t.Un=(e,l)=>{
let i,f,s,a,o,p,g,m=[],$=r.Oi,c=/\s/,d=e=>!!((e=e.trim())&&e.length<51)&&(l.set(e,o),true)
;for(let l of e.replace(/\\(?:\n|\\\n[^\S\n]*)/g,"").split("\n")){if(l=l.trim(),l<"$")continue;p=0;do{
p=l.indexOf(":",p+1)}while(92===l.charCodeAt(p-1));if(p<=0||!(a=l.slice(0,p).trimRight()))continue
;if(i=a.replace(/\\:/g,":").split("|"),l=l.slice(p+1).trimLeft(),!l)continue;a=l.replace(/\\\s/g,"\\s"),p=a.search(c)
;let h="";if(p>0){if(e=l.slice(p),l=a.slice(0,p),p=e.search(/\sblank=/i),p>=0){let t=e.slice(p+7).search(c)
;t=t>0?p+7+t:0,h=e.slice(p+7,t||void 0),e=e.slice(0,p)+(t?e.slice(t):"")}p=e.search(/\sre=/i)}else l=a,e=""
;if(l=l.replace(/\\s/g," ").trim().replace(/([^\\]|^)%(s)/gi,"$1$$$2").replace(/\\%/g,"%"),o={Tr:"",r:h,Fl:l},
i=i.filter(d),0!==i.length){if(-1===p){for($.lastIndex=0;(g=$.exec(l))&&g[0].endsWith("$"););g&&(p=g.index+1)&&(a=g[2],
a=a?/^s:/i.test(a)?"s"===a[0]?"+":" ":a:"s"===g[1]?"+":" ",l=l.replace($,(e,t)=>"$"+(t||"s")).toLowerCase(),
l=r.Xl(l,null,-1),
r.Yl>2&&(l=l.replace(/%24(%24|s)/g,decodeURIComponent)),p=0,l=l.replace(/\$[$s]/g,(e,t)=>"$$"===e?(p>0||p--,
"$"):(p=p>0?p:p+t+1,e)),(f=n(l,p,a))&&(a.includes("$")?(a=a.replace(r.Ri,e=>"$$"===e?"\\$":"(.*)"),
s=new RegExp("^"+a,/[a-z]/i.test(a)?"i":"")):s=a.trim()||" ",m.push({nu:f.nu,su:f.su,Tr:i[0].trimRight(),au:s})))
}else if(e.charAt(p+4)&&!c.test(e.charAt(p+4))){a=p>1?e.slice(1,p).trim():"";let r=47===e.charCodeAt(p+4)
;r?(e=e.slice(p+5),p=e.search(/[^\\]\//)+1):(e=e.slice(p+4),p=e.search(c)),l=e.slice(0,p),e=e.slice(r?p+1:p),
p=e.search(c);let f=u.pl(l,r?p>=0?e.slice(0,p):e:"");f&&(a=t.iu(a),m.push({nu:a,su:f,Tr:i[0].trimRight(),
au:o.Fl.lastIndexOf("$S")>=0?" ":"+"})),e=p>=0?e.slice(p+1):""}e=e.trimLeft(),o.Tr=e?u.Le(e):i[i.length-1].trimLeft()}}
return m};let n=(e,l,r)=>{if(l<1||!u.tn.test(e))return null;let i,f,n,s;if(i=e.slice(0,l-1),
l=Math.max(i.lastIndexOf("?"),i.lastIndexOf("#"))+1){n=f=i.slice(l),i=i.slice(0,i.search(/[#?]/)),
(s=f.lastIndexOf("&")+1)&&(n=f.slice(s));let t=(r.includes("&")?"":"&")+(r.includes("#")?"":"#")
;n&&n.indexOf("=")>=1?(f="[#&?]",e=`([^${t}]*)`):(n=f,f="#"===e[l-1]?"#":n?"[#?]":"\\?",e=`([^${t}?]*)`)
}else f=`^([^${(r.includes("#")?"":"#")+(r.includes("?")?"":"?")}]*)`,
(n=e.slice(i.length+2))&&(l=n.search(/[#?]/)+1)&&(n=n.slice(0,l-1)),e=""
;return n=n&&u.ul(n).replace(/\\\+|%20| /g,"(?:\\+|%20| )"),i=t.iu(i),{nu:i,su:new RegExp(f+n+e,/[a-z]/i.test(n)?"i":"")
}};t.iu=e=>{let t=e.slice(0,9).toLowerCase(),l=u.Ar(t)
;return l?e=e.slice(l):"vimium://"===t&&(e=r.an(e.slice(9),false,-1)),e}});