import React from '../npm/dom-chef.js';
import { isEnterprise, isSingleFile, isPublicRepo } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

const isSingleHTMLFile = () => isSingleFile() && /\.html?$/.test(location.pathname);

function add(rawButton) {
	if (!isPublicRepo()) {
		return;
	}

	rawButton
		.parentElement // `BtnGroup`
		.prepend(
			React.createElement('a', {
				className: "btn btn-sm BtnGroup-item"  ,
				// #3305
				href: `https://refined-github-html-preview.kidonng.workers.dev${rawButton.pathname}`,}
, "Preview"

),
		);
}

function init(signal) {
	observe(['a#raw-url', 'a[data-testid="raw-button"]'], add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isSingleHTMLFile,
	],
	exclude: [
		isEnterprise,
	],
	init,
});

/*

Test URLs:

https://github.com/CodingTrain/website/blob/4f90eedb9618257d9166241e92e51a7f3f00a08e/code_challenges/PerlinNoiseTerrain_p5.js/index.html

*/
