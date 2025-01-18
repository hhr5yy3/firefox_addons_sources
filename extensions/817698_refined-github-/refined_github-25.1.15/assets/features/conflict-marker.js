import React from '../npm/dom-chef.js';
import { isIssueOrPRList } from '../npm/github-url-detection.js';
import AlertIcon from '../npm/octicons-plain-react-components-Alert.js';
import batchedFunction from '../npm/batched-function.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import observe from '../helpers/selector-observer.js';
import { openPrsListLink } from '../github-helpers/selectors.js';
import { expectToken } from '../github-helpers/github-token.js';

async function addIcon(links) {
	const prConfigs = links.map(link => {
		const [, owner, name, , prNumber] = link.pathname.split('/');
		const key = api.escapeKey(owner, name, prNumber);
		return {
			key,
			link,
			owner,
			name,
			number: Number(prNumber),
		};
	});

	// Batch queries cannot be exported to .gql files
	const batchQuery = prConfigs.map(({key, owner, name, number}) => `
		${key}: repository(owner: "${owner}", name: "${name}") {
			pullRequest(number: ${number}) {
				mergeable
			}
		}
	`).join('\n');

	const data = await api.v4(batchQuery);

	for (const pr of prConfigs) {
		if (data[pr.key].pullRequest.mergeable === 'CONFLICTING') {
			pr.link.after(
				React.createElement('a', {
					className: "rgh-conflict-marker tooltipped tooltipped-e color-fg-muted ml-2"    ,
					'aria-label': "This PR has conflicts that must be resolved"       ,
					href: `${pr.link.pathname}#partial-pull-merging`,}

, React.createElement(AlertIcon, { className: "v-align-middle",} )
),
			);
		}
	}
}

async function init(signal) {
	await expectToken();
	observe(openPrsListLink, batchedFunction(addIcon, {delay: 100}), {signal});
}

void features.add(import.meta.url, {
	include: [
		isIssueOrPRList,
	],
	init,
});

/*
Test URLs
https://github.com/pulls
https://github.com/refined-github/sandbox/issues?q=conflict
https://github.com/kubernetes/kubernetes/milestone/62
*/
