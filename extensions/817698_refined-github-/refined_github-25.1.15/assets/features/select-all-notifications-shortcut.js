import { expectElement } from '../npm/select-dom.js';
import { isNotifications } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { registerHotkey } from '../github-helpers/hotkey.js';

function selectAllNotifications() {
	expectElement('.js-notifications-mark-all-prompt').click();
}

function init(signal) {
	registerHotkey('a', selectAllNotifications, {signal});
}

void features.add(import.meta.url, {
	shortcuts: {
		a: 'Select all notifications',
	},
	include: [
		isNotifications,
	],
	init,
});

/*

Test URLs:

https://github.com/notifications (Grouped by date)
https://github.com/notifications (Grouped by repo)

*/
