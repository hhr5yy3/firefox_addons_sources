import React from '../npm/dom-chef.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import StopIcon from '../npm/octicons-plain-react-components-Stop.js';
import oneEvent from '../npm/one-event.js';
import delay from '../helpers/delay.js';
import { frame } from '../helpers/dom-utils.js';
import { assertError } from '../npm/ts-extras-assert-error.js';

function ToastSpinner() {
	return (
		React.createElement('svg', { className: "Toast--spinner", viewBox: "0 0 32 32"   , width: "18", height: "18",}
, React.createElement('path', { fill: "#959da5", d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"                               ,} )
, React.createElement('path', { fill: "#ffffff", d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"                 ,} )
)
	);
}



async function showToast(
	task,
	{
		message = 'Bulk actions currently being processed.',
		doneMessage = 'Bulk action processing complete.',
	}


 = {},
) {
	const iconWrapper = React.createElement('span', { className: "Toast-icon",}, React.createElement(ToastSpinner, null ));
	const messageWrapper = React.createElement('span', null, message);
	const toast = (
		React.createElement('div', {
			role: "log",
			style: {zIndex: 101},
			className: "rgh-toast position-fixed bottom-0 right-0 ml-5 mb-5 Toast Toast--loading Toast--animateIn"        ,}

, iconWrapper
, React.createElement('span', { className: "Toast-content py-2" ,}
, React.createElement('div', { style: {fontSize: '10px', color: 'silver', marginBottom: '-0.3em'},}, "Refined GitHub" )
, messageWrapper
)
)
	);
	const updateToast = (message) => {
		messageWrapper.textContent = message;
	};

	const finalUpdateToast = async (message) => {
		updateToast(message);

		// Without rAF the toast might be removed before the first page paint
		// rAF also allows showToast to resolve as soon as task is done
		await frame();

		const displayTime = message.split(' ').length * 300 + 2000;
		await delay(displayTime);

		// Display time is over, animate out
		toast.classList.replace('Toast--animateIn', 'Toast--animateOut');
		await oneEvent(toast, 'animationend');
		toast.remove();
	};

	document.body.append(toast);
	await delay(30); // Without this, the Toast doesn't appear in time

	let finalToastMessage = 'Unknown error';
	try {
		if (task instanceof Error) {
			throw task;
		}

		if (typeof task === 'function') {
			await task(updateToast);
		} else {
			await task;
		}

		toast.classList.replace('Toast--loading', 'Toast--success');
		finalToastMessage = doneMessage;
		iconWrapper.firstChild.replaceWith(React.createElement(CheckIcon, null ));
	} catch (error) {
		assertError(error);
		toast.classList.replace('Toast--loading', 'Toast--error');
		finalToastMessage = error.message;
		iconWrapper.firstChild.replaceWith(React.createElement(StopIcon, null ));
		throw error;
	} finally {
		// Use the last message if `false` was passed
		void finalUpdateToast(finalToastMessage || messageWrapper.textContent);
	}
}

export { showToast as default };
