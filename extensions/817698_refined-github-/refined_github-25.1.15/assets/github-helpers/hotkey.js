import React from '../npm/dom-chef.js';
import { isMac } from './index.js';

function registerHotkey(hotkey, functionOrUrl, {signal} = {}) {
	const element = typeof functionOrUrl === 'string'
		? React.createElement('a', { hidden: true, href: functionOrUrl, 'data-hotkey': hotkey,} )
		: React.createElement('button', { hidden: true, type: "button", 'data-hotkey': hotkey, onClick: functionOrUrl,} );

	document.body.append(element);

	signal?.addEventListener('abort', () => {
		element.remove();
	});
}

/** Safely add a hotkey to an element, preserving any existing ones and avoiding duplicates */
function addHotkey(button, hotkey) {
	if (button) {
		const hotkeys = new Set(button.dataset.hotkey?.split(','));
		hotkeys.add(hotkey);
		button.dataset.hotkey = [...hotkeys].join(',');
	}
}

// eslint-disable-next-line unicorn/prevent-abbreviations
const modKey = isMac ? 'cmd' : 'ctrl';

export { addHotkey, modKey, registerHotkey };
