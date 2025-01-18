window.OPERATOR_NAME = "PAC GROUP";

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
    $$(".js-order-header").forEach(div => {
        if ( !document.body.querySelector(".qq") ) {
            document.body.append(createCell());
        }
    });
}

function createCell() {
    const container = createQQContainer();
    const btns = container.querySelector('.qq-box');
    btns.style.display = 'none';
    container.style.position = "fixed";
    container.style.top = "5%";
    container.style.right = "5%";
    container.style.maxWidth = "200px";
    container.style.zIndex = "999999999";
    container.style.backgroundColor = "white";
    container.style.justifyContent = "center";
    return container;
}

async function createOption(img) {
    const order = getHotelRowByImage(img);

    const priceNode = order.querySelector(".lk-order-cost");

    const grossPriceNode = priceNode.querySelector(".gross .js-money");
    const nettPriceNode = priceNode.querySelector(".cost._price .js-money");

    const prices = new Prices();

    const nettPriceType = mapPriceType(nettPriceNode.dataset.moneyCurrent);
    const grossPriceType = mapPriceType(grossPriceNode.dataset.moneyCurrent);

    prices[`${nettPriceType}`].nett = parseFloat(nettPriceNode.dataset.moneyAmount);
    prices[`${nettPriceType}`].currency = grossPriceNode.dataset.moneyCurrent;

    prices[`${grossPriceType}`].gross = parseFloat(grossPriceNode.dataset.moneyAmount);
    prices[`${grossPriceType}`].currency = grossPriceNode.dataset.moneyCurrent;

    const allServices = $$('.order-service.js-order-service', order).filter(s => !s.closest('.js-order-canceled-services'))
        .map(node => ({node, title: getNodeProperty(node.querySelector('.order-service__title'), '')}));
    let hotels = await  getHotelsInfo(allServices.filter(svc => svc.title.match(/размещение/i)));

    const insurance = allServices.filter(svc => svc.title.match(/страховка/i)).map(s => parseService(s));
    const transfers = allServices.filter(svc => svc.title.match(/трансфер/i)).map(s => parseService(s));
    const flights = await getFlights(allServices.filter(svc => svc.title.match(/Авиа/i)));
    const other = allServices.filter(svc => !svc.title.match(/трансфер|страховка|проживание|Состав|Авиа|отель|размещение/i)).map(s => parseService(s));
    if ( hotels.length === 0 ) {
        hotels = allServices.filter(svc => svc.title.match(/отель/i)).map(s => parseTextHotel(s));
    }

    hotels[0] = hotels[0] || {};
    let option = {
        checkinDt: hotels[0].dateStart,
        dateStart: hotels[0].dateStart,
        dateEnd: hotels[0].dateEnd,
        nights: hotels[0].nights,
        hotelName: hotels[0].hotelName,
        href: hotels[0].href,
        country: hotels[0].country,
        region: hotels[0].region,
        roomType: hotels[0].roomType,
        boardType: hotels[0].boardType,
        price: prices.nationalGrossPrice || prices.foreignGrossPrice,
        currency: prices.nationalCurrency || prices.foreignCurrency,
        hotels,
        prices,
        insurance,
        transfers,
        other,
        operator: window.OPERATOR_NAME,
        flight: flights ? flights[0] : null,
        flights
    };
    return option;
}

function parseTextHotel(hotel) {
    const node = hotel.node;
    const [dateStart, dateEnd] = getNodeProperty(node.querySelector('._dates'), '').split(/\s*—\s*/);
    const description = getNodeData('.order-service__descr', node);
    const [region, hotelName, nightsTxt, roomType, accommodation, boardType] = description.split(/\s*\/\s*|,/)
    const country = findCountry(region)
    return {
        nights: nightsTxt.replace(/\D+/g, ''),
        country,
        region, hotelName, roomType, accommodation, boardType,
        dateStart,
        dateEnd
    }
}

async function getHotelsInfo(hotels) {
    let parsedHotels = [];
    for (const hotel of hotels ) {
         const parsedHotel = await parseHotel(hotel);
         parsedHotels.push(parsedHotel);
    }
    return parsedHotels;
}

async function parseHotel(hotel) {
    const hotelNode = hotel.node;
    const bookingNumber = hotelNode.dataset.bookingNumber;
    const item = await getOrderBooking(bookingNumber);
    const description = hotelNode.querySelector(".order-service__descr");
    const hotelName = description.querySelector('a');
    const stars = hotelName.className.match(/stars-(\d)/);
    hotelName.style.cssText = 'display: none!important';
    const region = description.innerText.split(/,\s*/);
    hotelName.style.cssText = '';
    const [dateStart, dateEnd] = getNodeProperty(hotelNode.querySelector('._dates'), '').split(/\s*—\s*/);
    return {
        dateStart,
        dateEnd,
        nights: getDistance(dateStart, dateEnd).toString(),
        hotelName: getText(hotelName) + (stars ? ' '+stars[1] : ''),
        href: getNodeProperty(hotelName, null, "href"),
        country: region[0],
        region: region.slice(1).join(', '),
        boardType: item.board,
        roomType: item.room.category,
        accommodation: [item.room.adultCount, item.room.childCount, item.room.infantCount].filter(t=>t).join(',')
    }

}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

async function getOrderBooking(bookingNumber) {
    const response = await fetch("https://www.pac.ru/my/order/getorderbooking/", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": `number=${bookingNumber}`,
        "method": "POST"
    });
    const json = await response.json().catch(console.log);
    return json ? json.data.item.services[0] : {};
}

async function getFlights(array) {
   try {
     const flights = [];
     for ( const flight of array ) {
         const bookingNumber = flight.node.dataset.bookingNumber;
         const item = await getOrderBooking(bookingNumber);
         flights.push(item);
     }
      return flights.map(parseFlight);
   } catch (e) {
       return null;
   }
}

function parseFlight(flight) {
    const sectors = flight.legs.map(parseSector);
    return {sectors}
}

function parseSector(sector) {
    return {segments: sector.segments.map(parseSegment)};
}

function parseSegment(segment) {
    return new FlightSegment({
        flightNumber: segment.airlineCode + segment.flightNumber,
        airline: segment.airlineName,
        plane: segment.aircraftName,
        travelTime: segment.duration,
        departureDate: new Date(segment.date).toLocaleDateString('ru'),
        departureTime: new Date(segment.date).toLocaleTimeString("ru", {timeZone: 'UTC'}),
        departureCity: segment.cityName,
        departureAirport: segment.airportName,
        departureAirportID: segment.airportCode,
        serviceClass: segment.serviceClass,
        arrivalDate: new Date(segment.endDate).toLocaleDateString('ru'),
        arrivalTime: new Date(segment.endDate).toLocaleTimeString("ru", {timeZone: 'UTC'}),
        arrivalCity: segment.endCityName,
        arrivalAirport: segment.endAirportName,
        arrivalAirportID: segment.endAirportCode,
    })
}


function parseService(svc) {
    const node = svc.node;
    const [dateStart, dateEnd] = getNodeProperty(node.querySelector('._dates'), '').split(/\s*—\s*/);
    if ( getText(node).match(/аннулирован/i) ) {
        return null;
    }
    return new quickBookingValue({
        description: [getNodeProperty(node.querySelector('.order-service__title')), getNodeProperty(node.querySelector('.order-service__descr'))].filter(s=>s).join(', '),
        dateStart,
        dateEnd
    })
}

function getHotelRowByImage(img) {
    return document.querySelector('.js-app-container-content .main-block__wrapper.user-content');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        tourOptions,
        prices: tourOptions.prices,
        nettPrice: tourOptions.prices.nationalNettPrice || tourOptions.prices.foreignNettPrice,
        nettPriceCurrency: tourOptions.prices.nationalCurrency || tourOptions.prices.foreignCurrency
    };
    return services;
}

function parsePassengers() {
    const panels = $$(".lk-order-tourist.js-order-tourist");
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const [lastName, firstName] = getNodeProperty(panel.querySelector('.lk-order-tourist__person-name'), '').split(/\s+/);
    const passportNode = panel.querySelector('._passport');
    const dates = $$('span', passportNode);
    const [serial, number] = getNodeProperty(passportNode.firstChild, '').split(/\D+/);

    const passenger = new Passenger({
        birthday: getNodeProperty(panel.querySelector('._birth')),
        issueDate: getNodeProperty(dates[0], '').replace(/[^.0-9]/g, ''),
        expire: getNodeProperty(dates[1], '').replace(/[^.0-9]/g, ''),
        lastName,
        firstName,
        serial,
        number,
        phone: getNodeProperty(panel.querySelector('._phone'), '').replace(/\D+/g, '')
    })
    passenger.docType = passenger.parseDocType(passenger)
    return passenger;
}
