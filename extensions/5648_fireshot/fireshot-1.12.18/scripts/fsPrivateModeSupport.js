/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
function getBackgroundPage(){return chrome.extension.getBackgroundPage()||new Proxy({},{get:(g,e)=>{const f=new Promise(b=>{chrome.runtime.sendMessage({message:"getExtensionPropertyMsg",property:e},async a=>{"capBitmaps"===e?(a=a.map(d=>canvasFromArrayBuffer(d.canvasData).then(c=>({y:d.y,canvas:c}))),b(Promise.all(a))):b(a)})});return new Proxy(function(...b){let a=null;"function"===typeof b[b.length-1]&&(a=b.pop());return new Promise(d=>{chrome.runtime.sendMessage({message:"callExtensionMethodMsg",
method:e,params:b,async:null!==a},c=>{a&&"undefined"!==typeof c&&a(c);d(c)})})},{get:(b,a)=>{if(a in f)return f[a].bind(f)}})}})};
