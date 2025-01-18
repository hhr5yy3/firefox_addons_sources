import { elementExists, $, expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import compareVersions from '../npm/tiny-version-compare.js';
import { utils, isArchivedRepo, isRepoCommitList } from '../npm/github-url-detection.js';
import memoize from '../npm/memoize.js';
import onetime from '../helpers/onetime.js';
import { branchSelector } from './selectors.js';

// This never changes, so it can be cached here
const getUsername = onetime(utils.getUsername);
const {getRepositoryInfo: getRepo, getCleanPathname} = utils;

function getConversationNumber() {
	const [, _owner, _repo, type, prNumber] = location.pathname.split('/');
	return (type === 'pull' || type === 'issues') && Number(prNumber) ? Number(prNumber) : undefined;
}

const isMac = navigator.userAgent.includes('Macintosh');




function buildRepoURL(...pathParts) {
	for (const part of pathParts) {
		if (typeof part === 'string' && /^\/|\/$/.test(part)) {
			throw new TypeError('The path parts shouldn’t start or end with a slash: ' + part);
		}
	}

	return [location.origin, getRepo()?.nameWithOwner, ...pathParts].join('/');
}

function getForkedRepo() {
	return $('meta[name="octolytics-dimension-repository_parent_nwo"]')?.content;
}

function parseTag(tag) {
	const [, namespace = '', version = ''] = /(?:(.*)@)?([^@]+)/.exec(tag) ?? [];
	return {namespace, version};
}

function isUsernameAlreadyFullName(username, realname) {
	// Normalize both strings
	username = username
		.replaceAll('-', '')
		.toLowerCase();
	realname = realname
		.normalize('NFD')
		// Remove diacritics, punctuation and spaces
		// https://stackoverflow.com/a/37511463/288906
		// https://www.freecodecamp.org/news/what-is-punct-in-regex-how-to-match-all-punctuation-marks-in-regular-expressions/
		.replaceAll(/[\p{Diacritic}\p{P}\s]/gu, '')
		.toLowerCase();

	return username === realname;
}

const validVersion = /^[vr]?\d+(?:\.\d+)+/;
// eslint-disable-next-line regexp/no-useless-non-capturing-group -- I don't think so?
const isPrerelease = /^[vr]?\d+(?:\.\d+)+(?:-\d)/;
function getLatestVersionTag(tags) {
	// Some tags aren't valid versions; comparison is meaningless.
	// Just use the latest tag returned by the API (reverse chronologically-sorted list)
	if (!tags.every(tag => validVersion.test(tag))) {
		return tags[0];
	}

	// Exclude pre-releases
	let releases = tags.filter(tag => !isPrerelease.test(tag));
	if (releases.length === 0) { // They were all pre-releases; undo.
		releases = tags;
	}

	let latestVersion = releases[0];
	for (const release of releases) {
		if (compareVersions(latestVersion, release) < 0) {
			latestVersion = release;
		}
	}

	return latestVersion;
}

// https://github.com/idimetrix/text-case/blob/master/packages/upper-case-first/src/index.ts
function upperCaseFirst(input) {
	return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

const cachePerPage = {
	cacheKey: () => location.pathname,
};

/** Is tag or commit, with elementReady */
const isPermalink = memoize(async () => {
	// No need for getCurrentGitRef(), it's a simple and exact check
	if (/^[\da-f]{40}$/.test(location.pathname.split('/')[4])) {
		// It's a commit
		return true;
	}

	// Awaiting only the branch selector means it resolves early even if the icon tag doesn't exist, whereas awaiting the icon tag would wait for the DOM ready event before resolving.
	return elementExists(
		'.octicon-tag', // Tags have an icon
		await elementReady(branchSelector),
	);
}, cachePerPage);

function isRefinedGitHubRepo() {
	return location.pathname.startsWith('/refined-github/refined-github');
}

function isAnyRefinedGitHubRepo() {
	return /^\/refined-github\/.+/.test(location.pathname);
}

function isRefinedGitHubYoloRepo() {
	return location.pathname.startsWith('/refined-github/yolo');
}

async function isArchivedRepoAsync() {
	// Load the bare minimum for `isArchivedRepo` to work
	await elementReady('main > div');

	// DOM-based detection, we want awaitDomReady: false, so it needs to be here
	return isArchivedRepo();
}

const userCanLikelyMergePR = () => elementExists('.discussion-sidebar-item .octicon-lock');

const cacheByRepo = () => getRepo().nameWithOwner;

// Commit lists for files and folders lack a branch selector
const isRepoCommitListRoot = () => isRepoCommitList() && document.title.startsWith('Commits');

const isUrlReachable = memoize(async (url) => {
	const {ok} = await fetch(url, {method: 'head'});
	return ok;
});

// Don't make the argument optional, sometimes we really expect it to exist and want to throw an error
function extractCurrentBranchFromBranchPicker(branchPicker) {
	return branchPicker.title === 'Switch branches or tags'
		? branchPicker.textContent.trim() // Branch name is shown in full
		: branchPicker.title; // Branch name was clipped, so they placed it in the title attribute
}

function addAfterBranchSelector(branchSelectorParent, sibling) {
	const row = branchSelectorParent.closest('.position-relative');
	row.classList.add('d-flex', 'flex-shrink-0', 'gap-2');
	row.append(sibling);
}

/** Trigger a conversation update if the view is out of date */
// https://github.com/refined-github/refined-github/issues/2465#issuecomment-567173300
function triggerConversationUpdate() {
	const marker = expectElement('.js-timeline-marker');
	marker.dispatchEvent(new CustomEvent('socket:message', {
		bubbles: true,
		detail: {data: {gid: marker.dataset.gid}},
	}));
}

// Fix z-index issue https://github.com/refined-github/refined-github/pull/7430
function fixFileHeaderOverlap(child) {
	// In the sidebar the container is not present and this fix is not needed
	child.closest('.container')?.classList.add('rgh-z-index-5');
}

/** Trigger a reflow to push the right-most tab into the overflow dropdown */
function triggerRepoNavOverflow() {
	globalThis.dispatchEvent(new Event('resize'));
}

function triggerActionBarOverflow(child) {
	const parent = child.closest('action-bar');
	const placeholder = document.createElement('div');
	parent.replaceWith(placeholder);
	placeholder.replaceWith(parent);
}

function multilineAriaLabel(...lines) {
	return lines.join('\n');
}

function scrollIntoViewIfNeeded(element) {
	// @ts-expect-error No Firefox support https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
	(element.scrollIntoViewIfNeeded ?? element.scrollIntoView).call(element);
}

function getConversationAuthor() {
	return $('#partial-discussion-header .gh-header-meta .author')?.textContent;
}

function isOwnConversation() {
	return getConversationAuthor() === getUsername();
}

function assertCommitHash(hash) {
	if (!/^[0-9a-f]{40}$/.test(hash)) {
		throw new Error(`Invalid commit hash: ${hash}`);
	}
}

export { addAfterBranchSelector, assertCommitHash, buildRepoURL, cacheByRepo, extractCurrentBranchFromBranchPicker, fixFileHeaderOverlap, getCleanPathname, getConversationNumber, getForkedRepo, getLatestVersionTag, getRepo, getUsername, isAnyRefinedGitHubRepo, isArchivedRepoAsync, isMac, isOwnConversation, isPermalink, isRefinedGitHubRepo, isRefinedGitHubYoloRepo, isRepoCommitListRoot, isUrlReachable, isUsernameAlreadyFullName, multilineAriaLabel, parseTag, scrollIntoViewIfNeeded, triggerActionBarOverflow, triggerConversationUpdate, triggerRepoNavOverflow, upperCaseFirst, userCanLikelyMergePR };
