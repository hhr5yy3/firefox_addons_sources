import { hasCode } from '../npm/github-url-detection.js';
import { onAbort } from '../npm/abort-utils-on-abort.js';
import features from '../feature-manager.js';
import { codeElementsSelector } from '../github-helpers/dom-formatters.js';
import showWhiteSpacesOnLine from '../helpers/show-whitespace-on-line.js';
import observe from '../helpers/selector-observer.js';

const viewportObserver = new IntersectionObserver(changes => {
	for (const {target: line, isIntersecting} of changes) {
		if (isIntersecting) {
			const shouldAvoidSurroundingSpaces = Boolean(line.closest('.blob-wrapper-embedded')); // #2285
			showWhiteSpacesOnLine(line, shouldAvoidSurroundingSpaces);
			viewportObserver.unobserve(line);
		}
	}
});

function showWhitespaceWhenInViewport(line) {
	viewportObserver.observe(line);
}

function init(signal) {
	observe(`:is(${codeElementsSelector.join(',')}):not(.blob-code-hunk)`, showWhitespaceWhenInViewport, {signal});
	onAbort(signal, viewportObserver);
}

void features.add(import.meta.url, {
	include: [
		hasCode,
	],
	init,
});

/*
TEST URL
https://github.com/refined-github/sandbox/pull/18
*/
