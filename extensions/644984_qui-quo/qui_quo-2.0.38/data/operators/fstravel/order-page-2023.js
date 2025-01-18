window.OPERATOR_NAME = "FUN&SUN";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if (!$1('.qq')) {
        const {container, exportButton} = createQuickBookingContainer()
        if (!exportButton) {
            return;
        }
        // exportButton.style.display = 'none';
        container.style.position = 'fixed';
        container.style.top = '5em';
        container.style.right = '5em';
        document.body.append(container);
    }
}

function createOption() {

    const tourRow = $1('.grid-tour.body');
    const tourParts = $$('div>div', tourRow)
    const tourPartsText = tourParts.extractNodesText();
    let hotelRow = $1('.grid-hotel.body')

    let hotelParts = []
    if ( !hotelRow )  {
        hotelRow = $1('.grid-hotel.header').nextElementSibling;
        hotelParts = getText($1('.MuiSelect-root', hotelRow)).split(/\s*\(\s*|\s*\)\s*|\s*\/\s*/);
    }

    let hotelPartsText = hotelParts.length === 0 ?  $$('div>div', hotelRow).extractNodesText() : hotelParts;
    const [dateStart, dateEnd] = tourPartsText[3].split(/\s*-\s*/);

    const priceText = getNodeData('.price-amount .rub') || getNodeData('.price-amount .eur');

    const flight = getFlight();
    const services = $$('.grid-insurances.body')
        .filter(ins => !getNodeData('button', ins, 'textContent', '').match(/добавить/i)).map(parseService);
    const insurance = services.filter(service => service.type === 'insurance');
    const transfers = services.filter(service => service.type === 'transfer');
    const other = services.filter(service => service.type === 'other');
    const prices = new Prices();

    const nationalGrossPrice = getNodeData('.price-amount .rub') || getNodeData('.price-amount .eur')
    const nationalCurrency = mapCurrencyUtil(nationalGrossPrice.replace(/\d+|\s+/g, ''))
    const nationalGrossPriceValue = parseFloat(nationalGrossPrice)

    const foreignGrossPrice = getNodeData('.price-amount .eur');
    const foreignGrossPriceValue = parseFloat(foreignGrossPrice)
    const foreignCurrency = mapCurrencyUtil(foreignGrossPrice.replace(/\d+|\s+/g, ''))
    if ( $1('.price-amount .rub') ) {
        prices.foreignGrossPrice = foreignGrossPriceValue;
        prices.foreignCurrency = foreignCurrency;
    }
    prices.nationalGrossPrice = nationalGrossPriceValue;
    prices.nationalCurrency = nationalCurrency;

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: hotelPartsText[0],
        href: typeof hotelParts[0] !== 'string' ? getNodeData('a', hotelParts[0], 'href') : null,
        country: tourPartsText[2],
        region: hotelPartsText[1],
        accommodation: hotelPartsText[4] ? hotelPartsText[3] : hotelPartsText[3].split(/\s+/)[0],
        roomType: hotelPartsText[2],
        boardType: hotelPartsText[4] ? hotelPartsText[4] : hotelPartsText[3].split(/\s+/).slice(1).join(' '),
        price: extractIntFromStr(priceText),
        currency: "RUB",
        city_from: flight && flight.sectors[0] && flight.sectors[0].segments[0] ? flight.sectors[0].segments[0].departureCity : '',
        operator: window.OPERATOR_NAME,
        thumbnail: null,
        flight,
        insurance,
        transfers,
        other,
        prices
    };
    return option;
}

function parseService(row) {
    const divs = $$('div', row).extractNodesText();
    const dates = divs[1].match(getRegexPatterns().date)
    const description = divs[0];
    const type = parseServiceType(row, description);
    return ({
        description,
        type,
        dateStart: dates[0],
        dateEnd: dates[1]
    })
}

function parseServiceType(row, description) {
    return mapServiceType(description, getHeaderRow(row.closest('.block-body')))
}

function mapServiceType(description, headRow) {
    if (headRow && getText(headRow).match(/страхов/i)) {
        return 'insurance';
    }
    if (description.match(/трансфер/i)) {
        return 'transfer'
    }
    return 'other'
}

function getHeaderRow(row) {
    const headRow = row.previousElementSibling;
    if (!headRow || !headRow.classList) {
        return null;
    }
    if (headRow && headRow.classList.contains('block-header')) {
        return headRow;
    }
    return getHeaderRow(headRow)
}

function getFlight() {
    try {
        let sectors = $$('.select-flight .MuiSelect-root');
        if (sectors.length > 0) {
            return {sectors: sectors.map(parseSectorSelect)}
        }
        const flightTable = $$('table').find(table => $$('th',table).extractNodesText().find(t => t.match(/рейсы/i)));
        const checkedFlight = $1('input:checked', flightTable);
        if (checkedFlight) {
            const flightId = checkedFlight.value;
            const flightTds = $$(`[id="${flightId}"]`);

            sectors = [...new Set(flightTds.map(td => td.closest('tr')))].map(parseRadioSector);
            return {sectors}
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseRadioSector(row, index) {
    const tds = $$('td', row);
    const tdsText = tds.extractNodesText().filter(Boolean);
    const flightNumbers = tdsText[0].split(/\n/)


    const departureTime = tdsText[2].split(/\n/)
    const arrivalTime = tdsText[3].split(/\n/)
    const time = [departureTime, arrivalTime]

    const departureCities = tdsText[4].split(/\n/).map(txt => txt.split(/\s*,\s*/)[0])
    const arrivalCities = tdsText[5].split(/\n/).map(txt => txt.split(/\s*,\s*/)[0])

    const textSegments =  [departureCities, arrivalCities]

    const segments = textSegments.map((seg, index) => {
       return new FlightSegment({
           flightNumber: flightNumbers[index],
           departureCity: seg[0],
           departureTime: time[index][0],
           serviceClass: tdsText[6],
           arrivalCity: seg[1],
           arrivalTime: time[index][1],
       })
    })
    return {segments};
}


function parseSectorSelect(sector) {
    const text = getText(sector);
    const table = sector.closest('.grid-avia.body')
    const date = getNodeData('.flight-date', table);
    const flightNumber = text.match(/\b([A-Z]{1,2}|[A-Z]\d|\d[A-Z])\s?\d{2,4}\b/)
    const [_, departure, arrival] = lastElement(text.split(/\b([A-Z]{1,2}|[A-Z]\d|\d[A-Z])\s?\d{2,4}\b/)).match(/\((.+?)\s*-\s*(.+?)\)/)
    const [departureCity, departureAirportID, departureTime] = departure.split(/\s+/)
    const [arrivalCity, arrivalAirportID, arrivalTime] = arrival.split(/\s+/)

    const segments = [new FlightSegment({
        flightNumber: flightNumber[0],
        airline: "",
        travelTime: "",
        plane: "",
        departureDate: date,
        departureTime,
        departureCity,
        departureAirportID,
        serviceClass: text.match(/\[.+?\]/)[0],
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(date, 1) : date,
        arrivalTime,
        arrivalCity,
        arrivalAirportID,
    })]
    return {segments};
}

function getHotelRowByImage(img) {
    return img.closest('body');
}

async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const {insurance, transfers, other, prices} = tourOptions;
    return {
        insurance,
        transfers,
        other,
        tourOptions,
        prices
    };
}

function parsePassengers() {
    return $$(".members-form .info").filter(div  => !getInput(/ФИО/i, div)).map(parsePassenger);
}

function parsePassenger(div) {
    return new Passenger(getInputsValues(div, {
        lastName: getInput(/Фамилия по-латински/i, div) || getInput(/Фамилия по-русски/i, div),
        firstName: getInput(/Имя по-латински/i, div) || getInput(/Имя по-русски/i, div),
        secondName: getInput(/Отчество по-русски/i, div),
        birthday: getInput(/Дата рождения/i, div),
        email: getInput(/E-Mail/i, div),
        phone: getInput(/Телефон/i, div),
        serial: getInput(/Серия документа/i, div),
        number: getInput(/Номер документа/i, div),
        expire: getInput(/Действителен до/i, div)
    }))
}

function getInput(caption, div) {
    const fields = $$('fieldset', div);
    const field = fields.find(f => getText(f).match(caption));
    if (field) {
        return $1('input', field.closest('div'))
    }
    return null;
}
