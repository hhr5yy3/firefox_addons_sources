import './npm/svelte-internal-disclose-version.js';
import './npm/esm-env-dev-fallback.js';
import { push, pop, get } from './npm/svelte-internal-client-runtime.js';
import { next, reset } from './npm/svelte-internal-client-dom-hydration.js';
import { user_effect, template_effect } from './npm/svelte-internal-client-reactivity-effects.js';
import { set, state } from './npm/svelte-internal-client-reactivity-sources.js';
import { set_text } from './npm/svelte-internal-client-render.js';
import { if_block } from './npm/svelte-internal-client-dom-blocks-if.js';
import { child, sibling } from './npm/svelte-internal-client-dom-operations.js';
import { template, append, text } from './npm/svelte-internal-client-dom-template.js';
import { append_styles } from './npm/svelte-internal-client-dom-css.js';
import { set_custom_element_data, remove_input_defaults } from './npm/svelte-internal-client-dom-elements-attributes.js';
import { toggle_class } from './npm/svelte-internal-client-dom-elements-class.js';
import { delegate } from './npm/svelte-internal-client-dom-elements-events.js';
import { bind_value } from './npm/svelte-internal-client-dom-elements-bindings-input.js';
import { onMount } from './npm/svelte-index-client.js';
import { create_custom_element } from './npm/svelte-internal-client-dom-elements-custom-element.js';
import './helpers/target-blank-polyfill.js';
import optionsStorage from './options-storage.js';
import { hasValidGitHubComToken } from './github-helpers/github-token.js';

async function grantPermissions(_, origins, stepVisible, stepValid) {
	const granted = await chrome.permissions.request({ origins });

	if (granted) {
		set(stepVisible, 2);
		set(stepValid, 1);
	}
}

function markSecondStep(__1, stepValid, stepVisible) {
	setTimeout(
		() => {
			set(stepValid, 2);
			set(stepVisible, 3);
		},
		1000
	);
}

var root_1 = template(`<button class="svelte-v4v27f">Grant</button>`);
var root_3 = template(`<span class="error svelte-v4v27f"> </span>`);
var root = template(`<main class="svelte-v4v27f"><rgh-header></rgh-header> <div class="content svelte-v4v27f"><ul class="svelte-v4v27f"><li class="will-show svelte-v4v27f"><!> the extension access to github.com</li>  <li class="will-show svelte-v4v27f"><a href="https://github.com/settings/tokens/new?description=Refined%20GitHub&amp;scopes=repo,read:project&amp;default_expires_at=none" class="svelte-v4v27f">Generate a token</a> to ensure that every feature works correctly. <a href="https://github.com/refined-github/refined-github/wiki/Security" class="svelte-v4v27f">More info</a></li> <li class="will-show svelte-v4v27f"><label for="token-input" class="svelte-v4v27f">Paste token:</label> <input id="token-input" type="text" size="10" autocomplete="current-password" name="personalToken" class="svelte-v4v27f"> <!></li></ul></div> <footer class="svelte-v4v27f"><h2 class="will-show svelte-v4v27f">Setup complete, redirecting to <a class="hidden-link svelte-v4v27f" href="https://github.com/refined-github/refined-github/wiki" target="_self">GitHub</a>…</h2></footer></main>`, 2);

const $$css = {
	hash: "svelte-v4v27f",
	code: ":host {font-size:2em;display:grid;--content-width: 60rem;--viewport-margin: 30px;}:host .svelte-v4v27f {box-sizing:border-box;}main.svelte-v4v27f {transition:opacity 1s;margin-bottom:2em;}footer.svelte-v4v27f {margin-top:50px;}h2.svelte-v4v27f {font-size:clamp(1.2em, 4vw, 1.5em);padding-inline:var(--viewport-margin);max-width:var(--content-width);font-weight:200;margin:auto;}.content.svelte-v4v27f {padding-inline:var(--viewport-margin);}ul.svelte-v4v27f {list-style:none;margin:30px auto;max-width:var(--content-width);padding:var(--viewport-margin) 0;}a.svelte-v4v27f,\n\tbutton.svelte-v4v27f {all:initial;font:inherit;text-decoration:underline;color:cornflowerblue;cursor:pointer;}.hidden-link.svelte-v4v27f {color:inherit;}li.svelte-v4v27f {margin-block:1em;padding-left:1.8em;}input.svelte-v4v27f {background:light-dark(#f6f8fa, #151b23);border:solid 1px light-dark(#d0d9e0, #3d444d);border-radius:6px;padding:5px 12px;font-size:inherit;line-height:20px;margin-left:0.5em;}input.svelte-v4v27f:focus {background:light-dark(#fff, #0d1117);border-color:#1f6feb;box-shadow:inset 0 0 0 1px #1f6feb;outline:none;}li.svelte-v4v27f::before {content:'';display:inline-block;width:1em;height:1em;vertical-align:-0.2em;margin-right:0.8em;margin-left:-1.8em; /* Pull out */background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" fill=\"gray\" d=\"M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4 8a4 4 0 118 0 4 4 0 01-8 0z\"></path></svg>');background-size:contain;}li.valid.svelte-v4v27f::before {background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" fill=\"%2328a745\" d=\"M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z\"></path></svg>');}.will-show.svelte-v4v27f {\n\t\tanimation: svelte-v4v27f-fade-in 0.5s;animation-play-state:paused;}.will-show.visible.svelte-v4v27f {animation-play-state:running;}.dimmed.svelte-v4v27f {opacity:40%;}.error.svelte-v4v27f {color:#cf222e;font-size:0.8em;}\n\n\t@keyframes svelte-v4v27f-fade-in {\n\t\tfrom {\n\t\t\topacity: 0%;\n\t\t}\n\t}"
};

function Welcome($$anchor, $$props) {
	push($$props, true);
	append_styles($$anchor, $$css);

	let stepVisible = state(1);
	let stepValid = state(0);
	let tokenInput = state('');
	let tokenError = state('');

	user_effect(() => {
		if (get(stepValid) === 1) {
			setTimeout(showThirdStep, 2000);
		} else if (get(stepValid) === 3) {
			setTimeout(
				() => {
					location.replace('https://github.com/refined-github/refined-github/wiki');
				},
				2000
			);
		}
	});

	user_effect(() => {
		if (get(tokenInput)) {
			verifyToken();
			// @ts-expect-error TS and its index signatures...
			optionsStorage.set({ personalToken: get(tokenInput) });
		}
	});

	const origins = [
		'https://github.com/*',
		'https://gist.github.com/*'
	];

	function showThirdStep() {
		set(stepVisible, 3);
	}

	async function verifyToken() {
		if (await hasValidGitHubComToken(get(tokenInput))) {
			set(stepValid, 3);
			set(tokenError, '');
		} else {
			set(tokenError, 'Invalid token');
		}
	}

	onMount(async () => {
		if (await chrome.permissions.contains({ origins })) {
			set(stepValid, 1);

			setTimeout(
				() => {
					set(stepVisible, 2);
				},
				500
			);
		}
	});

	var main = root();
	var rgh_header = child(main);

	set_custom_element_data(rgh_header, "title", "Welcome to Refined GitHub");
	set_custom_element_data(rgh_header, "class", "svelte-v4v27f");

	var div = sibling(rgh_header, 2);
	var ul = child(div);
	var li = child(ul);
	var node = child(li);

	{
		var consequent = ($$anchor) => {
			var button = root_1();

			button.__click = [
				grantPermissions,
				origins,
				stepVisible,
				stepValid
			];

			append($$anchor, button);
		};

		var alternate = ($$anchor) => {
			var text$1 = text("Grant");

			append($$anchor, text$1);
		};

		if_block(node, ($$render) => {
			if (get(stepValid) === 0) $$render(consequent); else $$render(alternate, false);
		});
	}

	next();
	reset(li);

	var li_1 = sibling(li, 2);

	li_1.__click = showThirdStep;

	var a = child(li_1);

	a.__click = [markSecondStep, stepValid, stepVisible];
	next(2);
	reset(li_1);

	var li_2 = sibling(li_1, 2);
	var input = sibling(child(li_2), 2);

	remove_input_defaults(input);

	var node_1 = sibling(input, 2);

	{
		var consequent_1 = ($$anchor) => {
			var span = root_3();
			var text_1 = child(span, true);

			reset(span);
			template_effect(() => set_text(text_1, get(tokenError)));
			append($$anchor, span);
		};

		if_block(node_1, ($$render) => {
			if (get(tokenError)) $$render(consequent_1);
		});
	}

	reset(li_2);
	reset(ul);
	reset(div);

	var footer = sibling(div, 2);
	var h2 = child(footer);

	reset(footer);
	reset(main);

	template_effect(() => {
		toggle_class(main, "dimmed", get(stepValid) === 3);
		toggle_class(li, "valid", get(stepValid) >= 1);
		toggle_class(li, "visible", get(stepVisible) >= 1);
		toggle_class(li_1, "valid", get(stepValid) >= 2);
		toggle_class(li_1, "visible", get(stepVisible) >= 2);
		toggle_class(li_2, "valid", get(stepValid) >= 3);
		toggle_class(li_2, "visible", get(stepVisible) >= 3);
		toggle_class(h2, "visible", get(stepValid) === 3);
	});

	bind_value(input, () => get(tokenInput), ($$value) => set(tokenInput, $$value));
	append($$anchor, main);
	pop();
}

delegate(["click"]);
customElements.define("rgh-welcome", create_custom_element(Welcome, {}, [], [], true));

export { Welcome as default };
