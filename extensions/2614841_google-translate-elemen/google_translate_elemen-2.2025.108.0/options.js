"use strict";

$("*").each((k, v) => {
    if ($(v).data("i18n")) {
	let text = browser.i18n.getMessage($(v).data("i18n"));
	if (text) {
	    $(v).html(text);
	}
    }
    if ($(v).data("i18n-title")) {
	let text = browser.i18n.getMessage($(v).data("i18n-title"));
	if (text) {
	    $(v).attr({title: text});
	}
    }
    if ($(v).data("i18n-placeholder")) {
	let text = browser.i18n.getMessage($(v).data("i18n-placeholder"));
	if (text) {
	    $(v).attr({placeholder: text});
	}
    }
});

browser.storage.local.get().then(items => {
    let options = {};
    $("input:checkbox").each((k, v) => {
    	if (v.id && !(v.id in items)) {
    	    options[v.id] = $(v).prop("checked");
    	}
    });
    $("input:radio[checked]").each((k, v) => {
    	if (!(v.name in items)) {
    	    options[v.name] = v.value;
    	}
    });
    $('input:not(:checkbox, :radio), textarea, select').each((k, v) => {
	if ($(v).data("ignore")) {
	    return;
	}
    	if (!(v.id in items)) {
	    options[v.id] = $(v).val() || $(v).data("defaultvalue");
	}
    });
    let data = {};
    let names = {};
    $("input:checkbox").each((k, v) => {
	if ($(v).prop("name")) {
	    names[$(v).prop("name")] = true;
	}
    });
    for (let name in names) {
	if (!items[name]) {
	    items[name] = {};
	}
	let keys = {};
	let i = 1;
	for (let elem of $(`input:checkbox[name=${name}]`)) {
	    if (!($(elem).val() in items[name])) {
		if ($(elem).prop("checked")) {
		    keys[$(elem).val()] = i++;
		} else {
		    keys[$(elem).val()] = 0;
		}
	    }
	}
	if (Object.keys(keys).length) {
	    options[name] = {...items[name], ...keys};
	}
    }

    if (items.ignore_languages == undefined) {
	options["ignore_languages"] = navigator.language.split('-')[0];
    } else {
	let langs = items.ignore_languages.replace(/[^a-z,]+/g, " ").trim();
	if (langs != items.ignore_languages) {
	    options["ignore_languages"] = langs;
	}
    }

    if (items.includedlanguages == undefined) {
	options["includedlanguages"] = "";
    } else {
	let langs = items.includedlanguages.replace(/[^a-zA-Z-,]+/g, "").trim();
	if (langs != items.includedlanguages) {
	    options["includedlanguages"] = langs;
	}
    }

    if (items.page_translator_target_language == undefined) {
	options.page_translator_target_language = navigator.language;
    }
    if (items.text_translator_target_language == undefined) {
	options.text_translator_target_language = navigator.language;
    }

    if (Object.keys(options).length > 0) {
	browser.storage.local.set(options);
    }
    restore();
});

let bg;
browser.runtime.getBackgroundPage().then(page => bg = page);
let regexp;
async function restore() {
    let items = await browser.storage.local.get();
    let data = {};
    $("input:checkbox").each((k, v) => {
	if (v.id in items) {
	    $(v).prop("checked", items[v.id]);
	}
    });
    let radio_names = {};
    $("input:radio").each((k, v) => {
	radio_names[v.name] = true;
    });
    for (let name in radio_names) {
    	if (name in items) {
	    $(`input:radio[name=${name}]`).val([items[name]]);
	}
    }
    $('input:not(:checkbox), textarea, select').each((k, v) => {
	if (v.id in items) {
	    $(v).val(items[v.id]);
	}
    });
    if (items.update_info) {
	$("#update_info").html(items.update_info);
    }

    $("#lang_value").text(navigator.language);

    sort_elements("#context_menu_items", "input:checkbox[name=context_menu_action]", "context_menu_action");
    sort_elements("#page_action_buttons", "input:checkbox[name=page_action_button_action]", "page_action_button_action");
    sort_elements("#browser_action_buttons", "input:checkbox[name=browser_action_button_action]", "browser_action_button_action");

    function sort_elements(root, key_elem, name) {
	if (!items[name]) {
	    return;
	}
	$(root + " li").each((i, key) => {
	    let elem = $(key).find(key_elem);
	    let val = items[name][elem.val()];
	    elem.prop("checked", val == 0 ? false : true);
	});
	$(root).html(
	    $(root + " li").sort((a, b) => {
		let na = $(a).find(key_elem).val();
		let nb = $(b).find(key_elem).val();
		let va = items[name][na] || Number.MAX_SAFE_INTEGER;
		let vb = items[name][nb] || Number.MAX_SAFE_INTEGER;
		return va - vb;
	    })
	);
	$(root).sortable();
    }

    regexp = bg.urls_to_regexp(document.getElementById("ignore_urls").value);
}


$(".save").on("click", async e => {
    let message = "";
    $("input:not(:checkbox, :radio), textarea, select").each((k, elem) => {
	if ($(elem).data("ignore")) {
	    return;
	}
	if (!elem.checkValidity()) {
	    let label_id = $(elem).parent().find("span").data("i18n");
	    let label = browser.i18n.getMessage(label_id);
	    let msg = escapeHTML(browser.i18n.getMessage("is_invalid", label));
	    message += `<a href="#${elem.id}">${msg}</a>`+ "<br>";
	}
    });
    $("#page_translator_target_regexp, #text_translator_target_regexp, #page_translator_2nd_target_regexp, #text_translator_2nd_target_regexp").each((k, elem) => {
	let regex = $(elem).val();
	try {
	    RegExp(regex);
	} catch (e) {
	    let label_id = $(elem).parent().find("span").data("i18n");
	    let label = browser.i18n.getMessage(label_id);
	    let msg = escapeHTML(browser.i18n.getMessage("is_invalid", label));
	    let msg2 = escapeHTML(`"${regex}" ${e.message}`);
	    message += `<a href="#${elem.id}">${msg}</a> ${msg2}<br>`;
	}
    });
    if (message) {
	$(".message").html(browser.i18n.getMessage("error") + ": " + message);
	return;
    }

    let data = {};
    let names = {};
    $("input:checkbox").each((k, v) => {
	if ($(v).prop("name")) {
	    names[$(v).prop("name")] = true;
	}
    });
    for (let name in names) {
	let i = 1;
	data[name] = {};
	for (let elem of $(`input:checkbox[name=${name}]`)) {
	    if ($(elem).prop("checked")) {
		data[name][$(elem).val()] = i++;
	    } else {
		data[name][$(elem).val()] = 0;
	    }
	}
    }
    $("input:checkbox").each((k, v) => {
	if (v.id) {
	    data[v.id] = $(v).prop("checked");
	}
    });
    $("input:radio").each((k, v) => {
	if ($(v).prop("checked")) {
	    data[v.name] = $(v).prop("value");
	}
    });
    $("input:not(:checkbox, :radio), textarea, select").each((k, v) => {
	if ($(v).data("ignore")) {
	    return;
	}
	data[v.id] = $(v).val();
    });

    if (!await request_permissions(data)) {
	return;
    }
    browser.storage.local.set(data);
    $(".message").html("");
});

async function request_permissions(data) {
    const nodes = ["page_translator_delete_history", "text_translator_delete_history",
		   "page_translator_2nd_delete_history", "text_translator_2nd_delete_history"];
    let node;
    for (let i of nodes) {
	if (data[i] == true) {
	    node = i;
	    break;
	}
    }
    if (node) {
	browser.permissions.request({permissions: ["history"]}).then(response => {
	}).catch(e => {
	    console.log(e);
	});
    }
    if (data.specific_tab_esc_behavior == "hide") {
	browser.permissions.request({permissions: ["tabHide"]}).then(response => {
	}).catch(e => {
	    console.log(e);
	});
    }
    if (data.tab_window_session == "save") {
	browser.permissions.request({permissions: ["sessions"]}).then(response => {
	}).catch(e => {
	    console.log(e);
	});
    }
    if (data.translate_clipboard_content == true) {
	browser.permissions.request({permissions: ["clipboardRead"]}).then(response => {
	}).catch(e => {
	    console.log(e);
	});
    }
    let message = "";
    $(".message").html = "";
    if (node) {
	await browser.permissions.contains({permissions: ["history"]}).then(response => {
	    if (!response) {
		let msg1 = browser.i18n.getMessage("need_history_permission");
		let msg2 = browser.i18n.getMessage("please_allow_permission");
		message += `<a href="#${node}">${msg1}</a> ${msg2}<br>`;
	    }
	});
    }
    if (data.specific_tab_esc_behavior == "hide") {
	await browser.permissions.contains({permissions: ["tabHide"]}).then(response => {
	    if (!response) {
		let msg1 = browser.i18n.getMessage("need_tabHide_permission");
		let msg2 = browser.i18n.getMessage("please_allow_permission");
		message += `<a href="#specific_tab_esc_behavior">${msg1}</a> ${msg2}<br>`;
	    }
	});
    }
    if (data.tab_window_session == "save") {
	await browser.permissions.contains({permissions: ["sessions"]}).then(response => {
	    if (!response) {
		let msg1 = browser.i18n.getMessage("need_sessions_permission");
		let msg2 = browser.i18n.getMessage("please_allow_permission");
		message += `<a href="#tab_window_session">${msg1}</a> ${msg2}<br>`;
	    }
	});
    }
    if (data.translate_clipboard_content == true) {
	await browser.permissions.contains({permissions: ["clipboardRead"]}).then(response => {
	    if (!response) {
		let msg1 = browser.i18n.getMessage("need_clipboard_permission");
		let msg2 = browser.i18n.getMessage("please_allow_permission");
		message += `<a href="#translate_clipboard_content">${msg1}</a> ${msg2}<br>`;
	    }
	});
    }
    if (message) {
	$(".message").html(message);
	return false;
    }
    return true;
}

function default_ignore_languages() {
    let langs = [].concat(navigator.language).concat(navigator.languages);
    let list = [];
    for (let lang of langs) {
	lang = lang.split('-')[0];
	if (!list.includes(lang)) {
	    list.push(lang);
	}
    }
    return list.join(', ');
}

function default_includedlanguages() {
    let langs = [].concat(navigator.language)
	.concat(navigator.languages).concat('en');
    let list = [];
    for (let lang of langs) {
	if (!list.includes(lang)) {
	    list.push(lang);
	}
    }
    return list.join(',');
}

$("#default_ignore_languages").on("click", e => {
    set_default_value(e, default_ignore_languages());
});

$("#default_includedlanguages").on("click", e => {
    set_default_value(e, default_includedlanguages());
});

function set_default_value(e, value, elem) {
    e.preventDefault();
    let target = e.currentTarget.id.replace(/^default_/, "#");
    $(target).val(value || $(elem).data("defaultvalue"));
}

$(".reset").on("click", e => {
    e.preventDefault();
    let targets = $(e.currentTarget).data("target").split(/\s/);
    for (let target of targets) {
    	if (target) {
	    if ($("#" + target).prop("type") == "checkbox") {
		let val = $("#" + target).data("defaultvalue") == true ? true : false;
    		$("#" + target).prop("checked", val);
	    } else {
    		$("#" + target).val($("#" + target).data("defaultvalue"));
	    }
	}
    }
});

function escapeHTML(str) {
    return String(str)
	.replace(/&/g, "&amp;")
	.replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

$("#reset_commands").on("click", e => {
    browser.commands.getAll().then(commands => {
	for (let command of commands) {
	    browser.commands.reset(command.name);
	}
    });
});

document.addEventListener("DOMContentLoaded", e => {
    document.querySelectorAll("a").forEach(elem => {
	if (elem.protocol != "moz-extension:") {
	    elem.setAttribute("target", "_blank");
	    elem.setAttribute("rel", "noopener noreferrer");
	}
    });
});

let url_test_result = document.getElementById("url_test_result");
let test_url = "";
document.getElementById("ignore_urls").addEventListener("input", e => {
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

document.querySelectorAll(".get_favicon_button").forEach(elem => {
    elem.addEventListener("click", get_favicon);
});
async function get_favicon(e) {
    let elem = e.target;
    let service_url = document.getElementById(elem.name + "_url").value;
    let u;
    try {
	u = new URL(service_url);
    } catch (e) {
	console.log("invalid url");
	return;
    }

    let blob;
    blob = await fetch(u.origin + "/favicon.ico").then(response => {
	if (response.ok) {
	    return response.blob();
	} else {
	    return null;
	}
    }).catch(error => {
        console.log(error.message);
	return;
    });

    if (!blob || blob.size == 0) {
	let url = "https://www.google.com/s2/favicons?sz=32&domain=" + encodeURIComponent(u.hostname);
	blob = await fetch(url).then(response => {
	    if (response.ok) {
		return response.blob();
	    } else {
		return null;
	    }
	}).catch(error => {
	    console.log("error", error.message);
	    return null;
	});
    }
    if (!blob) {
	blob = await fetch("/lib/icons8-google-translate2.png").then(response => {
	    return response.blob();
	}).catch(error => {
	    console.log("error", error.message);
	    return null;
	});
    }

    let blob_url = window.URL.createObjectURL(blob);
    let img = document.createElement("img");
    img.src = blob_url;
    img.classList.add("favicon");
    let parent = document.getElementById(elem.name + "_favicon");
    parent.replaceChildren(img);
    let data = {};
    data[elem.name + "_favicon"] = blob;
    browser.storage.local.set(data);
}

