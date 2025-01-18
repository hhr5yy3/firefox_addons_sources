import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import elementReady from '../npm/element-ready.js';
import { isUserProfile, isOwnUserProfile, isPrivateUserProfile } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getCleanPathname, getUsername } from '../github-helpers/index.js';
import attachElement from '../helpers/attach-element.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const doesUserFollow = new CachedFunction('user-follows', {
	async updater(userA, userB) {
		const {httpStatus} = await api.v3(`/users/${userA}/following/${userB}`, {
			json: false,
			ignoreHTTPStatus: true,
		});

		return httpStatus === 204;
	},
});

async function init() {
	if (!await doesUserFollow.get(getCleanPathname(), getUsername())) {
		return;
	}

	const target = await elementReady('.js-profile-editable-area [href$="?tab=following"]');
	attachElement(target, {
		after: () => (
			React.createElement('span', { className: "color-fg-muted",}, " · Follows you"   )
		),
	});
}

void features.add(import.meta.url, {
	include: [
		isUserProfile,
	],
	exclude: [
		isOwnUserProfile,
		isPrivateUserProfile,
	],
	init,
});

/*

Test URLs:

1. Visit your own profile
2. Click on "X followers" below your profile picture
3. Click on a follower
4. Look for a "Follows you" badge below their profile picture

*/
