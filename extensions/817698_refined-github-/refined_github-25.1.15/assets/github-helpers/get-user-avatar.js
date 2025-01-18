import { $ } from '../npm/select-dom.js';
import { isEnterprise } from '../npm/github-url-detection.js';

function getUserAvatar(username, size) {
	const cleanName = username.replace('[bot]', '');

	if (/[^\w-]/.test(cleanName)) {
		// TODO: December 2024: Turn into TypeError once we're sure it's not breaking anything
		console.error(`Expected a username, got ${cleanName}`);
	}

	// Find image on page. Saves a request and a redirect + add support for bots
	const existingAvatar = $(`[href="/${cleanName}" i] img`);

	if (existingAvatar) {
		return existingAvatar.src;
	}

	// If it's not a bot, use a shortcut URL #2125
	if (cleanName === username) {
		const url = isEnterprise()
			? `/${username}.png`
			: `https://avatars.githubusercontent.com/${username}`;
		// Why use a 2x size: https://github.com/refined-github/refined-github/pull/4973#discussion_r735133613
		return url + `?size=${size * 2}`;
	}
}

export { getUserAvatar as default };
