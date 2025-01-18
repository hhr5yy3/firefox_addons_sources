import React from '../npm/dom-chef.js';
import { isConversation } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function linkify(avatar) {
	const userName = avatar.alt.slice(1);
	// Linkify name first
	wrap(avatar.nextElementSibling, React.createElement('a', { className: "Link--primary", href: `/${userName}`,} ));

	// Then linkify avatar
	wrap(avatar, React.createElement('a', { href: `/${userName}`,} ));
}

function init(signal) {
	observe('details-dialog .Box-header .mr-3 > img:not([alt*="[bot]"])', linkify, {signal});
}

void features.add(import.meta.url, {
	include: [
		isConversation,
	],
	init,
});

/*

Test URLs:

- User edits: https://github.com/refined-github/sandbox/issues/24#issue-1299932109
- App edits: https://github.com/renovatebot/renovate/pull/30606#issue-2449330214
- Ghost edits: https://github.com/Mottie/GitHub-userscripts/issues/88#issuecomment-502933879

*/
