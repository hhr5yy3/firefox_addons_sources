import React from '../npm/dom-chef.js';
import InfoIcon from '../npm/octicons-plain-react-components-Info.js';
import { isConversation } from '../npm/github-url-detection.js';
import createBanner from '../github-helpers/banner.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { isAnyRefinedGitHubRepo } from '../github-helpers/index.js';
import { wasClosedLongAgo, getResolvedText } from './netiquette.js';
import { TimelineItem, TimelineItemOld } from '../github-helpers/timeline-item.js';

function addConversationBanner(newCommentBox) {
	const button = (
		React.createElement('button', {
			type: "button",
			className: "btn-link",
			onClick: () => {
				newCommentBox.hidden = false;

				// Unlink this button
				button.replaceWith(button.firstChild);

				// Keep the banner, make it visible
				// eslint-disable-next-line ts/no-use-before-define -- Cyclic
				banner.firstElementChild.classList.replace('rgh-bg-none', 'flash-error');

				window.scrollBy({
					top: 100,
					behavior: 'smooth',
				});
			},}
, "comment"
)
	);

	const isReactView = newCommentBox.matches('[data-testid="comment-composer"]');
	const Wrapper = isReactView ? TimelineItem : TimelineItemOld;
	const banner = (
		React.createElement(Wrapper, null
, createBanner({
				classes: ['rgh-bg-none'],
				icon: React.createElement(InfoIcon, { className: "mr-1",} ),
				text: React.createElement(React.Fragment, null, getResolvedText(), " If you want to say something helpful, you can leave a "            , button, ". " , React.createElement('strong', null, "Do not" ), " report issues here."   ),
			})
)
	);
	newCommentBox.before(banner);
	newCommentBox.hidden = true;
}

function init(signal) {
	// Do not move to `asLongAs` because those conditions are run before `isConversation`
	if (!wasClosedLongAgo()) {
		return false;
	}

	observe([
		'#issuecomment-new:has(file-attachment)',
		'[data-testid="comment-composer"]',
	], addConversationBanner, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isAnyRefinedGitHubRepo,
	],
	include: [
		isConversation,
	],
	awaitDomReady: true, // We're specifically looking for the last event
	init,
});

/*

Test URLs

- Old issue: https://github.com/refined-github/refined-github/issues/3076
- Old PR: https://github.com/refined-github/refined-github/pull/159

*/
