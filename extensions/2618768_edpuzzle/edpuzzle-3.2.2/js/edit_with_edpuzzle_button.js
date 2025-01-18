"use strict";

const SORTED_WRAPPER_QUERY_SELECTORS = [
	'#actions.ytd-watch-metadata',
	'#info.ytd-video-primary-info-renderer',
	'#watch-headline-title'
];

var globalTimer;

function getElement() {
	var container;
	SORTED_WRAPPER_QUERY_SELECTORS.forEach(function (selector) {
		if (!container) container = document.querySelector(selector);
	});

	return container;
}

var EditWithEDpuzzleButton = {
	el: null,
	url: "",
	_onClicked: function () {
		var url = `https://edpuzzle.com/media/edit?url=${encodeURIComponent(window.location.href)}`
		window.open(url, "_blank");
	},
	render: function () {

		// 3. Insert the button unless it exists already
		if (!document.querySelector('.edit-with-edpuzzle') && this.el) {

			if (globalTimer) {
				clearInterval(globalTimer);
				globalTimer = undefined;
				this.el = getElement();
			}

			var edpuzzleBtn = document.createElement('div');

			// 1. Create the image container div
			var edpuzzleBtnImage = document.createElement('img');
			edpuzzleBtn.className = 'edit-with-edpuzzle';

			// 2. Create container image & insert it inside the container div
			edpuzzleBtnImage.src = chrome.extension.getURL("../images/edpuzzle-edit-button.png");
			edpuzzleBtnImage.width = '150';
			edpuzzleBtnImage.alt = 'Edit with edpuzzle';
			edpuzzleBtn.appendChild(edpuzzleBtnImage);

			edpuzzleBtnImage.addEventListener('click', EditWithEDpuzzleButton._onClicked, true);

			// 4. Insert the HTML inside YouTube
			this.el.insertAdjacentElement('beforeend', edpuzzleBtn);

		} else {
			this.el = getElement();
			if (!globalTimer) {
				globalTimer = setInterval(this.render, 1000);
			}
		}

	},
	start: function () {
		this.el = getElement();
		// Render the button inside YouTube
		this.render();
	}
};

EditWithEDpuzzleButton.start();

