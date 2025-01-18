"use strict";

let options = {};
function init() {
    let observer = new MutationObserver(observe_func);
    observer.observe(document, {childList: true, subtree: true});
}
init();

function insert_google_translate_element(args) {
    options = args;
    let ct = document.contentType.split("/");
    if (!options.force && ["image", "audio", "video"].includes(ct[0])) {
	return;
    }
    if (options.force) {
	remove_google_translate_elemnt_nodes();
	modify_page("", options.includedlanguages);
    } else {
	modify_page(options.pagelanguage, options.includedlanguages);
    }
}

function remove_google_translate_elemnt_nodes() {
    let elem = document.getElementById(":2.container");
    if (elem) {
	elem.contentDocument.getElementById(":2.close").click();
    }
    let elems = document.querySelectorAll("body > iframe.goog-te-menu-frame, body > div.goog-te-spinner-pos, body > div.skiptranslate, body > div#goog-gt-tt, body > script#google_translate_element");
    for (let elem of elems) {
	elem.remove();
    }
    browser.runtime.sendMessage({msg: "gte_removed"});
    return true;
}

var container;
var style_body_top;
function observe_func(mutations, observer) {
    let elem = document.getElementById(":2.container");
    if (elem && elem != container) {
	container = elem;
	container.addEventListener("load", listener);
	function listener(e) {
	    let wrapper = document.querySelector("div.skiptranslate");
	    setTimeout(() => {
		if (document.body.style.top != "0px") {
		    style_body_top = document.body.style.top;
		}
		if (options.hide_toolbar) {
		    wrapper.style.display = "none";
		    document.body.style.top = "0px";
		}
	    }, 1);
	    setTimeout(() => {
		if (document.body.style.top != "0px") {
		    style_body_top = document.body.style.top;
		}
		if (options.hide_toolbar) {
		    wrapper.style.display = "none";
		    document.body.style.top = "0px";
		}
		let prompt_section = container.contentDocument.getElementById(":2.promptSection");
		if (options.auto_translate && prompt_section.style.display != "none") {
		    container.contentDocument.getElementById(":2.confirm").click();
		} else {
		}
	    }, 100);
	    browser.runtime.sendMessage({msg: "gte_loaded"});
	    container.removeEventListener("load", listener);
	}
    }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.msg) {
    case "toggle_translate":
	let prompt_section = container.contentDocument.getElementById(":2.promptSection");
	if (prompt_section.style.display != "none") {
	    container.contentDocument.getElementById(":2.confirm").click();
	} else {
	    container.contentDocument.getElementById(":2.restore").click();
	}
	break;
    case "toggle_toolbar":
	let wrapper = document.querySelector("div.skiptranslate");
	if (wrapper.style.display == "none") {
	    document.body.style.top = style_body_top;
	    wrapper.style.display = "";
	} else {
	    document.body.style.top = "0px";
	    wrapper.style.display = "none";
	}
	break;
    }
});
