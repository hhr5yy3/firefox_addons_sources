window.OPERATOR_NAME = "Asialuxe";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".hotel-card .price").forEach(div => {
        const parent = div.parentNode;
        if (!parent.querySelector(".qq") ) {
            parent.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const info = $$('.info', tour).extractNodesText();

    const flight = await getFlight()
    const priceText = getText($1('.price', tour).lastChild).replace(/\s+/g, '');
    const dates = info[0].match(getRegexPatterns().date).map(makeYear4Digits)
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(...dates)),
        hotelName: getNodeData('.hotel-name') || getNodeData('.hotel-wrap h2'),
        href: location.href,
        region: $1('#map') ? getNodeProperty($1('#map').previousElementSibling).replace(/,/g, ' '.trim()): '',
        roomType: getNodeData('.name-room', tour),
        boardType: $$('.fa-utensils', tour).map(i => getText(i.parentNode))[0],
        price: extractIntFromStr(priceText),
        currency: mapCurrencyUtil(priceText),
        city_from: "",
        thumbnail: getNodeProperty('.hotel-images img', '', 'src'),
        flight,
        occupancy: {
            adultsCount: Number(getParameterByName('adult')),
            childrenCount: Number(getParameterByName('child')),
        },
    };
    return option;
}

async function getFlight() {
    try {
        const response = await fetch(`https://api.asialuxe.app/v1/tour/flight?request_id=${getParameterByName('request_id')}&flight_buy_id=${getParameterByName('flight_buy_id')}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer oqO7ALyHbi41BKJ-7QJ7PXLa59P1LEGmQp0UlkWCunsqqsQvz_1a5jFKRvHM_anc',
                'Content-Type': 'application/json'
            }}).then(resp => resp.json());
        const flightData = response.data;
        const sectors = flightData.offers.map(parseSector);
        return {sectors}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(offer) {
     return {segments: offer.segments.map(parseSegment)}
}

function parseSegment(segment) {
    const dep = segment.departure;
    const arrival = segment.arrival;
    return new FlightSegment({
        flightNumber: `${segment.flight}${segment.flight_number}`,
        airline: segment.avia_company?.name,
        travelTime: segment.duration.match(/\d+/g).join(':'),
        plane: segment.plane,
        departureDate: dep.date_format.split('-').reverse().join('.'),
        departureTime: dep.time_format,
        departureCountry: dep.country,
        departureCity: dep.city.split(/\s+/)[0],
        departureAirport: dep.name,
        departureAirportID: dep.code,
        serviceClass: segment.class,
        arrivalDate: arrival.date_format.split('-').reverse().join('.'),
        arrivalTime: arrival.time_format,
        arrivalCountry: arrival.country,
        arrivalCity: arrival.city.split(/\s+/)[0],
        arrivalAirport: arrival.name,
        arrivalAirportID: arrival.code
    })
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-card');
}
