import React from '../npm/dom-chef.js';
import { lastElement } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import RocketIcon from '../npm/octicons-plain-react-components-Rocket.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function addLink(header) {
	const lastDeployment = lastElement('.js-timeline-item a[title="Deployment has completed"]');
	if (!lastDeployment) {
		return;
	}

	header.prepend(
		React.createElement('a', {
			className: "rgh-last-deployment btn btn-sm d-none d-md-block mr-1"     ,
			target: "_blank", // Matches GitHub’s own behavior
			rel: "noopener noreferrer" ,
			href: lastDeployment.href,}

, React.createElement(RocketIcon, { className: "mr-1 v-align-text-top" ,} ), "Latest deployment"

),
	);
}

function init(signal) {
	observe('.gh-header-actions', addLink, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	awaitDomReady: true, // Must select last item on the page
	init,
});

// TODO: Needs a URL with multiple deployments and deactivated deployments
/*
Test URLs:
https://github.com/fregante/bundle/pull/2
*/
