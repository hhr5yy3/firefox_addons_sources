window.addEventListener("message", (event) => {
	if (event.source === window && event.data.reqId.length && event.data.src === "zzmsgMywebookPage") {
		try {
			var port = chrome.runtime.connect();
			if (port) {
				port.disconnect();
				if (chrome.runtime) {
					chrome.runtime.sendMessage({
						action: 'internalPlId',
						data: {}//need this to return plId
					}, function (res) {
						window.postMessage({
							src: "zzmsgMywebookPlugin",
							reqId: event.data.reqId,
							data: res
						}, "*");
					});
				}
			}
		} catch (er) {
			console.log("ER! ", er);
		}
	}
});
