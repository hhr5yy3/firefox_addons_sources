var OPERATOR_NAME = "Misto.travel";
var DEFAULT_CURRENCY = "UAH";
var OPERATOR_CURRENCY = "Misto.travel";
var CURRENCY_SELECTION_STYLE = "font-size: 12px;border: none;width: 155px;";
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        city: selectedOption(document.querySelector("select#src")),
        occupancy: getOccupancy()
    }
}

function getSearchButton() {
    return document.querySelector("#hotel-search-btn")
}

function injectData() {
    querySelectorAll(document, ".room-details .room-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
    let book = document.querySelector(".main-pricing");
    if ( book && !book.querySelector(".qq") ) {
        let btn = qqBtns({align: "qq-horizontal"}, createBookOption);
        btn.style.margin = '5px';
        book.append(btn);
        injectCurrencySelectionUtil(".main-pricing .qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE,"",
                                    "display: inline-flex;width: 260px;margin: 5px;height: 30px;border: none;");
    }
}

function createOption(img) {
    let room = getHotelRowByImage(img);
    let iconFly = room.querySelector(".icon-fly-from");
    let region = getRegion();
    let price = getText(room.querySelector(".book-price"));
    let option = {
        checkinDt: getDate(iconFly),
        nights: getNights(iconFly),
        hotelName: getHotelName(),
        hotel_desc: getNodeProperty(document.querySelector("div.description")),
        href: window.location.href,
        country: region[0].trim(),
        region: region[1].trim(),
        roomType: getText(room.querySelector(".mdi-hotel").parentNode.parentNode),
        boardType: getText(room.querySelector(".mdi-food-fork-drink").parentNode.parentNode),
        price: extractIntFromStr(price.replace(/\D+/, "")),
        currency: mapCurrency(price),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(document.querySelector("#mainImage div")),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false,
    };
    return option;
}

function getDate(iconFly) {
    let date = getText(iconFly.nextElementSibling).split(" ");
    return dateFromDayAndMonthName(date[0], date[1]);
}

function getNights(iconFly) {
    let nights = getText(iconFly.parentNode.parentNode.querySelector(".second-line"));
    return nights.replace(/\D+/g, "");
}

function getHotelName() {
    let caption = getText(document.querySelector(".hotel-title"));
    let stars = document.querySelector("span.five-stars");
    stars = stars && stars.style.width ? +stars.style.width.replace(/\D+/g, "")/20 : null;
    return stars && stars > 0 ? `${caption} ${stars}*` : caption;
}

function getRegion() {
    return getNodeProperty(document.querySelector(".location .mdi-map-marker").nextSibling).split("/");
}

function mapCurrency(text) {
    text = text.replace(/\d+/g, "").trim();
    switch(text.toLowerCase()) {
        case "$": return "USD";
        case "€": return "EUR";
        case "грн.": return "UAH";
    }
    return text;
}

function getOccupancy(text = null) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let occupancyText = text || getNodeProperty(document.querySelector("a#ac-val"), null);
    if ( !occupancyText ) {
        return null;
    }
    let adults = occupancyText.match(/(\d+)\s*(взр|дор)/);
    let kids = occupancyText.match(/(\d+)\s*(дет|діт)/);
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    occupancy.childrenCount = kids ? extractIntFromStr(kids[1]) : 0;
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, '[id*=cdiv] select')
                              .filter( sel => sel.parentNode.style.display === "block" )
                              .map(select => (selectedOption(select) || "")
                              .replace(/\D+/g, "")).join();
    }
    return occupancy;
}
//---------------------------------------book------------------------------------------------------//
function createBookOption(img) {
    let room = document.querySelector("#include-panel");
    let labels = querySelectorAll(room, ".offer_option");
    let dateText = textFromLabel(findLabelByIcon(labels, ".mdi-clock"));
    let region = getRegion();
    let price = getText(getBookPrice());
    let flight = getFlight();
    var cityFrom = textFromLabel(findLabelByIcon(labels, ".mdi-airplane-takeoff"));
    let option = {
        checkinDt: getBookDate(dateText),
        nights: dateText.match(/(\d+)\s*ноч/)[1],
        hotelName: getHotelName(),
        href: window.location.href,
        country: region[0].trim(),
        region: region[1].trim(),
        roomType: textFromLabel(findLabelByIcon(labels, ".mdi-key-variant")),
        boardType: textFromLabel(findLabelByIcon(labels, ".mdi-food-fork-drink")),
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price.match(/\$|€|грн./)[0]),
        city_from: cityFrom ? (cityFrom.match(/з\s+(.+)/) || "")[1] : "",
        operator: OPERATOR_NAME + " / " + textFromLabel(findLabelByIcon(labels, ".mdi-beach")),
        thumbnail: getNodeProperty(document.querySelector("#mainImage img"), null, "src"),
        occupancy: getOccupancy(textFromLabel(findLabelByIcon(labels, ".mdi-account-multiple"))),
        excursion: false,
        flight: flight
    };
    return option;
}

function getFlight() {
    try {
        let flightBlock = document.querySelector("#flights_results");
        return { sectors: querySelectorAll(flightBlock, 'select[name*="fly"]')
                .map(select => {
                    return { segments: [createSector(selectedOption(select))] }
                })
        }
    } catch (e) {
        return null;
    }
}

function createSector(selectText) {
    let splittedText = selectText.split("->");
    let departure = splittedText[0].match(/(\d{2})\s+(.+?),.+?(\d{2}:\d{2})(.+)/);
    let departureCity = departure[4].trim().split("/");
    let arrival = splittedText[1].match(/([A-Z]+|.+?\/\s+.+?\s+)/);
    let arrivalCity = arrival[1].trim().split("/");
    let flightNumber = (splittedText[1].match(/[A-Z\-*0-9]{3,}$/) || "")[0] || "";
    return new FlightSegment(
        {
            flightNumber: flightNumber,
            airline: splittedText[1].replace(arrival[1].trim(), "").replace(flightNumber, "").trim(),
            travelTime: "",
            plane: "",
            departureDate: dateFromDayAndMonthName(departure[1], departure[2]),
            departureTime: departure[3],
            departureCity: departureCity.length === 2 ? departureCity[0].trim() : null,
            departureAirport: departureCity.length === 2 ? departureCity[1].trim() : null,
            departureAirportID: departureCity.length === 1 ? departureCity[0].trim() : null,
            departureTerminal: "",
            serviceClass: "",
            arrivalDate: "",
            arrivalTime: "",
            arrivalCity: arrivalCity.length === 2 ? arrivalCity[0].trim() : null,
            arrivalAirport: arrivalCity.length === 2 ? arrivalCity[1].trim() : null,
            arrivalAirportID: arrivalCity.length === 1 ? arrivalCity[0].trim() : null,
            arrivalTerminal: ""
        }
    )
}

function getBookDate(text) {
   let date = text.match(/(\d{2}).(\d{2})/);
   return appendYear( date[1], date[2] );
}

function getBookPrice() {
    return isPrefferedDefaultCurrencyUtil() ? document.querySelector(".price_item.price_item_total") :
        querySelectorAll(document, ".price_item")
        .find( item => getText(item).match(/Вартість туру в валюті|Стоимость тура в валюте/i));
}

function findLabelByIcon(labels, iconSel) {
    return labels.find( label => {
        return label.querySelector(iconSel);
    });
}

function textFromLabel(label) {
    let text = getText(label).split(":");
    return text.length > 1 ? text[1] : text[0];
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("room-details") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}