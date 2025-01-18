import DEV from './esm-env-dev-fallback.js';
import { render_effect } from './svelte-internal-client-reactivity-effects.js';
import { listen_to_event_and_reset_event } from './svelte-internal-client-dom-elements-bindings-shared.js';
import { bind_invalid_checkbox_value } from './svelte-internal-client-errors.js';
import { untrack } from './svelte-internal-client-runtime.js';
import { hydrating } from './svelte-internal-client-dom-hydration.js';

function bind_value(input, get, set = get) {
	listen_to_event_and_reset_event(input, 'input', (is_reset) => {
		if (DEV && input.type === 'checkbox') {
			bind_invalid_checkbox_value();
		}
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set(value);
		if (value !== (value = get())) {
			input.value = value ?? '';
		}
	});
	if (
		(hydrating && input.defaultValue !== input.value) ||
		(untrack(get) == null && input.value)
	) {
		set(is_numberlike_input(input) ? to_number(input.value) : input.value);
	}
	render_effect(() => {
		if (DEV && input.type === 'checkbox') {
			bind_invalid_checkbox_value();
		}
		var value = get();
		if (is_numberlike_input(input) && value === to_number(input.value)) {
			return;
		}
		if (input.type === 'date' && !value && !input.value) {
			return;
		}
		if (value !== input.value) {
			input.value = value ?? '';
		}
	});
}
function is_numberlike_input(input) {
	var type = input.type;
	return type === 'number' || type === 'range';
}
function to_number(value) {
	return value === '' ? null : +value;
}

export { bind_value };
