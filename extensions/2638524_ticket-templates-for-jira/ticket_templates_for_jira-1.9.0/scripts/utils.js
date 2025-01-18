var wordDay = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_day');
var wordDays = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_days');
var wordHour = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_hour');
var wordHours = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_hours');
var wordMinute = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_minute');
var wordMinutes = chrome.i18n.getMessage('advanced_options_section4_my_stats_time_saved_minutes');

Utils = {
	/**
	 * shows a spinner for a given time
	 * @param {number} milliseconds - keep empty for default value 500
	 */
	showSpinner: function (milliseconds = 500) {
		var spinner = document.getElementById('spinner');
		spinner.classList.remove('hidden');
		setTimeout(function () {
			spinner.classList.add('hidden');
		}, milliseconds);
	},
	getAppVersion: function () {
		return chrome.runtime.getManifest().version;
	},
	checkEnvironment: function () {
		// deactive console.logs in production
		if (chrome.i18n.getMessage('DEV_MODE') == 'false') {
			console.log = function () {};
			console.debug = function () {};
			console.error = function (e) {};
			console.info = function () {};
			console.warn = function () {};
		} else {
			document.getElementsByTagName('TITLE')[0].innerText = 'DEV ' + Utils.getAppVersion();
			console.log(`Dev Mode: true`);
			console.log(`App Version: ${Utils.getAppVersion()}`);
		}
	},
	setElementValue: function (element, value) {
		document.querySelector(element).value = value;
	},
	getElementValue: function (element) {
		return document.querySelector(element).value;
	},
	setElementChecked: function (element, value) {
		document.querySelector(element).checked = value;
	},
	getElementChecked: function (element) {
		return document.querySelector(element).checked;
	},
	formatSecondsToReadableString(seconds) {
		seconds = Number(seconds);
		var d = Math.floor(seconds / (3600 * 24));
		var h = Math.floor((seconds % (3600 * 24)) / 3600);
		var m = Math.floor((seconds % 3600) / 60);

		var dDisplay = d > 0 ? d + (d == 1 ? ` ${wordDay}` : ` ${wordDays}`) : '';
		var hDisplay = h > 0 ? h + (h == 1 ? ` ${wordHour}` : ` ${wordHours}`) : '';
		var mDisplay = m > 0 ? m + (m == 1 ? ` ${wordMinute}` : ` ${wordMinutes}`) : '';
		return `${dDisplay} ${hDisplay} ${mDisplay}`.trim();
	},
	formatNumberThousandSeparator(number) {
		number += '';
		var x = number.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	createUUID: function () {
		return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
	},
	LocalStorage: {
		/**
		 *
		 * @param {string} key - name of localstorage variable
		 * @param {string} value - value to store
		 * @param {boolean} stringifyJSON - if value is json formatted it must be stringified (default = false)
		 */
		save: function (key, value, stringifyJSON = false) {
			stringifyJSON && localStorage.setItem(key, JSON.stringify([]));
			localStorage.setItem(key, value);
		},
		load: function (key, parseJSON = false) {
			if (parseJSON) {
				return JSON.parse(localStorage.getItem(key));
			} else {
				return localStorage.getItem(key);
			}
		},
		updateCustomLocator: function (objectProperty, newValue) {
			localStorage.customLocators = localStorage.customLocators.replace(
				Utils.LocalStorage.load('customLocators', true)['values'][objectProperty],
				newValue
			);
		},
		updateSyncronizedStorage: function () {
			chrome.storage.sync.set({ templates: localStorage.templates }, () => {});
			chrome.storage.sync.set({ options: localStorage.options }, () => {});
		},
	},
	makeElementsCollapsable: function () {
		var coll = document.getElementsByClassName('collapsible');

		for (let i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', function () {
				// close opened elements when open another one
				let openElement = document.getElementsByClassName('collapsible active')[0];
				openElement && openElement != this && openElement.click();
				this.classList.toggle('active');

				let elem = this.nextElementSibling;
				if (elem.style.maxHeight) {
					// change maxHeight, transition is defined in css
					elem.style.maxHeight = null;

					// do some margin and set the icon
					setTimeout(() => {
						this.style['margin'] = '0';
					}, 200);
					this.querySelector('span').innerText = 'keyboard_arrow_up';
				} else {
					// track opening section
					sectionName = this.innerText.toLowerCase().replace('\nkeyboard_arrow_up', '');

					elem.style.maxHeight = elem.scrollHeight + 'px';
					this.style['margin-bottom'] = '10px';
					this.querySelector('span').innerText = 'keyboard_arrow_down';
				}
			});
		}
	},
};

// add methods to elements and objects like svgs
// addClass, removeClass, hasClass, hide, show

HTMLElement.prototype.addClass = function (className) {
	this.classList.add(className);
};
HTMLElement.prototype.removeClass = function (className) {
	this.classList.remove(className);
};
HTMLElement.prototype.hasClass = function (className) {
	return this.classList.contains(className);
};

HTMLElement.prototype.show = function () {
	this.classList.remove('hidden');
};

HTMLElement.prototype.hide = function () {
	this.classList.add('hidden');
};

/* Object.prototype.addClass = function (className) {
	this.classList.add(className);
}; 
Object.prototype.removeClass = function (className) {
	this.classList.remove(className);
};
Object.prototype.hasClass = function (className) {
	return this.classList.contains(className);
};

Object.prototype.show = function () {
	this.classList.remove('hidden');
};

Object.prototype.hide = function () {
	this.classList.add('hidden');
};*/

// usage call on array.unique() to get an array containing only unique values
Array.prototype.unique = function () {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) a.splice(j--, 1);
		}
	}
	return a;
};

Array.prototype.move = function (from, to) {
	this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.isEmpty = function () {
	return !this.length;
};

String.prototype.toArray = function () {
	return this.split(',');
};
