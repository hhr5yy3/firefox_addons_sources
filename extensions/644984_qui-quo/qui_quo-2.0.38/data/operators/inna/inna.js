var OPERATOR_NAME = "ИННА ТУР";

function initializeSearchCriteria() {
    return {
        city: getNodeProperty(document.querySelector(".main-searchbar__item__departure input"), null, "value")
    };
}

function getSearchButton() {
    return document.querySelector(".main-searchbar__item_search .button");
}

function injectData() {
    querySelectorAll(document, ".hotel-card").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var checkinDt = getParameterByName("departureDate").split("-");
    checkinDt = dayMonthYearToString(checkinDt[2],checkinDt[1],checkinDt[0]);
    var outDt = getParameterByName("returnDate").split("-");
    var location = getText(tour.querySelector(".hotel-card-info__location")).split(",");
    var room = getText(tour.querySelector(".hotel-card-info__type")).split(",");
    var price = getText(tour.querySelector(".hotel-card-price__one"));
    var option = {
        checkinDt: checkinDt,
        nights: getNights(checkinDt, outDt),
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector(".hotel-card-btn-select a"), null, "href"),
        country: location[0],
        region: location.splice(1).join(",").trim(),
        roomType: room[0],
        boardType: room[1].trim(),
        price: extractIntFromStr(price.replace(/\D/g,"")),
        currency: mapCurrency(price.replace(/\d+|\s+/g, "")),
        city_from: getText(tour.querySelector(".hotel-card-price__type")).match(/\+\s*Перелет/) ? SEARCH_CRITERIA.city : "",
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(tour.querySelector(".hotel-card__photos")),
        occupancy: getOccupancy()
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

function getHotelName(tour) {
 var name = getText(tour.querySelector(".hotel-card-info__name"));
 var stars = tour.querySelectorAll(".stars-rating .star__active").length;
 return stars > 0 ? name + " " + stars + "*" : name;
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
            return "RUB";;
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("hotel-card") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}