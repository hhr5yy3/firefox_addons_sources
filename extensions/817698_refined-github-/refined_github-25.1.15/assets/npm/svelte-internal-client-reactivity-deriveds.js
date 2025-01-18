import DEV from './esm-env-dev-fallback.js';
import { EFFECT_HAS_DERIVED, DERIVED, DIRTY, UNOWNED, MAYBE_DIRTY, CLEAN, DESTROYED } from './svelte-internal-client-constants.js';
import { active_effect, active_reaction, component_context, set_active_effect, update_reaction, set_signal_status, increment_version, remove_reactions, skip_reaction } from './svelte-internal-client-runtime.js';
import { equals } from './svelte-internal-client-reactivity-equality.js';
import { derived_references_self } from './svelte-internal-client-errors.js';
import { destroy_effect } from './svelte-internal-client-reactivity-effects.js';
import { set_inspect_effects, inspect_effects } from './svelte-internal-client-reactivity-sources.js';

function derived(fn) {
	var flags = DERIVED | DIRTY;
	if (active_effect === null) {
		flags |= UNOWNED;
	} else {
		active_effect.f |= EFFECT_HAS_DERIVED;
	}
	var parent_derived =
		active_reaction !== null && (active_reaction.f & DERIVED) !== 0
			?  (active_reaction)
			: null;
	const signal = {
		children: null,
		ctx: component_context,
		deps: null,
		equals,
		f: flags,
		fn,
		reactions: null,
		v:  (null),
		version: 0,
		parent: parent_derived ?? active_effect
	};
	if (parent_derived !== null) {
		(parent_derived.children ??= []).push(signal);
	}
	return signal;
}
function destroy_derived_children(derived) {
	var children = derived.children;
	if (children !== null) {
		derived.children = null;
		for (var i = 0; i < children.length; i += 1) {
			var child = children[i];
			if ((child.f & DERIVED) !== 0) {
				destroy_derived( (child));
			} else {
				destroy_effect( (child));
			}
		}
	}
}
let stack = [];
function get_derived_parent_effect(derived) {
	var parent = derived.parent;
	while (parent !== null) {
		if ((parent.f & DERIVED) === 0) {
			return  (parent);
		}
		parent = parent.parent;
	}
	return null;
}
function execute_derived(derived) {
	var value;
	var prev_active_effect = active_effect;
	set_active_effect(get_derived_parent_effect(derived));
	if (DEV) {
		let prev_inspect_effects = inspect_effects;
		set_inspect_effects(new Set());
		try {
			if (stack.includes(derived)) {
				derived_references_self();
			}
			stack.push(derived);
			destroy_derived_children(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
			set_inspect_effects(prev_inspect_effects);
			stack.pop();
		}
	} else {
		try {
			destroy_derived_children(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
		}
	}
	return value;
}
function update_derived(derived) {
	var value = execute_derived(derived);
	var status =
		(skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
	set_signal_status(derived, status);
	if (!derived.equals(value)) {
		derived.v = value;
		derived.version = increment_version();
	}
}
function destroy_derived(derived) {
	destroy_derived_children(derived);
	remove_reactions(derived, 0);
	set_signal_status(derived, DESTROYED);
	derived.v = derived.children = derived.deps = derived.ctx = derived.reactions = null;
}

export { derived, destroy_derived, execute_derived, update_derived };
