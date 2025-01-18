import { set_active_reaction, set_active_effect, active_reaction, active_effect } from './svelte-internal-client-runtime.js';
import './esm-env-dev-fallback.js';
import { add_form_reset_listener } from './svelte-internal-client-dom-elements-misc.js';

function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
	element.addEventListener(event, () => without_reactive_context(handler));
	const prev = element.__on_r;
	if (prev) {
		element.__on_r = () => {
			prev();
			on_reset(true);
		};
	} else {
		element.__on_r = () => on_reset(true);
	}
	add_form_reset_listener();
}

export { listen_to_event_and_reset_event, without_reactive_context };
