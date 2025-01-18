console.log('Loaded export books!');
window.showTopHotelsRating = false;
window.OPERATOR_NAME = "TPG";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}


function injectData() {
    $$(".s_cart_tab").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.prepend(createCell());
        }
    });
}

function createCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    wrapper.style.cssText = `
    display: flex;
    position: fixed;
    top: 250px;
    z-index: 9999;
    right: 1rem;
}`;

    const btns = container.querySelector('.qq-box');
    if ( btns ) {
        btns.style.display = 'none';
    }
    wrapper.classList.add('qq');
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "200px";
    container.style.justifyContent = 'center';
    wrapper.append(container);
    return wrapper;
}

function createOption(button) {
    const hotels = $$('.services_cart_box tr.house').map(parseHotel);
    const transfers = $$('.services_cart_box tr.trans_out').map(parseService);
    const insurance = $$('.services_cart_box tr.med').map(parseService);
    const sectors = $$('.services_cart_box tr.fly_out');
    const other = $$('.services_cart_box tr.tab_cont[data-idx]:not(.med, .house, .trans_out, .fly_out)').map(parseService);
    const dateStart = makeYear4Digits($first('#date_from').value);
    const dateEnd = makeYear4Digits($first('#date_to').value);
    const flight = getFlight(sectors);
    const prices = new Prices();
    const grossPriceText = getNodeProperty(getElementByXpath("//span[contains(@class, 'pr_name') and contains(text(), 'Стоимость')]/following-sibling::span"));
    const nettPriceText = getNodeProperty(getElementByXpath("//span[contains(@class, 'pr_name') and contains(text(), 'К оплате')]/following-sibling::span"));
    const grossCurrency = grossPriceText.replace(/[^A-z$]/g, '');
    const grossPriceType  = mapPriceType(grossCurrency);

    const nettCurrency = nettPriceText.replace(/[^A-z$]/g, '');
    const nettPriceType = mapPriceType(nettCurrency);

    prices[`${grossPriceType}`].gross = parseFloat(grossPriceText.replace(/[^0-9.]/g, ''));
    prices[`${nettPriceType}`].nett = parseFloat(nettPriceText.replace(/[^0-9.]/g, ''));
    prices[`${grossPriceType}`].currency = grossCurrency;
    prices[`${nettPriceType}`].currency = nettCurrency;


    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        dateStart,
        dateEnd,
        prices,
        nights: getDistance(dateStart, dateEnd).toString(),
        country: getNodeProperty(getElementByXpath('//th[contains(text(), "Страна")]/following-sibling::td')),
        region: hotels && hotels.length > 0 ? hotels[0].region : null,
        city_from: flight && flight.sectors[0] ? flight.sectors[0].segments[0].departureCity : 'Нет данных',
        operator: window.OPERATOR_NAME,
        tourOperatorReference: getNodeProperty($first('#log span'))
    };
    console.log(option);
    return option;
}

function getFlight(sec) {
    try {
       const sectors = sec.map(parseSector);
       return {sectors};
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseSector(tr) {
    const tds = $$('td', tr);
    const date = makeYear4Digits(getNodeProperty(tds[0]));
    const text = getText(tds[3]);
    const flightNumber = text.match(getRegexPatterns().flightNumber)[0];
    const ids = text.match(/\(*([A-Z]{3})\)*/g).map(t => t.replace(/[)(]/g, ''))
    const times = text.match(/\d{2}:\d{2}/g);
    const cities = text.match(/::(.+?),/)[1].split('-').map(t => t.replace(/\(.+/, ''));
    return {
        segments: [new FlightSegment({
                                         flightNumber,
                                         departureDate: date,
                                         departureTime: times[0],
                                         departureCity: cities[0],
                                         departureAirportID: ids[0],
                                         arrivalCity: cities[1],
                                         arrivalTime: times[1],
                                         arrivalAirportID: ids[1],
                                     })]
    }
}


function parseHotel(tr) {
    const tds = $$('td', tr);
    const date = makeYear4Digits(getNodeProperty(tds[0]));
    const nights = parseInt(getText(tds[2]));
    const text = getNodeProperty(tds[3], '');
    const hotelParts = text.split(/::|\//);

    return {
        dateStart: date,
        dateEnd: addDaysToStringDate(date, nights),
        nights: nights,
        hotelName: hotelParts[3],
        roomType: hotelParts[4].split(/\s*,\s*/)[0],
        accommodation: hotelParts[4].split(/\s*,\s*/)[1],
        boardType: hotelParts[5],
        region: hotelParts[2],
        country: hotelParts[1]
    }
}

function parseService(tr) {
    const tds = $$('td', tr);
    const date = makeYear4Digits(getNodeProperty(tds[0]));
    const nights = parseInt(getText(tds[2]));

    return new quickBookingValue({
                                     description: getNodeProperty(tds[3]),
                                     dateStart: date,
                                     dateEnd: nights ? addDaysToStringDate(date, nights) : null
                                 })
}

function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parsePassengers(button) {
    const tourists = $$('.tab_cont.listtursit');
    return tourists.filter(quickBookingsFilterCallback).map(extractPassengerInfo)
}

function extractPassengerInfo(tourist) {
    const passportNumber = getNodeProperty(tourist.querySelector('[data-field="passport"]'), '').split(/\s+/);
    return new Passenger(
        {
            birthday: tourist.querySelector('[data-field="birthDate"]').dataset.value,
            expire: tourist.querySelector('[data-field="dateIssue"]').dataset.value,
            issueDate: tourist.querySelector('[data-field="dateTake"]').dataset.value,
            lastName: tourist.querySelector('[data-id="nn"]').value,
            firstName: tourist.querySelector('[data-id="nf"]').value,
            serial: passportNumber[0],
            number: passportNumber[1],
            authority: getNodeProperty(tourist.querySelector('[data-field="whoTake"]'), '')
        })
}

function getHotelRowByImage() {
    return null;
}

function quickBookingsFilterCallback(tr) {
    return tr.clientHeight > 0;
}
