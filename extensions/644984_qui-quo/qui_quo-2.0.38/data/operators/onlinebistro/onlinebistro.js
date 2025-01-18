var OPERATOR_NAME = "onlinebistro";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    var total = document.querySelector(".summary-total");
    if ( total && !total.querySelector(".qq") ) {
        total.append(createCell());
    }
}

function createCell() {
    var newTd = document.createElement("td");
    var nobr = document.createElement('nobr');
    nobr.append(createAddButton());
    nobr.append(createEditButton());
    newTd.append(nobr);
    newTd.className = "qq";
    newTd.style = "text-align:center";
    return newTd;
}

function createOption(img) {
    var summary = getHotelRowByImage(img);
    var option = {
        checkinDt: getDateAndNights(summary)[0],
        nights: getDateAndNights(summary)[1],
        hotelName: getHotelName(),
        href: window.location.href,
        roomType: getRoomType(summary),
        region: getRegion(summary),
        boardType: "",
        price: getPrice(summary),
        currency: getCurrency(summary),
        country: "",
        city_from: getCity(),
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(),
        occupancy: getOccupancy(summary)
    };
    return option;
}

function getDateAndNights(summary) {
    var text = summary.querySelector(".fa-calendar").parentNode.textContent.trim().split("-");
    var day = text[0].match(/\d+/)[0];
    var month = text[0].match(/\d+\.\s+(\D+)/)[1].trim();
    var nights = text[1].match(/\((\d+)\D+\)/)[1];
    return [appendYear(+day, monthNameToNumber(month)), nights];
}

function getHotelName() {
    var hotel = document.querySelector(".hotel-details");
    var stars = hotel.querySelectorAll("i.fa.fa-star.txt-color-yellow").length;
    return hotel.querySelector("h4").textContent.trim() + ( stars > 0 ? " " + stars + "*" : "");
}

function getRoomType(summary) {
    var room = summary.querySelector("#room").textContent.trim();
    var acc = summary.querySelector(".fa-user").parentNode.textContent.trim();
    return room + ", " + acc;
}

function getRegion(summary) {
    return summary.querySelector(".fa-location-arrow").parentNode.textContent.trim();
}

function getPrice(summary) {
    return extractIntFromStr(summary.querySelector("#total").textContent.replace(/\s+/g, ""));
}

function getCurrency(summary) {
    var text = summary.querySelector("#total").textContent.match(/[^\d+\.+\s+].+/g)[0];
    switch (text) {
        case "EUR":
            return "EUR";
        case "UAH":
            return "UAH";
        case "USD":
            return "USD";
        default:
            return text;
    }
}

function getCity() {
    var origin = document.querySelector(".origin-name");
    return origin ? origin.textContent : "";
}

function getImg() {
    var image = document.querySelector("img.selected");
    return image ? image.src : null;
}

function getOccupancy(summary) {
    var occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    };
    var acc = summary.querySelector(".fa-user").parentNode.textContent;
    var adults = acc.match(/(\d+)\s+Взр/);
    var children = acc.match(/(\d+)\s+Реб/);
    if ( !adults ) {
        return null;

    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    occupancy.childrenCount = children ? extractIntFromStr(children[1]) : 0;
    occupancy.childAges = new Array(occupancy.childrenCount).fill("10").join();

    return occupancy;
}


function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.id === "summary-data" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
