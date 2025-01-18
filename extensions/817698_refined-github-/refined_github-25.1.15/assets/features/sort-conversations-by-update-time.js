import { $ } from '../npm/select-dom.js';
import { isRepoIssueOrPRList, isIssueOrPRList, isRepoTaxonomyIssueOrPRList, isProjects } from '../npm/github-url-detection.js';
import elementReady from '../npm/element-ready.js';
import oneEvent from '../npm/one-event.js';
import features from '../feature-manager.js';
import SearchQuery from '../github-helpers/search-query.js';
import observe from '../helpers/selector-observer.js';
import { linksToConversationLists } from '../github-helpers/selectors.js';

/** Keep the original URL on the element so that `shorten-links` can use it reliably #5890 */
function saveOriginalHref(link) {
	link.dataset.originalHref ||= link.href;
}

async function selectCurrentConversationFilter() {
	const currentSearchURL = location.href.replace('/pulls?', '/issues?'); // Replacement needed to make up for the redirection of "Your pull requests" link
	const menu = await elementReady('#filters-select-menu');
	const currentFilter = $(`a.SelectMenu-item[href="${currentSearchURL}"]`, menu);
	if (currentFilter) {
		$('[aria-checked="true"]', menu)?.setAttribute('aria-checked', 'false');
		currentFilter.setAttribute('aria-checked', 'true');
	}
}

async function updateLink(link) {
	if (link.host !== location.host) {
		return;
	}

	// Pick only links to lists, not single issues
	// + skip pagination links
	// + skip pr/issue filter dropdowns (some are lazyloaded)
	if (isIssueOrPRList(link)) {
		// Avoid rewriting /labels/ URLs until the last moment
		// https://github.com/refined-github/refined-github/issues/7205
		if (isRepoTaxonomyIssueOrPRList(link)) {
			await oneEvent(link, 'click', {filter: event => (event ).which < 2});
		}

		saveOriginalHref(link);

		const newUrl = SearchQuery.from(link).prepend('sort:updated-desc').href;

		// Preserve relative attributes as such #5435
		const isRelativeAttribute = link.getAttribute('href').startsWith('/');
		link.href = isRelativeAttribute ? newUrl.replace(location.origin, '') : newUrl;
	}

	// Also sort projects #4957
	if (isProjects()) {
		saveOriginalHref(link);

		// Projects use a different parameter name so don't use SearchQuery
		const search = new URLSearchParams(link.search);
		const query = search.get('query') ?? 'is:open'; // Default value query is missing
		search.set('query', `sort:updated-desc ${query}`);
		link.search = search.toString();
	}
}

function init(signal) {
	// Get links that don't already have a specific sorting or pagination applied
	observe(
		linksToConversationLists,
		updateLink,
		{signal},
	);
}

void features.add(import.meta.url, {
	init,
}, {
	include: [
		isRepoIssueOrPRList,
	],
	init: selectCurrentConversationFilter,
});

/*

Test URLs

Live links, these should be altered to include the `sort:updated-desc` query parameter:

- https://github.com/refined-github/refined-github/pulls
- https://github.com/refined-github/refined-github/labels/bug

*/

export { saveOriginalHref };
