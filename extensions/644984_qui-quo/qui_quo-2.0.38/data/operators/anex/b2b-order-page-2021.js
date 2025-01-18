window.OPERATOR_NAME = "Anex";
window.showTopHotelsRating = false;
window.OPERATOR_NAME = window.OPERATOR_NAME;
window.DEFAULT_CURRENCY = "National";
window.OPERATOR_CURRENCY = "Anex";
window.CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
window.showTopHotelsRating = true;
window.injectionSelector = '.top_container';
window.API_HOSTS = {
    'agent.anextour.kg': 'webapi.anextour.kg',
    'agent.anextour.com': 'api.anextour.com',
    'agent.anextour.ru': 'api.anextour.ru',
    'agent.anextour.by': 'webapi.anextour.by',
    'agent.anextour.kz': 'webapi.anextour.kz',
    'agent.anextour.uz': 'webapi.anextour.uz',
    'www.anextour.com': 'api.anextour.com',
    'redesign-anexweb.vercel.app': 'api.anextour.com'
}

window.NATIONAL_CURRENCYS = {
    'agent.anextour.kg': 'KGS',
    'agent.anextour.com': 'RUB',
    'agent.anextour.kz': 'KZT'
}

window.qscript = document.createElement("script");
window.qscript.src = chrome.runtime.getURL('data/operators/anex/inline_script_order.js');
document.head.append(window.qscript);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return document.querySelector('#button-search-anchor');
}

function injectData() {
    const stickyContainer = $1('#booking-info .sticky');
         if ( stickyContainer && !$1('.qq') )  {
             const container = createQQContainer();
             const img = container.querySelector('img');
             const btn = container.querySelector('.qq-export-button');
             if (btn) {
                 btn.classList.add('button-text-purple')
                 btn.style.background = 'rgb(72 56 209/var(--tw-bg-opacity))'
                 btn.style.minHeight = '24px'
             }
             img ? img.style.width = 'initial' : null;
             stickyContainer.append(container)
             injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-direction: column;");
         }
}

async function createOption(img) {
    const cookieString = (document.cookie.split('; ').filter((row) => (row.startsWith('USER_TOKEN') || row.startsWith('ANEX_AUTH_TOKEN')) && !row.startsWith('USER_TOKEN_FEEDBACK'))).reverse()[0]
    const userToken = cookieString ? cookieString.split('=')[1] : null;
    const timestamp = sessionStorage.getItem('claimId');
    if ( !timestamp ) {
        if (!!String(XMLHttpRequest.prototype.send).match(/xhrSendProcessor/) )  {
            throw new QuiQuoError('Anti-virus intercept request block', 'Невозможно получить информацию о бронировании, пожалуйста, обновите страницу.')
        }
        throw new QuiQuoError('ClaimId not found', 'Невозможно получить информацию о бронировании, пожалуйста, обновите страницу.')
    }

    let params = new FormData();
    params.append("id", timestamp.toString());
    const result = await fetchTimeout(60000, fetch(`https://${API_HOSTS[location.hostname] || 'api.anextour.com'}/bron/calcfull`, {
        headers: {
            "authorization": userToken ? "Bearer " + userToken : '',
            "Accept": "*/*",
            "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk;q=0.6",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": location.origin,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST",
        "mode": "cors",
        body: params
    })).then(resp => resp.json());
    if ( !result || !result.bron ) {
        throw new QuiQuoError(JSON.stringify(result), 'Невозможно получить информацию о бронировании')
    }
    const claimDocument = result.bron.claim.claimDocument;
    sessionStorage.setItem('claimDocument', JSON.stringify(claimDocument));
    const dateStart = new Date(claimDocument.datebeg);
    const prices = await getPrices(claimDocument);
    const flight = getFlight(claimDocument.transports);

    let option = {
        checkinDt: dateStart.toLocaleDateString('ru'),
        extra_nights: claimDocument.nights && claimDocument.hnights ? (claimDocument.nights - claimDocument.hnights).toString() : "0",
        href: null,
        price: isPrefferedDefaultCurrencyUtil() ? parseInt(prices.inNationalCurrency.gross) : parseInt(prices.inForeignCurrency.gross),
        currency:  isPrefferedDefaultCurrencyUtil() ? prices.inNationalCurrency.currency : prices.inForeignCurrency.currency,
        city_from: claimDocument.townFrom || "",
        operator: OPERATOR_NAME,
        occupancy: {adultsCount: +claimDocument.adult, childrenCount: +claimDocument.child},
        flight
    };
    if (Array.isArray(claimDocument.hotels.hotel)) {
        extractMultiHotels(option, claimDocument)
    } else {
        extractSingleHotel(option, claimDocument.hotels.hotel);
    }
    option.nights = claimDocument.hnights || claimDocument.nights;
    return option;
}

function extractSingleHotel(option, hotelObj) {
    const obj = {
        dateStart: new Date(hotelObj.datebeg).toLocaleDateString('ru'),
        dateEnd: new Date(hotelObj.dateend).toLocaleDateString('ru'),
        nights: getDistance(new Date(hotelObj.datebeg), new Date(hotelObj.dateend)),
        hotelName: [hotelObj.name, hotelObj.star].join(' '),
        country: hotelObj.state,
        region: hotelObj.town,
        roomType: hotelObj.room,
        boardType: hotelObj.meal,
        accommodation: hotelObj.htplace
    };
    if ( option ) {
        return Object.assign(option, obj);
    }
    return obj;
}

function extractMultiHotels(option, claimDocument) {
    const obj = {
        hotelName: claimDocument.hotels.hotel.map(hotel => [hotel.name, hotel.star].join(' ')).join(' / '),
        country: (claimDocument.hotels.hotel).map(hotel => hotel.state).join(' / '),
        region: (claimDocument.hotels.hotel).map(hotel => hotel.town).join(' / '),
        roomType: (claimDocument.hotels.hotel).map(hotel => hotel.room).join(' / '),
        boardType: (claimDocument.hotels.hotel).map(hotel => hotel.meal).join(' / '),
        accommodation: (claimDocument.hotels.hotel).map(hotel => hotel.htplace).join(' / '),
        hotels: claimDocument.hotels.hotel.map( hotel => extractSingleHotel(null, hotel) )

    }
    Object.assign(option, obj)
}

function getFlight(transports) {
    try {
        const sectors = [transports.transport].flatMap(t => t).map(parseSector);
        return {sectors}
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    if ( sector.details ) {
        const segments = [sector.details.detail].flatMap(seg => seg).map(seg => parseSegment(sector, seg));
        return {segments};
    }
    const segments = [sector].map(parseTransportSegment);
    return {segments};
}

function parseTransportSegment(seg) {
    let arrivalDate = new Date(seg.dateend).toLocaleDateString('ru');
    // console.log(seg.arrival)
    // const days = seg.arrival.time.match(/\+(\d)/)
    // if ( days ) {
    //     arrivalDate = addDaysToStringDate(arrivalDate, days[1])
    // }

    return  new FlightSegment({
        flightNumber: seg.name,
        airline: seg.transportCompany,
        plane: seg.trantype,
        departureDate: new Date(seg.datebeg).toLocaleDateString('ru'),
        departureTime: seg.departure.time,
        departureAirport: seg.departure.port,
        departureAirportID: seg.departure.portAlias,
        departureCity: seg.departure.town,
        serviceClass: seg.class,
        arrivalDate: arrivalDate,
        arrivalTime: seg.arrival.time,
        arrivalAirport: seg.arrival.port,
        arrivalAirportID: seg.arrival.portAlias,
        arrivalCity: seg.arrival.town
    })
}

function parseSegment(sector, seg) {
    let arrivalDate = new Date(seg.arrival_datetime).toLocaleDateString('ru');
    // let departureDate = new Date(seg.depart_datetime).toLocaleDateString('ru')
    // console.log(seg)
    // const days = (sector.arrival || seg.arrival || {time: ''}).time.match(/\+(\d)/)
    // if ( days ) {
    //     arrivalDate = addDaysToStringDate(arrivalDate, days[1])
    // }
     return new FlightSegment({
             flightNumber: seg.flight_number,
             airline: seg.full_airline,
             travelTime: seg.SegmentDuration,
             plane: seg.TransportName,
             departureDate: new Date(seg.depart_datetime).toLocaleDateString('ru'),
             departureTime: seg.depart_time,
             departureAirport: seg.departureAirportName,
             departureAirportID: seg.departureAirportCode,
             serviceClass: seg.class,
             arrivalDate: arrivalDate,
             arrivalTime: seg.arrival_time,
             arrivalAirport: seg.arrivalAirportName,
             arrivalAirportID: seg.arrivalAirportCode,
             baggage: seg.bagage,
     })
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const claimDocument = JSON.parse(sessionStorage.getItem('claimDocument'));
    const claimServices = [claimDocument.services.service].flatMap(s=>s);

    const transfers = claimServices
        .filter(rsv => rsv.type.match(/stTransfer/i))
        .map(parseService);

    const insurance = claimServices
        .filter(rsv => rsv.type.match(/stInsurance/i))
        .map(parseService);

    const other = claimServices
        .filter(rsv => rsv.type.match(/stOther/i))
        .map(parseService);

    const prices = await getPrices(claimDocument);

    const services = {
        insurance,
        transfers,
        other,
        tourOptions,
        prices
    };
    return services;
}

function parseHotels(tourOptions) {
    if ( tourOptions.hotels ) {
        return tourOptions.hotels;
    }
    return parseHotelsUtil(tourOptions);
}

async function getPrices(claimDocument) {
    const prices = new Prices();
    let nationalPrice = claimDocument.moneys.money.find(m => m.currency.match(/RUB|KZT|KGS|BYN/));
    const foreignPrice = claimDocument.moneys.money.find(m => !m.currency.match(/RUB|KZT|KGS|BYN/) || m.isClaimCurrency === "true");

    if ( foreignPrice ) {
        prices.foreignCurrency = foreignPrice.currency;
        prices.foreignNettPrice = foreignPrice.net;
        prices.foreignGrossPrice = foreignPrice.price;
    }
    const nationalCurrency = window.NATIONAL_CURRENCYS[location.hostname];
    const rates = await fetch(`https://${API_HOSTS[location.hostname]}/b2b/CurrencyRates`).then(r => r.json()).catch(_=>null);
    if ( rates && Array.isArray(rates) && foreignPrice) {
        const rate = rates.find( rt => rt.alias_from === foreignPrice.currency && rt.alias_to === nationalCurrency)

        if ( rate ) {
            prices.nationalCurrency = nationalCurrency;
            prices.nationalNettPrice = Number((foreignPrice.net * parseFloat(rate.rate)).toFixed(2));
            prices.nationalGrossPrice = Number((foreignPrice.price * parseFloat(rate.rate)).toFixed(2));
            return prices;
        }
    }

    if ( nationalPrice ) {
        prices.nationalCurrency = 'RUB';
        prices.nationalNettPrice = Number((foreignPrice.net * parseFloat(nationalPrice.rate)).toFixed(2));
        prices.nationalGrossPrice = Number((foreignPrice.price * parseFloat(nationalPrice.rate)).toFixed(2));
    } else {
        nationalPrice = claimDocument.moneys.money.find(m => m.currency === 'RUB');
        if ( nationalPrice ) {
            prices.nationalCurrency = nationalPrice.currency;
            prices.nationalNettPrice = nationalPrice.net;
            prices.nationalGrossPrice = nationalPrice.price;
        }

    }

    return prices;
}

function parseService(svc) {
    return new quickBookingValue({
        description:svc.name,
        dateStart: new Date(svc.datebeg).toLocaleDateString('ru'),
        dateEnd: new Date(svc.dateend).toLocaleDateString('ru'),
        totalPrice: +svc.price,
        totalPriceCurrency: svc.currencyAlias,
    })
}

function parsePassengers() {
    const panels = $$('section [data-inputname="born"], input[data-testid="born"]').filter(panel => panel.offsetHeight > 0).map( input => input.closest('fieldset').parentNode);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: 'input[data-inputname="born"], input[data-testid="born"]',
        issueDate: 'input[data-inputname="pgiven"]',
        expire: 'input[data-inputname="pexpire"]',
        lastName: 'input[name="lnamelat"]',
        firstName: 'input[name="namelat"]',
        nationality: 'input[data-inputname="nationalityKey"]',
        serial: 'input[name="pserie"]',
        number: 'input[name="pnumber"]',
        email: 'input[name="email"]',
    }), panel);
    const docTypeText = getNodeData('[data-testid="identity_document"]', panel, 'value');
    if ( docTypeText === 'Заграничный паспорт' ) {
        passenger.docType = 'internationalPassport';
    }
    if ( docTypeText === 'Свидетельство о рождении' ) {
        passenger.docType = 'birthdayCertificate';
    }
    if ( docTypeText === 'Паспорт' ) {
        passenger.docType = 'nationalPassport';
    }

    const sexText = getNodeData('[name="sex"]:checked', panel, "value");
    if ( sexText === 'FEMALE' ) {
        passenger.sex = "2"
    }
    if ( sexText === 'MALE' ) {
        passenger.sex = "1"
    }
    passenger.nationality = getNodeData('[data-testid="nationalityKey"]', panel, 'value')
    return passenger;
}
