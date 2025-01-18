const OPERATOR_NAME = "Novatour";
const showTopHotelsRating = false; //страну все равно не получить

function initializeSearchCriteria() {
    const city = getCity();
    return {
        city: city,
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector("#searchbtn");
}

function injectData() {
    const result = document.querySelector("#results");
    if ( result && result.getAttribute("qq-styled") !== "true" ) {
        result.style.width = "948px";
        result.setAttribute("qq-styled", "true");
    }
    querySelectorAll(document, ".resultRow").forEach(div => {
        if ( !div.querySelector(".qq") && div.querySelector(".checkinDate")) {
            div.append(createCell());
        }
    });
}

function createCell() {
    const buttons = qqBtns({align: "qq-vertical"});
    buttons.style.display = "inline-flex";
    buttons.style.marginTop = "5px";
    buttons.classList.add("iblock");
    return buttons;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const price = tour.querySelector(".price");
    let option = {
        checkinDt: makeYear4Digits(getText(tour.querySelector(".checkinDate"))),
        nights: getText(tour.querySelector(".duration")),
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector(".cityName a"), null, "href"),
        country: "",
        region:  getText(tour.querySelector(".cityName").firstChild),
        roomType: getText(tour.querySelector(".roomName")),
        boardType: getText(tour.querySelector(".catering")),
        price:  extractIntFromStr(getText(price)),
        currency:  mapCurrency(getText(price).replace(/\d+/g, "")),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(tour.querySelector(".hotelImage")),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: getFlight(tour)
    };
    return option;
}

function getCity() {
    const cityCheckbox = document.querySelector('[name="departureCity"]');
    if ( cityCheckbox.disabled === true ) {
        return "";
    }
    return getNodeProperty(cityCheckbox.parentNode)
}

function getHotelName(tour) {
    const caption = getText(tour.querySelector(".hotelName, .hotelNameWide"));
    let stars = tour.querySelector(".hotelClass");
    stars = stars ? stars.className.replace(/\D+/g, "") : "";
    stars = stars && stars > 0 ? `${(+stars/2 | 0)}${(+stars%2) > 0 ? "*+" : "*"} ` : "";
    return (caption + " "+ stars).trim();
}

function getFlight(tour) {
    try {
        const [forward, reverse] =  querySelectorAll(tour,".outbound, .return").map(div => createSegments(div));
        if ( !forward ||!reverse ) {
            return null;
        }
        forward.segments[0].arrivalAirportID = reverse.segments[0].departureAirportID;
        reverse.segments[0].arrivalAirportID = forward.segments[0].departureAirportID;
        return {
            sectors: [forward, reverse]
        };
    } catch (e) {
        return null;
    }
}

function createSegments(div) {
    const airline = div.querySelector(".icon.logo");
    const times = div.querySelector(".iconsTimes span").title.split("–");
    const dateText = getText(div.querySelector(".date"));
    const date = dateText.match(/\d{2}\.\d{2}/)[0];
    return {
        segments: [new FlightSegment({
            flightNumber: "",
            airline: airline.title,
            departureDate: appendYear(...date.split(".")),
            departureTime: times[0].trim(),
            departureAirportID: dateText.replace(date, "").trim(),
            arrivalTime: times[1].trim(),
        })]
    };
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = document.querySelector("input#adults");
    const children = document.querySelector("input#children");
    if ( !adults || adults.value == 0 ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults.value);
    occupancy.childrenCount = children ? extractIntFromStr(children.value) : 0;
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "input[name*='child']:not([name='children'])")
            .filter(input => input.disabled !== true).map(input => input.value.replace(/\D+/g,"")).join();
    }
    return occupancy;
}

function mapCurrency(price) {
    switch (price.toUpperCase().trim()) {
        case "€" :
            return "EUR";
        case "$" :
            return "USD";
        case "A" :
            return "GEL";
        default :
            return price;
    }
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("resultRow") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}