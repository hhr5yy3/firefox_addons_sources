// Copyright (c) Zanger LLC. All rights reserved.

browser.runtime.onMessage.addListener(messageCheckSetProxy);function messageCheckSetProxy(message,sender,reply){if(message.type=="SetProxy"){messageHandleSetProxy(message,sender);}}
function messageHandleSetProxy(message,sender){log.log("Tab "+sender.tab.id+" changed proxy to "+message.proxy);proxyMap.assignProxyToTab(sender.tab.id,Number(message.proxy)-1);proxyBadgeUpdate({'tabId':sender.tab.id});}
function openSetProxyPrompt(id){browser.tabs.sendMessage(id,{'type':"SetProxyPrompt",'current':proxyMap.getProxyForTab(id)+1,'min':1,'max':proxyMap.proxyCount});browser.tabs.update(id,{'active':true});}