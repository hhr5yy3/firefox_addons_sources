
    var Ext = {
        debugMode: false,
        oRTCT: function(passedObject) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                if (tabs.length != 0) {
                    var index = tabs[0].index;
                    //var windowId=tabs[0].windowId;
                    chrome.tabs.create({
                        //windowId:windowId,
                        url: passedObject['url'],
                        index: index + 1
                    }, function(tab) {

                    });
                } else {
                    //last focused
                    chrome.tabs.create({
                        url: passedObject['url']
                    }, function(tab) {

                    });
                }
            });
        },
        retrieveBooleanLocalStorageValue: function(item) {
            if (typeof localStorage[item] === "undefined") {
                localStorage[item] = Ext.defaultPrefs[item];
                return Ext.defaultPrefs[item];
            } else {
                return JSON.parse(localStorage[item]);
            }
        },
        log: function(logText, delimeter) {
            if (Ext.debugMode) {
                if (delimeter) {
                    var delemiterText = "";
                    for (var i = 0; i < 80; i++) {
                        if (i == 40) delemiterText += "\n";
                        else delemiterText += "/";
                    }
                    console.log(delemiterText);
                    return;
                }
                console.log(Ext.extensionLiteralName + " : " + logText);
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

	//chrome.runtime.onMessage.addListener(onRequest);

    chrome.browserAction.onClicked.addListener(function(tab) {

        Ext.oRTCT({'url': chrome.extension.getURL('options.html')});     
        
    });    

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
            Ext.oRTCT({'url': 'http://barisderin.com/?p=287'});		
		}
		else {			
			if(ver!=items.version) {
                //Ext.oRTCT({'url': 'http://barisderin.com/?p=287'});
				chrome.storage.local.set({"version":ver}, function(){});				
			}
		}	  
	});
