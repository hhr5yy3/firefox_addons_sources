import memoize from '../npm/memoize.js';
import { $$ } from '../npm/select-dom.js';
import preserveScroll from './preserve-scroll.js';

var clickAll = memoize((selector) => event => {
	if (event.altKey && event.isTrusted) {
		const clickedItem = event.delegateTarget;

		// `parentElement` is the anchor because `clickedItem` might be hidden/replaced after the click
		const resetScroll = preserveScroll(clickedItem.parentElement);
		clickAllExcept(typeof selector === 'string' ? selector : selector(clickedItem), clickedItem);
		resetScroll();
	}
});

function clickAllExcept(elementsToClick, except) {
	for (const item of $$(elementsToClick)) {
		if (item !== except) {
			item.click();
		}
	}
}

export { clickAll as default };
