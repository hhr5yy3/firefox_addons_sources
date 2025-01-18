import { $, expectElement } from '../npm/select-dom.js';
import { isRepoIssueOrPRList } from '../npm/github-url-detection.js';
import { stringToBase64 } from '../npm/uint8array-extras.js';
import features from '../feature-manager.js';
import SearchQuery from '../github-helpers/search-query.js';

function init() {
	const sourceItem = $('#filters-select-menu a:nth-last-child(2)');
	if (!sourceItem) {
		return;
	}

	// "Involved" filter
	const commentsLink = sourceItem.cloneNode(true);
	commentsLink.lastChild.textContent = 'Everything you’re involved in';
	commentsLink.removeAttribute('target');
	commentsLink.href = SearchQuery.from(commentsLink).set('is:open involves:@me').href;
	commentsLink.setAttribute('aria-checked', String(commentsLink.href === location.href)); // #4589

	sourceItem.after(commentsLink);

	// "Subscribed" external link
	const searchSyntaxLink = expectElement('#filters-select-menu a:last-child');
	const subscriptionsLink = searchSyntaxLink.cloneNode(true);
	subscriptionsLink.lastElementChild.textContent = 'Everything you subscribed to';

	const subscriptionsUrl = new URL('https://github.com/notifications/subscriptions');
	const repositoryId
		= $('meta[name="octolytics-dimension-repository_id"]')?.content
		?? expectElement('input[name="repository_id"]').value;
	subscriptionsUrl.searchParams.set('repository', stringToBase64(`010:Repository${repositoryId}`));
	subscriptionsLink.href = subscriptionsUrl.href;

	commentsLink.after(subscriptionsLink);
}

void features.add(import.meta.url, {
	include: [
		isRepoIssueOrPRList,
	],
	awaitDomReady: true,
	deduplicate: 'has-rgh-inner',
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/issues
https://github.com/refined-github/refined-github/pulls

*/
