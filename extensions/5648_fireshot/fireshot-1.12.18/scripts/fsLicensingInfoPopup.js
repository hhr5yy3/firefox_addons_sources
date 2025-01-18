/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
document.addEventListener("DOMContentLoaded",()=>{try{i18nPrepare()}catch(a){logError(a.message)}let b=getExtension();document.querySelectorAll("[rel=command]").forEach(a=>a.addEventListener("click",c=>{switch(c.target.id){case "lnkRemoveLicense":isFirefox()&&document.getElementById("mnuMain").style.setProperty("height","200px");if(isSafari()||isFirefox()||confirm(chrome.i18n.getMessage("licensing_popup_cofirm_removal")))b.removeLicensingInfo(),window.location.href="fsPopup.html";isFirefox()&&document.getElementById("mnuMain").style.removeProperty("height")}}));
document.getElementById("spnOwnerName").textContent=b.getOption(cRegisteredUserName)});
