import React from '../npm/dom-chef.js';
import { $ } from '../npm/select-dom.js';
import { _ } from '../helpers/hotfix.js';
import features from '../feature-manager.js';

/*
When navigating back and forth in history, GitHub will preserve the DOM changes;
This means that the old features will still be on the page and don't need to re-run.

This marks each as "processed"
*/
void features.add('rgh-deduplicator' , {
	awaitDomReady: true,
	async init() {
		// `await` kicks it to the next tick, after the other features have checked for 'has-rgh', so they can run once.
		await Promise.resolve();
		$('has-rgh')?.remove(); // https://github.com/refined-github/refined-github/issues/6568
		$(_`#js-repo-pjax-container, #js-pjax-container`)?.append(React.createElement('has-rgh', null ));
		$(_`turbo-frame`)?.append(React.createElement('has-rgh-inner', null )); // #4567
	},
});

/* Test URLs: all */
