"use strict";

browser.omnibox.setDefaultSuggestion(
    {description: "[-t target_lang] [-1|-2] [-d {nt|st|ct|w|sb|ba|pa}] text"}
);

let omnibox_history = [];
browser.omnibox.onInputChanged.addListener((input, suggest) => {
    suggest(omnibox_history);
    return;
});

browser.omnibox.onInputEntered.addListener((input, disposition) => {
    let args = parse_omnibox(input);
    if (!args.text) {
	return;
    }
    let action = {
	st: "translate_in_specific_tab",
	nt: "translate_in_new_tab",
	ct: "translate_in_current_tab",
	w: "translate_in_window",
	sb: "translate_in_sidebar",
	ba: "translate_in_browser_action",
	pa: "translate_in_page_action"
    }[args["-d"]];
    if (!action) {
	action = options.omnibox_default_action;
    }
    let translator_kind = "auto";
    if (/_on_2nd_/.test(action)) {
	action = action.replace(/_on_2nd/, "");
	translator_kind = "2";
    }
    if (args["-2"]) {
	translator_kind = "2";
    } else if (args["-1"]) {
	translator_kind = "1";
    }
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
	translate(action , tabs[0], tabs[0].url, args.text, translator_kind, args["-t"]);
    });
    if (args.opts) {
	omnibox_history[0] = {content: args.opts, description: "↺"};
    }
    if (omnibox_history.length > 5) {
	omnibox_history.pop();
    }
    if (input != omnibox_history[omnibox_history.length - 1]) {
	omnibox_history.splice(1, 0, {content: input, description: "↺"});
    }
});

function parse_omnibox(string) {
    let tokens = [...string.matchAll(/[\S]+/g)];
    let args = {};
    loop:
    for (let i = 0; i < tokens.length; i++) {
	switch (tokens[i][0]) {
	case "-t":
	case "-d":
	    args[tokens[i][0]] = tokens[++i][0];
	    break;
	case "-1":
	case "-2":
	    args[tokens[i][0]] = true;
	    break;
	default:
	    args.text = string.substr(tokens[i].index);
	    args.opts = string.substr(0, tokens[i].index);
	    break loop;
	}
    }
    return args;
}
