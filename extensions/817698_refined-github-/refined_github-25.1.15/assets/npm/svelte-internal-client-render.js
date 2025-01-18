import DEV from './esm-env-dev-fallback.js';
import { init_operations, get_first_child, get_next_sibling, clear_text_content, create_text } from './svelte-internal-client-dom-operations.js';
import { HYDRATION_START, HYDRATION_ERROR, HYDRATION_END } from './svelte-constants.js';
import { push, active_effect, pop, component_context } from './svelte-internal-client-runtime.js';
import { effect_root, branch } from './svelte-internal-client-reactivity-effects.js';
import { set_hydrating, set_hydrate_node, hydrate_next, hydrate_node, hydrating } from './svelte-internal-client-dom-hydration.js';
import { array_from } from './svelte-internal-shared-utils.js';
import { all_registered_events, root_event_handles, handle_event_propagation } from './svelte-internal-client-dom-elements-events.js';
import { hydration_mismatch, lifecycle_double_unmount } from './svelte-internal-client-warnings.js';
import { hydration_failed } from './svelte-internal-client-errors.js';
import { assign_nodes } from './svelte-internal-client-dom-template.js';
import { is_passive_event } from './svelte-utils.js';

function set_text(text, value) {
	var str = value == null ? '' : typeof value === 'object' ? value + '' : value;
	if (str !== (text.__t ??= text.nodeValue)) {
		text.__t = str;
		text.nodeValue = str == null ? '' : str + '';
	}
}
function mount(component, options) {
	return _mount(component, options);
}
function hydrate(component, options) {
	init_operations();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor =  (get_first_child(target));
		while (
			anchor &&
			(anchor.nodeType !== 8 ||  (anchor).data !== HYDRATION_START)
		) {
			anchor =  (get_next_sibling(anchor));
		}
		if (!anchor) {
			throw HYDRATION_ERROR;
		}
		set_hydrating(true);
		set_hydrate_node( (anchor));
		hydrate_next();
		const instance = _mount(component, { ...options, anchor });
		if (
			hydrate_node === null ||
			hydrate_node.nodeType !== 8 ||
			 (hydrate_node).data !== HYDRATION_END
		) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		set_hydrating(false);
		return  (instance);
	} catch (error) {
		if (error === HYDRATION_ERROR) {
			if (options.recover === false) {
				hydration_failed();
			}
			init_operations();
			clear_text_content(target);
			set_hydrating(false);
			return mount(component, options);
		}
		throw error;
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
const document_listeners = new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
	init_operations();
	var registered_events = new Set();
	var event_handle = (events) => {
		for (var i = 0; i < events.length; i++) {
			var event_name = events[i];
			if (registered_events.has(event_name)) continue;
			registered_events.add(event_name);
			var passive = is_passive_event(event_name);
			target.addEventListener(event_name, handle_event_propagation, { passive });
			var n = document_listeners.get(event_name);
			if (n === undefined) {
				document.addEventListener(event_name, handle_event_propagation, { passive });
				document_listeners.set(event_name, 1);
			} else {
				document_listeners.set(event_name, n + 1);
			}
		}
	};
	event_handle(array_from(all_registered_events));
	root_event_handles.add(event_handle);
	var component = undefined;
	var unmount = effect_root(() => {
		var anchor_node = anchor ?? target.appendChild(create_text());
		branch(() => {
			if (context) {
				push({});
				var ctx =  (component_context);
				ctx.c = context;
			}
			if (events) {
				 (props).$$events = events;
			}
			if (hydrating) {
				assign_nodes( (anchor_node), null);
			}
			component = Component(anchor_node, props) || {};
			if (hydrating) {
				 (active_effect).nodes_end = hydrate_node;
			}
			if (context) {
				pop();
			}
		});
		return () => {
			for (var event_name of registered_events) {
				target.removeEventListener(event_name, handle_event_propagation);
				var n =  (document_listeners.get(event_name));
				if (--n === 0) {
					document.removeEventListener(event_name, handle_event_propagation);
					document_listeners.delete(event_name);
				} else {
					document_listeners.set(event_name, n);
				}
			}
			root_event_handles.delete(event_handle);
			mounted_components.delete(component);
			if (anchor_node !== anchor) {
				anchor_node.parentNode?.removeChild(anchor_node);
			}
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
let mounted_components = new WeakMap();
function unmount(component) {
	const fn = mounted_components.get(component);
	if (fn) {
		fn();
	} else if (DEV) {
		lifecycle_double_unmount();
	}
}

export { hydrate, mount, set_text, unmount };
