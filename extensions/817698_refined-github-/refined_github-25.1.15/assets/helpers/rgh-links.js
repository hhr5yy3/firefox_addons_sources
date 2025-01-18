import React from '../npm/dom-chef.js';

function createRghIssueLink(issueNumber) {
	const issueUrl = `https://github.com/refined-github/refined-github/issues/${issueNumber}`;
	return (
		React.createElement('a', {
			target: "_blank",
			rel: "noopener noreferrer" ,
			'data-hovercard-type': "issue",
			'data-hovercard-url': issueUrl + '/hovercard',
			href: issueUrl,}
, "#"
, issueNumber
)
	);
}

function getFeatureUrl(id) {
	return `https://github.com/refined-github/refined-github/blob/main/source/features/${id}.tsx`;
}

export { createRghIssueLink, getFeatureUrl };
