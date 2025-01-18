import DEV from './esm-env-dev-fallback.js';
import { active_reaction, derived_sources, set_derived_sources, is_runes, increment_version, active_effect, set_signal_status, check_dirtiness, update_effect, schedule_effect, new_deps, untracked_writes, set_untracked_writes, set_is_flushing_effect, is_flushing_effect } from './svelte-internal-client-runtime.js';
import { safe_equals, equals } from './svelte-internal-client-reactivity-equality.js';
import { DERIVED, BLOCK_EFFECT, CLEAN, BRANCH_EFFECT, MAYBE_DIRTY, DIRTY, INSPECT_EFFECT, UNOWNED } from './svelte-internal-client-constants.js';
import { state_unsafe_mutation } from './svelte-internal-client-errors.js';

let inspect_effects = new Set();
function set_inspect_effects(v) {
	inspect_effects = v;
}
function source(v) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		version: 0
	};
}
function state(v) {
	return push_derived_source(source(v));
}
function mutable_source(initial_value, immutable = false) {
	const s = source(initial_value);
	if (!immutable) {
		s.equals = safe_equals;
	}
	return s;
}
function push_derived_source(source) {
	if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
		if (derived_sources === null) {
			set_derived_sources([source]);
		} else {
			derived_sources.push(source);
		}
	}
	return source;
}
function set(source, value) {
	if (
		active_reaction !== null &&
		is_runes() &&
		(active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 &&
		(derived_sources === null || !derived_sources.includes(source))
	) {
		state_unsafe_mutation();
	}
	return internal_set(source, value);
}
function internal_set(source, value) {
	if (!source.equals(value)) {
		source.v = value;
		source.version = increment_version();
		mark_reactions(source, DIRTY);
		if (
			active_effect !== null &&
			(active_effect.f & CLEAN) !== 0 &&
			(active_effect.f & BRANCH_EFFECT) === 0
		) {
			if (new_deps !== null && new_deps.includes(source)) {
				set_signal_status(active_effect, DIRTY);
				schedule_effect(active_effect);
			} else {
				if (untracked_writes === null) {
					set_untracked_writes([source]);
				} else {
					untracked_writes.push(source);
				}
			}
		}
		if (DEV && inspect_effects.size > 0) {
			const inspects = Array.from(inspect_effects);
			var previously_flushing_effect = is_flushing_effect;
			set_is_flushing_effect(true);
			try {
				for (const effect of inspects) {
					if ((effect.f & CLEAN) !== 0) {
						set_signal_status(effect, MAYBE_DIRTY);
					}
					if (check_dirtiness(effect)) {
						update_effect(effect);
					}
				}
			} finally {
				set_is_flushing_effect(previously_flushing_effect);
			}
			inspect_effects.clear();
		}
	}
	return value;
}
function mark_reactions(signal, status) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if ((flags & DIRTY) !== 0) continue;
		if (DEV && (flags & INSPECT_EFFECT) !== 0) {
			inspect_effects.add(reaction);
			continue;
		}
		set_signal_status(reaction, status);
		if ((flags & (CLEAN | UNOWNED)) !== 0) {
			if ((flags & DERIVED) !== 0) {
				mark_reactions( (reaction), MAYBE_DIRTY);
			} else {
				schedule_effect( (reaction));
			}
		}
	}
}

export { inspect_effects, internal_set, mutable_source, set, set_inspect_effects, source, state };
