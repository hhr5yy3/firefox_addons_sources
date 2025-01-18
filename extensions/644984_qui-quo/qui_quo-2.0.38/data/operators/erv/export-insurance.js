window.OPERATOR_NAME = "ERV";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const order = $1('[name="fmEntry"]');
    if (order && !$1('.qq', order)) {
        const {container, buttons} = createQuickBookingContainer()
        buttons.style.display = 'none';
        order.append(container)
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: ""
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);

    const mainTable = $1('[name="fmEntry"] > table');
    const [insuranceTable, _, passengerTable] = $$('table', mainTable)
    const insurance = getInsuranceInfo(insuranceTable);
    const passengersTds = $$('td', passengerTable).extractNodesText();

    const prices = new Prices();
    const grossPrice = trim(findTdB(passengersTds, /Общая страховая премия/i))

    const grossPriceType = mapPriceType(mapCurrencyUtil(grossPrice.replace(/\d+|\s+/g, '')));

    prices[`${grossPriceType}`].gross = parseFloat(grossPrice.replace(',', '.'));
    prices[`${grossPriceType}`].currency = (mapCurrencyUtil(grossPrice.replace(/\d+|\s+/g, '')));

    const nationalPriceString = getNodeData('tr td[colspan="5"].nadpis', passengerTable);
    if ( nationalPriceString ) {
        prices.inNationalCurrency.gross = parseFloat(nationalPriceString.replace(',', '.'));
        prices.inNationalCurrency.currency = "RUB";
    }
    const tourOperatorReference = trim(findTdB($$('td', insuranceTable).extractNodesText(), /№ полиса/i)).split('-')[1];


    const services = {
        insurance: [insurance],
        tourOperatorReference,
        prices,
    };
    return services;
}

function parsePassengers() {
    const mainTable = $1('[name="fmEntry"] > table');
    const [__, _, passengerTable] = $$('table', mainTable);
    const passengers = $$('span.zahlavi11',passengerTable).map(span => span.closest('tr'));
    return passengers.map(extractPassengerInfo);
}

function getInsuranceInfo(insuranceTable) {
    const tds = $$('td', insuranceTable).extractNodesText();
    const datesString = trim(findTdB(tds, /Действителен/i));
    const [dateStart, dateEnd] = datesString.split(/\s*-\s/).map(setDateFormat)
    const description = [trim(findTdB(tds, /Программа/i)), trim(findTdB(tds, /Страны/i))].join(', ')
    return new quickBookingValue({
        dateStart,
        dateEnd,
        description
    })
}

function setDateFormat(dateStr) {
    const [dd, mm, yyyy] = dateStr.split('.');
    return `${dd.padStart(2, '0')}.${mm.padStart(2, '0')}.${yyyy}`
}

function findTdB(tds, searchStr) {
    const captionTdIndex = tds.findIndex( str => str.match(searchStr) );
    return captionTdIndex > 0 ? tds[captionTdIndex+1] : '';
}

function extractPassengerInfo(row) {
    const [name, birthday] = $$('td', row).extractNodesText()
    const [lastName, firstName] = trim(name.replace(/\d+/, '')).split(/\s+/)
    const passenger = new Passenger({
        birthday: setDateFormat(trim(birthday)),
        lastName,
        firstName

    })
    return passenger;
}

function parseClient() {
    const mainTable = $1('[name="fmEntry"] > table');
    const [insuranceTable] = $$('table', mainTable);
    const tds = $$('td', insuranceTable).extractNodesText();
    const [name, ...address] = trim(findTdB(tds, /Страхователь/i)).split(/\s*,\s*/);
    return new Passenger({
        email: trim(findTdB(tds, /E-mail/i)),
        phone: trim(findTdB(tds, /Телефон/i)),
        number: trim(findTdB(tds, /Паспорт/i)),
        firstName: name.split(/\s+/)[1],
        lastName: name.split(/\s+/)[0],
        address: address.join(', ')
    })
}
