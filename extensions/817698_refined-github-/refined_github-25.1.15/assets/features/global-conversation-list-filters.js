import React from '../npm/dom-chef.js';
import { elementExists, $$ } from '../npm/select-dom.js';
import { isGlobalIssueOrPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import SearchQuery from '../github-helpers/search-query.js';
import observe from '../helpers/selector-observer.js';

function addLinks(container) {
	const defaultQuery = 'is:open archived:false';

	// Without this, the Issues page also displays PRs, and viceversa
	const isIssues = location.pathname.startsWith('/issues');
	const typeQuery = isIssues ? 'is:issue' : 'is:pr';
	const typeName = isIssues ? 'Issues' : 'Pull Requests';

	const links = [
		['Involved', `${typeName} you’re involved in`, 'involves:@me'],
		['Yours', `${typeName} on your repos`, 'user:@me'],
	] ;

	for (const [label, title, query] of links) {
		// Create link
		const url = new URL(isIssues ? '/issues' : '/pulls', location.origin);
		url.searchParams.set('q', `${typeQuery} ${defaultQuery} ${query}`);
		const link = React.createElement('a', { href: url.href, title: title, className: "subnav-item",}, label);

		const isCurrentPage = SearchQuery.from(location).includes(query);

		// Highlight it, if that's the current page
		if (isCurrentPage && !elementExists('.subnav-links .selected')) {
			link.classList.add('selected');

			// Other links will keep the current query, that's not what we want
			for (const otherLink of $$('.subnav-links a')) {
				otherLink.href = SearchQuery.from(otherLink).remove(query).href;
			}
		}

		container.append(link);
	}
}

function init(signal) {
	observe('.subnav-links', addLinks, {signal});
}

void features.add(import.meta.url, {
	include: [
		isGlobalIssueOrPRList,
	],
	init,
});

/*

Test URLs:

https://github.com/issues
https://github.com/pulls

*/
