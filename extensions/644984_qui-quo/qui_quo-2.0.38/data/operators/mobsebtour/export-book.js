window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Unknown" : "Unknown";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

window.patterns = {
    hotel: /гостиница|hotel|Hotel|Хотел|Готель/i,
    nights: /ночей|nights|ночей|нощувки|nopți/i,
    checkinDate: /Дата заезда|Checkin date|Data cazării|Дата на настаняване|Дата приїзду/i,
    checkoutDate: /Дата выезда|Checkout date|Data plecării|Дата на напускане|Дата виїзду/i,
    country: /Страна|Country|Țara|Държава|Країна/i,
    region: /Курорт|Resort|Stațiune/i,
    room: /Тип комнаты|Room type|Tipul camerei|Тип стая|Тип кімнати/i,
    accommodation: /Размещение|Deployment|Amplasament|Настаняване|Розміщення/i,
    boardType: /Питание|Board|Tip de masa|Изхранване|Харчування/i,
    priceNett: /For agency|Для агентства|Pentru agenție|За агенцията/i,
    priceGross: /Общая сумма|Total sum|Suma totală|Обща сума|Загальна сума|Для клиента|Pentru client|For Client/i
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const bundleForm = $1('#bundle_form .main-card');
    if (bundleForm && !$1('.qq')) {
        const {container, buttons} = createQuickBookingContainer()
        container.style.margin = '16px';
        buttons.style.display = 'none';
        bundleForm.append(container);
    }
}

function createOption() {
    const inputsEntries = $$('.main-card .card-body > .row').map(parseInputRow);
    const rowInputsEntries = $$('.main-card .card-body tr').map(parseRowInput).filter(t => t.label)


    const getValueByLabel = (pattern, entries = inputsEntries, method = 'value') => {
        const elem = entries.find(entry => entry.label.match(pattern))
        return elem ? elem[method] : null;
    }
    const prices = new Prices();

    const nettPriceForeign = getValueByLabel(patterns.priceNett, rowInputsEntries, 'value');
    const nettPriceNational = getValueByLabel(patterns.priceNett, rowInputsEntries, 'secondaryValue');

    const grossPriceForeign = getValueByLabel(patterns.priceGross, rowInputsEntries, 'value');
    const grossPriceNational = getValueByLabel(patterns.priceGross, rowInputsEntries, 'secondaryValue');
    if ( nettPriceForeign && grossPriceForeign )  {
        prices.addPriceAuto(nettPriceForeign, grossPriceForeign, 'EUR')
    }

    if (grossPriceNational) {
        prices.addPriceAuto(nettPriceNational.replace(/\D+/g, ''), grossPriceNational.replace(/\D+/g, ''), grossPriceNational.replace(/\s+|\d+/g, ''))
    }

    const flight = getFlight()

    let option = {
        checkinDt: getValueByLabel(patterns.checkinDate),
        dateStart: getValueByLabel(patterns.checkinDate),
        dateEnd: getValueByLabel(patterns.checkoutDate),
        nights: getValueByLabel(patterns.nights),
        hotelName: getValueByLabel(patterns.hotel),
        href: null,
        country: getValueByLabel(patterns.country),
        region: getValueByLabel(patterns.region),
        roomType: getValueByLabel(patterns.room),
        accommodation: getValueByLabel(patterns.accommodation),
        boardType: getValueByLabel(patterns.boardType),
        operator: window.OPERATOR_NAME,
        tourOperatorReference: getValueByLabel('#ID'),
        prices,
        flight
    }
    return option;
}

function getFlight() {
    try {
        const transport = $1('#list_transports');
        const mainCard = transport.closest('.main-card');
        if ( !$1('.fa-plane', mainCard) ) {
            return null;
        }
        const sectors = $$('li.nav-item', transport).extractNodesText().map(parseSector);
        return {sectors};
    } catch (e) {
        console.log(e)
        return null;
    }
}

function parseSector(sector, index, array) {
    const ids = sector.match(/([A-Z]{3})\s*-\s*([A-Z]{3})/);
    const flightNumber = sector.match(getRegexPatterns().flightNumber);
    return {
        segments: [
            new FlightSegment({
                    flightNumber: flightNumber && flightNumber[0],
                    departureDate: index=== 0 ? getNodeData('[name="transport[flight_depart_from_date]"]', document, 'value'): getNodeData('[name="transport[flight_retur_from_date]"]', document, 'value'),
                    departureTime: "",
                    departureCity: "",
                    departureAirport: "",
                    departureAirportID: ids[1],
                    departureTerminal: "",
                    serviceClass: "",
                    arrivalDate: index === 0 ? getNodeData('[name="transport[date_entry]"]', document, 'value') : getNodeData('[name="transport[tour_end_date]"]', document, 'value'),
                    arrivalTime: "",
                    arrivalCity: "",
                    arrivalAirport: "",
                    arrivalAirportID: ids[2]
            })
        ]
    }
}

function parseRowInput(tr) {
    return {
        label: getNodeData('td', tr),
        value: getNodeData('input', tr, 'value'),
        secondaryValue: getNodeData('strong', tr) || lastElement($$('td', tr).extractNodesText()),
    }
}

function parseInputRow(row) {
    return {
        label: getNodeData('label', row),
        value: getNodeData('input', row, 'value'),
    }
}

function getHotelRowByImage(img) {
    return document;
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const transfers = $$('[name="transfer[flight_depart_data]"], [name="transfer[flight_retur_data]"]').map(parseTransfer);
    const insurance = new quickBookingValue({
        description: selectedOption($1('[name="insurance[extra_purpose_id]"]')),
        dateStart: getNodeData('[name="insurance[from_date]"]', document, 'value').split('-').reverse().join('.'),
        dateEnd: getNodeData('[name="insurance[to_date]"]', document, 'value').split('-').reverse().join('.'),
    });
    const busRoutes = getBusRoutes();
    const services = {
        tourOptions,
        transfers,
        busRoutes,
        insurance: [insurance]
    };
    return services;
}

function getBusRoutes() {
    const transport = $1('#list_transports');
    if ( !transport ) {
        return null;
    }
    const mainCard = transport.closest('.main-card');
    if (!$1('.fa-bus', mainCard)) {
        return null;
    }
    const routes = $$('li.nav-item', transport).extractNodesText().map(parseBusRoute);
    return routes
}

function parseBusRoute(route, index) {
    return new quickBookingValue({
        dateStart: index === 0 ? getNodeData('[name="transport[flight_depart_from_date]"]', document, 'value') : getNodeData('[name="transport[flight_retur_from_date]"]', document, 'value'),
        dateEnd: index === 0 ? getNodeData('[name="transport[date_entry]"]', document, 'value') : getNodeData('[name="transport[tour_end_date]"]', document, 'value'),
        description: trim(route)
    })
}

function parseTransfer(dateInput) {
    return new quickBookingValue({
        dateStart: dateInput.value.split('-').reverse().join('.'),
    })
}

function parseInsurance(dateInput) {
    return new quickBookingValue({
        description: selectedOption($1('[name="insurance[extra_purpose_id]"]', dateInput.closest('.form-horizontal'))),
        dateStart: dateInput.value.split('-').reverse().join('.'),
    })
}

function parsePassengers() {
    const panels = $$("#list_clients tr");
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const values = $$('input', panel).extractNodesText('value')
    const selects = $$('select', panel).map(s => selectedOption(s));
    const passenger = new Passenger({
        title: selectedOption($1('#passenger__category_client_id', panel)) || selects[0],
        birthday: values[2],
        expire: values[4],
        lastName: values[0],
        firstName: values[1],
        nationality: '',
        number: values[3],
        docType: 'internationalPassport'
    });
    return passenger;
}
