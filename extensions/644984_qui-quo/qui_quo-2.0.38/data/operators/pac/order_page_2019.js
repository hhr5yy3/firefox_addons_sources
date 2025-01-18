var OPERATOR_NAME = "PAC GROUP";
var showTopHotelsRating = false;
var OPERATOR_CURRENCY = "PAC GROUP";
var DEFAULT_CURRENCY = "RUB";
var CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    injectCurrencySelectionUtil(".order-placement-hotel.js-order-placement-hotel", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex");
    querySelectorAll(document, ".order-placement-hotel.js-order-placement-hotel").forEach( div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-vertical"}));
        }
    });
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var date = getDate(tour);
    var price = document.querySelector(".digest-option__price .js-money");
    var region =  getText(tour.querySelector(".order-placement-hotel__address")).split(", ");
    var flight = getFlight(img);
    var option = {
        checkinDt: date.date,
        nights: date.nights,
        hotelName: getText(tour.querySelector(".order-placement-hotel__hotel")),
        hotel_desc: "",
        href: getNodeProperty(tour.querySelector(".order-placement-hotel__hotel"), null, "href"),
        country: region[0],
        region: region.slice(1).join(", "),
        roomType: getText(tour.querySelector('input[name*="Room"] + DIV')),
        boardType: getText(tour.querySelector('input[name*="Board"] + DIV')),
        price: extractIntFromStr(isPrefferedDefaultCurrencyUtil() ? getText(price).replace(/\D+/g,"") : price.dataset.moneyAmount),
        currency: isPrefferedDefaultCurrencyUtil() ? price.dataset.moneyCurrent : price.dataset.moneyCurrency,
        city_from: getNodeProperty(document.querySelector(".avia-popup-head__way-item")) || (flight ? flight.sectors[0].segments[0].departureCity : ""),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".order-placement-hotel__img img"), null, "src"),
        occupancy: getOccupancy(),
        flight: flight
    };
    return option;
}

function getDate(tour) {
    var dateText;
    querySelectorAll(tour, ".form-item.form-theme_dark").find(div => {
        dateText = div.textContent.match(/(\d{2})\s+([А-я]+)\s+(\d{4}).+?(\d+)\s+ноч/);
        return !!dateText;
    });
    return { date: dateFromDayAndMonthName(dateText[1], dateText[2], dateText[3]), nights: dateText[4]};
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var peopleElement = document.querySelector(".tour-page__placement-type-people");
    occupancy.adultsCount = extractIntFromStr(getNodeProperty(peopleElement.querySelector("svg.icon:not(._small) + span")) || "0");
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(peopleElement.querySelector("svg.icon._small  + span")) || "0");
    if ( occupancy.adultsCount < 1 ) {
        return null;
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    return document.querySelector(".order-placement.js-order-placement .order-placement-hotel.js-order-placement-hotel");
}
