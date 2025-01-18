window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Ростинг" : "Ростинг";
var DEFAULT_CURRENCY = "BYN";
var OPERATOR_CURRENCY = window.operators ? window.operators[window.location.hostname] || "Rosting" : "Rosting";
var CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".operator_info").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.before(qqBtns({align: "qq-horizontal"}));
        }
    });
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex");
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var region = getText(tour.querySelector(".popup-main-order__hotelContent-name-geo")).split(",");
    var price =  getPrice(tour);
    var option = {
        checkinDt: getDate(tour),
        nights: getText(tour.querySelector(".popup-main-order__hotelContent-time-num")),
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector(".popup-main-order__hotelContent-name-txt"), null, "href") || window.location.href,
        book_tour_url: typeof AGENCY_WEBSITE == 'undefined' ? null : window.location.href,
        country: region[0],
        region: region[1].trim(),
        roomType: getNodeProperty(tour.querySelector(".popup-main-order__infoPlace-room"), "", "innerText").replace(/\n/, ", "),
        boardType: getNodeProperty(tour.querySelector(".popup-main-order__infoPlace-food"), "", "innerText").replace(/\n/, ", "),
        price: price.value,
        currency: price.currency,
        city_from: getText(tour.querySelector(".popup-main-order__infoFlight-from-city")),
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(tour.querySelector(".popup-main-order__hotelImg")),
        occupancy: getOccupancy(tour),
        flight: getFlight(tour, img)
    };
    option.flight = addFlightInfo(option.flight, option);
    return option;
}

function getDate(tour) {
    var date = getText(tour.querySelector(".popup-main-order__hotelContent-timeCal-with")).split(" ");
    return dateFromDayAndMonthName(date[1], date[2], date[3]);
}

function getHotelName(tour) {
   var stars = querySelectorAll(tour, ".popup-main-order__hotelContent-star").length;
   var hotel = getText(tour.querySelector(".popup-main-order__hotelContent-name-txt"));
   return stars.length > 0 ? hotel + " " + stars.length + "*" : hotel;

}

function getPrice(tour) {
    var priceR = tour.querySelector(".popup-main-order__application-value-r");
    var priceEu = getText(priceR.nextSibling);
    var price = isPrefferedDefaultCurrencyUtil() ? getText(priceR) : (priceEu || getText(priceR));
    return { value: extractIntFromStr(price.replace(/\D+/g, "")), currency:  mapCurrency(price.replace(/\d+/g, "")) }
}

function mapCurrency(text) {
    switch (text.trim()) {
        case "€":
            return "EUR";
        case "РБ":
            return "RUB";
        case "$":
            return "USD";
        case "BY":
            return "BYN";
        case "руб.":
            return "BYN";
        case "i":
            return "BYN";
        default:
            return text;
    }
}

function getOccupancy(tour) {
  var occupancy = {
    adultsCount: 0,
    childrenCount: 0,
    childAges: null
  };
  var text = getNodeProperty(
    tour.querySelector(".popup-main-order__infoPlace-persons")
  );
  if (!text) {
    return null;
  }

  occupancy.adultsCount = text.match(/(\d+)\s+взр/);
  occupancy.childrenCount = text.match(/(\d+)\s+реб/) || "00";
  if (!occupancy.adultsCount) {
    return null;
  }

  occupancy.adultsCount = +occupancy.adultsCount[1];
  occupancy.childrenCount = +occupancy.childrenCount[1];

  if (occupancy.childrenCount > 0) {
    occupancy.childAges = text.match(/\((.+)\)/);
    occupancy.childAges = occupancy.childAges
      ? occupancy.childAges[1].replace(/[А-я]+|\s/gi, "")
      : null;
  }
  return occupancy;
}

function addFlightInfo(flight, option) {
    try {
        if ( flight ) {
            flight.sectors[0].segments[0].departureCity = option.city_from;
            lastElement(lastElement(flight.sectors).segments).arrivalCity = option.city_from;
        }
        return flight;
    } catch(e) {
        return null;
    }
}

function getFlight(tour, img) {
    try {
        var flightDiv = tour.querySelector(".flight_info");
        if ( !flightDiv ) {
            return null;
        }
        return {
            sectors: querySelectorAll(flightDiv, ".there_transfers, .back_transfers").map(sector => {
                return {
                    segments: querySelectorAll(sector, ".popup-main-order__infoTransfer").map(segment => {
                        var dateDiv = segment.querySelector(".popup-main-order__infoTransfer-date");
                        var date = getText(dateDiv.querySelector(".popup-main-order__infoTransfer-ttl")).split(" ");
                        var times = getText(dateDiv.querySelector(".popup-main-order__infoTransfer-txt")).split("-");
                        var company = querySelectorAll(segment, ".popup-main-order__infoTransfer-company div");
                        return new FlightSegment({
                            flightNumber: getText(company[1]).replace(/\(|\)/g, ""),
                            airline: getText(company[0]),
                            departureDate: dateFromDayAndMonthName(date[0], date[1], date[2]),
                            departureTime: times[0],
                            departureCity: "",
                            arrivalTime: times[1],
                            arrivalCity: ""
                        })
                    })
                };
            })
        };
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage() {
    return document.querySelector(".popup-main");
}
