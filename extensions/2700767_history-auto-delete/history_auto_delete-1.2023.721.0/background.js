"use strict";

let options = {};
let regexp = /$^/;
async function init(changes, areaname) {
    options = await browser.storage.local.get();
    browser.history.onVisited.removeListener(onVisited);
    if (options.auto_delete_urls.length && /\S/.test(options.auto_delete_urls)) {
	regexp = urls_to_regexp(options.auto_delete_urls);
	browser.history.onVisited.addListener(onVisited);
    }
}
init();
browser.storage.onChanged.addListener(init);

function urls_to_regexp(text) {
    return new RegExp(text.trim().split(/\s*\n\s*/).join("|"));
}

let timer;
let fifo = [];
function onVisited(result) {
    if (regexp.test(result.url)) {
	fifo.push(result.url);
	clearTimeout(timer);
	timer = setTimeout(delete_history, options.waite_time_before_start);
    }
}

let lock = false;
async function delete_history() {
    if (lock) {
	return;
    } else {
	lock = true;
    }
    while (fifo.length) {
	let url = fifo.shift();
	browser.history.deleteUrl({url: url});
	await new Promise(resolve => setTimeout(resolve, options.wait_time_between_deletions));
    }
    lock = false;
}

browser.runtime.onInstalled.addListener(details => {
    switch (details.reason) {
    case "install":
	browser.runtime.openOptionsPage();
	break;
    }
});
