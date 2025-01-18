import './esm-env-dev-fallback.js';
import './svelte-internal-client-runtime.js';

function toggle_class(dom, class_name, value) {
	if (value) {
		if (dom.classList.contains(class_name)) return;
		dom.classList.add(class_name);
	} else {
		if (!dom.classList.contains(class_name)) return;
		dom.classList.remove(class_name);
	}
}

export { toggle_class };
