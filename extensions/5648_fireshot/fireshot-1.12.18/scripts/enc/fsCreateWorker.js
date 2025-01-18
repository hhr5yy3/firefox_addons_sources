/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
const createWorker=function(g,h){return new Promise(async(m,k)=>{try{const e={};let b,c,f=a=>{console.error("a worker error occured.");b?b.terminate():document.head.removeChild(c);k(a)},l=async a=>{if("loaded"===a.data.message)f&&((b?b:c).removeEventListener("error",f),f=void 0),m(e);else if("abort"===a.data.message){const d=a.data.data.stack?a.data.data.stack.replace(/fsWorker.js.+\)/,"fsWorker.js)"):"";gaTrack("UA-1025658-9","WASM","PDFWorker-error",`Exception: ${a.data.data.message}\nStack: ${d}`,
`Params: ${JSON.stringify(await backgroundPage.savedCapParamsForDebugging)}\nPage: ${await backgroundPage.capURL}`);h({data:{message:"completed",result:null}})}else h(a)};if("true"!==await backgroundPage.getOption(cDisableWorker,"false")&&"undefined"!==typeof OffscreenCanvas)e.postMessage=(a,d)=>{"terminate"===a.message?b.terminate():b.postMessage(a,d)},b=new Worker(g),b.addEventListener("error",f,!1),b.addEventListener("message",l,!1);else{let a={msgs:[],host:l};window.fsWorkerConnection=a;c=document.createElement("script");
c.addEventListener("error",f,!1);e.postMessage=d=>{a.worker?setTimeout(()=>a.worker({data:d},10)):a.msgs.push(d)};c.async=!0;c.src=g;document.head.appendChild(c)}}catch(e){k(e)}})};
