import React from '../npm/dom-chef.js';
import XIcon from '../npm/octicons-plain-react-components-X.js';
import elementReady from '../npm/element-ready.js';

/** https://primer.style/css/components/alerts */
async function addNotice(
	message,
	{
		type = 'notice',
		action = (
			React.createElement('button', { className: "flash-close js-flash-close" , type: "button", 'aria-label': "Dismiss this message"  ,}
, React.createElement(XIcon, null )
)
		),
	} = {},
) {
	const container = await elementReady('#js-flash-container');
	container.append(
		React.createElement('div', { className: `flash flash-full flash-${type} px-4`,}
, action
, React.createElement('div', null
, message
)
),
	);
}

export { addNotice as default };
