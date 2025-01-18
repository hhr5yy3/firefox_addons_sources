import DEV from './esm-env-dev-fallback.js';
import { component_context, get, active_effect } from './svelte-internal-client-runtime.js';
import { object_prototype, array_prototype, get_descriptor, get_prototype_of, is_array } from './svelte-internal-shared-utils.js';
import { widen_ownership, check_ownership } from './svelte-internal-client-dev-ownership.js';
import { source, set } from './svelte-internal-client-reactivity-sources.js';
import { STATE_SYMBOL, STATE_SYMBOL_METADATA } from './svelte-internal-client-constants.js';
import { UNINITIALIZED } from './svelte-constants.js';
import { state_descriptors_fixed, state_prototype_fixed } from './svelte-internal-client-errors.js';

function proxy(value, parent = null, prev) {
	if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
		return value;
	}
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) {
		return value;
	}
	var sources = new Map();
	var is_proxied_array = is_array(value);
	var version = source(0);
	if (is_proxied_array) {
		sources.set('length', source( (value).length));
	}
	var metadata;
	if (DEV) {
		metadata = {
			parent,
			owners: null
		};
		{
			metadata.owners =
				parent === null
					? component_context !== null
						? new Set([component_context.function])
						: null
					: new Set();
		}
	}
	return new Proxy( (value), {
		defineProperty(_, prop, descriptor) {
			if (
				!('value' in descriptor) ||
				descriptor.configurable === false ||
				descriptor.enumerable === false ||
				descriptor.writable === false
			) {
				state_descriptors_fixed();
			}
			var s = sources.get(prop);
			if (s === undefined) {
				s = source(descriptor.value);
				sources.set(prop, s);
			} else {
				set(s, proxy(descriptor.value, metadata));
			}
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === undefined) {
				if (prop in target) {
					sources.set(prop, source(UNINITIALIZED));
				}
			} else {
				if (is_proxied_array && typeof prop === 'string') {
					var ls =  (sources.get('length'));
					var n = Number(prop);
					if (Number.isInteger(n) && n < ls.v) {
						set(ls, n);
					}
				}
				set(s, UNINITIALIZED);
				update_version(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			if (DEV && prop === STATE_SYMBOL_METADATA) {
				return metadata;
			}
			if (prop === STATE_SYMBOL) {
				return value;
			}
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === undefined && (!exists || get_descriptor(target, prop)?.writable)) {
				s = source(proxy(exists ? target[prop] : UNINITIALIZED, metadata));
				sources.set(prop, s);
			}
			if (s !== undefined) {
				var v = get(s);
				if (DEV) {
					var prop_metadata = v?.[STATE_SYMBOL_METADATA];
					if (prop_metadata && prop_metadata?.parent !== metadata) {
						widen_ownership(metadata, prop_metadata);
					}
				}
				return v === UNINITIALIZED ? undefined : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor && 'value' in descriptor) {
				var s = sources.get(prop);
				if (s) descriptor.value = get(s);
			} else if (descriptor === undefined) {
				var source = sources.get(prop);
				var value = source?.v;
				if (source !== undefined && value !== UNINITIALIZED) {
					return {
						enumerable: true,
						configurable: true,
						value,
						writable: true
					};
				}
			}
			return descriptor;
		},
		has(target, prop) {
			if (DEV && prop === STATE_SYMBOL_METADATA) {
				return true;
			}
			if (prop === STATE_SYMBOL) {
				return true;
			}
			var s = sources.get(prop);
			var has = (s !== undefined && s.v !== UNINITIALIZED) || Reflect.has(target, prop);
			if (
				s !== undefined ||
				(active_effect !== null && (!has || get_descriptor(target, prop)?.writable))
			) {
				if (s === undefined) {
					s = source(has ? proxy(target[prop], metadata) : UNINITIALIZED);
					sources.set(prop, s);
				}
				var value = get(s);
				if (value === UNINITIALIZED) {
					return false;
				}
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === 'length') {
				for (var i = value; i <  (s).v; i += 1) {
					var other_s = sources.get(i + '');
					if (other_s !== undefined) {
						set(other_s, UNINITIALIZED);
					} else if (i in target) {
						other_s = source(UNINITIALIZED);
						sources.set(i + '', other_s);
					}
				}
			}
			if (s === undefined) {
				if (!has || get_descriptor(target, prop)?.writable) {
					s = source(undefined);
					set(s, proxy(value, metadata));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				set(s, proxy(value, metadata));
			}
			if (DEV) {
				var prop_metadata = value?.[STATE_SYMBOL_METADATA];
				if (prop_metadata && prop_metadata?.parent !== metadata) {
					widen_ownership(metadata, prop_metadata);
				}
				check_ownership(metadata);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor?.set) {
				descriptor.set.call(receiver, value);
			}
			if (!has) {
				if (is_proxied_array && typeof prop === 'string') {
					var ls =  (sources.get('length'));
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) {
						set(ls, n + 1);
					}
				}
				update_version(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === undefined || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) {
				if (source.v !== UNINITIALIZED && !(key in target)) {
					own_keys.push(key);
				}
			}
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
function update_version(signal, d = 1) {
	set(signal, signal.v + d);
}
function get_proxied_value(value) {
	if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
		return value[STATE_SYMBOL];
	}
	return value;
}

export { get_proxied_value, proxy };
