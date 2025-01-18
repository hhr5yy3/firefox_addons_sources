import { elementExists } from '../npm/select-dom.js';
import getCallerID from './caller-id.js';

function attachElement(
	anchor,
	{
		before,
		after,
	},
) {
	const className = 'rgh-' + getCallerID();
	if (!anchor) {
		throw new Error('Element not found');
	}

	if (elementExists('.' + className, anchor.parentElement)) {
		return;
	}

	if (before) {
		const element = before(anchor);
		element.classList.add(className);
		anchor.before(element);
	}

	if (after) {
		const element = after(anchor);
		element.classList.add(className);
		anchor.after(element);
	}
}

export { attachElement as default };
