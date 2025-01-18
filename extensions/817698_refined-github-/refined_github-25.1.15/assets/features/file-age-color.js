import { isRepoTree, isRepoFile404 } from '../npm/github-url-detection.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import { createHeatIndexFunction } from '../helpers/math.js';

/*

This feature is documented at https://github.com/refined-github/refined-github/wiki/Customization

*/


const calculateHeatIndex = createHeatIndexFunction([0, -2_000_000_000]);

function addHeatIndex(lastUpdateElement) {
	// `datetime` attribute used by pre-React version
	const lastUpdate = new Date(lastUpdateElement.getAttribute('datetime') ?? lastUpdateElement.title);
	const diff = Date.now() - lastUpdate.getTime();

	lastUpdateElement.setAttribute('data-rgh-heat', String(calculateHeatIndex(-diff)));
}

function init(signal) {
	observe('.react-directory-commit-age > [title]', addHeatIndex, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
	],
	exclude: [
		isRepoFile404,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github
https://github.com/refined-github/refined-github/tree/main/source

*/
