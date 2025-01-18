import React from '../npm/dom-chef.js';
import { isUserProfileMainTab } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function addLink(showCaseTitle) {
	const url = new URL(location.pathname, location.href);
	// DO NOT add type: 'source' since forks could also have many stars
	url.search = new URLSearchParams({
		tab: 'repositories',
		sort: 'stargazers',
	}).toString();

	showCaseTitle.firstChild.after(' / ', React.createElement('a', { href: url.href,}, "Top repositories" ));
}

function init(signal) {
	observe('.js-pinned-items-reorder-container h2', addLink, {signal});
}

void features.add(import.meta.url, {
	include: [
		isUserProfileMainTab,
	],
	init,
});

/*

Test URLs:

https://github.com/fregante

*/
