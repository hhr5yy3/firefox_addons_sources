// Copyright (c) Zanger LLC. All rights reserved.

var proxyLastRequestId=0;var allowProxy=false;var netnutEnabled=false;var netnutURL="gw-whitelist.ntnt.io";var netnutNonSticky=false;var netnutPorts={'host':netnutURL,'base':30001,'range':59};var customProxyEnabled=false;var customProxyList=[];var directProxy={'type':"direct"};loadProxyData();setTimeout(function(){allowProxy=true;},10000);browser.webRequest.onAuthRequired.addListener(authProxy,{urls:["<all_urls>"]},["blocking"]);browser.proxy.onRequest.addListener(proxyHandler,{'urls':["<all_urls>"]});browser.tabs.onActivated.addListener(proxyBadgeUpdate);function customProxyIndex(tabId){return proxyMap.getProxyForTab(tabId);}
function proxyBadgeUpdate(info){proxyId=customProxyIndex(info.tabId);if(license.valid&&info.tabId>-1&&customProxyEnabled&&proxyId!=undefined){browser.browserAction.setBadgeText({'text':''+(proxyId+1),'tabId':info.tabId});}
else if(info.tabId>-1&&!customProxyEnabled){browser.browserAction.setBadgeText({'text':'.','tabId':info.tabId});}}
async function loadProxyData(){var promise;promise=browser.storage.sync.get('netnut.netnut');await promise.then(function(object){if(object['netnut.netnut']===undefined)return;if(object['netnut.netnut'].enable===undefined)return;netnutEnabled=object['netnut.netnut'].enable;if(object['netnut.netnut'].settings.nonsticky!==undefined)
netnutNonSticky=object['netnut.netnut'].settings.nonsticky;});promise=browser.storage.local.get('proxytabs.custom');await promise.then(function(object){if(object['proxytabs.custom']===undefined)return;if(object['proxytabs.custom'].enable===undefined)return;if(object['proxytabs.custom'].list===undefined)return;customProxyEnabled=object['proxytabs.custom'].enable;customProxyList=object['proxytabs.custom'].list;proxyMap.setProxyCount(customProxyList.length);});}
function authProxy(details){if(details&&details.isProxy){if(details.requestId==proxyLastRequestId){log.log("Proxy Auth Failed");return{'cancel':true};}
proxyLastRequestId=details.requestId;if(customProxyEnabled){var x=customProxyIndex(details.tabId);if(customProxyList[x].protocol!="http"&&customProxyList[x].protocol!="https"){return;}
else{var user=customProxyList[x].username;var pass=customProxyList[x].password;log.log("Proxy Request: "+details.proxyInfo.host+" with "+user);return{'authCredentials':{'username':user,'password':pass}};}}
else if(netnutEnabled){return{'authCredentials':{'username':'','password':''}};}
else{return;}}
else return;}
function proxyHandler(info){var proxyKey='direct';var proxy=directProxy;if(info.url.includes(".mozilla.net"))
return directProxy;if(customProxyEnabled){var x=customProxyIndex(info.tabId);if(x==undefined||x<0)
proxy=directProxy;else{proxy={'type':customProxyList[x].protocol,'host':customProxyList[x].ip,'port':customProxyList[x].port};}}
else if(netnutEnabled){proxyKey="";var port=info.tabId;if(port==-1)port=info.requestId;if(netnutNonSticky)
port=30000;else
port=netnutPorts.base+(port%netnutPorts.range);proxy={'type':"http",'host':netnutPorts.host,'port':port};}
else{proxy=directProxy;}
if(!license.valid)
return directProxy;else
return proxy;}
browser.storage.onChanged.addListener(function(changes,areaName){if(areaName==="sync"){if(changes['netnut.netnut']!=undefined){if(changes['netnut.netnut'].newValue.enable!==undefined)
netnutEnabled=changes['netnut.netnut'].newValue.enable;if(changes['netnut.netnut'].newValue.settings.nonsticky!==undefined)
netnutNonSticky=changes['netnut.netnut'].newValue.settings.nonsticky;}}
if(areaName=="local"){if(changes['proxytabs.custom']!=undefined){if(changes['proxytabs.custom'].newValue.enable!==undefined)
customProxyEnabled=changes['proxytabs.custom'].newValue.enable;if(changes['proxytabs.custom'].newValue.list!==undefined){customProxyList=changes['proxytabs.custom'].newValue.list;proxyMap.setProxyCount(customProxyList.length);}}}});