// Copyright (c) Zanger LLC. All rights reserved.

class Session{constructor(){browser.tabs.onCreated.addListener(this.newTab);browser.tabs.onRemoved.addListener(this.deleteTab);}
async cleanUp(){var promise,ci,tabs;promise=browser.contextualIdentities.query({'name':CONTEXT_NAME,});await promise.then(function(value){ci=value;});for(var i=0;i<ci.length;i++){promise=browser.tabs.query({'cookieStoreId':ci[i].cookieStoreId});await promise.then(function(value){tabs=value;});if(!license.valid){for(var j=0;j<tabs.length;j++)
browser.tabs.remove(tabs[j].id);}
if(tabs.length==0)
browser.contextualIdentities.remove(ci[i].cookieStoreId);}}
newTab(tab){if(license.valid){if(tab.incognito){log.log("Can't session 'in private' tabs");return;}
setTimeout(function(){session.reopenTab(tab.id);},100);}}
deleteTab(tabId,removeInfo){proxyMap.deleteTab(tabId);twoFA.removeTab(tabId.toString());}
async reopenTab(tabId){var promise,tab;promise=browser.tabs.get(tabId);await promise.then(function(value){tab=value;});log.log("New Tab: "+tab.url+" | "+tab.title);if(tab.url=="about:newtab")
this.openNewTab(null,tab.index);else if((tab.url=="about:blank")&&((tab.title=="New Tab")||(tab.title.indexOf(".")==-1))){setTimeout(function(){session.reopenTab(tab.id);},50);return;}
else if(tab.url=="about:blank")
this.openNewTab("http://"+tab.title,tab.index);else if(tab.url.startsWith("about:")||tab.url.startsWith("moz-extension:"))
return;else
this.openNewTab(tab.url,tab.index);browser.tabs.remove(tab.id);}
async openNewTab(url,index=-1){if(license.valid){var promise,cookieStoreId;promise=browser.contextualIdentities.create({'name':CONTEXT_NAME,'color':CONTEXT_COLOR,'icon':CONTEXT_ICON});await promise.then(function(value){cookieStoreId=value.cookieStoreId;});browser.tabs.onCreated.removeListener(this.newTab);if((index>=0)&&url)
promise=browser.tabs.create({'cookieStoreId':cookieStoreId,'index':index,'url':url});else if((index==-1)&&url)
promise=browser.tabs.create({'cookieStoreId':cookieStoreId,'url':url});else if((index>=0)&&(url==null))
promise=browser.tabs.create({'cookieStoreId':cookieStoreId,'index':index});else
promise=browser.tabs.create({'cookieStoreId':cookieStoreId});await promise.then(function(tab){log.log("New Tab ID is: "+tab.id);proxyMap.assignNewTab(tab.id)});browser.tabs.onCreated.addListener(this.newTab);this.deleteCookies(cookieStoreId);}}
async deleteCookies(cookieStoreId){if(license.valid){var promise,cookies,allowed;promise=browser.storage.sync.get('general.cookies');await promise.then(function(object){allowed=object['general.cookies'].enable;});if(allowed!=true){log.log("Can't remove cookies because feature is disabled");return;}
promise=browser.cookies.getAll({'storeId':cookieStoreId});await promise.then(function(value){cookies=value;});for(var i=0;i<cookies.length;i++){var cookiePrefix=cookies[i].secure?"https://":"http://";if(cookies[i].domain.charAt(0)==".")
cookiePrefix+="www";var url=cookiePrefix+cookies[i].domain+cookies[i].path;log.log("Removing cookie: "+cookies[i].name+" | "+url);browser.cookies.remove({'name':cookies[i].name,'storeId':cookies[i].storeId,'url':url});}}}
async deleteAllCookies(){if(license.valid){var promise,identities;promise=browser.contextualIdentities.query({'name':CONTEXT_NAME});await promise.then(function(value){identities=value;});for(var i=0;i<identities.length;i++){this.deleteCookies(identities[i].cookieStoreId);}}}}
const session=new Session();