import DEV from './esm-env-dev-fallback.js';

function lifecycle_outside_component(name) {
	if (DEV) {
		const error = new Error(`lifecycle_outside_component\n\`${name}(...)\` can only be used during component initialisation\nhttps://svelte.dev/e/lifecycle_outside_component`);
		error.name = 'Svelte error';
		throw error;
	} else {
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
	}
}

export { lifecycle_outside_component };
