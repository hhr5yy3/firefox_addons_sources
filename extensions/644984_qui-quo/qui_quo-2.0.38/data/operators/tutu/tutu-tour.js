window.OPERATOR_NAME = "TUTU";
window.showTopHotelsRating = false;

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
    const priceNode = $1('.button__text-main', $1('.routeItem')) ||
                      $1('.hotelTour__price-block__btn') ||
                      $1('.hotelInfoBlock__price > div > div > span.first-line');
    if(!priceNode || (priceNode && getText(priceNode).match(/\d/) === null)) return;

    $$( ".tourInfo__price-block").forEach(div => {
        if (div.querySelector(".qq")) {
            return;
        }

        const container = qqBtns({ align:  "qq-horizontal" });

        container.style.width = "100%";
        container.style.justifyContent = "flex-end";
        container.style.margin = "0";

        div.append(container);
    });

    $$( ".hotelTour__container .hotelTour__price-block").forEach(div => {
        if (div.querySelector(".qq")) {
            return;
        }

        const container = qqBtns({ align:  "qq-horizontal" });

        container.style.marginTop = "4px";
        container.style.width = "100%";
        container.style.justifyContent = "flex-end";

        div.style.flexDirection = "column";
        div.append(container);
    });

    $$(".routeItem__container .routeItem__buttons-container").forEach((div, index) => {
        if (div.parentNode.querySelector(".qq")) {
            return;
        }

        if (index === 0) {
            window.getFlight = () => null;
        }

        div.after(qqBtns({align: "qq-horizontal"}, createOrderOption));
    });
}

function createOption(img) {
    const isMobile = $1('body').hasAttribute('mobile');
    const hotelRow = getHotelRowByImage(img);

    const resort = getNodeData('.resortName, [itemprop="address"]').split(",");
    const meal = getNodeData(".hotelTour__info__meal, .tourInfo__info", hotelRow).split(",");
    const priceBtn = $1('.hotelTour__price-block__btn, .tourInfo__price-tour', img.closest('.hotelTour__price-block, .tourInfo__price-block'));
    const priceText = getText(priceBtn).split('руб.')[0].replace(/\D+/g, '');
    const isOnlyHotel = !!priceBtn.querySelector('.js-product-type-hotel');
    const stars = $$('.hotelCategory i') || [];
    const checkinDtText = getNodeData('.hotelTour__air-info__company, .tourInfo__flight-date', hotelRow).slice(0, -4).split(' ');
    const nightsHotel = extractIntFromStr(getNodeData('.hotelTour__nights-in-hotel, .tourInfo__nights > span', hotelRow));
    const nightsTour = extractIntFromStr(getNodeData('.hotelTour__nights-in-tour, .tourInfo__nights', hotelRow));

    return  {
        checkinDt: appendYear(checkinDtText[0], monthNameToNumber(checkinDtText[1])),
        nights: String(nightsHotel),
        extra_nights: String(nightsTour - nightsHotel),
        hotelName: getNodeProperty(document.querySelector('.hotelTitle')) + `${stars.length > 0 ? ' ' + stars.length + '*' : ''}`,
        href: window.location.href.replace(window.location.hash, ""),
        roomType: getNodeData(".js-room-category-name", hotelRow),
        region: resort[1],
        boardType: meal[isMobile ? 0 : 1],
        price: extractIntFromStr(priceText?.replace(/\D+/g, "")),
        currency: "RUB",
        country: resort[0],
        city_from: isOnlyHotel ? '' : (SEARCH_CRITERIA.city ?? null),
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData("img.sp-image, .hotelInfoImg > img", document, "src") ?? '',
        occupancy: SEARCH_CRITERIA.occupancy,
        hotel_desc: getNodeData(".aboutHotel__description-text, .hotelInfoBlock__description") ?? ''
    };
}

function getOccupancy() {
    const isMobile = $1('body').hasAttribute('mobile');
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    }

    if(getNodeData(".js-touristsText")) return null;

    let childrenCounter = 0;
    if(isMobile) {
        const adults = $1('.adults__buttonset>input[type="radio"]:checked');
        occupancy.adultsCount = adults ? +adults.value : null;
        
    }else {
        const formText = getNodeData(".touristGroup .formInputPlace");
        const adults = formText?.match(/(\d+)\s+взр/);
        occupancy.adultsCount = adults ? +adults[1] : null;
    }

    if (!occupancy.adultsCount) {
        return null;
    }

    const agesArr = [];
    const childSelector = $$('.child-select > div > div > .customSelect__form');

    if(childSelector.length === 0) {
        return null;
    }

    childSelector.forEach(item => {
        let text = getText(item);

        if(text.includes('до 1 года')) text = '0';

        const data = text.replace(/\D+/g, "");

        if(!data) return;

        childrenCounter++;
        agesArr.push(data);
    })

    if(agesArr.length > 0) {
        occupancy.childrenCount = childrenCounter;
        occupancy.childAges = agesArr.join(',');
    }

    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.HtlTr, .hotelTour, .routeItem, .tourInfo, .route-short-info') || document.querySelector('.tourInfo__tour-info');
}

async function createOrderOption(img) {
    const tour = getHotelRowByImage(img);
    const [country, ...region] = getText($first('.ticket__position span, .hotel-short-info__resort')).split(/\s*,\s*/).reverse();
    const flightNode = img.closest('.routeItem');
    const flight = flightNode ? await getFlight(flightNode) : null;
    const firstDateElem = getNodeData('.js-tourDuration')?.split(/\s*-\s*/)
    let dateStart = parseTravelataDate(firstDateElem?.[0]);
    let dateEnd = parseTravelataDate(firstDateElem?.[1]);
    let priceNode = $1('.js-route-total-price, .routeItem__total strong, .js-route-total-price, .button__text-main, .route__selectRoute > span', tour) ||
        $1('.totalPriceValue, .routeItem__selected-tour-button');
    if (!priceNode) {
        throw new QuiQuoError('Price is null', 'Неизвестны данные перелета, пожалуйста, выберете другой вариант.')
    }
    const nightsText = getNodeData('.js-tourNights') || getNodeData('.routeItem__nights-in-tour, .difference-night__text', tour);
    if (!nightsText) {
        throw new QuiQuoError('Nights are empty', 'Неизвестное количество ночей. Вероятно, вы не выбрали перелет.')
    }
    let [fullNights, hotelNights] = nightsText.match(/\d+/g)
    if (!hotelNights) {
        hotelNights = getNodeData('.routeItem__nights-in-hotel', tour).match(/\d+/g)
    }
    const operator = getNodeData('.routeItem__tour-description > li > img', tour, 'title');

    if(!dateStart || !dateEnd) {
        const checkinDtText = getNodeData('.route__row > div > .route-short-info__item-wrapper > .route-short-info__item > div > .route__flight-dateText', tour).slice(0, -4).split(' ');
        const checkoutDtText = getNodeData('.route-short-info__container > .route__row:nth-child(3) > div > .route-short-info__item-wrapper > .route-short-info__item:last-child > div > .route__flight-dateText', tour).slice(0, -5).split(' ');

        dateStart = appendYear(checkinDtText[0], monthNameToNumber(checkinDtText[1]));
        dateEnd = appendYear(checkoutDtText[0], monthNameToNumber(checkoutDtText[1]));
    }

    let option = {
        checkinDt: dateStart,
        nights: hotelNights || fullNights || String(getDistance(dateStart, dateEnd)),
        extra_nights: String(parseInt(fullNights) - parseInt(hotelNights)),
        hotelName: [getText($first('.ticket__title, .hotel-short-info__name')), $$('.ticket__info .ticket__stars>i').length + '*'].filter(s => s !== '0*').join(' '),
        href: window.location.href.replace(window.location.hash, ""),
        country,
        region: region.join(', '),
        roomType: getNodeData('.js-roomName-or-category') ?? '',
        boardType: getNodeData('.js-mealType') ?? '',
        price: extractIntFromStr(getText(priceNode).replace(/\D+/g, '')) || extractIntFromStr(getNodeData('.button__text-main', tour).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: getNodeData('.routeItem__flight-city') || getNodeData('div.route-short-info__container > div:nth-child(2) > div > div.route-short-info__item-wrapper > div:nth-child(1) > div.route__placeInfo > div', tour) || "",
        operator: OPERATOR_NAME + (operator ? " / " + operator : ""),
        thumbnail: getNodeProperty($first('.fotorama__img'), null, 'src'),
        occupancy: getOccupancy(),
        flight
    };

    function parseTravelataDate(text) {
        if(!text) return null;
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
        const connection = segment?.querySelector('.connection-button');
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
        const airportNameArr = ($first('.routeItem__flight-air', arrival));
        const segments = [new FlightSegment(
            {
                flightNumber: getNodeProperty($first('.routeItem__flightNumber', segment)),
                airline: getNodeProperty($first('.airlineLogo__name', segment)),
                travelTime: getNodeProperty($first('.routeItem__totalTime', segment), '')?.replace(/ч/, ':')?.replace(/[^0-9:]/gi, ''),
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
        const connectionPopup = connectionLink?.parentNode?.querySelector('.connections-info__content');
        const closeBtn = connectionPopup?.closest('.popupWrapper, .dialog-wrapper__modal-content-wrapper')?.querySelector('.popupClose, .dialog-wrapper__dialog-close');
        const connections = $$('.connection', connectionPopup).map(c => parseConnection(c, serviceClass));
        closeBtn?.click?.();
        return connections;
    }

    function parseConnection(connection, serviceClass) {
        const [departure, arrival] = $$('.connection__item', connection);
        return new FlightSegment({
            flightNumber: getNodeProperty($first('.connection__airlineFlightNumber', connection)),
            airline: getNodeProperty($first('.airlineLogo__name', connection)),
            travelTime: getNodeProperty($first('.connection__totalFlightTime', connection))?.replace(/ч/, ':')?.replace(/[^0-9:]/gi, ''),
            departureDate: parseTravelataDate(getNodeProperty($first('.connection__flight-dateText', departure))),
            departureTime: getNodeProperty($first('.connection__flight-timeText', departure)),
            departureCity: getNodeProperty($first('.connection__flight-city', departure)),
            departureAirport: getNodeProperty($first('.connection__airportName', departure)),
            departureAirportID: getNodeProperty($first('.connection__airportCode', departure)),
            arrivalDate: parseTravelataDate(getNodeProperty($first('.connection__flight-dateText', arrival))),
            arrivalTime: getNodeProperty($first('.connection__flight-timeText', arrival)),
            arrivalCity: getNodeProperty($first('.connection__flight-city', arrival)),
            arrivalAirport: getNodeProperty($first('.connection__airportName', arrival)),
            arrivalAirportID: getNodeProperty($first('.connection__airportCode', arrival)),
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
        const children = occupancyText.match(/(\d+)\s+(дет|реб|млад)/);
        occupancy.adultsCount = adults ? Number(adults[1]) : null;
        occupancy.childrenCount = children ? Number(children[1]) : null;
        return occupancy;
    }


    return option;
}