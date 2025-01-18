import { hydrating, hydrate_node, set_hydrate_node, hydrate_next } from './svelte-internal-client-dom-hydration.js';
import { get_first_child, create_text } from './svelte-internal-client-dom-operations.js';
import { create_fragment_from_html } from './svelte-internal-client-dom-reconciler.js';
import { active_effect } from './svelte-internal-client-runtime.js';
import { TEMPLATE_FRAGMENT, TEMPLATE_USE_IMPORT_NODE } from './svelte-constants.js';

function assign_nodes(start, end) {
	var effect =  (active_effect);
	if (effect.nodes_start === null) {
		effect.nodes_start = start;
		effect.nodes_end = end;
	}
}
function template(content, flags) {
	var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
	var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
	var node;
	var has_start = !content.startsWith('<!>');
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === undefined) {
			node = create_fragment_from_html(has_start ? content : '<!>' + content);
			if (!is_fragment) node =  (get_first_child(node));
		}
		var clone =  (
			use_import_node ? document.importNode(node, true) : node.cloneNode(true)
		);
		if (is_fragment) {
			var start =  (get_first_child(clone));
			var end =  (clone.lastChild);
			assign_nodes(start, end);
		} else {
			assign_nodes(clone, clone);
		}
		return clone;
	};
}
function text(value = '') {
	if (!hydrating) {
		var t = create_text(value + '');
		assign_nodes(t, t);
		return t;
	}
	var node = hydrate_node;
	if (node.nodeType !== 3) {
		node.before((node = create_text()));
		set_hydrate_node(node);
	}
	assign_nodes(node, node);
	return node;
}
function append(anchor, dom) {
	if (hydrating) {
		 (active_effect).nodes_end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) {
		return;
	}
	anchor.before( (dom));
}

export { append, assign_nodes, template, text };
