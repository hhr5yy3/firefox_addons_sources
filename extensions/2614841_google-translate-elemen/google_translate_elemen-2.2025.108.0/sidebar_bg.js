"use strict";

let sidebar_msgs = new Map();

async function sidebar_loaded(msg, sender, sendResponse) {
    let sb_msg = sidebar_msgs.get(msg.window_id);
    if (!sb_msg) {
	let {url, iframe} = set_sidebar_panel();
	sb_msg = {msg: "show_form", src: url};
    }
    sidebar_msgs.delete(msg.window_id);
    return sb_msg;
}

async function translate_in_sidebar(tab, url, display_in_iframe) {
    let sidebar_msg = {
    	to: "sidebar",
	window_id: tab.windowId,
    	msg: "show",
    	src: url,
	iframe: display_in_iframe
    };

    browser.runtime.sendMessage(sidebar_msg).then(msg => {
	if (msg.window_id == tab.windowId && msg.msg == "done") {
	    sidebar_msgs.delete(tab.windowId);
	} else {
	    sidebar_msgs.set(tab.windowId, sidebar_msg);
	}
    }).catch(error => {
	sidebar_msgs.set(tab.windowId, sidebar_msg);
    });
}

async function display_sidebar_default_page(tab) {
    if (!tab) {
	[tab] = await browser.tabs.query({active: true, currentWindow: true});
    }
    let {url, iframe} = set_sidebar_panel(tab.id);
    translate_in_sidebar(tab, url, iframe);
}

function set_sidebar_panel() {
    switch(options.sidebar_default_page) {
    case "default_translator":
	return {
	    url: options.text_translator_origin || null,
	    iframe: options.text_translator_display_in_iframe
	};
	break;
    case "second_translator":
	return {
	    url: options.text_translator_2nd_origin || null,
	    iframe: options.text_translator_2nd_display_in_iframe
	};
	break;
    case "sidebar_input_page":
    default:
	return {url: null, iframe: true};
	break;
    }
}

