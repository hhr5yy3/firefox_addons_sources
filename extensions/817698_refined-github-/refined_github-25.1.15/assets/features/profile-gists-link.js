import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { expectElement, elementExists } from '../npm/select-dom.js';
import { isUserProfile, isEnterprise } from '../npm/github-url-detection.js';
import CodeSquareIcon from '../npm/octicons-plain-react-components-CodeSquare.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { triggerRepoNavOverflow, getCleanPathname } from '../github-helpers/index.js';
import createDropdownItem from '../github-helpers/create-dropdown-item.js';
import observe from '../helpers/selector-observer.js';
import GetGistCount from './profile-gists-link.gql.js';
import { repoUnderlineNavDropdownUl } from '../github-helpers/selectors.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const gistCount = new CachedFunction('gist-count', {
	async updater(username) {
		const {user} = await api.v4(GetGistCount, {
			variables: {username},
		});
		return user.gists.totalCount;
	},
	maxAge: {days: 1},
	staleWhileRevalidate: {days: 3},
});

function getUser() {
	const name = getCleanPathname();
	const url = isEnterprise()
		? `/gist/${name}`
		: `https://gist.github.com/${name}`;
	return {url, name};
}

async function appendTab(navigationBar) {
	const user = getUser();
	const link = (
		React.createElement('a', {
			href: user.url,
			className: "UnderlineNav-item js-responsive-underlinenav-item" ,
			role: "tab",
			'aria-selected': "false",
			'data-tab-item': "rgh-gists-item",}

, React.createElement(CodeSquareIcon, { className: "UnderlineNav-octicon hide-sm" ,} )
, ' Gists '
)
	);

	navigationBar.append(link);

	// There are two UnderlineNav items (responsive…) that point to the same dropdown
	const overflowNav = expectElement(repoUnderlineNavDropdownUl);
	if (!elementExists('[data-rgh-label="Gists"]', overflowNav)) {
		overflowNav.append(
			createDropdownItem({
				'label': 'Gists',
				'href': user.url,
				'icon': CodeSquareIcon,
				'data-rgh-label': 'Gists',
			}),
		);
	}

	const count = await gistCount.get(user.name);
	if (count > 0) {
		link.append(React.createElement('span', { className: "Counter",}, count));
	}

	triggerRepoNavOverflow();
}

async function init(signal) {
	await expectToken();
	observe('nav[aria-label="User"] > ul', appendTab, {signal});
}

void features.add(import.meta.url, {
	include: [
		isUserProfile,
	],
	init,
});

/*

Test URL:

Has gists: https://github.com/fregante
No gists: https://github.com/someone

*/
