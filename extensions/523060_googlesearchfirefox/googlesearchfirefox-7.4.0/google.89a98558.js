(()=>{function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r=globalThis,n={},a={},s=r.parcelRequire48de;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){a[e]=t},r.parcelRequire48de=s);var i=s.register;i("dEV9o",function(t,r){e(t.exports,"register",()=>n,e=>n=e);var n,a=new Map;n=function(e,t){for(var r=0;r<t.length-1;r+=2)a.set(t[r],{baseUrl:e,path:t[r+1]})}}),i("8RkfP",function(t,r){e(t.exports,"getBundleURL",()=>n,e=>n=e);var n,a={};n=function(e){var t=a[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return(""+e[2]).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}(),a[e]=t),t}}),s("dEV9o").register(s("8RkfP").getBundleURL("b8kEl"),JSON.parse('["b8kEl","google.89a98558.js","2asUj","ico_stars.bf977877.png","iUzAf","trustmark_44x44px.b24dcbc1.png"]'));let o={googleInjection:{utm_medium:chrome.runtime.getURL("").startsWith("moz-extension")?"Firefox":"Chrome"}};var l={};l=s("8RkfP").getBundleURL("b8kEl")+"ico_stars.bf977877.png";var d={};d=s("8RkfP").getBundleURL("b8kEl")+"trustmark_44x44px.b24dcbc1.png";let u=()=>{let e=[],t=document.querySelectorAll("div.yuRUbf>div>span>a");for(let r of t)e.push(r.href);return{urls:e,aNodes:t}},c=e=>{let{tsId:r}=e;if(!r)return null;let n=chrome.i18n.getMessage("ratingProfileUrl",r)+"?utm_source=google&utm_medium="+o.googleInjection.utm_medium+"&utm_campaign=BrowserExtension";return`
            <a target="_blank" href="${n}">
                <img alt="Trustmark" src="${t(d)}" class="logo_eu_b2b">
            </a>
`},g=e=>{let t=document.createElement("div");return t.classList.add("tsCertificateLink"),t.innerHTML=c(e),t},f=e=>{let{ratingAverage:r}=e;return`
        <div class="tsStarsContainer">
            <div class="tsStarsBackground" style="background: url(${t(l)}) 0 -12px no-repeat">
                <div class="tsStarsImage" style="background: url(${t(l)}) 0 0 no-repeat; width:${r/5*65+"px"}"></div>
            </div>
        </div>
    `},m=e=>{let{ratingAverage:t}=e;return`
        <div class="tsOverallMark">
            <b>${t.toFixed(2)}</b>
            <span style="font-size: 12px">/5.00</span>
        </div>
    `},p=e=>{let{tsId:t,ratingCount:r}=e,n=chrome.i18n.getMessage("ratingProfileUrl",t)+"?utm_source=google&utm_medium="+o.googleInjection.utm_medium+"&utm_campaign=BrowserExtension";return`
        <div class="tsReviewsLink">
        <a href="${n}" target="_blank">${r} ${chrome.i18n.getMessage("customerreviews")}</a>
        </div>
    `},v=e=>{let t=document.createElement("div");return t.className="tsRichSnippet","rgb(255, 255, 255)"!==getComputedStyle(document.body).getPropertyValue("background-color")&&t.classList.add("tsDarkTheme"),t.innerHTML=`
            ${f(e)}
            ${m(e)}
            ${p(e)}
    `,t},_=(e,t)=>{let r="reviewInfosInsertedByTsExtension",{ratingCount:n,ratingAverage:a}=e;if(!(n&&a&&!t.classList.contains(r)))return!1;t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(v(e)),t.classList.add(r)},h=(e,t)=>{let r="trustmarkInsertedByTsExtension";if(!e.hasValidCertificate||t.classList.contains(r))return;let n=t.parentNode.parentNode.parentNode.parentNode.parentNode,a=n.querySelector(".VwiC3b.yXK7lf.lVm3ye.r025kc.hJNv6b.Hdw6tb")?.parentNode;if(!a)return;let s=document.createElement("div");s.style.clear="left",a.appendChild(s),a.insertBefore(g(e),a.firstChild),t.classList.add(r)},b=(e,t)=>{if(!e)return;let r={tsId:e.tsId,ratingCount:e.rating?.count,ratingAverage:e.rating?.average,hasValidCertificate:e.hasValidCertificate};h(r,t),_(r,t)};(()=>{let{urls:e,aNodes:t}=u();chrome.runtime.sendMessage({cmd:"CMD_GET_GS_FOR_SERP_URLS",data:{urls:e}},e=>{if(e)for(let r=0;r<e.length;r++)e[r]&&b(e[r],t[r])})})()})();
