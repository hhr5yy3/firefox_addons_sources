import { isRepoRoot } from '../npm/github-url-detection.js';
import getCurrentGitRef from './get-current-git-ref.js';

class GitHubFileURL {
	user = '';
	repository = '';
	route = '';
	branch = '';
	filePath = '';

	  internalUrl;

	constructor(url) {
		// Use Facade pattern instead of inheritance #3193
		this.internalUrl = new URL(url);
		this.pathname = this.internalUrl.pathname;
	}

	toString() {
		return this.href;
	}

	assign(...replacements) {
		Object.assign(this, ...replacements);
		return this;
	}

	// Handle branch names containing multiple slashes #4492
	 disambiguateReference(
		ambiguousReference,
	) {
		const branch = ambiguousReference[0];
		// History pages might use search parameters
		const filePathFromSearch = this.searchParams.getAll('path[]').join('/');
		if (filePathFromSearch) {
			this.searchParams.delete('path[]');
			return {branch, filePath: filePathFromSearch};
		}

		const filePath = ambiguousReference.slice(1).join('/');

		// TODO: `getCurrentGitRef` uses global state https://github.com/refined-github/refined-github/issues/6637
		const currentBranch = getCurrentGitRef();
		const currentBranchSections = currentBranch?.split('/');
		if (
			!currentBranch // Current branch could not be determined (1/2)
			|| !currentBranchSections // Current branch could not be determined (2/2)
			|| ambiguousReference.length === 1 // Ref has no slashes
			|| currentBranchSections.length === 1 // Current branch has no slashes
		) {
			// Then the reference is not ambiguous
			return {branch, filePath};
		}

		for (const [index, section] of currentBranchSections.entries()) {
			if (ambiguousReference[index] !== section) {
				console.warn(`The supplied path (${ambiguousReference.join('/')}) is ambiguous (current reference is \`${currentBranch}\`)`);
				return {branch, filePath};
			}
		}

		return {
			branch: currentBranch,
			filePath: ambiguousReference.slice(currentBranchSections.length).join('/'),
		};
	}

	get pathname() {
		return `/${this.user}/${this.repository}/${this.route}/${this.branch}/${this.filePath}`.replaceAll(/(?:(?:undefined)?\/)+$/g, '');
	}

	set pathname(pathname) {
		const [user, repository, route, ...ambiguousReference] = pathname.replaceAll(/^\/|\/$/g, '').split('/');
		// TODO: `isRepoRoot` uses global state https://github.com/refined-github/refined-github/issues/6637
		if (isRepoRoot() || (ambiguousReference.length === 2 && ambiguousReference[1].includes('%2F'))) {
			const branch = ambiguousReference.join('/').replaceAll('%2F', '/');
			this.assign({
				user,
				repository,
				route,
				branch,
				filePath: '',
			});
			return;
		}

		const {branch, filePath} = this.disambiguateReference(ambiguousReference);
		this.assign({
			user,
			repository,
			route,
			branch,
			filePath,
		});
	}

	get href() {
		// Update the actual underlying URL
		this.internalUrl.pathname = this.pathname;
		return this.internalUrl.href;
	}

	set href(href) {
		this.internalUrl.href = href;
	}

	// Proxy all other getters/setters to internalUrl

	get hash() {
		return this.internalUrl.hash;
	}

	set hash(hash) {
		this.internalUrl.hash = hash;
	}

	get search() {
		return this.internalUrl.search;
	}

	set search(search) {
		this.internalUrl.search = search;
	}

	get searchParams() {
		return this.internalUrl.searchParams;
	}
}

export { GitHubFileURL as default };
