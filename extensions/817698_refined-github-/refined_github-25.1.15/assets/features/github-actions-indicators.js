import '../npm/webext-storage-cache.js';
import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import PlayIcon from '../npm/octicons-plain-react-components-Play.js';
import { parseCron } from '../npm/@fregante-mi-cron.js';
import { isRepositoryActions } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { cacheByRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import GetWorkflows from './github-actions-indicators.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

function addTooltip(element, tooltip) {
	const existingTooltip = element.getAttribute('aria-label');
	if (existingTooltip) {
		element.setAttribute('aria-label', existingTooltip + '.\n' + tooltip);
	} else {
		element.classList.add('tooltipped', 'tooltipped-s');
		element.setAttribute('aria-label', tooltip);
	}
}

// There is no way to get a workflow list in the v4 API #6543
async function getWorkflows() {
	const response = await api.v3('actions/workflows');

	const workflows = response.workflows ;

	// The response is not reliable: Some workflow's path is '' and deleted workflow's state is 'active'
	return workflows
		.map(workflow => ({
			name: workflow.path.split('/').pop(),
			isEnabled: workflow.state === 'active',
		}));
}

async function getFilesInWorkflowPath() {
	const {repository: {workflowFiles}} = await api.v4(GetWorkflows);

	const workflows = workflowFiles?.entries ?? [];

	const result = {};
	for (const workflow of workflows) {
		result[workflow.name] = workflow.object.text;
	}

	return result;
}

const workflowDetails = new CachedFunction('workflows-details', {
	async updater() {
		const [workflows, workflowFiles] = await Promise.all([getWorkflows(), getFilesInWorkflowPath()]);

		const details = {};

		for (const workflow of workflows) {
			const workflowYaml = workflowFiles[workflow.name];

			if (workflowYaml === undefined) {
				// Cannot find workflow yaml; workflow removed.
				continue;
			}

			// Single-line regex, allows comments around
			const cron = /^(?: {4}|\t\t)-\s*cron[:\s'"]+([^'"\n]+)/m.exec(workflowYaml);
			details[workflow.name] = {
				...workflow,
				schedule: cron?.[1],
				manuallyDispatchable: workflowYaml.includes('workflow_dispatch:'),
			};
		}

		return details;
	},
	maxAge: {days: 1},
	staleWhileRevalidate: {days: 10},
	cacheKey: cacheByRepo,
});

async function addIndicators(workflowListItem) {
	// Called in `init`, memoized
	const workflows = await workflowDetails.get();
	const workflowName = workflowListItem.href.split('/').pop();
	const workflow = workflows[workflowName];
	if (!workflow) {
		return;
	}

	const svgTrailer = $('.ActionListItem-visual--trailing', workflowListItem)
		?? React.createElement('div', { className: "ActionListItem-visual--trailing",} );
	if (!svgTrailer.isConnected) {
		workflowListItem.append(svgTrailer);
	}

	svgTrailer.classList.add('m-auto', 'd-flex', 'gap-2');

	if (workflow.manuallyDispatchable) {
		svgTrailer.append(React.createElement(PlayIcon, { className: "m-auto",} ));
		addTooltip(workflowListItem, 'This workflow can be triggered manually');
	}

	if (!workflow.schedule) {
		return;
	}

	const nextTime = parseCron.nextDate(workflow.schedule);
	if (!nextTime) {
		return;
	}

	const relativeTime = React.createElement('relative-time', { datetime: String(nextTime),} );
	expectElement('.ActionListItem-label', workflowListItem).append(
		React.createElement('em', null, "("
, relativeTime, ")"
),
	);

	setTimeout(() => {
		// The content of `relative-time` might is not immediately available
		addTooltip(workflowListItem, `Next run: ${relativeTime.shadowRoot.textContent}`);
	}, 500);
}

async function init(signal) {
	await expectToken();
	observe('a.ActionListContent', addIndicators, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRepositoryActions,
		async () => Boolean(await workflowDetails.get()),
	],
	init,
});

/*

## Test URLs

Manual + scheduled:
https://github.com/sindresorhus/type-fest/actions/workflows/ts-canary.yml

Manual + disabled + pinned:
https://github.com/refined-github/sandbox/actions

*/
