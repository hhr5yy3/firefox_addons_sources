"use strict";

browser.webRequest.onHeadersReceived.addListener(details => {
    const {responseHeaders} = details;
    for (let i = responseHeaders.length - 1; i >= 0; --i) {
	if (responseHeaders[i].name.toLowerCase() == "x-frame-options") {
	    responseHeaders.splice(i, 1);
	} else if (responseHeaders[i].name.toLowerCase() == "content-security-policy") {
	    responseHeaders[i].value = responseHeaders[i].value.replace(/frame-ancestors [^;]*/, "");
	}
    }
    return {responseHeaders};
}, {
    urls: ["<all_urls>"], types: ["sub_frame"]
}, [
    "blocking", "responseHeaders"
]);

browser.runtime.sendMessage({msg: "browser_action_loaded"}).then(msg => {
    switch (msg.msg) {
    case "show_buttons":
	show_buttons(msg);
	break;
    case "show":
	show(msg);
	break;
    case "close":
	window.close();
	break;
    case "wait":
	break;
    }
}).catch(error => {
    console.error(`Error: ${error}`);
});

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.to == "browser_action") {
	show(msg);
    }
});

async function show_buttons(msg) {
    let commands = await browser.commands.getAll();
    let m = new Map();
    for (let elem of commands) {
        m.set(elem.name, elem.shortcut);
    }
    if (msg.style) {
	let style = document.createElement("style");
	style.textContent = msg.style;
	document.head.append(style);
    }
    let div = document.createElement("div");
    div.id = "buttons";
    for (let elem of msg.list) {
	let btn = document.createElement("button");
	btn.id = elem.action;
	if (elem.page_translator_favicon_url) {
	    let img = document.createElement("img");
	    img.src = elem.page_translator_favicon_url;
	    img.classList.add("favicon");
	    btn.appendChild(img);
	}
	if (elem.text_translator_favicon_url) {
	    let img = document.createElement("img");
	    img.src = elem.text_translator_favicon_url;
	    img.classList.add("favicon");
	    btn.appendChild(img);
	}
	let shortcut = m.get(elem.action);
	let label = shortcut ? elem.label + ` (${shortcut})` : elem.label;
	let span = document.createElement("span");
	span.textContent = label;
	span.classList.add("label");
	btn.title = elem.title;
	btn.appendChild(span);
	div.appendChild(btn);
    }
    let items = document.getElementById("items");
    items.appendChild(div);
    div.addEventListener("click", async e => {
	let action = e.target.closest("button").id;
	if (["translate_in_sidebar", "translate_on_2nd_in_sidebar"].includes(action)) {
	    browser.sidebarAction.open();
	}
	await browser.runtime.sendMessage({msg: "browser_action_action", action: action, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey}).catch(error => {
	    console.log(error.message);
	});
	if (["translate_in_browser_action", "translate_on_2nd_in_browser_action"].includes(action)) {
	    let items = document.getElementById("items");
	    items.style.display = "none";
	} else {
	    window.close();
	}
    });
}

function show(msg) {
    if (msg.msg == "show") {
	if (msg.iframe) {
	    let iframe = document.getElementById("iframe");
	    iframe.width = msg.width || 800;
	    iframe.height = msg.height || 600;
	    iframe.src = msg.url;
	    iframe.style.display = "";
	} else {
	    window.location.href = msg.url;
	}
    } else {
	window.close();
    }
}
