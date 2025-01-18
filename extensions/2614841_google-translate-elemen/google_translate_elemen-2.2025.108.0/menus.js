"use strict";

let insert_element_title;
async function create_menus() {
    let menu_items = {
	translate_in_specific_tab: _translate_in_specific_tab,
	translate_in_new_tab: _translate_in_new_tab,
	translate_in_current_tab: _translate_in_current_tab,
	translate_in_window: _translate_in_window,
	translate_in_sidebar: _translate_in_sidebar,
	translate_in_browser_action: _translate_in_browser_action,
	translate_in_page_action: _translate_in_page_action,
	translate_on_2nd_in_specific_tab: _translate_on_2nd_in_specific_tab,
	translate_on_2nd_in_new_tab: _translate_on_2nd_in_new_tab,
	translate_on_2nd_in_current_tab: _translate_on_2nd_in_current_tab,
	translate_on_2nd_in_window: _translate_on_2nd_in_window,
	translate_on_2nd_in_sidebar: _translate_on_2nd_in_sidebar,
	translate_on_2nd_in_browser_action: _translate_on_2nd_in_browser_action,
	translate_on_2nd_in_page_action: _translate_on_2nd_in_page_action,
	insert_element: _insert_element,
	toggle_translate: _toggle_translate,
	toggle_toolbar: _toggle_toolbar,
	insert_automatically: _insert_automatically,
	translate_automatically: _translate_automatically,
	hide_toolbar: _hide_toolbar,
	open_option_page: _open_option_page,
	open_1_in_specific_tab: _open_1_in_specific_tab,
	open_1_in_new_tab: _open_1_in_new_tab,
	open_1_in_current_tab: _open_1_in_current_tab,
	open_1_in_window: _open_1_in_window,
	open_2_in_specific_tab: _open_2_in_specific_tab,
	open_2_in_new_tab: _open_2_in_new_tab,
	open_2_in_current_tab: _open_2_in_current_tab,
	open_2_in_window: _open_2_in_window,
	open_sidebar: _open_sidebar,
	display_sidebar_default_page: _display_sidebar_default_page,
	open_browseraction: _open_browseraction,
	open_pageaction: _open_pageaction,
	remove_decorative_tags: _remove_decorative_tags,
    };

    if (!options.context_menu_action) {
	return;
    }

    let commands = await browser.commands.getAll();
    let sc = new Map();
    for (let elem of commands) {
        sc.set(elem.name, elem.shortcut);
    }

    let order = Object.entries(options.context_menu_action)
	.filter(a => {return a[1] ? true : false;})
	.sort((a, b) => {return a[1] -  b[1];})
	.map(a => {
	    return a[0];
	});
    browser.menus.removeAll();
    for (let item of order) {
	if (menu_items[item]) {
	    menu_items[item].call(this);
	}
    }

    function _translate_in_specific_tab() {
	let id = "translate_in_specific_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_in_new_tab() {
	let id = "translate_in_new_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_in_current_tab() {
	let id = "translate_in_current_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_in_window() {
	let id = "translate_in_window";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_in_sidebar() {
	let id = "translate_in_sidebar";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => {
		browser.sidebarAction.open();
		on_click_translate(info, tab);
	    }
	});
    }

    function _translate_in_browser_action() {
	let id = "translate_in_browser_action";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => {
		browser_action_msg.msg = "wait";
		on_click_translate(info, tab);
		browser.browserAction.openPopup();
	    }
	});
    }
    
    function _translate_in_page_action() {
	let id = "translate_in_page_action";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => {
		browser_action_msg.msg = "wait";
		on_click_translate(info, tab);
		browser.pageAction.openPopup();
	    }
	});
    }

    function _translate_on_2nd_in_specific_tab() {
	let id = "translate_on_2nd_in_specific_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_on_2nd_in_new_tab() {
	let id = "translate_on_2nd_in_new_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_on_2nd_in_current_tab() {
	let id = "translate_on_2nd_in_current_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_on_2nd_in_window() {
	let id = "translate_on_2nd_in_window";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: on_click_translate
	});
    }

    function _translate_on_2nd_in_sidebar() {
	let id = "translate_on_2nd_in_sidebar";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => {
		browser.sidebarAction.open();
		on_click_translate(info, tab);
	    }
	});
    }

    function _translate_on_2nd_in_browser_action() {
	let id = "translate_on_2nd_in_browser_action";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => {
		browser_action_msg.msg = "wait";
		on_click_translate(info, tab);
		browser.browserAction.openPopup();
	    }
	});
    }
    
    function _translate_on_2nd_in_page_action() {
	let id = "translate_on_2nd_in_page_action";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => {
		browser_action_msg.msg = "wait";
		on_click_translate(info, tab);
		browser.pageAction.openPopup();
	    }
	});
    }
    
    function _insert_element() {
	let id = "insert_element";
	let shortcut = sc.get(id);
	insert_element_title = browser.i18n.getMessage(id);
	if (shortcut) {
	    insert_element_title = insert_element_title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: insert_element_title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate.png")},
	    onclick: (info, tab) => {
		insert_element(tab.id, info.pageUrl, true);
	    }
	});
    }
    
    function _toggle_translate() {
	let id = "toggle_translate";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate.png")},
	    onclick: (info, tab) => {
		toggle_translate(tab.id);
	    }
	});
    }
    
    function _toggle_toolbar() {
	let id = "toggle_toolbar";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate.png")},
	    onclick: (info, tab) => {
		toggle_toolbar(tab.id);
	    }
	});
    }

    function _insert_automatically() {
	browser.menus.create({
	    type: "checkbox",
	    checked: options.auto_insert,
	    contexts: ["all", "tab"],
	    id: "insert_automatically",
	    title: browser.i18n.getMessage("insert_automatically"),
	    onclick: (info, tab) => {
		switch_auto_insert(info.checked);
	    }
	});
    }

    function _translate_automatically() {
	browser.menus.create({
	    type: "checkbox",
	    checked: options.auto_translate,
	    contexts: ["all", "tab"],
	    id: "translate_automatically",
	    title: browser.i18n.getMessage("translate_automatically"),
	    onclick: (info, tab) => {
		options.auto_translate = info.checked;
	    }
	});
    }

    function _hide_toolbar() {
	browser.menus.create({
	    type: "checkbox",
	    checked: options.hide_toolbar,
	    contexts: ["all", "tab"],
	    id: "hide_toolbar",
	    title: browser.i18n.getMessage("hide_toolbar"),
	    onclick: (info, tab) => {
		options.hide_toolbar = info.checked;
	    }
	});
    }

    function _open_option_page() {
	let id = "open_option_page";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"27": browser.runtime.getURL("lib/options.png")},
	    onclick: (info, tab) => {
		browser.runtime.openOptionsPage();
	    }
	});
    }

    function _open_1_in_specific_tab() {
	let id = "open_1_in_specific_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_specific_tab, options.text_translator_url)
	});
    }

    function _open_1_in_new_tab() {
	let id = "open_1_in_new_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_new_tab, options.text_translator_url)
	});
    }

    function _open_1_in_current_tab() {
	let id = "open_1_in_current_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_current_tab, options.text_translator_url)
	});
    }

    function _open_1_in_window() {
	let id = "open_1_in_window";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_window, options.text_translator_url)
	});
    }

    function _open_2_in_specific_tab() {
	let id = "open_2_in_specific_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_specific_tab, options.text_translator_2nd_url)
	});
    }

    function _open_2_in_new_tab() {
	let id = "open_2_in_new_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_new_tab, options.text_translator_2nd_url)
	});
    }

    function _open_2_in_current_tab() {
	let id = "open_2_in_current_tab";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_current_tab, options.text_translator_2nd_url)
	});
    }

    function _open_2_in_window() {
	let id = "open_2_in_window";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"16": options.text_translator_2nd_favicon_url},
	    onclick: (info, tab) => open_in_tab(tab, translate_in_window, options.text_translator_2nd_url)
	});
    }

    function _open_sidebar() {
	let id = "open_sidebar";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate2.png")},
	    onclick: (info, tab) => {
		browser.sidebarAction.open();
	    }
	});
    }

    function _display_sidebar_default_page() {
	let id = "display_sidebar_default_page";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate2.png")},
	    onclick: (info, tab) => {
		browser.sidebarAction.open();
		display_sidebar_default_page(tab);
	    }
	});
    }

    function _open_browseraction() {
	let id = "open_browseraction";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate2.png")},
	    onclick: (info, tab) => {
		browser.browserAction.openPopup();
	    }
	});
    }

    function _open_pageaction() {
	let id = "open_pageaction";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate2.png")},
	    onclick: (info, tab) => {
		browser.pageAction.openPopup();
	    }
	});
    }

    function _remove_decorative_tags() {
	let id = "remove_decorative_tags";
	let shortcut = sc.get(id);
	let title = browser.i18n.getMessage(id);
	if (shortcut) {
	    title = title + ` (${shortcut})`;
	}
	browser.menus.create({
	    contexts: ["all", "tab"],
	    id: id,
	    title: title,
	    icons: {"96": browser.runtime.getURL("lib/icons8-google-translate.png")},
	    onclick: (info, tab) => {
		remove_decorative_tags(tab.id);
	    }
	});
    }

    async function on_click_translate(info, tab) {
	let source_url = info.linkUrl || info.pageUrl;
	let text;
	if (info.button == 1) {
	    text = await navigator.clipboard.readText();
	} else {
	    text = info.selectionText || "";
	}
	let action = info.menuItemId;
	let translator_kind;
	if (/_on_2nd_/.test(action)) {
	    action = action.replace(/_on_2nd/, "");
	    if (info.modifiers.includes("Ctrl")) {
		translator_kind = "1";
	    } else {
		translator_kind = "2";
	    }
	} else {
	    if (info.modifiers.includes("Ctrl")) {
		translator_kind = "1";
	    } else if (info.modifiers.includes("Shift")) {
		translator_kind = "2";
	    } else {
		translator_kind = "auto";
	    }
	}
	translate(action, tab, source_url, text, translator_kind);
    }
}

async function open_in_tab(tab, translate_func, translator_url) {
    let target_lang = options.text_translator_target_language || window.navigator.language;
    let url = await get_translator_url(translator_url, "", target_lang, "");
    translate_func(tab, url);
}

let menus_icon_mode = "text";
browser.menus.onShown.addListener(async info => {
    let lang = await browser.tabs.detectLanguage();
    lang = lang == "und" ? "" : `(${lang}) `;
    let flag = info.pageUrl &&
	!disable_element_url_regexp.test(info.pageUrl) ? true : false;
    browser.menus.update("insert_element",
			 {title: lang + insert_element_title,
			  enabled: flag});

    
    if (info.selectionText) {
	if (menus_icon_mode != "text") {
	    menus_icon_mode = "text";
	    browser.menus.update("translate_in_specific_tab", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_new_tab", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_current_tab", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_window", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_sidebar", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_browser_action", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_in_page_action", {icons: {"16": options.text_translator_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_specific_tab", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_new_tab", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_current_tab", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_window", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_sidebar", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_browser_action", {icons: {"16": options.text_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_page_action", {icons: {"16": options.text_translator_2nd_favicon_url}});
	}
    } else {
	if (menus_icon_mode == "text") {
	    menus_icon_mode = "page";
	    browser.menus.update("translate_in_specific_tab", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_new_tab", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_current_tab", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_window", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_sidebar", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_browser_action", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_in_page_action", {icons: {"16": options.page_translator_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_specific_tab", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_new_tab", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_current_tab", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_window", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_sidebar", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_browser_action", {icons: {"16": options.page_translator_2nd_favicon_url}});
	    browser.menus.update("translate_on_2nd_in_page_action", {icons: {"16": options.page_translator_2nd_favicon_url}});
	}
    }
    browser.menus.refresh();
});
