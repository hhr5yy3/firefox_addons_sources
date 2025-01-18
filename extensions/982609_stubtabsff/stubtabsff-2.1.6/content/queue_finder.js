// Copyright (c) Zanger LLC. All rights reserved.

(function(){var UPDATE_INTERVAL=500;var SEARCH_INTERVAL=1500;var usersInQueueRegEx=new RegExp(/peopleInLine-count">(\d+\+?)/gm);var tabId=-2;pingBackground();async function pingBackground(){var sending=browser.runtime.sendMessage({'type':"License"});await sending.then(handleResponse);}
function handleResponse(info){if(info.active){tabId=info.tabId;queueCheck();}}
function queueCheck(){let result=usersInQueueRegEx.exec(document.body.innerHTML);if(result){if(result[1]){browser.runtime.sendMessage({'type':"QueueDisplay",'value':result[1],'tabId':tabId});setTimeout(queueCheck,UPDATE_INTERVAL);return;}}else{setTimeout(queueCheck,SEARCH_INTERVAL);}}})();