window.OPERATOR_NAME = "PAC GROUP";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".order-wrap").forEach(_ => {
        if ( !document.body.querySelector(".qq") ) {
            document.body.append(createCell());
        }
    });
}

function createCell() {
    const container = createQQContainer();
    container.style.position = "fixed";
    container.style.top = "5%";
    container.style.right = "5%";
    container.style.maxWidth = "200px";
    container.style.zIndex = "999999999";
    container.style.backgroundColor = "white";
    return container;
}

function createOption(img) {
    const hotel = getHotelRowByImage(img);
    const date = getDate(hotel);
    const region = getText(hotel.querySelector(".order-placement-hotel__address")).split(/,\s*/);

    const prices = new Prices();
    const grossPriceNode = document.querySelector(".digest-option__price .js-money");
    const nettPriceNode = document.querySelector(".js-netto-price .digest-total .js-money");

    const firstPriceType = grossPriceNode ? mapPriceType(grossPriceNode.dataset.moneyCurrency) : null;
    const secondPriceType = grossPriceNode ? mapPriceType(grossPriceNode.dataset.moneyCurrent) : null;

    if (firstPriceType ) {
        prices[`${firstPriceType}`].gross = parseFloat(grossPriceNode.dataset.moneyAmount);
        prices[`${firstPriceType}`].nett = parseFloat(nettPriceNode.dataset.moneyAmount);
        prices[`${firstPriceType}`].currency = grossPriceNode.dataset.moneyCurrency;
    }
    if (secondPriceType) {
        prices[`${secondPriceType}`].gross = parseFloat(getText(grossPriceNode).replace(/\s+/g, ''));
        prices[`${secondPriceType}`].nett = parseFloat(getText(nettPriceNode).replace(/\s+/g, ''));
        prices[`${secondPriceType}`].currency = grossPriceNode.dataset.moneyCurrent;
    }

    const flight = getFlight();
    let option = {
        checkinDt: date.date,
        dateStart: date.date,
        dateEnd: addDaysToStringDate(date.date, date.nights),
        nights: date.nights,
        hotelName: getText(hotel.querySelector(".order-placement-hotel__hotel")),
        href: getNodeProperty(hotel.querySelector(".order-placement-hotel__hotel"), null, "href"),
        country: region[0],
        region: region[1],
        roomType: getNodeProperty(hotel.querySelector('input[name*="Room"] + DIV')),
        boardType: getNodeProperty(hotel.querySelector('input[name*="Board"] + DIV')),
        price: prices.nationalGrossPrice || prices.foreignGrossPrice,
        currency: prices.nationalCurrency || prices.foreignCurrency,
        prices,
        city_from: getNodeProperty(document.querySelector(".avia-popup-head__way-item")) || (flight ? flight.sectors[0].segments[0].departureCity : ""),
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(".order-placement-hotel__img img"), null, "src"),
        occupancy: getOccupancy(),
        flight
    };
    if ( !option.roomType || !option.boardType ) {
        const dd = $$('.order-placement-hotel__type-wrap dl dd',hotel);
        option.roomType = getNodeProperty(dd[0]);
        option.boardType = getNodeProperty(dd[1]);
    }
    return option;
}

function getDate(tour) {
    let dateText;
    querySelectorAll(tour, ".form-item.form-theme_dark").find(div => {
        dateText = div.textContent.match(/(\d{2}\.\d{2}\.\d{4}).+?(\d+)\s+ноч/);
        return !!dateText;
    });
    return {date: dateText[1], nights: dateText[2]};
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
    if ( occupancy.adultsCount < 1 ) {
        return null;
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    return document.querySelector('.order-placement-hotel');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const allServices = $$('.digest-block-item').map( node =>  ({head: getNodeProperty(node.querySelector('.digest-heading'), 'default'), node}));
    const insurance = allServices.filter(svc => svc.head.match(/страховка/i)).map(getLiText).flatMap(s=>s).map(s=> parseService(s, tourOptions));
    const transfers = allServices.filter(svc => svc.head.match(/трансфер/i)).map(getLiText).flatMap(s => s).map(s => parseService(s, tourOptions));
    const other = allServices.filter(svc => !svc.head.match(/трансфер|страховка|проживание|Состав/i)).map(getLiText).flatMap(s => s).map(s => parseService(s, tourOptions));
    const services = {
        insurance,
        transfers,
        other,
        tourOptions,
        prices: tourOptions.prices,
        nettPrice: tourOptions.prices.nationalNettPrice || tourOptions.prices.foreignNettPrice,
        nettPriceCurrency: tourOptions.prices.nationalCurrency || tourOptions.prices.foreignCurrency
    };
    return services;
}

function getLiText(obj) {
    return $$('.digest-li', obj.node).map(li => getText(li));

}

function parseService(svc, tourOptions) {
    let dateStart = svc.match(/\d+\s+янв|\d+\s+фев|\d+\s+март|\d+\s+апр|\d+\s+мая|\d+\s+май|\d+\s+июн|\d+\s+июл|\d+\s+авг|\d+\s+сент\d+\s+|октяб|\d+\s+нояб|\d+\s+декаб/)
    let dateEnd = null;
    if ( dateStart ) {
        dateStart = dateFromDayAndMonthNamePac(...dateStart[0].split(/\s+/));
    } else {
        dateStart =  tourOptions.dateStart;
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
    const  number = getNodeProperty(panel.querySelector('[name*="Number"]'), '', 'value').replace(/\D+/g, '');
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: '[name*="Birthday"]',
        issueDate: '[name*="IssueDate"]',
        expire: '[name*="ExpirationDate"]',
        lastName: '[name*="LastName"]',
        firstName: '[name*="FirstName"]',
        email: '[name*="Email"]',
        phone: '[name*="Phone"]'
    }), panel);
    passenger.nationality = getNodeProperty(panel.querySelector('[name*="CitizenshipCountryKey"] + div'));
    passenger.serial = number.slice(0, 2);
    passenger.number= number.slice(2);
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


        passengersCount.adults = $$('.js-order-placement-item-hotel .order-placement-hotel__type-people .icon._man:not(._small)').length;
        passengersCount.children = $$('.js-order-placement-item-hotel .order-placement-hotel__type-people .icon._man._small').length;
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
