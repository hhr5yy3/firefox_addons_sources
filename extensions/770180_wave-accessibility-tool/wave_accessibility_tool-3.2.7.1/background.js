var background = {
	vars: {
		sidebarLoaded: [],
		activeTabs: [],
		currentTabId: 0
	},
	func: {

	},
	msg:{
		scriptsConnection: null
	},
	//main background object init function
	init: function () {
		background.func.setBrowserActionListener();
		background.func.setMessageListeners();
		background.func.setInstallListener();
		background.func.setTabListener();
		background.func.setWindowChangeListener();
		background.func.setKeyboardShortcut();
		background.func.setupContextMenus()
	}
};


/**************************************************
*   background.chrome object functions
**************************************************/
background.func.setInstallListener = function(){
	chrome.runtime.onInstalled.addListener(function(details) {
		var reason = details.reason;

		switch (reason) {
		case 'install':
			console.log('New User installed the extension.');
			break;
		case 'update':
			console.log('User has updated their extension.');
			break;
		case 'chrome_update':
		case 'shared_module_update':
		default:
			console.log('Other install events within the browser');
			break;
		}

	})
};

background.func.setupForWave = function (tabId, tabUrl) {
	if (tabUrl.indexOf("chrome-devtools://") == -1) {
		background.func.executeScripts(tabId, [
			{ file: 'content.js' },
			{ file: "inject.js" }
		]);
	}
};

background.func.runWave = function(tabId, tabUrl) {
	if (background.vars.activeTabs.indexOf(tabId) == -1) {
		background.msg.scriptsConnection = null;
		background.vars.waveResults = null;
		var index = background.vars.sidebarLoaded.indexOf(tabId);
		if (index > -1) {
			background.vars.sidebarLoaded.splice(index, 1);
		}
		background.func.setupForWave(tabId, tabUrl);
		background.func.toggleBrowserActionState(tabId);
	}
	else {
		background.func.sendToCs("refreshPage", {}, tabId);
		//background.func.toggleBrowserActionState(tab.id);
	}
};

background.func.setMessageListeners = function () {
	//listen for connections
	chrome.runtime.onConnect.addListener(function (port) {
		var tabId = port.sender.tab.id;
		port.onMessage.addListener(function (message, sender) {            
			
			if (port.name == "csToBackground") {
				//console.log("csToBackground: "+message.action);
				switch (message.action) {
					case "setExtensionUrl":
						background.func.sendResultsToSidebarWhenReady(message.action, message.data, tabId);
						break;
					case "waveResults":
						background.func.sendResultsToSidebarWhenReady(message.action, message.data, tabId);
						break;
					case "handleOutlineData":
						background.func.sendToSidebar(message.action, message.data, tabId);
						break;
					case "handleNavData":
						background.func.sendToSidebar(message.action, message.data, tabId);
						break;
					case "moreInfo":
						background.func.sendToSidebar(message.action, message.data, tabId);
						break;
					case "iconList":
						background.func.sendResultsToSidebarWhenReady(message.action, message.data, tabId);
						break;
					case "manualRefresh":
						background.func.toggleBrowserActionState(tabId, { forceSet: "inactive" });
						break;
					case "tabOpen":
						//console.log("tab Open: " + tabId);
						background.func.toggleBrowserActionState(tabId, { tabChange: true });
						break;
					case "tabNotOpen":
						//console.log("tab Not Open: " + tabId);
						break;
					case "setSidebarContrastDetails":
						background.func.sendToSidebar(message.action, message.data, tabId);
						break;
					case "showacsbalert":
						background.func.sendToSidebar(message.action, message.data, tabId);
						break;
					default:
						break;
				}
			}
			
			if (port.name == "sidebarToBackground") { //port from the sidebar
				//console.log("from Sidebar to CS: action: " + message.action + " data: " + JSON.stringify(message.data));
				switch (message.action) {
					case "sidebarLoaded":
						background.vars.sidebarLoaded.push(tabId);
						background.func.sendToCs(message.action, message.data, tabId);
						break;
					default:
						background.func.sendToCs(message.action, message.data, tabId);
						break;
				}
			}
		});
	});
};

background.func.setCurrentTabActive = function(tabId) {
	//console.log("current tab set: " + tabId);
	background.vars.currentTabId = tabId;
	background.func.toggleBrowserActionState(tabId, { tabChange: true });
};

background.func.setupContextMenus = function () {
	chrome.contextMenus.create({
		id: "run-wave",
		title: "WAVE this page"
	});
	chrome.contextMenus.onClicked.addListener(function(info, tab) {
		if (info.menuItemId == "run-wave") {
			var tabUrl = tab.url != undefined ? tab.url : "";
			background.func.runWave(tab.id, tabUrl);
		}
	});
};

background.func.sendResultsToSidebarWhenReady = function (action, data, tabId) {
	if (background.vars.sidebarLoaded.indexOf(tabId) == -1) {
		//console.log("action: " + JSON.stringify(action) + " | " + "data: " + JSON.stringify(data) + " | " + "tab: " + tabId);
		//console.log('sidebar not yet ready');
		//recursive settimeout to check every 100ms
		setTimeout(function () { background.func.sendResultsToSidebarWhenReady(action, data, tabId) }, 100);
	}
	else {
		//if ready, send results
		background.func.sendToSidebar(action, data, tabId);
	}
}

background.func.sendToSidebar = function (action, data, tabId) {
	//console.log("BG sendToSidebar: Action - " + action + ", Data: " + data);

	if(typeof (tabId) != "undefined") {
		background.msg.scriptsConnection = chrome.tabs.connect(tabId, { name: "scriptsConnection" });
	}
	else {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			background.msg.scriptsConnection = chrome.tabs.connect(tab[0].id, { name: "scriptsConnection" });
		});
	}
	background.msg.scriptsConnection.postMessage({ name: "backgroundToSidebar", "action": action, "data": data, "tabId": tabId });
}

background.func.sendToCs = function (action, data, tabId) {
	//console.log("BG sendToCs: Action - " + action + ", Data: " + data);
	if (typeof (tabId) != "undefined") {
		background.msg.scriptsConnection = chrome.tabs.connect(tabId, { name: "scriptsConnection" });
	}
	else {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			background.msg.scriptsConnection = chrome.tabs.connect(tab[0].id, { name: "scriptsConnection" });
		});
	}
	background.msg.scriptsConnection.postMessage({ name: "backgroundToCs", "action": action, "data": data });
}

background.func.setBrowserActionListener = function () {
	//adds listener to extension browser icon
	chrome.browserAction.onClicked.addListener(function (tab) {
		if (background.vars.activeTabs.indexOf(tab.id) !== -1) {
			chrome.browserAction.disable(tab.id);
		}
		var tabUrl = tab.url != undefined ? tab.url : "";
		background.func.runWave(tab.id, tabUrl);
	});
}

background.func.setTabListener = function () {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		// console.log("updated: tabId: " + tabId + " changeInfo: " + JSON.stringify(changeInfo) + " tab: " + JSON.stringify(tab));
		// background.func.setCurrentTabActive(tabId);
	});
	chrome.tabs.onActivated.addListener(function (tabInfo) {
		//console.log("activated: tabInfo: " + JSON.stringify(tabInfo) );
		background.func.setCurrentTabActive(tabInfo.tabId);
	});
};

background.func.setWindowChangeListener = function(){
	chrome.windows.onFocusChanged.addListener(function(windowId) {
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
			var activeTab = arrayOfTabs[0];
			if(activeTab !== undefined) {
				background.func.setCurrentTabActive(activeTab.id);
			}
		});
	});
};

background.func.setKeyboardShortcut = function() {
	chrome.commands.onCommand.addListener(function(command) {
		if(command == "toggle-extension") {
			background.func.runWave(background.vars.currentTabId, "");
		}
	});
};

background.func.toggleBrowserActionState = function (tabId, options) {
	var index = background.vars.activeTabs.indexOf(tabId);
	if (typeof (options) != "undefined") {
		if (typeof (options.forceSet) != "undefined") {
			if (options.forceSet == "inactive") {
				chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16bk.png",
				  "32": "/img/wave32bk.png"
				} });
				if (index > -1) {
					background.vars.activeTabs.splice(index, 1);
				}
			}
			else if (options.forceSet == "active") {
				chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16.png",
				  "32": "/img/wave32.png"
				} });
				if (!index > -1) {
					background.vars.activeTabs.push(tabId);
				}
			}
		}
		if (typeof (options.tabChange) != "undefined" && options.tabChange == true) {
			if (index > -1) {
				chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16.png",
				  "32": "/img/wave32.png"
				} });
			}
			else {
				chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16bk.png",
				  "32": "/img/wave32bk.png"
				} });
			}
		}
	}
	else {
		if (index > -1) {
			chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16bk.png",
				  "32": "/img/wave32bk.png"
				} });
			//remove from active tabs
			background.vars.activeTabs.splice(index, 1);
		}
		else {
			chrome.browserAction.setIcon({ path: {
				  "16": "/img/wave16.png",
				  "32": "/img/wave32.png"
				} });
			//add to active tabs
			background.vars.activeTabs.push(tabId);
		}
	}
}


background.func.executeScripts = function (tabId, injectDetailsArray) {
	//creates callbacks automatically to avoid a big chained structure.
	function createCallback(tabId, injectDetails, innerCallback) {
		//console.log("executeScripts: "+injectDetailsArray)
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}

	var callback = null;

	for (var i = injectDetailsArray.length - 1; i >= 0; --i) {
		callback = createCallback(tabId, injectDetailsArray[i], callback);
	}
	if (callback !== null) {
		callback();   // execute outermost function
	}
};


/**************************************************
*   begin execution
**************************************************/
background.init();