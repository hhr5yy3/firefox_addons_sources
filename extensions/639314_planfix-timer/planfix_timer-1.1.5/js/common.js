function sendTabMessage(tabId, message) {
	DEBUG.log("Sending tab message to #tabId:" + tabId + " with message:" + JSON.stringify(message));
	browser.tabs.sendMessage(tabId, message);
}

function sendRuntimeMessage(options) {	
	DEBUG.log("Sending runtime message " + getHumanMessageType(options.type) +
			" with options:" + JSON.stringify(options));
	
	return new Promise(function(resolve, reject) {
		browser.runtime.sendMessage(options).then((res) => {
			resolve(res);
		});
	});
}

function queryToChromeTabs(options) {
	DEBUG.log("Query to chrome tabs with options:" + JSON.stringify(options));
	return new Promise(function(resolve, reject) {
		browser.tabs.query(options).then((tabs) => {
			resolve(tabs);
		});
	})
}

function getHumanMessageType(type) {
	var messageType = '';
	if (typeof (type) !== 'undefined') {
		for (var typeName in MessageType) {
			if (MessageType[typeName] == type) {
				messageType = typeName;
				break;
			}
		}
	}
	
	return messageType;
}

function escapeHTML(str) {
	return $("<div>").html(str).text();
}

var MessageType = {
	CHECH_FOR_RUNNING: 0,
	CHECK_IF_NEED_SAVE: 1,
	GET_DEF_TIMER_OPTIONS: 2,
	GET_TIMER_OPTIONS: 3,
	SAVE_TIMER: 4,
	GET_TIME_FORMAT: 5,
	START_TIMER: 6,
	RESET_TIMER: 7,
	CHECK_ANALITIC_ACCESS: 9,
	GET_WORKS: 10,
	SET_VIEW_FOR_TIMER: 11,
	IS_USER_AUTHED: 12,
	TIME_FORMAT: 13,
	UPDATE_DEF_TYPE_OF_WORK: 14,
	INFO_FOR_DEVELOPE: 15,
	SHOW_GET_AUTH: 16,
	SHOW_SUCCESS: 17,
	GET_ACCESS: 18,
	SERVER_ERROR: 19,
	SAVE_ERROR: 20,
	TIMER_WAS_SAVED: 21
};