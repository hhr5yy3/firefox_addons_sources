var OPERATOR_NAME = "АэроБелСервис";
var OPERATOR_CURRENCY = "abstour";
var DEFAULT_CURRENCY = "BYN";
var CURRENCY_SELECTION_STYLE = "font-size:12px;padding-top: 5px !important;padding-bottom: 0px !important;padding-right: 5px !important;width: 300px;";
function initializeSearchCriteria() {
    return { occupancy: getOccupancy()}
}

function getSearchButton() {
    return querySelectorAll(document, "form button.thm-btn[type='submit']").filter( btn => btn.textContent == "Искать" );
}

function injectData() {
    injectCurrencySelectionUtil("#stsApp", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE,"height:2em", "display:inline-flex;flex-direction: row;");
    querySelectorAll(document, ".hotel-offer .hotel-offer_grouped-btn").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var offer = img.parentNode.parentNode.parentNode;
    var hotelUrls = querySelectorAll(tour, ".hotel-body a");
    var priceAndCurrency = getPriceAndCurrency(offer);
    var option = {
        checkinDt: getText(offer.querySelector(".hotel-offer-text-dates")).match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights: getText(offer.querySelector(".hotel-offer-text-night")).match(/\d+/)[0],
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector(".hotel-body a"), null, "href"),
        country: getNodeProperty(hotelUrls[1]),
        region: getNodeProperty(hotelUrls[2]),
        roomType: trim(getText(offer.querySelector(".hotel-offer-text-room"))),
        boardType: trim(getText(offer.querySelector(".hotel-offer-text-food"))),
        price: priceAndCurrency.price,
        currency: priceAndCurrency.currency,
        city_from: (getNodeProperty(tour.querySelector(".list-info-travel"), "").match(/из\s*(.+?),/) || "")[1] || "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".hotel-image img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getHotelName(tour) {
    var caption = getText(tour.querySelector(".hotel-body a b"));
    var stars = querySelectorAll(tour, ".ratting .fa-star").length;
    return stars > 0 ? caption + " " + stars + "*" : caption;
}

function getPriceAndCurrency(offer) {
    var priceText = getText(isPrefferedDefaultCurrencyUtil() ? offer.querySelector(".hotel-offer-price_and_currency") : offer.querySelector(".hotel-offer-price_and_currency.rateCurrency"));
    return {
        price: extractIntFromStr(priceText),
        currency: mapCurrency(priceText.replace(/\d+|\.+|\s+/g, ""))
    }
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch ( c ) {
        case "RUB":
            return "RUB";
        case "BYN":
            return "BYN";
        case "USD":
            return "USD";
        case "EUR":
            return "EUR";
    }
    return c;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractIntFromStr(getNodeProperty(document.querySelector("input#adults"), "0", "value"));
    if ( occupancy.adultsCount < 1 ) {
        return  null;
    }
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(document.querySelector("input#children"), "0", "value"));
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, (".age-selector select:not([disabled])")).map( select => {
            return selectedOption(select);
        }).join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("hotel-item") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}