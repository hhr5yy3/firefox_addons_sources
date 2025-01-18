import React from '../npm/dom-chef.js';
import elementReady from '../npm/element-ready.js';
import { isPRConflicts } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

async function init() {
	await elementReady('.CodeMirror', {
		stopOnDomReady: false,
	});

	document.head.append(React.createElement('script', { type: "module", src: chrome.runtime.getURL('assets/resolve-conflicts.js'),} ));
}

void features.add(import.meta.url, {
	include: [
		isPRConflicts,
	],
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/pull/82/conflicts

*/
