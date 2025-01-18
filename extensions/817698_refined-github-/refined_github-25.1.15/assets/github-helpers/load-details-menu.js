import { $ } from '../npm/select-dom.js';
import oneEvent from '../npm/one-event.js';

async function loadDetailsMenu(detailsMenu) {
	const fragment = $('.js-comment-header-actions-deferred-include-fragment', detailsMenu);
	if (!fragment) {
		return;
	}

	detailsMenu.parentElement.dispatchEvent(new Event('mouseover'));
	await oneEvent(fragment, 'load');
}

export { loadDetailsMenu as default };
