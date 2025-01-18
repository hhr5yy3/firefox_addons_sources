import React from '../npm/dom-chef.js';
import LockIcon from '../npm/octicons-plain-react-components-Lock.js';
import { isConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import isConversationLocked from '../github-helpers/is-conversation-locked.js';

function LockedIndicator() {
	return (
		React.createElement('span', { title: "Locked", className: "State d-flex flex-items-center flex-shrink-0"   ,}
, React.createElement(LockIcon, { className: "flex-items-center mr-1" ,} ), "Locked"

)
	);
}

function addLock(element) {
	const classes = (
		element.closest('.gh-header-sticky')
			? 'mr-2 '
			: ''
	)
	+ 'mb-2 rgh-locked-issue';
	element.after(
		React.createElement(LockedIndicator, { className: classes,} ),
	);
}

async function init(signal) {
	observe([
		'.gh-header-meta > :first-child', // Issue title
		'.gh-header-sticky .flex-row > :first-child', // Sticky issue title
	], addLock, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isConversation,
		async () => await isConversationLocked() ?? false,
	],
	init,
});

/*

## Test URLs

- Locked issue: https://github.com/refined-github/sandbox/issues/74
- Locked PR: https://github.com/refined-github/sandbox/pull/48

*/
