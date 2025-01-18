function setDate(x) {
	var date = x.date || '.date';
	var time = x.time || '.time';

	setInterval(function () {
		document.querySelector(date).textContent = getTimeAndDate().date;
		document.querySelector(time).textContent = getTimeAndDate().time;
	}, 1000);
}

function getTimeAndDate() {
	var obj = {};
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	var wekdayName = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	var date = new Date();
	obj.date = (
		wekdayName[date.getDay() + 0] +
		', ' +
		monthNames[date.getMonth() + 0] +
		' ' +
		date.getDate()
	).toString();
	obj.time = (
		changeTimeFormatTo12Hr(date).hours +
		':' +
		changeTimeFormatTo12Hr(date).minutes +
		' ' +
		changeTimeFormatTo12Hr(date).unit
	).toString();
	return obj;
}

function changeTimeFormatTo12Hr(date) {
	var hours = date.getHours(),
		minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var unit = getMeridianFromHour(hours);
	hours = hours % 12;
	hours = hours == 0 ? 12 : hours;

	return {
		hours: hours,
		minutes: minutes,
		unit: unit
	};
}

function getMeridianFromHour(hour) {
	hour = hour % 24;
	return hour < 12 ? 'am' : 'pm';
}


//Widget

window.Widget = function (queryP) {
	this.queryP = queryP || {};
	this.doc = {
		n_click: 'n-widgetclick',
		n_action: 'n-widgetaction',
		n_target: 'n-widgettarget'
	};
	this.toggleClassName = this.queryP.toggleClassName || 'active';
	this.n_clicks = document.querySelectorAll(`[${this.doc.n_click}]`);
	this.n_actions = document.querySelectorAll(`[${this.doc.n_action}]`);
	window.old_target_value = null;
	window.mouseOnWidgetFlag = false;
};

Widget.prototype.removeClass = function (elem, className) {
	try {
		if (elem) {
			this.filter(elem, function (item, index) {
				if (item) {
					item.classList.remove(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.addClass = function (elem, className) {
	try {
		if (elem) {
			this.filter(elem, function (item, index) {
				if (item) {
					item.classList.add(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.toggleClass = function (elem, className) {
	try {
		if (elem) {
			this.filter(elem, function (item, index) {
				if (item) {
					item.classList.toggle(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.filter = function (el, cb) {
	let count = 0;
	try {
		if (el.length > 0) {
			while (count < el.length) {
				cb(el[count], count);
				count++;
			}
		}
	} catch (e) {
		console.log('error@ filter Function' + e);
	}
};

Widget.prototype.widgetHideOn = function () {
	try {
		const _this = this;
		_this.queryP.widgetHideOn.forEach((item) => {
			const elem =
				item.event == 'document'
					? [document]
					: document.querySelectorAll(item.event);

			_this.filter(elem, function (elemItem, count) {
				elemItem.addEventListener('click', (e) => {
					item.target.forEach((target) => {
						_this.removeClass(
							document.querySelectorAll(target.event),
							_this.toggleClassName
						);
					});
				});
			});
		});
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.firstLoadRender = function (callBack) {
	const _this = this;

	if (_this.queryP.firstLoad.attribute) {
		window.old_target_value = _this.queryP.firstLoad.attribute;
		const storageItem = _this.queryP.firstLoad.storage.item;
		const storageValue = _this.queryP.firstLoad.storage.value;
		try {
			const elements = document.querySelectorAll(
				`[n-widgetclick=${window.old_target_value}],[n-widgetaction=${window.old_target_value}],[n-widgettarget=${window.old_target_value}]`
			);

			if (!storageReplacer.getLocalStorageItem(storageItem)) {
				storageReplacer.setLocalStorageItem(storageItem, storageValue);
				// _this.filter(elements, function(els, idx) {
				// 	// els.classList.toggle(_this.toggleClassName);
				// });
				typeof callBack == 'function' && callBack(true);
			} else {
				typeof callBack == 'function' && callBack(false);
			}
		} catch (e) {
			typeof callBack == 'function' && callBack(false);
			console.error('Error finding the first load attribute at Widget Feature');
		}
	}
};

Widget.prototype.init = function (callBack) {
	// Loop for the click
	const _this = this;
	try {
		_this.filter(_this.n_clicks, function (elementItems, count) {
			elementItems.addEventListener('click', (e) => {
				const callBackObj = {};
				let THIS = e.currentTarget;
				const THIS_TARGET = THIS.getAttribute(_this.doc.n_target);
				callBackObj.clickElement = THIS;

				callBackObj.hasTarget = THIS_TARGET ? true : false;

				if (callBackObj.hasTarget) callBackObj.targetValue = THIS_TARGET;

				callBackObj.hasClickValue = THIS.getAttribute(_this.doc.n_click)
					? true
					: false;

				callBackObj.clickValue = THIS.getAttribute(_this.doc.n_click) || '';

				callBackObj.hasAction = THIS.parentElement.querySelector(
					`[${_this.doc.n_action}]`
				)
					? true
					: false;

				if (callBackObj.hasAction) {
					callBackObj.actionElement = THIS.parentElement.querySelector(
						`[${_this.doc.n_action}]`
					);

					callBackObj.actionValue = callBackObj.actionElement.getAttribute(
						_this.doc.n_action
					);
				}

				if (THIS_TARGET) {
					THIS = document.querySelector(
						`[${_this.doc.n_click}=${THIS_TARGET}]`
					);
				}

				/*
				 * CHECK IF THIS CLICK ELEMENT HAS ACTIVE TARGET ATTRIBUTE AND ITS VALUE
				 */

				const IS_ACTIVE_TARGET =
					_this.queryP.hasOwnProperty('activateTarget') &&
					_this.queryP.activateTarget;

				if (IS_ACTIVE_TARGET) {
					const CLICK_HAS_ATTR = THIS.getAttribute(_this.doc.n_click);
					const CLICK_HAS_TARGET = THIS.hasAttribute(_this.doc.n_target);
					let targetAtt1 = CLICK_HAS_ATTR
						? document.querySelectorAll(
							`[${_this.doc.n_target}=${CLICK_HAS_ATTR}]`
						)
						: document.querySelectorAll(
							`[${_this.doc.n_target}=${THIS_TARGET}]`
						);

					if (
						!CLICK_HAS_ATTR ||
						(!CLICK_HAS_TARGET && window.old_target_value != CLICK_HAS_ATTR)
					) {
						_this.removeClass(
							document.querySelectorAll(`[${_this.doc.n_target}]`),
							_this.toggleClassName
						);
					}

					_this.toggleClass(targetAtt1, _this.toggleClassName);

					window.old_target_value = CLICK_HAS_ATTR;
				}

				// Filter Function
				_this.filter(_this.n_clicks, (item) => {
					if (THIS != item) {
						if (item.parentElement.querySelector(`[${_this.doc.n_action}]`)) {
							_this.removeClass(
								[
									item,
									item.parentElement.querySelector(`[${_this.doc.n_action}]`)
								],
								_this.toggleClassName
							);
						}
					}
				});

				_this.toggleClass(
					[
						THIS,
						THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
							? THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
							: ''
					],
					_this.toggleClassName
				);
				if (THIS.classList.contains(_this.toggleClassName)) {
					callBackObj.clickIsActive = true;
				} else {
					callBackObj.clickIsActive = false;
				}

				if (
					THIS.parentElement.querySelector(`[${_this.doc.n_action}]`) &&
					THIS.parentElement
						.querySelector(`[${_this.doc.n_action}]`)
						.classList.contains(_this.toggleClassName)
				) {
					callBackObj.actionIsActive = true;
				} else {
					callBackObj.actionIsActive = false;
				}

				if (typeof callBack == 'function') {
					callBack(callBackObj);
				}
			});
		});

		_this.filter([..._this.n_clicks, ..._this.n_actions], function (el, i) {
			el.addEventListener('mouseover', (e) => {
				mouseOnWidgetFlag = false;
			});

			el.addEventListener('mouseout', (e) => {
				mouseOnWidgetFlag = true;
			});
		});

		document.addEventListener('click', (e) => {
			const callObj = {};
			callObj.actionElement = null;
			callObj.actionIsActive = false;
			callObj.actionValue = null;
			callObj.clickElement = e.target;
			callObj.clickIsActive = false;
			callObj.clickValue = "document";
			callObj.hasAction = false;
			callObj.hasClickValue = false;
			callObj.hasTarget = false;

			if (mouseOnWidgetFlag) {
				_this.removeClass(_this.n_clicks, _this.toggleClassName);
				_this.removeClass(_this.n_actions, _this.toggleClassName);

				if (typeof callBack == 'function') {
					callBack(callObj);
				}
			}

		});

		if (_this.queryP.hasOwnProperty('widgetHideOn')) {
			_this.widgetHideOn();
		}
	} catch (e) {
		console.log(e);
	}
};

// alarm and clock variables
const addAlarmBtn = document.querySelector('.addAlarmBtn');
const addAlarmListBtn = document.querySelector('.addAlarmListBtn');
const noAlarmBlock = document.querySelector('.noAlarmBlock');
const createAlarmBlock = document.querySelector('.createAlarmBlock');
const alarmsListBlock = document.querySelector('.alarmsListBlock');
const saveButton = document.querySelector('#saveButton');
const volumneLabels = document.querySelectorAll('.volCount');
const allAlarmFormKeys = [];
const soundSwitch = document.querySelector('#sound');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');
const volumeWrap = document.querySelector('.volumeWrap');
const alarmsListWrap = document.querySelector('.alarmsListWrap');
const alarmFormCancelButton = document.querySelector('#cancelButton');
const alarmForm = document.querySelector("#alarmForm");
const alarmErrorBlockOverlay = document.querySelector('.alarmErrorBlockOverlay');
const errorOverlayMsgTxt = document.querySelector('.alarmErrorBlockOverlay .errorMsgTxt');
const errorOverlayBackBtn = document.querySelector('.errorGoBackBtn');
const audioRadioButtons = document.querySelectorAll('.volumeWrap input[type="radio"]');
let currentlyPlayingAudio = null; // Track the currently playing audio element
let existingAlarmData;
const dayMapping = {
	'sunday': 'Sun',
	'monday': 'Mon',
	'tuesday': 'Tue',
	'wednesday': 'Wed',
	'thursday': 'Thu',
	'friday': 'Fri',
	'saturday': 'Sat'
};
// clock
let customisationOptionsData;
let existingTimeZoneData;
const currentClassName = 'current';
const otherClassName = 'timeZone';
let allTimeZonesList = ''
let activeTimeZones = [];
const datepickerInput = document.querySelector('#datepicker');
const colorPickerIconWrap = document.querySelector('.colorPickerIconWrap');
const colorInputBlock = document.querySelector('.colorInputBlock');
const colourPickerWrap = document.querySelector('.colourPickerWrap');
const clockCustomiseBtn = document.querySelector('.clockCustomiseBtn');
const clockHomeBlock = document.querySelector('.clockHomeBlock');
const clockCustomisationBlock = document.querySelector('.clockCustomisationBlock');
const CustomisationBackBtn = document.querySelector('.headerBackBtn');
const tabContainer = document.querySelector('.tab-container');
const colorPalette = document.querySelector('.colorPalette');
var timeSystemRadios = document.querySelectorAll('input[name="time-system-group"]');
var timeFormatRadios = document.querySelectorAll('input[name="time-format-group"]');
const timeZoneInput = document.querySelector('.countyInputWrap input');
const clockDateInputWrap = document.querySelector('.clockDateInputWrap input');
const currentLocationData = {};
let currentTimeZone = '';
let currentLocationTimeData;
let selectedDate;
const intervalIds = [];
let datepickerVisible = false;
const currentCountryClockElement = document.querySelector('.countryClockWrap.current');
const customisationFormDefaultVal = { timeSystem: 12, timeFormat: 'second', fontSize: 21, fontColor: '#06131b' }
const defaultColor = '#06131B';
colors = ['#06131B', '#414141', '#606060', '#A9A9A9', '#BDBDBD', '#CCCCCC', '#DEDEDE', '#E9E9E9', '#FBFBF8', '#EFCACA', '#F8E4CB', '#FCF1C9', '#D9EAD1', '#D0DFE1', '#CADAF8', '#D0E0F2', '#D7D1E8', '#F31AFE', '#E19797', '#F8E4CB', '#FAE395', '#B7D5A5', '#A5C2C7', '#CADAF8', '#A4C3E7', '#B2A4D5', '#E6CFDB', '#D46565', '#EDAF68', '#F9D763', '#96C27B', '#7CA3AD', '#779DEB', '#78A6DB', '#8D7BC2', '#CFA4BB', '#BF0101', '#DC8F35', '#E9BF2E', '#70A64D', '#50808D', '#4F78D8', '#5084C5', '#6750A6', '#BA7A9E', '#8F0000', '#AA5E01', '#B78E00', '#42741F', '#27505C', '#3457CC', '#295493', '#392375', '#6D2148', '#600100', '#714000', '#795F00', '#2F4E17', '#1C373F', '#2E4786', '#1D3A63', '#26194E', '#491833'];
// alarm and clock variables






function triggerCloseWidget(widget) {
	widget.removeClass(
		document.querySelectorAll(
			'[n-widgetClick],[n-widgetaction], [n-widgettarget]'
		),
		'active'
	);
}

function triggerOpenWidget() {
	new Widget().addClass(
		document.querySelectorAll(
			'[n-widgetClick],[n-widgetaction], [n-widgettarget]'
		),
		'active'
	);
}


// function loadOnAcceptPII() {
//     showLocationBasedOnIndex();
//     setInitialSwitches();
// 	//displayWeatherNews();
// 	setTimeout(() => { $('#slider_container').slick('refresh'); }, 2000);
//     showCard(0).then(function () {
//         if (!!getStorageItem('nextCard')) {
//             showCard(1).then(function () {

//             });
//         }

//         // linkOutTemperatureUpdate();
//     });
// }


window.addEventListener('DOMContentLoaded', function(e) {
	storageReplacer.init().then(function () {
		setDate({
			date: '#custdate',
			time: '#custtime'
		});


		var widget = new Widget({

			activateTarget: true,
			firstLoad: {
				attribute: 'mainWidget',
				storage: {
					item: 'onboarding',
					value: '1'
				}
			}
		});

		widget.init();

		widget.firstLoadRender(function (d) {
			let check = storageReplacer.getLocalStorageItem("state");
			if (check == "Closed1" || check == "Closed2" || check == "Changed") {
				$('.replacement-linkout').show();
				// $('.widget-blck,.header-pill-wrap').hide();
			}
			// $('.link-out').removeClass('active');
			// $('.header-popup').removeClass('active');
		});

		checkPiiStored();

		document.addEventListener('searchTextChanged', function () {
			triggerCloseWidget(widget);
		});

		// all Event Listners for Alarm & Clock
		allEventListners();
		// function to initially open the Aalarm tab
		openTab('alarmTab', 'alarmContent');
		// Get set Alarms data from LocalStorage
		existingAlarmData = getAlarmData();
		// Set the initial screen for the alarm tab based on local storage data, render alarms list UI if true.
		initializeAlarmTabScreen(true);

		// clock
		// get customisation data from LocalStorage
		customisationOptionsData = getCustomisationData();
		// Handle customisation options
		if (customisationOptionsData) {
			// Set customisation form values
			setCustomisationFormValues(customisationOptionsData);

			// Change clock font size and select font color
			changeClockFontSize(customisationOptionsData.fontSize, false);
			selectFontColor('', customisationOptionsData.fontColor, false);
		} else {
			// Set default customisation form values
			setCustomisationFormValues(customisationFormDefaultVal);
			storageReplacer.setLocalStorageItem('customisationOptions', JSON.stringify(customisationFormDefaultVal));
			customisationOptionsData = getCustomisationData();
		}
		// get added timeZone data from LocalStorage
		existingTimeZoneData = getTimeZoneData();
        TurnOffAlarm();


		async function initializeClockData() {
			try {

				// Fetch the current location				
				currentTimeZone = await moment.tz.guess(true);
				// Set a default timezone
				moment.tz.setDefault(currentTimeZone);
				// Fetch the current location timeZone info			
				const currentTimeZoneData = await getTimeZoneInfo(currentTimeZone);
				//create clock card for cueerent TimeZone
				createClockCard(currentClassName, false, false)
				// Set clock data for the current timeZone, pass className
				await updateClockDisplay(currentTimeZoneData, currentClassName, '');
				activeTimeZones.push(currentTimeZoneData);

				allTimeZonesListWithData = await getAllTimeZoneInfo()
				// set timeZone autocoplete
				tzAutocomplete(allTimeZonesListWithData);

				// Fetch existing time zone data
				if (existingTimeZoneData) {
					activeTimeZones.push(...existingTimeZoneData);
					const timeZoneData = await getExistingTimeZoneData(existingTimeZoneData.timeZone);
					if (timeZoneData) {
						// Create a clock card for the existing time zone
						createClockCard(otherClassName, true, true);
						// Set clock data for the existing time zone
						await updateClockDisplay({ timeZone: timeZoneData.timeZone, UTC: timeZoneData.UTC, utcOffset: timeZoneData.utcOffset }, otherClassName);
					}
				}
				// set timeZone auto Complete dropdown
				setDropdown();

				//Remove current TimeZone from list of timeZone		
				// availableTags = availableTags.filter(tags => tags.timeZone !== currentTimeZone);

			} catch (error) {
				console.error('An error occurred:', error);
			}
		}

		// Call the initializeClockData function to initiate the sequence
		initializeClockData();
	})
});




// Alarm and clock js

// Sorting Alarm
function updateAlarmOrder(alarms) {
	const currentTime = new Date();
	const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

	// Define the order of days of the week starting from the current day
	const dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const currentDayIndex = dayOrder.indexOf(currentDay);

	// Rotate the dayOrder array so that it starts with the current day
	const rotatedDayOrder = dayOrder.slice(currentDayIndex).concat(dayOrder.slice(0, currentDayIndex));

	const sortedAlarms = alarms.sort((a, b) => {
		// Convert day properties to arrays if they are not already
		const dayA = Array.isArray(a.day) ? a.day : [a.day];
		const dayB = Array.isArray(b.day) ? b.day : [b.day];

		// Find the index of the current day within the arrays
		const dayIndexA = dayA.indexOf(currentDay);
		const dayIndexB = dayB.indexOf(currentDay);

		if (dayIndexA !== -1 && dayIndexB !== -1) {
			// If both alarms have the current day, compare times
			const timeA = a.hours * 60 + a.minutes;
			const timeB = b.hours * 60 + b.minutes;
			return timeA - timeB;
		} else if (dayIndexA !== -1) {
			// If only alarm A has the current day, prioritize it
			return -1;
		} else if (dayIndexB !== -1) {
			// If only alarm B has the current day, prioritize it
			return 1;
		} else {
			// If neither alarm has the current day, use the rotatedDayOrder
			const dayIndexA = rotatedDayOrder.indexOf(dayA[0]);
			const dayIndexB = rotatedDayOrder.indexOf(dayB[0]);
			if (dayIndexA === dayIndexB) {
				const timeA = a.hours * 60 + a.minutes;
				const timeB = b.hours * 60 + b.minutes;
				return timeA - timeB;
			}
			return dayIndexA - dayIndexB;
		}
	});

	return sortedAlarms;
}


function setInitialSection(renderAlarms = false) {
	if (existingAlarmData && existingAlarmData.length > 0) {
		if (renderAlarms === true) {
			existingAlarmData = updateAlarmOrder(existingAlarmData)
			existingAlarmData.forEach(data => {
				setAlarmUI(data);
			});
		}
		noAlarmBlock.classList.add('hide');
		createAlarmBlock.classList.add('hide');
		alarmsListBlock.classList.remove('hide');
	} else {
		noAlarmBlock.classList.remove('hide');
		createAlarmBlock.classList.add('hide');
		alarmsListBlock.classList.add('hide');
	}
}

function initializeAlarmTabScreen(renderAlarmsRequested = false) {
	try {
		const hasExistingAlarms = existingAlarmData && existingAlarmData.length > 0;

		if (hasExistingAlarms) {
			if (renderAlarmsRequested) {
				existingAlarmData = updateAlarmOrder(existingAlarmData);
				existingAlarmData.forEach(data => {
					setAlarmUI(data);
				});
			}

			hideElements(noAlarmBlock, createAlarmBlock);
			showElement(alarmsListBlock);
		} else {
			showElement(noAlarmBlock);
			hideElements(createAlarmBlock, alarmsListBlock);
		}
	} catch (error) {
		console.error('An error occurred:', error);
		// Handle the error or log it as needed
	}
}



// Function to open a tab and hide others
function openTab(tabId, contentId) {
	const tabs = document.querySelectorAll('.tab');
	const tabContents = document.querySelectorAll('.tab-content');

	// Hide all tab content elements
	tabContents.forEach(content => {
		content.style.display = 'none';
	});

	// Remove 'active' class from all tabs
	tabs.forEach(tab => {
		tab.classList.remove('active');
	});

	// Show the selected tab content
	document.getElementById(contentId).style.display = 'block';

	// Add 'active' class to the selected tab
	document.getElementById(tabId).classList.add('active');
}
//get alarm data
function getAlarmData() {
	if (storageReplacer.getLocalStorageItem('alarms') !== undefined) {
		const alarmsJSON = storageReplacer.getLocalStorageItem('alarms');
			if (alarmsJSON !== null) {
				return JSON.parse(alarmsJSON);
			}
			return null;
	}
}
function openCrateAlarmForm() {
	noAlarmBlock.classList.add('hide');
	alarmsListBlock.classList.add('hide');
	createAlarmBlock.classList.remove('hide');
	setDefaultFormData();
}
function setDefaultFormData() {
	const currentDate = new Date();
	setDefaultDay(currentDate);
	setDefaultTime(currentDate);
}
function setDefaultDay(date) {
	const currentDayOfWeek = date.getDay();
	const checkboxIds = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
	const currentCheckboxId = checkboxIds[currentDayOfWeek];
	const currentCheckbox = document.getElementById(currentCheckboxId);

	// Check the corresponding checkbox for the current day
	if (currentCheckbox) {
		currentCheckbox.checked = true;
	}
}
function setDefaultTime(date) {
	const hoursInput = document.getElementById('hours');
	const minutesInput = document.getElementById('minutes');

	// Get the current hour (0-23)
	const currentHour = date.getHours();
	hoursInput.value = currentHour.toString().padStart(2, '0');

	// Get the current minute (0-59)
	const currentMinutes = date.getMinutes();
	minutesInput.value = currentMinutes.toString().padStart(2, '0');
}
function createAlarm() {
	const alarmForm = document.querySelector("#alarmForm");
	const formData = new FormData(alarmForm);
	const data = {};

	const allAlarmFormInput = document.querySelectorAll('#alarmForm input')
	allAlarmFormInput.forEach(key => {
		const keyname = key.getAttribute('name');
		if (!allAlarmFormKeys.includes(keyname)) {
			allAlarmFormKeys.push(keyname);
		}
	})

	formData.forEach((value, key) => {
		if (data[key]) {
			if (!Array.isArray(data[key])) {
				data[key] = [data[key]];
			}
			data[key].push(value.trim());
		} else {
			data[key] = value.trim();
		}
	});
	const isAllFieldsValid = checkAlarmRequiredField(data);
	const isAlarmNotPresent = isAlarmNotExist(data);

	if (isAllFieldsValid !== true) {
		var falseProperties = [];
		for (var key in isAllFieldsValid) {
			if (isAllFieldsValid.hasOwnProperty(key) && isAllFieldsValid[key] === false) {
				falseProperties.push(key);
			}
		}
		showError(falseProperties)
	} else if (isAlarmNotPresent !== true) {
		showError(['alarmExist'])
	}
	if (isAllFieldsValid === true && isAlarmNotPresent) {
		let nextId = 1;
		if (!(existingAlarmData)) {
			existingAlarmData = [];
		} else {
			const maxId = Math.max(...existingAlarmData.map(alarm => alarm.id));
			nextId = maxId + 1;
		}
		data.id = nextId;
		data.active = true;
		existingAlarmData.push(data);
		AlarmHandler.Create(data);
		storageReplacer.setLocalStorageItem('alarms', JSON.stringify(existingAlarmData));

		//setAlarmUI(data);
		// empty list and add sorted alarm
		$(".alarmsListWrap").empty()
		initializeAlarmTabScreen(true)
		alarmForm.reset();
		closeSoundPopup();
		noAlarmBlock.classList.add('hide');
		createAlarmBlock.classList.add('hide');
		alarmsListBlock.classList.remove('hide');
	}
}
function showError(data) {
	if (data[0].indexOf('day') !== -1) {
		errorOverlayMsgTxt.textContent = escapeHtml('To set the alarm, you must select a day of the week');
	} else if (data[0].indexOf('hours') !== -1 || data[0].indexOf('minutes') !== -1) {
		errorOverlayMsgTxt.textContent = escapeHtml('Invalid time input');
	} else if (data[0].indexOf('alarmExist') !== -1) {
		errorOverlayMsgTxt.textContent = escapeHtml('Alarm already exists');
	}
	alarmErrorBlockOverlay.classList.remove('hide');
	// data.forEach(key => {
	// 	errorOverlayMsgTxt.textContent = `To set the alarm, you must select a ${key} of the week`;
	// 	alarmErrorBlockOverlay.classList.remove('hide');
	// })
}
function disableErrorOverlay() {
	alarmErrorBlockOverlay.classList.add('hide');
	errorOverlayMsgTxt.textContent = escapeHtml('');
}
function setAlarmUI(data) {
	let daytxt = '';
	if (!!data.day) {
		if (Array.isArray(data.day)) {
			if (data.day.length === 7) {
				daytxt = 'Daily';
			} else if (data.day.length > 2) {
				const abbreviatedDay = data.day.map(fullDay => dayMapping[fullDay.toLowerCase()]);
				daytxt = (data.repeatWeekly ? 'Every ' : '') + abbreviatedDay.join(', ');
			} else {
				daytxt = (data.repeatWeekly ? 'Every ' : '') + data.day.join(', ');
			}
		} else {
			daytxt = (data.repeatWeekly ? 'Every ' : '') + data.day;
		}
	}
	// Create the HTML for the alarm card
	const alarmCard = `
	  <div class="alarmBlock" data-alarmId="${data.id}">
		<div class="alarmDetailWrap">
		  <div class="alarmTimeDetail">
			<span class="alarmTime">${data.hours}:${data.minutes}</span>
		  </div>
		  <div class="alarmNameWrap">
		  	<div title="${data.name}" class="alarmNametxt ${data.name ? '' : 'hide'}">${data.name}
			  <span>
				<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
				  <circle cx="2.1543" cy="2.22461" r="1.9668" fill="#98AAB3"/>
				</svg>
			  </span>
			</div>
			<div class="alarmDaysWrap">${daytxt}</div>
		  </div>
		</div>
		<div class="alarmSettingsWrap">
		  <div class="deleteIconWrap">
		  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M21 6.02734C17.67 5.69734 14.32 5.52734 10.98 5.52734C9 5.52734 7.02 5.62734 5.04 5.82734L3 6.02734" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M8.5 5.01687L8.72 3.70688C8.88 2.75688 9 2.04688 10.69 2.04688H13.31C15 2.04688 15.13 2.79688 15.28 3.71688L15.5 5.01687" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M18.8484 9.1875L18.1984 19.2575C18.0884 20.8275 17.9984 22.0475 15.2084 22.0475H8.78844C5.99844 22.0475 5.90844 20.8275 5.79844 19.2575L5.14844 9.1875" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M10.3281 16.5469H13.6581" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M9.5 12.5469H14.5" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		  </svg>		  
		  </div>
		  <div class="alarmToggleSwitchWrap">
			<label class="switch">
			  <input type="checkbox" id="activeAlarm" name="activeAlarm" ${data.active === true ? 'checked' : ''}>
			  <span class="slider round"></span>
			</label>
		  </div>
		</div>
	  </div>
	`;

	// Create a temporary container element and append the alarm card
	const tempContainer = document.createElement("div");
	$(tempContainer).append(alarmCard);
	const cardElement = tempContainer.querySelector('.alarmBlock');

	// Append the card element to the alarms list
	alarmsListWrap.appendChild(cardElement);

	// Add event listener for clicking the delete icon
	cardElement.querySelector('.deleteIconWrap').addEventListener('click', function (e) {
		deleteAlarm(cardElement, data.id);
	});

	// Add event listener for toggling the alarm's active state
	cardElement.querySelector('#activeAlarm').addEventListener('change', function () {
		toggleActiveAlarm(cardElement, data.id);
	});
}
function checkAlarmRequiredField(data) {
	const isvalid = {};

	allAlarmFormKeys.forEach(key => {
		isvalid[key] = false;
		if (!!data[key]) {
			isvalid[key] = true;
		}
		if (key === 'name') {
			isvalid[key] = true;
		}
		if (key === 'day') {
			if (!!data[key]) {
				isvalid[key] = true;
			}
		}
		if (key === 'hours') {
			if (!!data[key]) {
				let value = +data[key];
				if (data[key].length <= 2) {
					// Use a regular expression to check for a number with a maximum of 2 digits
					const regex = /^[0-9]{1,2}$/;
					if (regex.test(value)) {
						if (value >= 0 && value <= 23) {
							isvalid[key] = true;
							data[key] = data[key].toString().padStart(2, '0');
						} else {
							isvalid[key] = false;
						}
					} else {
						isvalid[key] = false;
					}
				} else {
					isvalid[key] = false;
				}
			}
		}
		if (key === 'minutes') {
			if (!!data[key]) {
				let value = +data[key];
				if (data[key].length <= 2) {
					const regex = /^[0-9]{1,2}$/;
					if (regex.test(value)) {
						if (value >= 0 && value <= 59) {
							isvalid[key] = true;
							data[key] = value.toString().padStart(2, '0');
						} else {
							isvalid[key] = false;
						}
					} else {
						isvalid[key] = false;
					}
				} else {
					isvalid[key] = false;
				}
			}
		}
		if (key === 'sound' || key === 'snooze' || key === 'repeatWeekly' || key === 'volume') {
			isvalid[key] = true;
		}
	});

	const allFieldsValid = Object.values(isvalid).every(value => value === true);

	if (allFieldsValid === true) {
		return allFieldsValid;
	} else {
		return isvalid;
	}
}
function isAlarmNotExist(data) {
	if (data) {
		let isAlarmNotPresent = true;
		if (existingAlarmData) {
			existingAlarmData.forEach(alarmData => {
				const isHourPresent = alarmData.hours === data.hours;
				const isMinutePresent = alarmData.minutes === data.minutes;
				const isDayPresent = JSON.stringify(alarmData.day) === JSON.stringify(data.day);
				isAllValueTrue = isHourPresent && isMinutePresent && isDayPresent;
				if (isAllValueTrue === true) {
					return isAlarmNotPresent = false;
				}
			})
		}
		return isAlarmNotPresent;
	}
}
// function switchSoundToggle(e) {
// 	if (e.target.checked === true) {
// 		volumeWrap.classList.remove('hide');
// 	} else {
// 		volumeWrap.classList.add('hide');
// 	}
// }
function closeSoundPopup() {
	// volumeWrap.classList.add('hide');
	soundSwitch ? soundSwitch.checked = false : '';
}
function resetForm() {
	alarmForm.reset();
	closeSoundPopup();
	setDefaultFormData();
	initializeAlarmTabScreen(false);
}
function deleteAlarm(cardElement, id) {
	const DeletedAlarm = existingAlarmData ? existingAlarmData.find(alarm => alarm.id === id) : '';
	const indexToDelete = existingAlarmData.findIndex(alarm => alarm.id === id);
    removeTurnOffId(id);
	AlarmHandler.Delete(indexToDelete);
	if (indexToDelete !== -1) {
		existingAlarmData.splice(indexToDelete, 1);
		if (existingAlarmData.length === 0) {
			storageReplacer.setLocalStorageItem('alarms', '');
			initializeAlarmTabScreen(false)
		} else {
			storageReplacer.setLocalStorageItem('alarms', JSON.stringify(existingAlarmData));
		}
	}
	cardElement.remove();
}
function removeTurnOffId(id){
	var turnOffId =[];
	if(storageReplacer.getLocalStorageItem('TurnOffId')!==undefined){
		turnOffId = storageReplacer.getLocalStorageItem('TurnOffId');
        const newArray = turnOffId.filter(element => element !== id);
        storageReplacer.setLocalStorageItem('TurnOffId',newArray);
	}
}
function makeSingleToDoubleDigit(input) {
	let inputValue = input.value;
	if (inputValue.length === 1 && inputValue >= 0 && inputValue <= 9) {
		input.value = inputValue.toString().padStart(2, '0');
	} else if (!inputValue) {
		input.value = '';
	}
}
function toggleActiveAlarm(cardElement, id) {
	const alarmCardData = existingAlarmData ? existingAlarmData.find(alarm => alarm.id === id) : '';
	const indexToToggle = existingAlarmData.findIndex(alarm => alarm.id === id);
	const toggleElement = cardElement.querySelector('#activeAlarm')

	if (toggleElement.checked === true) {
		alarmCardData.active = true;
		removeTurnOffId(id);
	} else {
		alarmCardData.active = false;
		DisableAlarmFromQueue(alarmCardData);
	}
	storageReplacer.setLocalStorageItem('alarms', JSON.stringify(existingAlarmData));

}
function DisableAlarmFromQueue(rawData) {
	var alarmData = JSON.parse(storageReplacer.getLocalStorageItem('alarmData'));
	if (alarmData.length > 0) {
		alarmData.forEach(function (alarm) {
			if (alarm.id === rawData.id) {
				AlarmHandler.DisableAlarm(alarm);
			}
		})
	}

}
function playSound(event) {
	const selectedValue = event.target.value;
	const audioElement = document.getElementById(`sound${selectedValue}`);
	// Check if the audio element exists and play the sound
	if (audioElement) {
		// Stop any currently playing audio
		if (currentlyPlayingAudio) {
			currentlyPlayingAudio.pause();
			currentlyPlayingAudio.currentTime = 0; // Rewind to the beginning
		}
		audioElement.play().catch(function (error) {
			console.error("Error playing audio for sound " + selectedValue + ": " + error);
		});
		// Set the currently playing audio to the new audio element
		currentlyPlayingAudio = audioElement;
	}
}

function allEventListners() {
	// Add click event listeners to the tabs
	document.getElementById('alarmTab').addEventListener('click', function () {
		openTab('alarmTab', 'alarmContent');
	});
	document.getElementById('clockTab').addEventListener('click', function () {
		openTab('clockTab', 'clockContent');
	});
	hoursInput.addEventListener('input', function () {
		// Check the input value for validity, removing non-numeric characters if necessary
		this.value = this.value.replace(/[^0-9]/g, "");
	})
	minutesInput.addEventListener('input', function () {
		// Check the input value for validity, removing non-numeric characters if necessary
		this.value = this.value.replace(/[^0-9]/g, "");
	})
	// add alarm btn 
	addAlarmBtn.addEventListener('click', function () {
		openCrateAlarmForm();
	});
	addAlarmListBtn.addEventListener('click', function () {
		openCrateAlarmForm();
	});
	// Alarm Form save btn
	saveButton.addEventListener('click', function () {
		createAlarm();
	});
	//click on alarm form cancel button
	alarmFormCancelButton.addEventListener('click', function () {
		resetForm();
	});
	//sound toggle switch
	// soundSwitch.addEventListener('change', function (e) {
	// 	switchSoundToggle(e);
	// })
	// Hours and minutes form field 
	hoursInput.addEventListener('blur', function () {
		makeSingleToDoubleDigit(this);
	});
	minutesInput.addEventListener('blur', function () {
		makeSingleToDoubleDigit(this);
	});
	//Error overlay back btn	
	errorOverlayBackBtn.addEventListener('click', function () {
		disableErrorOverlay();
	});
	// Add event listeners to all audio radio buttons
	audioRadioButtons.forEach(radio => {
		radio.addEventListener('click', playSound);
	});


	//clock events
	clockCustomiseBtn.addEventListener('click', function () {
		goToCustomiseSec();
	});
	// Event for go to back from Customisation Options
	CustomisationBackBtn.addEventListener('click', function () {
		tabContainer.classList.remove('hide')
		clockCustomisationBlock.classList.add('hide');
		clockHomeBlock.classList.remove('hide');
	});
	// Event listner for to select color
	colorInputBlock.addEventListener('click', function (event) {
		document.querySelector('.select-selected').classList.add('select-selected');
		document.querySelector('.select-items').classList.add('select-hide');
		event.stopPropagation();
		toggleColorPicker();
	});
	// Add a change event listener to each radio button in the group for TIME SYSTEM
	timeSystemRadios.forEach(function (radio) {
		radio.addEventListener("change", function () {
			if (this.checked) {
				customisationOptionsData.timeSystem = this.value;
				storageReplacer.setLocalStorageItem('customisationOptions', JSON.stringify(customisationOptionsData))
			}
		});
	});
	// Add a change event listener to each radio button in the group for TIME fORMAT
	timeFormatRadios.forEach(function (radio) {
		radio.addEventListener("change", function () {
			if (this.checked) {
				customisationOptionsData.timeFormat = this.value;
				storageReplacer.setLocalStorageItem('customisationOptions', JSON.stringify(customisationOptionsData))
			}
		});
	});
	// Prevent the click event from immediately hiding the div if clicked inside it
	colourPickerWrap.addEventListener('click', function (event) {
		event.stopPropagation();
	});
	document.addEventListener('click', function (event) {
		if (!colourPickerWrap.contains(event.target)) {
			colourPickerWrap.classList.add('hide')
		}
		if (!volumeWrap.contains(event.target)) {
			if (!!currentlyPlayingAudio) {
				currentlyPlayingAudio.pause();
				currentlyPlayingAudio.currentTime = 0;
			}
		}
	});
	timeZoneInput.addEventListener('focus', function () {
		const inputWrapper = document.querySelector('.countyInputWrap');
		if (!inputWrapper.classList.contains('active')) {
			inputWrapper.classList.add('active');
		}
	});

	timeZoneInput.addEventListener('focusout', function () {
		const inputWrapper = document.querySelector('.countyInputWrap');
		if (inputWrapper.classList.contains('active')) {
			inputWrapper.classList.remove('active');
		}
	});

	clockDateInputWrap.addEventListener('focus', function () {
		const inputWrapper = document.querySelector('.clockDateInputWrap');
		if (!inputWrapper.classList.contains('active')) {
			inputWrapper.classList.add('active');
		}
	});
	clockDateInputWrap.addEventListener('focusout', function () {
		const inputWrapper = document.querySelector('.clockDateInputWrap');
		if (inputWrapper.classList.contains('active')) {
			inputWrapper.classList.remove('active');
		}
	});
	datepickerInput.addEventListener('focus', function () {
		datepickerVisible = true;
	});
}



const curLocClockClsName = '.countryClockWrap.current';
let intervalIdForClock;
let intervalIdForTime;
// Clock js 
function getCustomisationData() {
	if (storageReplacer.getLocalStorageItem('customisationOptions') !== undefined) {
		try {
			const CustomisationDataJSON = storageReplacer.getLocalStorageItem('customisationOptions');
			if (CustomisationDataJSON !== null) {
				return JSON.parse(CustomisationDataJSON);
			}
		} catch (error) {
			console.error('Error while retrieving alarm data:', error.message);
			return null;
		}
	}
}
function getTimeZoneData() {
	if (storageReplacer.getLocalStorageItem('timeZone') !== undefined) {
		try {
			const timeZoneDataJSON = storageReplacer.getLocalStorageItem('timeZone');
			if (timeZoneDataJSON !== null) {
				return JSON.parse(timeZoneDataJSON);
			}
		} catch (error) {
			console.error('Error while retrieving alarm data:', error.message);
			return null;
		}
	}
}
async function getExistingTimeZoneData(timeZone) {
	if (storageReplacer.getLocalStorageItem('timeZone') !== undefined) {
		const existingData = JSON.parse(storageReplacer.getLocalStorageItem('timeZone'))[0];
		return existingData;
	}
}
async function getTimeZoneInfo(timeZone) {
	try {
		const zoneData = moment.tz(timeZone);
		// Replace ':' with '.' and then parse as a float			
		let UTC = (parseFloat((moment.utc().clone().tz(timeZone).format('Z')).replace(':', '.')).toFixed(2));
		UTC = UTC >= 0 ? '+' + UTC : UTC;
		const utcOffset = zoneData.utcOffset() / 60;
		const currentTime = zoneData.format('YYYY-MM-DD HH:mm:ss');

		return {
			timeZone: timeZone,
			UTC,
			utcOffset,
			currentTime,
		};
	} catch (error) {
		console.error('Fetch error:', error);
	}
}
async function getAllTimeZoneInfo() {
	try {
		// List of time zones generated dynamically
		const allTimeZonesList = moment.tz.names();
		const currentTimeUtc = moment.utc();

		const timezoneInfo = [];
		for (const timezone of allTimeZonesList) {
			const zoneData = moment.tz(timezone);
			// Replace ':' with '.' and then parse as a float			
			let UTC = (parseFloat((currentTimeUtc.clone().tz(timezone).format('Z')).replace(':', '.')).toFixed(2));
			UTC = UTC >= 0 ? '+' + UTC : UTC;
			const utcOffset = zoneData.utcOffset() / 60;
			const currentTime = zoneData.format('YYYY-MM-DD HH:mm:ss');

			timezoneInfo.push({
				timeZone: timezone,
				UTC,
				utcOffset,
				currentTime,
			});
		}
		return timezoneInfo;
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

// Updates the display of a clock element with location data and applies customization options.
async function updateClockDisplay(timeZoneInfo, clockClassName, dateTime = '') {
	const clockWrap = document.querySelector(`.countryClockWrap.${clockClassName}`);
	const timeZoneElement = clockWrap.querySelector('.countryClockNameWrap');
	const countryUtc = clockWrap.querySelector('.countryUtc');
	const timeZone = timeZoneInfo ? timeZoneInfo.timeZone : currentTimeZone;
	// Update the timeZone name.  
	timeZoneElement.textContent = escapeHtml(convertTimeZoneFormat(timeZone));
	timeZoneElement.setAttribute('title', escapeHtml(convertTimeZoneFormat(timeZone)));
	countryUtc.textContent = escapeHtml(timeZoneInfo.UTC);

	// Update the Clock values
	updateClock(timeZoneInfo, clockClassName, dateTime);

	// Apply customization options if available.
	if (customisationOptionsData) {
		applyClockCustomization(customisationOptionsData);
	}
}

// Apply customization options to the clock display.
async function applyClockCustomization(customizationOptions) {
	changeClockFontSize(customizationOptions.fontSize, false);
	selectFontColor('', customizationOptions.fontColor, false);
}


// Update both analog and digital clocks for clock card
function updateClock(currentLocationTimeData, clockClassName, dateTime) {
	const clockWrap = document.querySelector(`.countryClockWrap.${clockClassName}`);
	const countryUtc = clockWrap.querySelector('.countryUtc');
	const countryDay = clockWrap.querySelector('.countryDay');

	// Store the interval ID in the array
	intervalIds.push({ className: clockClassName, intervalId: intervalIdForClock });

	intervalIdForClock = setInterval(function () {
		updateAnalogClock(dateTime);
		updateDigitalClock(dateTime);
	}, 1000);

	function updateAnalogClock(dateTime) {
		var d;
		if (dateTime) {
			d = getTimeForSelectedDate(selectedDate, currentLocationTimeData.timeZone).date;
		} else {
			d = currentLocationTimeData ? getTimefrZoneOffset(currentLocationTimeData.utcOffset).newDate : new Date();
		}
		var s = d.getSeconds() + d.getMilliseconds() / 1000;
		var m = d.getMinutes();
		var h = hour12();

		$(`.countryClockWrap.${clockClassName} .s-hand`).css(
			"transform",
			"translate(-50%, -100%) rotate(" + s * 6 + "deg)"
		);
		$(`.countryClockWrap.${clockClassName} .m-hand`).css(
			"transform",
			"translate(-50%, -100%) rotate(" + m * 6 + "deg)"
		);
		$(`.countryClockWrap.${clockClassName} .h-hand`).css(
			"transform",
			"translate(-50%, -100%) rotate(" + (h * 30 + m * 0.5) + "deg)"
		);

		function hour12() {
			var hour = d.getHours();

			if (hour >= 12) {
				hour = hour - 12;
			}

			if (hour == 0) {
				h = 12;
			}
			return hour;
		}
	}
	function updateDigitalClock(dateTime) {
		const clockWrap = document.querySelector(`.countryClockWrap.${clockClassName}`);
		const timeElement = clockWrap.querySelector('.countryClockTimeWrap');

		const timeElementHours = clockWrap.querySelector('.countryClockTimeWrap .tzTimeWrap');
		const timeElementMeridiem = clockWrap.querySelector('.countryClockTimeWrap .meridiemWrap');

		const timeSystem12Hours = document.querySelector('#hour12').checked;
		const timeSystemSecond = document.querySelector('#second').checked;

		const countryUtc = clockWrap.querySelector('.countryUtc');
		const tzUtc = !dateTime ? getTimeForSelectedDate(new Date(), currentLocationTimeData.timeZone).UTC : getTimeForSelectedDate(dateTime, currentLocationTimeData.timeZone).UTC;
		countryUtc.textContent = escapeHtml(`UTC ${tzUtc}`);
		let now;
		if (dateTime) {
			now = getTimeForSelectedDate(dateTime, currentLocationTimeData.timeZone).date;
		} else {
			now = currentLocationTimeData ? getTimeForSelectedDate(new Date(), currentLocationTimeData.timeZone).date : new Date();
		}
		const countryDay = clockWrap.querySelector('.countryDay');
		const tzDate = currentLocationTimeData ? getTimefrZoneOffset(currentLocationTimeData.utcOffset).newDate : new Date();
		const formattedDate = cardFormatDate(now);
		countryDay.textContent = escapeHtml(checkIsToday(now, formattedDate));
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = (timeSystem12Hours ? (hours % 12 || 12) : hours).toString().padStart(2, '0');

		// Check if formattedDate is equal to the current date				
		if (customisationOptionsData) {
			if (customisationOptionsData.timeFormat === 'second') {
				timeElementHours.className = `tzTimeWrap font${customisationOptionsData.fontSize}`;
			} else {
				timeElementHours.className = `tzTimeWrap`;
			}
		}
		// timeElementHours.classList.add(`tzTimeWrap font${customisationOptionsData.fontSize}`)
		timeElementHours.textContent = escapeHtml(`${formattedHours}:${minutes}${timeSystemSecond ? ':' + seconds : ''}`);
		timeElementMeridiem.textContent = escapeHtml(`${timeSystem12Hours ? ampm : ''}`);
	}
}
function checkIsToday(now, formattedDate) {
	if (
		now.getDate() === new Date().getDate() &&
		now.getMonth() === new Date().getMonth() &&
		now.getFullYear() === new Date().getFullYear()
	) {
		return 'Today';
	} else {
		return formattedDate;
	}
}
function cardFormatDate(date) {
	if (!(date instanceof Date) || isNaN(date)) {
		return 'Invalid Date';
	}
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const formatter = new Intl.DateTimeFormat('en-US', options);
	const formattedDate = formatter.format(date);
	return formattedDate
}
function goToCustomiseSec() {
	tabContainer.classList.add('hide')
	clockHomeBlock.classList.add('hide');
	clockCustomisationBlock.classList.remove('hide');
}
createColorPalette(colors);
function createColorPalette(colors) {
	colors.forEach(color => {
		var colorBox = document.createElement('div');
		colorBox.className = 'colorBox';
		colorBox.style.backgroundColor = color;
		colorBox.setAttribute('value', color);
		colorPalette.appendChild(colorBox);
		colorBox.addEventListener('click', function () {
			toggleColorPicker();
			selectFontColor(colorBox, color, true);
		})
	})
}
function selectFontColor(element = '', color = defaultColor, updateLocalStorage = true) {
	allColorBox = colorPalette.querySelectorAll('.colorBox');

	allColorBox.forEach(colorBox => {
		if (colorBox.classList.contains('selected')) {
			colorBox.classList.remove('selected')
		}
		if (!element) {
			if (colorBox.getAttribute('value').toLowerCase() === color.toLowerCase()) {
				element = colorBox;
			}
		}
	});

	if (element) {
		element.classList.add('selected');
		element.style.backgroundColor = color;
	}

	const allCountryClockWrap = document.querySelectorAll('.clockHomeBlock .countryClockWrap');
	allCountryClockWrap.forEach(clockWrap => {
		var clockTimeWrap = clockWrap.querySelector('.countryClockTimeWrap');
		var clockNameWrap = clockWrap.querySelector('.countryClockNameWrap');
		if (clockTimeWrap) clockTimeWrap.style.color = color;
		if (clockNameWrap) clockNameWrap.style.color = color;
	});

	const selectedColorWrap = document.querySelector('.selectedColorWrap');
	selectedColorWrap.setAttribute('data-selectedcolor', color);
	selectedColorWrap.style.backgroundColor = color;

	if (updateLocalStorage) {
		if (customisationOptionsData) {
			customisationOptionsData.fontColor = color;
			storageReplacer.setLocalStorageItem("customisationOptions", JSON.stringify(customisationOptionsData));
		}
	}
}
function toggleColorPicker() {
	if (colourPickerWrap.classList.contains('hide')) {
		colourPickerWrap.classList.remove('hide');
	} else {
		colourPickerWrap.classList.add('hide');
	}
}


// Updates the font size of clock elements and optionally updates local storage.
function changeClockFontSize(fontSize, updateLocalStorage = true) {
	const elementsToUpdate = document.querySelectorAll('.clockHomeBlock .countryClockWrap .countryClockTimeWrap, .clockHomeBlock .countryClockWrap .countryClockNameWrap');

	elementsToUpdate.forEach((element) => {
		element.style.fontSize = Number(fontSize) === 0 ? customisationFormDefaultVal.fontSize + 'px' : Number(fontSize) + 'px';
	});

	if (updateLocalStorage) {
		if (customisationOptionsData) {
			customisationOptionsData.fontSize = Number(fontSize);
			storageReplacer.setLocalStorageItem("customisationOptions", JSON.stringify(customisationOptionsData));
		}
	}
}

function setCustomisationFormValues(data) {
	var timeSystemInput = document.querySelectorAll('input[name="time-system-group"]');
	timeSystemInput.forEach(input => {
		if (+(input.getAttribute('value')) === +(data.timeSystem)) {
			input.setAttribute('checked', true);
		}
	});

	var timeFormatInput = document.querySelectorAll('input[name="time-format-group"]');
	timeFormatInput.forEach(input => {
		if ((input.getAttribute('value')) === data.timeFormat) {
			input.setAttribute('checked', true);
		}
	})

	var fontSizeInput = document.querySelectorAll('.custOptSizeColorWrap select option');
	fontSizeInput.forEach(input => {
		if (+(input.getAttribute('value')) === +(data.fontSize)) {
			input.setAttribute('selected', true);
		}
	});

	var allColorBox = document.querySelectorAll('.colorPalette .colorBox');
	allColorBox.forEach(colorBox => {
		if ((colorBox.getAttribute('value')).toLowerCase() === (data.fontColor).toLowerCase()) {
			colorBox.classList.add('selected');
		}
	});
	const selectedColorWrap = document.querySelector('.selectedColorWrap');
	selectedColorWrap.setAttribute('data-selectedcolor', data.fontColor);
	selectedColorWrap.style.backgroundColor = data.fontColor;
}
setCustomisationFormValues(customisationFormDefaultVal);

function tzAutocomplete(data) {
	$(".countyInputWrap input").autocomplete({
		appendTo: ".countryAutoComplete",
		source: function (request, response) {
			var searchTerm = request.term.toLowerCase();

			// availableTags = availableTags.filter(tag => {tag.timeZone === existingTimeZoneData[0].timeZone; console.log(tag.timeZone);} )

			// allow matching the search query anywhere within the time zone string instead of just matching the start of the string
			var filteredTags = data.filter(function (tag) {
				let formattedTZ = convertTimeZoneFormat(tag.timeZone);
				// tag.timeZone = convertTimeZoneFormat(tag.timeZone);
				return formattedTZ.toLowerCase().indexOf(searchTerm) !== -1;
			});

			// just matching the start of the string
			// var filteredTags = availableTags.filter(function(tag) {
			// 	tag.timeZone = convertTimeZoneFormat(tag.timeZone);
			// 	return tag.timeZone.toLowerCase().indexOf(searchTerm) === 0;
			// });

			var results = filteredTags.map(function (tag) {

				var utcTime = getTimefrZoneOffset(tag.utcOffset).newDate;

				// Format the current time in 12-hour format
				var formattedTime = utcTime.toLocaleTimeString(undefined, {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true
				});

				formattedTime = splitTimeAndMeridiem(formattedTime);

				return {
					label: convertTimeZoneFormat(tag.timeZone),
					value: tag.timeZone,
					timeZone: convertTimeZoneFormat(tag.timeZone),
					currentTime: formattedTime,
					offset: tag.utcOffset,
					utc: tag.UTC,
					tag: tag
				};
			});

			if (results.length === 0) {
				// noResult, create a custom item
				results.push({
					label: "",
					value: "noResult",
					timeZone: "",
					currentTime: "",
					offset: "",
					utc: "",
					tag: null,
				});
			}

			response(results);
		},
		select: function (event, ui) {
			if (ui.item.value === "noResult") {
				// Handle the case when "noResult" is selected (e.g., do nothing)
				return false; // Prevent the default behavior
			}
			// Handle selection if needed
			event.target.value = '';
			// datepickerInput.value = '';
			// selectedDate = '';
			event.target.blur();
			selectTimeZone(ui.item.value, ui.item.utc, ui.item.offset);
			return false; // Prevent the default behavior
		},
		open: function (event, ui) {
			$(".ui-autocomplete").css("width", "auto"); // Adjust the width if needed
		},
		autoFocus: true
	}).data("ui-autocomplete")._renderItem = function (ul, item) {
		if (item.value === "noResult") {
			// Render a "noResult" message
			const html = `
				  <li class="no-results-tz">
				  	No results found
				  </li>
				`;
			return $(html).appendTo(ul);
		} else {
			// Use template literals to define the HTML structure for each list item
			const html = `
		<li class="${currentTimeZone === item.value ? 'currentTz' : existingTimeZoneData ? item.value === existingTimeZoneData[0].timeZone ? 'selectedTz' : '' : ''} ">
			<div class="main-div">
				<div class="left-div">
					<div class="timezone-sub-div">
						<span class="timezone">${item.label}</span>
						<span class="utc-value">UTC ${item.utc}</span>
					</div>
					<div class="currentTime-sub-div">
						<span class="current-time">${item.currentTime.time}</span>
						<span class="current-time-meridiem">${item.currentTime.meridiem}</span>
					</div>
				</div>
				<div class="right-div">
					<span class="plus-icon"></span>
				</div>
			</div>
		</li>
		`;

			return $(html).appendTo(ul);
		}
	};
}

function selectTimeZone(timeZone, UTC, utcOffset) {
	if (timeZone === currentTimeZone) return;
	if (document.querySelector('.countryClockWrap.timeZone')) {
		if (!(timeZone === getTimeZoneData()[0].timeZone)) {
			deleteClock(document.querySelector('.countryClockWrap.timeZone'));
			createClockCard(otherClassName, true, true);
			updateClockDisplay(currentLocationTimeData = { timeZone, UTC, utcOffset }, 'timeZone', selectedDate ? selectedDate : '');
			storeClockZone(timeZone, UTC, utcOffset);
			activeTimeZones[1] = { timeZone, UTC, utcOffset }
		}
	} else {
		deleteClock(document.querySelector('.countryClockWrap.timeZone'));
		createClockCard(otherClassName, true, true);
		updateClockDisplay(currentLocationTimeData = { timeZone, UTC, utcOffset }, 'timeZone', selectedDate ? selectedDate : '');
		storeClockZone(timeZone, UTC, utcOffset);
		activeTimeZones[1] = { timeZone, UTC, utcOffset }
	}
}

const clockCardsWrap = document.querySelector('.clockCardsWrap');
function createClockCard(className = currentClassName, crossBtn = false, darkClock = false) {
	const clockHtml = `
	<div class="countryClockWrap ${className}">
	<div class="countryClockData">
		<div class="crossSvgWrap">
			<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 9.5L9 1.5" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
				<path d="M9 9.5L1 1.5" stroke="#98AAB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</div>
		<div class="countryClockTimeWrap">
			<span class="tzTimeWrap font17"> </span>
			<span class="meridiemWrap"> </span>
		</div>
		<div class="countryAnalogClockWrap">
			<div class="clock ${darkClock === true ? 'night' : ''}">
				<div class="h-hand hand"></div>
				<div class="m-hand hand"></div>
				<div class="center"></div>
			</div>
		</div>
		<div class="countryClockDayUTCWrap">
		<span class="countryDay">Today</span>,
		<span class="countryUtc"></span></div>
		<div class="countryClockNameWrap"></div>
	</div>
</div>
	`;
	
	$(clockCardsWrap).append(clockHtml);
	if (clockCardsWrap.querySelector('.countryClockWrap.timeZone')) {
		clockCardsWrap.querySelector('.countryClockWrap.timeZone .crossSvgWrap').addEventListener('click', function () {
			deleteClock(clockCardsWrap.querySelector('.countryClockWrap.timeZone'));
		})
	}
}

function storeClockZone(timeZone, UTC, utcOffset) {
	const existingTzData = storageReplacer.getLocalStorageItem(timeZone);
	if (!existingTzData || existingTzData.length === 0) {
		const newTzData = [{ timeZone, UTC, utcOffset }];
		storageReplacer.setLocalStorageItem('timeZone', JSON.stringify(newTzData));
	} else {
	}
}

// event for delete clock card
function deleteClock(elementToRemove) {
	if (elementToRemove) {
		clearInterval(intervalIdForClock)
		elementToRemove.remove();
		if (getTimeZoneData().length > 0) {
			storageReplacer.setLocalStorageItem('timeZone', '');
			activeTimeZones.splice(1, 1);
		}
	} else {
	}
}


// common use functions
function hideElements(...elements) {
	elements.forEach(element => {
		element.classList.add('hide');
	});
}

function showElement(element) {
	element.classList.remove('hide');
}

function convertTimeZoneFormat(timeZone) {
	const parts = timeZone.split('/');
	if (parts.length === 2) {
		// Remove underscores and add spaces
		const formattedCity = parts[1].replace(/_/g, ' ');
		return `${formattedCity}, ${parts[0]}`;
	} else {
		const formattedString = timeZone.replace(/_/g, ' ').split('/').reverse().join(', ');
		return formattedString;
		// If the input string doesn't match the expected format
		// return timeZone;
	}
}

function splitTimeAndMeridiem(formattedTime) {
	if (!formattedTime) {
		throw new Error('Formatted time is not provided.');
	}

	const parts = formattedTime.split(' ');

	// Ensure there are exactly two parts (time and meridiem)
	if (parts.length !== 2) {
		throw new Error('Invalid formatted time. Expected format: "hh:mm AM/PM".');
	}

	const [time, meridiem] = parts;

	return {
		time,
		meridiem
	};
}
function createDateFromData(data) {
	const newDate = new Date(
		data.year,
		data.month - 1,
		data.day,
		data.hour,
		data.minute,
		data.seconds,
		data.milliSeconds
	);
	return newDate;
}
function getTimefrZoneOffset(offset) {
	offset = Number(offset)
	var d = new Date();
	var utc = d.getTime() + d.getTimezoneOffset() * 60000;
	var newDate = new Date(utc + 3600000 * offset);
	var hrmin = newDate.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true
	});

	return { hrmin, newDate };
}
function setClockCalender() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	// Set minDate to January 1st of the current year
	const minDate = new Date(currentYear, 0, 1);

	// Set maxDate to December 31st of the current year
	const maxDate = new Date(currentYear, 11, 31);

	// Define the custom day names in three-letter abbreviations
	const customDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	// Initialize the datepicker with minDate and maxDate options
	$("#datepicker").datepicker({
		minDate: minDate,
		maxDate: maxDate,
		beforeShow: function (input, inst) {
			inst.dpDiv.css({ width: '306px' }); // Set calendar width and position
			$('.clockDateInputWrap').append($('#ui-datepicker-div'));
		},
		onSelect: async function (dateText, inst) {
			// Handle the selected date event	
			selectedDate = dateText;
			clearInterval(intervalIdForClock);
			intervalIds.forEach(item => {
				clearInterval(item.intervalId);
			})
			const ctimeZoneInfo = await getTimeZoneInfo(currentTimeZone);
			if (getTimeZoneData()) {
				let timeForSelectedDate = getTimeForSelectedDate(dateText, getTimeZoneData()[0].timeZone).date;
				const timeZoneInfo = await getTimeZoneInfo(getTimeZoneData()[0].timeZone);
				// clearInterval(intervalIdForClock);					
				updateClockDisplay(ctimeZoneInfo, currentClassName, getTimeForSelectedDate(dateText, currentTimeZone).date);
				updateClockDisplay(timeZoneInfo, otherClassName, timeForSelectedDate);
			} else {
				// clearInterval(intervalIdForClock);											
				updateClockDisplay(ctimeZoneInfo, currentClassName, getTimeForSelectedDate(dateText, currentTimeZone).date);
			}
			// updateAllClockDisplay([currentTimeZone, getTimeZoneData()[0].timeZone], dateText)			

		},
		dayNamesMin: customDayNames, // Use custom day names
		firstDay: 1 // Start the week with Monday (0 for Sunday, 1 for Monday, etc.)		
	});
}
function getTimeForSelectedDate(dateText, convertTimeZone) {
	const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const combinedDateTime = `${new Date(dateText).toLocaleDateString('en-US')} ${currentTime}`;
	let zoneData;
	if (convertTimeZone === currentTimeZone) {
		zoneData = moment(combinedDateTime, 'MM/DD/YYYY hh:mm:ss A').tz(convertTimeZone);
	} else {
		zoneData = moment(combinedDateTime, 'MM/DD/YYYY hh:mm:ss A').tz(currentTimeZone).utc().clone().tz(convertTimeZone);
	}
	// const zoneData = moment('1/1/2024 10:29:55 am').tz(currentTimeZone).utc().clone().tz(getTimeZoneData()[0].timeZone);
	let zoneUTC = parseFloat((zoneData.format('Z')).replace(':', '.')).toFixed(2);
	zoneUTC = zoneUTC >= 0 ? '+' + zoneUTC : zoneUTC;
	const selectedDatesTime = zoneData.format('YYYY-MM-DD HH:mm:ss');
	return { date: new Date(selectedDatesTime), UTC: zoneUTC }
}

// Toggle the datepicker when the button is clicked
$(".clockDateInputWrap .input-group-prepend").click(function () {
	if (datepickerVisible) {
		$("#datepicker").datepicker("hide");
		datepickerVisible = false;
	} else {
		$("#datepicker").datepicker("show");
		datepickerVisible = true;
	}
});

// Function to clear all intervals associated with a specific class name
function clearIntervalsWithClassName(className) {
	const intervalsToClear = intervalIds.filter(item => item.className === className);
	for (const item of intervalsToClear) {
		clearInterval(item.intervalId);
	}
}



function getBrowser() {
	try {
		var e = navigator.userAgent
			, t = e.match(/(chrome|safari|opera|firefox|msie|trident(?=\/))\/?\s*(\.?\d+(\.\d+)*)/i);
		if (t[1] && /trident/i.test(t[0]))
			return tem = /\brv[ :]+(\d+)/g.exec(e) || [],
			{
				name: "IE",
				version: tem[1] || ""
			};
		if ("Chrome" === t[1] && (tem = e.match(/\b(OPR|Edge)\/(\d+)/),
			null != tem))
			return {
				name: tem[1].replace("OPR", "Opera"),
				version: tem[2]
			};
		t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"],
			null != (tem = e.match(/version\/(\d+)/i)) && t.splice(1, 1, tem[1]);
		var n = t[0];
		return {
			name: n,
			version: t[1],
			isChrome: n.toLowerCase().indexOf("chrome") > -1,
			isFirefox: n.toLowerCase().indexOf("firefox") > -1
		}
	} catch (e) {
		console.log("error", e)
	}
	return {
		name: "Unknown",
		version: "0.0.0",
		isChrome: !1,
		isFirefox: !1
	}
}


var acceptButton = $(".accept");
var allowWidget = $(".allow-widget");
var acceptTerm = $(".accept-prompt");
var denyTerms = $("#denytTerms");
var uninstallAddOn = $("#uninstallAddOn")
// var denyTerms = $(".know-more");
var piiAccept = "piiAccept";
acceptButton.on("click", function (e) {
	removeWrapper();
	storageReplacer.setLocalStorageItem('optInInteractionCount', 2);
});

denyTerms.on("click", function (e) {
	closePiiWidget();
});

uninstallAddOn.on("click", function (e) {
	let uninstallUrl = UNINSTALL_PAGE+ "&self=1"
	browser.runtime.setUninstallURL(uninstallUrl);
	browser.management.uninstallSelf(
		{
			showConfirmDialog: false
		}
	)
})

document.addEventListener("DOMContentLoaded", function () {
	storageReplacer.init().then(function () {
		setClockCalender();
		checkPiiStored();
	});
});

function TurnOffAlarm() {
	const turnOffId = storageReplacer.getLocalStorageItem('TurnOffId');

	if (turnOffId !== undefined) {
		if(turnOffId.length>0) {
			turnOffId.forEach(function(id){
                const cardElements = document.querySelectorAll(".alarmBlock[data-alarmid='" + id + "']");
                for (const cardElement of cardElements) {
                    const toggleElement = cardElement.querySelector('#activeAlarm');
                    toggleElement.checked = false;
                }
			})
        }
		// storageReplacer.setLocalStorageItem('TurnOffId', null);
	}
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		if (key === "piiAccept" && newValue === "1") {
			allowWidget.show();
			const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
			if(optInInteractionCount==null || optInInteractionCount == 1){
				triggerOpenWidget();
				storageReplacer.setLocalStorageItem('optInInteractionCount', optInInteractionCount + 1)
			}
			enableWidget();
			removeWrapper();
			document.dispatchEvent(
				new CustomEvent("PiiAccept", {
					detail: true,
				})
			);
		} else if (key === "piiAccept" && newValue === "-1") {
			disableWidget();
			triggerCloseWidget();
			const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
			if(optInInteractionCount==null || optInInteractionCount == 1){
				addWrapper();
			}
			document.dispatchEvent(
				new CustomEvent("PiiAccept", {
					detail: false,
				})
			);
		}
	}
	TurnOffAlarm();
});

function removeWrapper(){
	const welcomWrapper = $(".welcome_wrap")
	welcomWrapper.hide();
}

function addWrapper(){
	const welcomWrapper = $(".welcome_wrap")
	welcomWrapper.removeClass("hide")
}

function disableWidget(){
	document.querySelectorAll(
		'[n-widgetClick],[n-widgetaction], [n-widgettarget]'
	).forEach(function(ele){
		ele.style.pointerEvents = 'none';
	})
}
function enableWidget(){
	document.querySelectorAll(
		'[n-widgetClick],[n-widgetaction], [n-widgettarget]'
	).forEach(function(ele){
		ele.style.pointerEvents = 'auto';
	})
}


function checkPiiStored() {
	var accepted = storageReplacer.getLocalStorageItem("piiAccept");
	if (accepted && accepted == 1) {
		allowWidget.show();
		const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
		if(optInInteractionCount==null || optInInteractionCount == 1 ){
			triggerOpenWidget();
			storageReplacer.setLocalStorageItem('optInInteractionCount', optInInteractionCount + 1);
		}
		enableWidget();
		removeWrapper();
		document.dispatchEvent(
			new CustomEvent("PiiAccept", {
				detail: true,
			})
		);
	} else if (!accepted || accepted == -1) {
		disableWidget();
		const optInInteractionCount = storageReplacer.getLocalStorageItem("optInInteractionCount")
		if(optInInteractionCount==null || optInInteractionCount == 1){
			addWrapper();
		}
		document.dispatchEvent(
			new CustomEvent("PiiAccept", {
				detail: false,
			})
		);
	}
}

function closePiiWidget() {
	try {
		document.dispatchEvent(new Event("searchTextChanged"));
		document.dispatchEvent(
			new CustomEvent('PiiAccept', {
				detail: 'cancel'
			})
		);
	} catch (e) {
		console.log(e);
	}
}

// AlarmHandler

var soundArray = ["Alarm1.mp3", "Alarm2.mp3", "Alarm3.mp3", "Alarm4.mp3", "Alarm5.mp3"];
var daysArray = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
var AlarmHandler = {
	Create: function (newAlarm) {
		var alarmData = [];
		if (storageReplacer.getLocalStorageItem('alarmData') !== undefined)
			alarmData = JSON.parse(storageReplacer.getLocalStorageItem('alarmData'));
		const alarmIdList = [];
		if (Array.isArray(newAlarm.day)) {
			newAlarm.day.forEach(p => alarmIdList.push(daysArray.indexOf(p) + 1));
		} else {
			alarmIdList.push(daysArray.indexOf(newAlarm.day) + 1);
		}
		newAlarm.id = (newAlarm.id === null || newAlarm.id === -Infinity) ? 1 : newAlarm.id;
		const newObj = {
			id: newAlarm.id,
			alarmList: alarmIdList,
			name: newAlarm.name,
			soundStatus: newAlarm.sound,
			sound: soundArray[parseInt(newAlarm.volume === undefined ? "1" : newAlarm.volume) - 1],
			hours: parseInt(newAlarm.hours),
			minutes: parseInt(newAlarm.minutes),
			repeatWeekly: newAlarm.repeatWeekly,
			days: newAlarm.day.length > 0 ? newAlarm.day : [alarmIdList[0].toString()],
			snooze: newAlarm.snooze === undefined ? false : newAlarm.snooze,
			state: true,
			active: newAlarm.active,
		};
		if (alarmData === undefined) {
			alarmData = [];
			alarmData.push(newObj);
		} else
			alarmData.unshift(newObj);
		storageReplacer.setLocalStorageItem('alarmData', JSON.stringify(alarmData))
		AlarmHandler.SetAlarm(newObj);

	},
	Delete: function (alarmId) {

		var alarmData = JSON.parse(storageReplacer.getLocalStorageItem('alarmData'));
		if (alarmData.length > 0) {
			alarmData.forEach(function (alarm) {
				if (alarm.id === alarmId) {
					alarm.alarmList.forEach(function (day) {
						chrome.alarms.clear(alarmId + day.toString(), () => { });

					})
				}
			})

			const relatedAlarmIndex = alarmData.findIndex(function (p) {
				p.id === parseInt(alarmId);
			});
			alarmData.splice(relatedAlarmIndex, 1);
			storageReplacer.setLocalStorageItem('alarmData', JSON.stringify(alarmData));
		}
	},
	SetAlarm: function (alarmObj) {
		const weekDuration = 7 * 24 * 60 * 60 * 1000; // Convert week duration to milliseconds
		const now = new Date();
		const dayOfWeek = now.getDay();
		const nowHours = now.getHours();
		const nowMinutes = now.getMinutes();

		const futureHours = alarmObj.hours;
		const futureMinutes = alarmObj.minutes;

		const alarmTime = (futureHours * 60 + futureMinutes) - (nowHours * 60 + nowMinutes);
		let finalAlarmTime;
		if (alarmTime < 0) {
			finalAlarmTime = (alarmTime + 24 * 60) * 60 * 1000;
		} else {
			finalAlarmTime = alarmTime * 60 * 1000;
		}

		alarmObj.alarmList.forEach((p) => {
			const currentDayOfWeek = p;
			let duration = Number(currentDayOfWeek) - dayOfWeek;
			if (alarmTime >= 0 && duration < 0) {
				duration = 7 + duration;
			}
			if (alarmTime < 0 && duration > 0) {
				duration--;
			} else if (alarmTime < 0 && duration <= 0) {
				duration = 6 + duration;
			}

			const nextDayTime = duration * 24 * 60 * 60 * 1000;
			if (alarmObj.repeatWeekly === true) {
				chrome.alarms.create(
					alarmObj.id.toString() + p,
					{
						when:
							now.getTime() - now.getSeconds() * 1000 + nextDayTime + finalAlarmTime,
						periodInMinutes: weekDuration / 60 / 1000, // Convert to minutes
					}
				);
			} else {
				chrome.alarms.create(
					alarmObj.id.toString() + p,
					{
						when:
							now.getTime() - now.getSeconds() * 1000 + nextDayTime + finalAlarmTime,
					}
				);
			}
		});


	},
	DisableAlarm: function (alarm) {
		alarm.alarmList.forEach((dayOfWeek) => {
			const alarmId = `${alarm.id}${dayOfWeek}`;
			chrome.alarms.clear(alarmId, () => {

			});
		});
	}



};

