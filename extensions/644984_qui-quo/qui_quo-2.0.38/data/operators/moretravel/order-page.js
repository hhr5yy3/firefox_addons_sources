window.OPERATOR_NAME = "Море Трэвел";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#center").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.prepend(createQQContainer());
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const allServices = $$('.js_servece_check', tour)
        .filter(svc => {
            const input = $1('input.js_addition_check', svc);
            return !input || input.checked
        }).map(extractService).filter(s=>s);


    const bookingParts = $$('.no_style tr.table_odd_row')
        .map(tr => ({caption: getNodeData('th', tr), content: getNodeData('td', tr)}))

    const country = bookingParts.find(p => filterServiceCallback(p, /страна/i)).content.capitalizeFirstLetter();
    const region = bookingParts.find(p => filterServiceCallback(p, /Город/i)).content.capitalizeFirstLetter();
    const hotels = allServices.filter(svc => filterServiceCallback(svc, /отель/i)).map(svc => parseHotel(svc, country, region));
    const insurance = allServices.filter(svc => filterServiceCallback(svc, /Страхов/i)).map(parseQuickBookingValue);
    const transfers = allServices.filter(svc => filterServiceCallback(svc, /трансфер/i)).map(parseQuickBookingValue);
    const railways = allServices.filter(svc => filterServiceCallback(svc, /ж.*д\s*проезд/i)).map(parseQuickBookingValue);

    const sectors = allServices.filter(svc => filterServiceCallback(svc, /Рейс/i));
    const passengersCount = {
        adults: 0,
        children: 0,
        infants: 0,
        count: 1
    };
    const adults = bookingParts.find(part => part.content && part.content.match(/взр/i));
    const kids = bookingParts.find(part => part.content && part.content.match(/дет/i));

    if ( adults ) {
        passengersCount.adults = Number(adults.content.replace(/\D+/, ''));
    }
    if ( kids ) {
        passengersCount.children = Number(String(kids.content.match(/\d+/, ''))) || 0;
    }
    if ( !adults ) {
       const tourists = bookingParts.find(part => part.caption && part.caption.match(/Турист/i));

       if ( tourists ) {
           passengersCount.adults = Number(tourists.content.replace(/\D+/, ''));
       }
    }

    passengersCount.count = passengersCount.adults + passengersCount.children;

    const flight = getFlight(sectors);

    const nettPrice = getNodeData('#tourPriceToPay');
    const commission = getNodeData('#tourPriceCommission');
    const grossPrice = getNodeData('#tourPriceTotal');
    const currency = mapCurrencyUtil(getNodeProperty($1('#tourPriceTotal').parentNode).replace(/\d+|\s+/, ''));

    const prices = new Prices();
    prices.addPriceAuto(nettPrice, grossPrice, currency, commission);

    const other = allServices.filter(svc => !filterServiceCallback(svc, /ж.*д\s*проезд|Страхов|трансфер|отель|Рейс/i))

    let option = hotels[0];
    option.flight = flight;
    option.checkinDt = railways.length > 0 ? railways[0].dateStart : option.dateStart
    option.price = parseInt(grossPrice);
    option.currency = currency;
    option.prices = prices;
    option.insurance = insurance;
    option.transfers = transfers;
    option.railways = railways;
    option.city_from = flight ? null : railways.length > 0 ? 'Ж/Д Проезд' : '';
    option.passengersCount = passengersCount;
    option.other = other;
    option.tourOperatorReference = getParameterByName('num');
    option.passengers = parsePassengers();

    return option;
}

function getFlight(services) {
    try {
        const segments = services.map(parseSector);
        const sectors = splitSegmentsToSectors(segments);
        if ( sectors.length === 0 ) {
            return null;
        }
        return {sectors};
    } catch (e) {
        console.log(e)
        return null;
    }
}

function parseSector(svc) {
    const parts = svc.description.split(/\s*\/\s*|\s*,\s*|-/);
    const date = svc.dateStart;
    const times = svc.description.match(getRegexPatterns().time);
    return new FlightSegment({
        flightNumber: parts[2].replace(times[0], ''),
        departureDate: svc.dateStart,
        departureTime: times[0],
        departureCity: parts[0].capitalizeFirstLetter(),
        departureAirportID: parts[3],
        departureTerminal: "",
        serviceClass: parts[7],
        arrivalDate: compareTime(times[0], times[1]) ? addDaysToStringDate(date, 1) : date,
        arrivalTime: times[1],
        arrivalCity: parts[1].capitalizeFirstLetter(),
        arrivalAirportID: parts[4]
    })

}

function parseQuickBookingValue(svc) {
    return new quickBookingValue({
        dateStart: svc.dateStart,
        dateEnd: svc.dateEnd,
        description: svc.description
    })
}

function filterServiceCallback(svc, text) {
    return svc.caption && svc.caption.match(text)
}

function parseHotel(svc, country, region) {
    const hotelParts = svc.description.split(/\s*\/\s*|\s*,\s*/)
    return {
        dateStart: svc.dateStart,
        dateEnd: svc.dateEnd,
        nights: svc.nights,
        hotelName: hotelParts[1],
        roomType: hotelParts[3],
        boardType: hotelParts[4],
        region,
        country
    }
}

function extractService(svc) {

    const tds = $$('td', svc);
    if ( tds.length === 2 ) {
        return parseOnlyHotelService(svc, tds)
    }
    const nights = getNodeProperty(tds[1])
    const dateStart = makeYear4Digits(getNodeProperty(tds[0]));
    if ( !getNodeProperty(tds[3]) ) {
        return null;
    }
    const [caption, ...description] = getNodeProperty(tds[3]).split(/\s*::\s*/);
    return {
        node: svc,
        dateStart,
        nights,
        dateEnd: Number(nights) > 1 ? addDaysToStringDate(dateStart, nights) : dateStart,
        description: description.join('::').replace(/-\s+|\(|\)/g, ''),
        caption
    }
}

function parseOnlyHotelService(svc, tds) {
    const [caption, ...description] = getNodeProperty(tds[0]).split(/\s*::\s*/);
    const datesRow = $$('tr.table_odd_row').find(tr => getText(tr).match(/даты:/i));
    const dates = getNodeData('td', datesRow).match(getRegexPatterns().date).map(makeYear4Digits);
    return {
        node: svc,
        dateStart: dates[0],
        nights: String(getDistance(dates[0], dates[1])),
        dateEnd: dates[1],
        description: description.join('::').replace(/-\s+|\(|\)/g, ''),
        caption
    }
}

function getHotelRowByImage(img) {
    return img.closest('body');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const {insurance, transfers, other, prices, railways} = tourOptions;
    return {
        insurance,
        transfers,
        other,
        tourOptions,
        prices,
        railways
    };
}

function parsePassengers() {
    const panels = $$('[onclick*="ShowUserDocWindowVisa"]').filter(panel => panel.offsetHeight > 0).map(a => a.closest('tr'));
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const tds = $$('td',panel);
    const [firstName, lastName, secondName] = getNodeProperty(tds[1], '').split(/\s+/).map(s => s.capitalizeFirstLetter());
    const type = getNodeProperty(tds[3], '').match(/реб/i) ? 'child' : 'adult'
    const [serial, number] = getNodeProperty(tds[5], '').split(/\s*№\s*/);
    const passenger = new Passenger({
        birthday: makeYear4Digits(getNodeProperty(tds[4])),
        expire: getNodeProperty(tds[6]) ?  makeYear4Digits(getNodeProperty(tds[6])) : null,
        lastName,
        firstName,
        secondName,
        serial,
        number,
        type
    });
    return passenger;
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        if ( passengers && passengers.length > 0  ) {
            const passengersCount = {
                adults: passengers.filter(p => p.type === 'adult').length,
                children: passengers.filter(p => p.type === 'child').length,
                infants: 0,
                count: 1
            };
            passengersCount.count = passengersCount.adults + passengersCount.children;
            return passengersCount;

        }
        return tourOptions.passengersCount;
    } catch (e) {
        return null;
    }
}
