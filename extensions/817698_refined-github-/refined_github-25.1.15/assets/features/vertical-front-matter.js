import React from '../npm/dom-chef.js';
import { $$ } from '../npm/select-dom.js';
import { isSingleFile } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

// https://github.com/github/markup/blob/cd01f9ec87c86ce5a7c70188a74ef40fc4669c5b/lib/github/markup/markdown.rb#L34
const hasFrontMatter = () => isSingleFile() && /\.(?:mdx?|mkdn?|mdwn|mdown|markdown|litcoffee)$/.test(location.pathname);

function transpose(table) {
	const rows = $$(':scope > tbody > tr', table);
	const headers = $$(':scope > thead th', table);
	if (headers.length <= 4 || rows.length !== 1 || headers.length !== rows[0].childElementCount) {
		return;
	}

	const values = [...rows[0].children];
	table.replaceWith(
		React.createElement('table', { className: "rgh-vertical-front-matter-table",}
, React.createElement('tbody', null
, headers.map((cell, index) => (
					React.createElement('tr', null
, cell
, values[index]
)
				))
)
),
	);
}

function init(signal) {
	observe('.markdown-body > table:first-child', transpose, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasFrontMatter,
	],
	init,
});

/*

Test URLs:

https://github.com/github/docs/blob/114de99a/content/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github.md

*/
