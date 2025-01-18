var OPERATOR_NAME = "level.travel";

function getSearchButton() {
    return document.querySelector(".search-form-submit button");
}

function initializeSearchCriteria() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".explore-hotel-button").forEach(function (div) {
        if (!div.parentNode.querySelector(".qq") && !div.closest(".suggested-hotel")) {
            div.after(qqBtns({align: "box"}, createTableOption));
        }
    });
    querySelectorAll(document, ".checkout-flights__item .checkout-flight__submit").forEach(function (btn) {
        if (!btn.parentNode.querySelector(".qq")) {
            btn.after(qqBtns({align: "horizontal"}, createPackageOption));
        }
    });
}

function createTableOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: window.location.href.match(/-departure-(\d{2}.\d{2}.\d{4})/)[1],
        nights: getTableNights(hotel),
        hotelName: getTableHotelName(hotel),
        href: getNodeProperty(hotel.querySelector(".hotel-explore-link"), null, "href"),
        roomType: "",
        region: getText(hotel.querySelector(".location-label")) || "",
        boardType: "",
        price: getTablePrice(hotel),
        currency: mapTableCurrency(hotel),
        country: getTableCountry(),
        city_from: getTableCity(hotel),
        excursion: false,
        thumbnail: getNodeProperty(hotel.querySelector(".slide.selected img"), null, "src"),
        occupancy: getTableOccupancy()
    };
    option.region = option.region.replace(", " + option.country, "").trim();
    return option;
}

function getTableNights(hotel) {
    var orderParams = getText(hotel.querySelector(".hotel__order-params"));
    return orderParams.match(/(\d+)\s+ноч/)[1];
}

function getTableHotelName(hotel) {
    var title = getText(hotel.querySelector(".hotel-explore-link"));
    var stars = hotel.querySelector(".hotel-stars-current");
    stars = stars ? stars.className.match(/\d+/) : null;
    return stars ? title + " " + stars[0] + "*" : title;
}

function getTablePrice(hotel) {
    return extractIntFromStr(hotel.querySelector(".hotel__price").textContent.replace(/\D+/g, ""));
}

function mapTableCurrency(hotel) {
    var text = hotel.querySelector(".hotel__price, .checkout-summary__total").textContent.replace(/\d+/g, "").trim();
    switch (text) {
        case "₽":
            return "RUB";
        default:
            return text;
    }
}

function getTableCountry() {
    var country = document.querySelector(".search-form-destination em");
    return country ? country.textContent : null;
}

function getTableCity(hotel) {
    var city = window.location.href.match(/search\/(.+?)-/);
    var isFlightInc = (getText(hotel.querySelector(".hotel__pricing-flight-label")) || "").match(/с перелётом/i);
    return isFlightInc && city ? city[1] : "";
}

function getTableOccupancy() {
    var text = window.location.href;
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = text.match(/(\d+)-adults/);
    var childAges = text.match(/\((.+)\)-kids/);
    if (!adults) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    if (!childAges) {
        occupancy.childrenCount = 0;
    } else {
        occupancy.childrenCount = text.match(/\((.+)\)-kids/)[1].split(",").length;
        occupancy.childAges = text.match(/\((.+)\)-kids/)[1];
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if (div.classList.contains("hotel__inner") || div.classList.contains("checkout-flights__item")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function createPackageOption(img) {
    var region = getNodeData('.checkout-hotel__location, [class*="Hotel__Location"]').split(",");
    var flightCard = getHotelRowByImage(img);
    var flight = getFlight(flightCard);
    var option = {
        checkinDt: getPackageDate(document.querySelector(".checkout-shortinfo-item--dates")),
        nights: getPackageNights(document.querySelector(".checkout-shortinfo-item--nights")),
        hotelName: getPackageHotelName(),
        href: getNodeProperty($1('.checkout-hotel__title a, [class*="Hotel__Title"] a'), null, "href"),
        roomType: getNodeData('.checkout-packageinfo__roomtype, [class*="PackageRoomInfo__StyledOriginalRoom"]'),
        boardType: getPackageBoard(),
        region: region[0],
        price: getPackagePrice(flightCard),
        currency: mapTableCurrency(flightCard),
        country: region[1].trim(),
        city_from: flight ? flight.sectors[0].segments[0].departureCity : flight,
        operator: [OPERATOR_NAME, getNodeProperty(document.querySelector(".checkout-shortinfo__operator-text, .checkout-shortinfo__top-operator_text"))].filter(e => e).join(" / "),
        excursion: false,
        thumbnail: getPackageImg(),
        occupancy: getOccupancy(),
        flight: flight
    };
    return option;
}

function getPackageDate(checkoutInfo) {
    var text = getText(checkoutInfo).split("—")[0].trim();
    return dateFromDayAndMonthName(text.match(/\d+/)[0], text.match(/\D+/)[0].trim(), null);
}

function getPackageNights(checkoutInfo) {
    return getText(checkoutInfo).match(/\d+/)[0].toString();
}

function getPackageHotelName() {
    var name = getText($1('.checkout-hotel__title a, [class*="Hotel__Title"] a'));
    var stars = $$('.checkout-hotel__stars .lt-hotel-stars__item--filled, [class*="Hotel__Header"] [class*="HotelStars__StyledIconStar"]');
    return stars.length > 0 ? name + " " + stars.length + "*" : name;
}

function getPackageBoard() {
    var text = getNodeProperty($1(".checkout-packageinfo__text")); //
    if (!text) {
        text = getNodeProperty($1('[class*="PackageMealInfo__StyledPackageInfoItem"]'));
    }
    return text;
}

function getPackagePrice(flightCard) {
    return extractIntFromStr($1(".checkout-summary__total", flightCard).textContent.replace(/\s+/g, ""));
}

function getPackageImg() {
    var image = document.querySelector(".slide.selected div");
    return image ? getBackgroundImageUrl(image) : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var peoples = getNodeProperty(document.querySelector(".checkout-sidebar-hotel__tourists"));
    if (!peoples) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr((peoples.match(/(\d+)\s*взр/) || "00")[1]);
    occupancy.childrenCount = extractIntFromStr((peoples.match(/(\d+)\s*реб/) || "00")[1]);
    if (!occupancy.adultsCount) {
        return null;
    }

    if (occupancy.childrenCount > 0) {
        occupancy.childAges = querySelectorAll(document, ".checkout-shortinfo__children .child").map(div => getText(div).replace(/\D+/g, "")).join(",");
    }
    return occupancy;
}

function getStraightData(DataElement, option) {
    return getNodeProperty($1(`[class^="FlightsRoute__Styled${option}"]`, DataElement)).split(',')[0];
}


function getCurrentDate(dateString, currentYear) {
    const [day, month] = dateString.split(' ');
    return new Date(currentYear, monthNameToNumber(month) - 1, day);
}

function formatDates(startDate, endDate) {
    const currentYear = new Date().getFullYear();
    let start = getCurrentDate(startDate, currentYear);
    let end = getCurrentDate(endDate, currentYear);

    if (end < start) {
        end.setFullYear(currentYear + 1);
    }

    const departureDate = new Date(start).toLocaleDateString('ru');
    const arrivalDate = new Date(end).toLocaleDateString('ru');

    return {departureDate, arrivalDate};
}


function getFlight(flightCard) {
    try {
        const forwardAndReverse = $$('.checkout-flight-details__item', flightCard);
        if (!forwardAndReverse[0] || !forwardAndReverse[1]) {
            return null;
        }
        return {
            sectors: forwardAndReverse.map(route => createSector(route))
        }
    } catch (e) {
        console.log(e);
    }
}

function getStraightSegmentsInfo(route) {
    const departureDataElement = $1('[class^="FlightsRoute__StyledDeparture"]', route);
    const arrivalDataElement = $1('[class^="FlightsRoute__StyledArrival"]', route);
    const departureDateFalseFormat = getStraightData(departureDataElement, 'Date');
    const arrivalDateFalseFormat = getStraightData(arrivalDataElement, 'Date');
    const {departureDate, arrivalDate} = formatDates(departureDateFalseFormat, arrivalDateFalseFormat);

    const straightDepartureDate = {
        departureDate,
        departureTime: getStraightData(departureDataElement, 'Time'),
        departureCity: getStraightData(departureDataElement, 'Airport'),
    }
    const straightArrivalDate = {
        arrivalDate,
        arrivalTime: getStraightData(arrivalDataElement, 'Time'),
        arrivalCity: getStraightData(arrivalDataElement, 'Airport'),
    }
    return [straightDepartureDate, straightArrivalDate]
}

function getTransferSegmentsInfo(route) {
    const allTransfers = $$('[data-route-info]', route).map(item => JSON.parse(item.dataset.routeInfo));
    return allTransfers.map(item => {
        return {
            departureDate: new Date(item.transition_time.departure).toLocaleDateString('ru'),
            departureTime: new Date(item.transition_time.departure).toLocaleTimeString('ru'),
            departureCity: item.transition.city.name,
            arrivalDate: new Date(item.transition_time.arrival).toLocaleDateString('ru'),
            arrivalTime: new Date(item.transition_time.arrival).toLocaleTimeString('ru'),
            arrivalCity: item.transition.city.name
        }
    })
}

function createSector(route) {
    const straightSegmentsInfo = getStraightSegmentsInfo(route);
    const transferSegmentsInfo = getTransferSegmentsInfo(route);
    const allSegmentsInfo = [];
    allSegmentsInfo.push(straightSegmentsInfo[0]);
    allSegmentsInfo.push(...transferSegmentsInfo);
    allSegmentsInfo.push(straightSegmentsInfo[1]);
    const howMatchSegments = allSegmentsInfo.length - 1;
    const sector = {
        segments: []
    };
    for (let i = 0; i < howMatchSegments; i++) {
        sector.segments.push(createSegment(route, allSegmentsInfo, i))
    }
    return sector
}

function getBaggage(route) {
    const baggage = $$('[class^="FlightsWeightLabel__StyledLabel"]', route).map(item => getNodeProperty(item));
    return baggage.length > 1 ? `${baggage.join(' + ')} кг` : baggage.join('')
}

function getFlightNumberAndServiceClass(route) {
    const flightNumberAndServiceClassArray
        = getNodeProperty($1('[class^="LabelWithDescription__StyledFlightNumber"]', route))
        .split(', ');
    return {
        flightNumber: flightNumberAndServiceClassArray[0],
        serviceClass: flightNumberAndServiceClassArray[1]
    }
}

function createSegment(route, allSegmentsInfo, segmentNumber) {
    const {flightNumber, serviceClass} = getFlightNumberAndServiceClass(route);
    return {
        flightNumber,
        serviceClass,
        baggage: getBaggage(route),
        airline: $1('[class^="FlightsRoute__StyledImg"]', route).title,
        departureDate: allSegmentsInfo[segmentNumber].departureDate,
        departureTime: allSegmentsInfo[segmentNumber].departureTime,
        departureCity: allSegmentsInfo[segmentNumber].departureCity,
        arrivalDate: allSegmentsInfo[segmentNumber + 1].arrivalDate,
        arrivalTime: allSegmentsInfo[segmentNumber + 1].arrivalTime,
        arrivalCity: allSegmentsInfo[segmentNumber + 1].arrivalCity,
    }
}
