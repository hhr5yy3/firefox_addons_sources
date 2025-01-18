import { getRepo } from './index.js';

const compareRegex = /compare[/]([^.]+)[.][.][.]?(.+)/;
function parseCompareUrl(pathname) {
	const base = getRepo(pathname);

	const [, baseBranch, heads] = compareRegex.exec(base.path) ?? [];
	if (!baseBranch) {
		return;
	}

	const headParts = heads.split(':');
	const headBranch = headParts.pop(); // Branch is always last, or the only one
	const headOwner = headParts.shift() ?? base.owner; // The owner is first, or it's the same as the base
	const headName = headParts.pop() ?? base.name; // The repo is first or middle, or it's the same as the base

	if (headParts.length > 0) {
		throw new Error('Invalid compare URL format');
	}

	const headRepo = `${headOwner}/${headName}`;

	return {
		base: {
			repo: base.nameWithOwner,
			branch: baseBranch,
		},
		head: {
			repo: headRepo,
			branch: headBranch,
		},
		isCrossRepo: headRepo !== base.nameWithOwner,
	};
}

export { parseCompareUrl as default };
