/* jshint esversion: 6 */
/*global browser, chrome, document, window*/

(function() {

	let runtimeAPI = typeof browser !== "undefined" ? browser.runtime : chrome.runtime; //https://developer.chrome.com/extensions/runtime
	let backgroundScriptPort;
	let logEnabled = false;
	let local;

	let localization = {
		en: {
			elements: {
				whitelistLabel: "Whitelist",
				addToWhitelist: "Add current URL",
				clearWhitelist: "Clear",
				localPathLabel: "Local Path",
				autoCreateLabel: "Auto create directory",
				cookiesLabel: "Send Cookies (API 6 or higher)",
				settings: "Settings",
				loggingLabel: "Logging",
				versionInformationLabel: "Version Information:",
				extensionVersionLabel: "Extension:",
				hostVersionLabel: "Host:",
				apiVersionLabel: "API:"
			},
			messages: {
				"error.urlAlreadyExists": "URL already in whitelist."
			}
		},
		de: {
			elements: {
				whitelistLabel: "Erlaubte Seiten",
				addToWhitelist: "Aktuelle URL hinzufügen",
				clearWhitelist: "Löschen",
				localPathLabel: "Lokaler Speicherort",
				autoCreateLabel: "Pfad automatisch erstellen",
				cookiesLabel: "Cookies mitschicken (API 6 oder höher)",
				settings: "Einstellungen",
				loggingLabel: "Logging",
				versionInformationLabel: "Versionsinformationen:",
				extensionVersionLabel: "Extension:",
				hostVersionLabel: "Host:",
				apiVersionLabel: "API:"
			},
			messages: {
				"error.urlAlreadyExists": "Die URL ist bereits in der Whitelist"
			}
		}
	};

	function init() {
		initializeBackgroundScriptEventListener();
		restoreSettings();
	}

	function checkBackgroundScriptConnection() {
		if(backgroundScriptPort === undefined) {
			backgroundScriptPort = runtimeAPI.connect();
		}
	}

	document.addEventListener("DOMContentLoaded", init);
	document.getElementById("addToWhitelist").addEventListener("click", addUrlToWhitelist);
	document.getElementById("clearWhitelist").addEventListener("click", clearWhitelist);
	document.getElementById("whitelist").addEventListener("change", saveWhitelist);
	document.getElementById("localPath").addEventListener("change", saveOptions);
	document.getElementById("autoCreate").addEventListener("change", saveAutoCreate);
	document.getElementById("logEnabled").addEventListener("change", saveLogEnabled);
	document.getElementById("addCookies").addEventListener("change", saveAddCookies);


	//options

	function saveOptions() {

		checkBackgroundScriptConnection();

		log(document.getElementById("localPath").value);


		let msg = {
			task: "configureWorkDir",
			path: document.getElementById("localPath").value,
			acceptIfNotEmpty: false,
			autoCreate: document.getElementById("autoCreate").checked,
			logEnabled: document.getElementById("logEnabled").checked,
			addCookies: document.getElementById("addCookies").checked
		};

		backgroundScriptPort.postMessage(msg);
	}


	//whitelist

	function addUrlToWhitelist() {
		chrome.tabs.query({ lastFocusedWindow: true, active: true }, function(tabs) {
			let url = tabs[0].url;
			if(url.indexOf("#") !== -1) {
				url = url.substring(0, url.indexOf("#"));
			}
			url = url.substring(0, url.lastIndexOf("/") + 1);

			if(getWhitelist().indexOf(url) === -1) {
				clearErrorMessages("whitelistErrorMessages");

				if(window.confirm("Add URL to whitelist?\n" + url)) {
					document.getElementById("whitelist").value += url + "\n";
					saveWhitelist();
				}
			}
			else {
				addErrorMessage("whitelistErrorMessages", local.messages["error.urlAlreadyExists"]);
			}
		});
	}

	function getWhitelist() {
		let whitelist = document.getElementById("whitelist").value;
		return whitelist.split("\n").filter(urls => urls !== "");
	}


	function initializeBackgroundScriptEventListener() {
		checkBackgroundScriptConnection();

		backgroundScriptPort.onMessage.addListener(function(msg) {
			log("backgroundScriptPort.onMessage", msg);
			document.getElementById("extensionVersion").textContent = runtimeAPI.getManifest().version;

			if(msg.task === "getWhitelist") {
				msg.whitelist.forEach(function(url) {
					document.getElementById("whitelist").value += url + "\n";
				});
				return;
			}

			if(msg.task === "getLocale") {
				localize(msg.locale);
				return;
			}

			if(msg.task === "getLogEnabled") {
				logEnabled = msg.logEnabled;
				document.getElementById("logEnabled").checked = logEnabled === true;
				return;
			}

			if(msg.task === "getAutoCreate") {
				document.getElementById("autoCreate").checked = msg.autoCreate === true;
				return;
			}

			if(msg.task === "getAddCookies") {
				document.getElementById("addCookies").checked = msg.addCookies === true;
				return;
			}

			if(msg.task === "getLocalPath") {
				document.getElementById("localPath").value = msg.localPath;
				document.getElementById("localPath").style.borderColor = "";
				clearErrorMessages("localPathErrorMessages");
				return;
			}

			if(msg.task === "getAPIVersion") {
				document.getElementById("apiVersion").textContent = msg.apiVersion;
				log("APIVersion: ", msg.apiVersion);
			}

			if(msg.task === "getHostVersion") {
				document.getElementById("hostVersion").textContent = msg.hostVersion;
				log("HostVersion: ", msg.hostVersion);
			}

			if(msg.task === "isLocalPathFromManager") {
				log("isLocalPathFromManager", msg.localPathFromManager);
				if(msg.localPathFromManager) {
					document.getElementById("localPath").setAttribute("readonly", "readonly");
				}
			}


			//local folder does not exist
			if(msg.status === -23 || msg.status === -25) {
				log(msg.status);
				document.getElementById("localPath").style.borderColor = "red";
				addErrorMessage("localPathErrorMessages", msg.msg);
			}
			else if(msg.status !== 0) {
				addErrorMessage("generalErrorMessages", msg.msg);
			}
			else if(msg.status === 0) {
				clearErrorMessages("generalErrorMessages");
			}
		});

		backgroundScriptPort.onDisconnect.addListener(function(port) {
			let error = (port.error && port.error.message) || runtimeAPI.lastError || "";
			log("backgroundScriptPort.onDisconnect", "Connection Lost", error);
			backgroundScriptPort = undefined;
		});
	}

	function restoreSettings() {
		getProperty("getLogEnabled");
		getProperty("getLocale");
		getProperty("getAutoCreate");
		getProperty("getAddCookies");
		getProperty("getWhitelist");
		getProperty("getLocalPath");
		getProperty("getAPIVersion");
		getProperty("getHostVersion");
		getProperty("isLocalPathFromManager");
	}

	function getProperty(task) {
		checkBackgroundScriptConnection();

		let msg = {
			task: task
		};

		backgroundScriptPort.postMessage(msg);
	}

	function setProperty(key, value) {
		checkBackgroundScriptConnection();

		let msg = {
			task: "setProperty",
			key: key,
			value: value
		};

		backgroundScriptPort.postMessage(msg);
	}

	function saveLogEnabled() {
		setProperty("logEnabled", document.getElementById("logEnabled").checked);
	}

	function saveAutoCreate() {
		setProperty("autoCreate", document.getElementById("autoCreate").checked);
	}

	function saveAddCookies() {
		setProperty("addCookies", document.getElementById("addCookies").checked);
	}

	function saveWhitelist() {
		setProperty("whitelist", getWhitelist());
	}

	function clearWhitelist() {
		document.getElementById("whitelist").value = "";
		clearErrorMessages("whitelistErrorMessages");
		saveWhitelist();
	}

	function localize(lang) {
		log(lang);
		if(!(lang in localization)) {
			lang = "en";
		}

		local = localization[lang];

		Object.keys(local.elements).forEach(function(key) {
			document.getElementById(key).textContent = local.elements[key];
		});
	}

	//logging & error messages

	function clearErrorMessages(id) {
		document.getElementById(id).textContent = "";
	}

	function addErrorMessage(id, msg) {
		document.getElementById(id).textContent = msg;
	}

	function log() {
		if(!logEnabled) {
			return;
		}
		let args = Array.prototype.slice.call(arguments);
		args.splice(0, 0, new Date().toLocaleString(), "options.js");

		console.log.apply(null, args);
	}
})();
