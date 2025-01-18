"use strict";
setTimeout(function () { sendAllLinks() }, 300);
setInterval(function () { sendAllLinks() }, 500);

function isForbidden() {
	if (!document.location.href)
		return false;
	if (document.location.protocol != "https:")
		return true; // Not Allowed    
	return false;
}

var lastUrl = false;
var allUrlsList = [];
var loadedUrlsList = [];
function sendAllLinks() {
	let url = document.location.href;
	if (lastUrl != url) {
		if (isForbidden()) {
			//console.log("Forbidden site");
			return;
		}
		let title = document.title;
		lastUrl = url;
		chrome.runtime.sendMessage({ msg: "msgSetUrl" }, function (response) {
			if (typeof (response) == 'undefined' && chrome.runtime.lastError)
				return;
			if (response) {
				if (document.location.href.indexOf("vimeo.com") >= 0)
					findVimeoVideos(response.tabId);
				else
					scanPage(response.tabId);
			}
		});
	}
}

function scanPage(tabId) {

	let url = document.location.href;
	allUrlsList = [];

	let html = document.documentElement.outerHTML;

	for (let formatCounter = 0; formatCounter < 5; formatCounter++) {
		let ext = formatCounter == 4 ? "webm" : formatCounter == 3 ? "m3u8" : formatCounter == 2 ? "mov" : formatCounter == 1 ? "flv" : "mp4";
		for (let offset = 0; ;) {

			let foundUrl = FindFirstUrl(html, "." + ext, offset);
			if (!foundUrl || !foundUrl.start)
				break;
			//console.log("###URL "+foundUrl.mp4);
			offset = foundUrl.start;

			let ob = { 'url': foundUrl.mp4, 'title': document.title, 'type': formatCounter == 3 ? "m3u8" : "video" }
			if (ob.url.indexOf(".m3u8") != -1) {
				ob.noDL = "m3u8";

			}
			ob.mime = "video/" + ext;

			addOnce(allUrlsList, ob);
		}
	}

	for (let curLink = 0; curLink < document.links.length; curLink++) {
		let link = document.links[curLink];
		let curUrl = isSupportedUrl(link.href);
		if (curUrl) {
			let title = '';
			if (link.hasAttribute('title'))
				title = myTrim(link.getAttribute('title'));
			if (!title && link.hasAttribute('alt'))
				title = myTrim(link.getAttribute('alt'));
			if (!title)
				title = myTrim(link.innerText);

			if (!title)
				title = document.title;
			let cl = "";
			if (link.hasAttribute('class'))
				cl = myTrim(link.getAttribute('class'));

			let ob = { 'url': curUrl, 'title': title, 'class': cl, 'id': (link.id ? link.id : ""), 'value': '', 'type': 'extern' };
			addOnce(allUrlsList, ob);
		}
	}

	let type = "video";
	let aVideoTags = document.getElementsByTagName('video');
	for (let curTag = 0; curTag < aVideoTags.length; curTag++) {
		let link = aVideoTags[curTag];
		let curUrl = false;
		if (link.src)
			curUrl = link.src;
		if (!curUrl && link.hasAttribute('data-thumb')) {
			curUrl = myTrim(link.getAttribute('data-thumb'));
			if (curUrl.indexOf("http") == -1)
				curUrl = "http:" + curUrl;
		}
		curUrl = isSupportedUrl(curUrl);
		if (curUrl) {
			let title = '';
			if (link.hasAttribute('alt'))
				title = myTrim(link.getAttribute('alt'));
			else if (link.hasAttribute('title'))
				title = myTrim(link.getAttribute('title'));
			if (!title)
				title = document.title;
			let cl = "";
			if (link.hasAttribute('class'))
				cl = myTrim(link.getAttribute('class'));

			addOnce(allUrlsList, { 'url': curUrl, 'title': title, 'type': type });
		}
	}

	if (tabId != -1) {
		let fGreenArrow = false;
		if (allUrlsList.length > 0)
			fGreenArrow = true;

		if (fGreenArrow) {
			chrome.runtime.sendMessage({ "msg": "msgSetIcon", "tabId": tabId, "fVideo": true }, function (response) {
				if (typeof (response) == 'undefined' && chrome.runtime.lastError)
					return;
			});
		}

	}
}

function myTrim(txt) {
	if (!txt)
		return '';
	return txt.replace(/^[\s_]+|[\s_]+$/gi, '').replace(/(_){2,}/g, "_");
}

function isSupportedUrl(url) {
	if (!url || !url.toLowerCase)
		return false;
	if ((url.toLowerCase().indexOf('javascript:') != -1) || (url.toLowerCase().indexOf('javascript :') != -1))
		return false;
	if ((url.toLowerCase().indexOf('mailto:') != -1) || (url.toLowerCase().indexOf('mailto :') != -1))
		return false;
	if (url.indexOf("data:image") != -1)
		return false;
	if ((url.indexOf(".mp4") == -1) && (url.indexOf(".flv") == -1) && (url.indexOf(".mov") == -1) && (url.indexOf(".webm") == -1))
		return false;
	return url;
}

function checkStatus(response) {
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} - ${response.statusText}`);
	}
	return response;
}

async function myFetch(url, filename) {

	let div = document.createElement("div");
	div.style.position = "fixed";
	div.style.right = "10px";
	//div.style.width  = "200px";
	div.style.padding = "5px 10px";
	div.style.top = "10px";
	//div.style.height  = "70px";
	div.style.background = "#eee";
	div.style.border = "1px solid #333"
	div.style.zIndex = "99999999";

	document.body.appendChild(div);

	let txt = document.createElement("p");
	txt.style.color = "#333";
	txt.textContent = chrome.i18n.getMessage("downloading");
	txt.style.fontSize = "12px";
	txt.style.fontWeight = "bold";
	div.appendChild(txt);
	txt = document.createElement("p");
	txt.style.color = "#333";
	txt.textContent = chrome.i18n.getMessage("downloading2");
	txt.style.fontSize = "10px";
	div.appendChild(txt);
	txt = document.createElement("p");
	txt.style.color = "#333";
	txt.style.fontSize = "12px";
	txt.textContent = chrome.i18n.getMessage("wait");
	txt.id = "idProgress566578";
	div.appendChild(txt);


	// Step 1: start the fetch and obtain a reader
	let ref = document.location.href;
	let response = await fetch(url, { referrer: ref });

	const reader = response.body.getReader();

	// Step 2: get total length
	const contentLength = +response.headers.get('Content-Length');

	// Step 3: read the data
	let receivedLength = 0; // received that many bytes at the moment
	let chunks = []; // array of received binary chunks (comprises the body)
	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		chunks.push(value);
		receivedLength += value.length;

		let perc = parseInt(receivedLength * 1000 / contentLength) / 10;
		let mb = parseInt(receivedLength / 1024 * 10 / 1024) / 10;
		let txt = document.getElementById("idProgress566578");
		let t = chrome.i18n.getMessage("downloading3").replace("0", mb);
		txt.textContent = t + " (" + perc + "%)";
		//console.log("*Received ${receivedLength} of ${contentLength}")
	}

	// Step 4: concatenate chunks into single Uint8Array
	let blob = new Blob(chunks);
	//console.log("save");
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
	document.body.removeChild(div);
}



async function getContentLengthOld(url, sendResponse) {
	let response = await fetch(url);
	const reader = response.body.getReader();
	// Step 2: get total length
	const contentLength = +response.headers.get('Content-Length');
	//console.log("getlength "+contentLength+ "   "+sendResponse);
	sendResponse({ "len": contentLength });
}
function getContentLength(url, idcontrol) {//alert("send Reponse kommt nicht an, da async");
	let ref = document.location.href;
	fetch(url, { referrer: ref }).then(response => {
		const reader = response.body.getReader();
		// Step 2: get total length
		const contentLength = +response.headers.get('Content-Length');
		//console.log("***getlength "+contentLength+ "   "+idcontrol+"  "+url);
		chrome.runtime.sendMessage({ msg: "msgReturnContentLength", len: contentLength, idcontrol: idcontrol }, function (response) {
			if (typeof (response) == 'undefined' && chrome.runtime.lastError)
				return;
		});
	});
}

function addOnce(anyArray, item) {
	for (let entry = 0; entry < anyArray.length; entry++) {
		if (anyArray[entry].url == item.url) {
			if (anyArray[entry].len < item.len)
				anyArray[entry] = item;
			return;
		}
	}
	anyArray.push(item);
}

chrome.runtime.onMessage.addListener(

	function (request, sender, sendResponse) {
		if (sender.id != chrome.runtime.id)  // Accept only messages from our extension
			return;

		if (request.id == "msgAddToList") // Video gefunden von background.js
		{
			let item = request.item;
			if (!item.title || item.title.length == 0)
				item.title = document.title;
			addOnce(loadedUrlsList, item);
			//console.log("Video from background.js: "+JSON.stringify(item));
			return;
		}
		else if (request.id == "msgGetAllVideos") {
			if (document.location.href.indexOf("vimeo.com") >= 0)
				findVimeoVideos(-1); //  async
			else
				scanPage(-1);
			let aFoundVideos = [];
			for (let curLoaded = 0; curLoaded < loadedUrlsList.length; curLoaded++) {
				addOnce(aFoundVideos, loadedUrlsList[curLoaded]);
			}
			for (let curUrl = 0; curUrl < allUrlsList.length; curUrl++) {
				addOnce(aFoundVideos, allUrlsList[curUrl]);
			}
			sendResponse({ "videoUrls": aFoundVideos, "txt": "ergebnis" });
		}
		else if (request.id == "msgGetLength") {
			//console.log("###getlength "+request.url);
			getContentLength(request.url, request.idcontrol);
			//sendResponse({ "len":4546654});			
			return;
		}
		else if (request.id == "msgDownload") {

			if (document.getElementById("idProgress566578")) {
				alert("Please wait while the current download is finished");
				return;
			}
			//if ( confirm(request.txt))		

			console.log("Download " + request.url);
			myFetch(request.url, request.filename);
			//trackDownloadingOnXHR(request.url);
			return;

		}

	});


// find an url in an html text block
function FindFirstUrl(html, ext, start) {

	for (; ;) {
		let currentResult = html.indexOf(ext, start)
		if (currentResult < 0)
			return false;
		start = currentResult + ext.length;
		let resultFrom = html.indexOf('\"', currentResult);
		let resultTo = html.indexOf('\'', currentResult);
		let terminatingChar = false;
		if (resultFrom > currentResult && resultTo > currentResult) {

			terminatingChar = resultFrom > resultTo ? "\'" : "\"";
			if (resultFrom > resultTo)
				resultFrom = resultTo;
		}
		else if (resultFrom > currentResult) {
			terminatingChar = "\"";

		}
		else if (resultTo > currentResult) {
			terminatingChar = "\'";
			resultFrom = resultTo;
		}
		else
			continue;

		let resultFromMinus600 = resultFrom > 600 ? resultFrom - 600 : 0;
		let s = html.substr(resultFromMinus600, resultFrom - resultFromMinus600);
		resultTo = s.lastIndexOf(terminatingChar);
		if (resultTo < 0)
			continue;

		s = s.replace(/&amp;/g, '&');

		s = s.substr(resultTo + 1);
		if (s.indexOf("http://") == 0 || s.indexOf("https://") == 0)
			return { mp4: s, start: resultFrom };
		if (s.indexOf("http:\\/\\/") == 0 || s.indexOf("https:\\/\\/") == 0) {
			s = s.replace(/\\\//g, '\/');
			return { mp4: s, start: resultFrom };
		}

		let server = document.location.protocol + "//" + document.location.hostname;

		if (s.indexOf("/") == 0)
			return { mp4: server + s, start: resultFrom };
		if (s.indexOf("\\/") == 0) {
			s = s.replace(/\\\//g, '\/');
			return { mp4: server + s, start: resultFrom };
		}


		if (ext == ".m3u8" && (s.indexOf("\\/") == 0 || s.indexOf("/") == 0)) {
			s = s.replace(/\\\//g, '\/');
			return { mp4: s, start: resultFrom };
		}
		continue;
	}
}
//for Vimeo:

function FindFirstUrl_Vimeo(html, ext, resultTo) {
	while (1) {
		let resultFrom = html.indexOf(ext, resultTo);
		if (resultFrom < 0)
			return false;
		let resultTo = resultFrom;
		resultTo += ext.length;
		let l = html.length;
		while (resultFrom > 0 && html.charAt(resultFrom) != '"' && html.charAt(resultFrom) != '\'' && html.charAt(resultFrom) != '>') {
			resultFrom--;
		}
		if (html.charAt(resultFrom) == '>') {
			while (resultTo < l && html.charAt(resultTo) != '<') {
				resultTo++;
			}
		}
		else {
			while (resultTo < l && html.charAt(resultTo) != '"' && html.charAt(resultTo) != '\'') {
				resultTo++;
			}
		}
		resultFrom++;
		if (html.substr(resultFrom, 7) == "http://" || html.substr(resultFrom, 8) == "https://" || html.substr(resultFrom, 4) == "www." || html.substr(resultFrom, 5) == "/www.") {
			return [resultTo, html.substr(resultFrom, resultTo - resultFrom)]
		}
		else if (html.substr(resultFrom, 9) == "http:\\/\\/" || html.substr(resultFrom, 10) == "https:\\/\\/") {
			let url = html.substr(resultFrom, resultTo - resultFrom);
			url = url.replace(/\\\//g, "/");
			return [resultTo, url];
		}
		if (resultTo <= resultFrom)
			break;
	}
	return false;
}

function findVimeoVideos(tabId) {
	if (document.location.href.indexOf("vimeo.com") < 0)
		return;

	let xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open("GET", document.location.href, true);
	xmlHttpReq.onreadystatechange = function (data) {
		if (this.readyState != 4)
			return;
		findVimeoVideos2(tabId, this.responseText)
	}
	xmlHttpReq.send(null);
}
function GetVimeoId(url) {
	//if ( GetUrlParameter( url, L"clip_id", csId))
	//	return TRUE;
	let csId = url;
	let currentResult = csId.indexOf('?');
	if (currentResult >= 0)
		csId = csId.substr(0, currentResult);
	currentResult = csId.indexOf('#');
	if (currentResult >= 0)
		csId = csId.substr(0, currentResult);

	currentResult = csId.lastIndexOf('/');
	if (currentResult < 0)
		return false;
	csId = csId.substr(currentResult + 1);
	if (csId.length < 8)
		return false;
	for (let curChar = 0; curChar < csId.length; curChar++) {
		if (csId.charAt(curChar) < '0' || csId.charAt(curChar) > '9')
			return false;
	}
	return csId;
}
function findVimeoVideos2(tabId, html) {
	let sTextToFind = 'data-config-url="'
	let currentResult = html.indexOf(sTextToFind);
	let url = false;
	if (currentResult >= 0) {
		currentResult += sTextToFind.length;
		let resultTo = html.indexOf('"', currentResult);
		if (resultTo > currentResult)
			url = html.substr(currentResult, resultTo - currentResult);
	}
	if (!url) {
		let foundUrl = FindFirstUrl_Vimeo(html, "/config?", 0)
		if (foundUrl)
			url = foundUrl[1];
	}
	if (!url) {
		let id = GetVimeoId(document.location.href);
		if (!id)
			return;
		url = "https://player.vimeo.com/video/" + id;
	}
	url = url.replace(/&amp;/g, "&");
	let xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open("GET", url, true);
	xmlHttpReq.onreadystatechange = function (data) {
		if (this.readyState != 4)
			return;
		let sLoadedText = this.responseText;
		let sTextToFind = '"title":"';
		let iPosOfTitle = sLoadedText.indexOf(sTextToFind);
		title = document.title;
		if (iPosOfTitle >= 0) {
			iPosOfTitle += sTextToFind.length;
			for (let j = iPosOfTitle; j + 1 < sLoadedText.length; j++) {
				if (sLoadedText.charAt(j) == '\\') // Backslash vor Gänsefüßchen zählt nicht
					j++;
				else if (sLoadedText.charAt(j) == '\"')
					break;
			}
			if (j + 1 < sLoadedText.length)
				title = sLoadedText.substr(iPosOfTitle, j - iPosOfTitle);
		}
		let start = 0;
		allUrlsList = [];
		while (1) {
			let foundUrl = FindFirstUrl_Vimeo(sLoadedText, ".mp4", start);
			if (!foundUrl)
				break;
			start = foundUrl[0];
			let iPosOfHeight = sLoadedText.indexOf('"height":', start);
			let h = 0;
			if (iPosOfHeight > 0)
				h = parseInt(sLoadedText.substr(iPosOfHeight + 9));

			let url = foundUrl[1];
			addOnce(allUrlsList, { 'url': url, 'title': title + " (" + h + "p)", 'type': 'video' });
			//allUrlsList.push({'url': url,'title': title+" ("+h+"p)", 'type': 'video'});
		}
		if (tabId != -1) {
			let fGreenArrow = false;
			if (allUrlsList.length > 0)
				fGreenArrow = true;

			if (fGreenArrow) {
				chrome.runtime.sendMessage({ "msg": "msgSetIcon", "tabId": tabId, "fVideo": true }, function (response) {
					if (typeof (response) == 'undefined' && chrome.runtime.lastError)
						return;
				});
			}
		}
	}
	xmlHttpReq.send(null);
}
