"use strict"
;__filename="background/run_commands.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./ports","./i18n","./key_mappings"],(e,l,t,r,n,u,i,s,o)=>{
Object.defineProperty(l,"__esModule",{value:true
}),l.initHelpDialog=l.waitAndRunKeyReq=l.runNextOnTabLoaded=l.runNextCmdBy=l.getRunNextCmdBy=l.runNextCmd=l.makeFallbackContext=l.wrapFallbackOptions=l.parseFallbackOptions=l.hasFallbackOptions=l.executeExternalCmd=l.executeShortcut=l.portSendFgCmd=l.sendFgCmd=l.onConfirmResponse=l.onBeforeConfirm=l.x=l.oe=l.executeCommand=l.fillOptionWithMask=l.overrideOption=l.overrideCmdOptions=l.concatOptions=l.copyCmdOptions=l.replaceCmdOptions=void 0
;let f,a,m,$=Math.abs,p=0,c=1;l.replaceCmdOptions=e=>{t.y=r.mi(e)},l.copyCmdOptions=(e,l)=>{
for(let t in l)("$"!==t[0]||"$then=$else=$retry=$f=".includes(t+"=")&&!t.includes("="))&&(void 0!==e[t]||(e[t]=l[t]))
;return e},l.concatOptions=(e,t)=>t&&e?l.copyCmdOptions(l.copyCmdOptions(r.Q(),t),e):e||t||null,
l.overrideCmdOptions=(e,l,n)=>{let u=n||t.y;r.yi(r.mi(e),u),l?delete e.$o:e.$o=u,n||(t.y=e)},l.overrideOption=(e,r,n)=>{
(n=n||t.y)[e]=r;let u=n.$o;null!=u&&l.overrideOption(e,r,u)},l.fillOptionWithMask=(e,n,i,s,o,f)=>{
let a,m=-1,$=n,p=true===$||""===$;if(p){let l,t=/\$\$|[$%][sS]/g;for(;(l=t.exec(e))&&"$$"===l[0];);$=l&&l[0]||"$s"}
let c,d=null,v=false,_=!!$&&"string"==typeof $&&e.includes($),y=f||t.y,g=()=>{if(null!==d||1!==h)return d||""
;let e=i&&y[i];if(e)a=i;else{let l=Object.keys(y).filter(e=>"$"!==e[0]&&!s.includes(e)&&true===y[e])
;if(1===l.length)e=a=l[0];else{if(""!==n)return h=l.length,"";e=""}}return m=1,d=e+"",d="$s"===$||"%s"===$?r.Nl(d):d,d
},h=1,b=0
;if(p?((e.includes(c="$c")||e.includes(c="%c"))&&(m=1,v=true),e=e.replace(new RegExp("\\$\\{([^}]*)}|\\$\\$"+(v?"|"+r.ul(c):"")+(_?"|"+r.ul($):""),"g"),(e,l)=>{
if(e===$)return g();if(e===c)return o+"";if(!l)return"$";m=1,b++;let n=false,i=u.Ci.exec(l);i&&(l=l.slice(0,i.index)),
/^[sS]:/.test(l)&&(n="s"===l[0],l=l.slice(2));let s=u.Ii.exec(l)||u.Ai.exec(l)
;s&&(l="<"===s[0][0]?l.slice(0,s.index):l.slice(s[0].length))
;let f=s?t.jl.get("<"===s[0][0]?s[0].slice(1):s[0].slice(0,-1))||"":"__proto__"===l||"$"===l[0]?"":l?y[l]:g()
;return f="string"==typeof f?f:f&&"object"==typeof f?JSON.stringify(f):f+"",i&&(f=t.j(f,0,r.Le(i[0].slice(1)))),
n?r.Nl(f):f})):_&&(g(),null!==d&&(e=e.replace($,()=>d))),1!==h)return{ok:0,result:h};if($&&"string"==typeof $){
let e=f||{};f||l.overrideCmdOptions(e),e.$masked=true,a&&delete e[a]}return{ok:m,value:d||"",result:e,useCount:v,
useDict:b}};let d=e=>{let l=f;if(f=null,l)if(a){let{Ot:t,Et:n}=r.jt();l(e,n),t.then(g)}else l(e,t.r);return t.yn=null,
e?void 0:n.le()},v=e=>{l.executeCommand(e,1,t.Re,t.g,t.M)};l.executeCommand=(e,u,s,m,p,c)=>{if(y(0),f)return f=null,
void(t.yn=null);let _,h=o.si(e),b=e.ga
;if(h&&(_=h.$count)&&(u=u*_||1),1===(u=p||(u>=1e4?9999:u<=-1e4?-9999:0|u||1)));else if(1===b)u=1;else if(b>1&&(u>b||u<-b)){
if(null!=c)u=u<0?-1:1;else if(!(p||h&&true===h.confirmed))return t.Re=s,t.y=null,t.g=m,t.M=u,t.yn=null,
void l.x(e.ra,$(u)).then(v.bind(null,e))}else u=u||1;if(null!=c){let r=0|c.r
;if(r=Math.max(1,r>=0&&r<100?Math.min(r||6,20):$(r)),c.c&&c.c.i>=r&&(!h||"showTip"!==h.$else))return t.g=m,
i.showHUD(`Has run sequential commands for ${r} times`),void(t.yn=null);let n=l.makeFallbackContext(c.c,1,c.u)
;if(h&&((38===e.oi||n.t)&&e.ai||l.hasFallbackOptions(h))){let t={};l.overrideCmdOptions(t,false,h),t.$retry=-r,t.$f=n,
n.t&&e.ai&&!h.$else&&(t.$else="showTip"),h=t}}if(e.ai);else{if(null!=m){
let{oi:r}=e,n=4620>>r&1||4===r&&!!h&&false===h.keepHover;return t.g=m,t.yn=null,void l.portSendFgCmd(m,r,n,h,u)}{
let l=e.oi,t=0;if(18===l?n.Me.goBack&&(t=23):11===l&&(t=14),!t)return;e=o.la(e.ra,h,[t,1,e.ga])}}let{oi:T}=e,j=t.b[T]
;if(a=e.fa,null===a&&(a=e.fa=null!=h&&l.hasFallbackOptions(h)),t.Re=s,t.y=h||(e.ba=r.Q()),t.g=m,t.M=u,u=t.m[T],
null==m&&T<13&&T>2);else if(u<1){if(a){let{Ot:e,Et:l}=r.jt();j(l),e.then(g)}else j(t.r);t.yn=null}else a=e.fa,f=j,
(u<2||2===u&&$(t.M)<2?n.getCurTab:n.te)(d)},l.oe=()=>c&&true!==t.y.confirmed,l.x=(e,n)=>{if(!t.g)return f=null,
t.M=t.M>0?1:-1,Promise.resolve(t.M>0);let u="string"==typeof e?e:"string"==typeof e[0]?e[0]:null
;if(!m&&u)return l.initHelpDialog().then(()=>l.x(e,n));let{Ot:o,Et:a}=r.jt(),$=t.M,d=t.y,v=t.g
;return y(setTimeout(_,2e3,0,void 0)),f=e=>{t.Re=0,t.y=d,t.g=v,t.M=e?$>0?1:-1:$,c=0,a(e),setTimeout(()=>{c=1},0)},
Promise.resolve(u?s.D("cmdConfirm",[n,t.na[1].get(m.ea(u))||`### ${u} ###`]):e[0][0]).then(l=>{var r
;((null===(r=i.I())||void 0===r?void 0:r.T)||t.g).postMessage({N:12,c:"",i:p,m:l,r:"string"!=typeof e})}),o}
;let _=(e,l)=>{let t=f;f=null,(e>1||(null==l?void 0:l.i))&&t&&t(e<3)},y=e=>{p&&clearTimeout(p),p=e}
;l.onBeforeConfirm=e=>{e.i>=-1&&p===e.i&&clearTimeout(e.i)},l.onConfirmResponse=(e,t)=>{
let r="number"!=typeof e.i?e.i.i:0
;0===e.i||r>=-1&&p!==r||(y(0),e.r?_(e.r,e.i):l.executeCommand(o.da.get(e.i.c),e.n,0,t,0))},l.sendFgCmd=(e,r,n)=>{
l.portSendFgCmd(t.g,e,r,n,1)},l.portSendFgCmd=(e,l,t,r,n)=>{e.postMessage({N:10,H:t?i.ensureInnerCSS(e.s):null,c:l,n,a:r
})},l.executeShortcut=(e,u)=>{let s=o.da.get(e),f=38===s.oi&&s.ai;if(f&&t.oa(s),y(0),u&&!(512&u.a.s.u)){let t=u.a
;return y(setTimeout(l.executeShortcut,100,e,null)),t.postMessage({N:12,c:e,i:p,m:"",r:false}),512&u.u&&i.An(u,0),
void i.ensuredExitAllGrab(u)}let a=o.si(s),m=f?"runKey":s.ra,$=s.oi,c=0,d=s
;if(s.ai||(18===$?n.Me.goBack&&(c=23):11===$&&(c=14)),c)d=o.la(m,a,[c,1,s.ga]);else{if(!s.ai)return;c=s.oi}
c>12||c<3?l.executeCommand(d,1,0,null,0):a&&a.$noWarn||((a||(s.ba=r.Q())).$noWarn=true,
console.log("Error: Command",m,"must run on pages which have run Vimium C"))},l.executeExternalCmd=(e,n,u)=>{
let s=e.command;s=s?s+"":"";let f,a=s?o.ia[s]:null;if(!a)return
;if(!(u=u||(n.tab?i.indexFrame(n.tab.id,n.frameId||0)||(f=t.ss.get(n.tab.id),f?f.a:null):null))&&!a[1])return
;let m=e.options||null,$=e.key,p=o.la(s,m),c=e.count;p&&(c="-"!==c?parseInt(c,10)||1:-1,
m&&"object"==typeof m?r.mi(m):m=null,$|=0,l.executeCommand(p,c,$,u,0))},l.hasFallbackOptions=e=>!!(e.$then||e.$else),
l.parseFallbackOptions=e=>{let l=e.$then,t=e.$else;return l||t?{$then:l,$else:t,$retry:e.$retry,$f:e.$f}:null},
l.wrapFallbackOptions=e=>{let r=l.parseFallbackOptions(t.y);return r&&Object.assign(e,r),e},
l.makeFallbackContext=(e,l,t)=>({i:(e?e.i:0)+l,t:t&&2!==t?t:e?e.t:0}),l.runNextCmd=e=>l.runNextCmdBy(e,t.y),
l.getRunNextCmdBy=e=>l.hasFallbackOptions(t.y)?r=>{let u=2&e?void 0===r:n.le(),i=t.y
;return u?l.runNextCmdBy(0,i):l.runNextOnTabLoaded(i,1&e?r:null),2&e?void 0:u}:2&e?t.r:n.le;let g=e=>{
"object"==typeof e?l.runNextOnTabLoaded(t.y,e):"boolean"==typeof e?l.runNextCmdBy(e?1:0,t.y,null):e<0||l.runNextCmdBy(e?1:0,t.y,e>1?e:null)
};l.runNextCmdBy=(e,l,r)=>{let n=e?l.$then:l.$else,u=!!n&&"string"==typeof n;if(u){let e={c:l.$f,r:l.$retry,u:0,w:0
},u=n&&/\$D/.test(n.split("#",1)[0]);y(setTimeout(async()=>{let l=t.ss.get(t.he);await i.ji(l,true)
;let r=t.g&&t.g.s.d===t.he&&l&&l.B.indexOf(t.g)>0?t.g:l?2===l.a.s.c&&l.B.filter(e=>2!==e.s.c&&!(512&e.s.u)).sort((e,l)=>e.s.E-l.s.E)[0]||l.a:null
;l&&i.ensuredExitAllGrab(l),t.$(n,r,e)},u?0:r||50))}return u},l.runNextOnTabLoaded=(e,r,u)=>{let i=e.$then
;if(!(i&&"string"==typeof i||u))return;let s=r=>{let s=Date.now(),c=s<$-500||s-$>=o||a;if(!r||!p)return m=-1,n.le()
;if(c||"complete"===r.status){if(!c&&!t.ss.has(r.id)&&(u||r.url.startsWith(location.protocol)))return;y(0),f=null,
u&&u(),i&&l.runNextCmdBy(1,e,u?67:0)}
},o=false!==r?1500:500,a=!!i&&/[$%]l/.test(i.split("#",1)[0]),m=r?r.id:false!==r?-1:t.he,$=Date.now()
;y(setInterval(()=>{n.tabsGet(-1!==m?m:t.he,s)},a?50:100)),i&&/\$D/.test(i.split("#",1)[0])&&n.tabsGet(-1!==m?m:t.he,s)
},l.waitAndRunKeyReq=(e,r)=>{let n=e.f,u={$then:e.k,$else:null,$retry:n&&n.r,$f:n&&l.makeFallbackContext(n.c,0,n.u)}
;t.g=r,n&&false===n.u?l.runNextOnTabLoaded(u,null):l.runNextCmdBy(1,u,n&&n.w)},l.initHelpDialog=()=>{let e=t.na||[]
;return m?Promise.resolve(m):Promise.all([n.import2(t.J.HelpDialogJS),null!=e[0]?null:r.ki("help_dialog.html"),null!=e[1]?null:s.getI18nJson("help_dialog")]).then(([e,l,r])=>{
let n=t.na||(t.na=[null,null]);return l&&(n[0]=l),r&&(n[1]=r),m=e},null)}});