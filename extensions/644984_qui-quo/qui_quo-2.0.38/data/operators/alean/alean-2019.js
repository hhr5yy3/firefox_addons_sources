const OPERATOR_NAME = "Алеан";
const showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        city: (selectedOption(document.querySelector("#finder-tspTownSelect:not([disabled='disabled'])")) || "").split(",")[0],
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector("button.finderCatalog-submit, button.finderProductObj-submit");
}

function injectData() {
    $$( ".resultProductRoomsExpanded-offers .resultProductRoomsExpanded-offer .resultProductRoomsExpanded-offerCostCol").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", asyncFunc: getFlight}));
        }
    });
    $$( ".resultProductExc-offers .resultCost, tr .resultProductOffers-td--cost").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}, createExcursOption));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const room = getHotelRowByImage(tour, "resultProductRoomsExpanded");
    let region = getNodeProperty($first(".product-address"), '').split(",");
    if ( region.length === 1 ) {
        region = $$('.breadcrumbs .breadcrumbs-link').map(a=> getText(a)).filter(t=>t);
    }
    const priceText = getText(tour.querySelector(".resultCost-final"));
    let dates = querySelectorAll(tour,"[ng-bind*='Begin|simDate'], [ng-bind*='End|simDate']").map(date => getText(date));
    if ( dates.length < 1 ) {
        dates = querySelectorAll(tour,"[ng-bind*='Begin'], [ng-bind*='End']").map(date => appendYear(...getText(date).split(".")));
    }
    const flight = JSON.parse(tour.getAttribute("flight-info") || null);
    const hotel = document.querySelector(".product-title");
    const hotelStars = hotel.className.match(/(\d)star/);
    const country = querySelectorAll(document, ".product .breadcrumbs-link");
    const descNode = $$(".productSection").find(sec => sec.querySelector('.aleanIcons-complex'));
    const cleanRegion = region.length > 3 ? region.slice(1).slice(0, -2) : region.slice(1);
    //const cleanRegion = region.length > 3 ? region.slice(1) : region.slice(1);
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: `${getText(hotel)} ${hotelStars ? hotelStars[1]+"*" : ""}`,
        hotel_desc: descNode ? getNodeProperty(descNode.querySelector('.productSection-content')) : null,
        href: window.location.href,
        country: country.length > 1 ? getText(country[1]) : region[0].trim(),
        region: country.length > 1 ? cleanRegion.filter( elem => !elem.match(getText(country[1]))).join(", ") : cleanRegion.join(", "),
        roomType: getText(room.querySelector(".resultProductRoomsExpanded-name")),
        boardType: querySelectorAll(tour, ".ksbOfferPacket-serviceItem").map( item => getText(item) ).join() ||
                   getNodeProperty(tour.querySelector(".ksbOfferPacket-info"),  "").replace(/проживание,/i, ""),
        price: extractIntFromStr(priceText.replace(/\D+/g,"")),
        currency: mapCurrency(priceText.replace(/\d+/g,"").trim()),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector(".productGallery-fullPic.js-fullPic"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    option.flight = addFlightInfo(flight, option);

    return option;
}

function addFlightInfo(flight, option) {
    if ( flight && flight !== "null") {
        flight.sectors[0].segments[0].arrivalCity = lastElement(flight.sectors).segments[0].departureCity;
        lastElement(flight.sectors).segments[0].arrivalCity = flight.sectors[0].segments[0].departureCity;

        flight.sectors[0].segments[0].arrivalAirport = lastElement(flight.sectors).segments[0].departureAirport;
        lastElement(flight.sectors).segments[0].arrivalAirport = flight.sectors[0].segments[0].departureAirport;
    }
    return flight;
}

function mapCurrency(c) {
    switch (c.toLowerCase()) {
        case "р.":
            return "RUB";
        default:
            return c;
    }
}

async function getFlight(img) {
    const tour = getHotelRowByImage(img);
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    try {
        const ticketCircle = tour.querySelector('[ng-click*="howTicket"]');
        if ( ticketCircle ) {
            ticketCircle.click();
            const resultTicket = await waitingFor(getResultTicket, 50, 10);
            if ( resultTicket ) {
                const flight = parseFlight(resultTicket);
                if ( flight ) {
                    tour.setAttribute("flight-info", JSON.stringify(flight));
                }
                const closeBtn = await waitingFor(() => resultTicket.closest(".opentip-container").querySelector(".ot-close"), 50, 10);
                if ( closeBtn ) {
                    closeBtn.click();
                }
            }
            return null;
        }
    } catch (e) {
        return null;
    }
}

async function getResultTicket() {
   return document.querySelector(".opentip-container .resultTicket");
}

function parseFlight(resultTicket) {
    const sectors = querySelectorAll(resultTicket, ".resultTicket-block").map(sector => {
       const lines = querySelectorAll(sector, ".resultTicket-line").map( line => getText(line));
       const airport = getLineTextByCaption("Из аэропорта", lines);
       return  {
            segments: [new FlightSegment({
                departureTime: (getLineTextByCaption("Вылет в", lines).match(/\d{2}:\d{2}/) || "")[0],
                departureCity: (airport.match(/\((.+)\)/) || "")[1],
                departureAirport: airport.replace(/\(.+\)/, ""),
                flightNumber: getLineTextByCaption("Рейсом", lines),
                arrivalCity: "Нет данных"
            })]
        }
    });
   return {sectors: sectors}
}

function getLineTextByCaption(caption, lines) {
    const foundLine = lines.find(line => line.match(caption));
    return foundLine ? foundLine.replace(caption, "") : "";
}


function createExcursOption(img) {
    const tour = getHotelRowByImage(img, "ng-scope");
    const dates = querySelectorAll(tour, "[ng-bind*='Begin|simDate'], [ng-bind*='End|simDate']").map(date => getText(date));
    const priceText = getText(tour.querySelector(".resultCost-final"));
    const productList = querySelectorAll(document, ".productExc-info .productTwoColsList-listRow, .productCamp-commonInfo .productTwoColsList-listRow")
        .map(line => getText(line, "innerText"));
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: getText(document.querySelector(".product-title")),
        href: window.location.href,
        country: getNodeProperty(document.querySelectorAll(".breadcrumbs-item")[1], ""),
        region: getLineTextByCaption(/Данный тур начинается .+? заканчивается|Адрес/i, productList).trim(),
        roomType: getText(tour.querySelector('.resultProductOffers-roomName, [ng-bind*="it.RoomCategoryID"]')),
        boardType: getNodeProperty(tour.querySelector('span[ng-bind*="Name"]')),
        comment: getLineTextByCaption("Города в экскурсии", productList).trim(),
        price: extractIntFromStr(priceText.replace(/\D+/g, "")),
        currency: mapCurrency(priceText.replace(/\d+/g, "").trim()),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector(".productGallery-fullPic.js-fullPic"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: true
    };
    return option;
}


function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let adults = getNodeProperty(document.querySelector(".iPassengersPicker-editAdultCount"), "").replace(/\D+/g, "");
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults);
    let childs = querySelectorAll(document, ".iPassengersPicker-child");
    occupancy.childrenCount = childs.length;
    if ( childs.length > 0 ) {
        occupancy.childAges = childs.map(child => getNodeProperty(child, "").replace(/\D+/g, "")).join()
    }
    return occupancy;
}

function getHotelRowByImage(img, className = "resultProductRoomsExpanded-offer") {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains(className) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
