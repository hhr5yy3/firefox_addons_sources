async function getSearchResult(href) {
     if ( window.FLIGHT_RESULTS || window.FLIGHT_SEARCH_ACTIVE === true ) {
        return;
    }
    window.FLIGHT_SEARCH_ACTIVE = true;
    const result = await fetch(href || location.href, {
        "headers": {
            "accept": "application/json",
            "x-requested-with": "XMLHttpRequest"
        }
    }).then(r => r.json());
    let {results} = result;

    window.FLIGHT_RESULTS = results;
    window.FLIGHT_SEARCH_ACTIVE = false;
}

function getFlight(flightItem) {
    const sectors = flightItem.directions.map(parseSector)
    return {sectors}
}

function parseSector(direction) {
    const segments = direction.segments ? direction.segments.map(parseSegment) : [direction].map(parseSegment);
    return {segments}
}

function parseSegment(segment) {
    const departure = segment.departure;
    const departureDate = departure.time.split('T');
    const departureTime = departureDate[1].match(getRegexPatterns().time)
    const arrival = segment.arrival;
    const arrivalDate = arrival.time.split('T')
    const arrivalTime = arrivalDate[1].match(getRegexPatterns().time);
    return new FlightSegment({
        flightNumber: segment.flightNumber,
        airline: segment.operationCarrierName,
        travelTime: "",
        plane: segment.aircraftName,
        departureDate: new Date(departureDate[0]).toLocaleDateString('ru'),
        departureTime: departureTime[0],
        departureCity: departure.cityName,
        departureAirport: departure.airportName,
        departureAirportID: departure.airportIataCode,
        serviceClass: segment.serviceClassName,
        arrivalDate: new Date(arrivalDate[0]).toLocaleDateString('ru'),
        arrivalTime: arrivalTime[0],
        arrivalCity: arrival.cityName,
        arrivalAirport: arrival.airportName,
        arrivalAirportID: arrival.airportIataCode
    })
}

function getHotelRowByImage(img) {
    return img.closest('.avia-flight');
}
