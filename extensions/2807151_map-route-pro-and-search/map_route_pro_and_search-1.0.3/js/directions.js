let modeOfTravel = 'car';
const checkDirectionsCords = () => {
	const hasInValidCords = userClickedFromLat === null || userClickedFromLon === null || userClickedToLat === null || userClickedToLon === null;
	return hasInValidCords;
};
function getDirections(source, destination, modeOfTravel, mapSecId) {
	if (resultsQueryFromInput.value.trim() === '' || resultsQueryToInput.value.trim() === '') {
		alert('Please fill both the inputs');
		return false;
	} else if (checkDirectionsCords()) {
		alert('Please select valid location in the source and the destination');
		return false;
	} else {
		document.querySelector('.container-main').style.display = 'none';
		document.querySelector('.container-result').style.display = 'block';
		document.querySelector('#maps-results').style.display = 'none';
		let instructionsDOM = document.querySelector('.instructions-container');
		while (instructionsDOM.firstChild) {
			instructionsDOM.removeChild(instructionsDOM.firstChild);
		}
	}
	if (!map) {
		map = loadMap(mapSecId);
		/*Add the Style Control to the map*/
		map.controls.add(
			new atlas.control.StyleControl({
				mapStyles: ['road', 'satellite', 'satellite_road_labels'],
			}),
			{
				position: 'bottom-right',
			}
		);
		//Add the zoom control to the map.
		map.controls.add(new atlas.control.ZoomControl(), {
			position: 'bottom-right',
		});
	}

	document.querySelectorAll('#direction-results .map-type-list li').forEach(list => list.classList.remove('active'));
	switch (modeOfTravel) {
		case 'car':
			resultsCarMode.classList.add('active');
			break;
		case 'bicycle':
			resultsBicycleMode.classList.add('active');
			break;
		case 'pedestrian':
			resultsWalkMode.classList.add('active');
			break;
	}

	let currentUrl = new URL(location);
	generateDirectionsURL(currentUrl, resultsQueryFromInput.value, resultsQueryToInput.value, modeOfTravel);

	const directionsParams = currentUrl.searchParams.get('directions');

	var whatsAppMaps = document.getElementById('whatsapp-directions-location-share');
	var whatsAppMapsClone = whatsAppMaps.cloneNode(true);
	whatsAppMaps.parentNode.replaceChild(whatsAppMapsClone, whatsAppMaps);

	var mailMaps = document.getElementById('mail-directions-location-share');
	var mailMapsClone = mailMaps.cloneNode(true);
	mailMaps.parentNode.replaceChild(mailMapsClone, mailMaps);

	var copyMaps = document.getElementById('copy-directions-location');
	var copyMapsClone = copyMaps.cloneNode(true);
	copyMaps.parentNode.replaceChild(copyMapsClone, copyMaps);

	if (directionsParams) {
		sharingURLDirection = `https://maproutepro.com/homepage.html?directions=${directionsParams}`;
		document.querySelector('#whatsapp-directions-location-share').setAttribute('href', `https://web.whatsapp.com/send?text=${sharingURLDirection}`);
		document.querySelector('#mail-directions-location-share').setAttribute('href', `mailto:?body=${sharingURLDirection}`);
		document.querySelector('#copy-directions-location').addEventListener('click', () => copyUrlToClipboardDirections());
	}

	datasource?.clear();
	//Wait until the map resources are ready.
	map?.markers?.remove(pin);
	map.events.add('ready', function () {
		//Create a data source and add it to the map.
		datasource = new atlas.source.DataSource();
		map.sources.add(datasource);

		//Add a layer for rendering the route lines and have it render under the map labels.
		map.layers.add(
			new atlas.layer.LineLayer(datasource, null, {
				strokeColor: ['get', 'strokeColor'],
				strokeWidth: ['get', 'strokeWidth'],
				lineJoin: 'round',
				lineCap: 'round',
			}),
			'labels'
		);

		//Add a layer for rendering point data.
		map.layers.add(
			new atlas.layer.SymbolLayer(datasource, null, {
				iconOptions: {
					image: ['get', 'icon'],
					allowOverlap: true,
				},
				textOptions: {
					textField: ['get', 'title'],
					offset: [0, 1.2],
				},
				filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']], //Only render Point or MultiPoints in this layer.
			})
		);

		//Create the GeoJSON objects which represent the start and end points of the route.
		var startPoint = new atlas.data.Feature(new atlas.data.Point(source), {
			title: fromAddress || resultsQueryFromInput.value,
			icon: 'pin-round-blue',
		});

		var endPoint = new atlas.data.Feature(new atlas.data.Point(destination), {
			title: toAddress || resultsQueryToInput.value,
			icon: 'pin-blue',
		});

		//Add the data to the data source.
		datasource.add([startPoint, endPoint]);

		//Use MapControlCredential to share authentication between a map control and the service module.
		var pipeline = atlas.service.MapsURL.newPipeline(new atlas.service.MapControlCredential(map));

		//Construct the RouteURL object
		var routeURL = new atlas.service.RouteURL(pipeline);

		//Start and end point input to the routeURL
		var coordinates = [
			[startPoint.geometry.coordinates[0], startPoint.geometry.coordinates[1]],
			[endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]],
		];
		let instructionsDOM = document.querySelector('.instructions-container');
		//Make a search route request
		routeURL
			.calculateRouteDirections(atlas.service.Aborter.timeout(10000), coordinates, {
				maxAlternatives: 1,
				travelMode: modeOfTravel,
				traffic: true,
				instructionsType: 'text',
				routeType: 'fastest',
			})
			.then(directions => {
				//Get data features from response
				var data = directions.geojson.getFeatures();

				var routeLine = data.features[0];
				routeLine.properties.strokeColor = 'blue';
				routeLine.properties.strokeWidth = 5;
				datasource.add(routeLine);

				if (data.features.length > 1) {
					var routeLine2 = data.features[1];
					routeLine2.properties.strokeColor = 'grey';
					routeLine2.properties.strokeWidth = 5;
					datasource.add(routeLine2, 0);
				}

				//SET CAMERA
				// Extract route coordinates from the API response
				var routeCoordinates = directions.routes[0].legs[0].points.map(point => [point.longitude, point.latitude]);

				// Calculate the bounding box from route coordinates
				var boundingBox = atlas.data.BoundingBox.fromLatLngs(routeCoordinates);
				// Define the two corners of the bounding box
				var corner1 = new atlas.data.Position(boundingBox[0], boundingBox[1]);
				var corner2 = new atlas.data.Position(boundingBox[2], boundingBox[3]);

				// Calculate the center
				var center = new atlas.data.Position((corner1[0] + corner2[0]) / 2, (corner1[1] + corner2[1]) / 2);

				if (mapSecId === 'myMap') {
					// Set map view using the bounding box
					map.setCamera({
						bounds: boundingBox,
						center: center,
						padding: {
							left: 500, // Adjust this value as needed
							top: 160, //150
							right: 80,
							bottom: 490, //60
						},
						duration: 1000,
						type: 'fly',
					});
				} else {
					// Set map view using the bounding box
					map.setCamera({
						bounds: boundingBox,
						center: center,
						padding: {
							left: 0, // Adjust this value as needed
							top: 50, //150
							right: 0,
							bottom: 50, //60
						},

						duration: 1000,
						type: 'fly',
					});
				}
				//
				let time, distance, startingStreet, direction, item, timeDifference;
				let expandedView = ``;
				clearHTML(instructionsDOM);

				for (i = 0; i < data.features.length; i++) {
					time = data.features[i].properties.summary.travelTimeInSeconds;
					time = Math.round(time / 60);

					distance = data.features[i].properties.summary.lengthInMeters;
					distance = Math.round(distance / 1600);
					const instructions = data.features[i].properties.guidance.instructions;
					for (k = Math.floor(instructions.length / 2); k < instructions.length; k++) {
						startingStreet = instructions[k].street;
						if (startingStreet) break;
					}
					if (!startingStreet) startingStreet = instructions[1].street || instructions[0].street;
					item = data.features[i].properties.guidance.instructions;
					for (j = 1; j < item.length - 1; j++) {
						distance = item[j].routeOffsetInMeters / 1600;
						distance = Number(distance.toFixed(2));

						if (item[j].maneuver.includes('RIGHT')) {
							direction = 'right';
						} else if (item[j].maneuver.includes('LEFT')) {
							direction = 'left';
						} else if (item[j].maneuver.includes('UTURN')) {
							direction = 'uturn';
						} else {
							direction = 'straight';
						}

						let oldTime = data.features[0].properties.summary.travelTimeInSeconds;
						timeDifference = Math.abs(Math.round(oldTime / 60) - time);

						let expandedViewHTML = `<li>
							<ul>
								<li class="way">
									<div class="way-flex">
										<div class="turn ${direction}"></div>
										<p>${item[j].message}</p>
									</div>
									<p class="miles"> - ${distance} miles</p>
								</li>
							</ul>
						</li>`;
						expandedView += expandedViewHTML;
					}
					let instructionsDomHtml = `
						<div class="instruction-list-item">
							<div class="instructions">
								<div class="instructions__left">
									<p class="instruction-title"><span class="instruction-mode ${modeOfTravel}"></span>${startingStreet ? `Via ${startingStreet}` : ''}</p>
									<p class="instruction-detail">
										${
											i === 0
												? data.features.length > 1
													? 'Faster compared to other routes'
													: ''
												: timeDifference === 0
												? 'Similar to the first route'
												: timeDifference + ' mins slower due to heavy traffic'
										}
									</p>
								</div>
								<div class="instructions__right">
									<p class="instruction-duration">${time} min</p>
									<p class="instruction-distance">${distance} miles</p>
								</div>
							</div>
							<button class="instruction-expand">Details</button>
							<div class="instruction-expanded-view">
							<p class="from-to">From <span>${resultsQueryFromInput.value}</p>
							<p class="from-to">to <span>${resultsQueryToInput.value}</span></p>
								<div class="steps-list">
									<ul class="list-items">
										<li class="from-item">${resultsQueryFromInput.value}</li>
											${expandedView}
										<li class="to-item">${resultsQueryToInput.value}</li>
									</ul>
								</div>
							</div>
						</div>
					`;
					addHTML(instructionsDOM, 'append', instructionsDomHtml);

					if (instructionsDOM.innerHTML !== '') {
						document.querySelector('.share-via-card').style.display = 'flex';
					} else {
						document.querySelector('.share-via-card').style.display = 'none';
					}
				}
				handleDetailsExpandedView();
			})
			.catch(ex => {
				console.log('ex.message :>> ', ex.message);
				if (ex.message.includes('NO_ROUTE_FOUND')) {
					alert('No route found for this locations');
					clearHTML(instructionsDOM);
					return;
				}
			});
	});
}

function handleDetailsExpandedViewReset(){
	document.querySelectorAll(".instruction-expanded-view").forEach(function(el){
		el.style.display="none"
	})
	document.querySelectorAll('.instruction-expand').forEach(function(el){
		el.style.display="block"
	})
}


function handleDetailsExpandedView() {
	let detailsButton = document.querySelectorAll('.instruction-expand');
	detailsButton.forEach(ele => {
		ele.addEventListener('click', function (e) {
			handleDetailsExpandedViewReset()
			e.target.nextElementSibling.style.display = 'block';
			e.target.style.display = 'none';
		})
	})
}