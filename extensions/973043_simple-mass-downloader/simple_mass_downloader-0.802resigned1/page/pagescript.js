

var alreadyInjected = true;
var dialogUrl = chrome.runtime.getURL("ui/quick.html");

var regCallable = /\w+\(('|")(.+?)\1\)\s*;?(\s*return|$)/;
function testCallable(str) {

	if (!regCallable.test(str)) return false;
	if (
		/\\('|")/.test(str)) return false; 
	let seq = str.match(regCallable)[2].split(/('|")\s*,\s*\1/).map((s) => s.trim()).filter((s) => s.length > 1);
	for (let s of seq) {
		if (/('|")/.test(s)) return false; 
	}
	if (seq.length > 0) return seq;
	return false;
}

function getAbsoluteHref(str) {
	var a = document.createElement("a");
	a.setAttribute("href", str);
	return a.href;
}

function xout(L, x) {
	while (L.includes(x)) {
		L.splice(L.indexOf(x), 1);
	}
}

function removeDuplicateURLs(L) {
	let result = [];
	let index = {};
	for (let obj of L) {
		let olds = index[obj.mainUrl];
		if (olds) {
			let props = Object.keys(obj);

			if(obj.tag === "IMG") olds.forEach((old) => old.tag = "IMG");
			else {
				let oldTags = olds.map((old) => old.text);
				if(oldTags.includes("IMG")) obj.tag = "IMG";
			}

			if(props.includes("naturalWidth") && obj["naturalWidth"]){
				for(let old of olds) old["naturalWidth"] = obj["naturalWidth"];
			}
			if(props.includes("naturalHeight") && obj["naturalHeight"]){
				for(let old of olds) old["naturalHeight"] = obj["naturalHeight"];
			}

			let bool1 = false;

			if(obj.text){
				olds.slice(0).forEach((old) => {
					if(!old.text) {
						xout(olds, old);
						xout(result, old);
					}
				});

				let texts = olds.map((old) => old.text);
				if(!texts.includes(obj.text)) {
					bool1 = true;
				}
			}

			if(bool1){
				index[obj.mainUrl].push(obj);
				result.push(obj);
				continue;
			}
		}
		else {
			index[obj.mainUrl] = [obj];
			result.push(obj);
		}
	}
	return result;
}

function parseSrcSet(img) {
	let L = [];
	img.srcset.split(",").forEach((str) => {
		let result = {};
		let parts = str.split(" ").map((x) => x.trim()).filter((x) => x.length > 0);
		if (parts.length === 0) return;
		result.urlPart = reg_start_url.test(parts[0]) ? parts[0] : getAbsoluteHref(parts[0]);
		if (parts.length === 2) result.nr = parseFloat(parts[1].replace(/[^\d.]/g, ""));
		else result.nr = 0;
		L.push(result);
	});
	L.sort((x, y) => y.nr - x.nr);
	return L;
}

function extractItemData(node, targetLink) {
	let obj = {};
	let url = "";
	let isExtraImg = false;
	if (!targetLink && node.hasAttribute("srcset")) {
		let L = parseSrcSet(node);
		if (L.length > 0 && L[0].urlPart) {
			url = L[0].urlPart;
			isExtraImg = true;
			if (L.length >= 2 && L[-1 + L.length].urlPart) {
				obj.helperSrc = L[-1 + L.length].urlPart;
			}
		}
	}
	if (!url) {
		if (node.getAttribute("src")) url = node.src;
		else if (node.getAttribute("href")) url = node.href;
		else if (node.getAttribute("cite")) url = node.cite;
		else if (node.getAttribute("poster")) url = node.poster;
	}

	if (targetLink) obj.originalUrl = url;
	if (node.hasAttribute("data-smd-url")) {
		url = node.getAttribute("data-smd-url");
		obj.smd = true;
	}
	if (!url) return false;

	obj.mainUrl = url;
	if (isExtraImg) obj.extraImg = true;
	if (testBadURL(url)) {
		return false;
	}
	obj.title = node.getAttribute("title") || "";
	obj.alt = node.getAttribute("alt") || "";
	obj.rel = node.getAttribute("rel") || "";
	obj.text = node.textContent.trim() || "";
	obj.tag = node.nodeName;
	if (node.naturalWidth && !isExtraImg) {
		obj.naturalWidth = node.naturalWidth;
		obj.naturalHeight = node.naturalHeight;
		obj.mpx = node.naturalWidth * node.naturalHeight;

	}
	let dname = node.getAttribute("download");
	if (dname) obj.indicatedName = dname;
	if (node.hasAttribute("data-smd-name")) {
		let smdName = node.dataset.smdName;
		if (smdName) {

			obj.indicatedName = smdName;
			obj.smdName = smdName;
			obj.smd = true;
		}
	}

	if (node.hasAttribute("data-smd-width")) obj.naturalWidth = node.getAttribute("data-smd-width");
	if (node.hasAttribute("data-smd-height")) obj.naturalHeight = node.getAttribute("data-smd-height");
	if (node.hasAttribute("data-smd-thumb")) obj.helperSrc = node.getAttribute("data-smd-thumb");

	let smdId = node.dataset.smdId;
	if (smdId) obj.selector = smdId;
	else {
		smdId = "s" + counter();
		node.dataset.smdId = smdId;
		obj.selector = smdId;
	}

	return obj;
}

chrome.runtime.sendMessage({ type: "test", info: "bubux" });

function aux(el, url, innerImg, results) {
	let tag = (regimg.test(url) || el.src) ? "IMG" : "A";
	let obj = { mainUrl: url, tag: tag, fakeTag: true };
	obj.title = el.getAttribute("title") || "";
	obj.rel = el.getAttribute("rel") || "";
	obj.text = el.textContent.trim() || "";
	if (tag === "IMG" && innerImg) {
		obj.helperSrc = innerImg.src;
		obj.alt = innerImg.alt;
	}
	results.push(obj);
}

function addExtraLinksFromAttributes_1(el, results) {
	if (el.href && el.href.startsWith("data:")) return;
	let L = getURLsFromQueryPart(el.href);
	let innerImgs = el.querySelectorAll("img");
	let innerImg = innerImgs.length === 1 ? innerImgs[0] : undefined;
	L.forEach((url) => aux(el, url, innerImg, results));
}

function addExtraLinksFromAttributes_3(el, results) {
	let L = getURLsFromQueryPart(el.src);

	L.forEach((url) => aux(el, url, "", results));
}

function addExtraLinksFromAttributes_2(el, results) {
	let str = el.getAttribute("onclick");
	let L = testCallable(str);
	if (L) {
		let innerImgs = el.querySelectorAll("img");
		let innerImg = innerImgs.length === 1 ? innerImgs[0] : undefined;
		L.forEach((s) => {
			let url = "";
			if (/^https?/i.test(s)) url = s;
			else if (s.search("/") > -1 && (regimg.test(s) || regdoc.test(s) || regmedia.test(s))) url = getAbsoluteHref(s);
			if (url) aux(el, url, innerImg, results);
		});
	}
}

function extractLinks(doc, targetLink) {

	let results = [];
	let selector = "[href], [src], [srcset], [cite], [poster], [data-smd-url], [data-smd-name]";
	let NL = doc.querySelectorAll(selector);
	if(NL.length > 1000){

	}

	NL.forEach(function (node) {
		let obj = extractItemData(node, targetLink);
		if (obj) results.push(obj);
	});

	if ( !targetLink) {

		if(NL.length < 2000){
			let B = [];
			doc.querySelectorAll("*").forEach((elem) => {
				let s = window.getComputedStyle(elem);
				if (!s) return;
				if (s.backgroundImage.startsWith("url")) B.push(s.backgroundImage);
				else if (s.background.startsWith("url")) B.push(s.background);
			});
			let regBkgUrl = /url\s*\(\s*"(.+)"\s*\)/;
			B = B.map(function (str) {
				let url = "";
				if (regBkgUrl.test(str)) {
					url = str.match(regBkgUrl)[1];
				}
				return url ? absoluteUrl(url, doc.location.href) : "";
			}).filter((url) => url.length > 0);

			B.forEach(function (url) {
				results.push({ mainUrl: url, tag: "IMG", fakeTag: true });
			});

			doc.querySelectorAll("[href]").forEach((el) => addExtraLinksFromAttributes_1(el, results));

			doc.querySelectorAll("[onclick]").forEach((el) => addExtraLinksFromAttributes_2(el, results));

		}

		doc.querySelectorAll("canvas").forEach((el) => {
			let w = el.getAttribute("width");
			let h = el.getAttribute("height");
			let src = el.toDataURL("image/png");
			let obj = { mainUrl: src, tag: "IMG", ext: "png" };
			chrome.runtime.sendMessage({ type: "test", info: obj });
			if (w && h) {
				obj.mpx = w * h;
				obj.naturalHeight = h;
				obj.naturalWidth = w;
			}
			if (!obj.mpx) obj.extraImg = true; 
			if (el.textContent.trim() !== "") obj.alt = el.textContent;
			results.push(obj);
		});
		if (idata.recognizeTextLinks) {

			let totalText = doc.body.innerText;
			let textURLs = extractUrlsFromText(totalText, true);
			textURLs.forEach((url) => results.push({ mainUrl: url }));
		}
	}

	results.forEach((obj) => {
		addCategory(obj);
		if (obj.category === "image" && (obj.tag !== "IMG" || obj.fakeTag)) obj.extraImg = true;
		if (obj.category === "image" && (/^(http|data)/i).test(obj.mainUrl)) obj.legalImg = true;
	});

	return results;
}

function extractLinksFromSelection() {
	var results = [];
	let selection = window.getSelection();
	let n = window.getSelection().rangeCount;

	for (let i = 0; i < n; ++i) {
		let range = selection.getRangeAt(i);
		let ancestor = range.commonAncestorContainer;
		if (ancestor.nodeType !== 1) ancestor = ancestor.parentNode;
		let parents = getParents(ancestor);

		let selector_1 = "[href], [src], [srcset], [cite], [poster], [data-smd-url], [data-smd-name]";
		let batch_1 = ancestor.querySelectorAll(selector_1);
		batch_1 = Array.from(batch_1).concat(parents).filter((el) => selection.containsNode(el, true));
		batch_1.forEach(function (node) {
			let obj = extractItemData(node);
			if (obj) results.push(obj);
		});

		Array.from(ancestor.querySelectorAll("[href]")).concat(parents).filter((el) => selection.containsNode(el, true))
			.forEach((el) => addExtraLinksFromAttributes_1(el, results));

		Array.from(ancestor.querySelectorAll("[onclick]")).concat(parents).filter((el) => selection.containsNode(el, true))
			.forEach((el) => addExtraLinksFromAttributes_2(el, results));

		ancestor.querySelectorAll("canvas").forEach((el) => {
			let w = el.getAttribute("width");
			let h = el.getAttribute("height");
			let src = el.toDataURL("image/png");
			let obj = { mainUrl: src, tag: "IMG", ext: "png" };
			if (w && h) {
				obj.mpx = w * h;
				obj.naturalHeight = h;
				obj.naturalWidth = w;
			}
			if (!obj.mpx) obj.extraImg = true; 
			if (el.textContent.trim() !== "") obj.alt = el.textContent;
			results.push(obj);
		});
	}

	if (idata.recognizeTextLinks) {
		let totalText = selection.toString();
		let textURLs = extractUrlsFromText(totalText, true);
		textURLs.forEach((url) => results.push({ mainUrl: url }));
	}

	results.forEach((obj) => {
		addCategory(obj);
		if (obj.category === "image" && (obj.tag !== "IMG" || obj.fakeTag)) obj.extraImg = true;
		if (obj.category === "image" && (/^http/i).test(obj.mainUrl)) obj.legalImg = true;
	});
	return results;
}

function sendResourcesList(targetLink) {

	let L = [];
	let sel = "";
	if (window.getSelection()) sel = window.getSelection().toString().trim();
	let doSilentFetching = false;
	if (idata.origin === "menu-multi-sel") {
		if (!sel) L = [];
		else {
			doSilentFetching = true;
			L = extractLinksFromSelection();
		}
	}
	else {
		L = extractLinks(document, targetLink);
	}

	if (idata.onlyImages) L = L.filter((obj) => obj.category === "image");
	L.forEach((obj) => obj.pageUrl = document.location.href);
	L = removeDuplicateURLs(L);

	let E = L.filter((obj) => obj.extraImg && obj.legalImg);
	E.forEach((obj, i) => obj.eid = 1 + i);

	if(E.length < 500) setTimeout(() => getExtraImgsData(E), 60);

	if (targetLink) {
		L = L.filter((obj) => obj.originalUrl === targetLink);
		idata.origin = "link";
		if (L.length > 0) chrome.runtime.sendMessage({ type: "resources", origin: idata.origin, info: L, doSilentFetching: true, now: idata.now });
		return;
	}

	if (L.length === 1) doSilentFetching = true;
	chrome.runtime.sendMessage({ type: "resources", origin: idata.origin, info: L, doSilentFetching: doSilentFetching });

}

function getExtraImgsData(E) {
	let imgdescr = {};
	let T = E.map((obj) => obj.eid);
	E.forEach((obj) => loadImageForTesting(imgdescr, (obj)));
	startTesting(imgdescr, T, Date.now(), 5000);
}

function loadImageForTesting(imgdescr, obj) {
	let img = new Image(1, 1);
	imgdescr[obj.eid] = img;
	img.src = obj.mainUrl;
}

function sendImgsData(results, timeout) {
	chrome.runtime.sendMessage({ type: "extra images data", origin: idata.origin, info: results, timeout: timeout });
}

function startTesting(imgdescr, T, tstart, timeout) {
	if (T.length > 0 && Date.now() - tstart < timeout) {
		setTimeout(function () {
			let results = [];
			T.slice(0).forEach((eid) => {
				let img = imgdescr[eid];
				let w = img.naturalWidth;
				let h = img.naturalHeight;
				if (w && h) {
					img.src = "";
					results.push({ eid: eid, naturalHeight: h, naturalWidth: w });
					T.splice(T.indexOf(eid), 1);
				}
			});
			if (results.length > 0) { sendImgsData(results, false); }
			startTesting(imgdescr, T, tstart, timeout);
		}, 50);

	}
	else {
		let results = [];
		T.forEach((eid) => results.push({ eid: eid, naturalHeight: 0, naturalWidth: 0, timeout:true }));
		if (results.length > 0) { sendImgsData(results, true); }
	}
}

function createDialog(rtype) {
	window.q_iframe = document.createElement("iframe");
	window.q_iframe.setAttribute("style", `
		border: none;
		position: fixed;
		top: 0;	
		bottom: 0;	
		left: 0;	
		right: 0;	
		width: 100%;	
		height: 100%;	
		margin: auto;	
		background-color: rgba(0, 0, 0, 0.3);	
		z-index: 10000000011;
  	`);
	window.q_iframe.src = dialogUrl + `#${rtype}`;
	document.body.appendChild(window.q_iframe);
}

chrome.runtime.onMessage.addListener(extractData);

function extractData(message) {
	if (message.type === "report") {
		if (window.q_iframe && window.q_iframe_ready) window.q_iframe.contentWindow.postMessage(message, dialogUrl);
		else sendReportWhenReady(message);
	}

	if (message.type === "request proximity masks") {
		onRequestProximityMasks(message);
	}
}

function onRequestProximityMasks(message){
	cleanDom();
	let mask = message.info.mask;
	let E = [];
	let M = new WeakMap();
	let proximityData = {};
	message.info.L.forEach((obj) => {
		let elem = document.querySelector(`[data-smd-id="${obj.selector}"]`);
		if (elem) {
			E.push(elem);
			M[elem] = obj.rid;
			proximityData[obj.rid] = {};
			proximityData[obj.rid][mask] = "";
		}
	});
	if(E.length > 0){
		highlightLinks(E);
		let firstSelectedItem = getFirstNode(E);
		let firstRid = M[firstSelectedItem];
		document.body.addEventListener("contextmenu", function (e) {
			e.preventDefault();
			let elem = e.target;
			let point = {x: e.pageX, y: e.pageY};
			let nodeDescriptor = getPointedTextNode(point, elem);
			let info = getSamplePathInfo(nodeDescriptor, firstSelectedItem);
			for(let elem of E){
				let tNode = getNodeFromPathInfo(info, elem);
				if(tNode){
					let rid = M[elem];
					proximityData[rid][mask] = tNode.textContent.trim();
					highlightNode(tNode);	
				}
			}

			chrome.runtime.sendMessage({ type: "proximity data", 
										info: {proximityData: proximityData, mask: mask, firstRid: firstRid} });

		}, { useCapture: false, once: true });
	}
	else chrome.runtime.sendMessage({ type: "reset proximity data"});
}

function highlightLinks(N) {
	let A = Array.from(document.querySelectorAll(".smd-highlighted-item"));
	let theSame = minus(A, N).length === 0 && minus(N, A).length === 0;
	if(theSame) return;

	document.querySelectorAll(".smd-highlighted-item").forEach((el) => el.classList.remove("smd-highlighted-item"));
	document.querySelectorAll(".smd-wrapper-span").forEach((el) => {
		let node = el.firstChild;
		unWrapNode(node);
	});
	N.forEach((node) => { node.classList.add("smd-highlighted-item");});
}

function highlightNode(node){
	let wrapperAttributes = {"class": "smd-wrapper-span"};
	wrapNode(node, "span", wrapperAttributes);
}

function sendReportWhenReady(message) {
			setTimeout(() => {
				if (window.q_iframe && window.q_iframe_ready) window.q_iframe.contentWindow.postMessage(message, dialogUrl);
				else sendReportWhenReady(message);
			}, 20);
		}

window.addEventListener("message", receiveMessage, false);

	function receiveMessage(event) {
		let message = event.data;
		if (message.type === "quick.js ready") {
			window.q_iframe_ready = true;
		}
		if (message.type === "close quick dialog" && window.q_iframe) {
			window.q_iframe.remove();
			window.q_iframe = null;
			window.q_iframe_ready = null;
		}
	}

	function start() {
		let bool = window.top === window.self;
		let bool2 = idata.origin.startsWith("menu-multi");
		let bool3 = idata.origin.startsWith("menu-link");
		if (idata.origin === "menu-link") {
			sendResourcesList(idata.context === "image" ? idata.srcUrl : idata.linkUrl);
		}
		else sendResourcesList();
		if (bool && (bool2 || bool3)) {
			createDialog(bool2 ? "multi" : idata.context);
		}
	}

	start();

