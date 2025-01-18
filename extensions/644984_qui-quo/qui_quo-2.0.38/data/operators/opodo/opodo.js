var OPERATOR_NAME = "opodo";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".hidden-xs .offerBookButton").forEach(btn => {
       var div = btn.parentNode;
       if ( !div.querySelector(".qq") ) {
           div.append(createCell());
       }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton());
    newDiv.appendChild(createEditButton());
    newDiv.className = "qq";
    newDiv.style = "text-align: right;";
    return newDiv;
}

function createOption(img) {
    var room = getHotelRowByImage(img);
    var option = {
        checkinDt: getDate(room),
        nights: getNights(room),
        hotelName: getHotelName(),
        href: "",
        roomType: getRoomType(room),
        region: getRegion(),
        boardType: getBoardType(room),
        price: getPrice(room),
        currency: getCurrency(room),
        country: "",
        city_from: getCity(room),
        operator: OPERATOR_NAME,
        thumbnail: getImg(),
        comment: getComment(room),
        occupancy: getOccupancy()
    };
    return option;
}

function getDate(room) {
    return room.querySelector(".flightDate").textContent.match(/\d+\.\d+\.\d+/)[0];
}

function getNights(room) {
  return extractIntFromStr(room.querySelector(".journey").textContent.trim())+"";
}

function getHotelName() {
    var name = document.querySelector(".hotelName").textContent.trim();
    var stars = document.querySelector("[hotel-stars='hotel.category']").querySelectorAll(".tt-star").length;
    return name + ( stars > 0 ? " " + stars + "*" : "" );
}

function getRoomType(room) {
    var roomInfo = querySelectorAll(room, ".room, .transfer").map(detail => {
        return detail.textContent.trim();
    }).join(", ");
    return roomInfo;
}

function getRegion() {
    return document.querySelector(".hotelLocation").textContent.trim();
}

function getBoardType(room) {
    return room.querySelector(".board").textContent.trim();
}

function getPrice(room) {
    var price = room.querySelector(".offerPriceTotal").textContent.trim();
    var s = price.split(/[\.,]/);
    if (s[s.length - 1].match(/\d+/)[0].length <= 2) {
        s.splice(s.length - 1, 1);
    }
    return extractIntFromStr(s.join("").match(/(\d+)/)[1], 10);
}

function getCurrency(room) {
    var text = room.querySelector(".currency").textContent.trim();
    switch (text) {
        case "€": return "EUR";
        case "$": return "USD";
        default: return text;
    }
}

function getCity(room) {
    var flight = room.querySelector(".flightAirports");
    if (!flight) {
        return "";
    }
    return flight.textContent.split(")")[0].trim() + ")";
}

function getImg() {
    var image = document.querySelector(".hotelThumb");
    return image ? image.src : null;
}

function getComment(room) {
    var flights = querySelectorAll(room, ".flight [class*='flight']");
    return flights.map( flight => {
        var text = flight.textContent.trim();
        if ( flight.querySelector(".linkFlightDetails") ) {
            text = text.replace(/Details/ig, "");
        }
        return text;
    }).join("\n");
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var text = document.querySelector(".tt-traveller").nextElementSibling;
    if ( text ) {
        text = text.textContent;
    } else {
        return null;
    }
    var adult = text.match(/(\d+)\s+Erwachsene/i);
    var kids = text.match(/(\d+)\s+Kinder/i);
    if ( !adult ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adult[1]);
    occupancy.childrenCount = kids ? extractIntFromStr(kids[1]) : 0;

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = text.match(/\(.+\)/)[0].match(/\d+/g).join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if (div.className == "panel-body") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}