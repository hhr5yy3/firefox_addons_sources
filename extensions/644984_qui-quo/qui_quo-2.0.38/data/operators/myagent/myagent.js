window.OPERATOR_NAME = "Мой Агент";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$( ".AlternativesScheduleV2__Variants, .AviaV2ResultSheduleAlternativesSchedule__Variants").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const buttons = qqBtns({align: "qq-horizontal", hideFlight: true})
            buttons.style.width = "100%";
            buttons.style.justifyContent = "center";
            div.append(buttons);
        }
    });

    $$( ".AviaV2BookingSearch__Main").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            const {container} = createQuickBookingContainer({action: createOrderFlightOption})
            div.after(container);
        }
    });

    $$(".DropPanel__Header .RailwayV2BookingPrice__Row").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", hideFlight: true}, createOrderTrainOption));
        }
    });

    $$( ".DropPanel__Header .HotelV2BookingPrice__Row").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", hideFlight: true}, createOrderHotelOption));
        }
    });

    $$( ".HotelRoom .HotelRoom__Book").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", hideFlight: true}, createHotelOption));
        }
    });

}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const flightCard = tour.querySelector(".AviaV2ResultListGroup__ContentLeft, .AviaV2ResultList__List");
    const priceCard = tour.querySelector(".AviaV2ResultListGroup__ContentRight, .AviaV2AdditionalTariffs__Main");
    const sectors = querySelectorAll(flightCard, ".AviaV2ResultRoute__Content.is-selected, .AviaResultNewList__Groups [class*=AviaV2NewResultRoute__Content--].is-selected:not(.is-hidden)");
    const flight = getFlight(sectors);
    const price = getNodeProperty(priceCard.querySelector(".AlternativesScheduleV2__BookingButton .currency, .AviaV2ResultSheduleAlternativesSchedule__Variants .currency"));
    if ( !price ) {
        throw new QuiQuoError('Price not found', 'Отсутствует цена! Дождитесь загрузки цены или попробуйте инициировать поиск заново.')
    }
    const tariff = querySelectorAll(priceCard, ".AlternativesScheduleV2__VariantWrapper");
    if ( tariff[0] && !tariff[0].classList.contains("is-selected") ) {
        flight.sectors.forEach(sectors => sectors.segments.forEach(segment => {segment.serviceClass = null; segment.baggage = null}))
    }

    let option = optionFromFlight(flight, tour);
    option.price = extractIntFromStr(price.replace(/\s+/g, ""));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+|,/g, ""));
       return  option;
}

function createOrderTrainOption(img) {
    const tour = $first(".RailwayBookingV2__Main");
    let sectors = $$( ".RailwayBookingV2SegmentsItem__Main", tour);
    if ( sectors.length === 0 ) {
        sectors = $$(".RailwayBookingHeaderV2__SegmentInfo", tour);
    }
    const routes = getTrainTicket(sectors);
    const price = getText(document.querySelector(".DropPanel__Header .RailwayV2BookingPrice__Row .currency"));
    let option = {
        checkinDt: routes[0].departureDate,
        nights: String(getDistance(routes[0].departureDate, lastElement(routes).arrivalDate)),
        region: routes.map(r=> r.train).join(' / '),
        href: "",
        hotelName: 'Ж/Д:'+routes.map((r)=>getTrainRegion(r)).join(' / '),

        roomType: routes.map(r => r.wagon).join(' / '),
        boardType: "Места: " + routes.map(r => r.seat).join(' / '),
        city_from: routes[0].departureCity,
        operator: OPERATOR_NAME,
        thumbnail: "",
        excursion: false,
        product_type: 'Train'
    };
    option.price = extractIntFromStr(price.replace(/\s+/g, ""));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+|,/g, ""));

    return option;
}

function getTrainRegion(r) {
    return `${r.departureCity} (${r.departureDate} ${r.departureTime}) → ${r.arrivalCity} (${r.arrivalDate} ${r.arrivalTime})`;
}

function createOrderFlightOption() {
    const tour = document.querySelector(".AviaV2FlightInfo__Main");
    const sectors = querySelectorAll(tour, ".AviaV2FlightInfo__Route");
    const flight = getFlight(sectors);
    const price = getText(document.querySelector(".AviaV2BookingPrice__Main .currency"));
    let option = optionFromFlight(flight, tour);
    option.price = extractIntFromStr(price.replace(/\s+/g, ""));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+/g, ""));
    return option;
}

function optionFromFlight(flight, tour) {
    const lastSegment = lastElement(lastElement(flight.sectors).segments);
    const startDate = dayMonthYearToDate(flight.sectors[0].segments[0].departureDate);
    const endDate = dayMonthYearToDate(lastSegment.arrivalDate);
    const {occupancy, comment} = getFlightOccupancy();
    return {
        checkinDt: flight.sectors[0].segments[0].departureDate,
        nights: getDistance(startDate, endDate).toString(),
        hotelName: "Авиаперелет: " + querySelectorAll(tour, ".AviaV2FlightTitle__Airports, .AviaNewResultFlightTitle__Airports").map( ports => getText(ports) ).join(" / "),
        href: null,
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        city_from: flight.sectors[0].segments[0].departureCity,
        operator: window.OPERATOR_NAME,
        flight,
        product_type: "Flight",
        occupancy
    };
}

function getTrainTicket(sectors) {
    return sectors.map(parseTrainSector);
}

function parseTrainSector(sector) {
    const departureDate = getNodeProperty($$(".RailwayBookingRoute__Time", sector)[0], '', 'innerText').replace(/\s*Отправление\s*/gi, '').split(/\s+/);
    const arrivalDate = getNodeProperty($$(".RailwayBookingRoute__Time", sector)[1], '', 'innerText').replace(/\s*прибытие\s*/gi, '').split(/\s+/);
    const route = getNodeData('.RailwayRouteTitle__DirectionText', sector).split(/\s*➞\s*/);
    const infoCells = $$('.RailwayBookingRoute__InfoCell .RailwayBookingRoute__InfoCellTitle', sector).extractNodesText();
    const infoCellsText = $$('.RailwayBookingRoute__InfoCell .RailwayBookingRoute__InfoCellContent', sector).extractNodesText('innerText');
    const train = {
        train: getNodeData('.RailwayRoute__routeInfo_train_number', sector) || infoCells[3],
        route: route.join('➞'),
        departureCity: route[0],
        departureDate: dateFromDayAndMonthName(departureDate[2], departureDate[3]),
        departureTime: departureDate[0],
        seat: getNodeData('.RailwayRoute__Column--PlacesNumber', sector, 'innerText') || infoCellsText[5].split(/\s+/).join(','),
        wagon: getNodeData('.RailwayRoute__Column--CarNumber', sector, 'innerText') || infoCells[4],
        arrivalCity: route[1],
        arrivalDate: dateFromDayAndMonthName(arrivalDate[2], arrivalDate[3]),
        arrivalTime: arrivalDate[0]
    }
    return train;
}

function getFlight(sectors) {
    try {
        const parsedSectors = sectors.map(parseSector);
        return {sectors: parsedSectors}
    } catch (e) {
        console.log(e);
    }
}

function parseSector(sector) {
    const detailsButton = sector.querySelector(".AviaV2ResultRoute__TransfersButton:not(.is-opened), .AviaV2Route__TransfersButton:not(.is-opened)");

    if ( detailsButton ) {
        detailsButton.click();
    }
    const segments = querySelectorAll(sector,".AviaV2ResultRoute__TransferWrapper, .AviaV2Route__TransferWrapper").map(parseSegment);
    const sectorTravelTime = getNodeProperty(sector.querySelector(".AviaV2Route__FlightLine__Duration"));
    return {segments, sectorTravelTime}
}

function parseSegment(segment) {
    const carrier = segment.querySelector(".AviaV2Route__TransferRow--carrier");

    const departureDate =  getNodeProperty(segment.querySelector(".AviaV2Route__Departure .AviaV2Route__FlightDate")).split(" ");
    const arrivalDate = getNodeProperty(segment.querySelector(".AviaV2Route__Arrival .AviaV2Route__FlightDate")).split(" ");

    let cities = querySelectorAll(segment, ".AviaV2Route__TransferRow--city").map( city =>  getText(city) );
    const departureTerminal = (cities[0].match(/терминал\s*:\s*(\S*)/i) || ["", null])[1];
    const arrivalTerminal = (cities[1].match(/терминал\s*:\s*(\S*)/i) || ["", null])[1];
    cities[0] = cities[0].replace(/терминал.*/i, "");
    cities[1] = cities[1].replace(/терминал.*/i, "");
    const [departureCity, departureAirport] = cities[0].split(", ").map(city => city.trim());
    const [arrivalCity, arrivalAirport] = cities[1].split(", ").map(city => city.trim());
    const travelTime =  carrier ? getNodeProperty(carrier.querySelector(".AviaV2Route__TransferDuration"), "").replace(/В пути|Travel time/i, "").trim() : "";
    const parsedSegment = new FlightSegment({
        flightNumber: carrier ?  getNodeProperty(carrier, "").replace(travelTime, "").replace(/Рейс|flight|В пути|Travel time/ig, "").trim() : null,
        airline: getNodeProperty(segment.querySelector(".AviaV2Route__TransferSupplier img"), null, "alt"),
        travelTime,
        plane: getNodeProperty(segment.querySelector(".AviaV2Route__TransferRow--aircraft")),
        departureDate: dateFromDayAndMonthName(departureDate[1], departureDate[2]),
        departureTime: getNodeProperty(segment.querySelector(".AviaV2Route__Departure .AviaV2Route__FlightTime")),
        departureCity,
        departureAirport,
        departureAirportID: getNodeProperty(segment.querySelector(".AviaV2Route__Departure .AviaV2Route__FlightCode")),
        departureTerminal,
        serviceClass: getNodeProperty(segment.querySelector(".AviaV2Route__TransferRow--service_class")),
        arrivalDate: dateFromDayAndMonthName(arrivalDate[1], arrivalDate[2]),
        arrivalTime: getNodeProperty(segment.querySelector(".AviaV2Route__Arrival .AviaV2Route__FlightTime")),
        arrivalCity,
        arrivalAirport,
        arrivalAirportID: getNodeProperty(segment.querySelector(".AviaV2Route__Arrival .AviaV2Route__FlightCode")),
        arrivalTerminal
    });
    parsedSegment.baggage = extractBaggage(segment);
    return parsedSegment;
}

function extractBaggage(segment) {
    try {
        const baggageIco = segment.querySelector(".AviaV2MiniRules__Baggage i");
        if (!baggageIco) {
            return null;
        }
        simulateEvent(baggageIco, "mouseover");
        const popupText = getNodeProperty(document.querySelector(".rc-tooltip:not(.rc-tooltip-hidden)"), null, "innerText");
        simulateEvent(baggageIco, "mouseout");
        return popupText.split(/\n/).join(", ");
    } catch(e) {
        return null;
    }
}

function getFlightOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    try {
        const jsonUrl = JSON.parse(decodeURI(window.location.href).match(/{.+}/));
        occupancy.adultsCount = jsonUrl.adt+jsonUrl.src+jsonUrl.yth;
        occupancy.childrenCount = jsonUrl.chd+jsonUrl.inf+jsonUrl.ins;
        occupancy.childAges = [new Array( jsonUrl.chd).fill('2-12'),
                               new Array(jsonUrl.inf).fill('0-2'),
                               new Array(jsonUrl.ins).fill('0-2 с местом')
        ]
                               .flatMap(e=>e).join() || null;
        return {occupancy, comment: jsonUrl.ins ? `Младенцев с местом: ${jsonUrl.ins}` : null};
    } catch(e) {
        console.log(e);
        return {};
    }
}

function createOrderHotelOption(img) {
    const tour = document.querySelector(".HotelV2Booking__BookingInfo");
    const dates = querySelectorAll(tour, ".HotelV2BookingInfo__HotelTime b").map( b => dateFromDayAndMonthName(...getText(b).split(" ")));
    const price = getText(document.querySelector(".DropPanel__Header .HotelV2BookingPrice__Row .currency"));
    const direction = getText(tour.querySelector(".HotelV2BookingInfo__Row--direction")).split(/,\s*/);
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: direction[0],
        hotel_desc: getHotelDescription(tour),
        href: window.location.href,
        country: "",
        region: lastElement(direction),
        roomType: getText(tour.querySelector(".HotelV2BookingInfo__RoomTextTitle")),
        boardType: getNodeProperty(tour.querySelector(".HotelV2BookingInfo__Food"), "Питание не включено"),
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, "")),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".HotelV2BookingInfo__HotelImage img"), null, "src"),
        occupancy: getOccupancy()
    };
    return option;
}

function createHotelOption(img) {
    const tour =  getHotelRowByImage(img);
    const room = tour.parentNode.parentNode;
    const hotelInfo = document.querySelector(".HotelInfo");
    const dates = getText(document.querySelector(".HotelSelect__Accessible__Period")).split(/\s*-\s*/)
                      .map( date => dateFromDayAndMonthName(...date.split(" ")));
    const price = getText(tour.querySelector(".HotelRoom__RealPrice .Price"));
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: getHotelName(hotelInfo),
        hotel_desc: getNodeProperty(document.querySelector(".HotelDescription__Description")),
        href: window.location.href,
        country: "",
        region: lastElement(getNodeProperty(hotelInfo.querySelector(".HotelInfo__Location"), "").split(/,\s*/)),
        roomType: getText(tour.querySelector(".HotelRoom__Title")),
        boardType: getNodeProperty(tour.querySelector(".HotelRoom__Food"), "Питание не включено"),
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price.replace(/\d+|\s+/g, "")),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector("img.HotelImages__Img_Main"), null, "src"),
        occupancy: getOccupancy()
    };
    return option;
}

function getHotelName(hotelInfo) {
    const caption =  getText(hotelInfo.querySelector(".HotelTitle__Name"));
    const stars = querySelectorAll(hotelInfo, ".HotelTitle__Stars .Icon");
    return caption + (stars.length > 0 ? " "+stars.length+"*": "");
}

function mapCurrency(text) {
    const currencyKey = trim(text);
    const currencies = {
        "₽": "RUB",
        "€": "EUR",
        "$": "USD",
        "руб": "RUB"
    };
    return currencies[currencyKey] || currencyKey;
}

function getHotelDescription(tour) {
    const infoLink = tour.querySelector(".HotelPolicy__Main .HotelPolicy__Link");
    if ( infoLink ) {
        infoLink.click();
    }
    const modal = tour.querySelector(".HotelPolicy__Modal");
    const closeBtn = modal.querySelector(".Modal__Header__CloseButton");
    const text = getNodeProperty(modal, null, "innerText");
    if ( closeBtn ) {
        closeBtn.click();
    }
    return text;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
   const adults = window.location.href.match(/adults=(\d+)/);
   if ( !adults ) {
       return null;
   }
   occupancy.adultsCount = extractIntFromStr(adults[0]);

   const kids = window.location.href.match(/child_age]=\d+/g);
   occupancy.childrenCount = kids ? kids.length : 0;
   if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges =kids.map( kid => kid.replace(/\D+/g, "") ).join();
   }
   return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("AviaV2ResultListGroup__Content") ||
             div.classList.contains("AviaV2Result__Row") ||
             div.classList.contains("HotelRoom")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOrderFlightOption(button);
    const prices = new Prices();
    const gross = getNodeData(".AviaV2BookingPrice__Main .currency");
    const nett = getNodeData('.AviaV2BookingPriceMa__RowHeader .currency', document, 'textContent', '0');

    const grossPrice = extractIntFromStr(gross.replace(/\s+/g, ""));
    const grossPriceCurrency = mapCurrencyUtil(gross.replace(/\d+|\s+/g, ""));
    const nettPrice = extractIntFromStr(nett.replace(/\s+/g, ""));

    prices.addPriceAuto(nettPrice, grossPrice, grossPriceCurrency)
    const services = {
        tourOptions,
        prices
    };
    return services;
}

function parsePassengers() {
    return $$("[class*='BookingFormPassenger__Right']").map(extractPassengerInfo)
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        lastName: "[class*='--lastName'] input",
        firstName: "[class*='--firstName'] input",
        secondName: "[class*='--middleName'] input",
        birthDate: "[class*='--birthDate'] input",
        expire: "[class*='--documentValidThru'] input",
        number: "[class*='--documentNumber'] input"
    }));
    const docTypeText = getNodeData('.AviaV2BookingFormPassenger__DocumentDropdown .DropdownTargetButton__Content', panel)
    if ( docTypeText === 'Паспорт РФ' ) {
        passenger.docType = 'nationalPassport'
    }
    if (docTypeText === 'Заграничный паспорт') {
        passenger.docType = 'internationalPassport'
    }
    if (docTypeText === 'Свидетельство о рождении') {
        passenger.docType = 'birthdayCertificate'
    }

    passenger.setDocNumber(passenger.number)
    return passenger
}
