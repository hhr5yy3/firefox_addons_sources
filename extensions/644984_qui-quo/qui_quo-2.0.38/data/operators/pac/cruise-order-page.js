window.OPERATOR_NAME = "PAC";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".js-digest-footer").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(createCell());
        }
    });
}

function createCell() {
    const container = createQQContainer();
    // container.style.position = "fixed";
    // container.style.top = "15rem";
    // container.style.left = "75rem";
    container.style.maxWidth = "200px";
    container.style.zIndex = "999999999";
    container.style.backgroundColor = "white";
    return container;
}


async function createOption(img) {
    const dates = getNodeData('.digest-header .digest-header__subtitle.notranslate').match(getRegexPatterns().date)
    const href = getNodeData('.digest-header__title a', document, 'href');
    const {region, boat, thumbnail} = await getTourInfo(href)
    const room = $$('.digest-text').find(r => getText(r).match(/Каюта/i))
    const boardType = findBoardType();
    const priceNode = $1(".digest-option__price .js-money");

    const prices = new Prices();
    const grossPriceNode = document.querySelector(".digest-option__price .js-money");
    const nettPriceNode = document.querySelector(".js-netto-price .digest-total .js-money");

    const firstPriceType = grossPriceNode ? mapPriceType(grossPriceNode.dataset.moneyCurrency) : null;
    const secondPriceType = grossPriceNode ? mapPriceType(grossPriceNode.dataset.moneyCurrent) : null;

    if (firstPriceType) {
        prices[`${firstPriceType}`].gross = parseFloat(grossPriceNode.dataset.moneyAmount);
        prices[`${firstPriceType}`].nett = parseFloat(nettPriceNode.dataset.moneyAmount);
        prices[`${firstPriceType}`].currency = grossPriceNode.dataset.moneyCurrency;
    }
    if (secondPriceType) {
        prices[`${secondPriceType}`].gross = parseFloat(getText(grossPriceNode).replace(/\s+/g, ''));
        prices[`${secondPriceType}`].nett = parseFloat(getText(nettPriceNode).replace(/\s+/g, ''));
        prices[`${secondPriceType}`].currency = grossPriceNode.dataset.moneyCurrent;
    }

    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(dates[0], dates[1])),
        hotelName: getNodeData('.digest-header__title a'),
        hotel_desc: "",
        href,
        country: null,
        region,
        roomType: trim(getNodeProperty(room)).replace(/каюта:/i, ''),
        boardType: [boat, boardType].filter(Boolean).join(', '),
        price: extractIntFromStr(getText(priceNode).replace(/\s+/g, '')),
        currency: priceNode.dataset.moneyCurrent,
        city_from: "",
        thumbnail,
        prices,
        occupancy: getOccupancy(),
        boat,
        flight: getFlight()
    };
    return option;
}

function getFlight() {
    try {
        const detailedBtn = $1('.flights-view-button-wrap [data-view="detail"]')
        if ( detailedBtn ) {
            detailedBtn.click()
        }
        const sectors = {
            sectors: querySelectorAll(document, ".avia-popup-section:not(.js-fare-passenger-info-block)").map(sector => {
                var items = prepareItems(sector);
                return {
                    segments: querySelectorAll(items.route, ".avia-popup-route__transfer").map((routeTransfer, index) => {
                        return createSegment(routeTransfer, index, items.routeItems, items.variantItems, items.variantTransfers, sector);
                    })
                }
            })
        }

        if ( sectors.sectors.length === 0 || sectors.sectors.length > 2 ) {
            return getSimpleFlight();
        }

        console.log(sectors)
        return sectors;
    } catch (e) {
        return null;
    }
}

function prepareItems(sector) {
    const route = sector.querySelector(".avia-popup-route");
    const variant = sector.querySelector(".avia-popup-variants");
    return {
        route: route,
        routeItems: querySelectorAll(route, ".avia-popup-route__item"),
        variantItems: querySelectorAll(variant, ".avia-popup-route__item"),
        variantTransfers: querySelectorAll(variant, ".avia-popup-route__transfer")
    }
}

function createSegment(routeTransfer, index, routeItems, variantItems, variantTransfers, sector) {
    const arrivalIndex = index + 1;
    const planeAndNumber = getText(variantTransfers[index].querySelector(".avia-popup-route__transfer-flight")).split(",");
    const depTimes = variantItems[index].querySelectorAll(".avia-popup-route__time-part");
    const depDates = variantItems[index].querySelectorAll(".avia-popup-route__time-part-date");
    const arrTimes = variantItems[arrivalIndex].querySelectorAll(".avia-popup-route__time-part");
    const arrDates = variantItems[arrivalIndex].querySelectorAll(".avia-popup-route__time-part-date");
    const departureAirport = getText(routeItems[index].querySelector(".avia-popup-route__city-airport"));
    const arrivalAirport = getText(routeItems[arrivalIndex].querySelector(".avia-popup-route__city-airport"))
    return new FlightSegment({
        flightNumber: planeAndNumber[0].trim(),
        plane: planeAndNumber[1].trim(),
        airline: getNodeProperty(routeTransfer.querySelector(".avia-popup-route__transfer-logo"), null, "title"),
        serviceClass: getText(routeTransfer.querySelector(".avia-popup-route__transfer-type")),
        travelTime: getText(sector.querySelector(".avia-popup-variant__way-time")),
        departureCity: getText(routeItems[index].querySelector(".avia-popup-route__city-name")),
        departureAirport: departureAirport.split(/\s*\(/)[0],
        departureAirportID: departureAirport.split(/\s*\(|\)/)[1],
        departureTime: getText(lastElement(depTimes).firstChild),
        departureDate: dateFromDayAndMonthNamePac(...getText(lastElement(depDates)).split(" ").slice(0, 2)),
        arrivalCity: getText(routeItems[arrivalIndex].querySelector(".avia-popup-route__city-name")),
        arrivalAirport: arrivalAirport.split(/\s*\(/)[0],
        arrivalAirportID: arrivalAirport.split(/\s*\(|\)/)[1],
        arrivalTime: getText(arrTimes[0].firstChild),
        arrivalDate: dateFromDayAndMonthNamePac(...getText(arrDates[0]).split(" ").slice(0, 2)),
    });
}

function getSimpleFlight() {
    let sectors = querySelectorAll(document, ".digest__avia-card-block .avia-page .avia-card-block__content");
    const inputSectors = $$('.table_flights input:checked')
        .map(input => input.closest('.js-basic-variant'))
        .map(variant => getNodeProperty(variant.querySelector('.flight-data__flight')));

    sectors = sectors.map((sector, index) => {
        let stops = getText(sector.querySelector(".avia-card-passage__transfers-count")).replace(/\D+/g, "");
        stops = stops ? parseInt(stops) + 1 : 1;
        const segmentsArray = new Array(stops).fill(null).map(segment => new FlightSegment());
        const firstSegment = segmentsArray[0];
        const lastSegment = lastElement(segmentsArray);
        const arrivalDate = sector.querySelector(".avia-card-passage__end-time");

        firstSegment.flightNumber = inputSectors[index] ? inputSectors[index] : getNodeProperty(sector.querySelector(".avia-card-passage__company"), "").padEnd(6, "0");
        firstSegment.departureDate = dateFromDayAndMonthNamePac(...getNodeProperty(sector.querySelector(".avia-card-passage__date"), "").split(" ").slice(0, 2));
        firstSegment.departureTime = getNodeProperty(sector.querySelector(".avia-card-passage__start-time"), "");
        firstSegment.departureCity = getNodeProperty(sector.querySelector(".avia-card-passage__start-city"));
        firstSegment.departureAirportID = getNodeProperty(sector.querySelector(".avia-card-passage__start-airport"));

        lastSegment.arrivalDate = dateFromDayAndMonthNamePac(...getNodeProperty(arrivalDate.querySelector("small"), "").split(" ").slice(0, 2));
        lastSegment.arrivalTime = getNodeProperty(arrivalDate, "").match(/\d{2}:\d{2}/)[0];
        lastSegment.arrivalCity = getNodeProperty(sector.querySelector(".avia-card-passage__end-city"));
        lastSegment.arrivalAirportID = getNodeProperty(sector.querySelector(".avia-card-passage__end-airport"));
        return {segments: segmentsArray}
    });
    return sectors.length > 0 ? {sectors: sectors} : null;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const peopleElement = document.querySelector(".tour-page__placement-type-people");
    occupancy.adultsCount = extractIntFromStr(getNodeProperty(peopleElement.querySelector("svg.icon:not(._small) + span")) || "0");
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(peopleElement.querySelector("svg.icon._small  + span")) || "0");
    if (occupancy.adultsCount < 1) {
        return null;
    }
    return occupancy;
}

function findBoardType() {
    const lies = $$('.digest-li').extractNodesText();
    if (lies.some(li => li.match(/полный пансион/i))) {
        return 'Полный пансион'
    }

    if (lies.some(li => li.match(/только завтрак/i))) {
        return 'Только завтрак'
    }

    if (lies.some(li => li.match(/без питания/i))) {
        return 'Без питания'
    }
    return '';
}

async function getTourInfo(href) {
    try {
        if (!href) {
            return {};
        }
        const text = await fetch(href).then(resp => resp.text())
        const doc = getDocumentFromString(text);
        return getPlace(doc);
    } catch (e) {
        console.log(e);
        return {};
    }
}


function getPlace(tour) {
    const infos = $$('.tour-info__text', tour);
    const place = infos.find(node => getText(node).match(/Города стоянок:/));
    const boat = infos.find(node => getText(node).match(/Лайнер:/));
    return {boat: trim(getNodeProperty(boat)), region: trim(getText(place)), thumbnail: getNodeData('img.tour-slider__img', tour, 'src')};
}

function getThumbnail(tour) {
    var imageNode = tour.querySelector("img.tour-page__placement-hotel-img, .tour-page__placement-img-wrap img, img.tour-slider__img") || document.querySelector("img.tour-slider__img");
    return getNodeProperty(imageNode, null, "src");
}


function getHotelRowByImage(img) {
    return img.closest('.js-digest-footer');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const allServices = $$('.digest-block-item').map(node => ({
        head: getNodeProperty(node.querySelector('.digest-heading'), 'default'),
        node
    }));
    const insurance = allServices.filter(svc => svc.head.match(/страховка/i)).map(getLiText).flatMap(s => s).map(s => parseService(s, tourOptions));
    const transfers = allServices.filter(svc => svc.head.match(/трансфер/i)).map(getLiText).flatMap(s => s).map(s => parseService(s, tourOptions));
    const other = allServices.filter(svc => !svc.head.match(/трансфер|страховка|проживание|Состав|Круиз/i)).map(getLiText).flatMap(s => s).map(s => parseService(s, tourOptions));

    const cruises = [{
        dateStart: tourOptions.checkinDt,
        dateEnd: addDaysToStringDate(tourOptions.checkinDt, tourOptions.nights),
        roomType: tourOptions.roomType,
        route: tourOptions.region,
        boardType: tourOptions.boardType,
        ship: tourOptions.boat
    }]
    const services = {
        cruises,
        insurance,
        transfers,
        other,
        hotels: [],
        prices: tourOptions.prices
    };
    return services;
}

function parseHotels() {
    return [];
}

function getLiText(obj) {
    return $$('.digest-li', obj.node).map(li => getText(li));

}

function parseService(svc, tourOptions) {
    let dateStart = svc.match(/\d+\s+янв|\d+\s+фев|\d+\s+март|\d+\s+апр|\d+\s+мая|\d+\s+май|\d+\s+июн|\d+\s+июл|\d+\s+авг|\d+\s+сент\d+\s+|октяб|\d+\s+нояб|\d+\s+декаб/)
    let dateEnd = null;
    if (dateStart) {
        dateStart = dateFromDayAndMonthNamePac(...dateStart[0].split(/\s+/));
    } else {
        dateStart = tourOptions.dateStart;
        dateEnd = tourOptions.dateEnd;
    }
    return new quickBookingValue({
        description: svc,
        dateStart,
        dateEnd
    })
}


function parsePassengers() {
    const panels = $$(".order-person__head");
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const number = getNodeProperty(panel.querySelector('[name*="Number"]'), '', 'value').replace(/\D+/g, '');
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: '[name*="Birthday"]',
        issueDate: '[name*="IssueDate"]',
        expire: '[name*="ExpirationDate"]',
        lastName: '[name*="LastName"], [name*="Lastname"]',
        firstName: '[name*="FirstName"], [name*="Firstname"]',
        email: '[name*="Email"]',
        phone: '[name*="Phone"]'
    }), panel);
    passenger.nationality = getNodeProperty(panel.querySelector('[name*="CitizenshipCountryKey"] + div'));
    passenger.serial = number.slice(0, 2);
    passenger.number = number.slice(2);
    passenger.docType = passenger.parseDocType(passenger)
    return passenger;
}

function dateFromDayAndMonthNamePac(day, month, year) {
    if (!day || !month) {
        return null;
    }
    const d = parseInt(day, 10);
    const m = monthNameToNumber(month);
    return year ? dayMonthYearToString(d, m, year) : appendYear(d, m);
}

function parsePassengersCountModule() {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };


        passengersCount.adults = $$('.order-person__tab.js-person-tab-initials-adult').length;
        passengersCount.children = $$('.order-person__tab.js-person-tab-initials-child').length;
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
