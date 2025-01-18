function getStorageItem(name) {
	var finalContent = null;
	var content = null;
	try {
		content = storageReplacer.getLocalStorageItem(name);
		try {
			finalContent = JSON.parse(content);
		} catch (err) {
			finalContent = content;
		}
	} catch (err) {
		console.debug(err);
	}
	return finalContent;
}

function setStorageItem(name, data) {
	try {
		storageReplacer.setLocalStorageItem(name, JSON.stringify(data));
	} catch (err) {}
}

function isEmptyObject(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}

function isStringSet(str) {
	return !!str && !(str == 'null' || str == 'undefined');
}

(function () {
	var imgs = $('[data-src]');
	$.each(imgs, function (i, e) {
		if ($(e).attr('data-src')) {
			var dataSrc = $(e).attr('data-src');
			$(e).attr('src', dataSrc);
		}
	});
})();

var defaultLatitude = '40.71';
var defaultLongitude = '-74.01';

hideWeatherView();

function showWeatherView() {
	$('.weatherdata').css({
		opacity: '1',
		'pointer-events': 'auto'
	});
	document.dispatchEvent(new Event('weatherVisibleToUi'));
}

function hideWeatherView() {
	$('.weatherdata').css({
		opacity: '0',
		'pointer-events': 'none'
	});
}

function getKey(lat, long, suffix) {
	suffix = suffix || '';
	return lat + ',' + long + suffix;
}

function getDataFromNetwork(url, timeout) {
	timeout = timeout || 1500;
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: url,
			success: function (data) {
				var result = {
					status: true
				};
				Object.assign(result, data);
				resolve(result);
			},
			error: function (err) {
				resolve({
					status: false
				});
			},
			timeout: timeout
		});
	});
}

function getCityPillText(data) {
	var text = data.city;
	if (data.state) text += ', ' + data.state;
	else if (data.country) text += ', ' + data.country;
	return text;
}

var localCityObj = {};

var localCityDetails = 'localCityDetails';

var dataExpiryTime = '15';

function checkTimePassed(dataExpiryTime) {
	var localDataTime = storageReplacer.getLocalStorageItem(localCityDetails)
		? JSON.parse(storageReplacer.getLocalStorageItem(localCityDetails))
		: '';

	var checkTime = function (myDate) {
		var timer = 15 * 60 * 1000;
		return new Date() - myDate > timer;
	};
	// If not present on load set it
	// Onload this will load and set a timer from the first minute;
	if (checkTime(new Date(localDataTime.timestamp))) {
		localCityObj.timestamp = new Date();
		storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
		return false;
	}

	return true;
}

function getCurrentLocation(disableFirefox) {
	var disableFirefox = !!disableFirefox;
	try {
		return;
	} catch (err) {}
	if (
		checkTimePassed(dataExpiryTime) &&
		!!storageReplacer.getLocalStorageItem(localCityDetails)
	) {
		getDataFromLocal();
	} else {
		return new Promise(function (resolve, reject) {
			getLocationCoordinates()
				.then(function (locationInfo) {
					localCityObj.timestamp = new Date();
					storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
					getCityDetails(locationInfo).then(function (data) {
						if (data.city) {
							var cityPillText = getCityPillText(data);
							$('.currentlocation').text(cityPillText);
							$('.currentlocation').attr('title', cityPillText);
							localCityObj.city = cityPillText;
							storageReplacer.setLocalStorageItem(
								localCityDetails,
								JSON.stringify(localCityObj)
							);
						}
					});
					getCityTemperature(locationInfo.latitude, locationInfo.longitude);

					/* Promise.all([getCityDetails(locationInfo), getCityTemperature(locationInfo.latitude, locationInfo.longitude)]).then((values) => {
                    showWeatherView();
                }); */
				})
				.catch(function (err) {});
		});
	}
}

function getDataFromLocal() {
	var localData = storageReplacer.getLocalStorageItem(localCityDetails)
		? JSON.parse(storageReplacer.getLocalStorageItem(localCityDetails))
		: '';
	$('.currentlocation').text(localData.city);
	$('.currentlocation').attr('title', localData.city);
	var tempround = localData.cityTemperature.currently.temperature.toFixed(1);
	$('.weather-icon').addClass(localData.cityTemperature.currently.icon);
	$('.citytemf').text(convertCelsiusToFarenheit(tempround) + '&deg; F');
	showWeatherView();
}

function getLocationCoordinates() {
	return new Promise(function (resolve, reject) {
		var locationData = null;
		if (locationData && locationData.length === 2) {
			resolve({
				longitude: locationData[0],
				latitude: locationData[1]
			});
		} else {
			getDataFromNetwork(specificConstants.API + 'getLocationData', 5000)
				.then(function (data) {
					if (data.status) {
						if (
							data.location &&
							data.location.longitude &&
							data.location.latitude
						) {
							resolve({
								longitude: data.location.longitude,
								latitude: data.location.latitude,
								city: data.city.names ? data.city.names.en : '',
								state:
									!!data &&
									data.subdivisions.length > 0 &&
									data.subdivisions[0].names
										? data.subdivisions[0].names.en
										: ''
							});
						}
					}
					resolve({
						longitude: defaultLongitude,
						latitude: defaultLatitude
					});
				})
				.catch(function () {
					resolve({
						longitude: defaultLongitude,
						latitude: defaultLatitude
					});
				});
		}
	});
}

function getCityDetails(locationInfo) {
	return new Promise(function (resolve, reject) {
		var latitude = locationInfo.latitude;
		var longitude = locationInfo.longitude;
		var city = locationInfo.city;
		if (city) {
			resolve(locationInfo);
		} else {
			fetchCityDetails(latitude, longitude)
				.then(function (cityData) {
					locationInfo = Object.assign(locationInfo || {}, cityData || {});
					resolve(locationInfo);
				})
				.catch(function (err) {
					reject(err);
				});
		}
	});
}

function fetchCityDetails(latitude, longitude) {
	if (!!latitude && !!longitude) {
		var cityPromise;
		if (!!getStorageItem(getKey(latitude, longitude, 'CityInfo'))) {
			cityPromise = Promise.resolve(
				getStorageItem(getKey(latitude, longitude, 'CityInfo'))
			);
		} else {
			cityPromise = new Promise(function (cityResolve, cityReject) {
				$.getJSON(
					specificConstants.API +
						'getReverseGeocoding?latitude=' +
						latitude +
						'&longitude=' +
						longitude,
					function (data) {
						var city = data.location.split(',');
						var cityInfo = {
							latitude: latitude,
							longitude: longitude,
							city: city[0],
							country: city[1]
						};
						setStorageItem(getKey(latitude, longitude, 'CityInfo'), cityInfo);
						cityResolve(cityInfo);
					}
				);
			});
		}
		return cityPromise;
	}
	return Promise.reject();
}

function convertCelsiusToFarenheit(value) {
	return Math.round((9 / 5) * value + 32);
}

function getCityTemperature(lat, long) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: 'GET',
			url:
				specificConstants.API +
				'temperatureData?latitude=' +
				lat +
				'&longitude=' +
				long,
			success: function (data) {
				var tempround = data.currently.temperature.toFixed(1);
				$('.weather-icon').addClass(data.currently.icon);
				$('.citytemf').text(convertCelsiusToFarenheit(tempround) + '&deg; F');
				showWeatherView();
				localCityObj.cityTemperature = data;
				storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
				resolve(data);
			},
			error: function (error) {
				////console.log(error);
				$('.citytemf').text('Not found');
				showWeatherView();
			}
		});
	});
}

var acceptButton = $('.accept');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
// var denyTerms = $('#denytTerms');
var denyTerms = $('.know-more');
var piiAccept = 'piiAccept';
acceptButton.on('click', function (e) {
	// closePiiWidget();
	chrome.runtime.sendMessage(
		{task: 'showOptInPage'},
		function (response) {
		}
	);
	// document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on('click', function (e) {
	closePiiWidget();
});

document.addEventListener('DOMContentLoaded', function () {
	storageReplacer.init().then(function () {
		allowWidget.hide();
		checkPiiStored();
		onLoadInit();
	});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
		if (key === 'piiAccept' && newValue === '1') {
			allowWidget.show();
			acceptTerm.hide();
			$('[n-widgetaction=link1],[n-widgetclick=link1]').removeClass(
				'active'
			);
			document.dispatchEvent(
				new CustomEvent('PiiAccept', {
					detail: true
				})
			);
			showResponse();
			initWidgetFunctions();
		} else if (key === 'piiAccept' && newValue === '-1') {
			allowWidget.hide();
			acceptTerm.show();

			document.dispatchEvent(
				new CustomEvent('PiiAccept', {
					detail: false
				})
			);
		}
	}
});

var widgetElement = $('.link-out');

widgetElement.on('click', function (e) {
	checkPiiStored();
});

function checkPiiStored() {
	var accepted = storageReplacer.getLocalStorageItem('piiAccept');
	if (accepted && accepted == 1) {
		allowWidget.show();
		acceptTerm.hide();
		document.dispatchEvent(
			new CustomEvent('PiiAccept', {
				detail: true
			})
		);
	} else if (!accepted || accepted == -1) {
		allowWidget.hide();
		acceptTerm.show();

		document.dispatchEvent(
			new CustomEvent('PiiAccept', {
				detail: false
			})
		);
	}
}

function closePiiWidget() {
	try {
		document.dispatchEvent(new Event('searchTextChanged'));
		document.dispatchEvent(
			new CustomEvent('PiiAccept', {
				detail: 'cancel'
			})
		);
	} catch (e) {
		console.log(e);
	}
}

var API_RESPONSE = specificConstants.API + 'getRecipe';
// recipe global state
window.filterCheckedList = {};
window.allCheckedBoxes = null;
window.searchValue = '';
window.filterFlags = {
	resetingState: false
};
window.apiReqController = null;
window.recipeLoadParams = {
	resLimit: 0,
	overallLimit: 0,
	iterLimit: 10,
	response: []
};
window.widgetFeature = {
	openWidget: false,
	widgetTab: 'recipes'
};
window.activeLinkout = null;

function onLoadInit(){
	getCurrentLocation();
	updateCurrentDateTime2();
	setInterval(updateCurrentDateTime2, 1000);
	// Widget Functionality
	var accepted = storageReplacer.getLocalStorageItem('piiAccept');
	if (accepted && accepted == 1) {
		initWidgetFunctions();
	}
	var toggleElement = document.querySelector('.toggleCloseOpenWidget');

	var widget = new Widget({
		activateTarget: true,
		firstLoad: {
			attribute: 'main',
			storage: {
				item: 'onboarding',
				value: 'yes'
			}
		}
	});

	widget.init(function (el) {
		if (el.clickValue == 'main' || el.targetValue == 'main') {
			widget.toggleClass([toggleElement], 'active');
		} else {
			widget.removeClass([toggleElement], 'active');
        }
        if (el.clickValue == 'link1') {
			var accepted = storageReplacer.getLocalStorageItem('piiAccept');
            if (accepted && accepted == 1) {
                $('[n-widgetaction=link1],[n-widgetclick=link1]').removeClass(
                    'active'
                );
            }
		}
	});

	widget.firstLoadRender(function (o) {
		if (o) {
			document.dispatchEvent(new Event('TutorialShown'));
		}
	});

	document.addEventListener('searchTextChanged', function () {
		widget.removeClass(
			document.querySelectorAll('[n-widgetaction],[n-widgetclick]'),
			'active'
		);
	});

	toggleElement.addEventListener('click', function (e) {
		document.querySelector("[n-widgetclick='main']").click();
	});
}

function initWidgetFunctions() {
	try {
		// initWidgetFeature();
		// initTabMenu();
		initSearchAndFilterRecipe();
		initRecipeFilterFunc();
		// lazy loading on scroll
		setScrollFuncOnResults();
	} catch (err) {}
}

function initRecipeFilterFunc() {
	var toggleHeader = document.querySelectorAll('[data-toggle-src]');
	var filterSelectors = document.querySelectorAll('[filter-checkbox]');
	var applyBtn = document.getElementById('filt-apply-btn');
	var resetBtn = document.getElementById('reset-filter-btn');
	var clearSearchBtn = document.getElementById('clear-search-btn');

	if (toggleHeader && toggleHeader.length > 0) {
		for (var i = 0; i < toggleHeader.length; i++) {
			toggleHeader[i].addEventListener('click', function (e) {
				var currTarget = e.currentTarget;
				var targetVal = currTarget.getAttribute('data-toggle-src');
				var parentEl = null;
				if (targetVal && targetVal == 'specPart') {
					parentEl = document.querySelector('.filter-recipe-wrap');
				}
				if (!parentEl) {
					currTarget.parentElement.classList.toggle('toggl-open');
				} else {
					if ($(parentEl).hasClass('toggl-open')) {
						cancFilter();
						$('.result-recipe-wrap').addClass('toggl-open');
					} else {
						$('.result-recipe-wrap').removeClass('toggl-open');
					}
					$('.sidemenu-header').toggleClass('toggl-open');
					parentEl.classList.toggle('toggl-open');
				}
			});
		}
	}

	if (filterSelectors && filterSelectors.length > 0) {
		for (var i = 0; i < filterSelectors.length; i++) {
			filterSelectors[i].addEventListener('change', function (e) {
				var currCheckBox = e.currentTarget;
				var currCheckBoxChecked = currCheckBox.checked;
				var categ = currCheckBox.name ? currCheckBox.name : '';
				var filterVal = currCheckBox.value ? currCheckBox.value : '';

				if (categ && filterVal) {
					var prevArr = filterCheckedList[categ]
						? filterCheckedList[categ].length > 0
							? filterCheckedList[categ]
							: []
						: [];
					var filterPrevArr;
					if (prevArr.length > 0) {
						if (currCheckBoxChecked == true) {
							prevArr.push(filterVal);
						} else {
							filterPrevArr = prevArr.filter(function (item) {
								return item !== filterVal;
							});
							prevArr = filterPrevArr;
						}
						filterCheckedList[categ] = prevArr;
					} else {
						filterCheckedList[categ] = [filterVal];
					}
				}
				if (getCheckedFilters(filterSelectors)) {
					applyBtn.classList.remove('disabled-btn');
					resetBtn.classList.remove('disabled-btn');
				} else {
					if (allCheckedBoxes == null) {
						applyBtn.classList.add('disabled-btn');
						resetBtn.classList.add('disabled-btn');
						if (filterFlags.resetingState) {
							showResponse(searchValue);
							filterCheckedList = {};
							filterFlags.resetingState = false;
						}
					}
				}
				setFilterCount(filterSelectors);
				var trackerData =
					searchValue == ''
						? currCheckBoxChecked
							? filterVal
							: ''
						: currCheckBoxChecked
						? searchValue + '::' + filterVal
						: searchValue;

			});
		}
	}

	if (resetBtn) {
		resetBtn.addEventListener('click', function (e) {
			if (filterSelectors && filterSelectors.length > 0) {
				for (var i = 0; i < filterSelectors.length; i++) {
					filterSelectors[i].checked = false;
				}
				applyBtn.classList.add('disabled-btn');
				resetBtn.classList.add('disabled-btn');
			}
			if (filterFlags.resetingState) {
				showResponse(searchValue);
			}
			filterCheckedList = {};
			allCheckedBoxes = null;

			$('.result-recipe-wrap').addClass('toggl-open');
			$('.sidemenu-header, .filter-recipe-wrap').removeClass('toggl-open');
			setFilterCount(null, 0);
			$('.filter-opt-block').removeClass('toggl-open');
			filterFlags.resetingState = false;
		});
	}

	if (applyBtn) {
		applyBtn.addEventListener('click', function (e) {
			$('.result-recipe-wrap').removeClass('show-recipe-desc');
			showResponse(searchValue, genQueryString(filterCheckedList));
			$('.result-recipe-wrap').addClass('toggl-open');
			$('.filter-recipe-wrap, .sidemenu-header').removeClass('toggl-open');
			filterFlags.resetingState = true;

			if (!getCheckedFilters(filterSelectors)) {
				applyBtn.classList.add('disabled-btn');
				resetBtn.classList.add('disabled-btn');
			}
			allCheckedBoxes = getCheckedBoxes();
		});
	}

	// search reset btn
	if (clearSearchBtn) {
		clearSearchBtn.addEventListener('click', function (e) {
			if (searchValue) {
				e.currentTarget.classList.remove('clear-active');
				searchValue = null;
				$('.recipe-input').val('');
				showResponse(searchValue, genQueryString(filterCheckedList));
			}
		});
	}
}

function getCheckedBoxes() {
	var checkboxes = document.querySelectorAll('[filter-checkbox]');
	var checkboxesChecked = [];
	// loop over them all
	for (var i = 0; i < checkboxes.length; i++) {
		// And stick the checked ones onto an array...
		if (checkboxes[i].checked) {
			checkboxesChecked.push(checkboxes[i]);
		}
	}
	// Return the array if it is non-empty, or null
	return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function cancFilter() {
	var filterSelectors1 = document.querySelectorAll('[filter-checkbox]');

	removeChecked();
	if (allCheckedBoxes != null) {
		for (var j = 0; j < allCheckedBoxes.length; j++) {
			document.querySelector(
				'[name=' +
					allCheckedBoxes[j].name +
					'][value=' +
					allCheckedBoxes[j].value +
					']'
			).checked = true;
		}

		var newFilterList = {};
		for (var i = 0; i < allCheckedBoxes.length; i++) {
			const filterItem = newFilterList[allCheckedBoxes[i].name]
				? newFilterList[allCheckedBoxes[i].name]
				: [];
			filterItem.push(allCheckedBoxes[i].value);
			newFilterList[allCheckedBoxes[i].name] = filterItem;
		}
		filterCheckedList = newFilterList;
	} else {
		filterCheckedList = {};
	}
	setFilterCount(filterSelectors1);
	var count = parseInt($('.recipe-couter')[0].textContent);
	var applyBtn1 = document.getElementById('filt-apply-btn');
	var resetBtn1 = document.getElementById('reset-filter-btn');
	if (count == 0) {
		applyBtn1.classList.add('disabled-btn');
		resetBtn1.classList.add('disabled-btn');
	}
}
function removeChecked() {
	var filterSelectors2 = document.querySelectorAll('[filter-checkbox]');
	for (var j = 0; j < filterSelectors2.length; j++) {
		document.querySelector(
			'[name=' +
				filterSelectors2[j].name +
				'][value=' +
				filterSelectors2[j].value +
				']'
		).checked = false;
	}
}

function initSearchAndFilterRecipe() {
	showResponse(searchValue, genQueryString(filterCheckedList));
}

function genQueryString(_filterCheckedList) {
	var query_str = '';
	var _cnt = 0;
	for (var category in _filterCheckedList) {
		if (_filterCheckedList.hasOwnProperty(category)) {
			if (_filterCheckedList[category].length > 0) {
				var _arr = _filterCheckedList[category];
				for (var i = 0; i < _arr.length; i++) {
					if (_cnt > 0) {
						query_str += '&' + category + '=' + _arr[i];
					} else {
						query_str += category + '=' + _arr[i];
					}
					++_cnt;
				}
			}
		}
	}
	return query_str;
}

function getCheckedFilters(_filters) {
	try {
		for (var i = 0; i < _filters.length; i++) {
			if (_filters[i].checked == true) {
				return true;
			}
		}
		return false;
	} catch (error) {}
}

function setFilterCount(_filters, _defVal) {
	try {
		if (_filters && !_defVal) {
			var count = 0;
			for (var i = 0; i < _filters.length; i++) {
				if (_filters[i].checked == true) {
					count += 1;
				}
			}
			$('.recipe-count').text(count);
		} else {
			$('.recipe-count').text(_defVal);
		}
	} catch (error) {}
}

var searchBtn = $('#recipe-search-btn');

$('.recipe-input').keypress(function (e) {
	if (e.which === 13) {
		e.preventDefault();
		$('.result-recipe-wrap').removeClass('show-recipe-desc');
		searchBtn.trigger('click', false);
	}
});

searchBtn.on('click', function (e) {
	e.preventDefault();
	var currentVal = $('.recipe-input').val().trim();
	if (currentVal !== searchValue) {
		$('#clear-search-btn').addClass('clear-active');
		showResponse(currentVal, genQueryString(filterCheckedList));
		searchValue = currentVal;
	}
	if (!currentVal) {
		$('#clear-search-btn').removeClass('clear-active');
	}
	$('.result-recipe-wrap').addClass('toggl-open');
	$('.filter-recipe-wrap, .sidemenu-header').removeClass('toggl-open');
});

function updateCurrentDateTime2() {
	var date = getCurrentTime();
	$('#cust_time').text(date.value + ' ' + date.unit);
	$('#cust_date').text(customDate2(new Date()));
	$('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
	var date = val || new Date();
	var format = { value: '', unit: '' };
	var tempDate = changeTimeFormatTo12Hr(date);
	format.value = tempDate.hours + ':' + tempDate.minutes;
	format.unit = tempDate.unit;
	format.hours = tempDate.hours;
	format.minutes = tempDate.minutes;
	return format;
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

function customDate2(date) {
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
		],
		wekdayName = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
	return (
		wekdayName[date.getDay() + 0] +
		', ' +
		monthNames[date.getMonth() + 0] +
		' ' +
		date.getDate()
	);
}

function showResponse(query, filterStr = '') {
	try {
		showHideLoader(false);
		resetResLoad();
		$('.result-recipe ul.result-list').empty();
		var apiUrl = API_RESPONSE;
		if (query) {
			filterStr = !!filterStr ? '&' + filterStr : '';
			apiUrl = API_RESPONSE + '?q=' + query + filterStr;
		} else {
			if (filterStr) {
				apiUrl = API_RESPONSE + '?' + filterStr;
			}
		}
		apiReqController = $.ajax({
			type: 'GET',
			url: apiUrl,
			dataType: 'JSON',
			beforeSend: function () {
				if (apiReqController != null) {
					apiReqController.abort();
					showHideLoader(false);
				}
			},
			success: function (data) {
				if (!!data) {
					response = data['hits'];
					if (!!response) {
						$('.loader').hide();
						$('.error-msg').hide();

						// recipe loading
						recipeLoadParams.overallLimit = response.length;
						recipeLoadParams.response = response;
						responseHtmlImage();
					}
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				showHideLoader(true);
			}
		});
	} catch (err) {
		showHideLoader(true);
		console.log(err);
	}
}
function showHideLoader(showOrHide) {
	if (showOrHide) {
		$('.loader').hide();
		$('.error-msg').show();
	} else {
		$('.error-msg').hide();
		$('.loader').show();
	}
}
function resetResLoad() {
	recipeLoadParams.overallLimit = 0;
	recipeLoadParams.resLimit = 0;
	recipeLoadParams.response = [];
}
function responseHtmlImage() {
	var limit = recipeLoadParams.resLimit;
	var overallLimit = recipeLoadParams.overallLimit;
	var iterLimit = recipeLoadParams.iterLimit;
	if (overallLimit > 0) {
		var initIndex = limit ? limit : 0;
		var _len =
			overallLimit > limit
				? overallLimit >= limit + iterLimit
					? limit + iterLimit
					: limit + (overallLimit - limit)
				: limit;
		if (_len > 0 && _len <= overallLimit) {
			recipeLoadParams.resLimit = _len;
			for (var i = initIndex; i < _len; i++) {
				var recipeObj = makeRecipe(recipeLoadParams.response[i].recipe, i);
				$('.result-recipe ul.result-list').append(recipeObj);
			}
			if (_len == overallLimit) {
				recipeLoadParams.resLimit = overallLimit + 1;
				$('.result-recipe ul.result-list').append(
					'<div class="edman-logo tracker" data-event_name="userClick" data-event_action="ApiAttributionClick" id="edamam-badge"></div>'
				);
				setAttribution();
			}
		}
	} else {
		showHideLoader(true);
	}
}

function setScrollFuncOnResults() {
	$('.result-recipe ul.result-list').on('scroll', function (e) {
		if (
			recipeLoadParams.overallLimit > 0 &&
			recipeLoadParams.overallLimit >= recipeLoadParams.resLimit
		) {
			var scrollPosn = $(this).scrollTop() + $(this).height() + 80;
			if (scrollPosn >= this.scrollHeight) {
				responseHtmlImage();
			}
		}
	});
}

function makeRecipe(data, index) {
	var dietLabel = data.dietLabels[0] || data.healthLabels[0] || '';
	var labelFull = escapeHtml(data.label);
	var label = escapeHtml(data.label);
	if (label.length > 30) {
		label = label.substring(0, 30) + '...';
	}
	var link = data.url;
	// var videoLabel = label.split(/\s+/).join('+');
	var VideoLink = getVideoLink(label);
	var image = data.image;
	var ingredient = data.ingredientLines + '';
	if (ingredient.length > 145) {
		ingredient = ingredient.substring(0, 155) + '...';
	}
	var fat = Math.floor(
		data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity : 0
	);
	var carb = Math.floor(
		data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity : 0
	);
	var protein = Math.floor(
		data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity : 0
	);
	var total = fat + carb + protein;

	var fatBarLength = Math.ceil((45 * fat) / total);
	var carbBarLength = Math.ceil((45 * carb) / total);
	var proteinBarLength = Math.ceil((45 * protein) / total);
	var recipeHtml = `<li class="recipe-wrap"  style="background-image: url(${image});">
    <div class="recipe">
        <h2  view-ingredients-id='${index}'  class="ingreident-view  recipe-heading ing-recipe-heading">${label}</h2>
    </div>
    <div class="recipe-info">
        <div class="recipe-navbar">
            <div class="recipe-nav">
                <div view-ingredients-id='${index}' class="cursorPointer ingreident-view recipe-nav-link recipe-view-ing">
                    View Ingredients
                </div>
            </div>
            <p class="nav-line"></p>
            <div class="recipe-nav">
                <div nutrition-facts-id='${index}' class="cursorPointer nutrition-content recipe-nav-link recipe-nutr-fact">
                    Nutrition Facts
                </div>
            </div>
            <p class="nav-line"></p>
            <div class="recipe-nav">
                <a href="${link}" target="_blank" class="tracker recipe-nav-link recipe-reci_view" data-event_name="FunctionalClick" data-event_action="RecipeVideoLink" data-event_str_value="${VideoLink}">
                  View Recipe
                </a>
            </div>
        </div>
    </div>
</li>`;
	return recipeHtml;
}

function getVideoLink(label) {
	var videoLabel = label.split(/\s+/).join('+');
	var VideoLink = 'https://www.youtube.com/results?search_query=' + videoLabel;
	return VideoLink;
}

function setAttribution() {
	function attr() {
		var tag = 'badge.png',
			attr = $("#edamam-badge"),
			url = 'https://developer.edamam.com/images/';
		(tag =
			'<a href="https://developer.edamam.com" title="Powered by Edamam" target="_blank"><img alt="Powered by Edamam" src="' +
			url +
			tag +
			'" height="40" width="200" /></a>'),
			attr.html(tag);
	}
	attr();
}

$(document).on('click', '.ingreident-view', function (e) {
	e.preventDefault();

	var ingreId = parseInt($(this).attr('view-ingredients-id'));
	$('.result-recipe-wrap').addClass('show-recipe-desc');
	$('.recipe-desc-wrap').removeClass('recipe-nutritent-wrap');
	// console.log('view ingredient clicked  ' + ingreId);
	updateRescipeDesc(ingreId);

	// $('#recipeHeading').
});
$(document).on('click', '.nutrition-content', function (e) {
	e.preventDefault();

	var nutriId = $(this).attr('nutrition-facts-id');
	$('.result-recipe-wrap').addClass('show-recipe-desc');
	$('.recipe-desc-wrap').addClass('recipe-nutritent-wrap');
	// console.log('nutrition-content clicked  ' + nutriId);
	updateRescipeDesc(nutriId);
});

function updateRescipeDesc(index) {
	var ingredientData = recipeLoadParams.response[index].recipe;
	var videoLink = getVideoLink(ingredientData.label);
	var labelFull = ingredientData.label;
	$('#ingredientImage').attr('src', ingredientData.image);
	$('#ingredientImage').attr('alt', ingredientData.label);
	$('#nutritionId').attr('nutrition-facts-id', index);
	$('#IngredientId').attr('view-ingredients-id', index);
	$('#recipeHeading')[0].textContent = ingredientData.label;
	$('#recipeVideoDec').attr(
		'href',
		`${ingredientData.url}`

	);
	$('#recipeViewDec').attr(
		'href',
		`${ingredientData.url}` +
			labelFull
	);
	$('#recipeVideoDec').attr(
		'data-str_value',
		`${ingredientData.url}`
	);
	$('#recipeViewDec').attr(
		'data-str_value',
		`${ingredientData.url}` +
			labelFull
	);
	displayIngredientStep(ingredientData.ingredientLines);
	displayNutrientValue(ingredientData.totalNutrients);
}
function displayIngredientStep(steps) {
	$('#recipeIngredientId').empty();
	var stepsIngr = '';
	for (var i = 0; i < steps.length; i++) {
		stepsIngr += '<p class="recipe-ing-step">' + escapeHtml(steps[i]) + '</p>';
	}
	$('#recipeIngredientId').append(stepsIngr);
	var dummyDiv = '<div class="ff-dummy"></div>';
	$('#recipeIngredientId').append(dummyDiv);
}
function displayNutrientValue(nutritent) {
	var protein, energy, fat, carbs, sugar, fiber, cholestrol, iron;
	var barWiddth = 220;
	protein = Math.floor(
		nutritent.PROCNT.quantity ? nutritent.PROCNT.quantity : 0
	);
	energy = Math.floor(
		nutritent.ENERC_KCAL.quantity ? nutritent.ENERC_KCAL.quantity : 0
	);
	fat = Math.floor(nutritent.FAT.quantity ? nutritent.FAT.quantity : 0);
	carbs = Math.floor(nutritent.CHOCDF.quantity ? nutritent.CHOCDF.quantity : 0);
	sugar = Math.floor(nutritent.SUGAR.quantity ? nutritent.SUGAR.quantity : 0);
	fiber = Math.floor(nutritent.FIBTG.quantity ? nutritent.FIBTG.quantity : 0);
	cholestrol = Math.floor(
		nutritent.CHOLE.quantity ? nutritent.CHOLE.quantity : 0
	);
	iron = Math.floor(nutritent.FE.quantity ? nutritent.FE.quantity : 0);
	var total =
		protein + energy + fat + carbs + sugar + fiber + cholestrol + iron;
	$('#energyNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * energy) / total) + 'px'
	);
	$('#proteinNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * protein) / total) + 'px'
	);
	$('#fatNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * fat) / total) + 'px'
	);
	$('#carbsNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * carbs) / total) + 'px'
	);
	$('#sugarNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * sugar) / total) + 'px'
	);
	$('#fiberNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * fiber) / total) + 'px'
	);
	$('#cholestrolNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * cholestrol) / total) + 'px'
	);
	$('#ironNut .nut-bar-blue').css(
		'width',
		Math.ceil((barWiddth * iron) / total) + 'px'
	);

	$('#energyNut .nut-value')[0].textContent = energy + ' Kcal';
	$('#proteinNut .nut-value')[0].textContent = protein + ' gm';
	$('#fatNut .nut-value')[0].textContent = fat + ' gm';
	$('#carbsNut .nut-value')[0].textContent = carbs + ' gm';
	$('#sugarNut .nut-value')[0].textContent = sugar + ' gm';
	$('#fiberNut .nut-value')[0].textContent = fiber + ' gm';
	$('#cholestrolNut .nut-value')[0].textContent = cholestrol + ' mg';
	$('#ironNut .nut-value')[0].textContent = iron + ' mg';
}

$(document).on('click', '.gobacLk', function (e) {
	$('.result-recipe-wrap').removeClass('show-recipe-desc');
});

$(document).on('click', '.goHomePageLk', function (e) {
	var applyBtn = document.getElementById('filt-apply-btn');
	var resetBtn = document.getElementById('reset-filter-btn');
	var filterSelectors = document.querySelectorAll('[filter-checkbox]');
	var clearSearchBtn = document.getElementById('clear-search-btn');

	clearSearchBtn.classList.remove('clear-active');
	searchValue = null;
	$('.recipe-input').val('');

	for (var i = 0; i < filterSelectors.length; i++) {
		filterSelectors[i].checked = false;
	}
	applyBtn.classList.add('disabled-btn');
	resetBtn.classList.add('disabled-btn');

	filterCheckedList = {};
	allCheckedBoxes = null;

	$('.result-recipe-wrap').addClass('toggl-open');
	$('.sidemenu-header, .filter-recipe-wrap').removeClass('toggl-open');
	setFilterCount(null, 0);
	$('.filter-opt-block').removeClass('toggl-open');
	filterFlags.resetingState = false;
	showResponse();
});
