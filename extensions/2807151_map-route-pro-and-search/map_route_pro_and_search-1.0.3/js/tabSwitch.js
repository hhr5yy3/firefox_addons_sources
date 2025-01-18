function openTab(evt, tab, pagetab) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName(pagetab);
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace('active', '');
	}
	document.getElementById(tab).style.display = 'block';
	evt.currentTarget.className += ' active';
	if (tab.includes('results')) {
		if (!tab.includes('direction')) loadResultsPage();
	}

	if (tab === 'maps-results') {
		const mapsParams = resultsQueryInput.value.trim();
		const alrtMsg = 'Valid map results not available, please search for valid location on the map again';
		if (userClickedLon === null || userClickedLat === null || !mapsParams) {
			resultsQueryInput.value = '';
			document.querySelectorAll('.maps-list-cont .saved-loc-list li').forEach(list => list.classList.remove('active'));

			datasource?.clear();
			//Wait until the map resources are ready.
			map?.markers?.remove(pin);
		} else {
			const url = new URL(location);
			generateMapsURL(url, mapsParams);
			const getParams = url.searchParams.get('maps');
			const params = atob(decodeURIComponent(decodeURIComponent(getParams)));
			const jsonParams = JSON.parse(params);
			resultsQueryInput.value = jsonParams.text;
			getMap(jsonParams.lon, jsonParams.lat, 'myMap');
		}

		if (!mapsParams || !(userClickedLat && userClickedLat)) {
			var whatsAppMaps = document.getElementById('whatsapp-maps-location-share');
			var whatsAppMapsClone = whatsAppMaps.cloneNode(true);
			whatsAppMaps.parentNode.replaceChild(whatsAppMapsClone, whatsAppMaps);

			var mailMaps = document.getElementById('mail-maps-location-share');
			var mailMapsClone = mailMaps.cloneNode(true);
			mailMaps.parentNode.replaceChild(mailMapsClone, mailMaps);

			var copyMaps = document.getElementById('copy-maps-location');
			var copyMapsClone = copyMaps.cloneNode(true);
			copyMaps.parentNode.replaceChild(copyMapsClone, copyMaps);

			document.querySelector('#whatsapp-maps-location-share').removeAttribute('href');
			document.querySelector('#mail-maps-location-share').removeAttribute('href');
			document.querySelector('#whatsapp-maps-location-share').addEventListener('click', () => alert(alrtMsg));
			document.querySelector('#mail-maps-location-share').addEventListener('click', () => alert(alrtMsg));
			document.querySelector('#copy-maps-location').addEventListener('click', () => alert(alrtMsg));
		}
	}

	if (tab === 'direction-results') {
		const instContainer = document.querySelector('.instructions-container');
		clearHTML(instContainer);
		const directionsParams1 = resultsQueryFromInput.value.trim();
		const directionsParams2 = resultsQueryToInput.value.trim();
		if (
			!directionsParams1 ||
			!directionsParams2 ||
			(userClickedFromLat === null && userClickedFromLon === null && userClickedToLat === null && userClickedToLon === null)
		) {
			resultsQueryFromInput.value = '';
			resultsQueryToInput.value = '';
		} else {
			getDirections([userClickedFromLon, userClickedFromLat], [userClickedToLon, userClickedToLat], modeOfTravel, 'myMap');
		}

		const alrtMsg = 'Valid directions results not available, please search for valid direction on the map again';

		if (!directionsParams1 || !directionsParams2) {
			modeOfTravel = 'car';
			document.querySelector('.share-via-card').style.display = 'none';

			datasource?.clear();
			//Wait until the map resources are ready.
			map?.markers?.remove(pin);
			var whatsAppMaps = document.getElementById('whatsapp-directions-location-share');
			var whatsAppMapsClone = whatsAppMaps.cloneNode(true);
			whatsAppMaps.parentNode.replaceChild(whatsAppMapsClone, whatsAppMaps);

			var mailMaps = document.getElementById('mail-directions-location-share');
			var mailMapsClone = mailMaps.cloneNode(true);
			mailMaps.parentNode.replaceChild(mailMapsClone, mailMaps);

			var copyMaps = document.getElementById('copy-directions-location');
			var copyMapsClone = copyMaps.cloneNode(true);
			copyMaps.parentNode.replaceChild(copyMapsClone, copyMaps);
			document.querySelector('#whatsapp-directions-location-share').removeAttribute('href');
			document.querySelector('#mail-directions-location-share').removeAttribute('href');
			document.querySelector('#whatsapp-directions-location-share').addEventListener('click', () => alert(alrtMsg));
			document.querySelector('#mail-directions-location-share').addEventListener('click', () => alert(alrtMsg));
			document.querySelector('#copy-maps-location').addEventListener('click', () => alert(alrtMsg));
		}
	}
}

document.querySelectorAll('.maps-list-inner').forEach(function (el) {
	el.addEventListener('click', function (event) {
		event.currentTarget.parentElement.classList.toggle('open-tab');
	});
});

function selectMode(evt, travelMode, resultMode) {
	evt.target
		.closest('ul')
		.querySelectorAll('.active')
		.forEach(el => el.classList.remove('active'));
	evt.currentTarget.classList.add('active');
	if (resultMode) {
		let ele = document.querySelector(resultMode);
		ele
			.closest('ul')
			.querySelectorAll('.active')
			.forEach(el => el.classList.remove('active'));
		ele.classList.add('active');
	}
	modeOfTravel = travelMode;
}

function setActiveMode(evt, travelMode) {
	evt.target
		.closest('ul')
		.querySelectorAll('.active')
		.forEach(el => el.classList.remove('active'));
	evt.currentTarget.classList.add('active');
	modeOfTravel = travelMode;
}

document.querySelector('#results-saved-loc-tab').addEventListener('click', event => openTab(event, 'saved-results', 'tabcontent-results'));

document.querySelector('#results-directions-tab').addEventListener('click', event => openTab(event, 'direction-results', 'tabcontent-results'));
document.querySelector('#results-maps-tab').addEventListener('click', event => openTab(event, 'maps-results', 'tabcontent-results'));
document.querySelector('#home-directions-tab').addEventListener('click', event => openTab(event, 'directions', 'tabcontent-home'));
document.querySelector('#home-maps-tab').addEventListener('click', event => openTab(event, 'maps', 'tabcontent-home'));
document.querySelector('#home-car-mode').addEventListener('click', event => selectMode(event, 'car', '#results-car-mode'));
document.querySelector('#home-walk-mode').addEventListener('click', event => selectMode(event, 'pedestrian', '#results-walk-mode'));
document.querySelector('#home-bicycle-mode').addEventListener('click', event => selectMode(event, 'bicycle', '#results-bicycle-mode'));
document.querySelector('#results-car-mode').addEventListener('click', event => selectMode(event, 'car'));
document.querySelector('#results-walk-mode').addEventListener('click', event => selectMode(event, 'pedestrian'));
document.querySelector('#results-bicycle-mode').addEventListener('click', event => selectMode(event, 'bicycle'));
document.querySelector('#results-maps-get-directions-dropdown').addEventListener('click', event => {
	const queryValue = resultsQueryInput.value.trim();
	if (queryValue && userClickedLat && userClickedLon) {
		document.querySelectorAll('#direction-results .map-type-list li').forEach(list => list.classList.remove('active'));
		resultsQueryFromInput.value = '';
		userClickedFromLat = null;
		userClickedFromLon = null;
		document.querySelector('#results-directions-tab').click();
		resultsCarMode.classList.add('active');
		resultsQueryToInput.value = queryValue;
		userClickedToLat = userClickedLat;
		userClickedToLon = userClickedLon;
	} else {
		alert('No location selected');
	}
});
document.querySelector('.maps-list-child.print-location').addEventListener('click', event => {
	const queryValue = resultsQueryInput.value.trim();
	if (queryValue !== '' && userClickedLat && userClickedLon) {
		document.querySelector('.print-map-overlay').style.display = 'block';
		document.querySelector('.print-map-overlay .print-map-loc').innerText = queryValue;
		map = null;
		getMap(userClickedLon, userClickedLat, 'print-map');
		var prtContent = document.querySelector('.print-map-overlay .print-map-inner');
		prtContent.querySelector('.print-button').addEventListener('click', () => {
			prtContent.querySelector('.print-button').style.display = 'none';
			window.print();
			prtContent.querySelector('.print-button').style.display = 'block';
		});
	} else {
		alert('No location selected');
		return;
	}
});

const printOverlayDirections = document.querySelector('.print-direction-overlay');
document.querySelector('#directions-print-btn').addEventListener('click', event => {
	printOverlayDirections.style.display = 'block';
	const mapIns = document.querySelector('.instructions-container');
	let stepListHTML = '';
	const stepsHTML = mapIns.querySelector('.steps-list').innerHTML;
	const mins = mapIns.querySelector('.instruction-duration').innerHTML;
	const miles = mapIns.querySelector('.instruction-distance').innerHTML;
	addHTML(printOverlayDirections.querySelector('.direction-print-list'), 'append', stepsHTML);
	printOverlayDirections.querySelector('.mins').innerText = mins;
	printOverlayDirections.querySelector('.miles').innerText = miles;
	printOverlayDirections.querySelector('.print-map-loc').innerText = `From ${resultsQueryFromInput.value} to ${resultsQueryToInput.value}`;
	map = null;
	getDirections([userClickedFromLon, userClickedFromLat], [userClickedToLon, userClickedToLat], modeOfTravel, 'print-map-directions');
	printOverlayDirections.querySelector('.print-button').addEventListener('click', () => {
		printOverlayDirections.querySelector('.print-button').style.display = 'none';
		window.print();
		printOverlayDirections.querySelector('.print-button').style.display = 'block';
	});
});
document.querySelector('.print-map-overlay .print-map-inner .close-button').addEventListener('click', event => {
	location.reload();
});
printOverlayDirections.querySelector('.close-button').addEventListener('click', event => {
	location.reload();
});
