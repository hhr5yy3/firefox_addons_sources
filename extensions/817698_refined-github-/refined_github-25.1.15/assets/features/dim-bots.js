import { $$ } from '../npm/select-dom.js';
import { isCommitList, isIssueOrPRList } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import preserveScroll from '../helpers/preserve-scroll.js';
import observe from '../helpers/selector-observer.js';
import { botLinksCommitSelectors, botLinksPrSelectors } from '../github-helpers/selectors.js';
import { getIdentifiers } from '../helpers/feature-helpers.js';

const dimBots = getIdentifiers(import.meta.url);

const interactiveElementsSelector = 'a, button, input, [tabindex]';

function undimBots(event) {
	const target = event.target ;
	// Only undim when clicking on empty areas
	if (target.closest(interactiveElementsSelector)) {
		return;
	}

	const resetScroll = preserveScroll(target);
	for (const bot of $$(dimBots.selector)) {
		bot.classList.add('rgh-interacted');
	}

	resetScroll();
}

function dim(commit) {
	commit.closest([
		'[data-testid="commit-row-item"]',

		'.Box-row', // PRs
	]).classList.add(dimBots.class);
}

async function init(signal) {
	observe([...botLinksCommitSelectors, ...botLinksPrSelectors], dim, {signal});

	// Undim on mouse focus
	delegate(dimBots.selector, 'click', undimBots, {signal});
}

void features.add(import.meta.url, {
	include: [
		isCommitList,
		isIssueOrPRList,
	],
	init,
});

/*

Test URLs

- Commits: https://github.com/typed-ember/ember-cli-typescript/commits/master?after=5ff0c078a4274aeccaf83382c0d6b46323f57397+174
- Commits by unmarked bot: https://github.com/rust-lang/rust/commits/master?after=c387f012b14a3d64e0d580b7ebe65e5325bcf822+34&branch=master&qualified_name=refs%2Fheads%2Fmaster
- PRs: https://github.com/OctoLinker/OctoLinker/pulls?q=is%3Apr+is%3Aclosed
- PRs by unmarked bot: https://github.com/spotify/scio/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed+steward
- PR Commits: https://github.com/pixiebrix/webext-messenger/pull/173/commits

*/
