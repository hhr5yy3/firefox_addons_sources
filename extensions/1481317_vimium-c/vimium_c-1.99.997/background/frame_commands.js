"use strict"
;__filename="background/frame_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./ports","./exclusions","./i18n","./key_mappings","./run_commands","./open_urls","./tools"],(e,l,t,r,i,n,u,o,a,s,f,d,c)=>{
let m;Object.defineProperty(l,"__esModule",{value:true
}),l.blurInsertOnTabChange=l.ge=l.focusFrame=l.framesGoNext=l.toggleZoom=l.mainFrame=l.framesGoBack=l.openImgReq=l.captureTab=l.handleImageUrl=l.enterVisualMode=l.G=l.me=l.showVomnibar=l.initHelp=l.performFind=l.parentFrame=l.nextFrame=void 0,
t.ei=(e,l,n)=>{var o,a;let s=t.ss.get(t.he)||t.g&&u.I(),d=s?s.a:t.g
;!s||!s.T||d===s.T||512&s.T.s.u||r.tn.test(s.T.s.Fl)&&!(512&d.s.u)&&d.s.Fl.startsWith((null!==(a=null===(o=r.ru(s.T.s.Fl))||void 0===o?void 0:o.origin)&&void 0!==a?a:"")+"/")||(d=s.T)
;let c=setTimeout(()=>{let e=t.li(c,null);e&&e.r&&e.r(false)},4e4),m=r.jt();if(t.li(null,{i:c,t:e,s:l,d:n,r:m.Et}),
d)f.portSendFgCmd(d,0,1,{u:t.J.ti,c:"R TEE UI",a:1===e||5===e||9===e||0?"clipboard-write; clipboard-read":"",t:3e3,
i:!s||d===s.a||512&s.a.s.u?0:s.a.s.E},1);else{let e=m.Ot;i.getCurWnd(false,l=>{let r=l?l.id:t.xe;i.makeWindow({
type:"popup",url:t.J.ti,focused:true,incognito:false,left:0,top:0,width:100,height:32},"",l=>{
let n=l?null:t.li(null,null);if(l){let n=l.id;e.then(()=>{r!==t.xe&&i.Ae.update(r,{focused:true},i.le),
i.Ae.remove(n,i.le)}),e=null}else n&&n.i===c&&(clearTimeout(n.i),n.r&&n.r(false))})})}return m.Ot},l.nextFrame=()=>{
let e=t.g,r=-1,i=u.I(),n=i&&i.B;if(n&&n.length>1){r=n.indexOf(e);for(let e=Math.abs(t.M);e>0;e--)r+=t.M>0?1:-1,
r===n.length?r=0:r<0&&(r=n.length-1);e=n[r]}l.focusFrame(e,0===e.s.E,e!==t.g&&i&&e!==i.a?4:3)},l.parentFrame=()=>{
let e=t.g.s,r=e.d>=0&&u.ri(t.g)?null:"Vimium C can not access frames in current tab";r&&u.showHUD(r),
u.getParentFrame(e.d,e.E,t.M).then(e=>{e?l.focusFrame(e,true,5):l.mainFrame()})},l.performFind=()=>{
let e=t.g.s,l=t.M<0?-t.M:t.M,r=t.y.index,i=r?"other"===r?l+1:"count"===r?l:r>=0?-1-(0|r):0:0,n=t.y.highlight,u=t.y.extend,o="before"===u||"before"===t.y.direction?-1:1,a=!!i||!t.y.active,s=null
;32&e.u||(e.u|=32,s=t.ii),f.sendFgCmd(1,true,f.wrapFallbackOptions({c:i>0?t.M/l:t.M,l:a?1:0,f:s,d:o,
m:"number"==typeof n?n>=1?Math.min(0|n,200):0:n?a?100:20:0,n:!!t.y.normalize,r:true===t.y.returnToViewport,
s:!i&&l<2&&!!t.y.selected,t:u?o>0?2:1:0,p:!!t.y.postOnEsc,e:!!t.y.restart,
q:t.y.query?t.y.query+"":a||t.y.last?c.ce.Jr(e.se,"",i<0?-i:i):""}))},l.initHelp=(e,l)=>f.initHelpDialog().then(r=>{
var i;if(!r)return;let n=e.w&&(null===(i=u.ri(l))||void 0===i?void 0:i.T)||l,o=n.s.Fl.startsWith(t.J.ni),a=e.a||{}
;if(n.s.u|=262144,t.g=n,e.f){let e=t.ui.get("?"),l=e&&8===e.oi&&e.ai?"?":"";l||t.ui.forEach((t,r)=>{
8===t.oi&&t.ai&&(l=l&&l.length<r.length?l:(e=t,r))}),a=l&&s.si(e)||a}f.sendFgCmd(17,true,{h:r.fi(o,a.commandNames),
o:t.J.ni,f:e.f,e:!!a.exitOnClick,c:o&&!!s.di||t.q.showAdvancedCommands})}),l.showVomnibar=e=>{var i;let n=t.g,o=t.y.url
;if(null!=o&&true!==o&&"string"!=typeof o&&(o=null,delete t.y.url),!n){
if(n=(null===(i=u.I())||void 0===i?void 0:i.T)||null,!n)return;t.g=n}let a=null;if(null!=o&&t.y.urlSedKeys){
let r="string"==typeof o?o:"string"==typeof t.y.u?t.y.u:u.P();if(r&&r instanceof Promise)return void r.then(t=>{
f.overrideCmdOptions({u:t||""},true),l.showVomnibar(e)});let i={};a=t.j(r,0,{r:null,k:t.y.urlSedKeys},i),
null!=i.R&&f.overrideCmdOptions({keyword:i.R})}"bookmark"===t.y.mode&&f.overrideOption("mode","bookm")
;let s=t.vomnibarPage_f,{Fl:d}=n.s,c=!s.startsWith(t.J.U),m=d.startsWith(t.J.U),p=e||!s.startsWith(t.Ge)?t.J.ci:s,g=(e=e||(c?m||s.startsWith("file:")&&!d.startsWith("file:///")||s.startsWith("http:")&&!/^http:/.test(d)&&!/^http:\/\/localhost[:/]/i.test(s):n.s.se||m&&!s.startsWith(d.slice(0,d.indexOf("/",d.indexOf("://")+3)+1))))||s===p||n.s.d<0,v=t.y.trailingSlash,b=t.y.trailing_slash,h=f.copyCmdOptions(r.mi({
v:g?p:s,i:g?null:p,t:g?0:c?2:1,s:null!=v?!!v:null!=b?!!b:null,j:g?"":t.J.pi,e:!!t.y.exitOnClick,u:a,
url:"string"==typeof o&&a||o,k:r.gi(true)}),t.y);null==h.icase&&t.vi.actions.includes("icase")&&(h.icase=true),
f.portSendFgCmd(n,6,true,h,t.M),h.k="omni",t.y=h},l.me=(e,l,r)=>{let i=e.s.d,n=i>=0?i:t.he,o=e.s.E||i<0?t.ss.get(n):null
;return o&&(i<0&&(64&e.s.u||e.s.Fl.startsWith("about:"))&&(e=o.a),("tab"===l||!l&&!r&&i<0)&&(o.T||i<0)&&(e=o.T||o.a),
64&e.s.u||e.s.Fl.startsWith("blob:"))?u.getParentFrame(n,e.s.E,1).then(e=>e||o.T||o.a):e},l.G=()=>{
let e=t.y.mode,l=t.M<2||t.M>10?1:t.M,r=e&&"create"===(e+"").toLowerCase()?1:0,i=t.y.key,n={a:r,n:!t.y.storeCount,
s:true!==t.y.swap,t:"",o:t.y};if("string"==typeof i&&1===i.trim().length)return n.a=0,void t.cn[21]({H:21,c:n,k:t.Re,
n:i.trim(),s:0,u:"",l:!!t.y.local},t.g);Promise.resolve(a.D(1===r?"mBeginCreate":"mBeginGoto")).then(e=>{n.t=e,
f.portSendFgCmd(t.g,3,true,n,l)})},l.enterVisualMode=()=>{
let e=t.y.mode,l=t.y.start,i="string"==typeof e?e.toLowerCase():"",n=t.g.s,u=null,o=null,a=null
;16&~n.u&&(32&n.u||(n.u|=32,u=t.ii),o=s.bi,a=s.hi,n.u|=16);let d=r.yi({m:"caret"===i?3:"line"===i?2:1,f:u,g:a,k:o,
t:!!t.y.richText,s:null!=l?!!l:null,w:""},t.y);delete d.mode,delete d.start,delete d.richText,f.sendFgCmd(5,true,d)}
;let p=e=>{try{URL.revokeObjectURL(e)}catch(e){}};l.handleImageUrl=(e,n,o,a,s,f,d,c)=>{var g;if(!o)return void a(1)
;let v=!(!(1&o)||2===t.fe||t.g&&t.g.s.se||9!==o||c),b=4&o||v;if(b&&!n)return void r.ki(e,"blob").then(t=>{
l.handleImageUrl(e,t,o,a,s,f,d,c)});m&&(clearTimeout(m[0]),p(m[1]),m=null);let h=b?URL.createObjectURL(n):"";if(h){
m=[setTimeout(()=>{m&&p(m[1]),m=null},4&o?3e4:5e3),h];let e=a;a=[1,4,9].includes(o)?l=>{e(l),m&&p(h),
m&&m[1]===h&&(clearTimeout(m[0]),m=null)}:e}if(1&o)if(9!==o){
let l="image/jpeg"===(e?e.slice(5,15):n.type).toLowerCase()?"jpeg":"png"
;(n?n.arrayBuffer():r.ki(e,"arraybuffer")).then(e=>{i.n.clipboard.setImageData(e,l).then(()=>{a(true)},e=>{
console.log("Error when copying image: "+e),a(0)})})}else(e||v?Promise.resolve():r.Mi(n).then(l=>{e=l
})).then(()=>t.ei(9===o?o:1,{u:v?h:e,t:f,b:2},n)).then(async t=>{
if("string"==typeof t)return void l.handleImageUrl(t,null,1,a,s,f);if(t)return void a(!!t)
;let i=globalThis.document,u=i.createElement("img");u.alt=s.replace(r.Ti(),""),u.src=e||await r.Mi(n),
i.documentElement.appendChild(u);let o=i.getSelection(),d=i.createRange();d.selectNode(u),o.removeAllRanges(),
o.addRange(d),i.execCommand("copy"),u.remove(),a(1)});if(2&o)return d(e||h),void(1&o||a(1));if(4&o){
let l=(null===(g=u.I())||void 0===g?void 0:g.T)||t.g,n=r.jt();1&o&&!(9!==o)?setTimeout(n.Et,800):n.Et(0),
n.Ot.then(()=>i.downloadFile(h,s,l?l.s.Fl:null)).then(l=>{l||d(e||h),4===o&&a(true)})}},l.captureTab=(e,n)=>{
let o=t.y.show,s=!!t.y.copy,f=t.y.download,d=s?true===f:false!==f,c=!!t.y.richText,m=t.y.png?0:Math.min(Math.max(0|t.y.jpeg,0),100),p=e&&e[0],g=!!p&&p.url.startsWith(location.protocol),v=p?p.windowId:t.xe,b=p?p.title:"Tab"+(p?p.id:t.he)
;b="title"===t.y.name?b:r.now().replace(/[-: ]/g,e=>" "===e?"_":"")+"-"+b,b=b.replace(r.Ti(),""),b+=m>0?".jpg":".png",
i.Me.captureVisibleTab(v,m>0?{format:"jpeg",quality:m}:{format:"png"},e=>{
if(!e)return t.g&&u.showHUD("Can not capture "+(g?"injected extensions":"this tab")),n(0),i.le()
;l.handleImageUrl(e,null,(o?2:0)|(d?4:0)|(s?1:0),s?e=>{
u.showHUD(a.D(e?"imgCopied":"failCopyingImg",[1===e?"HTML":m?"JPEG":"PNG"])),n(e)
}:n,b,((c||"")+"").includes("name")?b:"",e=>{t.cn[26]({t:"pixel=1&",u:e,f:b,a:false,m:37,o:{r:t.y.reuse,m:t.y.replace,
p:t.y.position,w:t.y.window}},t.g)})})},l.openImgReq=(e,l)=>{var i,o;let s=e.u;if(/^<svg[\s>]/i.test(s)){if(s=n.wi(s),
!s)return t.g=l,void u.showHUD(a.D("invalidImg"));e.f=e.f||"SVG Image"}if(!r.ru(s))return t.g=l,
void u.showHUD(a.D("invalidImg"));let c=t.J._i+"#!image ";e.f&&(c+="download="+r.Nl(e.f)+"&"),
false!==e.a&&(c+="auto=once&"),e.t&&(c+=e.t)
;let m=e.o||r.Q(),p={},g=m.s?t.j(s,32768,m.s,p):s,v=null!==(i=p.R)&&void 0!==i?i:35===e.m?"":m.k,b=null!==(o=m.t)&&void 0!==o?o:!v,h=g!==s
;s=g,f.replaceCmdOptions({opener:true,reuse:null!=m.r?m.r:16&e.m?-2:-1,replace:m.m,position:m.p,window:m.w}),t.M=1
;let y=v||h?b?n.Xl(s,v,2):n.S(s.trim().split(r.C),v,2):s;l&&u.safePost(l,{N:11,H:u.ensureInnerCSS(t.g.s),k:1,t:" ",
d:1e-4}),d.openUrlWithActions("string"!=typeof y||!b||y.startsWith(location.protocol)&&!y.startsWith(t.Ge)?y:c+y,9)},
l.framesGoBack=(e,r,n)=>{let o=!!i.Me.goBack;if(!o){let e=n?i.getTabUrl(n):(r.s.E?u.ri(r).T:r).s.Fl
;if(e.startsWith(t.J.U)&&!e.startsWith(t.Ge))return t.g=r,u.showHUD(a.D("noTabHistory")),void f.runNextCmd(0)}
let s=f.hasFallbackOptions(e.o)?(f.replaceCmdOptions(e.o),f.getRunNextCmdBy(0)):i.le,c=(e,l)=>{i.f(e.id,0,null,e=>{
history.go(e)},[l])},m=n?n.id:r.s.d,p=e.s,g=d.parseReuse(e.o.reuse||0);if(g){let t=e.o.position;i.Me.duplicate(m,r=>{
if(!r)return s();if(-2===g&&i.selectTab(m),o){let t=f.parseFallbackOptions(e.o)||{};t.reuse=0,l.framesGoBack({s:p,o:t
},null,r)}else c(r,p);let n=r.index--,u="end"===t?-1:d.newTabIndex(r,t,false,true);null!=u&&u!==n&&i.Me.move(r.id,{
index:3e4===u?-1:u},i.le)})}else{let e=p>0?i.Me.goForward:i.Me.goBack
;if(o||e)for(let l=0,t=p>0?p:-p;l<t;l++)e(m,l?i.le:s);else c(n,p)}},l.mainFrame=()=>{let e=u.I(),r=e&&e.T
;!r||r===e.a&&t.y.$else&&"string"==typeof t.y.$else?f.runNextCmd(0):l.focusFrame(r,true,r===e.a?3:5)},l.toggleZoom=e=>{
if(!i.Me.getZoom)return u.complainLimits("control zoom settings of tabs"),void e(0);i.ye(i.Me.getZoom).then(l=>{
if(!l)return void e(0);let r=t.M<-4?-t.M:t.M;(t.y.in||t.y.out)&&(r=0,t.M=t.y.in?t.M:-t.M);let n,u=t.y.level,o=Math
;if(t.y.reset)n=1;else if(null!=u&&!isNaN(+u)||r>4){
let e=o.max(.1,o.min(0|t.y.min||.3,.9)),l=o.max(1.1,o.min(0|t.y.min||3,100))
;n=null==u||isNaN(+u)?r>1e3?1:r/(r>49?100:10):1+u*t.M,n=o.max(e,o.min(n,l))}else{
let e=0,r=9,i=[.3,.5,.67,.8,.9,1,1.1,1.2,1.33,1.5,1.7,2,2.4,3]
;for(let t=0,n=0;t<i.length&&(n=Math.abs(i[t]-l))<r;t++)e=t,r=n;n=i[e+t.M<0?0:o.min(e+t.M,i.length-1)]}
Math.abs(n-l)>.005?i.Me.setZoom(n,i.Oe(e)):e(0)})},l.framesGoNext=(e,l)=>{let r=t.y.patterns,i=false
;if(r&&r instanceof Array||(r=r&&"string"==typeof r?r:(i=true,e?t.q.nextPatterns:t.q.previousPatterns),r=r.split(",")),
i||!t.y.$fmt){let e=[];for(let l of r)if(l=l&&(l+"").trim(),l&&e.push(".#[:".includes(l[0])?l:l.toLowerCase()),
200===e.length)break;r=e,i||(f.overrideOption("patterns",r),f.overrideOption("$fmt",1))}
let n=r.map(e=>Math.max(e.length+12,4*e.length)),u=Math.max.apply(Math,n);f.sendFgCmd(10,true,f.wrapFallbackOptions({
r:t.y.noRel?"":l,n:e,match:t.y.match,clickable:t.y.clickable,clickableOnHost:t.y.clickableOnHost,exclude:t.y.exclude,
excludeOnHost:t.y.excludeOnHost,evenIf:t.y.evenIf,scroll:t.y.scroll,p:r,l:n,m:u>0&&u<99?u:32,v:false!==t.y.view,
a:!!t.y.avoidClick}))},l.focusFrame=(e,l,r,i)=>{e.postMessage({N:7,H:l?u.ensureInnerCSS(e.s):null,m:r,k:t.Re,c:0,
f:!i&&t.y&&f.parseFallbackOptions(t.y)||{}})},l.ge=()=>{var e;return null!==(e=t.y.blur)&&void 0!==e?e:t.y.grabFocus},
l.blurInsertOnTabChange=e=>{let n=f.parseFallbackOptions(t.y);n&&n.$then?n.$else=n.$then:n=null;let a=l.ge()
;if("string"==typeof a){let e=o.zl(a)||false;f.overrideOption(a===t.y.blur?"blur":"grabFocus",e),a=e}
let s=e?t.ss.get(e.id):null;if(i.le()||!s||a&&true!==a&&!o.kl(a,s.a.s.E?s.a.s.Fl:e.url))return n&&f.runNextCmdBy(1,n),
i.le();setTimeout(()=>{u.ji(t.ss.get(t.he),true).then(()=>{let e=t.ss.get(t.he)
;if(!e||512&e.u)n&&f.runNextCmdBy(1,n);else{let l=r.mi({esc:true});n&&f.copyCmdOptions(l,r.mi(n)),
f.portSendFgCmd(e.a,16,false,l,-1)}})},17)}});