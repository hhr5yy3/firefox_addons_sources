import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { expectElement } from '../npm/select-dom.js';
import batchedFunction from '../npm/batched-function.js';
import { isRepoIssueList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getRepo } from '../github-helpers/index.js';
import looseParseInt from '../helpers/loose-parse-int.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const getLastUpdated = new CachedFunction('last-updated', {
	async updater(issueNumbers) {
		const {repository} = await api.v4(`
		repository() {
			${issueNumbers.map(number => `
				${api.escapeKey(number)}: issue(number: ${number}) {
					updatedAt
				}
			`).join('\n')}
		}
	`);

		return repository;
	},
	maxAge: {minutes: 30},
	cacheKey: ([issues]) => `${getRepo().nameWithOwner}:${String(issues)}`,
});

function getPinnedIssueNumber(pinnedIssue) {
	return looseParseInt(expectElement('.opened-by', pinnedIssue).firstChild);
}

async function update(pinnedIssues) {
	const lastUpdated = await getLastUpdated.get(pinnedIssues.map(issue => getPinnedIssueNumber(issue)));
	for (const pinnedIssue of pinnedIssues) {
		const issueNumber = getPinnedIssueNumber(pinnedIssue);
		const {updatedAt} = lastUpdated[api.escapeKey(issueNumber)];
		const originalLine = expectElement('.opened-by', pinnedIssue);
		originalLine.after(
			// .rgh class enables tweakers to hide the number
			React.createElement('span', { className: "text-small color-fg-muted" ,}
, React.createElement('span', { className: "rgh-pinned-issue-number",}, "#", issueNumber), " updated "  , React.createElement('relative-time', { datetime: updatedAt,} )
),
		);

		originalLine.hidden = true;
	}
}

async function init(signal) {
	await expectToken();
	observe('.pinned-issue-item', batchedFunction(update, {delay: 100}), {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoIssueList,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/issues

*/
