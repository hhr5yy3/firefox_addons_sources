/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
const backgroundPage=getBackgroundPage();
window.addEventListener("load",function(){function c(){gaTrack("UA-1025658-9","fireshot.com","PDF-Pro-Settings");const b=new Date;return new Promise(d=>{PDFDialog.templateVars=new function(a,e,f,g,h){return{title:a,URL:e,created:f,extents:{cx:g,cy:h}}}("Title","https://getfireshot.com",b,1920,10200);PDFDialog.show(!1).then(a=>{a&&k(cPDFOptionsEverDisplayed,"true");d(a)})})}isFirefox();const k=isFirefox()?setOption:backgroundPage.setOption;fsPreferences.init(function(){try{i18nPrepare()}catch(b){logError(b.message)}c().then(()=>{"1"==
(new URLSearchParams(window.location.search)).get("close")?window.close():setTimeout(()=>{history.back()},100)})})});
