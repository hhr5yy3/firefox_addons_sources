window.OPERATOR_NAME = "Evroport";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#acDogovorCode").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            const container = createQQContainer();
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
            div.after(container);
        }
    });
}

function createOption(img) {
    const detailsString = $$('[class*="ac-details"] p').map( p =>  {
        return {
            node: p,
            caption: getNodeData('strong', p, 'textContent', ''),
            text: getNodeProperty(p.lastChild)
        }
    });
    const getValueFromDetailsString = (text) => {
       const item = detailsString.find(d => d.caption.match(text));
       return item ? item.text : null;
    }
    const tables = $$('table.ac-dataTable').map(parseTable);

    const serviceTable = tables.find( t => t.type === 'services' );
    const hotels = serviceTable.rows.filter( row => (row.entries.get('Название') || '').match(/отель:|hotel:/i) ).map(row => {
        const hotelDescription = row.entries.get('Название');
        const hotelParts = hotelDescription.split(/::|\s*\/\s*/);
        return {
            checkinDt: row.entries.get('Дата'),
            dateStart: row.entries.get('Дата'),
            nights: row.entries.get('Прод.'),
            hotelName: hotelParts[2].replace(/,\s*ноче.+/, ''),
            href: null,
            country: getValueFromDetailsString(/страна/i),
            region: getValueFromDetailsString(/Город/i),
            roomType: hotelParts[3],
            boardType: hotelParts[4]
        }
    });
    const flight = getFlight(serviceTable.rows);

    const prices = new Prices();
    const grossPrice = parseFloat(getValueFromDetailsString(/Рек. стоимость/i));
    const nettPrice = parseFloat(getValueFromDetailsString(/к оплате/i) || getValueFromDetailsString(/Оплачено/i));
    const currency = mapCurrencyUtil(getValueFromDetailsString(/Рек. стоимость/i).replace(/\d+|\s+|,/g, ''))
    const priceType = mapPriceType(currency);


    prices[`${priceType}`].nett = nettPrice;
    prices[`${priceType}`].gross = grossPrice;
    prices[`${priceType}`].currency = currency;

    let option = {
        price: prices[`${priceType}`].gross,
        currency: prices[`${priceType}`].currency,
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
        option.boardType= hotels[0].boardType
    }
    return option;
}

function getFlight(rows) {
    try {
        const segments = rows.filter(row => (row.entries.get('Название') || row.entries.get('Описание услуги') || '').match(/Авиаперелет:/i)).map(parseSector)
        return {sectors: splitSegmentsToSectors(segments)}
    } catch (e) {
        return null;
    }
}

function parseSector(row) {
    const mainText = row.entries.get('Название') || row.entries.get('Описание услуги');
    const split = mainText.split(/\D:+|\/|\s*,\s*/);
    console.log(split)
    const [departureTime, arrivalTime] = split[4].split('-');
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
                serviceClass: split[5],
                arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
                arrivalTime,
                arrivalCity,
                arrivalAirportID
            })
}

function parseTable(table) {
    const trs = $$('tr', table);
    const type = mapTableType(table);
    const ths = $$('th', trs[0])
    return {
        type,
        rows: trs.map(tr => {
            const entries = new Map();
            const tds = $$('td', tr);
            ths.forEach((th, index) => {
                entries.set(getNodeProperty(th), getNodeProperty(tds[index]))
            })
            return {
                entries,
                tr
            }

        })
    }
}

function mapTableType(table) {
    if ( table.closest('#acTouristsTable') ) {
        return 'passengers';
    }

    const h2 = getHeader(table);
    if ( h2 && getNodeProperty(h2, '').match(/услуги/i) ) {
        return 'services';
    }
    return "unknown";
}

function getHeader(table) {
    let h2 = table.previousElementSibling;
    while ( h2 && h2.tagName !== 'H2' ) {
       h2 = h2.previousElementSibling
        if ( h2 && h2.tagName === 'H2' ) {
            return h2;
        }
    }
    return h2;
}

//-----------------------------------------------quickBooking Export---------------------------------//
function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const serviceTable = tourOptions.serviceTable;
    const transfers = serviceTable.rows.filter(row => (row.entries.get('Название') || '').match(/Трансфер::/i)).map(row => parseService(row ));
    const insurance = serviceTable.rows.filter(row => (row.entries.get('Название') || '').match(/страховка/i)).map(row => parseService(row ));
    const other = serviceTable.rows.filter(row => !(row.entries.get('Название') || '').match(/страховка|Трансфер|отель::|hotel|Авиаперелет/i)).map(row => parseService(row));
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


function parseService(row) {
    const description = row.entries.get('Название') || row.entries.get('Описание услуги')
    const dateStart = row.entries.get('Дата')
    return new quickBookingValue({
        dateStart,
        description
    })
}

function getPassengers(tables) {
    const passengerTable = tables.find(t => t.type === 'passengers');
    if ( !passengerTable ) {
        return [];
    }
    return passengerTable.rows.slice(1).map(extractPassengerInfo);

}

function parsePassengers(_, cachedPassengers) {
    return cachedPassengers;
}

function extractPassengerInfo(row) {
    const [firstName, lastName, secondName] = row.entries.get('Ф.И.О. (рус.)').split(/\s+/);
    const [serial, number] = (row.entries.get('№ паспорта') || '').split(/\s+/);
    const passenger = new Passenger({
        birthday: row.entries.get('Дата рождения'),
        expire: row.entries.get('Срок действия'),
        sex: mapSex(row.entries.get('Пол')),
        lastName,
        firstName,
        secondName,
        serial,
        number,
    });
    return passenger;
}

function mapSex(str) {
    if ( str.match(/м/i) ) {
        return '1';
    }
    if ( str.match(/ж/i) ) {
        return '2';
    }
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}
