"use strict";__filename="background/utils.js",define(["require","exports","./store"],(e,t,a)=>{
Object.defineProperty(t,"__esModule",{value:true
}),t.splitWhenKeepExpressions=t.Yn=t.tryParse=t.isNotPriviledged=t.Ti=t.now=t.va=t.W=t.gi=t.ul=t.Mi=t.Kn=t.ki=t.Bn=t.oo=t.jt=t.sn=t.pl=t.Wn=t.Zn=t.Ar=t.Nl=t.Rl=t.Ml=t.Ll=t.Le=t.ru=t.vn=t.ar=t.Ni=t.mi=t.Q=t.Jl=t.zr=t.ln=t.el=t.Sl=t.Yr=t.yi=t.tn=t.C=void 0,
t.C=/\s+/g,t.tn=/^[a-z][\+\-\.\da-z]+:\/\//,t.yi=(e,t)=>{for(let a in t)void 0!==e[a]||(e[a]=t[a]);return e},
t.Yr=e=>Array.from(e.keys());let n=/a?/;t.Sl=()=>n.test(""),t.el=(e,t,a)=>{let n=a<e.length&&a>t?e.charCodeAt(a-1):0
;return e.slice(t,a+=n>=55296&&n<56320?1:8205===n&&a>t+1?-1:0)},t.ln=(e,t,a)=>{let n=t>0&&t<e.length?e.charCodeAt(t):0
;return e.slice(t+=n>=56320&&n<=57343?-1:8205===n&&t<e.length-1&&t<a-1?1:0,a)},t.zr=e=>{function a(e){
let t=e.charCodeAt(0);return 38===t?"&amp;":39===t?"&apos;":t<39?"&quot;":60===t?"&lt;":"&gt;"}let n=/["&'<>]/g
;return t.zr=e=>e.replace(n,a),t.zr(e)},t.Jl=e=>58===e.charCodeAt(10)&&"javascript"===e.slice(0,10).toLowerCase()
;let r=["","",".ac.ad.ae.af.ag.ai.al.am.ao.aq.ar.as.at.au.aw.ax.az.ba.bb.bd.be.bf.bg.bh.bi.bj.bm.bn.bo.br.bs.bt.bv.bw.by.bz.ca.cc.cd.cf.cg.ch.ci.ck.cl.cm.cn.co.cr.cu.cv.cw.cx.cy.cz.de.dj.dk.dm.do.dz.ec.ee.eg.er.es.et.eu.fi.fj.fk.fm.fo.fr.ga.gb.gd.ge.gf.gg.gh.gi.gl.gm.gn.gp.gq.gr.gs.gt.gu.gw.gy.hk.hm.hn.hr.ht.hu.id.ie.il.im.in.io.iq.ir.is.it.je.jm.jo.jp.ke.kg.kh.ki.km.kn.kp.kr.kw.ky.kz.la.lb.lc.li.lk.lr.ls.lt.lu.lv.ly.ma.mc.md.me.mg.mh.mk.ml.mm.mn.mo.mp.mq.mr.ms.mt.mu.mv.mw.mx.my.mz.na.nc.ne.nf.ng.ni.nl.no.np.nr.nu.nz.om.pa.pe.pf.pg.ph.pk.pl.pm.pn.pr.ps.pt.pw.qa.re.ro.rs.ru.rw.sa.sb.sc.sd.se.sg.sh.si.sj.sk.sl.sm.sn.so.sr.ss.st.su.sv.sx.sy.sz.tc.td.tf.tg.th.tj.tk.tl.tm.tn.to.tr.tt.tv.tw.tz.ua.ug.uk.us.uy.uz.va.vc.ve.vg.vi.vn.vu.wf.ws.ye.yt.za.zm.zw",".aaa.abb.abc.aco.ads.aeg.afl.aig.anz.aol.app.art.aws.axa.bar.bbc.bbt.bcg.bcn.bet.bid.bio.biz.bms.bmw.bnl.bom.boo.bot.box.buy.bzh.cab.cal.cam.car.cat.cba.cbn.cbs.ceb.ceo.cfa.cfd.com.cpa.crs.csc.dad.day.dds.dev.dhl.diy.dnp.dog.dot.dtv.dvr.eat.eco.edu.esq.eus.fan.fit.fly.foo.fox.frl.ftr.fun.fyi.gal.gap.gdn.gea.gle.gmo.gmx.goo.gop.got.gov.hbo.hiv.hkt.hot.how.ibm.ice.icu.ifm.inc.ing.ink.int.ist.itv.iwc.jcb.jcp.jio.jlc.jll.jmp.jnj.jot.joy.kfh.kia.kim.kpn.krd.lat.law.lds.llc.llp.lol.lpl.ltd.man.map.mba.med.men.mil.mit.mlb.mls.mma.moe.moi.mom.mov.msd.mtn.mtr.nab.nba.nec.net.new.nfl.ngo.nhk.now.nra.nrw.ntt.nyc.obi.off.one.ong.onl.ooo.org.ott.ovh.pay.pet.phd.pid.pin.pnc.pro.pru.pub.pwc.qvc.red.ren.ril.rio.rip.run.rwe.sap.sas.sbi.sbs.sca.scb.ses.sew.sex.sfr.ski.sky.soy.spa.srl.srt.stc.tab.tax.tci.tdk.tel.thd.tjx.top.trv.tui.tvs.ubs.uno.uol.ups.vet.vig.vin.vip.wed.win.wme.wow.wtc.wtf.xin.xxx.xyz.you.yun",".aero.arpa.asia.auto.band.beer.chat.city.club.cool.coop.date.fans.fund.game.gift.gold.guru.help.host.info.jobs.life.link.live.loan.love.luxe.mobi.name.news.pics.plus.shop.show.site.sohu.team.tech.wang.wiki.work.yoga.zone",".citic.cloud.email.games.group.local.onion.party.photo.press.rocks.space.store.today.trade.video.world",".center.design.lawyer.market.museum.online.social.studio.travel",".company.fashion.science.website",".engineer.software"]
;t.Q=()=>Object.create(null),
t.mi=e=>Object.setPrototypeOf(e,null),t.Ni=(e,t)=>!t&&/[^a-z]/.test(e)?/^xn--[\x20-\x7f]+/.test(e)||".\u4e2d\u4fe1.\u4e2d\u56fd.\u4e2d\u570b.\u4e2d\u6587\u7f51.\u4f01\u4e1a.\u4f5b\u5c71.\u4fe1\u606f.\u516c\u53f8.\u516c\u76ca.\u5546\u57ce.\u5546\u5e97.\u5546\u6807.\u5728\u7ebf.\u5a31\u4e50.\u5e7f\u4e1c.\u6211\u7231\u4f60.\u624b\u673a.\u62db\u8058.\u653f\u52a1.\u6e38\u620f.\u7f51\u5740.\u7f51\u5e97.\u7f51\u5e97.\u7f51\u7edc.\u8d2d\u7269.\u96c6\u56e2.\u9910\u5385.".includes("."+e+".")?2:0:e&&e.length<r.length&&r[e.length].includes(e)?1:0,
t.ar=e=>{let a=e.toLowerCase().split("."),n=a.length
;return[a,0===t.Ni(a[n-1])?1:n>2&&2===a[n-1].length&&1===t.Ni(a[n-2])?3:2]
},t.vn=(e,a)=>!!(6!==a&&/^\d{1,3}(?:\.\d{1,3}){3}$/.test(e)||4!==a&&/^\[[\da-f]{0,4}(?::[\da-f]{0,4}){1,5}(?:(?::[\da-f]{0,4}){1,2}|:\d{0,3}(?:\.\d{0,3}){3})]$/.test(e))&&!!t.ru("http://"+e),
t.ru=e=>{try{return new URL(e)}catch(e){return null}},t.Le=(e,t)=>{if(!e||!e.includes("%"))return e||"";try{
e=(t?"atob"===t?atob:decodeURI:decodeURIComponent)(e)}catch(e){}return e},t.Ll=(e,a)=>{if(!e.includes("%"))return e
;if(!t.tn.test(e)&&!/^(about|data|javascript|vimium)/i.test(e))return e
;let n=e.replace(/%(2[356f]|3[adf]|40)/gi,"%25$1").replace(/%(?![\da-fA-F]{2})/g,"%25"),r=t.Le(n,1)
;r=r.length!==n.length?r:t.Rl(e,1)
;let o=!a&&(t.tn.test(r)?!r.startsWith("vimium:"):r.startsWith("data:")||r.startsWith("about:"))
;r=r.replace(o?t.C:/[\r\n]+/g,encodeURIComponent);let s=r&&r.charAt(r.length-1)
;return s&&!/[a-z\d\ud800-\udfff]/i.test(s)&&(s=s<"\x7f"?"%"+(s.charCodeAt(0)+256).toString(16).slice(1):t.Nl(s),
s.length>1&&(r=r.slice(0,r.length-1)+s)),r
},t.Ml=(e,a)=>(e=!e.includes("://")&&/%(?:2[36f]|3[adf])/i.test(e)?t.Le(e).trim():e,t.Ll(e,a)),
t.Rl=(e,a)=>(a?e:encodeURI(e)).replace(/(?:%[\da-f]{2})+/gi,e=>{let a=t.Le(e);return a.length<e.length?t.Nl(a):e}),
t.Nl=e=>e.replace(a.Qe<78?/[\x00-\u0390\u03ca-\u4dff\u9fa6-\uffff\s]+/g:new RegExp("[^\\p{L}\\p{N}]+","ug"),encodeURIComponent),
t.Ar=e=>(e=e.slice(0,8).toLowerCase()).startsWith("http://")?7:"https://"===e?8:0,
t.Zn=e=>e.trim()?e.trim().split(/[.\s]+/g).sort().filter(e=>!!e):[],t.Wn=e=>e&&[e[0],e[1],t.Zn(e[2]||"")]||0,
t.pl=(e,t,a)=>{try{return new RegExp(e,t)}catch(n){
0===a||console.log("%c/%s/%s","color:#c41a16",e,t,"is not a valid regexp.")}return null},
t.sn="undefined"!=typeof URLPattern&&URLPattern?(e,t)=>{if(!e.endsWith("*")){
let t=e.indexOf("://"),a=t>0?e.indexOf("/",t+3):-1;e+=t>0&&(a===e.length-1||a<0)?(a>0?"":"/")+"*\\?*#*":""}try{
return new URLPattern(e,"http://localhost",{ignoreCase:true})}catch(a){
0===t||console.log("%c/%s/%s","color:#c41a16",e,"is not a valid URLPattern.")}return null}:()=>null;let o=null,s=e=>{o=e
};t.jt=()=>{let e=new Promise(s),t=o;return o=null,{Ot:e,Et:t}},t.oo="function"==typeof queueMicrotask?e=>{
queueMicrotask(e)}:e=>{Promise.resolve().then(e)},t.Bn=(e,t,a)=>{let n=()=>{a&&false===a()&&(r=0)
;for(let a=0,n=0;a<32&&n<128&&r>0;){let o=t(e[--r]);if(o>0)a++,n+=o;else if(o<0)break}r>0&&(e.length=r,
setTimeout(n,150))},r=e.length;r>=10?setTimeout(n,17):e.length>0&&n()},t.ki=(e,t)=>{let a=!t&&e.endsWith(".json")
;return e=t||e.includes("/")?e:"/front/"+e,
fetch(e).then(e=>a?e.json().then(e=>new Map(Object.entries(e))):t?"blob"===t?e.blob():e.arrayBuffer():e.text())},
t.Kn=(e,a)=>{let n,r=0;a=a||1e4;{let t=new AbortController;r=setTimeout(t.abort.bind(t),a),n=fetch(e,{
cache:"force-cache",signal:t.signal})}
return n=n.then(e=>e.status>=300||e.status<200?null:e.blob().catch(e=>(console.log("on reading response:",e),
0)),e=>(console.log("on requesting",e),null)),r&&n.then(()=>{clearTimeout(r)
}),n.then(e=>e?t.Mi(e.slice(0,Math.min(16,e.size),e.type)).then(t=>[e,t]):(console.clear(),e))},t.Mi=e=>{
let a=new FileReader,n=t.jt();return a.onload=e=>{n.Et(e.target.result)},a.readAsDataURL(e),n.Ot},
t.ul=e=>e.replace(/[$()*+.?\[\\\]\^{|}]/g,"\\$&");let l="",c=0;t.gi=e=>{let t=Date.now();if(t-c>8e3){if(!e)return""
;let t=new Uint8Array(8);crypto.getRandomValues(t),l=t.reduce((e,t)=>e+(t<16?"0":"")+t.toString(16),"")}return c=t,l},
t.W=e=>{if(null!=e&&false!==e){
for(e="string"!=typeof e?"number"==typeof e?[e,.5]:true===e?[.5,.5]:e instanceof Array?e:[+e.x||0,+e.y||0,+e.s||0]:e.trim().split(/[\s,]+/).map((e,t)=>"count"===e&&t<2?e:isNaN(+e)?t<2?.5:0:+e);e.length<2;)e.push(.5)
;for(;e.length<3;)e.push(0);let t="count"===e[0]||"count"===e[1];return{x:e[0],y:e[1],n:t?0:1,s:t?+e[2]||.01:0}}},
t.va=e=>{let t="";for(let a=0,n=e.length-1;a<n;a++){let n=e[a];n.trimRight()&&e.indexOf(n,a+1)<0&&(t+=n)}return t},
t.now=()=>new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," "),
t.Ti=()=>/\.(?:avif|bmp|gif|icon?|jpe?g|a?png|svg|tiff?|webp)$/i,
t.isNotPriviledged=e=>!e.s.Fl.startsWith(location.protocol);let i=(e,t)=>{let a=[],n=0,r=-1,o=0,s=e.length
;for(;n<s;n++)switch(e[n]){case"#":case"&":"#"===e.charAt(n+1)&&(a.push([n+1,s]),n=e.length);break;case"(":case")":
case"?":case"+":t&&(s=n);break;case":":o||t&&(s=n);break;case"{":case"[":o++||(r=n);break;case"]":case"}":
--o||a.push([r,n+1]);break;case'"':{let t=/^"([^"\\]|\\[^])*"/.exec(e.slice(n));o||t&&a.push([n,n+t[0].length]),
n+=t?t[0].length-1:0;break}default:{let t=/^(?:[$a-zA-Z_][$\w]*|\d[\d.eE+-]|,?\s+)/.exec(e.slice(n))
;n+=t?t[0].length-1:0}}return[a,s]};t.tryParse=e=>{try{return JSON.parse(e)}catch(t){return e}},t.Yn=e=>{
let[a,n]=i(e,1),r="",o=0;for(let[n,s]of a){if("#"===e[n])break;if("="!==e[n-1]||e[s]&&"&"!==e[s])continue
;r+=e.slice(o,n),o=s;let a=t.tryParse(e.slice(n,s))
;r+="string"!=typeof a||a.length!==s-n?JSON.stringify(a).replace(/[%\s&]/g,e=>"\\u"+(e.charCodeAt(0)+65536).toString(16).slice(1)):a.replace(/&/g,"%26")
}return r+=e.slice(o,n),[r,n]},t.splitWhenKeepExpressions=(e,t)=>{let a=i(e)[0],n=-1,r=0,o=0,s=[]
;for(;(n=e.indexOf(t,n+1))>=0;){for(;r<a.length&&n>=a[r][1];)r++
;r<a.length&&n>=a[r][0]?n=a[r][1]-1:(s.push(e.slice(o,n)),o=n+1)}return s.push(e.slice(o)),s}});