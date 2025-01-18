"use strict"
;__filename="background/sync.js",define(["require","exports","./store","./utils","./browser","./settings"],(e,t,l,n,r,i)=>{
Object.defineProperty(t,"__esModule",{value:true});let u,o=n.mi({findModeRawQueryList:1,innerCSS:1,keyboard:1,
newTabUrl_f:1,vomnibarPage_f:1
}),s=r.n.storage,f="sync.cloud:",a=null,c=null,d="",y=null,S=null,p=0,b=null,g=()=>u||(u=s&&s.sync),m=e=>{O(e,"sync")
},O=(e,t)=>{if("sync"!==t)return;let l=e=>{if(y){n.mi(e);for(let t in y){let l=t.split(":")[0],n=l===t;if(n||!(l in y)){
let r=n?y[t]:null;j(l,null!=r?r.newValue:e[l],e)}}y=null}};if(n.mi(e),y?Object.assign(y,e):y=e,
b)b.then(()=>O({},t));else{e=y,y=null;for(let t in e){let n=e[t]
;if(8===(t.includes(":")?8:j(t,null!=n?n.newValue:null)))return y=e,void g().get(l);delete e[t]}}
},v=console.log.bind(console,"[%s]",{toString(){
return new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," ")}}),j=(e,t,n)=>{
let r,u=t&&"object"==typeof t&&t.$_serialize||"";if(!(e in i.K)||!h(e)){let n=u||!i.ho?-1:i.ao.indexOf(e)
;return void(n>=0&&(r=l.Ln.get(e),(null!=r?r+"":null)!==(null!=t?t+"":null))&&(i.xn(e,null!=t?t:null),i.lo(n)))}
let o=i.K[e];if(u){if("split"===u&&!n)return 8;if(8===(t=T(e,t,n)))return}
if(null==t)return void(l.q[e]!=o&&(b||v("sync.this:","reset",e),w(e,o)));let s,f,a,c=l.q[e]
;(a="object"!=typeof o||!t||"object"!=typeof t)?(f=t,s=c):(f=JSON.stringify(t),s=JSON.stringify(c)),
f!==s&&(f===(a?o:JSON.stringify(o))&&(t=o),
b||v("sync.this:","update",e,"string"==typeof t?(t.length>32?t.slice(0,30)+"...":t).replace(/\n/g,"\\n"):t),w(e,t))
},w=(e,t)=>{d=e,i.La(e,t),d="",e in i.z&&i.dn({N:6,d:[i.z[e]]})},N=(e,t)=>{let l=h(e)?1:i.ao.includes(e)?2:0
;l&&e!==d&&(a||(setTimeout(k,800),a=n.Q()),1===l?a[e]=t:(c||(c=[])).push(e))},J=e=>{let t={Q:'\\"',S:"\\\\",d:"`",l:"<",
n:"\u2029",q:'"',r:"\u2028"};return e.replace(/`[QSdlnqr]/g,e=>t[e[1]])},T=(e,t,l)=>{let n="";switch(t.$_serialize){
case"split":for(let{k:r,s:i}=t,u=0;u<i;u++){let t=l[e+":"+u];if(!t||"string"!=typeof t||!t.startsWith(r))return 8
;n+=t.slice(r.length)}break;case"single":return JSON.parse(J(JSON.stringify(t.d)));default:
return v("Error: can not support the data format in synced settings data:",e,":",t.$_serialize),null}
return"string"==typeof i.K[e]?(n=J(n),n):(n=J(JSON.stringify(n)),JSON.parse(n.slice(1,-1)))},_=(e,t,l)=>{
if(!t||("string"!=typeof t?"object"!=typeof t:t.length<8192/6-40))return;let n=JSON.stringify(t),r=""
;if(n.length<8192/6-40)return;let u=n.length
;n=n.replace(/[<`\u2028\u2029]/g,e=>"<"===e?"`l":"`"===e?"`d":"\u2028"===e?"`r":"`n");let o=n.length
;if(3*(o-u)+3*u<8093)return;if(r=l.encode(n),r.length<8093)return r.length+4*(o-u)<8093?void 0:n
;let s=0,f=Date.now().toString(36)+":",a={}
;n="string"==typeof i.K[e]?n.slice(1,-1):n.replace(/"|\\[\\"]/g,e=>'"'===e?"`q":'\\"'===e?"`Q":"`S"),
S||(S=new TextDecoder),r=l.encode(n);for(let t=0,l=r.length;t<l;){let i,u=Math.min(t+8134,l),o=0
;for(;u<l&&128==(192&r[u]);u--);if(i=S.decode(r.subarray(t,u)),n=i.slice(-6),o=u<l?n.lastIndexOf("\\"):-1,
o>0&&o>n.length-2)i+="b",o=1;else if(o>0&&"u"===n[o+1]){o=n.length-o;for(let e=o;e++<6;i+="b");}else o=0
;if(i=JSON.parse(`"${i}"`),o){let e=i.endsWith("b");e||(u-=o),i=i.slice(0,o>1&&e?o-6:-1)}if(a[e+":"+s++]=f+i,t=u,
s>=13)break}return a[e]={$_serialize:"split",k:f,s},a},k=()=>{let e=a,t=c,u=[],o=[],s=[],d=n.Q(),y={};if(a=c=null,
!e||l.wo!==N)return;let p=Object.keys(e).length>0?new TextEncoder:null;for(let t in e){
let l=t,n=e[l],r=i.K[l],f="string"==typeof r||"object"==typeof r&&"vimSync"!==l?0:13;if(null!=n){let e=_(l,n,p)
;e&&"object"==typeof e?(d[l]=e,f=e[l].s):(y[l]=e?{$_serialize:"single",d:JSON.parse(e)}:n,o.push(l))}else u.push(l)
;for(;f<13;f++)s.push(l+":"+f)}S=p=null,t&&u.push(...t),s.push(...u),u.length>0&&v(f,"reset",u.join(", ")),
s.length>0&&g().remove(s),o.length>0&&(v(f,"update",o.join(", ")),g().set(y));for(let e in d)g().set(d[e],()=>{
let t=r.le();return t?v("Failed to update",e,":",t.message||t):v(f,"update (serialized) "+e),t})},h=e=>!(e in o),D=e=>{
l.Dn=null,p&&clearTimeout(p),p=setTimeout(()=>{p=0,i.io.get(e=>{let t=i.co;if(!t.length)return
;v("storage.local: update settings from localStorage"),n.mi(e);let r=n.Q();for(let n=0,u=t.length;n<u;n++){
let u=t.key(n),o=e[u];if(u in i.K){let e=l.q[u],t=e,n=o;"object"==typeof i.K[u]&&(n=JSON.stringify(o),
t=JSON.stringify(e)),t!==n&&i.La(u,e)}else e[u]!==o&&"i18n_f"!==u&&(r[u]=o)}Object.keys(r).length>0&&i.io.set(r),
t.clear()})},e)},q=(e,t)=>{n.mi(e);let r=e.vimSync||null==l.q.vimSync&&l.mo;if(l.fl.vimSync(false,"vimSync"),
!r)return void t();e.vimSync||(v(f,"enable vimSync"),e.vimSync=true,g().set({vimSync:true}));let u=[],o=i.co
;for(let t in l.q)l.q[t]!==i.K[t]&&(!(t in e)&&h(t)&&("keyLayout"===t&&2&i.ho||u.push(t)),o&&o.length&&o.removeItem(t))
;for(let e of u)j(e,null);for(let t in e)t.includes(":")||j(t,e[t],e);D(60),i._l("vimSync"),setTimeout(()=>{t()},4),
v(f,"download settings")};l.fl.vimSync=e=>{if(!g())return;let t=l.Qe>100?g().onChanged:null,n=t||s.onChanged,r=t?m:O
;if(!e)return n.removeListener(r),void(l.wo=l.r);l.wo!==N?(n.addListener(r),l.wo=N,D(60)):a&&(v(f,"save immediately"),
k())},i.sl.then(()=>{let e=l.q.vimSync;if(false===e||!e&&!l.mo){{let e=true===l.Dn;l.Dn=e?null:D,e&&D(6e3)}
"showActionIcon"in l.fl?l.Ye=null:setTimeout(()=>{l.Ye=null},1e3)
}else l.Ye?(b=l.Ye.then(e=>("showActionIcon"in l.fl?l.Ye=null:setTimeout(()=>{l.Ye=null},1e3),
!!e&&"install"===e.reason)).then(e=>new Promise(t=>{g()?g().get(n=>{
let u=r.le(),o=e&&l.mo&&(u||0===Object.keys(n).length)?()=>{i.La("keyLayout",2),t()}:t;return u?(l.fl.vimSync=l.r,o(),
v("Error: failed to get storage:",u,"\n\tSo disable syncing temporarily.")):q(n,o),u}):t()})).then(()=>{l.Sn=null,b=null
}),l.Sn=Promise.race([b,new Promise(e=>{setTimeout(e,800)})]).then(()=>{l.Sn=null,l.q.vimSync&&l.wo!==N&&i._l("vimSync")
})):i._l("vimSync")})});