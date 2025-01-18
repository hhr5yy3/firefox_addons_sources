import '../npm/webext-storage-cache.js';
import elementReady from '../npm/element-ready.js';
import api from './api.js';
import { getRepo, extractCurrentBranchFromBranchPicker } from './index.js';
import { branchSelector } from './selectors.js';
import GetDefaultBranch from './get-default-branch.gql.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const isCurrentRepo = (nameWithOwner) => Boolean(getRepo()?.nameWithOwner === nameWithOwner);

// Do not make this function complicated. We're only optimizing for the repo root.
async function fromDOM() {
	if (!['', 'commits'].includes(getRepo().path)) {
		return;
	}

	// We're on the default branch, so we can extract it from the current page. This exclusively happens on the exact pages:
	// /user/repo
	// /user/repo/commits (without further path)
	const element = await elementReady(branchSelector);

	if (!element) {
		return;
	}

	return extractCurrentBranchFromBranchPicker(element);
}

async function fromAPI(repository) {
	const [owner, name] = repository.split('/');
	const response = await api.v4(GetDefaultBranch, {
		variables: {
			owner,
			name,
		},
	});

	return response.repository.defaultBranchRef.name;
}

// DO NOT use optional arguments/defaults in "cached functions" because they can't be memoized effectively
// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1864
const defaultBranchOfRepo = new CachedFunction('default-branch', {
	async updater(repository) {
		if (!repository) {
			throw new Error('getDefaultBranch was called on a non-repository page');
		}

		return (isCurrentRepo(repository) && await fromDOM()) || fromAPI(repository);
	},

	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 20},
});

async function getDefaultBranch() {
	return defaultBranchOfRepo.get(getRepo().nameWithOwner);
}

export { getDefaultBranch as default, defaultBranchOfRepo };
