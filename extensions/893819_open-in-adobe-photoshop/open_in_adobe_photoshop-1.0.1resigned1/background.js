	var BackgroundJSMainObject={
		downloadUtilities: {
			downloadURL: function(info, tab) {
				if(BackgroundJSMainObject.checkFirstTimeUsage()) return;			
				var url = info.srcUrl;
				BackgroundJSMainObject.log(null,true);
				BackgroundJSMainObject.log("Requesting "+ExtensionMainObject.extensionLiteralName+":\n" + url);
				var filename = url.substring(url.lastIndexOf('/')+1);
				BackgroundJSMainObject.log("Server Filename:\n" + filename);	  
				filename=filename.split("?")[0];
				if(filename.indexOf(".")==-1) {
					var xmlhttp;
					if (window.XMLHttpRequest){
						xmlhttp=new XMLHttpRequest();
					}
					else{
						xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
					}
					xmlhttp.onreadystatechange=function(){
						if (xmlhttp.readyState==4 && xmlhttp.status==200){
							BackgroundJSMainObject.log("HEAD Content Type:\n" + xmlhttp.getResponseHeader("Content-Type"));
							var fileext="png";//default fallback
							try{
								switch(xmlhttp.getResponseHeader("Content-Type")) {
									case "image/png": 
										fileext="png";
									break;
									case "image/gif":
										fileext="gif";
									break;
									case "image/bmp":
										fileext="bmp";
									break;
									case "image/jpg":
										fileext="jpg";
									break;
									case "image/jpeg":
										fileext="jpg";
									break;
									default:
										fileext="png";
									break;
								}
							}catch(e){}
							filename+="."+fileext;
							BackgroundJSMainObject.log("Corrected Filename:\n" + filename);	
							BackgroundJSMainObject.downloadUtilities.startDownload(url,filename);		
						}
					}
					xmlhttp.open("HEAD",url,true);
					xmlhttp.send();
					return;
				}
				BackgroundJSMainObject.log("Corrected Filename:\n" + filename);
				BackgroundJSMainObject.downloadUtilities.startDownload(url,filename);
			},
			startDownload: function(url,filename){
				if (chrome.downloads) {
					chrome.downloads.download({ url: url, filename: filename, saveAs: false },function(downloadId){
						BackgroundJSMainObject.log("Starting image download.\nDownload id : " + downloadId);
					});
				}	
			},
			downloadListener : function(item){
				if (!item.state || (item.state.current != "complete"))  return;
				chrome.downloads.search({"id":item.id},function(DownloadItemResultsArray){
					var downloadedFile=DownloadItemResultsArray[0];
					if(downloadedFile.byExtensionId!=chrome.runtime.id) return;
					
					var filepath=BackgroundJSMainObject.escapeString(downloadedFile.filename);	
					var exepath=BackgroundJSMainObject.escapeString(BackgroundJSMainObject.getExePath());
					BackgroundJSMainObject.requestCommunication(exepath,filepath);
					
					BackgroundJSMainObject.log(DownloadItemResultsArray);			
					BackgroundJSMainObject.log("Downloaded image original path:\n" + filepath);			
					BackgroundJSMainObject.log("Downloaded image handled path:\n" + filepath);			
					BackgroundJSMainObject.log("Downloaded Filename:\n" + filepath.substring(filepath.lastIndexOf('\\')+1));
				})
			}			
		},
		contextMenuUtilities: {
			requestBuildContextMenu:function(checked){
				if(checked){
					localStorage["enable_context_menu"]=true;
					BackgroundJSMainObject.contextMenuUtilities.buildContextMenu();
				}
				else{
					localStorage["enable_context_menu"]=false;
					BackgroundJSMainObject.contextMenuUtilities.removeContextMenu();
				}
			},
			buildContextMenu:function(){
				if(ExtensionMainObject.contextMenuType=="link"){
					BackgroundJSMainObject.contextMenuUtilities.build.buildLinkContextMenu();
				}
				else if(ExtensionMainObject.contextMenuType=="image"){
					BackgroundJSMainObject.contextMenuUtilities.build.buildImageContextMenu();
				}
			},
			build:{
				buildLinkContextMenu:function(){
					chrome.contextMenus.create({
						id : ExtensionMainObject.namespace+"-contextmenu",
						title : "Open link with " + ExtensionMainObject.executableLiteralName,
						contexts : ["link"],
						onclick : BackgroundJSMainObject.contextMenuUtilities.clickHandlers.linkContextMenuClickHandler
					});
				},
				buildImageContextMenu:function(){
					chrome.contextMenus.create({
						id : ExtensionMainObject.namespace+"-contextmenu",
						title : ExtensionMainObject.extensionLiteralName,
						contexts : ["image"],
						onclick : BackgroundJSMainObject.contextMenuUtilities.clickHandlers.imageContextMenuClickHandler
					});	
				}				
			},
			removeContextMenu:function(){
				chrome.contextMenus.remove(ExtensionMainObject.namespace+"-contextmenu");
			},
			clickHandlers:{
				linkContextMenuClickHandler:function(info,tab){
					if(BackgroundJSMainObject.checkFirstTimeUsage()) return;
					var filepath=BackgroundJSMainObject.escapeString(info.linkUrl);	
					var exepath=BackgroundJSMainObject.escapeString(BackgroundJSMainObject.getExePath());
					BackgroundJSMainObject.requestCommunication(exepath,filepath);
				},
				imageContextMenuClickHandler:function(info,tab){
					if(BackgroundJSMainObject.checkFirstTimeUsage()) return;
					BackgroundJSMainObject.downloadUtilities.downloadURL(info,tab);
				}				
			}
		},
		browserActionUtilities: {
			browserActionListener:function(tab){
				if(BackgroundJSMainObject.checkFirstTimeUsage()) return;	
				var filepath=BackgroundJSMainObject.escapeString(tab.url);	
				var exepath=BackgroundJSMainObject.escapeString(BackgroundJSMainObject.getExePath());
				BackgroundJSMainObject.requestCommunication(exepath,filepath);
			}			
		},
		messagingUtilities : {
			messageListener : function(request, sender, sendResponse) {
				if (request.action == 'get_requests_for_settingsjs') {
					var o={
						"default_path":BackgroundJSMainObject.getDefaultPath(),
						"enable_context_menu":BackgroundJSMainObject.retrieveBooleanLocalStorageValue("enable_context_menu"),
						"enable_auto_path":BackgroundJSMainObject.retrieveBooleanLocalStorageValue("enable_auto_path"),
					}
					sendResponse(o);
				}
				else if (request.action == 'set_requestBuildContextMenu_for_settingsjs') {
					BackgroundJSMainObject.contextMenuUtilities.requestBuildContextMenu(request.checked);
				}
				else if (request.action == 'request_show_modal_from_backgroundjs_to_contentjs') {
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						chrome.tabs.sendMessage(tabs[0].id, {'action' : 'request_show_modal_from_content_script_to_messagejs','modalId':request.modalId},
							function (response) {
								
							}
						);					
					});
				}
				else if (request.action == 'request_settings_page') {
					if(navigator.onLine) {
						BackgroundJSMainObject.oRTCT({'url': "http://barisderin.com/extension/"+ExtensionMainObject.protocol+"/options.html"});
					}
					else{
						BackgroundJSMainObject.oRTCT({'url': chrome.runtime.getURL('settings/settings.html')});
					}
				}
				else if (request.action == 'request_stiframe_validation_from_backgroundjs') {
					if(request.pathname.match(/\/extension\/(.*)\/options.html/)[1]==ExtensionMainObject.protocol){
						var validated=true;
						sendResponse(validated);
					}
				}			
			}
		},
		installAndUpdateCheck: function(){
			chrome.runtime.getPlatformInfo(function(info){
				var os=info.os;
				//attach this to a global variable below
				localStorage["os"]=os;
				chrome.storage.sync.get(ExtensionMainObject.settings, function(items){					
					var ver=chrome.runtime.getManifest().version;
					if (!items.installed){				
						items.installed=true;
						items.version=ver;
						items.os=os;
						chrome.storage.sync.set(items, function(){
							if (os=="win") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunURL});
							else if (os=="mac") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunMacURL});
							else if (os=="linux") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunLinuxURL});
							else BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunURL});							
						});				
					}
					else {			
						if(ver!=items.version) {
							items.version=ver;
							items.os=os;
							chrome.storage.sync.set(items, function(){
								BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.updateURL});
							});				
						}
					}
					//annotationsoff=items.annotationsoff;			
				});				
				/*
				if (!localStorage.getItem('installed')) {
					localStorage.setItem('installed', "true");
					localStorage.setItem('version', chrome.runtime.getManifest().version);
					if (localStorage["os"]=="win") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunURL});
					else if (localStorage["os"]=="mac") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunMacURL});
					else if (localStorage["os"]=="linux") BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunLinuxURL});
					else BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.firstRunURL});
				}	
				else {
					if(chrome.runtime.getManifest().version!=localStorage.getItem('version')) {
						BackgroundJSMainObject.oRTCT({url: ExtensionMainObject.updateURL});
						localStorage.setItem('version', chrome.runtime.getManifest().version);
					}
				}
				*/				
			});			
		},
		checkFirstTimeUsage:function(){
			if(!localStorage["first_time"]) {				
				if(navigator.onLine) {
					BackgroundJSMainObject.oRTCT({'url': "http://barisderin.com/extension/"+ExtensionMainObject.protocol+"/options.html"});
				}
				else{
					BackgroundJSMainObject.oRTCT({'url': chrome.runtime.getURL('settings/settings.html')+'?first-run'});
				}
				localStorage["first_time"]=true;
				return true;
			}
			return false;			
		},
		getDefaultPath: function(){
			if (localStorage["os"]=="win") {
				return ExtensionMainObject.defaultPaths.win;
			}
			else if(localStorage["os"]=="mac"){
				return ExtensionMainObject.defaultPaths.mac;
			}
			else if(localStorage["os"]=="linux"){
				return ExtensionMainObject.defaultPaths.linux;
			}	
		},		
		getExePath: function(str){
			return localStorage["exepath"] ? localStorage["exepath"] : BackgroundJSMainObject.getDefaultPath();	
		},
		escapeString: function(str){
			return unescape(escape(str).replace(/%5C/g,"\\"));//handle backslash problem and convert to real path string	
		},
		requestCommunication: function(exepath,filepath){
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				var enable_auto_path=BackgroundJSMainObject.retrieveBooleanLocalStorageValue("enable_auto_path")
				if (localStorage["os"]=="win" || localStorage["os"]=="linux") {
					var u = ExtensionMainObject.protocol+'://?exe='+exepath+"&pat="+(enable_auto_path ? "aut" : "cus")+"&file="+filepath;	
					u = u.replace(/\\/g,"\\\\");
					if(true) {
						chrome.tabs.executeScript( null, {code:'window.location.assign('+'"'+u+'")'},function(results){
							if (chrome.runtime.lastError) {
								console.log("An error occured. Please contact developer: \n\n"+chrome.runtime.lastError.message);
							} else {
								// console.log(results);
							}						
						});
					}
					else{
						//chrome.tabs.update(tabs[0].id, {url: ExtensionMainObject.protocol+'://?exe='+exepath+"&pat="+(enable_auto_path ? "aut" : "cus")+"&file="+filepath});
					}
					
				}
				else {
					var u = ExtensionMainObject.protocol+'://?exe='+encodeURIComponent(exepath)+"&pat="+(enable_auto_path ? "aut" : "cus")+"&file="+encodeURIComponent(filepath);
					if(true){
						chrome.tabs.executeScript( null, {code:'window.location.assign('+'"'+u+'")'},function(results){
							if (chrome.runtime.lastError) {
								console.log("An error occured. Please contact developer: \n\n"+chrome.runtime.lastError.message);
							} else {
								// console.log(results);
							}						
						});
					}
					else{
						//chrome.tabs.update(tabs[0].id, {url: ExtensionMainObject.protocol+'://?exe='+encodeURIComponent(exepath)+"&pat="+(enable_auto_path ? "aut" : "cus")+"&file="+encodeURIComponent(filepath)});
					}					
					
				}
				if(typeof localStorage["pic"] === "undefined"){
					localStorage["pic"]=0;
				}
				else{
					localStorage["pic"]+=1;
				}
			});		
		},
		retrieveBooleanLocalStorageValue: function(item){			
			if(typeof localStorage[item]==="undefined"){
				localStorage[item]=ExtensionMainObject.defaultPrefs[item];
				return ExtensionMainObject.defaultPrefs[item];
			}
			else{
				return JSON.parse(localStorage[item]);
			}
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
		},		
		log:function(logText,delimeter){
			if(ExtensionMainObject.debugMode){
				if(delimeter) {
					var delemiterText="";
					for(var i=0;i<80;i++){
						if(i==40) delemiterText+="\n";
						else delemiterText+="/";
					}
					console.log(delemiterText);
					return;
				}
				console.log(ExtensionMainObject.extensionLiteralName+" : "+logText);			
			}
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
					//remove test variable
				}
			},
			checkSync:function(items) {
				if (chrome.runtime.lastError) {
					chrome.storage.local.get(null, Ext.checkStorage.checkLocal);
				} else {
					Ext.sto="sync";
					Ext.init();
					//remove test variable
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
	
	function init(){
		ExtensionMainObject.init();
	}
	
	init();