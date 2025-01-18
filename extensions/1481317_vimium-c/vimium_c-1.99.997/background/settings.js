"use strict"
;__filename="background/settings.js",define(["require","exports","./store","./utils","./browser","./normalize_urls","./parse_urls","./ports"],(e,t,o,s,a,n,l,r)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.ao=t.z=t.Gn=t.K=t.V=t.lo=t.Ha=t.dn=t._l=t.ro=t.xn=t.La=t.sl=t.io=t.co=t.ho=void 0;let i=null,c=null;t.ho=0,
t.co=localStorage,t.io=a.n.storage.local,t.sl=Promise.all([a.n.runtime.getBrowserInfo().then(e=>{
let t=e&&e.version,s=parseInt(t||"0")||0;o.J.Ee=e&&e.name||"",o.Qe=s||o.Qe,o.A.v=o.Nr.v=o.Qe,
91===s&&(o.A.V=parseInt(t.split(".")[1])||0)}),a.je(a.n.runtime.getPlatformInfo).then(e=>{
let t=(e.os||"").toLowerCase(),s=a.n.runtime.PlatformOs,n=t===s.WIN?2:t===s.MAC?0:1;o.J.ka=t,o.Nr.o=o.A.o=n,o.Z=n
}),a.je(t.io.get.bind(t.io)).then(e=>{let s=o.q;Object.assign(s,t.K),e=e||{}
;for(let a of Object.entries(e))a[0]in t.K?s[a[0]]=a[1]:o.Ln.set(a[0],a[1]);let a=0;a=t.co.length;for(let e=0;e<a;e++){
let a=t.co.key(e),n=t.co.getItem(a);if(a in t.K){
let e=t.K[a],o="string"==typeof e?n:false===e||true===e?"true"===n:JSON.parse(n);s[a]=o}else o.Ln.set(a,n)}
let n=a+Object.keys(e).length;return o.mo=0===n,n})]).then(e=>{260===o.q.keyLayout&&(t.ho|=1,w())
;for(let e in t.z)t.V(t.z[e],o.q[e],o.A);return o.A.g=o.q.grabBackFocus,o.Nr.l=o.A.l,o.Xe=2|o.Xe,e[2]}),t.sl.then(()=>{
o.eo&&o.eo()}),t.La=(e,a)=>{o.q[e]=a,c||(c=s.Q(),setTimeout(h,0));let n=t.K[e];t.co.removeItem(e);let l,r=a!==n?a:null
;if(c[e]=r,o.wo(e,r),e in t.z&&t.V(t.z[e],a,o.A),l=o.fl[e])return l(a,e)},t.xn=(e,t)=>{let a=o.Ln.get(e)
;(void 0!==a?a:null)!==t&&(c||(c=s.Q(),setTimeout(h,0)),c[e]=t,null!==t?o.Ln.set(e,t):o.Ln.delete(e))},
t.ro=e=>o.Ln.get(e);let h=()=>{let e=c,o=[];c=null;for(let[t,s]of Object.entries(e))null===s&&(o.push(t),delete e[t])
;t.io.remove(o),t.io.set(e)};t._l=(e,t)=>o.fl[e](void 0!==t?t:o.q[e],e),t.dn=e=>{
if(6!==e.N)m(e);else if(null==e.d.length)m(e);else{let t=e.d;i?t=t.concat(i):s.oo(m.bind(null,e)),i=t,e.d=null}}
;let m=e=>{if(6===e.N&&!e.d){let t=i,s=e.d={};for(let e of t)s[e]=o.A[e];i=null}
r.p(3===e.N?4096:9===e.N?32768|(e.k?65536:0):8192,t=>{for(let o of t.B)o.postMessage(e)})};t.Ha=e=>{
s.Bn(o.Ce.slice(0),t=>(o.Ce.includes(t)&&t.postMessage(e),1))};let w=()=>{
let e=o.Ln.get(t.ao[0]),s=o.Ln.get(t.ao[1]),a=o.Ln.get(t.ao[2]);void 0!==e&&(e+=""),void 0!==s&&(s+=""),
void 0!==a&&(a+="");let n=260;return void 0!==e||void 0!==s||void 0!==a?(n=null==e?4:"2"===e||"true"===e?1:"1"===e?12:4,
n|=null==s||1===n?0:"2"===s||"true"===s?16:"1"===s?512:0,n|=null==a?0:"2"===a?128:"1"===a?64:0,t.ho|=2):t.ho&=-3,
o.q.keyLayout=n};t.lo=e=>{if(e<3&&1&t.ho){let e=o.A.l,s=w();t.V("l",s,o.A)!==e&&t._l("keyLayout",s)}},t.V=(e,t,s)=>{
switch(e){case"c":case"n":t=t.toLowerCase().toUpperCase();break;case"l":t=255&t|(512&t&&!o.Z?16:0);break;case"d":
t=t?" D":""}return s?s[e]=t:t},Object.assign(o.fl,{extAllowList(e){let t=o.qn;if(t.forEach((e,o)=>{
false!==e&&t.delete(o)
}),e)for(let o=e.split("\n"),s=o.length,a=/^[\da-z_]/i;0<=--s;)(e=o[s].trim())&&a.test(e)&&t.set(e,true)},
grabBackFocus(e){o.A.g=e},keyLayout(e){if(o.Nr.l=o.A.l,t.Ha({N:47,d:{l:o.A.l}}),1&t.ho&&!(256&e)){let e=2&t.ho;t.ho&=-4
;for(let s=0,a=e?3:0;s<a;s++)t.xn(t.ao[s],null),o.wo(t.ao[s],null)}},newTabUrl(e){
e=/^\/?pages\/[a-z]+.html\b/i.test(e)?a.n.runtime.getURL(e):a.N(n.Xl(e)),o.newTabUrl_f=e,t.xn("newTabUrl_f",e)},
searchEngines(){
o.Tl.map.clear(),o.Tl.keywords=null,o.Tl.rules=l.Un("~:"+o.q.searchUrl+"\n"+o.q.searchEngines,o.Tl.map).reverse()},
searchUrl(e){let s=o.Tl.map;if(e)l.Un("~:"+e,s);else if(s.clear(),s.set("~",{Tr:"~",r:"",
Fl:o.q.searchUrl.split(" ",1)[0]}),o.Tl.rules=[],o.newTabUrl_f=o.Ln.get("newTabUrl_f")||"",o.newTabUrl_f)return
;t._l("newTabUrl")},vomnibarPage(e){let s=o.Ln.get("vomnibarPage_f")
;!s||e?((e=e?a.N(e):o.q.vomnibarPage)===t.K.vomnibarPage?e=o.J.ci:e.startsWith("front/")?e=a.n.runtime.getURL(e):(e=n.Xl(e),
e=(e=n.$i(e)).replace(":version",`${parseFloat(o.J.Ta)}`)),
o.vomnibarPage_f=e,t.xn("vomnibarPage_f",e)):o.vomnibarPage_f=s}}),t.K={__proto__:null,allBrowserUrls:false,
autoDarkMode:2,autoReduceMotion:2,
clipSub:"p=^git@([^/:]+):=https://$1/=\ns@^https://(?:www\\.)?google\\.com(?:\\.[^/]+)?/url\\?(?:[^&#]+&)*?url=([^&#]+)@$1@,matched,decodecomp\np@^https://item\\.m\\.jd\\.com/product/(\\d+)\\.html\\b@https://item.jd.com/$1.html@",
exclusionListenHash:true,exclusionOnlyFirstMatch:false,exclusionRules:[{passKeys:"",pattern:":https://mail.google.com/"
}],
extAllowList:"# extension id or hostname\nnewtab-adapter@gdh1995.cn\nshortcut-forwarding-tool@gdh1995.cn\nnickyfeng@edgetranslate.com\nsaladict@crimx.com",
filterLinkHints:false,grabBackFocus:false,hideHud:false,keepWorkerAlive:false,keyLayout:260,keyboard:[560,33],
keyupTime:120,keyMappings:"",linkHintCharacters:"sadjklewcmpgh",linkHintNumbers:"0123456789",localeEncoding:"gbk",
mouseReachable:true,newTabUrl:"",
nextPatterns:"\u4e0b\u4e00\u5c01,\u4e0b\u9875,\u4e0b\u4e00\u9875,\u4e0b\u4e00\u7ae0,\u540e\u4e00\u9875,\u4e0b\u4e00\u5f20,next,more,newer,>,\u203a,\u2192,\xbb,\u226b,>>",
notifyUpdate:true,omniBlockList:"",passEsc:"[aria-controls],[role=combobox],#kw.s_ipt",
previousPatterns:"\u4e0a\u4e00\u5c01,\u4e0a\u9875,\u4e0a\u4e00\u9875,\u4e0a\u4e00\u7ae0,\u524d\u4e00\u9875,\u4e0a\u4e00\u5f20,prev,previous,back,older,<,\u2039,\u2190,\xab,\u226a,<<",
regexFindMode:false,scrollStepSize:100,
searchUrl:o.Vn?"https://www.baidu.com/s?ie=utf-8&wd=%s \u767e\u5ea6":"https://www.google.com/search?q=%s Google",
searchEngines:o.Vn?"b|ba|baidu|Baidu|\u767e\u5ea6: https://www.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://www.baidu.com/ \u767e\u5ea6\nbi: https://www.bing.com/search?q=$s\nbi|bing|Bing|\u5fc5\u5e94: https://cn.bing.com/search?q=%s \\\n  blank=https://cn.bing.com/ \u5fc5\u5e94\ng|go|gg|google|Google|\u8c37\u6b4c: https://www.google.com/search?q=%s\\\n  www.google.com re=/^(?:\\.[a-z]{2,4})?\\/search\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://www.google.com/ Google\nbr|brave: https://search.brave.com/search?q=%s Brave\nd|dd|ddg|duckduckgo: https://duckduckgo.com/?q=%s DuckDuckGo\nec|ecosia: https://www.ecosia.org/search?q=%s Ecosia\nqw|qwant: https://www.qwant.com/?q=%s Qwant\nya|yd|yandex: https://yandex.com/search/?text=%s Yandex\nyh|yahoo: https://search.yahoo.com/search?p=%s Yahoo\nmaru|mailru|mail.ru: https://go.mail.ru/search?q=%s Mail.ru\n\nb.m|bm|map|b.map|bmap|\u5730\u56fe|\u767e\u5ea6\u5730\u56fe: \\\n  https://api.map.baidu.com/geocoder?output=html&address=%s&src=vimium-c\\\n  blank=https://map.baidu.com/\ngd|gaode|\u9ad8\u5fb7\u5730\u56fe: https://www.gaode.com/search?query=%s \\\n  blank=https://www.gaode.com\ng.m|gm|g.map|gmap: https://www.google.com/maps?q=%s \\\n  blank=https://www.google.com/maps \u8c37\u6b4c\u5730\u56fe\nbili|bilibili|bz|Bili: https://search.bilibili.com/all?keyword=%s \\\n  blank=https://www.bilibili.com/ \u54d4\u54e9\u54d4\u54e9\ny|yt: https://www.youtube.com/results?search_query=%s \\\n  blank=https://www.youtube.com/ YouTube\n\nw|wiki: https://www.wikipedia.org/w/index.php?search=%s Wikipedia\nb.x|b.xs|bx|bxs|bxueshu: https://xueshu.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://xueshu.baidu.com/ \u767e\u5ea6\u5b66\u672f\ngs|g.s|gscholar|g.x|gx|gxs: https://scholar.google.com/scholar?q=$s \\\n  scholar.google.com re=/^(?:\\.[a-z]{2,4})?\\/scholar\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://scholar.google.com/ \u8c37\u6b4c\u5b66\u672f\n\nt|tb|taobao|ali|\u6dd8\u5b9d: https://s.taobao.com/search?ie=utf8&q=%s \\\n  blank=https://www.taobao.com/ \u6dd8\u5b9d\nj|jd|jingdong|\u4eac\u4e1c: https://search.jd.com/Search?enc=utf-8&keyword=%s\\\n  blank=https://jd.com/ \u4eac\u4e1c\naz|amazon: https://www.amazon.com/s?k=%s \\\n  blank=https://www.amazon.com/ \u4e9a\u9a6c\u900a\n\n\\:i: vimium://sed/s/^//,lower\\ $S re= Lower case\nv.m|math: vimium://math\\ $S re= \u8ba1\u7b97\u5668\nv.p: vimium://parse\\ $S re= Redo Search\ngh|github: https://github.com/search?q=$s \\\n  blank=https://github.com/ GitHub \u4ed3\u5e93\nge|gitee: https://search.gitee.com/?type=repository&q=$s \\\n  blank=https://gitee.com/ Gitee \u4ed3\u5e93\njs\\:|Js: javascript:\\ $S; JavaScript":"bi: https://cn.bing.com/search?q=$s\nbi|bing: https://www.bing.com/search?q=%s \\\n  blank=https://www.bing.com/ Bing\nb|ba|baidu|\u767e\u5ea6: https://www.baidu.com/s?ie=utf-8&wd=%s \\\n  blank=https://www.baidu.com/ \u767e\u5ea6\ng|go|gg|google|Google: https://www.google.com/search?q=%s \\\n  www.google.com re=/^(?:\\.[a-z]{2,4})?\\/search\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://www.google.com/ Google\nbr|brave: https://search.brave.com/search?q=%s Brave\nd|dd|ddg|duckduckgo: https://duckduckgo.com/?q=%s DuckDuckGo\nec|ecosia: https://www.ecosia.org/search?q=%s Ecosia\nqw|qwant: https://www.qwant.com/?q=%s Qwant\nya|yd|yandex: https://yandex.com/search/?text=%s Yandex\nyh|yahoo: https://search.yahoo.com/search?p=%s Yahoo\nmaru|mailru|mail.ru: https://go.mail.ru/search?q=%s Mail.ru\n\ng.m|gm|g.map|gmap: https://www.google.com/maps?q=%s \\\n  blank=https://www.google.com/maps Google Maps\nb.m|bm|map|b.map|bmap|\u767e\u5ea6\u5730\u56fe: \\\n  https://api.map.baidu.com/geocoder?output=html&address=%s&src=vimium-c\ny|yt: https://www.youtube.com/results?search_query=%s \\\n  blank=https://www.youtube.com/ YouTube\nw|wiki: https://www.wikipedia.org/w/index.php?search=%s Wikipedia\ng.s|gs|gscholar: https://scholar.google.com/scholar?q=$s \\\n  scholar.google.com re=/^(?:\\.[a-z]{2,4})?\\/scholar\\b.*?[#&?]q=([^#&]*)/i\\\n  blank=https://scholar.google.com/ Google Scholar\n\na|ae|ali|alie|aliexp: https://www.aliexpress.com/wholesale?SearchText=%s \\\n  blank=https://www.aliexpress.com/ AliExpress\nj|jd|jb|joy|joybuy: https://www.joybuy.com/search?keywords=%s \\\n  blank=https://www.joybuy.com/ Joybuy\naz|amazon: https://www.amazon.com/s?k=%s \\\n  blank=https://www.amazon.com/ Amazon\n\n\\:i: vimium://sed/s/^//,lower\\ $S re= Lower case\nv.m|math: vimium://math\\ $S re= Calculate\nv.p: vimium://parse\\ $S re= Redo Search\ngh|github: https://github.com/search?q=$s \\\n  blank=https://github.com/ GitHub Repo\nge|gitee: https://search.gitee.com/?type=repository&q=$s \\\n  blank=https://gitee.com/ Gitee \u4ed3\u5e93\njs\\:|Js: javascript:\\ $S; JavaScript",
showActionIcon:true,showAdvancedCommands:true,showInIncognito:false,smoothScroll:true,userDefinedCss:"",
vomnibarOptions:{actions:"",maxMatches:10,queryInterval:333,sizes:"77,3,44,0.8",styles:"mono-url"},vimSync:null,
vomnibarPage:"front/vomnibar.html",waitForEnter:true},t.Gn=["showAdvancedCommands"],t.z={__proto__:null,
filterLinkHints:"f",keyLayout:"l",keyboard:"k",keyupTime:"u",linkHintCharacters:"c",linkHintNumbers:"n",
mouseReachable:"e",passEsc:"p",regexFindMode:"r",smoothScroll:"s",scrollStepSize:"t",waitForEnter:"w"},
t.ao=["ignoreKeyboardLayout","ignoreCapsLock","mapModifier"],o.Xe<6&&(()=>{
let e=a.n.runtime.getManifest(),{origin:s}=location,n=s+"/",l=e.content_scripts[0].js,r=o.J,i=o.We,c=e=>(47===e.charCodeAt(0)?s:e.startsWith(n)?"":n)+e
;t.K.newTabUrl="about:newtab",
i.set("about:newtab",1),i.set("about:newtab/",1),r.wa=Object.keys(e.commands||{}).map(e=>"quickNext"===e?"nextTab":e),
r.Ta=e.version,r.aa=e.version_name||e.version,r.ni=c(r.ni),r._i=c(r._i),r.ci=c(t.K.vomnibarPage),r.pi=c(r.Hn),
r.ta=e.homepage_url||r.ta,r.to=c(r.to),r.ti=c(r.ti),l.push("content/injected_end.js"),r.Ue=l.map(c)})()});