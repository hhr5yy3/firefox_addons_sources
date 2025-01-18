const DEFAULT_TEXT_AREA_HEIGHT = '150px';
const LINK_FOR_RATE_FIREFOX = 'https://addons.mozilla.org/de/firefox/addon/ticket-templates-for-jira/';
const LINK_FOR_RATE_CHROME = 'https://chrome.google.com/webstore/detail/ticket-templates-for-jira/inmachhhbcehlpklfjgenplmgffbiiaf';
const LINK_FOR_RATE_EDGE = 'https://microsoftedge.microsoft.com/addons/detail/ticket-templates-for-jira/lnmjpnlhdeedhfffkpkiklimmhifkbkn';

UI = {
	addAnimationExpandToTextAreas() {
		document.querySelectorAll('textarea').forEach((textArea) => {
			textArea.onfocus = function () {
				this.style.height = this.scrollHeight > 50 ? this.scrollHeight + 'px' : DEFAULT_TEXT_AREA_HEIGHT;
				this.addClass('scroll');
			};
			// el.onfocusout does not work in chrome safari etc
			textArea.addEventListener('focusout', function () {
				this.style.height = 'auto';
				this.removeClass('scroll');
			});
		});
	},
	// set event for switching arrows up and down
	addAnimationOpenCloseArrowToSelects() {
		document.querySelectorAll('select.ticketType').forEach((elem) => {
			elem.onclick = function () {
				elem.hasClass('closed')
					? (elem.removeClass('closed'), elem.addClass('opened'))
					: (elem.removeClass('opened'), elem.addClass('closed'));
			};

			// just add closed class on blur
			elem.onblur = function () {
				elem.hasClass('closed') ? '' : (elem.removeClass('opened'), elem.addClass('closed'));
			};
		});
	},
	addDynamicViewportWidth() {
		// set sizing properties
		window.addEventListener('resize', () => {
			let vw = window.innerWidth * 0.01;
			document.documentElement.style.setProperty('--vw', vw + 'vw');
		});
	},
	// get over html an replace localization keys with actual words
	renderLocalizedStrings() {
		//Localize by replacing __MSG_***__ meta tags
		var objects = document.getElementsByTagName('html');
		for (var j = 0; j < objects.length; j++) {
			var obj = objects[j];

			var valStrH = obj.innerHTML.toString();
			var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
				return v1 ? chrome.i18n.getMessage(v1) : '';
			});

			if (valNewH != valStrH) obj.innerHTML = valNewH;
		}
	},
	// shows advanced menu
	expandAdvancedOptions() {
		// click first option for default opening
		document.querySelector('h3.collapsible').click();

		var advancedOptionsPanel = document.getElementById('advancedOptions');
		var templatesTable = document.getElementById('table');
		if (advancedOptionsPanel.style.maxHeight) {
			// hide options
			advancedOptionsPanel.style.maxHeight = null;
			advancedOptionsPanel.style['margin-bottom'] = '0';
			// show table
			templatesTable.removeAttribute('style');
			//templatesTable.style.maxHeight = templatesTable.scrollHeight + "px";
		} else {
			// show options
			advancedOptionsPanel.style.maxHeight = '1500px';
			advancedOptionsPanel.style['margin-bottom'] = '30px';
			// hide table
			templatesTable.style.maxHeight = 0;
		}
	},
	// set link to button for reviews
	getLinkToStoreBasedOnUsingBrowser() {
		if (typeof browser !== 'undefined') return LINK_FOR_RATE_FIREFOX;

		const isEdge = window.navigator.appVersion.toUpperCase().includes('EDG');

		if (isEdge) return LINK_FOR_RATE_EDGE;

		// else is chrome
		return LINK_FOR_RATE_CHROME;
	},
	/**
	 * shows or hide given element
	 * @param {string} elementSelector - needed for querySelector(elementSelector)
	 */
	showOrHideElement(elementSelector) {
		var elem = document.querySelector(elementSelector);
		elem.hasClass('hidden') ? elem.show() : elem.hide();
	},
	/**
	 * removes or adds given className
	 * @param {string} elementSelector - needed for querySelector(elementSelector)
	 * @param {string} className - needed for adding or removing form classList
	 */
	addOrRemoveClassFromElement(elementSelector, className) {
		var elem = document.querySelector(elementSelector);
		elem.hasClass(className) ? elem.removeClass(className) : elem.addClass(className);
	},
};
