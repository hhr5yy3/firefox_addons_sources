import { getRepo } from './index.js';

function getRepoReference(currentRepo, repoNameWithOwner, delimiter = '') {
	return repoNameWithOwner === currentRepo.nameWithOwner ? '' : repoNameWithOwner + delimiter;
}

const escapeRegex = (string) => string.replaceAll(/[\\^$.*+?()[\]{}|]/g, String.raw`\$&`);
const prCommitPathnameRegex = /[/]([^/]+[/][^/]+)[/]pull[/](\d+)[/]commits[/]([\da-f]{7})[\da-f]{33}(?:#[\w-]+)?\b/;
const prCommitUrlRegex = new RegExp(String.raw`\b` + escapeRegex(location.origin) + prCommitPathnameRegex.source, 'gi');

const prComparePathnameRegex = /[/]([^/]+[/][^/]+)[/]compare[/](.+)(#diff-[\da-fR-]+)/;
const prCompareUrlRegex = new RegExp(String.raw`\b` + escapeRegex(location.origin) + prComparePathnameRegex.source, 'gi');

const discussionPathnameRegex = /[/]([^/]+[/][^/]+)[/]discussions[/](\d+)[?][^#\s]+(#[\w-]+)?\b/;
const discussionUrlRegex = new RegExp(String.raw`\b` + escapeRegex(location.origin) + discussionPathnameRegex.source, 'gi');

// To be used as replacer callback in string.replace() for PR commit links
function preventPrCommitLinkLoss(url, repoNameWithOwner, pr, commit, index, fullText) {
	if (fullText[index + url.length] === ')') {
		return url;
	}

	return `[${getRepoReference(getRepo(), repoNameWithOwner, '@')}\`${commit}\` (#${pr})](${url})`;
}

// To be used as replacer callback in string.replace() for compare links
function preventPrCompareLinkLoss(url, repoNameWithOwner, compare, hash, index, fullText) {
	if (fullText[index + url.length] === ')') {
		return url;
	}

	return `[${getRepoReference(getRepo(), repoNameWithOwner, '@')}\`${compare}\`${hash.slice(0, 16)}](${url})`;
}

// To be used as replacer callback in string.replace() for discussion links
function preventDiscussionLinkLoss(url, repoNameWithOwner, discussion, comment, index, fullText) {
	if (fullText[index + url.length] === ')') {
		return url;
	}

	return `[${getRepoReference(getRepo(), repoNameWithOwner)}#${discussion}${comment ? ' (comment)' : ''}](${url})`;
}

export { discussionUrlRegex, prCommitUrlRegex, prCompareUrlRegex, preventDiscussionLinkLoss, preventPrCommitLinkLoss, preventPrCompareLinkLoss };
