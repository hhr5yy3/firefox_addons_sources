"use strict";

function get_selection(elem = document) {
    if (elem.activeElement.contentDocument) {
	return get_selection(elem.activeElement.contentDocument);
    } else {
	let selection = elem.getSelection();
	if (selection) {
	    return selection.toString();
	} else {
	    return "";
	}
    }
}

get_selection(document);

