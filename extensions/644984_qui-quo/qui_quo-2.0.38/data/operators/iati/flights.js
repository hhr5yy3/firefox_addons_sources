const OPERATOR_NAME = "InterLine Aero";
const showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, "#finalPrice").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal", hideFlight: true}));
        }
    });
}

function createOption(img) {
    const price = getText(getHotelRowByImage(img));
    const flight = getFlight();
    let option = createOptionFromFlight(flight);
    option.price = extractIntFromStr(price);
    option.currency = price.replace(/\s+|\d+|\.+/g, '');
    return option;
}

function getFlight() {
    try {
        const segments = querySelectorAll(document, '.flightinfolegs').map(segment => querySelectorAll(segment, "td"));
        const sectors = splitSegments(segments).map(parseSector);
        return {sectors};
    } catch (e) {
        console.log(e);
    }
}

function splitSegments(segments) {
    const sectors = [];
    let tempSegments = [];
    let prevSegmentsNumber = 1;
    for (const segment of segments) {
        const currentSegmentNumber = +getText(segment[1]);
        if ( currentSegmentNumber - prevSegmentsNumber === 0 ) {
            prevSegmentsNumber++;
            tempSegments.push(segment);
        } else {
            prevSegmentsNumber = 2;
            sectors.push(tempSegments);
            tempSegments = [];
            tempSegments.push(segment);
        }

    }
    sectors.push(tempSegments);
    return sectors;
}

function parseSector(sector) {
    const segments = sector.map(parseSegment);
    return {segments}
}

function parseSegment(segment) {
    const extractedTds = segment.map(td => getText(td, 'innerText').split(/\n/));
    const depInfo = extractedTds[4][0].match(/(.+?)\((.+?)\),(.+)/);
    const depDate = extractedTds[4][1].split(/\s*-\s*/);
    const arrInfo = extractedTds[5][0].match(/(.+?)\((.+?)\),(.+)/);
    const arrDate = extractedTds[5][1].split(/\s*-\s*/);
    const terminals =  extractedTds[7][0].split(',')
    return new FlightSegment({
        flightNumber: extractedTds[3][1],
        airline: extractedTds[3][0],
        departureDate: depDate[0],
        departureTime: depDate[1],
        departureCity: depInfo[3].trim(),
        departureAirport: depInfo[1].trim(),
        departureAirportID: depInfo[2].trim(),
        departureTerminal: terminals[0].trim(),
        serviceClass: extractedTds[6][0],
        arrivalDate: arrDate[0],
        arrivalTime: arrDate[1],
        arrivalCity: arrInfo[3].trim(),
        arrivalAirport:  arrInfo[1].trim(),
        arrivalAirportID:  arrInfo[2].trim(),
        arrivalTerminal: terminals[1].trim(),
        baggage: 'Багаж: ' + extractedTds[8][0]
    })
}

function getHotelRowByImage(img) {
    return img.closest('.grandTotal');
}