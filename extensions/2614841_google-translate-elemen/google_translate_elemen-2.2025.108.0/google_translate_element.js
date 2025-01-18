"use strict";

let disable_element_url_regexp = /^(about:|moz-extension:|https:\/\/addons\.mozilla\.org)/;

let csp_array = [];
let ignore_urls_filter_regex = new RegExp(/$^/);
function init_google_translate_element() {
    csp_array = [];
    if (options.csp_to_add) {
	options.csp_to_add = options.csp_to_add.trim();
    }
    if (options.csp_to_add) {
	let csps = options.csp_to_add.split(/;\s*/);
	for (let elem of csps) {
	    let elems = elem.split(/\s+/);
	    let key = elems.shift();
	    let val = elems.join(" ");
	    if (key) {
		csp_array.push([key, val]);
	    }
	}
	if (!browser.webRequest.onHeadersReceived.hasListener(modify_content_security_policy)) {
	    browser.webRequest.onHeadersReceived.addListener(
		modify_content_security_policy, {
	    	    urls: ["<all_urls>"],
	    	    types: ["main_frame"]
		}, ["blocking", "responseHeaders"]);
	}
    } else {
	browser.webRequest.onHeadersReceived.removeListener(modify_content_security_policy);
    }

    if (options.ignore_urls && options.ignore_urls.match(/\S/)) {
	ignore_urls_filter_regex = urls_to_regexp(options.ignore_urls);
    }

    switch_auto_insert(options.auto_insert);

    options.tags_to_remove_from_page = options.tags_to_remove_from_page ?
	options.tags_to_remove_from_page.trim().toUpperCase().split(/\s+/) : [];
}

function urls_to_regexp(text) {
    return new RegExp(text.trim().split(/\s*\n\s*/).join("|"));
}

function switch_auto_insert(state) {
    if (state == true) {
	if (!browser.tabs.onUpdated.hasListener(onUpdated)) {
	    if (ffversion >= 63) {
		browser.tabs.onUpdated.addListener(onUpdated, {properties: ["status"]});
	    } else {
		browser.tabs.onUpdated.addListener(onUpdated);
	    }
	}
    } else {
	if (browser.tabs.onUpdated.hasListener(onUpdated)) {
	    browser.tabs.onUpdated.removeListener(onUpdated);
	}
    }
}

function onUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.status == "complete") {
	insert_element(tabId, tabInfo.url);
    }
}

function modify_content_security_policy(details) {
    const {responseHeaders} = details;
    for (let i = responseHeaders.length - 1; i >= 0; --i) {
	if (responseHeaders[i].name.toLowerCase() == "content-security-policy") {
	    let csps = {};
	    for (let elem of responseHeaders[i].value.split(/;\s*/)) {
		let idx = elem.indexOf(" ");
		if (idx > 0) {
		    csps[elem.substr(0, idx)] = elem.substr(idx + 1);
		} else {
		    csps[elem] = "";
		}
	    }
	    for (let elem of csp_array) {
		if (csps[elem[0]]) {
		    csps[elem[0]] += " " + elem[1];
		}
	    }
	    responseHeaders[i].value = "";
	    for (let elem in csps) {
		responseHeaders[i].value += `${elem} ${csps[elem]}; `;
	    }
	    break;
	}
    }
    return {responseHeaders};
}


async function insert_element(tabId, url, force = false) {
    if (!options.inject_code || disable_element_url_regexp.test(url)) {
	return;
    }
    if (!force &&
	(options.ignore_or_insert_urls != "insert" && ignore_urls_filter_regex.test(url) ||
	 options.ignore_or_insert_urls == "insert" && !ignore_urls_filter_regex.test(url))) {
	return;
    }
    let pagelanguage;
    for (let i = 0; i < 10; i++) {
	pagelanguage = await browser.tabs.detectLanguage(tabId);
	if (pagelanguage == "und" ) {
	    await new Promise(resolve => setTimeout(resolve, 1000));
	} else {
	    break;
	}
    }
    pagelanguage = pagelanguage == "und" ? "" : pagelanguage;
    if (!ignore_languages.has(pagelanguage) || force) {
	if (options.style_sheets) {
	    browser.tabs.insertCSS(tabId, {
		code: options.style_sheets,
		allFrames: true,
		cssOrigin: "author"
	    }).catch(error => {
		notify(error.message);
		return error.message;
	    });
	}

	let exec_options = {
	    auto_translate: options.auto_translate,
	    hide_toolbar: options.hide_toolbar,
	    pagelanguage: pagelanguage,
	    includedlanguages: options.includedlanguages,
	    force: force
	};
	let args = JSON.stringify(exec_options);
	let code = `insert_google_translate_element(${args});`;
	browser.tabs.executeScript(tabId, {
	    code: `typeof insert_google_translate_element === 'function';`
	}).then(results => {
	    if (!results || results[0] !== true) {
		return browser.tabs.executeScript(tabId, {file: "/content.js"});
	    } else {
		return null;
	    }
	}).then(result => {
	    return browser.tabs.executeScript(tabId, {code: options.inject_code});
	}).then(result => {
	    return browser.tabs.executeScript(tabId, {code: code});
	}).catch(error => {
	    console.log(error.message, url);
	});
    }
}

function toggle_translate(tab_id) {
    browser.tabs.sendMessage(tab_id, {msg: "toggle_translate"}).catch(error => {
	console.log(error.message);
    });
}
function toggle_toolbar(tab_id) {
    browser.tabs.sendMessage(tab_id, {msg: "toggle_toolbar"}).catch(error => {
	console.log(error.message);
    });
}

function gte_loaded(msg, sender) {
    browser.pageAction.setIcon({path: "lib/icons8-google-translate-insert.png", tabId: sender.tab.id});
}

function gte_removed(msg, sender) {
    browser.pageAction.setIcon({path: "lib/icons8-google-translate.png", tabId: sender.tab.id});
}

async function remove_decorative_tags(tabId) {
    let results = await browser.tabs.executeScript(tabId, {
	code: `typeof insert_google_translate_element === 'function';`
    });
    let has_gte = false;
    if (results && results[0] == true) {
	await browser.tabs.executeScript(tabId, {
	    code: "remove_google_translate_elemnt_nodes();"
	});
	has_gte = true;
    }
    let args = JSON.stringify(options.tags_to_remove_from_page);
    let code = `remove_decorative_tags(${args});`;

    await browser.tabs.executeScript(tabId, {file: "/remove_decorative_tags.js", allFrames: true});
    await browser.tabs.executeScript(tabId, {code: code, allFrames: true});
    await browser.tabs.executeScript(tabId, {file: "/remove_decorative_tags.js", allFrames: true, matchAboutBlank: true});
    await browser.tabs.executeScript(tabId, {code: code, allFrames: true, matchAboutBlank: true});
    if (has_gte) {
	insert_element(tabId, "", true);
    }
}
