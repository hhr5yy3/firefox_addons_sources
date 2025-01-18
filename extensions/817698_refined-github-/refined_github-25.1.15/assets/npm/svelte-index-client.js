import { component_context, untrack } from './svelte-internal-client-runtime.js';
import './esm-env-dev-fallback.js';
import { user_effect } from './svelte-internal-client-reactivity-effects.js';
import { lifecycle_outside_component } from './svelte-internal-shared-errors.js';
import './svelte-internal-client-dom-elements-custom-element.js';

function onMount(fn) {
	if (component_context === null) {
		lifecycle_outside_component('onMount');
	}
	{
		user_effect(() => {
			const cleanup = untrack(fn);
			if (typeof cleanup === 'function') return  (cleanup);
		});
	}
}

export { onMount, untrack };
