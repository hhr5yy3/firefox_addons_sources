var ws_ = null;

var classObject = {

	initializeHost: function()
	{
		console.log("Start initialize")
		if (ws_ === null)
		{
			create_ws = function(port_){
				ws_ = new WebSocket('ws://127.0.0.1:'+port_);

				ws_.onmessage = function (response) {
					console.log(response)
				}
				check_ws = function(){
					if (ws_ === null){
						return
					}
					if(ws_.readyState == 1) {
						console.log("Connecte Success");
						ws_.onclose = function() {
							ws_ = null;
							console.log("Disconnected");
							setTimeout(function(){
								classObject.initializeHost ();
							}, 5000);
						};
					} else if (ws_.readyState >1) {
						if (port_<=50010){
							console.log("Connecte "+port_)
							create_ws(port_+1)
						}else{
							console.log("Connecte Error")
							ws_ = null;
							setTimeout(function(){
								classObject.initializeHost ();
							}, 5000);
						}
						
					}else{
						setTimeout(function(){
							check_ws();
						}, 500);
					}
				}
				check_ws()
			};
			create_ws(50000)
			
		}
	},

	onActiveTab: function (activeInfo)
	{
		chrome.tabs.get (activeInfo.tabId, function (tab) {
			console.log ("ACTIVE_URL: " + tab.url);
			port_.postMessage ({"ACTIVE_URL" : tab.url});
		})
	},
	
	onUpdateTab: function (tabId, changeInfo, tab)
	{
		chrome.windows.get (tab.windowId, { populate: true }, function (window) {
			if (window.focused)
			{
				console.log ("tab.active :");
				console.log (tab.active);
				if (changeInfo && changeInfo.url && tab.active)
				{
					console.log ("url changed.......");

					console.log (changeInfo.url);
					port_.postMessage ({"ACTIVE_URL" : changeInfo.url});
				}
			}
		})
	},
	
	onTabRemoved: function (tabsId, removeInfo)
	{
		console.log ("removeInfo.isWindowClosing " + removeInfo.isWindowClosing);
		if (removeInfo.isWindowClosing == false)
		{
			// Loop over all windows and their tabs
			var urls = [];
			chrome.windows.getAll({ populate: true }, function(windowList) {
			
				for (var i = 0; i < windowList.length; i++) 
				{
					for (var j = 0; j < windowList[i].tabs.length; j++) 
					{
						urls.push(windowList[i].tabs[j].url);
					}
				}

				console.log (urls);
				port_.postMessage ({"RUNNING_URLS" : urls});
			})
		}
	},
	
	onWindowRemoved: function (windowId)
	{
		console.log ("onWindowRemoved " + windowId);
		// Loop over all windows and their tabs
		var urls = [];
		chrome.windows.getAll({ populate: true }, function(windowList) {
		
			for (var i = 0; i < windowList.length; i++) 
			{
				for (var j = 0; j < windowList[i].tabs.length; j++) 
				{
					urls.push(windowList[i].tabs[j].url);
				}
			}

			console.log (urls);
			port_.postMessage ({"RUNNING_URLS" : urls});
		})
	},
	
	onWindowActive: function (windowId)
	{
		try {
			chrome.windows.getCurrent({populate : true }, function (window) {
				try {
					console.log (window.focused);
					if (window.focused == false)
					{
						chrome.extension.isAllowedIncognitoAccess (function (isAllowedAccess) {
							if (!isAllowedAccess)
							{
								console.log ({"ACTIVE_URL" : "Unknown"});
								port_.postMessage ({"ACTIVE_URL" : "Unknown"});
							}
						})
					}
				} catch (err) {
					console.log("chrome.windows.getCurrent returned undefined windowId");
					console.log ({"ACTIVE_URL" : "Unknown"});
					port_.postMessage ({"ACTIVE_URL" : "Unknown"});
				}
			})
		} catch (err) {
			console.log("chrome.windows.getCurrent failed");
			console.log ({"ACTIVE_URL" : "Unknown"});
			port_.postMessage ({"ACTIVE_URL" : "Unknown"});
		}

		
		chrome.windows.get (windowId, {populate : true }, function (window) {
			try {
				console.log (window);
				for (var i=0; i<window.tabs.length; i++)
				{
					if (window.tabs[i].active)
					{
						console.log ({"ACTIVE_URL" : window.tabs[i].url});
						port_.postMessage ({"ACTIVE_URL" : window.tabs[i].url});
					}
				}
			} catch (err) {
				console.log ("Failed to get chrome.windows.get due to undefined windowId");
			}
		})
	},

	onInstalled: function(info)
	{
		console.log('onInstalled called');
		
		let params = {status: "complete"};
		
		chrome.tabs.query(params, function InjectContentScript(tabs)
		{
			// As we have only one content script in our extension, I am not using loop
			let contentjsFile = chrome.runtime.getManifest().content_scripts[0].js[0];
			
			for (let index = 0; index < tabs.length; index++) 
			{
				chrome.tabs.executeScript(tabs[index].id, {file: contentjsFile, allFrames:true},
				result => 
				{
					const lastErr = chrome.runtime.lastError;
					if (lastErr) 
					{
						console.log('failed to inject CS in tab: ' + tabs[index].id + ' lastError: ' + JSON.stringify(lastErr));
					}
				})
			}
		});
		
		console.log('onInstalled completed');    
	},
	
	onMessageFromCS: function (event)
	{
		console.log("Got event from CS");
		event["timestamp"] =  (new Date()).valueOf();
		event["browser"] = "firefox"
		console.log(JSON.stringify(event));
		if (ws_===null){
			classObject.initializeHost();
		}else{
			try {
				ws_.send(JSON.stringify(event))
			} catch(e) {
				ws_.close()
			}
		}
	}
};

// Kick things off.
classObject.initializeHost();

chrome.runtime.onInstalled.addListener(classObject.onInstalled);

// chrome.tabs.onActivated.addListener(classObject.onActiveTab);

// chrome.tabs.onUpdated.addListener(classObject.onUpdateTab);

// chrome.tabs.onRemoved.addListener( classObject.onTabRemoved);

// chrome.windows.onRemoved.addListener(classObject.onWindowRemoved);

// chrome.windows.onFocusChanged.addListener(classObject.onWindowActive);

chrome.runtime.onMessage.addListener(classObject.onMessageFromCS);
