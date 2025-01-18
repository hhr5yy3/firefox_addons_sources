import { isWebPage } from '../npm/webext-detect.js';
import { messageRuntime } from '../npm/webext-msg.js';

async function fetchText(url, options) {
	const response = await fetch(url, options);
	return response.ok
		? response.text()
		: ''; // Likely a 404. Either way the response isn't the CSS we expect #8142
}

async function isomorphicFetchText(url, options) {
	return isWebPage()
		// Firefox CSP issue: https://github.com/refined-github/refined-github/issues/8144
		? messageRuntime({fetchString: {url, options}})
		: fetchText(url, options);
}

export { fetchText, isomorphicFetchText };
