window.OPERATOR_NAME = location.hostname;
window.showTopHotelsRating = false;
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, '.product-item-container').forEach(div => {
        if ( div.previousElementSibling && !div.previousElementSibling.closest('.qq') ) {
            const buttons = qqBtns({align: "qq-horizontal", hideFlight: true});
            buttons.style.position = "absolute";
            buttons.style.right = '-52px';
            div.before(buttons);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const flight = await getFlight(tour);
    let option = createOptionFromFlight(flight, tour)
    const price = getText(tour.querySelector(".total")).replace(/\s+/g, '');
    option.price = extractIntFromStr(price);
    option.currency = 'RUB';
    return option;
}

async function getFlight(tour) {
    let detailsControllerFlag = tour.querySelector('.detailed-container');
    console.log(tour.querySelector('.details-button button'))
    if ( !detailsControllerFlag ) {
        let btn = tour.querySelector('.details-button button');
        btn ? btn.click() : null;
        simulateMouseEvent( tour.querySelector('div'), 'mousedown')
        simulateMouseEvent(tour.querySelector('div'), 'mouseup')
    }
    await waitingFor(() => null, 200, 2)
    let detailsController = tour.querySelector('.detailed-container');
    const sectors = $$('.segments', detailsController).map(parseSector);
    if ( !detailsControllerFlag ) {
        let btn = tour.querySelector('.details-button button');
        btn ? btn.click() : null;
        simulateMouseEvent(tour.querySelector('div'), 'mousedown')
        simulateMouseEvent(tour.querySelector('div'), 'mouseup')
    }
    return {sectors}
}


function parseSector(sectors) {
    const segments = $$('.segment', sectors).map(parseSegment);
    return {segments};
}

function parseSegment(segment) {
    const startBlock = $1('.start', segment);
    const [departureCity, departureCountry] = getNodeData('.city-country', startBlock).split(/\s*,\s*/)
    const travelBlock = $1('.travel-time', segment);
    const endBlock = $1('.end', segment);
    const [arrivalCity, arrivalCountry] = getNodeData('.city-country', endBlock).split(/\s*,\s*/)


    return new FlightSegment({
        flightNumber: trim(getNodeData('.race', travelBlock)),
        plane: getNodeData('.small a', travelBlock),
        departureDate: getNodeProperty($1('.date .time', startBlock).previousElementSibling ),
        departureTime: getNodeData('.time', startBlock),
        departureCity,
        departureCountry,
        departureAirport: getNodeProperty($1('.port', startBlock).firstChild, '').replace(/\s*\(/, ''),
        departureAirportID: getNodeData('.port a', startBlock),
        serviceClass: getNodeData('.booking-classes', startBlock),
        arrivalDate: getNodeProperty($1('.date .time', endBlock).nextElementSibling),
        arrivalTime: getNodeData('.time', endBlock),
        arrivalCity,
        arrivalCountry,
        arrivalAirport: getNodeProperty($1('.port', endBlock).firstChild, '').replace(/\s*\(/, ''),
        arrivalAirportID: getNodeData('.port a', endBlock),
        baggage:  getNodeData('.baggage')
    });
}

function getHotelRowByImage(img) {
    return img.closest('.qq').nextElementSibling;
}
