window.OPERATOR_NAME = 'География';
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    (async () => {
        const searchContainers = $$('.search-preview, .search-field').map((c) => ({
            header: getNodeData('.search-preview-header', c),
            text: getNodeData('.search-preview-data', c)
        }));

        const city_from = (searchContainers.find((c) => c.header === 'Город вылeта') || {}).text;
        const country = (searchContainers.find((c) => c.header === 'страна') || {}).text;
        const occupancy = await getOccupancy();
        SEARCH_CRITERIA = { city_from, country, occupancy };
    })();

    return SEARCH_CRITERIA;
}

async function getOccupancy() {
    const parentSelector = '.search-widget.peoples';

    if ($1(parentSelector)) {
        $1(parentSelector + ' .search-field').click();
        await waiting(0);
        const popupContainer = $1(parentSelector + ' .popup-list');
        const getInput = (labelStartsWith) =>
            getElementByXpath(`//*[starts-with(., '${labelStartsWith}')]/following-sibling::input`, popupContainer) ||
            {};
        const adultsCount = parseInt(getInput('взрослые').value) || 0;
        const childrenCount = parseInt(getInput('дети').value) || 0;
        let childAgesArr = [];
        for (let i = 1; i <= childrenCount; i++) {
            let age = getInput('возраст ' + i).value;
            if (age) childAgesArr.push(age);
        }
        const childAges = childAgesArr.length ? childAgesArr.join(',') : null;
        $1(parentSelector + ' .btn-ok').click();
        return { adultsCount, childrenCount, childAges };
    }
    return null;
}

function getSearchButton() {
    return $1('.search-button');
}

function injectData() {
    $$('.agency-mini-tour .tour__cabinet-btns').forEach((div) => {
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({ align: 'qq-vertical', cssText: '' }));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelCard = searchHotelCard(tour);
    const [country, region] = (getNodeData('.tour-hotel__title', hotelCard) || getNodeData('.hotel-card__region', hotelCard)).split(/\s*,\s*/);
    const isForRating = img.classList.contains('qq-rating-btn');
    const option = {
        checkinDt: getCheckinDate(tour),
        nights: getNodeData('.tour__info-dates-nights', tour).match(/\d+/),
        hotelName: getHotelName(),
        hotel_desc: getNodeData('.tour-hotel__description', hotelCard) || getNodeData('.hotel__description', hotelCard),
        href: null,
        pageUrl: $1('.tour__link', tour).href,
        country: country || SEARCH_CRITERIA.country.text,
        region,
        roomType: getNodeData('.tour__room-info', tour, 'innerText'),
        boardType: getNodeData('.tour__meal-info', tour, 'innerText'),
        price: parseInt(getNodeData('.tour__link-price', tour).replace(/\D+/g, '')),
        currency: getNodeData('.tour__link-price small', tour),
        city_from: SEARCH_CRITERIA.city_from || '',
        operator: getNodeData('.tour__operator-logo', tour, 'alt'),
        thumbnail:
            getNodeData('.tour-hotel__image img', hotelCard, 'src') ||
            getNodeData('img.hotel__image', hotelCard, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy ? SEARCH_CRITERIA.occupancy : null,
        flight: isForRating ? null : await getFlight(tour)
    };
    return option;

    function getHotelName() {
        let name = getNodeData('.hotelname [id]', hotelCard);
        let stars = getNodeData('.hotelname .hotelstars', hotelCard);
        if (name) return name + ' ' + stars;
        stars = getNodeData('.hotel__title[id] span', hotelCard, undefined, '');
        name = getNodeData('.hotel__title[id]', hotelCard, undefined, '');
        name = name.replace(stars, '').trim()
        return name + ' ' + stars;
    }
}

async function getFlight(tour) {
    try {
        const tourId = ((getNodeData('.tour__link', tour, 'href') || '').match(/(\d+)\/?/) || [])[1];
        const url = `${window.location.origin}/tourvisor/api/?method=full_actualize&tourid=${tourId}/`;
        const response = await fetch(
            url,{
            method: 'GET',
            headers: {Referer: window.location.origin}
        });
        if (!response) return null;
        if (response.status === 401 || response.status === 500) {
            logError(
                `${OPERATOR_NAME}#getFlight: GET "${url}" failed. response.status: "${response.status}", response.statusText: "${response.statusText}"`
            );
            return null;
        }
        if ((response.headers.get('Content-Type') || '').match(/(application\/json)|(text\/javascript)/i)) {
            const json = await response.json();
            const flights = (json || {}).flights || [];
            const flight = flights.find((f) => f.isdefault) || flights[0];
            if (flight) {
                function getFlightSegment(flight) {
                    return new FlightSegment({
                        airline: flight.company ? flight.company.name : '',
                        flightNumber: flight.number,
                        plane: flight.plane,
                        departureDate: flight.departure ? flight.departure.date : '',
                        departureTime: flight.departure ? flight.departure.time : '',
                        departureCity: flight.departure && flight.departure.port ? flight.departure.port.name : '',
                        departureAirport: flight.departure && flight.departure.port ? flight.departure.port.shortName : '',
                        departureAirportID: flight.departure && flight.departure.port ? flight.departure.port.id : '',
                        arrivalDate: flight.arrival ? flight.arrival.date : '',
                        arrivalTime: flight.arrival ? flight.arrival.time : '',
                        arrivalCity: flight.arrival && flight.arrival.port ? flight.arrival.port.name : '',
                        arrivalAirport: flight.arrival && flight.arrival.port ? flight.arrival.port.shortName : '',
                        arrivalAirportID: flight.arrival && flight.arrival.port ? flight.arrival.port.id : ''
                    });
                }

                const forwardSegments = (flight.forward || []).map(getFlightSegment);
                const backwardSegments = (flight.backward || []).map(getFlightSegment);
                const segments = {sectors: []};
                if (forwardSegments.length) segments.sectors.push({segments: forwardSegments});
                if (backwardSegments.length) segments.sectors.push({segments: backwardSegments});
                return segments.sectors.length ? segments : null;
            }
        }
    } catch (e) {
        console.log(e);
        return null;
    }

}

function searchHotelCard(tour) {
    let searchResult = tour.parentNode;
    while (searchResult) {
        const hotelCard =
            searchResult.classList.contains('tour-hotel__card') || searchResult.classList.contains('hotel-card_agency');
        if (hotelCard) {
            return searchResult;
        }
        searchResult = searchResult.previousElementSibling;
    }
    return null;
}

function getHotelRowByImage(img) {
    return img.closest('.agency-mini-tour');
}

/**
 * @param {HTMLElement} tour
 * @returns {string}
 */
function getCheckinDate(tour) {
    const [_, day, month] = getNodeData('.tour__info-dates-period', tour).match(/(\d+)\s([^\d\s]+)/i) || [];
    return dateFromDayAndMonthName(day, month);
}
