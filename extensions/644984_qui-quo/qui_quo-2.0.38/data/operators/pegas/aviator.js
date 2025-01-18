window.OPERATOR_NAME = "Pegas";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    let occupancy = {
        adultsCount: Number(selectedOption($1('#search_passengers_ADT'))),
        childrenCount: Number(selectedOption($1('#search_passengers_CLD'))) + Number(selectedOption($1('#search_passengers_INF'))),
        childAges: null
    };
    return {occupancy};
}

function getSearchButton() {
    return $1('#submit');
}

function injectData() {
    $$(".flight_route").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const flight = extractFlight(tour);
    let option = createOptionFromFlight(flight);
    const price = getNodeData('.price', tour);
    option.price = extractIntFromStr(price.replace(/\D+/g, ''));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+/g, ''));
    option.occupancy = SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null;
    return option;
}

function extractFlight(tour) {
    const sectors = $$('.flight_route_item ',tour).map(parseSector)
    return {sectors};
}

function parseSector(sector)  {
    const segments = $$('tr .flight_item_route',sector).map(parseSegment);
    return {segments}
}

function parseSegment(segment) {
    const row = segment.closest('tr');
    const description = getNodeData('.flight_item_description', row);
    const [flightNumber, plane, serviceClass] = description.split(/\n+\s*/);
    const [departure, arrival] = $$('.flight_item_route div', row).map(parsePlaces);
    const departureDate = dateFromDayAndMonthName(...getNodeData('.flight_item_date', row).split(/\s+/));
    const arrivalTime = getNodeData('.flight_item_time_in', row);
    const departureTime = getNodeData('.flight_item_time_out', row);


    return new FlightSegment({
        flightNumber,
        travelTime: "",
        plane,
        departureDate,
        departureTime,
        departureCity: departure.city,
        departureAirport: departure.airport,
        departureAirportID: departure.id,
        serviceClass,
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalTime,
        arrivalCity: arrival.city,
        arrivalAirport: arrival.airport,
        arrivalAirportID: arrival.id
    })
}

function parsePlaces(div) {
     const [city, airport, id] = getNodeProperty(div, '', 'innerText').replace(/\(|\)/g, '\n').split(/\n/)
     return {city, id, airport}

}

function getHotelRowByImage(img) {
    return img.closest('.flight_route');
}
