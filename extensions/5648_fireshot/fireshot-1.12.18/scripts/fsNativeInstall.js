/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
function downloadInstaller(){fetch(chrome.runtime.getURL("native/fireshot-chrome-plugin.dat")).then(b=>b.blob()).then(b=>{var a=document.createElement("a");a.download="fireshot-firefox-plugin.exe";a.href=window.URL.createObjectURL(b);a.textContent="";a.dataset.downloadurl=["application/octet-stream",a.download,a.href].join(":");document.documentElement.appendChild(a);a.click();document.documentElement.removeChild(a)})}
document.addEventListener("DOMContentLoaded",function(){fsPreferences.init(function(){function b(){a.fsNativePlugin.ready?(gaTrack("UA-1025658-9","DLL","NativeHostInstalledFirefox"),a.updateContextMenu(),"{0b457cAA-602d-484a-8fe7-c1d894a011ba}"==extensionId?document.location.href=a.getInstalledPageURL():(a.doTrial(),window.close())):(a.fsNativePlugin.autoReconnect||a.fsNativePlugin.updating||a.fsNativePlugin.portBusy||a.fsNativePlugin.init(),setTimeout(function(){b()},1E3))}var a=chrome.extension.getBackgroundPage();
downloadInstaller();b()})});
