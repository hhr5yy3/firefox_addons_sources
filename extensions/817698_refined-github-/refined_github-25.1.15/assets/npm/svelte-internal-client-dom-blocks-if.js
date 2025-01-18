import { EFFECT_TRANSPARENT } from './svelte-internal-client-constants.js';
import { hydrating, hydrate_next, remove_nodes, set_hydrate_node, set_hydrating, hydrate_node } from './svelte-internal-client-dom-hydration.js';
import { block, resume_effect, branch, pause_effect } from './svelte-internal-client-reactivity-effects.js';
import { UNINITIALIZED, HYDRATION_START_ELSE } from './svelte-constants.js';

function if_block(node, fn, elseif = false) {
	if (hydrating) {
		hydrate_next();
	}
	var anchor = node;
	var consequent_effect = null;
	var alternate_effect = null;
	var condition = UNINITIALIZED;
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	var has_branch = false;
	const set_branch = ( fn, flag = true) => {
		has_branch = true;
		update_branch(flag, fn);
	};
	const update_branch = (
		 new_condition,
		 fn
	) => {
		if (condition === (condition = new_condition)) return;
		let mismatch = false;
		if (hydrating) {
			const is_else =  (anchor).data === HYDRATION_START_ELSE;
			if (!!condition === is_else) {
				anchor = remove_nodes();
				set_hydrate_node(anchor);
				set_hydrating(false);
				mismatch = true;
			}
		}
		if (condition) {
			if (consequent_effect) {
				resume_effect(consequent_effect);
			} else if (fn) {
				consequent_effect = branch(() => fn(anchor));
			}
			if (alternate_effect) {
				pause_effect(alternate_effect, () => {
					alternate_effect = null;
				});
			}
		} else {
			if (alternate_effect) {
				resume_effect(alternate_effect);
			} else if (fn) {
				alternate_effect = branch(() => fn(anchor));
			}
			if (consequent_effect) {
				pause_effect(consequent_effect, () => {
					consequent_effect = null;
				});
			}
		}
		if (mismatch) {
			set_hydrating(true);
		}
	};
	block(() => {
		has_branch = false;
		fn(set_branch);
		if (!has_branch) {
			update_branch(null, null);
		}
	}, flags);
	if (hydrating) {
		anchor = hydrate_node;
	}
}

export { if_block };
