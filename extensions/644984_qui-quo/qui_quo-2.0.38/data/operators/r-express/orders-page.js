window.OPERATOR_NAME = "Онлайн Экспресс";
window.showTopHotelsRating = false;
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".order-item").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const container = createQQContainer('zoom: 0.9');
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
            div.append(container);
        }
    });
}

async function createOption(img) {

    const tour = getHotelRowByImage(img);
    const url = getNodeData('.order-item-info_number a', tour, 'href');
    const pageText = sessionStorage.getItem(url) ||  await fetch(url).then(r => r.text());
    sessionStorage.setItem(url, pageText)
    const parser = new DOMParser();
    const page = parser.parseFromString(pageText, 'text/html');

    const services = $$('.order-info_service', page).map(parseService)
    if ( services.length === 0 ) {
         throw new QuiQuoError('Дополнительные сведения отсутствуют.', 'В заявке нет активных услуг!');
    }
    const insurance = services.filter(svc => svc.caption.match(/страхов/i) )
    const flightSvc = services.filter(svc => svc.caption.match(/Авиа/i));
    const flight = getFlight(flightSvc)
    const hotels = services.filter(svc => svc.caption.match(/Отель/i)).map((svc) => parseHotel(svc, flight, insurance))

    const transfers = services.filter(svc => svc.caption.match(/Трансфер/i));
    const cachedPassengers = extractPassengers(page, hotels[0], insurance[0], flightSvc);
    const prices = new Prices();
    const [nettPriceNode, grossPriceNode] = $$('.price-details_row:last-child div', page)
        .filter(node => getText(node).match(/\d/))
        .map( parsePriceNode )

    const firstPriceType = nettPriceNode && nettPriceNode.firstPrice.currency ? mapPriceType(nettPriceNode.firstPrice.currency) : null;
    const secondPriceType = nettPriceNode && nettPriceNode.secondPrice.currency ? mapPriceType(nettPriceNode.secondPrice.currency) : null;

    if ( firstPriceType ) {
        prices[`${firstPriceType}`].gross = grossPriceNode.firstPrice.price;
        prices[`${firstPriceType}`].nett = nettPriceNode.firstPrice.price;
        prices[`${firstPriceType}`].currency = nettPriceNode.firstPrice.currency;
    }
    if ( secondPriceType ) {
        prices[`${secondPriceType}`].gross = grossPriceNode.secondPrice.price;
        prices[`${secondPriceType}`].nett = nettPriceNode.secondPrice.price;
        prices[`${secondPriceType}`].currency = nettPriceNode.secondPrice.currency;
    }
    const dateStart = (hotels && hotels.length > 0 ? hotels[0].dateStart : null) ||
                      optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureDate']) ||
                      services.find(svc => svc.dateStart).dateStart;
    const dateEnd = (hotels && hotels.length > 0 ? lastElement(hotels).dateEnd : null)||
       getFlightReturnDate(flight) ||
        services.find(svc => svc.dateStart).dateStart;


    let option = {
        dateStart,
        dateEnd,
        nights: String(getDistance(dateStart, dateEnd)),
        insurance,
        hotels,
        transfers,
        cachedPassengers,
        prices,
        flight,
        tourOperatorReference: getNodeData('.order-item-info_number', tour)
    };
    return option;
}

function getFlight(services) {
    try {
        if ( !services || services.length === 0 ) {
            return null;
        }

        const sectors = services.flatMap(svc => $$('.order-info_flight', svc.node)).map(parseSector)
        return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}

function extractPassengersFromFlight(flightSvc) {
    console.log({flightSvc})
    const node = flightSvc.node;
    const rows = $$('.order-info_tourists-row', node);
    if ( rows.length === 0 ) {
        return null;
    }
    return $$('.order-info_tourists-row', node).map(extractFlightPassenger)
}

function extractFlightPassenger(row) {
    const [firstName, lastName] = getNodeData('.tourist-name', row).split(/\s+/)
    const birthday = getNodeData('.tourist-date', row).replace(/\-/g, '.')
    const [nationality, type, number] = $$('.tourist-document', row).map(n => getText(n))
    const passenger = new Passenger({
        birthday,
        expire: getText(lastElement($$('.tourist-date', row))),
        lastName,
        firstName,
        nationality,
        docType: type === "FOREIGN_PASSPORT" ? 'internationalPassport' : 'nationalPassport'

    });
    passenger.setDocNumber(number)
    passenger._fullName = passenger.firstName + passenger.lastName
    return passenger;
}

function parseSector(node) {
    const uls = $$('.flight_row ul', node).map(ul => $$('li', ul).reduce(extractSegmentInfo, {}));
    const [departure, arrival] = [uls[1], uls[2]];
    const getCity = (text)=> text.split(/[()]/)[0]
    const getCountry = (text) => text.split(/[()]/)[1]
    const segments = [new FlightSegment({
        flightNumber: uls[0]['Рейс'],
        airline: uls[0]['Авиакомпания'],
        travelTime:(uls[3]['В пути'].match(/\d+/g) || []).join(':'),
        departureDate: departure['Вылет'].split(/\s+/)[0],
        departureTime: departure['Вылет'].split(/\s+/)[1],
        departureCountry: getCountry(departure['регион']),
        departureCity: getCity(departure['регион']),
        departureAirport: departure['Аэропорт'],
        departureTerminal: departure['Терминал'],
        serviceClass: uls[3]['Класс'],
        baggage: uls[3]['Багаж'],
        arrivalDate: arrival['Прилет'].split(/\s+/)[0],
        arrivalTime: arrival['Прилет'].split(/\s+/)[1],
        arrivalCountry: getCountry(arrival['регион']),
        arrivalCity: getCity(arrival['регион']),
        arrivalAirport: arrival['Аэропорт'],
        arrivalTerminal: arrival['Терминал']
    })];
    return {segments};
}

function extractSegmentInfo(init, li) {
    const text = getText(li);
    let [key, ...value] = text.split(/\s*:\s*/);
    value = value.join(":");
    if ( !value ) {
        return Object.assign(init, {'регион': key })
    }
    return Object.assign(init, {[key]: value})
}

function parseService(svc) {
    const serviceType = getNodeData('.order-info_service-type', svc, 'textContent', '').split(/\s*\/\s*/);
    if ( $1('.order-info_flight', svc) )  {
        return {
            caption: serviceType[0],
            description: getNodeData('.order-info_service-address', svc),

            node: svc
        }
    }

    const [dateStart, dateEnd] = getNodeData('.order-info_service-date', svc, 'textContent', '').match(getRegexPatterns().date);
    const address = $1('.order-info_service-address', svc);
    const value = {
        caption: serviceType[0],
        description: getNodeData('.order-info_service-address', svc),
        miniDesc: getNodeProperty(address.firstChild),
        dateStart: makeYear4Digits(dateStart),
        dateEnd: makeYear4Digits(dateEnd || dateStart),
        node: svc

    }
    return value
}

function parsePriceNode(node) {
    const matched = getNodeProperty(node, '').replace(/\s+|\(|\)/g, '').match(/\d+[A-z]+/g);
    return {
        firstPrice: {
            price: parseFloat(matched[0]),
            currency: matched[0].replace(/\d+/g, '')
        },
       secondPrice: {
            price: matched[1] ? parseFloat(matched[1]) : 0,
            currency: matched[1] ?  matched[1].replace(/\d+/g, '') : null
        }
    }
}

function parseHotel(hotelService, flight, insurance) {
    const [roomType, boardType] = getNodeData('.order-info_tourists-row_room-info', hotelService.node, 'textContent', '').split(/\s*,\s*/)
    const [hotelName, ...region] = hotelService.description.split(/\s*,\s*/)
    const country = findCountry(flight, insurance, hotelService.description)
    return {
        dateEnd: hotelService.dateEnd,
        dateStart: hotelService.dateStart,
        nights: String(getDistance(hotelService.dateStart, hotelService.dateEnd)),
        hotelName,
        country,
        region: region.filter(r => country && (r.toUpperCase() !== country.toUpperCase())).join(', '),
        roomType,
        boardType,
        node: hotelService.node
    }
}

function getHotelRowByImage(img) {
    return img.closest('.order-item');
}

function findCountry(flight, insurance, hotelDesc) {
    try {
        const country = flight ? lastElement(flight.sectors[0].segments).arrivalCountry : insurance.length > 0 ? lastElement(insurance[0].miniDesc.split(/\s*,\s*/)) : null
         return country || window.COUNTRY_LIST_ENG.find( c => hotelDesc.toUpperCase().match(c.toUpperCase()) );
    } catch (e) {
        console.log(e);
        return '';
    }
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const {insurance, hotels, transfers, cachedPassengers, tourOperatorReference} = tourOptions;
    const services = {
        tourOptions, insurance, hotels, transfers, cachedPassengers, tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
   return tourOptions.hotels;
}

function extractPassengers(page, hotel, ins, flightSvc) {
    const panels = $$('.order-tourists .tourist-name', page)
        .map(input => input.closest('.order-info_tourists-row:not(.order-info_tourists-header)'))
        .filter(Boolean)

    if ( panels.length === 0 ) {
        const oldPass = extractPassengersOld(hotel, ins)
        if ( oldPass.length === 0 ) {
            return $$('.order-info_tourists .tourist-name', page)
                .map(input => input.closest('.order-info_tourists-row:not(.order-info_tourists-header)'))
                .filter(Boolean)
                .map(extractPassengerInfoNew)
        }

        return oldPass;
    }
    return panels.map(extractPassengerInfoNew);

}

function parsePassengers(_, passengers) {
    return passengers;
}

function extractPassengerInfoNew(panel) {
    console.log('extractPassengerInfoNew', panel)
    const [lastName, firstName] = getNodeData('.tourist-name', panel, 'textContent', '').split(/\s+/);
    const document = $$('.tourist-document', panel).extractNodesText();
    const dates = $$('.tourist-date', panel).extractNodesText().map(str => {
        const [day,month, year] = str.split('-');
        return `${day}.${month}.${year}`
    })
    const passenger = new Passenger({
        birthday: dates[0],
        expire: dates[1],
        lastName,
        firstName,
        nationality: document[0],
        number: document[2],
        sex: getNodeData('.tourist-sex', panel, 'textContent', '') === 'm' ? '1' : '2',
        docType: document[1] === 'Загранпаспорт РФ' ? 'internationalPassport' : 'nationalPassport'
    })

    return passenger;
}

function extractPassengersOld(hotel, insurance) {
    const panels = [...$$(".order-info_tourists-row", hotel && hotel.node).slice(1),
        ...$$(".order-info_tourists-row", insurance && insurance.node).slice(1)];
    let passengers = panels.map(extractPassengerInfo);
    let passengersWithBirthday = passengers.filter(p => p.birthday);

    if (passengersWithBirthday.length === 0) {
        return deduplicateCollectionByField(passengers, '_fullName')
    }
    return deduplicateCollectionByField(passengersWithBirthday, '_fullName')
}


function extractPassengerInfo(panel) {
    const divs = $$('div', panel);
    const [firstName, lastName] = getNodeProperty(divs[0], '').split(/\s+/)
    const birthday = getNodeProperty(divs[1], '').match(getRegexPatterns().date)
    const passenger = new Passenger({
        birthday: birthday ? birthday[0] : null,
        lastName,
        firstName
    });
    passenger._fullName = passenger.firstName + passenger.lastName
    return passenger;
}
