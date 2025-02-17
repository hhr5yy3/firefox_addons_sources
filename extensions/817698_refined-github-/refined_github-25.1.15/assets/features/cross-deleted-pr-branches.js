import React from '../npm/dom-chef.js';
import { lastElement, $, $$, expectElement } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';

function init() {
	const lastBranchAction = lastElement('.TimelineItem-body .user-select-contain.commit-ref');

	const headReferenceLink = $('.head-ref a');
	if (!headReferenceLink && !lastBranchAction) {
		return; // Don't return false, This feature’s CSS already takes care of this
	}

	if (!lastBranchAction?.closest('.TimelineItem-body').textContent.includes(' deleted ')) {
		return false;
	}

	const deletedBranchName = lastBranchAction.textContent.trim();
	const repoRootUrl = headReferenceLink?.href.split('/', 5).join('/');
	for (const element of $$('.commit-ref')) {
		const branchName = element.textContent.trim().split(':').pop();
		if (branchName === deletedBranchName) {
			element.title = 'This branch has been deleted';

			if (!headReferenceLink) {
				continue;
			}

			if (element.classList.contains('head-ref')) {
				expectElement('a', element).href = repoRootUrl;
			} else {
				wrap(element, React.createElement('a', { href: repoRootUrl,} ));
			}
		}
	}
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	deduplicate: 'has-rgh-inner',
	awaitDomReady: true, // Must wait for the last one
	init,
});

/*

Test URLs:

- deleted branch: https://github.com/sindresorhus/refined-github/pull/576
- deleted branch (from fork): https://github.com/sindresorhus/refined-github/pull/872
- restored branch (on fork): https://github.com/sindresorhus/refined-github/pull/909

*/
