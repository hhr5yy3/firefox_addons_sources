var firstRun = false;
var extensionWindowZoom = 1.0;
var extensionWindowId;
var tabId;
var mytabId = 0;
var showToasterOnStartup = [true, true, true];
var windowType = 'popup';
var freemiumId = ["oinkandstuffandroidmessages@gmail.com", "oinkandstuffbitcoinmonerominer@gmail.com", "oinkandstuffnewshubkiosk@gmail.com", "oinkandstuffchatmultimessenger@gmail.com", "oinkandstuffdrumpfinator@gmail.com", "oinkandstuffemojikeyboard@gmail.com", "oinkandstuffevents@gmail.com", "oinkandstuffbluemessenger@gmail.com", "oinkandstuffinstantgames@gmail.com", "oinkandstuffchatmeethangouts@gmail.com", "oinkandstuffwebforinstagram@gmail.com", "oinkandstuffdirectmessagedmforinstagram@gmail.com", "oinkandstuffsociallink@gmail.com", "oinkandstuffcompanionforreddit@gmail.com", "oinkandstuffwhitemessenger@gmail.com", "oinkandstuffwebfortelegram@gmail.com", "oinkandstufflinkfortinder@gmail.com", "oinkandstuffeasyfortwitter@gmail.com", "oinkandstuffurlshortenerplus@gmail.com", "oinkandstuffgreenmessenger@gmail.com", "oinkandstuffredmessengerforyoutube@gmail.com", "oinkandstuffzoom@gmail.com", "oinkandstuffteams@gmail.com", "oinkandstuffwebfortiktok@gmail.com", "oinkandstuffmultiai@gmail.com"];
var emojiId = "oinkandstuffemojikeyboard@gmail.com";
if (localStorage.getItem("store.settings.check") == null) localStorage.setItem("store.settings.check", new Date().getTime());

if (extensionWindowId == null) {
    if (localStorage.getItem("store.settings.checkboxStartOnChrome") == "true") {
        createWindow("extensionView");
    }
}

chrome.windows.onRemoved.addListener(function (windowId)
{
    if (windowId == extensionWindowId) {
        extensionWindowId = null;
		tabId = null;
		mytabId = 0;
    }
});

/**/
chrome.webRequest.onHeadersReceived.addListener(
    function (details)
    {
		if (details.tabId && details.tabId === mytabId) {
			const b = details.responseHeaders.filter((details) => !['x-frames-options', 'content-securitys-policy', 'x-content-securitys-policy', 'strict-transport-securitys'].includes(details.name.toLowerCase()));
			return { responseHeaders: b	}
		}
    },
    {
        urls: [ "<all_urls>" ],
		tabId: mytabId
    },
    ["blocking", "responseHeaders"]
);


const useAgent = 'Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36';
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (details.tabId && details.tabId === mytabId) {
      const { requestHeaders } = details

      requestHeaders.forEach(header => {
        if (header.name === 'x-User-Agent') {
          header.value = useAgent
        }
      })

      const headers = requestHeaders.filter(header => {
        return header.name.toLowerCase() !== 'x-referer'
      })

      return { requestHeaders: headers }
    }
  },
  {
	  urls: ['<all_urls>'],	
	  tabId: mytabId
  },
  ['blocking', 'requestHeaders']
)
/**/

chrome.windows.onFocusChanged.addListener(function () {
	chrome.windows.getCurrent(function (win) {
		if (win !== null && win !== "undefined" && win.id === extensionWindowId) {
			localStorage.setItem("store.settings.windowWidth", win.width);
			localStorage.setItem("store.settings.windowHeight", win.height);
			localStorage.setItem("store.settings.windowLeft", win.left);
			localStorage.setItem("store.settings.windowTop", win.top);
		}
	});
});

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    createUpdateWindow();
});

function createUpdateWindow(url){
    if (extensionWindowId == null) {
        if(url == null) createWindow("extensionView");
		else createWindow(url);
    } else {
        if(url != null) chrome.tabs.update(tabId, {url: url});
		chrome.windows.update(extensionWindowId, { focused: true, drawAttention : true });
    }
}

chrome.runtime.onInstalled.addListener(function(details){
	var thisVersion = chrome.runtime.getManifest().version;
    if(details.reason == "install"){
		createWindow("install");
        createWindow("extensionView");
		localStorage.setItem("store.settings.extensionUpdateVersion", thisVersion);
		localStorage.setItem("store.settings.extensionCurrentVersion", thisVersion);
    }else if(details.reason == "update" && localStorage.getItem("store.settings.popupUpdatePage") != null && localStorage.getItem("store.settings.popupUpdatePage") == "true"){
        //createWindow("update");
		localStorage.setItem("store.settings.extensionUpdateVersion", thisVersion);
    }
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    if (request.checkavailable){
        sendResponse({available: {}});
    }
});

function windowSize(sidebar, widebar) {

    var w = Math.round(1400 * extensionWindowZoom);
    var h = Math.round(900 * extensionWindowZoom);

    var left = Math.round(screen.availWidth/2 - 700);
    var top = Math.round(screen.availHeight/2 - 450);

    if (sidebar) {
        h = screen.availHeight;
        top = 0;
    }
	if(widebar){
		w = screen.availWidth;
		left = 0;
	}
	
	if (w > screen.availWidth) {
        w = screen.availWidth;
    }
    if (h > screen.availHeight) {
        h = screen.availHeight;
    }

    return {
        width: w,
        height: h,
        left: left,
        top: top
    };
};

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if ((typeof message.showTutorial) !== 'undefined') {
        if (firstRun) {
			sendResponse({ showTutorial: 1 });
            firstRun = false;
        } else {
			sendResponse({ showTutorial: -1 });
		}
    }

    switch (message.myWindowId) {
        case "myWindowId":
            //myWindowId
            if (sender.tab.windowId === extensionWindowId) {
				if(sender.url.indexOf("mbasic.facebook.com/") < 0 && sender.url.indexOf("facebook.com/") >= 0){
					chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/style-facebook.css"});
				} else if (sender.url.indexOf("messenger.com/") >= 0){
					chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/style-messenger.css"});
				} else if(sender.tab != null && sender.url != null && sender.url.indexOf("gamezop.com/") >= 0){
					chrome.tabs.insertCSS(tabId,{runAt: "document_start", file : "css/style-gamezop.css"});
				}
				chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/style.css"});
				chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/material-components-web.min.css"});
				chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/toastr.min.css"});
				chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/introjs.min.css"});
				chrome.tabs.insertCSS(sender.tab.id,{runAt: "document_start", file : "css/jquery.contextMenu.min.css"});
				sendResponse({ myWindowId: extensionWindowId });
				//Check if there are new notifications
				remoteNotification(true);
            } else {
                sendResponse({ myWindowId: -1 });
            }
            break;
        default:
            break;
    }
	
    switch (message.screenshotWindow) {
        case "screenshotWindow":
            //screenshotWindow
			chrome.tabs.captureVisibleTab(
				null,
				{format: 'png', quality: 100},
				function(dataUrl)
				{
					sendResponse({screenshotWindow:dataUrl});
				}
			);
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }
	
	switch (message.extensionUpdated){
		case "extensionUpdated":
			if(localStorage.getItem("store.settings.extensionCurrentVersion") != localStorage.getItem("store.settings.extensionUpdateVersion")){
				sendResponse({ extensionUpdated: localStorage.getItem("store.settings.extensionUpdateVersion") });
				var thisVersion = chrome.runtime.getManifest().version;
				localStorage.setItem("store.settings.extensionUpdateVersion", thisVersion);
				localStorage.setItem("store.settings.extensionCurrentVersion", thisVersion);
			} else {
				sendResponse({ extensionUpdated: "" });
			}
			break;
		default:
			break;
	}
	
	switch (message.checkStart){
		case "checkStart":
			sendResponse({ checkStart: 1 });
			/*var check = (new Date().getTime()) - parseInt(localStorage.getItem("store.settings.check"));
			if(check < 604800000){
				sendResponse({ checkStart: 1 });
			} else {
				sendResponse({ checkStart: 0 });
			}*/
			break;
		default:
			break;
	}
	
	if((typeof message.androidMessagesBadge) !== 'undefined'){
		//var BADGE = {color: [40, 131, 218, 255]};
		//chrome.browserAction.setBadgeBackgroundColor(BADGE);
		
		var splitMessage = message.androidMessagesBadge.split("#");
		var conversations = parseInt(splitMessage[0]);
		var messages = parseInt(splitMessage[1]);
		var badgeTitle = '';
		
		if(conversations > 0 || messages > 0){
			var badgeTooltip = chrome.runtime.getManifest().name;
			
			if(conversations > 0){
				badgeTooltip += '\n>'+conversations+' New conversations';
				if(conversations > 9){
					badgeTitle +=  '+9';
				} else {
					badgeTitle += conversations + '';
				}
			}
			if(messages > 0){
				badgeTooltip += '\n>'+messages+' New messages';
				if(messages > 9){
					badgeTitle += '+9';	
				} else{
					badgeTitle += '+' + messages;					
				}
			}
			chrome.browserAction.setTitle({ title: badgeTooltip });
		}
		
		if (messages + conversations === 0) {
			chrome.browserAction.setBadgeText({	text: '' });
			chrome.browserAction.setTitle({ title: '' });
		} else {
			chrome.browserAction.setBadgeText({	text: badgeTitle });
		}
	}
	
    switch (message.supportUs) {
        case "supportUs":
            chrome.storage.sync.get("supportUsDate", function (data) {
                //console.log("supportUsDate", data['supportUsDate']);
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['supportUsDate'] == null) {
                    chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
					sendResponse({ supportUs: -1 });
                } else {
                    var savedDate = new Date(JSON.parse(data['supportUsDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);

                    chrome.storage.sync.get("supportUsCycle", function (data) {
                        if (data['supportUsCycle'] == null) {
                            chrome.storage.sync.set({ 'supportUsCycle': 1 }, function () { });
							sendResponse({ supportUs: -1 });
                        } else {
                            //console.log("supportUsCycle", data['supportUsCycle']);
							//console.log("supportUsDate", datesDiff);
                            if (data['supportUsCycle'] == 1 && datesDiff >= 3 && showToasterOnStartup[0])
                            {
                                chrome.storage.sync.set({ 'supportUsCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
                                sendResponse({ supportUs: 1 });
                            } else if (data['supportUsCycle'] == 2 && datesDiff >= 30 && showToasterOnStartup[0]) {
								chrome.storage.sync.set({ 'supportUsCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'supportUsDate': serializedToday }, function () { });
                                sendResponse({ supportUs: 2 });
							} else {
								sendResponse({ supportUs: -1 });
							}
                        }
						showToasterOnStartup[0] = false;
                    });
                }
            });
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }
	
    switch (message.remoteMessage) {
        case "remoteMessage":
			chrome.storage.sync.get("remoteMessageDate", function (data) {
				//console.log("remoteMessageDate", data['remoteMessageDate']);
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['remoteMessageDate'] == null) {
                    chrome.storage.sync.set({ 'remoteMessageDate': serializedToday }, function () { });
					chrome.storage.sync.set({ 'remoteMessageSID': "" }, function () { });
					sendResponse({ remoteMessage: "" });
                } else {
					var savedDate = new Date(JSON.parse(data['remoteMessageDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);
					
					var xmlHttp = new XMLHttpRequest();
					xmlHttp.onreadystatechange = function() {
						if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && xmlHttp.response != null && showToasterOnStartup[1]){
							var jsonData = JSON.parse(xmlHttp.response);
							if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
								var responsestring = [];
								for (var i = 0; i < jsonData[0].data.length; i++)
								{
									responsestring.push(jsonData[0].data[i].MESSAGE);
								}
								chrome.storage.sync.get("remoteMessageSID", function (data) {
									var storedId = data['remoteMessageSID'];

									if((storedId.toUpperCase() != jsonData[0].data[0].SID.toUpperCase() || jsonData[0].data[0].DURATION.toUpperCase() == "Perm".toUpperCase()) && (datesDiff >= 1)){ //Add datesDiff >= 6
										chrome.storage.sync.set({ 'remoteMessageSID': jsonData[0].data[0].SID }, function () { });
										sendResponse({ remoteMessage: responsestring });
									} else {
										sendResponse({ remoteMessage: "" });
									}
									showToasterOnStartup[1] = false;
								});
							}
						}
					}
					xmlHttp.open("GET", 'https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=FirefoxGeneric', true); // true for asynchronous 
					xmlHttp.send(null);
				}
			});
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }

	switch (message.informationNews) {
        case "informationNews":
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && xmlHttp.response != null){
					var jsonData = JSON.parse(xmlHttp.response);
					if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
						var responsestring = [];
						for (var i = 0; i < jsonData[0].data.length; i++)
						{
							responsestring.push(jsonData[0].data[i].MESSAGE);
						}
						sendResponse({ informationNews: responsestring });
					}
				}
			}
			xmlHttp.open("GET", 'https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=FirefoxNewsGeneric', true); // true for asynchronous 
			xmlHttp.send(null);
			return true; //so i can use sendResponse later
            break;
        default:
            break;
    }

    switch (message.autoStart) {
        case "autoStart":
            //AutoStart
            if (localStorage.getItem("store.settings.checkboxStartOnChrome") != null) {
                sendResponse({ autoStart: localStorage.getItem("store.settings.checkboxStartOnChrome") });
            }
            break;
        case "clickAutoStart":
            //clickAutoStart
            if (localStorage.getItem("store.settings.checkboxStartOnChrome") != null) {
                if (localStorage.getItem("store.settings.checkboxStartOnChrome") === "true") {
                    localStorage.setItem("store.settings.checkboxStartOnChrome", "false");
                } else {
                    localStorage.setItem("store.settings.checkboxStartOnChrome", "true");
                }
            }
            break;
        default:
            break;
    }
	
    switch (message.backgroundAndroidMessages) {
        case "backgroundAndroidMessages":
            //backgroundAndroidMessages
            if (localStorage.getItem("store.settings.checkboxBackgroundAndroidMessages") != null) {
                sendResponse({ backgroundAndroidMessages: localStorage.getItem("store.settings.checkboxBackgroundAndroidMessages") });
            }
            break;
        case "clickBackgroundAndroidMessages":
            //clickBackgroundAndroidMessages
            if (localStorage.getItem("store.settings.checkboxBackgroundAndroidMessages") != null) {
                if (localStorage.getItem("store.settings.checkboxBackgroundAndroidMessages") === "true") {
                    localStorage.setItem("store.settings.checkboxBackgroundAndroidMessages", "false");
                } else {
                    localStorage.setItem("store.settings.checkboxBackgroundAndroidMessages", "true");
                }
            }
            break;
        default:
            break;
    }
	
    switch (message.webSearchActive) {
        case "webSearchActive":
            //webSearchActive
            if (localStorage.getItem("store.settings.webSearchActive") != null) {
                sendResponse({ webSearchActive: localStorage.getItem("store.settings.webSearchActive") });
            }
            break;
		case "userTrue":
			localStorage.setItem("store.settings.webSearchActive", "userTrue");
		break;
		case "userFalse":
			localStorage.setItem("store.settings.webSearchActive", "userFalse");
		break;
        default:
            break;
    }
	
	if ((typeof message.addEmoji) !== 'undefined') {
		chrome.runtime.sendMessage(emojiId, {getTargetData: message.addEmoji + '#' + sender.tab.id}, function(response) {
			if (response == null || response.targetData == null){
				sendResponse({ addEmoji: "https://addons.mozilla.org/addon/emojis-keyboard/" });
				//console.log('Not Installed');
			} else if (response.targetData != null){
				sendResponse({ addEmoji: "true" });
				//console.log('Installed');
			}
		});
		return true; //so i can use sendResponse later
    }

    switch (message.hasFreemiumActive) {
        case "status":
		var counter = 0, hit = 0, i = 0;
			for(i = 0; i < freemiumId.length; i++){
				//var port = chrome.runtime.connect(freemiumId[i],{});
				chrome.runtime.sendMessage(freemiumId[i], {checkavailable: true}, function(response) {
					counter++;
					if (response != null && response.available != null){
						hit++;
						//console.log('Installed');
					}
					if(counter == freemiumId.length){
						if(hit >= 2) sendResponse({ hasFreemiumActive: "true" });
						else sendResponse({ hasFreemiumActive: "false" });
					}
				});
			}
			return true; //so i can use sendResponse later
            break;
		case "freemiumAlert":
            chrome.storage.sync.get("freemiumAlertDate", function (data) {
                var today = new Date();
                var serializedToday = JSON.stringify(today);
                if (data['freemiumAlertDate'] == null) {
                    chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
					sendResponse({ freemiumAlert: -1 });
                } else {
                    var savedDate = new Date(JSON.parse(data['freemiumAlertDate']));
                    var datesDiff = Date.dateDiff('d', savedDate, today);

                    chrome.storage.sync.get("freemiumAlertCycle", function (data) {
                        if (data['freemiumAlertCycle'] == null) {
                            chrome.storage.sync.set({ 'freemiumAlertCycle': 1 }, function () { });
							sendResponse({ freemiumAlert: -1 });
                        } else {
                            if (data['freemiumAlertCycle'] == 1 && datesDiff >= 15 && showToasterOnStartup[2])
                            {
                                chrome.storage.sync.set({ 'freemiumAlertCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
                                sendResponse({ freemiumAlert: 1 });
                            } else if (data['freemiumAlertCycle'] == 2 && datesDiff >= 45 && showToasterOnStartup[2]) {
								chrome.storage.sync.set({ 'freemiumAlertCycle': 2 }, function () { });
                                chrome.storage.sync.set({ 'freemiumAlertDate': serializedToday }, function () { });
                                sendResponse({ freemiumAlert: 2 });
							} else {
								sendResponse({ freemiumAlert: -1 });
							}
                        }
						showToasterOnStartup[2] = false;
                    });
                };
            });
			return true; //so i can use sendResponse later
			break;
        default:
            break;
    }
	
	switch (message.collapseTopbar) {
        case "collapseTopbar":
            if (localStorage.getItem("store.settings.checkboxCollapseTopbar") != null) {
                sendResponse({ collapseTopbar: localStorage.getItem("store.settings.checkboxCollapseTopbar") });
            }
            break;
		case "true":
			localStorage.setItem("store.settings.checkboxCollapseTopbar", "true");
		break;
		case "false":
			localStorage.setItem("store.settings.checkboxCollapseTopbar", "false");
		break;
        default:
            break;
    }
	
    switch (message.incognitoMode) {
        case "incognitoMode":
            if (localStorage.getItem("store.settings.incognitoMode") != null) {
                sendResponse({ incognitoMode: localStorage.getItem("store.settings.incognitoMode") });
            }
            break;
		case "true":
			localStorage.setItem("store.settings.incognitoMode", "true");
		break;
		case "false":
			localStorage.setItem("store.settings.incognitoMode", "false");
		break;
        default:
            break;
    }
	
    if ((typeof message.themeSkin) !== 'undefined') {
        if (message.themeSkin == "themeSkin") {
            sendResponse({ themeSkin: localStorage.getItem("store.settings.checkboxThemeSkin") });
        } else if(message.themeSkin == "getCurrent") {
			setThemeSkin(localStorage.getItem("store.settings.checkboxThemeSkinCurrent"));
		} else {
			localStorage.setItem("store.settings.checkboxThemeSkinCurrent", message.themeSkin);
			setThemeSkin(message.themeSkin);
		}
    }

    switch (message.alert) {
        case "makeSideBar":
            var windowDimensions = windowSize(false, false);
            if (parseInt(localStorage.getItem("store.settings.windowHeight") != null && localStorage.getItem("store.settings.windowHeight")) > windowDimensions.height) {
                //Sidebar OFF
                windowDimensions = windowSize(false, false);
            } else {
                //Sidebar ON
                windowDimensions = windowSize(true, false);
            }
            localStorage.setItem("store.settings.windowHeight", windowDimensions.height);
            localStorage.setItem("store.settings.windowTop", windowDimensions.top);

            chrome.windows.update(sender.tab.windowId, { height: windowDimensions.height, top: windowDimensions.top });
            break;
        case "makeWideBar":
            var windowDimensions = windowSize(false, false);
            if (parseInt(localStorage.getItem("store.settings.windowWidth") != null && (localStorage.getItem("store.settings.windowWidth") - 25)) > windowDimensions.width) {
                //Widebar OFF
                windowDimensions = windowSize(true, false);
            } else {
                //Widebar ON
                windowDimensions = windowSize(true, true);
            }

            localStorage.setItem("store.settings.windowLeft", windowDimensions.left);
            localStorage.setItem("store.settings.windowWidth", windowDimensions.width);

            chrome.windows.update(sender.tab.windowId, { width: windowDimensions.width, left: windowDimensions.left });
            break;		
		case "enablePanels":
			chrome.tabs.create({url: "chrome://flags/#enable-panels"},
				function (chromeWindow) {
				chrome.windows.update(chromeWindow.windowId, { focused: true, drawAttention: true });
			});
			break;
		case "activatePanels":
			localStorage.setItem("store.settings.windowType", "panel");
			windowType = 'panel';
			chrome.windows.remove(extensionWindowId);
			createWindow("extensionView");
			firstRun = true;
			break;
		case "desactivatePanels":
			localStorage.setItem("store.settings.windowType", "popup");
			windowType = 'popup';
			chrome.windows.remove(extensionWindowId);
			createWindow("extensionView");
			firstRun = true;
			break;
		case "enableIncognitoBrowse":
			chrome.tabs.create({url: "about:addons"},
				function (chromeWindow) {
				chrome.windows.update(chromeWindow.windowId, { focused: true, drawAttention: true });
			});
			break;
		case "activateIncognitoBrowse":
			localStorage.setItem("store.settings.windowIncognito", "true");
			chrome.windows.remove(extensionWindowId);
			createWindow("extensionView");
			break;
		case "desactivateIncognitoBrowse":
			localStorage.setItem("store.settings.windowIncognito", "false");
			chrome.windows.remove(extensionWindowId);
			createWindow("extensionView");
			break;			
        default:
            break;
    }
	
    switch (message.chromeWindowType) {
        case "chromeWindowType":
            //chromeWindowType
            sendResponse({ chromeWindowType: windowType });
            break;
        default:
            break;
    }
	
	sendResponse({});
	return true;
});

function setThemeSkin(theme){
    switch (theme) {
        case "invert":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: invert(100%) !important;}"});
            break;
        case "grayscale50":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: grayscale(50%) !important;}"});
            break;
        case "grayscale100":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: grayscale(100%) !important;}"});
            break;
        case "huerotate120":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: hue-rotate(120deg) !important;}"});
            break;
        case "huerotate240":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: hue-rotate(240deg) !important;}"});
            break;
        case "saturate":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: saturate(5) !important;}"});
            break;
        case "sepia":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: sepia(50%) !important;}"});
            break;
        case "blur":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: blur(2px) !important;}"});
            break;
        case "none":
            chrome.tabs.insertCSS(tabId, {runAt: "document_start", code: "html {filter: none !important;}"}); //None
            break;
        default:
            break;
    }	
}

function createWindow(urlWindow) {
    var windowDimensions = new windowSize(false, false);
	
	if (localStorage.getItem("store.settings.windowType") !== null && localStorage.getItem("store.settings.windowType") !== "undefined"){
		windowType = localStorage.getItem("store.settings.windowType");
	}	

    if (localStorage.getItem("store.settings.windowWidth") !== null && localStorage.getItem("store.settings.windowWidth") !== "undefined" &&
        localStorage.getItem("store.settings.windowHeight") !== null && localStorage.getItem("store.settings.windowHeight") !== "undefined" &&
        localStorage.getItem("store.settings.windowLeft") !== null && localStorage.getItem("store.settings.windowLeft") !== "undefined" &&
        localStorage.getItem("store.settings.windowTop") !== null && localStorage.getItem("store.settings.windowTop") !== "undefined") {
            windowDimensions.width = parseInt(localStorage.getItem("store.settings.windowWidth"));
            windowDimensions.height = parseInt(localStorage.getItem("store.settings.windowHeight"));
            windowDimensions.left = parseInt(localStorage.getItem("store.settings.windowLeft"));
            windowDimensions.top = parseInt(localStorage.getItem("store.settings.windowTop"));
    } else {
		firstRun = true;
	}

    var newURL = "";
    switch (urlWindow) {
        case "extensionView":
            newURL = "https://games.gamezop.com/?id=SkOoemACwW";
            break;
        case "install":
            newURL = chrome.i18n.getMessage("chrome_extension_link");
            break;
            break;
        default:
			newURL = urlWindow;
            break;
    }

	if (localStorage.getItem("store.settings.windowIncognito") !== null && localStorage.getItem("store.settings.windowIncognito") !== "undefined" && localStorage.getItem("store.settings.windowIncognito") == "true"){
		chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
			if(isAllowedAccess && urlWindow == "extensionView"){
				launchWindow(newURL, windowDimensions, urlWindow, true);
			} else {
				launchWindow(newURL, windowDimensions, urlWindow, false);
			}
		});
	} else {
		launchWindow(newURL, windowDimensions, urlWindow, false);
	}
}

function launchWindow(newURL, windowDimensions, urlWindow, isIncognitoWindow) {
	chrome.windows.create({ url: newURL, type: windowType, incognito: isIncognitoWindow, width: windowDimensions.width, height: windowDimensions.height, left: windowDimensions.left, top: windowDimensions.top },
		function (chromeWindow) {
			if (urlWindow != "install" || urlWindow != "update") {
				extensionWindowId = chromeWindow.id;
				tabId = chromeWindow.tabs[0].id;
				mytabId = chromeWindow.tabs[0].id;
				showToasterOnStartup[0] = true;
				showToasterOnStartup[1] = true;
				showToasterOnStartup[2] = true;
			}
			if (localStorage.getItem("store.settings.checkboxStartOnChrome") == null) localStorage.setItem("store.settings.checkboxStartOnChrome", "false");
			if (localStorage.getItem("store.settings.webSearchActive") == null) localStorage.setItem("store.settings.webSearchActive", "userTrue");
			if (localStorage.getItem("store.settings.showGenericDesktopNotif") == null) localStorage.setItem("store.settings.showGenericDesktopNotif", "true");
			if (localStorage.getItem("store.settings.incognitoMode") == null) localStorage.setItem("store.settings.incognitoMode", "false");
			if (localStorage.getItem("store.settings.popupUpdatePage") == null) localStorage.setItem("store.settings.popupUpdatePage", "true");
			if (localStorage.getItem("store.settings.extensionCurrentVersion") == null || localStorage.getItem("store.settings.extensionUpdateVersion") == null){
				var thisVersion = chrome.runtime.getManifest().version;
				localStorage.setItem("store.settings.extensionCurrentVersion", thisVersion);
				localStorage.setItem("store.settings.extensionUpdateVersion", thisVersion);
			}
			if (localStorage.getItem("store.settings.checkboxThemeSkin") == null) localStorage.setItem("store.settings.checkboxThemeSkin", "true");
			if (localStorage.getItem("store.settings.checkboxThemeSkinCurrent") == null) localStorage.setItem("store.settings.checkboxThemeSkinCurrent", "none");

			if (localStorage.getItem("store.settings.checkboxCollapseTopbar") == null) localStorage.setItem("store.settings.checkboxCollapseTopbar", "true");
	});
}

/*#### Manage Notifications ####*/
function remoteNotification(startup){
	chrome.storage.sync.get("remoteNotificationDate", function (data) {
		var today = new Date();
		var serializedToday = JSON.stringify(today);
		if (data['remoteNotificationDate'] == null) {
			chrome.storage.sync.set({ 'remoteNotificationDate': serializedToday }, function () { });
			chrome.storage.sync.set({ 'remoteNotificationSID': "" }, function () { });
		} else {
			var savedDate = new Date(JSON.parse(data['remoteNotificationDate']));
			var datesDiff = Date.dateDiff('d', savedDate, today);
			
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && xmlHttp.response != null){
					var jsonData = JSON.parse(xmlHttp.response);
					if(jsonData != null && jsonData.length > 0 && jsonData[0].result == "success"){
						chrome.storage.sync.get("remoteNotificationSID", function (data) {
							var storedId = data['remoteNotificationSID'];

							if((startup == null && jsonData[0].data[0].STARTUP.toUpperCase() == "Boot".toUpperCase()) || (startup != null && jsonData[0].data[0].STARTUP.toUpperCase() == "Open".toUpperCase())){
								if((storedId.toUpperCase() != jsonData[0].data[0].SID.toUpperCase() || jsonData[0].data[0].DURATION.toUpperCase() == "Perm".toUpperCase()) && (datesDiff >= 1)){
									chrome.storage.sync.set({ 'remoteNotificationSID': jsonData[0].data[0].SID }, function () { });
									var title, message, url, icon = "";
									var res = jsonData[0].data[0].MESSAGE.split("|");
									for (var i = 0; i < res.length; i++) {
										if(i == 0) title = res[i];
										else if (i == 1) message = res[i];
										else if (i == 2) url = res[i];
										else if (i == 3) icon = res[i];
									}
									showNotification(title,message,url,icon);
								} else {
								}
							}
						});
					}
				}
			}
			xmlHttp.open("GET", 'https://www.oinkandstuff.com/oink-remote/api/v1/RemoteMessage?app=FirefoxNotificationGeneric', true); // true for asynchronous 
			xmlHttp.send(null);
		}
	});
}

function showNotification(title, message, url, icon, delay){
	if(localStorage.getItem("store.settings.showGenericDesktopNotif") == null || localStorage.getItem("store.settings.showGenericDesktopNotif") == "true"){
		if(title == null || title == "") title = chrome.runtime.getManifest().name;
		if(message == null || message == "") message = "Updated to v" + chrome.runtime.getManifest().version + ". Check this and other news on our Website.";
		if(url == null || url == "") url = "https://www.oinkandstuff.com";
		if(icon == null || icon == "") icon = "img/icon_128.png";
		if(delay == null) delay = 10000;
		
		setTimeout(function(){
			var options = {
			  type: "basic",
			  title: title,
			  message: message,
			  iconUrl: icon
			}
			// create notification using url as id
			chrome.notifications.create(url, options, function(notificationId){ }); 
		}, delay + getRandomInt(delay, delay*2));
	}
}

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.tabs.create({url: notificationId});
});

//Check if there are new notifications
remoteNotification(null);

/*#### ContextMenu ####*/
chrome.contextMenus.create({
	id: 'OINKANDSTUFF_RATE',
	title: 'Rate ' + chrome.runtime.getManifest().name + ' \u272C\u272C\u272C\u272C\u272C',
	contexts: ['browser_action'],
	onclick: function () {
		chrome.tabs.create({url: "https://addons.mozilla.org/addon/" + chrome.runtime.id });
	}
});
chrome.contextMenus.create({
	id: 'OINKANDSTUFF_GOPREMIUM',
	title: 'Go Premium \u2764',
	contexts: ['browser_action'],
	onclick: function () {
		chrome.tabs.create({url: chrome.extension.getURL("options/indexPremium.html")});
	}
});

function clickContextMenu(info, tab){
	var file = info.pageUrl;
    if (info.linkUrl) {
        file = info.linkUrl;
    }
    createUpdateWindow(file);
}

var showForPages = ["*://gamezop.com/*", "*://*/*gamezop.com*"];
chrome.contextMenus.create({
	id: "OINKANDSTUFF_LINK",
    title: "Open in " + chrome.runtime.getManifest().name,
	contexts: ["link"],
	onclick: clickContextMenu,
    targetUrlPatterns: showForPages
});
chrome.contextMenus.create({
	id: "OINKANDSTUFF_PAGE",
    title: "Open in " + chrome.runtime.getManifest().name,
	contexts: ["page"],
	onclick: clickContextMenu,
	documentUrlPatterns:showForPages
});

// datepart: 'w', 'd', 'h', 'm', 's'
Date.dateDiff = function (datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    };

    return Math.floor(diff / divideBy[datepart]);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
