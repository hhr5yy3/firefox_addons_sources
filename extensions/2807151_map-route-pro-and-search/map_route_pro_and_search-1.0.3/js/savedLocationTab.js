let saveLocTabSavedLocList = document.querySelector('#save-loc-tab-saved-loc-list');
let checkDeleteClicked = {};
const deleteOverlay = document.querySelector('.delete-overlay');
deleteOverlay.querySelector('#cancel-btn').addEventListener('click', () => {
	deleteOverlay.style.display = 'none';
});
deleteOverlay.querySelector('#delete-btn').addEventListener('click', () => {
	const addresskey = checkDeleteClicked['locationType'] + objKey;
	let locationTypes = utils.getFromLocalStorage('savedLocationTypes');
	if (locationTypes && locationTypes.length && locationTypes instanceof Array) {
		const idx = locationTypes.findIndex(ele => ele === checkDeleteClicked['locationType']);
		if (idx > -1) {
			locationTypes.splice(idx, 1);
			utils.saveToLocalStorage('savedLocationTypes', locationTypes);
		}
	}
	if (utils.getFromLocalStorage(addresskey)) {
		localStorage.removeItem(addresskey);
	}
	checkDeleteClicked['parentLi'].remove();
	deleteOverlay.style.display = 'none';
});
deleteOverlay.querySelector('.close-btn').addEventListener('click', () => {
	deleteOverlay.style.display = 'none';
});
const toggleOptions = event => {
	const elem = event.target;
	if (elem) {
		const parent = elem.closest('.default-view');
		const list = parent.firstElementChild;
		const style = window.getComputedStyle(list);
		if (list) {
			if (style.display === 'none') optionList.forEach(menu => (menu.style.display = 'none'));
			list.style.display = style.display === 'block' ? 'none' : 'block';
		}
	}
};

const optionOperation = (event, operation) => {
	optionList.forEach(menu => (menu.style.display = 'none'));
	document.querySelectorAll('.saved-loc-usr-int #saved-loc-tab-add-input').forEach(list => (list.style.display = 'none'));
	document.querySelector('.suggest-list').style.display = 'none';
	const elem = event.target;
	if (operation === 'Add location') {
		if (elem) {
			const parent = elem.closest('.default-view');
			if (parent instanceof HTMLElement) {
				parent.querySelector('.saved-loc-usr-int').style.display = 'block';
				const input = parent.querySelector('#saved-loc-tab-add-input');
				input.style.display = 'block';
				input.value = '';
				input.focus();
			}
		}
	} else if (operation === 'Rename') {
		if (elem) {
			const parent = elem.closest('.default-view');
			const parentLi = parent.closest('li');

			if (parent instanceof HTMLElement) {
				const locationType = parent.querySelector('.saved-loc-left > span').outerText;
				const renameView = parentLi.querySelector('.rename-view');
				renameView.style.display = 'block';
				renameView.querySelector('input').value = locationType;
				parent.style.display = 'none';
			}
		}
	} else if (operation === 'Delete') {
		const parent = elem.closest('.default-view');
		const parentLi = parent.closest('li');
		if (parent instanceof HTMLElement) {
			const locationType = parent.querySelector('.saved-loc-left > span').outerText;
			checkDeleteClicked['parentLi'] = parentLi;
			checkDeleteClicked['locationType'] = locationType;
		}
		deleteOverlay.style.display = 'flex';
	}
};

const addFromInputSavedLoc = event => {
	try {
		event.preventDefault();
		const elem = event.target;
		if (elem) {
			const parent = elem.closest('.default-view');
			document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));
			document.querySelectorAll('.saved-loc-usr-int #saved-loc-tab-add-input').forEach(list => (list.style.display = 'none'));

			if (parent instanceof HTMLElement) {
				const list = parent.querySelector('.saved-address-list');
				const locationType = parent.querySelector('.saved-loc-left > span').outerText;
				localStorageOperations(locationType, elem.value, 'save');
				list.style.display = 'block';
				const html = `
				<li>
					<p class="address-txt">${elem.value}</p>
					<div class="saved-add-icons">
						<span class="save-tab-get-directions">
							<img src="./images/direction-right.svg" />
						</span>
						<span class="address-delete">
							<img src="./images/search-clear.svg" />
						</span>
					</div>
            	</li>`;
				addHTML(list, 'append', html);
				elem.value = '';
				Array.from(parent.querySelectorAll('.address-delete'))
					.pop()
					.addEventListener('click', event => deleteAddress(event));
				Array.from(parent.querySelectorAll('.save-tab-get-directions'))
					.pop()
					.addEventListener('click', event => savedTabGetDirections(event));
			}
		}
	} catch (ex) {
		return;
	}
};

const deleteAddress = event => {
	const elem = event.target;
	if (elem) {
		const parent = elem.closest('.default-view');
		const parentLi = elem.closest('li');
		const addressText = parentLi.querySelector('.address-txt').outerText;
		const locationType = parent.querySelector('.saved-loc-left > span').outerText;
		localStorageOperations(locationType, addressText, 'remove');
		parentLi.remove();
	}
};

const cancelRename = event => {
	const elem = event.target;
	if (elem) {
		const parentLi = elem.closest('li');
		const defView = parentLi.querySelector('.default-view');
		defView.style.display = 'block';
		const renView = elem.closest('.rename-view');
		renView.style.display = 'none';
	}
};

const renameLocation = event => {
	const elem = event.target;
	if (elem) {
		const parentLi = elem.closest('li');
		const renameView = parentLi.querySelector('.rename-view');
		const defaultView = parentLi.querySelector('.default-view');
		const locationType = defaultView.querySelector('.saved-loc-left > span');
		const inputValue = elem[0].value.trim();
		if (!isValidString(inputValue) || !inputValue) {
			alert(locationNameValidationmessage);
			return;
		}
		const locationTypeText = locationType.outerText;
		if (inputValue !== locationTypeText) {
			const savedLocationTypes = utils.getFromLocalStorage(savedLocationTypesKey);
			const idx = savedLocationTypes.indexOf(locationTypeText);
			if (idx > -1) {
				if (savedLocationTypes.indexOf(inputValue) > -1) {
					alert('Location by this name already present');
					return false;
				} else {
					savedLocationTypes[idx] = inputValue;
					utils.saveToLocalStorage(savedLocationTypesKey, savedLocationTypes);
					const addressKey = locationTypeText + objKey;
					const val = utils.getFromLocalStorage(addressKey);
					if (val) {
						localStorage.removeItem(addressKey);
						utils.saveToLocalStorage(inputValue + objKey, val);
					}
				}
			}
		}
		if (locationType instanceof HTMLElement) locationType.innerText = `${inputValue}`;
		renameView.style.display = 'none';
		defaultView.style.display = 'block';
	}
};

const addNewSavedLocCatLocTab = event => {
	try {
		event.preventDefault();
		const name = event.target[0].value.trim();
		if (!isValidString(name) || !name) {
			alert(locationNameValidationmessage);
			return;
		}
		if (name) {
			clearHTML(savedLocTabAddLocSec);
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
							<span>${name}</span>
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
							<ul
								class="saved-address-list"
							>
							</ul>
						</div>
					</div>
				</div>
				<div class="rename-view">
					<span class="clear-search">
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
			if (saveLocTabSavedLocList) addHTML(saveLocTabSavedLocList, 'append', html);
			addSavedTabEventListners();
		}
	} catch (ex) {
		return;
	}
};

const addSavedTabEventListners = () => {
	Array.from((rightSideMenuOptions = document.querySelectorAll('.saved-loc-right')))
		.pop()
		.addEventListener('click', event => toggleOptions(event));
	optionList = document.querySelectorAll('.options-list');
	const ul = Array.from(optionList).pop();

	ul.querySelectorAll('li').forEach(option => {
		option.addEventListener('click', event => optionOperation(event, option.outerText));
	});
	Array.from(document.querySelectorAll('.rename-view .clear-search'))
		.pop()
		.addEventListener('click', event => cancelRename(event));
	Array.from(document.querySelectorAll('#renameLocForm'))
		.pop()
		.addEventListener('submit', event => {
			event.preventDefault();
			renameLocation(event);
			return false;
		});
	Array.from(document.querySelectorAll('#saved-loc-tab-add-input'))
		.pop()
		.addEventListener('keyup', event => handleQueryKeyUp('saved-loc-tab-add-input', event));
};

const saveTabAddNewSavedLocHTML = () => {
	try {
		const savedLocTabAddLocSecHTML = savedLocTabAddLocSec.innerHTML;
		if (savedLocTabAddLocSecHTML === '') {
			const html = `
			<div id='newLocation'>
				<form id="add-new-loc-cat-save-tab-form">
					<span title="Cancel Add" class="clear-search" id="add-new-loc-cat-save-tab-cancel">
						<img src="./images/close-save-1.svg" />
					</span>
					<input
						type="text"
						placeholder="Name"
						id="create-loc"
						autocomplete="off"
					/>
					<input
					type="submit"
					hidden   
					/>
				</form>
			<div>`;
			addHTML(savedLocTabAddLocSec, 'prepend', html);
			document.getElementById('add-new-loc-cat-save-tab-form').addEventListener('submit', event => addNewSavedLocCatLocTab(event));
			document.querySelector('#add-new-loc-cat-save-tab-cancel').addEventListener('click', () => cancelAddLocation());
			const input = document.getElementById('create-loc');
			if (input) input.focus();
		} else {
			const input = document.getElementById('create-loc');
			if (input) input.focus();
		}
	} catch (ex) {
		return;
	}
};
const savedTabGetDirections = event => {
	const elem = event.target;
	if (elem) {
		const parent = elem.closest('.default-view');
		document.querySelectorAll('.suggest-list').forEach(list => (list.style.display = 'none'));
		const parentLi = elem.closest('li');
		const addressText = parentLi.querySelector('.address-txt').outerText;
		const locationType = parent.querySelector('.saved-loc-left > span').outerText;
		document.querySelectorAll('.saved-loc-usr-int #saved-loc-tab-add-input').forEach(list => (list.style.display = 'none'));
		const addressVal = utils.getFromLocalStorage(locationType + objKey);
		if (addressVal) {
			const addrObjIdx = addressVal.findIndex(address => address.text === addressText);
			if (addrObjIdx > -1 && userLocation) {
				const addrObj = addressVal[addrObjIdx];
				resultsQueryFromInput.value = 'Your location';
				resultsQueryToInput.value = addressText;
				fromAddress = null;
				toAddress = null;
				userClickedFromLon = userLocation.longitude;
				userClickedFromLat = userLocation.latitude;
				userClickedToLon = addrObj.lon;
				userClickedToLat = addrObj.lat;
				document.querySelector('#results-directions-tab').click();
			}
		}
	}
};
const cancelAddLocation = () => {
	clearHTML(savedLocTabAddLocSec);
};

let rightSideMenuOptions = document.querySelectorAll('.saved-loc-right');
let optionList = document.querySelectorAll('.options-list');
optionList.forEach(menu => {
	const options = menu.querySelectorAll('li');
	options.forEach(option => option.addEventListener('click', event => optionOperation(event, option.outerText)));
});
let savedLocTabAddLocSec = document.querySelector('#save-loc-tab-add-loc-sec');
rightSideMenuOptions.forEach(menu => menu.addEventListener('click', event => toggleOptions(event)));
document.querySelectorAll('.rename-view .clear-search').forEach(cancel => cancel.addEventListener('click', event => cancelRename(event)));
document.querySelectorAll('#renameLocForm').forEach(form => form.addEventListener('submit', event => renameLocation(event)));
document.querySelector('#add-new-loc-cat-save-tab').addEventListener('click', event => saveTabAddNewSavedLocHTML(event));
