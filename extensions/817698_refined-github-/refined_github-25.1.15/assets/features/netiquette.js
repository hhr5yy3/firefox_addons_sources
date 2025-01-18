import React from '../npm/dom-chef.js';
import FlameIcon from '../npm/octicons-plain-react-components-Flame.js';
import { isConversation, isDraftPR, hasComments, isClosedConversation, isPR } from '../npm/github-url-detection.js';
import toMilliseconds from '../npm/@sindresorhus-to-milliseconds.js';
import { countElements, $, elementExists } from '../npm/select-dom.js';
import twas from '../npm/twas-index.es.js';
import InfoIcon from '../npm/octicons-plain-react-components-Info.js';
import GitPullRequestDraftIcon from '../npm/octicons-plain-react-components-GitPullRequestDraft.js';
import createBanner from '../github-helpers/banner.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { isAnyRefinedGitHubRepo, isOwnConversation, buildRepoURL } from '../github-helpers/index.js';
import { getLastCloseEvent } from './jump-to-conversation-close-event.js';
import { newCommentField } from '../github-helpers/selectors.js';
import { userIsModerator } from '../github-helpers/get-user-permission.js';
import looseParseInt from '../helpers/loose-parse-int.js';

/** Returns milliseconds passed since `date` */
function timeAgo(date) {
	return Date.now() - date.getTime();
}

function getCloseDate() {
	const datetime = getLastCloseEvent().getAttribute('datetime');
	console.assert(datetime, 'Datetime attribute missing from relative-time');
	return new Date(datetime);
}

function isPopular() {
	return (
		countElements('[data-testid="comment-header"]') > 30
		|| looseParseInt($('[aria-label*="other participants"]')?.ariaLabel) > 30
		|| elementExists('[data-testid="issue-timeline-load-more-count-front"]')
		// TODO: Drop in April 2025; old conversation style
		|| countElements('.timeline-comment') > 30
		|| countElements('.participant-avatar') > 10
	);
}

const threeMonths = toMilliseconds({days: 90});

function wasClosedLongAgo() {
	if (!isClosedConversation()) {
		return false;
	}

	const closingDate = getCloseDate();
	return timeAgo(closingDate) > threeMonths;
}

function getResolvedText() {
	const closingDate = getCloseDate();
	const ago = React.createElement('strong', null, twas(closingDate.getTime()));
	const newIssue = React.createElement('a', { href: buildRepoURL('issues/new/choose'),}, "new issue" );
	return (
		React.createElement(React.Fragment, null, "This "
 , isPR() ? 'PR' : 'issue', " was closed "   , ago, ". Please consider opening a "     , newIssue, " instead of leaving a comment here."
)
	);
}

function addResolvedBanner(newCommentField) {
	const reactWrapper = newCommentField.closest('[class^="InlineAutocomplete"]');
	const banner = createBanner({
		icon: React.createElement(InfoIcon, { className: "m-0",} ),
		classes: 'p-2 text-small color-fg-muted border-0 rounded-0'.split(' '),
		text: getResolvedText(),
	});

	if (reactWrapper) {
		reactWrapper.before(banner);
	} else {
		banner.classList.replace('rounded-0', 'm-2');
		newCommentField.prepend(banner);
	}
}

function addPopularBanner(newCommentField) {
	const reactWrapper = newCommentField.closest('[class^="InlineAutocomplete"]');
	const banner = createBanner({
		icon: React.createElement(FlameIcon, { className: "m-0",} ),
		classes: 'p-2 text-small color-fg-muted border-0 rounded-0'.split(' '),
		text: 'This issue is highly active. Reconsider commenting unless you have read all the comments and have something to add.',
	});

	if (reactWrapper) {
		reactWrapper.before(banner);
	} else {
		banner.classList.replace('rounded-0', 'm-2');
		newCommentField.prepend(banner);
	}
}

function addDraftBanner(newCommentField) {
	newCommentField.prepend(
		createBanner({
			icon: React.createElement(GitPullRequestDraftIcon, { className: "m-0",} ),
			classes: 'p-2 my-2 mx-md-2 text-small color-fg-muted border-0'.split(' '),
			text: React.createElement(React.Fragment, null, "This is a "   , React.createElement('strong', null, "draft PR" ), ", it might not be ready for review."       ),
		}),
	);
}

function initDraft(signal) {
	observe(newCommentField, addDraftBanner, {signal});
}

function initBanner(signal) {
	observe(newCommentField, async (field) => {
		// Check inside the observer because React views load after dom-ready
		if (wasClosedLongAgo()) {
			addResolvedBanner(field);
		} else if (isPopular() && !(await userIsModerator())) {
			addPopularBanner(field);
		}
	}, {signal});
}

function makeFieldKinder(field) {
	if (field.textContent.trim() === 'Add your comment here...') {
		// Regular issue/PR comment field, or single review comments
		// https://github.com/refined-github/refined-github/pull/6991
		field.textContent = 'Add your comment here, be kind';
	} else if (field.textContent.trim() === 'Leave a comment') {
		// Main review comment field
		// https://github.com/refined-github/refined-github/pull/6991/files
		field.textContent = 'Leave a comment, be kind';
	} else {
		throw new Error(`Unexpected placeholder text: ${field.textContent}`);
	}
}

function makeReactFieldKinder(field) {
	field.placeholder = 'Add your comment here, be kind';
}

function initKindness(signal) {
	observe('p.CommentBox-placeholder', makeFieldKinder, {signal});
	observe([
		'textarea[placeholder="Use Markdown to format your comment"]', // On issues
		'textarea[placeholder="Leave a comment"]', // On single commits
	], makeReactFieldKinder, {signal});
}

void features.add(import.meta.url, {
	exclude: [
		isAnyRefinedGitHubRepo,
	],
	include: [
		isConversation,
	],
	awaitDomReady: true, // We're specifically looking for the last event
	init: initBanner,
}, {
	include: [
		isDraftPR,
	],
	exclude: [
		isOwnConversation,
	],
	awaitDomReady: true,
	init: initDraft,
}, {
	include: [
		hasComments,
	],
	init: initKindness,
});

/*

Test URLs

- Old issue: https://togithub.com/facebook/react/issues/227
- Old PR: https://togithub.com/facebook/react/pull/209
- Popular issue: https://togithub.com/facebook/react/issues/13991
- Draft PR: https://github.com/refined-github/sandbox/pull/7

*/

export { getResolvedText, wasClosedLongAgo };
