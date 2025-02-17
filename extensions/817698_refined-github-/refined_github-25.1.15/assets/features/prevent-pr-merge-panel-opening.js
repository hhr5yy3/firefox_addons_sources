import { $ } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

async function sessionResumeHandler() {
	await Promise.resolve(); // The `session:resume` event fires a bit too early
	const cancelMergeButton = $('.merge-branch-form .js-details-target');
	if (cancelMergeButton) {
		cancelMergeButton.click();
		document.removeEventListener('session:resume', sessionResumeHandler);
	}
}

function init(signal) {
	document.addEventListener('session:resume', sessionResumeHandler, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	init,
});

/*

Test URLs:

1. Visit https://github.com/pulls
2. Open any PR you can merge
2. Click "Merge pull request"
3. Click "Cancel merge"
4. Reload the page
5. The panel should not still be open

*/
