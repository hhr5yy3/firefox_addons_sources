window.OPERATOR_NAME = "Великолепный век";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        occupancy : {
            adultsCount: parseInt(getNodeData('.adults.counter')),
            childrenCount: parseInt(getNodeData('.children.counter')),
            city_from: getNodeData('#tour-search-city-name', document, 'value')
    }
    };
}

function getSearchButton() {
    return $$('.site-button form-submit');
}

function injectData() {
    $$(".home__search-item .home__search-col-right").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: `width: 100%;justify-content: end;`}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourName = getNodeData('.home__search-item-title', tour)
    const hotelName = $$('.home__search-item-hotel-name a', tour).map(h => getText(h)).join(' / ');
    const region = $$('.home__search-item-hotel-name i', tour).map(h => getText(h)).join(' / ')
    const flyLink = getNodeData('a[href*="/tour/fly-data"]', tour, 'href');
    const flight = await getFlight(flyLink);
    const price = getNodeData('.home__search-item-price', tour);
    let option = {
        checkinDt: getNodeData('.departure-date span', tour),
        nights: getNodeData('.tour-nights-count span', tour),
        hotelName: tourName ?  `${tourName} ${hotelName ? '('+ hotelName+')' : ''}` : hotelName,
        href: getNodeData('.home__search-item-title', tour, 'href'),
        region,
        roomType: "",
        boardType: getNodeData('.tour-food span', tour),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: flight?.sectors[0]?.segments[0]?.departureCity || SEARCH_CRITERIA.occupancy?.city_from || "",
        thumbnail: getNodeData('img[src*="/uploads/cache"]', tour, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight
    };
    return option;
}

async function getFlight(href) {
    try {
        if (!href) {
            return null;
        }
        const text = await fetchTimeout(5000, fetch(href)).then(res => res.text());
        const parser = new DOMParser();
        const modal = parser.parseFromString(text, "text/html");
        const sectors = $$('.fly-data-items', modal).map(parseSector)
        return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}


function parseSector(sector) {
    const segments = $$('.fly-data-item', sector).map(parseSegment);
    return {segments}
}

function parseSegment(seg) {
    const [departureTime, arrivalTime] = getNodeData('.time', seg).split(/\s*-\s*/);
    let departureDate = getNodeData('.date', seg);
    let arrivalDate = arrivalTime.match(/\*/) ? addDaysToStringDate(departureDate, 1) : departureDate;
    const [departureCity, arrivalCity, flightNumber] = getNodeData('.route', seg).split(/\s*–\s*|\s*\(|\)\s*/);
    return new FlightSegment({
        flightNumber,
        departureDate,
        departureTime,
        departureCity,
        arrivalDate,
        arrivalTime: arrivalTime.replace(/\*/, ''),
        arrivalCity
    })
}

function getHotelRowByImage(img) {
    return img.closest('.home__search-item');
}
