var OPERATOR_NAME = "ИННА ТУР";
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        city: getNodeProperty(document.querySelector(".main-searchbar__item__departure input"), null, "value")
    };
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, "button.detail-mini-price__btn").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && div.textContent.match(/Забронировать/i)) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var checkinDt = getParameterByName("departureDate").split("-");
        checkinDt = dayMonthYearToString(checkinDt[2],checkinDt[1],checkinDt[0]);
    var outDt = getParameterByName("returnDate").split("-");
    var activeRoom = document.querySelector(".card-room-item_active");
    var price = getText(tour.querySelector(".detail-mini-price__value, .detail-mini-price__btn"));
    var nights = getNights(checkinDt, outDt);
    var flight = getFlight(tour, img);
    var option = {
        checkinDt: checkinDt,
        nights:nights,
        extra_nights: getExtraNights(nights, flight),
        hotelName: getHotelName(document),
        hotel_desc: getNodeProperty(document.querySelector(".detail-description")),
        href: window.location.href,
        country: "",
        region: getNodeProperty(document.querySelector(".detail-info__location")),
        roomType: getNodeProperty(activeRoom.previousElementSibling),
        boardType:  getNodeProperty(activeRoom),
        price: extractIntFromStr(price.replace(/\D/g,"")),
        currency: mapCurrency(price.replace(/\d+|\s+|Забронировать/gi, "")),
        city_from: tour.querySelector(".detail-mini-avia") ? SEARCH_CRITERIA.city : "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector(".description-hotel-slider__photo"), null, "src"),
        occupancy: getOccupancy(),
        flight: flight
    };
    return option;
}

function getNights(checkinDt, outDt) {
    var night = getParameterByName("nights");
    if ( !night ) {
        var outDt = dayMonthYearToString(outDt[2],outDt[1],outDt[0]);
        return getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(outDt)).toString();
    }
    return night;
}

function getExtraNights(nights, flight) {
    if ( flight ) {
        try {
            var dateFrom = flight.sectors[0].segments[0].departureDate;
            var dateTo = lastElement(lastElement(flight.sectors).segments).arrivalDate;
            var extraNights = getDistance(dayMonthYearToDate(dateFrom), dayMonthYearToDate(dateTo)).toString();
            return (extraNights - nights).toString();
        } catch (e) {
            return "0";
        }
    }
    return "0";
}

function getFlight(tour, img) {
    try {
        var miniAirports = querySelectorAll(tour, ".detail-mini-avia__airport").map(port => getText(port));
        var docSectors = querySelectorAll(document, ".avia-card-segment").map(sector => {
            var more = sector.querySelector(".flight-segment-more");
            var segment = sector.querySelector(".flight-segment");
            if ( !more && sector.querySelector(".flight-segment__icon-more") ) {
                segment.click();
                more = sector.querySelector(".flight-segment-more");
            }
            if ( more ) {
                return { segments: parseLargeSegments(sector, more) }
            }

            if ( !more ) {
                return { segments: [parseSmallSegment(sector, segment, miniAirports)]};
            }
        });
        return {sectors: docSectors }
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSmallSegment(sector, segment, miniAirports) {
    var { fromDate, toDate } = getFlightDates(sector);
    var airline = [...(sector.querySelector(".flight-segment__airline") || {"childNodes": []}).childNodes].map( t => t.textContent.trim() ).filter( t=>t );
    var airports = getText(segment.querySelector(".flight-segment__airports-column")).split(" ").map( airport => {
        var foundedInfo = miniAirports.find( port => port.match(airport) );
        return {
            id: airport,
            name: (foundedInfo || "").replace(/\d{2}:\d{2}|\(.+/g,"").trim()
        }
    });
    var time = getNodeProperty(segment.querySelector(".flight-segment__time-column"), "").split(" ");
    return new FlightSegment({
        flightNumber: airline[1],
        airline: airline[0],
        travelTime: getNodeProperty(segment.querySelector(".flight-segment__duration")),
        departureDate: fromDate,
        departureTime: time[0],
        departureAirport: airports[0].name,
        departureAirportID: airports[0].id,
        serviceClass: airline[3],
        arrivalDate: toDate,
        arrivalTime: time[1],
        arrivalAirport: airports[1].name,
        arrivalAirportID: airports[1].id
    })
}

function parseLargeSegments(sector, more) {
    var segmentsParts = querySelectorAll(more, ".flight-segment-more__row, .flight-segment-more__stop");
    var segments = [];
    segments.push(segmentsParts.reduce((newArray, part) => {
            if ( part.classList.contains("flight-segment-more__stop") ) {
                segments.push(newArray);
                newArray = [];
            } else {
                newArray.push(part);
            }
            return newArray;
        }, [])
    );
    var segments = segments.map( segment => {
        var airline = [...segment[3].childNodes].map( t => t.textContent.trim() ).filter( t=>t );
        var depText = getText(segment[0]).match(/(\d{2}:\d{2})(.+?)\(([A-z]{3})\)/);
        var arrText = getText(segment[2]).match(/(\d{2}:\d{2})(.+?)\(([A-z]{3})\)/);
        return new FlightSegment({
            flightNumber: airline[1],
            airline: airline[0],
            travelTime: getText(segment[1]),
            departureDate: "",
            departureTime: depText[1],
            departureCity: "",
            departureAirport: depText[2],
            departureAirportID: depText[3],
            departureTerminal: "",
            serviceClass: airline[3],
            arrivalDate: "",
            arrivalTime: arrText[1],
            arrivalCity: "",
            arrivalAirport: arrText[2],
            arrivalAirportID: arrText[3],
            arrivalTerminal: ""
        })
    });
    var { fromDate, toDate } = getFlightDates(sector);
    segments[0].departureDate = fromDate;
    lastElement(segments).arrivalDate = toDate;
    return segments;
}

function getFlightDates(sector) {
    var titleDate = getNodeProperty(sector.querySelector(".avia-card-segment__title")),
        parsedTitleDate = titleDate.match(/(\d{2})\s+([А-я]+)\./),
        fromDate = getText(document.querySelector(".detail-mini-avia__from").previousElementSibling).match(/([А-я]{3}).+?(\d{2})/),
        toDate = getText(document.querySelector(".detail-mini-avia__to").previousElementSibling).match(/([А-я]{3}).+?(\d{2})/);
    if ( titleDate.match(/Туда/) ) {
        fromDate = dateFromDayAndMonthName(fromDate[2], fromDate[1]);
    } else {
        fromDate = dateFromDayAndMonthName(toDate[2], toDate[1]);
    }

    return {
        titleDate: titleDate,
        parsedTitleDate: parsedTitleDate,
        fromDate: fromDate,
        toDate: dateFromDayAndMonthName(parsedTitleDate[1], parsedTitleDate[2])
    }
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractIntFromStr(getParameterByName("adults") || "0");
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
    var child = extractIntFromStr(getParameterByName("childs") || "0");
    var infants = extractIntFromStr(getParameterByName("infants") || "0");
    occupancy.childrenCount = child + infants;
    occupancy.childAges = [...new Array(child).fill("2-12"), ...new Array(infants).fill("0-2")];
    occupancy.childAges = occupancy.childAges.length === 0 ? null : occupancy.childAges.join(",");
    return occupancy;
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch ( c ) {
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c;
}

function getHotelName(tour) {
    var name = getText(tour.querySelector(".detail-info__name"));
    var stars = tour.querySelectorAll(".detail-info__rating .stars-rating .star__active").length;
    return stars > 0 ? name + " " + stars + "*" : name;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("detail-mini") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}