var OPERATOR_NAME = "Otpusk";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    var occupancy = getOccupancy(".new_f-container ");
    var city = getNodeProperty(document.querySelector(".new_f-dropdown-container.from .new_f-dropdown-btn-text", null));
    return {
        "occupancy": occupancy,
        "city": city
    }
}

function checkAvia() {
    var transit = document.querySelector(".new_t-duration-text");
    if ( transit && transit.textContent.match(/Авиаперелет\s*\(включен\)|Авіапереліт\s*\(включен\)/) ) {
        return true;
    }
    return false;
}

function getSearchButton() {
    return document.querySelector(".new_f-form-submit");
}

function injectData() {
    querySelectorAll(document, ".new_r-item-wrap[data-id]").forEach( div => {
       if ( !div.querySelector(".qq") ) {
           div.append(qqBtns({},createOption));
       }
    });
    var order = document.querySelector(".new_t-order-table");
    if ( order && !order.querySelector(".qq") ) {
        order.append(qqBtns({},createOrderOption));
    }
}

function createCell(action) {
    var newDiv = document.createElement("div");
    newDiv.append(createAddButton(action));
    newDiv.append(createEditButton(action));
    newDiv.className = "qq";
    newDiv.style = "float: right";
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var dateAndNights = getDateAndNights(hotel);
    var option = {
        checkinDt: dateAndNights[0],
        nights: dateAndNights[1],
        hotelName: getHotelName(hotel),
        href: getURL(hotel),
        roomType: "",
        region: hotel.querySelector(".new_r-item-geo").innerText,
        boardType: hotel.querySelector(".new_r-item-food").textContent,
        price: extractIntFromStr(hotel.querySelector(".new_price-value").textContent.replace(/\D+/g, "")),
        currency: getCurrency(hotel.querySelector(".new_price-value .currency").textContent),
        country: "",
        city_from: getCity(hotel),
        thumbnail: getImg(hotel.querySelector(".new_r-item-img")),
        occupancy: SEARCH_CRITERIA.occupancy
    }
    return option;
}

function getDateAndNights(hotel) {
    var splittedText = hotel.querySelector(".new_r-item-date").textContent.split("на");
    var day = splittedText[0].match(/\d+/)[0];
    var month = monthNameToNumber(splittedText[0].replace(day, "").trim());
    var date = appendYear(day, month);
    var nights = splittedText[1].match(/\d+/)[0];
    return [ date, nights ];
}

function getHotelName(hotel) {
   var itemHotel = hotel.querySelector(".new_r-item-hotel");
   var stars = itemHotel.querySelectorAll(".new_r-item-star").length;
   return itemHotel.textContent + ( stars > 0 && !itemHotel.textContent.match(/\*/) ? " " + stars + "*" : "" );
}

function getCity(hotel) {
    var city =  hotel.querySelector(".new_r-item-from").textContent;
    var icon = hotel.querySelector(".new_r-item-icon");
    if ( icon.dataset.name ===  "no-icon") {
        return "";
    }
    return city;
}

function getURL(hotel) {
    var a = hotel.querySelector("a.new_r-item");
    return a ? a.href : null;
}


function getCurrency(text) {
    switch (text.toUpperCase()) {
        case "€":
            return "EUR";
        case "ГРН":
            return "UAH";
        case "$":
            return "USD";
        default:
            return text;
    }
}

function getImg(image) {
    return image ? getBackgroundImageUrl(image) : null;
}

function createOrderOption(img) {
    var order = getHotelRowByImage(img);
    var data = order.querySelector(".new_t-order-btn.new_t-order-btn-true").dataset;
    var items = querySelectorAll(document, ".food-table span.new_weight-bold");
    var dateAndNights = getOrderDate(data);
    var option = {
        checkinDt: dateAndNights.checkIn,
        nights: dateAndNights.nights,
        hotelName: document.querySelector(".new_t-header-top .new_t-header-title").innerText,
        hotel_desc: [getNodeProperty(document.querySelector(".new_t-header-desc"), null, 'outerHTML'),
                     getNodeProperty(document.querySelector(".new_tour-description"), null, 'outerHTML')].filter(e=>e).join('<br>'),
        href: window.location.href,
        roomType: findItem(items, /Номер:/i),
        region: data.city,
        boardType: findItem(items, /Питание|Харчування:/i),
        price: extractIntFromStr(document.querySelector(".new_t-order-price .new_price").textContent.replace(/\D+/g, "")),
        currency: getCurrency(document.querySelector(".new_t-order-price .new_price .currency").textContent),
        country: data.country,
        city_from:  checkAvia() ? SEARCH_CRITERIA.city : "",
        thumbnail: getImg(document.querySelector(".new_t-header-desktop-img")),
        occupancy: getOccupancy(".new_t-content "),
        flight: getFlight(order)
    }
    return option;
}

function getOrderDate(data) {
    var matcherIn = data.date.match(/(\d{4})-(\d{2})-(\d{2})/);
    var checkIn = dayMonthYearToString(+matcherIn[3], +matcherIn[2], matcherIn[1]);
    var nights = data.len-1;
    return {
        checkIn : checkIn,
        nights: nights.toString(),
    }
}

function getFlight(order) {
    try {
        return {
            sectors: querySelectorAll(order, ".new_t-date-col:not(.new_t-duration-col)").map(sector => {
                    return {
                        segments: [parseSector(sector)] }
                })
            }
    } catch (e) {
        return null;
    }
}

function parseSector(sector) {
    var elems = sector.innerText.split(/\n/);
    var depDate = elems[0].split(/\s+|,/);
    var Ids = elems[1].split("→");
    return new FlightSegment( {
        flightNumber: elems[2].match(/[A-Z]+\s*\d+/)[0],
        departureDate: dateFromDayAndMonthName(depDate[0], depDate[1], depDate[2]),
        departureTime: elems[2].match(/\d{2}:\d{2}/)[0],
        departureAirportID: Ids[0].trim(),
        arrivalAirportID: Ids[1].trim(),
    } )
}

function getOccupancy(form) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector(form + ".new_f-people-item.people-2.active");
    var children = querySelectorAll(document.querySelector(form), ".new_f-container .new_f-children-list-item");
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(adults.dataset.value);
    occupancy.childrenCount = children.length;
    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        children.forEach(div =>  {
            ages.push(div.dataset.value);
        });
        occupancy.childAges = ages.join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className.match("new_r-item-wrap") || div.className === "new_t-content" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function findItem(items, title) {
    var desc = items.find(function (item){
        if ( item.textContent.match(title)) {
            return true;
        }
        return false;
    });
    return desc ? desc.parentNode.querySelector(".new_t-important").textContent : null;
}
