import React from '../npm/dom-chef.js';
import { messageRuntime } from '../npm/webext-msg.js';

function openOptions(event) {
	event.preventDefault();
	void messageRuntime({openOptionsPage: true});
}

function OptionsLink() {
	return (
		React.createElement('button', { type: "button", onClick: openOptions,} )
	);
}

export { OptionsLink, openOptions as default };
