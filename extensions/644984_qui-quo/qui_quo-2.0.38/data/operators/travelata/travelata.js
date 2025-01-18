window.OPERATOR_NAME = "Travelata";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy(),
        city: getNodeProperty(document.querySelector(".from_city a"))
    };
}

function getSearchButton() {
    return document.querySelector(".startSearch");
}

function injectData() {
     $$( ".hotelTour__container .hotelTour__price-block-item").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            let container = qqBtns({ align:  "qq-vertical" });
            container.style.marginLeft = "4px";
            div.append(container);
        }
    });

    $$(".routeItem__container .routeItem__buttons-container").forEach((div, index) => {
        if (!div.parentNode.querySelector(".qq")) {
            if (index === 0) {
              window.getFlight = () => null
            }
            div.after(qqBtns({align: "qq-horizontal"}, createOrderOption));
        }
    });
}

function createOption(img) {
    let hotelRow = getHotelRowByImage(img);
    let resort = getNodeProperty(document.querySelector(".resortName")).split(",");
    let meal = getNodeProperty(hotelRow.querySelector(".hotelTour__info__meal"), '', 'innerText').split(",");
    const priceBtn = img.closest('.hotelTour__price-block-item').querySelector('.hotelTour__price-block__btn');
    let priceText = getText(priceBtn).replace(/\D+/g, '');
    let operator = getNodeProperty(hotelRow.querySelector(".operatorLogo"), null, "title");
    const isOnlyHotel = !!priceBtn.querySelector('.js-product-type-hotel');
    const stars = $$('.hotelCategory i') || [];
    return  {
        checkinDt: getDate(hotelRow),
        nights: getNodeProperty(hotelRow.querySelector(".hotelTour__air-info__night, .hotelTour__nights-in-tour, .hotelTour__nights-in-hotel-hotel-offer")).replace(/\D+/g, ""),
        hotelName: getNodeProperty(document.querySelector('.hotelTitle')) + `${stars.length > 0 ? ' ' + stars.length + '*' : ''}`,
        href: window.location.href.replace(window.location.hash, ""),
        roomType: getNodeProperty(hotelRow.querySelector(".hotelTour__info__room")) + (meal[1] ? ", " + meal[1] : ""),
        region: resort[1],
        boardType: meal[0],
        price: extractIntFromStr(priceText.replace(/\D+/g, "")),
        currency: "RUB",
        country: resort[0],
        city_from: isOnlyHotel ? '' : SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME + operator ? " / " + operator : "",
        comment: "",
        excursion: false,
        thumbnail: getNodeProperty(document.querySelector("img.sp-image"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        hotel_desc: getNodeProperty(document.querySelector(".aboutHotel__description-text"))
    };
}

function getDate(hotel) {
    let date = hotel.querySelector('[itemprop="availabilityStarts"]');
    let dateStr = date.getAttribute("content");
    let matcher = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    return dayMonthYearToString(matcher[3], (+matcher[2])+"", matcher[1]);
}

function mapCurrency(s) {
    let c = trim(s);
    switch (c) {
        case "£": return "GBP";
        case "руб.": return "RUB";
        case "€": return "EUR";
        case "$": return "USD";
    }
    return c;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let formText = getNodeProperty(document.querySelector(".touristGroup .formInputPlace"), ``);
    let adults = formText.match(/(\d+)\s+взр/);
    let kids = formText.match(/(\d+)\s+(дет|реб|млад)/);
    occupancy.adultsCount = adults ? +adults[1] : null;
    occupancy.childrenCount = kids ? +kids[1] : 0;
    if ( !occupancy.adultsCount ) {
        return null;
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.HtlTr, .hotelTour') || document.querySelector('.tourInfo__tour-info');
}


async function createOrderOption(img) {
    const tour = getHotelRowByImage(img);
    const isForRating = img.classList.contains('qq-rating-btn');
    const [country, ...region] = getText($first('.ticket__position span')).split(/\s*,\s*/).reverse();
    const flightNode = img.closest('.routeItem');
    const flight = isForRating ? null : await getFlight(flightNode);
    const [dateStart, dateEnd] = getNodeData('.js-tourDuration').split(/\s*-\s*/).map(parseTravelataDate)
    let priceNode = $1('.routeItem__buttons-content', flightNode) ||  $1('.js-route-total-price, .routeItem__total strong, .js-route-total-price', flightNode) ||
        $1('.totalPriceValue, .routeItem__selected-tour-button');
    if (!priceNode) {
        throw new QuiQuoError('Price is null', 'Неизвестны данные перелета, пожалуйста, выберете другой вариант.')
    }
    const nightsText = getNodeData('.js-tourNights') || getNodeData('.routeItem__nights-in-tour, .difference-night__text', flightNode);
    if (!nightsText) {
        throw new QuiQuoError('Nights are empty', 'Неизвестное количество ночей. Вероятно, вы не выбрали перелет.')
    }
    let [fullNights, hotelNights] = nightsText.match(/\d+/g)
    if (!hotelNights) {
        hotelNights = getNodeData('.routeItem__nights-in-hotel', flightNode).match(/\d+/g)
    }
    let option = {
        checkinDt: dateStart,
        nights: hotelNights || fullNights || String(getDistance(dateStart, dateEnd)),
        extra_nights: String(parseInt(fullNights) - parseInt(hotelNights)),
        hotelName: [getText($first('.ticket__title')), $$('.ticket__info .ticket__stars>i').length + '*'].filter(s => s !== '0*').join(' '),
        country,
        region: region.join(', '),
        roomType: getText($first('.js-roomName-or-category')),
        boardType: getText(tour.querySelector('.js-mealType')),
        price: extractIntFromStr(getText(priceNode).replace(/\D+/g, '')) || extractIntFromStr(getNodeData('.button__text-main', flightNode).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: getNodeData('.routeItem__flight-city') || "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeProperty($first('.fotorama__img'), null, 'src'),
        occupancy: getOccupancy(),
        flight
    };

    function parseTravelataDate(text) {
        const [day, month] = text.split(/\s*-\s*/)[0].split(/\s+/);
        return appendYear(day, monthNameToNumber(month));
    }

    async function getFlight(flightNode) {
        try {
            let sectors = [];
            for (const sector of $$('.routeItem__row', flightNode)) {
                const tempSector = await parseSectors(sector);
                sectors.push(tempSector)
            }
            return {sectors: sectors.flatMap(s => s)};
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async function parseSectors(sector) {
        let segments = [];
        for (const segment of $$('.routeItem__content', sector)) {
            const tempSegment = await parseSegments(segment);
            segments.push(tempSegment);
        }
        return {segments: segments.flatMap(s => s)};
    }

    async function parseSegments(segment) {
        const serviceClass = getNodeProperty(segment.querySelector('.routeItem__flightClass'));
        const connection = segment.querySelector('.connection-button');
        if (connection) {
            const matcher = getNodeProperty(connection).match(/(\d+)\s*пересад/);
            const conCount = parseInt(matcher[1]);
            if (conCount > 0) {
                const connectionSegments = await parseConnections(connection, serviceClass);
                return connectionSegments;
            }
        }

        const [departure, arrival] = $$('.routeItem__flight', segment)
        const airportNameDep = ($first('.routeItem__flight-air', departure));
        const airportNameArr = ($first('.routeItem__flight-air', arrival))
        const segments = [new FlightSegment(
            {
                flightNumber: getNodeProperty($first('.routeItem__flightNumber', segment)),
                airline: getNodeProperty($first('.js-airlineName', segment)),
                travelTime: getNodeProperty($first('.routeItem__totalTime', segment), '').replace(/ч/, ':').replace(/[^0-9:]/gi, ''),
                departureDate: parseTravelataDate(getNodeProperty($first('.routeItem__flight-date', departure))),
                departureTime: getNodeProperty($first('.routeItem__flight-time', departure)),
                departureCity: getNodeProperty($first('.routeItem__flight-city', departure)),
                departureAirport: getNodeProperty($first('.tooltip__container', airportNameDep)),
                departureAirportID: getNodeProperty($first('span', airportNameDep)),
                arrivalDate: parseTravelataDate(getNodeProperty($first('.routeItem__flight-date', arrival))),
                arrivalTime: getNodeProperty($first('.routeItem__flight-time', arrival)),
                arrivalCity: getNodeProperty($first('.routeItem__flight-city', arrival)),
                arrivalAirport: getNodeProperty($first('.tooltip__container', airportNameArr)),
                arrivalAirportID: getNodeProperty($first('span', airportNameArr)),
                serviceClass
            }
        )]
        return segments;
    }

    async function parseConnections(connectionLink, serviceClass) {
        connectionLink.click();
      // wait for connection popup to load
        const connectionPopup = connectionLink.parentNode.querySelector('.connections-info__content') || await waitingFor(()=>$1('.connection-content', window.top.document.documentElement))

        const closeBtn = connectionPopup.closest('.popupWrapper, .dialog-wrapper__modal-content-wrapper')?.querySelector('.popupClose, .dialog-wrapper__dialog-close') || $1('.ui-dialog__close', window.top.document.documentElement);
        const connections = $$('.connection, .connection-content-item', connectionPopup).map(c => parseConnection(c, serviceClass));
        closeBtn.click();
        return connections;

    }

    function parseConnection(connection, serviceClass) {
        const [departure, arrival] = $$('.connection__item, .connection-content-item__item', connection);
        return new FlightSegment({
            flightNumber: getNodeProperty($first('.connection__airlineFlightNumber, .connection-content-item__airline-flight-number', connection)),
            airline: getNodeProperty($first('.airlineLogo__name', connection)) || getNodeProperty($1('.routes-info-airline-logo__image-img', connection), '', 'title'),
            travelTime: getNodeProperty($first('.connection__totalFlightTime, .connection-content-item__total-flight-time', connection), '').replace(/ч/, ':').replace(/[^0-9:]/gi, ''),
            departureDate: parseTravelataDate(getNodeProperty($first('.connection__flight-dateText, .connection-content-item__flight-date-text', departure))),
            departureTime: getNodeProperty($first('.connection__flight-timeText, .connection-content-item__flight-time-text', departure)),
            departureCity: getNodeProperty($first('.connection__flight-city, .connection-content-item__flight-city', departure)),
            departureAirport: getNodeProperty($first('.connection__airportName, .connection-content-item__airport-name', departure)),
            departureAirportID: getNodeProperty($first('.connection__airportCode, .connection-content-item__airport-code', departure)),
            arrivalDate: parseTravelataDate(getNodeProperty($first('.connection__flight-dateText, .connection-content-item__flight-date-text', arrival))),
            arrivalTime: getNodeProperty($first('.connection__flight-timeText, .connection-content-item__flight-time-text', arrival)),
            arrivalCity: getNodeProperty($first('.connection__flight-city, .connection-content-item__flight-city', arrival)),
            arrivalAirport: getNodeProperty($first('.connection__airportName, .connection-content-item__airport-name', arrival)),
            arrivalAirportID: getNodeProperty($first('.connection__airportCode, .connection-content-item__airport-code', arrival)),
            baggage: getNodeProperty($first('.connection__baggageAvailibility', connection)),
            serviceClass
        })
    }

    function getOccupancy() {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };

        const occupancyText = getNodeProperty($first('.js-touristsText'));
        if (!occupancyText) {
            return null;
        }

        const adults = occupancyText.match(/(\d+)\s*взр/);
        const children = occupancyText.match(/(\d+)\s*[детрб]/);
        occupancy.adultsCount = adults ? Number(adults[1]) : null;
        occupancy.childrenCount = children ? Number(children[1]) : null;
        return occupancy;
    }


    return option;
}
