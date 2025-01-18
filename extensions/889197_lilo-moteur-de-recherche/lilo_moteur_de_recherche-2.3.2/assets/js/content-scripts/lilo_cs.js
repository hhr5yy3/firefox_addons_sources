if (typeof browser === 'undefined') {
	browser = chrome;
}
/**
 * On message event, forward message to background page of WebExtension
 */
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;
    
    // We only forward message to Lilo Extension
    if(event.data.message != "callLiloSearchExt"){
    	return;
    }
    
    // Define callback
    var callback = function(response){
    	postMessage({"method": event.data.method,"response":response,"message":"LiloSearchExtAnswer", "src": "LiloSearch"}, event.origin);
    };
    
	// Call Extension
    browser.runtime.sendMessage(event.data, callback);
});