window.showTopHotelsRating = true;
console.log('Loaded!!!');
window.OPERATOR_NAME = "TPG";

window.countryList = {
    '139': 'о. Занзибар (Танзания)',
    '109': 'ОАЭ',
    '143': 'Турция',
    '5': 'Австрия',
    '6': 'Азербайджан',
    '7': 'Албания',
    '9': 'Андорра',
    '13': 'Армения',
    '21': 'Бельгия',
    '23': 'Болгария',
    '29': 'Великобритания',
    '30': 'Венгрия',
    '34': 'Вьетнам',
    '39': 'Германия',
    '44': 'Греция',
    '45': 'Грузия',
    '46': 'Дания',
    '48': 'Доминиканская Республика',
    '49': 'Египет',
    '53': 'Израиль',
    '54': 'Индия',
    '55': 'Индонезия',
    '56': 'Иордания',
    '59': 'Ирландия',
    '60': 'Исландия',
    '61': 'Испания',
    '62': 'Италия',
    '64': 'Казахстан',
    '65': 'Камбоджа',
    '67': 'Канада',
    '68': 'Катар',
    '70': 'Кения',
    '71': 'Кипр',
    '75': 'Коста-Рика',
    '77': 'Куба',
    '80': 'Лаос',
    '81': 'Латвия',
    '84': 'Литва',
    '87': 'Маврикий',
    '90': 'Малайзия',
    '91': 'Мальдивы',
    '92': 'Мальта',
    '93': 'Марокко',
    '95': 'Мексика',
    '100': 'Мьянма',
    '105': 'Нидерланды (Голландия)',
    '108': 'Норвегия',
    '110': 'Оман',
    '116': 'Польша',
    '117': 'Португалия',
    '121': 'Саудовская Аравия',
    '89': 'Северная Македония',
    '123': 'Сейшелы',
    '129': 'Сербия',
    '130': 'Сингапур',
    '132': 'Словакия',
    '133': 'Словения',
    '134': 'США',
    '137': 'Таиланд',
    '144': 'Узбекистан',
    '145': 'Украина',
    '149': 'Финляндия',
    '150': 'Франция',
    '152': 'Хорватия',
    '154': 'Черногория',
    '155': 'Чехия',
    '157': 'Швейцария',
    '158': 'Швеция',
    '159': 'Шри-Ланка',
    '162': 'Эстония',
    '164': 'ЮАР',
    '165': 'Южная Корея',
    '167': 'Япония'
}

window.cities = {
    '1069': 'Киев',
    '1778': 'Одесса',
    '1566': 'Минск',
    '98': 'Алматы',
    '168': 'Нур-Султан',
    '1192': 'Краков'
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".services_cart_box").forEach(div => {
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
    wrapper.classList.add('qq');
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "185px";
    wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    const cart = getHotelRowByImage(img);

    const cartTrs = $$('tr', cart);

    const dateStart = $first('#date_from').value;
    const dateEnd = $first('#date_to').value;

    const hotelRowTds = $$('tr.tab_cont.house td').extractNodesText()
    const [checkinDt, checkoutDt] =[makeYear4Digits(hotelRowTds[0]), addDaysToStringDate(makeYear4Digits(hotelRowTds[0]), hotelRowTds[2])];
    console.log(checkinDt, checkoutDt)
    const hotelNights = getDistance(checkinDt, checkoutDt);

    const hotelNode = $first('#hotel');


    const findTdByCaption = (caption) => {
       const result =  cartTrs.map(tr => ({
            th: $first('th', tr),
            td: $first('td', tr)
        })).find(obj => obj.th && getText(obj.th).match(caption));
       return result.td;
    }


    const getTd = (node) => node.closest('tr').querySelector('td')
    const getTdText = (node, caption) => node ? getNodeProperty(getTd(node), '') : getNodeProperty(findTdByCaption(caption), '');

    const hotel = getTdText(hotelNode).split(/\s*:\s*|\s*,\s*/);
    const fullNights = getDistance(dateStart, dateEnd);

    const room = getTdText(null, /Размещение|Розміщення/i);
    const prices = getPrices();
    const flight = getFlight();
    let option = {
        checkinDtHotel: checkinDt,
        checkinDt : dateStart,
        prices,
        nights: hotelNights.toString(),
        extra_nights: (+fullNights - hotelNights).toString(),
        hotelName: hotel[1],
        href: null,
        country: window.countryList[$first('#arrivalCountryId', cart).value],
        region: hotel[2].replace(/\(|\)/g, ''),
        roomType: room,
        boardType: getTdText($first('#eat')),
        price: prices.inNationalCurrency.gross,
        currency: prices.inNationalCurrency.currency,
        city_from: $first('#departureCityId') ? window.cities[$first('#departureCityId').value] : '',
        operator: window.OPERATOR_NAME,
        occupancy: {
            adultsCount: parseInt($first('[name="adults"]').value),
            childrenCount: parseInt($first('[name="childs"]').value)
        },
        flight
    };
    return option;
}

function getPrices() {
    try {
        const prices = new Prices();
        const [nettPriceNational, nettPriceForeign] = getNodeProperty($first('#forPaymentValue').parentNode, '')
            .match(/\d+\s*[А-я$€]+/g)
            .map(str => ({price: parseFloat(str), currency: mapCurrencyUtil(str.replace(/\d+|\s+/gi, ''))}));

        if ( nettPriceNational ) {
            const nettPriceTypeNational = mapPriceType(nettPriceNational.currency);
            prices[`${nettPriceTypeNational}`].currency = nettPriceNational.currency
            prices[`${nettPriceTypeNational}`].nett = nettPriceNational.price;
            prices[`${nettPriceTypeNational}`].gross = parseFloat($first('.sum_to_pay [data-id="price"]').value);
        }

        if ( nettPriceForeign ) {
            const nettPriceTypeForeign = mapPriceType(nettPriceForeign.currency);
            prices[`${nettPriceTypeForeign}`].currency = nettPriceForeign.currency
            prices[`${nettPriceTypeForeign}`].nett = nettPriceForeign.price;
            prices[`${nettPriceTypeForeign}`].gross = parseFloat($first('[name="dataValue"]').value);
        }
        return prices;
    } catch(e) {
        console.log(e)
        return new Prices();
    }
}

function getFlight() {
    try {
        const sectors = $$('select#flightForward, select#flightBack').filter(c => c.offsetHeight > 0).map(select => selectedOption(select))
            .map(parseSector);
        if ( sectors.length === 0 ) {
            const dataBox = $first('#services_tab');
            return {sectors: $$('tr.fly_out', dataBox).map(parseBoxSector)}
        }
        return {sectors}
    } catch (e) {
        return null;
    }
}

function parseSector(option) {
    const patterns = getRegexPatterns();
    const departureDate = option.match(patterns.date)[0];
   const [departureTime, arrivalTime] = option.match(patterns.time)
    const [departureCity, arrivalCity] =  option.replace(/\d+|:|\s+|,.+|\.|[A-z]|-+/g, ' ').trim().split(/\s+/);
    return {
        segments: [new FlightSegment({
                                         flightNumber: (option.match(/\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b/) || [])[0],
                                         departureDate,
                                         departureTime,
                                         departureCity,
                                         serviceClass: option.split(/\s+/)[1],
                                         arrivalTime,
                                         arrivalCity
                                     })]
    }
}

function parseBoxSector(tr) {
    const tds = $$('td', tr);
    const date = makeYear4Digits(getNodeProperty(tds[0]));
    const text = getText(tds[1]);
    const flightNumber = text.match(getRegexPatterns().flightNumber)[0];
    const ids = text.match(/\(*([A-Z]{3})\)*/g).map(t=>t.replace(/[)(]/g, ''))
    const times = text.match(/\d{2}:\d{2}/g);
    const cities = text.match(/::(.+?),/)[1].split('-').map(t => t.replace(/\(.+/, ''));
    return {segments: [new FlightSegment({
        flightNumber,
        departureDate: date,
        departureTime: times[0],
        departureCity: cities[0],
        departureAirportID: ids[0],
        arrivalCity: cities[1],
        arrivalTime: times[1],
        arrivalAirportID: ids[1],
    })]}
}

function getHotelRowByImage() {
    return document.querySelector('.s_cart_tab');
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {

    const dataBox = $first('#services_tab');
    const allServices = $$('tr.addService').filter(tr => tr.dataset.selected === 'true');
    const trs = $$('tr.tab_cont', dataBox)

    const transfers = [...$$('tr.trans_out', dataBox).map(parseBoxService), ...allServices.filter(tr => getText(tr).match(/трансфер/i)).map(parseTabService)];
    const insurance = [...$$('tr.med', dataBox).map(parseBoxService), ...allServices.filter(tr => getText(tr).match(/Страховка/i)).map(parseTabService)]
    const busRoutes = trs.filter(tr => getText(tr).match(/Автобус::/i)).map(parseBoxService);

    const other = allServices.filter(tr => !getText(tr).match(/трансфер|Страховка/i)).map(parseTabService)

    const services = {
        insurance,
        transfers,
        busRoutes,
        other
    };
    return services;
}

function parseTabService(tr) {
    const date = selectedOption(tr.querySelector('select[data-id="dayOfService"]'));
    const tds = $$('td', tr);
    return new quickBookingValue({
                                     description: getNodeProperty(tds[1]),
                                     dateStart: date
                                 })
}

function parseBoxService(tr) {
    const tds = $$('td', tr);
    const date = makeYear4Digits(getNodeProperty(tds[0]));
    const nights = parseInt(getNodeProperty(tds[2]));
    let dateEnd = null;
    if ( nights ) {
        dateEnd = addDaysToStringDate(date, nights)
    }
    return new quickBookingValue({
        description: getNodeProperty(tds[1]),
        dateStart: date,
        dateEnd
    })
}

function parsePassengers() {
    const panels = $$("[data-id='TouristItem'] .tab_cont");
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(
        getInputsValues(panel, {
            lastName: '[data-id="nn"]',
            firstName: '[data-id="nf"]',
            serial: '[data-id="ps"]',
            number: '[data-id="pn"]',
            authority: '[data-id="ph"]',
        }), panel);
    passenger.docType = 'internationalPassport';
    passenger.birthday = zipDateParts(panel, ['[data-id="bd"]', '[data-id="bm"]', '[data-id="by"]']);
    passenger.expire = zipDateParts(panel, ['[data-id="pvd"]', '[data-id="pvm"]', '[data-id="pvy"]']);
    passenger.issueDate = zipDateParts(panel, ['[data-id="ptd"]', '[data-id="ptm"]', '[data-id="pty"]']);
    return passenger;
}

function zipDateParts(panel, selectors) {
    const valuesObj = getInputsValues(panel, selectors);
    return valuesObj.filter(s => s).join('.') || null;
}
