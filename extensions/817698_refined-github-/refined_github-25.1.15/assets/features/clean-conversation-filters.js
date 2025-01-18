import '../npm/webext-storage-cache.js';
import { elementExists, $, expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isRepoIssueOrPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { cacheByRepo } from '../github-helpers/index.js';
import HasAnyProjects from './clean-conversation-filters.gql.js';
import api from '../github-helpers/api.js';
import { expectTokenScope, expectToken } from '../github-helpers/github-token.js';
import observe from '../helpers/selector-observer.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const hasAnyProjects = new CachedFunction('has-projects', {
	async updater() {
		const activeProjectsCounter = await elementReady('[data-hotkey="g b"] .Counter');
		if (activeProjectsCounter && getCount(activeProjectsCounter) > 0) {
			return true;
		}

		const isOrganization = elementExists('[rel=author][data-hovercard-type="organization"]');
		if (!activeProjectsCounter && !isOrganization) {
			// No tab = Projects disabled in repo
			// No organization = no Projects in organization
			return false;
		}

		await expectTokenScope('read:project');
		const {repository, organization} = await api.v4(HasAnyProjects, {
			allowErrors: true,
		});

		return Boolean(repository.projects.totalCount)
			|| Boolean(repository.projectsV2.totalCount)
			|| Boolean(organization?.projects?.totalCount)
			|| Boolean(organization?.projectsV2?.totalCount);
	},
	maxAge: {days: 1},
	staleWhileRevalidate: {days: 20},
	cacheKey: cacheByRepo,
});

function getCount(element) {
	return Number(element.textContent.trim());
}

// TODO: Drop in March 2025
// The new beta view doesn't have .Counter and using the API isn't worth it
async function hideMilestones(container) {
	const milestones = $('[data-selected-links^="repo_milestones"] .Counter');
	if (milestones && getCount(milestones) === 0) {
		expectElement('#milestones-select-menu', container).remove();
	}
}

async function hideProjects(container) {
	const filter = $([
		'#project-select-menu', // TODO: Drop in March 2025
		'[data-testid="action-bar-item-projects"]',
	], container);

	// If the filter is missing, then it has been disabled organization-wide already
	if (filter && !(await hasAnyProjects.get())) {
		filter.remove();
	}
}

async function hide(container) {
	// Keep separate so that one doesn't crash the other
	void hideMilestones(container);
	void hideProjects(container);
}

async function init(signal) {
	await expectToken();
	observe([
		'#js-issues-toolbar', // TODO: Remove after March 2025
		'[data-testid="list-view-metadata"]',
	], hide, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoIssueOrPRList,
	],
	init,
});

/*

Test URLs:

- No projects: https://github.com/left-pad/left-pad/issues
- Projects and milestones (no-op): https://github.com/tc39/ecma402/issues

*/
