var OPERATOR_NAME = "Delfin";

function getTables() {
    return document.querySelectorAll("div.result__content table");
}

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

// --------- Rows ---------------------------------

function getCountry(hotel) {
    var countriesH3 = document.querySelectorAll("h3.sitemap__list-title");
    var countryUl = null;
    for ( var i = 0; i < countriesH3.length; ++i ) {
        if ( /СТРАНЫ/i.test(countriesH3[i].textContent) ) {
            countryUl = countriesH3[i].nextElementSibling;
            break;
        }
    };
    if ( !countryUl )
    	return "";

    var regExp = ""
    var lis = countryUl.querySelectorAll("li");
    for (var i = 0; i < lis.length; i++) {
        regExp += trim(lis[i].textContent);
        if ( i != lis.length - 1 ) {
            regExp += "|";
        }
    };
    if ( !regExp )
    	return "";
    regExp = RegExp(regExp, "i");

    var cDiv = hotel.querySelector("div.tour-info__area");
    if ( !cDiv ) {
        cDiv = hotel.querySelector("div#ppt-base");
        if ( !cDiv ) {
            cDiv = hotel.querySelector("div.tour-info__themes");
        }
    }

    var match = cDiv.textContent.match(regExp);
    return match ? match[0] : "";  
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "РУБ.": return "RUB";
        case "$": return "USD";
        case "€": return "EUR";
    }

    return c;
}

function extractDate(td) {
	return td.textContent.match(/\d\d.\d\d.\d{4}/)[0];
}

function extractHotelName(hotelDiv) {
    return trim(hotelDiv.querySelector("a.tour-info__title").textContent);
}

function extractHotelUrl(hotelDiv) {
    var a = hotelDiv.querySelector("a.tour-info__title");
    return a ? a.href : "";
}

function getRegionFromElement(element, regex) {
    element = document.querySelector(element);
    
}

function extractRegion(hotelDiv) {
    var array = [["div.tour-info__area", /,([^,]*)$/],
                ["div.leftside-block__inner h3", /:(.*)$/],
                ["div.tour-info__title-row h2.tour-info__title", /,([^,]*)$/]
                ];
    for ( var i = 0; i < array.length; ++i ) {
        var element = hotelDiv.querySelector(array[i][0]);
        if ( element ) {
            var match = element.textContent.match(array[i][1]);
            return match ? match[1].trim() : trim(element.textContent);
        }
    };
    return "";
}

function extractRoomType(td) {
    var adultI = td.querySelectorAll("i.fa-male");    
    var adult = adultI.length > 0 ? " / взрослых: " + adultI.length : "";
    var childI = td.querySelectorAll("i.fa-child");
    var child =  childI.length > 0 ? ", детей: " + childI.length : "";
    var match = td.textContent.match(/(.+),/);
    return match ? trim(match[1]) + adult + child : trim(td.textContent);
}

function extractPrice(td) {
    return extractIntFromStr(td.querySelector("span.result__price-tag").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(td) {
    return mapCurrency(td.querySelector("span.result__price-tag").textContent.replace(/[\s\d]/g, ""));
}

function extractNights(td) {
    var match = td.textContent.match(/(\d+)\s*НОЧ/i);
    return match ? match[1] : trim(td.textContent);
}

function extractBoardType(td) {
    return trim(td.textContent);
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");
    var hotelDiv = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate( tds[0] ),
        hotelName : extractHotelName( hotelDiv ),
        href : extractHotelUrl( hotelDiv ),
        region : extractRegion( hotelDiv ),
        roomType: extractRoomType( tds[3] ),
        boardType : extractBoardType( tds[4] ),
        price : extractPrice( tds[5] ),
        currency : extractCurrency( tds[5] ),
        nights : extractNights( tds[1] ),
        country : getCountry(hotelDiv),
        city_from : "",
        thumbnail : extractThumbnail(hotelDiv)
    };

    return option;
}

function extractThumbnail(hotelDiv) {
	var img = hotelDiv.querySelector(".tour-info__img");
	return img && img.src ? img.src : null;
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createCell(rowspan) {
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(qqBtns({align: "qq-horizontal"}));
    return td;
}

function injectData() {
    var tables = getTables();
    if ( tables.length === 0 ) {
        return;
    }
    for ( var i = 0; i < tables.length; ++i ) {
        var thead = tables[i].querySelector("thead tr");
        if ( !thead ) {
            return;
        }
        if ( thead.querySelector("th.qq") == null ) {
            var ths = thead.querySelectorAll("th");
            ths[ths.length - 1].removeAttribute("colspan");
            thead.appendChild(createHeaderCell());
        }

        var trs = tables[i].querySelectorAll("tbody tr");

        for ( var j = 0; j < trs.length; ++j ) {
            if ( trs[j].querySelector("td.qq") == null ) {
                trs[j].appendChild(createCell());
            }
        };
    }
}

