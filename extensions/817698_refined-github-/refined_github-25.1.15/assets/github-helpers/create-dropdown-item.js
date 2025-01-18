import React from '../npm/dom-chef.js';

function createDropdownItem({
	label,
	href,
	icon: Icon,
	...attributes
}) {
	return (
		React.createElement('li', {
			'data-targets': "action-list.items action-list.items" ,
			role: "none",
			'data-view-component': "true",
			className: "ActionListItem",
			...attributes,}

, React.createElement('a', {
				tabIndex: -1,
				href: href,
				role: "menuitem",
				'data-view-component': "true",
				className: "ActionListContent ActionListContent--visual16" ,}

, React.createElement('span', { className: "ActionListItem-visual ActionListItem-visual--leading" ,}
, React.createElement(Icon, null )
)

, React.createElement('span', { 'data-view-component': "true", className: "ActionListItem-label",}
, label
)
)

)
	);
}

export { createDropdownItem as default };
