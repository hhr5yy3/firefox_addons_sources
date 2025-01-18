window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME: window.OPERATOR_NAME;
window.showTopHotelsRating = true;
window.OPERATOR_CURRENCY = window.operators ? window.operators[window.location.hostname] || "Megatec" :  "Megatec";
window.DEFAULT_CURRENCY = "National";
window.CURRENCY_SELECTION_STYLE = "font-size:12px;";

beforePageLoad();

function beforePageLoad() {
    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/shared/megatec/inline_script.js');
    document.head.appendChild(window.qscript);
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const reservationSummary = document.querySelector('#basket-reservation-summary');
    if ( reservationSummary && !reservationSummary.querySelector('.qq') ) {
        createCell(reservationSummary, '#basket-reservation-summary');
        return;
    }
    $$(".basket-nav-card-wrap .basket-nav-card, [data-bind='with: BasketSearchResult.order']").forEach(div => {
        createCell(div, ".basket-nav-card-wrap .basket-nav-card, [data-bind='with: BasketSearchResult.order']") ;
    });
}

function createCell(div) {
    if ( !div.querySelector(".qq") ) {
        const container = createQQContainer();
        container.style.width = '185px';
        container.style.margin = '5px';
        div.append(container);
        injectCurrencySelectionUtil("#basket-reservation-summary .qq, [data-bind='with: BasketSearchResult.order'] .qq, .basket-nav-card-wrap .basket-nav-card .qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px;width:100%", "display:flex;flex-flow: column;max-width: fit-content;padding: 5px;");
    }
}

async function createOption(img, actualizedData, actualizedFlightData) {
    try {
        if ( !actualizedData || !actualizedFlightData ) {
            [actualizedData, actualizedFlightData] = await getActualBooking();
        }

        function parseName(obj) {
            return obj.Name.replace('N/A', '').replace('б/места', '').replace(/\/\s+\d\*/, '').split(/::|\//);
        }

        const hotelSvc = actualizedData.CalculatedReservation.ServiceTourists.find(svc => svc.Name.match(/HOTEL::|Гостиница::/));
        const trainSvc = actualizedData.CalculatedReservation.ServiceTourists.filter(svc => svc.Name.match(/TRAIN::|Поезд::/));

        const hotelParts = parseName(hotelSvc || trainSvc[0]);
        const dateEnd = new Date(actualizedData.EndDate).toLocaleDateString('ru');
        const checkinDt = new Date(actualizedData.CalculatedReservation.BeginDate).toLocaleDateString('ru');
        const dateStart = getDatesArrayBetweenTwoDates(checkinDt, dateEnd)[(hotelSvc || trainSvc[0]).Day - 1];
        const dates = getDatesArrayBetweenTwoDates(checkinDt, dateEnd);

        dates.push(addDaysToStringDate(dates[dates.length-1], 1));

        const tourDays = dates;
        const hasFlight = actualizedData.CalculatedReservation.ServiceTourists.some(svc => svc.Name.match(/А_П::|Авиаперелет::/))

        let flight = hasFlight ?  getFlight(actualizedFlightData) : null
        if ( !flight && hasFlight) {
            flight = getTextFlight(actualizedData.CalculatedReservation.ServiceTourists.filter(svc => svc.Name.match(/А_П::|Авиаперелет::/)), dates);
        }
        const nationalCurrency = mapCurrencyUtil(actualizedData.NationalCurrency);
        const foreignCurrency = mapCurrencyUtil(actualizedData.CalculatedReservation.Currency) !== nationalCurrency ? mapCurrencyUtil(actualizedData.CalculatedReservation.Currency) : null ;

        const nationalPrice = actualizedData.CalculatedReservation.NationalTotalPrice;
        const nationalNettPrice = actualizedData.CalculatedReservation.NationalPrice;

        const foreignNettPrice = actualizedData.CalculatedReservation.Price !== nationalNettPrice ? actualizedData.CalculatedReservation.Price : 0;
        const foreignPrice = actualizedData.CalculatedReservation.TotalPrice !== nationalPrice ? actualizedData.CalculatedReservation.TotalPrice : 0;

        const prices = new Prices({
            foreignGrossPrice: foreignPrice,
            foreignNettPrice,
            foreignCurrency: foreignCurrency,
            nationalGrossPrice: nationalPrice,
            nationalNettPrice,
            nationalCurrency: nationalCurrency
        });
        let countryTourName = (actualizedData.TourName || '').split(/\s+/)[0];
        const fullNights = getDistance(checkinDt,dateEnd);
        const hotelNamePart = hotelParts.find(part => part.match(/ночей|ночи|ночь/i));
        const trainNights = actualizedData.TourName.match(/(\d+)\s?(ночей|ночи|ночь)/i)?.[1];
        const trainDays = actualizedData.TourName.match(/(\d+)\s?(день|дней)/i)?.[1];
        const nightsText = hotelNamePart ? 
            hotelNamePart.split(',').find(p => p.match(/\d+/) && !p.match(/\d+.*?\*/) ) :
            String(trainNights || trainDays - 1);
        const hotelNights = Number(nightsText.replace(/\D+/g, ''));
        let insurance = actualizedData.CalculatedReservation.ServiceTourists.filter(svc => svc.Name.match(/Страховка/i))[0];
        if ( insurance ) {
            const matcher = insurance.Name.match(/Страховка::(.+?)\//);
            if ( matcher ) {
                countryTourName = matcher[1];
            }
        }
        const trainNames = trainSvc.map(part => parseName(part));
        const trainRoutes = trainNames.map(part => part.find(text => text.match(/\d{2}:\d{2}/)));
        const nonFlightCountry = hotelSvc ? countryTourName : '';
        const hotelName = hotelNamePart && hotelNamePart.split(',')[0].replace('-', ' ')

        let option = {
            checkinDt,
            dateStart,
            dateEnd,
            tourDays,
            nights: String(hotelNights),
            extra_nights: String(fullNights-hotelNights),
            hotelName: (hotelName && !hotelName.match(/по программе/i)) ? hotelName : actualizedData.TourName,
            href: null,
            country: flight ? optionalChaining(lastElement(flight.sectors), ['segments', '0', 'departureCountry'], countryTourName) : nonFlightCountry,
            region: hotelSvc ? hotelParts[hotelParts.indexOf(hotelNamePart) -1] : parseTrainRoutes(trainRoutes),
            roomType: hotelSvc ? hotelParts[hotelParts.indexOf(hotelNamePart)+1].replace(',', ', ') : '',
            boardType: hotelSvc ? hotelParts[hotelParts.indexOf(hotelNamePart) + 2] : '',
            price: isPrefferedDefaultCurrencyUtil() ? actualizedData.CalculatedReservation.NationalTotalPrice : actualizedData.CalculatedReservation.TotalPrice,
            currency: isPrefferedDefaultCurrencyUtil() ? mapCurrencyUtil(actualizedData.NationalCurrency) : mapCurrencyUtil(actualizedData.CalculatedReservation.Currency),
            city_from: optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureCity']) || '',
            operator: OPERATOR_NAME,
            flight,
            prices
        };
        const savedHotelCaption = (option.hotelName.toLowerCase() + actualizedData.TourName).replace(/[^a-zа-я0-9]+/g, '');
        let savedTourOptions = localStorage.getItem(savedHotelCaption);
        if ( savedTourOptions )  {
            savedTourOptions = JSON.parse(savedTourOptions);
         //   option.country = savedTourOptions.country;
            option.region = savedTourOptions.region;
            option.thumbnail = savedTourOptions.thumbnail;
        }

        img.classList.remove('qq-loading');

        return option;
    } catch(e) {
        console.log(e)
        throw new QuiQuoError(e.message, 'Ошибка при получении данных. Пожалуйста, попробуйте открыть окно выбора перелета и снова выбрать перелет (тот же самый). Затем добавьте тур заново.');
    }
}

function getFlight(actualizedFlightData) {
    try {
        const flight = actualizedFlightData.flights.flatMap(seg => seg.flightsPlains).map(parseSegment);
        return divideSegmentsToSectors(flight);
    } catch(e) {
       return null;
    }
}

function getTextFlight(sectors, dates) {
    try {
       if ( sectors.length === 0 ) {
           return null;
       }
        return {sectors: splitSegmentsToSectors(sectors.map(seg => parseTextSegments(seg, dates)))}
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseTextSegments(segment, dates) {
    const split = segment.Name.split(/::|\/|\s*,\s*/);
    const [departureTime, arrivalTime] = split[5].split('-');
    const [departureAirportID, arrivalAirportID] = split[4].split('-');
    const departureDate = dates[segment.Day-1];
    const seg = new FlightSegment({
        flightNumber: split[3],
        departureDate,
        departureTime,
        departureCity: split[1],
        departureAirportID,
        serviceClass: split[6],
        arrivalTime,
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalCity: split[2],
        arrivalAirportID
    })
    return seg;
}

function parseSegment(segment) {
    return new FlightSegment({
        flightNumber: [optionalChaining(segment, ['Airline', 'Key']), optionalChaining(segment, ['Flight', 'Value'])].join(' '),
        airline: optionalChaining(segment, ['Airline', 'Value']),
        plane: optionalChaining(segment, ['Aircraft','Value']),
        departureDate: new Date(optionalChaining(segment, ['BeginDateTime'])).toLocaleDateString('ru'),
        departureTime: optionalChaining(segment, ['DepartureTime']),
        departureCity: optionalChaining(segment, ['DepartureCity', 'Value']),
        departureAirport: optionalChaining(segment, ['DepartureAirport', 'Value']),
        departureAirportID: optionalChaining(segment, ['DepartureAirport', 'Key']),
        departureCountry: optionalChaining(segment, ['DepartureCountry', 'Value']),
        serviceClass: optionalChaining(segment, ['0', 'Tariff', 'Name']) || optionalChaining(segment, ['FlightDetails','0', 'Tariff', 'Name']),
        arrivalDate: new Date(optionalChaining(segment, ['EndDateTime'])).toLocaleDateString('ru'),
        arrivalTime: optionalChaining(segment, ['ArrivalTime']),
        arrivalCity: optionalChaining(segment, ['ArrivalCity', 'Value']),
        arrivalAirport: optionalChaining(segment, ['ArrivalAirport', 'Value']),
        arrivalAirportID: optionalChaining(segment, ['ArrivalAirport', 'Key']),
        arrivalCountry: optionalChaining(segment, ['ArrivalCountry', 'Value'])
    });
}

function divideSegmentsToSectors(segments) {
   if ( segments.length%2 === 0 ) {
      return {sectors: [...segments.chunk(segments.length/2)].map(seg => ({'segments': seg}))}
   }
   return {sectors: [...segments.chunk(1)].map(seg => ({'segments': seg}))};
}

function fetchRequest(url, data) {
    try {
        let userToken = document.cookie.split(';').find(tok => tok.match(/CommonApplicationAuthTokenCookie/i));
        if ( userToken ) {
            userToken = userToken.split('=')[1];
        }


        return fetchTimeout(90000, fetch(url, {
            body: data, method: 'POST', "headers": {
                "authorization": "Bearer " + userToken,
                "content-type": "application/json; charset=UTF-8",
                "toursearchclient": "TourSearchClient"
            }
        })).then(resp => resp.json()).catch(console.log);
    } catch(e) {
        console.log(e)
        return null;
    }
}

function getHotelRowByImage() {
    return document;
}

async function createQuickBookingOption(button, count = 1) {
    const [actualizedData, actualizedFlightData] = await getActualBooking();
    let tourOptions = await createOption(button, actualizedData, actualizedFlightData);
    const tourDates = tourOptions.tourDays;
    let flights = [getFlight(actualizedFlightData)];
    const allServices = actualizedData.CalculatedReservation.ServiceTourists;
    let insurance = allServices.filter(svc => svc.Name.match(/Страховка/i)).map(parseSupplements);
    let transfers = allServices.filter(svc => svc.Name.match(/Трансфер/i)).map(parseSupplements);
    let other = allServices.filter(svc => !svc.Name.match(/Трансфер:|Страховка:|HOTEL:|А_П|Handling|Бронирование|Авиап|Такс|Гостиница:|Сервисный сбор/i)).map(parseSupplements);

    tourOptions.totalPrice = actualizedData.CalculatedReservation.TotalPrice;
    tourOptions.totalPriceCurrency = mapCurrencyUtil(actualizedData.CalculatedReservation.Currency);
    tourOptions.dateEnd = new Date(actualizedData.EndDate).toLocaleDateString('ru');

    function parseSupplements(svc) {
        return new quickBookingValue({
            dateStart: tourDates[svc.Day - 1],
            dateEnd: tourDates[(svc.Day + svc.DurationInNight) - 1],
            description: svc.Name,
            count: svc.TouristCount
        });
    }

    return {flights, insurance, transfers, other, tourOptions};
}


async function getActualBooking() {
    const tourId = getParameterByName('tour');
    const data = sessionStorage.getItem(tourId);
    const apiUrl = localStorage.getItem('apiUrl');

    const flightData = sessionStorage.getItem("flight");
    const apiFlightUrl = localStorage.getItem('apiFlightUrl');

    const [actualizedData, actualizedFlightData] = await Promise.all([fetchRequest(apiUrl, data), fetchRequest(apiFlightUrl, flightData)]);
    return [actualizedData, actualizedFlightData];
}


function parsePassengers() {
    try {
        const tourists = $$('.tourist');
        return tourists.map(tourist => {
            return new Passenger(getInputsValues(tourist, {
                lastName: "input.ipLastName",
                firstName: "input.ipFirstName",
                birthday: "input.ipBirthDate",
                expire: "input.ipPassportDateEnd",
                issueDate: "input.ipPassportDate",
                serial: "input.ipPassportSeries",
                number: "input.ipPassport",
                email: "input.ipEmail",
                phone: "input.ipPhone",
                inn: "input.ipCitizenID"
            }), tourist)
        })
    } catch (e) {
        return [];
    }

}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCountAlternate = alternatePassengersCountModule();
        if ( passengersCountAlternate ) {
            return passengersCountAlternate;
        }

        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {roomType} = tourOptions;

        passengersCount.adults = Number((roomType.match(/(\d+)\s*AD/i) || roomType.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.children = Number((roomType.match(/(\d+)\s*CH/i) || roomType.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.infants = Number((roomType.match(/(\d+)\s*in/i) || roomType.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}

function alternatePassengersCountModule() {
    try {
        let passengers = $$('[data-bind*="ageType"]');
        if ( passengers.length === 0  ) {
            passengers = $$('.treveler-form-headline .title>span:first-child')
        }

        passengers = passengers.map(p => {
            const text = getText(p)
            const type = parsePassengerType(text);
            return type;
        })
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };
        passengersCount.adults = passengers.filter(p => p === 1).length;
        passengersCount.children = passengers.filter(p => p === 2).length;
        passengersCount.infants = passengers.filter(p => p === 3).length;
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parsePassengerType(text) {
    if ( text.match(/реб.нок/i) ) {
        return 2;
    }
    if ( text.match(/младенец/i) ) {
        return 3;
    }
    return 1;
}

function parseTrainRoutes(routes) {
    const fullPath = routes.flatMap((route, index) => {
        const cities = route.split(',')[0].replace(/^\d+\s*/, '').split('-');
        return index === 0 ? cities : cities.slice(1);
    });
    return fullPath.join(' → ');
};