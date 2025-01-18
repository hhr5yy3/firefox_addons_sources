var OPERATOR_NAME = "Аккорд Тур";

// -------- Search Criteria ---------------------------

function getCountry(td) {
    var c = [];
    var flags = document.querySelectorAll("[itemprop='significantLink']");
    for (var i = 0; i < flags.length; i++) {
        c.push(trim(flags[i].textContent.match(/^[^-]+/)[0]));
    };
    return c.join(", ");
}

function getCity(td) {
    return "";
}

function initializeSearchCriteria() {
    return null;
}


function getSearchButton() {
    return null;
}


// --------- Rows ---------------------------------

function mapCurrency(c) {
    c = trim(c);
    switch(c.toLowerCase()) {
        case "$": return "USD";
        case "€": return "EUR";
        case "грн.": return "UAH";
    }
    return c;
}

function nextTr(tr) {
    var nextTr = tr.nextSibling;
    while ( nextTr.tagName != "TR") {
        nextTr = nextTr.nextSibling;
    }
    return nextTr;
}

function extractDate() {
    var span = document.querySelector("#calc_turist_date_titletext");
    var match = span.textContent.match(/\d{2}\.\d{2}\.\d{4}/);
    return match[0];
}

function extractHotelName(regionTr) {
    var exName = document.querySelector("#title");
    var hotelTr = nextTr(regionTr);
    var hotelName = hotelTr.textContent.match(/(ОТЕЛЬ:)?(.*)/i)[2].trim();

    return exName.textContent + (hotelName ? " - " + hotelName : "");
}

function extractHotelHref(regionTr) {
    var a = nextTr(regionTr).querySelector("a");
    return a ? a.href : window.location.href;
}

function extractRegion(regionTr) {
    return regionTr.textContent.replace(/\([^\)]+\)/, "");
}

function extractRoomType() {
    var select = document.querySelector("#calc_turist_room");
    var selected = selectedOption(select);
    var match = selected.match(/[a-z]+/i);
    if ( match ) {
        return match[0];
    }

    if ( /ВЫБЕРИТЕ/i.test(selected) ) {
        return "";
    }

    return "EXB";
}

function extractBoardType() {
    return ""
}

function extractPrice() {
    var span = document.querySelector("#calc_turist_total_span");
    return extractIntFromStr(span.textContent);
}

function extractCurrency() {
    var span = document.querySelector("#calc_turist_currency_titletext");
    return mapCurrency(span.textContent);
    for ( var i = 0; i < spans.length; ++i ) {
        if ( spans[i].offsetParent ) {
            return spans[i].getAttribute("rel");
        }
    };
}

function extractNights() {
    var div = document.querySelector("#content #descr");
    var match = div.textContent.match(/ДЕНЬ\s*\d+/ig);
    return (match[match.length - 1].replace(/ДЕНЬ\s*(\d+)/i, "$1") - 1).toString();
}

function createOption(img) {
    var regionTr = document.querySelector("[itemprop='alternativeHeadline']").parentNode;
    
    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName( regionTr ),
        href : extractHotelHref( regionTr ),
        region : extractRegion( regionTr ),
        roomType: extractRoomType(),
        boardType : extractBoardType(),
        price : extractPrice(),
        currency : extractCurrency(),
        nights : extractNights(),
        country: getCountry(),
        city_from : getCity(),
        excursion: true,
        occupancy : null
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var td = document.createElement("td")
    td.appendChild(nobr);
    td.className = "qq";

    return td;
}
    
function injectData() {
    var calcTable = document.querySelectorAll("#calc_turist_table table");
    if ( calcTable.length > 1 && /\d/.test(document.querySelector("#calc_turist_total_span").textContent) ) {
        var tr = calcTable[1].querySelector("tr");
        if ( tr && !tr.querySelector(".qq") && document.querySelector("#calc_turist_date_titletext") ) {
            tr.appendChild(createCell());
        }
    }
}

