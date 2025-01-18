"use strict";

let parser = new DOMParser();
for (let node of document.querySelectorAll("[data-i18n]")) {
    let text = browser.i18n.getMessage(node.dataset.i18n);
    if (text) {
	while (node.firstChild) {
	    node.removeChild(node.firstChild);
	}
	let doc = parser.parseFromString(text, "text/html");
	node.append(...doc.body.childNodes);
    }
}

let bg;
browser.runtime.getBackgroundPage().then(page => bg = page);
let regexp;
browser.storage.local.get().then(items => {
    let options = {};
    document.querySelectorAll("input:not([data-ignore], [readonly]), select, textarea:not([readonly])").forEach(elem => {
	if (elem.tagName == "INPUT" && elem.type == "checkbox") {
	    elem.addEventListener("change", save_checkbox);
	    if (items[elem.id] == undefined) {
		options[elem.id] = elem.checked;
	    } else {
		elem.checked = items[elem.id];
	    }
	} else {
	    elem.addEventListener("change", save_value);
	    if (items[elem.id] == undefined) {
		options[elem.id] = elem.value;
	    } else {
		elem.value = items[elem.id];
	    }
	}
    });
    if (Object.keys(options).length > 0) {
	browser.storage.local.set(options);
    }
    regexp = bg.urls_to_regexp(document.getElementById("auto_delete_urls").value);
});

function save_value(e) {
    browser.storage.local.set({[e.target.id]: e.target.value});
}

function save_checkbox(e) {
    browser.storage.local.set({[e.target.id]: e.target.checked});
}

let url_test_result = document.getElementById("url_test_result");
let test_url = "";

document.getElementById("auto_delete_urls").addEventListener("input", e => {
    regexp = bg.urls_to_regexp(e.target.value);
    url_test();
});

document.getElementById("test_url").addEventListener("input", e => {
    test_url = e.target.value;
    url_test();
});

function url_test() {
    if (!test_url.length) {
	url_test_result.textContent = "";
	return;
    }
    if (regexp.test(test_url)) {
	let text = browser.i18n.getMessage("match");
	url_test_result.textContent = text;
	url_test_result.style.backgroundColor = "lightgreen";
    } else {
	let text = browser.i18n.getMessage("unmatch");
	url_test_result.textContent = text;
	url_test_result.style.backgroundColor = "pink";
    }
}

