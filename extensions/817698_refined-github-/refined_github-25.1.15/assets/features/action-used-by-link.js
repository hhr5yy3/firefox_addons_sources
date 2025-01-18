import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import SearchIcon from '../npm/octicons-plain-react-components-Search.js';
import { isMarketplaceAction } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function getActionURL() {
	const actionRepo = expectElement('aside a:has(.octicon-repo)')
		.pathname
		.slice(1);

	const actionURL = new URL('search', location.origin);
	actionURL.search = new URLSearchParams({
		q: `${actionRepo} path:.github/workflows/ language:YAML`,
		type: 'Code',
		s: 'indexed',
		o: 'desc',
	}).toString();

	return actionURL;
}

function addUsageLink(side) {
	const actionURL = getActionURL();

	side.after(
		React.createElement('a', { href: actionURL.href, className: "d-block mb-2" ,}
, React.createElement(SearchIcon, { width: 14, className: "color-fg-default mr-2" ,} ), "Usage examples"
),
	);
}

function init(signal) {
	observe('.d-block.mb-2[href^="/contact"]', addUsageLink, {signal});
}

void features.add(import.meta.url, {
	include: [
		isMarketplaceAction,
	],
	init,
});

/*

Test URLs:

https://github.com/marketplace/actions/title-replacer

*/
