window.OPERATOR_NAME = "Pegas";
window.showTopHotelsRating = false;
window.DEFAULT_CURRENCY = "National";
window.OPERATOR_CURRENCY = "Pegas";
window.CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:5px;font-size:12px;color:black;margin-top:5px;";
window.showTopHotelsRating = false;
window.injectionSelector = '#container, #create-form-container';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}


function injectData() {
    var container = document.querySelector("#create-form-container");
    if ( !container  || !$1("#hotel-services .main-service")) {
        return;
    }
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-direction: column;");
    var qq = container.querySelector(".qq");
    if ( !qq ) {
        const orderCell = createOrderCell();
        container.prepend(orderCell);
    }
    var currency = document.querySelector("#qq-currency");
    if ( qq && qq.lastElementChild !== currency ) {
        qq.append(currency);
    }
}

function createOrderCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    wrapper.style.position = "fixed";
    wrapper.style.top = "10%x";
    wrapper.style.width = "220px";
    wrapper.style.right = "5%";
    wrapper.style.zIndex = "999";
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "220px";

    wrapper.append(container);
    return wrapper;
}

async function createOption() {
    const hotelDiv = $1('#hotel-services');
    const hotels = $$( ".main-service" ,hotelDiv).map(parseHotel);
    const flight = getFlight();

    const allTourStartDates = [
        optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureDate']),
        ...hotels.map(h => h.dateStart)].filter(d => d)
        .map(dt => dayMonthYearToDate(dt))
        .sort((a, b) => b - a)
        .map(dt => dt.toLocaleDateString('ru'));

    const allTourEndDates = [
        getFlightReturnDate(flight),
        ...hotels.map(h => h.dateEnd)].filter(d => d)
        .map(dt => dayMonthYearToDate(dt))
        .sort((a, b) => a - b)
        .map(dt => dt.toLocaleDateString('ru'));

    const engPrice = getNodeData('.tour-price');
    const natPrice = getNodeData('.sale-currency-price');
    const price = isPrefferedDefaultCurrencyUtil() ? natPrice || engPrice : engPrice || natPrice;
    const prices = new Prices();
    const pricesContainer = $1('.commission-politics-container');
    const labels = $$('.labels .display-label',pricesContainer);
    const controls = $$('.controls .select-block input', pricesContainer);
    const getPricesFromTable = (rx) => {
        const indexes = [];
        labels.forEach((label, index) => getText(label).match(rx) ? indexes.push(index) : null);
        const arr =controls.filter((c, i) => indexes.includes(i));
        return arr.map(a => getText(a, 'value'))
    }

    const [nettPricesOne, nettPricesTwo] = getPricesFromTable(/Сумма к оплате/i);
    if ( nettPricesOne ) {
        const nettPriceTypeOne = mapPriceType(mapCurrency(nettPricesOne.replace(/\d+|\.|\s+/g, '')));
        prices[`${nettPriceTypeOne}`].nett = Number(nettPricesOne.replace(/\D+/g, ''));
        prices[`${nettPriceTypeOne}`].currency = mapCurrency(nettPricesOne.replace(/\d+|\.|\s+/g, ''))
    }

    if ( nettPricesTwo ) {
        const nettPriceTypeTwo = mapPriceType(mapCurrency(nettPricesTwo.replace(/\d+|\.|\s+/g, '')));
        prices[`${nettPriceTypeTwo}`].nett = Number(nettPricesTwo.replace(/\D+/g, ''));
        prices[`${nettPriceTypeTwo}`].currency = mapCurrency(nettPricesTwo.replace(/\d+|\.|\s+/g, ''));
    }

    if ( engPrice ) {
        prices.inForeignCurrency.gross = Number(engPrice.replace(/\D+/g, ''));
    }
    if ( natPrice ) {
        prices.inNationalCurrency.gross = Number(natPrice.replace(/\D+/g, ''));
    }

    let option = {
        checkinDt: lastElement(allTourStartDates),
        nights: String(getDistance(lastElement(allTourStartDates), lastElement(allTourEndDates))),
        hotelName: hotels.map(h => h.hotelName).join(' / '),
        href: (hotels.find(h => h.href) || {}).href || null,
        region: selectedOption($1('#package')) || getNodeData('#select-package-container'),
        roomType: hotels.map(h => h.roomType).join(' / '),
        boardType: hotels.map(h => h.boardType).join(' / '),
        price: extractIntFromStr(price.replace(/\s+/g, "")),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|\.|\*/g, "")),
        city_from: flight ? flight?.sectors[0]?.segments[0]?.departureCity ?? null : '',
        operator: window.OPERATOR_NAME,
        occupancy: "",
        prices,
        flight,
    };

    return option;
}

function getFlight() {
    try {
        const flightDiv = $1('#flight-services');
        const sectors = $$('.main-service, .return-flight',flightDiv).map(createTextSegment );
        return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}

function createTextSegment(sector) {
    return {
        segments: [sector].map(segment => {
            return parseSegmentText(segment);
        })
    };
}

function parseSegmentText(segment) {
    const segmentText = segment.querySelector(".service-description").innerText.replace(/\s+/g, " ");
    const [depText, arText] = segmentText.split(/\s+-|—\s+/);
    const depAirport = depText.match(/\((.+?)\)/)[1].split(" ");
    const arAirport = arText.match(/\((.+?)\)/)[1].split(" ");
    return new FlightSegment({
        flightNumber: depText.match(/(.+?),/)[1],
        departureDate: (depText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        departureTime: depText.match(/\d{2}:\d{2}/)[0],
        departureCity: depText.match(/,\s*(.+?)\s*\(/)[1],
        departureAirportID: depAirport[0],
        departureTerminal: depAirport[1],
        arrivalDate: (arText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        arrivalTime: arText.match(/\d{2}:\d{2}/)[0],
        arrivalCity: arText.match(/\s*(.+?)\s*\(/)[1],
        arrivalAirportID: arAirport[0],
        arrivalTerminal: arAirport[1],
    })
}

function parseHotel(hotelRow) {
    const [dateStart, dateEnd] = getText($1('.staying-period', hotelRow)).split(/\s*—\s*/);
    const serviceDescription = getNodeData('.service-description', hotelRow).split(/\s*,\s*/);
    return {
        checkinDt: dateStart,
        dateStart,
        dateEnd,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.service-description a', hotelRow) || serviceDescription[0],
        href: getNodeData('.service-description a', hotelRow, "href"),
        roomType: [serviceDescription[1], serviceDescription[2]].join(', '),
        boardType: serviceDescription[3]
    }
}

function createQuickBookingOption(button) {
    const transfers = querySelectorAll(document, '.transfer tbody tr, .transfer tr')
        .map(span => parseTransfer(span, 'Трансфер'));
    const insurance = querySelectorAll(document, '.insurance-parameters tbody tr, .booking-service-table.insurance tr')
        .map(span => parseInsurance(span, 'Страхование'));
    const other = querySelectorAll(document, '.additional-services tbody tr, #additional-container .additional tr')
        .map(span => parseServices(span));
    const notes = querySelectorAll(document, '.booking-notation input:checked, .note-application  input:checked').map(input => getNodeProperty(input.parentNode,)).join('; ');


    const flightType = $$(".not-transfer-flight").find(tr => $1('.external-flight-system', tr)) ? 'Scheduled' : 'Charter';
    const services = {
        insurance,
        transfers,
        other,
        notes,
        flightType
    };
    return services;
}


function parseInsurance(node, caption) {
    const name = getNodeProperty(node.querySelector('.description .name > span, .tourist .name'));
    const risks = querySelectorAll(node, '.mandatory .name, .parameter').map(risk => getNodeProperty(risk));
    const [dateStart, dateEnd] = getNodeProperty(node.querySelector('.period'), '').match(/\d{2}\.\d{2}\.\d{4}/g) || [];
    if ( !name ) {
        return null;
    }
    return new quickBookingValue({
        description: name + ": " + risks.join('; '),
        caption,
        dateStart,
        dateEnd
    })
}

function parseServices(node, caption) {
    const name = node.querySelector('.name');
    if ( !name ) {
        return;
    }
    const description = getNodeProperty(name);
    const price = getNodeProperty(node.querySelector('.price'));
    const date = getNodeProperty(node.querySelector('.date') || name.nextElementSibling);
    return new quickBookingValue({
        description,
        caption,
        date,
        price: price.replace(/\D+/g, ''),
        currency: mapCurrency(price.replace(/\d+|\s+/g, ''))
    })
}

function parsePassengers() {
    const tourists = querySelectorAll(document, '.tourists tbody tr, .tourists tr').filter(quickBookingsFilterCallback);
    return tourists.map(extractPassengerInfo);
}

function quickBookingsFilterCallback(tr) {
    return tr.clientHeight > 0 && !tr.querySelector('th');
}

function extractPassengerInfo(tourist) {
    const passportNumber = getNodeProperty(tourist.querySelector('.passport'), '');
    const name = getNodeProperty(tourist.querySelector('.name'), '').split(/\s+|\(/);
    if ( name[0].match(/турист/i) ) {
        return new Passenger({
            type: getPassengerTypeUtil(name.join(''))
        }, tourist);
    }
    return new Passenger(
        {
            birthday: getNodeProperty(tourist.querySelector('.birth-date, .date-born')),
            expire: getNodeProperty(tourist.querySelector('.passport-expiration-date .value, .date-validity')),
            lastName: name[0],
            firstName: name[1],
            serial: passportNumber[0] + passportNumber[1],
            number: passportNumber.slice(2),
        }, tourist)
}

function parseClient() {
    const clientNode = document.querySelector('.booking-private-customer');
    if ( !clientNode ) {
        return null;
    }
    const client = new Passenger(
        getInputsValues(clientNode, {
            lastName: "input.private-customer-last-name",
            firstName: "input.private-customer-first-name",
            secondName: "input.private-customer-middle-name",
            birthday: "input.private-customer-date-of-birth",
            issueDate: "input.private-customer-document-issue-date",
            address: "textarea.private-customer-address",
            authority: "textarea.private-customer-document-issuer-name",
            authorityCode: "input.private-customer-document-issuer-code",
            email: "input.private-customer-email",
            phone: "input.private-customer-phone",
            docType: "nationalPassport"
        }), clientNode);
    client.isClient = true;
    client.setDocNumber(getNodeProperty(clientNode.querySelector('input.private-customer-document-number'), '', 'value'));
    return client;
}

function mapCurrency(c) {
    switch ( c.toLowerCase() ) {
        case "$":
            return "USD";
        case "€":
            return "EUR";
        case "с":
            return "KGS";
        case "р":
            return "RUB";
        case "₸":
            return "KZT";
    }
    return c;
}
