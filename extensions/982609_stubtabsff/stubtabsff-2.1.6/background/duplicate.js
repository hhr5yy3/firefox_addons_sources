// Copyright (c) Zanger LLC. All rights reserved.

browser.runtime.onMessage.addListener(messageCheckDuplicate);function messageCheckDuplicate(message,sender,reply){if(message.type=="Duplicate"){messageHandleDuplicate(message,sender);}}
async function messageHandleDuplicate(message,sender){var promise,url;promise=browser.tabs.get(sender.tab.id);await promise.then(function(tab){url=tab.url;});duplicateUrl(url,message.delayMs,message.number);}
async function duplicateUrl(url,delay,number){if(license.valid&&(number>0)){await session.openNewTab(url);setTimeout(function(){duplicateUrl(url,delay,number-1);},delay);}}
function openDuplicatePrompt(id){browser.tabs.sendMessage(id,{'type':"DuplicatePrompt"});browser.tabs.update(id,{'active':true});}