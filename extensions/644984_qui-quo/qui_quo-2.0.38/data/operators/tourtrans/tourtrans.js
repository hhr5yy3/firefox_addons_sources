var OPERATOR_NAME = "ТурТрансВояж";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".quoteYes [id*='price'], .quoteRQ [id*='price']").map( elem => elem.closest(".quoteYes") || elem.closest(".quoteRQ")).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            var btns = qqBtns();
            var br = document.createElement("br");
            br.classList.add("qq");
            btns.style.marginTop = "3px";
            div.append(btns);
            btns.before(br);
        }
    });
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var td = img.parentNode.parentNode;
    var ths = querySelectorAll(document, "#ctl00_generalContent_upTable tr th");
    var tds = querySelectorAll(tr, ":scope > td");
    var indexTd = tds.indexOf(td);
    var tourName = tr.querySelector("[id*='TourName']");
    var price = getText(td);
    var option = {
        checkinDt: getText(tds[findTableTdIndex(ths, /ДАТА/i)]),
        nights: (+getText(tds[findTableTdIndex(ths, /ДНЕЙ/i)])-1).toString(),
        hotelName: getText(tourName),
        href: getNodeProperty(tourName.querySelector("a"), null, "href"),
        country: "",
        region: "",
        roomType: getText(ths[indexTd]),
        boardType: "",
        price: extractIntFromStr(price),
        currency: mapCurrency(price.replace(/\d+|,|\s+/g, "")),
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: true,
    };
    return option;
}

function mapCurrency(price) {
    switch (price.toUpperCase()) {
        case "EU": return "EUR";
        case "EV": return "EUR";
        case "РБ": return "RUB";
        case "$": return "USD";
        case "€": return "EUR";
    }
    return price;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.tagName === 'TR' ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}