"use strict";

let browser_action_msg = {
    to: "browser_action",
    msg: "",
    url: "",
    width: 800,
    height: 600
};
let browser_action_list = [];

async function init_browser_action() {
    if (!options.browser_action_button_action) {
	return;
    }

    let p = options.page_translator_favicon ? await options.page_translator_favicon.text() : null;
    let t = options.text_translator_favicon ? await options.text_translator_favicon.text() : null;
    let p_url, t_url;
    if (t && t == p) {
	t_url = URL.createObjectURL(options.text_translator_favicon);
	p_url = null;
    } else {
	if (p) {
	    p_url = URL.createObjectURL(options.page_translator_favicon);
	}
	if (t) {
	    t_url = URL.createObjectURL(options.text_translator_favicon);
	}
    }
    p = options.page_translator_2nd_favicon ? await options.page_translator_2nd_favicon.text() : null;
    t = options.text_translator_2nd_favicon ? await options.text_translator_2nd_favicon.text() : null;
    let p2_url, t2_url;
    if (t && t == p) {
	t2_url = URL.createObjectURL(options.text_translator_2nd_favicon);
	p2_url = null;
    } else {
	if (p) {
	    p2_url = URL.createObjectURL(options.page_translator_2nd_favicon);
	}
	if (t) {
	    t2_url = URL.createObjectURL(options.text_translator_2nd_favicon);
	}
    }

    browser_action_list = Object.entries(options.browser_action_button_action)
	.filter(a => {return a[1] ? true : false;})
	.sort((a, b) => {return a[1] -  b[1];})
	.map(a => {
	    let o = {
		action: a[0],
		title: browser.i18n.getMessage(a[0]),
		label: browser.i18n.getMessage(a[0] + "_label") || browser.i18n.getMessage(a[0])
	    };
	    if (/on_2nd/.test(a[0])) {
		o.page_translator_favicon_url = p2_url;
		o.text_translator_favicon_url = t2_url;
	    } else if (/_2_/.test(a[0])) {
		o.page_translator_favicon_url = null;
		o.text_translator_favicon_url = t2_url;
	    } else if (/translate_in/.test(a[0])) {
		o.page_translator_favicon_url = p_url;
		o.text_translator_favicon_url = t_url;
	    } else if (/_1_/.test(a[0])) {
		o.page_translator_favicon_url = null;
		o.text_translator_favicon_url = t_url;
	    } else {
		o.page_translator_favicon_url = browser.runtime.getURL("/lib/icons8-google-translate.png");
		o.text_translator_favicon_rl = null;
	    }
	    return o;
	});
    if (browser_action_list.length == 1) {
	browser.browserAction.setTitle({title: browser_action_list[0].title});
    }
}

function translate_in_browser_action(tab, url) {
    browser_action_msg = {
	...browser_action_msg,
	msg: "show",
    	url: url,
    };
    browser.runtime.sendMessage({...browser_action_msg}).then(msg => {
	browser_action_msg.msg = "";
    }).catch(error => {
	console.log(error.message);
	window.dispatchEvent(new Event("ba_data_ready"));
    });
}

function browser_action_loaded(msg, sender, sendResponse) {
    switch (browser_action_msg.msg) {
    case "show":
	sendResponse({...browser_action_msg});
	browser_action_msg.msg = "";
	break;
    case "wait":
	window.addEventListener("ba_data_ready", listener);
	function listener(e) {
	    window.removeEventListener("ba_data_ready", listener);
	    sendResponse({...browser_action_msg});
	    browser_action_msg.msg = "";
	};
	return true;
	break;
    default:
	switch (browser_action_list.length) {
	case 0:
	    browser.tabs.query({active: true, currentWindow: true}).then(async tabs => {
		let text = await get_selection(tabs[0].id, tabs[0].url);
		let msg = {
		    msg: "show",
		    width: options.text_translator_baction_width,
		    height: options.text_translator_baction_height,
		    iframe: options.text_translator_display_in_iframe
		};
		if (text) {
		    msg.url = await get_translator_url(options.text_translator_url, tabs[0].url, options.text_translator_target_language || window.navigator.language, text);
		    sendResponse(msg);
		} else {
		    msg.url = options.text_translator_origin;
		    sendResponse(msg);
		}
	    });
	    browser_action_msg.msg = "";
	    return true;
	    break;
	case 1:
	    if (browser_action_list[0].action !== "translate_in_browser_action") {
		sendResponse({msg: "close"});
	    } else {
		sendResponse({msg: "wait"});
	    }
	    ba_pa_action({msg: "browser_action_action", action: browser_action_list[0].action});
	    break;
	default:
	    sendResponse({msg: "show_buttons", list: browser_action_list, style: options.browser_action_style});
	    browser_action_msg.msg = "";
	    return false;
	}
	break;
    }
}

async function ba_pa_action(msg) {
    let translator_kind = "auto";
    let action = msg.action;
    if (/_on_2nd_/.test(action)) {
	action = action.replace(/_on_2nd/, "");
	translator_kind = "2";
    }
    let [tab] = await browser.tabs.query({active: true, currentWindow: true});
    switch (action) {
    case "insert_element":
	insert_element(tab.id, tab.url, true);
	break;
    case "toggle_translate":
	toggle_translate(tab.id);
	break;
    case "toggle_toolbar":
	toggle_toolbar(tab.id);
	break;
    case "translate_in_specific_tab":
    case "translate_in_new_tab":
    case "translate_in_current_tab":
    case "translate_in_window":
    case "translate_in_sidebar":
    case "translate_in_browser_action":
    case "translate_in_page_action":
	let text;
	if (msg.ctrlKey) {
	    text = await navigator.clipboard.readText();
	} else {
	    text = await get_selection(tab.id, tab.url);
	}
	translate(action, tab, tab.url, text, translator_kind);
	break;
    case "remove_decorative_tags":
	remove_decorative_tags(tab.id);
	break;
    case "open_1_in_specific_tab":
	open_in_tab(tab, translate_in_specific_tab, options.text_translator_url);
	break;
    case "open_1_in_new_tab":
	open_in_tab(tab, translate_in_new_tab, options.text_translator_url);
	break;
    case "open_1_in_current_tab":
	open_in_tab(tab, translate_in_current_tab, options.text_translator_url);
	break;
    case "open_1_in_window":
	open_in_tab(tab, translate_in_window, options.text_translator_url);
	break;
    case "open_2_in_specific_tab":
	open_in_tab(tab, translate_in_specific_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_new_tab":
	open_in_tab(tab, translate_in_new_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_current_tab":
	open_in_tab(tab, translate_in_current_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_window":
	open_in_tab(tab, translate_in_window, options.text_translator_2nd_url);
	break;
    }
    if (action === "translate_in_browser_action") {
	browser_action_msg.msg = "wait";
    } else if (action === "translate_in_page_action") {
	page_action_msg.msg = "wait";
    }
}
