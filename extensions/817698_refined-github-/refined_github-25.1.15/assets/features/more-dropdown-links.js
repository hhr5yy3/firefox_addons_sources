import React from '../npm/dom-chef.js';
import { elementExists } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { hasRepoHeader, isEnterprise } from '../npm/github-url-detection.js';
import GitBranchIcon from '../npm/octicons-plain-react-components-GitBranch.js';
import GitCompareIcon from '../npm/octicons-plain-react-components-GitCompare.js';
import GitCommitIcon from '../npm/octicons-plain-react-components-GitCommit.js';
import PackageDependenciesIcon from '../npm/octicons-plain-react-components-PackageDependencies.js';
import features from '../feature-manager.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import createDropdownItem from '../github-helpers/create-dropdown-item.js';
import { buildRepoURL } from '../github-helpers/index.js';
import getCurrentGitRef from '../github-helpers/get-current-git-ref.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';

async function unhideOverflowDropdown() {
	// Wait for the tab bar to be loaded
	const repoNavigationBar = await elementReady('.UnderlineNav-body');

	// No dropdown on mobile #5781
	if (!elementExists('.js-responsive-underlinenav')) {
		return false;
	}

	repoNavigationBar.parentElement.classList.add('rgh-has-more-dropdown');
	return true;
}

async function addDropdownItems(repoNavigationDropdown) {
	const reference = getCurrentGitRef() ?? await getDefaultBranch();
	const compareUrl = buildRepoURL('compare', reference);
	const commitsUrl = buildRepoURL('commits', reference);
	const branchesUrl = buildRepoURL('branches');
	const dependenciesUrl = buildRepoURL('network/dependencies');

	repoNavigationDropdown.append(
		React.createElement('li', { className: "dropdown-divider", role: "separator",} ),
		createDropdownItem({
			label: 'Compare',
			href: compareUrl,
			icon: GitCompareIcon,
		}),
		isEnterprise()
			? ''
			: createDropdownItem({
					label: 'Dependencies',
					href: dependenciesUrl,
					icon: PackageDependenciesIcon,
				}),
		createDropdownItem({
			label: 'Commits',
			href: commitsUrl,
			icon: GitCommitIcon,
		}),
		createDropdownItem({
			label: 'Branches',
			href: branchesUrl,
			icon: GitBranchIcon,
		}),
	);
}

async function init(signal) {
	await expectToken();
	await unhideOverflowDropdown();

	observe('.UnderlineNav-actions ul', addDropdownItems, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRepoHeader,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github

*/

export { unhideOverflowDropdown };
