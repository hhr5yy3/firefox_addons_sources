var OPERATOR_NAME = "Глобус Тур";
var OPERATOR_SLETAT_ID = 246;
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    var city = getCityAndCountry("[name='DepartCity']");
    var country = getCityAndCountry("[name='Destination']");
    var occupancy = getOccupancy();
    if ( !city || !country || !occupancy) {
        return null;
    }
    return {
        city: city,
        country: country,
        occupancy : occupancy
    };
}

function getSearchButton() {
    return document.querySelector(".search-form-button");
}

function injectData() {
    var head = document.querySelector(".results .row-header");
    if ( head && !head.querySelector(".qq") ) {
        head.append(createHeaderCell());
    }
    querySelectorAll(document, "div.row[data-book-id]").forEach((div) => {
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
    newDiv.style = "white-space:nowrap; margin:auto";
    return newDiv;
}

function createHeaderCell() {
    var newHeadDiv = document.createElement("div");
    newHeadDiv.className = "qq";
    newHeadDiv.setAttribute("style", "width:50px;margin:auto;text-align: center;");
    newHeadDiv.appendChild(document.createTextNode("QQ"));
    return newHeadDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: hotel.querySelector(".date").textContent,
        nights: hotel.querySelector(".nights").textContent.replace(/\D+/g, ""),
        hotelName: joinHotelData(hotel, ".hotel", ".category"),
        href: getURL(hotel),
        roomType: joinHotelData(hotel, ".room") + ", " + hotel.querySelector(".accommodation span").textContent,
        region: "",
        boardType: joinHotelData(hotel, ".meal"),
        boardCode: hotel.querySelector(".meal").textContent.trim(),
        price: extractIntFromStr(hotel.querySelector(".price .value").textContent.replace(/\D+/g, "")),
        currency: getCurrency(hotel),
        country: SEARCH_CRITERIA.country,
        city_from: getComputedStyle(hotel.querySelector(".cell.cell-avail")).display !== "none" ? SEARCH_CRITERIA.city : "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function joinHotelData(hotel, selMain, selSecond) {
    return querySelectorAll(hotel, ".hotel-row").map((eachHotel) => {
        var data = eachHotel.querySelector(selMain);
        var data2 = selSecond ? eachHotel.querySelector(selSecond) : "";
        return data.textContent + ( data2 ? " " + data2.title : "" ) +
            ( data.textContent.trim() !== data.title ? ", " + data.title : "" );
    }).join(" / ");
}

function getURL(hotel) {
    var url = hotel.querySelector("a.hotel");
    return url ? url.href : null;
}

function getCurrency(hotel) {
    var text = hotel.querySelector(".price .currency").textContent.trim();
    switch (text) {
        case "EUR":
            return "EUR";
        case "RUR":
            return "RUB";
        case "USD":
            return "USD";
        default:
            return text;
    }
}


function getCityAndCountry(sel) {
    var target = document.querySelector(sel);
    if ( !target )
    	return null;
    return target.title ? target.title : target.value;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var inputText = document.querySelector("[name='Occupancy']");
    if ( !inputText ) {
        return null;
    }
    var adults = inputText.value.match(/(\d+)\s+взр/);
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    var children = inputText.value.match(/(\d+)\s+реб/);
    if ( children ) {
        occupancy.childrenCount = extractIntFromStr(children[1]);
        occupancy.childAges = new Array(occupancy.childrenCount).fill("10").join();
    }

    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className.match("row") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}