var datasource, client, popup, searchInput, resultsPanel, searchInputLength, centerMapOnResults;

//The minimum number of characters needed in the search input before a search is performed.
var minSearchInputLength = 3;

//The number of ms between key strokes to wait before performing a search.
var keyStrokeDelay = 150;

let pin, map, sharingURL, sharingURLDirection, styleControl, zoomControl;

function getMap(lon, lat, mapSecId) {
	//Initialize a map instance.
	if (lon === null || lat === null) {
		alert('Please select valid a location');
		return;
	} else {
		document.querySelector('.container-main').style.display = 'none';
		document.querySelector('.container-result').style.display = 'block';
		document.querySelector('#direction-results').style.display = 'none';
	}
	if (!map) {
		map = loadMap(mapSecId);
		/*Add the Style Control to the map*/
		map.controls.add(
			(styleControl = new atlas.control.StyleControl({
				mapStyles: ['road', 'satellite', 'satellite_road_labels'],
			})),
			{
				position: 'bottom-right',
			}
		);

		//Add the zoom control to the map.
		zoomControl = map.controls.add(new atlas.control.ZoomControl(), {
			position: 'bottom-right',
		});
	}

	resultsCarMode.classList.add('active');

	const currentUrl = new URL(location);
	const mapsParams = currentUrl.searchParams.get('maps');

	var whatsAppMaps = document.getElementById('whatsapp-maps-location-share');
	var whatsAppMapsClone = whatsAppMaps.cloneNode(true);
	whatsAppMaps.parentNode.replaceChild(whatsAppMapsClone, whatsAppMaps);

	var mailMaps = document.getElementById('mail-maps-location-share');
	var mailMapsClone = mailMaps.cloneNode(true);
	mailMaps.parentNode.replaceChild(mailMapsClone, mailMaps);

	var copyMaps = document.getElementById('copy-maps-location');
	var copyMapsClone = copyMaps.cloneNode(true);
	copyMaps.parentNode.replaceChild(copyMapsClone, copyMaps);

	if (mapsParams) {
		sharingURL = `https://maproutepro.com/homepage.html?maps=${mapsParams}`;
		const alrtMsg = 'Valid location results not available, please search for a valid location on the map again';

		document.querySelector('#whatsapp-maps-location-share').addEventListener('click', e => {
			const target = e.target;
			if (userClickedLat === null || userClickedLon === null) alert(alrtMsg);
			else {
				target.setAttribute('href', `https://web.whatsapp.com/send?text=${sharingURL}`);
				window.open(`https://web.whatsapp.com/send?text=${sharingURL}`, '_blank');
			}
		});
		document.querySelector('#mail-maps-location-share').addEventListener('click', e => {
			const target = e.target;
			if (userClickedLat === null || userClickedLon === null) alert(alrtMsg);
			else {
				target.setAttribute('href', `https://web.whatsapp.com/send?text=${sharingURL}`);
				window.open(`mailto:?body=${sharingURL}`, '_self');
			}
		});
		document.querySelector('#copy-maps-location').addEventListener('click', () => {
			if (userClickedLat === null || userClickedLon === null) alert(alrtMsg);
			else {
				copyUrlToClipboard();
			}
		});
	}
	const setCameraoptions = () => {
		map.setCamera({
			center: [lon, lat],
			zoom: 14,
			duration: 1000,
			type: 'fly',
		});
	};

	//Store a reference to the Search Info Panel.
	resultsPanel = document.getElementById('results-panel');

	//Add key up event to the search box.
	searchInput = document.getElementById('results-query');

	//Create a popup which we can reuse for each result.
	popup = new atlas.Popup();

	datasource?.clear();
	map.markers.remove(pin);
	//Wait until the map resources are ready.
	map.events.add('ready', function () {
		setCameraoptions();

		//Create a data source and add it to the map.
		datasource = new atlas.source.DataSource();
		map.sources.add(datasource);

		//Add a layer for rendering the results.
		var searchLayer = new atlas.layer.SymbolLayer(datasource, null, {
			iconOptions: {
				image: 'pin-round-darkblue',
				anchor: 'center',
				allowOverlap: true,
			},
		});
		map.layers.add(searchLayer);

		//Add a click event to the search layer and show a popup when a result is clicked.
		map.events.add('click', searchLayer, function (e) {
			//Make sure the event occurred on a shape feature.
			if (e.shapes && e.shapes.length > 0) {
				showPopup(e.shapes[0]);
			}
		});
	});

	pin = new atlas.HtmlMarker({
		htmlContent: '<img src="./images/maps-results-icons.svg" alt="loc-icon">',
		position: {lat, lon},
	});
	map.markers.add(pin);
}

async function copyUrlToClipboard() {
	const copyMessage = document.querySelector('.link-cop');
	const dummy = document.createElement('input'),
		text = sharingURL;
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	await navigator.clipboard.writeText(dummy.value);
	copyMessage.style.display = 'block';
	setTimeout(() => (copyMessage.style.display = 'none'), 2000);
	document.body.removeChild(dummy);
}

async function copyUrlToClipboardDirections() {
	const copyMessage = document.querySelector('.link-cop-directions');
	const dummy = document.createElement('input'),
		text = sharingURLDirection;
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	await navigator.clipboard.writeText(dummy.value);
	copyMessage.style.display = 'block';
	setTimeout(() => (copyMessage.style.display = 'none'), 2000);
	document.body.removeChild(dummy);
}

