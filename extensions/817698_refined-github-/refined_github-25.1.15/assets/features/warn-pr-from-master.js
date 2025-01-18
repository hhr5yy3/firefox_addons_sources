import React from '../npm/dom-chef.js';
import { isCompare } from '../npm/github-url-detection.js';
import elementReady from '../npm/element-ready.js';
import features from '../feature-manager.js';
import parseCompareUrl from '../github-helpers/parse-compare-url.js';
import { defaultBranchOfRepo } from '../github-helpers/get-default-branch.js';

async function init() {
	const anchor = await elementReady('.js-compare-pr');
	anchor?.before(
		React.createElement('div', { className: "flash flash-error my-3"  ,}
, React.createElement('strong', null, "Note:"), " Creating a PR from the default branch is an "          , React.createElement('a', { href: "https://blog.jasonmeridth.com/posts/do-not-issue-pull-requests-from-your-master-branch/", target: "_blank", rel: "noopener noreferrer" ,}, "anti-pattern"), "."
),
	);
}

async function isCrossRepoCompareFromMaster() {
	const c = parseCompareUrl(location.pathname);

	return !!c && c.isCrossRepo && c.head.branch === await defaultBranchOfRepo.get(c.head.repo);
}

void features.add(import.meta.url, {
	asLongAs: [
		isCompare,
		isCrossRepoCompareFromMaster,
	],
	init,
});

/*

Test URLs:

- Simple: https://github.com/refined-github/refined-github/compare/main...fregante:main
- Renamed fork and changed default branch: https://github.com/refined-github/sandbox/compare/default-a...bfred-it-org:github-sandbox:main?expand=1
- Non-standard default name: https://github.com/refined-github/refined-github/compare/sandbox/keep-branch...yakov116:upstream

*/
