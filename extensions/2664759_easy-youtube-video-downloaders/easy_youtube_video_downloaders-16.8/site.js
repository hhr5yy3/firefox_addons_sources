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
		replaceURI = tabs[0].url;
		curURI = replaceURI.replace("https://www.youtube.com/watch?v=", "");
		if (youtube_parser(tabs[0].url) != false) {
			if (IsYTpg != true) {
				chrome.browserAction.setIcon({path: "icon-on.png"});
				IsYTpg=true;
			}
		} else {

		var regExp = /^.*((download\-lagu\-mp3\.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = tabs[0].url.match(regExp);
			if(match != null){
				chrome.browserAction.setIcon({path: "icon-on.png"});
				IsYTpg=false;
				IsDonlot=true;
			}else{
				chrome.browserAction.setIcon({path: "icon-off.png"});
				IsYTpg=false;
				IsDonlot=false;
			}
			if (IsYTpg != false) {
				chrome.browserAction.setIcon({path: "icon-off.png"});
				IsYTpg=false;
			}
		}
	});
}
function exeTabs(tab){
		  var code = 'window.location.reload();';
		  chrome.tabs.executeScript(tab.id, {code: code});
}
function exeFail(error){
 window.alert(`Error: ${error}`);
}
chrome.tabs.onUpdated.addListener(function() {
	check();
});
chrome.tabs.onActivated.addListener(function() {
	check();
});
chrome.browserAction.onClicked.addListener(function(tab) {
	curr = tab.url.indexOf('downloader.download-lagu-mp3.com');
	if(curr < 0){
	check();
	if (IsYTpg == true) {
		chrome.tabs.create({url:"https://save.vevioz.com/?id="+(curURI)});
	} else if(IsDonlot == true) {
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(exeTabs, exeFail);
	}else {
		var alertWindow = 'alert("Please play the video on youtube then click the icon in the top right tab.")';
		browser.tabs.executeScript({code : alertWindow});
	}
	}else{
		var alertWindow = 'alert("Only Youtube URL can be processed.")';
		browser.tabs.executeScript({code : alertWindow});
	}
});