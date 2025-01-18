var OPERATOR_NAME = "Глобус Тур";
var OPERATOR_SLETAT_ID = 246;

function getTable() {
    return document.querySelector("table.G-TSF-Result-Table");
}


//-------- Search Criteria ---------------------------

function findSpan(regExp) {
    var divs = document.querySelectorAll("div.ITCMS-FieldsPanel-CellField");

    for (var i = 0; i < divs.length; ++i) {
        if ( regExp.test(divs[i].textContent) ) return divs[i];
    };
}

function isCountryRussia() {
    var li = document.querySelector("li.G-TSF-Tab-Selected");
    if ( li && /ОТДЫХ\sВ\sРОССИИ/i.test(li.textContent) ) {
        return "Россия/СНГ";
    }
}

function getCountry() {
    if ( isCountryRussia() ) {
        return "Россия/СНГ";
    }
    var s = findSpan(/СТРАНА\sПРИБЫТИЯ/i);
    if ( s ) {
      return s.querySelector("span.ui-combobox-readonly-placeholder").textContent.trim();
    }
    return null;
}

function getCity() {
    var c = document.querySelector("span.ui-combobox-readonly-placeholder");
    return c == null ? null : c.textContent.trim();
}

function getRegion() {
    if ( isCountryRussia() ) {
        var region = findSpan(/СТРАНА\sПРИБЫТИЯ/i);
        if ( region ) {
          return region.querySelector("span.ui-combobox-readonly-placeholder").textContent.trim();
        }
    }
    return null;
}

function initializeSearchCriteria() {
	var country = getCountry();
	if ( !country )
		return null;

    var city = getCity();
    if ( !city )
        return null;
	 
	return { "country" : country,
                "city" : city,
                "region" : getRegion() };
}

function getSearchButton() {
    return document.querySelector('button.ui-button-accent');
}


// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "RUR": return "RUB";
    }

    return c;
}

function extractDate(row) {
    return row.querySelector(".G-TSF-Tour-Date").textContent.trim();
}

function extractHotelName(row, img) {
    var a = row.querySelector(".G-TSF-ColHotelName a");
    if ( a ) {
        return a.textContent.trim() + " " + row.querySelector(".G-TSF-ColHotelName span").textContent.trim();
    } else {
        var spans = row.querySelectorAll("span");
        return spans[0].textContent.trim() + (spans[1] ? " " + spans[1].textContent.trim() : "");
    }
}

function extractHotelUrl(row) {
    var a = row.querySelector(".G-TSF-ColHotelName a");
    return a ? a.href : "";
}

function extractRegion(row) {
    if ( SEARCH_CRITERIA.region ) {
        return SEARCH_CRITERIA.region;
    }
    var a = row.querySelector(".G-TSF-ColHotelName a");
    if ( a ) {
        var match = a.href.match(/country\/.+\/spas\/([^\d]*)\//i);
        if ( match ) {
            return match[1].charAt(0).toUpperCase() + match[1].slice(1);
        }
    }

    return "";
}

function extractRoomType(row) {
    var spans = row.querySelectorAll(".G-TSF-ColHotelName span");
    var text = spans[spans.length - 1].textContent;
    var placing = row.querySelector(".G-TSF-Tour-Placing");
    return text.replace(/-/, "").trim() + (placing ? " / " + placing.textContent.trim() : "");
}

function extractPrice(row) {
    var price = row.querySelector(".G-TSF-Tour-Price").textContent.replace(/[^\d]/g, "");
    return extractIntFromStr(price.substring(0, price.length - 2));
}

function extractCurrency(row) {
    return mapCurrency(row.querySelector(".G-TSF-Tour-Price").textContent.replace(/[\s\d,]/g, ""));
}

function extractNights(row) {
    return row.querySelector(".G-TSF-Tour-Nights").textContent.replace(/[^\d]/g, "");
}

function extractBoardType(row) {
    return row.querySelector(".G-TSF-ColMeal").textContent.trim();
}

function checkCity(row) {
    if ( /БЕЗ\s+АВИАБИЛЕТА/i.test(row.querySelector(".G-TSF-ColTour").textContent) )
        return "";

    return SEARCH_CRITERIA.city;
}

function createOption(img) {
    var row = img.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate( row ),
        hotelName : extractHotelName( row, img ),
        href : extractHotelUrl( row ),
        region : extractRegion( row ),
        roomType: extractRoomType( row ),
        boardType : extractBoardType( row ),
        price : extractPrice( row ),
        currency : extractCurrency( row ),
        nights: extractNights( row ),
        country: SEARCH_CRITERIA.country,
        city_from: checkCity(row),
    };

    return option;
}

function createHeaderCell() {
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(document.createTextNode("QQ"));
    return td;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());   
    
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    
    return newTd;
}

    
function injectData() {
    var tbl = getTable();
    if ( tbl == null ) {
        return;
    }

    var header = document.querySelector('table.G-TSF-Result-Table thead tr');

    if ( header && header.querySelector("td.qq") == null ) {
        header.appendChild(createHeaderCell()); 
    }

    var tbody = document.querySelector('table.G-TSF-Result-Table tbody');
    var trs = getChildElementsByTagName(tbody, "tr");

    for ( var i = 0; i < trs.length; ++i ) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            trs[i].appendChild(createCell());
        }
    }
}
