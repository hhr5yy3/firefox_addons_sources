var OPERATOR_NAME = "Kidy Tour";
var popupTop = getDoc().documentElement.clientHeight/2;

function getDoc() {
    var doc = document.querySelector("#waavoiframe0");
    return doc ? doc.contentDocument : document;
}

function initializeSearchCriteria() {
    var city = getDoc().querySelector("#TravelsSearchDepartureAirport");
    if ( !city ) {
        return null;
    }
    return {
        city: selectedOption(city),
        occupancy: getOccupancy()
    }
}

function getSearchButton() {
    return getDoc().querySelector("button.btn.btn-info.btn-lg");
}

function injectData() {
    var popup = getDoc().querySelector("#qq-adjust-price");
    if ( popup ) {
        popup.style.top = popupTop;
    }
    querySelectorAll(getDoc(), ".hotel-entry.panel.panel-default form table tbody tr").forEach(tr => {
        if ( !tr.querySelector(".qq") && tr.querySelectorAll("td").length > 3) {
            tr.append(createCell());
        }
    });
    querySelectorAll(getDoc(), ".hotel-entry.panel.panel-default form table thead tr").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createHeadCell());
        }
    });
}

function createCell() {
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.append(createAddButton());
    newTd.append(createEditButton());
    return newTd;
}

function createHeadCell() {
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.append(getDoc().createTextNode("QQ"));
    return newTd;
}

function createOption(img) {
    popupTop =  img.getBoundingClientRect().top +"px";
    var hotel = getHotelRowByImage(img);
    var tr = img.parentNode.parentNode;
    var ths = querySelectorAll(hotel, "thead tr td");
    var tds = querySelectorAll(tr, "td");
    var option = {
        checkinDt: tds[findIndex(ths,/Datums|Kuupäev/i)].textContent.match(/\d{2}.\d{2}.\d{4}/)[0].replace(/-/g, "."),
        nights: tds[findIndex(ths,/Datums|Kuupäev/i)].querySelector("strong").textContent.replace(/\D+/g, ""),
        hotelName: getHotel(hotel),
        href: getUrl(hotel.querySelector("h2 a")),
        roomType: tds[findIndex(ths,/Numurs|Tuba/i)].querySelector("p").textContent,
        region: hotel.querySelector(".panel-heading small").textContent.trim(),
        boardType: tds[findIndex(ths,/Ēdināšana|Toitlustus/i)].textContent,
        price:  tds[findIndex(ths,/Cena par personu|Hind inimese kohta/i)].textContent.match(/\d+/)[0],
        currency: mapCurrency( tds[findIndex(ths,/Cena par personu|Hind inimese kohta/i)]),
        country: "",
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getThumbnail(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getUrl(a) {
    return a ? a.href : null;
}

function mapCurrency(price) {
    var priceText = price.querySelector(".price").textContent.replace(/\d+|\s+|,/g,"");
    switch (priceText) {
        case "€" : return "EUR";
        case "$" : return "USD";
        default : return priceText;
    }
}

function getThumbnail(hotel) {
    var image = hotel.querySelector(".img-thumbnail");
    return image ? image.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = getDoc().querySelector("#Rooms1Adults");
    if ( !adults || !selectedOption(adults) ) {
        return null;
    }
    var kids = querySelectorAll(getDoc(), "select[id*='Rooms1Childage']").filter( kid => {
        if ( kid.parentNode.clientHeight > 0 ) {
            return kid;
        }
    }).map( kidSelect => {
        return selectedOption(kidSelect).replace(/\D+/g, "");
    });

    occupancy.adultsCount = extractIntFromStr(selectedOption(adults).replace(/\D+/g, ""));
    occupancy.childrenCount = kids.length;
    occupancy.childAges = kids.join();
    return occupancy;
}

function getHotel(hotel) {
    var name = hotel.querySelector("h2").textContent;
    var stars =  hotel.querySelector(".stars img");
    stars = stars ? stars.src.match(/img.+(\d+)/) : null;
    return [name, stars ? stars[1]+"*" : ""].join(" ");
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while ( div ) {
        if ( div.className === "hotel-entry panel panel-default" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function findIndex(ths, caption) {
    var index = ths.findIndex(function (th) {
        if (th.textContent.match(caption)) {
            return true;
        }
        return false;
    });
    return index;
}