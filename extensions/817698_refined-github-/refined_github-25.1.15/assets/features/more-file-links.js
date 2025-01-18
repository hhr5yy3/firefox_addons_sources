import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { hasFiles } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';

function handleMenuOpening({delegateTarget: dropdown}) {
	dropdown.classList.add('rgh-more-file-links'); // Mark this as processed

	const viewFile = expectElement('a[data-ga-click^="View file"]', dropdown);
	const getDropdownLink = (name, route) => {
		const {href} = new GitHubFileURL(viewFile.href).assign({route});
		return (
			React.createElement('a', { href: href, 'data-turbo': String(route !== 'raw'), className: "pl-5 dropdown-item btn-link"  , role: "menuitem",}, "View "
 , name
)
		);
	};

	viewFile.after(
		getDropdownLink('raw', 'raw'),
		getDropdownLink('blame', 'blame'),
		getDropdownLink('history', 'commits'),
		React.createElement('div', { className: "dropdown-divider", role: "none",} ),
	);
}

function init(signal) {
	// `capture: true` required to be fired before GitHub's handlers
	delegate('.file-header .js-file-header-dropdown:not(.rgh-more-file-links)', 'toggle', handleMenuOpening, {capture: true, signal});
}

void features.add(import.meta.url, {
	include: [
		hasFiles,
	],
	init,
});

/*

Test URLs:
https://github.com/refined-github/sandbox/pull/55/files
https://github.com/refined-github/sandbox/compare/41c25160f0f574b302d72652ac83f4b2dab47e19...770d2ad5f086371da8a5f078f4267e6847e649f5
https://github.com/refined-github/sandbox/commit/0504e7dccb40374c24c1217f37d3579993d6071e

*/
