var types = {
	REQUEST: "request",
	RESPONSE: "response"
}, processTypes = {
	ERROR: "error",
	RESULT: "result"
};
var rietumuBgCommunicator = function(data) {
	var eventName = data.event, requestid = data.requestid, logError = function(response) {
		var error = response.error || response.message || 'TECHNICAL_ERROR';
		sendResponse({
			requestid: requestid,
			type: types.RESPONSE,
			event: eventName,
			process: processTypes.ERROR,
			error: error,
			data: response
		});
	}, sendResponse = function(msg) {
		window.postMessage(msg, "*");
	};
	browser.runtime.sendMessage('addon@rietumu.lv', data.data, {}).then(function(response) {
		if (response && response.data) {
			sendResponse({
				requestid: requestid,
				type: types.RESPONSE,
				event: eventName,
				process: processTypes.RESULT,
				data: response.data
			});
		}
		else if (!response || response.error || response.message) {
			logError(response);
		}
	}, logError);
};
window.addEventListener("message", function(event) {
	if (event.source == window) {
		if (event.data && event.data.event && event.data.type == types.REQUEST) {//Check that this is answer from plugin
			if (event.data && event.data.requestid) {
				rietumuBgCommunicator(event.data);
			}
		}
	}
}, false);