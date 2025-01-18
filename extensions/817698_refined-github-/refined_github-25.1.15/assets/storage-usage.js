import './npm/svelte-internal-disclose-version.js';
import './npm/esm-env-dev-fallback.js';
import { push, pop, get, flush_sync } from './npm/svelte-internal-client-runtime.js';
import { reset } from './npm/svelte-internal-client-dom-hydration.js';
import { user_effect, template_effect } from './npm/svelte-internal-client-reactivity-effects.js';
import { state, set } from './npm/svelte-internal-client-reactivity-sources.js';
import { set_text } from './npm/svelte-internal-client-render.js';
import { child } from './npm/svelte-internal-client-dom-operations.js';
import { template, append } from './npm/svelte-internal-client-dom-template.js';
import { proxy } from './npm/svelte-internal-client-proxy.js';
import { derived } from './npm/svelte-internal-client-reactivity-deriveds.js';
import { prop } from './npm/svelte-internal-client-reactivity-props.js';
import { onMount } from './npm/svelte-index-client.js';
import { create_custom_element } from './npm/svelte-internal-client-dom-elements-custom-element.js';
import prettyBytes from './npm/pretty-bytes.js';
import { getTrueSizeOfObject, getStoredItemSize, getStorageBytesInUse } from './helpers/used-storage.js';

var root = template(`<output> </output>`);

function Storage_usage($$anchor, $$props) {
	push($$props, true);

	const area = prop($$props, "area", 7),
		item = prop($$props, "item", 7);

	const storage = chrome.storage[area()];
	let used = state(0);
	const available = derived(() => (item() ? storage.QUOTA_BYTES_PER_ITEM ?? storage.QUOTA_BYTES : storage.QUOTA_BYTES) - get(used));

	async function getStorageUsage() {
		set(used, proxy(item() ? await getStoredItemSize(area(), item()) : await getStorageBytesInUse(area())));
	}

	const handleStorageChange = (changes, areaName) => {
		if (item() && changes[item()]) {
			set(used, proxy(getTrueSizeOfObject(changes[item()].newValue)));
		}

		if (areaName === area()) {
			getStorageUsage();
		}
	};

	user_effect(() => {
		if (item()) {
			set(used, proxy(getTrueSizeOfObject(storage.get(item()))));
		}
	});

	onMount(() => {
		getStorageUsage();
		chrome.storage.onChanged.addListener(handleStorageChange);

		return () => {
			chrome.storage.onChanged.removeListener(handleStorageChange);
		};
	});

	var output = root();
	var text = child(output, true);

	template_effect(() => set_text(text, get(available) < 100_000 ? `Only ${prettyBytes(get(available))} available` : `${prettyBytes(get(used))} used`));
	reset(output);
	append($$anchor, output);

	return pop({
		get area() {
			return area();
		},
		set area($$value) {
			area($$value);
			flush_sync();
		},
		get item() {
			return item();
		},
		set item($$value) {
			item($$value);
			flush_sync();
		}
	});
}

customElements.define("storage-usage", create_custom_element(
	Storage_usage,
	{
		area: { attribute: "area", type: "String" },
		item: { attribute: "item", type: "String" }
	},
	[],
	[],
	true
));

export { Storage_usage as default };
