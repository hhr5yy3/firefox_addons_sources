"use strict";

let disable_translator_url_regexp = /^(file:|about:|moz-extension:)/;

let translate_specific_tab_id = 0;
let translate_window_id = 0;

browser.tabs.query({}).then(async tabs => {
    for (let tab of tabs) {
	let val = await browser.sessions.getTabValue(tab.id, "destination");
	if (val == "specific_tab") {
	    translate_specific_tab_id = tab.id;
	    browser.tabs.onRemoved.addListener(tab_onRemoved);
	    browser.tabs.onUpdated.addListener(
		specific_tab_onUpdated, {tabId: tab.id, properties: ["status"]});
	    dest.set(tab.id, {...task});
	    insert_specific_tab_script(tab.id);
	    break;
	}
    }
});
browser.windows.getAll({populate: true}).then(async windows => {
    for (let window of windows) {
	let val = await browser.sessions.getWindowValue(window.id, "destination");
	if (val == "window_tab") {
	    translate_window_id = window.id;
	    browser.windows.onRemoved.addListener(window_onRemoved);
	    browser.tabs.onUpdated.addListener(
		window_tab_onUpdated, {tabId: window.tabs[0].id, properties: ["status"]});
	    dest.set(window.tabs[0].id, {...task});
	    insert_result_window_script(window.tabs[0].id);
	    browser.windows.update(window.id, {titlePreface: browser.i18n.getMessage("extension_name") + " "});
	}
    }
});

function tab_onRemoved(tabId, removeInfo) {
    if (translate_specific_tab_id && tabId == translate_specific_tab_id) {
	translate_specific_tab_id = 0;
	browser.tabs.onRemoved.removeListener(tab_onRemoved);
	browser.tabs.onUpdated.removeListener(specific_tab_onUpdated);
    }
}

function window_onRemoved(windowId) {
    if (translate_window_id && windowId == translate_window_id) {
	translate_window_id = 0;
	browser.windows.onRemoved.removeListener(window_onRemoved);
	browser.tabs.onUpdated.removeListener(window_tab_onUpdated);
	sidebar_msgs.delete(windowId);
    }
}

function specific_tab_onUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.status == "complete") {
	insert_specific_tab_script(tabId);
    }
}

function insert_specific_tab_script(tab_id) {
    browser.tabs.executeScript(tab_id, {file: "specific_tab_content.js", allFrames: true}).catch(error => {
	console.log(error.message);
    });
}

function window_tab_onUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.status == "complete") {
	insert_result_window_script(tabId);
    }
}

function insert_result_window_script(tab_id) {
    browser.tabs.executeScript(tab_id, {file: "result_window_content.js", allFrames: true}).catch(error => {
	console.log(error.message);
    });
}

async function hide_specific_tab(msg, sender, sendResponse) {
    if (sender.tab.id != translate_specific_tab_id) {
	return;
    }
    if (msg.tag_name == "TEXTAREA"
	&& !options.specific_tab_esc_textarea) {
	return;
    }
    switch (options.specific_tab_esc_behavior) {
    case "hide":
	let activate_tab = sender.tab.openerTabId;
	if (!activate_tab) {
	    let index;
	    if (sender.tab.index == 0 ) {
		index = 1;
	    } else {
		index = sender.tab.index - 1;
	    }
	    [activate_tab] = await browser.tabs.query({index, windowId: sender.tab.windowId});
	    activate_tab = activate_tab.id;
	}
	browser.tabs.update(activate_tab, {active: true}).then(tab => {
	    browser.tabs.hide(sender.tab.id);
	});
	break;
    case "activate":
	browser.tabs.update(sender.tab.openerTabId, {active: true});
	break;
    }
}

let opener_window_id;
async function minimize_result_window(msg, sender, sendResponse) {
    if (sender.tab.windowId != translate_window_id) {
	return;
    }
    if (msg.tag_name == "TEXTAREA" && !options.result_window_esc_textarea) {
	return;
    }
    switch (options.result_window_esc_behavior) {
    case "lower":
	if (!opener_window_id) {
	    let w = await browser.windows.getAll();
	    w = w.reduce((a,b) => !a.focused && (a.id < b.id) ? a : b);
	    opener_window_id = w.id;
	}
	browser.windows.update(opener_window_id, {focused: true});
	break;
    case "minimize":
	browser.windows.update(sender.tab.windowId, {state: "minimized"});
	break;
    }
}



function init_translator() {
    let urls = [];
    let u;
    try {
	if (options.text_translator_url) {
	    u = new URL(options.text_translator_url);
	    if (u.origin != "null") {
		options.text_translator_origin = u.origin + u.pathname;
		urls.push(u.origin + "/*");
	    }
	}
	if (options.text_translator_2nd_url) {
	    u = new URL(options.text_translator_2nd_url);
	    if (u.origin != "null") {
		options.text_translator_2nd_origin = u.origin + u.pathname;
		urls.push(u.origin + "/*");
	    }
	}
	for (let url of [options.page_translator_url, options.page_translator_2nd_url]) {
	    if (url) {
		u = new URL(url);
		if (u.origin != "null" && !urls.includes(u.origin + "/*")) {
		    urls.push(u.origin + "/*");
		}
	    }
	}
    } catch(e) {
	console.error(u + " " + e.message);
    }

    browser.tabs.onUpdated.removeListener(onUpdated_translator);
    browser.tabs.onRemoved.removeListener(onRemoved_translator);
    if (options.page_translator_target_regexp || options.text_translator_target_regexp ||
	options.page_translator_2nd_target_regexp || options.text_translator_2nd_target_regexp) {
	browser.tabs.onUpdated.addListener(onUpdated_translator,
					   {properties: ["status"],
					    urls: urls});
	browser.tabs.onRemoved.addListener(onRemoved_translator);
    }

    init_page_action();
    init_browser_action();
}


let task = {
    source_tab: null,
    destination: "translate_in_new_tab",
    type: "page_translator",
    target_regexp: /$^/,
};

let dest = new Map();
let target_langs = {};
function onRemoved_translator(tabId, removeInfo) {
    delete target_langs[tabId];
    dest.delete(tabId);
}

function onUpdated_translator(tabId, changeInfo, tabInfo) {
    if (changeInfo.status !== "complete") {
	return;
    }
    let task = dest.get(tabId);
    if (!task) {
	return;
    }

    if (options[task.type + "_delete_history"]) {
	browser.history.deleteUrl({url: tabInfo.url});
    }

    let match = tabInfo.url.match(task.target_regexp);
    if (!match || match.length < 2) {
	return;
    }
    if (!target_langs[task.source_tab.id]) {
	target_langs[task.source_tab.id] = {};
    }
    target_langs[task.source_tab.id][`${task.type}-${task.destination}`] = match[match.length - 1];
}

async function translate(where_to_show, source_tab, source_url, text, translator_kind = "auto", target_lang) {
    let translator_placeholder;
    let target_language;
    let display_in_iframe;
    if (text) {
	if (translator_kind === "auto") {
	    if (options.use_2nd_translator) {
		await browser.i18n.detectLanguage(text).then(result => {
		    if (result.isReliable &&
			ignore_languages.has(result.languages[0].language)) {
			translator_kind = "2";
		    } else {
			translator_kind = "1";
		    }
		});
	    } else {
		translator_kind = "1";
	    }
	}
	if (translator_kind === "2") {
	    translator_placeholder = options.text_translator_2nd_url;
	    display_in_iframe = options.text_translator_2nd_display_in_iframe;
	    browser_action_msg.width = options.text_translator_2nd_baction_width;
	    browser_action_msg.height = options.text_translator_2nd_baction_height;
	    browser_action_msg.iframe = display_in_iframe;
	    page_action_msg.width = options.text_translator_2nd_paction_width;
	    page_action_msg.height = options.text_translator_2nd_paction_height;
	    page_action_msg.iframe = display_in_iframe;
	    task.type = "text_translator_2nd";
	    task.target_regexp = options.text_translator_2nd_target_regexp;
	    target_language = options.text_translator_2nd_target_language;
	} else {
	    translator_placeholder = options.text_translator_url;
	    display_in_iframe = options.text_translator_display_in_iframe;
	    browser_action_msg.width = options.text_translator_baction_width;
	    browser_action_msg.height = options.text_translator_baction_height;
	    browser_action_msg.iframe = display_in_iframe;
	    page_action_msg.width = options.text_translator_paction_width;
	    page_action_msg.height = options.text_translator_paction_height;
	    page_action_msg.iframe = display_in_iframe;
	    task.type = "text_translator";
	    task.target_regexp = options.text_translator_target_regexp;
	    target_language = options.text_translator_target_language;
	}
    } else {
	if (disable_translator_url_regexp.test(source_tab.url)) {
	    notify(browser.i18n.getMessage("untranslatable_url", [source_tab.url]));
	    return;
	}
	if (translator_kind === "auto") {
	    if (options.use_2nd_translator) {
		await browser.tabs.detectLanguage(source_tab.id).then(pagelanguage => {
		    if (ignore_languages.has(pagelanguage)) {
			translator_kind = "2";
		    } else {
			translator_kind = "1";
		    }
		});
	    } else {
		translator_kind = "1";
	    }
	}
	if (translator_kind === "2") {
	    translator_placeholder = options.page_translator_2nd_url;
	    display_in_iframe = options.page_translator_2nd_display_in_iframe;
	    browser_action_msg.width = options.page_translator_2nd_baction_width;
	    browser_action_msg.height = options.page_translator_2nd_baction_height;
	    browser_action_msg.iframe = display_in_iframe;
	    page_action_msg.width = options.page_translator_2nd_paction_width;
	    page_action_msg.height = options.page_translator_2nd_paction_height;
	    page_action_msg.iframe = display_in_iframe;
	    task.type = "page_translator_2nd";
	    task.target_regexp = options.page_translator_2nd_target_regexp;
	    target_language = options.page_translator_2nd_target_language;
	} else {
	    translator_placeholder = options.page_translator_url;
	    display_in_iframe = options.page_translator_display_in_iframe;
	    browser_action_msg.width = options.page_translator_baction_width;
	    browser_action_msg.height = options.page_translator_baction_height;
	    browser_action_msg.iframe = display_in_iframe;
	    page_action_msg.width = options.page_translator_paction_width;
	    page_action_msg.height = options.page_translator_paction_height;
	    page_action_msg.iframe = display_in_iframe;
	    task.type = "page_translator";
	    task.target_regexp = options.page_translator_target_regexp;
	    target_language = options.page_translator_target_language;
	}
    }
    task.source_tab = source_tab;
    task.destination = where_to_show;
    if (!target_language) {
	target_language = window.navigator.language;
    }
    if (target_langs[source_tab.id]) {
	target_language = target_langs[source_tab.id][`${task.type}-${task.destination}`] ||
	    target_language;
    }
    if (target_lang) {
	target_language = target_lang;
    }
    let translator_url = await get_translator_url(translator_placeholder, source_url, target_language, text);
    switch (where_to_show) {
    case "translate_in_specific_tab":
	translate_in_specific_tab(source_tab, translator_url);
	break;
    case "translate_in_new_tab":
	translate_in_new_tab(source_tab, translator_url);
	break;
    case "translate_in_current_tab":
	translate_in_current_tab(source_tab, translator_url);
	break;
    case "translate_in_window":
	translate_in_window(source_tab, translator_url);
	break;
    case "translate_in_sidebar":
	translate_in_sidebar(source_tab, translator_url, display_in_iframe);
	break;
    case "translate_in_browser_action":
	translate_in_browser_action(source_tab, translator_url);
	break;
    case "translate_in_page_action":
	translate_in_page_action(source_tab, translator_url);
	break;
    }
}

async function get_translator_url(translator_url, page_url, lang, text = "") {
    let source_lang = lang;
    if (text) {
	await browser.i18n.detectLanguage(text).then(result => {
	    if (result.languages.length) {
		source_lang = result.languages[0].language;
	    }
	});
    } else {
	await browser.tabs.detectLanguage().then(pagelanguage => {
	    if (pagelanguage != "und") {
		source_lang = pagelanguage;
	    }
	});
    }
    return translator_url.replace(/@url@/, encodeURIComponent(page_url))
	.replace(/@lang@/, encodeURIComponent(lang))
	.replace(/@text@/, encodeURIComponent(text))
	.replace(/@source_lang@/, encodeURIComponent(source_lang));
}

function translate_in_specific_tab(tab, url) {
    browser.tabs.get(translate_specific_tab_id).then(tab_info => {
	dest.set(tab.id, {...task});
	let tab_prop = {
	    index: tab.index,
	    windowId: tab.windowId
	};
	if (tab_info.index > tab.index) {
	    tab_prop.index++;
	}
	browser.tabs.move(tab_info.id, tab_prop).then(moved_tabs => {
	    let tab_prop = {
		url: url,
		openerTabId: tab.id,
		active: true
	    };
	    browser.tabs.update(tab_info.id, tab_prop).then(tab_info => {
	    }).catch(error => {
		console.error(error.message);
	    });
	});
    }).catch(error => {
	let tab_prop = {
	    url: url,
	    openerTabId: tab.id,
	    index: tab.index + 1,
	    windowId: tab.windowId
	};
	browser.tabs.create(tab_prop).then(tab => {
	    translate_specific_tab_id = tab.id;
	    dest.set(tab.id, {...task});
	    browser.sessions.setTabValue(translate_specific_tab_id, "destination", "specific_tab");
	    browser.tabs.onRemoved.addListener(tab_onRemoved);
	    browser.tabs.onUpdated.addListener(
		specific_tab_onUpdated, {tabId: tab.id, properties: ["status"]});
	}).catch(error => {
	    translate_specific_tab_id = 0;
	    console.error(error.message);
	});
    });
}

function translate_in_new_tab(tab, url) {
    let tab_prop = {
	url: url,
	openerTabId: tab.id,
	index: tab.index + 1,
	windowId: tab.windowId
    };
    browser.tabs.create(tab_prop).then(tab => {
	dest.set(tab.id, {...task});
    }).catch(error => {
	console.error(error.message);
    });
}

function translate_in_current_tab(tab, url) {
    let tab_prop = {
	url: url
    };
    dest.set(tab.id, {...task});
    browser.tabs.update(tab.id, tab_prop).catch(error => {
	console.error(error.message);
    });
}

function translate_in_window(tab, url) {
    browser.windows.get(translate_window_id, {populate: true}).then(window_info => {
	let tab_prop = {
	    url: url
	};
	dest.set(window_info.tabs[0].id, {...task});
	browser.tabs.update(window_info.tabs[0].id, tab_prop).catch(error => {
	    console.error(error.message);
	});
	let coord = options[task.type + "_window_coord"];
	let window_prop = {
	    ...coord,
	    focused: true
	};
	browser.windows.update(window_info.id, window_prop);
    }).catch(error => {
	let win_prop = {
	    type: "popup",
	    url: url,
	    titlePreface: browser.i18n.getMessage("extension_name") + " "
	};
	browser.windows.create(win_prop).then(window_info => {
	    dest.set(window_info.tabs[0].id, {...task});
	    translate_window_id = window_info.id;
	    let coord = options[task.type + "_window_coord"];
	    let win_prop = {
		...coord,
		focused: true
	    };
	    browser.windows.update(window_info.id, win_prop);
	    browser.sessions.setWindowValue(translate_window_id, "destination", "window_tab");
	    browser.windows.onRemoved.addListener(window_onRemoved);
	    browser.tabs.onUpdated.addListener(
		window_tab_onUpdated, {tabId: window_info.tabs[0].id, properties: ["status"]});
	});
    });
    opener_window_id = tab.windowId;
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.msg) {
    case "browser_action_loaded":
	return browser_action_loaded(msg, sender, sendResponse);
	break;
    case "browser_action_action":
	return ba_pa_action(msg);
	break;
    case "page_action_loaded":
	return page_action_loaded(msg, sender, sendResponse);
	break;
    case "page_action_action":
	return ba_pa_action(msg);
	break;
    case "gte_loaded":
	gte_loaded(msg, sender);
	break;
    case "gte_removed":
	gte_removed(msg, sender);
	break;
    case "specific_tab_esc":
	hide_specific_tab(msg, sender, sendResponse);
	break;
    case "result_window_esc":
	minimize_result_window(msg, sender, sendResponse);
	break;
    case "sidebar_loaded":
	return sidebar_loaded(msg, sender, sendResponse);
	break;
    case "sidebar_translate":
	browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
	    translate("translate_in_sidebar", tabs[0], tabs[0].url, msg.text, msg.translator_kind);
	});
	break;
    }
    return false;
});

function get_selection(tabId, url) {
    return browser.tabs.executeScript(tabId, {code: "get_selection()", allFrames: true}).catch(error => {
	return browser.tabs.executeScript(tabId, {file: "get_selection.js", allFrames: true}).catch(error => {
	    return "";
	});
    }).then(result => {
	for (let text of result) {
	    if (text != "") {
		return text;
	    }
	}
	return "";
    });
}

let last_window_id = 0;
browser.windows.onFocusChanged.addListener(windowId => {
    if (last_window_id == translate_window_id && windowId !== translate_window_id) {
	browser.windows.get(translate_window_id).then(window_info => {
	    if (window_info.state != "normal") {
		return;
	    }
	    let key = task.type + "_window_coord";
	    let coord = options[key];
	    if (coord == undefined) {
		coord = {};
	    }
	    if (window_info.width != coord.width
		|| window_info.height !== coord.height
		|| window_info.left !== coord.left
		|| window_info.top !== coord.top) {
		coord.width = window_info.width;
		coord.height = window_info.height;
		coord.left = window_info.left;
		coord.top = window_info.top;
		browser.storage.local.set({[key]: coord});
	    }
	}).catch(error => {});
    }
    last_window_id = windowId;
});

function disable_non_existent_api() {
    if (!browser.history) {
	browser.history = {};
	browser.history.deleteUrl = function() {};
    }
    if (!browser.tabs.hide) {
	browser.history = {};
	browser.tabs.hide = function() {};
    }
    if (!browser.sessions) {
	browser.sessions = {};
	browser.sessions.setTabValue =
	    browser.sessions.getTabValue =
	    browser.sessions.setWindowValue =
	    browser.sessions.getWindowValue = function() {};
    }
}
disable_non_existent_api();

browser.permissions.onRemoved.addListener(permissions => {
    disable_non_existent_api();
});
