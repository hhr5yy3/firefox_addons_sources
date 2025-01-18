
function checkURLChanged() {
	// var tCurrURL = document.location.href;
	// console.log(tCurrURL);
	// if(tCurrURL.indexOf("/appointments") > 0) {
	if(document.body.innerHTML.indexOf('json-data') > 0){
		// Finished navigating
		browser.runtime.sendMessage("RenderComplete");
	} else {
		browser.runtime.sendMessage("ContinuePolling");
		continuePolling();
	}
}

function continuePolling(){
	setTimeout(checkURLChanged, 2000);
}

function initContentScript() {
	checkURLChanged();
}

initContentScript();