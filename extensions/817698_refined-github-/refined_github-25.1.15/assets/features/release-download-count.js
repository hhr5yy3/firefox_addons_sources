import React from '../npm/dom-chef.js';
import { expectElement, $$ } from '../npm/select-dom.js';
import DownloadIcon from '../npm/octicons-plain-react-components-Download.js';
import { isReleasesOrTags, isSingleReleaseOrTag } from '../npm/github-url-detection.js';
import { d as distExports } from '../_virtual/index.js';
import getReleaseDownloadCount from './release-download-count.gql.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import observe from '../helpers/selector-observer.js';
import { createHeatIndexFunction } from '../helpers/math.js';
import { expectToken } from '../github-helpers/github-token.js';

/*

This feature is documented at https://github.com/refined-github/refined-github/wiki/Customization

*/







async function getAssetsForTag(tag) {
	const {repository} = await api.v4(getReleaseDownloadCount, {variables: {tag}});
	const assets = repository.release.releaseAssets.nodes;
	return Object.fromEntries(assets.map(({name, downloadCount}) => ([name, downloadCount])));
}

async function addCounts(assetsList) {
	// Both pages have .Box but in the list .Box doesn't include the tag
	const container = assetsList.closest('section') // Single-release page
		?? assetsList.closest('.Box:not(.Box--condensed)'); // Releases list, excludes the assets list’s own .Box

	// .octicon-code required by visit-tag feature
	const releaseName = expectElement(['.octicon-tag ~ span', '.octicon-code ~ span'], container)
		.textContent
		.trim();

	const assets = await getAssetsForTag(releaseName);

	const calculateHeatIndex = createHeatIndexFunction(Object.values(assets));
	for (const assetLink of $$('.octicon-package ~ a', assetsList)) {
		// Match the asset in the DOM to the asset in the API response
		const downloadCount = assets[assetLink.pathname.split('/').pop()] ?? 0;

		// Place next to asset size
		const assetSize = assetLink
			.closest('.Box-row')
			.querySelector(':scope > .flex-justify-end > :first-child');

		assetSize.classList.replace('text-sm-left', 'text-md-right');
		assetSize.parentElement.classList.add('rgh-release-download-count');

		const classes = new Set(assetSize.classList);
		if (downloadCount === 0) {
			classes.add('v-hidden');
		}

		assetSize.before(
			React.createElement('span', { className: [...classes].join(' '),}
, React.createElement('span', {
					className: "d-inline-block text-right" ,
					title: `${downloadCount} downloads`,
					'data-rgh-heat': calculateHeatIndex(downloadCount),}

, distExports.abbreviateNumber(downloadCount), " " , React.createElement(DownloadIcon, null )
)
),
		);
	}
}

async function init(signal) {
	await expectToken();

	observe('.Box-footer .Box--condensed:has(.octicon-package)', addCounts, {signal});
}

void features.add(import.meta.url, {
	include: [
		isReleasesOrTags,
		isSingleReleaseOrTag,
	],
	init,
});

/*

Test URLs

- One release: https://github.com/cli/cli/releases/tag/v2.30.0
- List of releases: https://github.com/cli/cli/releases
- Lots of assets: https://github.com/notepad-plus-plus/notepad-plus-plus/releases

*/
