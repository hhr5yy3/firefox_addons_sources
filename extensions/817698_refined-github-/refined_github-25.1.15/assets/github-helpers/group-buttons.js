import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { wrapAll } from '../helpers/dom-utils.js';

// Wrap a list of elements with BtnGroup + ensure each has BtnGroup-item
function groupButtons(buttons, ...classes) {
	// Ensure every button has this class
	for (let button of buttons) {
		if (!button.matches('button, .btn')) {
			button.classList.add('BtnGroup-parent');
			button = expectElement('.btn', button);
		}

		button.classList.add('BtnGroup-item');
	}

	// They may already be part of a group
	let group = buttons[0].closest('.BtnGroup');

	// If it doesn't exist, wrap them in a new group
	if (!group) {
		group = React.createElement('div', { className: "BtnGroup",} );
		wrapAll(group, ...buttons);
	}

	group.classList.add(...classes);

	return group;
}

export { groupButtons };
