var ExtensionMainObject={
	version : "62.0",
	ev : "62",
	extensionLiteralName : "Theme Font & Size Changer",
	namespace : "themefontsizechanger",
	protocol : "themefontsizechanger",
	addBrowserActionListener : true,
	addDownloadListener : false,
	debugMode : false,
	contextMenuType:"link",
	defaultPrefs:{
		"enable_auto_path" : true,
		"enable_context_menu" : false
	},
	init:function(){
		if(ExtensionMainObject.addBrowserActionListener) chrome.browserAction.onClicked.addListener(ExtensionMainObject.browserActionUtilities.browserActionListener);
		if(ExtensionMainObject.addDownloadListener) chrome.downloads.onChanged.addListener(BackgroundJSMainObject.downloadUtilities.downloadListener);
		BackgroundJSMainObject.contextMenuUtilities.requestBuildContextMenu(BackgroundJSMainObject.retrieveBooleanLocalStorageValue("enable_context_menu"));
		chrome.runtime.onMessage.addListener(BackgroundJSMainObject.messagingUtilities.messageListener);
		BackgroundJSMainObject.installAndUpdateCheck();		
	},
	getRegExpForPathCheck:function(os){
		if(os=="win") return new RegExp("chrome\.exe$");
		else if(os=="mac") return new RegExp("\.app$");
		else if(os=="linux") return new RegExp("chrome$");
	},
	browserActionUtilities: {
		browserActionListener:function(tab){
			BackgroundJSMainObject.browserActionUtilities.browserActionListener(tab);
		}			
	},
	settings:{
		installed:false,
		version:"",
		os:""
	},
	checkStorage:{
		checkHTMLLocalStorage:function(){
			if (typeof localStorage !== "undefined"){
				Ext.sto="localStorage";
				Ext.init();
			} else{
				//??????????????
			}
		},
		checkLocal:function(items){
			if (chrome.runtime.lastError){
				Ext.checkStorage.checkHTMLLocalStorage();
			} else{
				Ext.sto="local";
				Ext.init();
			}
		},
		checkSync:function(items) {
			if (chrome.runtime.lastError) {
				chrome.storage.local.get(null, Ext.checkStorage.checkLocal);
			} else {
				Ext.sto="sync";
				Ext.init();
			}
		},
		init:function(){
			chrome.storage.sync.get(null, Ext.checkStorage.checkSync);
		}
	},
	getStorage:function(){
		return Ext.sto=="sync" ? chrome.storage.sync : chrome.storage.local;
	}	
}