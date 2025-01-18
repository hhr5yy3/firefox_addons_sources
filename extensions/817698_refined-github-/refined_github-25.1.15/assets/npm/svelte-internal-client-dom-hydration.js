import { HYDRATION_ERROR, HYDRATION_END, HYDRATION_START, HYDRATION_START_ELSE } from './svelte-constants.js';
import { hydration_mismatch } from './svelte-internal-client-warnings.js';
import { get_next_sibling } from './svelte-internal-client-dom-operations.js';

let hydrating = false;
function set_hydrating(value) {
	hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return (hydrate_node = node);
}
function hydrate_next() {
	return set_hydrate_node( (get_next_sibling(hydrate_node)));
}
function reset(node) {
	if (!hydrating) return;
	if (get_next_sibling(hydrate_node) !== null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	hydrate_node = node;
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) {
			node =  (get_next_sibling(node));
		}
		hydrate_node = node;
	}
}
function remove_nodes() {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data =  (node).data;
			if (data === HYDRATION_END) {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
				depth += 1;
			}
		}
		var next =  (get_next_sibling(node));
		node.remove();
		node = next;
	}
}

export { hydrate_next, hydrate_node, hydrating, next, remove_nodes, reset, set_hydrate_node, set_hydrating };
