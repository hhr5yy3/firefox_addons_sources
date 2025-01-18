const OPERATOR_NAME = "Agentskiy";
const showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".agentibe-flights-results__groupList .agentibe-flights-results__flightsListGroup__buyButtonCnt__inner").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-box", asyncFunc: getFlight});
            btns.style.direction = "initial";
            btns.style.margin = "auto";
            div.append(btns);
        }
    });
    querySelectorAll(document, ".agentibe-flights-results__flightsListGroup__buyButtonCnt__inner .qq").forEach(div => {
        if ( !div.parentNode.querySelector(".agentibe-flights-results__flightsListGroup__fullDetails") ) {
            div.remove();
        }
    })

    querySelectorAll(document, ".js-agentibeApp__popupBlock .agentibe-flights-results__flightsGroup__footer__buyButtonContainer").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-box", asyncFunc: getFlight}, createPopupOption);
            btns.style.marginLeft = "auto";
            btns.style.direction = "initial";
            btns.style.marginBottom = "auto";
            div.append(btns);
        }
    });

}

function createOption(img) {
    const tour = getHotelRowByImage(img, ".agentibe-flights-results__groupList__item");
    const flight = JSON.parse(tour.getAttribute("flight-info"));
    let option = createOptionFromFlight(flight, tour)
    const price = tour.querySelector("money");
    option.price = extractIntFromStr(price.getAttribute("amount"));
    option.currency = price.getAttribute("currency");
    return option;
}

function createPopupOption(img) {
    const tour = getHotelRowByImage(img, ".agentibe-flights-results__couplingTable");
    const flight = JSON.parse(tour.getAttribute("flight-info"));
    let option = createOptionFromFlight(flight, tour)
    const price = tour.querySelector(".agentibe-flights-results__flightsGroup__footer__buyButtonContainer money");
    option.price = extractIntFromStr(price.getAttribute("amount"));
    option.currency = price.getAttribute("currency");
    return option;
}

function createOptionFromFlight(flight, tour) {
    const lastSegment = lastElement(lastElement(flight.sectors).segments);
    const startDate = dayMonthYearToDate(flight.sectors[0].segments[0].departureDate);
    const endDate = dayMonthYearToDate(lastSegment.arrivalDate);
    return {
        checkinDt: flight.sectors[0].segments[0].departureDate,
        nights: getDistance(startDate, endDate).toString(),
        hotelName:  getFlightName(flight) ,
        href: null,
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        city_from: flight.sectors[0].segments[0].departureCity,
        operator: window.OPERATOR_NAME,
        flight,
        product_type: "Flight"
    };
}

function getFlightName(flight) {
    const lastSegment = lastElement(lastElement(flight.sectors).segments);
    const firstSegment = flight.sectors[0].segments[0];
    if ( flight.sectors.length === 2 &&
        firstSegment.departureCity === lastSegment.arrivalCity &&
        lastElement(flight.sectors[0].segments).arrivalCity === lastElement(flight.sectors).segments[0].departureCity ) {
        return`${firstSegment.departureCity} ⟷ ${lastElement(flight.sectors[0].segments).arrivalCity}`
    }
    return decorateDestinationCities(flight);
}

function decorateDestinationCities(flight) {
     return flight.sectors.map( sector => {
      const lastSegment = lastElement(sector.segments);
      const firstSegment = sector.segments[0];
      return `${firstSegment.departureCity} ➝ ${lastSegment.arrivalCity}`;
     }).join(" / ")
}

function getHotelRowByImage(img, sel) {
    return img.closest(sel)
}

async function getFlight(img) {
    try {
        const tour = getHotelRowByImage(img, ".agentibe-flights-results__groupList__item") ||
                     getHotelRowByImage(img, ".agentibe-flights-results__couplingTable");
        const detailsButtons = querySelectorAll(tour, `.agentibe-flights-results__flightsListGroup__fullDetails, 
                                                     .js-flights-couplingTable__group__item_selected
                                                     .agentibe-flights-results__couplingTable__groups__group__item__details`);
        const sectors = await extractSectorsNodes(detailsButtons);

        tour.setAttribute("flight-info", JSON.stringify({sectors}))
        return {sectors};
    } catch (e) {
        console.log(e);
    }
}

async function extractSectorsNodes(detailsButtons) {
    const sectors = [];
    for ( let button of detailsButtons ) {
        button.click();
        const popup = await waitingFor(getPopup, 100, 5);
        const closeBtn = popup.querySelector("button.ui-dialog-titlebar-close");
        const sector = querySelectorAll(popup, ".agentibe-flights-flightInfo__leg").map(parseSector);
        sectors.push(...sector);
        if ( closeBtn ) {
            closeBtn.click();
        }
    }
    return sectors;
}

function getPopup() {
    const popup = querySelectorAll(document, ".agentibe-flights-results__flightInfoPopup").find(popup => popup.offsetHeight > 0);
    if ( !popup ) {
        return null;
    }
    return popup;
}

function parseSector(sector) {
    const segments = querySelectorAll(sector,".agentibe-flights-flightInfo__leg__segments .agentibe-flights-flightInfo__leg__segment");
    const footer = sector.querySelector(".agentibe-flights-flightInfo__leg__footer");
    const parsedSegments = segments.map(parseSegment);
    return {segments: parsedSegments, sectorTravelTime: getText(footer.querySelector("[class$='item_timeEnRoute'] [class$='item__value']"))}
}

function parseSegment(segment) {
   const departure = segment.querySelector(".agentibe-flights-flightInfo__leg__segment__departure");
   const arrival = segment.querySelector(".agentibe-flights-flightInfo__leg__segment__arrival");
   const additional = segment.querySelector(".agentibe-flights-flightInfo__leg__segment__additional");

   const depAirport = getText(departure.querySelector('.agentibe-flights-flightInfo__leg__segment__airport__value')).split(", ");
   const arrAirport = getText(arrival.querySelector('.agentibe-flights-flightInfo__leg__segment__airport__value')).split(", ");

   const depCity = getText(departure.querySelector('.agentibe-flights-flightInfo__leg__segment__city')).split(" (");
   const arrCity = getText(arrival.querySelector('.agentibe-flights-flightInfo__leg__segment__city')).split(" (");
   const parsedSegment = new FlightSegment({
       flightNumber: getNodeProperty(additional.querySelector("[class*='item_flightNumber'] [class*='item__value']")),
       airline: getNodeProperty(additional.querySelector("[class*='item_carrier'] [class*='item__value']")),
       travelTime: getNodeProperty(additional.querySelector("[class*='item_timeEnRoute'] [class*='item__value']")),
       plane: getNodeProperty(additional.querySelector("[class*='item_aircraft'] [class*='item__value']")),
       departureDate: parseFlightDate(getText(departure.querySelector(".agentibe-flights-flightInfo__leg__segment__date"))),
       departureTime: getText(departure.querySelector(".agentibe-flights-flightInfo__leg__segment__time")),
       departureCity: depCity[0],
       departureAirport: depAirport[0],
       departureTerminal: getNodeProperty(departure.querySelector(".agentibe-flights-flightInfo__leg__segment__terminal__value")),
       serviceClass: getNodeProperty(additional.querySelector("[class*='item_class'] [class*='item__value']")),
       arrivalDate: parseFlightDate(getText(arrival.querySelector(".agentibe-flights-flightInfo__leg__segment__date"))),
       arrivalTime: getText(arrival.querySelector(".agentibe-flights-flightInfo__leg__segment__time")),
       arrivalCity: arrCity[0],
       arrivalAirport: arrAirport[0],
       arrivalTerminal: getNodeProperty(arrival.querySelector(".agentibe-flights-flightInfo__leg__segment__terminal__value")),
       baggage: getNodeProperty(additional.querySelector("[class*='item_baggage'] [class*='item__value']"))
   });
   return parsedSegment;
}

function parseFlightDate(dateText) {
    const splitText = dateText.split(/\s|,/);
    return dateFromDayAndMonthName(...splitText);
}