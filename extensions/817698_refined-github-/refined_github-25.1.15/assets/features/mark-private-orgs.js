import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import EyeClosedIcon from '../npm/octicons-plain-react-components-EyeClosed.js';
import { isOwnUserProfile } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getUsername } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const publicOrganizationsNames = new CachedFunction('public-organizations', {
	async updater(username) {
	// API v4 seems to *require* `org:read` permission AND it includes private organizations as well, which defeats the purpose. There's no way to filter them.
	// GitHub's API explorer inexplicably only includes public organizations.
		const response = await api.v3(`/users/${username}/orgs`);
		return response.map((organization) => organization.login);
	},
	maxAge: {hours: 6},
	staleWhileRevalidate: {days: 10},
});

function markPrivate(org, organizations) {
	if (!organizations.includes(org.pathname.replace(/^\/(organizations\/)?/, ''))) {
		org.classList.add('rgh-private-org');
		org.append(React.createElement(EyeClosedIcon, null ));
	}
}

async function init(signal) {
	const organizations = await publicOrganizationsNames.get(getUsername());
	observe(
		'a.avatar-group-item[data-hovercard-type="organization"][itemprop="follows"]',
		org => {
			markPrivate(org, organizations);
		},
		{signal, stopOnDomReady: true},
	);
}

void features.add(import.meta.url, {
	include: [
		isOwnUserProfile,
	],
	init,
});

/*

Test URLs:

https://github.com/YOUR_USERNAME

*/
