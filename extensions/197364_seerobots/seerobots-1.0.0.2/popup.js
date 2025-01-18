 browser.tabs.query(
	{currentWindow: true, active : true},
	function(tabArray){
	var currentTab = tabArray[0];	
    if (currentTab.status === 'complete' && /^(https?|file|http):/.test(currentTab.url)) { 
		browser.tabs.sendMessage(currentTab.id,{action:'getSeeRobotsTag'},function(source){
			viewRobots(source, currentTab.id, true, currentTab.url);            
		});
    }		
		
		
	}
 );	

