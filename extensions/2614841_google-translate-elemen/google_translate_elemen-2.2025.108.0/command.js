"use strict";

browser.commands.onCommand.addListener(async action => {
    let translator_kind = "auto";
    let clipboard = false;
    if (/_on_2nd_/.test(action)) {
	action = action.replace(/_on_2nd/, "");
	translator_kind = "2";
    }
    if (/_clipboard/.test(action)) {
	action = action.replace(/_clipboard/, "");
	clipboard = true;
    }
    if (action === "translate_in_sidebar"
	|| action === "display_sidebar_default_page") {
	browser.sidebarAction.open();
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
	if (clipboard) {
	    text = await navigator.clipboard.readText();
	} else {
	    text = await get_selection(tab.id, tab.url);
	}
	translate(action, tab, tab.url, text, translator_kind);
	break;
    case "open_1_in_specific_tab":
	command_open_in_tab(tab, translate_in_specific_tab, options.text_translator_url);
	break;
    case "open_1_in_new_tab":
	command_open_in_tab(tab, translate_in_new_tab, options.text_translator_url);
	break;
    case "open_1_in_current_tab":
	command_open_in_tab(tab, translate_in_current_tab, options.text_translator_url);
	break;
    case "open_1_in_window":
	command_open_in_tab(tab, translate_in_window, options.text_translator_url);
	break;
    case "open_2_in_specific_tab":
	command_open_in_tab(tab, translate_in_specific_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_new_tab":
	command_open_in_tab(tab, translate_in_new_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_current_tab":
	command_open_in_tab(tab, translate_in_current_tab, options.text_translator_2nd_url);
	break;
    case "open_2_in_window":
	command_open_in_tab(tab, translate_in_window, options.text_translator_2nd_url);
	break;
    case "display_sidebar_default_page":
	display_sidebar_default_page();
	break;
    case "remove_decorative_tags":
	remove_decorative_tags(tab.id);
	break;
    }
    if (action === "translate_in_browser_action") {
	browser_action_msg.msg = "wait";
	browser.browserAction.openPopup();
    } else if (action === "translate_in_page_action") {
	browser_action_msg.msg = "wait";
	browser.pageAction.openPopup();
    }
});

async function command_open_in_tab(tab, translate_func, translator_url) {
    let target_lang = options.text_translator_target_language || window.navigator.language;
    let url = await get_translator_url(translator_url, "", target_lang, "");
    translate_func(tab, url);
}
