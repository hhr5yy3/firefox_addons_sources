window.OPERATOR_NAME = "Vand";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".information-block").forEach(div => {
        if (!div.querySelector(".qq")) {
            const container = createQQContainer()
            div.append(container);
        }
    });
}

async function createOption(img) {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const regionsInfo = await fetch(`${location.origin}/ajax/home/filters/${pathParts[1]}`).then(r => r.json()).catch(console.log)
    const dateStart = getNodeData('.information-block [data-date].calendar')
    const dateEnd = getNodeData('.information-block .information__date-end .date')
    const country = regionsInfo.country.name_vin;
    const filters = regionsInfo.filters;
    const datesArray = getDatesArrayBetweenTwoDates(dateStart, dateEnd);
    const services = $$('.service-row').map(row => parseService(row, datesArray)).filter(svc => svc.description)
    const insurance = services.filter(svc => svc.description.match(/Страховка/i)).map(obj => new quickBookingValue(obj))
    const transfers = services.filter(svc => svc.description.match(/Трансфер/i)).map(obj => new quickBookingValue(obj))
    const hotels = services.filter(svc => svc.description.match(/HOTEL:/i)).map(svc => parseHotel(svc, country, filters));
    const other = services.filter(svc => !svc.description.match(/HOTEL|отель|Трансфер|Страховка/i)).map(obj => new quickBookingValue(obj))
    const flight = getFlight();

    const prices = new Prices();

    const nettPrice = parseInt(getNodeData('.total-price .price'));
    const currency = mapCurrencyUtil(getNodeData('.total-price .currency'));
    const commission = parseInt(getNodeData('.discount-price .price'))
    const totalPrice = nettPrice - (commission);

    prices.addPriceAuto(String(nettPrice), String(totalPrice), currency, commission)


    let option = {
        checkinDt: dateStart,
        nights: hotels[0].nights,
        hotelName: hotels[0].hotelName,
        href: getNodeData('.information__content a', document, 'href'),
        country,
        region: hotels[0].region,
        roomType: hotels[0].roomType,
        boardType: hotels[0].boardType,
        price: totalPrice,
        currency: currency,
        city_from: "",
        prices,
        insurance,
        transfers,
        other,
        flight
    };
    return option;
}

function parseService(row, dates) {
    const length = getNodeData('input[name*="[Length]"]', row, 'value');
    const dateStartIndex = Number(getNodeData('input[name*="[Day]"]', row, 'value'))-1;
    const dateEndIndex = Number(length)-1;
    return {
        description: getNodeData('input[name*="[Name]"]', row, 'value'),
        dateStart: dates[dateStartIndex],
        dateEnd: dates[dateStartIndex+dateEndIndex],
        length,
        row
    }
}

function parseHotel(svc, country, filters) {
    const hotelCode = getNodeData('input[name*="[Code]"]', svc.row, 'value');
    const hotel = filters.hotels[hotelCode];
    const room = (selectedOption($1('select.change-room', svc.row)) || selectedOption($1('select.change-room')) || "").split(/\s*\/\s*/);
    const text = getNodeData('input[name*="[Name]"]', svc.row, 'value');
    const split = text.split(/::|\/|\s*,\s*/);
    const region = split[1];
    const hotelName = split[2];
    const roomType = split[4];
    const boardType = split[6];
    const accommodation = split[5];
    return {
        dateStart: svc.dateStart,
        dateEnd: addDaysToStringDate(svc.dateStart, svc.length),
        nights: svc.length,
        hotelName: (hotel && hotel.name) || hotelName,
        roomType: room[0] || roomType,
        accommodation: room[1] || accommodation,
        boardType,
        region: (hotel && hotel.cityName) || region,
        country
    }
}


function getFlight() {
    try {
        const flightRow = $1('.flight-row.act');
        const segmentsArrays = [$$('.airline', flightRow), $$('.departure', flightRow), $$('.arrival ', flightRow), $$('.baggage-info', flightRow)]
        const segments = segmentsArrays[0].map((a, index) => {
            return {
                airline: segmentsArrays[0][index],
                departure: segmentsArrays[1][index],
                arrival: segmentsArrays[2][index],
                baggage: segmentsArrays[3][index],
            }
        }).map(parseSegment)

        return  {
            sectors: splitSegmentsToSectors(segments)
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSegment(segment) {
    const parseDate = (node) => {
        if ( !node ) {
            return null;
        }
        const matched = getText(node).match(getRegexPatterns().date)
        return matched ? makeYear4Digits(matched[0].replace(/\//g, '.')) : null

    }

    return new FlightSegment({
        flightNumber: `${segment.airline.dataset.airline}${segment.airline.dataset.flightnumber}`,
        airline: segment.airline.dataset.airlinename,
        travelTime: segment.airline.dataset.flightduration,
        departureDate: parseDate(segment.departure),
        departureTime: segment.departure.dataset.departuredatetime,
        departureCity: segment.departure.dataset.departurecity,
        departureAirportID: segment.departure.dataset.departureairport,
        arrivalDate: parseDate(segment.arrival),
        arrivalTime: segment.arrival.dataset.arrivaldatetime,
        arrivalCity: segment.arrival.dataset.arrivalcity,
        arrivalAirportID: segment.arrival.dataset.arrivalairport
    })
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const {
        insurance,
        transfers,
        other,
        flight} = tourOptions
    const services = {
        tourOptions,
        insurance,
        transfers,
        other,
        flight
    };
    return services;
}

function getPrices(claimDocument) {
}

function parsePassengers() {
    const panels = [];
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: '',
        issueDate: '',
        expire: '',
        lastName: '',
        firstName: '',
        nationality: '',
        serial: '',
        number: '',
        email: ''
    }));
    return passenger;
}
