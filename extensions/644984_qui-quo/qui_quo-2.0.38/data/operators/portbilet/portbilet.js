window.OPERATOR_NAME = "Portbilet";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".flight-variant .avia-select-flight-btn, .flight-variant .select-flight-fares").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal", cssText: "margin-left: 4px;"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const serviceNode = img.closest('.branded-fare-cell');
    let serviceClass = null;
    let baggage = null;
    if ( serviceNode ) {
        const flightIndexNode = $1('[data-flight-fare-index]', serviceNode);
        if ( flightIndexNode ) {
            const flightIndex = flightIndexNode.dataset.flightFareIndex;
            serviceClass = getNodeData(`.branded-fare-head [data-flight-fare-index="${flightIndex}"]`)
            const rows = $$('.branded-fare-row', tour).map((row) => {
                const cells = $$('.branded-fare-cell', row).map((cell, index) => {
                    if ( String(index) === flightIndex ) {
                        return cell;
                    }
                });
                return cells.filter(Boolean)
            }).flatMap(cell => cell);
            baggage = rows.extractNodesText('innerText').map(str => trim(str)).filter(str => trim(str).match(/Багаж/))
        }

    }
    const flight = getFlight(tour, serviceClass, baggage);
    const option = createOptionFromFlight(flight);

    option.currency = mapCurrencyUtil(getNodeProperty($first('.js-balance-currency', tour)));
    option.price = Number(getNodeProperty($first('.sln-button-price', tour), '').replace(/\D+/g, ''));

    option.city_from = getNodeProperty($first('.sln-direction-from')) || option.city_from;
    option.region = getNodeProperty($first('.sln-direction-to')) || option.region;
    option.roomType = $$('div[class*="select-passengers"] a').map(t => getText(t)).join(', ');

    const priceRow = img.closest('.sln-fare-cell-foot');
    if ( priceRow ) {
        const priceBtn = priceRow.querySelector('.avia-button-price');
        option.price = Number(getNodeProperty(priceBtn, '').split(',')[0].replace(/\D+/g, ''))
        if ( !option.price ) {
            option.price = getNodeData('button[data-add="Добавить"]', img.closest('.branded-fare-cell')).split(',')[0].replace(/\D+/g, '');
        }
    }
    
    return option;
}

function getFlight(tour, serviceClass, baggage) {
    const segmentNodes = $$('.fv-segment', tour);
    let sectors = [];
    let segments = [];
    for ( const segment of segmentNodes ) {
        if ( segment.classList.contains('avia-segment-first') && segments.find(seg => seg.classList.contains('avia-segment-first')) ) {
            sectors.push(segments);
            segments = [];
        }
        segments.push(segment)
    }
    sectors.push(segments);
    sectors = sectors.map(s => parseSector(s, serviceClass, baggage));
    return {sectors}
}

function parseSector(segments, serviceClass, baggage) {
    return {segments: segments.map((s, i) => parseSegment(s, serviceClass, baggage, i))}
}

function parseSegment(segment, serviceClass, baggage, i) {
    const depElem = $first('.sln-route-element-departure', segment);
    const arrElem = $first('.sln-route-element-arrival', segment);

    const parsedSegment = new FlightSegment({
        flightNumber: getNodeProperty($first('.sln-flightnumber .flight-number', segment)),
        travelTime: getNodeProperty($first('.avia-duration', segment)),
        departureDate: dateFromDayAndMonthName(...getNodeProperty($first('.date', depElem)).split(',')[0].split(/\s+/)),
        departureTime: getNodeProperty($first('.time', depElem)),
        departureAirport: getNodeProperty($first('.sln-airport-departure, .route', depElem)).split(/\s*,\s*/)[0],
        departureTerminal: getNodeProperty($first('.terminal', depElem)),
        serviceClass: getNodeProperty($first('.service-class', segment)) || serviceClass,
        arrivalDate: dateFromDayAndMonthName(...getNodeProperty($first('.date', arrElem)).split(',')[0].split(/\s+/)),
        arrivalTime: getNodeProperty($first('.time', arrElem)),
        arrivalAirport: getNodeProperty($first('.sln-airport-departure, .route', arrElem)).split(/\s*,\s*/)[0],
        arrivalTerminal: getNodeProperty($first('.terminal', arrElem)),
        baggage: baggage && baggage[i]
    })
    return parsedSegment;
}

function getHotelRowByImage(img) {
    return img.closest('.flight-variant');
}
