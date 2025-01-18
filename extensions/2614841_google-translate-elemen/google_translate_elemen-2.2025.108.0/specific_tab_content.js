"use strict";

document.body.addEventListener("keydown", e => {
    if (e.key == "Escape" && !e.repeat) {
	browser.runtime.sendMessage({msg: "specific_tab_esc", tag_name: e.target.tagName});
    }
});

browser.storage.local.get("specific_tab_set_favicon").then(items => {
    if (items.specific_tab_set_favicon) {
	let link = document.createElement("link");
	link.rel = "icon";
	link.href = browser.runtime.getURL("lib/icons8-google-translate2.png");
	document.head.append(link);
    }
});
