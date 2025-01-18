import { $ } from '../npm/select-dom.js';
import oneMutation from '../npm/one-mutation.js';

async function getTabCount(tab) {
	const counter = $('.Counter, .num', tab);
	if (!counter) {
		// GitHub might have already dropped the counter, which means it's 0
		return 0;
	}

	if (!counter.firstChild) {
		// It's still loading
		await oneMutation(tab, {childList: true, subtree: true});
	}

	return Number(counter.textContent);
}

export { getTabCount as default };
