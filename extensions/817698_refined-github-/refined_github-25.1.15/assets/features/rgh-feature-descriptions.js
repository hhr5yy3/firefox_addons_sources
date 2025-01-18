import React from '../npm/dom-chef.js';
import AlertIcon from '../npm/octicons-plain-react-components-Alert.js';
import CopyIcon from '../npm/octicons-plain-react-components-Copy.js';
import InfoIcon from '../npm/octicons-plain-react-components-Info.js';
import features from '../feature-manager.js';
import optionsStorage, { isFeatureDisabled } from '../options-storage.js';
import { getNewFeatureName, featuresMeta } from '../feature-data.js';
import observe from '../helpers/selector-observer.js';
import { brokenFeatures } from '../helpers/hotfix.js';
import { createRghIssueLink } from '../helpers/rgh-links.js';
import openOptions from '../helpers/open-options.js';
import createBanner from '../github-helpers/banner.js';
import { isFeaturePrivate } from '../helpers/feature-utils.js';

function addDescription(infoBanner, id, meta) {
	const isCss = location.pathname.endsWith('.css');

	const description = meta?.description // Regular feature?
		?? (
			isFeaturePrivate(id)
				? 'This feature applies only to "Refined GitHub" repositories and cannot be disabled.'
				: isCss
					? 'This feature is CSS-only and cannot be disabled.'
					: undefined // The heck!?
		);

	const conversationsUrl = new URL('https://github.com/refined-github/refined-github/issues');
	conversationsUrl.searchParams.set('q', `sort:updated-desc is:open "${id}"`);

	const newIssueUrl = new URL('https://github.com/refined-github/refined-github/issues/new');
	newIssueUrl.searchParams.set('template', '1_bug_report.yml');
	newIssueUrl.searchParams.set('title', `\`${id}\`: `);
	newIssueUrl.searchParams.set('labels', 'bug, help wanted');

	infoBanner.before(
		// Block and width classes required to avoid margin collapse
		React.createElement('div', { className: "Box mb-3 d-inline-block width-full"   ,}
, React.createElement('div', { className: "Box-row d-flex gap-3 flex-wrap"   ,}
, React.createElement('div', { className: "rgh-feature-description d-flex flex-column gap-2"   ,}
, React.createElement('h3', null
, React.createElement('code', null, id)
, React.createElement('clipboard-copy', {
							'aria-label': "Copy",
							'data-copy-feedback': "Copied!",
							value: id,
							class: "Link--onHover color-fg-muted d-inline-block ml-2"   ,
							tabindex: "0",
							role: "button",}

, React.createElement(CopyIcon, { className: "v-align-baseline",} )
)
)
 /* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */ 
, description && React.createElement('div', { dangerouslySetInnerHTML: {__html: description}, className: "h3",} )
, React.createElement('div', { className: "no-wrap",}
, React.createElement('a', { href: conversationsUrl.href, 'data-turbo-frame': "repo-content-turbo-frame",}, "Related issues" )
, ' • '
, React.createElement('a', { href: newIssueUrl.href, 'data-turbo-frame': "repo-content-turbo-frame",}, "Report bug" )
, 
							meta && isCss
								? React.createElement(React.Fragment, null, " • "  , React.createElement('a', { 'data-turbo-frame': "repo-content-turbo-frame", href: location.pathname.replace('.css', '.tsx'),}, "See .tsx file"  ))
								: meta?.css
									? React.createElement(React.Fragment, null, " • "  , React.createElement('a', { 'data-turbo-frame': "repo-content-turbo-frame", href: location.pathname.replace('.tsx', '.css'),}, "See .css file"  ))
									: undefined
						
)
)
, meta?.screenshot && (
					React.createElement('a', { href: meta.screenshot, className: "flex-self-center",}
, React.createElement('img', {
							src: meta.screenshot,
							className: "d-block border" ,
							style: {
								maxHeight: 100,
								maxWidth: 150,
							},}
						)
)
				)
)
),
	);
}

async function getDisabledReason(id) {
	// Block and width classes required to avoid margin collapse
	const classes = ['mb-3', 'd-inline-block', 'width-full'];
	// Skip dev check present in `getLocalHotfixes`, we want to see this even when developing
	const hotfixes = await brokenFeatures.get() ?? [];
	const hotfixed = hotfixes.find(([feature]) => feature === id);
	if (hotfixed) {
		const [_name, issue, unaffectedVersion] = hotfixed;

		if (unaffectedVersion) {
			return createBanner({
				text: React.createElement(React.Fragment, null, "This feature was disabled until version "      , unaffectedVersion, " due to "   , createRghIssueLink(issue), "."),
				classes,
				icon: React.createElement(InfoIcon, { className: "mr-0",} ),
			});
		}

		return createBanner({
			text: React.createElement(React.Fragment, null, "This feature is disabled due to "      , createRghIssueLink(issue), "."),
			classes: [...classes, 'flash-warn'],
			icon: React.createElement(AlertIcon, { className: "mr-0",} ),
		});
	}

	if (isFeatureDisabled(await optionsStorage.getAll(), id)) {
		return createBanner({
			text: 'You disabled this feature on GitHub.com.',
			classes: [...classes, 'flash-warn'],
			icon: React.createElement(AlertIcon, { className: "mr-0",} ),
			action: openOptions,
			buttonLabel: 'Refined GitHub Options',
		});
	}

	return undefined;
}

async function addDisabledBanner(infoBanner, id) {
	const reason = await getDisabledReason(id);
	if (reason) {
		infoBanner.before(reason);
	}
}

async function add(infoBanner) {
	const [, filename] = /source\/features\/([^.]+)/.exec(location.pathname) ?? [];
	// Enable link even on past commits
	const currentFeatureName = getNewFeatureName(filename);
	const meta = featuresMeta.find(feature => feature.id === currentFeatureName);

	// This ID exists whether the feature is documented or not
	const id = meta?.id ?? filename;

	addDescription(infoBanner, id, meta);
	await addDisabledBanner(infoBanner, id);
}

function init(signal) {
	observe('#repos-sticky-header', add, {signal});
}

const featureUrlRegex = /^(?:[/]refined-github){2}[/]blob[/][^/]+[/]source[/]features[/][^.]+[.](?:tsx|css)$/;

void features.add(import.meta.url, {
	include: [
		() => featureUrlRegex.test(location.pathname),
	],
	init,
});

/*

Test URLs:

- Regular feature: https://github.com/refined-github/refined-github/blob/main/source/features/sync-pr-commit-title.tsx
- CSS counterpart: https://github.com/refined-github/refined-github/blob/main/source/features/sync-pr-commit-title.css
- RGH feature: https://github.com/refined-github/refined-github/blob/main/source/features/rgh-feature-descriptions.css
- CSS-only feature: https://github.com/refined-github/refined-github/blob/main/source/features/center-reactions-popup.css
*/
