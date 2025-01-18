// Copyright (c) Zanger LLC. All rights reserved.

(function(){var tabId=-2;pingBackground();async function pingBackground(){var sending=browser.runtime.sendMessage({'type':"License"});await sending.then(handleResponse);}
function handleResponse(info){if(info.active){tabId=info.tabId;browser.runtime.onMessage.addListener(messageHandler);}}
function messageHandler(message,sender,reply){switch(message.type){case"QueueDisplay":if(message.tabId!=tabId)return;document.title=`Queued - ${message.value}`;break;}}})();