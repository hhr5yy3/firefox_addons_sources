window.OPERATOR_NAME = "Anex";
window.showTopHotelsRating = true;
window.API_HOSTS = {
    'agent.anextour.kg': 'webapi.anextour.kg',
    'agent.anextour.com': 'api.anextour.com',
    'agent.anextour.ru': 'api.anextour.ru',
    'agent.anextour.kz': 'webapi.anextour.kz',
    'agent.anextour.uz': 'webapi.anextour.uz',
    'www.anextour.com': 'api.anextour.com',
    'agent.anextour.by': 'webapi.anextour.by',
    'redesign-anexweb.vercel.app': 'api.anextour.com'
}
window.qscript = document.createElement("script");
window.qscript.src = chrome.runtime.getURL('data/operators/anex/inline_script_search.js');
document.head.append(window.qscript);
function initializeSearchCriteria() {
    const country = getNodeProperty(document.querySelector('[name="STATEINC"], [data-inputname="STATEINC"], [data-testid="STATEINC"]'), '', 'value');
    const city_from = getNodeProperty(document.querySelector('[name="TOWNFROMINC"], [data-inputname="TOWNFROMINC"], [data-testid="TOWNFROMINC"]'), '', 'value');
    if ( !country ) {
        return null;
    }
    return {
        country,
        city_from
    };
}

function getSearchButton() {
    return document.querySelector('#button-search-anchor');
}

function injectData() {

    querySelectorAll(document, 'a[href*="booking\/tour"]:not(.qq-cloned-buy-btn), a[href*="booking\/hotel"]:not(.qq-cloned-buy-btn), a[href*="booking\/cruise"]:not(.qq-cloned-buy-btn)').forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && !getText(div).match(/от/i) ) {
            const btns = qqBtns({align: "qq-box"}, createSearchOption);
            btns.style.marginLeft = '5px';
            const claimBtnClone = div.cloneNode();
            claimBtnClone.className = '';
            claimBtnClone.classList.add('qq-cloned-buy-btn')
            btns.append(claimBtnClone);
            claimBtnClone.style.display = 'none';
            div.after(btns);
        }
    });

    $$('button[value]').map(btn => btn.closest('ul')).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            createCell(div);
        }
    });

}

async function createSearchOption(img) {
    if ( img.classList.contains('qq-rating-btn') ) {
       return createOptionForRatings(img);
    }
    const tour = getHotelRowByImage(img);
    const cookieString = (document.cookie.split('; ').filter((row) => (row.startsWith('USER_TOKEN') || row.startsWith('ANEX_AUTH_TOKEN')) && !row.startsWith('USER_TOKEN_FEEDBACK'))).reverse()[0]
    const userToken = cookieString ? cookieString.split('=')[1] : null;  const claimNumBtn = tour ? tour.querySelector('a[href*="booking\/tour"], a[href*="booking\/hotel"], a[href*="booking\/cruise"]') : img.closest('.qq-box').querySelector('.qq-cloned-buy-btn');
    if ( !claimNumBtn ) {
        throw new QuiQuoError('Claim button not found', 'Не найдена цена для тура.')
    }

    const claim = claimNumBtn.href.match(/claim=(.+)/)[1];
    const timestamp = (new Date).valueOf();

    let params = new FormData();
    params.append("cat_claim", claim);
    params.append("id", timestamp.toString());
    params.append("currency", '3');
    const firstLevelDomain = window.location.hostname.split('.').reverse()[0];
    const result = await fetchTimeout(120000, fetch(`https://${API_HOSTS[location.hostname] || 'api.anextour.com'}/bron/start`, {
        headers: {
            "authorization": userToken ?  "Bearer "+ userToken : '',
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
    })).then(resp => resp.json()).catch(e => ({error: true, message: e.message}));
    if ( result.error === true ) {
        throw new QuiQuoError(result.message, 'Невозможно добавить тур. Нет ответа от оператора')
    }

    if ( !result ) {
        if (claimNumBtn && claimNumBtn.dataset.qqOption) {
            return createOptionFromAttribute(claimNumBtn);
        }

    }
    if ( !result.bron ) {
        throw new QuiQuoError(JSON.stringify(result), 'Тур недоступен для бронирования, попробуйте выбрать другой.')
    }
    const claimDocument = result.bron.claim.claimDocument;
    const dateStart = new Date(claimDocument.datebeg);
    const priceObj = claimDocument.moneys.money.find( m => m.currency === 'RUB' ) || claimDocument.moneys.money[0];
    let option = {
        checkinDt: dateStart.toLocaleDateString('ru'),
        nights: claimDocument.hnights || claimDocument.nights,
        extra_nights: claimDocument.nights ? (claimDocument.nights - (claimDocument.hnights || claimDocument.nights)).toString() : "0",
        href: null,
        price: +priceObj.cost,
        currency: priceObj.currency,
        city_from: claimDocument.townFrom || "",
        operator: OPERATOR_NAME,
        occupancy: getOccupancy(claimDocument) || getOccupancyClaim(claimDocument)
    };

    if (Array.isArray(claimDocument.hotels.hotel) ) {
        extractMultiHotels(option, claimDocument)
    } else {
        extractSingleHotel(option, claimDocument);
    }

    const priceText = getNodeProperty(tour.querySelector('.button-text-purple') || claimNumBtn);
    if (priceText ) {
        option.price = extractIntFromStr(priceText.replace(/\D+/g, ''));
        option.currency = mapCurrencyUtil(priceText.replace(/\d+|\s+/g, ''));
    }
    return option;
}

function extractSingleHotel(option, claimDocument) {
    Object.assign(option, {
        hotelName: [claimDocument.hotels.hotel.name, claimDocument.hotels.hotel.star].join(' '),
        country: claimDocument.hotels.hotel.state,
        region: claimDocument.hotels.hotel.town,
        roomType: claimDocument.hotels.hotel.room,
        boardType: claimDocument.hotels.hotel.meal,
        accommodation: claimDocument.hotels.hotel.htplace
    })
}

function extractMultiHotels(option, claimDocument) {
    const obj = {
        hotelName: claimDocument.hotels.hotel.map(hotel => [hotel.name, hotel.star].join(' ')).join(' / '),
        country: (claimDocument.hotels.hotel).map(hotel => hotel.state).join(' / '),
        region: (claimDocument.hotels.hotel).map(hotel => hotel.town).join(' / '),
        roomType: (claimDocument.hotels.hotel).map(hotel => hotel.room).join(' / '),
        boardType: (claimDocument.hotels.hotel).map(hotel => hotel.meal).join(' / '),
        accommodation: (claimDocument.hotels.hotel).map(hotel => hotel.htplace).join(' / '),

    }
    Object.assign(option, obj)
}

function getOccupancyClaim(claimDocument) {
    try {
       return {adultsCount: +claimDocument.adult, childrenCount: +claimDocument.child + +claimDocument.infant}
    } catch(e) {
        return null;
    }
}

function createOptionForRatings(img) {
    const tour = getHotelRowByImage(img);
    let hotelNode = $1('[data-hotelinc]', tour);
    let hotelCaption = getNodeData('[data-hotelinc]', tour);
    let option = {
        checkinDt: "01.01.1970",
        nights: "0",
        hotelName: hotelCaption,
        country: SEARCH_CRITERIA.country,
        region: (               getNodeProperty(hotelNode.parentNode.querySelector('[class*="text-carbon"]'), '')).split(/\s*\(/)[0],
        operator: OPERATOR_NAME
    };
    return option;
}

function createOptionFromAttribute(claimNumBtn) {
    const buyBtn = claimNumBtn;
    let option = JSON.parse(buyBtn.dataset.qqOption);
    const priceText = getText(buyBtn);
    option.operator = OPERATOR_NAME;
    option.price = extractIntFromStr(priceText.replace(/\D+/g, ''));
    option.currency = mapCurrencyUtil(priceText.replace(/\d+|\s+/g, ''));
    option.city_from = SEARCH_CRITERIA.city_from
    return option;
}

function parseHotelText(hotelNode, hotelCaption) {
    const caption = getText(hotelCaption, 'innerText');
    const stars = $$('svg', hotelNode).length;
    return stars > 0 ? `${caption} ${stars}*`: caption;
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: parseInt(getUrlSearchParameters('ADULT')),
            childrenCount: 0,
            childAges: null
        };
        if (!occupancy.adultsCount) {
            return null;
        }

        occupancy.childrenCount = parseInt(getUrlSearchParameters('CHILD'));
        if (occupancy.childrenCount && occupancy.childrenCount > 0) {
            let ages = [];
            for (let i = 1; i < occupancy.childrenCount + 1; i++) {
                ages.push(getUrlSearchParameters('AGE' + i));
            }
            occupancy.childAges = ages.join();
        }
        return occupancy;
    } catch(e) {
        return null;
    }
}

function createAutoLoginForm(logins, manager, opts) {
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);
    button.style.width = "100%";
    button.classList.add('button-text-purple');
    wrapper.style.alignItems = "center";
    wrapper.style.padding = "10px";

    select.before(label);
    select.style.width = "100%";
    select.style.display = 'block';
    select.style.marginBottom = '5px';

    return wrapper;
}

function getHotelRowByImage(img) {
    return img.closest('li, [class*="ChildrenCardsList-module__item"], [class*="ChildrenCardsList_itemFullWidth"], .relative.bg-fog-lightest')
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        flight: tourOptions.flight,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        prices: tourOptions.prices,
        tourOperatorReference: tourOptions.tourOperatorReference,
        notes: ''
    };
    return services;
}

function parsePassengers() {
    const passengers = JSON.parse(sessionStorage.getItem('passengers'));
    return passengers.map(extractPassengerInfo);
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function extractPassengerInfo(details) {
    const passenger = new Passenger({
        birthday: new Date(details.born).toLocaleDateString('ru'),
        issueDate: new Date(details.pIssue).toLocaleDateString('ru'),
        expire: new Date(details.pValid).toLocaleDateString('ru'),
        lastName: details.name.split(/\s+/)[0],
        firstName: details.name.split(/\s+/)[1],
        nationality: details.stateName,
        serial: details.pSerie,
        number: details.pNumber,
    });
    return passenger;
}


async function createOption(img) {
    const row = img.closest('ul');
    const bookButton = row.querySelector('button[value]');
    const bookNumber = bookButton.value;
    const cookieString = (document.cookie.split('; ').filter((row) => (row.startsWith('USER_TOKEN') || row.startsWith('ANEX_AUTH_TOKEN')) && !row.startsWith('USER_TOKEN_FEEDBACK'))).reverse()[0]
    const userToken = cookieString ? cookieString.split('=')[1] : null;
    const result = await fetchTimeout(10000, fetch(`https://${API_HOSTS[location.hostname] || 'api.anextour.com'}/myoffice/claim?claim=` + bookNumber, {
        headers: {
            "authorization": "Bearer " + userToken,
            "Accept": "*/*",
            "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk;q=0.6",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://agent.anextour.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "GET",
        "mode": "cors"
    })).then(resp => resp.json());
    const claimDocument = result[0];
    const {claim, cost, hotel, insure, service, transportsObj, people, deadline, paymentList} = claimDocument;
    sessionStorage.setItem('passengers', JSON.stringify(people));
    const hotels = [hotel].flatMap(h => h).map(parseHotel);
    const insurance = insure.insureList.map(parseInsurance);
    const transfers = service.filter(svc => svc.serviceTypeName.match(/Трансфер/i)).map(parseService);
    const other = service.filter(svc => !svc.serviceTypeName.match(/Трансфер/i)).map(parseService);

    const priceObj = cost.find(m => m.currencyAlias === 'RUB') || cost[0];
    const prices = new Prices();
    const nationalPrice = cost.find(m => m.currencyAlias === 'RUB') || {};
    const foreignPrice = cost.find(m => m.currencyAlias !== 'RUB') || {};

    prices.nationalCurrency = nationalPrice.currencyAlias;
    prices.nationalNettPrice = nationalPrice.amount;
    prices.nationalGrossPrice = nationalPrice.catalog;

    prices.foreignCurrency = foreignPrice.currencyAlias;
    prices.foreignNettPrice = foreignPrice.amount;
    prices.foreignGrossPrice = foreignPrice.catalog;

    if ( deadline ) {
        deadline.forEach(line => {
            const obj = {
                date: new Date(line.pdate).toLocaleDateString('ru'),
                percent: line.percent,
                amount: line.psum
            }
            prices.addNationalPaymentToSchedule(obj);
            prices.addForeignPaymentToSchedule(obj);
        })
    }

    if ( paymentList ) {
        paymentList.forEach(payment => {
            const foreignObj = {
                date: payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('ru') : null,
                currency: payment.claim_currency_alais,
                amount: payment.paid_claim_currency
            }
            const nationalObj = {
                date: foreignObj.date,
                currency: payment.payment_currency_alais,
                amount: payment.paid_payment_currency
            }

            if ( foreignObj.currency === prices.foreignCurrency ) {
                prices.addForeignPayment(foreignObj)
            }

            if ( nationalObj.currency === prices.nationalCurrency ) {
                prices.addNationalPayment(nationalObj)
            }
        })
    }

    if ( claim[0].statusName ) {
        if ( claim[0].statusName === 'Оплачено' ) {
            prices.paidStatus = window.PAID_STASTUSES.paid;
        }
        if ( claim[0].statusName === 'Не оплачено' ) {
            prices.paidStatus = window.PAID_STASTUSES.outstanding;
        }
    }
    const flight = getFlight(transportsObj);
    return {
        hotels,
        insurance,
        transfers,
        other,
        prices,
        dateStart: new Date(claim[0].dateBeg).toLocaleDateString('ru'),
        dateEnd: new Date(claim[0].dateEnd).toLocaleDateString('ru'),
        nights: hotels && hotels.length > 0 ? hotels[0].nights : String(getDistance(new Date(claim[0].dateBeg).toLocaleDateString('ru'), new Date(claim[0].dateEnd).toLocaleDateString('ru'))),
        price: priceObj.costForCommiss,
        nettPrice: priceObj.amount,
        nettPriceCurrency: priceObj.currencyAlias,
        currency: priceObj.currencyAlias,
        operator: window.OPERATOR_NAME,
        tourOperatorReference: bookNumber,
        flight
    };
}

function parseHotel(details) {
    if ( !details ) {
        return null;
    }
    return {
        dateStart: new Date(details.dateBeg).toLocaleDateString('ru'),
        dateEnd: new Date(details.dateEnd).toLocaleDateString('ru'),
        nights: details.nights,
        hotelName: [details.hotelName, details.starName].join(' '),
        roomType: details.roomName,
        accommodation: details.htPlaceName,
        boardType: [details.mealName, details.mealNote].join(', '),
        region: details.townName,
        country: details.stateName
    }
}

function parseInsurance(details) {
    return new quickBookingValue({
        description: details.insureName,
        dateStart: new Date(details.dateBeg).toLocaleDateString('ru'),
        dateEnd: new Date(details.dateEnd).toLocaleDateString('ru')
    })
}

function parseService(svc) {
    return new quickBookingValue({
        description: svc.serviceName,
        dateStart: new Date(svc.dateBeg).toLocaleDateString('ru'),
        dateEnd: new Date(svc.dateEnd).toLocaleDateString('ru')
    })
}


function getFlight(transports) {
    try {
        const sectors = [transports].flatMap(t => t).map(parseSector);
        return {sectors}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    const segments = [sector.details].flatMap(seg => seg).map(seg => parseSegment(sector, seg));
    return {segments};
}

function parseSegment(sector, seg) {
    return new FlightSegment({
        flightNumber: seg.flight_number,
        airline: seg.full_airline,
        travelTime: seg.SegmentDuration,
        plane: seg.TransportName,
        departureDate: seg.depart_datetime.match(getRegexPatterns().date)[0],
        departureTime: seg.depart_time,
        departureAirport: seg.departureAirportName,
        departureAirportID: seg.departureAirportCode,
        serviceClass: seg.class,
        arrivalDate: seg.arrival_datetime.match(getRegexPatterns().date)[0],
        arrivalTime: seg.arrival_time,
        arrivalAirport: seg.arrivalAirportName,
        arrivalAirportID: seg.arrivalAirportCode,
        baggage: seg.bagage,
    })
}


function createCell(div) {
    const {container, exportButton} = createQuickBookingContainer();
    const img = container.querySelector('img');
    const addBtns = container.querySelector('.qq-box');

    exportButton.style.cssText = `
                                    
                                        background: none;
                                        border: none;
                                        padding: 0;
                                        font-size: 14px;
                                        margin-left: 8px;
                                        color: rgb(72 56 209/var(--tw-text-opacity));
                                        text-decoration: underline;
                                        cursor: pointer;
                                     
                                        text-wrap: auto;`

    img.remove();
    addBtns.style.display = 'none';
    container.style.cssText = ` margin-top:-20px;`
    div.append(container);
}
