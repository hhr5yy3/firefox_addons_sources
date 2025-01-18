window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME : window.OPERATOR_NAME;
window.showTopHotelsRating = false;
console.log('loaded mg order book');
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const orderList = $$('#orderListControl_ordersDivList .blue_box');
    if (orderList.length > 0) {
        orderList.forEach(div => {
            if (!div.querySelector(".qq")) {
                const container = createQQContainer('max-width:185px;padding-left:10px;zoom:0.85');
                const qqBtns = container.querySelector('.qq-box');
                qqBtns.style.display = 'none';
                div.append(container);
            }
        })
        return;
    }
    $$(".orderInfo_block_infoputL, #agent-info, .frontPanel, .order_tbls, [id*='_trAgencyPrice'], .fui-b-pay-details").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            const container = createQQContainer('top: 10%;position: fixed;max-width:185px;right:10%');
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
            div.after(container);
        }
    });
}

async function createOption(button) {
    let doc = document;
    if (button.closest('#orderListControl_ordersDivList')) {
        const row = button.closest('.blue_box');
        const a = row.querySelector('a[id$="lnkOrderCode"]');
        const bookingUrl = getNodeProperty(a, null, 'href');
        button.classList.add('disabled');
        const page = await fetchTimeout(15000, fetch(bookingUrl)).then(resp => resp.text());
        button.classList.remove('disabled');

        const parser = new DOMParser();
        doc = parser.parseFromString(page, "text/html");
    }
    const serviceTable = getHotelRowByImage(doc);
    const trs = $$('[id$="servicesTable"]>tbody>tr:not(.h1)', serviceTable);
    const country = getText(doc.querySelector('span[id$="lbCountry"]'));
    let hotels = filterServiceCallback(trs, /HOTEL::|Гостиница::|Отель:/).map(tr => parseHotelMegatec(tr, country));
    if (hotels.length === 0 ) {
        hotels = trs.filter(tr => tr.querySelector('[src="images/sv3.gif"]')).map(tr =>parseHotelAsService(tr, country));
    }

    const transfers = filterServiceCallback(trs, 'Трансфер::').map(parseService);
    const insurance = filterServiceCallback(trs, 'Страховка::').map(parseService);
    const other = filterServiceCallback(trs, 'Доп. услуги::').map(parseService);

    const dateStart = getNodeProperty(doc.querySelector('span[id$="lbTourDate"]'));
    const dateEnd = getNodeProperty(doc.querySelector('span[id$="lbTourDateEnd"]'));
    const flight = getFlight(trs);
    const totalPriceAll = getNodeProperty(doc.querySelector('span[id$="lbPriceSum"]')).split(/\s*\(/)

    const totalPriceOne = totalPriceAll[0].replace(/\s+/g,'');
    const totalPriceTwo = (totalPriceAll[1] || '').replace(/\s+/g, '') || getNodeProperty(doc.querySelector('span[id$="lbNationalTotalSum"]'), '').replace(/,/g, '.').replace(/\s+/g, '')

    const [priceOne, currencyOne] = [parseFloat(totalPriceOne), mapCurrencyUtil(totalPriceOne.replace(/[^А-яA-z$€₽]+/g, ''))];
    const [priceTwo, currencyTwo] = [parseFloat(totalPriceTwo), mapCurrencyUtil(totalPriceTwo.replace(/[^А-яA-z$€₽]+/g, ''))];

    const nettPriceAll = getNodeProperty(doc.querySelector('span[id$="lbPriceToPay"], span[id$="lbToPaySum"]')).split(/\s*\(/);

    const nettPriceTextOne = nettPriceAll[0].replace(/\s+/g, '');
    const nettPriceTextTwo = (nettPriceAll[1] || '0').replace(/\s+/g, '');

    const [nettPriceOne, nettPriceCurrencyOne] = [parseFloat(nettPriceTextOne), mapCurrencyUtil(nettPriceTextOne.replace(/[^А-яA-z$€₽]+/g, ''))];
    const [nettPriceTwo, nettPriceCurrencyTwo] = [parseFloat(nettPriceTextTwo), mapCurrencyUtil(nettPriceTextTwo.replace(/[^А-яA-z$€₽]+/g, ''))];
    const prices = new Prices();
    const grossPriceTypeOne = mapPriceType(currencyOne);
    const nettPriceTypeOne = mapPriceType(nettPriceCurrencyOne);
    prices[`${grossPriceTypeOne}`].gross = priceOne;
    prices[`${grossPriceTypeOne}`].currency = currencyOne;
    prices[`${nettPriceTypeOne}`].nett = nettPriceOne;
    prices[`${nettPriceTypeOne}`].currency = nettPriceCurrencyOne;

    const grossPriceTypeTwo = mapPriceType(currencyTwo);
    const nettPriceTypeTwo = mapPriceType(nettPriceCurrencyTwo);
    if (priceTwo) {
        prices[`${grossPriceTypeTwo}`].gross = priceTwo;
        prices[`${grossPriceTypeTwo}`].currency = currencyTwo;
    }
    if (nettPriceTwo) {
        prices[`${nettPriceTypeTwo}`].nett = nettPriceTwo;
        prices[`${nettPriceTypeTwo}`].currency = nettPriceCurrencyTwo;
    }


    const parsePassengers = () => {
        let tourists = $$('table[id$="dgTourists"] tr:not(.h1)', doc);
        const firstTourist = tourists.find(t => getNodeData('[id*="ismain"]', t) === '+');
        const otherTourists = tourists.filter(t => getNodeData('[id*="ismain"]', t) !== '+');
        if ( firstTourist ) {
            tourists = [firstTourist, ...otherTourists]
        }
        return tourists.map(extractPassengerInfo)
    }
    window.parsePassengers = parsePassengers;
    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        dateStart,
        dateEnd,
        nights: getDistance(dateStart, dateEnd).toString(),
        country,
        region: hotels && hotels.length > 0 ? hotels[0].region : null,
        city_from: flight && flight.sectors[0] && flight.sectors[0].segments[0] ? flight.sectors[0].segments[0].departureCity : 'Без перелета',
        operator: window.OPERATOR_NAME,
        tourOperatorReference: getNodeProperty(doc.querySelector('td span[id$="lbDogovorCode"]'))
    };
    Object.assign(option, {prices});
    return option;
}

function parseHotelAsService(tr, country) {
    const text = getText(tr.querySelector('[id*="LbServiceName"]'));
    const nights = getText(tr.querySelector('td span[id*=LbDays]'));
    const checkinDt = getText(tr.querySelector('td span[id$=LbDate]'));
    const split = text.split('/');
    return {
        checkinDt,
        dateStart: checkinDt,
        nights,
        hotelName: split[0],
        roomType: split[1],
        boardType: split[2],
        country
    }
}

function parseService(tr) {
    const text = getText(tr.querySelector('tr')).split('::')[1];
    const dateStart = getText(tr.querySelector('td span[id$=LbDate]'));
    const days = getText(tr.querySelector('td span[id$=LbDays]'));
    return new quickBookingValue({
        description: text,
        dateStart,
        dateEnd: days ? addDaysToStringDate(dateStart, days): null
    })
}

function parseHotelMegatec(tr, country) {
    const text = getText(tr.querySelector('tr'));
    const split = text.split(/::|\/|\s*,\s*/);
    const checkinDt = getText(tr.querySelector('td span[id$=LbDate]'));
    const nights = getText(tr.querySelector('td span[id$=LbDays]'));
    const region = split[1];
    const hotelName = split[2];
    const roomType = split[4];
    const boardType = split[6];
    const accommodation = split[5];
    return {
        checkinDt,
        dateStart: checkinDt,
        nights,
        hotelName,
        roomType,
        accommodation,
        boardType,
        country,
        region
    }
}

function getFlight(trs) {
   try {
       const segments = filterServiceCallback(trs, /А_П::|Авиаперелет::/);
       if ( segments.length > 0 ) {
           const forward = segments.filter(seg => seg.querySelector('[src="images/sv1.gif"]'));
           const backward = segments.filter(seg => seg.querySelector('[src="images/sv1b.gif"]'));
           const sectors = [forward, backward].map(sector => ({segments: sector.map(parseSegment)})).filter(s => s)
           return sectors.length > 0 ? {sectors} : null;
       }
       return null;
   } catch(e) {
       console.log(e);
   }
}

function filterServiceCallback(trs, text) {
    return trs.filter(tr => getText(tr).match(text))
}

function parseSegment(tr) {
    const mainText = getText(tr.querySelector('tr'));
    const split = mainText.split(/::|\/|\s*,\s*/);
    const [departureTime, arrivalTime] = split[5].split('-');
    const [departureAirportID, arrivalAirportID] = split[4].split('-');
    const departureDate = getText(tr.querySelector('td span[id*=LbDate]'));
    return new FlightSegment({
            flightNumber: split[3],
            departureDate,
            departureTime,
            departureCity: split[1],
            departureAirportID,
            serviceClass: split[6],
            arrivalTime,
            arrivalCity: split[2],
            arrivalAirportID
        })
}

function getHotelRowByImage(doc = document) {
    return doc.querySelector('[id$="servicesTable"]');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        prices: tourOptions.prices,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parsePassengers(button) {
    const tourists = $$( 'table[id$="dgTourists"] tr:not(.h1)');
    return tourists.map(extractPassengerInfo)
}

function extractPassengerInfo(tourist) {
    const passportNumber = getNodeProperty(tourist.querySelector('[id$="passportrus"], [id$="passport"]'), '').split(/\s*№\s*/);
    let gender = getNodeProperty(tourist.querySelector('[id$="_sex"]'));
     if ( gender && gender.includes('-М')) {
         gender = '1'
     }
    if ( gender && gender.includes('-Ж') ) {
        gender = '2'
    }
    return new Passenger(
        {
            birthday: getNodeProperty(tourist.querySelector('[id$="birthdate"]')),
            expire: getNodeProperty(tourist.querySelector('[id$="passportdateend"]')),
            lastName: getNodeProperty(tourist.querySelector('[id$="lastname"], [id$="lastnamerus"], [id$="lastname"]')) || getNodeProperty(tourist.querySelector(' [id$="txtLastName"]'), null, 'value'),
            firstName: getNodeProperty(tourist.querySelector('[id$="firstname"], [id$="firstnamerus"]')) || getNodeProperty(tourist.querySelector('[id$="txtFirstName"]'), null, 'value'),
            lastNameRu: getNodeProperty(tourist.querySelector('[id$="lastnamerus"]')),
            firstNameRu: getNodeProperty(tourist.querySelector('[id$="firstnamerus"]')),
            secondName: getNodeProperty(tourist.querySelector('[id$="patronymicrus"]')),
            serial: passportNumber[0],
            number: passportNumber[1],
            issueDate: getNodeProperty(tourist.querySelector('[id$="passportdaterus"], [id$="_passportdate"]')),
            nationality: getNodeProperty(tourist.querySelector('[id$="citizenship"]')),
            inn: getNodeProperty(tourist.querySelector('[id$="_citizenid"]')),
            sex: gender
            // phone: getNodeProperty(tourist.querySelector('[id$="phone"]')),
            // email: getNodeProperty(tourist.querySelector('[id$="email"]'))
        })
}
