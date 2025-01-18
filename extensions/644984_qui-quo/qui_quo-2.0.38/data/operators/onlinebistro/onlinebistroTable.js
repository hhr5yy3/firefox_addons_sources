var OPERATOR_NAME = "onlinebistro";

function initializeSearchCriteria() {
    var chDate = null;
    var outDate = null;
    var city = null;
    var occupancy = null;
    var searchForm = document.querySelector("#search-form");
    if (searchForm) {
        chDate = searchForm.querySelector("#checkin,#date_0").value.replace(/\//g, ".");
        outDate = searchForm.querySelector("#checkout, #date_1").value.replace(/\//g, ".");
        city = searchForm.querySelector("#origin_0");
        city = city ? city.value : "";
        occupancy = getTableOccupancy(searchForm);
    }
    return {
        chDate: chDate,
        outDate: outDate,
        city: city,
        occupancy: occupancy
    };
}

function getSearchButton() {
    return document.querySelector("button#search");
}

function injectData() {
    querySelectorAll(document, ".btn-hotel-select").forEach( btn => {
        var tr = btn.parentNode.parentNode.parentNode;
        if ( tr && !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });
    querySelectorAll(document, ".hotel-newitem table thead tr.primary").forEach( header => {
        if ( !header.querySelector(".qq") ) {
            header.append(createHeaderCell());
        }
    });
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.append(document.createTextNode("QQ"));
    return th;
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
    var hotel = getHotelRowByImage(img);
    var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    var ths = querySelectorAll(hotel, ".table th");
    var option = {
        checkinDt: SEARCH_CRITERIA.chDate,
        nights: getTableNights(),
        hotelName: getTableHotelName(hotel),
        href: "",
        roomType: tds[findIndex(ths, /Тип номера/i)].textContent.trim(),
        region: getTableRegion(hotel),
        boardType: tds[findIndex(ths, /Питание/i)].textContent.trim(),
        price: getTablePrice(tds[findIndex(ths, /Цена/i)]),
        currency: getTableCurrency(tds[findIndex(ths, /Цена/i)]),
        country: "",
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getTableImage(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getTableNights() {
    return getDistance(dayMonthYearToDate(SEARCH_CRITERIA.chDate),
        dayMonthYearToDate(SEARCH_CRITERIA.outDate)).toString();
}

function getTableHotelName(hotel) {
    var name = hotel.querySelector("h1 > a").textContent.trim();
    var stars = hotel.querySelectorAll(".fa-star.txt-color-yellow").length;
    return name + (stars > 0 ? ` ${stars}*` : "");
}

function getTableRegion(hotel) {
    var region = hotel.querySelector(".btn-map");
    return region ? region.parentNode.textContent.replace("Показать на карте", "").trim() : "";

}

function getTablePrice(td) {
    var price = td.textContent.replace(/\s+/g,"");
    return extractIntFromStr(price);
}

function getTableCurrency(td) {
    var currency = td.textContent.match(/UAH|EUR|USD/);
    return currency ? currency[0] : td.textContent.replace(/\d+|\s+|\.+/g,"");

}

function getTableImage(hotel) {
    var img = hotel.querySelector(".imageSlider img");
    return img ? img.src : null;
}

function getTableOccupancy(form) {
    var occupancy = {
        adultsCount: 1,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = +selectedOption(form.querySelector("#adults"));
    occupancy.childrenCount = +selectedOption(form.querySelector("#children"));
    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        querySelectorAll(form, "[class*='section-fchildage']:not(.hide) select").forEach(age => {
            ages.push(selectedOption(age));
        });
        occupancy.childAges = ages.join();
    }
    return occupancy;
}

function findIndex(ths, captions) {
    if ( typeof  (captions) === "string" || captions.constructor === RegExp ) {
        captions = [captions];
    }
    var index = ths.findIndex(function (th) {
        if (captions.some(function (caption) {
                if (th.textContent.match(caption)) {
                    return true;
                }
            })) {
            return true;
        }
        return false;
    });
    return index;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className.match(/hotel-newitem/)) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}