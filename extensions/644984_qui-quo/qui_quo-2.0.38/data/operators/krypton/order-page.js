window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME || "Krypton" : window.OPERATOR_NAME || "Krypton";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const form = document.querySelector('.tour-sum-wrap .container .table-responsive');
    if ( form && !form.querySelector('.qq') ) {
        form.append(createQQContainer('max-width:350px', null, createOption, true))
    }
}

function createOption(img) {
    const dates = getNodeProperty(getElementByXpath('//span[contains(text(), "Даты тура: ")]/following-sibling::span/span'), '');
    const [date1, date2, nights] = dates.split(/\s*-\s*|\s*\/\s*/);
    let hotelNode = $first('.hotel-link, [data-bind*="text:Data.Data.hotel()"]');
    const accommodation = $first('[data-bind="text:Data.Data.accomodation"]');
    const nettPriceNode = $first('.cart-sum-total.multicurrency');
    const grossPriceNode = $$('.tour-parameters-grid  > div').find(d => getText(d).match(/Цена тура с изменениями/i)) || $$('.tour-parameters-grid  > div').find(d => getText(d).match(/Исходная цена тура/i));

    const priceParse = (p)  => ({price: parseInt(p), currency: mapCurrencyUtil(p.replace(/\d+/g, ''))})

    const [nettPricesOne, nettPricesTwo] = (getNodeProperty(nettPriceNode, '').match(/\d+./g) || [])
        .map(priceParse)
    const [grossPricesOne, grossPricesTwo] = (getNodeProperty(grossPriceNode, '').match(/\d+./g) || [])
        .map(priceParse)

    const prices = new Prices();
    if ( nettPricesOne )  {
        const nettPriceTypeOne = mapPriceType(nettPricesOne.currency);
        prices[`${nettPriceTypeOne}`].nett = nettPricesOne.price;
        prices[`${nettPriceTypeOne}`].currency = nettPricesOne.currency;
    }

    if ( nettPricesTwo ) {
        const nettPriceTypeTwo = mapPriceType(nettPricesTwo.currency);
        prices[`${nettPriceTypeTwo}`].nett = nettPricesTwo.price;
        prices[`${nettPriceTypeTwo}`].currency = nettPricesTwo.currency;
    }

    if ( grossPricesOne )  {
        const grossPriceTypeOne = mapPriceType(grossPricesOne.currency);
        prices[`${grossPriceTypeOne}`].gross = grossPricesOne.price;
        prices[`${grossPriceTypeOne}`].currency = grossPricesOne.currency;
    }

    if ( grossPricesTwo )  {
        const grossPriceTypeTwo = mapPriceType(grossPricesTwo.currency);
        prices[`${grossPriceTypeTwo}`].gross = grossPricesTwo.price;
        prices[`${grossPriceTypeTwo}`].currency = grossPricesTwo.currency;
    }

    const [hotelTable] = $$('.cart-section-leftCol').filter(s => getText(s).match(/отель/i)).map(d => d.closest('.container '))
    const [hotelDate1, hotelDate2] = getText(hotelTable).match(getRegexPatterns().date)

    const hotelNights = getDistance(makeYear4Digits(hotelDate1), makeYear4Digits(hotelDate2))

    let option = {
        checkinDt: makeYear4Digits(date1),
        nights: String(hotelNights),
        extra_nights: String((getDistance(makeYear4Digits(date1), makeYear4Digits(date2)) - hotelNights)),
        hotelName: getNodeProperty(hotelNode) || getTextAfterComment(/text:Data.Data.hotel/, hotelNode),
        href: getNodeProperty($first('.hotel-link'), null, 'href'),
        country: getText($first('[data-bind="text:Country"]')),
        region: getTextAfterComment(/ko text:name/, hotelNode),
        accommodation: getText(accommodation),
        roomType: [ getTextAfterComment(/text:Data.Data.roomcategory/, accommodation.previousElementSibling),
                   getTextAfterComment(/text:Data.Data.roomtype/, accommodation.previousElementSibling)].join(', '),
        boardType: getNodeProperty($first('[data-bind*="Data.pansiondescr"]')),
        price: isPrefferedDefaultCurrencyUtil() ? prices.inNationalCurrency.gross || prices.inForeignCurrency.gross : prices.inForeignCurrency.gross || prices.inNationalCurrency.gross,
        currency: isPrefferedDefaultCurrencyUtil() ? prices.inNationalCurrency.currency || prices.inForeignCurrency.currency : prices.inForeignCurrency.currency || prices.inNationalCurrency.currency,
        city_from: getNodeData('[data-bind="text:CityFrom"]'),
        flight: getFlight(),
        prices
    };
    return option;
}

function getTextAfterComment(text, hotelNode) {
    const hotelTableDiv = hotelNode ?  [hotelNode.closest('div, td')] : $$('.cart-grid, .tooltip-wide div');
    const divChildren = hotelTableDiv.flatMap(h => [...h.childNodes]);
    return getText(divChildren[divChildren.findIndex(g => g.textContent.match(text)) + 1]);
}

function getFlight() {
    try {
        const segments = $$('.cart-section-flight tr')
            .filter(tr => tr.querySelector('.flight-info-part'))
            .map(parseSegment);


    return {sectors: splitSegmentsToSectors(segments)};
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSegment(tr) {
    const [depDate, arrDate] = $$('.flight-datetime-container .flight-info-part', tr).map(span => {
        const time = getNodeData('.time', span);
        const date = getNodeData('[data-bind*="format"]', span);
        return {date, time};
    })

    const segment = new FlightSegment({
        flightNumber: getNodeData('[data-bind*="FlightNumber"]', tr),
        airline: getNodeData('[data-bind*="AirlineName"]', tr),
        departureDate: depDate.date,
        departureTime: depDate.time,
        departureCity: getNodeData('[data-bind*="DepartureAirportCityName"]', tr),
        departureAirport: getNodeData('[data-bind*="DepartureAirportName"]', tr),
        departureAirportID: getNodeData('[data-bind*="DepartureAirportCode"]', tr),
        serviceClass: getNodeData('[data-bind*="AirServiceClassName"]', tr),
        arrivalDate: arrDate.date,
        arrivalTime: arrDate.time,
        arrivalCity: getNodeData('[data-bind*="ArrivalAirportCityName"]', tr),
        arrivalAirport: getNodeData('[data-bind*="ArrivalAirportName"]', tr),
        arrivalAirportID: getNodeData('[data-bind*="ArrivalAirportCode"]', tr),
    })
    return segment;
}

function getHotelRowByImage(img) {
    return img.closest('form');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions =  createOption(button);
    const servicesDialog = $first('#servicesDialog');
    let all = [];
    const flightType = getNodeProperty($1('[data-bind*="data:{name:Tour,url:TourUrl}"]'), '').match(/регуляр/i) ? 'Scheduled' : 'Charter';

    const prices = tourOptions.prices;

    if ( servicesDialog && servicesDialog.clientHeight > 0 ) {
        const serviceTable = $first('#servicesDialog').closest('.cart-section');
        all = $$('table tr', serviceTable).filter(tr => tr.clientHeight > 0 && !getText(tr).match(/Название/i))
        const transfers = all.filter(tr => getNodeProperty(tr, '').match(/Трансфер/i)).map(parseService);
        const insurance = all.filter(tr => getNodeProperty(tr, '').match(/страховка/i)).map(parseService);
        const other = all.filter(tr => !getNodeProperty(tr, '').match(/Трансфер/i)).map(parseService);
        const services = {
            transfers,
            insurance,
            other,
            tourOptions,
            prices,
            flightType
        };
        return services;
    } else {
        const {transfers, insurance} = collectServicesAlternate()
        const services = {
            transfers,
            insurance,
            tourOptions,
            prices,
            flightType
        };
        return services;
    }
}

function collectServicesAlternate() {
    const all = $$('.cart-section')
        .filter(tr => tr.clientHeight > 0).map( section => {
            const rows = $$('tr', section);
            rows.shift();
            return {
                title: getNodeData('.cart-section-title', section),
                rows
            }
        });
    const additional = all.find(elem => elem.title.match(/Доп. услуги/i))
    const transfers = (all.find(elem => elem.title.match(/Трансфер/i)) || {rows: []}).rows.map(parseServiceAlternate);
    const transfersAdditional = (additional ? additional.rows.filter( tr  => tr.clientHeight>0 && getText(tr).match(/Трансфер/i)) : []).map(parseTransfers);
    const insurance = (all.find(elem => elem.title.match(/Страховка/i)) || {rows: []}).rows.map(parseServiceAlternate);
    return {
        transfers: [...transfers, ...transfersAdditional],
        insurance
    }
}

function parseTransfers(tr) {
    const description = trim(getText(tr.querySelector('td')));
    const dateStart = description.match(/\d{2}\.\d{2}/) ? appendYear(description.match(/(\d{2})\.(\d{2})/)[1], description.match(/(\d{2})\.(\d{2})/)[2]) : null;
    return new quickBookingValue({
        description: description.replace(/\d{2}\.\d{2}/, ''),
        dateStart
    })
}

function parseService(tr) {
    return new quickBookingValue({
        description: trim(getText(tr))
    })
}

function parseServiceAlternate(row) {
    const dates = getNodeData('[data-bind*="text:moment"]', row, 'textContent', '').split(/\s*-\s*/);
    const [dateStart, dateEnd] =  dates.map(dt => makeYear4Digits(dt));
    return new quickBookingValue({
        description: getNodeData('[data-bind="text:Data.Data.name"]', row),
        dateStart,
        dateEnd
    })
}

function getPrices(claimDocument) {
}

function parsePassengers() {
    const panels = $$(".cart-tourist-item").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        lastName: 'input[data-bind*="textInput:lastName"]',
        firstName: 'input[data-bind*="textInput:firstName"]',
        secondName: 'input[data-bind*="textInput: middleName"]',
        birthday: 'input[data-bind*="value:birthday"]',
        issueDate: 'input[data-bind*="value:russianPassportDate"]',
        expire: 'input[data-bind*="value:foreignPassportValidTo"]',
        serial: 'input[data-bind*="textInput:russianPassportSeries"], input[data-bind*="textInput:foreignPassportSeries"]',
        number: 'input[data-bind*="textInput:russianPassportNumber"], input[data-bind*="textInput:foreignPassportNumber"]',
    }), panel);
    return passenger;
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {accommodation} = tourOptions;

        passengersCount.adults = Number((accommodation.match(/(\d+)\s*AD/i) || accommodation.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.children = Number((accommodation.match(/(\d+)\s*Ch/i) || accommodation.match(/(\d+)\s*реб/i) || [0, 0])[1]);
        passengersCount.infants = Number((accommodation.match(/(\d+)\s*in/i) || accommodation.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
