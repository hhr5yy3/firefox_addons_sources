import { isPRList } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import SearchQuery from '../github-helpers/search-query.js';

function redirectToIssues(event) {
	const form = event.delegateTarget;
	const query = SearchQuery.from(location);
	query.set(form.elements['js-issues-search'].value);

	if (!query.includes('is:pr')) {
		form.action = form.action.replace(/\/pulls$/, '/issues');
		// Prevent submission via AJAX and use .submit() to allow the change from /pulls to /issues
		// https://github.com/refined-github/refined-github/pull/7614/files#r1694731354
		event.preventDefault();
		form.submit();
	}
}

function init(signal) {
	delegate('form.subnav-search[action$="/pulls"]', 'submit', redirectToIssues, {
		signal,
		capture: true,
	});
}

void features.add(import.meta.url, {
	include: [
		isPRList,
	],
	init,
});

/*

Test URLs:

https://github.com/pulls
https://github.com/refined-github/refined-github/pulls

1. Open the url above
2. Remove the "is:pr" from the search input and submit
3. You should be redirected to the "Issues" tab

*/
