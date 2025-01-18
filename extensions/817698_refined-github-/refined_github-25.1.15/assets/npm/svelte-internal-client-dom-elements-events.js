import { set_active_reaction, set_active_effect, active_reaction, active_effect } from './svelte-internal-client-runtime.js';
import './esm-env-dev-fallback.js';
import { define_property, is_array } from './svelte-internal-shared-utils.js';

const all_registered_events = new Set();
const root_event_handles = new Set();
function delegate(events) {
	for (var i = 0; i < events.length; i++) {
		all_registered_events.add(events[i]);
	}
	for (var fn of root_event_handles) {
		fn(events);
	}
}
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document =  (handler_element).ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target =  (path[0] || event.target);
	var path_idx = 0;
	var handled_at = event.__root;
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (
			at_idx !== -1 &&
			(handler_element === document || handler_element ===  (window))
		) {
			event.__root = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) {
			return;
		}
		if (at_idx <= handler_idx) {
			path_idx = at_idx;
		}
	}
	current_target =  (path[path_idx] || event.target);
	if (current_target === handler_element) return;
	define_property(event, 'currentTarget', {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		var throw_error;
		var other_errors = [];
		while (current_target !== null) {
			var parent_element =
				current_target.assignedSlot ||
				current_target.parentNode ||
				 (current_target).host ||
				null;
			try {
				var delegated = current_target['__' + event_name];
				if (delegated !== undefined && !( (current_target).disabled)) {
					if (is_array(delegated)) {
						var [fn, ...data] = delegated;
						fn.apply(current_target, [event, ...data]);
					} else {
						delegated.call(current_target, event);
					}
				}
			} catch (error) {
				if (throw_error) {
					other_errors.push(error);
				} else {
					throw_error = error;
				}
			}
			if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
				break;
			}
			current_target = parent_element;
		}
		if (throw_error) {
			for (let error of other_errors) {
				queueMicrotask(() => {
					throw error;
				});
			}
			throw throw_error;
		}
	} finally {
		event.__root = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}

export { all_registered_events, delegate, handle_event_propagation, root_event_handles };
