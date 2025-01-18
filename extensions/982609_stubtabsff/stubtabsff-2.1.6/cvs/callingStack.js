// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{window.scope.callingStack={};scope=window.scope.callingStack;}
const settings=require("./settings");var _=function(name,replace,translateAPI){if(!translateAPI){translateAPI=browser.i18n.getMessage;}
var str=translateAPI(name)||name;if(replace){Object.keys(replace).forEach(function(name){str=str.replace(new RegExp("{"+name+"}","g"),replace[name]);});}
return str;};function parseStackEntry(entry){var m=/@(.*):(\d*):(\d*)$/.exec(entry)||["",entry,"--","--"];return{url:m[1],line:parseInt(m[2],10),column:parseInt(m[3],10),raw:entry};}
function stackRuleMatch(stackEntry,stackRule){if(!stackEntry){return false;}
if(stackEntry.url!==stackRule.url){return false;}
if((typeof stackRule.line)!=="undefined"&&stackEntry.line!==stackRule.line){return false;}
if((typeof stackRule.column)!=="undefined"&&stackEntry.column!==stackRule.column){return false;}
return true;}
const extensionID=browser.extension.getURL("");function parseErrorStack(errorStack){var callers=errorStack.trim().split("\n");callers=callers.map(parseStackEntry).filter(function(caller){return!caller.url.startsWith(extensionID);});return{toString:function(translateAPI){var msg="";msg+="\n\n"+_("sourceOutput",undefined,translateAPI)+": ";if(settings["canvas.showCompleteCallingStack"]){msg+=callers.reduce(function(stack,c){return stack+"\n\t"+_("stackEntryOutput",c,translateAPI);},"");}
else{msg+=_("stackEntryOutput",callers[0],translateAPI);}
return msg;},match:function(stackRule){if(typeof stackRule.stackPosition!=="undefined"){var pos=stackRule.stackPosition;if(pos<0){pos+=callers.length;}
return stackRuleMatch(callers[pos],stackRule);}
else{return callers.some(function(stackEntry){return stackRuleMatch(stackEntry,stackRule);});}}};}
scope.parseErrorStack=parseErrorStack;}());