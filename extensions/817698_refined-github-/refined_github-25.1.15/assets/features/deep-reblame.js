import memoize from '../npm/memoize.js';
import React from '../npm/dom-chef.js';
import { $, expectElement, $$ } from '../npm/select-dom.js';
import VersionsIcon from '../npm/octicons-plain-react-components-Versions.js';
import { isBlame } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import showToast from '../github-helpers/toast.js';
import looseParseInt from '../helpers/loose-parse-int.js';
import observe from '../helpers/selector-observer.js';
import GetPullRequestBlameCommit from './deep-reblame.gql.js';
import { multilineAriaLabel } from '../github-helpers/index.js';
import { expectToken } from '../github-helpers/github-token.js';

const getPullRequestBlameCommit = memoize(async (commit, prNumbers, currentFilename) => {
	const {repository} = await api.v4(GetPullRequestBlameCommit, {
		variables: {
			commit,
			file: commit + ':' + currentFilename,
		},
	});

	const associatedPR = repository.object.associatedPullRequests.nodes[0];

	if (!associatedPR || !prNumbers.includes(associatedPR.number) || associatedPR.mergeCommit.oid !== commit) {
		throw new Error('The PR linked in the title didn’t create this commit');
	}

	if (!repository.file) {
		throw new Error('The file was renamed and Refined GitHub can’t find it');
	}

	return associatedPR.commits.nodes[0].commit.oid;
});

function extractCommitFromHoverCardUrl(url) {
	return /[/]commit[/]([0-9a-f]{40})[/]/i.exec(url)[1];
}

async function redirectToBlameCommit(event) {
	const blameElement = event.delegateTarget;
	if (blameElement instanceof HTMLAnchorElement && !event.altKey) {
		return; // Unmodified click on regular link: let it proceed
	}

	event.preventDefault();
	blameElement.blur(); // Hide tooltip after click, it’s shown on :focus

	const blameHunk = blameElement.closest('.react-blame-segment-wrapper');
	const prNumbers = $$('.issue-link', blameHunk).map(pr => looseParseInt(pr));
	const commitInfo = expectElement('span[data-hovercard-url*="/commit/"]', blameHunk).dataset.hovercardUrl;
	const prCommit = extractCommitFromHoverCardUrl(commitInfo);
	const blameUrl = new GitHubFileURL(location.href);

	await showToast(async () => {
		blameUrl.branch = await getPullRequestBlameCommit(prCommit, prNumbers, blameUrl.filePath);
		blameUrl.hash = 'L' + expectElement('.react-line-number', blameHunk).textContent;
		location.href = blameUrl.href;
	}, {
		message: 'Fetching pull request',
		doneMessage: 'Redirecting',
	});
}

function addButton(hunk) {
	const reblameLink = $('a[aria-labelledby^="reblame-"]', hunk);
	if (reblameLink) {
		reblameLink.setAttribute('aria-label', 'View blame prior to this change. Hold `Alt` to extract commits from this PR first');
		reblameLink.classList.add('rgh-deep-reblame');
	} else {
		expectElement('.timestamp-wrapper-mobile', hunk).after(
			React.createElement('button', {
				type: "button",
				'aria-label': multilineAriaLabel(
					'View blame prior to this change',
					'(extracts commits from this PR first)',
				),
				className: "rgh-deep-reblame Button Button--iconOnly Button--invisible Button--small d-flex"     ,}

, React.createElement(VersionsIcon, null )
),
		);
	}
}

async function init(signal) {
	await expectToken();

	delegate('.rgh-deep-reblame', 'click', redirectToBlameCommit, {signal});
	observe('.react-blame-for-range:has([data-hovercard-type="pull_request"])', addButton, {signal});
}

void features.add(import.meta.url, {
	include: [
		isBlame,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/blame/af0dd20dde497ac9dcec9cda47bee80902121298/source/features/deep-reblame.tsx

*/
