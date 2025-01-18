import './esm-env-dev-fallback.js';
import './svelte-internal-client-runtime.js';

let listening_to_form_reset = false;
function add_form_reset_listener() {
	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener(
			'reset',
			(evt) => {
				Promise.resolve().then(() => {
					if (!evt.defaultPrevented) {
						for (const e of  (evt.target).elements) {
							e.__on_r?.();
						}
					}
				});
			},
			{ capture: true }
		);
	}
}

export { add_form_reset_listener };
