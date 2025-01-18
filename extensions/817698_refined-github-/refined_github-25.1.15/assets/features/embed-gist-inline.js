import React from '../npm/dom-chef.js';
import doma from '../npm/doma.js';
import { hasComments } from '../npm/github-url-detection.js';
import memoize from '../npm/memoize.js';
import { messageRuntime } from '../npm/webext-msg.js';
import features from '../feature-manager.js';
import { getCleanPathname } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { standaloneGistLinkInMarkdown } from '../github-helpers/selectors.js';

// Fetch via background.js due to CORB policies. Also memoize to avoid multiple requests.
const fetchGist = memoize(
	async (url) =>
		messageRuntime({fetchJSON: `${url}.json`}),
);

function parseGistLink(link) {
	if (link.host === 'gist.github.com') {
		return getCleanPathname(link);
	}

	if (link.host === location.host && link.pathname.startsWith('gist/')) {
		return link.pathname.replace('/gist', '').replace(/\/$/, '');
	}

	return undefined;
}

// TODO: Replace with updated github-url-detection: isGistFile(link)
function isGist(link) {
	return parseGistLink(link)?.replace(/[^/]/g, '').length === 1; // Exclude user links and file links
}

const isOnlyChild = (link) => link.textContent.trim() === link.parentElement.textContent.trim();

async function embedGist(link) {
	const info = React.createElement('em', null, " (loading)" );
	link.after(info);

	try {
		const gistData = await fetchGist(link.href);
		if (gistData.div.length > 10_000) {
			info.textContent = ' (too large to embed)';
			return;
		}

		const fileCount = gistData.files.length;
		if (fileCount > 1) {
			info.textContent = ` (${fileCount} files)`;
		} else {
			const container = React.createElement('div', null );
			container.attachShadow({mode: 'open'}).append(
				React.createElement('style', null, `
					.gist .gist-data {
						max-height: 16em;
						overflow-y: auto;
					}
				`
),
				React.createElement('link', { rel: "stylesheet", href: gistData.stylesheet,} ),
				doma.one(gistData.div),
			);
			link.parentElement.after(container);
			info.remove();
		}
	} catch (error) {
		info.remove();
		throw error;
	}
}

function init(signal) {
	observe(standaloneGistLinkInMarkdown, link => {
		if (isGist(link) && isOnlyChild(link)) {
			void embedGist(link);
		}
	}, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasComments,
	],
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/issues/77

*/
