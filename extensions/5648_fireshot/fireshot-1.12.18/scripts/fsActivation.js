/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
window.fsActivationEvents||(window.fsActivationEvents=!0,chrome.runtime.sendMessage({message:"checkFSAvailabilityEvt"},function(a){document.addEventListener("checkFSAvailabilityEvt",function(c){for(var b in a)a.hasOwnProperty(b)&&c.target.setAttribute(b,a[b])},!1)}),document.addEventListener("activateFireShotEvt",function(a){chrome.runtime.sendMessage({message:"activateFireShot",name:a.target.getAttribute("FSName"),key:a.target.getAttribute("FSKey")},function(c){})},!1));document.dispatchEvent(new CustomEvent("helloFromFireShotForChrome"));
