var OPERATOR_NAME = "Tourindex";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".search-item.new-bl, .search-item-tour").forEach(div => {
        checkAndRestoreEvents(div, createOption)
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.className = "qq";
    newDiv.setAttribute("style", "float:right")
    newDiv.append(createAddButton());
    newDiv.append(createEditButton());
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: getDate(hotel),
        nights: getNights(hotel),
        hotelName: getHotelName(hotel),
        href: getURL(hotel),
        roomType: getRoomType(hotel),
        region: getRegion(hotel),
        boardType: getBoardType(hotel),
        price: getPrice(hotel),
        currency: getCurrency(hotel),
        country: getCountry(),
        city_from: getCity(hotel),
        operator: getOperator(hotel),
        thumbnail: getImg(hotel),
        occupancy: getOccupancy()
    };
    return option;
}

function getDate(hotel) {
    var date = hotel.querySelector(".data-departure").textContent;
    return makeYear4Digits(date.match(/\d{2}.\d{2}.\d{2}/)[0]);
}

function getNights(hotel) {
    var nights = hotel.querySelector(".data-duration").textContent;
    return nights.match(/\d+/)[0].toString();
}

function getHotelName(hotel) {
    var name = hotel.querySelector(".data-allocation").textContent;
    var stars = hotel.querySelector(".data-stars").className.match(/page-stars_(\d)/);
    return name + ( stars && +stars[1] > 0 ? " " + stars[1] + "*" : "" );
}

function getURL(hotel) {
    var hotel = hotel.querySelector(".data-allocation");
    return hotel && hotel.tagName === "A" ? hotel.href : null;
}

function getRoomType(hotel) {
    var room = hotel.querySelector(".data-room-type");
    return room ? room.textContent : "";
}

function getRegion(hotel) {
    var region = hotel.querySelector(".data-resort");
    return region ? region.textContent : "";
}

function getBoardType(hotel) {
    return hotel.querySelector(".data-meal-type").textContent;
}

function getPrice(hotel) {
    var text = hotel.querySelector(".data-price-val, .data-price").textContent;
    return extractIntFromStr(text.replace(/\D+/g, ""));
}

function getCurrency(hotel) {
    var text = hotel.querySelector(".data-price-val, .data-price").textContent.replace(/\d+/g, "").trim();
    switch ( text ) {
        case "€":
            return "EUR";
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        default:
            return text;
    }
}

function getCountry() {
    return document.querySelector(".f-country").textContent;
}

function getCity(hotel) {
    return hotel.querySelector(".data-city").textContent.replace(/вылет из/i, "").trim();
}

function getOperator(hotel) {
    var operator = hotel.querySelector(".data-operator");
    return operator ? operator.textContent : null;
}


function getImg(hotel) {
    var a = hotel.querySelector(".data-allocation-photo img");
    return a ? a.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 1,
        childrenCount: 0,
        childAges: null
    };
    var node = document.querySelector(".f-guest");
    if ( !node ) {
        return null;
    }
    var adults = node.textContent.match(/(\d+)\s+взр/);
    var kids = node.textContent.match(/(\d+)\s+дет/);
    kids = kids ? kids[1] : ( node.textContent.match(/реб/) ? 1 : 0 );
    occupancy.adultsCount = adults ? +adults[1] : 1;
    occupancy.childrenCount = +kids;
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while ( true ) {
        if ( div.className.match(/search-item |search-item-tour/) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
