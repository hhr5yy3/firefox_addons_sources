import { $$ } from '../npm/select-dom.js';
import { isIssueOrPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function parseTime(element) {
	return new Date(element.getAttribute('datetime')).getTime();
}

function remove(issue) {
	const [stateChangeTime, updateTime] = $$('relative-time', issue);
	if (parseTime(updateTime) - parseTime(stateChangeTime) < 10_000) { // Hide if within 10 seconds
		updateTime.parentElement.remove();
	}
}

function init(signal) {
	observe('.js-navigation-item[id^="issue_"]', remove, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		() => location.search.includes('sort%3Aupdated-'),
	],
	include: [
		isIssueOrPRList,
	],
	init,
});

/*

Test URLs:

This feature applies to conversation lists sorted by updated time

- https://github.com/sindresorhus/refined-github/pulls?q=sort%3Aupdated-asc+is%3Aclosed
- https://github.com/sindresorhus/refined-github/issues?q=is%3Aissue+sort%3Aupdated-desc+is%3Aclosed+comments%3A0
- https://github.com/issues?q=is%3Aissue+is%3Aopen+author%3Afregante+archived%3Afalse+sort%3Aupdated-desc

*/
