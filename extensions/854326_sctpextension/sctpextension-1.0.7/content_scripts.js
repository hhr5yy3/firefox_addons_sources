window.addEventListener("message", function(event) {
	if (event.source != window)
		return;

	if (event.data.type) {
					
		browser.runtime.sendMessage(JSON.stringify(event.data), function(response){
			var res = JSON.parse(response);
			window.postMessage(JSON.stringify(res),"*");
		});
	}
}, true);