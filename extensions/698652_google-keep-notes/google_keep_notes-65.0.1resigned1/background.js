var Ext={
	os:null,
	version:null,
	win:"Ctrl+Shift+Y",
	mac:"Ctrl+Shift+Y",
	gotPlatformInfo:function(info){
		Ext.os=info.os;
		browser.runtime.getBrowserInfo(Ext.gotBrowserInfo);
	},
	gotBrowserInfo:function(info){
	  Ext.version=info.version; 
	  if(parseInt(Ext.version.split(".")[0])<57){
		  chrome.tabs.executeScript(null,{code:'alert("Please use '+(Ext.os=="mac" ? Ext.mac : Ext.win)+' combination to open up Google Keep Notes.\\n\\nThis is a limitation for the current Firefox '+Ext.version+' and it will resolve itself for upcoming Firefox 57. Sorry for inconvenience!");'});
	  }
	},
	open:function(){
		var sidebar = browser.extension.getURL("/sidebar.html");
		//function toggle(panel) {
		  //if (panel !== sidebar) {
		  	browser.sidebarAction.open();
		    browser.sidebarAction.setPanel({panel: sidebar});
		  //}
		//}
	},
	oRTCT:function(passedObject){			
		chrome.tabs.query({
				active: true,
				currentWindow:true
			}, function (tabs) {
				if(tabs.length!=0){
					var index = tabs[0].index;
					//var windowId=tabs[0].windowId;
					chrome.tabs.create({
						//windowId:windowId,
						url: passedObject['url'],
						index: index + 1
					}, function (tab) {
					  
					});					
				}
				else{
					//last focused
					chrome.tabs.create({
						url: passedObject['url']
					}, function (tab) {
					  
					});							
				}					
			}
		);			
	}		
}

chrome.storage.local.get(['installed', 'version'], function(items) {
	var ver=chrome.runtime.getManifest().version;
	if (!items.installed) {
		chrome.storage.local.set(
		{
			"installed":true,
			"version":ver
		}, function() {
		  //console.log('Settings saved');
		});
		Ext.oRTCT({'url': "http://barisderin.com/?p=3198"});		
	}
	else {			
		if(ver!=items.version) {
			Ext.oRTCT({'url': "http://barisderin.com/?p=3198"});
			chrome.storage.local.set({"version":ver}, function(){});				
		}
	}	  
});

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
		if(info.documentUrl==chrome.extension.getURL('sidebar.html') || info.documentUrl==chrome.extension.getURL('popup.html')){
			for (var i = headers.length - 1; i >= 0; --i) {
				var header = headers[i].name.toLowerCase();
				if (header == "frame-options" || header == "x-frame-options") {
					headers.splice(i, 1);
				}
			}			
		}
        return { responseHeaders: headers };
    }, {
        urls: ["<all_urls>"],
        types: ["sub_frame"]
    }, ["blocking", "responseHeaders"]
);

var sidebar = browser.extension.getURL("/sidebar.html");

function toggle(panel) {
  if (panel !== sidebar) {
    browser.sidebarAction.setPanel({panel: sidebar});
  }
}

function onGot(sidebarUrl) {
  if (sidebarUrl==sidebar) browser.sidebarAction.close();
}

browser.browserAction.onClicked.addListener(() => {
	chrome.runtime.getPlatformInfo(Ext.gotPlatformInfo);
	if(browser.sidebarAction.open) browser.sidebarAction.open();
	//browser.sidebarAction.getPanel({}).then(toggle);	
});

chrome.contextMenus.create({"title": "Google Keep Notes", "contexts":["all"]});

chrome.contextMenus.onClicked.addListener(() => {
  //browser.sidebarAction.open();
  Ext.open();
});

function onRequest(request, sender, callback) {
	if(request.action == 'gkn_ask_popup') {
		var u="https://keep.google.com";
		chrome.windows.create({'url': u, 'type': 'popup', 'allowScriptsToClose': true}, function(window) {
			//foo
		});			
	}			
}			
chrome.runtime.onMessage.addListener(onRequest);