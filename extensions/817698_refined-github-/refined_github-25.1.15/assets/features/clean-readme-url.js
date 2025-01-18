import { isRepoHome } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

function maybeCleanUrl(event) {
	const parsed = new URL(event?.destination.url ?? location.href);
	if (parsed.searchParams.get('tab') === 'readme-ov-file') {
		parsed.searchParams.delete('tab');
		history.replaceState(history.state, '', parsed.href);
	}
}

function init(signal) {
	maybeCleanUrl();
	globalThis.navigation?.addEventListener('navigate', maybeCleanUrl, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoHome,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github?tab=readme-ov-file

*/
