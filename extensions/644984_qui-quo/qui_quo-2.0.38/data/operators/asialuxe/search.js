window.OPERATOR_NAME = "Asialuxe";
window.showTopHotelsRating = false;
window.OPERATOR_CURRENCY = "Asialuxe";
window.DEFAULT_CURRENCY = "UZS";
window.CURRENCY_SELECTION_STYLE = "font-size:16px;padding-top: 5px !important;padding-right: 5px !important;";
console.log(`Loaded ${window.OPERATOR_NAME}`);


function initializeSearchCriteria() {
    const city_from = selectedOption($1('#locFromSelect'))
    const region = selectedOption($1('#locSel'), false)
    if (!region) {
        return null;
    }
    const country = getNodeProperty(region.closest('optgroup'), '', 'label');
    return {
        country, region: getNodeProperty(region), city_from
    };
}

function getSearchButton() {
    return $1('#booklookBtn');
}

function injectData() {
    injectCurrencySelectionUtil("#res", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "height:2em", "display:inline-flex;flex-direction: row;");
    $$(".TourCard .right-side").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });

    $$(".TourCardDetail .right-side").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const description = $1('.item-bottom-text.desc', tour);
    const descriptionSpans = $$('span', description).extractNodesText();

    const dates = descriptionSpans[0].split(/\s*\-\s*/).map(date => dateFromDayAndMonthName(...date.split(/\s+/).slice(0, 2)))
    const [nationalPrice, foreignPrice] = $$('.item-bottom-price span', tour).slice(-2).extractNodesText()
    const selectedPrice = isPrefferedDefaultCurrencyUtil() ? nationalPrice : foreignPrice;
    const flight = getFlight();
    const stars = $$('.fa-solid.fa-star', tour).length || $$('.tour_content .fa-solid.fa-star').length
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(dates[0], dates[1])),
        hotelName: (getNodeData('.tour_content h3') || getNodeData('.item-top-title', tour)) + (stars ? ' '+stars+'*' : ''),
        country: SEARCH_CRITERIA && SEARCH_CRITERIA.country,
        region: SEARCH_CRITERIA && SEARCH_CRITERIA.region || getNodeData('.item-top-place', tour),
        accommodation: getNodeData('span', $1('.fa-bed, [alt="bed"]', tour).parentNode),
        roomType: $1('.tour_content h3') && getNodeData('.item-top-title', tour),
        boardType: getNodeData('span', $1('.fa-utensils, [alt="fork"]', tour).parentNode),
        price: extractIntFromStr(selectedPrice.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(selectedPrice.replace(/\d+|\s+/g, '')),
        city_from: (SEARCH_CRITERIA && SEARCH_CRITERIA.city_from) || "",
        operator: OPERATOR_NAME,
        flight,
        thumbnail: getNodeData('.tour_content [alt="tour img"], .tour_thumbnail img', document, 'src') || getBackgroundImageUrl($1('.hotel-img', tour)),
        occupancy: getOccupancy()
    };
    return option;
}

function getFlight() {
    try {
        const allFlights = $$('.avs-hid');
        const selectedFlight = allFlights.find(fl => $1('.fa-check', fl))
        const sectors = $$('.col-md-5 > .align-items-center', selectedFlight).map(parseSector)
        return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };
        occupancy.adultsCount = extractIntFromStr(getParameterByName('passAdult'));
        const ages = getParameterByName('chd_ages').split('-').filter(Boolean);
        occupancy.childrenCount = ages.length;
        occupancy.childAges = ages.join(',');
        return occupancy;

    } catch (e) {
        console.log(e);
        return null;
    }

}

function parseSector(sector) {
    const flightNumber = getNodeData('.w-100 ', sector);
    const regexps = getRegexPatterns()
    const dates = $$('.text-sm', sector).extractNodesText().filter(txt => txt.match(regexps.dateStrict))
    const times = $$('.h5.m-0', sector).extractNodesText().filter(txt => txt.match(regexps.time))
    const ids = $$('.h5.m-0', sector).extractNodesText().filter(txt => txt.match(/\b[A-Z]{3}\b/))
    const inTravel = $$('.text-sm', sector).extractNodesText().find(txt => txt.match(/в пути/i))
    if (flightNumber.match(/прямой рейс/i)) {

        const segments = [new FlightSegment({
            flightNumber: flightNumber.match(regexps.flightNumber)[0],
            travelTime: inTravel ? inTravel.match(/\d+/g).map(t=> t.padStart(2, '0')).join(':') : null,
            departureAirportID: ids[0],
            departureDate: dates[0],
            departureTime: times[0],
            baggage: trim(getNodeProperty($1('.fa-suitcase-rolling', sector).parentNode, '')),
            arrivalDate: dates[1],
            arrivalTime: times[1],
            arrivalAirportID: ids[1]
        })]
        return {segments};
    }
    const stopCount = flightNumber.match(/пересадок.+?(\d)/i);
    if ( stopCount ) {
        const stops = Number(stopCount[1]);
        const segments = new Array(stops+1).fill(null).map(s => new FlightSegment({
            departureAirportID: 'NA',
            departureDate: 'NA',
            departureTime: 'NA',
            baggage: 'NA',
            arrivalDate: 'NA',
            arrivalTime: 'NA',
            arrivalAirportID: 'NA'
        }));
        Object.assign(segments[0], new FlightSegment({
            departureAirportID: ids[0],
            departureDate: dates[0],
            departureTime: times[0],
            baggage: trim(getNodeProperty($1('.fa-suitcase-rolling', sector).parentNode, '')),
        }))
        Object.assign(segments[segments.length-1], new FlightSegment({
            arrivalDate: dates[1],
            arrivalTime: times[1],
            arrivalAirportID: ids[1],
            baggage: trim(getNodeProperty($1('.fa-suitcase-rolling', sector).parentNode, '')),
        }))
        return {segments};
    }

}

function getHotelRowByImage(img) {
    return img.closest('.TourCard, .TourCardDetail');
}
