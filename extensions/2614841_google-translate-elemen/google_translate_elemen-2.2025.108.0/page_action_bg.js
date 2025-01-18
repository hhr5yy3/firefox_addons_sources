"use strict";

let page_action_msg = {
    to: "page_action",
    msg: "",
    url: "",
    width: 800,
    height: 600
};
let page_action_list = [];

async function init_page_action() {
    if (!options.page_action_button_action) {
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

    page_action_list = Object.entries(options.page_action_button_action)
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
}

function translate_in_page_action(tab, url) {
    page_action_msg = {
	...page_action_msg,
	msg: "show",
    	url: url,
    };
    browser.runtime.sendMessage({...page_action_msg}).then(msg => {
	page_action_msg.msg = "";
    }).catch(error => {
	console.log(error.message);
	window.dispatchEvent(new Event("pa_data_ready"));
    });
}

function page_action_loaded(msg, sender, sendResponse) {
    switch (page_action_msg.msg) {
    case "show":
	sendResponse({...page_action_msg});
	page_action_msg.msg = "";
	break;
    case "wait":
	window.addEventListener("pa_data_ready", listener);
	function listener(e) {
	    window.removeEventListener("pa_data_ready", listener);
	    sendResponse({...page_action_msg});
	    page_action_msg.msg = "";
	};
	return true;
	break;
    default:
	switch (page_action_list.length) {
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
	    page_action_msg.msg = "";
	    return true;
	    break;
	case 1:
	    if (page_action_list[0].action !== "translate_in_page_action") {
		sendResponse({msg: "close"});
	    } else {
		sendResponse({msg: "wait"});
	    }
	    ba_pa_action({msg: "page_action_action", action: page_action_list[0].action});
	    break;
	default:
	    sendResponse({msg: "show_buttons", list: page_action_list, style: options.page_action_style});
	    page_action_msg.msg = "";
	    return false;
	}
	break;
    }
}
