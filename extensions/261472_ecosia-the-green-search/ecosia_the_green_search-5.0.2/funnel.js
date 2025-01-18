(function(){"use strict";const t=window.chrome||browser,r="firefox",{runtime:i}=t,a="ecosiaExtensionActive",{version:c}=i.getManifest(),d=e=>new Promise((s,n)=>{t.storage.sync.get(e,o=>{t.runtime.lastError?n(t.runtime.lastError):s(o)})}),l=e=>new Promise((s,n)=>{t.storage.sync.set(e,o=>{t.runtime.lastError?n(t.runtime.lastError):s(o)})}),u={addon:r,version:c};sessionStorage.setItem(a,"1");const g=e=>{window.postMessage(JSON.stringify({...u,event:e}),"*")},h=()=>{const e=document.createElement("style");e.type="text/css",e.innerHTML=`
    .addon-hide {
        display: none;
    }

    .addon-show {
        display: initial;
    }`,document.head.appendChild(e)},m=()=>{d("isConsecutiveSearch").then(({isConsecutiveSearch:e})=>{e||(g("firstSearch"),l({isConsecutiveSearch:!0}))}).catch(e=>{console.log(e)})};window.addEventListener("load",()=>{h(),m()})})();
