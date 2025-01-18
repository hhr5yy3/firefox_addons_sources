import DEV from './esm-env-dev-fallback.js';

var bold = 'font-weight: bold';
var normal = 'font-weight: normal';
function hydration_attribute_changed(attribute, html, value) {
	if (DEV) {
		console.warn(`%c[svelte] hydration_attribute_changed\n%cThe \`${attribute}\` attribute on \`${html}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value\nhttps://svelte.dev/e/hydration_attribute_changed`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
	}
}
function hydration_mismatch(location) {
	if (DEV) {
		console.warn(`%c[svelte] hydration_mismatch\n%c${"Hydration failed because the initial UI does not match what was rendered on the server"}\nhttps://svelte.dev/e/hydration_mismatch`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
	}
}
function lifecycle_double_unmount() {
	if (DEV) {
		console.warn(`%c[svelte] lifecycle_double_unmount\n%cTried to unmount a component that was not mounted\nhttps://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
	}
}
function ownership_invalid_mutation(component, owner) {
	if (DEV) {
		console.warn(`%c[svelte] ownership_invalid_mutation\n%c${component ? `${component} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}\nhttps://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
	}
}
function state_proxy_equality_mismatch(operator) {
	if (DEV) {
		console.warn(`%c[svelte] state_proxy_equality_mismatch\n%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results\nhttps://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
	} else {
		console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
	}
}

export { hydration_attribute_changed, hydration_mismatch, lifecycle_double_unmount, ownership_invalid_mutation, state_proxy_equality_mismatch };
