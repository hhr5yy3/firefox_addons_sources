import DEV from './esm-env-dev-fallback.js';
import { hydrating } from './svelte-internal-client-dom-hydration.js';
import { get_prototype_of, get_descriptors } from './svelte-internal-shared-utils.js';
import { set_active_reaction, set_active_effect, active_reaction, active_effect } from './svelte-internal-client-runtime.js';
import { LOADING_ATTR_SYMBOL } from './svelte-internal-client-constants.js';
import { hydration_attribute_changed } from './svelte-internal-client-warnings.js';
import { queue_idle_task } from './svelte-internal-client-dom-task.js';
import { add_form_reset_listener } from './svelte-internal-client-dom-elements-misc.js';

function remove_input_defaults(input) {
	if (!hydrating) return;
	var already_removed = false;
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;
		if (input.hasAttribute('value')) {
			var value = input.value;
			set_attribute(input, 'value', null);
			input.value = value;
		}
		if (input.hasAttribute('checked')) {
			var checked = input.checked;
			set_attribute(input, 'checked', null);
			input.checked = checked;
		}
	};
	input.__on_r = remove_defaults;
	queue_idle_task(remove_defaults);
	add_form_reset_listener();
}
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = (element.__attributes ??= {});
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (
			attribute === 'src' ||
			attribute === 'srcset' ||
			(attribute === 'href' && element.nodeName === 'LINK')
		) {
			{
				check_src_in_dev_hydration(element, attribute, value ?? '');
			}
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === 'style' && '__styles' in element) {
		element.__styles = {};
	}
	if (attribute === 'loading') {
		element[LOADING_ATTR_SYMBOL] = value;
	}
	if (value == null) {
		element.removeAttribute(attribute);
	} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
		element[attribute] = value;
	} else {
		element.setAttribute(attribute, value);
	}
}
function set_custom_element_data(node, prop, value) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		if (get_setters(node).includes(prop)) {
			node[prop] = value;
		} else {
			set_attribute(node, prop, value);
		}
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
var setters_cache = new Map();
function get_setters(element) {
	var setters = setters_cache.get(element.nodeName);
	if (setters) return setters;
	setters_cache.set(element.nodeName, (setters = []));
	var descriptors;
	var proto = get_prototype_of(element);
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key in descriptors) {
			if (descriptors[key].set) {
				setters.push(key);
			}
		}
		proto = get_prototype_of(proto);
	}
	return setters;
}
function check_src_in_dev_hydration(element, attribute, value) {
	if (!DEV) return;
	if (attribute === 'srcset' && srcset_url_equal(element, value)) return;
	if (src_url_equal(element.getAttribute(attribute) ?? '', value)) return;
	hydration_attribute_changed(
		attribute,
		element.outerHTML.replace(element.innerHTML, element.innerHTML && '...'),
		String(value)
	);
}
function src_url_equal(element_src, url) {
	if (element_src === url) return true;
	return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}
function split_srcset(srcset) {
	return srcset.split(',').map((src) => src.trim().split(' ').filter(Boolean));
}
function srcset_url_equal(element, srcset) {
	var element_urls = split_srcset(element.srcset);
	var urls = split_srcset(srcset);
	return (
		urls.length === element_urls.length &&
		urls.every(
			([url, width], i) =>
				width === element_urls[i][1] &&
				(src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
		)
	);
}

export { remove_input_defaults, set_attribute, set_custom_element_data };
