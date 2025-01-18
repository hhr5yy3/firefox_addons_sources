window.OPERATOR_NAME = "Tourist Club";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    if ( document.querySelector('#OrderPage') ) {
        return null;
    }
    const region =  document.querySelector('[placeholder*="Страна"], [placeholder="Например, Амстердам"]');
    const city =   document.querySelector('[placeholder*="Выбрать аэропорт"]');
    if ( !region && !city ) {
        return null;
    }
    return {
        region: region.value.replace(/тур в/i, '').trim(),
        city: city ?  city.value.split(',')[0] : ''
    };
}

function getSearchButton() {
    return document.querySelector('form input[type="submit"]');
}

function injectData() {
    querySelectorAll(document, ".tcc-hotel-card-info .tcc-hotel-card-info-more").forEach(div => {
        if (!div.parentNode.querySelector(".qq")) {
            div.before(qqBtns({align: "qq-horizontal", asyncFunc: asyncFunc}));
        }
    });

    querySelectorAll(document, ".tcc-hotel-table-row").forEach(div => {
        if (!div.querySelector(".qq")) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.width = '100%';
            btns.style.justifyContent = 'flex-end';
            div.append(btns);
        }
    });
    const orderPage = document.querySelector('#OrderPage');
    if ( orderPage && !orderPage.querySelector('.qq') ) {
        orderPage.querySelector('.order-aside-summary').after( qqBtns({align: "qq-horizontal"}, createOrderOption));
    }
}

function createOption(img) {
    const rxPatterns = getRegexPatterns();
    const hotel = getHotelRowByImage(img);
    const tour = img.closest('.tcc-hotel-table') || hotel;
    const dates = getText(hotel.querySelector('.hotel-date')).match(rxPatterns.dateStrict);
    const hotelNameNode = hotel.querySelector('.tcc-hotel-card-title');
    const infoList = tour.querySelector('.tcc-hotel-card-info-list') || tour;
    const price = getText(tour.querySelector('.tcc-hotel-card-price span span:not(.discount), .rate-price strong:not(.discount)'));
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: getHotelName(hotel, hotelNameNode),
        href: getNodeProperty(hotelNameNode.querySelector('a'), null, 'href'),
        country: getText(document.querySelector('.breadcrumbs [content="3"]').parentNode),
        region: SEARCH_CRITERIA.region,
        roomType: getText(infoList.querySelector('.tcc-icon-free-cancel, .tcc-hotel-table-heading')),
        boardType: getText(infoList.querySelector('.tcc-icon-produst-package, [tabindex="0"]')),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(rxPatterns.cleanCurrency, '')),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(document.querySelector('#hotel-card-img')),
        occupancy: getOccupancy(),
        flight: !img.classList.contains('qq-rating-btn') ? getFlight(hotel) : null
    };
    return option;
}

function getHotelName(hotel, hotelNameNode) {
    const stars =   hotel.querySelector('.tcc-hotel-card-rating [aria-valuenow], .order-hotel__rating [aria-valuenow]');
    return hotelWithStars(getText(hotelNameNode), stars ? stars.getAttribute('aria-valuenow') : null);
}

function getFlight(hotel) {
    try {
        let infoFlight = hotel.querySelector('.info-flight');
        if (!infoFlight && SEARCH_CRITERIA && SEARCH_CRITERIA.city) {
            const moreBtn = hotel.querySelector('.tcc-hotel-card-info-more');
            if (moreBtn) {
                moreBtn.click();
                infoFlight = hotel.querySelector('.info-flight');
                if (!infoFlight) {
                    return null;
                }
            }
        }
        const sectors = querySelectorAll(infoFlight, '.tcc-combo-flight__item').map(parseSector);
        return sectors.length > 0 ? {sectors} : null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    const segments = querySelectorAll(sector, '.tcc-combo-flight__timeline-v__item').map(parseSegment);
    return {segments};
}

function parseSegment(segment) {
    const ids = querySelectorAll(segment, '.tcc-combo-flight__id strong').map( strong => getText(strong) );
    const dep = extractTimeAndAirport(segment.querySelector('.tcc-combo-flight__timeline-v__from'));
    const arr = extractTimeAndAirport(segment.querySelector('.tcc-combo-flight__timeline-v__to'));
    return new FlightSegment({
        flightNumber: ids[1],
        airline: ids[0],
        travelTime: "",
        plane: "",
        departureDate: getText(segment.querySelector('.tcc-combo-flight__timeline-v__date')),
        departureTime: dep.time,
        departureAirport: dep.caption,
        departureAirportID: dep.id,
        arrivalTime: arr.time,
        arrivalAirport: arr.caption,
        arrivalAirportID: arr.id,
        baggage: ids[2]
    })
}

function extractTimeAndAirport(node) {
    const time = node.querySelector('span');
    const airport = getText(time.nextSibling);
    const caption = airport.replace(/\(.+/, '').trim();
    const id = (airport.match(/\((.+?)\)/) || [])[1];
    return {time: getText(time), caption, id }

}

function getOccupancy() {
    return {
        adultsCount: +getUrlSearchParameters('adults'),
        childrenCount: +getUrlSearchParameters('childrenCount'),
        childAges: (getUrlSearchParameters('children') || '').replace(/\]|\[/g, '')
    };
}

async function asyncFunc(img) {
    if ( !SEARCH_CRITERIA.city ) {
        return null;
    }
    const hotel = getHotelRowByImage(img);
    let infoFlight = hotel.querySelector('.info-flight');
    if (!infoFlight) {
        const moreBtn = hotel.querySelector('.tcc-hotel-card-info-more');
        if (moreBtn) {
            moreBtn.click();
            await waitingFor(() => hotel.querySelector('.info-flight'), 100, 20);
            return null;
        }
    }
}

function getHotelRowByImage(img) {
    return img.closest(".tcc-hotel-card");
}

function createOrderOption() {
    const rxPatterns = getRegexPatterns();
    const hotel = document.querySelector('.order-hotel__data');
    const dates = getText(hotel.querySelector('.order-date')).match(rxPatterns.dateStrict);
    const country =  getText(document.querySelector('.breadcrumbs [content="3"]').parentNode);
    const lies = querySelectorAll(hotel, '.order-hotel__keys li').map( li => getText(li));
    const price = getText(document.querySelector('.order-aside-summary__price'));
    const flight = getFlight(document);
    const option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: getHotelName(hotel, hotel.querySelector('.order-hotel__title')),
        href: null,
        country,
        region: getText(hotel.querySelector('.order-dest')).split(/\s*,\s*/).filter(t => t !== country).join(', '),
        roomType: lies[0],
        boardType: lies[1],
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(rxPatterns.cleanCurrency, '')),
        city_from: flight ? flight.sectors[0].segments[0].departureAirport : "",
        operator: OPERATOR_NAME,
        thumbnail:getNodeProperty(document.querySelector('.order-hotel__image img'), null, 'src'),
        occupancy: null,
        flight
    };
    return option;
}
