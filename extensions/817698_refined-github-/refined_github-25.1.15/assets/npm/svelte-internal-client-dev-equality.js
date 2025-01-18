import { state_proxy_equality_mismatch } from './svelte-internal-client-warnings.js';
import { get_proxied_value } from './svelte-internal-client-proxy.js';

function init_array_prototype_warnings() {
	const array_prototype = Array.prototype;
	const cleanup = Array.__svelte_cleanup;
	if (cleanup) {
		cleanup();
	}
	const { indexOf, lastIndexOf, includes } = array_prototype;
	array_prototype.indexOf = function (item, from_index) {
		const index = indexOf.call(this, item, from_index);
		if (index === -1) {
			const test = indexOf.call(get_proxied_value(this), get_proxied_value(item), from_index);
			if (test !== -1) {
				state_proxy_equality_mismatch('array.indexOf(...)');
			}
		}
		return index;
	};
	array_prototype.lastIndexOf = function (item, from_index) {
		const index = lastIndexOf.call(this, item, from_index ?? this.length - 1);
		if (index === -1) {
			const test = lastIndexOf.call(
				get_proxied_value(this),
				get_proxied_value(item),
				from_index ?? this.length - 1
			);
			if (test !== -1) {
				state_proxy_equality_mismatch('array.lastIndexOf(...)');
			}
		}
		return index;
	};
	array_prototype.includes = function (item, from_index) {
		const has = includes.call(this, item, from_index);
		if (!has) {
			const test = includes.call(get_proxied_value(this), get_proxied_value(item), from_index);
			if (test) {
				state_proxy_equality_mismatch('array.includes(...)');
			}
		}
		return has;
	};
	Array.__svelte_cleanup = () => {
		array_prototype.indexOf = indexOf;
		array_prototype.lastIndexOf = lastIndexOf;
		array_prototype.includes = includes;
	};
}

export { init_array_prototype_warnings };
