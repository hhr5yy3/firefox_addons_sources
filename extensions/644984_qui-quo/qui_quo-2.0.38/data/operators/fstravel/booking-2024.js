window.OPERATOR_NAME = "Fstravel";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".price-box").forEach(div => {
        if (!div.lastElementChild.querySelector(".qq")) {
            div.lastElementChild.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getPriceAndCurrency () {
    const priceAndCurrencyArray = getText($1('.price-box.end-price').lastElementChild);
    return {
        price: parseInt(priceAndCurrencyArray.replace(/\D/g, '')),
        currency: mapCurrencyUtil(priceAndCurrencyArray.replace(/[0-9\s]/g, ''))
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const  checkinInfo = $1('.hotel-cart .hotel-text');
    const {price, currency} = getPriceAndCurrency();
    const nightsAndOccupancyElem = getText(checkinInfo.lastElementChild);
    let option = {
        checkinDt: makeYear4Digits( getText(checkinInfo.firstElementChild).split('—')[0].trim()),
        nights: nightsAndOccupancyElem.match(/・(\d+)\s*ноч/)[1],
        hotelName: getText($1('.hotel-name')),
        hotel_desc: "",
        href: "",
        country: getText($1('.body-margin')).split(' ')[0],
        region: getText($1('.hotel-head-h2 span')),
        roomType: getText($1('.hotel-room-name')).split(': ')[1],
        boardType: getText($1('.tour-food')).split(': ')[1],
        price,
        currency,
        city_from: getText($1('.new-header__location-text')),
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.hotel-img-object')?.src,
        occupancy: getOccupancy(nightsAndOccupancyElem),
        flight: getFlight()
    }
    return option;
}

function getOccupancy (nightsAndOccupancyElem) {
    nightsAndOccupancyElem = nightsAndOccupancyElem.trim();
    const adultMatch = nightsAndOccupancyElem.match(/(\d+)\s+взросл(ый|ых)/);
    const adults = adultMatch ? parseInt(adultMatch[1]) : 0;
    const childrenMatch = nightsAndOccupancyElem.match(/(\d+)\s+ребен/);
    const children = childrenMatch ? parseInt(childrenMatch[1]) : null;
    return {
        adultsCount: adults,
        childrenCount: children,
        childAges: ""
    };
}

function getFlightDates (flightsCard) {
    const flightDatesElem = $1('.bookingFly-body-flight-dates', flightsCard);
    const departureDateArray = getNodeProperty(flightDatesElem.firstElementChild).split(' ');
    const arrivalDateArray = getNodeProperty(flightDatesElem.lastElementChild).split(' ');
    const departureMonth = monthNameToNumber(departureDateArray[1].replace(/\./g, ''));
    const arrivalMonth = monthNameToNumber(arrivalDateArray[1].replace(/\./g, ''));
    return {
        departureDate: `${departureDateArray[0]}.${departureMonth}.${departureDateArray[2]}`,
        arrivalDate: `${arrivalDateArray[0]}.${arrivalMonth}.${arrivalDateArray[2]}`,
    }
}

function createStraightFlight (flightsCard, flightNumbersArray, airportIdArray) {
    const departureStraightFlight = {};
    const arrivalStraightFlight = {};

    departureStraightFlight.flightNumber = getElementShallowText(flightNumbersArray[0]);
    arrivalStraightFlight.flightNumber = getElementShallowText(flightNumbersArray[flightNumbersArray.length - 1]);

    departureStraightFlight.departureDate = getFlightDates(flightsCard).departureDate;
    arrivalStraightFlight.arrivalDate = getFlightDates(flightsCard).arrivalDate;

    const flightTimeArray = $$('.bookingFly-body-flight-time-text', flightsCard);
    departureStraightFlight.departureTime = getNodeProperty(flightTimeArray[0]);
    arrivalStraightFlight.arrivalTime = getNodeProperty(flightTimeArray[1]);

    const citiesArray = $$('.cities-names', flightsCard);
    departureStraightFlight.departureCity = getNodeProperty(citiesArray[0]);
    arrivalStraightFlight.arrivalCity = getNodeProperty(citiesArray[1]);

    departureStraightFlight.departureAirportID = getNodeProperty(airportIdArray[0]);
    arrivalStraightFlight.arrivalAirportID = getNodeProperty(airportIdArray[citiesArray.length]);

    return [departureStraightFlight, arrivalStraightFlight];
}

function createTransferFlight (flightNumbersArray, airportIdArray) {
    const transferIds = airportIdArray.slice(1, -1);
    const transferFlights = [];
    const transferFlightSegment = {};
    for (let i = 1; i <= transferIds.length; i++) {
        transferFlightSegment.flightNumber = getElementShallowText(flightNumbersArray[i]);
        transferFlightSegment.departureAirportID = getNodeProperty(transferIds[i - 1]);
        transferFlightSegment.arrAirportID = getNodeProperty(transferIds[i - 1]);
        transferFlights.push(transferFlightSegment);
    }
    return transferFlights;
}

function createSegment (flightsCard, numberFlight) {
    const flightNumbersArray = $$('.bookingFly-body-flight-header-left-images p', flightsCard);
    const airportIdArray = $$('.bookingFly-body-flight-time-line.v-mobile-hide span', flightsCard);
    const [departureStraightFlight, arrivalStraightFlight]
        = createStraightFlight(flightsCard, flightNumbersArray, airportIdArray);
    const transferFlights = createTransferFlight (flightNumbersArray, airportIdArray);
    const allFlightsArray = [departureStraightFlight, ...transferFlights, arrivalStraightFlight];
    return {
        serviceClass: getNodeProperty($1('.bookingFly-body-flight-header-left', flightsCard).lastElementChild),
        baggage: getNodeProperty($1('.bookingFly-body-baggage-line', flightsCard)),
        flightNumber: allFlightsArray[numberFlight - 1].flightNumber,
        departureDate: allFlightsArray[numberFlight - 1].departureDate || "",
        departureTime: allFlightsArray[numberFlight - 1].departureTime || "",
        departureCity: allFlightsArray[numberFlight - 1].departureCity || "",
        departureAirportID: allFlightsArray[numberFlight - 1].departureAirportID,
        arrivalDate: allFlightsArray[numberFlight].arrivalDate || "",
        arrivalTime: allFlightsArray[numberFlight].arrivalTime || "",
        arrivalCity: allFlightsArray[numberFlight].arrivalCity || "",
        arrivalAirportID: allFlightsArray[numberFlight].arrivalAirportID,
    }
}

function getFlight () {
    try {
        const flightsCards = $$('.bookingFly-body');
        const numberForwardFlights
            = $$('.bookingFly-body-flight-header-left-images p', flightsCards[0]).length;
        const numberReverseFlights
            = $$('.bookingFly-body-flight-header-left-images p', flightsCards[1]).length;
        const forwardSector = {segments: []};
        const reverseSector = {segments: []};
        for (let i = 1; i <= numberForwardFlights; i++) {
            forwardSector.segments.push(createSegment(flightsCards[0], i));
        }
        for (let i = 1; i <= numberReverseFlights; i++) {
            reverseSector.segments.push(createSegment(flightsCards[1], i));
        }
        return {
            sectors: [forwardSector, reverseSector]
        }
    } catch (e) {
        console.log(e)
    }
}

function getHotelRowByImage(img) {
    return img.closest('.booking');
}
