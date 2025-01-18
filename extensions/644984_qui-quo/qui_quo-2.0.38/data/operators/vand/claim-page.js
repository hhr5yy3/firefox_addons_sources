window.OPERATOR_NAME = "Vand";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {

    $$("#tabs-blocks .status-v-inner-last").forEach(div => {
        if (!$1(".qq")) {
            const span = document.createElement('span');
            span.style.cssText = `
                                    display: flex;
                                    width: 100%;
                                    justify-content: end;
            `;
            const container = createQQContainer();
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
            span.append(container);
            div.append(span);
        }
    });
}

async function createOption(button) {
    let doc = document;
    const tables = $$('.table-hot.table-account-inner.table-composition');
    const statuses = $$('#status-v .status-v-inner span').map(parseStatusElement)
    const tourUrl = getNodeData('.p-head-v a[href*="country"]', doc, 'href');
    let country = null
    if ( tourUrl )  {
        const pathParts = new URL(tourUrl).pathname.split('/').filter(Boolean);
        const regionsInfo = await fetch(`${location.origin}/ajax/home/filters/${pathParts[1]}`).then(r => r.json()).catch(console.log)
        if ( regionsInfo && regionsInfo.country ) {
            country = regionsInfo.country.name_vin
        }
    }
    const serviceTable = getServiceTable(tables);
    const trs = $$('tr', serviceTable).filter(tr => !$1('th', tr));

    let hotels = filterServiceCallback(trs, /HOTEL::|Гостиница::|Отель:/).map(tr => parseHotelMegatec(tr, country));

    const transfers = filterServiceCallback(trs, 'Трансфер::').map(parseService);
    const insurance = filterServiceCallback(trs, 'Страховка::').map(parseService);
    const other = filterServiceCallback(trs, /Доп. услуги::|Экскурсия::/i).map(parseService);
    const flight = getFlight(trs);
    const totalPriceText = statuses.find(s => s.key.match(/Стоимость путевки:/i)).value.replace(/\s+/g, '');
    const nettPriceText = statuses.find(s => s.key.match(/Сумма к оплате:/i)).value.replace(/\s+/g, '');
    const [price, currency] = [parseFloat(totalPriceText), mapCurrencyUtil(totalPriceText.replace(/[^А-яA-z$€₽]+/g, ''))];

    const [nettPrice, nettPriceCurrency] = [parseFloat(nettPriceText), mapCurrencyUtil(nettPriceText.replace(/[^А-яA-z$€₽]+/g, ''))];

    const prices = new Prices();
    prices.addPriceAuto(String(nettPrice), String(price), currency)
    const passengerTable = getPassengersTable(tables)

    const parsePassengers = () => {
        const tourists = $$('tr', passengerTable).filter(tr => !$1('th', tr));
        return tourists.map(extractPassengerInfo)
    }
    window.parsePassengers = parsePassengers;
    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        country,
        region: hotels && hotels.length > 0 ? hotels[0].region : null,
        city_from: flight && flight.sectors[0] && flight.sectors[0].segments[0] ? flight.sectors[0].segments[0].departureCity : 'Без перелета',
        operator: window.OPERATOR_NAME,
        tourOperatorReference: getNodeProperty(doc.querySelector('td span[id$="lbDogovorCode"]'))
    };
    Object.assign(option, {price, currency, nettPrice, nettPriceCurrency, prices});
    return option;
}

function parseStatusElement(span) {
    const value = getNodeData('strong', span);
    const key = getText(span).replace(value, '').trim()
    return {value, key, node: span}
}

function parseService(tr) {
    const text = getText($1('.personal-service-name', tr)).split('::')[1];
    const dateStart = getText(tr.querySelector('td.personal-service-date'));
    const days = getText(tr.querySelector('td.personal-service-dayscount'));

    return new quickBookingValue({
        description: text,
        dateStart,
        dateEnd: days ? addDaysToStringDate(dateStart, days) : null
    })
}

function parseHotelMegatec(tr, country) {
    const text = getText(tr);
    const split = text.split(/::|\/|\s*,\s*/);
    const checkinDt = getText(tr.querySelector('td.personal-service-date'));
    const nights = getText(tr.querySelector('td.personal-service-dayscount'));
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
        if (segments.length > 0) {
            const sectors = splitSegmentsToSectors(segments.map(parseSegment))
            return sectors.length > 0 ? {sectors} : null;
        }
        return null;
    } catch (e) {
        console.log(e);
    }
}

function filterServiceCallback(trs, text) {
    return trs.filter(tr => getText(tr).match(text))
}

function parseSegment(tr) {
    const mainText = getText(tr.querySelector('.personal-service-name'));
    const split = mainText.split(/::|\/|\s*,\s*/);
    const [departureTime, arrivalTime] = split[5].split('-');
    const [departureAirportID, arrivalAirportID] = split[4].split('-');
    const departureDate = getText(tr.querySelector('td.personal-service-date'));
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

function getServiceTable(tables) {
    return tables.find(table => $$('th', table).extractNodesText().find(t => t.match(/Статус услуги/i)));
}

function getPassengersTable(tables) {
    return tables.find(table => $$('th', table).extractNodesText().find(t => t.match(/Фамилия/i)));
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
    const tourists = $$('table[id$="dgTourists"] tr:not(.h1)');
    return tourists.map(extractPassengerInfo)
}

function extractPassengerInfo(tourist) {
    const tds  = $$('td', tourist)
    const passportNumber = getNodeProperty(tds[5], '').split(/№+|\s+/)
    return new Passenger(
        {
            birthday: getNodeProperty(tds[4]),
            expire: getNodeProperty(tds[6]),
            lastName: getNodeProperty(tds[2]),
            firstName: getNodeProperty(tds[3]),
            serial: passportNumber[0],
            number: passportNumber[1],
            // phone: getNodeProperty(tourist.querySelector('[id$="phone"]')),
            // email: getNodeProperty(tourist.querySelector('[id$="email"]'))
        })
}
