
var L64B =
{
	vars: {},
	startpage:
	{
		onMessage: function (details, sender, callback) {
			if (sender.id != chrome.runtime.id)  // Accept only messages from our extension
				return;
			if (details.msg == "msgSetIcon") {
				SetVideoIcon(details.tabId, details.fVideo);
				return;
			}
			else if (details.msg == "msgSetUrl") {
				callback({ tabId: sender.tab.id });
			}
		}
	},
	request:
	{
		lshorthistory: new Object(),
	}
}

function SetVideoIcon(tabid, fVideo) {
	if (tabid >= 0)
		chrome.browserAction.setIcon({ tabId: tabid, path: (fVideo ? "./iconHilight.png" : "./icon19.png") }, () => { /* ... */ });
}


L64B.video =
{
	onUpdateTabCalled: false,
	onUpdateTab: function (tabId, changeInfo, tab) {

	},


	playVideo: function (tabid, video_id) {
		var url = window.location.href;
		url = url.replace("extension/background.html", "startpage/index.html?page=video&id=" + video_id);
		chrome.tabs.update(tabid, { "url": url, "selected": false }, function (tab) { });
	},

}


var vdl =
{

	lasturl: new Object(),


	reset: function (tabid, lasturl) {
		//console.log("-->Reset "+tabid);
		vdl.lasturl[tabid] = lasturl;

		//vdl.urllist[tabid]=false; 

	},

	launch: function (details) {
		console.log("launch" + JSON.stringify(details));
		return;


	},
	/*
		launchc:function(tab)
		{
			vdl.reset(tab.id,"");
		},
		*/
	checkObject: function (details) {
		if (typeof (details) == 'undefined' && chrome.runtime.lastError)
			return;

		var url = details.url;
		//console.log("checkObject "+url);
		var mime = "";
		var len = 0;
		var tabid = details.tabId;
		if (tabid < 0) {
			console.log("tabid " + tabid);
			return;
		}
		for (var idx = 0; idx < details.responseHeaders.length; ++idx) {
			if (details.responseHeaders[idx].name === 'Content-Type') {
				mime = details.responseHeaders[idx].value;
			}
			else if (details.responseHeaders[idx].name === 'Content-Length')
				len = parseInt(details.responseHeaders[idx].value);
			else if (!len && details.responseHeaders[idx].name === 'Content-Range')
				len = parseInt(details.responseHeaders[idx].value);
		}

		//if ( len<1024)
		//	return;
		var ext = ["m3u8", "m4s", "ts", "flv", "mp4", "mov", "m4v", "webm", "mpg", "mp3", "aac"];
		var isVideo = false;
		for (idx = 0; idx < ext.length; idx++) {
			if (mime.indexOf(ext[idx]) >= 0) {
				isVideo = ext[idx];
				break;
			}
			else if (url.indexOf("." + ext[idx]) >= 0) {
				isVideo = ext[idx];
				break;
			}
		}
		if (isVideo != false) {
			var item = { url: url, mime: mime, len: len, title: false, ext: isVideo };
			if (isVideo == "m3u8")
				item.noDL = "m3u8";
			else if (isVideo == "m4s")
				item.noDL = "m4s";
			else if (len < 1024 * 10)
				return;
			SetVideoIcon(tabid, true);
			chrome.tabs.sendMessage(tabid, { id: "msgAddToList", item: item }, function (response) {
				if (typeof (response) == 'undefined' && chrome.runtime.lastError)
					return;
			});

		}

	},

}

chrome.browserAction.setIcon({ path: "./icon19.png" }, () => { /* ... */ });
chrome.runtime.onMessage.addListener(L64B.startpage.onMessage);
chrome.webRequest.onHeadersReceived.addListener(vdl.checkObject,
	{
		urls: ["<all_urls>"]
	}, ["responseHeaders"]);
