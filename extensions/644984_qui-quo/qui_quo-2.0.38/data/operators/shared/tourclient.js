var OPERATOR_NAME = "";

function getResultDiv() {
    return document.querySelector(".search-results-table-out");
}

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	var country = getCountry();
    if ( !country )
        return null;

    var city = getCity();
    if ( !city )
        return null;

    return {
        "country" : country,
        "city" : city
    };
}

function getSearchButton() {
	return document.querySelector(".tc-go-search");
}

// --------- Rows ---------------------------------

function getCountry() {
    var s = document.querySelector("div[data-scrap-filter-name='country'] select");

    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
    	console.log("country is not selected");
        return null;
    }

    return selectedOption(s);
}

function getCity() {
    return selectedOption(document.querySelector("div[data-scrap-filter-name='city'] select"));
}

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
        case "Р": return "RUB";
    }
    return c;
}

function mapMonth(s) {
    var m = trim(s);
    switch (m.toUpperCase()) {
        case "ЯНВ": return "01";
        case "ФЕВ": return "02";
        case "МАР": return "03";
        case "АПР": return "04";
        case "МАЯ": return "05";
        case "ИЮН": return "06";
        case "ИЮЛ": return "07";
        case "АВГ": return "08";
        case "СЕН": return "09";
        case "ОКТ": return "10";
        case "НОЯ": return "11";
        case "ДЕК": return "12";
    }
    return m;
}

function extractDate(row) {
    var dateArr = row.querySelector(".search-res-list-td1-time").textContent.match(/(\d+)\s(янв|фев|мар|апр|мая|июн|июл|авг|сен|окт|ноя|дек)\s(\d\d)/i);
    return dateArr[1] + "." + mapMonth(dateArr[2]) + ".20" + dateArr[3];
}

function extractHotelName(row) {
    return row.querySelector(".search-res-list-h2").textContent.trim();
}

function extractHotelUrl(row) {
    var a = row.querySelector(".search-res-list-h2-a.allocation-link");
    if ( a )
        return a.href;
    else
        return "";
}

function extractThumbnail(row) {
    var img = row.querySelector(".search-res-list-photo-img");
    if ( img )
        return img.src;
    else
        return nil;
}

function extractRegion(row) {
    var result = row.querySelector(".search-res-resort").textContent.trim();
    return result;
}

function extractRoomType(row) { 
    var result = [];
    var dts = row.querySelectorAll("dt");
    var dds = row.querySelectorAll("dd");
    for ( var i = 0; i < dts.length; i++ ) {
        if ( /НОМЕР/i.test(dts[i].textContent) || /ВИД/i.test(dts[i].textContent) )
            result.push(dds[i].textContent.trim());
    };

    return result.join(", ");
}

function extractPrice(row) {
    return extractIntFromStr(row.querySelector(".search-res-list-td2-a1").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(row) {
    return mapCurrency(row.querySelector(".search-res-list-td2-a1").textContent.replace(/[\s\d]/g, ""));
}

function extractNights(row) {
    return row.querySelector(".search-res-list-td1-time").textContent.match(/НА\s(\d+)\sНОЧ/i)[1];
}

function extractBoardType(row) {
    var dts = row.querySelectorAll("dt");
    var dds = row.querySelectorAll("dd");
    for ( var i = 0; i < dts.length; i++ ) {
        if ( /ПИТАНИЕ/i.test(dts[i].textContent) ) 
            return dds[i].textContent.trim();
    };
    return "";
}

function createOption(img) {
    var row = img.parentNode.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate( row ),
        hotelName : extractHotelName( row ),
        href : extractHotelUrl( row ),
        region : extractRegion( row ),
        roomType: extractRoomType( row ),
        boardType : extractBoardType( row ),
        price : extractPrice( row ),
        currency : extractCurrency( row ),
        nights: extractNights( row ),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        thumbnail : extractThumbnail( row ),
    };
    return option;
}

function createCell(tds) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newTd = document.createElement("p");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    
    return newTd
}

function injectData() {
    var resultDiv = getResultDiv();
    if ( resultDiv == null ) {
        return;
    }

    var trs = resultDiv.querySelectorAll(".search-res-list-td2");

    for (var i = 0; i < trs.length; ++i) {
        if ( !trs[i].querySelector("p.qq") ) {
            var price = trs[i].querySelector(".search-res-list-td2-a1.order-link");
            var nbsp = trs[i].querySelector(".search-res-list-oldp");
            if ( nbsp )
                trs[i].insertBefore(createCell(), nbsp);
            else
                trs[i].appendChild(createCell());
        }
    }
}

