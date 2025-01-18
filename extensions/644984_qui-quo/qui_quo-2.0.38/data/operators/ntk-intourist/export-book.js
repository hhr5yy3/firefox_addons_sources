window.OPERATOR_NAME = "Ntk Intourist";
window.injectionSelector = '#main-wrap';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return;
    }
    $$("app-reservation-table-row .applications_list_number").forEach(div => {
        if ( !div.querySelector(".qq")  ) {
            const container = createQQContainer('display:block;min-width:initial;');
            const qqBtns = container.querySelector('.qq-box');
            const button = container.querySelector('.qq-export-button');
            qqBtns.style.display = 'none';
            button.style.minWidth = 'initial';
            button.style.minHeight = '20px';
            button.style.padding = '4px';
            div.append(container);
        }
    });
}

async function createOption(img) {
    const booking = getHotelRowByImage(img);

    const bookNumber = getNodeProperty(booking.querySelector('.applications_list_number a'));
    img.setAttribute('disabled', 'disabled');
    img.textContent = 'Загрузка...';
    const bookUrl = 'https://intourist.ru/privateoffice/api/reservations/get-info?code='+ encodeURIComponent(encodeURIComponent(bookNumber));

    const json = await fetchTimeout(20000, fetch(bookUrl)).then(resp => resp.json()).catch(console.log);

    const oldPageLik = json.oldReservationPageUrl;
    const pageText = await fetchTimeout(20000, fetch(oldPageLik)).then(resp => resp.text()).catch(console.log);
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageText, "text/html");
    if ( !doc ) {
        return;
    }
    const mainNode = doc.querySelector('#main-wrap');
    const tables = $$('table', mainNode).filter(table => table.querySelector('.int_head'));

    const servicesTable = tables.find(table => getText(table.querySelector('.int_head')).match("Название услуги") );
    const services = $$('tr', servicesTable)
        .filter((table, index) => index !== 0)
        .map( tr => $$('td', tr).map(td => getText(td)) );

    const transfers = services.filter(svc => svc[2].match(/Transfer|трансфер/i))
        .map(parseBookingValue);

    const insurance = services.filter(svc => svc[2].match(/Страховка|insurance/i))
        .map(parseBookingValue);
    const sectors = services.filter(svc => svc[2].match(/А_П:|\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b/i)).map(parseFlight);

    const flights = [{sectors}];
    const other = services.filter(svc => !svc[2].match(/Transfer|трансфер|Страховка|insurance|А_П:|Отель:|HOTEL:|\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b/i)).map(parseBookingValue);

    const infoTable = tables.find(table => getText(table.querySelector('.int_head')).match("Информация по заявке"));
    const infoTrs = $$('tr', infoTable)
        .filter((table, index) => index !== 0)
        .map(tr => $$('td', tr).map(td => getText(td)));

    const priceTr = (infoTrs.find( arr => arr[0].match(/Полная стоимост/)) || ["0","0"])[1];
    const nettPriceTr = (infoTrs.find(arr => arr[0].match(/Стоимость.+?для агентства/)) || ["0", "0"])[1];

    const price = parseFloat(priceTr.replace(/\s+|[A-z]+/g, '').replace(',', '.'));
    const nettPrice = parseFloat(nettPriceTr.replace(/\s+|[A-z]+/g, '').replace(',', '.'));

    const currency = mapCurrency(priceTr.replace(/\s+|\d+|,/g, ''));

    const dates = (infoTrs.find(arr => arr[0].match(/Дата тура/)) || [])[1].split(/\s*-\s*/);

    const country = (infoTrs.find(arr => arr[0].match(/Страна/)) || [])[1];
    const city_from = (infoTrs.find(arr => arr[0].match(/Город вылета/)) || [])[1];

    console.log({services})
    const hotels = services.filter(svc => svc[2].match(/Отель:|HOTEL:/i)).map(text => parseHotel(text, country));

    const passengers = extractPassengers(tables.find(table => getText(table.querySelector('.int_head')).match(/Турист/i)));
    img.setAttribute('passengers', JSON.stringify(passengers || []))

    img.removeAttribute('disabled');
    img.textContent = 'Быстрая Заявка в CRM';

    const prices = new Prices();
    const grossPriceType = mapPriceType(currency);
    const nettPriceType = mapPriceType(currency);

    prices[`${grossPriceType}`].gross = price;
    prices[`${grossPriceType}`].currency = currency;

    prices[`${nettPriceType}`].nett = nettPrice;
    prices[`${nettPriceType}`].currency = currency;


    let option = {
        hotels,
        flights,
        transfers,
        insurance,
        other,
        dateStart: dates[0],
        dateEnd: dates[1],
        price,
        nettPrice,
        nettPriceCurrency: currency,
        prices,
        currency,
        operator: OPERATOR_NAME,
        city_from: city_from,
        tourOperatorReference: getText(booking.querySelector('.applications_list_number a'))
    };

    return option;
}

function mapCurrency(text) {
    switch (text) {
        case'EW': return 'EUR';
        case'$':return 'USD';
        case'рб': return 'RUB';
        default: return text;
    }
}

function parseHotel(text, country) {
    console.log({text, country})
    try {
        text[2] = text[2].replace(/\[.+?\]/g, '');
        if (text[2].match(/Отель:/i)) {
            const array = text[2].split(/\s*:\s*|\s*\/s*/);
            const [dateStart, _] = text[2].match(getRegexPatterns().date) || [];
            let option = {};
            if (array.length > 4 || !dateStart) {
                option = {
                    dateStart: text[0],
                    nights: text[1],
                    hotelName: array[1],
                    country,
                    roomType: array[2],
                    accommodation: array[3],
                    boardType: array[4],
                    operator: OPERATOR_NAME
                };
            } else {
                const [dateStart, dateEnd] = text[2].match(getRegexPatterns().date) || [];
                const [boardType, roomType] = text[2].split(new RegExp(/\d{2}.\d{2}.\d{2,4}\s*|\s*,\s*/g)).reverse();
                option = {
                    dateStart,
                    nights: String(getDistance(dateStart, dateEnd)),
                    hotelName: (text[2].match(/:\s*(.+?\d\*)/) || text[2].match(/:\s*(.+?)\s*\(/))[1],
                    country,
                    region: (text[2].match(/\*\s*\((.+?)\)/) || [])[1],
                    roomType: roomType.replace(/\s*\(.+/, ''),
                    accommodation: (roomType.match(/\((.+)\)/) || [])[1],
                    boardType,
                    operator: OPERATOR_NAME
                };
            }
            return option;
        } else {
            return getHotelInfoDefault(text, country);
        }
    } catch (e) {
        console.log(e);
        return getHotelInfoDefault(text, country);
    }

}

function getHotelInfoDefault(text, country) {
    const array = text[2].split(/\s*:\s*|\s*\/s*|,/).filter(s => s);
    let option = {
        dateStart: text[0],
        nights: text[1],
        hotelName: array[2],
        country,
        region: array[1],
        roomType: array[4].trim(),
        accommodation: array[5],
        boardType: array[6],
        operator: OPERATOR_NAME
    };
    return option;
}

function extractPassengers(table) {
     const trs = $$('tr', table).filter( tr => getText(tr).match(/\d{2}\.\d{2}\.\d{4}/)).map( tr => $$('td', tr).map(td => getText(td)) );
     return trs.map(extractPassenger);
}

function extractPassenger(array) {
    const [_, lastName, firstName] = array[0].split(/\s/);
    const docNum = array[2].split(/\s*№\s*/);
    return new Passenger({
        lastName,
        firstName,
        birthday: array[1].split('(')[0],
        serial: docNum[0],
        number: docNum[1],
        expire: array[3]

    })
}

function parsePassengers(button) {
    try {
        return JSON.parse(button.getAttribute('passengers'));
    } catch (e) {
        return [];
    }
}


function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parseFlight(sector) {
     try {
       const segment = {
           flightText: sector[2],
           date: sector[0]
       };
       const segments = [segment].map(parseSegment);
       return {segments}
     }
     catch (e) {
         console.log(e);
     }
}

function parseSegment(segment) {
    var textSegments = segment.flightText.match(/([0-9A-z]{2}\s*\d+)\s+\((.+?)\s*(\d{2}:\d{2})\s*—\s+(.+?)\s*(\d{2}:\d{2})\).*?\[([A-Z])]/);
    if ( textSegments ) {
        return new FlightSegment({
            flightNumber: textSegments[1],
            departureDate: segment.date,
            departureTime: textSegments[3],
            departureCity: textSegments[2],
            arrivalCity: textSegments[4],
            arrivalTime: textSegments[5],
            serviceClass: textSegments[6]
        })
    }

    textSegments = segment.flightText;
    const flightNumber = textSegments.match(getRegexPatterns().flightNumber)[0];
    const ids = textSegments.match(/\b[A-Z]{3}\b/g) || [];
    const times = textSegments.match(/\d{2}:\d{2}/g) || [];
    return new FlightSegment({
        flightNumber,
        departureDate: segment.date,
        departureTime: times[0],
        departureAirportID: ids[0],
        arrivalTime: times[1],
        arrivalAirportID: ids[1],
        serviceClass: (textSegments.match(/\[(.+?)\]/) || [])[1]
    })
}

function parseBookingValue(svc) {
     return new quickBookingValue({
         description: svc[2],
         dateStart: svc[0]
     })
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
        tourOperatorReference: tourOptions.tourOperatorReference,
        notes: ''
    };
    return services;
}
function getHotelRowByImage(img) {
    return img.closest('app-reservation-table-row');
}
