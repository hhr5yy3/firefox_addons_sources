import DEV from './esm-env-dev-fallback.js';
import { define_property } from './svelte-internal-shared-utils.js';
import { effect, destroy_block_effect_children, destroy_effect_children, destroy_effect_deriveds, execute_effect_teardown, unlink_effect } from './svelte-internal-client-reactivity-effects.js';
import { DIRTY, MAYBE_DIRTY, DISCONNECTED, DESTROYED, BLOCK_EFFECT, ROOT_EFFECT, BRANCH_EFFECT, CLEAN, DERIVED, UNOWNED, INERT, RENDER_EFFECT, BOUNDARY_EFFECT, EFFECT } from './svelte-internal-client-constants.js';
import { flush_tasks } from './svelte-internal-client-dom-task.js';
import { FILENAME } from './svelte-constants.js';
import { rune_outside_svelte, state_unsafe_local_read, effect_update_depth_exceeded } from './svelte-internal-client-errors.js';
import { legacy_mode_flag } from './svelte-internal-flags.js';
import { update_derived, execute_derived, destroy_derived } from './svelte-internal-client-reactivity-deriveds.js';

const FLUSH_MICROTASK = 0;
const FLUSH_SYNC = 1;
const handled_errors = new WeakSet();
let is_throwing_error = false;
let scheduler_mode = FLUSH_MICROTASK;
let is_micro_task_queued = false;
let last_scheduled_effect = null;
let is_flushing_effect = false;
let is_destroying_effect = false;
function set_is_flushing_effect(value) {
	is_flushing_effect = value;
}
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
let queued_root_effects = [];
let flush_count = 0;
let dev_effect_stack = [];
let active_reaction = null;
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect) {
	active_effect = effect;
}
let derived_sources = null;
function set_derived_sources(sources) {
	derived_sources = sources;
}
let new_deps = null;
let skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
	untracked_writes = value;
}
let current_version = 0;
let skip_reaction = false;
let component_context = null;
let dev_current_component_function = null;
function increment_version() {
	return ++current_version;
}
function is_runes() {
	return !legacy_mode_flag;
}
function check_dirtiness(reaction) {
	var flags = reaction.f;
	if ((flags & DIRTY) !== 0) {
		return true;
	}
	if ((flags & MAYBE_DIRTY) !== 0) {
		var dependencies = reaction.deps;
		var is_unowned = (flags & UNOWNED) !== 0;
		if (dependencies !== null) {
			var i;
			if ((flags & DISCONNECTED) !== 0) {
				for (i = 0; i < dependencies.length; i++) {
					(dependencies[i].reactions ??= []).push(reaction);
				}
				reaction.f ^= DISCONNECTED;
			}
			for (i = 0; i < dependencies.length; i++) {
				var dependency = dependencies[i];
				if (check_dirtiness( (dependency))) {
					update_derived( (dependency));
				}
				if (
					is_unowned &&
					active_effect !== null &&
					!skip_reaction &&
					!dependency?.reactions?.includes(reaction)
				) {
					(dependency.reactions ??= []).push(reaction);
				}
				if (dependency.version > reaction.version) {
					return true;
				}
			}
		}
		if (!is_unowned) {
			set_signal_status(reaction, CLEAN);
		}
	}
	return false;
}
function propagate_error(error, effect) {
	var current = effect;
	while (current !== null) {
		if ((current.f & BOUNDARY_EFFECT) !== 0) {
			try {
				current.fn(error);
				return;
			} catch {
				current.f ^= BOUNDARY_EFFECT;
			}
		}
		current = current.parent;
	}
	is_throwing_error = false;
	throw error;
}
function should_rethrow_error(effect) {
	return (
		(effect.f & DESTROYED) === 0 &&
		(effect.parent === null || (effect.parent.f & BOUNDARY_EFFECT) === 0)
	);
}
function handle_error(error, effect, previous_effect, component_context) {
	if (is_throwing_error) {
		if (previous_effect === null) {
			is_throwing_error = false;
		}
		if (should_rethrow_error(effect)) {
			throw error;
		}
		return;
	}
	if (previous_effect !== null) {
		is_throwing_error = true;
	}
	if (
		!DEV ||
		component_context === null ||
		!(error instanceof Error) ||
		handled_errors.has(error)
	) {
		propagate_error(error, effect);
		return;
	}
	handled_errors.add(error);
	const component_stack = [];
	const effect_name = effect.fn?.name;
	if (effect_name) {
		component_stack.push(effect_name);
	}
	let current_context = component_context;
	while (current_context !== null) {
		if (DEV) {
			var filename = current_context.function?.[FILENAME];
			if (filename) {
				const file = filename.split('/').pop();
				component_stack.push(file);
			}
		}
		current_context = current_context.p;
	}
	const indent = /Firefox/.test(navigator.userAgent) ? '  ' : '\t';
	define_property(error, 'message', {
		value: error.message + `\n${component_stack.map((name) => `\n${indent}in ${name}`).join('')}\n`
	});
	define_property(error, 'component_stack', {
		value: component_stack
	});
	const stack = error.stack;
	if (stack) {
		const lines = stack.split('\n');
		const new_lines = [];
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			if (line.includes('svelte/src/internal')) {
				continue;
			}
			new_lines.push(line);
		}
		define_property(error, 'stack', {
			value: error.stack + new_lines.join('\n')
		});
	}
	propagate_error(error, effect);
	if (should_rethrow_error(effect)) {
		throw error;
	}
}
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_skip_reaction = skip_reaction;
	var prev_derived_sources = derived_sources;
	var previous_component_context = component_context;
	var flags = reaction.f;
	new_deps =  (null);
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
	skip_reaction = !is_flushing_effect && (flags & UNOWNED) !== 0;
	derived_sources = null;
	component_context = reaction.ctx;
	try {
		var result =  (0, reaction.fn)();
		var deps = reaction.deps;
		if (new_deps !== null) {
			var i;
			remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) {
					deps[skipped_deps + i] = new_deps[i];
				}
			} else {
				reaction.deps = deps = new_deps;
			}
			if (!skip_reaction) {
				for (i = skipped_deps; i < deps.length; i++) {
					(deps[i].reactions ??= []).push(reaction);
				}
			}
		} else if (deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		return result;
	} finally {
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		skip_reaction = previous_skip_reaction;
		derived_sources = prev_derived_sources;
		component_context = previous_component_context;
	}
}
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = reactions.indexOf(signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) {
				reactions = dependency.reactions = null;
			} else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (
		reactions === null &&
		(dependency.f & DERIVED) !== 0 &&
		(new_deps === null || !new_deps.includes(dependency))
	) {
		set_signal_status(dependency, MAYBE_DIRTY);
		if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
			dependency.f ^= DISCONNECTED;
		}
		remove_reactions( (dependency), 0);
	}
}
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) {
		remove_reaction(signal, dependencies[i]);
	}
}
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & DESTROYED) !== 0) {
		return;
	}
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	var previous_component_context = component_context;
	active_effect = effect;
	if (DEV) {
		var previous_component_fn = dev_current_component_function;
		dev_current_component_function = effect.component_function;
	}
	try {
		if ((flags & BLOCK_EFFECT) !== 0) {
			destroy_block_effect_children(effect);
		} else {
			destroy_effect_children(effect);
		}
		destroy_effect_deriveds(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === 'function' ? teardown : null;
		effect.version = current_version;
		if (DEV) {
			dev_effect_stack.push(effect);
		}
	} catch (error) {
		handle_error(error, effect, previous_effect, previous_component_context || effect.ctx);
	} finally {
		active_effect = previous_effect;
		if (DEV) {
			dev_current_component_function = previous_component_fn;
		}
	}
}
function log_effect_stack() {
	console.error(
		'Last ten effects were: ',
		dev_effect_stack.slice(-10).map((d) => d.fn)
	);
	dev_effect_stack = [];
}
function infinite_loop_guard() {
	if (flush_count > 1000) {
		flush_count = 0;
		try {
			effect_update_depth_exceeded();
		} catch (error) {
			if (DEV) {
				define_property(error, 'stack', {
					value: ''
				});
			}
			if (last_scheduled_effect !== null) {
				if (DEV) {
					try {
						handle_error(error, last_scheduled_effect, null, null);
					} catch (e) {
						log_effect_stack();
						throw e;
					}
				} else {
					handle_error(error, last_scheduled_effect, null, null);
				}
			} else {
				if (DEV) {
					log_effect_stack();
				}
				throw error;
			}
		}
	}
	flush_count++;
}
function flush_queued_root_effects(root_effects) {
	var length = root_effects.length;
	if (length === 0) {
		return;
	}
	infinite_loop_guard();
	var previously_flushing_effect = is_flushing_effect;
	is_flushing_effect = true;
	try {
		for (var i = 0; i < length; i++) {
			var effect = root_effects[i];
			if ((effect.f & CLEAN) === 0) {
				effect.f ^= CLEAN;
			}
			var collected_effects = [];
			process_effects(effect, collected_effects);
			flush_queued_effects(collected_effects);
		}
	} finally {
		is_flushing_effect = previously_flushing_effect;
	}
}
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	for (var i = 0; i < length; i++) {
		var effect = effects[i];
		if ((effect.f & (DESTROYED | INERT)) === 0) {
			try {
				if (check_dirtiness(effect)) {
					update_effect(effect);
					if (effect.deps === null && effect.first === null && effect.nodes_start === null) {
						if (effect.teardown === null) {
							unlink_effect(effect);
						} else {
							effect.fn = null;
						}
					}
				}
			} catch (error) {
				handle_error(error, effect, null, effect.ctx);
			}
		}
	}
}
function process_deferred() {
	is_micro_task_queued = false;
	if (flush_count > 1001) {
		return;
	}
	const previous_queued_root_effects = queued_root_effects;
	queued_root_effects = [];
	flush_queued_root_effects(previous_queued_root_effects);
	if (!is_micro_task_queued) {
		flush_count = 0;
		last_scheduled_effect = null;
		if (DEV) {
			dev_effect_stack = [];
		}
	}
}
function schedule_effect(signal) {
	if (scheduler_mode === FLUSH_MICROTASK) {
		if (!is_micro_task_queued) {
			is_micro_task_queued = true;
			queueMicrotask(process_deferred);
		}
	}
	last_scheduled_effect = signal;
	var effect = signal;
	while (effect.parent !== null) {
		effect = effect.parent;
		var flags = effect.f;
		if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
			if ((flags & CLEAN) === 0) return;
			effect.f ^= CLEAN;
		}
	}
	queued_root_effects.push(effect);
}
function process_effects(effect, collected_effects) {
	var current_effect = effect.first;
	var effects = [];
	main_loop: while (current_effect !== null) {
		var flags = current_effect.f;
		var is_branch = (flags & BRANCH_EFFECT) !== 0;
		var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
		var sibling = current_effect.next;
		if (!is_skippable_branch && (flags & INERT) === 0) {
			if ((flags & RENDER_EFFECT) !== 0) {
				if (is_branch) {
					current_effect.f ^= CLEAN;
				} else {
					try {
						if (check_dirtiness(current_effect)) {
							update_effect(current_effect);
						}
					} catch (error) {
						handle_error(error, current_effect, null, current_effect.ctx);
					}
				}
				var child = current_effect.first;
				if (child !== null) {
					current_effect = child;
					continue;
				}
			} else if ((flags & EFFECT) !== 0) {
				effects.push(current_effect);
			}
		}
		if (sibling === null) {
			let parent = current_effect.parent;
			while (parent !== null) {
				if (effect === parent) {
					break main_loop;
				}
				var parent_sibling = parent.next;
				if (parent_sibling !== null) {
					current_effect = parent_sibling;
					continue main_loop;
				}
				parent = parent.parent;
			}
		}
		current_effect = sibling;
	}
	for (var i = 0; i < effects.length; i++) {
		child = effects[i];
		collected_effects.push(child);
		process_effects(child, collected_effects);
	}
}
function flush_sync(fn) {
	var previous_scheduler_mode = scheduler_mode;
	var previous_queued_root_effects = queued_root_effects;
	try {
		infinite_loop_guard();
		const root_effects = [];
		scheduler_mode = FLUSH_SYNC;
		queued_root_effects = root_effects;
		is_micro_task_queued = false;
		flush_queued_root_effects(previous_queued_root_effects);
		var result = fn?.();
		flush_tasks();
		if (queued_root_effects.length > 0 || root_effects.length > 0) {
			flush_sync();
		}
		flush_count = 0;
		last_scheduled_effect = null;
		if (DEV) {
			dev_effect_stack = [];
		}
		return result;
	} finally {
		scheduler_mode = previous_scheduler_mode;
		queued_root_effects = previous_queued_root_effects;
	}
}
function get(signal) {
	var flags = signal.f;
	var is_derived = (flags & DERIVED) !== 0;
	if (is_derived && (flags & DESTROYED) !== 0) {
		var value = execute_derived( (signal));
		destroy_derived( (signal));
		return value;
	}
	if (active_reaction !== null) {
		if (derived_sources !== null && derived_sources.includes(signal)) {
			state_unsafe_local_read();
		}
		var deps = active_reaction.deps;
		if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
			skipped_deps++;
		} else if (new_deps === null) {
			new_deps = [signal];
		} else {
			new_deps.push(signal);
		}
		if (
			untracked_writes !== null &&
			active_effect !== null &&
			(active_effect.f & CLEAN) !== 0 &&
			(active_effect.f & BRANCH_EFFECT) === 0 &&
			untracked_writes.includes(signal)
		) {
			set_signal_status(active_effect, DIRTY);
			schedule_effect(active_effect);
		}
	} else if (is_derived &&  (signal).deps === null) {
		var derived =  (signal);
		var parent = derived.parent;
		var target = derived;
		while (parent !== null) {
			if ((parent.f & DERIVED) !== 0) {
				var parent_derived =  (parent);
				target = parent_derived;
				parent = parent_derived.parent;
			} else {
				var parent_effect =  (parent);
				if (!parent_effect.deriveds?.includes(target)) {
					(parent_effect.deriveds ??= []).push(target);
				}
				break;
			}
		}
	}
	if (is_derived) {
		derived =  (signal);
		if (check_dirtiness(derived)) {
			update_derived(derived);
		}
	}
	return signal.v;
}
function untrack(fn) {
	const previous_reaction = active_reaction;
	try {
		active_reaction = null;
		return fn();
	} finally {
		active_reaction = previous_reaction;
	}
}
const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
	signal.f = (signal.f & STATUS_MASK) | status;
}
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		c: null,
		e: null,
		m: false,
		s: props,
		x: null,
		l: null
	};
	if (DEV) {
		component_context.function = fn;
		dev_current_component_function = fn;
	}
}
function pop(component) {
	const context_stack_item = component_context;
	if (context_stack_item !== null) {
		if (component !== undefined) {
			context_stack_item.x = component;
		}
		const component_effects = context_stack_item.e;
		if (component_effects !== null) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			context_stack_item.e = null;
			try {
				for (var i = 0; i < component_effects.length; i++) {
					var component_effect = component_effects[i];
					set_active_effect(component_effect.effect);
					set_active_reaction(component_effect.reaction);
					effect(component_effect.fn);
				}
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
			}
		}
		component_context = context_stack_item.p;
		if (DEV) {
			dev_current_component_function = context_stack_item.p?.function ?? null;
		}
		context_stack_item.m = true;
	}
	return component ||  ({});
}
if (DEV) {
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			let value;
			Object.defineProperty(globalThis, rune, {
				configurable: true,
				get: () => {
					if (value !== undefined) {
						return value;
					}
					rune_outside_svelte(rune);
				},
				set: (v) => {
					value = v;
				}
			});
		}
	}
	throw_rune_error('$state');
	throw_rune_error('$effect');
	throw_rune_error('$derived');
	throw_rune_error('$inspect');
	throw_rune_error('$props');
	throw_rune_error('$bindable');
}

export { active_effect, active_reaction, check_dirtiness, component_context, derived_sources, dev_current_component_function, flush_sync, get, handle_error, increment_version, is_destroying_effect, is_flushing_effect, is_runes, is_throwing_error, new_deps, pop, push, remove_reactions, schedule_effect, set_active_effect, set_active_reaction, set_derived_sources, set_is_destroying_effect, set_is_flushing_effect, set_signal_status, set_untracked_writes, skip_reaction, untrack, untracked_writes, update_effect, update_reaction };
