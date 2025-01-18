/* jshint esversion: 6 */
/* jshint bitwise: false*/
/* global window,browser,document */

(function() {
	// eslint-disable-next-line no-undef
	let runtimeAPI = typeof browser !== "undefined" ? browser.runtime : chrome.runtime; //https://developer.chrome.com/extensions/runtime
	let backgroundScriptPort;
	let logEnabled = false;
	let apiVersion = null;
	let hostVersion = null;

	let apiV1Tasks = ["StartLocalEdit", "EndLocalEdit", "AbortLocalEdit", "setProperty", "getProperty", "deleteProperty", "queryWorkDir", "configureWorkDir"];
	let apiV2Tasks = ["checkout", "checkin", "RevertCheckout", "interimUpload", "listDocs"];
	let apiV4Tasks = ["CompareFiles"];
	let nonApiTasks = ["getHostVersion", "getAPIVersion", "ping"];
	let allowedTasks = [];
	let blockedReqIds = [];

	if(document.documentElement.getElementsByTagName("body")[0].hasAttribute("data-local-edit-extension-installed")) {
		document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-extension-installed", true);
		document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-extension-disabled", false);
		document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-extension-version", runtimeAPI.getManifest().version);

		setProperty("locale", document.documentElement.getAttribute("lang"));
		getProperty("getLogEnabled");
		getProperty("extensionDisabled");
		if(apiVersion === null) {
			getProperty("getAPIVersion");
		}
		if(hostVersion === null) {
			getProperty("getHostVersion");
		}
	}

	window.addEventListener("message", function(event) {
		if(typeof event.data.task === "undefined") {
			log("ignore message", event, event.data);
			return;
		}

		if(blockedReqIds.includes(event.data.reqId)) {
			//duplicate event listener due to edge bug
			//https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11373164/
			return;
		}
		else {
			blockedReqIds.push(event.data.reqId);
		}

		if(!allowedTasks.includes(event.data.task) && !nonApiTasks.includes(event.data.task)) {
			let neededAPIVersion;
			if(apiV1Tasks.includes(event.data.task)) {
				neededAPIVersion = 1;
			}
			if(apiV2Tasks.includes(event.data.task)) {
				neededAPIVersion = 2;
			}
			if(apiV4Tasks.includes(event.data.task)) {
				neededAPIVersion = 4;
			}
			let error = "Task not supported by used native host. Needed API Version: " + neededAPIVersion + ", present API version: " + apiVersion;
			log(error, event, event.data);
			window.postMessage({ error: { message: error }, reqId: event.data.reqId }, "*");
			return;
		}

		let promise = checkBackgroundScriptConnection();

		let url;
		url = window.location.href;
		if(url.indexOf("#") !== -1) {
			url = url.substring(0, url.indexOf("#"));
		}
		url = url.substring(0, url.lastIndexOf("/") + 1);

		event.data.tabURL = url;
		promise.then(function() {
			log("backgroundScriptPort.postMessage", event.data);
			backgroundScriptPort.postMessage(event.data);
		});
	});

	function getProperty(task) {
		let promise = checkBackgroundScriptConnection();

		let msg = {
			reqId: createGuid(),
			task: task
		};
		promise.then(function() {
			backgroundScriptPort.postMessage(msg);
		});
	}

	function setProperty(key, value) {
		let promise = checkBackgroundScriptConnection();

		let msg = {
			reqId: createGuid(),
			task: "setProperty",
			key: key,
			value: value
		};
		promise.then(function() {
			backgroundScriptPort.postMessage(msg);
		});
	}

	function checkBackgroundScriptConnection() {
		return new Promise(function(resolve) {
			if(backgroundScriptPort === undefined) {
				log("connect backgroundScriptPort");
				backgroundScriptPort = runtimeAPI.connect(runtimeAPI.id, { name: createGuid() });
				log("backgroundScriptPort", backgroundScriptPort);

				backgroundScriptPort.onMessage.addListener(backgroundScriptOnMessageListener);
				backgroundScriptPort.onDisconnect.addListener(backgroundScriptPortOnDisconnectListener);
				resolve();
			}
			else {
				backgroundScriptPort.postMessage({
					reqId: createGuid(),
					task: "ping"
				});

				let timeoutId = window.setTimeout(function() {
					log("connect backgroundScriptPort");
					backgroundScriptPort = runtimeAPI.connect(runtimeAPI.id, { name: createGuid() });
					log("backgroundScriptPort", backgroundScriptPort);

					backgroundScriptPort.onMessage.addListener(backgroundScriptOnMessageListener);
					backgroundScriptPort.onDisconnect.addListener(backgroundScriptPortOnDisconnectListener);
					resolve();
				}, 250);

				let pingListener = function(msg) {
					if(msg.task === "ping") {
						window.clearTimeout(timeoutId);
						backgroundScriptPort.onMessage.removeListener(pingListener);
						resolve();
					}
				};

				backgroundScriptPort.onMessage.addListener(pingListener);
			}
		});

	}

	function backgroundScriptOnMessageListener(msg) {

		let index = blockedReqIds.indexOf(msg.reqId);
		if(index > -1) {
			blockedReqIds.splice(index, 1);
		}

		if(msg.task === "ping") {
			return;
		}

		if(msg.task === "getLogEnabled") {
			logEnabled = msg.logEnabled;
			return;
		}

		if(msg.task === "extensionDisabled") {
			document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-extension-disabled", msg.extensionDisabled);
		}

		if(msg.task === "getAPIVersion" || msg.task === "setAPIVersion") {
			if(msg.apiVersion === undefined) {
				return;
			}
			apiVersion = msg.apiVersion;
			if(apiVersion >= 1) {
				allowedTasks = allowedTasks.concat(apiV1Tasks);
			}
			if(apiVersion >= 2) {
				allowedTasks = allowedTasks.concat(apiV2Tasks);
			}
			if(apiVersion >= 4) {
				allowedTasks = allowedTasks.concat(apiV4Tasks);
			}

			document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-api-version", msg.apiVersion);

			return;
		}

		if(msg.task === "getHostVersion" || msg.task === "setHostVersion") {
			hostVersion = msg.hostVersion;
			document.documentElement.getElementsByTagName("body")[0].setAttribute("data-local-edit-host-version", msg.hostVersion);
			return;
		}
		log("backgroundScriptPort.onMessage", msg);
		window.postMessage(msg, "*");
	}

	function backgroundScriptPortOnDisconnectListener(port) {
		let error = (port && port.error && port.error.message) || runtimeAPI.lastError || "";
		window.postMessage(error, "*");
		log("backgroundScriptPort.onDisconnect", "Connection Lost", error);
		backgroundScriptPort = undefined;
	}

	function connectionFromBackgroundScript(port) {
		backgroundScriptPort = port;
		backgroundScriptPort.onMessage.addListener(backgroundScriptOnMessageListener);
		backgroundScriptPort.onDisconnect.addListener(backgroundScriptPortOnDisconnectListener);
	}

	function createGuid() {
		//  http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			let r = Math.random() * 16 | 0,
				v = c === "x" ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}

	function log() {
		if(!logEnabled) {
			return;
		}
		let args = Array.prototype.slice.call(arguments);
		args.splice(0, 0, new Date().toLocaleString(), "content.js");

		console.log.apply(null, args);
	}
})();
