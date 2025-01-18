/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
function insertScreenshots(c){function g(a,d){return new Promise(e=>{fetch(d.data).then(b=>b.blob()).then(b=>{b.name=decodeURIComponent(d.name);a.push(b);e()})})}chrome.runtime.sendMessage({message:"getScreenshotsForGmail"},function(a){a=JSON.parse(a);var d=[],e=[],b=[];c.setToRecipients(decodeURIComponent(a.to).split(","));c.setSubject(decodeURIComponent(a.subject));for(var f=0;f<a.files.length;++f)d.push(g("yes"===a.files[f].inline?e:b,a.files[f]));Promise.all(d).then(()=>{window.focus();0<e.length&&
c.attachInlineFiles(e);0<b.length&&setTimeout(function(){c.attachFiles(b)},500)})})}fsPreferences.init(function(){InboxSDK.load("1.0","sdk_FireShot_c30c6a0127").then(function(c){c.Compose.registerComposeViewHandler(function(g){insertScreenshots(g)});c.Compose.openNewComposeView()})});
