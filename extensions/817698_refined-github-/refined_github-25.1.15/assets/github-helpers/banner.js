import React from '../npm/dom-chef.js';

// Classes copied from "had recent pushes" banner from repo home
const classes = 'flex-shrink-0 btn btn-sm ml-sm-3 mt-2 mt-sm-n2 mb-sm-n2 mr-sm-n1 flex-self-center';

// This could be a `<Banner/>` element but dom-chef doesn't pass props
// https://github.com/vadimdemedes/dom-chef/issues/77
function createBanner(props) {
	let button;

	if (typeof props.action === 'string') {
		button = (
			React.createElement('a', { href: props.action, className: classes,}
, props.buttonLabel
)
		);
	} else if (typeof props.action === 'function') {
		button = (
			React.createElement('button', { type: "button", className: classes, onClick: props.action,}
, props.buttonLabel
)
		);
	}

	return (
		React.createElement('div', { className: ['flash', ...props.classes ?? ''].join(' '),}
, React.createElement('div', { className: "d-sm-flex flex-items-center gap-2"  ,}
, React.createElement('div', { className: "d-flex flex-auto flex-self-center flex-items-center gap-2"    ,}
, props.icon
, React.createElement('span', null, props.text)
)
, button
)
)
	);
}

export { createBanner as default };
