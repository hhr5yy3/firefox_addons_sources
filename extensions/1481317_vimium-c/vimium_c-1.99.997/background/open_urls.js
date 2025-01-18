"use strict"
;__filename="background/open_urls.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports","./exclusions","./i18n","./key_mappings","./run_commands","./tools","./clipboard","./filter_tabs"],(e,l,t,r,n,i,u,o,f,s,d,a,v,p,w)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.pn=l.openUrlReq=l.openUrl=l.goToNextUrl=l.openUrlWithActions=l.openShowPage=l.openJSUrl=l.parseReuse=l.wn=l.parseOpenPageUrlOptions=l.preferLastWnd=l.newTabIndex=void 0
;let m={current:0,reuse:1,newwnd:2,frame:3,newbg:-2,lastwndfg:-5,lastwnd:-5,lastwndbg:-6,iflastwnd:-7,reuseincurwnd:-3,
lastwndbgbg:-8,lastwndbginactive:-8}
;l.newTabIndex=(e,l,t,r)=>"before"===l||"left"===l||"prev"===l||"previous"===l?e.index:"after"===l||"next"===l||"right"===l?e.index+1:"default"===l?void 0:false!==r&&null!=n.getGroupId(e)?"start"===l||"begin"===l?e.index:"end"===l||t?void 0:e.index+1:"start"===l||"begin"===l?0:"end"===l?t?3e4:void 0:t?void 0:e.index+1,
l.preferLastWnd=e=>e.find(e=>e.id===t.uu)||e[e.length-1],l.parseOpenPageUrlOptions=(e,l)=>({d:(l=e.decoded,
null!=l?l:e.decode),g:e.group,i:e.incognito,k:e.keyword,m:e.replace,o:e.opener,p:e.position,r:e.reuse,s:p.O(e),
t:e.testUrl,w:e.window})
;let c=e=>"boolean"==typeof e?e:e?"force"===e||("reverse"===e?2!==t.fe:"same"===e||"keep"===e?2===t.fe:null):null,g=e=>"popup"===e||"normal"===e?e:void 0
;l.wn=(e,l)=>{e=e.slice(0,128).split("?")[0].replace(/\\/g,"/")
;let r=t.Z>1&&/\/globalroot\/device\/condrv|\bdevice\/condrv\/kernelconnect/.test(e);return r&&(t.g=l||t.g,
o.showHUD(s.D("harmfulURL"))),r};let y=(e,u,f,s)=>{r.Sl();let v=e=>{a.replaceCmdOptions(u),a.overrideCmdOptions({urls:e,
url:null,url_f:null,copied:null,keyword:null},true)};switch(s[1]){case 1:o.showHUD(s[0],15),a.runNextCmdBy(1,u);break
;case 5:case 7:v(null),7===s[1]||u.$p?e=0:a.overrideOption("$p",1),l.openUrlWithActions(i.Xl(s[0]),e,false,f);break
;case 4:e>=3&&s[0]&&a.runNextCmdBy(1,u);break;case 6:let p=s[0],w=t.he;if("openUrls"===p[0]){let l=p.slice(1),t=[]
;for(let r of l)"string"==typeof r||5!==r[1]&&7!==r[1]||(r=i.Xl(s[0],null,e)),
"string"!=typeof r?Promise.resolve(r).then(l=>{6===l[1]&&"openUrls"===l[0][0]||y(e,u,f,l)}):t.push(r)
;if(0===t.length)return;return v(t),void(f&&f.length>0?M(f):n.getCurTab(M))}setTimeout(()=>{
let e=t.ss.get(w),l=e?e.a:null,n=r.mi({keys:[p[1]]});t.yn=null,"run1"===p[0]?t.$(p[1],l,{c:u.$f,r:u.$retry,u:0,w:0
}):a.executeCommand(d.la("runKey",n),1,0,l,0,null)},0)}},b=(e,l,t)=>{e?a.runNextOnTabLoaded(l,t):a.runNextCmdBy(0,l)
},h=(e,l,r,i,u)=>{let o=l=>(b(l,e,l),n.le());if(u){if(u.length>0&&u[0].incognito&&n.w(r))return void n.tabsCreate({url:r
},o)}else if(n.w(r)&&true!==i)return void n.getCurTab(h.bind(null,e,l,r,true));if(3===l&&t.g&&t.g.s.E){let l={id:t.g.s.d
};return a.sendFgCmd(18,false,{r:1,u:r}),void setTimeout(()=>b(true,e,l),100)}u?n.tabsUpdate(u[0].id,{url:r
},o):n.tabsUpdate({url:r},o)},_=(e,l,t,r,i,u)=>{n.makeWindow({url:e,focused:l,incognito:t,
type:"string"==typeof e||1===e.length?g(r.window):void 0,left:i.left,top:i.top,width:i.width,height:i.height
},null!=i.state?i.state:u&&"minimized"!==u.state?u.state:"",e=>{b(e,r,e&&e.tabs[0])})},k=(e,r,i,u,o)=>{
let f=-2!==r,s=u?u.windowId:t.xe,d=o.find(e=>e.id===s),a=null!=d&&d.incognito
;if(!i.window&&2!==r&&(a||(o=o.filter(e=>e.incognito&&"normal"===e.type)).length>0)){let r={url:e[0],active:f,
windowId:a?s:l.preferLastWnd(o).id};if(a){let e=true===i.opener;r.index=l.newTabIndex(u,i.position,e,i.group),
e&&(r.openerTabId=u.id)}n.openMultiTabs(r,t.M,true,e,a&&i.group,u,e=>{!a&&f&&n.selectWnd(e),b(e,i,e)})
}else _(e,true,true,i,i,d)}
;l.parseReuse=e=>null==e?-1:"string"!=typeof e?"boolean"==typeof e?e?1:-1:isNaN(e=+e&&0|e)||e>3||e<-8?-1:e:(e=e.toLowerCase().replace("window","wnd").replace(/-/g,""))in m?m[e]:-1
;let I=(e,l,i)=>{
let u=l&&l.length>0?n.getTabUrl(l[0]):"",o=[true!==i?false===i?"":i:(/[%$]s/i.exec(e)||["${url_mask}"])[0],t.y.host_mask||t.y.host_mark,t.y.tabid_mask||t.y.tabId_mask||t.y.tabid_mark||t.y.tabId_mark,t.y.title_mask||t.y.title_mark,t.y.id_mask||t.y.id_mark||t.y.id_marker],f=[]
;for(let t=0;t<o.length;t++){let i=null!=o[t]?o[t]+"":"",s=i?e.indexOf(i):-1;if(s>=0){let e=s+i.length;for(let e of f);
f.push([s,e,0===t?/^[%$]S|^\$\{S:/.test(i)?u:r.Nl(u):1===t?r.Nl(new URL(u).host):2===t?u&&""+l[0].id:3===t?u&&""+r.Nl(l[0].title):n.n.runtime.id])
}}if(f.length){let l="",t=0;f.sort((e,l)=>e[0]-l[0]);for(let r of f)l=l+e.slice(t,r[0])+r[2],t=r[1];e=l+e.slice(t)}
return e},$=(e,r,i,u)=>{let o,f=c(u.incognito);o=(r>-4?new Promise(e=>{n.getCurWnd(false,l=>(e(l||null),n.le()))
}):w.eu(g(u.window),true,f,t.xe)).then(e=>e&&new Promise(l=>{n.Me.query({active:true,windowId:e.id},t=>(e.tabs=t,l(e),
n.le()))})),o.then(o=>{let s=!!o&&!o.focused&&o.id!==t.xe,d=-7===r&&!s
;if(!o||!(s||-7===r&&(null==f||o.incognito===!!f))){if(-7===r&&a.runNextCmdBy(0,u))return
;return void _(e,r>-8,null!=f?!!f:i,u,u,o)}let v=o.tabs&&o.tabs.length>0?n.selectFrom(o.tabs):null;n.openMultiTabs({
url:e[0],active:r>-6||d,windowId:o.id,pinned:!!u.pinned,index:v?l.newTabIndex(v,u.position,false,u.group):void 0
},t.M,!!u.incognito&&"string"==typeof u.incognito,e,u.group,v,e=>{r>-6?s&&n.selectWnd(e):e&&r>-8&&!d&&n.selectTab(e.id),
b(e,u,r>-6&&-2!==r&&e)})})},T=(e,i,u,o)=>{
let f,s=o&&o[0],d=!!s&&s.incognito||2===t.fe,a=-2!==i&&-8!==i,v=2===i||i<-3||!!u.window,p=c(u.incognito),w=null!=p&&"string"==typeof u.incognito
;for(let l=0;l<e.length;l++)e[l].startsWith("about:reader?url=")&&(e[l]=r.Ml(e[l].slice(17)),f=1===e.length)
;if(!w&&e.some(n.w))v=d||v;else if(d)v=false===p||v;else if(p&&i>-4)return void n.Ae.getAll(k.bind(null,e,i,u,s))
;if(v)return void $(e,i,d,u);let m=u.opener&&s?s.id:void 0,g={url:e[0],active:a,windowId:s?s.windowId:void 0,
openerTabId:m,pinned:!!u.pinned,index:s?l.newTabIndex(s,u.position,null!=m,u.group):void 0};f&&(g.openInReaderMode=f),
n.openMultiTabs(g,t.M,w,e,u.group,s,e=>{a&&e&&n.selectWndIfNeed(e),b(e,u,a&&e)})},P=(e,r,i,u,o,s)=>{
let d,v=i?"string"==typeof i?f.zl(i):"object"==typeof i&&i.t&&i.v?i:null:null,p=2===r||1===r,m=1===r||-3===r,y=m&&o.q||{},h=g(m?y.w:u.window),_=c(m?y.i:u.incognito),k=true===(m?y.g:u.group)
;t.M=1,m?(y.m=null,y.g=k):(a.overrideOption("group",k,u),null!=u.replace&&a.overrideOption("replace",v,u)),
d=r<-3&&v?w.eu(h,-7===r,_,t.xe).then(e=>!e||e instanceof Array?null:e):Promise.resolve(!p&&t.xe>=0?{id:t.xe}:null),
Promise.all([d,!k||s?null:new Promise(e=>{n.getCurTab(l=>{s=l||[],e()})})]).then(([e,l])=>v&&(e||p)?new Promise(l=>{
n.Me.query(e?{windowId:e.id}:{windowType:h||void 0},e=>{
let i=null!=_?!_:r>-4?2!==t.fe:-2,u=(e||[]).filter(e=>f.kl(v,e.url)&&e.incognito!==i);if(k&&u.length>0&&s.length>0){
let l=n.getGroupId(s[0]);e&&(u=u.filter(e=>n.getGroupId(e)===l))}if(u.sort((e,l)=>{let r=t.qe.get(l.id),n=t.qe.get(e.id)
;return n?r?r-n:1:r?-1:l.id-e.id}),1===r){let e=u.filter(e=>e.windowId===t.xe);u=e.length>0?e:u}
return l(u.length?u[0]:null),n.le()})}):null).then(i=>{
if(null==i||i.id===t.he&&!m)m?l.pn(o):a.runNextCmdBy(0,u)||(s?T([e],r,u,s):n.getCurTab(T.bind(null,[e],r,u)));else if(t.hn&&i.url.startsWith(t.J._i))x(m?o.f||{}:u,i);else{
let l=-2!==r&&-8!==r,f=i.windowId!==t.xe&&r>-6;n.tabsUpdate(i.id,{url:e},e=>(e&&(l&&(n.selectTab(e.id),e.active=true),
f&&n.selectWnd(e)),b(e,m?o.f||{}:u,-2!==r&&r>-6&&e),n.le()))}})};l.openJSUrl=(e,l,i,u)=>{var f
;if(/^(void|\(void\))? ?(0|\(0\))?;?$/.test(e.slice(11).trim()))a.runNextCmdBy(1,l);else{if(!i&&t.g){
if(0===u&&(t.g=(null===(f=o.I())||void 0===f?void 0:f.T)||t.g),o.safePost(t.g,{N:5,u:e,f:a.parseFallbackOptions(l)
}))return;if(-1!==u)return void a.runNextCmdBy(0,l);t.g=null}(()=>{let t=r.Le(e.slice(11));n.ye(n.Me.executeScript,{
code:t}).then(e=>{void 0===e&&i&&i(),b(!!e,l,null)}),n.le()})()}},l.openShowPage=(e,r,i,u)=>{let o=t.J._i
;if(e.length<o.length+3||!e.startsWith(o))return false
;if(void 0===u)return n.getCurTab(t=>(l.openShowPage(e,t&&t.length>0||-2===r?r:-1,i,t&&t[0]||null),n.le())),true
;e=e.slice(o.length);let f=u?u.incognito:2===t.fe
;e.startsWith("#!image ")&&f&&(e="#!image incognito=1&"+e.slice(8).trim());let s=[e,null,0]
;return t.hn=s[1]=()=>(clearTimeout(s[2]),t.hn=null,s[0]),s[2]=setTimeout(()=>{
s[0]="#!url vimium://error (vimium://show: sorry, the info has expired.)",s[2]=setTimeout(()=>{t.hn===s[1]&&(t.hn=null),
s[0]="",s[1]=null},2e3)},1200),t.M=1,0===r||3===r||f&&(-2===r||-1===r)?f?n.tabsCreate({url:o,active:-2!==r},e=>{b(e,i,e)
}):x(i,u):(i.group=false,i.incognito=false,1===r||-3===r?P(e,r,i.replace,null,{u:o,a:i.parent,p:i.prefix,
q:l.parseOpenPageUrlOptions(i),f:a.parseFallbackOptions(i)},u?[u]:void 0):T([o],r,i,u?[u]:void 0)),true};let x=(e,l)=>{
let i=t.J._i,u=l.url.split("#",2)[1]?[]:n.n.extension.getViews({tabId:l.id})
;u.length>0&&u[0].location.href.startsWith(i)&&u[0].onhashchange?(u[0].onhashchange(),
n.selectTab(l.id)):n.tabsUpdate(l.id,{url:i,active:true}),r.oo(()=>{a.runNextOnTabLoaded(e,null)})},M=e=>{
let r=t.y,u=r.urls;if(2!==r.$fmt){if(1!==r.$fmt)for(let e=0;e<u.length;e++)u[e]=i.Xl(u[e]+"")
;u=u.filter(e=>!t.We.has(e)&&!/file:\/\//i.test(e)),a.overrideCmdOptions({},true),a.overrideOption("urls",u),
a.overrideOption("$fmt",2)}for(let e of u)if(l.wn(e))return n.le()
;let o=l.parseReuse(r.reuse),f=1===o||0===o||3===o||-3===o?-1:o;t.y=null,T(u,f,r,e)};l.openUrlWithActions=(e,u,o,f)=>{
var s,d;if("string"!=typeof e);else if(e||9!==u){
let n=a.fillOptionWithMask(e,t.y.mask,"value",["url","url_mask","url_mark","value"],t.M),v={};n.ok&&(e=n.result,
n.useCount&&(t.M=1));let w=t.y.url_mask,m=t.y.url_mark;if(null==w&&null==m||(e=I(e,f,null!=w?w:m)),o){let l=p.O(t.y)
;e=t.j(e,0,l,v)}if(9!==u){
let l=null!==(s=v.R)&&void 0!==s?s:(t.y.keyword||"")+"",n=null!==(d=t.y.testUrl)&&void 0!==d?d:!l,o=!!v.R||!!v.Al||!!l&&"~"!==l
;e=n?i.Xl(e,l,u):i.S(e.trim().split(r.C),l,o?-2:u),e=n||!o?e:i.Xl(e,null,i.Si&&e.startsWith("vimium:")?3:u)}
let c=t.y.goNext;c&&e&&"string"==typeof e&&(e=t.j(e,8192,null,{}),e=l.goToNextUrl(e,t.M,"absolute"===c)[1],
v.R&&(e=i.S(e.trim().split(r.C),v.R,3))),e="string"==typeof e?i.$i(e):e}else e=t.newTabUrl_f
;let v=t.y,w=l.parseReuse(v.reuse)
;t.y=null,r.Sl(),"string"==typeof e&&e.startsWith("about:reader?url=")&&(w=-2!==w?-1:w),
"string"!=typeof e?Promise.resolve(e).then(y.bind(0,u,v,f)):l.openShowPage(e,w,v)||(r.Jl(e)?l.openJSUrl(e,v,null,w):l.wn(e)?a.runNextCmdBy(0,v):1===w||-3===w?P(e,w,v.replace,null,{
u:e,a:v.parent,p:v.prefix,q:l.parseOpenPageUrlOptions(v),f:a.parseFallbackOptions(v)
},f):0===w||3===w?h(v,w,e):v.replace?P(e,w,v.replace,v,null,f):f?T([e],w,v,f):n.getCurTab(T.bind(null,[e],w,v)))}
;let U=(e,f,d)=>{if(null===d)return o.complainLimits(s.D("readClipboard")),void a.runNextCmd(0)
;if(!(d=d.trim()))return o.showHUD(s.D("noCopied")),void a.runNextCmd(0);let v,p="string"==typeof e&&e.includes("any")
;if(("urls"===e||p)&&(v=d.split(/[\r\n]+/g)).length>1){let e=[],l=p&&t.y.keyword,u=l?l+"":null,s=false
;for(let l of v)if(l=l.trim(),l){if(l=i.Xl(l,u,0),!(p||i.Yl<=2)){e.length=0,s=true;break}e.push(l)}
if(e.length>1)return t.y=a.copyCmdOptions(r.Q(),t.y),t.y.urls=e,t.y.$fmt=1,void(f&&f.length>0?M(f):n.getCurTab(M))
;if(s)return void(a.runNextCmd(0)||o.showHUD("The copied lines are not URLs"))}if(i.es.test(d))d=d.slice(1,-1);else{
let e=t.y.testUrl;(null!=e?e:!t.y.keyword)&&(d=u.In(d,e))}let w=d.indexOf("://")+3;if(w>3&&r.tn.test(d)){
let e,l=(d=/^ttps?:/i.test(d)?"h"+d:d).indexOf("/",w)+1||d.length,t=d.slice(w,l),r=t.startsWith("0.0.0.0")?7:t.includes(":::")&&(e=/^(\[?::\]?):\d{2,5}$/.exec(t))?e[1].length:0
;d=r?d.slice(0,w)+(r>6?"127.0.0.1":"[::1]")+d.slice(w+r):d}l.openUrlWithActions(d,2,false,f)};l.goToNextUrl=(e,l,t)=>{
let r=false
;return e=e.replace(/\$(?:\{([\da-zA-Z_-]+)(?:[,\/#@](\d*)(?::(\d*)(:-?\d*)?)?(?:[,\/#@]([^}]+))?)?\}|\$)/g,(e,n,i,u,o,f)=>{
if("$$"===e)return"$";r=true;let s=10,d=1,a=false
;for(let[e,l]of f?f.split("&").map(e=>e.split("=")):[])"min_len"===e||"len"===e?d=+l||1:"radix"===e?(s=+l||0,
s=s>=2&&s<=36?s:10):"reverse"!==e&&"negative"!==e||(a="1"===l||"true"===l.toLowerCase())
;let v=n&&parseInt(n,s)||1,p=i&&parseInt(i)||0,w=u&&parseInt(u)||0,m=o&&parseInt(o.slice(1))||1
;m<0&&([p,w]=[Math.min(p,w),Math.max(p,w)]),l*=a?-m:m,v=t?l>0?p+l-1:l<0?w+l:v:v+l
;let c=""+Math.max(p||1,Math.min(v,w?w-1:v));return c="0".repeat(d-c.length)+c,c}),[r,e]},l.openUrl=e=>{
if(t.y.urls)return void(t.y.urls instanceof Array&&(e&&e.length>0?M(e):n.getCurTab(M)))
;if((null!=t.y.url_mask||null!=t.y.url_mark)&&!e)return n.le()||void n.getCurTab(l.openUrl);let r=t.y.url
;if(r)l.openUrlWithActions(r+"",3,true,e);else if(t.y.copied){
let l,r=t.y.copied,n="string"!=typeof r?null:r.includes("<")?r.split("<")[1]:r.includes(">")?r.split(">")[0]:null,i={}
;n?(r=r.includes("<")?r.split("<")[0]:r.split(">")[1],l=t.jl.get(n)||"",l=t.j(l,32768,p.O(t.y),i)):l=t.Ol(p.O(t.y),0,i),
null!=i.R&&a.overrideCmdOptions({keyword:i.R}),l instanceof Promise?l.then(U.bind(null,r,e)):U(r,e,l)
}else l.openUrlWithActions(t.y.url_f||"",9,false,e)},l.openUrlReq=(e,n)=>{var f,s;r.mi(e)
;let d=null!=n&&o.isNotVomnibarPage(n,true);t.g=d?n:o.findCPort(n)||t.g
;let v=e.u||"",p=e.n&&a.parseFallbackOptions(e.n)||{},w=e.o||e.n&&l.parseOpenPageUrlOptions(e.n)||{},m=(w.k||"")+"",g=null!==(f=w.t)&&void 0!==f?f:!m,y=w.s,b=e.m||0,h=b<64?-17&b:b,_=null!=e.f?e.f:45===h||46===h
;if(p.group=!d||w.g,p.incognito=null!=c(w.i)?w.i:45===h||null,p.replace=w.m,p.position=w.p,
p.reuse=null!=w.r?w.r:b?"window"===e.t?2:(16&b?-2:-1)+("last-window"===e.t?-4:0):e.r,p.window=w.w,v||!d){
":"===v[0]&&!d&&/^:[bhtwWBHdso]\s/.test(v)&&(v=e.u=v.slice(2).trim());let l=v,n={},o=d?_?1048576:524288:g?16384:0
;v=g?u.Tn(v,_):v,v=t.j(v,o,y,n);let f,a=null!==(s=n.R)&&void 0!==s?s:m
;_?v=(f=v!==l)?i.Xl(v,null,-1):v:(f=!!g||!d&&!a)?(v=g?u.In(v,g):v,
v=i.Xl(v,a,d?-1:3)):(v=i.S(v.trim().split(r.C),a,a&&"~"!==a?-1:0),
f=i.Si,v=f?i.Xl(v,null,v.startsWith("vimium:")?3:0):v),
f&&(2!==i.Yl&&1!==i.Yl||null==e.h?3===i.Yl&&v.startsWith("vimium:")&&!l.startsWith("vimium://")&&(v=i.Xl(v,null,i.Si||v.startsWith("vimium://run")?3:0)):v=(e.h?"https":"http")+v.slice("s"===v[4]?5:4)),
p.opener=d?false!==w.o:t.vi.actions.includes("opener"),p.url_f=v}else{if(!e.c)return t.g=n||o.findCPort(null),
void(a.runNextCmdBy(0,p)||o.showHUD("",14));p.copied=e.c,p.keyword=m,p.testUrl=w.t,p.sed=y}t.M=1,a.replaceCmdOptions(p),
l.openUrl()},l.pn=(e,u)=>{let o,f=r=>{var i;let f=null!==(i=c(m.i))&&void 0!==i?i:2===t.fe&&null;if(r=r||[],
null!==f&&(r=r.filter(e=>e.incognito===f)),m.g&&o.length>0){let e=n.getGroupId(o[0]);r=r.filter(l=>n.getGroupId(l)===e)}
if(r.length>0){let e=r.filter(e=>e.windowId===t.xe);return void s(e.length>0?e:r)}let v=2===t.fe&&n.w(e.u)
;return e.f&&a.runNextCmdBy(0,e.f)||(o.length<=0||m.w||2===y?n.makeWindow({url:e.u,type:g(m.w),incognito:!v&&2===t.fe
},"",e=>{d(e&&e.tabs&&e.tabs.length>0?e.tabs[0]:null)}):v?n.openMultiTabs({url:e.u,active:true
},1,null,[null],m.g,null,d):0===y||3===y?(h({},y,e.u),3===y&&u&&u.s.E?(a.sendFgCmd(18,false,{r:1,u:e.u}),
d(o[0])):n.tabsUpdate(o[0].id,{url:e.u},d)):n.openMultiTabs({url:e.u,index:l.newTabIndex(o[0],m.p,false,true),
openerTabId:m.o&&o[0]?o[0].id:void 0,windowId:o[0].windowId,active:true},1,null,[null],m.g,o[0],d)),n.le()},s=l=>{
let r=e.u,i=!!e.p,u=i?1:e.a?-1:0;u&&l.sort((e,l)=>(e.url.length-l.url.length)*u);let o=n.selectFrom(l)
;if(u&&o.url.length>l[0].url.length===i&&(o=l[0]),t.hn&&o.url.startsWith(t.J._i))x(e.f||{},o),n.selectWndIfNeed(o);else{
let l=o.url,t=r;p=i?l.startsWith(t):e.a?t.startsWith(l):t===l,n.tabsUpdate(o.id,{url:p?void 0:r,active:true},d),
n.selectWndIfNeed(o)}},d=l=>{if(!l)return e.f&&a.runNextCmdBy(0,e.f),n.le();a.runNextOnTabLoaded(e.f||{},l,e.s&&(()=>{
v.ve.Pn(e,l.id,0,p)}))},p=false,w=i.$i(e.u.split("#",1)[0]);if(l.wn(w,u))return;let m=e.q||(e.q={})
;(null==m.g||w.startsWith(t.J.ni))&&(m.g=false);let y=null!=m.r?l.parseReuse(m.r):1
;m.m?P(e.u,3!==y&&0!==y?y:1,m.m,null,e):n.ye(n.getCurTab).then(async l=>{o=l
;let i=[],u=-3===y&&t.xe>=0?t.xe:void 0,s=w,d=g(m.w)||"normal";if(r.tn.test(w)){
let l=w.indexOf("/")+2,t=w.indexOf("/",l+1),r=w.slice(l,t>0?t:void 0);e.a&&(w=w.slice(0,t>0?t+1:void 0),
s=w=w.endsWith("/")?w:w+"/"),r&&r.includes("@")&&(s=w=w.slice(0,l)+r.split("@")[1]+w.slice(t)),
r.includes(":")&&"["!==r[0]&&(s=w.slice(0,l)+r.split(":")[0]+w.slice(t))}let a=!!(e.p||e.a)
;!w.startsWith("file:")&&!w.startsWith("ftp")||w.includes(".",w.lastIndexOf("/")+1)||(i.push(s+(a?"/*":"/")),
s!==w&&i.push(w+(a?"/*":"/"))),i.push(a?s+"*":s),s!==w&&i.push(a?w+"*":w);for(let l of i){let t=await n.ye(n.Me.query,{
url:l,windowType:d,windowId:u});if(t&&t.length&&(t=t.filter(e=>e.url.startsWith(w))),
t&&e.a&&(t=t.filter(e=>w.startsWith(e.url.split(/[#?]/,1)[0]))),t&&t.length>0)return f(t)}f([])})}});