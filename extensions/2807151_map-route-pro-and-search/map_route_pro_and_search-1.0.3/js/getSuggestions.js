let userClickedLon = null,
	userClickedLat = null,
	userClickedFromLon = null,
	userClickedFromLat = null,
	userClickedToLon = null,
	userClickedToLat = null,
	fromAddress = null,
	toAddress = null;
var subscriptionKey = 'Mh9e4vUGkIz3YZXHboxqCfCSsagNoeR3N857oi2LaL0';
var queryInput = document.getElementById('query');
var queryFromInput = document.getElementById('query-from');
var queryToInput = document.getElementById('query-to');
const saveLocTabAddLocInputs = document.querySelectorAll('#saved-loc-tab-add-input');
var resultsQueryInput = document.getElementById('results-query');
var resultsQueryFromInput = document.getElementById('results-query-from');
var resultsQueryToInput = document.getElementById('results-query-to');
var searchURL = 'https://atlas.microsoft.com/search/poi/json';
let userLocation = {};
let suggestion;
let suggestionListName;
const resultsCarMode = document.querySelector('#results-car-mode');
const resultsWalkMode = document.querySelector('#results-walk-mode');
const resultsBicycleMode = document.querySelector('#results-bicycle-mode');

function fromSubmitPreventDefaultEvent(event) {
	event.preventDefault();
}
function handleQueryKeyUp(field, event = null) {
	var query;
	resetCords(field);
	if (field === 'saved-loc-tab-add-input') {
		query = event.target.value;
	} else query = document.getElementById(field).value.trim();

	if (query !== '') {
		if (field === 'saved-loc-tab-add-input') {
			document.querySelectorAll('#saved-results .suggest-list').forEach(list => (list.id = ''));
			document.querySelectorAll('#saved-results .suggest-list').forEach(el => (el.style.display = 'none'));
			event.target.nextElementSibling.id = 'saved-loc-suggestion-list';
		}
		fetchSuggestions(query, field, event);
	} else {
		document.getElementById(field).classList.remove('focus-field');
		clearSuggestions();
	}
}

const resetCords = field => {
	if (field === 'query' || field === 'results-query') {
		userClickedLon = null;
		userClickedLat = null;
	}
	if (field === 'query-from' || field === 'results-query-from') {
		userClickedFromLon = null;
		userClickedFromLat = null;
	}
	if (field === 'query-to' || field === 'results-query-to') {
		userClickedToLon = null;
		userClickedToLat = null;
	}
};

function fetchSuggestions(query, field, event) {
	var requestURL =
		searchURL +
		'?subscription-key=' +
		subscriptionKey +
		'&api-version=1.0&typeahead=true&maxFuzzyLevel=1&minFuzzyLevel=1&query=' +
		encodeURIComponent(query);

	const inputField = document.querySelector('#' + field);
	if (userLocation && userLocation.latitude && userLocation.longitude) {
		requestURL += '&lat=' + userLocation.latitude + '&lon=' + userLocation.longitude;
	}

	switch (field) {
		case 'query':
			suggestionListName = 'suggestion-list';
			break;

		case 'query-from':
			suggestionListName = 'suggestion-list-from';
			break;

		case 'query-to':
			suggestionListName = 'suggestion-list-to';
			break;

		case 'results-query':
			suggestionListName = 'results-suggestion-list';
			break;

		case 'results-query-from':
			suggestionListName = 'results-suggestion-list-from';
			break;

		case 'results-query-to':
			suggestionListName = 'results-suggestion-list-to';
			break;
		case 'saved-loc-tab-add-input':
			suggestionListName = 'saved-loc-suggestion-list';
			break;
	}

	fetch(requestURL)
		.then(function (response) {
			if (!response.ok) {
				throw new Error('Network response was not OK');
			}
			return response.json();
		})
		.then(function (data) {
			showSuggestions(data, field, event);
			if (data.results.length) {
				document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));
				document.querySelector('#' + suggestionListName).style.display = 'block';
				queryInput.classList.remove('focus-field');
				queryFromInput.classList.remove('focus-field');
				queryToInput.classList.remove('focus-field');
				resultsQueryInput.classList.remove('focus-field');
				resultsQueryFromInput.classList.remove('focus-field');
				resultsQueryToInput.classList.remove('focus-field');
				inputField.classList.add('focus-field');
			} else {
				document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));
				inputField.classList.remove('focus-field');
			}
		})
		.catch(function (error) {
			console.log('Error:', error.message);
		});
}

function showSuggestions(data, field, event) {
	try {
		clearSuggestions();
		var suggestionList = document.getElementById(suggestionListName);
		var suggestions = data && data.results ? data.results : [];
		if (field !== 'saved-loc-tab-add-input') {
			var savedLoc = document.createElement('div');
			savedLoc.classList.add('suggestion-item');
			savedLoc.classList.add('saved-loc-item');
			savedLoc.classList.add('saved-locations-dropdown');
			savedLoc.textContent = 'Saved Locations';
			suggestionList.appendChild(savedLoc);
			const checkPageContainer = () => {
				if (field === 'results-query' || field === 'results-query-from' || field === 'results-query-to') {
					pageContainer = 'container-result';
				} else {
					pageContainer = 'container-main';
				}
				return pageContainer;
			};

			document.querySelectorAll('.saved-category-overlay-close').forEach(close =>
				close.addEventListener('click', function () {
					const pageContainer = checkPageContainer();
					const savedLocationsOverlay = document.querySelector(`.${pageContainer} .saved-category-overlay`);
					savedLocationsOverlay.style.display = 'none';
					removeFromSavedLocationOverlay();
				})
			);

			const removeFromSavedLocationOverlay = () => {
				const savedLocationsOverlay = document.querySelector(`.${pageContainer} .saved-category-overlay`);
				savedLocationsOverlay.querySelectorAll('ul li').forEach(list => {
					const locationType = list.querySelector('.saved-item').outerText.trim();

					list.remove();
				});
			};
			savedLoc.addEventListener('click', function (event) {
				const pageContainer = checkPageContainer();
				const savedLocationsOverlay = document.querySelector(`.${pageContainer} .saved-category-overlay`);
				savedLocationsOverlay.style.display = 'flex';
				const savedLocationTypes = utils.getFromLocalStorage('savedLocationTypes');
				const fillSavedLocationsOverlay = elem => {
					if (elem instanceof HTMLElement && Array.isArray(savedLocationTypes)) {
						let html = `
						<li>
							<div class="saved-item">
								<img class="img-cnt" src="./images/home.svg" alt="">
							<span class="item-type">Home</span>
							</div>
							</li>
							<li>
							<div class="saved-item">
								<img class="img-cnt" src="./images/work.svg" alt="">
								<span class="item-type">Work</span>
							</div>
						</li>`;
						savedLocationTypes.forEach(
							location =>
								(html =
									html +
									`<li>
								<div class="saved-item">
								<img class="img-cnt" src="./images/map-pin.svg" alt=""/>
									<p class="item-type">${location}</span>
								</div>
							</li>`)
						);
						addHTML(elem.querySelector('ul'), 'append', html);
						elem.querySelectorAll('ul li').forEach(list => {
							const savedItem = list.querySelector('.saved-item');
							const listType = savedItem.querySelector('.item-type').outerText;
							console.log(listType);
							if (listType) {
								const locations = utils.getFromLocalStorage(listType + objKey);
								if (locations && Array.isArray(locations) && locations.length && savedItem instanceof HTMLElement) {
									const listDiv = '<div class="saved-addresses"></div>';
									addHTML(savedItem, 'after', listDiv);
									const savedAddressList = savedItem.nextElementSibling;
									locations.forEach(location => {
										addHTML(savedAddressList, 'append', `<p>${location.text}</p>`);
									});
									savedAddressList.querySelectorAll('p').forEach(address =>
										address.addEventListener('click', eventAddress => {
											const elem = eventAddress.target;
											if (elem instanceof HTMLElement) {
												const value = elem.outerText;
												const suggestList = event.target.closest('.suggest-list');
												const input = suggestList.previousElementSibling;
												if (input instanceof HTMLInputElement) input.value = value;

												savedLocationsOverlay.style.display = 'none';
												document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));
												const address = elem.outerText;
												const idx = locations.findIndex(adr => adr.text === address);
												removeFromSavedLocationOverlay();
												if (idx > -1) {
													const locData = locations[idx];
													fillCords(field, locData.text, locData.lon, locData.lat);
												}
												if (field === 'results-query') {
													getMap(userClickedLon, userClickedLat, 'myMap');
												}
											}
										})
									);
								}
							}
						});
					}
				};

				fillSavedLocationsOverlay(savedLocationsOverlay);

				const elem = event.target;

				if (elem && elem instanceof HTMLElement) {
					const input = elem.closest('.suggest-list').previousElementSibling;
				}
			});
		}
		for (var i = 0; i < suggestions.length; i++) {
			suggestion = suggestions[i];
			var item = document.createElement('div');
			item.classList.add('suggestion-item');
			const value = `${suggestion.poi?.name ? suggestion.poi?.name + ',' : ''} ${suggestion.address.freeformAddress}`.trim();
			item.textContent = value;
			item.dataset.lon = suggestion.position.lon;
			item.dataset.lat = suggestion.position.lat;
			item.addEventListener('click', function (e) {
				document.querySelector('#' + field).classList.remove('focus-field');
				const lon = Number(e.target.dataset.lon);
				const lat = Number(e.target.dataset.lat);
				userClickedLon = lon;
				userClickedLat = lat;
				if (field === 'saved-loc-tab-add-input') {
					event.target.value = value;
					addFromInputSavedLoc(event);
				}
				if (field.indexOf('results' > -1)) {
					if (field === 'results-query') {
						const url = new URL(location);
						resultsQueryInput.value = value;
						generateMapsURL(url, resultsQueryInput.value);
						const getParams = url.searchParams.get('maps');
						const params = atob(decodeURIComponent(decodeURIComponent(getParams)));
						const jsonParams = JSON.parse(params);
						resultsQueryInput.value = jsonParams.text;
						getMap(jsonParams.lon, jsonParams.lat, 'myMap');
						checkSavedLocations();
					}
				}
				if (field === 'query' || field === 'results-query') {
					resultsQueryInput.value = value;
				}
				fillCords(field, e.target.innerText, lon, lat);
				document.querySelector('#' + field).value = value.trim();
				document.querySelector('#' + field).classList.remove('focus-field');
				clearSuggestions();
			});

			suggestionList.appendChild(item);
		}
	} catch (ex) {
		return;
	}
}

const fillCords = (field, text, lon, lat) => {
	if (field === 'query' || field === 'results-query') {
		userClickedLon = lon;
		userClickedLat = lat;
	}
	if (field === 'query-from' || field === 'results-query-from') {
		userClickedFromLon = lon;
		userClickedFromLat = lat;
		fromAddress = text;
	}
	if (field === 'query-to' || field === 'results-query-to') {
		userClickedToLon = lon;
		userClickedToLat = lat;
		toAddress = text;
	}
};

function swapDirectionsInputs(view) {
	if (view === 'home') {
		const tempSourceDirectionText = queryFromInput.value;
		const tempUserClickedFromLon = userClickedFromLon;
		const tempUserClickedFromLat = userClickedFromLat;
		const tempfromAddress = fromAddress;
		fromAddress = toAddress;
		toAddress = tempfromAddress;
		queryFromInput.value = queryToInput.value;
		queryToInput.value = tempSourceDirectionText;
		userClickedFromLat = userClickedToLat;
		userClickedFromLon = userClickedToLon;
		userClickedToLat = tempUserClickedFromLat;
		userClickedToLon = tempUserClickedFromLon;
	}

	if (view === 'results') {
		const tempSourceDirectionText = resultsQueryFromInput.value;
		const tempUserClickedFromLon = userClickedFromLon;
		const tempUserClickedFromLat = userClickedFromLat;
		const tempfromAddress = fromAddress;
		fromAddress = toAddress;
		toAddress = tempfromAddress;
		resultsQueryFromInput.value = resultsQueryToInput.value;
		resultsQueryToInput.value = tempSourceDirectionText;
		userClickedFromLat = userClickedToLat;
		userClickedFromLon = userClickedToLon;
		userClickedToLat = tempUserClickedFromLat;
		userClickedToLon = tempUserClickedFromLon;
	}
}

function generateMapsURL(url, text) {
	const renderMapParams = {
		text,
		lon: userClickedLon,
		lat: userClickedLat,
	};
	const param = encodeURIComponent(btoa(JSON.stringify(renderMapParams)));
	url.searchParams.delete('directions');
	url.searchParams.set('maps', param);
	history.pushState({}, '', url);
}

function generateDirectionsURL(url, fromText, toText, modeOfTravel) {
	const renderDirectionsParams = {
		fromText,
		toText,
		fromLon: userClickedFromLon,
		fromLat: userClickedFromLat,
		toLon: userClickedToLon,
		toLat: userClickedToLat,
		mode: modeOfTravel,
	};
	const param = encodeURIComponent(btoa(JSON.stringify(renderDirectionsParams)));
	url.searchParams.delete('maps');
	url.searchParams.set('directions', param);
	history.pushState({}, '', url);
}

function loadResultsPage() {
	mapsTabSavedLocList.querySelectorAll('.parent-li-maps-tab').forEach((list, idx) => {
		if (idx > 2) list.remove();
	});
	saveLocTabSavedLocList.querySelectorAll('.parent-li').forEach((list, idx) => {
		if (idx > 1) list.remove();
	});
	document.querySelectorAll('.saved-address-list').forEach(list => clearHTML(list));
	try {
		const addSavedAddressList = (addresses, ULlist) => {
			addresses.forEach(address => {
				const html = `
				<li>
					<p class="address-txt">${address.text}</p>
					<div class="saved-add-icons">
						<span class="save-tab-get-directions">
							<img src="./images/direction-right.svg" />
						</span>
						<span class="address-delete">
							<img src="./images/search-clear.svg" />
						</span>
					</div>
				</li>`;
				addHTML(ULlist, 'append', html);
			});
		};

		const savedLocationTypes = utils.getFromLocalStorage(savedLocationTypesKey);
		const homeUL = document.querySelectorAll('.saved-loc2-child .saved-address-list')[0];
		const workUL = document.querySelectorAll('.saved-loc2-child .saved-address-list')[1];

		const homeSavedAddress = utils.getFromLocalStorage('Home' + objKey);
		const workSavedAddress = utils.getFromLocalStorage('Work' + objKey);
		if (homeSavedAddress && Array.isArray(homeSavedAddress) && homeSavedAddress.length) {
			addSavedAddressList(homeSavedAddress, homeUL);
			homeUL.querySelectorAll('.address-delete').forEach(del => del.addEventListener('click', event => deleteAddress(event)));
			homeUL.querySelectorAll('.save-tab-get-directions').forEach(dir => dir.addEventListener('click', event => savedTabGetDirections(event)));
		}
		if (workSavedAddress && Array.isArray(workSavedAddress) && workSavedAddress.length) {
			addSavedAddressList(workSavedAddress, workUL);
			workUL.querySelectorAll('.address-delete').forEach(del => del.addEventListener('click', event => deleteAddress(event)));
			workUL.querySelectorAll('.save-tab-get-directions').forEach(dir => dir.addEventListener('click', event => savedTabGetDirections(event)));
		}
		if (savedLocationTypes instanceof Array) {
			savedLocationTypes.forEach(location => {
				const html = `
				<li class="parent-li-maps-tab">
					<img
					src="./images/generic-saved.svg"
					alt="maps-icon"
					class="def-icon"
					/>
					<img src="./images/loc-active.svg" class="active-icon">
					<span>${location}</span>
					<div class="saved-popup">
					<span>
						<img src="./images/right-mark.svg" alt="right-mark">
					</span>
					Saved to ${location}
					</div>
					<div class="removed-popup">
					Removed from ${location}
					</div>
        		</li>`;
				addHTML(mapsTabSavedLocList, 'append', html);
			});

			savedLocationTypes.forEach(location => {
				const savedAddress = utils.getFromLocalStorage(location + objKey);
				const html = `
				<li class="saved-loc2-child parent-li">
					<div
						class="default-view"
					>
					<ul
						class="options-list"
					>
						<li>Add location</li>
						<li>Rename</li>
						<li>Delete</li>
					</ul>
					<div class="saved-loc-inner">
						<div class="saved-loc-left">
							<img src="./images/generic-saved.svg" />
							<span>${location}</span>
							
						</div>
						<div class="saved-loc-right">
							<img src="./images/options.svg" />
						</div>
					</div>
					<div class="saved-loc-usr-int">
					<div class="field-wrap">
						<input
							type="text"
							placeholder="Add location"
							id="saved-loc-tab-add-input"
							autocomplete="off"
						/>
						<div class="suggest-list"></div>
						</div>
						<ul
							class="saved-address-list"
						>
						</ul>
					</div>
					</div>
					<div class="rename-view">
						<span title="Cancel Rename" class="clear-search">
							<img src="./images/close-save-1.svg" />
						</span>
						<form id="renameLocForm">
							<input
								type="text"
								placeholder="Name"
								class="rename-add"
							/>
							<input type="submit" hidden />
						</form>
					</div>
        		</li>`;
				addHTML(saveLocTabSavedLocList, 'append', html);
				if (savedAddress && savedAddress.length) {
					savedAddress.forEach(address => {
						const html = `<li>
						<p class="address-txt">${address.text}</p>
						<div class="saved-add-icons">
							<span class="save-tab-get-directions">
								<img src="./images/direction-right.svg" />
							</span>
							<span class="address-delete">
								<img src="./images/search-clear.svg" />
							</span>
						</div>
						</li>`;
						const lastEle = Array.from(document.querySelectorAll('.saved-address-list')).pop();
						addHTML(lastEle, 'append', html);
						Array.from(document.querySelectorAll('.address-delete'))
							.pop()
							.addEventListener('click', event => deleteAddress(event));
						Array.from(document.querySelectorAll('.save-tab-get-directions'))
							.pop()
							.addEventListener('click', event => savedTabGetDirections(event));
					});
				}
				addSavedTabEventListners();
			});
		}
		checkSavedLocations();
	} catch (ex) {
		return;
	}
}

const checkSavedLocations = () => {
	const inputAddress = resultsQueryInput.value.trim();
	if (inputAddress) {
		mapsTabSavedLocList.querySelectorAll('li').forEach(list => list.classList.remove('active'));
		const savedLocationTypes = utils.getFromLocalStorage(savedLocationTypesKey);
		if (savedLocationTypes && Array.isArray(savedLocationTypes)) {
			savedLocationTypes.push('Home', 'Work');
		}
		if (savedLocationTypes && savedLocationTypes.length) {
			savedLocationTypes.forEach(type => {
				const addessesofType = utils.getFromLocalStorage(type + objKey);
				if (addessesofType && addessesofType instanceof Array && addessesofType.length) {
					if (addessesofType.findIndex(address => address.text === inputAddress) > -1) {
						mapsTabSavedLocList.querySelectorAll('li').forEach(list => {
							const txt = list.querySelector('span')?.outerText;
							if (txt === type) {
								list.classList.add('active');
							}
						});
					}
				}
			});
		}
	}
};

function changeView(field) {
	const url = new URL(location);
	if (field === 'maps') {
		if (!queryInput.value.trim() || userClickedLat === null || userClickedLon === null) {
			alert('Please select valid a location');
			return;
		} 
		generateMapsURL(url, queryInput.value);
	}
	loadResultsPage();
	if (field === 'maps') {
		const getParams = url.searchParams.get('maps');
		const params = atob(decodeURIComponent(decodeURIComponent(getParams)));
		const jsonParams = JSON.parse(params);
		document.querySelector('#results-maps-tab').classList.add('active');
		document.querySelector('#maps-results').style.display = 'block';
		resultsQueryInput.value = jsonParams.text;
		getMap(jsonParams.lon, jsonParams.lat, 'myMap');
		checkSavedLocations();
	}
	if (field === 'directions') {
		document.querySelector('#results-directions-tab').classList.add('active');
		document.querySelector('#direction-results').style.display = 'block';
		resultsQueryFromInput.value = queryFromInput.value;
		resultsQueryToInput.value = queryToInput.value;
		getDirections([userClickedFromLon, userClickedFromLat], [userClickedToLon, userClickedToLat], modeOfTravel, 'myMap');
	}
}

function clearSuggestions() {
	document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));

	var suggestionList = document.getElementById(suggestionListName);
	if (suggestionList) clearHTML(suggestionList);
}

saveLocTabAddLocInputs.forEach(input => input.addEventListener('keyup', event => handleQueryKeyUp('saved-loc-tab-add-input', event)));
queryInput.addEventListener('keyup', () => handleQueryKeyUp('query'));
queryFromInput.addEventListener('keyup', () => handleQueryKeyUp('query-from'));
queryToInput.addEventListener('keyup', () => handleQueryKeyUp('query-to'));
resultsQueryInput.addEventListener('keyup', () => handleQueryKeyUp('results-query'));
resultsQueryFromInput.addEventListener('keyup', () => handleQueryKeyUp('results-query-from'));
resultsQueryToInput.addEventListener('keyup', () => handleQueryKeyUp('results-query-to'));
document.querySelector('#results-reverse-directions').addEventListener('click', () => swapDirectionsInputs('results'));
document.querySelector('#home-reverse-directions').addEventListener('click', () => swapDirectionsInputs('home'));
document.querySelector('#home-get-directions').addEventListener('click', () => changeView('directions'));
document.querySelector('#home-get-maps').addEventListener('click', () => changeView('maps'));
document.querySelector('#results-maps-input-reset').addEventListener('click', () => {
	resultsQueryInput.value = '';
	userClickedLon = null;
	userClickedLat = null;
});
document.querySelector('#results-get-directions').addEventListener('click', () => {
	getDirections([userClickedFromLon, userClickedFromLat], [userClickedToLon, userClickedToLat], modeOfTravel, 'myMap');
});
