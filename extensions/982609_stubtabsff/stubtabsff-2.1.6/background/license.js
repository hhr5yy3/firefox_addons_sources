// Copyright (c) Zanger LLC. All rights reserved.

class License{constructor(){this.status=false;this.loggedIn=true;this.checkCount=0;this.url="https://stubtabs.com/wp-json/wsl/v1/";}
get valid(){return this.isValid();}
get isLoggedIn(){return this.loggedIn;}
isValid(){return(this.status&&this.loggedIn);}
logIn(){this.loggedIn=true;this.check(true);}
logOut(){if(this.loggedIn)
this.release();this.loggedIn=false;}
async key(){var key='';await browser.storage.local.get('license.license').then(function(object){if(object['license.license']===undefined)return;key=object['license.license'].core;});return key;}
async check(force){var done,status=false;log.log("License: Checking status...");await browser.storage.local.get('license').then(function(object){if(object.license==undefined)return;if(object.license.expires>=Date.now()){done=true;status=object.license.success;}});this.status=status;if(done&&this.status)log.log("License: Saved status is good");else if(done)log.log("License: Saved status is expired");if(done&&!force)return;this.reserve();}
async request(){var key=await this.key();if(key==''){log.log("License: Empty key");return;}
var api=this.url+'license/?query='+Date.now();var request=new XMLHttpRequest();request.open('GET',api);request.setRequestHeader('x-api-token',key);request.onreadystatechange=function(){if(request.readyState==4){log.log("License: Got request response");}};log.log("License: Attempting request");request.send();}
async reserve(){var that=this;var key=await this.key();if(key==''){log.log("License: Empty key");return;}
var api=this.url+'reserve/';var request=new XMLHttpRequest();request.open('GET',api);request.setRequestHeader('x-api-token',key);request.onreadystatechange=function(){if(request.readyState==4){var response=JSON.parse(request.responseText);response.expires=response.expires*1000+Date.now();browser.storage.local.set({'license':response});that.status=response.success;log.log("License: Got reserve response - "+response.success);}};log.log("License: Attempting reserve");request.send();}
async release(){var key=await this.key();if(key==''){log.log("License: Empty key");return;}
var api=this.url+'release/';var request=new XMLHttpRequest();request.open('GET',api);request.setRequestHeader('x-api-token',key);request.onreadystatechange=function(){if(request.readyState==4){var response=JSON.parse(request.responseText);response.expires=-1;browser.storage.local.set({'license':response});log.log("License: Got release response - "+response.success);}};log.log("License: Attempting release");request.send();}
task(){if(this.checkCount<=0){this.check(false);this.checkCount=5*60;}
else
this.checkCount--;}}
const license=new License();setInterval(function(){license.task();},1000);browser.storage.onChanged.addListener(function(changes,areaName){if(areaName==="local"){if(changes['license.license']!=undefined){if(license.loggedIn){license.reserve();}}}});