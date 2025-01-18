var OPERATOR_NAME = "Solvex";
var OPERATOR_SLETAT_ID = 158;

function initializeSearchCriteria() {
    var country = getCountry();
    var city = getCity();
    var occupancy = getOccupancy();

    if ( !country || !occupancy || !city ) {
        return null;
    }
    return {
        country: country,
        occupancy: occupancy,
        city: city
    };
}

function getCity() {
    var city = document.querySelector("div[id*='cityFrom']");
    return city ? city.textContent.replace(/откуда/ig, "").trim() : null;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var rowspan = tr.querySelector("td[rowspan]").getAttribute("rowspan");
    var trs = getTrs(tr, rowspan);
    var tds = querySelectorAll(tr, "td");
    var ths = querySelectorAll(document, "#searchResult > thead > tr.tbl-hdr th");
    var hotelCells = getHotelName(trs, findIndex(ths, /Отель/i));
    var option = {
        hotelName: hotelCells[0],
        href: hotelCells[1],
        region: hotelCells[2],
        roomType: getRoomType(trs, findIndex(ths, /Тип номера/i), findIndex(ths, /Разме/i)),
        checkinDt: extractDate(tds[findIndex(ths, /Дата заезда/i)]),
        nights: getNights(trs, findIndex(ths, /Ночи/i)),
        boardType: getOptions(trs, findIndex(ths, /Питание/i)).join(" / "),
        price: tr.querySelector("div.price").textContent.replace(/\D+/g, ""),
        currency: mapCurrency(tr.querySelector(".price")),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getTrs(tr, rowspan) {
    var trs = [];
    for (var i = 0; i < rowspan; i++) {
        trs.push(tr);
        tr = tr.nextElementSibling;
    }
    return trs;
}

function getHotelName(trs, index) {
    var arrHotel = [];
    var hrefs = [];
    var regions = [];
    var text = getText(trs[0], index);
    arrHotel.push(text[0]);
    hrefs.push(text[1]);
    regions.push(text[2]);
    for (var i = 1; i < trs.length; i++) {
        text = getText(trs[i], index - 1);
        arrHotel.push(text[0]);
        text[1] ? hrefs.push(text[1]) : null;
        text[2] ? regions.push(text[2]) : null;
    }

    function getText(tr, index) {
        var td = tr.querySelectorAll("td")[index];
        var href = td.querySelector("a");
        var text = href ? href.textContent : td.firstChild.textContent;
        var region = td.querySelector(".reg");
        return [text, href ? href.href : null, region ? region.textContent : null];
    }

    return [arrHotel.join(" / "), hrefs.length > 0 ? hrefs[0] : null, regions.join(" / ")];
}

function getOptions(trs, index) {
    var arr = [];
    var td = trs[0].querySelectorAll("td")[index];
    arr.push(td.textContent);
    for (var i = 1; i < trs.length; i++) {
        var td = trs[i].querySelectorAll("td")[index - 1];
        arr.push(td.textContent);
    }
    return arr;
}

function getRoomType(trs, indexType, indexSize) {
    var types = getOptions(trs, indexType);
    var sizes = getOptions(trs, indexSize);
    var arr = [];
    types.forEach((type, index) => {
        arr.push(`${type}, ${sizes[index]}`);
    });
    return arr.join(" / ");
}

function getNights(trs, index) {
    var arr = getOptions(trs, index);
    return (arr.reduce((acc, cur) => {
        return +acc + +cur;
    })).toString();
}

function extractDate(td) {
    var splitted = td.textContent.split(".");
    return appendYear(+splitted[0], +splitted[1]);
}

function mapCurrency(td) {
    if ( td.querySelector(".fa-rouble") ) {
        return "RUB";
    }
    var text = td.querySelector(".price").textContent.replace(/\d+/g, "").trim();
    switch (text) {
        case "€":
            return "EUR";
        case "$":
            return "USD";
        default:
            return text;
    }
}

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( th.textContent.match(caption) ) {
            return true;
        }
        return false;
    });
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (true) {
        if ( elem.className == "tbl-row" ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}