import"../../modulepreload-polyfill.js";setInterval(async()=>{var a;(a=(await navigator.serviceWorker.ready).active)==null||a.postMessage("tick")},500);
