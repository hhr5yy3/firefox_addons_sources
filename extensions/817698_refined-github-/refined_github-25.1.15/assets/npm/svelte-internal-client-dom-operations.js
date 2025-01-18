import { hydrating, hydrate_node, set_hydrate_node } from './svelte-internal-client-dom-hydration.js';
import DEV from './esm-env-dev-fallback.js';
import { init_array_prototype_warnings } from './svelte-internal-client-dev-equality.js';
import { get_descriptor } from './svelte-internal-shared-utils.js';

var $window;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
	if ($window !== undefined) {
		return;
	}
	$window = window;
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
	next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;
	element_prototype.__click = undefined;
	element_prototype.__className = '';
	element_prototype.__attributes = null;
	element_prototype.__styles = null;
	element_prototype.__e = undefined;
	Text.prototype.__t = undefined;
	if (DEV) {
		element_prototype.__svelte_meta = null;
		init_array_prototype_warnings();
	}
}
function create_text(value = '') {
	return document.createTextNode(value);
}
function get_first_child(node) {
	return first_child_getter.call(node);
}
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
function child(node, is_text) {
	if (!hydrating) {
		return get_first_child(node);
	}
	var child =  (get_first_child(hydrate_node));
	if (child === null) {
		child = hydrate_node.appendChild(create_text());
	} else if (is_text && child.nodeType !== 3) {
		var text = create_text();
		child?.before(text);
		set_hydrate_node(text);
		return text;
	}
	set_hydrate_node(child);
	return child;
}
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling =  (get_next_sibling(next_sibling));
	}
	if (!hydrating) {
		return next_sibling;
	}
	var type = next_sibling?.nodeType;
	if (is_text && type !== 3) {
		var text = create_text();
		if (next_sibling === null) {
			last_sibling?.after(text);
		} else {
			next_sibling.before(text);
		}
		set_hydrate_node(text);
		return text;
	}
	set_hydrate_node(next_sibling);
	return  (next_sibling);
}
function clear_text_content(node) {
	node.textContent = '';
}

export { $window, child, clear_text_content, create_text, get_first_child, get_next_sibling, init_operations, sibling };
