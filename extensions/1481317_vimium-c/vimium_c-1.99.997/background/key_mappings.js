"use strict"
;__filename="background/key_mappings.js",define(["require","exports","./store","./utils","./utils","./settings","./exclusions"],(e,t,a,o,n,i,r)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.bi=t.hi=t.ia=t.sa=t.si=t.la=t.ca=t.ua=t.F=t.di=t.da=t.ma=t.pa=void 0
;let s,l,c,u=n.tryParse,d=/<(?!<)(?:.-){0,4}.\w*?(?::i)?>|./g;t.pa=d,t.da=l,t.ma=c;let m,p=true,b=null;t.di=b,
t.F=e=>e.length>1?"<escape>"===e?"esc":e.slice(1,-1):e
;let v=e=>e.length>1?`<${e}>`:e,g=(e,a)=>e.length<=a?null:e.includes(" $",a)||e.includes(" =",a)?t.ua(e.slice(a+1),e.includes(" $if=",a)?0:1):e.slice(a+1)
;t.ua=(e,t)=>{let a=o.Q(),n=0;for(let o of e.split(" ")){let e=o.indexOf("=");if("$#/=_".includes(o[0])){
if(0===e||"__proto__"===o||"$"===o[0]&&!"$if=$key=$desc=$count=$then=$else=$retry=".includes(o.slice(0,e+1))){
(0===t||1===t)&&x("%s option key:",0===e?"Missing":"Unsupported",o);continue}if("#"===o[0]||o.startsWith("//"))break}
if(e<0)a[o]=true,n=1;else{let i=o.slice(e+1);o=o.slice(0,e),a[o]=2===t?i&&f(i):1===t?1:i&&u(i),n=1}}
return 1===n?1===t?e:a:null};let f=e=>{let t
;return"false"!==e&&("null"===e?null:"true"===e||((e>="0"?e<":":"-"===e[0])?(t=parseFloat(e))+""===e?t:/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]\d+)?$/.test(e)?isNaN(t)?u(e):t:e:'{["'.includes(e[0])?u(e):e))
};t.ca=(e,a)=>{let n,r=e.ba;if(void 0===a&&(a=t.ia[e.ra]),n=a.length<4?null:o.mi(a[3]),"string"==typeof r&&(r=t.ua(r)),
r){
if(("$count"in r||"count"in r)&&(1===a[2]?delete r.$count:r.$count=null!=r.$count?parseFloat(r.$count)||1:(parseFloat(r.count||1)||1)*(n&&n.$count||1),
delete r.count),r.$if){if(false===T(r))return false;delete r.$if}if(n&&o.yi(r,n),2===a[0]&&!a[1]){
let t=r,a=t.mode,n=t.m,s=t.characters,l=t.action,c=t.button,u=s&&"string"==typeof s?o.va(i.V("c",s)):null
;if(u&&u.length<4)return e.oi=41,e.ai=1,e.ba=o.mi({text:"Too few characters for LinkHints",isError:true}),e.ga=1,true
;u?t.c=u:"c"in t&&delete t.c,null!=s&&delete t.characters,"action"in t&&delete t.action,"mode"in t&&delete t.mode,
a=l?_[l]:"number"==typeof a?a:a?_[a]:null,
a=null!=a?a:Math.max(0,0|n),a>33&&(a=65===a?t.url?64:a:40===a?t.url?null!=t.join?59:42:null!=t.join?57:a:a>79?a-16:a),
null!=c&&(t.button="string"==typeof c?"right"===c?2:c.startsWith("mid")||c.startsWith("aux")?1:0:Math.max(0,Math.min(0|c,2))),
void 0!==t.xy&&(t.xy=o.W(t.xy)),(t.direct||t.target)&&(t.direct=t.direct||t.target,
t.directOptions=t.directOptions||t.targetOptions,delete t.target,delete t.targetOptions,a&=-17),a!==n&&(t.m=a),
a>63&&(e.ga=1)}}else r=n;return e.ba=r,true},t.la=(e,a,n)=>{void 0===n&&(n=t.ia[e]);let i={oi:n[0],ai:n[1],ra:e,
ba:a||(n.length<4?null:o.mi(n[3])),fa:null,ga:n[2]};return a&&"object"==typeof a&&!t.ca(i,n)?null:i},t.si=e=>{let a=e.ba
;return"string"==typeof a&&(t.ca(e),a=e.ba),a};let k=(e,t)=>{let a
;return e.length>t&&(a=e.indexOf(" $if=",t))>0&&!/ (#|\/\/)/.test(e.slice(t,a+2))},T=e=>{
let t=e&&"object"==typeof e&&e.$if,o=false;return"string"==typeof t&&(t=t.toLowerCase(),
"!"===t[0]&&(t=t.slice(1).trim(),o=true),t=/(?:mac|win|linux)/.test(t)?{sys:t}:/(?:chrom|edg|firefox|safari)/.test(t)?{
browser:{c:1,e:t.includes("edge")&&!t.includes("chrom")?4:1,f:2,s:8}[t[0]]}:null),
t&&"object"==typeof t?t.sys&&t.sys!==a.J.ka||t.browser&&!(2&t.browser)||t.before&&t.before.replace("v","")<a.J.Ta?o:!o:null
};t.sa=(e,t)=>{let a=true,n=0,i=t;if(e[t].startsWith("#if")){
let n=e[t].slice(4).trim(),i=n.startsWith("{")?u(n):n.split(/#|\/\//)[0];a=i&&false===T(o.mi({$if:i}))}
if(a)for(;++i<e.length;)if(e[i].startsWith("#endif")){if(--n<0)break}else e[i].startsWith("#if")&&n++;return i}
;let w=e=>`<${e.slice(1,-1)+":i"}>`,y=e=>{
let n,i,r,u,v,f,y,L=0,H=0,M=new Map,_=new Map,C=null,I=false,U=null,V=o.Q(),F="color:red";for(m=null,
n=e.replace(/\\(?:\n|\\\n[^\S\n]*)/g,"").replace(/[\t ]+/g," ").split("\n");H<n.length&&(!n[H]||"#"===(i=n[H])[0]);H++)i&&"!"===i[1]&&(i=i.slice(2).trim(),
"no-check"===i&&(I=true));for(p=!I,H>=n.length||"unmapAll"!==n[H]&&"unmapall"!==n[H]||(U=0,H++),r=n.length;H<r;H++){
let e=n[H].trim();if(e<"$"){/^#(?:if|else)\b/.test(e)&&(H=t.sa(n,H),I=false);continue}
let r=e.split(" ",3),s=r[0],l=r.length>1?r[1]:"",c=r.length>2?r[2]:"",p=s.length+l.length+c.length+2,N=I;switch(s){
case"map":case"map!":case"run":case"run!":let n="run"===s
;u=void 0,I||(!l||l.length>8&&l.includes("<__proto__>")?x('Unsupported key sequence %c"%s"',F,l||'""',`for "${c||""}"`):4===s.length&&(l.length<2||1!==l.match(d).length||":"===l.slice(-3,-2))?x('"map!" should only be used for a single long key without mode suffix'):M.has(l)&&!k(e,p)?x('Key %c"%s"',F,l,"has been mapped to",M.get(l).ra):c?n||(u=t.ia[c])?!(l>="0"&&l<":"||"-"===l[0])||m&&m.has(l[0])?N=true:x('Invalid key: %c"%s"',F,l,"- a first char can not be '-' or numbers, unless before is `unmap "+l[0]+"`"):x('Command %c"%s"',F,c,"doesn't exist"):x((n?"Lack target when running":"Lack command when mapping")+' %c"%s"',F,l)),
N&&(f=n?t.la("runKey",g(` keys="${c.replace(/"|\\/g,"\\$&")}"`+e.slice(p),0),u):t.la(c,g(e,p),u),f&&(M.set(l,f),
4===s.length&&M.set(w(l),f)));break;case"unmapAll":case"unmapall":M=new Map,_=new Map,C=null,m=null,V=o.Q(),L=U=0,
b&&x("All key mappings is unmapped, but there %s been %c%d error%s%c before this instruction",b.length>1?"have":"has",F,b.length,b.length>1?"s":"","color:auto")
;break;case"mapKey":case"mapkey":
I?i=t.F(l):!c||e.length>p&&!/^(#|\/\/|\$if=\{)/.test(e.slice(p).trimLeft())?x("mapKey: need %s source and target keys:",c?"only":"both",e):l.length>1&&!/^<(?!<[^:]|__proto__>)([acms]-){0,4}.\w*(:[a-z])?>$/.test(l)?x("mapKey: a source key should be a single key with an optional mode id:",e):c.length>1&&!/^<(?!<|__proto__>)([a-z]-){0,4}.\w*>$/.test(c)?x("mapKey: a target key should be a single key:",e):(i=t.F(l),
i in V&&V[i]!==t.F(c)?m&&m.has(i[0])&&":n"===i.slice(1)?false!==T(g(e,p))&&x("`mapKey %s` and `unmap %s...` can not be used at the same time",l,i[0]):k(e,p)?N=true:x('The key %c"%s"',F,l,"has been mapped to another key:",V[i].length>1?`<${V[i]}>`:V[i]):N=true),
N&&false!==T(g(e,p))&&(V[i]=t.F(c),L=1);break;case"shortcut":case"command":
I||(c?!(l.startsWith("userCustomized")&&l.length>14)&&a.J.wa.indexOf(l)<0?x('Shortcut %c"%s"',F,l,"is not a valid name"):_.has(l)&&!k(e,p-1-c.length)?x('Shortcut %c"%s"',F,l,"has been configured"):N=true:x("Lack command name and options in shortcut:",e)),
N&&(y=g(e,p-1-c.length),false!==T(y)&&(i=h(_,l,y),i&&x('Shortcut %c"%s"',F,l,i)));break;case"env":
I||(c?C&&C.has(l)&&!k(e,p-1-c.length)?x('The environment name %c"%s"',F,l,"has been used"):N=true:x("Lack conditions in env declaration:",e)),
N&&(y=g(e,p-1-c.length),false!==T(y)&&(C||(C=new Map)).set(l,y));break;case"unmap":case"unmap!":
!l||c&&!"#$".includes(c[0])?x(`unmap: ${c?"only ":""}needs one mapped key:`,e):false===T(g(e,s.length+l.length+1))||(v=-1,
0!==U&&(v=(U||(U=$.split(" "))).indexOf(l))>=0&&!(1&v)||M.has(l)||l.length>1&&M.has(w(l))?(M.delete(l),
6===s.length&&l.length>1&&M.delete(w(l)),
v<0||U.splice(v,2)):(1===l.length?l>="0"&&l<":"||"-"===l[0]:"esc"===t.F(l)||"<c-[>"===l)?(i=t.F(l)+":n",
i in V&&V[i]!=="c-v-"+l?x("`unmap %s...` and `mapKey <%s>` can not be used at the same time",l,i):1===l.length&&m&&m.has(l)?6!==s.length&&x('Number prefix: %c"%s"',F,l,"has been unmapped"):(1===l.length&&(m||(m=new Set)).add(l),
V[i]="c-v-"+(1===l.length?l:"e"===l[1]?"esc":"["),l.length>1&&(V[i.slice(0,-1)+"i"]=V[i]),
L=1)):6!==s.length&&x('Unmap: %c"%s"',F,l,"has not been mapped"));break;default:
x('Unknown mapping command: %c"%s"',F,s,"in",e)}}
for(let e of a.J.wa)e.startsWith("user")||_.has(e)||(f=t.la(e,null))&&_.set(e,f);if(0!==U)for(s=M.size,
U||(U=$.split(" ")),r=U.length,H=0;H<r;H+=2)M.has(U[H])||M.set(U[H],t.la(U[H+1],null));a.ui=M,t.da=l=_,t.ma=c=C,
a.ya=a.Nr.m=L?V:null},h=(e,a,o)=>{let n,i=1,r=(o=o&&"string"==typeof o?t.ua(o):o)&&o.command||(i=0,
a.startsWith("user")?"":a),s=r?1:0;return s&&r in t.ia&&(i&&delete o.command,(n=t.la(r,o))&&e.set(a,n),s=2),
s<1?'requires a "command" option':s>1?"":"gets an unknown command"},L=e=>{let t=0;for(let a in e){let o=a.length
;if(o>2&&":"===a[o-2])t|="i"===a[o-1]?2:"n"===a[o-1]?1:4;else{
let n=e[a],i=n.length>1,r=i&&("esc"===n||"c-["===n||n.startsWith("v-")||(n=n.slice(n.lastIndexOf("-")+1))<"f:"&&n>"f0")
;t|=o>1||i?r?40:8:a.toUpperCase()!==a&&n.toUpperCase()!==n?16:8}}return t},H=e=>{let n=new Map,i=null!==e,l=null!==b
;i&&(a.mn=t.di=b=null,y(e));let c,u=o.Yr(a.ui),v=i&&p;i&&(a.ha=(a.ya?L(a.ya):0)|(u.join().includes(":i>")?64:0))
;for(let e=0;e<u.length;e++){let o=u[e],i=o.match(d),r=i.length-1,l=t.F(i[0]),m=n.get(l)
;if(e>=s&&void 0!==m&&(1===m||0===r||"object"==typeof m[i[1]])){a.ui.delete(o);continue}if(0===r){void 0!==m&&v&&M(o,m),
n.set(l,1);continue}if(1===m){v&&M(i[0],o);continue}let p=m,b=1;for(m||n.set(l,p={});(c=p[t.F(i[b])])&&1!==c&&b<r;)b++,
p=c;if(1!==c){for(c&&v&&M(o,c);b<r;)p=p[t.F(i[b++])]={};p[t.F(i[r])]=1}else v&&M(i.slice(0,b+1),o)}if(m)for(var g of m){
let e=n.get(g);e&&n.set("c-v-"+g,e)}if(u.length>0){n.set("-",2);for(let e=0;e<=9;e++)n.set(""+e,2)}m=null,
i&&(b?b.length>1?(console.group(b.length+" Errors in custom Key mappings:"),b.map(e=>console.log(...e)),
console.groupEnd()):console.log.apply(console,b[0]):l&&console.log("The new key mappings have no errors"))
;let f=r.in(),k=e=>{for(let t in e){let a=e[t]
;1!==a?t.startsWith("v-")||k(a):(true!==f&&1===n.get(t)&&!(f&&f.has(t))&&(t.length<2||!n.has(t+":i"))||t.startsWith("v-")&&"object"!=typeof n.get(t))&&delete e[t]
}};n.forEach((e,t)=>{t.startsWith("v-")?1===e&&n.delete(t):"object"==typeof e&&k(e)});let T={},w=o.Yr(n).sort()
;for(let e of w)T[e]=n.get(e);a.mn=T,e&&C(e)},M=(e,t)=>{let a=[],o=(e,t)=>{for(let[n,i]of Object.entries(t))n=e+v(n),
1===i?a.push(n):o(n,i)};e="string"!=typeof e?e.map(v).join(""):e,t="string"!=typeof t?(o("",t),
a.join(", ")):t.slice(e.length),x('Inactive suffixes: %o under "%s"',t,e)},x=function(){
(b||(t.di=b=[])).push([].slice.call(arguments,0))
},$="? showHelp <a-c> previousTab <a-s-c> nextTab d scrollPageDown <c-e> scrollDown f LinkHints.activate <f1> simBackspace <s-f1> switchFocus <f2> switchFocus <f8> enterVisualMode G scrollToBottom gf nextFrame gg scrollToTop gi focusInput gn toggleVomnibarStyle gs toggleViewSource gt nextTab gu goUp gF mainFrame gT previousTab gU goToRoot g0 firstTab g$ lastTab h scrollLeft H goBack i enterInsertMode j scrollDown J previousTab K nextTab k scrollUp l scrollRight L goForward <a-m> toggleMuteTab N performBackwardsFind n performFind <a-n> performAnotherFind o Vomnibar.activate <a-p> togglePinTab r reload R reloadGivenTab <a-r> reloadTab <a-s-r> reopenTab t createTab <a-t> createTab u scrollPageUp V enterVisualLineMode v enterVisualMode <a-v> nextTab W moveTabToNextWindow x removeTab X restoreTab yt duplicateTab yy copyCurrentUrl <c-y> scrollUp zH scrollToLeft zL scrollToRight / enterFindMode ` Marks.activate ^ visitPreviousTab [[ goPrevious ]] goNext << moveTabLeft >> moveTabRight b Vomnibar.activateBookmarks ge Vomnibar.activateUrl gE Vomnibar.activateUrlInNewTab m Marks.activateCreate p openCopiedUrlInCurrentTab yf LinkHints.activateCopyLinkUrl B Vomnibar.activateBookmarksInNewTab F LinkHints.activateOpenInNewTab O Vomnibar.activateInNewTab P openCopiedUrlInNewTab T Vomnibar.activateTabs <a-f> LinkHints.activateWithQueue yv LinkHints.activateSelect yi LinkHints.activateCopyImage"
;t.ia={__proto__:null,"LinkHints.activate":[2,0,0,{m:0}],"LinkHints.activateCopyImage":[2,0,0,{m:36}],
"LinkHints.activateCopyLinkText":[2,0,0,{m:40}],"LinkHints.activateCopyLinkUrl":[2,0,0,{m:42}],
"LinkHints.activateDownloadImage":[2,0,0,{m:35}],"LinkHints.activateDownloadLink":[2,0,0,{m:44}],
"LinkHints.activateEdit":[2,0,1,{m:67}],"LinkHints.activateFocus":[2,0,0,{m:34}],"LinkHints.activateHover":[2,0,0,{m:32
}],"LinkHints.activateLeave":[2,0,0,{m:33}],"LinkHints.activateMode":[2,0,0,{m:0}],
"LinkHints.activateModeToCopyImage":[2,0,0,{m:36}],"LinkHints.activateModeToCopyLinkText":[2,0,0,{m:40}],
"LinkHints.activateModeToCopyLinkUrl":[2,0,0,{m:42}],"LinkHints.activateModeToDownloadImage":[2,0,0,{m:35}],
"LinkHints.activateModeToDownloadLink":[2,0,0,{m:44}],"LinkHints.activateModeToEdit":[2,0,1,{m:67}],
"LinkHints.activateModeToFocus":[2,0,1,{m:34}],"LinkHints.activateModeToHover":[2,0,0,{m:32}],
"LinkHints.activateModeToLeave":[2,0,0,{m:33}],"LinkHints.activateModeToOpenImage":[2,0,0,{m:37}],
"LinkHints.activateModeToOpenIncognito":[2,0,0,{m:45}],"LinkHints.activateModeToOpenInNewForegroundTab":[2,0,0,{m:3}],
"LinkHints.activateModeToOpenInNewTab":[2,0,0,{m:2}],"LinkHints.activateModeToOpenUrl":[2,0,0,{m:46}],
"LinkHints.activateModeToOpenVomnibar":[2,0,1,{m:65}],"LinkHints.activateModeToSearchLinkText":[2,0,0,{m:38}],
"LinkHints.activateModeToSelect":[2,0,0,{m:66}],"LinkHints.activateModeToUnhover":[2,0,0,{m:33}],
"LinkHints.activateModeWithQueue":[2,0,0,{m:18}],"LinkHints.activateOpenImage":[2,0,0,{m:37}],
"LinkHints.activateOpenIncognito":[2,0,0,{m:45}],"LinkHints.activateOpenInNewForegroundTab":[2,0,0,{m:3}],
"LinkHints.activateOpenInNewTab":[2,0,0,{m:2}],"LinkHints.activateOpenUrl":[2,0,0,{m:46}],
"LinkHints.activateOpenVomnibar":[2,0,1,{m:65}],"LinkHints.activateSearchLinkText":[2,0,0,{m:38}],
"LinkHints.activateSelect":[2,0,0,{m:66}],"LinkHints.activateUnhover":[2,0,0,{m:33}],
"LinkHints.activateWithQueue":[2,0,0,{m:18}],"LinkHints.click":[2,0,0,{direct:true,m:0}],
"LinkHints.unhoverLast":[7,0,1,{u:true}],"Marks.activate":[11,1,0],"Marks.activateCreate":[11,1,0,{mode:"create"}],
"Marks.activateCreateMode":[11,1,0,{mode:"create"}],"Marks.activateGoto":[11,1,0],"Marks.activateGotoMode":[11,1,0],
"Marks.clearGlobal":[18,1,1],"Marks.clearLocal":[18,1,1,{local:true}],"Vomnibar.activate":[10,1,0],
"Vomnibar.activateBookmarks":[10,1,1,{mode:"bookm"}],"Vomnibar.activateBookmarksInNewTab":[10,1,1,{mode:"bookm",newtab:1
}],"Vomnibar.activateEditUrl":[10,1,0,{url:true}],"Vomnibar.activateEditUrlInNewTab":[10,1,0,{url:true,newtab:1}],
"Vomnibar.activateHistory":[10,1,1,{mode:"history"}],"Vomnibar.activateHistoryInNewTab":[10,1,1,{mode:"history",newtab:1
}],"Vomnibar.activateInNewTab":[10,1,0,{newtab:1}],"Vomnibar.activateTabs":[10,1,1,{mode:"tab",newtab:1}],
"Vomnibar.activateTabSelection":[10,1,1,{mode:"tab",newtab:1}],"Vomnibar.activateUrl":[10,1,0,{url:true}],
"Vomnibar.activateUrlInNewTab":[10,1,0,{url:true,newtab:1}],addBookmark:[13,1,0],autoCopy:[11,0,1,{copy:true}],
autoOpen:[11,0,1,{o:1}],blank:[0,1,0],captureTab:[15,1,1],clearCS:[16,1,1],clearContentSetting:[16,1,1],
clearContentSettings:[16,1,1],clearFindHistory:[17,1,1],closeDownloadBar:[49,1,1,{all:1}],closeOtherTabs:[35,1,1,{
other:true,mayConfirm:true}],closeSomeOtherTabs:[35,1,0],closeTabsOnLeft:[35,1,0,{$count:-1e6,mayConfirm:true}],
closeTabsOnRight:[35,1,0,{$count:1e6,mayConfirm:true}],confirm:[1,1,0],copyCurrentTitle:[19,1,1,{type:"title"}],
copyCurrentUrl:[19,1,1],copyWindowInfo:[19,1,0,{type:"window"}],createTab:[20,1,20],debugBackground:[31,1,1,{reuse:1,
url:a.Qe<69?"about:debugging#addons":"about:debugging#/runtime/this-firefox",id_mask:"$id",url_mask:""}],
discardTab:[21,1,0],dispatchEvent:[9,1,0],duplicateTab:[22,1,20],editText:[13,0,0],enableCSTemp:[42,1,0,{incognito:true
}],enableContentSettingTemp:[42,1,0,{incognito:true}],enterFindMode:[6,1,1,{active:true,selected:true}],
enterInsertMode:[3,1,1,{insert:true}],enterVisualLineMode:[12,1,1,{mode:"line"}],enterVisualMode:[12,1,1],
firstTab:[24,1,0,{absolute:true}],focusInput:[12,0,0],focusOrLaunch:[31,1,1,{reuse:1}],goBack:[18,0,0,{$count:-1}],
goForward:[18,0,0],goNext:[2,1,0,{sed:true}],goPrevious:[2,1,0,{sed:true,rel:"prev"}],goToRoot:[25,1,0,{}],
goUp:[25,1,0,{$count:-1,type:"frame"}],joinTabs:[26,1,0],lastTab:[24,1,0,{$count:-1,absolute:true}],mainFrame:[27,1,1],
moveTabLeft:[28,1,0,{$count:-1}],moveTabRight:[28,1,0],moveTabToIncognito:[29,1,1,{incognito:true}],
moveTabToNewWindow:[29,1,0],moveTabToNextWindow:[30,1,0],newTab:[20,1,20],nextFrame:[4,1,0],nextTab:[24,1,0],
openBookmark:[51,1,0],openCopiedUrlInCurrentTab:[31,1,1,{reuse:0,copied:true}],openCopiedUrlInNewTab:[31,1,20,{
copied:true}],openUrl:[31,1,20],parentFrame:[5,1,0],passNextKey:[9,0,0],performAnotherFind:[6,1,0,{index:"other"}],
performBackwardsFind:[6,1,0,{$count:-1}],performFind:[6,1,0],previousTab:[24,1,0,{$count:-1}],quickNext:[24,1,0],
reload:[18,0,1,{r:1}],reloadGivenTab:[32,1,0,{single:true}],reloadTab:[32,1,0],removeRightTab:[33,1,0],
removeTab:[34,1,0],reopenTab:[36,1,1],reset:[50,1,1],restoreGivenTab:[37,1,0,{one:true}],restoreTab:[37,1,25],
runKey:[38,1,0],scrollDown:[4,0,0],scrollFullPageDown:[4,0,0,{view:2}],scrollFullPageUp:[4,0,0,{dir:-1,view:2}],
scrollLeft:[4,0,0,{dir:-1,axis:"x"}],scrollPageDown:[4,0,0,{dir:.5,view:2}],scrollPageUp:[4,0,0,{dir:-.5,view:2}],
scrollPxDown:[4,0,0,{view:1}],scrollPxLeft:[4,0,0,{dir:-1,axis:"x",view:1}],scrollPxRight:[4,0,0,{axis:"x",view:1}],
scrollPxUp:[4,0,0,{dir:-1,view:1}],scrollRight:[4,0,0,{axis:"x"}],scrollSelect:[14,0,0],scrollTo:[4,0,0,{dest:"min"}],
scrollToBottom:[4,0,0,{dest:"max"}],scrollToLeft:[4,0,0,{axis:"x",dest:"min"}],scrollToRight:[4,0,0,{axis:"x",dest:"max"
}],scrollToTop:[4,0,0,{dest:"min"}],scrollUp:[4,0,0,{dir:-1}],searchAs:[11,0,1,{s:1,copied:true,selected:true}],
searchInAnother:[39,1,1],sendToExtension:[40,1,0],showHelp:[8,1,1],showHUD:[41,1,1],showHud:[41,1,1],showTip:[41,1,1],
simBackspace:[12,0,1,{action:"backspace"}],simulateBackspace:[12,0,1,{action:"backspace"}],sortTabs:[26,1,0,{
sort:"recency",windows:"current"}],switchFocus:[12,0,1,{action:"switch"}],toggleCS:[42,1,0],
toggleContentSetting:[42,1,0],toggleLinkHintCharacters:[7,1,1,{key:"linkHintCharacters"}],toggleMuteTab:[43,1,1],
togglePinTab:[44,1,0],toggleStyle:[15,0,1],toggleSwitchTemp:[7,1,1],toggleViewSource:[45,1,1,{opener:true}],
toggleReaderMode:[45,1,1,{reader:true,reuse:0,opener:true}],toggleVomnibarStyle:[46,1,1,{style:"dark"}],
toggleWindow:[52,1,0],visitPreviousTab:[48,1,0],wait:[0,1,0,{wait:"count"}],zoom:[47,1,0],zoomIn:[47,1,0],
zoomOut:[47,1,0,{$count:-1}],zoomReset:[47,1,0,{reset:true}]};let _={__proto__:null,newtab:2,queue:18,"cur-queue":16,
"new-active":3,"newtab-active":3,hover:32,unhover:33,leave:33,focus:34,"download-media":35,"download-image":35,image:37,
"open-image":37,media:37,search:38,"search-text":38,copy:40,"copy-text":40,"copy-list":57,"copy-url":42,
"copy-url-list":59,download:44,incognito:45,"open-incognito":45,"open-link":46,"open-url":46,"direct-open":46,
"open-directly":46,"directly-open":46,"open-direct":46,"copy-image":36,"edit-url":64,edit:65,"edit-text":65,input:67,
"focus-input":67,editable:67,"focus-editable":67,visual:66,select:66}
;t.hi=["character","word","","lineboundary","line","line","lineboundary","line","lineboundary"],t.bi={l:1,h:0,j:9,k:8,
$:7,0:6,"}":15,"{":14,")":11,"(":10,w:5,W:5,e:3,b:2,B:2,G:17,gg:16,o:20,a:-2,g:-2,aw:21,as:25,ap:26,"a}":26,y:31,Y:32,
C:33,"c-s-c":36,p:34,P:35,f:55,F:57,n:47,N:46,f1:48,"a-f1":48,v:51,V:52,c:53,"/":54,"?":56,"c-e":62,"c-y":61,
"c-down":62,"c-up":61};let C=e=>{let t="";if(!b&&p&&(t="#!no-check\n"),t){let o=a.fl.keyMappings;a.fl.keyMappings=void 0
;try{i.La("keyMappings",t+e)}catch(e){}a.fl.keyMappings=o}};2&a.Xe&&(H(a.q.keyMappings),a.Z||(t.bi["m-s-c"]=36)),
a.fl.keyMappings=e=>{let t=a.ya,o=a.mn;H(e)
;let n=JSON.stringify,r=a.ya,s=!!o&&n(a.mn)!==n(o),l=t?!r||n(t)!==n(r):!!o&&!!r;(l||s)&&i.dn({N:9,m:a.ya,t:a.ha,
k:s?a.mn:null}),l&&i.Ha({N:47,d:{m:a.ya}})}});