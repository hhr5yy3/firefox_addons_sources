"use strict"
;__filename="background/eval_urls.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports","./exclusions"],(e,s,r,l,t,a,n,u,c)=>{
Object.defineProperty(s,"__esModule",{value:true}),r.$r=(e,s,c,p)=>{let d,g,b,y,h;if(s|=0,
"paste"===e?e+=" .":!e.includes("%20")||e.includes(" ")||e.startsWith("run")||(e=e.replace(/%20/g," ")),
s<0||!(e=e.trim())||(d=e.search(/[/ ]/))<=0||!/^[a-z][\da-z\-]*(?:\.[a-z][\da-z\-]*)*$/i.test(g=e.slice(0,d).toLowerCase())||/\.(?:css|html?|js)$/i.test(g))return null
;if(!(e=e.slice(d+1).trim()))return null;let m=/[\s+,\uff0b\uff0c]+/g;if(1===s)switch(g){case"sum":case"mul":
e=e.replace(m,"sum"===g?" + ":" * "),g="e";break;case"avg":case"average":b=e.split(m),
e="("+b.join(" + ")+") / "+b.length,g="e"}if(1===s)switch(g){case"e":case"exec":case"eval":case"expr":case"calc":
case"m":case"math":return t.import2("/lib/math_parser.js").then(i.bind(0,e));case"error":return[e,3]
}else if(s>=2)switch(g){case"run":case"run1":case"run-one":case"run-one-key":return[[g,e],6];case"status":case"state":
return s>=3&&f(e),[e,s>=3?4:7];case"url-copy":case"search-copy":case"search.copy":case"copy-url":if(h=a.Xl(e,null,1,p),
h instanceof Promise)return h.then(e=>{let s=e[0]||e[2]||"";return s=s instanceof Array?s.join(" "):s,
Promise.resolve(r.Il(s)).then(e=>[e,1])});h=5===a.Yl&&h instanceof Array?h[0]:h,e=h instanceof Array?h.join(" "):h
;case"cp":case"copy":case"clip":let l=r.Il(e);return"string"==typeof l?[e,1]:l.then(e=>[e,1])}switch(g){case"urls":
return s<1?null:o(e,s);case"cd":case"up":if(b=(e+"  ").split(" "),!b[2]){if(s<1)return null;if(h=u.P(),
"string"!=typeof h)return h.then(l=>{let t=l&&r.$r("cd "+e+" "+(e.includes(" ")?l:". "+l),s,c,p)
;return t?"string"==typeof t?[t,7]:t:[l?"fail in parsing":"No current tab found",3]});b[2]=h}g=b[0];let t="/"===g[0]
;d=parseInt(g,10),d=isNaN(d)?"/"===g?1:t?g.replace(/(\.+)|./g,"$1").length+1:-g.replace(/\.(\.+)|./g,"$1").length||-1:d
;let i=n.Ne({u:b[2],p:d,t:null,f:1,a:"."!==b[1]?b[1]:""});return i&&i.u||[i?i.e:"No upper path",3];case"parse":
case"decode":g=e.split(" ",1)[0],g.search(/\/|%2f/i)<0?e=e.slice(g.length+1).trimLeft():g="~",b=[e=l.Ml(e)],
e=a.Xl(e,null,0,p),4!==a.Yl&&(y=n.Ne({u:e}))?""===y.u?b=[g]:(b=y.u.split(" "),b.unshift(g)):b=b[0].split(l.C);break
;case"sed":case"substitute":case"sed-p":case"sed.p":case"sed2":let f=e.split(" ",1)[0];e=e.slice(f.length+1).trim()
;let m="sed2"===g?e.split(" ",1)[0]:"";return[e=(e=e.slice(m.length).trim())&&r.j(e,g.endsWith("p")?32768:0,m?{r:f,k:m
}:/^[@#$-]?[\w\x80-\ufffd]+$|^\.$/.test(f)?{r:null,k:f}:{r:f,k:null}),5];case"u":case"url":case"search":
b=l.Ml(e,true).split(l.C);break;case"paste":
if(s>0)return h=r.Ol(e),h instanceof Promise?h.then(e=>[e?e.trim().replace(l.C," "):"",5]):[h?h.trim().replace(l.C," "):"",5]
;default:return null}if(c)return[b,2];if(p&&p>12)return null;let x=b[0]&&r.Tl.map.has(b[0])?b.shift():null
;return a.S(b,x,12===p?0:s,p)};let i=(e,s)=>{
a.es.test(e)&&(e=e.slice(1,-1)),e=(e=(e=e.replace(/\uff0c/g," ")).replace(/deg\b/g,"\xb0").replace(/[\xb0']\s*\d+(\s*)(?=\)|$)/g,(e,s)=>(e=e.trim())+("'"===e[0]?"''":"'")+s).replace(/([\u2070-\u2079\xb2\xb3\xb9]+)|[\xb0\uff0b\u2212\xd7\xf7]|''?/g,(e,s)=>{
let r,l=""
;if(!s)return"\xb0"===e?"/180*PI+":(r="\uff0b\u2212\xd7\xf7".indexOf(e))>=0?"+-*/"[r]:`/${"''"===e?3600:60}/180*PI+`
;for(let s of e)l+=s<"\xba"?s>"\xb3"?1:s<"\xb3"?2:3:s.charCodeAt(0)-8304;return l&&"**"+l
}).replace(/([\d.])rad\b/g,"$1")).replace(/^=+|=+$/g,"").trim()
;let r=[].reduce.call(e,(e,s)=>e+("("===s?1:")"===s?-1:0),0);for(;r<0;r++)e="("+e;for(;r-- >0;)e+=")";if(e){
for(;e&&"("===e[0]&&")"===e.slice(-1);)e=e.slice(1,-1).trim();e=e||"()"}
let l="",t=s.MathParser||globalThis.MathParser||{};if(t.evaluate){try{l=t.evaluate("()"!==e?e:"0"),
l="function"==typeof l?"":""+l}catch(e){}t.clean(),t.errormsg&&(t.errormsg="")}return[l,0,e]},f=e=>{let s=r.he
;!parseInt(e,10)||(s=parseInt(e,10),e=e.slice(e.search(/[/ ]/)+1));let t=r.ss.get(s||(s=r.he));if(!t)return
;if(512&t.u)return void console.log(`Unexpected inactive Tab ${s}`);r.g=t.T||t.a
;let a=e.search(/[/ ]/),n=a>0?e.slice(a+1):"";e=e.toLowerCase(),a>0&&(e=e.slice(0,a)),
e.includes("-")&&e.endsWith("able")&&(e+="d");let i=!!n&&/^silent/i.test(n);n=(i?n.slice(7):n).trim();let f,o=0,p=e=>{
console.log(e),o||u.showHUD(e),o=1};if(n.includes("%")&&/%[a-f0-9]{2}/i.test(n)&&(n=l.Le(n)),
n&&!n.startsWith("^ "))p('"vimium://status" only accepts a list of hooked keys'),n="";else if(n){
let e=n.match(/<(?!<)(?:a-)?(?:c-)?(?:m-)?(?:s-)?(?:[a-z]\w+|[^\sA-Z])>|\S/g)
;n=e?e.join(" ").replace(/<(\S+)>/g,"$1"):""}let d=r.g.s,g=d.c,b=c.rs?1===g?g:(f=c.ls(d.Fl,d),
f?1:null===f?0:2):0,y="enable"===e?0:"disable"===e?2:"toggle-disabled"===e?2!==g?2===b?null:2:2===b?0:null:"toggle-enabled"===e?0!==g?0===b?null:0:0===b?2:null:"toggle-next"===e?1===g?0:0===g?2===b?null:2:2===b?0:null:"toggle"===e||"next"===e?0!==g?0:2:("reset"!==e&&p(`Unknown status action: "${e}", so reset`),
null),h=!!n&&"enable"===e,m=null===y?0:2===y?3:1,x={N:1,p:2===y||h?n:null,f:m},$=m?y:0;t.ts=m?{c:$,as:x.p}:null
;for(let e of t.B){let s=e.s;!m&&c.rs&&(f=x.p=c.ls(s.Fl,s),$=null===f?0:f?1:2,1!==$&&s.c===$)||(s.c=$,e.postMessage(x))}
$=t.a.s.c,i||o||u.showHUDEx(r.g,"newStat",0,[[0!==$||h?2===$?"fullyDisabled":"halfDisabled":"fullyEnabled"]]),
r.t&&$!==g&&r.o(s,$)},o=(e,s)=>{let l=e.indexOf(":")+1||e.indexOf(" ")+1;if(l<=0)return["No search engines given",3]
;let t=e.slice(0,l-1).split(e.lastIndexOf(" ",l-1)>=0?" ":"|").filter(e=>r.Tl.map.has(e))
;if(t.length<=0)return["No valid search engines found",3];let n=e.slice(l).split(" "),u=["openUrls"]
;for(let e of t)u.push(a.S(n,e,s));return u.some(e=>e instanceof Promise)?Promise.all(u).then(e=>[e,6]):[u,6]}});