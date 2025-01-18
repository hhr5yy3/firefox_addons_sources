"use strict";

/*String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}
*/
var L64B=
{
	vars:{}, 
	GetLang : function () {
		var lang = chrome.i18n.getMessage("language");
		if (lang.indexOf("de") >= 0)
			return "de";
		return "en";
	},
	startpage:
	{
		onMessage:function(details, sender, callback)
		{
		    if (sender.id != chrome.runtime.id)  // Accept only messages from our extension
		        return;
				
			if (details.msg == "msgHistory") {
				OnHistoryMsg(details);
				callback();
			}
			else if (details.msg=="msgSetIcon")
			{
				SetVideoIcon( details.tabId, details.fVideo);
				return;
			}
            else if (details.msg=="msgSetUrl")
            {
                callback( {tabId:sender.tab.id});
            } 
			else if (details.msg == "msgNavigate") 
			{
				chrome.tabs.query({
					active : true
				}, function (tab) {
					if (!tab || !Array.isArray(tab) || !tab.length) {
						return;
					}
					tab = tab[0];
					chrome.tabs.update({
						"url" : details.url,
						"active" : true
					}, function (tab) {});
				});   
			}
		}
	},	 
}

function SetVideoIcon( tabid, fVideo)
{		
	if ( tabid>=0)
		chrome.browserAction.setIcon({tabId: tabid, path: (fVideo?"./icon48hi.png":"./icon48.png")}, () => { /* ... */ });
}


var vdl =
{   
    lasturl:new Object(),
    reset:function( tabid,lasturl)
    {		
        vdl.lasturl[tabid] = lasturl;        
    },

    launch:function(details)
    {
		console.log("launch"+JSON.stringify(details));
		return;
    },

    checkObject:function(details)
    {
		if (typeof (details) == 'undefined' && chrome.runtime.lastError)
			return;

		var url = details.url;   
		//console.log("checkObject "+url);
		var mime = "";
		var len = 0;
		var tabid = details.tabId;
		if ( tabid<0)
		{
			console.log("tabid "+tabid);
			return;
		}
        for (let curHeader = 0; curHeader < details.responseHeaders.length; ++curHeader) 
        {
            if (details.responseHeaders[curHeader].name === 'Content-Type')
            {	
				mime  = details.responseHeaders[curHeader].value; 
            }
            else if (details.responseHeaders[curHeader].name === 'Content-Length')
                len = parseInt(details.responseHeaders[curHeader].value); 
            else if (!len && details.responseHeaders[curHeader].name === 'Content-Range')
                len = parseInt(details.responseHeaders[curHeader].value);
        }
		
		var ext = ["m3u8","ts","flv","mp4","mov","m4v","webm","mpg","mp3","aac"];
		var isVideo = false;
		for ( let curExt=0;curExt<ext.length;curExt++)
		{
			if ( mime.indexOf(ext[curExt]) >= 0)
			{
				isVideo = ext[curExt];
				break;
			}
			else if ( url.indexOf("."+ext[curExt]) >= 0)
			{
				isVideo = ext[curExt];
				break;
			}
		}
        if (isVideo != false)
        {
			var item = {url: url, mime: mime, len: len, title: false, ext:isVideo};
			if ( isVideo == "m3u8")
				item.noDL = "m3u8";
			else if ( len< 1024*10)
				return;
			SetVideoIcon(tabid,true);
			chrome.tabs.sendMessage(tabid, { id: "msgAddToList", item:item}, function (response)
			{
				if (typeof (response) == 'undefined' && chrome.runtime.lastError)
					return;
			});

        }
         
    },
    
}

chrome.browserAction.setIcon({ path: "./icon19.png"}, () => { /* ... */ });

chrome.runtime.onMessage.addListener(L64B.startpage.onMessage);  
chrome.webRequest.onHeadersReceived.addListener(vdl.checkObject,
{
urls: ["<all_urls>"]
},["responseHeaders"]);
 	
var aHistoryList = false;
var fHistoryEnabled = false;
var HistoryEventHandlerStarted = false;


function convertList(sHistoryList) {
	if (!sHistoryList) {
		sHistoryList = "sex,porn,xhamster,xvideos,redtube,xnxx,tube8,xxx,jasmin,strip,erotic";
		localStorage.setItem("HistoryList", sHistoryList);
	}
	sHistoryList = sHistoryList.replace(/\n/g, ",");
	sHistoryList = sHistoryList.replace(/\r/g, "");
	sHistoryList = sHistoryList.replace(/^[,]+|[,]+$/g, ""); // Trim
	return sHistoryList.split(",");
}
function initHistory() {
	fHistoryEnabled = localStorage.getItem("HistoryEnabled");
	var sHistoryList = localStorage.getItem("HistoryList");
	aHistoryList = convertList(sHistoryList);

	if (!HistoryEventHandlerStarted) {
		HistoryEventHandlerStarted = true;
		chrome.history.onVisited.addListener(function (item) {
			if (!fHistoryEnabled)
				return;
			for (let historyEntry in aHistoryList) {
				if (item.url.indexOf(aHistoryList[historyEntry]) >= 0) {
					chrome.history.deleteUrl({
						url : item.url
					}, function () {});
					return;
				}
			}
		});
	}
}
function OnHistoryMsg(msg) {
	
	console.log("msg "+msg.cmd);
	if (msg.cmd == "enable") {
		// Clear all old private entries
		fHistoryEnabled = msg.enable;
		if (!fHistoryEnabled)
			return;
		for (let historyEntry in aHistoryList) {
			chrome.history.search({
				text : aHistoryList[historyEntry],
				startTime : 0,
				maxResults : 1000
			}, function (results) {
				for (let curResult = 0; curResult < results.length; curResult++) {
					chrome.history.deleteUrl({
						url : results[curResult].url
					}, function () {
					});
				}
			});
		}
	} else if (msg.cmd == "deleteAll") {

			chrome.history.deleteAll(function () {
				chrome.notifications.create({
					"type" : "basic",
					"iconUrl" : browser.runtime.getURL("icon48.png"),
					"title" : "Private Video Downloader",
					"message" : chrome.i18n.getMessage("historydeleted")
				});

			});
	} else if (msg.cmd == "deleteAllCookies") {
		chrome.cookies.getAllCookieStores( function (results) {			
		/*for (let curResult = 0; curResult < results.length; curResult++) {
			console.log( "Store "+curResult+"  "+results[curResult].id);
		}*/
		}
		);
		
		console.log( "Store ###");
		chrome.cookies.getAll({}, function (results) {			
		console.log( "Cookies length "+results.length);
			if ( results.length == 0)
			{
				chrome.notifications.create({
				"type" : "basic",
				"iconUrl" : browser.runtime.getURL("icon48.png"),
				"title" : "Private Video Downloader",
				"message" : chrome.i18n.getMessage("nocookies")
				});
				return;
			}
			for (let curResult = 0; curResult < results.length; curResult++) {
				var url = results[curResult].secure ? "https://" : "http://";
				url += results[curResult].domain + results[curResult].path;
				{
					chrome.cookies.remove({
						url : url,
						name : results[curResult].name,
						storeId : results[curResult].storeId
					}, function (d) {});
				}
			}
			chrome.notifications.create({
				"type" : "basic",
				"iconUrl" : browser.runtime.getURL("icon48.png"),
				"title" : "Private Video Downloader",
				"message" : chrome.i18n.getMessage("cookiesdeleted")
			});
		});
	} else if (msg.cmd == "deletePrivateCookies") {
		chrome.cookies.getAll({}, function (results) {
			var aCookiesToDelete = [];
			console.log( "Cookies length "+results.length);
			if ( results.length == 0)
			{
				chrome.notifications.create({
				"type" : "basic",
				"iconUrl" : browser.runtime.getURL("icon48.png"),
				"title" : "Private Video Downloader",
				"message" : chrome.i18n.getMessage("nocookies")
				});
				return;
			}
				
			for (let curResult = 0; curResult < results.length; curResult++) {
				var url = results[curResult].secure ? "https://" : "http://";
				url += results[curResult].domain + results[curResult].path;
				for (let historyEntry in aHistoryList) {
					if (url.indexOf(aHistoryList[historyEntry]) >= 0) {
						aCookiesToDelete.push({
							url : url,
							name : results[curResult].name,
							storeId : results[curResult].storeId
						});
						break;
					}
				}
			}
			var sMessage = aCookiesToDelete.length + chrome.i18n.getMessage("numcookiesdeleted");
			for (let curCookie = 0; curCookie < aCookiesToDelete.length; curCookie++) {
				chrome.cookies.remove(aCookiesToDelete[curCookie], function (d) {});
			}
			chrome.notifications.create({
				"type" : "basic",
				"iconUrl" : browser.runtime.getURL("icon48.png"),
				"title" : "Private Video Downloader",
				"message" : sMessage
			});
		});
	} else if (msg.cmd == "setPrivateList") {
		aHistoryList = convertList(msg.list);
		if (fHistoryEnabled)
			OnHistoryMsg({
				cmd : "enable",
				enable : true
			});
	}
}

initHistory();