browser.tabs.onUpdated.addListener(function(tabId, changeInfo, currentTab){
	
    if(!tabId)
        return false; 
        
    if (currentTab.status === 'complete' && /^(https?|file|http):/.test(currentTab.url)) { 
			browser.tabs.sendMessage(currentTab.id,{action:'getSeeRobotsTag'},function(source){
				viewRobots(source, tabId, true, currentTab.url);
			});
		}
});

browser.tabs.onActivated.addListener(function(activeInfo){
	
    if(!activeInfo.tabId)
        return false;
        
    browser.tabs.get(activeInfo.tabId, function(currentTab){ 
        if (currentTab.status === 'complete' && /^(https?|file|http):/.test(currentTab.url)) {
            browser.tabs.sendMessage(currentTab.id,{action:'getSeeRobotsTag'},function(source){
                viewRobots(source, activeInfo.tabId, true, currentTab.url); 
            });
        }
    });
});

