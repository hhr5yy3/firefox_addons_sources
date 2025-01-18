var ExtensionMainObject={
	version : "1.0.0",
	ev : "1",
	domain : "http://www.adobe.com/products/photoshop/free-trial-download.html",
	firstRunURL : "http://www.adobe.com/products/photoshop/free-trial-download.html",
	firstRunMacURL : "http://www.adobe.com/products/photoshop/free-trial-download.html",
	firstRunLinuxURL : "http://www.adobe.com/products/photoshop/free-trial-download.html",
	updateURL : "http://www.adobe.com/products/photoshop/free-trial-download.html",
	extensionLiteralName : "Open In Photoshop",
	executableLiteralName : "Photoshop",
	executableFileNameUpperCase : "Photoshop",
	executableFileNameLowercase : "photoshop",
	communicatorLiteralName : "OWP Communicator",
	communicatorWindowsFileName : "OWP.Communicator.exe",
	communicatorMacFileName : "OWP Communicator",
	communicatorLinuxFileName : "OWP.Communicator",
	namespace : "openwithphotoshop",
	protocol : "openwithps",
	addBrowserActionListener : true,
	addDownloadListener : true,
	debugMode : false,
	contextMenuType:"image",
	defaultPaths : {
		"base" : "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe",
		"win": "C:\\Program Files\\Adobe\\Adobe Photoshop CC 2014\\Photoshop.exe",
		"mac": "/Applications/Adobe Photoshop CC 2015/Adobe Photoshop CC 2015.app",
		"linux": "/usr/bin/photoshop"	
	},
	defaultPrefs:{
		"enable_auto_path" : true,
		"enable_context_menu" : true
	},
	init:function(){
		if(ExtensionMainObject.addBrowserActionListener) chrome.browserAction.onClicked.addListener(ExtensionMainObject.browserActionUtilities.browserActionListener);
		if(ExtensionMainObject.addDownloadListener) chrome.downloads.onChanged.addListener(BackgroundJSMainObject.downloadUtilities.downloadListener);
		BackgroundJSMainObject.contextMenuUtilities.requestBuildContextMenu(BackgroundJSMainObject.retrieveBooleanLocalStorageValue("enable_context_menu"));
		chrome.runtime.onMessage.addListener(BackgroundJSMainObject.messagingUtilities.messageListener);
		BackgroundJSMainObject.installAndUpdateCheck();		
	},
	getRegExpForPathCheck:function(os){
		if(os=="win") return new RegExp("Photoshop\.exe$");
		else if(os=="mac") return new RegExp("\.app$");
		else if(os=="linux") return new RegExp("photoshop$");
	},
	browserActionUtilities: {
		browserActionListener:function(tab){
			BackgroundJSMainObject.browserActionUtilities.browserActionListener(tab);
		}			
	},
	settings:{
		installed:false,
		version:"",
		os:"",
		exepath:"",
		enable_auto_path: true,
		enable_context_menu: true		
	}
}