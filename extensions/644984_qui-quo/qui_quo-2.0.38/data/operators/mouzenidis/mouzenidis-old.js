var OPERATOR_NAME = "Mouzenidis";
var OPERATOR_SLETAT_ID = 213;


//-------- Search Criteria ---------------------------

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    var s = selectedOption(document.querySelector("select.ages_adults"));
    if ( !s )
        return null;
    occupancy.adultsCount = extractIntFromStr(s);

    s = selectedOption(document.querySelector("select.ages_children"));
    if ( !s )
        return null;
    occupancy.childrenCount = extractIntFromStr(s);

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        var inputs = document.querySelector("select.ages_children").nextElementSibling.querySelectorAll("input[type='text']");
        for ( var i=0; i<occupancy.childrenCount; ++i ) {
            ages.push(inputs.length > i && /\d+/.test(inputs[i].value) ? extractIntFromStr(inputs[i].value) : 2);
        }
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
    var occupancy = getOccupancy();
    return occupancy ? { occupancy : occupancy } : null;
}

function getSearchButton() {
    return document.querySelector('#mwSearchButton');
}


// --------- Rows ---------------------------------

function priceAsText(td) {
    var s = querySelectorAll(td, ".mwPriceBox>span")
        .filter(function(s) { return !s.className || s.className.indexOf("previousPrice") < 0; });
    return s.length == 0 ? td.textContent : s[0].textContent;
}

function extractPrice(td) {
    return parseInt(priceAsText(td).match(/(\d+)/)[1]);
}

function extractCurrency(td) {
    var code = priceAsText(td).match(/\d+\s*([^\d]+)/)[1].trim();
    switch (code) {
        case "EU": return "EUR";
        case "рб.": return "RUB";
        case "грн.": return "UAH";
        case "тнг": return "KZT";
        case "бр.": return "BYN";
        case "лари": return "GEL";
        case "$": return "USD";
    }
    return code;
}

function extractNights(tds) {
    var nights = tds.reduce(function (sum, td) {
        return sum + extractIntFromStr(td.textContent);
    },0);
    return nights.toString();
}

function extractHref(td) {
    var anchor = td ? td.querySelector("a[data-id]") : null;
    return anchor === null ? "" :  anchor.href;
}

function extractHotelAndRegion(tds, matcher) {
    return tds.map(function (td) {
        return querySelectorAll(td, "a[data-id]").map(function (a) {
            var m = a.textContent.match(matcher);
            return m ? m[1] : a.textContent;
        }).filter(function (m) {
            return m;
        }).join(" / ");
    }).join(" / ");
}

function extractRoomAndBoardType(tds) {
    return tds.map(function (td) {
        return td.textContent.replace("/", " — ");
    }).join(" / ");
}

function extractDate(td) {
    var matcher = td.textContent.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function getCity() {
    var c = document.querySelector("#guide-step-1 a.lead");
    return c === null ? "" : c.textContent;
}

function getCountry() {
    var a = document.querySelector("#guide-step-2 .active a") || document.querySelector("#guide-step-2") || document.querySelector(".country-btn");
    return mapCountry(a ? a.textContent : "");
}

function mapCountry(c) {
    switch(c.toLowerCase().trim()) {
        case "грецию": return "Греция";
        case "латвию": return "Латвия";
        case "россию": return "Россия";
        case "сербию": return "Сербия";
        case "болгарию": return "Болгария";
        case "италию": return "Италия";
    }
    return c;
}

function createOption(img) {
    var tr= img.parentNode.parentNode.parentNode;
    var tds = querySelectorAll(tr, "td");
    var ths = querySelectorAll(tr.parentNode.parentNode, "thead th");
    var trs = hotelTrAmount(tr);
    var hotel = neededTds(ths, trs, /Отель|Hotel/i);
    if ( !hotel[0]  ) {
        var parentTr = tr.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling;
        var parentThs = querySelectorAll(parentTr.parentNode.parentNode, "thead th");
        var parentTrs = hotelTrAmount(parentTr);
        hotel = neededTds(parentThs, parentTrs, /Отель|Hotel/i);
    }


    var option = {
        region : extractHotelAndRegion(hotel, /.+\((.+)\)\s*/),
        hotelName : extractHotelAndRegion(hotel, /(.+)\(.+\)\s*/),
        roomType : extractRoomAndBoardType(neededTds(ths, trs, /Номер|Room/i)),
        boardType : extractRoomAndBoardType(neededTds(ths, trs, /Питание|Board/i)),
        checkinDt : extractDate(tds[findIndex(ths, /Дата заезда|Arrival date/i)]),
        nights :  extractNights(neededTds(ths, trs, /Ночи|Nights/i)),
        price : extractPrice(tds[findIndex(ths, /Цена|Price/i)]),
        currency : extractCurrency(tds[findIndex(ths, /Цена|Price/i)]),
        href : extractHref(hotel[0]),
        country: getCountry(),
        city_from: getCity(),
        occupancy: SEARCH_CRITERIA.occupancy
    }
    return option;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.setAttribute("style", "text-align: center;");
    newTd.appendChild(nobr);

    return newTd;
}

function injectData() {

    var header = document.querySelectorAll('[data-bind*="!vm.groupByHotel()"] table.table-results thead tr, .table-results table thead tr,' +
        '.hotel-variants table thead tr,' +
        '[data-bind*="recommendedHotelsResult"] table.table-results thead tr');

    for (var i = 0; i < header.length; i++) {
        if ( header[i] && header[i].querySelector("th.qq") == null) {
            var newTh = document.createElement("th");
            newTh.className = "qq";
            newTh.setAttribute("style", "text-align: center;");
            var newContent = document.createTextNode("QQ");
            newTh.appendChild(newContent);
            header[i].appendChild(newTh);
        }
    }

    var trs = document.querySelectorAll('[data-bind*="!vm.groupByHotel()"] table.table-results tr, .table-results table tr, .hotel-variants table tr,' +
        '[data-bind*="recommendedHotelsResult"] table.table-results tr');

    for ( i = 0; i < trs.length; i++) {
        if ( trs[i].querySelector("td.qq") == null ) {
            var td = trs[i].querySelector("td");
            if ( td && td.textContent.match(/(\d\d)\.(\d\d)/) ) { // this check because of delay in rendering results to prevent sletat price issues
                trs[i].appendChild(createCell())
            }
        }
    }
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

function hotelTrAmount(tr) {
    var trs = [];
    while (true) {
        trs.push(tr);
        tr = tr.nextElementSibling;
        if ( !tr || tr.querySelector(".qq")) {
            break;
        }
    }
    return trs;
}

function neededTds(ths, trs, caption) {
    var tds = [];
    Array.fromList(trs).map(function (tr) {
        tds.push(querySelectorAll(tr, "td")[findIndex(ths, caption)]);
    });
    return tds;
}