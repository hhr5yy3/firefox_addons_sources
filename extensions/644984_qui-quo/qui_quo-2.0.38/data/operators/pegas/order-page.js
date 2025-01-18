var OPERATOR_NAME = "Pegas";
var DEFAULT_CURRENCY = "National";
var OPERATOR_CURRENCY = "Pegas";
var CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:5px;font-size:12px;color:black;margin-top:5px;";
var showTopHotelsRating = true;
window.injectionSelector = '#container, #create-form-container';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    var container = document.querySelector("#container, #create-form-container");
    if ( !container || !container.querySelector(".booking, .tour-information") ) {
        return;
    }
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-direction: column;");
    var qq = container.querySelector(".qq");
    if ( !qq ) {
        const orderCell = createOrderCell();
        container.prepend(orderCell);
    }
    var currency = document.querySelector("#qq-currency");
    if (qq && qq.lastElementChild !== currency ) {
        qq.append(currency);
    }
}

function createOrderCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
     wrapper.style.position = "sticky";
     wrapper.style.top = "12px";
     wrapper.style.marginLeft = "105%";
     wrapper.style.width = "185px";
     wrapper.style.zIndex = "999";
     wrapper.style.height = '1px';
     container.style.backgroundColor = "#f3f4f6";
     container.style.padding = "5px";
     container.style.border = "1px solid black";
     container.style.width = "185px";
     wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    var tour = getHotelRowByImage();
    var tdSels = {};
    if ( tour.id === "container" ) {
        tdSels.region = "td.city";
        tdSels.roomType = "td.location"
    } else {
        tdSels.region = "td.location";
        tdSels.roomType = "td.accommodation";
    }
    var [dateStart, dateEnd, nights] =
        (getNodeProperty(tour.querySelector("#tour-date-control"), "", "value") ||
            getNodeProperty(tour.querySelector("#departure-dates"), "", "textContent")
        ).match(/\d{2}\.\d{2}\.\d{4}|\d+/g);
    var meals = querySelectorAll(tour, "td.meal");
    var rooms =  querySelectorAll(tour, "td.room-categoty, td.room-category");
    var roomTypes = querySelectorAll(tour, tdSels.roomType);
    var hotels = querySelectorAll(tour, "td.hotel-title, td.hotel");
    var {price, prices} = getPrice(tour);

    var periods = querySelectorAll(tour,"#hotels-container td.period, .service  .staying-period").map( period => {
        var dates = getText(period).split(/-|—/);
        return " " + getDistance(dayMonthYearToDate(dates[0].trim()), dayMonthYearToDate(dates[1].trim())) + "нч.";
    });
    const dates = querySelectorAll(tour, '.staying-period, #tour-date-control').flatMap(date => (getText(date) || getText(date, "value")).match(/\d{2}\.\d{2}\.\d{4}/g)).filter(date => date);
    const [checkinDt, checkoutDt] = [dates[0], lastElement(dates)];
       var option = {
        checkinDt,
        checkoutDt,
        dateStart,
        dateEnd,
        prices,
        nights: getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(checkoutDt)).toString(),
        extra_nights: getExtraNights(checkinDt, checkoutDt, nights),
        hotelName: hotels.map((hotel, index) => {return getText(hotel) + (periods.length > 1 ?  periods[index] : "")}).join(" / "),
        href: getNodeProperty(hotels.map(hotel => hotel.querySelector("a")[0]), null, "href"),
        country: getNodeProperty(tour.querySelector("#country-departure-field, #DestinationCountry"), "", "value"),
        region: querySelectorAll(tour, tdSels.region).map(region => getText(region)).join(" / "),
        roomType:  rooms.map( (room, index) => [getText(room), getText(roomTypes[index]).replace(/\s+/g, '')].join(", ")).join(" / "),
        boardType: meals.map(meal=>[getText(meal), getNodeProperty(meal, null, "title")].filter(m=>m).join(", ")).join(" / "),
        price: extractIntFromStr(price.replace(/\s+/g,"")),
        currency: mapCurrency(price.replace(/\d+|\s+|\./g,"")),
        city_from: getNodeProperty(tour.querySelector("#city-departure-field, #DepartureLocation"), 'Нет данных', "value"),
        thumbnail: getNodeProperty(tour.querySelector(".photo-hidden-wrapper img"), null, "src"),
        occupancy: getOccupancy(tour),
        flight: getFlight(tour, img)
    };
    return option;
}

function parseHotels(tourOptions) {
    if ( !tourOptions.hotelName ) {
        return [];
    }
    const {
        nights, region,
        country,
        hotelName, roomType, boardType, accommodation, product_type
    } = tourOptions;
    if ( product_type === 'Flight' ) {
        return [];
    }

    return [{
        nights, dateStart: tourOptions.checkinDt, dateEnd: tourOptions.checkoutDt,
        hotelName, roomType, accommodation, boardType, region,
        country
    }].map(splitRoomTypeUtil)
}


function getPrice(tour) {
    const natPrice =  getNodeProperty(tour.querySelector(".local-price-tour, .payment-currency-price-block .sale-currency-price"));
    const engPrice = getNodeProperty(tour.querySelector("#cost-tour, .total-price-cost, .price-currency-price-block #TourPriceUp"));
    const nettPrice = getAgencyPrice(true, true);

    const nationalNettPriceValue = parseFloat(nettPrice.natPrice.replace(/\s+|[A-zА-я]/g, '').replace(/,/g, '.'));
    const nationalNettPriceCurrency = mapCurrencyUtil(nettPrice.natPrice.replace(/\d+|\s+|\.|,/g, ""));

    const foreignNettPriceValue = parseFloat(nettPrice.engPrice.replace(/\s+|[A-zА-я]/g, '').replace(/,/g, '.'));
    const foreignNettPriceCurrency = mapCurrencyUtil(nettPrice.engPrice.replace(/\d+|\s+|\.|,/g, ""));

    const prices = new Prices();

    if ( natPrice ) {
        const natPriceCurrency = mapCurrencyUtil(natPrice.replace(/\d+|\s+|\./g, ""));
        const natPriceType = mapPriceType((natPriceCurrency));
        prices[`${natPriceType}`].gross = parseFloat(natPrice.replace(/\s+/g, ""));
        prices[`${natPriceType}`].currency = natPriceCurrency;
    }

    if ( engPrice ) {
        const engPriceCurrency = mapCurrencyUtil(engPrice.replace(/\d+|\s+|\./g, ""));
        const engPriceType = mapPriceType(engPriceCurrency);
        prices[`${engPriceType}`].gross = parseFloat(engPrice.replace(/\s+/g, ""));
        prices[`${engPriceType}`].currency = engPriceCurrency;
    }

    if ( nationalNettPriceValue && nationalNettPriceCurrency ) {
        const nettPriceType = mapPriceType(nationalNettPriceCurrency);
        prices[`${nettPriceType}`].nett = nationalNettPriceValue;
        prices[`${nettPriceType}`].currency = nationalNettPriceCurrency;
    }

    if ( foreignNettPriceValue && foreignNettPriceCurrency ) {
        const nettPriceType = mapPriceType(foreignNettPriceCurrency);
        prices[`${nettPriceType}`].nett = foreignNettPriceValue;
        prices[`${nettPriceType}`].currency = foreignNettPriceCurrency;
    }
    return { price: isPrefferedDefaultCurrencyUtil() ? natPrice || engPrice : engPrice || natPrice, prices };
}

function mapCurrency(c) {
    switch(c.toLowerCase()) {
        case "$": return "USD";
        case "€": return "EUR";
        case "с": return "KGS";
        case "р": return "RUB";
        case "₸": return "KZT";
    }
    return c;
}

function getOccupancy(tour) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractIntFromStr(getNodeProperty(tour.querySelector("#count-adult-control, #Adults"), "0", "value"));
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(tour.querySelector("#count-children-control, #Children"), "0", "value"));
    occupancy.childAges = querySelectorAll(tour,".count-children .age-block input, #child-ages input").map( input => input.value ).join(",");
    return occupancy;
}

function getFlight(tour, img) {
    try {
        let sectors = querySelectorAll(tour, ".not-transfer-flight");
        if ( sectors.length > 0 ) {
            return {
                sectors: querySelectorAll(tour, ".not-transfer-flight")                        //#flights-container .flights__flight-wrap, table.outgoing, table.return
                    .map(sector => {
                        return createSegment(sector)
                    })
            };
        }
        return {
            sectors: querySelectorAll(tour, "#flights-container .flights__flight-wrap, table.outgoing, table.return")
                .map(sector => {
                    return createTextSegment(sector)
                })
        };

    } catch (e) {
        console.log(e)
        return null;
    }
}

function createSegment(sector) {
    const json = JSON.parse(sector.dataset.jsonFlightDescription);
    const mainFlight = json.MainFlight;
    return {
        segments: mainFlight.Legs.map(leg => parseSegmentsJson(leg, mainFlight))
    };
}

function createTextSegment(sector) {
    return {
        segments: querySelectorAll(sector, ".flights__row_inner, td.flight").map(segment => {
            return parseSegmentText(segment);
        })
    };
}

function parseSegmentsJson(segment, mainFlight) {
    return new FlightSegment({
        flightNumber:segment.FlightNumber,
        plane: segment.Aircraft,
        airline: segment.Airline,
        departureDate: extractDate(segment.DepartureDate),
        departureTime: segment.DepartureTime,
        departureCity: segment.DepartureLocation,
        departureAirportID:  segment.DepartureAirportCode,
        departureTerminal: segment.DepartureAirportTerminalCode,
        serviceClass: mainFlight.ClassName,
        arrivalDate: extractDate(segment.ArrivalDate),
        arrivalTime: segment.ArrivalTime,
        arrivalCity: segment.ArrivalLocation,
        arrivalAirportID: segment.ArrivalAirportCode,
        arrivalTerminal: segment.ArrivalAirportTerminalCode,
        travelTime: segment.JourneyTime
    })
}

function extractDate({Year, Month, Day}) {
    return new Date(Year, Month, Day).toLocaleDateString('ru');
}

function parseSegmentText(segment) {
    var segmentText = (segment.querySelector(".flights__leg") || segment.querySelector("span") ).innerText.replace(/\s+/g," ");
    var json =  segment.parentNode.dataset;
    json = json ? json.jsonFlightDescription : null;
    json = json ? JSON.parse(json) : null;
    var [depText, arText] = segmentText.split(/\s+-|—\s+/);
    var depAirport = depText.match(/\((.+?)\)/)[1].split(" ");
    var arAirport = arText.match(/\((.+?)\)/)[1].split(" ");
    return new FlightSegment({
        flightNumber: depText.match(/(.+?),/)[1],
        plane: json ? json.MainFlight.Aircrafts : null,
        departureDate: (depText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        departureTime: depText.match(/\d{2}:\d{2}/)[0],
        departureCity: depText.match(/,\s*(.+?)\s*\(/)[1],
        departureAirportID: depAirport[0],
        departureTerminal: depAirport[1],
        serviceClass: getNodeProperty(segment.querySelector(".flights__cell_class")) || (json ? json.MainFlight.ClassName : null),
        arrivalDate: (arText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        arrivalTime: arText.match(/\d{2}:\d{2}/)[0],
        arrivalCity: arText.match(/\s*(.+?)\s*\(/)[1],
        arrivalAirportID: arAirport[0],
        arrivalTerminal: arAirport[1],
        travelTime: json ? json.MainFlight.JourneyTime : null
    })
}

function getExtraNights(dateStart, dateEnd, fullNights) {
    var nights = getDistance(dayMonthYearToDate(dateStart), dayMonthYearToDate(dateEnd));
    return (fullNights - nights).toString();
}

function getHotelRowByImage() {
    return document.querySelector("#container, .tour-information");
}

function createQuickBookingOption(button) {
    const transfers = querySelectorAll(document, '.transfer tbody tr, .transfer tr')
                    .map(span => parseTransfer(span, 'Трансфер'));
    const insurance = querySelectorAll(document, '.insurance-parameters tbody tr, .booking-service-table.insurance tr')
                     .map(span => parseInsurance(span, 'Страхование'));
    const other = querySelectorAll(document, '.additional-services tbody tr, #additional-container .additional tr')
                     .map(span => parseServices(span));
    const notes = querySelectorAll(document, '.booking-notation input:checked, .note-application  input:checked').map( input => getNodeProperty(input.parentNode,)).join('; ');

    const price = getAgencyPrice();


    const nettPrice = parseFloat(price.replace(/\s+|[A-zА-я]/g, '').replace(/,/g, '.'));
    const nettPriceCurrency = mapCurrency(price.replace(/\d+|\s+|\.|,/g,""));
    const flightType = $$(".not-transfer-flight").find(tr => $1('.external-flight-system', tr)) ? 'Scheduled' : 'Charter';
    const services = {
        insurance,
        transfers,
        other,
        notes,
        price,
        nettPrice,
        nettPriceCurrency,
        flightType
    };
    return services;
}

function getAgencyPrice(value = true, all = false) {
    const natPrice = getNodeProperty(document.querySelector(value ? "#toBePaidPaymentCurrency": "#agencyDiscountPaymentCurrency"), '', "value");
    const engPrice = getNodeProperty(document.querySelector(value ? "#toBePaidPriceCurrency" : "#agencyDiscountPriceCurrency"), '', "value");
    return all ? {natPrice, engPrice} : (isPrefferedDefaultCurrencyUtil() ? natPrice || engPrice : engPrice || natPrice);
}

function parseTransfer(node, caption) {
    const description = $$('td.route, td.typeDescription',node).map(t => getText(t))
    if ( description.length === 0 || description.find(text => text.match(/Трансфер не предоставляется/i)) ) {
        return null;
    }
    const date = getNodeProperty(node.querySelector('.date'));
    return new quickBookingValue({
        description: description.join(', '),
        caption,
        date
    })
}

function parseInsurance(node, caption) {
    const name = getNodeProperty(node.querySelector('.description .name > span, .tourist .name'));
    const risks = querySelectorAll(node, '.mandatory .name, .parameter').map( risk => getNodeProperty(risk));
    const [dateStart, dateEnd] = getNodeProperty(node.querySelector('.period'), '').match(/\d{2}\.\d{2}\.\d{4}/g) || [];
    if ( !name ) {
        return null;
    }
    return new quickBookingValue({
        description: name + ": " + risks.join('; '),
        caption,
        dateStart,
        dateEnd
    })
}

function parseServices(node, caption) {
    const name = node.querySelector('.name');
    if ( !name ) {
        return;
    }
    const description = getNodeProperty(name);
    const price =  getNodeProperty(node.querySelector('.price'));
    const date = getNodeProperty(node.querySelector('.date') || name.nextElementSibling);
    return new quickBookingValue({
        description,
        caption,
        date,
        price: price.replace(/\D+/g, ''),
        currency: mapCurrency(price.replace(/\d+|\s+/g, ''))
    })
}

function parsePassengers() {
    const tourists = querySelectorAll(document, '.tourists tbody tr, .tourists tr').filter(quickBookingsFilterCallback);
    return tourists.map(extractPassengerInfo);
}

function quickBookingsFilterCallback(tr) {
    return tr.clientHeight > 0 && !tr.querySelector('th');
}

function extractPassengerInfo(tourist) {
    const passportNumber = getNodeProperty(tourist.querySelector('.passport'), '');
    const name = getNodeProperty(tourist.querySelector('.name'), '').split(/\s+|\(/);
    if ( name[0].match(/турист/i) ) {
        return new Passenger({
                type: getPassengerTypeUtil(name.join(''))
            }, tourist);
    }
    return new Passenger(
        {
            birthday: getNodeProperty(tourist.querySelector('.birth-date, .date-born')),
            expire: getNodeProperty(tourist.querySelector('.passport-expiration-date .value, .date-validity')),
            lastName: name[0],
            firstName: name[1],
            serial: passportNumber[0]+passportNumber[1],
            number: passportNumber.slice(2),
        }, tourist)
}

function parseClient() {
    const clientNode = document.querySelector('.booking-private-customer');
    if ( !clientNode ) {
        return null;
    }
    const client = new Passenger(
         getInputsValues(clientNode, {
            lastName: "input.private-customer-last-name",
            firstName: "input.private-customer-first-name",
            secondName: "input.private-customer-middle-name",
            birthday: "input.private-customer-date-of-birth",
            issueDate: "input.private-customer-document-issue-date",
            address: "textarea.private-customer-address",
            authority: "textarea.private-customer-document-issuer-name",
            authorityCode: "input.private-customer-document-issuer-code",
            email: "input.private-customer-email",
            phone: "input.private-customer-phone",
            docType: "nationalPassport"
        }), clientNode);
    client.isClient = true;
    client.setDocNumber(getNodeProperty(clientNode.querySelector('input.private-customer-document-number'), '', 'value'));
    return client;
}
