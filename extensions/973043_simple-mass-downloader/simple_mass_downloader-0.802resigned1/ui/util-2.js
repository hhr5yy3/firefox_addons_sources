

var counter = (function getCounter() {
	let counter = 0;
	function increase() {
		return counter += 1;
	}
	return increase;
})();

function minus(L1, L2) {
	return L1.filter(function (x) { return L2.indexOf(x) < 0; });
}

function extractUrlsFromText(str, alsoFromQueryPart) {
	let results = [];

	let text = " " + str.replace(/[\x00-\x20]/, " ").replace(/\s+/g, " ") + " ";

	let regx = /([\x20-\x40\x5B-\x61\x7B-\x7E])((?:https?|ftps?):\/\/)/ig;
	text = text.replace(regx, (match, p1, p2/* , offset, string */) => {
		if ([" ", "\"", "`", "'", "<", "[", "{", "("].includes(p1)) return "  " + p1 + p2;
		return p1 + "  " + p2;
	});

	let pairs = { "\"": "\"", "'": "'", "`": "`", "<": ">", "(": ")", "[": "]", "{": "}" };
	let regy = /([\x20-\x40\x5B-\x61\x7B-\x7E])((?:https?|ftps?):\/\/\S+?)(\s|\1)/gi;
	let noEndReg = /["`'.,;:!?[({\\]/;
	text = text.replace(regy, (match, p1, p2, p3, offset, string) => {
		let candidate = "";
		if (p3 !== pairs[p1]) {
			candidate = (p2 + p3).trim();
			let cleanEnd = true;

			if (cleanEnd) while (noEndReg.test(candidate[-1 + candidate.length])) candidate = candidate.slice(0, -1);
		}
		else candidate = p2;

		let Q = [candidate];
		if (alsoFromQueryPart) Q = Q.concat(getURLsFromQueryPart(candidate));
		for (let url of Q) results.push(url);
		return match; 
	});

	return results;
}

function getURLsFromQueryPart(aUrl) {

	let url = "";
	try {
		url = new URL(aUrl);
	}
	catch (err) { }
	if (!url) return [];
	let params = new URLSearchParams(url.search.slice(1));

	let values = [];
	let it = params.values();
	var result = it.next();
	while (!result.done) {
		values.push(result.value); 
		result = it.next();
	}
	return values.filter((v) => /^https?:\/\//i.test(v));
}

function getUrlSearchParams(aUrl) {
	let url = "";
	try {
		url = new URL(aUrl);
	}
	catch (err) { }
	if (!url) return {};
	let params = new URLSearchParams(url.search.slice(1));

	let obj = {};
	let it = params.entries();
	var result = it.next();
	while (!result.done) {
		let pair = result.value;
		obj[pair[0]] = decodeURIComponent(pair[1]);
		result = it.next();
	}

	return obj;
}

function getQueryPart(aUrl) {
	let url = "";
	try {
		url = new URL(aUrl);
	}
	catch (err) { }
	if (!url) return "";
	return url.search;
}

function getUrlDirs(aUrl) {
	let url = "";
	try {
		url = new URL(aUrl);
	}
	catch (err) { }
	if (!url) return [];
	return [url.host].concat(url.pathname.split("/").filter((part) => part.length > 0)).map((x) => decodeURIComponent(x));
}

function getParents(elem) {
	let current = elem;
	let parents = [elem];
	while (current.parentElement) {
		parents.push(current.parentElement);
		current = current.parentElement;
	}
	return parents;
}

var regimg = /\.(jpg|jpeg|jpe|png|gif|tif|tiff|bmp|svg|ico|webp)$/i;
var regdoc = /\.(doc|txt|pdf|djvu|djv|md|chm|epub|mobi|log|csv)$/i;
var regmedia = /\.(mp3|flag|ogg|wav|wma|mp4|avi|mov)$/i;
var regweb = /\.(htm|html|js|css|xml)$/i;

function addCategory(obj) {
	let category = "other";
	if (!obj.ext) obj.ext = estimateExt(obj.mainUrl);
	if ((obj.tag === "IMG" && !["htm", "html"].includes(obj.ext)) || (regimg.test("." + obj.ext))) category = "image";
	else if (regdoc.test("." + obj.ext)) category = "doc";
	else if (regweb.test("." + obj.ext)) category = "web";
	obj.category = category;
}

function estimateExt(filename) {
	if (filename.startsWith("data:")) return "";
	if (filename.endsWith("/")) return "htm";
	let result = "";
	let regext = /.*\.(\w{1,8}$)/;
	try {
		if (regext.test(filename)) result = filename.match(regext)[1];
	} catch (err) { }
	return result.toLowerCase();
}

function shortenCommonExt(obj) {
	let dict = { "html": "htm", "jpeg": "jpg", "djvu": "djv", "tiff": "tif" };
	if (Object.keys(dict).includes(obj.ext)) obj.ext = dict[obj.ext];
}

function absoluteUrl(relativeUrl, base) {
	let result = relativeUrl;
	try {
		result = (new URL(relativeUrl, base)).href;
	} catch (err) { }
	return result;
}

function validUrl(url) {
	let result = false;
	try {
		result = new URL(url);
	} catch (err) { }
	return result;
}

var reg_start_url = /^(data:|http|ftp)/;
function testBadURL(url) {
	if (!url) return true;
	if (!reg_start_url.test(url)) return true;
	let pageURL = window.location.href.indexOf("#") > -1
		? document.URL.slice(0, window.location.href.indexOf("#"))
		: document.URL;
	let splithash = url.split("#");
	if (splithash.length > 1 && splithash[0] === pageURL) return true;
	if (url.startsWith("javascript:") || url.startsWith("mailto:") || url.startsWith("irc:")) return true;
	return false;
}

function addThumbInfo(obj, img) {
	let w = img.naturalWidth;
	let h = img.naturalHeight;
	if (!obj.thumb && w > 0 && h > 0 && (w > 150 || h > 150)) {
		let scale = w > h ? 150 / w : 150 / h;
		let canvas = document.createElement("canvas");
		canvas.width = w * scale;
		canvas.height = h * scale;
		canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
		let url = canvas.toDataURL("image/png");
		obj.thumb = url;
	}
}

function addSelectorPart(el, S, parent) {

	if (!el.parentElement || (parent && parent.isSameNode(el))) return;

	try {
		let index = 1 + Array.from(el.parentElement.querySelectorAll(`:scope > ${el.nodeName}`)).indexOf(el);
		let selector_part = `${el.nodeName}:nth-of-type(${index})`.toLowerCase();
		if (["BODY", "HEAD"].includes(el.nodeName)) selector_part = `${el.nodeName}`.toLowerCase();
		S.unshift(selector_part);
		if (el.nodeName !== "BODY" && el.nodeName !== "HEAD") addSelectorPart(el.parentElement, S, parent);
	}
	catch (err) {

		S = [];
	}
}

function getSelector_simple(elem, parent) {
	if (!elem.parentElement) return "";
	if (parent && !parent.contains(elem.parentElement)) return "";
	let S = [];
	addSelectorPart(elem, S, parent);
	return S.join(" > ");
}

function cleanDom() {
	document.body.normalize();

}

function clean(node) {
	for (var n = 0; n < node.childNodes.length; n++) {
		var child = node.childNodes[n];
		if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
			node.removeChild(child);
			n--;
		}
		else if (child.nodeType === 1) {
			clean(child);
		}
	}
}

function getFirstNode(L) {
	L.sort(compareX);
	return L[0];
}

function compareX(n, m) {
	if (n.compareDocumentPosition(m) & Node.DOCUMENT_POSITION_PRECEDING) return 1;
	if (n.compareDocumentPosition(m) & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
	return 0;

}

function getSamplePathInfo(nodeDescriptor, refElem) {
	let result = {index: nodeDescriptor.index};
	let pelem = nodeDescriptor.node.parentNode;
	let parents_1 = getParents(pelem);
	let parents_2 = getParents(refElem);
	let commonParent;
	while (parents_1[-1 + parents_1.length] === parents_2[-1 + parents_2.length]) {
		commonParent = parents_1.pop();
		parents_2.pop();
	}
	result.deep = 1 + parents_1.length;
	result.selector = getSelector_simple(pelem, commonParent);
	return result;
}

function getNodeFromPathInfo(info, refElem){
	let result = undefined;
	let commonParent = refElem;
	for(let i = 0; i < info.deep; ++i) commonParent = commonParent.parentNode;
	let pelem = commonParent.querySelector(info.selector);
	if(pelem){
		result = pelem.childNodes[info.index];
	}
	return result;
}

function testPointInside(point, refRect) {
	let X = window.scrollX;
	let Y = window.scrollY;
	let bools = [point.y >= refRect.top + Y, point.y <= refRect.bottom + Y, point.x >= refRect.left + X, point.x <= refRect.right + X];
	return bools[0] && bools[1] && bools[2] && bools[3];
}

function getPointedTextNode(point, elem){
	let result = {};
	let textChilds = Array.from(elem.childNodes).filter((child) => child.nodeType === Node.TEXT_NODE);

	for(let i = 0; i < textChilds.length; ++i){
		let range = document.createRange();
		let node = textChilds[i];
		range.selectNode(node);
		let rect = range.getBoundingClientRect();
		let bool = testPointInside(point, rect);
		range.detach(); 
		if(bool) {
			result = {node: node, index: i};
			break;
		}		
	}

	return result;
}

function wrapNode(node, wrapperTag, wrapperAttributes){
	var wrapper = document.createElement(wrapperTag);
	if(wrapperAttributes){
		let attrs = Object.keys(wrapperAttributes);
		for(let attribute of attrs){
			wrapper.setAttribute(attribute, wrapperAttributes[attribute]);
		}
	}

	node.parentNode.insertBefore(wrapper, node);
	wrapper.appendChild(node);
}

function unWrapNode(node){
	var wrapper = node.parentNode;
	wrapper.parentNode.insertBefore(node, wrapper);
	wrapper.remove();
}
