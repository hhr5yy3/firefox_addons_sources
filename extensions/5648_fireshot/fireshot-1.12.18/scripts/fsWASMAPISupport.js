/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
function initWASMAPI(e){return new Promise((f,d)=>{const b=document.createElement("script");let c=a=>{document.head.removeChild(b);b.removeEventListener("error",c);c=void 0;d(a)};try{b.src=e,b.async=!1,b.addEventListener("load",()=>{c&&(b.removeEventListener("error",c),c=void 0);Module().then(a=>f(a)).catch(a=>d(a))}),b.addEventListener("error",a=>c(a)),document.head.appendChild(b)}catch(a){c(a)}})};
