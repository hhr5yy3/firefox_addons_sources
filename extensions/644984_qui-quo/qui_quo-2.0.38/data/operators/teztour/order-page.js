//Агентская страница бронирования
var OPERATOR_NAME = "Tez";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    var userInfo = document.querySelector("#userInfo-place");
    if ( userInfo && !document.querySelector(".qq") ) {
        userInfo.after(createCell());
    }
}

function createCell() {
    var btn = qqBtns({align: "box"});
    btn.style.position = "sticky";
    btn.style.top = "0";
    btn.style.marginLeft = "101%";
    btn.style.marginTop = "1%";
    return btn;
}

function createOption(img) {
    var hotel = document.querySelector('.residence');
    var date = getText(hotel.querySelector(".checkInLab"));
    var mainTab = document.querySelector(".infoMainTab");
    var fullPrice = getNodeProperty(mainTab.querySelector("td.st"), "", "innerText");
    var flights = getFlight(img);
    var option = {
        checkinDt: date,
        nights: getNights(date, hotel),
        hotelName: getText(hotel.querySelector(".hotelLab")),
        href: getNodeProperty(hotel.querySelector(".hotelLab a"), null, "href"),
        roomType: getText(hotel.querySelector(".hotelRoomLab")),
        boardType: getText(hotel.querySelector(".hotelPansLab")),
        country: getText(mainTab.querySelector("td:not(.th)")),
        region: getText(hotel.querySelector(".regLab")),
        price: extractIntFromStr(fullPrice),
        currency: mapCurrency(fullPrice),
        city_from: flights ? flights.sectors[0].segments[0].departureCity : 'Нет данных',
        operator: 'Tez',
        flight: flights,
        occupancy: null
    };
    return option;
}

function getNights(checkinDt, hotel) {
    var checkoutDate = dayMonthYearToDate(getText(hotel.querySelector(".checkOutLab")));
    return getDistance(dayMonthYearToDate(checkinDt), checkoutDate) + "";
}

function mapCurrency(price) {
    var matcher = (price.match(/Евро|Рубль|Доллар США|EUR|USD/) || "")[0];
    switch (matcher) {
        case "Доллар США":
            return "USD";
        case "Рубль":
            return "RUB";
        case "Евро":
            return "EUR";
        case "EUR":
            return "EUR";
        case "USD":
            return "USD";
        default:
            return (price.match(/:\s+\d+\s+([А-я])/) || "")[1];
    }
}

function getFlight() {
    try {
        var checked = querySelectorAll(document, '[name="flightPair"]').find(inp => inp.checked === true);
        if ( !checked ) {
            return null;
        }
        var tr = checked.parentNode.parentNode.parentNode;
        var ticketSectors = parseTicketSectors(tr);
        var stops = collectStops(tr);
        if ( stops.dStops.length < 2 && stops.aStops.length < 2 ) {
            return ticketSectors;
        }
        return createFullFlight(ticketSectors, stops);
    } catch (e) {
        return null;
    }
}

function collectStops(tr) {
    var dStops = getNodeProperty(tr.querySelector(".dep .peresadka"), "", "innerText").split(/Длительность пересадки:\d+:\d+/);
    var aStops = getNodeProperty(tr.querySelector(".arr .peresadka"), "", "innerText").split(/Длительность пересадки:\d+:\d+/);
    return {dStops: dStops, aStops: aStops}
}

function createFullFlight(ticketSectors, stops) {
    var dSegments = {
        segments: stops.dStops.map((arr, index, array) => {
            return parseStopsSegment(arr, index, array, ticketSectors.sectors[0].segments[0])
        })
    };
    var aSegments = {
        segments: stops.aStops.map((arr, index, array) => {
            return parseStopsSegment(arr, index, array, ticketSectors.sectors[1].segments[0])
        })
    };
    return {
        sectors: [dSegments, aSegments]
    }
}

function parseStopsSegment(arr, index, array, segment) {
    var departure = index < 1 ? (isLastElement(array, index) ? prepareSplittedTextSegment(array[index - 1]) : null) : prepareSplittedTextSegment(array[index - 1]);
    var arrival = prepareSplittedTextSegment(arr);
    return {
        flightNumber: arrival.numberAndTtime[0].trim(),
        airline: arrival.splitArr[4].trim(),
        departureDate: arrival.date[0],  //почему то они решили поместить в место прилета дату и время вылета...
        departureTime: arrival.date[1],
        departureCity: departure ? departure.airport[1].trim() : segment.departureCity,
        departureAirport: departure ? null : segment.departureAirport,
        departureAirportID: departure ? departure.airport[2] : null,
        departureTerminal: null,
        serviceClass: arrival.splitArr[3].replace(/Места|:/ig, "").trim(),
        arrivalDate: isLastElement(array, index) ? segment.arrivalDate : null,
        arrivalTime: isLastElement(array, index) ? segment.arrivalTime : null,
        arrivalCity: arrival.airport[1].trim(),
        arrivalAirport: null,
        arrivalAirportID: arrival.airport[2],
        arrivalTerminal: null,
        travelTime: arrival.numberAndTtime[1].trim(),
        plane: arrival.splitArr[5].trim()
    }
}

function isLastElement(array, index) {
     return (array.length - 1) === index;
}

function prepareSplittedTextSegment(arr) {
    var splitDepArr = arr.split("–›");
    var splitArr =  splitDepArr[1].split("~");
    return {
        splitArr: splitArr,
        date: splitArr[1].trim().split(" "),
        numberAndTtime: splitArr[2].split("В пути:"),
        airport: splitArr[0].match(/(.+?)\((.+)\)/) || ""
    }
}

function parseTicketSectors() {
    var ticketTabTds = querySelectorAll(document, ".ticketsTab td.tr2, .ticketsTab td.tr1");
    var forward = [];
    var reverse = [];

    for ( var key in ticketTabTds ) {
        if ( key % 2 === 0 ) {
            forward.push(ticketTabTds[key])
        } else {
            reverse.push(ticketTabTds[key])
        }
    }
    return {
        sectors: [forward, reverse].map(tds => {
            var dDate = getText(tds[3]).split(" ");
            var aDate = getText(tds[4]).split(" ");
            var dAirport = getText(tds[5]).split(",");
            var aAirport = getText(tds[6]).split(",");
            return {
                segments:
                    [{
                        flightNumber: getText(tds[2]).split("...")[0].trim(),
                        airline: getText(tds[0]).split("...")[0].trim(),
                        departureDate: dDate[0],
                        departureTime: dDate[1],
                        departureCity: dAirport[0].trim(),
                        departureAirport: dAirport[1] ? dAirport[1].trim() : null,
                        departureAirportID: null,
                        departureTerminal: null,
                        serviceClass: "",
                        arrivalDate: aDate[0],
                        arrivalTime: aDate[1],
                        arrivalCity: aAirport[0],
                        arrivalAirport: aAirport[1],
                        arrivalAirportID: null,
                        arrivalTerminal: null,
                        travelTime: getText(tds[7]),
                        plane: getText(tds[8]).split("...")[0].trim(),
                    }]
            }
        })
    }
}
