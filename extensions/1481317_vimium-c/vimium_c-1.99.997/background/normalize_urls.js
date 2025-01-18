"use strict";__filename="background/normalize_urls.js",define(["require","exports","./store","./utils"],(e,t,r,l)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.wi=t.en=t.$i=t.Cl=t.S=t.an=t.xi=t.Ei=t.Xl=t.zi=t.Si=t.Yl=t.Ci=t.Ii=t.Ai=t.Ri=t.Oi=t.es=t.Li=t.Pi=void 0,
t.Pi=/^([^:]+(:[^:]+)?@)?([^:]+|\[[^\]]+])(:\d{2,5})?$/,t.Li=/^(?:ext|web)\+[a-z]+:/,
t.es=/^"[^"]*"$|^'[^']*'$|^\u201c[^\u201d]*\u201d$/,t.Oi=/\$([sS$])?(?:\{([^}]*)})?/g,t.Ri=/\$([+-]?\d+|\$)/g,
t.Ai=/^[\w\x80-\ufffd]{1,8}>/,t.Ii=/<[\w\x80-\ufffd]{1,8}$/,t.Ci=/\|([\w\x80-\ufffd]{1,8}|(,|%2[cC])[\w,-]*)$/
;let i=["blank","newtab","options","show"],n="options.html",s={__proto__:null,about:"",changelog:"/RELEASE-NOTES.md",
help:"/wiki",home:"",license:"/LICENSE.txt",option:n,permissions:"/PRIVACY-POLICY.md#permissions-required",
policy:"/PRIVACY-POLICY.md",popup:n,preference:n,preferences:n,privacy:"/PRIVACY-POLICY.md#privacy-policy",profile:n,
profiles:n,readme:"#readme",release:"/RELEASE-NOTES.md",releases:"/RELEASE-NOTES.md",
"release-notes":"/RELEASE-NOTES.md",setting:n,settings:n,wiki:"/wiki"};t.Yl=0,t.Si=false,t.zi=()=>{t.Yl=0},
t.Xl=(e,i,n,s)=>{if(e=e.trim(),t.Yl=0,l.Jl(e))return e=e.replace(/\xa0/g," "),l.Sl(),e;let f,m,d,p,w=-1,c=0,g=false
;d=e.replace(/[\n\r]+[\t \xa0]*/g,"").replace(/\xa0/g," ");let $='"'===d[0]&&d.endsWith('"'),h=d
;return e=d=$?d.slice(1,-1):d,
/^[A-Za-z]:(?:[\\/](?![:*?"<>|/])|$)|^\/(?:Users|home|root)\/[^:*?"<>|/]+/.test(e)||e.startsWith("\\\\")&&e.length>3?o(e):((f=(e=d.toLowerCase()).indexOf(" ")+1||e.indexOf("\t")+1)>1&&(e=e.slice(0,f-1)),
0===(f=e.indexOf(":"))?w=4:-1!==f&&l.tn.test(e)?e.startsWith("vimium:")?(w=3,n|=0,e=d.slice(9),
n<-1||!e?d="vimium://"+e:-1===n||$||!(d=r.$r(e,n,null,(s||0)+1))?d=t.an(e,false,n):"string"!=typeof d&&(w=5)):t.Li.test(e)?w=0:(-1===(m=e.indexOf("/",f+3))?e.length<d.length:e.charCodeAt(m+1)<33)?w=4:/[^a-z]/.test(e.slice(0,f))?w=(f=e.charCodeAt(f+3))>32&&47!==f?0:4:e.startsWith("file:")?w=0:e.startsWith("chrome:")?w=e.length<d.length&&e.includes("/")?4:0:e=e.slice(f+3,m>=0?m:void 0):(-1!==f&&e.lastIndexOf("/",f)<0&&(w=t.Ei(d.toLowerCase(),f,e.length%d.length)),
c=2,
m=d.length,-1===w&&e.startsWith("//")&&(e=e.slice(2),c=1,m-=2),-1!==w?"about:blank/"===e&&(d="about:blank"):(f=e.indexOf("/"))<=0?(0===f||e.length<m)&&(w=4):e.length>=m||e.charCodeAt(f+1)>32?(g=e.length>f+1,
e=e.slice(0,f)):w=4),-1===w&&e.lastIndexOf("%")>=0&&(e=l.Le(e)).includes("/")&&(w=4),
-1===w&&e.startsWith(".")&&(e=e.slice(1)),
-1!==w||((p=t.Pi.exec(e))?(e=p[3]).endsWith("]")?w=l.vn(e,6)?c:4:"localhost"===e||e.endsWith(".localhost")||l.vn(e,4)||p[4]&&g?w=c:(f=e.lastIndexOf("."))<0||0===(w=l.Ni(e.slice(f+1)))?(m=e.length-f-1,
w=2!==c&&(f<0||(0!==c?m>=3&&m<=5:m>=2&&m<=14)&&!/[^a-z]/.test(e.slice(f+1)))||u(e,p[4])>0?c:4):w=/[^.\da-z_\-]|xn--|^-/.test(e)?e.startsWith("xn--")||e.includes(".xn--")||(e.length===f+3||1!==w?!c:u(e,p[4]))?c:4:2!==c||g?c:e.endsWith(".so")&&e.startsWith("lib")&&e.indexOf(".")===e.length-3?4:p[2]||p[4]||!p[1]||/^ftps?(\b|_)/.test(e)?2:e.startsWith("mail")||e.indexOf(".mail")>0||(m=e.indexOf("."))===f?4:e.indexOf(".",++m)!==f?2:e.length===f+3&&1===w&&l.Ni(e.slice(m,f),true)?4:2:(w=4,
e.length===d.length&&l.vn(e=`[${e}]`,6)&&(d=e,w=2))),l.Sl(),s||(t.Si=false),t.Yl=w,
0===w?/^extension:\/\//i.test(d)?"moz-"+d:d:4===w?t.S(h.split(l.C),i,n,s):w<=2?2===w&&a(d,e)||(2===u(e,p&&p[4])?"https:":"http:")+(2===w?"//":"")+d:d)
};let u=(e,t)=>{let l=t&&r.Wt.Kt.get(e+t)||r.Wt.Kt.get(e);return l?l.Yt?2:1:0},a=(e,t)=>{
if(/^(?!www\.)[a-z\d-]+\.([a-z]{3}(\.[a-z]{2})?|[a-z]{2})\/?$/i.test(e)&&!u(t)){let l=r.Wt.Kt.get("www."+t)
;if(l)return`${l.Yt?"https":"http"}://www.${e.toLowerCase().replace("/","")}/`}return""};t.Ei=(e,r,i)=>{
let n="/"===e.substr(r+1,1);if("%"===e.substr(r+1,1))return 4;switch(e.slice(0,r)){case"about":
return n?4:i>0||e.includes("@",r)?-1:0;case"blob":case"view-source":
return(e=e.slice(r+1)).startsWith("blob:")||e.startsWith("view-source:")?4:(t.Xl(e,null,-2,1),t.Yl<=2?0:4);case"data":
return n?4:(r=e.indexOf(",",r))<0||i>0&&i<r?-1:0;case"file":return 0;case"filesystem":return e=e.slice(r+1),
l.tn.test(e)?(t.Xl(e,null,-2,1),0===t.Yl&&/[^/]\/(?:persistent|temporary)(?:\/|$)/.test(e)?0:4):4;case"magnet":
return"?"!==e[r+1]?-1:0;case"mailto":return n?4:(r=e.indexOf("/",r))>0&&e.lastIndexOf("?",r)<0?-1:0;case"tel":
return/\d/.test(e)?0:4;default:return t.Li.test(e)?0:n?4:-1}},t.xi=e=>{
let t=e.startsWith("filesystem:")?11:e.startsWith("view-source:")?12:0;return t?e.slice(t):e},t.an=(e,t,l)=>{
let n,u,a="",f="",o=e.trim();if(!o)return t?"":r.Ge+"pages/";if((n=o.indexOf(" ")+1)&&(f=o.slice(n).trim(),
o=o.slice(0,n-1)),(n=o.search(/[\/#?]/)+1)&&(a=o.slice(n-1).trim(),o=o.slice(0,n-1)),"display"===o&&(o="show"),
!/\.\w+$/.test(o))if(o=o.toLowerCase(),
null!=(u=s[o]))("release"===o||"releases"===o)&&(u+="#"+r.J.Ta.replace(/\D/g,"")),
u=o=u&&"/"!==u[0]&&"#"!==u[0]?u:r.J.ta+(u.includes(".")?"/blob/master"+u:u);else{if("newtab"===o)return r.newTabUrl_f
;if("/"===o[0]||i.indexOf(o)>=0)o+=".html";else{if(1===l||-1===l)return"vimium://"+e.trim()
;o="show.html#!url vimium://"+o}}return t||u&&u.includes("://")||(o=r.Ge+("/"===o[0]?o.slice(1):"pages/"+o)),a&&(o+=a),
o+(f&&(o.includes("#")?" ":"#!")+f)},t.S=(e,l,i,n)=>{let s=r.Tl.map.get(l=l||"~"),u=s?t.Cl(e,s.Fl,s.r):e.join(" ")
;return n||(t.Si=!!s&&"~"!==l),"~"!==l?t.Xl(u,null,i,(n||0)+1):(t.Yl=4,u)},t.Cl=(e,i,n,s)=>{let u,a=0
;return i=0===e.length&&n?n:i.replace(t.Oi,(n,f,o,m)=>{let d;if(n.endsWith("$")||!f&&!o)return"$"
;f||(/^s:/i.test(o)?(f=o[0],o=null==o?void 0:o.slice(2)):f="s");let p=e,w=o?t.Ci.exec(o):null
;w&&"\\"!==o.charAt(w.index-1)?o=o.slice(0,w.index):w=null;let c=o?t.Ii.exec(o)||t.Ai.exec(o):null
;return!c||"<"===c[0][0]&&"\\"===o.charAt(c.index-1)||(o="<"===c[0][0]?o.slice(0,c.index):o.slice(c[0].length),
p=[r.jl.get("<"===c[0][0]?c[0].slice(1):c[0].slice(0,-1))||""],p=p[0].split(" ")),"S"===f?(d=p,
f=" "):(d=p===e&&u?u:p.map(l.Nl),p===e&&!u&&(u=d),f=l.Jl(i)||i.startsWith("vimium://run")?"%20":"+"),
o&&o.includes("\\")&&(o=o.replace(/\\([\\<>|])/g,"$1")),o=0===d.length?"":o&&o.includes("$")?o.replace(t.Ri,(e,t)=>{
if("$"===t)return"$";let r=parseInt(t,10);if(!r)return d.join(f)
;if(r<0)r+=d.length+1;else if("+"===t[0])return d.slice(r-1).join(f);return d[r-1]||""}):d.join(null!=o?o:f),
w&&(o=r.j(o,0,l.Le(w[0].slice(1)))),null!=s&&o&&(s.push(m+=a,m+o.length),a+=o.length-n.length),o}),l.Sl(),null==s?i:{
Fl:i,br:s}},t.$i=e=>{let r=e.indexOf(":"),l=r;if(r<=0)return e
;if(t.Li.test(e.slice(0,r+1).toLowerCase()))return e.slice(0,r).toLowerCase()+e.slice(r)
;if("://"===e.substr(r,3))if(r=e.indexOf("/",r+3),
r<0)r=l,l=-1;else if(7===r&&"file"===e.slice(0,4).toLowerCase())return r=":"===e.charAt(9)?3:"%3a"===e.substr(9,3).toLowerCase()?5:0,
"file:///"+(r?e[8].toUpperCase()+":/":"")+e.slice(r+8);let i=e.slice(0,r),n=i.toLowerCase()
;return-1===l&&/^(file|ftp|https?|rt[ms]p|wss?)$/.test(i)&&(e+="/"),i!==n?n+e.slice(r):e};let f=e=>{let t=l.Le(e)
;return/[^\w.$+-\x80-\ufffd]|\s/.test(t)?e.replace(/%24/g,"$"):t},o=e=>{
if((e=e.replace(/\\/g,"/")).startsWith("//")&&!e.startsWith("//./")){let t=(e=e.slice(2)).split("/",1)[0]
;t.includes("%")&&(e=f(t)+e.slice(t.length)),e.includes("/")||(e+="/")}else e.startsWith("//")&&(e=e.slice(4)),
":"===e[1]&&(e=e[0].toUpperCase()+":/"+e.slice(3)),"/"!==e[0]&&(e="/"+e);if(!/[%?#&\s]/.test(e))return l.Sl(),
"file://"+e;let t="";if(e.indexOf("#")){let r=/\.[A-Za-z\d]{1,4}(\?[^#]*)?#/.exec(e)
;r?(t=e.slice(r.index+r[0].length-1),
t=t.includes("=")||!t.includes("/")||t.includes(":~:")?r[1]?r[1]+t:t:""):(r=/#(\w+=|:~:)/.exec(e))&&(t=e.slice(r.index)),
t&&(e=e.slice(0,-t.length))}
return e="file://"+e.replace(/[?#&\s]/g,encodeURIComponent)+t.replace(/\s/g,encodeURIComponent),l.Sl(),e};t.en=(e,t)=>{
if(r.Z>1&&e.startsWith("file://")){let r=e.indexOf("/",7);if(r<0||r===e.length-1)return r<0?e+"/":e
;let i=7===r?":"===e.charAt(9)?3:"%3a"===e.substr(9,3).toLowerCase()?5:0:0,n=i?e[8].toUpperCase()+":":r>7?"\\\\"+f(e.slice(7,r)):"",s=e.slice(i?i+7:r>7?r:0),u=t?/[?#]/.exec(t):null,a=!t||u?/[?#]/.exec(s):null,o=a?a.index:0
;if(o&&u){let e=l.Le(t.slice(t.indexOf("/",i?9:r>7?8:0),u.index));e===s.slice(0,e.length)&&(o=e.length)}
let m=o?s.slice(o):"";s=o?s.slice(0,o):s,s=s.replace(/\/+/g,"\\"),e=n+s+m}return e};let m=e=>{
let t=(new DOMParser).parseFromString(e,"image/svg+xml").firstElementChild
;for(let e of t?[].slice.call(t.querySelectorAll("script,use")):[])e.remove();if(!t||!t.lastElementChild)return""
;for(let e of"id class aria-hidden".split(" "))t.removeAttribute(e);let r,i=t.attributes;for(let e=i.length;0<=--e;){
let r=i.item(e).name;r.startsWith("data-")&&t.removeAttribute(r)}if(!t.getAttribute("xmlns")){let e=[].slice.call(i)
;for(let r of e)t.removeAttributeNode(r);t.setAttribute("xmlns","http://www.w3.org/2000/svg")
;for(let r of e)t.setAttributeNode(r)}
for(let e=t.ownerDocument.createTreeWalker(t,NodeFilter.SHOW_TEXT);r=e.nextNode();){let e=r.data,t=e.trim()
;t.length<e.length&&(r.data=t?(l.C.test(e[0])?" ":"")+t+(l.C.test(e.slice(-1))?" ":""):" ")}
return t.outerHTML.replace(/\xa0/g," ")};t.wi=e=>{let t
;return t=m(e),t=t.replace(/<\/?[A-Z:]+(?=\s|>)/g,e=>e.toLowerCase()),
t=t.replace(/(?:[%?#]|[^\S ])+/g,encodeURIComponent),"data:image/svg+xml,"+t}});