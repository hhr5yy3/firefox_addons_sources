"use strict";

const translateUrl			= "https://translate.google.com/";
const translatePagePath		= "translate";
const translateTextPath		= "translate_t?sl=auto";
const translateTextPathM	= "m?ie=UTF-8&sl=auto";
const reAmo = /^(https?:\/\/addons.mozilla.org\/)[a-z\-]{1,5}\//i;

const reUrl = /((?:h..ps?|h?ttps?|t?ps?|ftp|file|chrome):\/\/|\/\/|www\.|ftp\.|irc\.|mailto:|irc:|about:)(?:[\w!#$%&'()*+,-.\/:;=?@\[\]~]+)/ig;
const ignoreScheme = /^(?:file|chrome):\/\//i;

const prefixes = [
	[ "www.",	"http://" ],
	[ "ftp.",	"ftp://" ],
	[ "irc.",	"irc:" ],
	[ "p",		"htt" ],
	[ "tp",		"ht" ],
	[ "ttp",	"h" ],
];



const DefaultOptions = {
	enableTextlink			: true,
	actionNoModifier		: 2,
	actionWithCtrl			: 3,
	actionWithShift			: 0,

	enableOpenUrlMenu		: true,
	enableTranslateMenu		: true,

	targetLanguage			: navigator.language,

	enableAmoLangCode		: false,
	amoLangCode				: "en-US",
};
let option;


/////////////////////////////////////////////////
// Textlink

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "open") {
		const result = openUrlInText(sender.tab, sender.url, message.ctrlKey, message.shiftKey, message.text, message.pos);
		sendResponse(result);
	}
});

function openUrlInText(tab, docUrl, ctrlKey, shiftKey, text, pos = -1, isMenu = false)
{
	const ret = { pos: -1, len: 0 };
	let tabAction = parseInt(
			ctrlKey? option.actionWithCtrl:
			shiftKey? option.actionWithShift:
			option.actionNoModifier
			, 10);

	if (tabAction === 0) {
		if (isMenu)
			tabAction = 2;
		else
			return ret;
	}

	let curScheme = "http:";
	try {
		curScheme = (new URL(docUrl)).protocol;
	} catch (e) {
	}

	const re = new RegExp(reUrl);
	const exists = new Set();
	let tabIndex = tab.index;
	let result;
	while (result = re.exec(text)) {
		let url = result[0];

		if (pos >= 0) {
			const idx = result.index;
			if (!(idx <= pos && pos < idx + url.length))
				continue;
		}

		// 末尾が ),.:] なら削除
		url = url.replace(/[),.\:\]]+$/, "");

		ret.pos = result.index;
		ret.len = url.length;
		if (tabAction === 4)	// Select only
			break;

		if (ignoreScheme.test(url))
			continue;

		// 置換
		url = url.replace(/^h..p(s?:\/\/)/, "http$1").replace(/^:?\/\//, curScheme + "//");
		prefixes.forEach(pair => {
			if (url.indexOf(pair[0]) === 0)
				url = pair[1] + url;
		});

		try {
			new URL(url);
		} catch (e) {
			continue;
		}

		const l_url = url.toLowerCase();
		if (exists.has(l_url))
			continue;
		exists.add(l_url);

		const isApp = /^(?:mailto|irc):/.test(url);

		if (tabAction === 1 && !isApp) {
			browser.tabs.update({ url: url });
			break;
		} else {
			browser.tabs.create({
				url		: url,
				active	: tabAction === 2,
				index	: ++tabIndex,
			}).then(newTab => {
				if (isApp) {
					browser.tabs.remove(newTab.id);
					browser.tabs.update(tab.id, { active: true });
				}
			});
		}

		if (!isMenu)
			break;
	}

	return ret;
}

function fullAlnum2half(str)
{
	return str.replace(/[\uFF01-\uFF5E]/g, s => String.fromCharCode((s.charCodeAt(0) & 0x007F) + 0x20))	// 全角英数 → 半角
			.replace(/[\u301C\uFFE3]/g, "~");	// 〜￣ → ~
}


function openSelectionTextUrl(info, tab)
{
	let ctrl	= false;
	let shift	= false;
	if ("modifiers" in info) {	// fx54-
		ctrl	= info.modifiers.includes("Ctrl");
		shift	= info.modifiers.includes("Shift");
	}

	getFrameId(info, tab.id).then(frameId => {
		return getSelectionText(tab.id, frameId, info);
	}).then(sel => {
		openUrlInText(tab, info.frameUrl, ctrl, shift, sel.text, -1, true);
	});
}


/////////////////////////////////////////////////
// Translate

browser.browserAction.onClicked.addListener(tab => {
	if ("url" in tab && /^https?:\/\//.test(tab.url)) {
		let sl	= "auto";
		let url	= tab.url;
		if (option.enableAmoLangCode && reAmo.test(url)) {
			sl	= option.amoLangCode;
			url = url.replace(reAmo, `$1${sl}/`);
		}

		url = translateUrl + translatePagePath + `?sl=${sl}&tl=${option.targetLanguage}&u=` + encodeURIComponent(url);

		browser.tabs.create({
			url		: url,
			active	: true,
			index	: tab.index + 1,
		});
	}
});

function openTranslate(info, tab)
{
	browser.tabs.create({
		url: translateUrl,
	});
}

function translateSelectionText(info, tab)
{
	let frameId;
	getFrameId(info, tab.id).then(fid => {
		frameId = fid;
		return getSelectionText(tab.id, frameId, info);

	}).then(sel => {
		if (sel.text === "" || sel.text.length > 5000)
			return Promise.reject();	// 何も選択されていないか5000文字以上なら終了

		const eText = encodeURIComponent(sel.text);

		if (sel.contentScript) {
			const url = translateUrl + translateTextPathM + `&tl=${option.targetLanguage}&q=` + eText;
			return htmlGet(url).then(response => {
				const trans = response.querySelector(".result-container, .t0");
				if (trans) {
					browser.tabs.sendMessage(tab.id, { action: "replaceSelection", text: trans.textContent }, { frameId: frameId });
				}
			});

		} else {
			const url = translateUrl + translateTextPath + `&tl=${option.targetLanguage}&text=` + eText;

			return browser.tabs.create({
				url		: url,
				active	: true,
				index	: tab.index + 1,
			});
		}
	});
}


function htmlGet(url)
{
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest({ mozAnon: true, mozSystem: true });
		req.mozBackgroundRequest = true;
		req.responseType = "document";
		req.open("GET", url);
		req.onload = () => {
			if (req.readyState === 4 && req.status === 200 && req.response !== null) {
				resolve(req.response);
			} else {
				reject(new Error(req.statusText));
			}
		};
		req.onerror = () => reject(new Error(req.statusText));
		req.send();
	});
}


function onHeadersReceived(details)
{
	if (/https?:\/\/addons\.mozilla\.org\//i.test(details.url)) {
		const responseHeaders = details.responseHeaders;
		responseHeaders.push({
			name	: "Content-Security-Policy",
			value	: "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: moz-extension: https://*.googleapis.com https://*.google.com"
		});
		return { responseHeaders };
	}
}



/////////////////////////////////////////////////
// common

browser.storage.onChanged.addListener(arg => loadOption());

function loadOption()
{
	browser.webRequest.onHeadersReceived.removeListener(onHeadersReceived);

	browser.storage.local.get().then(storage => {
		option = storage;
		let flgSet = false;

		// 初回設定用
		for (const key of Object.keys(DefaultOptions)) {
			if (!(key in option)) {
				option[key] = DefaultOptions[key];
				flgSet = true;
			}
		}
		if (option.targetLanguage.trim() === "")
			option.targetLanguage = navigator.language;
		if (flgSet)
			browser.storage.local.set(option);

		resetMenu();

		if (option.enableAmoLangCode) {
			browser.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
				urls	: [ "https://translate.googleusercontent.com/translate_c?*" ],
				types	: [ "main_frame", "sub_frame" ],
			}, [ "blocking", "responseHeaders" ]);
		}
	});
}

function resetMenu()
{
	browser.contextMenus.removeAll().then(() => {
		browser.contextMenus.create({
			title	: browser.i18n.getMessage("menuOpenTranslate"),
			contexts: [ "browser_action" ],
			onclick	: openTranslate,
		});

		if (option.enableTranslateMenu) {
			browser.contextMenus.create({
				title	: browser.i18n.getMessage("menuTranslate"),
				contexts: [ "selection" ],
				onclick	: translateSelectionText,
			});
		}
		if (option.enableTextlink && option.enableOpenUrlMenu) {
			browser.contextMenus.create({
				title	: browser.i18n.getMessage("menuOpenUrl"),
				contexts: [ "selection" ],
				onclick	: openSelectionTextUrl,
			});
		}
	});
}



function getSelectionText(tabId, frameId, info = null)
{
// return {
//		text			: 選択文字列,
//		contentScript	: コンテンツスクリプト実行可能か？
// }
	return browser.tabs.sendMessage(tabId, { action: "selectionText" }, { frameId: frameId }).then(text => {
		if (text === "" && info && "selectionText" in info)
			text = info.selectionText;
		return Promise.resolve({ text: text, contentScript: true });

	}).catch(err => {
		if ("selectionText" in info)
			return Promise.resolve({ text: info.selectionText, contentScript: false });
		return Promise.reject(err);
	});
}

function getFrameId(info, tabId)
{
	if ("frameId" in info) {	// fx55?-
		return Promise.resolve(info.frameId);
	} else {
		return browser.webNavigation.getAllFrames({ tabId: tabId }).then(framesInfo => {
			const frameInfo = framesInfo.find(elem => elem.url === info.frameUrl);
			if (!frameInfo)
				return Promise.reject(new Error(`frame "${info.frameUrl}" not found`));
			return Promise.resolve(frameInfo.frameId);
		});
	}
}


// Startup
loadOption();
