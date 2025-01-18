const API_BASE_URL = 'https://maproutepro.com';
const privacyConsentLocalStorageKey = '60b1de41a72aaac84e41d8ed0d341352';
const disabledOverlayLocalStorageKey = '2ae4b814b836404f78e0eb39c9517d5a';
const localKeyLocation = 'userLocation';
let savedLocationTypes = [];
const savedLocationTypesKey = 'savedLocationTypes';
let currentUrl;
let isOptedIn = null;
let showDisabledOverlay = null;
const utils = localStorageFunctions();
let userLocationFromApi;
const checkSharedMap = function () {
	const url = new URL(location);
	const maps = url.searchParams.get('maps');
	const directions = url.searchParams.get('directions');
	if (maps) {
		let jsonMap;
		try {
			jsonMap = JSON.parse(atob(decodeURIComponent(decodeURIComponent(maps))));
			const {text, lon, lat} = jsonMap;
			if (text && lon && lat) {
				// filling values as they might be used elsewhere from these variables
				document.querySelector('#results-maps-tab').click();
				userClickedLat = lat;
				userClickedLon = lon;
				resultsQueryInput.value = text;
				loadResultsPage();
				getMap(lon, lat, 'myMap');
			}
		} catch (ex) {
			console.log('Invalid URL' + ex);
		}
	} else if (directions) {
		let jsonMap;
		try {
			jsonMap = JSON.parse(atob(decodeURIComponent(decodeURIComponent(directions))));
			const {fromText, toText, fromLon, fromLat, toLon, toLat, mode} = jsonMap;
			if (fromText && toText && fromLon && fromLat && toLon && toLat && mode) {
				// filling values as they might be used elsewhere from these variables
				document.querySelector('#results-directions-tab').click();
				userClickedFromLon = fromLon;
				userClickedFromLat = fromLat;
				userClickedToLon = toLon;
				userClickedToLat = toLat;
				resultsQueryFromInput.value = fromText;
				modeOfTravel = mode;
				resultsQueryToInput.value = toText;
				loadResultsPage();
				getDirections([userClickedFromLon, userClickedFromLat], [userClickedToLon, userClickedToLat], modeOfTravel, 'myMap');
			}
		} catch (ex) {
			console.log('Invalid URL' + ex);
		}
	} else {
		document.querySelector('.container-main').style.display = 'block';
		document.querySelector('.container-result').style.display = 'none';
		queryFromInput.focus();		
	}
};
const fetchUserLocation = async () => {
	try {
		userLocationFromApi = await (await fetch(`${API_BASE_URL}/api/getLocation`)).json();
		const localObj = {
			...userLocationFromApi,
			savedTime: Date.now(),
		};
		utils.saveToLocalStorage(localKeyLocation, localObj);
		userLocation = userLocationFromApi;
	} catch (ex) {
		console.log('API Error :>> ', ex);
	}
};

const getUserLocation = async () => {
	let userDataFromLocal = utils.getFromLocalStorage(localKeyLocation);
	if (userDataFromLocal) {
		const currentTimeinMiliseconds = Date.now();
		if (currentTimeinMiliseconds - userDataFromLocal.savedTime > 900000) await fetchUserLocation();
		else userLocation = {latitude: userDataFromLocal.latitude, longitude: userDataFromLocal.longitude};
	} else {
		await fetchUserLocation();
	}
};
document.querySelector('body').onload = async () => {
	checkSharedMap();
	getSavedLocationTypes();
	getUserLocation();
};

document.querySelectorAll('form').forEach(form =>
	form.addEventListener('submit', event => {
		event.preventDefault();
	})
);

const headerTime = document.querySelector('header .curr-time');
const headerDate = document.querySelector('header .curr-date ');

document.addEventListener('DOMContentLoaded', function () {
	const optionTwoReference = document.getElementById('opt2');

	isOptedIn = getFromLocalStorage(privacyConsentLocalStorageKey);
	showDisabledOverlay = getFromLocalStorage(disabledOverlayLocalStorageKey);

	const disabledOverlay = document.querySelector('.disabled-overlay');
	const privacyOptinOverlay = document.querySelector('.privacyOptin-overlay');

	function getFromLocalStorage(key) {
		const consent = localStorage.getItem(key);
		return consent !== null ? JSON.parse(consent) : null;
	}

	function saveToLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	if (optionTwoReference) {
		optionTwoReference.checked = true;
	}

	function handleAccept() {
		showDisabledOverlay = false;
		isOptedIn = true;
		saveToLocalStorage(privacyConsentLocalStorageKey, true);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function handleDecline() {
		showDisabledOverlay = true;
		isOptedIn = false;
		saveToLocalStorage(privacyConsentLocalStorageKey, false);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function viewPermission() {
		showDisabledOverlay = false;
		isOptedIn = null;
		saveToLocalStorage(privacyConsentLocalStorageKey, null);
		saveToLocalStorage(disabledOverlayLocalStorageKey, showDisabledOverlay);
		updateView();
	}

	function updateView() {
		if (isOptedIn) {
			privacyOptinOverlay.style.display = 'none';
		} else if (showDisabledOverlay) {
			privacyOptinOverlay.style.display = 'none';
			disabledOverlay.style.display = 'flex';
		} else {
			disabledOverlay.style.display = 'none';
			privacyOptinOverlay.style.display = 'flex';
		}
	}

	const enableOptinCta = document.querySelector('.enable-optinCta');
	const optinCta = document.querySelector('.optin-cta');
	const optinCTAAgree = document.querySelector('.optin-cta.agree');
	const optinCTADisAgree = document.querySelector('.optin-cta.disagree');

	enableOptinCta.addEventListener('click', viewPermission);

	optinCTAAgree?.addEventListener('click', function () {
		handleAccept();
	})

	optinCTADisAgree?.addEventListener('click', function () {
		handleDecline();
	})
	updateView();
});
const getSavedLocationTypes = () => {
	const types = utils.getFromLocalStorage(savedLocationTypesKey);
	if (!types) utils.saveToLocalStorage(savedLocationTypesKey, savedLocationTypes);
	else savedLocationTypes = types;
};
