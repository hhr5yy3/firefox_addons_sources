import { expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isSingleGist } from '../npm/github-url-detection.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';

async function initOnce() {
	const embedViaScript = await elementReady('.file-navigation-option button[value^="<script"]');
	const embedViaIframe = embedViaScript.cloneNode(true);

	// Remove analytics attributes
	delete embedViaIframe.dataset.hydroClick;
	delete embedViaIframe.dataset.hydroClickHmac;

	// Set required content
	embedViaIframe.setAttribute('aria-checked', 'false');
	embedViaIframe.value = `<iframe src="${location.origin}${location.pathname}.pibb"></iframe>`;
	expectElement('.select-menu-item-heading', embedViaIframe).textContent = 'Embed via <iframe>';
	expectElement('.description', embedViaIframe).textContent = 'Embed this gist in your website via <iframe>.';

	// Modify description of the original embed type to distinguish the two items
	expectElement('.select-menu-item-heading', embedViaScript).textContent = 'Embed via <script>';
	expectElement('.description', embedViaScript).textContent = 'Embed this gist in your website via <script>.';

	embedViaScript.after(embedViaIframe);
}

void features.add(import.meta.url, {
	include: [
		isSingleGist,
	],
	init: onetime(initOnce),
});

/*

Test URLs:

https://gist.github.com/fregante/5b239118cd2aaf001b0d33d54166cd95

*/
