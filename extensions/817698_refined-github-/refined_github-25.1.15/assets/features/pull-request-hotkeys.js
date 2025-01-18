import { expectElements } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isPR } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { addHotkey } from '../github-helpers/hotkey.js';

async function init() {
	const tabnav = await elementReady([
		'[aria-label="Pull request tabs"]',
		'[aria-label="Pull request navigation tabs"]', // Commits list tab
	].join(', '));
	const tabs = expectElements([
		'a.tabnav-tab',
		'a[role="tab"]', // Commits list tab
	], tabnav);
	const lastTab = tabs.length - 1;
	const selectedIndex = tabs.findIndex(tab => tab.classList.contains('selected'));

	for (const [index, tab] of tabs.entries()) {
		addHotkey(tab, `g ${index + 1}`);

		if (index === selectedIndex - 1 || (selectedIndex === 0 && index === lastTab)) {
			addHotkey(tab, 'g ArrowLeft');
		} else if (index === selectedIndex + 1 || (selectedIndex === lastTab && index === 0)) {
			addHotkey(tab, 'g ArrowRight');
		}
	}
}

void features.add(import.meta.url, {
	shortcuts: {
		'g <number>': 'Go to PR tab <number>',
		'g →': 'Go to next PR tab',
		'g ←': 'Go to previous PR tab',
	},
	include: [
		isPR,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pull/4

*/
