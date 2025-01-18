import memoize from '../npm/memoize.js';
import doma from '../npm/doma.js';
import { log } from './feature-helpers.js';

async function fetchDom(url, selector) {
	log.http(url);
	const absoluteURL = new URL(url, location.origin).href; // Firefox `fetch`es from the content script, so relative URLs fail
	const response = await fetch(absoluteURL);
	const dom = doma(await response.text());
	if (selector) {
		return dom.querySelector(selector) ?? undefined;
	}

	return dom;
}

var fetchDom$1 = memoize(fetchDom);

export { fetchDom$1 as default, fetchDom as fetchDomUncached };
