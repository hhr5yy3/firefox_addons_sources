window.OPERATOR_NAME = "tours.ua";
window.showTopHotelsRating = true;

// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    const occupancy = {
        adultsCount: +document.querySelector('#adult_count').value,
        childrenCount: +document.querySelector('#children_count').value,
        childAges: null
    };
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = $$('[title="Выберите возраст"]').map(select => select.value).join(',');
    }
    return {
        country: selectedOption(document.querySelector('#country_id')),
        city_from: selectedOption(document.querySelector('#town_from_id')),
        occupancy: occupancy,
    };
}


function injectData() {
    $$('.prices-detail-wrap .tourua-price-detail.row').forEach(tr => {
        if ( !tr.querySelector('.qq') ) {
            const btns = qqBtns({align: 'qq-horizontal'});
            btns.style.overflow = 'visible';
            tr.append(btns);
        }
    })
}

function getSearchButton() {
    return document.querySelector('#searchButton');
}


// --------- Rows ---------------------------------

function extractRegion(hotel) {
    const region = hotel.querySelector('.town-name').cloneNode(true);
    region.querySelector('.result-icon').remove();
    const text = getNodeProperty(region);
    region.remove();
    return text;
}

function extractHotelName(hotel) {
    return getNodeProperty(hotel.querySelector('.tourua-hotel-name a'))
}

function extractHotelUrl(hotel) {
    return getNodeProperty(hotel.querySelector('.tourua-hotel-name a'), null, 'href');
}

function extractBoardType(hotel) {
    return getNodeProperty(hotel.querySelector('.tourua-detail-hotel-name').nextElementSibling.nextElementSibling);
}

function extractRoomType(hotel) {
    return getNodeProperty(hotel.querySelector('.tourua-detail-hotel-name').nextElementSibling);
}

function extractDateAndNights(row) {
    const parts = getText(getElementByXpath('.//div[contains(@class,"col-md-2")]/text()[1]', row)).split(',');
    return {
        checkinDt: parts[0],
        nights: trim(parts[1]).replace(/\D+/g, '')
    }
}

function extractPrice(hotel) {
    let text = getNodeProperty(hotel.querySelector('.price'));
    let currency = '';
    if ( text.indexOf('$') > -1 ) {
        currency = 'USD';
    } else if ( text.indexOf('€') > -1 ) {
        currency = 'EUR';
    } else if ( text.indexOf('грн') > -1 ) {
        currency = 'UAH';
    }

    return {
        price: extractIntFromStr(text.replace(/\D+/g, '')),
        currency: currency
    }
}

function extractOperator(hotel) {
    const icon = hotel.querySelector('.tourua-search-op-img');
    let operator = OPERATOR_NAME;

    if ( icon.length ) {
        operator += ' / ' + icon.prop('title');
    }

    return operator;
}

async function createOption(img) {
    const hotel = img.closest('.tourua-price');
    const row = img.closest('.tourua-price-detail');
    const dates = extractDateAndNights(row);
    const price = extractPrice(row);

    const option = {
        country: SEARCH_CRITERIA.country,
        region: extractRegion(hotel),
        hotelName: extractHotelName(hotel),
        href: extractHotelUrl(hotel),
        checkinDt: dates.checkinDt,
        nights: dates.nights,
        boardType: extractBoardType(row),
        roomType: extractRoomType(row),
        price: price.price,
        currency: price.currency,
        city_from: SEARCH_CRITERIA.city_from,
        occupancy: SEARCH_CRITERIA.occupancy,
        operator: extractOperator(row)
    };
    if ( !img.classList.contains('qq-rating-btn') ) {
        const bronBtn = row.querySelector('a[href*="/cart/go"]');
        const tourId = lastElement(bronBtn.href.split('/'));
        const tourDetails = await getTourDetails(tourId);
        option.flight = getFlight(tourDetails);
    }
    return option;
}

function getFlight(tourDetails) {
    try {
        const sectors = tourDetails.flights.map(parseSector);
        return {sectors};
    } catch(e) {
        console.log(e);
    }
}

function parseSector(sector) {
    const segments = [sector[0]].map(parseSegment);
    return {segments}
}

function parseSegment(segment) {
    return new FlightSegment({
        flightNumber: segment.company.trim().length < 3 ? segment.company.trim()  + segment.flight_number.trim() : segment.flight_number.trim(),
        airline: segment.company.trim().length < 3 ? segment.company.trim() : null,
        departureDate: segment.date,
        departureTime: segment.time_start,
        departureCity: segment.origin,
        arrivalTime: segment.time_end,
        arrivalCity: segment.destination
    })
}

async function getTourDetails(tourId) {
    try {
        const baseUrl = 'https://agent.tours.ua/search/detail?tour_id=' + tourId;
        const response = await fetchTimeout(30000, fetch(baseUrl));
        if ( response && response.ok ) {
            return await response.json();
        }
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}
