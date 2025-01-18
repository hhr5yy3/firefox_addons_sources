import delegate from '../npm/delegate-it-delegate.js';
import delay from '../helpers/delay.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';

async function handleErroredImage({delegateTarget}) {
	console.log('Refined GitHub: image failed loading, will retry', delegateTarget.src);

	await delay(5000);
	try {
		// A clone image retries downloading
		const cloned = delegateTarget.cloneNode();
		await cloned.decode();
		// If successfully loaded, the failed image will be replaced.
		delegateTarget.replaceWith(cloned);
	} catch {}
}

function initOnce() {
	delegate('img[src^="https://camo.githubusercontent.com/"]', 'error', handleErroredImage, {capture: true});
}

void features.add(import.meta.url, {
	init: onetime(initOnce),
});

/*

Test URLs:

1. https://github.com/refined-github/sandbox/blob/7416/7416.md
2. See log in console

*/
