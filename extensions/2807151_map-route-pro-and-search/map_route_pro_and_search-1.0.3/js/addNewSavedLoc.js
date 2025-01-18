const mapTabNewLocFormSec = document.querySelector('#map-tab-add-new-loc-form');
const mapsTabSavedLocList = document.querySelector('#maps-tab-saved-loc-list');

const addNewSavedLocHTML = () => {
	try {
		const mapTabNewLocFormSecHTML = mapTabNewLocFormSec.innerHTML;
		if (mapTabNewLocFormSecHTML === '') {
			const html = `
			<div id='newLocation'>
				<form class="saved-loc-submit" id="saved-loc-form">
					<input
						type="text"
						placeholder="Name"
						id="maps-tab-add-new-loc-input"
						autocomplete="off"
					/>
					<input type="submit" hidden />
					<span class="searh-reset" id="cancel-add-loc-maps-tab"><img src="./images/close-save-1.svg" /></span>
				</form>
        	<div>`;
			addHTML(mapTabNewLocFormSec, 'prepend', html);
			document.getElementById('saved-loc-form').addEventListener('submit', event => addNewSavedLocCat(event));
			document.querySelector('#cancel-add-loc-maps-tab').addEventListener('click', () => cancelAddLocationMaps());
			const input = document.getElementById('maps-tab-add-new-loc-input');
			if (input) input.focus();
		} else {
			const input = document.getElementById('maps-tab-add-new-loc-input');
			if (input) input.focus();
		}
	} catch (ex) {
		return;
	}
};

const localStorageOperations = function (outerText, text, operation, event = null) {
	const utils = localStorageFunctions();
	const typeOfLocation = outerText;
	const lKey = typeOfLocation + objKey;
	if (operation === 'save') {
		let newLocation = {
			text,
			lon: userClickedLon,
			lat: userClickedLat,
		};

		if (!utils.getFromLocalStorage(lKey)) {
			utils.saveToLocalStorage(lKey, [newLocation]);
		} else {
			const currentSavedLocations = utils.getFromLocalStorage(lKey);
			if (newLocation.text && newLocation.lat && newLocation.lon) {
				const obj = [...currentSavedLocations, ...[newLocation]];
				utils.saveToLocalStorage(lKey, obj);
			} else {
				alert('Error in saving as lat, lon can not be fetched');
			}
		}
	}
	if (operation === 'remove') {
		if (!utils.getFromLocalStorage(lKey)) {
			return;
		} else {
			const currentSavedLocations = utils.getFromLocalStorage(lKey);
			const idx = currentSavedLocations.findIndex(obj => obj.text === text);
			if (idx > -1) {
				currentSavedLocations.splice(idx, 1);
			}
			const obj = [...currentSavedLocations];
			utils.saveToLocalStorage(lKey, obj);
		}
	}
};
const locationNameValidationmessage = 'Location name can only contain alphabets or numbers';

function isValidString(inputString) {
	// Regular expression to match only numbers and alphabets
	const regex = /^[a-zA-Z0-9\s]+$/;

	return regex.test(inputString);
}
const addNewSavedLocCat = event => {
	try {
		event.preventDefault();
		const name = event.target[0].value.trim();
		if (!isValidString(name) || !name) {
			alert(locationNameValidationmessage);
			return;
		}
		if (name) {
			clearHTML(mapTabNewLocFormSec);
			let savedTypes = utils.getFromLocalStorage(savedLocationTypesKey);
			if (Array.isArray(savedTypes)) {
				if (savedTypes.indexOf(name) > -1) {
					alert('Location by this name already exists.');
					return;
				}
				savedTypes.push(name);
				utils.saveToLocalStorage(savedLocationTypesKey, savedTypes);
			}
			const html = `
			<li class="parent-li-maps-tab">
				<img
				src="./images/generic-saved.svg"
				alt="maps-icon"
				class="def-icon"
				/>
				<img src="./images/loc-active.svg" class="active-icon">
				<span>${name}</span>
				<div class="saved-popup">
				<span>
					<img src="./images/right-mark.svg" alt="right-mark">
				</span>
				Saved to ${name}
				</div>
				<div class="removed-popup">
				Removed from ${name}
				</div>
        	</li>`;
			addHTML(mapsTabSavedLocList, 'append', html);
		}
	} catch (ex) {
		return;
	}
};

const cancelAddLocationMaps = () => {
	clearHTML(mapTabNewLocFormSec);
};
document.querySelector('#maps-tab-add-save-loc').addEventListener('click', () => addNewSavedLocHTML());
const allForms = document.querySelectorAll('#map-tab-add-new-loc-form');
document.querySelector('#maps-tab-saved-loc-list').addEventListener('click', event => {
	const elem = event.target;
	let operation;
	if (elem.outerText === 'Save To:') return;
	if (resultsQueryInput.value.trim() !== '' && userClickedLat && userClickedLat) {
		if (elem.classList.contains('active')) {
			operation = 'remove';
			localStorageOperations(event.target.outerText, resultsQueryInput.value.trim(), operation, event);
			elem.classList.add('removed');
			setTimeout(() => {
				elem.classList.remove('active');
				elem.classList.remove('removed');
			}, 2000);
		} else {
			operation = 'save';
			localStorageOperations(event.target.outerText, resultsQueryInput.value.trim(), operation, event);
			elem.classList.add('saved');
			setTimeout(() => {
				elem.classList.add('active');
				elem.classList.remove('saved');
			}, 2000);
		}
	} else {
		alert('Please select a valid location');
	}
});

