import React from '../npm/dom-chef.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import { assertNodeContent } from '../helpers/dom-utils.js';
import observe from '../helpers/selector-observer.js';
import getUserAvatar from '../github-helpers/get-user-avatar.js';

function addAvatar(link) {
	const username = link.textContent;
	const size = 14;

	link.classList.add('d-inline-block', 'lh-condensed-ultra');
	link.prepend(
		React.createElement('img', {
			className: "avatar avatar-user v-align-text-bottom mr-1 rgh-small-user-avatars"    ,
			src: getUserAvatar(username, size),
			width: size,
			height: size,
			loading: "lazy",}
		),
	);
}

function addMentionAvatar(link) {
	assertNodeContent(link.firstChild, /^@/);
	const username = link.textContent.slice(1);
	const size = 16;

	link.prepend(
		React.createElement('img', {
			className: "avatar avatar-user mb-1 mr-1 rgh-small-user-avatars"    ,
			style: {marginLeft: 1},
			src: getUserAvatar(username, size),
			width: size,
			height: size,
			loading: "lazy",}
		),
	);
}

function initOnce() {
	// Excludes bots
	observe([
		'.js-issue-row [data-hovercard-type="user"]', // `isPRList` + old `isIssueList`
		'.notification-thread-subscription [data-hovercard-type="user"]', // https://github.com/notifications/subscriptions
		'[data-testid="created-at"] a[data-hovercard-url*="/users"]:first-child', // `isIssueList`. `:first-child` skips links that already include the avatar #7975
	], addAvatar);
	observe('.user-mention:not(.commit-author)[data-hovercard-type="user"]', addMentionAvatar);
}

void features.add(import.meta.url, {
	init: onetime(initOnce),
});

/*

Test URLs:

https://github.com/notifications/subscriptions
https://github.com/refined-github/refined-github/issues
https://github.com/refined-github/refined-github/pull/7004
https://github.com/refined-github/refined-github/releases
https://github.com/refined-github/refined-github/releases/tag/23.9.21
https://github.com/orgs/community/discussions/5841#discussioncomment-1450320

*/
