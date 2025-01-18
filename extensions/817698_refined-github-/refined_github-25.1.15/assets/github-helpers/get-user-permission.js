import '../npm/webext-storage-cache.js';
import { canUserEditRepo } from '../npm/github-url-detection.js';
import { elementExists } from '../npm/select-dom.js';
import { hasToken } from '../options-storage.js';
import { getRepo } from './index.js';
import api from './api.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

/*
From https://docs.github.com/en/graphql/reference/enums#repositorypermission

ADMIN: Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.

MAINTAIN: Can read, clone, and push to this repository. They can also manage issues, pull requests, and some repository settings.

READ: Can read and clone this repository. Can also open and comment on issues and pull requests.

TRIAGE: Can read and clone this repository. Can also manage issues and pull requests.

WRITE: Can read, clone, and push to this repository. Can also manage issues and pull requests.
*/


async function getViewerPermission() {
	if (getRepo() === null) {
		throw new Error('This can only be called on a repository page');
	}

	// Faster DOM-based check, if the DOM is available.
	// This can be cached because it's the highest level of access
	if (canUserEditRepo()) {
		return 'ADMIN';
	}

	if (!await hasToken()) {
		return 'READ';
	}

	try {
		const {repository} = await api.v4(`
			repository() {
				viewerPermission
			}
		`);

		return repository.viewerPermission;
	} catch {
		return 'READ';
	}
}

const viewerPermission = new CachedFunction('viewer-permission', {
	updater: getViewerPermission,
	cacheKey: () => getRepo()?.nameWithOwner ?? '',
});

async function userIsAdmin() {
	const repoAccess = await viewerPermission.get();
	return repoAccess === 'ADMIN';
}

/** Check if the user has complete write access to the repo (but no access to the repo Settings) */
async function userHasPushAccess() {
	const repoAccess = await viewerPermission.get();
	return repoAccess !== 'READ' && repoAccess !== 'TRIAGE';
}

/** Check if the user can edit all comments and comment on locked issues on the current repo */
async function userIsModerator() {
	// Faster DOM-based check, if the DOM is available.
	// This cannot be cached in `viewerPermission` because it guarantees you have *at least* moderation access, but can't tell if you have *more* capabilities
	const domCheck = elementExists([
		'.lock-toggle-link > .octicon-lock',
		'[aria-label^="You have been invited to collaborate"]',
		'[title^="You are a member"]',
		'[title^="You are a maintainer"]',
		'[title^="You are a collaborator"]',

		// Don't check for admin access here. If the user has admin access, the DOM check in `viewerPermission` will use the DOM and be cached anyway
	]);

	if (domCheck) {
		return true;
	}

	const repoAccess = await viewerPermission.get();
	return repoAccess !== 'READ';
}

export { userHasPushAccess, userIsAdmin, userIsModerator };
