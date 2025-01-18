window.OPERATOR_NAME = "TUI";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".Price-block ").forEach(div => {
        if ( !div.querySelector(".qq") && getNodeProperty(document.querySelector(".price-line.total .value")) ) {
            const buttons = qqBtns({align: "qq-horizontal"});
            buttons.style.padding = "0px 15px";
            div.append(buttons);
        }
    });
}

function createOption(img) {
    const hotel = getHotelRowByImage(img);
    const title = getText(hotel.querySelector(".hotel-info__item-title"));
    const [country, region, date, days, nights] = title.split(",");
    const hotelName = hotel.querySelector(".hotel-info__hotel-name");
    const stars = querySelectorAll(hotelName, '.Stars .star:not(.empty-star)').length;
    const price = document.querySelector(".price-line.total .value")
    const flight = getFlight();
    let option = {
        checkinDt: dateFromDayAndMonthName(date.replace(/\D+/g, ""), lastElement(date.split(" "))),
        nights: nights.replace(/\D+/g, ""),
        hotelName: `${getText(hotelName)}${stars > 0 ? " " + stars + "*" : ""}`,
        href: window.location.href,
        country,
        region,
        roomType: getText(hotel.querySelector(".hotel-info__hotel-room")),
        boardType: getText(hotel.querySelector(".hotel-info__hotel-meal")),
        price: extractIntFromStr(getText(price).replace(/\D+/g, "")),
        currency: mapCurrencyUtil(getText(price.querySelector(".currency"))),
        city_from: flight && flight.sectors ? flight.sectors[0].segments[0].departureCity : "",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(hotel.querySelector('.hotel-info__pic')),
        occupancy: null,
        flight: flight
    };
    return option;
}

function getFlight() {
    try {
        const flightOptions = document.querySelector('.flights-options');
        if ( !flightOptions ) {
            return null;
        }
        const sectors = querySelectorAll(flightOptions, ".flights-item-block:not(.hidden) .segment")
                       .map(parseSector);
        return { sectors }
    } catch (e) {
        return null;
    }
}

function parseSector(sector) {
     const segments = querySelectorAll(sector, ".flight-description").map(parseSegment);
     return {segments}

}

function parseSegment(segment) {
    const [departureTime, departureDate] = getNodeProperty(segment.querySelector(".startDate"),"").match(/(\d{2}:\d{2})|(\d{2}\.\d{2}\.\d{4})/g) || [null, null];
    const [airline, flightNumber, serviceClass] =  getText(segment.querySelector(".airLineInfo")).split("|").map(elem=>elem.trim());
    const infoBlocks =  querySelectorAll(segment, ".time-info-block");

    const [depInfoBlock, arrInfoBlock] = [...infoBlocks];

    const [departureAirportID, departureAirport]  = getText(depInfoBlock.querySelector(".port")).split("-").map(elem=>elem.trim());
    const departureCity = departureAirport.split(",").map(elem=>elem.trim())[0];

    const [arrivalAirportID, arrivalAirport]  = getText(arrInfoBlock.querySelector(".port")).split("-").map(elem=>elem.trim());
    const arrivalCity = arrivalAirport.split(",").map(elem=>elem.trim())[0];

    return new FlightSegment({
            flightNumber,
            travelTime: getNodeProperty(segment.querySelector(".duration")),
            airline,
            departureDate,
            departureTime,
            departureCity,
            departureAirport,
            departureAirportID,
            serviceClass,
            arrivalTime: getNodeProperty(arrInfoBlock.querySelector(".time")),
            arrivalCity,
            arrivalAirport,
            arrivalAirportID,
        })
}

function getHotelRowByImage(img) {
    return document.querySelector(".hotel-info__item");
}