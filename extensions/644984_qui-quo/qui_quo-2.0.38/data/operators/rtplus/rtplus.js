var OPERATOR_NAME = "rt.plus";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
    var selCountry =   document.querySelector("#rt-tour-country");
    var jsonCity = document.querySelector("#rt-tour-avia");
    if ( !selCountry || !jsonCity ) {
        return null;
    }
    var country =  selCountry.textContent.trim().split(/\s+/)[1];
    var region =  selCountry.textContent.trim().split(/\s+/)[0];
    var city = jsonCity.dataset.value ? JSON.parse(jsonCity.dataset.value).name : null;

    if ( !country || !region || !city) {
        return null;
    }

    return {
        country : country,
        region : region,
        city : city,
        occupancy : getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector("#rt-tour-search");
}

function injectData() {
    querySelectorAll(document, ".rt-universal-hotels-room__header .row").forEach(function (div) {
        if ( div.querySelector(".qq") === null) {
            div.querySelector("div").style = "flex-basis: 36.667%";
            div.appendChild(createHeaderCell());
        }
    });
    querySelectorAll(document, ".rt-universal-hotels-room .row").forEach(function (div) {
        if (div.querySelector(".qq") === null) {
            div.querySelector("div").style = "flex-basis: 36.667%";
            div.appendChild(createCell());
        }
    });
}

function createHeaderCell() {
    var newDiv = document.createElement("div");
    newDiv.className = "qq";
    newDiv.appendChild(document.createTextNode("QQ"));
    newDiv.style = "font-weight: bold;";
    return newDiv;
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.className = "qq vertical";
    newDiv.appendChild(createAddButton());
    newDiv.appendChild(createEditButton());
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var row = img.parentNode.parentNode;
    var divs = row.querySelectorAll("div");

    var option = {
        checkinDt: getDate(hotel),
        nights: getNights(hotel),
        hotelName: hotel.querySelector(".rt-universal-hotels-title").textContent,
        href: null,
        roomType: divs[0].textContent.trim(),
        region: SEARCH_CRITERIA.region,
        boardType: divs[1].textContent.trim(),
        price: getPrice(divs[3]),
        currency: document.querySelector(".rt-active .convert-valute-bl .active").textContent,
        country: SEARCH_CRITERIA.country,
        city_from: getCity(),
        excursion: false,
        operator: OPERATOR_NAME,
        thumbnail : extractThumbnail(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}

function getDate(hotel) {
    var text = hotel.querySelector(".rt-universal-hotels-prices").textContent;
    return text.match(/\d\d.\d\d.\d\d\d\d/)[0];
}

function getNights(hotel) {
    var text = hotel.querySelector(".rt-universal-hotels-prices").textContent;
    return text.match(/(\d+)\sноч/)[1];
}

function getPrice(div) {
    var currency = document.querySelector(".convert-valute-bl .active").textContent;
    return extractIntFromStr(div.querySelector(".rt-course-"+currency.replace("RUB","RUR")).textContent);
}

function getCity() {
    if ( document.querySelector(".rt-universal-filter-block-item.rt-active").textContent !== "Туры" ) {
        return "";
    }
    return document.querySelector(".rt-universal-hotels-prices").textContent.match(/Перелёт/) ? SEARCH_CRITERIA.city  : "";
}

function getOccupancy() {
    var kids = querySelectorAll(document, ".pswChild");
    var kidsAges;
    var adults = document.querySelector(".pswAdultsCount");
    if ( !adults ) {
        return null;
    }
    var occupancy = {
        adultsCount: extractOptionalInt(adults.textContent),
        childrenCount: kids.length,
        childAges: null
    };
    if ( occupancy.childrenCount > 0 ) {
        kidsAges = kids.map(function (kid) {
           return extractOptionalInt(kid.textContent);
        }).join(",");

        occupancy.childAges = kidsAges;
    }

    return occupancy;
}

function extractThumbnail(hotel) {
    var image = hotel.querySelector(".rt-universal-hotels-images-item img");
    return image ? image.src : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if (div.className === "rt-universal-hotels-item") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
