/* init main namespace */

var fvdSynchronizer = {
	
	id: function(){

		return false;//chrome.app.getDetails().id; // Task #1708				

	},
	
	eachDriver: function( callback ){
		
		for( var k in fvdSynchronizer.Driver ){
			
			callback( fvdSynchronizer.Driver[k], k );
			
		}
		
	}
	
};

// Social login fix
browser.tabs.onUpdated.addListener(function (tabId) {
    browser.tabs.get(tabId, tab=>{
        //console.info(tabId, JSON.parse(JSON.stringify(tab)));
        
        if(tab.url.indexOf("https://everhelper.pro/auth/openidconnect.php?code=") === 0 ){
            //console.info("Open ID Success");
            
            closeAndLoginPending(tabId);
        }
    });
});

var closeQueue = {};

function closeAndLoginPending(tabId){
    if(closeQueue[tabId]) clearTimeout(closeQueue[tabId]);
    
    closeQueue[tabId] = setTimeout(()=>{
        try{
            browser.tabs.remove(tabId);
            
            browser.runtime.sendMessage( {
                action: "event:login"
            } );
            
        }catch(ex){
            
        }
    }, 1e3);
}
