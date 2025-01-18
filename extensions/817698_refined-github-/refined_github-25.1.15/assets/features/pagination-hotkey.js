import { isIssueOrPRList, isGlobalSearchResults, isLabelList, isNotifications, isRepoCommitList, isPRCommit, isDiscussionList, isReleases, isProfileRepoList } from '../npm/github-url-detection.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import { addHotkey } from '../github-helpers/hotkey.js';

const previous = [
	'a[rel="prev"]', // `isIssueOrPRList`, `isGlobalSearchResults`, `isReleases`, `isProfileRepoList`, `isDiscussionList`
	'.paginate-container a.BtnGroup-item:first-child', // `isRepoCommitList`, `isNotifications`
	'.prh-commit a.BtnGroup-item:first-child', // `isPRCommit`
] ;

const next = previous.join(',')
	.replaceAll('"prev"', '"next"')
	.replaceAll(':first', ':last') ;

function init(signal) {
	observe(previous, button => {
		addHotkey(button, 'ArrowLeft');
	}, {signal});
	observe(next, button => {
		addHotkey(button, 'ArrowRight');
	}, {signal});
}

void features.add(import.meta.url, {
	shortcuts: {
		'→': 'Go to the next page',
		'←': 'Go to the previous page',
	},
	include: [
		isIssueOrPRList,
		isGlobalSearchResults,
		isLabelList,
		isNotifications,
		isRepoCommitList,
		isPRCommit,
		isDiscussionList,
		isReleases,
		isProfileRepoList,
	],
	init,
});

/*

# Test URLs

PR Commit: https://github.com/refined-github/refined-github/pull/4677/commits/1e1e0707ac58d1a40543a92651c3bbfd113481bf
Releases: https://github.com/refined-github/refined-github/releases
Issues: https://github.com/refined-github/refined-github/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
Repo Search: https://github.com/refined-github/refined-github/search?q=pull
Global search: https://github.com/search?q=wonder&type=repositories
Notifications: https://github.com/notifications

*/
