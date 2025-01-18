var lastQueueWritten = '';
var lastQueueRead = '';

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    if (jQuery("#socket-config").html()) {
		if (msg.cmd == 'checkQueue' && msg.currentQueue != lastQueueRead){
			console.debug("onMessage Queue changed to " + msg.currentQueue);
			msg.eventType = 'queueEvent'
			var actualCode = 'ng_onSocketEvent(' + JSON.stringify(msg) + ')';
			var script = document.createElement('script');
			script.textContent = actualCode;
			(document.head||document.documentElement).appendChild(script);
			script.remove();
		}
	}
});

setInterval(function(){		
	if (jQuery("#queue-state").html() && jQuery("#socket-config").html()){
		var config = JSON.parse(jQuery("#queue-state").html());
		if (config && config.currentQueue && config.currentQueue != lastQueueWritten){
			console.debug("queue-state changed to " + config.currentQueue);
			console.debug("config.posFilter = " + config.posFilter);
			console.debug("config.queueFilter = " + config.queueFilter);
			lastQueueWritten = config.currentQueue;
			var msgInit = JSON.parse(jQuery("#socket-config").html());
			msgInit.cmd = 'checkQueue';
			msgInit.currentQueue = config.currentQueue;
			msgInit.isSideAssistant = config.isSideAssistant;
			msgInit.selectedCheatSheet = config.selectedCheatSheet;
			msgInit.posFilter = config.posFilter;
			msgInit.queueFilter = config.queueFilter;
			console.debug(msgInit);
			chrome.runtime.sendMessage(msgInit, function(res){});
		}
	}
}, 1000);


var msgRequestQueue = document.getElementById("socket-config") ? JSON.parse(document.getElementById("socket-config").innerHTML): {};

if (msgRequestQueue.type == 'E' || msgRequestQueue.type == 'Y' || msgRequestQueue.type == 'S' || msgRequestQueue.type == 'U'){
	//sockets are blocked by ESPN cross-origin policy, so the side assistant needs to poll the local storage 
	// and now Yahoo too

	setInterval(
		function(){ 
	
			msgRequestQueue.cmd = 'getLastAssistantQueue';
	
		    chrome.runtime.sendMessage(msgRequestQueue, function(msg){  
				if (msg.currentQueue && lastQueueRead != msg.currentQueue ){
					console.debug("onInterval Queue changed to " + msg.currentQueue);
					lastQueueRead = msg.currentQueue;
	    			msg.eventType = 'queueEvent'
					var actualCode = 'ng_onSocketEvent(' + JSON.stringify(msg) + ')';
					var script = document.createElement('script');
					script.textContent = actualCode;
					(document.head||document.documentElement).appendChild(script);
					script.remove();
				}
			});
		    
		}, 500);
}
		