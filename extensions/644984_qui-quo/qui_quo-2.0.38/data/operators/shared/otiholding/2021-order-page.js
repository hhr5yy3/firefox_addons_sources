window.OPERATOR_NAME = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";
window.OPERATOR_CURRENCY = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";
window.CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
window.DEFAULT_CURRENCY = "RUB";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    injectCurrencySelectionUtil(".wisard-link ul", window.OPERATOR_CURRENCY, window.CURRENCY_SELECTION_STYLE, "margin-top:-3px;font-size: 12px", "display: flex;margin-bottom:5px;");
    $$(".flight-list-box").forEach(box => $$('.btn.green.small, .flights-price-box .price', box).forEach(createFlightCell));
    if ( !window.location.href.match("/reservation/tourpackage/flight[^?]") ) {
       createPackageCell($1('.confirmation .middle-row.custom-row'));
    }
}

function createFlightCell(div) {
    if ( !div || !div.querySelector(".qq") ) {
        div.style.position = "relative";
        const newDiv = document.createElement("div");
        div.previousElementSibling.style.marginBottom = '25px';
        newDiv.classList.add('qq', 'qq-container');
        newDiv.style.position = 'absolute';
        newDiv.style.minWidth = '100px';
        newDiv.style.top = '-25px';
        newDiv.append(qqBtns({align: "qq-horizontal"}));
        div.append(newDiv);
    }
}

function createPackageCell(div) {
    const fullInfo = JSON.parse(sessionStorage.getItem(`tourPackage_${getParameterByName("s")}`)) || JSON.parse(sessionStorage.getItem(`onlyHotel_${getParameterByName("s")}`));
    const reservation = fullInfo ? fullInfo.reservationDetailWithServices : null;
    if ( div && !div.querySelector(".qq") ) {
        const newDiv = document.createElement("div");
        newDiv.classList.add('qq', 'qq-container');

        const container = createQQContainer('margin-left: 8px;', null, createServicesOption);
        const btn = container.querySelector('.qq-export-button');
        btn ? btn.classList.add('btn') : null;
        container.style.maxWidth = '200px';
        newDiv.append(container);
        if ( !reservation ) {
            btn.remove();
        }
        div.append(newDiv);
    }
}

function createServicesOption(img) {
    const option = getSessionStorageOption(img, true);
    option.boardType = getNodeProperty(findElementInDOM('Питание')) || option.boardType;
    option.roomType = getNodeProperty(findElementInDOM('Номер')) || option.roomType;
    return updatePrices(option, img);
}

async function updatePrices(option, img) {
    try {
        if ( img.classList.contains('qq-rating-btn') ) {
            return option;
        }
        const [_, type, param] = (window.location.href.match(/reservation\/(tourpackage|onlyhotel|excursion|onlyflight)\/(services|tourists)/)) || ['', 'tourpackage', 'services'];
        const id = getParameterByName("s");
        const text = await fetchTimeout(5000, fetch(`https://${window.location.hostname}/reservation/${type}/${param}/ReturnSummary?s=`+ id, {
            "headers": {
                "accept": "*/*",
            },
            "method": "GET"
        })).then(resp => resp.text());
        const parser = new DOMParser();
        let doc = parser.parseFromString(text, "text/html");
        if ( !doc ) {
            return option;
        }


        if ($$('h2.title', doc).length === 0 || $$('.price', doc).length === 0 ) {
            doc = document;
        }
        const nationalPrice = $$('h2.title', doc)
            .map(extractPrice)
            .filter(s => s.currency.match(/RUB/));
        const interPrice = $$('.price', doc)
            .map(extractPrice)
            .filter(s => s.currency.match(/USD|EUR/));

        const foreignGrossPrice = (interPrice.find(s => s.title.match(/Полная\s+стоимость/)) || {}).price;
        const nationalGrossPrice = (nationalPrice.find(s => s.title.match(/Полная\s+стоимость/i)) || {}).price

        const prices = new Prices({
            foreignGrossPrice: foreignGrossPrice,
            foreignNettPrice: foreignGrossPrice - (interPrice.find(s => s.title.match(/СУММА\s+КОМИССИЯ/i)) || {}).price,
            foreignCurrency: (interPrice.find(s => s.title.match(/Полная\s+стоимость/i)) || {}).currency,
            nationalGrossPrice,
            nationalNettPrice: nationalGrossPrice - (nationalPrice.find(s => s.title.match(/СУММА\s+КОМИССИЯ/i)) || {}).price,
            nationalCurrency: (nationalPrice.find(s => s.title.match(/Полная\s+стоимость/i)) || {}).currency,
        });

        const currentPrice = isPrefferedDefaultCurrencyUtil() ? nationalPrice : (interPrice.length > 0 ? interPrice : nationalPrice );
        option.price = parseInt((currentPrice.find(s => s.title.match(/Полная\s+стоимость/)) || currentPrice.find(s => s.title.match(/^Стоимость/))).price);
        option.currency = (currentPrice.find(s => s.title.match(/Полная\s+стоимость/)) || currentPrice.find(s => s.title.match(/^Стоимость/))).currency;
        option.prices = prices;
        return option;
    } catch(e) {
        console.log(e)
        return option;
    }
}

function extractPrice(node) {
    const title = getNodeProperty(node.parentNode.querySelector('.small-head'));
    const price = trim(getText(node));
    const currency = price.replace(/[^A-Z]/g, '');
    return {
        title,
        price: +(price.replace(/\s+|[A-z]*/g, '')),
        currency
    }
}

async function createOption(img, isForQuickBooking) {
    if ( isForQuickBooking )  {
        return createServicesOption(img);
    }
    const flightCard = img.closest('.flight-grey-box, .flight-list-box-item');

    const option = getSessionStorageOption();
    const priceNode = getText(findPriceNode(img)).replace(/\s+/g, '');
    const flight = getFlight(flightCard);

    calculateDatesWithFlight(option, flight);
    option.href = null;
    option.price= extractIntFromStr(priceNode);
    option.currency= mapCurrencyUtil(priceNode.replace(/\d+|\.|\s+/g, ''));
    option.operator = OPERATOR_NAME;
    option.flight = flight;
    option.city_from = getCityFromFlight(flight) || option.city_from || "";
    option.boardType = getNodeProperty(findElementInDOM('Питание')) || option.boardType;
    option.roomType = getNodeProperty(findElementInDOM('Номер')) || option.roomType;

    return option;
}

function findElementInDOM(caption) {
    try {
        const xpathString = `//p/span[contains(text(), "${caption}")]`;
        const element = getElementByXpath(xpathString);
        if (element) {
            return element.parentNode.nextElementSibling
        }
    } catch(e) {
        console.log(e);
        return null;
    }
}

function findPriceNode(img) {
    let div = img.closest('.qq.qq-container');
    while (div) {
        if ( div.classList.contains('price') ) {
            return div;
        }
        if (div.closest('.price')) {
            return div.closest('.price').querySelector('label');
        }
        div = div.previousElementSibling;
    }
    return null;
}

function getFlight(flightCard) {
    try {
        const detailBox = flightCard.nextElementSibling;
        const sectors = $$('.flightEqualColumn', detailBox).map(parseSector);
        return {sectors};
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
   const segments = chunkArray($$('.direction-box:not(.air)', sector), 2).map(parseSegments);
   return {segments};
}

function parseSegments(heads) {
    const [dep, arr] = heads.map(div => div.parentNode.querySelector('.direction-info')).map(info => $$('span', info).map(s=>getText(s)) )
    return new FlightSegment({
        flightNumber: dep[5] || arr[5],
        airline: dep[4] || arr[4],
        departureDate: appendYear(...(dep[1]).split('.')),
        departureTime: dep[0],
        departureAirport: dep[3],
        departureAirportID: dep[2],
        arrivalDate: appendYear(...(arr[1]).split('.')),
        arrivalTime: arr[0],
        arrivalAirport: arr[3],
        arrivalAirportID: arr[2],
    })

}

function parseSegmentDescription(description) {
    const spans = $$('span', description).map(sp => getText(sp, 'innerText'));
    const flightNumber = (spans[0].match(getRegexPatterns().flightNumber) || "")[0];
    const plane = spans[1];
    return {flightNumber, plane};
}

// function extractHotelInfo(hotel) {
//     const patterns = getRegexPatterns();
//     const hotelPs = $$('li p', hotel);
//     const hotelPsText = hotelPs.map(p => getText(p));
//
//     const hotelName = extractHotelName(hotelPs[1]);
//     const roomType = [hotelPsText[3], hotelPsText[9]].join(', ');
//     const boardType = hotelPsText[5];
//     const checkinDt = hotelPsText[7].match(patterns.date)[0];
//     const nightsText = hotelPsText[7].match(/(\d+)\s*\/\s*(\d+)/);
//     const nights = nightsText[2] || nightsText[1];
//     const extra_nights= (nightsText[1] - (nightsText[2] || nightsText[1])).toString();
//     return {hotelName, roomType, boardType, checkinDt, nights, extra_nights}
// }

function extractHotelName(hotel) {
   const caption = getText(hotel);
   const stars = $$('.scoring span', hotel).length;
   return `${caption}${stars > 0 ? ' '+ stars+'*' : ''}`
}

function getTourElements() {
     const elements = $$('.confirmation.combined .col-md-3');
     const findElem = (el, text) => getNodeProperty(el.querySelector('.title')).match(text)
     const hotel = elements.find(el=> findElem(el,/проживание/i));
     const flight = elements.find(el=> findElem(el,/Перелет/i));
     const supplements = elements.find(el=> findElem(el,/Услуги/i));
     const passengers = elements.find(el=> findElem(el,/Туристы/i));
     return { hotel,flight,supplements,passengers }

}

function getHotelRowByImage(img) {
    return img.closest('.flight-grey-box');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const sessionId = getParameterByName("s");

    let fullInfo = (await fetchTimeout(7000, requestToCoralApi(`/product/GetTourPackageDetailsForHeader?sessionId=${sessionId}`))
            .then( r => r.reservationDetailWithServices ? r : null ).catch(_ => null)) ||
        JSON.parse(sessionStorage.getItem(`tourPackage_${sessionId}`)) ||
        JSON.parse(sessionStorage.getItem(`onlyHotel_${sessionId}`));
    const tourOptions = await createOption(button, true)

    const reservation = fullInfo.reservationDetailWithServices.reservation;



    const transfers = reservation.reservationTransferServices
        .filter(rsv => rsv.selected && rsv.transferDirection !== 0)
        .flatMap(t => parseTransfers(t, tourOptions));

    const insurance = reservation.reservationInsuranceServices
        .filter(rsv => rsv.selected)
        .map((svc) =>parseInsurance(svc, tourOptions));

    const other = reservation.reservationExtraServices
        .filter(rsv => rsv.selected)
        .map(parseExtraServices);

    const services = {
        tourOptions,
        flightType: tourOptions.flightType,
        insurance,
        transfers,
        other,
        notes: [reservation.note]
    };
    return services;
}

function parseTransfers(svc, tourOptions) {
    const pCount = svc.nonInfantTouristCount + svc.infantTouristCount;
    const twoWay = svc.transferDirection === 3;
    const points = [svc.fromPointName, svc.toPointName];
    const transfer = new quickBookingValue({
        dateStart: new Date(svc.transferDate).toLocaleDateString('ru'),
        caption: svc.transferName,
        totalPrice: svc.salePrice,
        totalPriceCurrency: svc.saleCurrencyName,
        passengers: {
            adults: svc.nonInfantTouristCount || 0,
            infants: svc.infantTouristCount || 0,
            count: pCount
        }
    })

    if ( !twoWay ) {
        const oneWayTransfer = Object.assign({}, transfer);
        oneWayTransfer.description = svc.transferName + ': ' + points.join(' -> ');
        return oneWayTransfer;
    }
    const firstWay = Object.assign({}, transfer);
    const secondWay = Object.assign({}, transfer);

    firstWay.description = svc.transferName + ': ' + points.join(' -> ');
    secondWay.description = svc.transferName + ': ' + points.reverse().join(' -> ');
    secondWay.dateStart = addDaysToStringDate(tourOptions.dateStart, tourOptions.nights)
    return [firstWay, secondWay]
}

function parseInsurance(svc, tourOptions) {
    const pCount = svc.nonInfantTouristCount + svc.infantTouristCount;
    let dateStart = new Date(svc.beginDate).toLocaleDateString('ru');
    let dateEnd = new Date(svc.endDate).toLocaleDateString('ru');
    if ( dateStart === '01.01.1' ) {
      if (svc.longName.match(/невыезд/i)) {
          dateStart = new Date().toLocaleDateString('ru');
      }
        dateStart = tourOptions.dateStart;
    }

    if (dateEnd === '01.01.1') {
        if (svc.longName.match(/невыезд/i)) {
            dateEnd = tourOptions.dateStart;
        }
        dateEnd = addDaysToStringDate(tourOptions.dateStart, tourOptions.nights)
    }


    return new quickBookingValue({
        description: svc.longName,
        dateStart,
        dateEnd,
        totalPrice: svc.salePrice,
        totalPriceCurrency: svc.saleCurrencyName,
        passengers: {
            adults: svc.nonInfantTouristCount || 0,
            infants: svc.infantTouristCount || 0,
            count: pCount
        }
    })
}

function parseExtraServices(svc) {
    const pCount = svc.nonInfantTouristCount + svc.infantTouristCount;
    return new quickBookingValue({
        description: svc.extraServiceName,
        dateStart: new Date(svc.extraServiceDate).toLocaleDateString('ru'),
        totalPrice: svc.salePrice,
        totalPriceCurrency: svc.saleCurrencyName,
        passengers: {
            adults: svc.nonInfantTouristCount || 0,
            infants: svc.infantTouristCount || 0,
            count: pCount
        }
    })
}

function parsePassengers() {
    const panels = querySelectorAll(document, ".tourist-list").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const lies = $$('li', panel);
    const findLiByLabel = (label)=> lies.find( li => getNodeProperty(li.querySelector('.header'), '').match(label));
    const getLiTitleBylLabel = (label)=> getNodeProperty(findLiByLabel(label).querySelector('.title'), '');
    const [firstName, lastName] = getLiTitleBylLabel(/ФАМИЛИЯ/i).split(/\s+/);
    const passenger = new Passenger({
            birthday: getLiTitleBylLabel(/рождения/i).replace(/\D/g, '.'),
            issueDate: getLiTitleBylLabel(/ВЫДАЧИ/i).replace(/\D/g, '.'),
            expire: getLiTitleBylLabel(/СРОК ДЕЙСТВИЯ/i).replace(/\D/g, '.'),
            lastName,
            firstName,
            serial: getLiTitleBylLabel(/^Серия$/i),
            number: getLiTitleBylLabel(/^Номер$/i),
            authority: getLiTitleBylLabel(/ВЫДАВШИЙ ДОК/i),
            email: getLiTitleBylLabel(/EMAIL|ЭЛЕКТРОННАЯ ПОЧТА/i)
        }, panel);
    return passenger;
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const storageOption = getSessionStorageOption(null, true);
        if ( storageOption ) {
            return storageOption.passengers;
        }

        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {accommodation} = tourOptions;

        passengersCount.adults = Number((accommodation.match(/(\d+)\s*ADL/) || [0, 0])[1]);
        passengersCount.children = Number((accommodation.match(/(\d+)\s*CHD/) || [0, 0])[1]);
        passengersCount.infants = Number((accommodation.match(/(\d+)\s*INF/) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
