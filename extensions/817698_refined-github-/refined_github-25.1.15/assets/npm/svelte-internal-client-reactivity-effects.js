import { active_effect, component_context, active_reaction, dev_current_component_function, set_is_flushing_effect, update_effect, schedule_effect, remove_reactions, set_signal_status, set_active_reaction, check_dirtiness, is_destroying_effect, set_is_destroying_effect, is_flushing_effect } from './svelte-internal-client-runtime.js';
import { BRANCH_EFFECT, UNOWNED, INSPECT_EFFECT, EFFECT_RAN, EFFECT_HAS_DERIVED, DERIVED, EFFECT, RENDER_EFFECT, BLOCK_EFFECT, HEAD_EFFECT, ROOT_EFFECT, DIRTY, DESTROYED, INERT, EFFECT_TRANSPARENT } from './svelte-internal-client-constants.js';
import DEV from './esm-env-dev-fallback.js';
import { effect_orphan, effect_in_unowned_derived, effect_in_teardown } from './svelte-internal-client-errors.js';
import { define_property } from './svelte-internal-shared-utils.js';
import { get_next_sibling } from './svelte-internal-client-dom-operations.js';
import { destroy_derived } from './svelte-internal-client-reactivity-deriveds.js';

function validate_effect(rune) {
	if (active_effect === null && active_reaction === null) {
		effect_orphan(rune);
	}
	if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0) {
		effect_in_unowned_derived();
	}
	if (is_destroying_effect) {
		effect_in_teardown(rune);
	}
}
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) {
		parent_effect.last = parent_effect.first = effect;
	} else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
function create_effect(type, fn, sync, push = true) {
	var is_root = (type & ROOT_EFFECT) !== 0;
	var parent_effect = active_effect;
	if (DEV) {
		while (parent_effect !== null && (parent_effect.f & INSPECT_EFFECT) !== 0) {
			parent_effect = parent_effect.parent;
		}
	}
	var effect = {
		ctx: component_context,
		deps: null,
		deriveds: null,
		nodes_start: null,
		nodes_end: null,
		f: type | DIRTY,
		first: null,
		fn,
		last: null,
		next: null,
		parent: is_root ? null : parent_effect,
		prev: null,
		teardown: null,
		transitions: null,
		version: 0
	};
	if (DEV) {
		effect.component_function = dev_current_component_function;
	}
	if (sync) {
		var previously_flushing_effect = is_flushing_effect;
		try {
			set_is_flushing_effect(true);
			update_effect(effect);
			effect.f |= EFFECT_RAN;
		} catch (e) {
			destroy_effect(effect);
			throw e;
		} finally {
			set_is_flushing_effect(previously_flushing_effect);
		}
	} else if (fn !== null) {
		schedule_effect(effect);
	}
	var inert =
		sync &&
		effect.deps === null &&
		effect.first === null &&
		effect.nodes_start === null &&
		effect.teardown === null &&
		(effect.f & EFFECT_HAS_DERIVED) === 0;
	if (!inert && !is_root && push) {
		if (parent_effect !== null) {
			push_effect(effect, parent_effect);
		}
		if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
			var derived =  (active_reaction);
			(derived.children ??= []).push(effect);
		}
	}
	return effect;
}
function user_effect(fn) {
	validate_effect('$effect');
	var defer =
		active_effect !== null &&
		(active_effect.f & BRANCH_EFFECT) !== 0 &&
		component_context !== null &&
		!component_context.m;
	if (DEV) {
		define_property(fn, 'name', {
			value: '$effect'
		});
	}
	if (defer) {
		var context =  (component_context);
		(context.e ??= []).push({
			fn,
			effect: active_effect,
			reaction: active_reaction
		});
	} else {
		var signal = effect(fn);
		return signal;
	}
}
function effect_root(fn) {
	const effect = create_effect(ROOT_EFFECT, fn, true);
	return () => {
		destroy_effect(effect);
	};
}
function effect(fn) {
	return create_effect(EFFECT, fn, false);
}
function render_effect(fn) {
	return create_effect(RENDER_EFFECT, fn, true);
}
function template_effect(fn) {
	if (DEV) {
		define_property(fn, 'name', {
			value: '{expression}'
		});
	}
	return block(fn);
}
function block(fn, flags = 0) {
	return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
}
function branch(fn, push = true) {
	return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push);
}
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
function destroy_effect_deriveds(signal) {
	var deriveds = signal.deriveds;
	if (deriveds !== null) {
		signal.deriveds = null;
		for (var i = 0; i < deriveds.length; i += 1) {
			destroy_derived(deriveds[i]);
		}
	}
}
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		var next = effect.next;
		destroy_effect(effect, remove_dom);
		effect = next;
	}
}
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & BRANCH_EFFECT) === 0) {
			destroy_effect(effect);
		}
		effect = next;
	}
}
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect.f & HEAD_EFFECT) !== 0) && effect.nodes_start !== null) {
		var node = effect.nodes_start;
		var end = effect.nodes_end;
		while (node !== null) {
			var next = node === end ? null :  (get_next_sibling(node));
			node.remove();
			node = next;
		}
		removed = true;
	}
	destroy_effect_children(effect, remove_dom && !removed);
	destroy_effect_deriveds(effect);
	remove_reactions(effect, 0);
	set_signal_status(effect, DESTROYED);
	var transitions = effect.transitions;
	if (transitions !== null) {
		for (const transition of transitions) {
			transition.stop();
		}
	}
	execute_effect_teardown(effect);
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) {
		unlink_effect(effect);
	}
	if (DEV) {
		effect.component_function = null;
	}
	effect.next =
		effect.prev =
		effect.teardown =
		effect.ctx =
		effect.deps =
		effect.fn =
		effect.nodes_start =
		effect.nodes_end =
			null;
}
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
function pause_effect(effect, callback) {
	var transitions = [];
	pause_children(effect, transitions, true);
	run_out_transitions(transitions, () => {
		destroy_effect(effect);
		if (callback) callback();
	});
}
function run_out_transitions(transitions, fn) {
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) {
			transition.out(check);
		}
	} else {
		fn();
	}
}
function pause_children(effect, transitions, local) {
	if ((effect.f & INERT) !== 0) return;
	effect.f ^= INERT;
	if (effect.transitions !== null) {
		for (const transition of effect.transitions) {
			if (transition.is_global || local) {
				transitions.push(transition);
			}
		}
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
		pause_children(child, transitions, transparent ? local : false);
		child = sibling;
	}
}
function resume_effect(effect) {
	resume_children(effect, true);
}
function resume_children(effect, local) {
	if ((effect.f & INERT) === 0) return;
	if (check_dirtiness(effect)) {
		update_effect(effect);
	}
	effect.f ^= INERT;
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
		resume_children(child, transparent ? local : false);
		child = sibling;
	}
	if (effect.transitions !== null) {
		for (const transition of effect.transitions) {
			if (transition.is_global || local) {
				transition.in();
			}
		}
	}
}

export { block, branch, destroy_block_effect_children, destroy_effect, destroy_effect_children, destroy_effect_deriveds, effect, effect_root, execute_effect_teardown, pause_children, pause_effect, render_effect, resume_effect, run_out_transitions, template_effect, unlink_effect, user_effect, validate_effect };
