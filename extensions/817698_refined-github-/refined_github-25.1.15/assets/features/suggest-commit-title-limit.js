import delegate from '../npm/delegate-it-delegate.js';
import { isEditingFile, isCompare, isPR, isMergedPR } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import onCommitTitleUpdate from '../github-events/on-commit-title-update.js';
import getNextConversationNumber from '../github-helpers/get-next-conversation-number.js';
import { getConversationNumber } from '../github-helpers/index.js';
import { formatPrCommitTitle } from './sync-pr-commit-title.js';
import onPrMerge from '../github-events/on-pr-merge.js';
import abortableClassName from '../helpers/abortable-classname.js';

// https://github.com/refined-github/refined-github/issues/2178#issuecomment-505940703
const limit = 72;

function validateCommitTitle({delegateTarget: field}) {
	field.classList.toggle('rgh-title-over-limit', field.value.length > limit);
}

async function validatePrTitle({delegateTarget: field}) {
	// Include the PR number in the title length calculation because it will be added to the commit title
	const prTitle = formatPrCommitTitle(
		field.value,
		getConversationNumber() ?? await getNextConversationNumber(),
	);
	field.classList.toggle('rgh-title-over-limit', prTitle.length > limit);
}

function unload() {
	features.unload(import.meta.url);
}

function init(signal) {
	abortableClassName(document.body, signal, 'rgh-suggest-commit-title-limit');
	onCommitTitleUpdate(validateCommitTitle, signal);
	delegate([
		'#issue_title',
		'#pull_request_title',
	], 'input', validatePrTitle, {signal, passive: true});
	onPrMerge(unload, signal);
}

void features.add(import.meta.url, {
	include: [
		isEditingFile,
		isCompare,
		isPR,
	],
	exclude: [
		// No need here https://github.com/refined-github/refined-github/issues/7922
		isMergedPR,
	],
	// DOM-based checks; event-based feature
	awaitDomReady: true,
	init,
});

/*

# Test data

## Commit title

123456789 123456789 123456789 123456789 123456789 123456789 123456789 123

## Test URLs

- Any mergeable PR
	- https://github.com/refined-github/sandbox/pull/8
- Any editable file
	- Markown: https://github.com/refined-github/refined-github/edit/main/readme.md
	- Workflow: https://github.com/refined-github/refined-github/edit/fix-commit-title-limit/.github/workflows/features.yml

*/
