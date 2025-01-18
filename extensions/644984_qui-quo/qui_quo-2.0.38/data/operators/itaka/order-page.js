window.OPERATOR_NAME = "Itaka";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".price-box").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin:8px;'}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = getNodeData('[data-js-value="date-selected"]', tour).replace(/[^ \-–—0-9.]|\s+/g, '').split(/[–-]/).map(extractDateItalka);
    const region = $first('.destination-country-region');
    const price = getNodeProperty($first('[data-js-value="totalPrice"]').parentNode, '', 'innerText');
    const flightUrl = $first('[data-translate-fly][data-href], #check-timetable[data-href]');
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.productName-holder h1, .productName-holder'),
        hotel_desc: getNodeData('[data-js-value="ajax-otel"], [data-js-value="ajax-hotel"]', document, 'innerHTML'),
        href: window.location.href,
        country: region.dataset.productCountry,
        region: region.dataset.productRegion,
        roomType: getNodeData('[data-js-value="room-selected"]', tour),
        boardType: getNodeData('[data-js-value="food-selected"]', tour),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '').toUpperCase()),
        city_from: getNodeData('[data-js-value="departure-selected"]', tour),
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('#gallery img[data-description]', document, 'src'),
        occupancy: getOccupancy(),
        flight: await getFlight(flightUrl)
    };
    return option;
}

async function getFlight(flightUrl) {
    try {
        if ( !flightUrl ) {
            return null;
        }
        const result = await fetch(flightUrl.dataset.href).then(resp => resp.json());
        const sectors = [result.flightOut, result.flightRet].map(parseSegments)
        return {sectors};

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSegments(segment) {
    const segments = [new FlightSegment({
            flightNumber: segment.flightNo,
            airline: segment.carrierName,
            departureDate: segment.depDate,
            departureTime: segment.depTime,
            departureCity: segment.depName,
            arrivalDate: segment.desDate,
            arrivalTime: segment.desTime,
            arrivalCity: segment.desName,
    })]
    return {segments}
}

function extractDateItalka(dateText) {
    const [day, month] = dateText.replace(/^\./, '').split('.');
    return appendYear(day, month);
}

function getHotelRowByImage(img) {
    return img.closest('#form-and-offers');
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const dataCell = $first('#participants-count');
    if ( !dataCell ) {
        return null;
    }

    occupancy.adultsCount = Number(dataCell.dataset.adults);
    occupancy.childrenCount = Number(dataCell.dataset.childs);
    return occupancy;

}
