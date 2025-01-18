'use strict';
var avwgBg = {};
avwgBg.CONST_APIURL = cnf.serverUrl + '/api/';
avwgBg.CONST_CMPTURL = cnf.serverUrl + '/competition/';
avwgBg.lastTab = {url: null};
chrome.storage.local.get('plId', function (res) {
//clog('green', "res", res)
	avwgBg.plId = res.plId;
	if (!avwgBg.plId || avwgBg.plId.length !== 73) {
		avwgBg.plId = avwgBg.createPlId();
		chrome.storage.local.set({'plId': avwgBg.plId});
	}
	bgInit();
});
function clog(c, t, p) {
	if (p !== undefined) {
		console.log("%c%s %c", "color:" + c, t, "color:inherit", p);
	} else {
		console.log("%c%s", "color:" + c, t);
	}
}

avwgBg.postPromise = function (req) {
	return $.ajax(avwgBg.CONST_APIURL, {
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(req)
	});
};
avwgBg.padZero = function (s) {
	s = String(s);
	return (s.length < 2) ? '0' + s : s;
};
avwgBg.dec2hex = function (dec) {
	return avwgBg.padZero(dec.toString(16));
};
avwgBg.createPlId = function () {
	var arr = new Uint8Array(30);
	crypto.getRandomValues(arr);
	var id = Array.from(arr).map(avwgBg.dec2hex).join('');
	var d = new Date();
	id = String(d.getFullYear()).substring(2) + avwgBg.padZero(d.getMonth() + 1) + avwgBg.padZero(d.getDate())
	+ avwgBg.padZero(d.getHours()) + avwgBg.padZero(d.getMinutes()) + avwgBg.padZero(d.getSeconds()) + '-' + id;
	clog('green', "createPlId", id)
	return id;
};
avwgBg.onUrlChange = function (tabUrl, tabRef) {
	if ((tabUrl === undefined) || (!tabUrl)) return;
//var tblUrlLowerCase = tabUrl.toLowerCase();
//if (!(tblUrlLowerCase.startsWith('http://') || tblUrlLowerCase.startsWith('https://'))) return;
	var maxlen = 500;
	var tabUrlShort = tabUrl.substr(0, maxlen);
	var tabRefShort = tabRef ? tabRef.substr(0, maxlen) : null;
	if (tabUrlShort === avwgBg.lastTab.url) return;
	var p = {};
	p.browser = GL_BROWSER;
	p.linkUrl = tabUrlShort;
	p.linkRef = tabRefShort;
	p.plId = avwgBg.plId;
	avwgBg.lastTab.url = tabUrlShort;
	var req = {t: 'tabUrlChangeExt', p: p};
	clog('blue', req.t, p);
	avwgBg.postPromise(req).done(function (res) {
		clog('magenta', req.t, res);
	});
};
function bgInit() {
	clog('green', 'bgInit', {plId: avwgBg.plId});
	
	var lastUrlChr = null;
	setInterval(function () {
		chrome.tabs.query({
			active: true,
			lastFocusedWindow: true
		}, function (tabs) {
			if (!(tabs && tabs[0])) return;
			var tab = tabs[0];
			if (!tab || tab.url === lastUrlChr) return;
			lastUrlChr = tab.url;
			avwgBg.onUrlChange(lastUrlChr, null);
		});
	}, cnf.timerInterval);

	chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
		switch (msg.action) {
			case 'dlog':
				clog('blue', 'dlog', msg);
				break;
			case 'internalPlId':
				console.log("==3")

				sendResponse({
					plId: avwgBg.plId
				});
				return true;
				/* group of actions with plId */
			case "mainInitExt":
			case "extActGetPage":
//case "extActSavePrefs":
				if (!msg.data) msg.data = {};
				msg.data.plId = avwgBg.plId;
				/* no break! */

				/* group of actions without plId */
			case 'usrMyLinksLinkSaveExt':
				var req = {t: msg.action, p: msg.data};
				avwgBg.postPromise(req).done(function (res) {
//if (msg.action === 'mainInitExt') {
//hasDemographics = res.data.hasDemographics;
//}
					sendResponse(res);
				});
				return true; //This function becomes invalid when the event listener returns, unless you ***return true*** from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until sendResponse is called). 
		}
	});


//	chrome.runtime.onInstalled.addListener(function (msg, sender, sendResponse) {
//		console.log("==onInstalled")
//	});
//
//	chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) {
//		console.log("==onMessageExternal")
//	});
//

//reload mywebook tabs
//	chrome.tabs.query({url: cnf.serverUrl + "/*"}, function (tabs) {
//		tabs.forEach(function (tab) {
//			//chrome.tabs.reload(t.id);
//			console.log("===tab", tab.url)
//		});
//	});

	chrome.tabs.query({/*lastFocusedWindow: true,*/ url: cnf.serverUrl + "/*"}, function (tabs) {
		tabs.forEach(function (tab) {
			console.log("mywebook url:", tab.url)
			chrome.tabs.executeScript(tab.id, {file: '/data/content/content.js'}, function (resp) {
				console.log("executeScript response:", resp)
			});

			//chrome.tabs.update(tabs[0].id, {url: url, "active": true});
		});
	});
}
