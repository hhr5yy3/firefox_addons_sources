"use strict";

let options;
let ffversion;
let ignore_languages = new Map();

function init() {
    browser.runtime.getBrowserInfo().then(info => {
	ffversion = parseInt(info.version);
	init_options();
    });
}
init();

async function init_options(changes) {
    if (changes &&
	(changes.page_translator_window_coord
	 || changes.text_translator_window_coord
	 || changes.page_translator_2nd_window_coord
	 || changes.text_translator_2nd_window_coord)) {
	return;
    }
    let items = await browser.storage.local.get();
    options = items;
    if (options.ignore_languages) {
	let langs = options.ignore_languages.replace(/\s+/g, "").split(",");
	ignore_languages.clear();
	for (let lang of langs) {
	    ignore_languages.set(lang, true);
	}
    }

    let default_icon = browser.runtime.getURL("lib/icons8-google-translate2.png");
    options.page_translator_favicon_url = options.page_translator_favicon ?
	URL.createObjectURL(options.page_translator_favicon) : default_icon;
    options.text_translator_favicon_url = options.text_translator_favicon ?
	URL.createObjectURL(options.text_translator_favicon) : default_icon;
    options.page_translator_2nd_favicon_url = options.page_translator_2nd_favicon ?
	URL.createObjectURL(options.page_translator_2nd_favicon) : default_icon;
    options.text_translator_2nd_favicon_url = options.text_translator_2nd_favicon ?
	URL.createObjectURL(options.text_translator_2nd_favicon) : default_icon;

    create_menus();
    init_google_translate_element();
    init_translator();
}
browser.storage.onChanged.addListener(init_options);

function notify(message) {
    let msg = Array.from(arguments).join(" ");
    browser.notifications.create({
	"type": "basic",
	"iconUrl": browser.runtime.getURL("lib/icons8-google-translate.png"),
	"title": browser.i18n.getMessage("extension_name"),
	"message": msg
    });
}

browser.runtime.onInstalled.addListener(details => {
    switch (details.reason) {
    case "install":
	browser.runtime.openOptionsPage();
	set_default_favicon();
	break;
    case "update":
	let a = details.previousVersion.split(".").map(a => ("000" + a).slice(-4)).join(".");
	let b = "2.2023.108.0".split(".").map(a => ("000" + a).slice(-4)).join(".");
    	if (a <= b) {
	    let update_info = browser.i18n.getMessage("update_info");
	    browser.storage.local.set({update_info});
	    browser.runtime.openOptionsPage();
	    set_default_favicon();
	} else {
	    browser.storage.local.remove("update_info");
	}
	break;
    }
});

function set_default_favicon() {
    fetch("/lib/google-translate.png")
	.then(response => response.blob())
	.then(blob => browser.storage.local.set({page_translator_favicon: blob,
						 text_translator_favicon: blob}));
    fetch("/lib/microsoft-translate.png")
	.then(response => response.blob())
	.then(blob => browser.storage.local.set({text_translator_2nd_favicon: blob}));
    fetch("/lib/microsoft-translate2.png")
	.then(response => response.blob())
	.then(blob => browser.storage.local.set({page_translator_2nd_favicon: blob}));
}
