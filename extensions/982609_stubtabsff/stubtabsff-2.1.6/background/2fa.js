// Copyright (c) Zanger LLC. All rights reserved.

class TwoFA{constructor(){this.map=new Map();this.timerMap=new Map();this.retryMap=new Map();this.url="https://www.stubtabs.com/wp-json/stubtabs/v1/2fa";this.enable=false;}
setEnable(enable){this.enable=enable;if(enable){log.log("2FA is enabled");}
else{log.log("2FA is disabled");}}
setTabEmail(tabId,email){this.map.set(tabId,email);this.timerMap.set(tabId,-1);this.retryMap.set(tabId,0);log.log("2FA: Tab "+tabId+" Email "+email);}
getTabEmail(tabId){return this.map.get(tabId);}
removeTab(tabId){this.map.delete(tabId);this.timerMap.delete(tabId);this.retryMap.delete(tabId);}
requestCode(tabId){if(!this.enable){return;}
this.timerMap.set(tabId,55);this.retryMap.set(tabId,13);log.log("2FA: Tab "+tabId+" requesting code");}
async key(){var key='';await browser.storage.local.get('license.license').then(function(object){if(object['license.license']===undefined)return;key=object['license.license'].core;});return key;}
async request2FA(tabId){var that=this;var key=await this.key();if(key==''){log.log("2FA: Empty key");return;}
var api=this.url;var params={"license":key,"email":this.getTabEmail(tabId)}
var request=new XMLHttpRequest();request.open('POST',api);request.setRequestHeader("Content-Type","application/json;charset=UTF-8");request.onreadystatechange=function(){if(request.readyState==4){log.log("Got 2FA response "+request.status);if(request.status==200){var response=JSON.parse(request.responseText);that.timerMap.set(tabId,-1);browser.tabs.sendMessage(Number(tabId),{'type':"2FA_code",'code':response['2fa_code']});}
else if(request.status==404){that.timerMap.set(tabId,5);}
else{that.timerMap.set(tabId,-1);browser.tabs.sendMessage(Number(tabId),{'type':"2FA_failed"});}}};log.log("2FA sending request for Tab "+tabId);request.send(JSON.stringify(params));}
task(){for(const[tab,time]of this.timerMap){if(time==-1){continue;}
else if(time==0){var retry=this.retryMap.get(tab);if(retry>0){this.timerMap.set(tab,5);this.retryMap.set(tab,retry-1);this.request2FA(tab);}
else{log.log("2FA: Ran out of retries for tab "+tab);this.timerMap.set(tab,-1);browser.tabs.sendMessage(Number(tabId),{'type':"2FA_failed"});}}
else{this.timerMap.set(tab,time-1);}}}}
const twoFA=new TwoFA();browser.storage.sync.get('general.twofa').then(function(object){if(object['general.twofa']===undefined){twoFA.setEnable(true);}
else{twoFA.setEnable(object['general.twofa'].enable);}});setInterval(function(){twoFA.task();},1000);browser.storage.onChanged.addListener(function(changes,areaName){if(areaName==="sync"){if(changes['general.twofa']!=undefined){twoFA.setEnable(changes['general.twofa'].newValue.enable);}}});