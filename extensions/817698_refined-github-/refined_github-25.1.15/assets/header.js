import './npm/svelte-internal-disclose-version.js';
import './npm/esm-env-dev-fallback.js';
import { push, pop, flush_sync } from './npm/svelte-internal-client-runtime.js';
import { reset } from './npm/svelte-internal-client-dom-hydration.js';
import { template_effect } from './npm/svelte-internal-client-reactivity-effects.js';
import { set_text } from './npm/svelte-internal-client-render.js';
import { child, sibling } from './npm/svelte-internal-client-dom-operations.js';
import { template, append } from './npm/svelte-internal-client-dom-template.js';
import { slot } from './npm/svelte-internal-client-dom-blocks-slot.js';
import { append_styles } from './npm/svelte-internal-client-dom-css.js';
import { prop } from './npm/svelte-internal-client-reactivity-props.js';
import { create_custom_element } from './npm/svelte-internal-client-dom-elements-custom-element.js';

var root = template(`<header class="svelte-k9j7rx"><div class="content svelte-k9j7rx"><h1 class="svelte-k9j7rx"><img src="icon.png" alt="" height="32" class="svelte-k9j7rx"> </h1> <div><!></div></div></header>`);

const $$css = {
	hash: "svelte-k9j7rx",
	code: "header.svelte-k9j7rx {background-color:light-dark(#f6f8fa, #02040a);border-bottom:solid 1px light-dark(#d2d9e0, #3d444d);padding-block:30px;padding-inline:var(--viewport-margin);display:grid;gap:1em;& > :where(.svelte-k9j7rx) {width:100%;max-width:var(--content-width);margin:auto;}}h1.svelte-k9j7rx {display:flex;gap:0.4em;font-size:clamp(1.3em, 5vw, 2em);font-weight:200;img:where(.svelte-k9j7rx) {height:1.3em;width:1.3em;}}"
};

function Header($$anchor, $$props) {
	push($$props, true);
	append_styles($$anchor, $$css);

	const title = prop($$props, "title", 7);
	var header = root();
	var div = child(header);
	var h1 = child(div);
	var text = sibling(child(h1));

	reset(h1);

	var div_1 = sibling(h1, 2);
	var node = child(div_1);

	slot(node, $$props, "default", {});
	reset(div_1);
	reset(div);
	reset(header);
	template_effect(() => set_text(text, ` ${title() ?? ""}`));
	append($$anchor, header);

	return pop({
		get title() {
			return title();
		},
		set title($$value) {
			title($$value);
			flush_sync();
		}
	});
}

customElements.define("rgh-header", create_custom_element(
	Header,
	{
		title: { attribute: "title", type: "String" }
	},
	["default"],
	[],
	true
));

export { Header as default };
