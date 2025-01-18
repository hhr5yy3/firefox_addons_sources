// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{window.scope.lists={};scope=window.scope.lists;}
var settings=require("./settings");function getDomainRegExpList(domainList){var list=domainList.split(",").map(function(entry){return entry.replace(/^\s+|\s+$/g,"");}).filter(function(entry){return!!entry.length;}).map(function(entry){var regExp;var domain=!!entry.match(/^[A-Za-z0-9_.-]+$/);if(domain){regExp=new RegExp("(?:^|\\.)"+entry.replace(/([\\+*?[^\]$(){}=!|.])/g,"\\$1")+"\\.?$","i");}
else{regExp=new RegExp(entry,"i");}
return{match:function(url){if(domain){return(url.hostname||"").match(regExp);}
else{return url.href.match(regExp);}}};});return addMatchToList(list);}
function addMatchToList(list){list.match=function(url){return this.some(function(entry){return entry.match(url);});};return list;}
var lists={white:[],sessionWhite:[],"ignore":[],black:[]};function updateList(type,value){if(typeof value==="undefined"){value=settings["canvas."+type+"List"];}
lists[type]=getDomainRegExpList(value);return lists[type];}
Object.keys(lists).forEach(function(type){settings.on(type+"List",function({newValue}){updateList(type,newValue);});updateList(type,settings["canvas."+type+"List"]);});function updateStackList(value){var list;try{var data=JSON.parse(value);if(!Array.isArray(data)){data=[data];}
list=data.filter(function(entry){return typeof entry==="object"&&typeof entry.url==="string";});}
catch(e){list=[];}
list.match=function(stack){return this.some(function(stackRule){return stack.match(stackRule);});};lists.stack=list;}
lists.stack=[];settings.on("canvas.stackList",function({newValue}){updateStackList(newValue);});updateStackList(settings["canvas.stackList"]);scope.get=function getList(type){if(type==="white"){var combined=lists.white.slice().concat(lists.sessionWhite);return addMatchToList(combined);}
return lists[type];};scope.appendTo=function appendToList(type,entry){var oldValue=settings[type+"List"];return settings.set(type+"List",oldValue+(oldValue?",":"")+entry).then(function(){return updateList(type);});};scope.update=updateList;scope.updateAll=function updateAllLists(){updateList("white");updateList("ignore");updateList("black");updateStackList(settings["canvas.stackList"]);};settings.onloaded(scope.updateAll);}());