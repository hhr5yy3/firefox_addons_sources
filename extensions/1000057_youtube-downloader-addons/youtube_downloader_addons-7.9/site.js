
if (typeof(chrome) == 'undefined') {
	chrome = browser;
}

function youtube_parser(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);
	return (match&&match[7].length==11)? match[7] : false;
}

var IsYTpg = false;
var IsDonlot = false;
var curURI = "";
function check() {
	chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
		if(!tabs[0]) return false;
		replaceURI = tabs[0].url;
		curURI = replaceURI.replace("https://www.youtube.com/embed/", "");
		curURI = curURI.replace("?autoplay=1", "");
		curURI = curURI.replace("https://www.youtube.com/watch?v=", "");
		if (youtube_parser(tabs[0].url) != false) {
			if (IsYTpg != true) {
				 chrome.pageAction.setIcon({tabId: tabs[0].id,path: "icon-on.png"});
				IsYTpg=true;
			}
		} else {

		var regExp = /^.*((download\-lagu\-mp3\.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = tabs[0].url.match(regExp);
			if(match != null){
				 chrome.pageAction.setIcon({tabId: tabs[0].id,path: "icon-on.png"});
				IsYTpg=false;
				IsDonlot=true;
			}else{
				 chrome.pageAction.setIcon({tabId: tabs[0].id,path: "icon-off.png"});
				IsYTpg=false;
				IsDonlot=false;
			}
			if (IsYTpg != false) {
				 chrome.pageAction.setIcon({tabId: tabs[0].id,path: "icon-off.png"});
				IsYTpg=false;
			}
		}
  chrome.pageAction.show(tabs[0].id);
	console.log('Youtube are '+IsYTpg);
	console.log('IsDonlot are '+IsDonlot);
	});
}

chrome.tabs.onUpdated.addListener(function() {
	check();
});
chrome.tabs.onActivated.addListener(function() {
	check();
});

var storedWindowInfo = {};
chrome.tabs.onActivated.addListener(function(activeInfo) {
    var windowLastTabId = storedWindowInfo[activeInfo.windowId];
    if (windowLastTabId) {
        // Do something with previous tab, e.g. send a message:
        chrome.tabs.sendMessage(windowLastTabId);
    }
    // Update ID of currently active tab in the current window
    storedWindowInfo[activeInfo.windowId] = activeInfo.tabId;
});

chrome.pageAction.onClicked.addListener(function(tab) {
	check();
	if (IsYTpg == true) {
		chrome.tabs.create({url:"https://addons.vevioz.com/?id="+(curURI)});
	} else if(IsDonlot == true) {
		chrome.tabs.getCurrent(null, function(tab) {
		  var code = 'window.location.reload();';
		  chrome.tabs.executeScript(tab.id, {code: code});
		});
	}else {
		window.alert('Play any video on youtube then click the icon in the top right tab.');
	}
});