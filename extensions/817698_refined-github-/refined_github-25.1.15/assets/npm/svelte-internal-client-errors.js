import DEV from './esm-env-dev-fallback.js';

function bind_invalid_checkbox_value() {
	if (DEV) {
		const error = new Error(`bind_invalid_checkbox_value\nUsing \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead\nhttps://svelte.dev/e/bind_invalid_checkbox_value`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
	}
}
function derived_references_self() {
	if (DEV) {
		const error = new Error(`derived_references_self\nA derived value cannot reference itself recursively\nhttps://svelte.dev/e/derived_references_self`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/derived_references_self`);
	}
}
function effect_in_teardown(rune) {
	if (DEV) {
		const error = new Error(`effect_in_teardown\n\`${rune}\` cannot be used inside an effect cleanup function\nhttps://svelte.dev/e/effect_in_teardown`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
	}
}
function effect_in_unowned_derived() {
	if (DEV) {
		const error = new Error(`effect_in_unowned_derived\nEffect cannot be created inside a \`$derived\` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
	}
}
function effect_orphan(rune) {
	if (DEV) {
		const error = new Error(`effect_orphan\n\`${rune}\` can only be used inside an effect (e.g. during component initialisation)\nhttps://svelte.dev/e/effect_orphan`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_orphan`);
	}
}
function effect_update_depth_exceeded() {
	if (DEV) {
		const error = new Error(`effect_update_depth_exceeded\nMaximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops\nhttps://svelte.dev/e/effect_update_depth_exceeded`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
	}
}
function hydration_failed() {
	if (DEV) {
		const error = new Error(`hydration_failed\nFailed to hydrate the application\nhttps://svelte.dev/e/hydration_failed`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/hydration_failed`);
	}
}
function props_invalid_value(key) {
	if (DEV) {
		const error = new Error(`props_invalid_value\nCannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value\nhttps://svelte.dev/e/props_invalid_value`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
	}
}
function rune_outside_svelte(rune) {
	if (DEV) {
		const error = new Error(`rune_outside_svelte\nThe \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files\nhttps://svelte.dev/e/rune_outside_svelte`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
	}
}
function state_descriptors_fixed() {
	if (DEV) {
		const error = new Error(`state_descriptors_fixed\nProperty descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.\nhttps://svelte.dev/e/state_descriptors_fixed`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
	}
}
function state_prototype_fixed() {
	if (DEV) {
		const error = new Error(`state_prototype_fixed\nCannot set prototype of \`$state\` object\nhttps://svelte.dev/e/state_prototype_fixed`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
	}
}
function state_unsafe_local_read() {
	if (DEV) {
		const error = new Error(`state_unsafe_local_read\nReading state that was created inside the same derived is forbidden. Consider using \`untrack\` to read locally created state\nhttps://svelte.dev/e/state_unsafe_local_read`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_unsafe_local_read`);
	}
}
function state_unsafe_mutation() {
	if (DEV) {
		const error = new Error(`state_unsafe_mutation\nUpdating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`\nhttps://svelte.dev/e/state_unsafe_mutation`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
}

export { bind_invalid_checkbox_value, derived_references_self, effect_in_teardown, effect_in_unowned_derived, effect_orphan, effect_update_depth_exceeded, hydration_failed, props_invalid_value, rune_outside_svelte, state_descriptors_fixed, state_prototype_fixed, state_unsafe_local_read, state_unsafe_mutation };
