	var annotationsoff=false;
	
	var settings={
		installed:false,
		version:"",
		video_quality:"highres",
		video_size:"expand",
		annotationsoff:false,
		volume:"default",
		volumelevel:100,
		youtubevideoautoplaybehavior:"default",
		playlistvideoautoplaybehavior:"default",
		suggestedautoplay:true,
		embeddedvideoautoplaybehavior:"default",
		autoexpanddescription:true,
		transition:false
	}
	
	var Ext={
		os:null,
		version:null,
		win:"CTRL+SHIFT+Y",
		mac:"CMD+SHIFT+Y",
		sto:"local",
		gotPlatformInfo:function(info){
			Ext.os=info.os;
			var v=61;
			try{v=/Chrome\/([0-9.]+)/.exec(window.navigator.userAgent)[1];}catch(e){}
			if(chrome.runtime.getBrowserInfo) chrome.runtime.getBrowserInfo(Ext.gotBrowserInfo);
			else Ext.faq(v);
		},
		gotBrowserInfo:function(info){
			Ext.version=info.version;
			Ext.faq(Ext.version);
		},
		faq:function(version){
			var v=parseInt(version.split(".")[0]);
			Ext.oRTCT({'url': "http://barisderin.com/?p=2227"});				
		},
		checkStorage:{
			checkHTMLLocalStorage:function(){
				if (typeof localStorage !== "undefined"){
					Ext.sto="localStorage";
					Ext.init();
				} else{
					//foo
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
		},
		init:function(){
			Ext.getStorage().get(settings, function(items){
				var ver=chrome.runtime.getManifest().version;
				if (!items.installed){				
					items.installed=true;
					items.version=ver;
					Ext.getStorage().set(items, function(){
						chrome.runtime.getPlatformInfo(Ext.gotPlatformInfo);					
					});				
				}
				else {
					if(ver!=items.version) {
						items.version=ver;
						Ext.oRTCT({'url': "http://barisderin.com/?p=2227"});							
						Ext.getStorage().set(items, function(){
							//foo
						});				
					}
				}
				annotationsoff=items.annotationsoff;			
			});				
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

    var ExtensionMainObject = {
        debugMode: false,
	    defaultPrefs: {
	        "enable_auto": true,
	        "enable_context_menu": false
	    }        
    }

    var BackgroundJSMainObject = {
        retrieveBooleanLocalStorageValue: function(item) {
            if (typeof localStorage[item] === "undefined") {
                localStorage[item] = ExtensionMainObject.defaultPrefs[item];
                return ExtensionMainObject.defaultPrefs[item];
            } else {
                return JSON.parse(localStorage[item]);
            }
        },
        log: function(logText, delimeter) {
            if (ExtensionMainObject.debugMode) {
                if (delimeter) {
                    var delemiterText = "";
                    for (var i = 0; i < 80; i++) {
                        if (i == 40) delemiterText += "\n";
                        else delemiterText += "/";
                    }
                    console.log(delemiterText);
                    return;
                }
                console.log(ExtensionMainObject.extensionLiteralName + " : " + logText);
            }
        }
    }

    function onRequest(request, sender, callback) {
        if (request.action == 'player_type_change') {
            changeVideoQuality(request.player_type);
        }
        if (request.action == 'playertype_ask') {
            callback({ 'player_type': localStorage['player_type'] });
        }
        if (request.action == 'playertype_save') {
            localStorage.setItem('player_type', request.player_type);
        }
    }

    chrome.runtime.onMessage.addListener(onRequest);

    //chrome.cookies.set({"url" : "http://www.youtube.com", "domain" : "www.youtube.com", "name" : "wide", "value": "1", "path" : "/"});    

    if (!localStorage.getItem('player_type')) { localStorage.setItem('player_type', 'flash'); }
	
	Ext.sto="local";
    Ext.init();
