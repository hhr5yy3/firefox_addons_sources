import React from '../npm/dom-chef.js';
import { $ } from '../npm/select-dom.js';
import { isCompare, isPRConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import attachElement from '../helpers/attach-element.js';

const getWarning = () => (
	React.createElement('div', { className: "flash flash-error mt-3 rgh-warning-for-disallow-edits"   ,}
, React.createElement('strong', null, "Note:"), " Maintainers may require changes. It's easier and faster to allow them to make direct changes before merging."
)
);

function init() {
	const checkbox = $('input[name="collab_privs"]');
	if (!checkbox) {
		return false;
	}

	attachElement(
		checkbox.closest('.discussion-sidebar-item'),
		{after: getWarning},
	);
}

void features.add(import.meta.url, {
	include: [
		isCompare,
		isPRConversation,
	],
	awaitDomReady: true,
	init,
});

/*

Test URLs:

1. Open https://github.com/pulls?q=+is%3Apr+is%3Aopen+author%3A%40me+archived%3Afalse+-user%3A%40me+
2. Open any PR opened from a fork
3. Toggle the checkbox in the sidebar

*/
