var OPERATOR_NAME = "JoinUP";

function initializeSearchCriteria() {
    var country = document.querySelector("#country_to");
    var city = document.querySelector("#townfrom");
    var occupancy = getOccupancy();
    if ( !country  || !city) {
        return null;
    }
    return {
        city : selectedOption(city),
        country : selectedOption(country),
        occupancy: occupancy
    };
}

function getSearchButton() {
    return document.querySelector("#hotelpriceshow");
}

function injectData() {
    querySelectorAll(document, "#results li.box").forEach(function (li) {
        if ( !li.querySelector(".qq") ) {
            li.appendChild(createCell());
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton());
    newDiv.appendChild(createEditButton());
    newDiv.style = "margin-left: 900px;margin-top: 90px;";
    newDiv.className = "qq";
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: hotel.querySelector(".flight_date strong").textContent,
        nights: hotel.querySelector(".tour_nights strong").textContent,
        hotelName: hotel.querySelector(".title_hotel_stars a").textContent,
        href: getURL(hotel),
        roomType: hotel.querySelector(".room").textContent.trim() + ", " + hotel.querySelector(".room_accom").textContent.trim(),
        region: getRegion(hotel),
        boardType: hotel.querySelector(".meal").textContent.trim(),
        price: extractIntFromStr(hotel.querySelector(".price_search_tours").textContent.replace(/\s+/g, "")),
        currency: hotel.querySelector(".price_search_tours small").textContent,
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getImg(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getURL(hotel) {
    var a = hotel.querySelector(".title_hotel_stars a");
    return a ? a.href : null;
}

function getImg(hotel) {
    var image = hotel.querySelector(".cover_bg_tour");
    return image ? "https://" + window.location.hostname + image.style.background.match(/\("(.+)"\)/)[1] : null;
}

function getRegion(hotel) {
    return hotel.querySelector(".region strong").textContent;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector("#adult_count");
    var children = document.querySelector("#children_count");
    if ( !adults || !children ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(selectedOption(adults));
    occupancy.childrenCount = extractOptionalInt(selectedOption(children));
    if ( occupancy.adultsCount === null || occupancy.childrenCount === null) {
        return null;
    }
    if ( occupancy.childrenCount > 0 ) {
       
    	occupancy.childAges = querySelectorAll(document, "#children_age .children_age").map(function (age) {
            return age.value;
        }).join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className === "box" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}