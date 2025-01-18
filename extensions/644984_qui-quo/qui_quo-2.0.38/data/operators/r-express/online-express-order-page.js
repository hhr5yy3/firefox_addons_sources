window.OPERATOR_NAME = "Онлайн Экспресс";

function injectData() {
    let option = document.querySelector(".tour-block.tour-booking__header .tour-block__content");
    if ( option && !option.querySelector(".qq") ) {
        const {container, exportButton} = createQuickBookingContainer();
        exportButton.style.lineHeight = '1';
        exportButton.style.fontSize = '13px';
        option.appendChild(container);
    }
    let hotel = document.querySelector(".ex-hotel-booking__head .ex-center--justify");
    if ( hotel && !hotel.querySelector(".qq") ) {
        const {container, exportButton} = createQuickBookingContainer({action: createOnlyHotelOption});
        if ( !exportButton ) {
            return;
        }
        exportButton.style.lineHeight = '1';
        exportButton.style.fontSize = '13px';
        hotel.appendChild(container);
    }
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

async function createOption(img) {
    let mainRow = getHotelRowByImage(img);
    let liArray = querySelectorAll(mainRow, "li, p.text--black");
    let regionAndCityfrom = getRegionCity();
    let dates = getDates(liArray);

    let option = {
        region: regionAndCityfrom.region,
        hotelName: getHotelName(mainRow),
        href: (() => {
            let hotel = mainRow.querySelector(".tour-block__row .tour-block__elem .ex-title");
            let a = hotel ? hotel.querySelector("a") : null;
            return a ? a.href : null;
        })(),
        roomType: getTextFromLiArray(liArray, "Тип номера:"),
        boardType: getTextFromLiArray(liArray, "Питание:"),
        checkinDt: dates.date,
        nights: dates.nights,
        price: extractIntFromStr(getText(document.querySelector(".ex-price__value, .bte-price__main")).replace(/\s+/g, "")),
        currency: getText(document.querySelector(".ex-price__currency, .bte-price__main")).replace(/\s+|\d+/g, ""),
        country: "",
        city_from: regionAndCityfrom.city,
        operator: OPERATOR_NAME,
        occupancy: {
            adultsCount: +getTextFromLiArray(liArray, /Взрослых:/i),
            childrenCount: extractIntFromStr(getTextFromLiArray(liArray, /ребенка:|детей:/i)),
            childAges: null
        },
        thumbnail: getNodeProperty(document.querySelector(".ex-tour-item__picture img"), null, "src") || getBackgroundImageUrl($1('.ex-tour-item__picture'))
    };

    const url = location.href.replace('/cart?', '/cartDetails?');
    const actualInfo = await fetch(url).then(r => r.json()).catch(e => null);

    if ( actualInfo && actualInfo.results ) {
        option.flight = getFlight(actualInfo.results);
        option.country = option.flight ? lastElement(option.flight.sectors[0].segments).arrivalCountry : null;
        option.flightType = option.flight ? (option.flight.isCharter ? 'Charter' : 'Scheduled') : null;
    }

    return option;
}

async function createOnlyHotelOption(img) {
    const dates = $$('.text--bold', $1('#dateArrival').parentNode).map(s => getText(s));
    const accommodation = trim(getNodeProperty($1('.ex-line .icon-people').parentNode));
    const stars = $$(".icon-star-filled, .hotel-name__stars__item, .icon-star-filled");
    const region = trim(getNodeData('.ex-center p')).split(/\s*,\s*/);
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(...dates)),
        hotelName: getNodeData('.ex-center--justify .ex-title__text') + `${stars.length > 0 ? stars.length + '*' : ''}`,
        href: getNodeData('#toDescription', document, 'href'),
        country: region.splice(0, 1).join(),
        region: region.join(', '),
        roomType: getNodeData('.ex-hotel-booking__head-room-name'),
        accommodation,
        boardType: getNodeProperty($1('.ex-line .icon-meal').parentNode),
        price: extractIntFromStr(getText(document.querySelector(".ex-price__value, .bte-price__main")).replace(/\s+/g, "")),
        currency: getText(document.querySelector(".ex-price__currency, .bte-price__main")).replace(/\s+|\d+/g, ""),
        city_from: "",
        operator: OPERATOR_NAME,
        occupancy: getOccupancy(accommodation),
    };
    const nettPriceText = trim(getText(document.querySelector(".ex-price__mark"))).replace(/\s/, '').split(/\s*\+\s*/);

    const prices = new Prices();
    prices.nationalGrossPrice = option.price;
    prices.nationalNettPrice = extractIntFromStr(nettPriceText[0]);
    prices.foreignCurrency = option.currency;
    prices.nationalCurrency = option.currency;
    option.prices = prices;
    return option;

}

function getOccupancy(accommodation) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = extractIntFromStr((accommodation.match(/(\d+)\s*взр/) || '00')[1])
    occupancy.childrenCount = extractIntFromStr((accommodation.match(/(\d+)\s*реб/) || '00')[1]);
    occupancy.childAges = occupancy.childrenCount > 0 ? accommodation.replace(/\D+/g, ' ').trim().split(/\s+/).slice(-occupancy.childrenCount).join() : ''
    return occupancy;
}

function getFlight(json) {
    try {
        const selectedId = json.selected.avia;
        const [departureNumber, arrivalNumber] = $$('.tour-avia__cell .ex-list .text--bold span').filter(t => getText(t).match(getRegexPatterns().flightNumber)).map(t=>getText(t).replace(/\s+/g, ''));
        let selectedFlight = json.avia.find( variant => variant.ids.id === selectedId );
        const [fDepNumber, fArrNumber] = [selectedFlight.flights[0].segments[0].carrier.code + selectedFlight.flights[0].segments[0].flightNumber,
                                          lastElement(selectedFlight.flights).segments[0].carrier.code+ lastElement(selectedFlight.flights).segments[0].flightNumber ];
        if ( fDepNumber !== departureNumber || fArrNumber !== arrivalNumber ) {
            selectedFlight = json.avia.find(variant => {
                const [fDepNumber, fArrNumber] = [variant.flights[0].segments[0].carrier.code + variant.flights[0].segments[0].flightNumber,
                    lastElement(variant.flights).segments[0].carrier.code + lastElement(variant.flights).segments[0].flightNumber];
                return fDepNumber === departureNumber && fArrNumber === arrivalNumber
            });
        }
        const sectors = selectedFlight.flights.map(parseSectors);
        return {sectors, isCharter: selectedFlight.isCharter};

    } catch(e) {

        console.log(e);
        return null;
    }
}

function parseSectors(sector) {
    const segments = sector.segments.map( segment => parseSegments(segment, sector) );
    return {segments}
}

function parseSegments(segment, sector) {
    return new FlightSegment({
        flightNumber: segment.carrier.code+segment.flightNumber,
        airline: segment.carrier.name,
        travelTime: segment.flightDuration,
        plane: segment.airPlane,
        departureDate: segment.departure.date,
        departureTime: segment.departure.time,
        departureCity: segment.departure.cityName,
        departureCountry: segment.departure.countryName,
        departureAirport: segment.departure.airportName,
        departureAirportID: segment.departure.airportCode,
        serviceClass: segment.class,
        arrivalDate: segment.arrival.date,
        arrivalTime: segment.arrival.time,
        arrivalCity: segment.arrival.cityName,
        arrivalCountry: segment.arrival.countryName,
        arrivalAirport: segment.arrival.airportName,
        arrivalAirportID: segment.arrival.airportCode,
        baggage: sector.baggage
    })
}

function getDates(liArray) {
    let text = getTextFromLiArray(liArray, /Дат.:/, textContent = true);
    let splitted = text.split("-");
    let dateTo = splitted[0].match(/\d{2}.\d{2}.\d{4}/)[0];
    let dateBack = splitted[1].match(/\d{2}.\d{2}.\d{4}/)[0];
    let nights = getDistance(dayMonthYearToDate(dateTo), dayMonthYearToDate(dateBack));
    return {date: dateTo, nights: nights.toString()}
}

function getHotelName(row) {
    return getText(row.querySelector(".tour-block__row .tour-block__elem .ex-title__text, .hotel-name__name, .content-item__accommodation .ex-title__text")).trim() +
        (" " + querySelectorAll(row, ".icon-star-filled, .hotel-name__stars__item, .icon-star-filled").length + "*").replace(/0\*/, "");
}

function getRegionCity() {
    let text = document.querySelector(".tour-partials_heading, .ex-title__text")
        .textContent.replace(/Состав тура|:/g, "").trim();
    let splitted = text.split(" - ");
    if ( splitted.length > 1 ) {
        return {
            region: lastElement(splitted).trim(),
            city: splitted[0].replace(/.+?,/, '')
        }
    }
    return {};
}

function getTextFromLiArray(array, text, textContent = true) {
    let liElem = array.find(li => {
        return li.textContent.match(text);
    });
    if ( !liElem ) {
        return textContent ? "" : null;
    }
    let span = getNodeProperty(liElem.querySelector("span"));
    return textContent ? getNodeProperty(liElem, "").replace(span, "").trim() : liElem;
}

async function createQuickBookingOption(button) {
    const tourOptions = $1(".ex-hotel-booking__head .ex-center--justify") ? await createOnlyHotelOption(button) : await createOption(button);
    const transfers = $$('.tour-transfers .tour-block__row').map(parseTransfers);
    const insurance = $$('.tour-insurance__item').map(parseInsurance);

    const prices = new Prices();

    const nettPrice = $1(".price-block .ex-price__mark") || $1(".ex-price__value, .bte-price__mark");
    if ( !nettPrice ) {
        const input = $1('input#tour-price-type__1');
        if ( input ) {
            input.click();
            await waitingFor(() => null, 50, 10);
        }
    }
    const priceType = mapPriceType(tourOptions.currency)

    prices[`${priceType}`].gross = tourOptions.price;
    prices[`${priceType}`].nett = extractIntFromStr(getNodeProperty(nettPrice, '0').replace(/\s+/g, ""));
    prices[`${priceType}`].currency = tourOptions.currency;
    const services = {
        insurance,
        transfers,
        tourOptions,
        prices,
        flightType: tourOptions.flightType,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseTransfers(row) {
    const description = $$('.tour-transfers__route input[name*="transfer-"]', row).map(t => getText(t, 'value')).join(' -> ');
    return new quickBookingValue({description,
        dateStart: getNodeData('.tour-transfers__date input', row, 'value')})
}

function parseInsurance(row) {
    return new quickBookingValue({
        description: getNodeData('.insuranse-select input', row, 'value'), addDates: true})
}

function parsePassengers() {
    const panels = $$('.tour-booking__tourists .tour-block__row, .ex-tourist').filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const docNumber = getNodeData('input[name="documentNumber"]', panel, 'value');
    const nationality = $$('.field select', panel).find(sel => getNodeProperty(sel.closest('.field').querySelector('label'), ''));
    const type = parsePassengerType(panel);

    const passenger = new Passenger(getInputsValues(panel, {
        birthday: 'input[name="birthday"]',
        expire: 'input[name="expirationDate"]',
        lastName: 'input[name="name"]',
        firstName: 'input[name="surname"]',
        serial: 'input[name="documentNumber"]',
        number: 'input[name="documentNumber"]',
        email: 'input[name="email"]',
    }), panel);
    passenger.nationality = nationality ? nationality.value : null;
    passenger.docType = parseDocType(docNumber);
    passenger.setDocNumber(docNumber);
    passenger.type = type;
    return passenger;
}

function parsePassengerType(panel) {
    const caption = getNodeData('.ex-form__row--center .text--bold, .ex-tourist__head', panel, 'textContent', '');

    if ( caption.match(/Ребенок/i) ) {
        return 'child';
    }
    if ( caption.match(/младенец/i) ) {
        return 'infant';
    }
    return 'adult';
}

function parseDocType(number) {
    number = (number || '').replace(/\D+/g, '');
    if ( number.length === 10 ) {
        return 'nationalPassport'
    }
    if ( number.length === 9 ) {
        return 'internationalPassport'
    }
    return 'nationalPassport';
}

function getHotelRowByImage(img) {
    return img.closest('.tour-block__content, .ex-hotel-booking__head');
}


//-------ORDER DATA

function injectQuickReservationData(selInsert, func) {
    $$('.tour-booking__tourists .tour-block__row').forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.append(func({
                legendStyle: 'font-size: 12px;margin-bottom:3px;',
                style: 'margin:10px;'
            }));
        }
    });
    $$('.ex-tourist').forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.append(func({
                legendStyle: 'font-size: 12px;margin-bottom:3px;',
                style: 'margin:10px;'
            }));
        }
    });
}

function pasteOrderData(touristNode, data, passport, errors) {
    const sex = $first(`input[name*="gender"][value*="${mapSex(data.sex)}"][type="radio"]`, touristNode);
    if ( sex ) {
        sex.click();
    }
    setInputValues(touristNode, [
            'input[name="surname"], input[name*="[surname]"]', transliterateQuickReservationObject(passport.surname),
            'input[name="name"], input[name*="[name]"]', transliterateQuickReservationObject(passport.name),
            'input[name="documentNumber"], input[name*="[passportNumber]"]', {value: passport.serial.value+ passport.number.value, caption: 'Номер паспорта'},
            'input[type="tel"]', data.phones.mobile,
            'input[name="email"]', data.email,
            'input.ipCitizenID', data.inn
        ], errors, ["change", "blur"], ['input'], true
    );

    setInputValues(touristNode, [
            'input[name="expirationDate"]', customDateToFullString(passport.expire)
        ], errors, ["change", "blur"], ['input'], true
    );
    setInputValues(touristNode, [
            'input[name="birthday"], input[name*="[birthday]"]', customDateToFullString(data.birthday)
        ], errors, ["change", "blur"], ['input'], true
    );

    setSelectIndex(touristNode, [
        $$('.field select', touristNode).find(sel => getNodeProperty(sel.closest('.field').querySelector('label'), '').match(/гражданство/i)), data.nationality
    ], errors)
}

function getPassengerRowBySelect(select) {
    return select.closest('.tour-block__row, .ex-tourist');
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch ( sex.value ) {
        case "1" :
            return "m";
        case "2" :
            return "f";
        default  :
            return null;
    }
}
