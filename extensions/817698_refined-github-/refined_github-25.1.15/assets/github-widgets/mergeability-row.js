import React from '../npm/dom-chef.js';

function createMergeabilityRow({
	className = '',
	action,
	icon,
	iconClass = '',
	heading,
	meta,
}) {
	return (
		React.createElement('div', { className: `branch-action-item ${className}`,}
, React.createElement('div', {
				className: "branch-action-btn float-right js-immediate-updates js-needs-timeline-marker-header"   ,}

, action
)
, React.createElement('div', {
				className: `branch-action-item-icon completeness-indicator ${iconClass}`,}

, icon
)
, React.createElement('h3', { className: "h4 status-heading" ,}
, heading
)
, React.createElement('span', { className: "status-meta",}
, meta
)
)
	);
}

export { createMergeabilityRow as default };
