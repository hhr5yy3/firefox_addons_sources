import React from '../npm/dom-chef.js';
import { elementExists, expectElement, $ } from '../npm/select-dom.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import { isEditable } from '../helpers/dom-utils.js';
import { shortcutMap } from '../helpers/feature-helpers.js';

function splitKeys(keys) {
	return keys.split(' ').map(key => React.createElement(React.Fragment, null, " " , React.createElement('kbd', null, key)));
}

function improveShortcutHelp(dialog) {
	expectElement('.Box-body .col-5 .Box:first-child', dialog).after(
		React.createElement('div', { className: "Box Box--condensed m-4"  ,}
, React.createElement('div', { className: "Box-header",}
, React.createElement('h2', { className: "Box-title",}, "Refined GitHub" )
)

, React.createElement('ul', null
, [...shortcutMap]
					.sort(([, a], [, b]) => a.localeCompare(b))
					.map(([hotkey, description]) => (
						React.createElement('li', { className: "Box-row d-flex flex-row"  ,}
, React.createElement('div', { className: "flex-auto",}, description)
, React.createElement('div', { className: "ml-2 no-wrap" ,}
, splitKeys(hotkey)
)
)
					))
)
),
	);
}

const observer = new MutationObserver(([{target}]) => {
	if (target instanceof Element && !elementExists('.js-details-dialog-spinner', target)) {
		improveShortcutHelp(target);
		observer.disconnect();
	}
});

function observeShortcutModal({key, target}) {
	if (key !== '?' || isEditable(target)) {
		return;
	}

	const modal = $('body > details:not(.js-command-palette-dialog) > details-dialog');
	if (modal) {
		observer.observe(modal, {childList: true});
	}
}

function initOnce() {
	document.body.addEventListener('keypress', observeShortcutModal);
}

void features.add(import.meta.url, {
	init: onetime(initOnce),
});

/*

Test URLs: Any page

*/
