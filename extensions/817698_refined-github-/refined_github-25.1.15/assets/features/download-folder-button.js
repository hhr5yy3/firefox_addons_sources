import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import { isRepoTree, isRepoRoot, isEnterprise } from '../npm/github-url-detection.js';
import DownloadIcon from '../npm/octicons-plain-react-components-Download.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import replaceElementTypeInPlace from '../helpers/recreate-element.js';

function add(menu) {
	const downloadUrl = new URL('https://download-directory.github.io/');
	downloadUrl.searchParams.set('url', location.href);

	const item = menu.firstElementChild.cloneNode(true);
	item.role = 'none';
	item.removeAttribute('tabindex');
	item.removeAttribute('id');
	item.removeAttribute('aria-keyshortcuts');
	item.removeAttribute('aria-labelledby');

	const link = item.firstElementChild instanceof HTMLAnchorElement
		? item.firstElementChild
		// Not a link on permalinks and archived repos
		: replaceElementTypeInPlace(item.firstElementChild, 'a');
	link.href = downloadUrl.href;
	link.classList.add('no-underline', 'fgColor-inherit');
	link.setAttribute('aria-keyshortcuts', 'c');

	// Missing on permalinks and archived repos
	$('svg', link)?.replaceWith(React.createElement(DownloadIcon, null ));

	// Only on permalinks and archived repos
	$('[id$="--trailing-visual"]', link)?.remove();

	expectElement('[id$="--label"]', link).textContent = 'Download directory';

	menu.prepend(item);
}

function init(signal) {
	observe('ul[role="menu"]:has([aria-keyshortcuts="c"])', add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
	],
	exclude: [
		isRepoRoot, // Already has an native download ZIP button
		isEnterprise,
	],
	init,
});

/*

Test URLs

- Own repo: https://github.com/refined-github/refined-github/tree/main/.github
- Archived repo: https://github.com/fregante/object-fit-images/tree/master/demo

*/
