import DEV from './esm-env-dev-fallback.js';
import { queue_micro_task } from './svelte-internal-client-dom-task.js';
import { register_style } from './svelte-internal-client-dev-css.js';

function append_styles(anchor, css) {
	queue_micro_task(() => {
		var root = anchor.getRootNode();
		var target =  (root).host
			?  (root)
			:  (root).head ??  (root.ownerDocument).head;
		if (!target.querySelector('#' + css.hash)) {
			const style = document.createElement('style');
			style.id = css.hash;
			style.textContent = css.code;
			target.appendChild(style);
			if (DEV) {
				register_style(css.hash, style);
			}
		}
	});
}

export { append_styles };
