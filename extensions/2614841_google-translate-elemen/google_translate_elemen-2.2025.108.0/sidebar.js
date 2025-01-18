"use strict";

let this_window;
let form = document.getElementById("form");
let iframe = document.getElementById("iframe");
let div = document.getElementById("div");
async function init() {
    this_window = await browser.windows.getCurrent();
    let msg = await browser.runtime.sendMessage({
	msg: "sidebar_loaded",
	window_id: this_window.id
    }).catch(error => {
	console.error(`Error: ${error}`);
    });
    exec(msg);
}
init();

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.to != "sidebar") {
	return;
    }
    if ( msg.window_id != this_window.id) {
	sendResponse({msg: "wrong_window_id", window_id: this_window.id});
	return;
    }
    exec(msg);
    sendResponse({msg: "done", window_id: this_window.id});
});

function exec(msg) {
    msg = msg ? msg : {};
    switch (msg.msg) {
    case "show":
	show(msg);
	break;
    case "show_form":
    default:
	show_form(msg);
	break;
    }
}

function show_form(msg) {
    if (msg.src) {
	show(msg);
    } else {
	form.style.display = "";
	iframe.style.display = "none";
    }
}

function show(msg) {
    if (msg.iframe) {
	if (msg.src) {
	    form.style.display = "none";
	    let u = new URL(msg.src);
	    browser.webRequest.onHeadersReceived.removeListener(onHeadersReceived_filter);
	    browser.webRequest.onHeadersReceived.addListener(onHeadersReceived_filter, {
		urls: [`${u.origin}/*`], tabId: -1, types: ["sub_frame"]
	    }, [
		"blocking", "responseHeaders"
	    ]);

	    delete iframe.srcdoc;
	    iframe.src = msg.src;
	    div.style.display = "none";
	    iframe.style.display = "";
	} else if (iframe.srcdoc) {
	    form.style.display = "none";
	    delete iframe.src;
	    iframe.srcdoc = msg.srcdoc;
	    div.style.display = "none";
	    iframe.style.display = "";
	} else {
	    form.style.display = "";
	    iframe.style.display = "none";
	}
	iframe.height = window.innerHeight;
    } else {
	window.location.href = msg.src;
    }
}

function onHeadersReceived_filter(details) {
    const {responseHeaders} = details;
    for (let i = responseHeaders.length - 1; i >= 0; --i) {
	if (responseHeaders[i].name.toLowerCase() == "x-frame-options") {
	    responseHeaders.splice(i, 1);
	}
    }
    return {responseHeaders};
}

iframe.addEventListener("load", e => {
    browser.webRequest.onHeadersReceived.removeListener(onHeadersReceived_filter);
});

function window_height() {
    if (document.body.clientHeight > window.innerHeight
	|| document.body.clientHeight < document.documentElement.clientHeight
       && document.documentElement.clientHeight <= window.innerHeight) {
	return document.documentElement.clientHeight;
    } else {
	return document.body.clientHeight;
    }
}

window.addEventListener("resize", e => {
    let iframe = document.getElementById("iframe");
    iframe.height = window.innerHeight;
});

let nodes = document.querySelectorAll("*");
for (let node of nodes) {
    if (node.dataset.i18n) {
	node.textContent = browser.i18n.getMessage(node.dataset.i18n);
    } else if (node.dataset.placeholder_i18n) {
	node.placeholder = browser.i18n.getMessage(node.dataset.placeholder_i18n);
    }
}

document.querySelectorAll(".submit").forEach(elem => {
    elem.addEventListener("click", translate);
});

function translate(e) {
    e.preventDefault();
    let text = document.getElementById("text").value;
    if (text) {
	browser.runtime.sendMessage({msg: "sidebar_translate", text, translator_kind: e.target.value});
    }
}

document.getElementById("text").addEventListener("keydown", e => {
    if (e.repeat) {
	return;
    }
    if (e.key == "Enter") {
	if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
	    e.stopPropagation();
	    e.preventDefault();
	    browser.runtime.sendMessage({msg: "sidebar_translate", text: e.target.value, translator_kind: "1"});
	} else if (e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
	    e.stopPropagation();
	    e.preventDefault();
	    browser.runtime.sendMessage({msg: "sidebar_translate", text: e.target.value, translator_kind: "2"});
	}
    }
 });
