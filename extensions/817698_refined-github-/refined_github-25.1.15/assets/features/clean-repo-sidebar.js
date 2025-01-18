import { elementExists, $, expectElement } from '../npm/select-dom.js';
import domLoaded from '../npm/dom-loaded.js';
import elementReady from '../npm/element-ready.js';
import { isRepoRoot, canUserEditRepo } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

// The h2 is to avoid hiding website links that include '/releases' #4424
// TODO: It's broken
const releasesSidebarSelector = '.Layout-sidebar .BorderGrid-cell h2 a[href$="/releases"]';
async function cleanReleases() {
	const sidebarReleases = await elementReady(releasesSidebarSelector, {waitForChildren: false});
	if (!sidebarReleases) {
		return;
	}

	const releasesSection = sidebarReleases.closest('.BorderGrid-cell');
	if (!elementExists('.octicon-tag', releasesSection)) {
		// Hide the whole section if there's no releases
		releasesSection.hidden = true;
		return;
	}

	// Collapse "Releases" section into previous section
	releasesSection.classList.add('border-0', 'pt-md-0');
	sidebarReleases.closest('.BorderGrid-row')
		.previousElementSibling // About’s .BorderGrid-row
		.firstElementChild // About’s .BorderGrid-cell
		.classList
		.add('border-0', 'pb-0');
}

async function hideLanguageHeader() {
	await domLoaded;

	const lastSidebarHeader = $('.Layout-sidebar .BorderGrid-row:last-of-type h2');
	if (lastSidebarHeader?.textContent === 'Languages') {
		lastSidebarHeader.hidden = true;
	}
}

// Hide empty meta if it’s not editable by the current user
async function hideEmptyMeta() {
	await domLoaded;

	if (!canUserEditRepo()) {
		$('.Layout-sidebar .BorderGrid-cell > .text-italic')?.remove();
	}
}

async function moveReportLink() {
	await domLoaded;

	const reportLink = $('.Layout-sidebar a[href^="/contact/report-content"]')?.parentElement;
	if (reportLink) {
		// Your own repos don't include this link
		expectElement('.Layout-sidebar .BorderGrid-row:last-of-type .BorderGrid-cell').append(reportLink);
	}
}

async function init() {
	document.documentElement.setAttribute('rgh-clean-repo-sidebar', '');
}

void features.add(import.meta.url, {
	include: [
		isRepoRoot,
	],
	deduplicate: 'has-rgh-inner',
	init: [
		init,
		cleanReleases,
		hideLanguageHeader,
		hideEmptyMeta,
		moveReportLink,
	],
});

/*

Test URLs:

- https://github.com/refined-github/refined-github
- Repo with empty packages section: https://github.com/isaacs/node-glob
- Repo with 1 package: https://github.com/recyclarr/recyclarr

*/
