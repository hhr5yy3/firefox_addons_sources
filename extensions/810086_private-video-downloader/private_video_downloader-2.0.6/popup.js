"use strict";

var aTxt = ['language', 'idvideo', 'rights', 'idVDL', 'idnovideo', 'idwhy', "idwait1", "idwait2", "iddownload", "idmb", "more", "downloadtt",
	'idoptions',
	'idhistoryTxt',
	'idhistory_enableTxt',
	'idhistory_settings',
	'idhistory_deleteall',
	'idhistory_deleteCookies',
	'idhistory_deleteAllCookies',
	'idhome',
	'idsimilar',
	'idVDL',
	'idnovideo',
	'idwhy'];
var translatedText = {};
for (let curTxt = 0; curTxt < aTxt.length; curTxt++)
	translatedText[aTxt[curTxt]] = chrome.i18n.getMessage(aTxt[curTxt]);

function GetFileExtension(videoObject) {
	if (videoObject.ext && typeof (videoObject.ext) == "string")
		return videoObject.ext;
	var ext = ["m3u8", "flv", "webm", "mp4", "3g", "wmv", "mpg", "m4p", "m4v", "webm"];
	for (let curExt = 0; curExt < ext.length; curExt++) {
		if (videoObject.mime && videoObject.mime.indexOf(ext[curExt]) >= 0) {
			return ext[curExt];
		}
	}

	for (let curExt = 0; curExt < ext.length; curExt++) {
		if (videoObject.url & videoObject.url.toLowerCase().indexOf(ext[curExt]) >= 0) {
			return ext[curExt];
		}
	}
	return "mp4";
}

function OnUltimate(mode) {
	if (mode != "m3u8")
		chrome.tabs.create({ "url": "https://videodownloaderultimate.com/?p=firefox", "active": true }, function (tab) { });
	else
		chrome.tabs.create({ "url": "https://videodownloaderultimate.com/?p=m3u8_firefox", "active": true }, function (tab) { });
}

function OnDownloadVideo(ev) {

	var saveAs = localStorage.getItem("AskLocation");
	saveAs = (saveAs == "true");
	var videoIndex = parseInt(ev.srcElement.id.slice(4));
	if (videoIndex < videoUrls.length) {
		let fname = getFilename(videoUrls[videoIndex]);
		if (videoUrls[videoIndex].status >= 400) {
			chrome.tabs.sendMessage(curTabId, { id: "msgDownload", url: videoUrls[videoIndex].url, saveAs: saveAs, filename: fname }, function (response) {
				if (typeof (response) == 'undefined' && chrome.runtime.lastError)
					return;
				window.close();

			});
		}
		else {
			var options = { url: videoUrls[videoIndex].url, filename: fname, saveAs: saveAs };
			chrome.downloads.download(options, function (downloadId) {

			});
			chrome.downloads.onCreated.addListener(
				function (downloadItem) {
					window.close();
				});

		}
		chrome.storage.local.get('video_downloads', function (data) {
			var count = parseInt(data["video_downloads"]);
			if (!count)
				count = 0;
			count++;
			chrome.storage.local.set({ 'video_downloads': count }, function () { });
			if (count == 10) {
				let txt = chrome.i18n.getMessage("idreview");
				if (confirm(txt))
					chrome.tabs.create({ "url": "https://addons.mozilla.org/de/firefox/addon/video-downloader-profession/reviews/", "active": true }, function (tab) { });

			}
		});
	}
}

function OnPlayVideo(ev) {
	var videoIndex = parseInt(ev.id.slice(7));
	if (videoIndex < videoUrls.length) {
		window.open(videoUrls[videoIndex].url, "_blank", 'resizable=yes, scrollbars=no, titlebar=yes, width=800, height=600');
	}
}

function getFilename(videoObject) {
	let fname = "";
	for (let curPos = 0; curPos < videoObject.title.length; curPos++) {

		let curChar = videoObject.title.charAt(curPos);
		if (curChar < ' ')
			continue;
		if ("<>\\/\"\':;|*?".indexOf(curChar) >= 0)
			fname += '_';
		else
			fname += curChar;
	}
	fname += "." + GetFileExtension(videoObject);
	return fname;
}

var curTabId = 0;
var videoUrls = 0;

function hideControl(id) {
	let element = document.getElementById(id);
	if (element)
		element.style.display = "none";
}
function showControl(id) {
	let element = document.getElementById(id);
	if (element)
		element.style.display = "block";
}

var lastBest = false;
var lastBytes = 0;
function markBestResult(id, bytes) {

	let element = document.getElementById(id);
	element.bytes = bytes;

	if (bytes && bytes > lastBytes) {
		//console.log( id+" - "+bytes);
		if (lastBest)
			lastBest.style.background = '#fff';
		lastBest = element;
		lastBytes = bytes;
		lastBest.style.background = '#ddd';
	}
}

function getLength2(idControl, entry) {
	chrome.tabs.sendMessage(curTabId, { id: "msgGetLength", url: entry.url, idcontrol: idControl }, function (response) {
		//console.log("len: "+response.len+"  id:"+idControl);
		if (typeof (response) == 'undefined' && chrome.runtime.lastError)
			return;
	});
}

function removeAllChilds(element) {
	if (!element)
		return;
	var c = element.firstChild;
	while (c) {
		element.removeChild(c);
		c = element.firstChild;
	}
}
function co(type, parent, params, text) {
	var element = document.createElement(type);
	if (text)
		element.textContent = text;
	if (params) {
		for (var item in params) {
			element.setAttribute(item, params[item]);
		}
	}
	if (parent)
		parent.appendChild(element);
	return element;
}

function myAlert(txt) {
	document.body.style.minHeight = "180px";
	alert(txt);
	document.body.style.minHeight = "0px";
}

function myGetSize(idControl, videoObject, url) {
	var client = new XMLHttpRequest();
	var bytes = 0;
	client.idControl = idControl;
	client.videoObject = videoObject;
	client.onreadystatechange = function () {
		if (this.readyState >= 2) {
			if (this.status == 0) {
				return;
			}
			let element = document.getElementById("idd_" + this.idControl);
			if (element) {
				//element.style.background="#f00";
				var bytes = parseInt(this.getResponseHeader("Content-Length"));
				if (this.status >= 400) {
					this.videoObject.status = this.status;
					element.textContent = "";
					co('span', element, false, "Forbidden");
					co('br', element, false);
					co('span', element, false, this.status);

					getLength2(this.idControl, this.videoObject);
					let element2 = document.getElementById("idd_item_" + this.idControl);
					//element.style.display="none";								
					element2.style.opacity = 0.7;
					bytes = 0;
				}
				else if (!bytes) {
					bytes = 0;
					element.textContent = "";
					co('span', element, false, "Download");
					co('br', element, false);
					co('span', element, false, "? MB");
				}
				else {
					if (bytes < 1000 && this.videoObject.len > 1000)
						bytes = this.videoObject.len

					this.videoObject.bytes = bytes;

					var mb = Math.floor(bytes * 100 / 1024 / 1024) / 100;
					element.innerText = "Download " + mb + "MB";
					element.title = ""
				}
				if (bytes > 0)
					markBestResult("idd_item_" + this.idControl, bytes);
			}
			client.abort();
		}
	}
	client.open("HEAD", url);
	client.send();
}



function showVideoUrls() {
	let parent = document.getElementById("idVideos");
	if (!videoUrls) {
		let element = document.getElementById("idNoVideo");
		if (element) {
			co('div', element, { 'id': 'sep4' });
			co('span', element, false, translatedText["idnovideo"]);
			var li = co('a', element, { 'style': 'margin-left:10px', 'href': '#' }, translatedText["idwhy"]);
			co('br', element, {});
			co('br', element, {});
			co('span', element, false, translatedText["idrefresh"]);
			//co('div', element, { 'id': 'sep4' });
			element.style.display = "block";

			element = li;
			element.addEventListener('click', function (e) {
				e.stopPropagation();
				let width = 500;
				let height = 220;
				let left = (screen.width / 2) - (width / 2);
				let top = (screen.height / 2) - (height / 2);

				chrome.tabs.get(curTabId, function (tab) {
					if (tab) {
						var url = "./novideo.html?url=" + escape(tab.url);
						window.open(url, "_blank", 'resizable=no, scrollbars=no, titlebar=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
						window.close();
					}
				});
				return true;
			});
		}
	}

	var hasM3u = false;
	if (videoUrls) {
		//videoUrls.push(videoUrls[0]);
		for (var curVideoPos = 0; curVideoPos < videoUrls.length; curVideoPos++) {

			let videoObject = videoUrls[curVideoPos];

			if (videoObject.noDL == "m3u8") {
				if (hasM3u)
					continue; // only one m3u entry
				else
					hasM3u = true;

			}
			var url = videoObject.url;
			var ext = GetFileExtension(videoObject);
			if (!curVideoPos) {
				co('div', parent, { 'class': 'sep' });
				co('div', parent, { 'class': 'clHeader' }, translatedText["idVDL"]);

			}
			else
				co('div', parent, { 'class': 'sep2', 'id': 'idd_sep_' + curVideoPos });


			var color = "#aaa";
			if (ext == "flv")
				color = "#acf";
			else if (ext == "webm")
				color = "#acf";
			else if (ext == "mp4" || ext == "m4v")
				color = "#af9";
			else if (ext == "mp4" || ext == "m4v")
				color = "#af1";
			else if (ext == "3g")
				color = "#faa";
			else if (ext == "wmv")
				color = "#aff";

			let item = co('div', parent, { 'class': 'clItem', 'id': 'idd_item_' + curVideoPos });
			let newClassName = "";
			let sDescription = "";
			if (videoObject.res) {
				newClassName = "clFileExt";
				sDescription = ext + " " + videoObject.res;
			}
			else {
				newClassName = "clFileExt2";
				sDescription = ext;
			}

			if ((ext == "mp4" || ext == "mov" || ext == "webm") && videoObject.url != "CANNOTPLAY") {
				var di1 = co('div', item, { 'id': 'idd_pp_' + curVideoPos, 'class': newClassName, 'style': 'cursor:pointer;background-color:' + color + ';' });
				var di2 = co('div', di1, { 'style': 'position:absolute;right:4px;top:4px;z-index:1;' });
				co('img', di2, { 'height': '24px', 'src': './png/pp.png' });
				co('div', di1, { 'style': 'position:relative;z-index:2;' }, sDescription);

			}
			else {
				var di1 = co('div', item, { 'class': newClassName, 'style': 'background-color:' + color + ';' });
				co('div', di1, { 'style': 'position:relative;z-index:2;' }, sDescription);
			}
			if ((ext == "mp4" || ext == "mov" || ext == "webm") && videoObject.url != "CANNOTPLAY") {
				co('div', item, { 'style': 'width:192px', 'class': 'clDownloadVideo', 'id': 'idv_' + curVideoPos, 'title': url }, getFilename(videoObject));
			}
			else if (ext == "m3u8")
				co('div', item, { 'style': 'width:192px', 'class': 'clDownloadVideo', 'id': 'idv_' + curVideoPos, 'title': url }, translatedText["more"]);
			else
				co('div', item, { 'style': 'width:192px', 'class': 'clDownloadVideo', 'id': 'idv_' + curVideoPos, 'title': url }, getFilename(videoObject));

			if (videoObject.noDL == "m3u8") {
				let element2 = co('div', item, { 'class': 'clNODownloadButton clNODownloadButtonM3U8' });
				co('img', element2, { 'width': '19px', 'src': './png/no.png' });
			}
			else if (videoObject.noDL) {
				let element2 = co('div', item, { 'class': 'clNODownloadButton clNODownloadButtonNoDl' });
				co('img', element2, { 'width': '19px', 'src': './png/no.png' });
			}
			else {
				if (videoObject.bytes) {
					var mb = Math.floor(videoObject.bytes * 100 / 1024 / 1024) / 100;
					co('div', item, { 'id': 'idd_' + curVideoPos, 'class': 'clDownloadButton' }, "Download " + mb + "MB");
				}
				else {
					co('div', item, { 'id': 'idd_' + curVideoPos, 'class': 'clDownloadButton', 'title': translatedText["idwait1"] }, translatedText["idwait2"]);
				}
			}

			if (videoObject.bytes > 0) {
				markBestResult("idd_item_" + curVideoPos, videoObject.bytes);
			}
			if (!videoObject.bytes && !videoObject.noDL) {
				myGetSize(curVideoPos, videoObject, url);

			}
		}
	}

	let element = document.getElementById("idAdd");
	if (element)
		element.addEventListener('click', OnSP24NavigateAddVideo2);

	if (videoUrls) {
		for (let curVideoPos = 0; curVideoPos < videoUrls.length; curVideoPos++) {
			element = document.getElementById("idd_" + curVideoPos);
			if (element)
				element.addEventListener('click', OnDownloadVideo);
			//var element = document.getElementById("idd_cc_"+curVideoPos);
			//if (element)
			//  element.addEventListener('click', function(){OnPlayVideo(this)});    
			element = document.getElementById("idd_pp_" + curVideoPos);
			if (element)
				element.addEventListener('click', function () { OnPlayVideo(this) });
		}
	}

	let aElements = document.getElementsByClassName("clNODownloadButtonM3U8");
	for (let curElement = 0; curElement < aElements.length; curElement++) {
		aElements[curElement].addEventListener('click', function () { OnUltimate("m3u8") });
	}
	aElements = document.getElementsByClassName("clNODownloadButtonNoDl");
	for (let curElement = 0; curElement < aElements.length; curElement++) {
		aElements[curElement].addEventListener('click', function () { OnUltimate("yt") });
	}
}

function SetLanguage() {
	for (var curtext in translatedText) {
		let element = document.getElementById(curtext);
		if (element)
			element.textContent = translatedText[curtext];
	}
}

var crctable = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
function crc32( /* String */ str, /* Number */ crc) {
	if (crc == window.undefined) crc = 0;
	var n = 0; //a number between 0 and 255 
	var x = 0; //an hex number 
	crc = crc ^ (-1);
	for (var i = 0, iTop = str.length; i < iTop; i++) {
		n = (crc ^ str.charCodeAt(i)) & 0xFF;
		x = "0x" + crctable.substr(n * 9, 8);
		crc = (crc >>> 8) ^ x;
	}
	return crc ^ (-1);
}
chrome.runtime.onMessage.addListener(function (details, sender) {
	if (sender.id != chrome.runtime.id)  // Accept only messages from our extension
		return;

	if (details.msg == "msgReturnContentLength") {
		//console.log("len: " + details.len + "  id:" + details.idcontrol);
		if (typeof (response) == 'undefined' && chrome.runtime.lastError)
			return;

		let bytes = parseInt(details.len);
		//videoObject.bytes = bytes;

		let mb = Math.floor(bytes * 100 / 1024 / 1024) / 100;
		let element = document.getElementById("idd_" + details.idcontrol);
		if (element) {
			element.textContent = "Download " + mb + "MB";
			element.style.color = "#ff7";
			element.title = translatedText["downloadtt"];
		}
		return;
	}

});


function getCurrentTabAsync(callback) {
	chrome.windows.getCurrent(function (win) {
		chrome.tabs.query({ active: true }, function (tab) {
			if (!tab)
				return;
			for (let curTab = 0; curTab < tab.length; curTab++) {
				if (tab[curTab].windowId == win.id) {
					console.log("Tab found " + win.id + "   " + tab[curTab].id);
					callback(tab[curTab]);
					return;
				}
			}
		});
	});
}

function OnOptions() {

	let fullURL = browser.runtime.getURL("options.html");
	let width = 700;
	let height = 550;
	let left = (screen.width / 2) - (width / 2);
	let top = (screen.height / 2) - (height / 2);
	window.open(fullURL, "_blank", 'resizable=no, scrollbars=no, titlebar=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

var fShowHistory = false;
var fHistoryEnabled = false;
function AddHistoryEvent(element) {
	var id = element.id;
	element.addEventListener('click', function () {
		if (id == "idhistory") {
			SetShowHistory(!fShowHistory)
			localStorage.setItem("ShowHistory", fShowHistory ? "visibile" : "hidden");
		} else if (id == "idhistory_enable") {
			fHistoryEnabled = !fHistoryEnabled;
			localStorage.setItem("HistoryEnabled", fHistoryEnabled ? 1 : 0);
			document.getElementById("idhistoryEnabled").style.visibility = fHistoryEnabled ? "visible" : "hidden";
			chrome.runtime.sendMessage({
				msg: "msgHistory",
				cmd: "enable",
				enable: fHistoryEnabled
			}, function (response) { });
		} else if (id == "idhistory_deleteall") {
			chrome.runtime.sendMessage({
				msg: "msgHistory",
				cmd: "deleteAll"
			}, function (response) { });
		} else if (id == "idhistory_deleteCookies") {
			chrome.runtime.sendMessage({
				msg: "msgHistory",
				cmd: "deletePrivateCookies"
			}, function (response) { });
		} else if (id == "idhistory_deleteAllCookies") {
			chrome.runtime.sendMessage({
				msg: "msgHistory",
				cmd: "deleteAllCookies"
			}, function (response) { });
		} else if (id == "idhistory_settings") {
			OnOptions();
			return;
		}
	});
}
function SetShowHistory(show) {
	fShowHistory = show;
	document.getElementById("idArrow").className = fShowHistory ? "clArrowDown" : "clArrowRight";
	let elements = document.getElementsByClassName("clHistoryEntry");
	for (let curElement = 0; curElement < elements.length; curElement++) {
		elements[curElement].style.display = fShowHistory ? "block" : "none";
	}
}


document.addEventListener('DOMContentLoaded', function () {
	SetLanguage();

	getCurrentTabAsync(function (tab) {
		if (!tab)
			return;

		curTabId = tab.id;

		// Youtube-----
		if (tab.url.indexOf("youtube.com/watch") >= 0) {
			var url = tab.url;
			var title = tab.title;
			var xmlHttpReq = new XMLHttpRequest();
			xmlHttpReq.open("GET", url, true);

			xmlHttpReq.onreadystatechange = function (data) {
				if (this.readyState != 4)
					return;
				var txt = this.responseText;
				if (addYtVideos(txt, title))
					showVideoUrls();
			}
			xmlHttpReq.send(null);

		}
		else {
			chrome.tabs.sendMessage(curTabId, { id: "msgGetAllVideos" }, function (response)
			//			chrome.runtime.sendMessage({ msg: "OnSP24GetVideoUrls", tabId: curTabId }, function (response)
			{
				if (typeof (response) == 'undefined' && chrome.runtime.lastError)
					return;
				//alert( response.videoUrls);

				videoUrls = response.videoUrls;
				if (videoUrls && videoUrls.length == 0)
					videoUrls = false;
				showVideoUrls();

			});
		}

	});

	// Ads--------
	var ad = parseInt(Math.random() * 10000) + 1;
	if (ad < 6000) {
		var lang = "en";
		if (translatedText["language"] == "de")
			lang = "de";
		let element = document.getElementById("idAd");
		if (element) {
			element.href = "https://videodownloaderultimate.com/ads/?click=1&lang=" + lang + "&cid=" + ad;
			element = document.getElementById("idAdImg");
			element.src = "https://videodownloaderultimate.com/ads/?lang=" + lang + "&cid=" + ad;
		}
	}


	// History menu--------
	let fShowHistory = localStorage.getItem("ShowHistory") != "hidden";
	if (!fShowHistory)
		fShowHistory = false;
	SetShowHistory(fShowHistory)

	fHistoryEnabled = localStorage.getItem("HistoryEnabled") == 1;
	if (!fHistoryEnabled)
		fHistoryEnabled = false;
	document.getElementById("idhistoryEnabled").style.visibility = fHistoryEnabled ? "visible" : "hidden";

	let divs = document.querySelectorAll('div');
	for (let curDiv = 0; curDiv < divs.length; curDiv++) {
		if (divs[curDiv].id == "idoptions")
			divs[curDiv].addEventListener('click', OnOptions);
		else if (divs[curDiv].id == "idhome")
			divs[curDiv].addEventListener('click', OnHome);
		else if (divs[curDiv].id.indexOf("idhistory") >= 0) {
			AddHistoryEvent(divs[curDiv]);
		}
	}
});

function OnHome() {
	var url = "https://www.videodownloaderultimate.com";
	chrome.runtime.sendMessage({
		msg: "msgNavigate",
		url: url
	}, function (response) { window.close(); });
}

/// Youtube -----------------------------
function addYtVideos(html, title) {
	var j1 = html.indexOf("args");
	var j3 = html.indexOf('\\\"title\\\":', j3);
	if (j3 >= 0) {
		j3 = html.indexOf(':', j3);
		j3 = html.indexOf('\\\"', j3);
		if (j3 >= 0) {
			j3 += 2;
			j4 = html.indexOf('\\\"', j3);
			title = html.substr(j3, j4 - j3);
		}
	}

	let res = false;
	for (let mode = 0; mode < 2; mode++) {
		var fBackslashes = true;
		if (mode == 0) {
			j1 = html.indexOf('\\\"formats\\\":[');
			if (j1 < 0) {
				fBackslashes = false;
				j1 = html.indexOf('\"formats\":[');
			}
		}
		else {
			j1 = html.indexOf('\\\"adaptiveFormats\\\":[');
			if (j1 < 0) {
				fBackslashes = false;
				j1 = html.indexOf('\"adaptiveFormats\":[');
			}
		}

		if (j1 < 0)
			continue;
		j1 = html.indexOf('[', j1);
		var j2 = html.indexOf(']', j1);
		let formats = "";
		if (j2 > j1)
			formats = html.substr(j1, j2 - j1 + 1);
		else
			formats = html.substr(j1);

		if (fBackslashes) {
			formats = formats.replace(/\\\"/g, "\"");
			formats = formats.replace(/\\\//g, "\/");
			formats = formats.replace(/\\\\/g, "\\");
		}
		formats = "{\"a\":" + formats + "}";

		//console.log("v: "+formats);
		let formatJson = JSON.parse(formats);
		if (!formatJson)
			return false;


		let aFormats = formatJson.a;
		for (let curFormatPos = 0; curFormatPos < aFormats.length; curFormatPos++) {
			let height = aFormats[curFormatPos].height;
			var url = aFormats[curFormatPos].url;
			if (height)
				height += "p";
			else if (aFormats[curFormatPos].mimeType && aFormats[curFormatPos].mimeType.indexOf("audio") >= 0)
				height = "audio";
			else
				height = "?";

			var videoObject = { url: (!url || mode == 1) ? "CANNOTPLAY" : url, mime: aFormats[curFormatPos].mimeType, res: height, title: title, noDL: (!url || mode == 1) };
			if (!videoUrls)
				videoUrls = [];
			videoUrls.push(videoObject);
			res = true;
		}
		//alert( formats);
	}
	return res;
}
