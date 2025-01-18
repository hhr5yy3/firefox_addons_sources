if (typeof(Array.prototype.find) == "udnefined") {
	Array.prototype.find = function(fn) {
		for (var i=0; i<this.length; i++) {
			if (fn(this[i])) {
				return this[i];
			}
		}
	}
}

// 2, 3 (with event data from web javascript)
window.removeEventListener('message', onWindowMessageListener, false)
window.addEventListener('message', onWindowMessageListener, false);
var commitMessageReqIds = [];
function onWindowMessageListener(event) {
	if (event.source != window)
		return;
	
	// Борьба с дублированием аналитик
	if (event.data.command == 'commit' && event.data.reqId != undefined 
			&& event.data.type != 'planfixTimerExtensionResponse') {
		if (!commitMessageReqIds.find(function(id){return id == event.data.reqId})) {
			commitMessageReqIds.push(event.data.reqId);
			browser.runtime.sendMessage(event.data);
		}
	}
	else {
		browser.runtime.sendMessage(event.data);
	}
}
	
// 1 (extension send message with sender.id: extension_id
browser.runtime.onMessage.removeListener(onChromeRuntimeMessageListener);
browser.runtime.onMessage.addListener(onChromeRuntimeMessageListener);
function onChromeRuntimeMessageListener(msg, sender, sendResponse) {
	window.postMessage(msg, '*');

	if (msg.type == 'SHOW_SAVE_SUCCESS_ALERT') {
		window.postMessage({
			type: 'planfixTimerExtensionRequest',
			reqId: Date.now(),
			command: 'saved'
		}, '*');
	} else if (msg.type == 'SHOW_SAVE_ERROR_ALERT') {
		window.postMessage({
			type: 'planfixTimerExtensionRequest',
			reqId: Date.now(),
			command: 'saveError'
		}, '*');
	}

	return true;
}