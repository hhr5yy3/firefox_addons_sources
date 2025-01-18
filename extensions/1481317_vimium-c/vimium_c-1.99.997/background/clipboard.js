"use strict"
;__filename="background/clipboard.js",define(["require","exports","./store","./utils","./exclusions","./normalize_urls"],(e,t,l,r,n,u)=>{
Object.defineProperty(t,"__esModule",{value:true}),t.replaceUsingClipboard=t.doesNeedToSed=t.O=void 0;let f={
__proto__:null,atob:8,base64:9,base64decode:8,btoa:9,base64encode:9,decodeforcopy:1,decode:1,decodeuri:1,decodeurl:1,
decodemaybeescaped:2,decodeall:19,decodecomp:2,encode:10,encodecomp:11,encodeall:12,encodeallcomp:13,unescape:3,upper:4,
lower:5,capitalize:16,capitalizeall:17,camel:14,camelcase:14,dash:15,dashed:15,hyphen:15,normalize:6,reverse:7,
reversetext:7,break:99,stop:99,return:99,latin:18,latinize:18,latinise:18,noaccent:18,nodiacritic:18,json:20,
jsonparse:21,readablejson:25,virtual:22,virtually:22,dryrun:22,inc:23,dec:24,increase:23,decrease:24
},a=/^[<>][\w\x80-\ufffd]{1,8}$|^[\w\x80-\ufffd]{1,8}>$/,o=null,i=0,s=(e,t)=>{let l=[],n=new Map
;for(let u of e.replace(/\\(?:\n|\\\n[^\S\n]*)/g,"").split("\n")){
u=u.trim(),a.test(u)&&(u=`s/^//,${">"===u[0]?"copy":"paste"}=${u.endsWith(">")?u.slice(0,-1):u.slice(1)}`)
;let e=/^([\w\x80-\ufffd]{1,8})([^\x00- \w\\\x7f-\uffff])/.exec(u);if(!e)continue;let o=e[2],i=n.get(o);if(!i){
let e="\\u"+(o.charCodeAt(0)+65536).toString(16).slice(1)
;i=new RegExp(`^((?:\\\\[^]|[^${e}\\\\])+)${e}(.*)${e}([a-z]{0,9})(?:,|$)`),n.set(o,i)}
let s=i.exec(u=u.slice(e[0].length));if(!s)continue;let p=e[1],d=s[3],g=u.slice(s[0].length),b=[],x=null,_=0
;for(let e of g?g.split(","):[]){let t=e.toLowerCase()
;if(t.startsWith("host="))x=e.slice(5);else if(t.startsWith("match"))_=Math.max(t.includes("=")&&parseInt(t.split("=")[1])||1,1);else if(t.includes("="))b.push(t);else{
let e=f[t.replace(/[_-]/g,"")]||0;e&&b.push(e)}}let y=r.pl(s[1],_?d.replace(/g/g,""):d);y&&l.push({gl:t||$(p),bl:x,$l:y,
xl:_,yl:c(s[2],1),wl:b})}return l
},c=(e,t)=>e.replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[^])|\$[0$]/g,(e,l)=>l?"x"===l[0]||"u"===l[0]?"$"===(l=String.fromCharCode(parseInt(l.slice(1),16)))?l+l:l:"t"===l?"\t":"r"===l?"\r":"n"===l?"\n":t?"0"===l?"$&":l>="1"&&l<="9"?"$"+l:l:l:t&&"$0"===e?"$&":e),p=(e,t)=>{
let r=14===t,n=15===t,u=16===t,f=17===t,a=l.Qe<78?r||n?/(?:[-_\s\/+\u2010-\u2015]|(\d)|^)([a-z\u03b1-\u03c9]|[A-Z\u0391-\u03a9]+[a-z\u03b1-\u03c9]?)|[\t\r\n\/+]/g:u?/(\b|_)[a-z\u03b1-\u03c9]/:f?/(\b|_)[a-z\u03b1-\u03c9]/g:null:new RegExp(r||n?"(?:[-_\\t\\r\\n/+\\u2010-\\u2015\\p{Z}]|(\\p{N})|^)(\\p{Ll}|\\p{Lu}+\\p{Ll}?)|[\\t\\r\\n/+]":u||f?"(\\b|_)\\p{Ll}":"",u?"u":"ug"),o=0,i=0,s=(e,t)=>t?e.toLocaleLowerCase():e.toLocaleUpperCase()
;return e=r||n?e.replace(a,(t,l,r,u)=>{
let f="\t\r\n/+".includes(t[0]),a=f||!o++&&e.slice(i,u).toUpperCase()===e.slice(i,u).toLowerCase();return f&&(o=0,
i=u+1),
r=r?r.length>2&&r.slice(-1).toLowerCase()===r.slice(-1)&&!/^e?s\b/.test(e.substr(u+t.length-1,3))?n?s(r.slice(0,-2),true)+"-"+s(r.slice(-2),true):s(r[0],a)+s(r.slice(1,-2),true)+s(r.slice(-2,-1),false)+r.slice(-1):n?s(r,true):s(r[0],a)+s(r.slice(1),true):"",
(f?t[0]:(l||"")+(l||n&&!a?"-":""))+r
}):u||f?e.replace(a,e=>s(e,false)):e,n&&(e=e.replace(l.Qe<78?/[a-z\u03b1-\u03c9]([A-Z\u0391-\u03a9]+[a-z\u03b1-\u03c9]?)/g:new RegExp("\\p{Ll}(\\p{Lu}+\\p{Ll})","ug"),(t,l,r)=>(l=l.length>2&&l.slice(-1).toLowerCase()===l.slice(-1)&&!/^e?s\b/.test(e.substr(r+t.length-1,3))?s(l.slice(0,-2),true)+"-"+s(l.slice(-2),true):s(l,true),
t[0]+"-"+l))),e
},d=e=>e.replace(l.Qe<78?/[\u0300-\u0362]/g:new RegExp("\\p{Diacritic}","gu"),""),g=e=>(e=JSON.stringify(e).slice(1,-1)).replace(/[<\s"$%&#()?:+,;]/g,e=>"\\u"+(e.charCodeAt(0)+65536).toString(16).slice(1)),b=e=>(e=(e='"'===e[0]?e.slice(1,e.endsWith('"')?-1:void 0):e).replace(/[\r\n\0]/g,e=>e<"\n"?"\\0":e>"\n"?"\\r":"\\n"),
r.tryParse(e=`"${e}"`));t.O=e=>{if(null!=e.$sed)return e.$sed;let t=e.sed,l=e.sedKeys||e.sedKey
;return null!=t||l||0===l?t&&"object"==typeof t?null!=t.r||t.k?t:null:e.$sed={r:"number"==typeof t?t+"":t,
k:"number"==typeof l?l+"":l}:null};let $=(e,t)=>{if("object"==typeof e)return e.hl||e.vl?e:t?t.k=null:null
;let l=null,r=0,n="number"==typeof e?e+"":e;"_"===n[0]&&(l=[n.slice(1)],n="");for(let e=0;e<n.length;e++){
let u=n.charCodeAt(e),f=-33&u;f>64&&f<91?r|=83===f?32772:1<<f-65:(l||(l=[]),!t&&l.includes(u)||l.push(u))}let u=r||l?{
hl:r,vl:l}:null;return t?t.k=u:u},x=(e,t)=>{if(e.hl&t.hl)return true;let l=t.vl;if(!e.vl||!l)return false
;for(let t of e.vl)if(l.includes(t))return true;return false};t.doesNeedToSed=(e,t)=>{
if(t&&(false===t.r||t.r&&true!==t.r))return false!==t.r;let r=t&&t.k&&$(t.k,t)||(e?{hl:e,vl:null}:null)
;o||r&&(o=s(l.q.clipSub,null));for(let e of r?o:[])if(x(e.gl,r))return true;return false}
;let _=e=>(e.startsWith(",")&&(e="s/^//"+e),
e.includes("\n")?e:l.Qe>77?e.replace(new RegExp("(?<!\\\\) ([\\w\\x80-\\ufffd]{1,8})(?![\\x00- \\w\\\\\\x7f-\\uffff])","g"),"\n$1"):e.replace(/\\ | ([\w\x80-\ufffd]{1,8})(?![\x00- \w\\\x7f-\uffff])/g,(e,t)=>" "===e[1]?e:"\n"+t))
;t.replaceUsingClipboard=(e,t,r)=>{let n=t.yl;if(!n.includes("${"))return e.replace(t.$l,n)
;let u=new Map,f=new Map,a=n.replace(/\$(?:\$|\{([^}]*)})/g,(e,t)=>{if(!t)return e
;let r=t.split(/>(?=[\w\x80-\ufffd]{1,8}$)/);if(r.length>1&&r[0]){let e=r[0],t=r[1]
;return e="0"===e||"$0"===e?"&":"$"===e[0]?e.slice(1):1===e.length?e:{input:"_",lastMatch:"&",lastParen:"+",
leftContext:"`",rightContext:"'"}[e]||"1",u.has(t)?u.get(t).push(e):u.set(t,[e]),"$"+e}
return(l.jl.get(t.replace(/^<|>$/,""))||"").replace(/\$/g,"$$$$")});return e=e.replace(t.$l,u.size?function(){
let t=arguments,l=t.length,r=t[l-2];return a.replace(/\$([$1-9_&+`'])/g,(n,u)=>{if("$"===u)return"$"
;let a="_"===u?e:"&"===u?t[0]:"`"===u?e.slice(0,r):"'"===u?e.slice(r+t[0].length):l-3<=0?"":u>="1"&&u<"9"?+u<=l-2?t[+u]:"":"+"===u?t[l-3]:t[1]
;return f.set(u,a),a})}:a),u.forEach((e,t)=>{let n=e.reduce((e,t)=>e||f.get(t)||"","");i!==r?l.jl.set(t,n):m(t,n)}),e},
l.j=(e,u,a,y)=>{let w=a&&"object"==typeof a?a.r:a;if(false===w)return e;let h=o||(o=s(l.q.clipSub,null))
;w&&("number"==typeof w||"string"==typeof w&&w.length<=8&&!/[^\w\x80-\ufffd]/.test(w))&&(a={r:null,k:w},w=null)
;let v=a&&"object"==typeof a&&(a.k||0===a.k)&&$(a.k,a)||(u?{hl:u,vl:null}:null);w&&true!==w&&(v||(h=[]),
h=s(_(w+""),v||(v={hl:1073741824,vl:null})).concat(h));let j=i
;for(let u of v?h:[])if(x(u.gl,v)&&(!u.bl||("string"==typeof u.bl&&(u.bl=n.zl(u.bl)||-1),-1!==u.bl&&n.kl(u.bl,e)))){
let n=-1,a=e;if(u.xl){let e,l=0,r=u.xl;if(a.replace(u.$l,function(t){let u=arguments;return l=u[u.length-2],
n=l+t.length,e=u.length>2+r&&u[r]||"",""}),n>=0){let r=t.replaceUsingClipboard(a,u,j)
;a=r.slice(l,r.length-(a.length-n))||e||a.slice(l,n)}}else u.$l.test(a)&&(n=u.$l.lastIndex=0,
a=t.replaceUsingClipboard(a,u,j));if(n<0){let e=(u.wl.find(e=>"string"==typeof e&&e.startsWith("else="))||"").slice(5)
;if(e){if(99===f[e])break;/^[\w\x80-\ufffd]{1,8}$/.test(e)&&(v=$(e))}continue}let o=false
;for(let e of u.wl)if("string"!=typeof e){if(o=99===e)break
;a=a?1===e?r.Ll(a):2===e?r.Ml(a):19===e?r.Ml(a,true):3===e?c(a):4===e?a.toLocaleUpperCase():5===e?a.toLocaleLowerCase():10===e?r.Rl(a):11===e?r.Nl(a):12===e?encodeURI(a):13===e?encodeURIComponent(a):8===e?r.Le(a,"atob"):9===e?btoa(a):20===e?g(a):25===e?JSON.stringify(a).slice(1,-1):21===e?b(a):23===e?+a+1+"":24===e?+a-1+"":(a=6!==e&&7!==e&&18!==e||false?a:a.normalize(18===e?"NFD":"NFC"),
7===e?Array.from(a).reverse().join(""):18===e?d(a):14===e||15===e||16===e||17===e?p(a,e):a):""}else{
let t=e.split("=")[0],r=e.slice(t.length+1)
;"copy"===t?m(r,a):"paste"===t?a=l.jl.get(r)||"":"keyword"===t&&y?y.R=r:"act"===t&&y?y.Al="false"!==r:"sys-clip"!==t&&"sysclip"!==t||!y||(y.El=/^-1$|^false$|^non?e?$|null$/i.test(t))
}if(!u.wl.includes(22)&&(e=a,o))break}return r.Sl(),e};let y,m=(e,t)=>{l.jl.set(e,t),i&&clearTimeout(i),
i=setTimeout(()=>{l.jl.clear(),i=0},1e4)},w=()=>{let e=globalThis.document.createElement("textarea")
;return e.style.position="absolute",e.style.left="-99px",e.style.width="0",e.contentEditable="true",e},h=(e,t,n,f,a)=>{
var o;let i=f,s=e=>{let t=l.Tl.map.get(f);return t?u.Cl(e.trim().split(r.C),t.Fl,t.r):e}
;if("string"!=typeof e)return e=e.map(e=>{var t;let r={},u=l.j(e,4,n,r);return(f=null!==(t=r.R)&&void 0!==t?t:i)?s(u):u
}),
e="string"==typeof t&&t.startsWith("json")?JSON.stringify(e,null,+t.slice(4)||2):e.join(t!==!!t&&t||"\n")+(e.length>1&&(!t||t===!!t)?"\n":""),
false!==(n&&"object"==typeof n?n.r:n)&&(e=l.j(e,4096,null,a)),e
;let c=(e=e.replace(/\xa0/g," ").replace(/\r\n?/g,"\n")).charCodeAt(e.length-1)
;return 32!==c&&9!==c||((c=e.lastIndexOf("\n")+1)?e=e.slice(0,c)+e.slice(c).trimRight():32!==(c=e.charCodeAt(0))&&9!==c&&(e=e.trimRight())),
e=l.j(e,4,n,a),(f=null!==(o=a.R)&&void 0!==o?o:i)?s(e):e},v=(e,t,r)=>(e&&(e=e.replace(/\xa0/g," "),e=l.j(e,32768,t,r)),
e),j=(e,t)=>{let l=e&&("string"==typeof e?e:"object"==typeof e&&(e.r||e.k))
;return l&&"string"==typeof l&&(l[0]===t||l.endsWith(">"))&&a.test(l)?l[0]===t?l.slice(1):l.slice(0,-1):null}
;l.Il=(e,t,r,n)=>{let u=j(r,">"),f={};if(u&&(r=null),e=h(e,t,r,n,f),u)return m(u,e),e;if(!e||f.El)return e
;if(y||(y=navigator.clipboard))return y.writeText(e).catch(l.r).then(()=>e);{let t=globalThis.document,l=w()
;return l.value=e,t.body.appendChild(l),l.select(),t.execCommand("copy"),l.remove(),l.value="",e}},l.Ol=(e,t,n)=>{
let u=j(e,"<");if(u)return v(l.jl.get(u)||"",null,n)
;if(y||(y=navigator.clipboard))return y.readText().catch(()=>null).then(t=>"string"==typeof t?t&&v(t.slice(0,20971520),e,n):null)
;let f=globalThis.document,a=w();a.maxLength=t||102400,f.body.appendChild(a),a.focus(),f.execCommand("paste")
;let o=a.value.slice(0,t||102400);return a.value="",a.remove(),a.removeAttribute("maxlength"),
!t&&o.length>=81920&&("data:"===o.slice(0,5).toLowerCase()||r.Jl(o))?l.Ol(e,20971520):v(o,e,n)},l.fl.clipSub=()=>{o=null
}});