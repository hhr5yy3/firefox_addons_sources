window.OPERATOR_NAME = "Evroport";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
   const details = $1('#DetailsForm');
   if ( details ) {
       const priceBlock = $1('.b-tour__price');
       if ( priceBlock && !$1('.qq')) {
           priceBlock.append(createQQContainer())
       }
   }
}

function getPrices() {
    return new Prices()
}

function createOption(img) {
    const tables = $$('table.ac-dataTable').map(parseTable);

    const serviceTable = tables.find(t => t.type === 'services');
    const region = getNodeData('.b-info__header').split(/\(|\)/)
    const hotels = serviceTable.rows.filter(row => (row.entries.get('Описание услуги') || '').match(/отель::|hotel::/i)).map(row => {
        const hotelDescription = row.entries.get('Описание услуги');
        const hotelParts = hotelDescription.split(/::|\s*\/\s*/);
        return {
            checkinDt: row.entries.get('Дата'),
            dateStart: row.entries.get('Дата'),
            nights: row.entries.get('Продолж.'),
            hotelName: hotelParts[2].replace(/,\s*ноче.+/, ''),
            href: null,
            country: region[1].trim(),
            region: region[0].trim(),
            roomType: hotelParts[3],
            boardType: hotelParts[4]
        }
    });
    const flight = getFlight(serviceTable.rows);
    const prices = new Prices();
    const priceNode = $1('[data-pricenat-mod-basic]')
    const priceData = priceNode.dataset;
    prices.nationalGrossPrice = Number(priceData.pricenatModBasic);
    prices.nationalCurrency = "RUB";
    prices.nationalNettPrice = Number(priceData.agpricenatModBasic) || 0;
    if ( priceData.priceModBasic  !== priceData.pricenatModBasic ) {
        prices.foreignGrossPrice = Number(priceData.priceModBasic);
        prices.foreignCurrency = getNodeData('.b-price__amount',priceNode).indexOf('$') > -1 ? 'USD' : "EUR";
        prices.foreignNettPrice = Number(priceData.agpriceModBasic) || 0;
    }

    let option = {
        price: prices.nationalGrossPrice,
        currency: 'RUB',
        hotels,
        flight,
        prices,
        serviceTable,
        tourOperatorReference: getNodeData('#acDogovorCode', document, 'value'),
        tables
    };

    if ( hotels[0] ) {
        option.checkinDt = hotels[0].checkinDt
        option.nights = hotels[0].nights
        option.hotelName = hotels[0].hotelName
        option.href = null
        option.country = hotels[0].country
        option.region = hotels[0].region
        option.roomType = hotels[0].roomType
        option.boardType = hotels[0].boardType
    }

    return option;
}

function parseSector(row) {
    const mainText = row.entries.get('Название') || row.entries.get('Описание услуги');
    const split = mainText.split(/\D:+|\/|\s*,\s*/).map(str => str.trim());
    const [departureTime, arrivalTime] = mainText.match(getRegexPatterns().time);
    const [departureCity, arrivalCity] = split[1].split('-');
    const [departureAirportID, arrivalAirportID] = split[3].split('-');
    let departureDate = row.entries.get('Дата');
    if ( departureDate.split('.')[2].length !== 4 ) {
        departureDate = makeYear4Digits(departureDate)
    }
    return new FlightSegment({
        flightNumber: split[2],
        departureDate,
        departureTime,
        departureCity,
        departureAirportID,
        serviceClass: lastElement(split),
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalTime,
        arrivalCity,
        arrivalAirportID
    })
}

//-----------------------------------------------quickBooking Export---------------------------------//
function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const serviceTable = tourOptions.serviceTable;
    const transfers = serviceTable.rows.filter(row => (row.entries.get('Описание услуги') || '').match(/Трансфер::/i)).map(row => parseService(row));
    const insurance = $$('.b-additional__item .fs-checkbox-checked').extractNodesText()
        .filter(str => str.match(/страховк/i) && !str.match(/без/i) )
        .map(str => {
        return new quickBookingValue({description: str, addDates: true})
    });

    const other = serviceTable.rows.filter(row => row.entries.get('Описание услуги') &&  !(row.entries.get('Описание услуги') || '').match(/страховка|Трансфер|отель:|hotel|Авиаперелет/i)).map(row => parseService(row));

    const cachedPassengers = getPassengers(tourOptions.tables);

    const services = {
        insurance,
        transfers,
        tourOptions,
        other,
        prices: tourOptions.prices,
        cachedPassengers
    };
    return services;
}

function parsePassengers() {
    const panels = $$(".b-tour__tourists input[id*='fnamec']").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(p) {
    const panel = p.closest('.b-field-list');
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: "input[id*='birth']",
        expire: "input[id*='paspd']",
        lastName: "input[id*='fnamec']",
        firstName: "input[id*='lnamec']",
        secondName: 'input[id*="patrc"]',
        serial: "input[id*='pasps']",
        number: "input[id*='paspn']",
    }));
    return passenger;
}
