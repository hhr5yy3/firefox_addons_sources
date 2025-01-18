/* jshint esversion: 6 */
/* global browser,chrome */

(function() {
	let runtimeAPI = typeof browser !== "undefined" ? browser.runtime : chrome.runtime; //https://developer.chrome.com/docs/extensions/reference/runtime/ & https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime
	let pageActionAPI = typeof browser !== "undefined" ? browser.pageAction : chrome.pageAction; //https://developer.chrome.com/docs/extensions/reference/pageAction/ & https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/pageAction
	let tabsAPI = typeof browser !== "undefined" ? browser.tabs : chrome.tabs; //https://developer.chrome.com/docs/extensions/reference/tabs/ & https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs
	let cookiesAPI = typeof browser !== "undefined" ? browser.cookies : chrome.cookies; //https://developer.chrome.com/docs/extensions/reference/cookies/ & https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies
	let nativeAppPort;
	let nativeAppPortDisconnected = true;
	let contentScriptPort = {};
	let optionsScriptPort;
	let requestIDs = {};
	let hostName = "de.otris.documents.localediting";
	let lastRequestId;
	let blockingErrors = [ //errors that will disable the extension after first appearance
		-17 //blocked by other host process
	];
	let extensionOptionsDisabled = false;
	let startLocalEditTaskIds = [];

	//properties from native app host
	let logEnabled = true;
	let addCookies = true;
	let localFiles = 0;
	let locale = "en";
	let whitelist = [];
	let autoCreate = true;
	let localPath;
	let localPathFromManager;
	let apiVersion;
	let hostVersion;

	//API Changed for API V6
	let tasksV6 = [
		"StartLocalEdit",
		"EndLocalEdit",
		"checkout",
		"checkin",
		"interimUpload",
		"CompareFiles"
	];

	let localization = {
		en: {
			blockedByWhitelist: "Local editing couldn't be started because the current URL is not part of the whitelist."
		},
		de: {
			blockedByWhitelist: "Das lokale Bearbeiten konnte nicht gestartet werden. Die aktuelle URL ist nicht Teil der Whitelist."
		}
	};

	tabsAPI.onUpdated.addListener(checkContentJSInjected);

	runtimeAPI.onConnect.addListener(function(port) {
		if(nativeAppPortDisconnected || nativeAppPort === undefined) {
			log("connect nativeAppPort", hostName);
			nativeAppPort = runtimeAPI.connectNative(hostName);
			nativeAppPortDisconnected = false;
			log("nativeAppPort", nativeAppPort);
		}

		if(!nativeAppPort.onDisconnect.hasListener(nativeAppPortOnDisconnectListener)) {
			nativeAppPort.onDisconnect.addListener(nativeAppPortOnDisconnectListener);
		}

		if(!nativeAppPort.onMessage.hasListener(nativeAppPortOnMessageListener)) {
			nativeAppPort.onMessage.addListener(nativeAppPortOnMessageListener);
		}



		if((port.sender && port.sender.url &&
				//chrome
				(port.sender.url.indexOf("chrome-extension://") !== -1 ||
					//firefox
					port.sender.url.indexOf("moz-extension://") !== -1)) ||
			//edge
			port.sender === undefined) {
			optionsScriptPort = port;

			if(!optionsScriptPort.onDisconnect.hasListener(optionsScriptPortOnDisconnectListener)) {
				optionsScriptPort.onDisconnect.addListener(optionsScriptPortOnDisconnectListener);
			}

			if(!optionsScriptPort.onMessage.hasListener(optionsScriptPortOnMessageListener)) {
				optionsScriptPort.onMessage.addListener(optionsScriptPortOnMessageListener);
			}
		}
		else {
			contentScriptPort[port.name] = {};
			contentScriptPort[port.name].port = port;
			contentScriptPort[port.name].tab = port.sender.tab;

			if(!contentScriptPort[port.name].port.onDisconnect.hasListener(contentScriptPortOnDisconnectListener)) {
				contentScriptPort[port.name].port.onDisconnect.addListener(contentScriptPortOnDisconnectListener);
			}

			if(!contentScriptPort[port.name].port.onMessage.hasListener(contentScriptPortOnMessageListener)) {
				contentScriptPort[port.name].port.onMessage.addListener(contentScriptPortOnMessageListener);
			}

			contentScriptPort[port.name].port.postMessage({ msg: "connection to native app established", status: 0 });

			getProperty("getLogEnabledInBackgroundScript", "logEnabled");
			getProperty("getWhitelistInBackgroundScript", "whitelist");
			getProperty("getLocaleInBackgroundScript", "locale");
			getProperty("getAutoCreateInBackgroundScript", "autoCreate");
			getProperty("getAddCookiesInBackgroundScript", "addCookies");

			log("nativeAppPort.postMessage", "queryWorkDir");
			nativeAppPort.postMessage({
				reqId: "getLocalPathInBackgroundScript",
				task: "queryWorkDir"
			});

			nativeAppPort.postMessage({
				reqId: "getAPIVersionInBackgroundScript",
				task: "getAPIVersion"
			});
		}


	});

	function checkNativeAppConnection() {
		if(nativeAppPortDisconnected) {
			log("connect nativeAppPort", hostName);
			nativeAppPort = runtimeAPI.connectNative(hostName);
			nativeAppPortDisconnected = false;
			log("nativeAppPort", nativeAppPort);
		}
	}

	function contentScriptPortOnDisconnectListener(port) {
		let error = (port && port.error && port.error.message) || runtimeAPI.lastError || "";
		log("contentScriptPort.onDisconnect", "Connection Lost", error);
		delete contentScriptPort[port.name];

		if(Object.keys(contentScriptPort).length === 0) {
			nativeAppPort.disconnect();
			nativeAppPort = undefined;
		}
	}

	function optionsScriptPortOnDisconnectListener() {
		optionsScriptPort = undefined;
		log("optionsScriptPort.onDisconnect", "options page closed");
	}

	function nativeAppPortOnDisconnectListener(port) {
		let error = (port && port.error && port.error.message) || runtimeAPI.lastError || "";

		log("nativeAppPort.onDisconnect", error);
		nativeAppPortDisconnected = true;

		Object.keys(contentScriptPort).forEach(function(key) {
			contentScriptPort[key].port.postMessage({
				message: "connection to native app lost",
				error: error
			});
		});
	}

	function contentScriptPortOnMessageListener(msg, port) {
		log("contentScriptPort.onMessage", msg);

		if(msg.task === "ping") {
			port.postMessage({
				reqId: msg.reqId,
				task: "ping"
			});
			return;
		}

		checkNativeAppConnection();

		if(msg.reqId !== undefined && requestIDs[msg.reqId] !== undefined) {
			log("duplicate blocked", msg);
			return;
		}

		requestIDs[msg.reqId] = port.name;

		let tasks = [
			"StartLocalEdit",
			"EndLocalEdit",
			"AbortLocalEdit",
			"checkout",
			"checkin",
			"RevertCheckout"
		];

		if(tasks.indexOf(msg.task) === -1) {
			if(msg.task === "getLogEnabled") {
				contentScriptPort[port.name].port.postMessage({
					task: msg.task,
					logEnabled: logEnabled,
					status: 0
				});
				return;
			}

			if(msg.task === "getAddCookies") {
				contentScriptPort[port.name].port.postMessage({
					task: msg.task,
					addCookies: addCookies,
					status: 0
				});
				return;
			}

			if(msg.task === "getAPIVersion") {
				contentScriptPort[port.name].port.postMessage({
					task: msg.task,
					apiVersion: apiVersion,
					status: 0
				});
				return;
			}

			if(msg.task === "getHostVersion") {
				contentScriptPort[port.name].port.postMessage({
					task: msg.task,
					hostVersion: hostVersion,
					status: 0
				});
				return;
			}

			if(msg.task === "extensionDisabled") {
				contentScriptPort[port.name].port.postMessage({
					task: msg.task,
					extensionDisabled: extensionOptionsDisabled,
					status: 0
				});
				return;
			}

			if(msg.task === "configureWorkDir") {
				localPathFromManager = true;

			}
		}
		else {
			if(msg.task === "StartLocalEdit" || msg.task === "checkout") {
				localFiles++;
				startLocalEditTaskIds.push(msg.reqId);
			}
			else if(msg.task === "EndLocalEdit" || msg.task === "AbortLocalEdit" || msg.task === "checkin" || msg.task === "RevertCheckout") {
				if(localFiles === 0) {
					contentScriptPort[port.name].port.postMessage({
						reqId: msg.reqId,
						status: 0
					});
					return;
				}
				else {
					lastRequestId = msg.reqId;
				}
			}

		}
		if(checkWhitelist(msg)) {
			log("nativeAppPort.postMessage", msg);


			if(tasksV6.indexOf(msg.task) !== -1 && apiVersion >= 6) {
				msg.cookies = [];

				if(addCookies) {
					if(typeof browser !== "undefined") {
						//firefox
						cookiesAPI.getAll({ url: port.sender.tab.url }).then((cookies) => {
							cookies.forEach((cookie) => {
								if(cookie.name.toLowerCase() !== "jsessionid") {
									msg.cookies.push({
										name: cookie.name,
										value: cookie.value
									});
								}
							});
							nativeAppPort.postMessage(msg);
						});
					}
					else {
						//chrome
						//TODO switch to Promise when updating to Manifest V3
						cookiesAPI.getAll({ url: port.sender.tab.url }, function(cookies) {
							cookies.forEach((cookie) => {
								if(cookie.name.toLowerCase() !== "jsessionid") {
									msg.cookies.push({
										name: cookie.name,
										value: cookie.value
									});
								}
							});
							nativeAppPort.postMessage(msg);
						});
					}
				}
				else {
					nativeAppPort.postMessage(msg);
				}
			}
			else {
				nativeAppPort.postMessage(msg);
			}
		}
		else if(msg.task === "StartLocalEdit") {
			if(!(locale in localization)) {
				locale = "en";
			}

			contentScriptPort[port.name].port.postMessage({
				error: {
					message: localization[locale].blockedByWhitelist
				},
				reqId: msg.reqId
			});
		}
	}

	function optionsScriptPortOnMessageListener(msg) {
		log("optionsScriptPort.onMessage", msg);

		if(msg.task === "getLogEnabled") {
			optionsScriptPort.postMessage({
				task: msg.task,
				logEnabled: logEnabled,
				status: 0
			});
			return;
		}

		if(msg.task === "getAddCookies") {
			optionsScriptPort.postMessage({
				task: msg.task,
				addCookies: addCookies,
				status: 0
			});
			return;
		}

		if(msg.task === "getWhitelist") {
			optionsScriptPort.postMessage({
				task: msg.task,
				whitelist: whitelist,
				status: 0
			});
			return;
		}

		if(msg.task === "getLocale") {
			optionsScriptPort.postMessage({
				task: msg.task,
				locale: locale,
				status: 0
			});
			return;
		}

		if(msg.task === "getAutoCreate") {
			optionsScriptPort.postMessage({
				task: msg.task,
				autoCreate: autoCreate,
				status: 0
			});
			return;
		}

		if(msg.task === "getLocalPath") {
			optionsScriptPort.postMessage({
				task: msg.task,
				localPath: localPath,
				status: 0
			});
			return;
		}

		if(msg.task === "getAPIVersion") {
			optionsScriptPort.postMessage({
				task: msg.task,
				apiVersion: apiVersion,
				status: 0
			});
			return;
		}

		if(msg.task === "getHostVersion") {
			optionsScriptPort.postMessage({
				task: msg.task,
				hostVersion: hostVersion,
				status: 0
			});
			return;
		}

		if(msg.task === "isLocalPathFromManager") {
			optionsScriptPort.postMessage({
				task: msg.task,
				localPathFromManager: localPathFromManager,
				status: 0
			});
			return;
		}

		//store changes
		if(msg.task === "configureWorkDir") {
			localPath = msg.path;
		}
		if(msg.key === "whitelist") {
			whitelist = msg.value;
		}
		if(msg.key === "logEnabled") {
			logEnabled = msg.value;
		}
		if(msg.key === "addCookies") {
			addCookies = msg.value;
		}
		if(msg.key === "autoCreate") {
			autoCreate = msg.value;
		}

		log("nativeAppPort.postMessage", msg);
		nativeAppPort.postMessage(msg);
	}

	function checkContentJSInjected(tabID, changeInfo, tab) {
		let injectContentJS = function(hasAttribute) {
			if(hasAttribute && hasAttribute[0]) {
				new Promise(function(resolve) {
					//api version needs to be present before injecting content.js
					//if already present skip requesting it from the native host and inject directly
					if(apiVersion !== undefined) {
						return resolve();
					}

					if(nativeAppPortDisconnected || nativeAppPort === undefined) {
						log("connect nativeAppPort2", hostName);
						nativeAppPort = runtimeAPI.connectNative(hostName);
						nativeAppPortDisconnected = false;
						log("nativeAppPort2", nativeAppPort);
					}


					nativeAppPort.onMessage.addListener(
						/**
						 * @param {Object} msg
						 * @param {String} msg.reqId
						 * @param {Number} msg.currentVersion
						 * @param {String} msg.hostVersion
						 */
						function tmpNativeAppPortListener(msg) {
							if(msg.reqId === "getAPIVersionInBackgroundScript") {
								apiVersion = msg.currentVersion;
								hostVersion = msg.hostVersion;
								nativeAppPort.onMessage.removeListener(tmpNativeAppPortListener);
								resolve();
							}
						});

					nativeAppPort.postMessage({
						reqId: "getAPIVersionInBackgroundScript",
						task: "getAPIVersion"
					});

				}).then(function() {
					pageActionAPI.show(tab.id);
					tabsAPI.executeScript(tab.id, {
						file: "content.js"
					});
				});
			}
		};

		if(changeInfo.status === "complete") {
			//check if 'data-local-edit-extension-installed' attribute is present to prevent injecting in non Documents5 pages
			tabsAPI.executeScript(tab.id, {
				code: "if(document.documentElement.getElementsByTagName(\"body\")[0].hasAttribute('data-local-edit-extension-installed')) {" +
					"document.documentElement.getElementsByTagName(\"body\")[0].getAttribute('data-local-edit-extension-installed') === \"false\"; " +
					"} else {" +
					"false" +
					"};"
			}, injectContentJS);
		}
	}

	/**
	 * @param {String} nativeMessage
	 * @param {Number} [nativeMessage.currentFiles]
	 * @param {Number} nativeMessage.status
	 * @param {Number} [nativeMessage.currentVersion]
	 * @param {String} nativeMessage.reqId
	 * @param {String} [nativeMessage.key]
	 * @param {String} [nativeMessage.msg]
	 * @param {String} [nativeMessage.value]
	 * @param {String} [nativeMessage.path]
	 * @param {String} [nativeMessage.hostVersion]
	 */
	function nativeAppPortOnMessageListener(nativeMessage) {
		log("nativeAppPort.onMessage", nativeMessage);

		if(typeof nativeMessage === "string") {
			nativeMessage = JSON.parse(decodeURI(nativeMessage));
		}
		if(nativeMessage.reqId === lastRequestId && nativeMessage.status === 0) {
			nativeAppPort.postMessage({
				reqId: "getNumberOfLocalFiles",
				task: "queryWorkDir"
			});
		}
		if(nativeMessage.key === "whitelist") {

			if(nativeMessage.msg === "Unknown property") {
				let msg = {
					task: "setProperty",
					key: "whitelist",
					value: []
				};
				log("NativeAppPort.postMessage", msg);
				nativeAppPort.postMessage(msg);
				whitelist = [];
				return;
			}

			whitelist = nativeMessage.value;
			//if call from init don't send message to content/optionsscript
			if(nativeMessage.reqId === "getWhitelistInBackgroundScript") {
				return;
			}
		}
		if(nativeMessage.key === "locale") {
			locale = nativeMessage.value;
			//if call from init don't send message to content/optionsscript
			if(nativeMessage.reqId === "getLocaleInBackgroundScript") {
				return;
			}
		}

		if(nativeMessage.key === "logEnabled") {
			if(nativeMessage.msg === "Unknown property") {
				let msg = {
					task: "setProperty",
					key: "logEnabled",
					value: logEnabled
				};
				log("NativeAppPort.postMessage", msg);
				nativeAppPort.postMessage(msg);
				return;
			}

			logEnabled = nativeMessage.value;
			//if call from init don't send message to content/optionsscript
			if(nativeMessage.reqId === "getLogEnabledInBackgroundScript") {
				return;
			}
		}

		if(nativeMessage.key === "addCookies") {
			if(nativeMessage.msg === "Unknown property") {
				let msg = {
					task: "setProperty",
					key: "addCookies",
					value: addCookies
				};
				log("NativeAppPort.postMessage", msg);
				nativeAppPort.postMessage(msg);
				return;
			}

			addCookies = nativeMessage.value;
			//if call from init don't send message to content/optionsscript
			if(nativeMessage.reqId === "getAddCookiesInBackgroundScript") {
				return;
			}
		}

		if(nativeMessage.key === "autoCreate") {
			if(nativeMessage.msg === "Unknown property") {
				let msg = {
					task: "setProperty",
					key: "autoCreate",
					value: true
				};
				log("NativeAppPort.postMessage", msg);
				nativeAppPort.postMessage(msg);
				return;
			}

			autoCreate = nativeMessage.value;
			//if call from init don't send message to content/optionsscript
			if(nativeMessage.reqId === "getAutoCreateInBackgroundScript") {
				return;
			}
		}

		if(nativeMessage.path !== undefined) {
			localPath = nativeMessage.path;
		}

		if(nativeMessage.currentFiles !== undefined) {
			localFiles = nativeMessage.currentFiles;
		}

		if(nativeMessage.reqId === "getAPIVersionInBackgroundScript") {
			apiVersion = nativeMessage.currentVersion;
			hostVersion = nativeMessage.hostVersion;

			Object.keys(contentScriptPort).map(function(key) {
				contentScriptPort[key].port.postMessage({
					task: "setAPIVersion",
					apiVersion: apiVersion,
					status: 0
				});

				contentScriptPort[key].port.postMessage({
					task: "setHostVersion",
					hostVersion: hostVersion,
					status: 0
				});
			});
		}

		if(startLocalEditTaskIds.includes(nativeMessage.reqId) && nativeMessage.status !== 0) {
			localFiles--;
		}

		if(contentScriptPort && requestIDs[nativeMessage.reqId] !== undefined) {
			if(blockingErrors.includes(nativeMessage.status)) {
				disableExtensionOptions();
			}
			if(extensionOptionsDisabled === true && nativeMessage.status === 0) {
				enableExtensionOptions();
			}
			contentScriptPort[requestIDs[nativeMessage.reqId]].port.postMessage(nativeMessage);
		}

		if(optionsScriptPort) {
			optionsScriptPort.postMessage(nativeMessage);
		}
	}

	//disables the extension options for all tabs
	function disableExtensionOptions() {
		for(let portName in contentScriptPort) {
			pageActionAPI.hide(contentScriptPort[portName].tab.id);
			contentScriptPort[portName].port.postMessage({
				task: "extensionDisabled",
				extensionDisabled: true,
				status: 0
			});
		}
		extensionOptionsDisabled = true;
	}

	//enables the extension options for all tabs
	function enableExtensionOptions() {
		for(let portName in contentScriptPort) {
			pageActionAPI.show(contentScriptPort[portName].tab.id);
			contentScriptPort[portName].port.postMessage({
				task: "extensionDisabled",
				extensionDisabled: false,
				status: 0
			});
		}
		extensionOptionsDisabled = false;
	}

	function getProperty(reqId, key) {
		let msg = {
			reqId: reqId,
			task: "getProperty",
			key: key
		};

		checkNativeAppConnection();
		log("nativeAppPort.postMessage", msg);
		nativeAppPort.postMessage(msg);
	}

	function log() {
		if(!logEnabled) {
			return;
		}
		let args = Array.prototype.slice.call(arguments);
		args.splice(0, 0, new Date().toLocaleString(), "background.js");

		console.log.apply(null, args);
	}

	function checkWhitelist(msg) {
		return !(whitelist.indexOf(msg.tabURL) === -1 && whitelist.length > 0);
	}
})();
