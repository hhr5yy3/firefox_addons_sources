var OPERATOR_NAME = "BSI Group";

//-------- Search Criteria ---------------------------

function getCountry() {
    var s = document.querySelector("span#select2-chosen-3");
	return s ? s.textContent : null;
}

function getCity(element) {
    if ( /БЕЗ\sПЕРЕЛЕТА/i.test(element.textContent) )
        return "";
    var c = document.querySelector("span#select2-chosen-2")
    return c ? c.textContent : null;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "SPAN" ? s.textContent : s.value ) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("#select2-chosen-4"),
            childrenCount: selectOptionalInt("#select2-chosen-5"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = selectOptionalInt("#FL_CHILD" + (i + 1));
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
	return { occupancy : getOccupancy() };
}

function getSearchButton() {
    return Array.fromList(document.querySelectorAll(".FL_SEARCH_BUT"));
}


// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
        case "£": return "GBP";
        case "Р.": return "RUB";
        case "€": return "EUR";
        case "$": return "USD";
        case "CHF": return "CHF";
        case "CAD": return "CAD";
    }

    return c;
}

function extractDate(element) {
    return element.textContent.match(/\d{2}\.\d{2}\.\d{4}/)[0];
}

function extractHotelName(element, div) {
    return div.parentNode.querySelector(".tour-title").textContent.trim().replace(/\(.*\)/, "").split(",")[0] + ", " + element.textContent.trim();
}

function extractHotelUrl(element) {
    var a = element.parentNode.querySelector(".tour-title > a");
    return a ? a.href : "";
}

function extractRegion(element) {
    var split = element.textContent.split("I");
    return split[0];
}

function extractRoomType() {
    var adlt = document.querySelector("#select2-chosen-4").textContent;
    var chld = document.querySelector("#select2-chosen-5").textContent;
    return adlt + " AD" + (chld != 0 ? ", " + chld + " CH" : "");
}

function extractPrice(element) {
    return extractIntFromStr(element.textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(element) {
    return mapCurrency(element.textContent.replace(/[\d]/g, ""));
}

function extractNights(element) {
    return element.textContent.match(/(\d+)\s?НОЧ/i)[1];
}

function extractBoardType(element) {
    return element.textContent;
}

function createOption(img) {
    var element = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var lines = element.querySelectorAll(".tour-line");

    var option = {
        checkinDt : extractDate( lines[2] ),
        hotelName : extractHotelName( lines[1], element ),
        href : extractHotelUrl( element ),
        region : extractRegion( element ),
        roomType: extractRoomType(),
        boardType : extractBoardType( lines[3] ),
        price : extractPrice( img.parentNode.parentNode.parentNode ),
        currency : extractCurrency( img.parentNode.parentNode.parentNode ),
        nights: extractNights( lines[2] ),
        country: getCountry(),
        city_from: getCity( lines[0] ),
        excursion: true,
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());   
    
    var div = document.createElement("div");
    div.className = "qq";
    div.setAttribute("style", "margin-left: 120px;");
    div.appendChild(nobr);
    
    return div;
}

    
function injectData() {
    if ( !document.querySelector(".outgoing_li.selected") ) {
        return;
    }
    var tds = document.querySelectorAll('.tour-price');

    for ( var i = 0; i < tds.length; ++i ) {  
        if ( !tds[i].querySelector("div.qq") ) {
            tds[i].setAttribute("style", "display: inline-flex;");
            tds[i].appendChild(createCell());
        }
    }
}
