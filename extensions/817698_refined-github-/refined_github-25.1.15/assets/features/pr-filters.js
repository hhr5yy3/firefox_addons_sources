import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { expectElement } from '../npm/select-dom.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import { isPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import observe from '../helpers/selector-observer.js';
import { cacheByRepo } from '../github-helpers/index.js';
import HasChecks from './pr-filters.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const reviewsFilterSelector = '#reviews-select-menu';

function addDropdownItem(dropdown, title, filterCategory, filterValue) {
	const filterQuery = `${filterCategory}:${filterValue}`;

	const searchParameter = new URLSearchParams(location.search);
	const currentQuerySegments = searchParameter.get('q')?.split(/\s+/) ?? [];
	const isSelected = currentQuerySegments.some(
		segment => segment.toLowerCase() === filterQuery,
	);

	const query = currentQuerySegments.filter(
		segment => !segment.startsWith(`${filterCategory}:`),
	).join(' ');

	const search = new URLSearchParams({
		q: query + (isSelected ? '' : ` ${filterQuery}`),
	});

	dropdown.append(
		React.createElement('a', {
			href: `?${String(search)}`,
			className: "SelectMenu-item",
			'aria-checked': isSelected ? 'true' : 'false',
			role: "menuitemradio",}

, React.createElement(CheckIcon, { className: "SelectMenu-icon SelectMenu-icon--check" ,} )
, React.createElement('span', null, title)
),
	);
}

function addDraftFilter(dropdown) {
	dropdown.append(
		React.createElement('div', { className: "SelectMenu-divider",}, "Filter by draft pull requests"

),
	);

	addDropdownItem(dropdown, 'Ready for review', 'draft', 'false');
	addDropdownItem(dropdown, 'Not ready for review (Draft PR)', 'draft', 'true');
}

const hasChecks = new CachedFunction('has-checks', {
	async updater() {
		const {repository} = await api.v4(HasChecks);

		return repository.head.history.nodes.some((commit) => commit.statusCheckRollup);
	},
	maxAge: {days: 3},
	cacheKey: cacheByRepo,
});

async function addChecksFilter(reviewsFilter) {
	if (!await hasChecks.get()) {
		return;
	}

	// Copy existing element and adapt its content
	const checksFilter = reviewsFilter.cloneNode(true);
	checksFilter.id = '';

	expectElement('summary', checksFilter).firstChild.textContent = 'Checks\u00A0'; // Only replace text node, keep caret
	expectElement('.SelectMenu-title', checksFilter).textContent = 'Filter by checks status';

	const dropdown = expectElement('.SelectMenu-list', checksFilter);
	dropdown.textContent = ''; // Drop previous filters

	for (const status of ['Success', 'Failure', 'Pending']) {
		addDropdownItem(dropdown, status, 'status', status.toLowerCase());
	}

	reviewsFilter.after(checksFilter);
}

async function init(signal) {
	await expectToken();
	observe(reviewsFilterSelector, addChecksFilter, {signal});
	observe(`${reviewsFilterSelector} .SelectMenu-list`, addDraftFilter, {signal});
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

*/
