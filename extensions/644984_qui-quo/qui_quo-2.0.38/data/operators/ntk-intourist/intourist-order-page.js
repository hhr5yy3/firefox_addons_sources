window.OPERATOR_NAME = "Ntk Intourist";
const showTopHotelsRating = true;
const OPERATOR_CURRENCY = "Ntk Intourist";
const DEFAULT_CURRENCY = "RUB";
const CURRENCY_SELECTION_STYLE = "font-size:12px;";

if ( chrome &&  chrome.runtime && chrome.runtime.getManifest() && chrome.runtime.getManifest().manifest_version === 2 ) {
    let script = document.createElement("script");
    script.textContent = `window.timerId = setInterval(startScript, 1000);

function startScript() {
    var open = window.XMLHttpRequest.prototype.open;
    
    function openReplacement(method, url, async, user, password) {
        if ( url.match(/proposal/) ) {
            sessionStorage.setItem('sessionId', (url.match(/proposal\\/(.+?)\\//) || [])[1])
        }
        return open.apply(this, arguments);
    }
    
    window.XMLHttpRequest.prototype.open = openReplacement;
};`
    document.body.appendChild(script);
} else {

    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/ntk-intourist/inline-script.js');
    document.head.appendChild(window.qscript);
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".right-sidebar .total-cost__main").forEach(div => {
        if ( div && div.parentNode && !div.parentNode.querySelector(".qq") ) {
            div.after(createQQContainer());
            injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-flow: column;max-width: fit-content;");
            const exportBtn = $1('.qq-export-button');
            if ( exportBtn ) {
                exportBtn.classList.add('mat-button', 'mat-button-base');
                exportBtn.style.minWidth = '200px';
            }
        }
    });
}

async function createOption(img) {
    const infoPanel = getHotelRowByImage(img);
    const rows = $$( ".row");
    const findRowByCaption = (caption) => {
        const found = rows.find(row => {
            const textNode = row.querySelector(".text-secondary");
            return textNode ? getText(textNode).match(caption) : null;
        });
        return found ? found.querySelector(".text-dark") : null;
    };
    const findRowAndGetText = (caption) => getNodeProperty(findRowByCaption(caption), '');
    const hotelPanel = querySelectorAll(document, ".layout-z__head").find( head => {
        return getNodeProperty(head, "").match(/Название отеля/);
    }).parentNode;
    const hotelName = hotelPanel.querySelector(".text-primary.text-dark");
    const price = getPrice(document.querySelector(".total-cost__main"));
    const roomAndBoard = getRoomAndBoardType(getText(hotelName.nextElementSibling.nextElementSibling));
    let option = {
        checkinDt: getDate(findRowAndGetText(/Заезд/i)),
        nights: findRowAndGetText(/Ночей/i),
        hotelName: getText(hotelName),
        href: window.location.href,
        country: findRowAndGetText(/Куда/i),
        region: getText(hotelName.nextElementSibling),
        roomType: roomAndBoard.roomType,
        boardType: roomAndBoard.boardType,
        price: price.price,
        currency: price.currency,
        city_from: findRowAndGetText(/Откуда/i),
        thumbnail: null,
        occupancy: getOccupancy(findRowAndGetText(/Туристы/i)),
        flight: getFlight()
    };
    try {
        const {tourOptions, flight} = await createQuickBookingOption(img, 1, false);
        if ( tourOptions ) {
            const hotels = tourOptions.hotels;
            option.checkinDt = hotels[0].dateStart;
            option.nights = hotels[0].nights;
            option.hotelName = hotels[0].hotelName;
            option.country = hotels[0].country;
            option.region = hotels[0].region;
            option.roomType = [hotels[0].roomType, hotels[0].accommodation].join(', ');
            option.boardType = hotels[0].boardType;
            option.flight = flight && img.classList.contains('qq-export-button') ? flight : option.flight;
            option.city_from = flight ? flight.sectors[0].segments[0].departureCity : null;
        }
    } catch (e) {
        console.log(e)
    }
    return option;
}

function getDate(dateInterval) {
    return dateInterval.split("—")[0].trim();
}

function getRoomAndBoardType(text) {
   const haveEngWords = text.match(/[A-z]+/);
   let ruWords = "";
   if ( haveEngWords ) {
       ruWords = text.match(/[А-я].+/);
   }
   return {
       boardType: ruWords ? ruWords[0] : '',
       roomType: text.replace(ruWords, "")
   }
}

function getPrice(priceNode) {
    var price = isPrefferedDefaultCurrencyUtil() ? getText(priceNode.querySelector(".text-24.text-bold")) :
        getNodeProperty(priceNode.querySelector(".text-18"),  getText(priceNode.querySelector(".text-24.text-bold")));
    return {
        price: extractIntFromStr(price.replace(/\s+|\?/g,"")),
        currency: mapCurrencyUtil(price.replace(/\s+|\?|\d+/g,""))
    };
}

function getFlight() {
    try {
        const flightCard = document.querySelector("app-flight-charter, app-flight-regular");
        const sectorRows = querySelectorAll(flightCard, ".row.layout-z, .row.item-z");
        const segments = sectorRows.map(segment => {
            return {
                date: getText(querySelectorAll(segment, ".row .text-dark").find(div => getText(div).match(/\d{2}\.\d{2}\.\d{4}/))),
                flightText: getText(segment.querySelector(".text-pre-line.text-dark")),
                node: segment
            }
        });
        const to = segments.filter(seg => seg.node.querySelector('.icon-xs.arrow:not(.rotate-180)'));
        const from = segments.filter(seg => seg.node.querySelector('.icon-xs.arrow.rotate-180'));

        let sectors;
        if ( from.length === 0 ) {
            sectors = segments
        } else {
            sectors = [to, from];
        }
        return {sectors: sectors.map(sector => parseSector(sector))}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    const segments = Array.isArray(sector) ? sector.map(parseSegment) : [sector].map(parseSegment);
    return {segments};
}

function parseSegment(segment, fl = {}) {
    var textSegments = segment.flightText.match(/([0-9A-z]{2}\s*\d+)\s+\((.+?)\s*(\d{2}:\d{2})\s*[—-]\s+(.+?)\s*(\d{2}:\d{2}).*?\).*?\[([A-Z]+)]/);
    const departureDate = segment.date;

    if ( textSegments ) {
        const departureTime = textSegments[3];
        const arrivalTime = textSegments[5];
        return new FlightSegment({
            flightNumber: textSegments[1],
            departureDate: departureDate,
            departureTime: textSegments[3],
            departureCity: fl.departureCityName || textSegments[2],
            arrivalCity: fl.arrivalCityName || textSegments[4],
            arrivalTime: textSegments[5],
            arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
            serviceClass: fl.flightClassName || textSegments[6]
        })
    }
    textSegments = segment.flightText.split(/\/|А_П::/).filter(s => s);
    const flightNumber = textSegments[2].match(getRegexPatterns().flightNumber)[0];
    const ids = textSegments[2].match(/\(*([A-Z]{3})\s*-\s*([A-Z]{3})\)*/);
    const times = textSegments[2].match(/\d{2}:\d{2}/g);
    const departureTime = times[0];
    const arrivalTime = times[1];
    return new FlightSegment({
        flightNumber,
        departureDate: departureDate,
        departureTime,
        departureCity: fl.departureCityName || textSegments[0],
        departureAirportID: ids[1],
        arrivalCity: fl.arrivalCityName || textSegments[1],
        arrivalTime,
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalAirportID: ids[2],
        serviceClass: fl.flightClassName || textSegments[3]
    })
}

function getOccupancy(occupancyText) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let adults = occupancyText.match(/(\d+)\s*взр/);
    if (!adults) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    let childs = occupancyText.match(/(\d)+\s*реб.+\((.+)\)/);
    if ( !childs ) {
        return occupancy;
    }
    occupancy.childrenCount = extractIntFromStr(childs[1]);
    occupancy.childAges = childs[2].replace(/\s+/g,"");
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("right-sidebar") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//----------------------------export booking

async function createQuickBookingOption(button, count = 1, showError = true) {
    const sessionId = sessionStorage.getItem("sessionId");
    const bookingInfo = await fetch(`https://intourist.ru/bookingnew/api/v1/query/booking/proposal/${sessionId}`).then(r => r.ok ? r.json() : null);
    if ( bookingInfo ) {
        const proposal = bookingInfo.reservationProposal;

        let flight = parseFlights(proposal.flightServices);
        const  flightType = $$('button').find(btn => getText(btn).match(/замена рейса/i)) ? 'Scheduled' : 'Charter';

        let transfers = proposal.transferServices.map((s) => parseSupplements(s));
        let other = [...proposal.excursionServices, ...proposal.hotelExtraServices, ...proposal.extraServices].map((s) => parseSupplements(s)).filter(s => s);

        let tourOptions = {};
        tourOptions.hotels = proposal.hotelServices.map(hotel => parseHotel(hotel, proposal.tour));
        tourOptions.totalPrice = proposal.tour.tourPrices.priceInTourCurrency;
        tourOptions.totalPriceCurrency = proposal.tour.tourPriceCurrency.name;
        tourOptions.dateStart = proposal.tour.startDate ? new Date(proposal.tour.startDate).toLocaleDateString('ru') : null;
        tourOptions.dateEnd = proposal.tour.endDate ? new Date(proposal.tour.endDate).toLocaleDateString('ru') : null;
        tourOptions.operator = OPERATOR_NAME;
        tourOptions.flight =flight;
        tourOptions.proposal = proposal;

        let insurance = proposal.insuranceServices.map(s => parseSupplements(s, tourOptions.dateStart, tourOptions.dateEnd));

        const nettPrice = proposal.tour.tourPrices.priceToPayInTourCurrency;
        const nettPriceCurrency = proposal.tour.tourPriceCurrency.name;

        const tourPrices = proposal.tour.tourPrices;
        const nationalGrossPrice = tourPrices.priceInRubbles;
        const nationalCurrency = "RUB";

        const foreignGrossPrice = tourPrices.priceInTourCurrency;
        const foreignNettPrice = tourPrices.priceToPayInTourCurrency;
        const foreignCurrency = proposal.tour.tourPriceCurrency.name;

        const prices = new Prices({
            nationalGrossPrice, nationalCurrency
        });

        const grossForeignPriceType = mapPriceType(foreignCurrency);
        const nettForeignPriceType = mapPriceType(foreignCurrency);

        prices[`${grossForeignPriceType}`].gross = foreignGrossPrice;
        prices[`${grossForeignPriceType}`].currency = foreignCurrency;

        prices[`${nettForeignPriceType}`].nett = foreignNettPrice;
        prices[`${nettForeignPriceType}`].currency = foreignCurrency;

        return {flight, insurance, transfers, other, tourOptions, nettPrice, nettPriceCurrency, prices, flightType};
    }
    count++;
    simulateEvent(document.body, 'focus');
    await waitingFor(()=>null, 100, 10);
    if ( count > 4 && showError === true ) {
        throw new QuiQuoError('', 'Недостатчно данных! Пожалуйста, откройте полную версию сайта (режим ПК)')
    }
    return count < 5 ? createQuickBookingOption(button, count) : null;
}

function parseHotelServices(svc) {
    try {
        return {
            roomType: svc.roomCategoryName,
            accommodation: svc.accommodationTypeName,
            boardType: svc.boardName,
            region: svc.hotelCityName,
            checkinDt: svc.startDateStr,
            hotelName: svc.hotelName,
            nights: svc.durationInNights.toString()
        }
    } catch(e) {
        return null;
    }
}

function parsePassengers() {
    try {
        const tourists = $$('.tourist-form');
        return tourists.map(tourist => {
            const passenger = new Passenger(getInputsValues(tourist, {
                lastName: "input[formcontrolname='lastName']",
                firstName: "input[formcontrolname='firstName']",
                secondName: "input[formcontrolname='patronymic']",
                birthday: "input[formcontrolname='birthDate']",
                expire: "input[formcontrolname='personalDocumentValidTill']",
                serial: "input[formcontrolname='personalDocumentSeries']",
                number: "input[formcontrolname='personalDocumentNumber']",
                email: "input[formcontrolname='email']",
                phone: "input[formcontrolname='phoneNumber']"
            }), tourist);
            passenger.sex = mapPassengerSex(getNodeData('[formcontrolname="genderType"]', tourist));
            passenger.nationality = getNodeData('[formcontrolname="citizenshipId"]', tourist)
            return passenger;
        })
    } catch (e) {
        return [];
    }

}

function mapPassengerSex(text) {
    if ( text === 'М' ) {
        return "1";
    }
    if ( text === 'Ж' ) {
       return "2";
   }
}

function parseHotel(hotel, tour) {
    let option = {
        dateStart: hotel.startDateStr,
        nights: hotel.durationInNights.toString(),
        hotelName: hotel.hotelName,
        country: tour.country.name,
        region: hotel.hotelCityName,
        roomType: hotel.roomCategoryName,
        accommodation: hotel.accommodationTypeName,
        boardType: hotel.boardName,
        operator: OPERATOR_NAME
    };
    return option;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parseSupplements(svc, dateStart, dateEnd = null) {
    if ( svc.isChecked === false || (svc.linkedTourists && svc.linkedTourists.length === 0) ) {
        return null;
    }
    return new quickBookingValue({
        description: svc.name,
        dateStart: svc.startDate ? new Date(svc.startDate).toLocaleDateString('ru') : svc.startDateStr || dateStart,
        price: svc.priceInTourCurrency,
        dateEnd
    });
}

function parseFlights(flights) {
    try {
        const sectors = flights.map(parseBookingSector);
        return {sectors}
    } catch(e) {
       console.log(e);
    }
}

function parseBookingSector(fl) {
       const segment = {flightText: fl.names[0], date: fl.startDateStr};
       return {segments: [parseSegment(segment, fl)]};
}

function parsePassengersCountModule(_, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };
        const tourists = tourOptions.proposal.tourists;

        passengersCount.adults = tourists.filter(c => c.age === 50 ).length;
        passengersCount.children = tourists.filter(c => c.age > 2 && c.age < 18).length;
        passengersCount.infants = tourists.filter(c => c.age < 3).length;
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants
        console.log(passengersCount)
        return passengersCount;

    } catch (e) {
        console.log(e)
        return null;
    }
}

function parseClient() {
    const clientNode = $1('app-customer');
    if ( !clientNode ) {
        return null;
    }
    const fio = getNodeData('[formcontrolname="fullName"]', clientNode, "value", "").split(/\s+/);
    if ( !fio[0] ) {
        return null;
    }
    const client = new Passenger(
         {
            lastName: fio[0],
            firstName: fio[1],
            secondName: fio[2],
            serial: getNodeData('[formcontrolname="personalDocumentSeries"]', clientNode, "value"),
            number: getNodeData('[formcontrolname="personalDocumentNumber"]', clientNode, "value"),
            address: getNodeData('[formcontrolname="registrationAddress"]', clientNode, "value"),
            email: getNodeData('[formcontrolname="email"]', clientNode, "value"),
            phone: getNodeData('[formcontrolname="phoneNumber"]', clientNode, "value"),
            docType: "nationalPassport"
        });
    client.isClient = true;
    client.setDocNumber(getNodeProperty(clientNode.querySelector('input.private-customer-document-number'), '', 'value'));
    return client;
}
