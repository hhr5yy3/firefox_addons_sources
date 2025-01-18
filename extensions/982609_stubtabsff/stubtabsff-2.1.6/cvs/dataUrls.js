// Copyright (c) Zanger LLC. All rights reserved.

(function(){"use strict";var scope;if((typeof exports)!=="undefined"){scope=exports;}
else{window.scope.dataUrls={};scope=window.scope.dataUrls;}
const logging=require("./logging");const settings=require("./settings");let canMergeHeader=false;let blockBlob=true;browser.runtime.getBrowserInfo().then(function(info){const mainVersion=parseInt(info.version.replace(/\..+/,""),10);canMergeHeader=mainVersion>59;blockBlob=mainVersion<60;});function setHeader(headers,header){if(canMergeHeader){headers.push(header);}
else{const headerName=header.name.toLowerCase();const presentHeader=headers.filter(function(h){return h.name.toLowerCase()===headerName;});if(presentHeader.length){presentHeader[0].value+=", "+header.value;}
else{headers.push(header);}}}
scope.init=function(){function listener(details){const headers=details.responseHeaders;if(settings["canvas.blockDataURLs"]){const cspMatch=(blockBlob?"":"blob: ")+"filesystem: *";logging.verbose("Adding CSP header to",details);setHeader(headers,{name:"Content-Security-Policy",value:`object-src ${cspMatch}; frame-src ${cspMatch}`});}
return{responseHeaders:headers};}
function addListener(){if(!browser.webRequest.onHeadersReceived.hasListener(listener)){browser.webRequest.onHeadersReceived.addListener(listener,{urls:["<all_urls>"],types:["main_frame","sub_frame","object"]},["blocking","responseHeaders"]);}}
function removeListener(){browser.webRequest.onHeadersReceived.removeListener(listener);}
function adjustListener(){if(settings["canvas.blockDataURLs"]){addListener();}
else{removeListener();}}
settings.onloaded(adjustListener);settings.on("canvas.blockDataURLs",adjustListener);};}());