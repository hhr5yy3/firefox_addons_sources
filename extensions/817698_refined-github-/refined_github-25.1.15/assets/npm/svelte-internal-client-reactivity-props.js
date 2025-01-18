import './esm-env-dev-fallback.js';
import { PROPS_IS_BINDABLE } from './svelte-constants.js';
import { get_descriptor } from './svelte-internal-shared-utils.js';
import { mutable_source, set } from './svelte-internal-client-reactivity-sources.js';
import { derived } from './svelte-internal-client-reactivity-deriveds.js';
import { get, untrack, set_active_effect, active_effect } from './svelte-internal-client-runtime.js';
import { props_invalid_value } from './svelte-internal-client-errors.js';
import { BRANCH_EFFECT, ROOT_EFFECT, STATE_SYMBOL, LEGACY_PROPS } from './svelte-internal-client-constants.js';
import { legacy_mode_flag } from './svelte-internal-flags.js';
import './svelte-internal-client-dom-elements-custom-element.js';

function with_parent_branch(fn) {
	var effect = active_effect;
	var previous_effect = active_effect;
	while (effect !== null && (effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
		effect = effect.parent;
	}
	try {
		set_active_effect(effect);
		return fn();
	} finally {
		set_active_effect(previous_effect);
	}
}
function prop(props, key, flags, fallback) {
	var runes = !legacy_mode_flag;
	var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
	var is_store_sub = false;
	var prop_value;
	{
		prop_value =  (props[key]);
	}
	var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
	var setter =
		get_descriptor(props, key)?.set ??
		(is_entry_props && bindable && key in props ? (v) => (props[key] = v) : undefined);
	var fallback_value =  (fallback);
	var fallback_dirty = true;
	var fallback_used = false;
	var get_fallback = () => {
		fallback_used = true;
		if (fallback_dirty) {
			fallback_dirty = false;
			{
				fallback_value =  (fallback);
			}
		}
		return fallback_value;
	};
	if (prop_value === undefined && fallback !== undefined) {
		if (setter && runes) {
			props_invalid_value(key);
		}
		prop_value = get_fallback();
		if (setter) setter(prop_value);
	}
	var getter;
	{
		getter = () => {
			var value =  (props[key]);
			if (value === undefined) return get_fallback();
			fallback_dirty = true;
			fallback_used = false;
			return value;
		};
	}
	if (setter) {
		var legacy_parent = props.$$legacy;
		return function ( value,  mutation) {
			if (arguments.length > 0) {
				if (!mutation || legacy_parent || is_store_sub) {
					 (setter)(mutation ? getter() : value);
				}
				return value;
			} else {
				return getter();
			}
		};
	}
	var from_child = false;
	var was_from_child = false;
	var inner_current_value = mutable_source(prop_value);
	var current_value = with_parent_branch(() =>
		derived(() => {
			var parent_value = getter();
			var child_value = get(inner_current_value);
			if (from_child) {
				from_child = false;
				was_from_child = true;
				return child_value;
			}
			was_from_child = false;
			return (inner_current_value.v = parent_value);
		})
	);
	return function ( value,  mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get(current_value) : value;
			if (!current_value.equals(new_value)) {
				from_child = true;
				set(inner_current_value, new_value);
				if (fallback_used && fallback_value !== undefined) {
					fallback_value = new_value;
				}
				untrack(() => get(current_value));
			}
			return value;
		}
		return get(current_value);
	};
}

export { prop };
