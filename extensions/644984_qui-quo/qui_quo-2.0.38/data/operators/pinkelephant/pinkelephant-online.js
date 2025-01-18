var OPERATOR_NAME = "Розовый Слон";

function initializeSearchCriteria() {
    var city = document.querySelector(".s_city .active");
    var country = document.querySelector(".s_country .active");
    if( !city || !country ) {
        return null;
    }
    return {
        occupancy: getOccupancy(),
        city: city.textContent,
        country: country.textContent
    };
}

function getSearchButton() {
    return document.querySelector("[value='Найти']");
}


function injectData() {
    var head = document.querySelector("#RequestResult table thead tr");
    if ( head && !head.querySelector(".qq") ) {
        head.append(createHeaderCell());
    }

    querySelectorAll(document, "#RequestResult table tbody tr").forEach( tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });
}

function createHeaderCell() {
    var td = document.createElement("td");
    td.className = "qq";
    td.setAttribute("style", "width: 50px;");
    td.appendChild(document.createTextNode("QQ"));
    return td;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(nobr);
    return td;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = querySelectorAll(tr, "td");
    var ths = querySelectorAll(document, "#RequestResult table thead tr td");
    var checkOut = tds[findIndex(ths, /Ночей/i)].querySelector("span");
    var inAndOutDates = [extractDate(tds[findIndex(ths, /Вылет/i)].querySelector("div.tour_name").nextSibling.textContent),
        checkOut ? extractDate(checkOut.textContent) : null];
    var nights = extractNights(tds[findIndex(ths, /Ночей/i)]);


    var option = {
        checkinDt: inAndOutDates[0],
        nights: nights,
        extra_nights: extractExtraNight(inAndOutDates, nights),
        region: tds[findIndex(ths, /Курорт/i)].textContent,
        hotelName: extractTableHotelName(tds[findIndex(ths, /Отель/i)]) + " " + tds[findIndex(ths, /Кат/i)].textContent + "*",
        boardType: tds[findIndex(ths, /Пит/i)].textContent,
        roomType: extractTableRoomType(tds[findIndex(ths, /Отель/i)], tds[findIndex(ths, /Разм/i)].textContent),
        price: extractTablePrice(extractTablePriceAndCurrency(tds[findIndex(ths, /стоимость/i)])),
        currency: extractTableCurrency(extractTablePriceAndCurrency(tds[findIndex(ths, /стоимость/i)])),
        href: getURL(tds[findIndex(ths, /Отель/i)].querySelector("a")),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME + " / " + tds[findIndex(ths, /Оператор/i)].textContent,
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail: null
    };
    return option;

}

function extractDate(dateAndMonth) {
    var m = dateAndMonth.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(m[1], 10), parseInt(m[2], 10));
}

function extractNights(td) {
    var span = td.querySelector("span").textContent;
    return td.textContent.replace(span, "");

}

function extractExtraNight(dates, nights) {
    if ( !dates[1] ) {
        return "0";
    }
    return (getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])) - nights).toString();
}

function extractTableHotelName(td) {
    var anchor = td.querySelector("a");
    if ( anchor )
        return anchor.textContent;

    return td.querySelector("div").textContent.replace(extractTableRoomType(td), "");
}

function extractTableRoomType(hotel, room) {
    var type = hotel.querySelector("span");
    return type ? type.textContent + ", " + room : room;
}

function extractTablePrice(priceAndCurrency) {
    return extractIntFromStr(priceAndCurrency.split(/\s+/).join(""));
}

function extractTablePriceAndCurrency(td) {
    var a = td.querySelector(".priceLink");
    return a ? a.textContent : td.textContent;
}

function getURL(anchor) {
    return anchor && anchor.getAttribute("href") ? anchor.href : "";
}

function extractTableCurrency(priceAndCurrency) {
    var c = priceAndCurrency.split(/\s+/).join("").match(/([^\d]+)/)[1];
    switch (c) {
        case "€": return "EUR";
        case "р.": return "RUB";
        case "$": return "USD";
    }
    return c;
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

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = extractIntFromStr(selectedOption(document.querySelector("[name='adults']")));
    occupancy.childrenCount = extractIntFromStr(selectedOption(document.querySelector("[name='kids']")));
    if( !occupancy.adultsCount || occupancy.childrenCount === null ) {
        return null;
    }

    if( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "[name='kidsAges']:not(.disabled)").map(select => {
            return selectedOption(select);
        }).join();
    }

    return occupancy;
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (tr) {
        if( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}