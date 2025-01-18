window.OPERATOR_NAME = "Mouzenidis";
window.injectionSelector = 'body';
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    const summary = document.querySelector(".summary-total");
    if ( summary && !document.querySelector(".qq") ) {
        summary.after(createQQContainer());
    }
}

function createOption(button) {
    const hotels = querySelectorAll(document, ".basket-hotel");
    const dates = hotels.map(getDateAndNights);
    const nights = dates.reduce( (sum, date) =>  {  sum += parseInt(date.nights); return sum }, 0);
    const dataSpansArray = document.querySelectorAll(".basket-tour-data span");
    const rooms = hotels.map(h => {
        const text = getText(h.querySelector(".basket-hotel-info-room"));
        const accommodation = text.split(/\s+/).find(str => str.match(/\d/));
        const room = accommodation ? text.replace(accommodation, '').trim() : text;
        return [room, accommodation].filter(s => s).join(', ');
    });
    const price = extractIntFromStr(getText(document.querySelector(".summary-total-info")).replace(/\D+/g, ""));
    const currency = getCurrency();
    const nettPrice = parseFloat(getNodeProperty(lastElement($$(".summary-agency-item-sum")), "").replace(/\D+/g, "")) || null;
    const prices = new Prices();
    const priceType = mapPriceType(currency);
    prices[`${priceType}`].gross = price;
    prices[`${priceType}`].nett = nettPrice;
    prices[`${priceType}`].currency = currency;
    return {
        checkinDt: dates[0].checkinDt,
        nights: nights.toString(),
        hotelName: hotels.map(getHotelName).join(" / "),
        href: getNodeProperty(document.querySelector(".basket-hotel-info-title a"), null, "href"),
        roomType: rooms.join(" / "),
        boardType: hotels.map(h => getText(h.querySelector(".basket-hotel-info-meals"))).join(" / "),
        country: getText(dataSpansArray[1]),
        region: hotels.map(h => getText(h.querySelector(".basket-hotel-info-city"))).join(" / "),
        price: extractIntFromStr(getText(document.querySelector(".summary-total-info")).replace(/\D+/g, "")),
        currency: getCurrency(),
        prices,
        city_from: getText(dataSpansArray[0]).replace(/Без перелета/i, "").trim(),
        operator: OPERATOR_NAME,
        flight: getFlight(),
        occupancy: null,
        thumbnail: getNodeProperty(document.querySelector(".basket-hotel-image img"), null, "src")
    };
}

function getDateAndNights(hotel) {
    const dates = getText(hotel.querySelector('.basket-hotel-tour-info-item'));
    const checkinDt = dates.match(/(\d{2})\s+(.+?)\s+(\d{4})/);
    return {
        nights: dates.match(/(\d+)\s+ноч/)[1],
        checkinDt: dayMonthYearToString(checkinDt[1], monthNameToNumber(checkinDt[2]), checkinDt[3])
    }
}

function getHotelName(hotel) {
    const hotelName = getText(hotel.querySelector(".basket-hotel-info-title").firstChild);
    let stars = hotel.querySelector(".stars-container");
    stars = stars ? " " +stars.title : "";
    return hotelName + stars;
}

function getCurrency() {
    let icon = document.querySelector(".summary-total-info svg");
    icon = icon ? icon.dataset.icon : getText(document.querySelector(".summary-total-info"));
    switch (icon.replace(/\d+/g,"").trim()) {
        case "euro-sign-custom": return "EUR";
        case "ruble-sign-custom": return "RUB";
        case "dollar-sign-custom": return "USD";
        case "EUR": return "EUR";
        case "RUR": return "RUB";
        case "₽": return "RUB";
        case "USD": return "USD";
        case "KZT": return "KZT";
        case "UAH": return "UAH";
        default: return icon.replace(/\d+/g,"").trim();
    }
}

function getFlight() {
    try {
        const sectorsCards = querySelectorAll(document, ".flights .flight-item");
        if ( sectorsCards.length < 1 ) {
            return null;
        }
        return {
            sectors: sectorsCards.map(sector => parseSector(sector))
        };
    } catch (e) {
        return null;
    }
}

function parseSector(sector) {
    const segments = [];
    const segmentParts = querySelectorAll(sector, ".flight-info-row")
        .reduce((acc, elem) => acc.concat(elem.innerText.split(/\n/)), []);
    const layovers = sector.querySelector(".flight-layover");
    const link = layovers.querySelector(".link");
    const layoversCount = getNodeProperty(layovers, "").match(/(\d+)\s*перес/);
    const connections = (getNodeProperty(document.querySelector('.flight-result-details-item-connections'), "").match(/\((.+?)\)/) || "")[1];
    if ( layovers && link && layoversCount ) {
        link.click();
        for ( let i = 0; i < +layoversCount[1] + 1; i++ ) {
            segments.push(i % 2 === 0 ? new FlightSegment({arrivalAirportID: connections}) :
                                        new FlightSegment({departureAirportID: connections}));
        }
    } else {
        segments.push(new FlightSegment());
    }
    querySelectorAll(document, '[data-component="modal-header"]  .icon').forEach( icon => icon.parentNode.click());
    Object.assign(segments[0], new RouteObj(segmentParts, true));
    Object.assign(segments[segments.length - 1], new RouteObj(segmentParts, false));
    segments[0].airline = getNodeProperty(sector.querySelector(".airline-name"), null, "textContent");
    segments[0].flightNumber = getNodeProperty(sector.querySelector(".flight-header .header-info-block"), null, "textContent");
    return {segments: segments};
}

function RouteObj(segmentParts, isDeparture) {
    if ( isDeparture ) {
        const depDate = segmentParts[5].match(/(\d{2})\s+(.+?)\s+(\d{4})/);
        this.departureAirportID = ((segmentParts[0].split(",")[1] || "").trim().match(/[A-Z][A-Z0-9]{2,3}/) || "")[0];
        this.departureTime = segmentParts[3];
        this.departureCity = segmentParts[0].split(",")[0].trim();
        this.departureDate = dayMonthYearToString(depDate[1], monthNameToNumber(depDate[2]), depDate[3])
    } else {
        const arrDate = segmentParts[7].match(/(\d{2})\s+(.+?)\s+(\d{4})/);
        this.arrivalAirportID = ((segmentParts[2].split(",")[1]|| "").trim().match(/[A-Z][A-Z0-9]{2,3}/) || "")[0];
        this.travelTime = segmentParts[1];
        this.arrivalTime = segmentParts[4];
        this.arrivalDate = dayMonthYearToString(arrDate[1], monthNameToNumber(arrDate[2]), arrDate[3]);
        this.arrivalCity = segmentParts[2].split(",")[0].trim();
    }
}


function getHotelRowByImage() {
    return document.querySelector(".basket-hotel");
}

function createQuickBookingOption() {
    const transfers = $$('.transfer-info')
        .map(span => parseTransfer(span, 'Трансфер'));
    const insurance = deduplicateCollectionByField($$('.basket-tourist-form-visa-button-text')
        .filter(span => getText(span).match(/Страховка|Страхування/i))
        .map(parseInsurance), 'description');
    const notes = getNodeProperty(document.querySelector('.booking-payment-text textarea'), null, 'value');
    const tourOperatorReference = window.location.pathname.match(/orders\/([A-Z0-9]+)\/*/);
    const services = {
        insurance,
        transfers,
        notes,
        nettPrice: parseFloat(getNodeProperty(lastElement($$(".summary-agency-item-sum")), "").replace(/\D+/g, "")) || null,
        nettCurrency: getCurrency(),
        tourOperatorReference: tourOperatorReference ? tourOperatorReference[1] : null
    };
    return services;
}

function parseTransfer(transferInfo) {
    const transferSelect = getNodeProperty(transferInfo.parentNode.querySelector('.transfer-selecting .select__single-value'));
    const description = [getNodeProperty(transferInfo.querySelector('.transfer-info-name'), ''), transferSelect]
        .filter(text => text && !text.match(/не в.брана/)).join('; ');
    const date = getNodeProperty(transferInfo.querySelector('.transfer-info-date')).split(/\s+/);
    return new quickBookingValue({
        description,
        date: dateFromDayAndMonthName(...date),
        caption: "Трансфер"
    });
}

function parseInsurance(insuranceInfo) {
     insuranceInfo.click();
     const info = document.querySelector('.basket-tourist-form-visa-dropdown-item');
     const type = getNodeProperty(insuranceInfo);
     const description = getNodeProperty(info.querySelector('.select__single-value'));
     const dates = getNodeProperty(info.querySelector('.services-timeline-date'), '').split('-');
     simulateEvent(document.body, "mousedown");
     return new quickBookingValue({
         description: [type, description].join('; '),
         dateStart: dates[0],
         dateEnd: dates[1]
     });
}

function parsePassengers() {
    const tourists = querySelectorAll(document, ".tourist-info, .basket-tourist-form");
    return tourists.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
            birthday: ".date-of-birth input",
            expire: ".passport-date input",
            lastName: "[name*='lastName']",
            firstName: "[name*='firstName']"}), panel);
    const number = getNodeProperty(panel.querySelector('.passport input[name*="passport"]'), '', 'value');
    passenger.docType = mapDocType(getNodeProperty(panel.querySelector('.passport .dropdown-trigger'))) || parseDocType(number);
    passenger.setDocNumber(number);
    passenger.nationality = getNodeProperty(panel.querySelector('[id*="citizenshipId"]'));
    passenger.type = getPassengerTypeUtil(getNodeProperty(panel.querySelector('.tourist-age'), ''));

    return passenger;
}

function parseDocType(number) {
    number = number.replace(/\D+/g, '');
    if ( number.length === 10 ) {
        return 'nationalPassport'
    }
    if ( number.length === 9 ) {
        return 'internationalPassport'
    }
}

function parseClient() {
    const client = new Passenger({
        phone: getNodeProperty(document.querySelector('.booking-payment-phone input'), null, 'value'),
        isClient: true
    });
    return client.phone && client.phone.length > 9 ?  client : null;
}
