"use strict";

document.body.addEventListener("keydown", e => {
    if (e.key == "Escape" && !e.repeat) {
	browser.runtime.sendMessage({msg: "result_window_esc", tag_name: e.target.tagName});
    }
});
