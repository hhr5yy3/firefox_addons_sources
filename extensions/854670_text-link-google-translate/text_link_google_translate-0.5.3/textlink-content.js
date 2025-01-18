"use strict";
const inputType = [ "text", "url", "email", "search" ];
let curText	 	= null;
let curRange 	= null;
let curActive	= null;

function handleMessage(message, sender, sendResponse)
{
	switch (message.action) {
	case "selectionText":
		getSelect();
		sendResponse(curText);
		break;
	case "replaceSelection":
		replaceSelect(message.text);
		break;
	}
}

function getSelect()
{
	const sel = window.getSelection();
	curText = sel.toString();
	if (curText === "" && document.activeElement) {
		const act = document.activeElement;
		if (act.localName === "textarea" || (act.localName === "input" && inputType.includes(act.type))) {
			curText		= act.value.substring(act.selectionStart, act.selectionEnd);
			curActive	= act;
		}
	} else {
		curRange = (sel.rangeCount > 0)? sel.getRangeAt(0): null;
	}
}

function replaceSelect(text)
{
	if (curActive) {
		// 入力フォームの場合は末尾に追加
		curActive.value += " " + text;

	} else if (curRange) {
		try {
			const s = document.createElement("span");
			s.title = curText.trim();
			s.style.setProperty("background-color", "#F0F08C", "important");
			s.style.setProperty("color", "#000", "important");
			s.textContent = text;
//			s.appendChild(document.createTextNode(text));
			curRange.deleteContents();
			curRange.insertNode(s);
			curRange.detach();
		} catch (e) {
		}
	}
	curText	 	= null;
	curRange 	= null;
	curActive	= null;
}

async function handleDblclick(event)
{
	let target = event.target;
	if (event.button !== 0 || event.altKey || event.metaKey || document.designMode === "on" || !target.hasChildNodes())
		return;
	if (target.textContent.length < 10 && target.parentNode)
		target = target.parentNode;

	const textNodes = document.evaluate("descendant::text() | descendant::br", target, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	const x = event.clientX;
	const y = event.clientY;
	const range = document.createRange();
	const isInRange = () => Array.from(range.getClientRects()).some(r => r.left <= x && x <= r.right && r.top <= y && y <= r.bottom);

	// <br>を除けながらクリックした周辺の文字列を連結
	const nodes = [];
	let text = "";
	let find = false;
	for (let n; n = textNodes.iterateNext(); ) {
		if (n.nodeName === "BR") {
			if (find)
				break;
			nodes.length = 0;
			text = "";
			continue;
		}
		range.selectNode(n);
		const r = range.getBoundingClientRect();
		if (r.width <= 0 || r.height <= 0)	// 表示されてないっぽいのは除外
			continue;
		if (!find && isInRange())
			find = true;
		nodes.push(n);
		text += n.textContent;
	}
	if (!find || nodes.length <= 0 || text.trim().length < 10) {
		range.detach();
		return;
	}

	const nodeInPos = (idx, pos) => {
		for (let l; (l = nodes[idx].textContent.length) < pos; ++idx)
			pos -= l;
		return [ idx, pos ];
	};
	let pos  = 0;
	let pTxt = text;
	let lIdx = 0;
	let lOfs = 0;
	for (let lLen; (lLen = Math.floor(pTxt.length / 2)) >= 1; ) {
		// 文字列を半分に分けてどっちがクリックされたか調べる。１文字になるまで繰り返してクリックされた文字を特定
		range.setStart(nodes[lIdx], lOfs);
		const [ rIdx, rOfs ] = nodeInPos(lIdx, lOfs + lLen);
		range.setEnd(nodes[rIdx], rOfs);

		if (isInRange()) {
			pTxt = pTxt.substring(0, lLen);
		} else {
			pos += lLen;
			pTxt = pTxt.substring(lLen);
			lIdx = rIdx;
			lOfs = rOfs;
		}
	}

	try {
		const result = await browser.runtime.sendMessage({
			action	: "open",
			ctrlKey	: event.ctrlKey,
			shiftKey: event.shiftKey,
			text	: text,
			pos		: pos,
		});
		if (result.len > 0) {
			let [ i, p ] = nodeInPos(0, result.pos);
			range.setStart(nodes[i], p);
			[ i, p ] = nodeInPos(i, p + result.len);
			range.setEnd(nodes[i], p);
			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
	} catch (e) {
		console.error(e);
	}
	range.detach();
}

function en() { document.addEventListener("dblclick", handleDblclick, false); }
function de() { document.removeEventListener("dblclick", handleDblclick, false); }

function handleStorageChange(arg)
{
	if ("enableTextlink" in arg) {
		if (arg.enableTextlink.newValue)
			en();
		else
			de();
	}
}

setTimeout(() => {	// Fx61- Promise resolved while context is inactive ～対策
	browser.runtime.onMessage.addListener(handleMessage);
	browser.storage.onChanged.addListener(handleStorageChange);

	window.addEventListener("unload", e => {
		browser.runtime.onMessage.removeListener(handleMessage);
		browser.storage.onChanged.removeListener(handleStorageChange);
		de();
	}, { once: true });

	browser.storage.local.get({ enableTextlink: true }).then(data => {
		if (data.enableTextlink)
			en();
	});
}, 0);
